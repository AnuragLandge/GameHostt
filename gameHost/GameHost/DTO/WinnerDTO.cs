using GameHost.Models;

namespace GameHost.DTO
{
    public class WinnerDTO
    {
        public int TournamentId { get; set; }
        public int MatchId { get; set; }
        public int ScoreA { get; set; }
        public int ScoreB { get; set; }
        public int TeamAID { get; set; }
        public int TeamBID { get; set; }
    }
}
