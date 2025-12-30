import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const Meaning = () => {
  // Read the quote.md file
  const filePath = path.join(process.cwd(), "quote.md");
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse the markdown file
  const { content } = matter(fileContents);

  // Extract title
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : "Daily Inspiration";

  // Extract date
  const dateMatch = content.match(/\*\*Date:\*\*\s*(.+)/);
  const date = dateMatch ? dateMatch[1] : "";

  // Extract the quote text (looking for content between the first and last double quote)
  const allQuoteContentMatch = content.match(/"([\s\S]+)"/);
  let quotes: string[] = ["No quote found."];

  if (allQuoteContentMatch) {
    // Split by newlines or extract individual quoted blocks
    const lines = allQuoteContentMatch[1]
      .split(/\n/)
      .map((line) => line.replace(/^"|"$/g, "").trim())
      .filter((line) => line.length > 0);

    quotes = lines.slice(0, 4);
  }

  // Extract author if exists
  const authorMatch = content.match(/\*\*Author:\*\*\s*(.+)/);
  const author = authorMatch ? authorMatch[1] : "";

  return (
    <div className="notebook-page">
      <div className="notebook-container">
        <div className="margin-line"></div>
        <div className="notebook-content meaning-content">
          <div className="back-link">
            <Link href="/">← Back to Notebook</Link>
          </div>

          <h1 className="notebook-title">{title}</h1>
          {date && <p className="notebook-date">{date}</p>}

          <div className="quote-wrapper">
            <div className="quote-container">
              <span className="quote-mark open">"</span>
              <div className="notebook-quote-stack">
                {quotes.map((quote, i) => (
                  <blockquote key={i} className="notebook-quote">
                    {quote}
                  </blockquote>
                ))}
              </div>
              <span className="quote-mark close">"</span>
              {author && <cite className="quote-author">— {author}</cite>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meaning;
