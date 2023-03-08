using AutoMapper;
using WebApp.Business.Models;
using WebApp.EntityFramework.Entities;

namespace WebApp.EntityFramework.Mapper.Profiles;

public class MessagesProfile : Profile
{
    public MessagesProfile()
    {
        CreateMap<Message, MessageEntity>().ReverseMap();
    }
}