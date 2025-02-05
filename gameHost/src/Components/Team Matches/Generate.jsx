import { Box, Button, Card, CardContent, Grid2, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import "./TeamMatches.css"
import axios from 'axios';

const Generate = () => {
  const location = useLocation();
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [matches, setMatches] = useState(location.state || [])
  const [enableNextRound, setEnableNextRoundButton] = useState(false);
  const [endTournament, setEndTournament] = useState(false);
  const [tournamentWinner, setTournamentWinner] = useState(null);
  const [isFinalmatch, setIsFinalMatch] = useState(false);
  const [round, setRound] = useState(1);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const asyncFunction = async() => {
      const id = searchParams.get('tournamentId');
      const response = await axios.get(`https://localhost:44395/api/TeamMatches/GetCurrentRound/${id}`)
      setMatches(response.data);
    }
    asyncFunction();
  }, [])

  const endTournamentClickHandler = async(match) => {
    const response = await axios.post(`https://localhost:44395/api/tournament/endTournament`, {
        MatchId: match.matchId,
        TournamentId: match.tournamentId,
        ScoreA: +teamA,
        ScoreB: +teamB,
        TeamAID: match.teamA,
        TeamBID: match.teamB
    });
  }
  const nextRoundClicHandler = async () => {
    const response = await axios.get(`https://localhost:44395/api/TeamMatches/nextRound/${matches[0].tournamentId}/${round + 1}`)
    setRound(round + 1);
    setMatches(response.data);
  }

  const onStartClickHandler = async (match) => {
    if (match.visible) {
      try {
        const api = isFinalmatch ? 'Tournaments/endTournament' : 'TeamMatches/winner' ;
        const response = await axios.post(`https://localhost:44395/api/${api}`, {
          MatchId: match.matchId,
          TournamentId: match.tournamentId,
          ScoreA: +teamA,
          ScoreB: +teamB,
          TeamAID: match.teamA,
          TeamBID: match.teamB
        });

        const array = [...matches];
        const exits = array.find(item => item.matchId === response.data.matchId);
        exits.winnerTeamId = response.data.winnerTeamId;
        setMatches(array);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      const array = [...matches];
      const exist = array.find(item => item.matchId === match.matchId);
      exist.visible = true;
      setMatches(array);
    }
  }

  useEffect(() => {
    if(matches.length === 1) {
      setIsFinalMatch(true);
    }
    let enableNextRound = true;
    matches.forEach(item => {
      if (!item.winnerTeamId) {
        enableNextRound = false;
        return;
      }
    })
    setEnableNextRoundButton(enableNextRound);
  }, [matches])

  const handleTeamA = (e) => {
    setTeamA(e.target.value)
  }

  const handleTeamB = (e) => {
    setTeamB(e.target.value)
  }

  return (
    <div className='divStyle'>
      {matches.length > 0 ? (
        <Grid2 container spacing={3} justifyContent="center" sx={{ width: "85vw", marginTop: '20px', marginRight: "auto", marginLeft: 'auto' }}>
          {matches.map((match) => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={match.matchId}>
              <Card key={match.matchId} sx={{ height: 250, width: 250, boxShadow: 3, borderRadius: 2, p: 3, textAlign: 'center' }}>
                <CardContent>
                  <Typography variant='h2' sx={{marginBottom: '30px', fontWeight: 'bold', fontSize: '35px'}} color={isFinalmatch ? 'green' : 'rgba(0,0,0,0.5)'}>{ isFinalmatch ? 'Final Match' : `Round ${match.stage}`}</Typography>
                  {match.winnerTeamId ? <Typography sx={{fontWeight: 'bold', color: 'green'}} variant='h3'>{match.teamANavigation.teamId === match.winnerTeamId ? `${match.teamANavigation.teamName}` : match.teamBNavigation.teamName}</Typography> :
                    <><Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {match.teamANavigation.teamName} 🆚 {match.teamBNavigation.teamName}
                    </Typography>

                      {/* Scores */}
                      {match.visible ? (<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                        <TextField label="ScoreA" name='teamA' onChange={handleTeamA}>
                          {teamA}
                        </TextField>
                        <TextField label="ScoreB" name='teamB' onChange={handleTeamB}>
                          {teamB}
                        </TextField>
                      </Box>) : (<Typography variant='h8' color='grey'>Please start the match</Typography>)}

                      {/* Start Match Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={((e) => {
                          onStartClickHandler(match);
                        })}
                        sx={{ mt: 2 }}
                      >
                        {match.visible ? 'Finish' : "Start Match"}
                      </Button>
                    </>}
                  {/* Teams */}
                </CardContent>
              </Card>
            </Grid2>

          ))}
        </Grid2>
      ) : (<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Typography variant="h6" color="gray">Matches Not Generated</Typography>
      </Box>)}
      <Button 
        variant="contained"
        color="primary"
        fullWidth
        onClick={nextRoundClicHandler}
        sx={{ mt: 2, width: '200px', marginRight: 'auto', marginLeft: 'auto', display:"flex", justifyContent:"center"}} disabled={!enableNextRound}>Initiate Next Round</Button>
    </div>
  )
}

export default Generate
