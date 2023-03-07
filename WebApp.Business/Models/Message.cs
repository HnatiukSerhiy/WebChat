namespace WebApp.Business.Models;

public class Message
{
    public long Id { set; get; }
    public string Value { set; get; } = string.Empty;
    public int SenderId { set; get; } = new();
    public int ReceiverId { set; get; } = new();
}