
function formatLinkedinText(text) {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    // Convert escaped newlines into actual spaces
    .replace(/\\n+/g, " ")

    // Convert actual newlines into spaces
    .replace(/\r?\n+/g, " ")

    // Convert tabs into spaces
    .replace(/\t+/g, " ")

    // Remove excessive whitespace
    .replace(/\s+/g, " ")

    // Remove spaces before punctuation
    .replace(/\s+([,.!?;:])/g, "$1")

    // Final trim
    .trim();
}

module.exports = formatLinkedinText;

