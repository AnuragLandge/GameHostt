using System;
using System.Collections.Generic;

namespace GameHost.Models
{
    public partial class Tournament
    {
        public Tournament()
        {
            PlayerMatches = new HashSet<PlayerMatch>();
            PlayerPerformances = new HashSet<PlayerPerformance>();
            Players = new HashSet<Player>();
            TeamMatches = new HashSet<TeamMatch>();
            TeamPerformances = new HashSet<TeamPerformance>();
            Teams = new HashSet<Team>();
            TournamentWinners = new HashSet<TournamentWinner>();
            UserTournamentAccesses = new HashSet<UserTournamentAccess>();
        }

        public int TournamentId { get; set; }
        public string Name { get; set; } = null!;
        public string Format { get; set; } = null!;
        public string SportType { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? MaxTeams { get; set; }
        public bool IsSinglePlayer { get; set; }
        public int? HostedBy { get; set; }
        public string Status { get; set; } = null!;

        public virtual User? HostedByNavigation { get; set; }
        public virtual ICollection<PlayerMatch> PlayerMatches { get; set; }
        public virtual ICollection<PlayerPerformance> PlayerPerformances { get; set; }
        public virtual ICollection<Player> Players { get; set; }
        public virtual ICollection<TeamMatch> TeamMatches { get; set; }
        public virtual ICollection<TeamPerformance> TeamPerformances { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
        public virtual ICollection<TournamentWinner> TournamentWinners { get; set; }
        public virtual ICollection<UserTournamentAccess> UserTournamentAccesses { get; set; }
    }
}
