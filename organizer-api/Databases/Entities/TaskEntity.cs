using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace organizer_api.Database.Entities
{
    [Table("Tasks")]
    public class TaskEntity
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Column("title")]
        public string Titel { get; set; }
        [Column("entry_date")]
        public long EntryDate { get; set; }
        [Column("estimate")]
        public double Estimate { get; set; }
        [Column("priority")]
        public int Priority { get; set; }
        [Column("due_date")]
        public long DueDate { get; set; }
        [Column("done")]
        public bool Done { get; set; }
        [Column("description")]
        public string? Description { get; set; }
    }
}