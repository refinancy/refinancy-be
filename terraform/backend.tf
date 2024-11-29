terraform {
  backend "s3" {
    bucket = "refinancy-bucket"
    key    = "prd/refinancy-complete/terraform.state"
    region = "us-east-1"
  }
}
