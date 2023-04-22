using WebApp.Interfaces;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using AutoMapper;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;
using WebApp.Extensions;
using WebApp.GraphApi.Types.Messages;
using WebApp.Models;

namespace WebApp.Services;

public class ChatService : IChatService
{
    private static Subject<Event> broadcaster = new();
    private readonly IMessagesDataProvider messagesDataProvider;
    private readonly IMapper mapper;

    public ChatService(IMapper mapper, IMessagesDataProvider messagesDataProvider)
    {
        this.mapper = mapper;
        this.messagesDataProvider = messagesDataProvider;
    }

    public IEnumerable<Message> GetChatMessages(int senderId, int receiverId)
        => messagesDataProvider.GetChatMessages(senderId, receiverId);

    public IEnumerable<Message> GetMessagesForUser(int userId)
        => messagesDataProvider.GetMessagesForUser(userId);

    public IList<Chat> GetChats(int userId)
    {
        var messages = messagesDataProvider.GetMessagesForUser(userId);
        var groups = messages.GroupBy(message => GetChatKey(userId, message.SenderId, message.ReceiverId)).ToArray();

        var chats = new List<Chat>();
        groups.Iterate(group =>
        {
            var sortedMessages = group.OrderBy(message => message.SentDate);
            string chatId = group.Key;
            chats.Add(new(chatId, sortedMessages));
        });

        return chats;
    }

    public Chat PostMessage(MessageInput input)
    {
        var message = mapper.Map<Message>(input);
        long postedMessageId = messagesDataProvider.Save(message);
        var postedMessage = messagesDataProvider.GetById(postedMessageId);

        var chat = new Chat()
        {
            Id = GetChatKey(input.SenderId, message.SenderId, message.ReceiverId),
            Messages = new[] {postedMessage}
        };

        broadcaster.OnNext(new Event() { Type = EventType.NewMessage, Message = postedMessage });

        return chat;
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
                        CurrentUserId = receiverId,
                        SenderId = message.SenderId,
                        ReceiverId = message.ReceiverId,
                    };
                });
    }

    public IObservable<Event> SubscribeEvents() => broadcaster;

    private string GetChatKey(int currentUserId, int senderId, int receiverId)
    {
        if (currentUserId == senderId)
            return $"{senderId}_{receiverId}_key";

        return $"{receiverId}_{senderId}_key";
    }
}