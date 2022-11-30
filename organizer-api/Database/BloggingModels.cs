﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace organizer_api.Database
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string? Url { get; set; }

        public List<Post> Posts { get; } = new();
    }

    public class Post
    {
        public int PostId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }

        public int BlogId { get; set; }
        public Blog? Blog { get; set; }
    }
}
