using System.Collections;
using WebApp.Business.Models;
using WebApp.GraphApi.Types.Messages;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Interfaces;

public interface IChatService
{
    IEnumerable<Message> GetChatMessages(int senderId, int receiverId);

    IEnumerable<Message> GetMessagesForUser(int userId);

    IEnumerable<Chat> GetChats(int userId);

    Message PostMessage(MessageInput input);

    IObservable<Message> SubscribeAll();

    IObservable<Event> SubscribeEvents();

    IObservable<SubscriptionMessageResponse> SubscribeForReceiving(int receiverId);
}