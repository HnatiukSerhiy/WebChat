using AutoMapper;
using WebApp.EntityFramework.Mapper.Profiles;

namespace WebApp.EntityFramework.Mapper;

public class MapperSetup
{
    public readonly IMapper Mapper;

    public MapperSetup()
    {
        var configuration = new MapperConfiguration(config =>
        {
            config.AddProfile<UserProfile>();
            config.AddProfile<SessionProfile>();
            config.AddProfile<MessagesProfile>();
        });

        Mapper = configuration.CreateMapper();
    }

}