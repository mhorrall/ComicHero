namespace ComicHero.Web.ApiModels
{
    public class ComicDto
    {
        public string Title { get; set; }
        public int IssueNumber { get; set; }
        public string Series { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public int Year { get; set; }
        public byte[] Image { get; set; }
    }
}
