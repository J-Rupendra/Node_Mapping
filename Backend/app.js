const express = require('express');
const { PORT } = require('./constants');
const { graphData } = require('./dummyDatabase');
const app = express();
const cors = require('cors');

app.use(cors())

app.get('/fetchData', (req, res)=>{
    // generating a random number to show different data for different requests.
    const randomValue = Math.floor(Math.random()*2)+1;
    const relationalData = graphData[`example${randomValue}`];
    res.send(relationalData);
})

app.listen(PORT, ()=>{
    console.log(`You can communicate with me using http://localhost:${PORT}`);
})