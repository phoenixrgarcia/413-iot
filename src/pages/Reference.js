import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const ReferencePage = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" gutterBottom>
        Project Reference Page
      </Typography>

      {/* Code Base Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Code Base
        </Typography>

        <Typography variant="h5" gutterBottom>
          Links
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Github"
              secondary={
                <a
                  href="https://github.com/phoenixrgarcia/413-iot.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit' }}
                >
                  https://github.com/phoenixrgarcia/413-iot.git
                </a>
              }
            />
          </ListItem>

        </List>
      </Box>

      {/* Front End Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Front End
        </Typography>

        <Typography variant="h5" gutterBottom>
          Libraries Used
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="React"
              secondary="A JavaScript library for building user interfaces. React allows for the creation of reusable components, enabling efficient and scalable front-end development."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Material UI"
              secondary="A popular React UI framework providing pre-built components and styles following Google’s Material Design guidelines."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Recharts"
              secondary="A charting library built on React components for visualizing data in an interactive and customizable way."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Date-fns"
              secondary="A lightweight JavaScript date utility library offering extensive date manipulation and formatting features."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="D3-array"
              secondary="A collection of utilities for array manipulation and statistical calculations, commonly used in data visualization projects."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="React Router DOM"
              secondary="A routing library for React applications that enables navigation between views, URL parameter handling, and dynamic routing."
            />
          </ListItem>

        </List>
      </Box>

      {/* Back End Section */}
      <Box>
        <Typography variant="h4" gutterBottom>
          Back End
        </Typography>

        <Typography variant="h5" gutterBottom>
          Libraries Used
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Mongoose"
              secondary="An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to model application data and includes built-in data validation and query building."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Express"
              secondary="A web application framework for Node.js, designed for building APIs and web applications. It simplifies server-side development by providing middleware and routing features."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="CORS"
              secondary="Cross-Origin Resource Sharing (CORS) is a security feature that allows or restricts resources on a web server to be accessed by requests from different origins."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="JWT (JSON Web Token)"
              secondary="A compact and self-contained way of securely transmitting information between parties as a JSON object, commonly used for authentication and information exchange."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="bcrypt"
              secondary="A library for hashing passwords securely using the bcrypt algorithm, adding salt to protect against brute-force attacks and rainbow table attacks."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default ReferencePage;
