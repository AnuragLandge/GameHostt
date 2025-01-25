import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Details from './Details';

export default function Add() {
  const navigate = useNavigate();
  const [shoeForm, setShoeForm] = useState(false);
  const add = () => {
    navigate('add');
    setShoeForm(true);
  }

useEffect(() => {
  console.log(shoeForm);
}, [shoeForm])

  return (
    <>
      { shoeForm ?  <Details/> : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', }}>
        <Typography variant='h4' component="h1" gutterBottom >Add your Tournament</Typography>
        <Button variant='contained' color='primary'
          sx={{ padding: '10px 20px', backgroundColor: 'purple' }}
          onClick={() => {
            add();
          }}>Add Tournaments</Button>
      </div>}
    </>

  );
}
