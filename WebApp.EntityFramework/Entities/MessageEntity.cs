namespace WebApp.EntityFramework.Entities;

public class MessageEntity
{
    public long Id { set; get; }
    public string Value { set; get; } = string.Empty;
    public int SenderId { set; get; }
    public int ReceiverId { set; get; }

    public DateTime SentDate { set; get; }
}