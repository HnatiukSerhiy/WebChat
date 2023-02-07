using AutoMapper;
using WebApp.Business.Models;
using WebApp.EntityFramework.Entities;

namespace WebApp.EntityFramework.Mapper.Profiles;

public class SessionProfile : Profile
{
    public SessionProfile()
    {
        CreateMap<Session, SessionEntity>()
            .ForMember(dest => dest.RefreshToken,
                opt =>
                    opt.MapFrom(source => source.RefreshToken.Token))
            .ForMember(dest => dest.Expires,
                opt =>
                    opt.MapFrom(source => source.RefreshToken.Expires));

        CreateMap<SessionEntity, Session>()
            .ForPath(dest => dest.RefreshToken.Token,
                opt=>
                    opt.MapFrom(source => source.RefreshToken))
            .ForPath(dest => dest.RefreshToken.Expires,
                opt =>
                    opt.MapFrom(source => source.Expires));
    }
}