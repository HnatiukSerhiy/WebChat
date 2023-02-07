using Microsoft.AspNetCore.Mvc;
using WebApp.HttpModels;
using WebApp.Interfaces;
using WebApp.Models;

namespace WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
        this.authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("register")]
    public ActionResult<Response<UserRegisterResponse>> Register(UserRegisterInput input)
    {
        var response = new Response<UserRegisterResponse>(authenticationService.Register(input));
        return Ok(response);
    }

    [HttpPost]
    [Route("login")]
    public ActionResult<Response<UserLoginResponse>> Login(UserLoginInput input)
    {
        var response = new Response<UserLoginResponse>(authenticationService.Login(input));
        return Ok(response);
    }

    [HttpPost]
    [Route("refresh")]
    public ActionResult<Response<RefreshTokenResponse>> Refresh()
    {
        var response = new Response<RefreshTokenResponse>(authenticationService.RefreshToken());
        return Ok(response);
    }

    [HttpPost]
    [Route("logout")]
    public ActionResult Logout()
    {
        authenticationService.Logout();
        return Ok();
    }
}