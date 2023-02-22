using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;
using WebApp.Business.Interfaces;
using WebApp.EntityFramework.DataProviders;
using WebApp.Interfaces;
using WebApp.Services;
using WebApp.Utilities;

namespace WebApp.Extensions
{
    public static class ServicesExtensions
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<ISessionDataProvider, EntityFrameworkSessionDataProvider>();
            services.AddScoped<IUserDataProvider, EntityFrameworkUserDataProvider>();
            services.AddHttpContextAccessor();
            services.AddSingleton<IChatService, ChatService>();
            services.AddScoped<ITokenService, JwtTokenService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }

        public static void AddAppAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = configuration["Jwt:Audience"],
                    ValidIssuer = configuration["Jwt:Issuer"],
                    RequireSignedTokens = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)),
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
                options.RequireHttpsMetadata = false;
                options.Events = new()
                {
                    OnAuthenticationFailed = context =>
                    {
                        context.Response.StatusCode = 401;
                        context.Response.Headers.Append("Authorization-failed", "true");

                        return Task.CompletedTask;
                    },
                };
            });
        }

        public static void AddAppAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy(PolicyType.UserPolicy,
                    policy => policy.RequireRole(ClaimType.Email));
            });
        }
    }
}
