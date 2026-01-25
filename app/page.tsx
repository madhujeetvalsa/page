import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  // Read the content.md file
  const filePath = path.join(process.cwd(), "content.md");
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse the markdown file
  const { content } = matter(fileContents);

  // Extract title (first # heading)
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : "My Notebook";

  // Extract date
  const dateMatch = content.match(/\*\*Date:\*\*\s*(.+)/);
  const date = dateMatch
    ? dateMatch[1]
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  // Extract signature if exists
  const signatureMatch = content.match(/\*\*Signature:\*\*\s*(.+)/);
  const signature = signatureMatch ? signatureMatch[1] : "Written with care";

  // Clean content: remove title, date, signature, and --- lines
  const cleanContent = content
    .replace(/^#\s+.+$/m, "") // Remove title line
    .replace(/\*\*Date:\*\*\s*.+$/m, "") // Remove date line
    .replace(/\*\*Signature:\*\*\s*.+$/m, "") // Remove signature line
    .replace(/^---+$/gm, "") // Remove --- separator lines
    .replace(/^\s*$/gm, "") // Remove empty lines
    .trim();

  // Split content into paragraphs (separated by newlines)
  const paragraphs = cleanContent
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !p.startsWith("#") && !p.startsWith("**"));

  return (
    <div className="notebook-page">
      {/* Notebook Container */}
      <div className="notebook-container">
        {/* Left margin line */}
        <div className="margin-line"></div>

        {/* Content Area */}
        <div className="notebook-content">
          {/* Title */}
          <h1 className="notebook-title">{title}</h1>

          {/* Date */}
          <p className="notebook-date">{date}</p>

          {/* Paragraphs */}
          {paragraphs.map((paragraph, index) => {
            // Parse ##highlight## and [text](url) syntax
            const parts = paragraph.split(/(##.*?##|\[.*?\]\(.*?\))/g);
            return (
              <p key={index} className="notebook-text">
                {parts.map((part, i) => {
                  if (part.startsWith("##") && part.endsWith("##")) {
                    return (
                      <span key={i} className="notebook-highlight">
                        {part.slice(2, -2)}
                      </span>
                    );
                  }

                  const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                  if (linkMatch) {
                    return (
                      <a key={i} href={linkMatch[2]} className="notebook-link">
                        {linkMatch[1]}
                      </a>
                    );
                  }

                  return part;
                })}
              </p>
            );
          })}

          {/* Signature */}
          <p className="notebook-signature">{signature}</p>
        </div>
      </div>
    </div>
  );
}
