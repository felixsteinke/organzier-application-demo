using System.ComponentModel.DataAnnotations;

namespace organizer_api.Database.Entities
{
    public class TaskEntity
    {
        [Key]
        public long Id { get; set; }
        public string? Titel { get; set; }
        public long EntryDate { get; set; }
        public double Estimate { get; set; }
        public int Priority { get; set; }
        public long DueDate { get; set; }
        public bool Done { get; set; }
        public string? Description { get; set; }
    }
}