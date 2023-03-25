using WebApp.Business.Models;

namespace WebApp.Models;

public class Chat
{
    public string Id { set; get; }

    public IEnumerable<Message> Messages { set; get; }

    public Chat(string id, IEnumerable<Message> messages)
    {
        Id = id;
        Messages = messages;
    }
}
