using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebApp.Business.Models;
using WebApp.Interfaces;
using WebApp.Models;

namespace WebApp.Services
{
    public class JwtTokenService : ITokenService
    {
        private readonly IConfiguration configuration;

        public JwtTokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string CreateAccessToken(List<Claim> claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(int.Parse(configuration["Jwt:AccessTokenExpires"]!)),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public ClaimsPrincipal GetClaimsPrincipal(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                ValidAudience = configuration["Jwt:Issuer"],
                ValidIssuer = configuration["Jwt:Audience"],
                RequireSignedTokens = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)),
                RequireExpirationTime = false,
                ValidateLifetime = false
            };

            var principal = new JwtSecurityTokenHandler().ValidateToken(token, tokenValidationParameters, out var securityToken);
            var jwtSecurityToken = (JwtSecurityToken)securityToken;

            bool isAlgMatch = jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase
            );

            if (jwtSecurityToken == null || !isAlgMatch)
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

        public RefreshToken CreateRefreshToken()
        {
            var expires = DateTime.Now.AddDays(int.Parse(configuration["Jwt:RefreshTokenExpires"]!));
            var token = GenerateRandomString(64);

            return new()
            {
                Token = token,
                Expires = expires
            };
        }

        private string GenerateRandomString(int length)
        {
            string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var result = string.Empty;

            using var randomNumberGenerator = RandomNumberGenerator.Create();
            while (result.Length != length)
            {
                byte[] oneByte = new byte[1];
                randomNumberGenerator.GetBytes(oneByte);

                char character = (char) oneByte[0];

                if (chars.Contains(character))
                    result += character;
            }

            return result;
        }
    }
}
