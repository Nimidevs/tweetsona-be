const axios = require("axios");

exports.getUserProfile = async (access_token) => {
  const response = await axios.get(`https://api.twitter.com/2/users/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      "user.fields": "profile_image_url,username",
    },
  });
  return response;
};

exports.getUsersTweets = async (token, id) => {
  const response = await axios.get(
    `https://api.twitter.com/2/users/${id}/tweets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        max_results: 5, // can be 5 to 100
      },
    }
  );
  return response;
};
