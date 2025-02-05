import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthConntext';

const Participate = () => {
  const { user } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/Tournaments/participate/${user.userId}`);
        setTournaments(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const participateClickHandler = (tournament) => {
    navigate("/addtournament/addEntry", { state: { tournament } });
  };

  return (
    <Box
  sx={{
    padding: 3,
    justifyContent:'space-between',
    minHeight: "100vh",
    maxWidth: "100%",
    margin: "auto",
    overflow: "auto",
    display: "grid",
    gap: 4, 
    gridTemplateColumns: {
      xs: "1fr",      
      sm: "repeat(2, 1fr)", 
      md: "repeat(3, 1fr)", 
      lg: "repeat(4, 1fr)"
    },
    alignItems: "stretch",
  }}
>

      {tournaments.length > 0 ? (
        tournaments.map((tournament) => (
          <Card
            key={tournament.tournamentId}
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "200px", // Fixed height to maintain layout
              minWidth: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}>
                {tournament.name}
              </Typography>
              <Typography variant="body2"><strong>Sport:</strong> {tournament.sportType}</Typography>
              <Typography variant="body2"><strong>Format:</strong> {tournament.format}</Typography>
              <Typography variant="body2"><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</Typography>
              <Typography variant="body2"><strong>End Date:</strong> {new Date(tournament.endDate).toLocaleDateString()}</Typography>
              <Typography variant="body2"><strong>Max Teams:</strong> {tournament.maxTeams}</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button
                  sx={{
                    padding: '6px 16px',
                    backgroundColor: 'purple',
                    color: 'white',
                    '&:hover': { backgroundColor: 'darkpurple' },
                  }}
                  onClick={() => participateClickHandler(tournament)}
                >
                  Participate
                </Button>
              </Box>
            </CardContent>
          </Card>

        ))
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
            No tournaments available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Participate;
