﻿using WebApp.GraphApi.Mutations;

namespace WebApp.GraphApi;

public class RootMutation
{
    public static AuthenticationMutation Authentication() => new();

    public static MessagesMutation Messages() => new();
}