using WebApp.Business.Models;

namespace WebApp.Models;

public class RefreshTokenResponse
{
    public string AccessToken { set; get; } = string.Empty;
    public RefreshToken RefreshToken { set; get; } = new();
}