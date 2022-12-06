using organizer_api.Enums;

namespace organizer_api.Controllers.Models
{
    public class TaskModel
    {
        public long Id { get; set; }
        public string? Titel { get; set; }
        public DateTime EntryDate { get; set; }
        public double Estimate { get; set; }
        public Priority Priority { get; set; }
        public DateTime DueDate { get; set; }
        public bool Done { get; set; }
        public string? Description { get; set; }
    }
}
