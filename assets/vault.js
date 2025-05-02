  // const response = await openAi.responses.create({
  //   model: "gpt-4.1",
  //   input: [
  //     {
  //       role: "system",
  //       content:
  //         "You are an expert personality and creative tone analyzer. Return responses in the exact JSON format specified.",
  //     },
  //     {
  //       role: "user",
  //       content: prompt,
  //     },
  //   ],
  //   // text: {
  //   //   format: {
  //   //     type: "json_schema",
  //   //     name: "personality analysis",
  //   //     schema: {
  //   //       type: "object",
  //   //       properties: {
  //   //         sentiment: {
  //   //           type: "string",
  //   //           enum: ["Positive", "Neutral", "Negative"],
  //   //         },
  //   //         sentiment_reasoning: {
  //   //           type: "string",
  //   //         },
  //   //         personality: {
  //   //           type: "string",
  //   //         },
  //   //         vibe: {
  //   //           type: "string",
  //   //         },
  //   //         image_prompt: {
  //   //           type: "string",
  //   //         },
  //   //       },
  //   //       required: [
  //   //         "sentiment",
  //   //         "sentiment_rasoning",
  //   //         "personality",
  //   //         "vibe",
  //   //         "image_prompt",
  //   //       ],
  //   //       additionalProperties: false,
  //   //     },
  //   //     strict: true,
  //   //   },
  //   // },
  // });

  // console.log("Ai response: ", response);

  // const aiAnalysis = JSON.parse(response.output_text);
  // console.log(aiAnalysis);

  // res.status(200).json({
  //   sentiment: aiAnalysis.sentiment,
  //   sentiment_reasoning: aiAnalysis.sentiment_reasoning,
  //   personality: aiAnalysis.personality,
  //   vibe: aiAnalysis.vibe,
  //   imagePrompt: aiAnalysis.image_prompt,
  // });

    // const response = await openAi.responses.create({
  //   model: "gpt-4.1",
  //   input: [
  //     {
  //       role: "system",
  //       content:
  //         "You are an expert personality and creative tone analyzer. Return responses in the exact JSON format specified.",
  //     },
  //     {
  //       role: "user",
  //       content: prompt,
  //     },
  //   ],
  //   text: {
  //     format: {
  //       type: "json_schema",
  //       name: "personality analysis",
  //       schema: {
  //         type: "object",
  //         properties: {
  //           sentiment: {
  //             type: "string",
  //             enum: ["Positive", "Neutral", "Negative"],
  //           },
  //           sentiment_reasoning: {
  //             type: "string",
  //           },
  //           personality: {
  //             type: "string",
  //           },
  //           vibe: {
  //             type: "string",
  //           },
  //           image_prompt: {
  //             type: "string",
  //           },
  //         },
  //         required: [
  //           "sentiment",
  //           "sentiment_rasoning",
  //           "personality",
  //           "vibe",
  //           "image_prompt",
  //         ],
  //         additionalProperties: false,
  //       },
  //       strict: true,
  //     },
  //   },
  // });

  // console.log("Ai response: ", response);

  // const aiAnalysis = JSON.parse(response.output_text);
  // console.log(aiAnalysis);

  // res.status(200).json({
  //   sentiment: aiAnalysis.sentiment,
  //   sentiment_reasoning: aiAnalysis.sentiment_reasoning,
  //   personality: aiAnalysis.personality,
  //   vibe: aiAnalysis.vibe,
  //   imagePrompt: aiAnalysis.image_prompt,
  //   wordFrequency,
  // });

  // exports.aiTest = asyncHandler(async (req, res, next) => {
//   const prompt = await fs.promises.readFile("assets/prompt.txt", {
//     encoding: "utf8",
//   });
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-pro-exp-03-25",
//     contents: prompt,
//   });
//   const cleaned = response.text
//   .replace(/^```json\s*/i, '')  // remove opening ```json
//   .replace(/```$/, '')          // remove closing ```
//   .trim();
//   console.log(typeof cleaned, cleaned)
//   const aiAnalysis = JSON.parse(cleaned)
//   console.log(aiAnalysis);
//   res.status(200).json({
//     response: aiAnalysis,
//   });
//   // console.log(prompt);
// });