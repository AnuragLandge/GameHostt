import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';

const AddTeamEntry = () => {
  const [teamName, setTeamName] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [playerNames, setPlayerNames] = useState(['']);

  const handlePlayerNameChange = (index, value) => {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[index] = value;
    setPlayerNames(updatedPlayerNames);
  };

  const handleAddPlayer = () => {
    setPlayerNames([...playerNames, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      teamName,
      numPlayers,
      playerNames,
    });
  };

  return (
    <Box
      component="div"
      onSubmit={handleSubmit}
      sx={{
        width: '700px',
        marginLeft: 10,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          marginBottom: 20,
          marginLeft: 10,
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" align="center">
            Team Information
          </Typography>

          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <TextField
            label="How many players"
            variant="outlined"
            fullWidth
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
          />

          {/* <Typography variant="body1">Player Names</Typography>
          {playerNames.map((playerName, index) => (
            <TextField
              key={index}
              label={`Player ${index + 1} Name`}
              variant="outlined"
              fullWidth
              value={playerName}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            />
          ))}

          <Button variant="contained" color="primary" onClick={handleAddPlayer}>
            Add Another Player
          </Button> */}

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddTeamEntry;
