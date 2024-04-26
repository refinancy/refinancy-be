packer {
  required_plugins {
    amazon = {
      version = ">= 1.2.8"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "ubuntu" {
  ami_name      = "refinancy-app"
  instance_type = "t3.micro"
  region        = "us-east-1"
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-jammy-22.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {

  sources = ["source.amazon-ebs.ubuntu"]

  provisioner "file" {
    source      = "../ansible"
    destination = "/tmp/ansible"
  }

  provisioner "shell" {
    inline = [
      "sudo apt-add-repository ppa:ansible/ansible",
      "sudo apt update",
      "sudo apt -y install ansible",
      "ansible-playbook --connection=local /tmp/ansible/playbook.yml"
    ]
  }
}
