using System.Security.Claims;
using WebApp.Business.Models;

namespace WebApp.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(List<Claim> claims);
        ClaimsPrincipal GetClaimsPrincipal(string token);
        RefreshToken CreateRefreshToken();
    }
}
