using AutoMapper;
using WebApp.Business.Models;
using WebApp.EntityFramework.Entities;

namespace WebApp.EntityFramework.Mapper.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserEntity>().ReverseMap();
    }
}