using WebApp.Business.Models;

namespace WebApp.Models;

public class UserLoginResponse
{
    public User User { set; get; }
    public string AccessToken { set; get; }
    public RefreshToken RefreshToken { set; get; }

    public UserLoginResponse(User user, string accessToken, RefreshToken refreshToken)
    {
        User = user;
        AccessToken = accessToken;
        RefreshToken = refreshToken;
    }

    public UserLoginResponse()
    {
        User = new();
        AccessToken = string.Empty;
        RefreshToken = new();
    }
}