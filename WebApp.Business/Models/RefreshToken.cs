namespace WebApp.Business.Models;
public class RefreshToken
{
    public string Token { set; get; } = string.Empty;
    public DateTime Expires { set; get; } = new();
}