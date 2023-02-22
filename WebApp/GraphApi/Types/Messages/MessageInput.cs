namespace WebApp.GraphApi.Types.Messages;

public class MessageInput
{
    public string Message { set; get; }

    public MessageInput(string message)
    {
        Message = message;
    }
}