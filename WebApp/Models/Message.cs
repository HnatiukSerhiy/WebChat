namespace WebApp.Models;

public class Message
{
    public string Value { set; get; }

    public Message(string message)
    {
        Value = message;
    }
}