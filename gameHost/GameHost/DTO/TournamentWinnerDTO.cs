using GameHost.Models;

namespace GameHost.DTO
{
    public class TournamentWinnerDTO
    {
        public string TournamentName { get; set; }
        public string HostedBy { get; set; }

        public int TotalTeams { get; set; }

        public string WinnerTeamName { get; set; }

        public string Capton { get; set; }
    }
}
