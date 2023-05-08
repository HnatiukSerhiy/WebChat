using GraphQL;
using GraphQL.Server.Transports.AspNetCore;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using WebApp.EntityFramework.DataContexts;
using WebApp.Extensions;
using WebApp.GraphApi;
using WebApp.GraphApi.Subscriptions;
using WebApp.Mapper;
using WebApp.Middleware;

var builder = WebApplication.CreateBuilder(args);

const string corsSpecificOrigins = "CorsSpecificOrigins";

builder.Services.AddControllers();
builder.Services.AddCors(options =>
    options.AddPolicy(corsSpecificOrigins,
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
    )
);

builder.Services.AddAutoMapper(typeof(UserProfile), typeof(MessageProfile));

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"));
});

builder.Services.AddAppServices();
builder.Services.AddAppAuthentication(builder.Configuration);
builder.Services.AddAppAuthorization();

builder.Services.AddGraphQL(b =>
    b.AddAutoSchema<RootQuery>(schema => schema
            .WithMutation<RootMutation>()
            .WithSubscription<MessagesSubscription>())
        .AddSystemTextJson()
        .AddAuthorizationRule()
        .AddErrorInfoProvider(e => e.ExposeExceptionDetails = true));


var app = builder.Build();

app.UseWebSockets();
app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(corsSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseGraphQL<AuthorizationGraphQLHttpMiddleware<ISchema>>("/graphql", new GraphQLHttpMiddlewareOptions());

app.UseGraphQLAltair();
app.UseSpa(configuration =>
{
    configuration.Options.SourcePath = "wwwroot";
});

app.Run();
