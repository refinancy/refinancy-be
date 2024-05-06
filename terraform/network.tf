resource "aws_vpc" "vpc_refinancy" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name  = "VPC do app Refinancy"
    Owner = "Refinancy-tf"
  }
}

resource "aws_subnet" "subnet_pub_refinancy" {

  vpc_id     = aws_vpc.vpc_refinancy.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name  = "Subnet Public refinancy"
    Owner = "Refinancy-tf"
  }
}

resource "aws_route_table" "route_table_pub" {
  vpc_id = aws_vpc.vpc_refinancy.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw_refinancy.id
  }
  tags = {
    Name  = "Route Table Public Refinancy"
    Owner = "Refinancy-tf"
  }
}

resource "aws_internet_gateway" "igw_refinancy" {
  vpc_id = aws_vpc.vpc_refinancy.id

  tags = {
    Name  = "Internet Gateway Refinancy"
    Owner = "Refinancy-tf"
  }
}

resource "aws_route_table_association" "table_ass_public" {
  subnet_id      = aws_subnet.subnet_pub_refinancy.id
  route_table_id = aws_route_table.route_table_pub.id
}
resource "aws_eip" "nat_eip" {
  domain     = "vpc"
  depends_on = [aws_internet_gateway.igw_refinancy]

  tags = {
    Name  = "NAT IP Elastic"
    Owner = "Refinancy-tf"
  }
}