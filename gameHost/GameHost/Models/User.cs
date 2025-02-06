using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameHost.Models
{
    public partial class User
    {
        public User()
        {
            Players = new HashSet<Player>();
            Tournaments = new HashSet<Tournament>();
            UserTournamentAccesses = new HashSet<UserTournamentAccess>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

        public virtual ICollection<Player> Players { get; set; }

        public virtual ICollection<Tournament> Tournaments { get; set; }
        public virtual ICollection<UserTournamentAccess> UserTournamentAccesses { get; set; }
    }
}
