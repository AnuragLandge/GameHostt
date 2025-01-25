import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Hosthome from './Hosthome';


export default function Details() {

  const navigate  = useNavigate();
  const[show, setShow] = useState(false);
  const showdetails = () =>{
        navigate('host-home')
        setShow(true)
  }
  const [formValues, setFormValues] = useState({
    tournamentName: '',
    sportType: '',
    format: '',
    startDate: '',
    endDate: '',
    maxTeams: '',
  });

  const formats = ['Group Knockout', 'Round Robin', 'Single Elimination'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formValues);
  };

  return (
    <>
   
    {show ? <Hosthome/> : <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        maxWidth: 400,
        height: 'auto',
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'white',
        mt: 6,
        mr: 60,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Tournament Details
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Tournament Name"
          name="tournamentName"
          value={formValues.tournamentName}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Sport Type"
          name="sportType"
          value={formValues.sportType}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Format"
          name="format"
          value={formValues.format}
          onChange={handleChange}
          select
          fullWidth
          required
          margin="dense"
        >
          {formats.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={formValues.startDate}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={formValues.endDate}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Max Teams"
          name="maxTeams"
          type="number"
          value={formValues.maxTeams}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
          inputProps={{ min: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 ,backgroundColor: 'purple'}}
          onClick={()=>{showdetails}}
        >
          Submit
        </Button>
      </form>
    </Box>}
    </>
  );
}
