using System;
using System.Collections.Generic;

namespace GameHost.Models
{
    public partial class PlayerMatch
    {
        public int MatchId { get; set; }
        public int TournamentId { get; set; }
        public DateTime MatchDate { get; set; }
        public string Stage { get; set; } = null!;
        public int PlayerA { get; set; }
        public int PlayerB { get; set; }
        public int? ScorePlayerA { get; set; }
        public int? ScorePlayerB { get; set; }
        public int? WinnerPlayerId { get; set; }

        public virtual Player PlayerANavigation { get; set; } = null!;
        public virtual Player PlayerBNavigation { get; set; } = null!;
        public virtual Tournament Tournament { get; set; } = null!;
        public virtual Player? WinnerPlayer { get; set; }
    }
}
