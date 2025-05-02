const asyncHandler = require("express-async-handler");
const generatePKCE = require("../utils/generatePKCE");
const { default: axios } = require("axios");
const { getUserProfile } = require("../api/api_fetch_functions");
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

  if (!code) {
    return res.status(400).send("No code provided");
  }

  const code_verifier = pkceStore[state];

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

  const authenticated_user_details = await getUserProfile(access_token);
  const { id, username, profile_image_url } =
    authenticated_user_details.data.data;

  res.cookie("x_token", access_token, {
    httpOnly: true,
    secure: true, // only send cookie over HTTPS in prod
    maxAge: expires_in * 1000, // expires_in is usually in seconds
    sameSite: "lax",
  });
  res.cookie("user_id", id, {
    httpOnly: true,
    secure: true, // only send cookie over HTTPS in prod
    maxAge: expires_in * 1000, // expires_in is usually in seconds
    sameSite: "lax",
  });

  const params = new URLSearchParams({
    username,
    profile_image_url,
  });

  const redirectUrl = `${
    process.env.FRONTEND_REDIRECT_URL
  }/auth/callback?${params.toString()}`;

  res.redirect(redirectUrl);
});
