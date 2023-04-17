using WebApp.Business.Models;

namespace WebApp.Business.Interfaces;

public interface IMessagesDataProvider
{
    IEnumerable<Message> GetFromUser(int userId);

    IEnumerable<Message> GetChatMessages(int senderId, int receiverId);

    IEnumerable<Message> GetMessagesForUser(int userId);

    Message GetById(long id);

    long Save(Message message);
}