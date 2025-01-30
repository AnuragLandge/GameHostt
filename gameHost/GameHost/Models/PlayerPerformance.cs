using System;
using System.Collections.Generic;

namespace GameHost.Models
{
    public partial class PlayerPerformance
    {
        public int PerformanceId { get; set; }
        public int TournamentId { get; set; }
        public int PlayerId { get; set; }
        public int? MatchesPlayed { get; set; }
        public int? MatchesWon { get; set; }
        public int? MatchesLost { get; set; }
        public int? Points { get; set; }

        public virtual Player Player { get; set; } = null!;
        public virtual Tournament Tournament { get; set; } = null!;
    }
}
