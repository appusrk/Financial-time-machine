const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app =express();
const path= require('path');
require('dotenv').config();
const port= process.env.PORT ||5000;
app.use(express.json());

app.use(express.static(path.join(__dirname,'..','frontend')));
app.listen(port, () => {
    console.log(`Static site running at http://localhost:${port}`);
  });
app.post('/calculate',(req,res)=>{
    const {income,expense} =req.body;
    const savings= income-expense;
    res.json({savings});
})













.3