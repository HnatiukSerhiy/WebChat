using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;
using WebApp.Utilities;

namespace WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserDataProvider userDataProvider;

    public UserController(IUserDataProvider userDataProvider)
    {
        this.userDataProvider = userDataProvider;
    }

    [HttpGet]
    [Authorize(ClaimType.Email)]
    [Route("GetAll")]
    public ActionResult<User> GetAll()
    {
        var users = userDataProvider.GetById(0);
        return Ok(users);
    }
}