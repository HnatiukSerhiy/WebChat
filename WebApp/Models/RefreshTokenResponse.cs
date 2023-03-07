using WebApp.Business.Models;

namespace WebApp.Models;

public class RefreshTokenResponse
{
    public string AccessToken { set; get; } = string.Empty;
    public string RefreshToken { set; get; } = string.Empty;
    public User User { set; get; } = new();
}