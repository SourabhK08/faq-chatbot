// backend/server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI("AIzaSyDfVf4L9-HPg6X_83b1H6VbGG3mPS48Xko");

app.post("/get-response", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
