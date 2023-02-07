using WebApp.Business.Models;

namespace WebApp.Models;

public class UserLoginResponse
{
    public User User { set; get; } = new();
    public string AccessToken { set; get; } = string.Empty;
    public RefreshToken RefreshToken = new();
}