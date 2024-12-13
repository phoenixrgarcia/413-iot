// src/pages/Home.js
import React, { useEffect } from "react";
import { useAppContext } from '../AppContext'; // Import the context
import { useMediaQuery, Container, Typography, Grid2, Card, CardMedia, CardContent } from '@mui/material';
import { fetchRecords } from "../frontend";

function Home() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Access global state
  const isMobile = useMediaQuery('(max-width:768px)'); // Check for mobile view

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login state
  };

  //USE THIS FORMAT FOR BACKEND CALLS
  useEffect(() => {
    async function getRecords() {
      const data = await fetchRecords();
      console.log(data);
    }

    getRecords();
  }, []);


  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        Welcome to Heart Monitor
      </Typography>
      <Typography variant="h3" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Heart Monitor allows you to dependably monitor your heartrate and blood oxygen levels on the go, no matter where you are. 
        Heart Monitor accomplishes this by linking multiple heartrate and blood oxygen sensors to your account. 
      </Typography>

      <Typography variant="h3" gutterBottom>
        Meet the Team
      </Typography>
      <Container maxWidth="lg" >
        <Grid2 container spacing={4} sx={{ width: '100%', margin: 0 }} >
          {[
            { name: "Ishan Adhikari", email: "ishanadhikari@arizona.edu", description: "Electrical and Computer Engineering Senior", img: "/resources/ishan.jpg" },
            { name: "Phoenix Garcia", email: "garciap2@arizona.edu", description: "Software Engineering Senior", img: "/resources/phoenix.jpg" },
            { name: "William Rains", email: "rainsw@arizona.edu", description: "Software Engineering Senior", img: "/resources/william.jpg" },
          ].map((member, index) => (
              <Card sx={{ height: '100%', width: isMobile ? '100%' : '30%'}}>
                <CardMedia
                  component="img"
                  height= {isMobile ? '500' : '300'}
                  image={member.img}
                  alt={`${member.name}'s picture`}
                />
                <CardContent>
                  <Typography variant="h5">{member.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{member.email}</Typography>
                  <Typography variant="body1" sx={{fontSize: 14}}>{member.description}</Typography>
                </CardContent>
              </Card>
          ))}
        </Grid2>
      </Container>
    </Container>
  );
}

export default Home;
