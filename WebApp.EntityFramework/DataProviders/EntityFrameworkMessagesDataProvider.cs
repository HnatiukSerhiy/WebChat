using AutoMapper;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;
using WebApp.EntityFramework.DataContexts;
using WebApp.EntityFramework.Entities;
using WebApp.EntityFramework.Mapper;

namespace WebApp.EntityFramework.DataProviders;

public class EntityFrameworkMessageDataProvider : IMessagesDataProvider
{
    private readonly DataContext dataContext;
    private readonly IMapper mapper;

    public EntityFrameworkMessageDataProvider(DataContext dataContext)
    {
        this.dataContext = dataContext;
        mapper = new MapperSetup().Mapper;
    }

    public IEnumerable<Message> GetChatMessages(int senderId, int receiverId)
    {
        return dataContext.Messages
            .Where(message =>
                message.SenderId == senderId &&
                message.ReceiverId == receiverId ||
                message.ReceiverId == senderId &&
                message.SenderId == receiverId)
            .Select(message => mapper.Map<Message>(message));
    }

    public IEnumerable<Message> GetMessagesForUser(int userId)
    {
        return dataContext.Messages
            .Where(message => message.SenderId == userId || message.ReceiverId == userId)
            .Select(message => mapper.Map<Message>(message));
    }

    public IEnumerable<Message> GetFromUser(int userId)
    {
        return dataContext.Messages
            .Where(message => message.SenderId == userId)
            .Select(message => mapper.Map<Message>(message));
    }

    public long Save(Message message)
    {
        var entity = mapper.Map<MessageEntity>(message);
        return dataContext.Messages.Add(entity).Entity.Id;
    }
}