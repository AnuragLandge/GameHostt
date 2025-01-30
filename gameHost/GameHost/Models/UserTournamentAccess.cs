using System;
using System.Collections.Generic;

namespace GameHost.Models
{
    public partial class UserTournamentAccess
    {
        public int AccessId { get; set; }
        public int UserId { get; set; }
        public int TournamentId { get; set; }
        public string Role { get; set; } = null!;

        public virtual Tournament Tournament { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
