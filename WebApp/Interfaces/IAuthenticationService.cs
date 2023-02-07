using WebApp.Models;

namespace WebApp.Interfaces
{
    public interface IAuthenticationService
    {
        UserRegisterResponse Register(UserRegisterInput registerInput);
        UserLoginResponse Login(UserLoginInput input);
        RefreshTokenResponse RefreshToken();
        void Logout();
    }
}
