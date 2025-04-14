import axios from "axios";

export const getUserProfile = async (access_token) => {
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
