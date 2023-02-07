namespace WebApp.Business.Models;

public class Session
{
    public string Id { set; get; } = string.Empty;
    public int UserId { set; get; }
    public RefreshToken RefreshToken { set; get; } = new();
}