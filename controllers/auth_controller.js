const asyncHandler = require("express-async-handler");
const generatePKCE = require("../utils/generatePKCE");
const { default: axios } = require("axios");
const { getUserProfile } = require("../api/getUserProfile");
require("dotenv").config();

const pkceStore = {};

exports.getAuth = asyncHandler(async (req, res) => {
  const { verifier, challenge, state } = generatePKCE();
  //Save the verifier
  pkceStore[state] = verifier;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    scope: "tweet.read users.read offline.access", // minimal scopes for now
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  const xAuthUrl = `https://x.com/i/oauth2/authorize?${params.toString()}`;
  res.redirect(xAuthUrl);
});

exports.getCallback = asyncHandler(async (req, res, next) => {
  const { code, state } = req.query;
  console.log(code, state);

  if (!code) {
    return res.status(400).send("No code provided");
  }

  const code_verifier = pkceStore[state];
  console.log("i was saved: ", code_verifier);

  const basicAuthToken = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios.post(
    `https://api.x.com/2/oauth2/token`,
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      code_verifier,
      code,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuthToken}`,
      },
    }
  );
  const { access_token, refresh_token, expires_in } = response.data;

  console.log("Access Token:", access_token);
  console.log("Refresh Token:", refresh_token);

  const authenticated_user_details = await getUserProfile(access_token);
  const { id, username, profile_image_url } =
    authenticated_user_details.data.data;

  const params = new URLSearchParams({
    username,
    profile_image_url,
  });

  const redirectUrl = `${
    process.env.FRONTEND_REDIRECT_URL
  }/auth/callback?${params.toString()}`;

  res.redirect(redirectUrl);
});
