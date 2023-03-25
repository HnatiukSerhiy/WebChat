using WebApp.Business.Models;

namespace WebApp.Services;

public class Event
{
    public EventType? Type { set; get; }
    public Message? Message { set; get; }

    public string ChatId { set; get; }

    public Event(EventType type, Message message, string chatId)
    {
        Type = type;
        Message = message;
        ChatId = chatId;
    }
}