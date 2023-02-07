namespace WebApp.HttpModels;

public class Error
{
    public string Message { set; get; }

    public Error(string message)
    {
        Message = message;
    }
}