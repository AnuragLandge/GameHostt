import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Grid2 } from "@mui/material";
import img1 from "../Format/1.jpg";
import img2 from "../Format/2.jpg";
import img3 from "../Format/3.jpg";

const CardGrid = () => {
  const cardData = [
    {
      title: "Single Elimination",
      description: "Immediate elimination after losing a match.",
      image: "https://www.mydraw.com/NIMG.axd?i=Templates/Scorecards/SingleEliminationBracket/SingleEliminationBracket.png",
    },
    {
      title: "Double Elimination",
      description: "Double Elimination",
      image: "https://img.freepik.com/free-vector/versus-screen-design-with-shiny-neon-frames-game-battles_107791-6159.jpg?t=st=1733799298~exp=1733802898~hmac=27a2ad8109b59d40043c71f7a72e4314f19aa64c26853a64d67595ad7a638d43&w=1060",
    },
    {
      title: "Round Robin",
      description: "Face off against all participants, one at a time.",
      image: "https://www.bracketsninja.com/_next/image?url=https%3A%2F%2Fwebsite-assets.commoninja.com%2Fdistribution%2F1672829922931_round-robin-hero.png&w=1080&q=75 ",
    },
  ];

  return (
    <Grid2 container spacing={3} sx={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
      {cardData.map((card, index) => (
        <Grid2 item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 500, minWidth: 400 }}>
            <CardMedia
              component="img"
              height="140"
              image={card.image}
              alt={card.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
           <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
           </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CardGrid;
