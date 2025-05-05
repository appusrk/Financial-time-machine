const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app =express();
const path= require('path');
require('dotenv').config();
const port= process.env.PORT ||5000;
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/emi', express.static(path.join(__dirname, '..', 'frontend', 'emi-calculator', 'build')));
app.get('/emi', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'emi-calculator', 'build'));
});
const Expensedata = require('./models/Expensedata');



app.post('/calculate',(req,res)=>{
    const {income,expense} =req.body;
    const savings= income-expense;
    res.json({savings});
})


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

app.post('/savechart',(req,res)=>{
  const {grocery, travel, medical, misc}=req.body;
  
  const newentry =new Expensedata({
    grocery,travel,medical,misc
  }); 
  newentry.save()
 
  .then(()=>res.json({message: 'Data saved sucessfuly'}))
  .catch(err=>res.status(500).json({message: err.message}));

});
app.listen(port, () => {
  console.log(`Static site running at http://localhost:${port}`);
});


