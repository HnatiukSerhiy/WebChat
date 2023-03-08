using AutoMapper;
using WebApp.Business.Models;
using WebApp.GraphApi.Types.Messages;
using WebApp.Models;

namespace WebApp.Mapper;

public class MessageProfile : Profile
{
    public MessageProfile()
    {
        CreateMap<MessageInput, Message>()
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Message));
    }
}