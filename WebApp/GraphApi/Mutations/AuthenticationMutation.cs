using GraphQL;
using WebApp.Interfaces;
using WebApp.Models;

namespace WebApp.GraphApi.Mutations;

public class AuthenticationMutation
{
    public static UserRegisterResponse Register(
        [FromServices] IAuthenticationService authenticationService,
        UserRegisterInput input)
    {
        return authenticationService.Register(input);
    }

    public static UserLoginResponse Login(
        [FromServices] IAuthenticationService authenticationService,
        UserLoginInput input)
    {
        return authenticationService.Login(input);
    }

    public static RefreshTokenResponse Refresh([FromServices] IAuthenticationService authenticationService)
        => authenticationService.RefreshToken();

    public static string Logout([FromServices] IAuthenticationService authenticationService)
    {
        authenticationService.Logout();
        return string.Empty;
    }
}
