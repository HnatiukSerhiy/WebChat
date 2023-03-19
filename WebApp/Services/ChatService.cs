using WebApp.Interfaces;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using AutoMapper;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;
using WebApp.GraphApi.Types.Messages;
using WebApp.Models;

namespace WebApp.Services;

public class ChatService : IChatService
{
    private readonly Subject<Event> broadcaster;
    private readonly IMessagesDataProvider messagesDataProvider;
    private readonly IMapper mapper;

    public ChatService(IMapper mapper, IMessagesDataProvider messagesDataProvider)
    {
        this.mapper = mapper;
        this.messagesDataProvider = messagesDataProvider;
        broadcaster = new();
    }

    public IEnumerable<Message> GetChatMessages(int senderId, int receiverId)
        => messagesDataProvider.GetChatMessages(senderId, receiverId);

    public IEnumerable<Message> GetMessagesForUser(int userId)
        => messagesDataProvider.GetMessagesForUser(userId);

    public IEnumerable<Chat> GetChats(int userId)
    {
        var messages = messagesDataProvider.GetMessagesForUser(userId).ToArray();
        var usersIds = new List<int>();
        var chats = new List<Chat>();

        foreach (var message in messages)
        {
            if (message.SenderId != userId)
                usersIds.Add(message.SenderId);

            if (message.ReceiverId != userId)
                usersIds.Add(message.ReceiverId);
        }

        foreach (var id in usersIds)
        {
            var chatMessages = messages.Where(message =>
                message.ReceiverId == id && message.SenderId == userId ||
                message.SenderId == id && message.ReceiverId == userId);

            chats.Add(new($"{id}_{userId}", chatMessages));
        }

        return chats;
    }

    public Message PostMessage(MessageInput input)
    {
        var message = mapper.Map<Message>(input);
        broadcaster.OnNext(new(EventType.NewMessage, message));
        return message;
    }

    public IObservable<Message> SubscribeAll()
    {
        return broadcaster.Where(x => x.Type == EventType.NewMessage).Select(x => x.Message!);
    }

    public IObservable<Message> SubscribeForReceiving(int receiverId)
    {
        return broadcaster.Where(x => x.Type == EventType.NewMessage)
            .Select(x => x.Message!)
            .Where(x => x.ReceiverId == receiverId);
    }

    public IObservable<Event> SubscribeEvents() => broadcaster;
}