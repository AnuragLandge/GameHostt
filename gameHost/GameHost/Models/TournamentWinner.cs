using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameHost.Models
{
    public partial class TournamentWinner
    {
        public int WinnerId { get; set; }
        public int TournamentId { get; set; }
        public int? WinnerTeamId { get; set; }
        public int? WinnerPlayerId { get; set; }

        [JsonIgnore]
        public virtual Tournament Tournament { get; set; } = null!;
        public virtual Player? WinnerPlayer { get; set; }
        public virtual Team? WinnerTeam { get; set; }
    }
}
