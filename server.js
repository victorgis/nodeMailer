const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin:"*"
}));

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});



app.post("/api/newsletter", async (req, res) => {
  
  try {
    const send_to = "info@childsolidarity.org";
    const subject = "Newsletter Email";
    const message = req.body.message;

    // console.log(subject)

    await sendEmail(subject, message, send_to);
    res.status(200).json({ success: true, message: "Email Sending from serverjs" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/api/contacts", async (req, res) => {

  const name = req.body.name;
  try {
    const reply_to = req.body.email
    const sent_from = req.body.email
    const send_to = "info@childsolidarity.org";
    const subject = req.body.subject;
    const message = `Name: ${name},Email: ${reply_to}, Message: ${req.body.message}`;
    await sendEmail(subject, message, send_to, reply_to, sent_from);
    console.log("email sent successful")
    res.status(200).json({ success: true, message: "Email Sending from serverjs" });
  } catch (error) {
    res.status(500).json(error.message);
  }
  
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});