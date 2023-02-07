namespace WebApp.HttpModels;

public class Response<T> where T : class
{
    public T? Data { set; get; }
    public List<Error> Errors { set; get; }

    public Response(T? data)
    {
        Data = data;
        Errors = new();
    }

    public Response(T? data, List<Error> errors)
    {
        Data = data;
        Errors = errors;
    }
}