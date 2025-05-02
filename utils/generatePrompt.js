exports.generatePrompt = (formattedTweets) => {
  const prompt = `
You are an expert language analyst, Analyze the user's personality based on these tweets and return structured JSON.

Tweets:
${formattedTweets}

Respond in this exact format:
{
  "sentiment": "[Positive | Neutral | Negative]",
  "sentiment_reasoning": "[Why you classified it that way]",
  "personality": "[A 2–3 sentence summary of their personality traits and tone referring to the user in first person e.g You]",
  "vibe": "[A short phrase capturing their overall vibe — e.g. 'quiet chaos', 'playful ambition', 'cozy cynicism']",
  "image_prompt": "[A short, vivid visual description that could be used to generate a unique profile picture reflecting this user — describe colors, style, mood, and aesthetics. 1–2 sentences max.]"
}
`;

  return prompt;
};

