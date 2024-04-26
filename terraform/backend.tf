terraform {
  backend "s3" {
    bucket = "refinancy-bucket"
    key    = "prd/tfstate/terraform.state"
    region = "us-east-1"
  }
}