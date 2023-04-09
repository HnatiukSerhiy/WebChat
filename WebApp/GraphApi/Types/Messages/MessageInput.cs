namespace WebApp.GraphApi.Types.Messages;

public class MessageInput
{
    public string Value { set; get; }
    public string ChatId { set; get; }

    public MessageInput(string value, string chatId)
    {
        Value = value;
        ChatId = chatId;
    }
}