using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameHost.Models;
using GameHost.DTO;

namespace GameHost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentsController : ControllerBase
    {
        private readonly GameHostDbContext _context;

        public TournamentsController(GameHostDbContext context)
        {
            _context = context;
        }

        // GET: api/Tournaments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tournament>>> GetTournaments()
        {
          if (_context.Tournaments == null)
          {
              return NotFound();
          }
            return await _context.Tournaments.ToListAsync();
        }
        [HttpGet("participate/{id}")]
        public async Task<ActionResult<IEnumerable<Tournament>>> GetListOfTournament(int id)
        {
            if (_context.Tournaments == null)
            {
                return NotFound();
            }
            var tournament = await _context.Tournaments.Where((item) => item.HostedBy != id).Include(item => item.TeamMatches).ToListAsync();

            if (tournament == null)
            {
                return NotFound();
            }

            return tournament;
        }

        // GET: api/Tournaments/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetTournament(int id)
        {
            if (_context.Tournaments == null)
            {
                return NotFound();
            }
            var tournament = _context.Tournaments.Where((item) => item.HostedBy == id)
                .Include(item => item.TeamMatches)
                .ToList();

            if (tournament == null)
            {
                return NotFound();
            }

            return Ok(tournament);
        }

        [HttpGet("getPerformanceData/{hostId}")]
        public async Task<ActionResult> GetPerformanceData(int hostId)
        {
            var dto = new List<PerformanceDTO>();
            var tournaments = await _context.Tournaments.Where(item => item.HostedBy == hostId).ToListAsync();
            foreach (var tournament in tournaments)
            {
                var tournamentId = tournament.TournamentId;
                var user = _context.Users.FirstOrDefault(item => item.UserId == tournament.HostedBy);
                var winner = _context.TournamentWinners.FirstOrDefault(item => item.TournamentId == tournamentId);
                var winnerteam = winner == null ? null : await _context.Teams.FirstAsync(item => item.TeamId == winner.WinnerId);
                var totalMathes = await _context.TeamMatches.Where(item => item.TournamentId == tournamentId).ToListAsync();

                var performance = new PerformanceDTO
                {

                    Format = tournament.Format,
                    HostedBy = user.Username,
                    TotalMatches = totalMathes.Count(),
                    TournamentId = tournament.TournamentId,
                    TournamentName = tournament.Name,
                    Type = tournament.SportType,
                    WinnerTeamCapton = winnerteam == null ? "" : winnerteam.CaptainName,
                    WinnerTeamName = winnerteam == null ? "" : winnerteam.TeamName,
                    Status = tournament.Status,
                };
                dto.Add(performance);
            }

            return Ok(dto);
        }

        [HttpGet("getTournamentByTournamentId/{id}")]
        public async Task<ActionResult> GetTournamentByTournamentId(int id)
        {
            if (_context.Tournaments == null)
            {
                return NotFound();
            }
            var tournament = _context.Tournaments.First((item) => item.TournamentId == id);
            if (tournament == null)
            {
                return NotFound();
            }
            var winnerId = _context.TournamentWinners.FirstOrDefault(item => item.TournamentId == id)?.WinnerId;
            if (winnerId == null) 
            {
                winnerId = 4;
                //return Problem("Tournament winner not available");
            }
            var winnerTeam = _context.Teams.First(item => item.TeamId == winnerId);
            var tournamentWinner = new TournamentWinnerDTO
            {
                TournamentName = tournament.Name,
                TotalTeams = _context.Teams.Where(item => item.TournamentId == id).Count(),
                HostedBy = _context.Users.First(item => item.UserId == tournament.HostedBy).Username,
                WinnerTeamName = winnerTeam.TeamName,
                Capton = winnerTeam.CaptainName
            };
            return Ok(tournamentWinner);
        }
        [HttpGet("check/{id}")]
        public async Task<ActionResult<Tournament>> checkTournament(int id)
        {
            if (_context.Tournaments == null)
            {
                return NotFound();
            }
            var tournaments = _context.Tournaments.Where((item) => item.HostedBy == id).ToList();


            if (tournaments == null)
            {
                return Ok();
            }
            else
            {
                bool shouldAllow = true;
                tournaments.ForEach(item =>
                {
                    if (item.Status.Equals("false"))
                    {
                        shouldAllow = false;
                        return;
                    }
                });
                if (shouldAllow)
                {
                    return Ok();
                }
            }
            return Problem("You are allowed to create only one tournament at a time");
        }

        // PUT: api/Tournaments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTournament(int id, Tournament tournament)
        {
            if (id != tournament.TournamentId)
            {
                return BadRequest();
            }

            _context.Entry(tournament).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TournamentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tournaments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tournament>> PostTournament(Tournament tournament)
        {
          if (_context.Tournaments == null)
          {
              return Problem("Entity set 'GameHostDbContext.Tournaments'  is null.");
          }

          var tname = _context.Tournaments.FirstOrDefault(item => item.Name.Equals( tournament.Name));

          if(tname != null)
          {
              return Problem("Duplicate Entry");
          }
          else
          {

            _context.Tournaments.Add(tournament);
            int response = await _context.SaveChangesAsync();

            if (response == 0)
            {
                return Problem("Error Occured while submitting form");
            }
            return CreatedAtAction(nameof(GetTournament), new { id = tournament.TournamentId }, tournament);
          }


        }

        [HttpPost("endTournament")]
        public async Task<ActionResult<Tournament>> EndTournament(WinnerDTO winner)
        {
            try
            {
                if (_context.Tournaments == null || _context.TeamMatches == null)
                {
                    return Problem("Entity set 'GameHostDbContext.Tournaments'  is null.");
                }
                var match = _context.TeamMatches.FirstOrDefault(item => item.MatchId == winner.MatchId);
                if (match != null)
                {
                    var winnerTeamId = winner.ScoreA > winner.ScoreB ? winner.TeamAID : winner.TeamBID;
                    match.WinnerTeamId = winnerTeamId;
                    _context.Entry(match).State = EntityState.Modified;
                    var tournamentWinner = new TournamentWinner
                    {
                        TournamentId = winner.TournamentId,
                        WinnerTeamId = winnerTeamId,
                    };
                    _context.TournamentWinners.Add(tournamentWinner);
                    //var toremove = _context.TeamMatches.Where(item => item.TournamentId == winner.TournamentId);
                    //_context.TeamMatches.RemoveRange(toremove);

                    var newTeams = _context.Teams.Where(item => item.TournamentId == winner.TournamentId).ToList();
                    newTeams.ForEach(item => item.TournamentId = null);

                    _context.Teams.UpdateRange(newTeams);

                    var tournament = _context.Tournaments.First(item => item.TournamentId == winner.TournamentId);
                    tournament.Status = "true";
                    _context.Entry(tournament).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
                else
                {
                    return NotFound("Match not found");
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
            
            
            return Ok();
        }
        // DELETE: api/Tournaments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTournament(int id)
        {
            if (_context.Tournaments == null)
            {
                return NotFound();
            }
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null)
            {
                return NotFound();
            }

            _context.Tournaments.Remove(tournament);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TournamentExists(int id)
        {
            return (_context.Tournaments?.Any(e => e.TournamentId == id)).GetValueOrDefault();
        }
    }
}
