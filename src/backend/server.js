const express = require('express');
const app = express();
const cors = require("cors");
const recordRoutes = require('./routes'); // Your routes file

app.use(cors());
app.use(express.json()); // For parsing JSON request bodies
app.use('/', recordRoutes);

app.get('/', (req, res) => {
    res.send('Hello from our server!')
});


app.listen(8080, () => {
    console.log('server listening on port 8080')
});
