using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameHost.Models
{
    public partial class TeamMatch
    {
        public int MatchId { get; set; }
        public int TournamentId { get; set; }
        public DateTime MatchDate { get; set; }
        public string Stage { get; set; } = null!;
        public int TeamA { get; set; }
        public int TeamB { get; set; }
        public int? ScoreTeamA { get; set; }
        public int? ScoreTeamB { get; set; }
        public int? WinnerTeamId { get; set; }

        public virtual Team TeamANavigation { get; set; }
        
        public virtual Team TeamBNavigation { get; set; }
        [JsonIgnore]
        public virtual Tournament Tournament { get; set; } = null!;
        public virtual Team? WinnerTeam { get; set; }
    }
}
