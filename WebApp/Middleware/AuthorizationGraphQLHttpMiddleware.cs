using System.Net;
using GraphQL;
using GraphQL.Server.Transports.AspNetCore;
using GraphQL.Types;

namespace WebApp.Middleware;

public class AuthorizationGraphQLHttpMiddleware<T> : GraphQLHttpMiddleware<T>
    where T : ISchema
{
    public AuthorizationGraphQLHttpMiddleware(RequestDelegate next, IGraphQLTextSerializer serializer,
        IDocumentExecuter<T> documentExecuter, IServiceScopeFactory serviceScopeFactory,
        GraphQLHttpMiddlewareOptions options, IHostApplicationLifetime hostApplicationLifetime)
        : base(next, serializer, documentExecuter, serviceScopeFactory, options, hostApplicationLifetime)
    {
    }

    protected override Task WriteJsonResponseAsync<TResult>(HttpContext context, HttpStatusCode httpStatusCode, TResult result)
    {
        if ((result as ExecutionResult)?.Errors?.Any(x => x.Code == "ACCESS_DENIED") ?? false)
            httpStatusCode = HttpStatusCode.Unauthorized;

        return base.WriteJsonResponseAsync(context, httpStatusCode, result);
    }
}
