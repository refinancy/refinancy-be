data "aws_ami" "ami_refinancy" {
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "name"
    values = ["refinancy-app"]
  }
}

resource "aws_instance" "api-refinancy" {
  ami                    = data.aws_ami.ami_refinancy.id
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.subnet_refinancy.id
  vpc_security_group_ids = [aws_security_group.allow_tls_refinancy.id]

  tags = {
    Name        = "refinancy-tf"
    Description = "Refinancy API and Database MongoDB docker"
  }
}