using System;
using System.Collections.Generic;

namespace GameHost.Models
{
    public partial class Player
    {
        public Player()
        {
            PlayerMatchPlayerANavigations = new HashSet<PlayerMatch>();
            PlayerMatchPlayerBNavigations = new HashSet<PlayerMatch>();
            PlayerMatchWinnerPlayers = new HashSet<PlayerMatch>();
            PlayerPerformances = new HashSet<PlayerPerformance>();
            TournamentWinners = new HashSet<TournamentWinner>();
        }

        public int PlayerId { get; set; }
        public int UserId { get; set; }
        public int TournamentId { get; set; }
        public int? TeamId { get; set; }

        public virtual Team? Team { get; set; }
        public virtual Tournament Tournament { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual ICollection<PlayerMatch> PlayerMatchPlayerANavigations { get; set; }
        public virtual ICollection<PlayerMatch> PlayerMatchPlayerBNavigations { get; set; }
        public virtual ICollection<PlayerMatch> PlayerMatchWinnerPlayers { get; set; }
        public virtual ICollection<PlayerPerformance> PlayerPerformances { get; set; }
        public virtual ICollection<TournamentWinner> TournamentWinners { get; set; }
    }
}
