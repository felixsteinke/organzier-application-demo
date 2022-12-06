namespace organizer_api.Controllers.Models
{
    public class MessageModel
    {
        public string? Msg { get; set; }

        public MessageModel(string msg) { 
            this.Msg = msg;
        }
    }
}
