using AutoMapper;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;
using WebApp.EntityFramework.DataContexts;
using WebApp.EntityFramework.Entities;
using WebApp.EntityFramework.Mapper;

namespace WebApp.EntityFramework.DataProviders;

public class EntityFrameworkSessionDataProvider : ISessionDataProvider
{
    private readonly DataContext dataContext;
    private readonly IMapper mapper;

    public EntityFrameworkSessionDataProvider(DataContext dataContext)
    {
        this.dataContext = dataContext;
        mapper = new MapperSetup().Mapper;
    }

    public Session Add(Session model)
    {
        var entity = mapper.Map<SessionEntity>(model);
        var newEntity = dataContext.Sessions.Add(entity).Entity;
        dataContext.SaveChanges();
        return mapper.Map<Session>(newEntity);
    }

    public Session GetByUserId(int userId)
    {
        var entity = dataContext.Sessions.First(session => session.UserId == userId);
        return mapper.Map<Session>(entity);
    }

    public Session GetBySessionId(string sessionId)
    {
        var entity = dataContext.Sessions.First(session => session.Id == sessionId);
        return mapper.Map<Session>(entity);
    }

    public Session UpdateRefreshToken(RefreshToken token, string sessionId)
    {
        var currentEntity = dataContext.Sessions.First(session => session.Id == sessionId);
        currentEntity.RefreshToken = token.Token;
        currentEntity.Expires = token.Expires;

        var updatedEntity = dataContext.Sessions.Update(currentEntity).Entity;
        dataContext.SaveChanges();
        return mapper.Map<Session>(updatedEntity);
    }

    public void Delete(string sessionId)
    {
        var session = dataContext.Sessions.First(session => session.Id == sessionId);
        dataContext.Sessions.Remove(session);
        dataContext.SaveChanges();
    }
}