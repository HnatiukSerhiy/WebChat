namespace WebApp.GraphApi.Types.Messages;

public class MessageInput
{
    public string Value { set; get; }

    public int SenderId { set; get; }

    public int ReceiverId { set; get; }

    public MessageInput(string value, int senderId, int receiverId)
    {
        Value = value;
        ReceiverId = receiverId;
        SenderId = senderId;
    }
}