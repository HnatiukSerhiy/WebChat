using WebApp.Business.Models;

namespace WebApp.Models;

public class UserRegisterResponse
{
    public User User { set; get; }
    public string AccessToken { set; get; }
    public string RefreshToken { set; get; }

    public UserRegisterResponse(User user, string accessToken, string refreshToken)
    {
        User = user;
        AccessToken = accessToken;
        RefreshToken = refreshToken;
    }

    public UserRegisterResponse()
    {
        User = new();
        AccessToken = string.Empty;
        RefreshToken = string.Empty;
    }
}