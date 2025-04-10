resource "aws_instance" "opanujfrontend-ec" {

  ami           = var.ami
  instance_type = var.type

  tags = {
    Environment = var.environment
  }
}
