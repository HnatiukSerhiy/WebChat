using AutoMapper;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;
using WebApp.EntityFramework.DataContexts;
using WebApp.EntityFramework.Entities;
using WebApp.EntityFramework.Mapper;

namespace WebApp.EntityFramework.DataProviders;

public class EntityFrameworkUserDataProvider : IUserDataProvider
{
    private readonly DataContext dataContext;
    private readonly IMapper mapper;

    public EntityFrameworkUserDataProvider(DataContext dataContext)
    {
        this.dataContext = dataContext;
        mapper = new MapperSetup().Mapper;
    }

    public List<User> GetAllUsers() => dataContext.Users
            .Select(user => mapper.Map<User>(user))
            .ToList();

    public User Add(User model)
    {
        var entity = mapper.Map<UserEntity>(model);
        var newEntity = dataContext.Users.Add(entity).Entity;
        dataContext.SaveChanges();
        return mapper.Map<User>(newEntity);
    }

    public User GetByEmail(string email)
    {
        var entity = dataContext.Users.First(user => user.Email == email);
        return mapper.Map<User>(entity);
    }

    public User GetById(int id)
    {
        var entity = dataContext.Users.First(user => user.Id == id);
        return mapper.Map<User>(entity);
    }
}