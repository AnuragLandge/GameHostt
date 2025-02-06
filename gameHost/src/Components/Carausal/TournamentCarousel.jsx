import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CircularProgress } from "@mui/material";

const TournamentCarousel = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setloading] = useState(true);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:44395/api/Tournaments/carousel")
        setloading(false);
        setTournaments(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };


    fetchData();
  }, []);


  const settings = {

    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <>
      <Box
        sx={{
          position: 'relative',
          top: '660px',
          padding: 3,
          maxWidth: "100%",
          margin: "auto",
          marginTop: 3
        }}>
        {loading ? <CircularProgress  color="secondary" sx={{width: '50px', marginLeft:'50vw'}} /> :
          <>
            <Button variant="contained" sx={{ position: 'relative', left: '45%', bottom: '50px', backgroundColor: "purple" }}>
              Live Tournaments
            </Button>
            {tournaments.length > 0 ? (
              <Slider {...settings}>
                {tournaments.map((tournament) => (
                  <Box key={tournament.tournamentId} sx={{ px: 2 }}>
                    <Card
                      sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: "#fff",
                        height: "220px",
                        maxWidth: "300px",
                        margin: "auto",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}
                        >
                          {tournament.name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Sport:</strong> {tournament.sportType}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Format:</strong> {tournament.format}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Start Date:</strong>{" "}
                          {new Date(tournament.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          <strong>End Date:</strong>{" "}
                          {new Date(tournament.endDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Max Teams:</strong> {tournament.maxTeams}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Slider>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
                  No tournaments available
                </Typography>
              </Box>
            )}</>}
      </Box>

    </>
  )
};
export default TournamentCarousel;



