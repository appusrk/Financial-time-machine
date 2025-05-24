const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app =express();
const path= require('path');
require('dotenv').config();
const port= process.env.PORT ||5000;

app.use(express.json());
app.use(cors());



app.use(express.static(path.join(__dirname, 'public')));

app.use('/emi', express.static(path.join(__dirname, '..', 'frontend', 'emi-calculator', 'build')));
app.get('/emi', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'emi-calculator', 'build', 'index.html'));
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

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
app.post("/advice", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ reply: "Please provide a question." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: question }]
        }
      ]
    });

    // Correctly extract the response
    const result = await response.response;
    const text = await result.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ reply: "Sorry, I couldn't get an answer right now." });
  }
});




app.listen(port, () => {
  console.log(`Site running at http://localhost:${port}`);
});


