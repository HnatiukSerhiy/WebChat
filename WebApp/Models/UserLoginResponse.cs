using WebApp.Business.Models;

namespace WebApp.Models;

public class UserLoginResponse
{
    public User User { set; get; }
    public string AccessToken { set; get; }
    public string RefreshToken { set; get; }

    public UserLoginResponse(User user, string accessToken, string refreshToken)
    {
        User = user;
        AccessToken = accessToken;
        RefreshToken = refreshToken;
    }

    public UserLoginResponse()
    {
        User = new();
        AccessToken = string.Empty;
        RefreshToken = string.Empty;
    }
}