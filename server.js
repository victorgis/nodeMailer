const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", async (req, res) => {
  const { email } = req.body;

  console.log(req.body)

  try {
    const send_to = "precisegis@gmail.com";
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = req.body.subject;
    const message = req.body.message;

    // console.log(subject)

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sending from serverjs" });
  } catch (error) {
    res.status(500).json(error.message);
  }
  
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});