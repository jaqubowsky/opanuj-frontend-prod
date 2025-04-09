resource "aws_s3_bucket" "opanujfrontend-bucket" {
  bucket = var.s3_bucket_name

  tags = {
    Environment = var.environment
  }
}

resource "aws_s3_bucket_ownership_controls" "opanujfrontend-bucket_controls" {
  bucket = aws_s3_bucket.opanujfrontend-bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_versioning" "opanujfrontend-bucket_versioning" {
  bucket = aws_s3_bucket.opanujfrontend-bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "opanujfrontend-bucket_access" {
  bucket = aws_s3_bucket.opanujfrontend-bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "opanujfrontend-bucket_policy" {
  bucket = aws_s3_bucket.opanujfrontend-bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipalGetObject"
        Effect    = "Allow"
        Principal = { Service = "cloudfront.amazonaws.com" }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.opanujfrontend-bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      }
    ]
  })

  depends_on = [aws_cloudfront_distribution.s3_distribution]
}


resource "aws_s3_bucket_server_side_encryption_configuration" "opanujfrontend-bucket_sse" {
  bucket = aws_s3_bucket.opanujfrontend-bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
