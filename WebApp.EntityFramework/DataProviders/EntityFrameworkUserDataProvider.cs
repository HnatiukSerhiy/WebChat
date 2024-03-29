﻿using AutoMapper;
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

    public IEnumerable<User> GetAllUsers() => dataContext.Users
            .Select(user => mapper.Map<User>(user))
            .ToList();

    public User Add(User model)
    {
        var entity = mapper.Map<UserEntity>(model);
        var newEntity = dataContext.Users.Add(entity).Entity;

        dataContext.SaveChanges();

        return mapper.Map<User>(newEntity);
    }

    public IEnumerable<User> GetByNamePattern(string? pattern)
    {
        Func<UserEntity, bool> predicate = user =>
        {
            if (pattern is null)
                return false;

            return (user.Firstname.ToLower() + " " + user.Lastname.ToLower())
                .Contains(pattern.ToLower());
        };

        return dataContext.Users
            .Where(predicate)
            .Select(user => mapper.Map<User>(user));
    }

    public User GetByEmail(string email)
    {
        var entity = dataContext.Users.FirstOrDefault(user => user.Email == email);
        return mapper.Map<User>(entity);
    }

    public User GetById(int id)
    {
        var entity = dataContext.Users.FirstOrDefault(user => user.Id == id);
        return mapper.Map<User>(entity);
    }
}