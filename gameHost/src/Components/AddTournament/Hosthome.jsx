import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthConntext';
import axios from 'axios';

export default function Hosthome() {
  const [entries, setEntries] = useState(0); // Initial entries set to 0

  // const tournamentDetails = {
  //   name: '',
  //   sport: '',
  //   format: '',
  //   startDate: '',
  //   endDate: '',
  //   maxTeams: '',

  // };

  const { user } = useContext(AuthContext)
  const [tournament, setResponse] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/Tournaments/${user.userId}`);
        if (response) {
          setResponse(response.data);
        }

      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
      fetchData();
    }
  }, [user]);



  const navigate = useNavigate();
  const entryClickHandler = () => {
    navigate('/addtournament/addEntry');

  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        //bgcolor: 'whitesmoke',
        marginLeft: 75,
        marginBottom: 16,
        position: "fixed"

      }}
    >
      <Card sx={{ maxWidth: 300, boxShadow: 3, borderRadius: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {tournament?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Sport:</strong> {tournament?.sportType}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Format:</strong> {tournament?.format}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Start Date:</strong> {tournament?.startDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>End Date:</strong> {tournament?.endDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Max Teams:</strong> {tournament?.maxTeams}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Entries:</strong> {entries}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={entryClickHandler}
            sx={{ mt: 2, backgroundColor: 'purple' }}
          >
            Add Entry
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
