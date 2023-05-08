using WebApp.Business.Models;

namespace WebApp.Business.Interfaces;

public interface ISessionDataProvider
{
    Session Add(Session model);

    Session GetBySessionId(string sessionId);

    Session UpdateRefreshToken(RefreshToken token, string sessionId);

    void Delete(string sessionId);
}