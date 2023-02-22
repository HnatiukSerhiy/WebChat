using WebApp.GraphApi.Types.Messages;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Interfaces;

public interface IChatService
{
    string? DeleteMessage(int id);
    IEnumerable<Message> GetAllMessages();
    IEnumerable<Message> GetMessageFromUser(string from);
    Message PostMessage(MessageInput input);
    IObservable<Message> SubscribeAll();
    IObservable<Event> SubscribeEvents();
    IObservable<Message> SubscribeFromUser(string from);
}