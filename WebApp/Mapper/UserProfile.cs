using AutoMapper;
using WebApp.Business.Models;
using WebApp.Models;

namespace WebApp.Mapper;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserRegisterInput>().ReverseMap();
    }
}