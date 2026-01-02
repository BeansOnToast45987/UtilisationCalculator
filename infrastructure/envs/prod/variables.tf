variable "project_id" {
  description = "GCP project ID for hosting the Utilisation Calculator application"
  type        = string
}

variable "region" {
  description = "GCP region for Cloud Run, Storage, and Artifact Registry"
  type        = string
  default     = "europe-west2"
}

variable "cors_origins" {
  description = "Frontend domains allowed to access the GraphQL API"
  type        = string
}