using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GameHost.Models
{
    public partial class GameHostDbContext : DbContext
    {
        public GameHostDbContext()
        {
        }

        public GameHostDbContext(DbContextOptions<GameHostDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Player> Players { get; set; } = null!;
        public virtual DbSet<PlayerMatch> PlayerMatches { get; set; } = null!;
        public virtual DbSet<PlayerPerformance> PlayerPerformances { get; set; } = null!;
        public virtual DbSet<Team> Teams { get; set; } = null!;
        public virtual DbSet<TeamMatch> TeamMatches { get; set; } = null!;
        public virtual DbSet<TeamPerformance> TeamPerformances { get; set; } = null!;
        public virtual DbSet<Tournament> Tournaments { get; set; } = null!;
        public virtual DbSet<TournamentWinner> TournamentWinners { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserTournamentAccess> UserTournamentAccesses { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=GameHostDb;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>(entity =>
            {
                entity.Property(e => e.PlayerId).HasColumnName("PlayerID");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Players__TeamID__31EC6D26");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Players__Tournam__30F848ED");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Players__UserID__300424B4");
            });

            modelBuilder.Entity<PlayerMatch>(entity =>
            {
                entity.HasKey(e => e.MatchId)
                    .HasName("PK__PlayerMa__4218C8378F6473A7");

                entity.Property(e => e.MatchId).HasColumnName("MatchID");

                entity.Property(e => e.MatchDate).HasColumnType("date");

                entity.Property(e => e.ScorePlayerA).HasDefaultValueSql("((0))");

                entity.Property(e => e.ScorePlayerB).HasDefaultValueSql("((0))");

                entity.Property(e => e.Stage).HasMaxLength(20);

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.Property(e => e.WinnerPlayerId).HasColumnName("WinnerPlayerID");

                entity.HasOne(d => d.PlayerANavigation)
                    .WithMany(p => p.PlayerMatchPlayerANavigations)
                    .HasForeignKey(d => d.PlayerA)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerMat__Playe__412EB0B6");

                entity.HasOne(d => d.PlayerBNavigation)
                    .WithMany(p => p.PlayerMatchPlayerBNavigations)
                    .HasForeignKey(d => d.PlayerB)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerMat__Playe__4222D4EF");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.PlayerMatches)
                    .HasForeignKey(d => d.TournamentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerMat__Tourn__403A8C7D");

                entity.HasOne(d => d.WinnerPlayer)
                    .WithMany(p => p.PlayerMatchWinnerPlayers)
                    .HasForeignKey(d => d.WinnerPlayerId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__PlayerMat__Winne__4316F928");
            });

            modelBuilder.Entity<PlayerPerformance>(entity =>
            {
                entity.HasKey(e => e.PerformanceId)
                    .HasName("PK__PlayerPe__F9606DE1D3236A2A");

                entity.ToTable("PlayerPerformance");

                entity.HasIndex(e => new { e.TournamentId, e.PlayerId }, "UQ__PlayerPe__38C7F478FF60B296")
                    .IsUnique();

                entity.Property(e => e.PerformanceId).HasColumnName("PerformanceID");

                entity.Property(e => e.MatchesLost).HasDefaultValueSql("((0))");

                entity.Property(e => e.MatchesPlayed).HasDefaultValueSql("((0))");

                entity.Property(e => e.MatchesWon).HasDefaultValueSql("((0))");

                entity.Property(e => e.PlayerId).HasColumnName("PlayerID");

                entity.Property(e => e.Points).HasDefaultValueSql("((0))");

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.PlayerPerformances)
                    .HasForeignKey(d => d.PlayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerPer__Playe__5441852A");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.PlayerPerformances)
                    .HasForeignKey(d => d.TournamentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerPer__Tourn__534D60F1");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.Property(e => e.TeamName).HasMaxLength(100);

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Teams)
                    .HasForeignKey(d => d.TournamentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Teams__Tournamen__2D27B809");
            });

            modelBuilder.Entity<TeamMatch>(entity =>
            {
                entity.HasKey(e => e.MatchId)
                    .HasName("PK__TeamMatc__4218C837A030C627");

                entity.Property(e => e.MatchId).HasColumnName("MatchID");

                entity.Property(e => e.MatchDate).HasColumnType("date");

                entity.Property(e => e.ScoreTeamA).HasDefaultValueSql("((0))");

                entity.Property(e => e.ScoreTeamB).HasDefaultValueSql("((0))");

                entity.Property(e => e.Stage).HasMaxLength(20);

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.Property(e => e.WinnerTeamId).HasColumnName("WinnerTeamID");

                entity.HasOne(d => d.TeamANavigation)
                    .WithMany(p => p.TeamMatchTeamANavigations)
                    .HasForeignKey(d => d.TeamA)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TeamMatch__TeamA__38996AB5");

                entity.HasOne(d => d.TeamBNavigation)
                    .WithMany(p => p.TeamMatchTeamBNavigations)
                    .HasForeignKey(d => d.TeamB)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TeamMatch__TeamB__398D8EEE");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.TeamMatches)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__TeamMatch__Tourn__37A5467C");

                entity.HasOne(d => d.WinnerTeam)
                    .WithMany(p => p.TeamMatchWinnerTeams)
                    .HasForeignKey(d => d.WinnerTeamId)
                    .HasConstraintName("FK__TeamMatch__Winne__3A81B327");
            });

            modelBuilder.Entity<TeamPerformance>(entity =>
            {
                entity.HasKey(e => e.PerformanceId)
                    .HasName("PK__TeamPerf__F9606DE11253720B");

                entity.ToTable("TeamPerformance");

                entity.HasIndex(e => new { e.TournamentId, e.TeamId }, "UQ__TeamPerf__2D40BD498101BCC0")
                    .IsUnique();

                entity.Property(e => e.PerformanceId).HasColumnName("PerformanceID");

                entity.Property(e => e.MatchesLost).HasDefaultValueSql("((0))");

                entity.Property(e => e.MatchesPlayed).HasDefaultValueSql("((0))");

                entity.Property(e => e.MatchesWon).HasDefaultValueSql("((0))");

                entity.Property(e => e.Points).HasDefaultValueSql("((0))");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.TeamPerformances)
                    .HasForeignKey(d => d.TeamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TeamPerfo__TeamI__4BAC3F29");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.TeamPerformances)
                    .HasForeignKey(d => d.TournamentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TeamPerfo__Tourn__4AB81AF0");
            });

            modelBuilder.Entity<Tournament>(entity =>
            {
                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.Format).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.SportType).HasMaxLength(50);

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.HostedByNavigation)
                    .WithMany(p => p.Tournaments)
                    .HasForeignKey(d => d.HostedBy)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__Tournamen__Hoste__2A4B4B5E");
            });

            modelBuilder.Entity<TournamentWinner>(entity =>
            {
                entity.HasKey(e => e.WinnerId)
                    .HasName("PK__Tourname__8A3D1D8823246D49");

                entity.Property(e => e.WinnerId).HasColumnName("WinnerID");

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.Property(e => e.WinnerPlayerId).HasColumnName("WinnerPlayerID");

                entity.Property(e => e.WinnerTeamId).HasColumnName("WinnerTeamID");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.TournamentWinners)
                    .HasForeignKey(d => d.TournamentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tournamen__Tourn__571DF1D5");

                entity.HasOne(d => d.WinnerPlayer)
                    .WithMany(p => p.TournamentWinners)
                    .HasForeignKey(d => d.WinnerPlayerId)
                    .HasConstraintName("FK__Tournamen__Winne__59063A47");

                entity.HasOne(d => d.WinnerTeam)
                    .WithMany(p => p.TournamentWinners)
                    .HasForeignKey(d => d.WinnerTeamId)
                    .HasConstraintName("FK__Tournamen__Winne__5812160E");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username, "UQ__Users__536C85E45BB2C093")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__Users__A9D10534DD3B515D")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.PasswordHash).HasMaxLength(255);

                entity.Property(e => e.Username).HasMaxLength(50);
            });

            modelBuilder.Entity<UserTournamentAccess>(entity =>
            {
                entity.HasKey(e => e.AccessId)
                    .HasName("PK__UserTour__4130D0BF6E7FF721");

                entity.ToTable("UserTournamentAccess");

                entity.HasIndex(e => new { e.UserId, e.TournamentId }, "UQ__UserTour__3D4EFD9E16423E79")
                    .IsUnique();

                entity.Property(e => e.AccessId).HasColumnName("AccessID");

                entity.Property(e => e.Role).HasMaxLength(20);

                entity.Property(e => e.TournamentId).HasColumnName("TournamentID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.UserTournamentAccesses)
                    .HasForeignKey(d => d.TournamentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserTourn__Tourn__5EBF139D");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserTournamentAccesses)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserTourn__UserI__5DCAEF64");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
