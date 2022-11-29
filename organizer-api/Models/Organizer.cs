namespace organizer_api.Models
{
    public class Organizer
    {
        public int Id { get; set; }
        public string? Titel { get; set; }
        public long? EntryDate { get; set; }
        public double? Estimate { get; set; }
        public int? Priority { get; set; }
        public long? DueDate { get; set; }
        public bool? Done { get; set; }
        public string? Description { get; set; }
    }
}