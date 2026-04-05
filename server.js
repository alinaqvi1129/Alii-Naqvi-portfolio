const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.post("/contact", async (req, res) => {

const { name, email, message } = req.body;

try{

const transporter = nodemailer.createTransport({

service: "gmail",

auth: {
user: process.env.EMAIL,
pass: process.env.PASSWORD
}

});

await transporter.sendMail({

from: email,

to: process.env.EMAIL,

subject: "Portfolio Contact Message",

text: `
Name: ${name}
Email: ${email}
Message: ${message}
`

});

res.json({status:"Message Sent"});

}catch(err){

res.status(500).json({error:"Error sending email"});

}

});

// --- DYNAMIC DATA ENDPOINTS ---
const DATA_FILE = path.join(__dirname, "data.json");

app.get("/api/ping", (req, res) => {
  res.json({ status: "online" });
});

app.get("/api/likes", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    res.json(data.likes);
  } catch(err) {
    res.status(500).json({ error: "Failed to read likes file" });
  }
});

app.post("/api/likes/:projectId", (req, res) => {
  try {
    const projectId = req.params.projectId;
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    
    if (data.likes[projectId] === undefined) {
      data.likes[projectId] = 0;
    }
    data.likes[projectId] += 1;
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, likes: data.likes[projectId] });
  } catch(err) {
    res.status(500).json({ error: "Failed to process like" });
  }
});


app.listen(5000,()=>{
console.log("Server running on port 5000");
});