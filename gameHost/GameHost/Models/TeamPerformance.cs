﻿using System;
using System.Collections.Generic;

namespace GameHost.Models
{
    public partial class TeamPerformance
    {
        public int PerformanceId { get; set; }
        public int TournamentId { get; set; }
        public int TeamId { get; set; }
        public int? MatchesPlayed { get; set; }
        public int? MatchesWon { get; set; }
        public int? MatchesLost { get; set; }
        public int? Points { get; set; }

        public virtual Team Team { get; set; } = null!;
        public virtual Tournament Tournament { get; set; } = null!;
    }
}
