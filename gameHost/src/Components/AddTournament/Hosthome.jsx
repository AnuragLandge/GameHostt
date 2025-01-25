import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

export default function Hosthome() {
  const [entries, setEntries] = useState(0); // Initial entries set to 0

  const tournamentDetails = {
    name: 'Example Tournament',
    sport: 'Football',
    format: 'Group Knockout',
    startDate: '2024-12-20',
    endDate: '2024-12-25',
    maxTeams: 16,
  };

  const incrementEntries = () => {
    setEntries((prevEntries) => prevEntries + 1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'whitesmoke',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {tournamentDetails.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Sport:</strong> {tournamentDetails.sport}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Format:</strong> {tournamentDetails.format}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Start Date:</strong> {tournamentDetails.startDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>End Date:</strong> {tournamentDetails.endDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Max Teams:</strong> {tournamentDetails.maxTeams}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Entries:</strong> {entries}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={incrementEntries}
            sx={{ mt: 2 }}
          >
            Add Entry
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
