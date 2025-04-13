variable "s3_bucket_name" {
  description = "The name for the S3 bucket (must be globally unique)"
  type        = string
}

variable "environment" {
  description = "The deployment environment (e.g., Development, Staging, Production)"
  type        = string
  default     = "Development"
}
