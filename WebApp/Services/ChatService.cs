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

    public async Task<List<Chat>> GetChats(int userId)
    {
        var tasks = new List<Task<List<Chat>>>();
        var messages = messagesDataProvider.GetMessagesForUser(userId).ToList();

        var chats = new List<Chat>();
        var groups = messages.GroupBy(message => GetGroupingKey(userId, message.SenderId, message.ReceiverId));

        foreach (var group in groups)
        {
            var sortedMessages = group.OrderBy(message => message.SentDate);
            string chatId = Guid.NewGuid().ToString();
            chats.Add(new(chatId, sortedMessages));
        }

        return chats;
    }

    public Message PostMessage(MessageInput input)
    {
        var message = mapper.Map<Message>(input);
        broadcaster.OnNext(new(EventType.NewMessage, message));

        long postedMessageId = messagesDataProvider.Save(message);
        return messagesDataProvider.GetById(postedMessageId);
    }

    public IObservable<Message> SubscribeAll()
    {
        return broadcaster.Where(x => x.Type == EventType.NewMessage).Select(x => x.Message!);
    }

    public IObservable<SubscriptionMessageResponse> SubscribeForReceiving(int receiverId)
    {
        return broadcaster.Where(x => x.Type == EventType.NewMessage)
                .Where(x => x.Message?.ReceiverId == receiverId)
                .Select(e =>
                {
                    var message = e.Message;
                    return new SubscriptionMessageResponse()
                    {
                        Id = message!.Id,
                        Value = message.Value,
                        SenderId = message.SenderId,
                        ReceiverId = message.ReceiverId,
                    };
                });
    }

    public IObservable<Event> SubscribeEvents() => broadcaster;

    private string GetGroupingKey(int currentUserId, int senderId, int receiverId)
    {
        if (currentUserId == senderId)
            return $"{senderId}_{receiverId}";

        return $"{receiverId}_{senderId}";
    }
}