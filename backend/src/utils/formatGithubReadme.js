
function formatGithubReadme(readmeText) {
  if (!readmeText || typeof readmeText !== "string") {
    return "";
  }

  let text = readmeText;

  // --------------------------------------------------
  // 1. Remove GitHub stats / external images
  // --------------------------------------------------

  text = text.replace(
    /<img[^>]+src=["'][^"']*(github-readme-stats|github-readme-streak-stats)[^"']*["'][^>]*>/gi,
    ""
  );

  text = text.replace(
    /!\[[^\]]*\]\([^)]*(github-readme-stats|github-readme-streak-stats)[^)]*\)/gi,
    ""
  );

  // Remove markdown images
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  // --------------------------------------------------
  // 2. Remove HTML structural tags
  // --------------------------------------------------

  text = text.replace(/<\/?(table|thead|tbody|tr|td|div|p|br|picture|source)[^>]*>/gi, "\n");

  // --------------------------------------------------
  // 3. Handle details / summary
  // --------------------------------------------------

  text = text.replace(/<summary[^>]*>/gi, "\n");
  text = text.replace(/<\/summary>/gi, "\n");

  text = text.replace(/<details[^>]*>/gi, "\n");
  text = text.replace(/<\/details>/gi, "\n");

  // --------------------------------------------------
  // 4. Convert HTML links to readable text
  // --------------------------------------------------

  text = text.replace(
    /<a[^>]*href=["'][^"']*["'][^>]*>(.*?)<\/a>/gis,
    "$1"
  );

  // --------------------------------------------------
  // 5. Remove remaining HTML tags
  // --------------------------------------------------

  text = text.replace(/<[^>]+>/g, "");

  // --------------------------------------------------
  // 6. Convert Markdown links
  // [LinkedIn](https://...)
  // -> LinkedIn
  // --------------------------------------------------

  text = text.replace(
    /\[([^\]]+)\]\([^)]+\)/g,
    "$1"
  );

  // --------------------------------------------------
  // 7. Remove URLs that are not useful content
  // --------------------------------------------------

  text = text.replace(
    /https?:\/\/[^\s)]+/g,
    ""
  );

  // --------------------------------------------------
  // 8. Remove Markdown formatting
  // --------------------------------------------------

  text = text.replace(/\*\*(.*?)\*\*/g, "$1");
  text = text.replace(/__(.*?)__/g, "$1");
  text = text.replace(/\*(.*?)\*/g, "$1");
  text = text.replace(/_(.*?)_/g, "$1");

  // Inline code
  text = text.replace(/`([^`]+)`/g, "$1");

  // --------------------------------------------------
  // 9. Clean headings
  // --------------------------------------------------

  text = text.replace(/^#{1,6}\s*/gm, "");

  // --------------------------------------------------
  // 10. Remove decorative emojis
  // --------------------------------------------------

  text = text.replace(
    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
    ""
  );

  // --------------------------------------------------
  // 11. Clean bullet formatting
  // --------------------------------------------------

  text = text.replace(/^\s*[-*+]\s+/gm, "- ");

  // Remove excessive spaces
  text = text.replace(/[ \t]+/g, " ");

  // --------------------------------------------------
  // 12. Remove GitHub stats related text
  // --------------------------------------------------

  text = text.replace(
    /GitHub Stats[\s\S]*?(?=Currently Focused On|Connect With Me|$)/gi,
    ""
  );

  // --------------------------------------------------
  // 13. Remove decorative separators
  // --------------------------------------------------

  text = text.replace(/^\s*[-_=]{3,}\s*$/gm, "");

  // --------------------------------------------------
  // 14. Clean empty lines
  // --------------------------------------------------

  text = text
    .split("\n")
    .map(line => line.trim())
    .filter((line, index, arr) => {
      // Remove empty lines when previous line is also empty
      if (line === "" && arr[index - 1] === "") {
        return false;
      }

      return true;
    })
    .join("\n");

  // --------------------------------------------------
  // 15. Final cleanup
  // --------------------------------------------------

  text = text
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

module.exports = formatGithubReadme;

