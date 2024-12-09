import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const ReferencePage = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" gutterBottom>
        Project Reference Page
      </Typography>

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
        </List>
      </Box>
    </Container>
  );
};

export default ReferencePage;
