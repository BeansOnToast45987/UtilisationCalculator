output "backend_url" {
  description = "Utilisation Calculator backend API URL"
  value       = google_cloud_run_v2_service.backend_service.uri
}

output "frontend_bucket" {
  description = "GCS bucket name hosting the frontend static files"
  value       = google_storage_bucket.frontend_bucket.name
}

output "frontend_url" {
  description = "Frontend website URL"
  value       = "https://${google_storage_bucket.frontend_bucket.name}.storage.googleapis.com"
}

output "artifact_registry" {
  description = "Docker container registry URL for pushing backend images"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_registry.repository_id}"
}

output "project_id" {
  description = "GCP project ID where Utilisation Calculator is deployed"
  value       = var.project_id
}

output "workload_identity_provider" {
  description = "Workload Identity Provider name for GitHub Actions CI/CD authentication"
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "service_account_email" {
  description = "Service account email used by GitHub Actions for deployments"
  value       = google_service_account.deploy.email
}

output "runtime_service_account_email" {
  description = "Service account email used by the backend Cloud Run service at runtime"
  value       = google_service_account.runtime.email
}