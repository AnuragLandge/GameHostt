import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthConntext';
import axios from 'axios';

export default function Hosthome() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tournament, setTournament] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/Tournaments/${user.userId}`);
        if (response) {
          setTournament(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  const generateClickHandler = async () => {
    try {
      const response = await axios.get(`https://localhost:44395/api/TeamMatches/generate/${tournament.tournamentId}`);
      if (response.status === 200) {
        navigate(`/addtournament/generate?tournamentId=${tournament.tournamentId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ManageClickHandler =()=>{
    navigate(`/addtournament/generate?tournamentId=${tournament.tournamentId}`);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          marginLeft: 75,
          marginBottom: 16,
          position: "fixed"
        }}
      >
        {tournament ? (
          <Card sx={{ maxWidth: 300, boxShadow: 3, borderRadius: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {tournament?.name.toUpperCase()}
              </Typography>
              <Typography variant="body1"><strong>Sport:</strong> {tournament?.sportType}</Typography>
              <Typography variant="body1"><strong>Format:</strong> {tournament?.format}</Typography>
              <Typography variant="body1"><strong>Start Date:</strong> {tournament?.startDate}</Typography>
              <Typography variant="body1"><strong>End Date:</strong> {tournament?.endDate}</Typography>
              <Typography variant="body1"><strong>Max Teams:</strong> {tournament?.maxTeams}</Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={ tournament.teamMatches.length > 0 ? ManageClickHandler : generateClickHandler}
                sx={{ mt: 2, backgroundColor: 'purple' }}
              >
                {tournament.teamMatches.length > 0 ? 'Manage' : 'Generate Matches'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Typography variant='h6' color='grey'>You haven't created any tournaments</Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: "100%", pr: 5, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={ManageClickHandler}
          sx={{ backgroundColor: 'purple', width: 150, height: 40 }}
        >
          Manage
        </Button>
      </Box>

    </>
  );
}
