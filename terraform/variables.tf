variable "aws_region" {
  description = "AWS Region to deploy to"
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 Instance Type"
  default     = "t3.micro" // t2.micro might be too small for building Docker images
}

variable "key_name" {
  description = "Name of the SSH key pair in AWS"
  type        = string
  default     = "primenova" // Change this to your actual key name
}

variable "project_name" {
  description = "Project Name"
  default     = "mydevops-mern"
}
