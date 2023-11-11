const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail"); // Corrected import path
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'utils'))); // Serve static files correctly

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Use urlencoded middleware for form data
app.use(cors({
  origin: "*"
}));

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

//Newsletter email
app.post("/api/newsletter", async (req, res) => {
  try {
    const send_to = "info@childsolidarity.org";
    const subject = "Newsletter Email";
    const message = req.body.email;
    
    await sendEmail(subject, message, send_to);
    res.status(200).json({ success: true, message: "Email Sending from server.js" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON
  }
});

//Contact form
app.post("/api/contacts", async (req, res) => {
  try {
    const reply_to = req.body.email;
    const send_to = "info@childsolidarity.org";
    const subject = req.body.subject;
    const message = req.body.message;
    const name = req.body.name;

    await sendEmail(subject, message, send_to, reply_to, name);
    console.log("Email sent successfully"); // Corrected log message

    res.status(200).json({ success: true, message: "Email Sending from server.js" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON
  }
});

//Contact form
app.post("/api/precisegis/contacts", async (req, res) => {
  try {
    const reply_to = req.body.email;
    const send_to = "precisegis@gmail.com";
    const subject = req.body.subject;
    const message = req.body.message;
    const name = req.body.name;

    await sendEmail(subject, message, send_to, reply_to, name);
    console.log("Email sent successfully"); // Corrected log message

    res.status(200).json({ success: true, message: "Email Sending from server.js" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
