# =============================================================================
# TERRAFORM AND PROVIDER CONFIGURATION
# =============================================================================

terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    bucket = "utilisationcalculator-prod-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# =============================================================================
# LOCAL VARIABLES AND CONFIGURATION
# =============================================================================

locals {
  environment = "production"
  labels = {
    environment = local.environment
    project     = "utilisation-calculator"
    managed_by  = "terraform"
  }
}

# =============================================================================
# GOOGLE CLOUD APIS
# =============================================================================

resource "google_project_service" "required_apis" {
  for_each = toset([
    "cloudresourcemanager.googleapis.com",
    "run.googleapis.com",
    "storage.googleapis.com",
    "artifactregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "iam.googleapis.com"
  ])

  project                    = var.project_id
  service                    = each.value
  disable_dependent_services = false
  disable_on_destroy         = false
}

# =============================================================================
# SERVICE ACCOUNTS
# =============================================================================

resource "google_service_account" "runtime" {
  account_id   = "uc-runtime-${local.environment}"
  display_name = "Utilisation Calculator Runtime (${local.environment})"
  project      = var.project_id
}

resource "google_service_account" "deploy" {
  account_id   = "uc-deploy-${local.environment}"
  display_name = "Utilisation Calculator Deploy (${local.environment})"
  project      = var.project_id
}

# =============================================================================
# IAM PERMISSIONS AND BINDINGS
# =============================================================================

resource "google_project_iam_member" "runtime_permissions" {
  for_each = toset([
    "roles/secretmanager.secretAccessor",
    "roles/logging.logWriter"
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.runtime.email}"
}

resource "google_project_iam_member" "deploy_permissions" {
  for_each = toset([
    "roles/artifactregistry.writer",
    "roles/run.developer"
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.deploy.email}"
}

resource "google_service_account_iam_member" "deploy_can_act_as_runtime" {
  service_account_id = google_service_account.runtime.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.deploy.email}"
}

# =============================================================================
# GITHUB ACTIONS WORKLOAD IDENTITY
# =============================================================================

resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github-actions-pool-${local.environment}"
  display_name              = "GitHub Actions Pool (${local.environment})"
  description               = "Identity pool for GitHub Actions (${local.environment})"
  project                   = var.project_id

  depends_on = [google_project_service.required_apis]
}

resource "google_iam_workload_identity_pool_provider" "github" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider-${local.environment}"
  display_name                       = "GitHub Provider (${local.environment})"
  project                            = var.project_id

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
  }

  attribute_condition = "attribute.repository == 'BeansOnToast45987/UtilisationCalculator'"
}

resource "google_service_account_iam_binding" "github_workload_identity" {
  service_account_id = google_service_account.deploy.name
  role               = "roles/iam.workloadIdentityUser"
  
  members = [
    "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/BeansOnToast45987/UtilisationCalculator"
  ]
}

# =============================================================================
# SECRET MANAGER
# =============================================================================

resource "google_secret_manager_secret" "mongodb_uri" {
  secret_id = "mongodb-uri-${local.environment}"
  project   = var.project_id

  replication {
    auto {}
  }

  labels = local.labels

  depends_on = [google_project_service.required_apis]
}

resource "google_secret_manager_secret" "clerk_secret_key" {
  secret_id = "clerk-secret-${local.environment}"
  project   = var.project_id

  replication {
    auto {}
  }

  labels = local.labels

  depends_on = [google_project_service.required_apis]
}

# =============================================================================
# ARTIFACT REGISTRY
# =============================================================================

resource "google_artifact_registry_repository" "docker_registry" {
  location      = var.region
  project       = var.project_id
  repository_id = "utilisation-calculator-${local.environment}"
  description   = "Docker repository for Utilisation Calculator ${local.environment}"
  format        = "DOCKER"
  labels        = local.labels

  depends_on = [google_project_service.required_apis]
}

# =============================================================================
# BACKEND CLOUD RUN SERVICE
# =============================================================================

resource "google_cloud_run_v2_service" "backend_service" {
  name     = "utilisation-calculator-backend-${local.environment}"
  location = var.region
  project  = var.project_id

  template {
    service_account = google_service_account.runtime.email

    scaling {
      min_instance_count = 0
      max_instance_count = 5
    }

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_registry.repository_id}/utilisation-calculator-backend:latest"

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
        cpu_idle = true
      }

      env {
        name = "DATABASE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.mongodb_uri.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "CLERK_SECRET_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.clerk_secret_key.secret_id
            version = "latest"
          }
        }
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name  = "CORS_ORIGINS"
        value = var.cors_origins
      }

      startup_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        initial_delay_seconds = 10
        timeout_seconds       = 5
        period_seconds        = 10
        failure_threshold     = 3
      }

      liveness_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        initial_delay_seconds = 30
        timeout_seconds       = 5
        period_seconds        = 30
        failure_threshold     = 3
      }
    }
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }

  depends_on = [
    google_project_service.required_apis
  ]

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image
    ]
  }
}

resource "google_cloud_run_service_iam_member" "backend_public" {
  location = google_cloud_run_v2_service.backend_service.location
  project  = google_cloud_run_v2_service.backend_service.project
  service  = google_cloud_run_v2_service.backend_service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# =============================================================================
# FRONTEND STORAGE BUCKET
# =============================================================================

resource "google_storage_bucket" "frontend_bucket" {
  name          = "app.utilisationcalculator.com"
  location      = var.region
  project       = var.project_id
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD"]
    response_header = ["*"]
    max_age_seconds = 3600
  }

  labels = local.labels
}

resource "google_storage_bucket_iam_member" "frontend_public" {
  bucket = google_storage_bucket.frontend_bucket.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "google_storage_bucket_iam_member" "frontend_deploy" {
  bucket = google_storage_bucket.frontend_bucket.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.deploy.email}"
}