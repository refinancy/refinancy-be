resource "aws_key_pair" "key" {
  key_name   = "refinancy-key"
  public_key = file("~/.ssh/aws_key.pub")
}

resource "aws_instance" "vm" {
  ami                         = "ami-0fc5d935ebf8bc3bc"
  instance_type               = "t3.micro"
  key_name                    = aws_key_pair.key.key_name
  subnet_id                   = data.terraform_remote_state.vpc-refinancy.outputs.subnet_id
  vpc_security_group_ids      = [data.terraform_remote_state.vpc-refinancy.outputs.security_group_id]
  associate_public_ip_address = true

  tags = {
    Name = "vm-terraform"
  }

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("~/.ssh/aws_key")
    host        = self.public_ip
  }

  provisioner "local-exec" {
    command = "echo ${self.public_ip} >> public_ip.txt"
  }

  provisioner "file" {
    source      = "../../ansible"
    destination = "/home/ubuntu/ansible"
  }

  # provisioner "remote-exec" {
  #   inline = [
  #     "sudo apt update",
  #     "sudo apt-add-repository ppa:ansible/ansible",
  #     "sudo apt -y install ansible",
  #     "ansible-playbook --connection=local /home/ubuntu/ansible/playbook.yml"
  #   ]
  # }
}