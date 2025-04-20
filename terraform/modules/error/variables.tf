variable "name" {
  description = "Base name of the resources"
  type = string
}

variable "lambda_runtime" {
  description = "The runtime of the lambda function"
  type = string
}

variable "lambda_source_dir" {
  description = "The directory containing the lambda function code"
  type = string
}

variable "metric_namespace" {
  description = "The namespace for the CloudWatch metric"
  type = string
}

variable "metric_name" {
  description = "The name of the CloudWatch metric"
  type = string
}

variable "metric_dimensions" {
  description = "The dimensions for the CloudWatch metric"
  type = map(string)
}

variable "error_threshold" {
  description = "The threshold for the CloudWatch metric"
  type = number
}

variable "route_path" {
  description = "The path for the API Gateway route"
  type = string
}

variable "aws_region" {
  description = "The AWS region"
  type = string
  default = "eu-central-1"
}

variable "notification_email" {
  description = "The email address to send notifications to"
  type = string
  sensitive = true
}
