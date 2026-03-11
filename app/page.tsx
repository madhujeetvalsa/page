"use client";

import { useEffect, useState } from "react";
import { useDataAvailability } from "./layout";

export default function Home() {
  // Get the shared state from layout
  const { isDataAvailable, setIsDataAvailable } = useDataAvailability();
  
  // Local state for content and loading
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Update page title and favicon based on data availability
  useEffect(() => {
    // Update title
    document.title = isDataAvailable ? "Feelings in My Words" : "Contact Admin/Owner";

    // Remove old favicon and add new one
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(favicon => favicon.remove());

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = isDataAvailable 
      ? `/icon.png?v=${Date.now()}` 
      : `/logo.svg?v=${Date.now()}`;
    
    document.head.appendChild(favicon);
  }, [isDataAvailable]);

  // Fetch content when data is available
  useEffect(() => {
    if (isDataAvailable) {
      fetch("/api/content")
        .then(res => res.json())
        .then(data => {
          setContent(data.content);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching content:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isDataAvailable]);

  // Show "No Data Available" message
  if (!isDataAvailable) {
    return (
      <div className="notebook-page">
        <div className="notebook-container">
          <div className="margin-line"></div>
          <div className="notebook-content">
            <h1 className="notebook-title" style={{ textAlign: "center", marginTop: "4rem" }}>
              No Data Available
            </h1>
            <p className="notebook-text" style={{ textAlign: "center", fontSize: "1.1rem", marginTop: "2rem" }}>
              There is no data available at this temporary time.
              <br />
              Please contact the admin or owner.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="notebook-page">
        <div className="notebook-container">
          <div className="margin-line"></div>
          <div className="notebook-content">
            <p className="notebook-text" style={{ textAlign: "center", marginTop: "4rem" }}>
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Parse markdown content
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : "My Notebook";

  const dateMatch = content.match(/\*\*Date:\*\*\s*(.+)/);
  const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  // Show normal content
  return (
    <div className="notebook-page">
      <div className="notebook-container">
        <div className="margin-line"></div>
        <div className="notebook-content">
          <h1 className="notebook-title">{title}</h1>
          <p className="notebook-date">{date}</p>
          
          {paragraphs.map((paragraph, index) => {
            // Parse ##highlight## syntax
            const parts = paragraph.split(/(##.*?##)/g);
            
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
                  return part;
                })}
              </p>
            );
          })}
          
          <p className="notebook-signature">{signature}</p>
        </div>
      </div>
    </div>
  );
}
