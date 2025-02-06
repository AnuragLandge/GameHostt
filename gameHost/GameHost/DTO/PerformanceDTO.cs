using GameHost.Models;

namespace GameHost.DTO
{
    public class PerformanceDTO
    {
        public int TournamentId { get; set; }
        public string TournamentName { get; set; }
        public string HostedBy { get; set; }
        public string Format { get; set; }
        public string Type { get; set; }
        public string WinnerTeamName { get; set; }
        public int TotalMatches { get; set; }
        public string WinnerTeamCapton { get; set; }
        public string Status { get; set; }
    }
}
