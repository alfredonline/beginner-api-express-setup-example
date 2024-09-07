const express = require("express");
const  OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.KEY });

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/example-request", async (req, res) => {
  const requestBody = {
    command: `Produce a short story about a dragon that is afraid of heights.`,
  };

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: requestBody.command },
      {
        role: "system",
        content:
          "You are a helpful assistant designed to tidy up grammar and punctuation.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);

  res.send(completion.choices[0].message.content);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
