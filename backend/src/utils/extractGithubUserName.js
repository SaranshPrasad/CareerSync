function extractGithubUsername(url) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname !== "github.com") {
      throw new Error("Invalid GitHub URL");
    }

    const username = parsedUrl.pathname
      .split("/")
      .filter(Boolean)[0];

    if (!username) {
      throw new Error("GitHub username not found");
    }

    return username;
  } catch (error) {
    throw new Error("Invalid GitHub profile URL");
  }
}

module.exports = extractGithubUsername;