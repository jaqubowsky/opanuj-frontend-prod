resource "aws_sns_topic" "alarm_notifications" {
  name = "${var.name}-error-notifications"
}

resource "aws_sns_topic_subscription" "email_subscription" {
  topic_arn = aws_sns_topic.alarm_notifications.arn
  protocol  = "email"
  endpoint  = var.notification_email
}

resource "aws_cloudwatch_metric_alarm" "alarm" {
  alarm_name          = "${var.name}-error-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  period              = 600
  metric_name         = var.metric_name
  namespace           = var.metric_namespace
  statistic           = "Sum"
  threshold           = var.error_threshold
  alarm_description   = "Triggers when too many frontend errors occur"
  dimensions          = var.metric_dimensions

  alarm_actions = [aws_sns_topic.alarm_notifications.arn]
}
