output "subnet_id" {
  description = "ID the subnet"
  value       = aws_subnet.subnet_pub_refinancy.id

}

output "security_group_id" {
  description = "ID the security group"
  value       = aws_security_group.allow_tls_refinancy.id
}