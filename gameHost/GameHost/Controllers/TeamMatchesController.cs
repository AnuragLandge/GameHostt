using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameHost.Models;
using static GameHost.Helper.TeamMatchHelper;
using GameHost.Helper;
using GameHost.DTO;

namespace GameHost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMatchesController : ControllerBase
    {
        private readonly GameHostDbContext _context;
        private readonly TeamMatchHelper teamMatchHelper;

        public TeamMatchesController(GameHostDbContext context)
        {
            _context = context;
            teamMatchHelper = new TeamMatchHelper();
        }

        // GET: api/TeamMatches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamMatch>>> GetTeamMatches()
        {
          if (_context.TeamMatches == null)
          {
              return NotFound();
          }
            return await _context.TeamMatches.ToListAsync();
        }

        // GET: api/TeamMatches/5
        [HttpGet("generate/{id}")]
        public async Task<ActionResult<List<TeamMatch>>> GenerateTeamMatch(int id)
        {
            try
            {
                if (_context.Teams == null || _context.TeamMatches == null)
                {
                    Console.WriteLine("Error: _context.Teams or _context.TeamMatches is NULL");
                    return NotFound("Database is not properly initialized.");
                }

                // Get all teams for the tournament
                var teams = await _context.Teams.Where(t => t.TournamentId == id).ToListAsync();

                if (teams == null || teams.Count == 0)
                {
                    return BadRequest("No teams found for the given tournament ID.");
                }

                if (teams.Count < 2)
                {
                    return BadRequest("At least two teams are required for a knockout tournament.");
                }

                // Shuffle teams randomly
                teams = teams.OrderBy(t => Guid.NewGuid()).ToList();

                var matches = TeamMatchHelper.GenerateKnockoutRounds(teams, id);
                _context.TeamMatches.AddRange(matches);
                _context.SaveChanges();
                var x = await _context.TeamMatches.ToListAsync();
                return Ok(x);
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server Error: {ex.Message} | StackTrace: {ex.StackTrace}");
            }
        }




        [HttpGet("{id}")]
        public async Task<ActionResult<TeamMatch>> GetTeamMatch(int id)
        {
            if (_context.TeamMatches == null)
            {
                return NotFound();
            }
            var teamMatch = await _context.TeamMatches.FindAsync(id);

            if (teamMatch == null)
            {
                return NotFound();
            }

            return teamMatch;
        }

        // PUT: api/TeamMatches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeamMatch(int id, TeamMatch teamMatch)
        {
            if (id != teamMatch.MatchId)
            {
                return BadRequest();
            }

            _context.Entry(teamMatch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamMatchExists(id))
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

        // POST: api/TeamMatches
        
        [HttpPost]
        public async Task<ActionResult<TeamMatch>> PostTeamMatch(TeamMatch teamMatch)
        {
          if (_context.TeamMatches == null)
          {
              return Problem("Entity set 'GameHostDbContext.TeamMatches'  is null.");
          }
            _context.TeamMatches.Add(teamMatch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeamMatch", new { id = teamMatch.MatchId }, teamMatch);
        }

        [HttpGet("nextRound/{id}/{round}")]
        public async Task<ActionResult<List<TeamMatch>>> NextRound(int id, int round)
        {
            try
            {
                if (_context.Teams == null || _context.TeamMatches == null)
                {
                    Console.WriteLine("Error: _context.Teams or _context.TeamMatches is NULL");
                    return NotFound("Database is not properly initialized.");
                }

                var winnerTeams = _context.TeamMatches.Where(item => item.WinnerTeamId != null && item.TournamentId == id).ToList();
                var winnerTeamIdList = winnerTeams.Select(item => item.WinnerTeamId);
                var newteams = _context.Teams.Where(item => winnerTeamIdList.Contains(item.TeamId)).ToList();
                var generatedMatches = GenerateKnockoutRounds(newteams, id, round);
                _context.TeamMatches.AddRange(generatedMatches);
                await _context.SaveChangesAsync();
                return Ok(generatedMatches);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server Error: {ex.Message} | StackTrace: {ex.StackTrace}");
            }
        }
        [HttpPost("winner")]
        public async Task<ActionResult<TeamMatch>> PostNewTeamMatch([FromBody]WinnerDTO teamMatch)
        {
            if (_context.TeamMatches == null)
            {
                return Problem("Entity set 'GameHostDbContext.TeamMatches' is null.");
            }

            // Ensure the match exists before modifying it
            var existingMatch = await _context.TeamMatches.FindAsync(teamMatch.MatchId);
            if (existingMatch == null)
            {
                return NotFound("Match not found.");
            }

            // Update match details
            existingMatch.ScoreTeamA = teamMatch.ScoreA;
            existingMatch.ScoreTeamB = teamMatch.ScoreB;

            if (teamMatch.ScoreA > teamMatch.ScoreB)
            {
                existingMatch.WinnerTeamId = teamMatch.TeamAID;
            }
            else
            {
                existingMatch.WinnerTeamId = teamMatch.TeamBID;
            }

            await _context.SaveChangesAsync();

            return Ok(existingMatch);
        }

        // DELETE: api/TeamMatches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamMatch(int id)
        {
            if (_context.TeamMatches == null)
            {
                return NotFound();
            }
            var teamMatch = await _context.TeamMatches.FindAsync(id);
            if (teamMatch == null)
            {
                return NotFound();
            }

            _context.TeamMatches.Remove(teamMatch);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeamMatchExists(int id)
        {
            return (_context.TeamMatches?.Any(e => e.MatchId == id)).GetValueOrDefault();
        }

        [HttpGet("GetCurrentRound/{tournamentId}")]
        public async Task<IActionResult> GetCurrentRoundMatches(int tournamentId)
        {
            if (_context.TeamMatches == null)
            {
                return NotFound();
            }
            if (_context.TeamMatches.Count(item => item.TournamentId == tournamentId) == 1) 
            {
                return Ok(_context.TeamMatches.Where(item => item.TournamentId == tournamentId));
            }
            int currrentRoundNumber = 0;
            var currentRound = await _context.TeamMatches.FirstOrDefaultAsync(item => item.WinnerTeamId == null && item.TournamentId == tournamentId);
            if (currentRound != null)
            {
                currrentRoundNumber = int.Parse(currentRound.Stage);
                var teamMatches = await _context.TeamMatches.Where(item => item.TournamentId == tournamentId && item.Stage == currrentRoundNumber.ToString())
                    .Include(item => item.TeamANavigation)
                    .Include(item => item.TeamBNavigation).ToListAsync();
                return Ok(teamMatches);
            }
            return Ok(null);
        }
    }
}
