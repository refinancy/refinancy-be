terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.46.0"
    }
  }

  backend "s3" {
    bucket = "refinancy-bucket"
    key    = "dev/refinancy-machine-simple/terraform.tfstate"
    region = "us-east-1"

  }
}

provider "aws" {
  region = "us-east-1"
}

data "terraform_remote_state" "vpc-refinancy" {
  backend = "s3"
  config = {
    bucket = "refinancy-bucket"
    key    = "prd/refinancy-complete/terraform.state"
    region = "us-east-1"
  }
}