using System.Security.Authentication;
using System.Security.Claims;
using System.Transactions;
using AutoMapper;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;
using WebApp.Interfaces;
using WebApp.Models;
using WebApp.Utilities;
using BCryptNet = BCrypt.Net.BCrypt;

namespace WebApp.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IUserDataProvider userDataProvider;
    private readonly ISessionDataProvider sessionDataProvider;
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly ITokenService tokenService;
    private readonly IMapper mapper;

    public AuthenticationService(
        IUserDataProvider userDataProvider,
        ISessionDataProvider sessionDataProvider,
        IHttpContextAccessor httpContextAccessor,
        ITokenService tokenService,
        IMapper mapper)
    {
        this.tokenService = tokenService;
        this.userDataProvider = userDataProvider;
        this.sessionDataProvider = sessionDataProvider;
        this.httpContextAccessor = httpContextAccessor;
        this.mapper = mapper;
    }

    public UserRegisterResponse Register(UserRegisterInput registerInput)
    {
        registerInput.Password = BCryptNet.HashPassword(registerInput.Password);;
        var model = mapper.Map<User>(registerInput);

        using var scope = new TransactionScope();

        var user = userDataProvider.Add(model);
        var (session, refreshToken, claims) = BuildAuthProperties(user);
        sessionDataProvider.Add(session);

        scope.Complete();

        return new(user, tokenService.CreateAccessToken(claims), refreshToken);
    }

    public UserLoginResponse Login(UserLoginInput input)
    {
        var accessToken = TryGetTokenFromHeader("Authorization");
        if (accessToken is not null)
            throw new AuthenticationException("User already login");

        var currentUser = userDataProvider.GetByEmail(input.Email);
        var isPasswordValid = BCryptNet.Verify(input.Password, currentUser?.Password);

        if (currentUser is null || !isPasswordValid)
            throw new InvalidCredentialException("Email or password incorrect");

        var (session, refreshToken, claims) = BuildAuthProperties(currentUser);
        sessionDataProvider.Add(session);

        return new(currentUser, tokenService.CreateAccessToken(claims), refreshToken);
    }

    public RefreshTokenResponse RefreshToken()
    {
        var accessToken = TryGetTokenFromHeader("Authorization");
        var refreshToken = TryGetTokenFromHeader("Refresh-Token");

        if (accessToken is null || refreshToken is null)
            throw new InvalidCredentialException("Auth not valid");

        string? claim = TryGetValueFromToken(accessToken!, c => c.Type == ClaimType.UserId);
        string? sessionId = TryGetValueFromToken(accessToken!, c => c.Type == ClaimType.SessionId)!;
        int userId = int.Parse(claim!);

        var currentRefreshToken = sessionDataProvider.GetBySessionId(sessionId).RefreshToken;

        if (refreshToken != currentRefreshToken.Token || currentRefreshToken.Expires < DateTime.Now)
            throw new InvalidCredentialException("Invalid credentials");

        var user = userDataProvider.GetById(userId);
        var claims = BuildClaims(user, sessionId);
        var newRefreshToken = tokenService.CreateRefreshToken();
        var newAccessToken = tokenService.CreateAccessToken(claims);

        sessionDataProvider.UpdateRefreshToken(newRefreshToken, sessionId);

        return new()
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
        };
    }

    public void Logout()
    {
        var accessToken = TryGetTokenFromHeader("accessToken")!;
        var sessionId = TryGetValueFromToken(accessToken, claim => claim.Type == ClaimType.SessionId);

        sessionDataProvider.Delete(sessionId!);
    }

    private string? TryGetValueFromToken(string accessToken, Func<Claim, bool> valueTypeCallback)
    {
        var claim = tokenService.GetClaimsPrincipal(accessToken).Claims
            .Where(valueTypeCallback)
            .Select(c => c.Value)
            .SingleOrDefault();

        return claim;
    }

    private AuthData BuildAuthProperties(User user)
    {
        string sessionId = Guid.NewGuid().ToString();
        var refreshToken = tokenService.CreateRefreshToken();
        var claims = BuildClaims(user, sessionId);

        var session = new Session()
        {
            Id = sessionId,
            UserId = user.Id,
            RefreshToken = refreshToken,
        };

        return new(session, refreshToken, claims);
    }

    private string? TryGetTokenFromHeader(string key)
    {
        string? header = httpContextAccessor.HttpContext!.Request.Headers[key];

        if (header?.StartsWith("Bearer") ?? false)
            return header.Substring(7);

        return header;
    }

    private List<Claim> BuildClaims(User user, string sessionId) => new()
    {
        new(ClaimType.UserId, user.Id.ToString()),
        new(ClaimType.Email, user.Email),
        new(ClaimType.SessionId, sessionId),
    };

    private class AuthData
    {
        public Session Session { set; get; }
        public RefreshToken RefreshToken { set; get; }
        public List<Claim> Claims { set; get; }

        public AuthData(Session session, RefreshToken refreshToken, List<Claim> claims)
        {
            Session = session;
            RefreshToken = refreshToken;
            Claims = claims;
        }

        public void Deconstruct(out Session session, out RefreshToken refreshToken, out List<Claim> claims)
        {
            session = Session;
            refreshToken = RefreshToken;
            claims = Claims;
        }
    }
}

