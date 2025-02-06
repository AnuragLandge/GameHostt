using GameHost.Models;

namespace GameHost.Helper
{
    public class TeamMatchHelper
    {
        public static List<TeamMatch> GenerateKnockoutRounds(List<Team> teams, int tournamentId, int round = 1)
        {
            List<TeamMatch> matches = new List<TeamMatch>();
            int count = teams.Count;
            if(count % 2 == 0)
            {
                for (int i = 0; i < count; i += 2)
                {
                    var teamMatch = new TeamMatch
                    {
                        TeamA = teams[i].TeamId,
                        TeamB = teams[i + 1].TeamId,
                        ScoreTeamA = 0,
                        ScoreTeamB = 0,
                        MatchDate = DateTime.UtcNow,
                        TournamentId = tournamentId,
                        Stage = round.ToString(),
                    };
                    matches.Add(teamMatch);
                }
            }
            else
            {
                for (int i = 0; i < count - 1; i += 2)
                {
                    var teamMatch = new TeamMatch
                    {
                        TeamA = teams[i].TeamId,
                        TeamB = teams[i + 1].TeamId,
                        ScoreTeamA = 0,
                        ScoreTeamB = 0,
                        MatchDate = DateTime.UtcNow,
                        TournamentId = tournamentId,
                        Stage = round.ToString(),
                    };
                    matches.Add(teamMatch);
                }
                matches.Add(new TeamMatch
                {
                    TeamA = teams[count - 1].TeamId,
                    TeamB = teams[count - 1].TeamId,
                    WinnerTeam = teams[count - 1],
                    Stage = round.ToString(),
                    TournamentId = tournamentId,
                    ScoreTeamA = 0,
                    ScoreTeamB = 0,
                    WinnerTeamId = teams[count - 1].TeamId,
                });
            }
            return matches;
        }
    }
}
