using WebApp.Interfaces;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using AutoMapper;
using WebApp.GraphApi.Types.Messages;
using WebApp.Models;

namespace WebApp.Services;

public class ChatService : IChatService
{
    private readonly Subject<Event> broadcaster = new();

    private readonly IMapper mapper;

    public ChatService(IMapper mapper)
    {
        this.mapper = mapper;
    }

    public string? DeleteMessage(int id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Message> GetAllMessages()
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Message> GetMessageFromUser(string from)
    {
        throw new NotImplementedException();
    }

    public Message PostMessage(MessageInput input)
    {
        var message = mapper.Map<Message>(input);
        broadcaster.OnNext(new Event() { Type = EventType.NewMessage, Message = message });
        return message;
    }

    public IObservable<Message> SubscribeAll()
    {
        return broadcaster.Where(x => x.Type == EventType.NewMessage).Select(x => x.Message!);
    }

    public IObservable<Event> SubscribeEvents() => broadcaster;

    public IObservable<Message> SubscribeFromUser(string from)
    {
        throw new Exception();
        // return SubscribeAll().Where(x => string.Equals(x.From, from, StringComparison.OrdinalIgnoreCase));
    }
}