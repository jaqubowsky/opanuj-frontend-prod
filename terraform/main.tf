terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.94.1"
    }
  }

  backend "s3" {
    bucket  = "opanujfrontend-terraform"
    key     = "state/terraform.tfstate"
    region  = "eu-central-1"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}

module "error" {
  source = "./modules/error"

  name = "opanuj-frontend"

  metric_namespace = "AppMonitoring"
  metric_name      = "FrontendErrors"

  lambda_source_dir = "${path.root}/../lib/lambda-error"
  lambda_runtime = "nodejs20.x"

  notification_email = var.notification_email

  metric_dimensions = {
    Environment = var.environment
  }

  aws_region = var.aws_region

  error_threshold = 10
  route_path      = "/error"
}
