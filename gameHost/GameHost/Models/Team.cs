using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameHost.Models
{
    public partial class Team
    {
        public Team()
        {
            Players = new HashSet<Player>();
            TeamMatchTeamANavigations = new HashSet<TeamMatch>();
            TeamMatchTeamBNavigations = new HashSet<TeamMatch>();
            TeamMatchWinnerTeams = new HashSet<TeamMatch>();
            TeamPerformances = new HashSet<TeamPerformance>();
            TournamentWinners = new HashSet<TournamentWinner>();
        }

        public int TeamId { get; set; }
        public string TeamName { get; set; } = null!;
        public int? TournamentId { get; set; }
        public int MaxPlayers { get; set; }
        public string CaptainName { get; set; }

        public virtual Tournament? Tournament { get; set; }
        public virtual ICollection<Player> Players { get; set; }

        [JsonIgnore]
        public virtual ICollection<TeamMatch> TeamMatchTeamANavigations { get; set; }

        [JsonIgnore]
        public virtual ICollection<TeamMatch> TeamMatchTeamBNavigations { get; set; }

        [JsonIgnore]
        public virtual ICollection<TeamMatch> TeamMatchWinnerTeams { get; set; }
        public virtual ICollection<TeamPerformance> TeamPerformances { get; set; }
        public virtual ICollection<TournamentWinner> TournamentWinners { get; set; }
    }
}
