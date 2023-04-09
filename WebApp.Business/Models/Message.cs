﻿namespace WebApp.Business.Models;

public class Message
{
    public long Id { set; get; }
    public string Value { set; get; } = string.Empty;
    public int SenderId { set; get; }
    public int ReceiverId { set; get; }
}

public class SubscriptionMessageResponse
{
    public long Id { set; get; }
    public string Value { set; get; } = string.Empty;
    public int SenderId { set; get; }
    public int ReceiverId { set; get; }
    public string ChatId { set; get; }

}