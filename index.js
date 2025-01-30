const express = require("express");
const cors = require("cors");
const fs = require("fs").promises; // For async file operations
const path = require("path");

const app = express();
const PORT = 4000;

app.use(express.json({ limit: "5mb" })); // Increased payload limit
app.use(cors());

app.post("/generate-test-case", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    // Read the file content
    const filePath = path.join(__dirname, "./file.md");
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Split content into words
    const words = fileContent.split(/\s+/); // splits on whitespace

    // Stream each word
    for (let word of words) {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate delay
      res.write(`${word} `);
    }

    res.end();
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).end("Error reading file");
  }
});

app.listen(PORT, () => {
  console.log(`Mock ChatGPT API running at http://localhost:${PORT}`);
});
