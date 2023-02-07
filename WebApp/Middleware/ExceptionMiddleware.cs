using System.Net;
using WebApp.HttpModels;

namespace WebApp.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var errors = new List<Error>();

        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            errors.Add(new(exception.Message));
            await HandleExceptionAsync(context, errors);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, List<Error> errors)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        await context.Response.WriteAsync(new Response<Object>(null, errors).ToString()!);
    }
}