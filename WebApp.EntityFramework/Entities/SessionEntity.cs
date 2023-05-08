namespace WebApp.EntityFramework.Entities;

public class SessionEntity
{
    public string Id { set; get; } = string.Empty;

    public int UserId { set; get; }
    public string RefreshToken { set; get; } = string.Empty;
    public DateTime Expires { set; get; }
}