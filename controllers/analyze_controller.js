const asyncHandler = require("express-async-handler");
const { default: axios } = require("axios");
const { getUsersTweets } = require("../api/api_fetch_functions");
const { default: OpenAI } = require("openai");
const { wordsFrequency } = require("../utils/wordFrequencyAnalysis");
const { generatePrompt } = require("../utils/generatePrompt");
require("dotenv").config();
const fs = require("node:fs");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getAndAnalyzeTweets = asyncHandler(async (req, res, next) => {
  // const token = req.x_token;
  // const id = req.user_id;
  // // console.log("im in the analyse controller: ", token, id);
  // const tweetsResponse = await getUsersTweets(token, id);
  // // console.log("users tweets: ", tweetsResponse);

  // const tweets = tweetsResponse.data.data.map((tweet) => tweet.text);
  // const wordFrequency = wordsFrequency(tweets);
  // const formattedTweets = tweets.map((t, i) => `${i + 1}. "${t}"`).join("\n");

  // const prompt = generatePrompt(formattedTweets);
  const prompt = await fs.promises.readFile("assets/prompt.txt", {
    encoding: "utf8",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro-exp-03-25",
    contents: prompt,
  });
  const cleaned = response.text
    .replace(/^```json\s*/i, "") // remove opening ```json
    .replace(/```$/, "") // remove closing ```
    .trim();

  const aiAnalysis = JSON.parse(cleaned);
  console.log("i got generated: ", aiAnalysis);
  res.status(200).json({
    data: {
      ...aiAnalysis,
    },
  });
});
