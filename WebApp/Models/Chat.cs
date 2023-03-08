using WebApp.Business.Models;

namespace WebApp.Models;

public class Chat
{
    public string Id { set; get; } // Based on chat participants

    public IEnumerable<Message> Messages { set; get; }

    public Chat(string id, IEnumerable<Message> messages)
    {
        Id = id;
        Messages = messages;
    }
}
