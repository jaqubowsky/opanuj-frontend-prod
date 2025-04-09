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
