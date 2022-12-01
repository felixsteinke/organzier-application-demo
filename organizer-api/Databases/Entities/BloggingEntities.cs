using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;

namespace organizer_api.Database.Entities
{
    public class BlogEntity
    {
        [Key]
        public int BlogId { get; set; }
        public string? Url { get; set; }

        public List<PostEntity> Posts { get; } = new();
    }

    public class PostEntity
    {
        [Key]
        public int PostId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }

        public int BlogId { get; set; }
        public BlogEntity? Blog { get; set; }
    }
}
