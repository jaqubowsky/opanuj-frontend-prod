variable "ami" {
  description = "The AMI ID to use for the EC2 instance"
  type        = string
}

variable "type" {
  description = "The instance type for the EC2 instance"
  type        = string
  default     = "t2.micro"
}

variable "s3_bucket_name" {
  description = "The name for the S3 bucket (must be globally unique)"
  type        = string
}

variable "environment" {
  description = "The deployment environment (e.g., Development, Staging, Production)"
  type        = string
  default     = "Development"
}
