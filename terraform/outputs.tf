output "public_ip" {
  description = "Public IP of the App Server"
  value       = aws_instance.app_server.public_ip
}

output "frontend_url" {
  description = "URL to access the Frontend"
  value       = "http://3.91.209.132:5174"
}

output "backend_url" {
  description = "URL to access the Backend"
  value       = "http://3.91.209.132:5050"
}

output "ssh_command" {
  description = "Command to SSH into the server"
  value       = "ssh -i ${var.key_name}.pem ec2-user@${aws_instance.app_server.public_ip}"
}
