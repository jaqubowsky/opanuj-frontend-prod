variable "s3_bucket_name" {
  description = "The name for the S3 bucket (must be globally unique)"
  type        = string
}

variable "environment" {
  description = "The deployment environment (e.g., Development, Staging, Production)"
  type        = string
  default     = "Development"
}

variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "eu-central-1"
}

variable "notification_email" {
  description = "The email address to send notifications to"
  type        = string
  sensitive   = true
}
