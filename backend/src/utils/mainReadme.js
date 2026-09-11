const axios = require("axios");

async function getMainRepoReadme(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${username}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw+json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

module.exports = getMainRepoReadme;