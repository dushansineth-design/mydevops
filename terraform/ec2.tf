# Dynamically find the latest Amazon Linux 2023 AMI
# This works automatically in ANY region (us-east-1, ap-south-1, etc.)
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux_2023.id 
  instance_type = var.instance_type
  key_name      = var.key_name

  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              
              # Update system (Amazon Linux uses dnf, NOT apt)
              dnf update -y
              
              # Install Docker & Git
              dnf install -y docker git
              
              # Start Docker
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user

              # Install Docker Compose (V2)
              mkdir -p /usr/local/lib/docker/cli-plugins
              curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
              chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

              # Install Docker Buildx (Required for 'docker compose build')
              # Using specific version v0.19.0 to satisfy requirement >= 0.17.0
              curl -SL https://github.com/docker/buildx/releases/download/v0.19.0/buildx-v0.19.0.linux-amd64 -o /usr/local/lib/docker/cli-plugins/docker-buildx
              chmod +x /usr/local/lib/docker/cli-plugins/docker-buildx
              
              # Clone Project (Amazon Linux uses 'ec2-user')
              cd /home/ec2-user
              git clone https://github.com/dushansineth-design/mydevops.git
              cd mydevops
              
              # Set permission for Docker socket
              chmod 666 /var/run/docker.sock
              
              # IMPORTANT: Set the API fix variable and start containers
              export DOCKER_API_VERSION=1.44
              docker compose up --build -d
              
              EOF

  tags = {
    Name = "${var.project_name}-server"
  }
}
