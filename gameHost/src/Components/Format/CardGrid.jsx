import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Grid2 } from "@mui/material";

const CardGrid = () => {
  const cardData = [
    {
      title: "Card 1",
      description: "This is the description for card 1.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Card 2",
      description: "This is the description for card 2.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Card 3",
      description: "This is the description for card 3.",
      image: "https://via.placeholder.com/150",
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
