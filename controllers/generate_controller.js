const asyncHandler = require("express-async-handler");
const { default: axios } = require("axios");
require("dotenv").config();
const fs = require("node:fs");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateImage = asyncHandler(async (req, res, next) => {
  const prompt = req.body.prompt;
  const response = await ai.models.generateImages({
    model: "imagen-3.0-generate-002",
    prompt,
  });
});
