import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Details from './Details';

export default function Add() {
  const navigate = useNavigate();
  const [shoeForm, setShoeForm] = useState(false);
  const addButtonClickHandler = () => {
    navigate('details');
    setShoeForm(true);
  }

useEffect(() => {
  console.log(shoeForm);
}, [shoeForm])

  return (
    <>
      { shoeForm ?  <Details/> : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh',position:'fixed', marginLeft:550 }}>
        <Typography variant='h4' component="h1" gutterBottom >Add your Tournament</Typography>
        <Typography variant='h5' component="h2">You can make a tournament one at a time</Typography> 
        <Button variant='contained' color='primary'
          sx={{ padding: '10px 20px', backgroundColor: 'purple', mt: 2}}
          onClick={() => {
            addButtonClickHandler();
          }}>Add Tournaments</Button>
      </div>}
    </>

  );
}
