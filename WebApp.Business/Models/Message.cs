namespace WebApp.Business.Models;

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

    public SubscriptionMessageResponse() { }
    public SubscriptionMessageResponse(string chatId) => ChatId = chatId;

    public SubscriptionMessageResponse BuildFromMessage(Message message)
    {
        return new()
        {
            Id = message.Id,
            Value = message.Value,
            SenderId = message.SenderId,
            ReceiverId = message.ReceiverId,
        };
    }
}