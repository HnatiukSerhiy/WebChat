namespace WebApp.GraphApi.Types.Messages;

public class MessageInput
{
    public string Message { set; get; }
    public string ChatId { set; get; }

    public MessageInput(string message, string chatId)
    {
        Message = message;
        ChatId = chatId;
    }
}