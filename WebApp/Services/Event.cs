﻿using WebApp.Business.Models;

namespace WebApp.Services;

public class Event
{
    public EventType? Type { set; get; }
    public Message? Message { set; get; }
}