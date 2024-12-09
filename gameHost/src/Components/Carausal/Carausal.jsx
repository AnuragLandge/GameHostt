import { Paper, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import './Carausal.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Carausal() {
  const [sport, setSport] = useState("hockey");
  useEffect(() => {
    const interval = setInterval(() => {
      setSport((prevSport) => {
        // Cycle through sports
        switch (prevSport) {
          case "hockey":
            return "cricket";
          case "cricket":
            return "football";
          case "football":
            return "rugby";
          case "rugby":
            return "hockey";
          default:
            return "hockey";
        }
      });
    }, 3000); // Change sport every 3 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const imageList = [
    "https://assets.challonge.com/_next/static/media/esports1.4fc43c13.jpg",
    "https://assets.challonge.com/_next/static/media/tennis.820f3de9.jpg",
    "https://assets.challonge.com/_next/static/media/soccer.85d58ba7.jpg",
    "https://assets.challonge.com/_next/static/media/pickleball.a47a4378.jpg",
  ];

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ height: "100vh", alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{textAlign:"left"}}>
          <pre>Plan your <span className="changingText">{sport} </span> tournament 
          with <span className="changingText">Tournify</span></pre>
          </Typography>
          <Typography variant="body1" style={{ textAlign:"center" }}>
          Millions of people around the world trust Challonge to manage their tournaments, host their events, and keep their competitive communities organized, informed, and playing together. Take on the Challonge challenge, and game on!<br></br>

            
      
{/*     
      <CheckCircleIcon sx={{ color: "purple", marginRight: "8px", marginTop: "10px" }} /><span className="tick-text">Quick and easy match scheduler</span><br />
      
    
      <CheckCircleIcon sx={{ color: "purple", marginRight: "8px" }} /><span className="tick-text">
      Beautiful live presentation
    </span><br />
    
      <CheckCircleIcon sx={{ color: "purple", marginRight: "8px" }} /><span className="tick-text">
      Online registration page
    </span> */}
  
          <Button color="black" sx={{marginTop:"20px", bgcolor:"purple", color:"white", borderRadius:"10px", padding:"5px 15px"}}>Signup</Button>
          </Typography>
        </Grid>
        {/* Left Section - Carousel */}
        <Grid item xs={12} md={6}>
          <Carousel
            autoPlay={true}
            animation="fade"
            stopAutoPlayOnHover={true}
          >
            {imageList.map((item, index) => (
              <Paper key={index} style={{ transform: "rotate(0deg)", boxShadow:"0px 0px 0px 0px"}}>
                <img
                  style={{
                    width: "110%",
                    height: "118%",
                    borderRadius: "8px",
                    backgroundSize: "cover",
                    objectFit: "cover",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 100px 100%)",
                  }}
                  src={item}
                  alt={`carousel-image-${index}`}
                />
              </Paper>
            ))}
          </Carousel>
        </Grid>

        {/* Right Section - Typography */}
        
      </Grid>
    </div>
  );
}
