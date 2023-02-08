using GraphQL;
using Microsoft.EntityFrameworkCore;
using WebApp.EntityFramework.DataContexts;
using WebApp.Extensions;
using WebApp.GraphApi;
using WebApp.Mapper;
using WebApp.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(UserProfile));
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"));
});

builder.Services.AddAppServices();
builder.Services.AddAppAuthentication(builder.Configuration);
builder.Services.AddAppAuthorization();

builder.Services.AddGraphQL(b =>
    b.AddAutoSchema<RootQuery>(config => config.WithMutation<RootMutation>())
        .AddSystemTextJson()
        .AddAuthorizationRule()
        .AddErrorInfoProvider(e => e.ExposeExceptionDetails = true));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
}

app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseGraphQL();
app.UseGraphQLAltair();

app.UseMiddleware<ExceptionMiddleware>();

app.UseSpa(configuration =>
{
    configuration.Options.SourcePath = "wwwroot";
});

app.Run();
