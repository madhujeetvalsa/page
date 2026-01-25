# 📓 Premium Notebook Content Renderer

A beautifully crafted, minimalist Next.js application designed to render personal messages, efforts, and inspirations with an authentic notebook aesthetic.

---

## ✨ Key Features

### 🖋️ Authentic Notebook Aesthetic

- **Realistic Paper Design**: Features a subtle paper texture, realistic notebook lines, and a classic red-pink margin line.
- **Handwriting Typography**: Uses premium Google Fonts (`Kalam` for content and `Caveat` for signatures) to mimic real handwriting.
- **Glassmorphic Shadows**: Premium depth effects that make the notebook feel like it's resting on a desk.

### 🧩 Custom Rendering Syntax

Beyond standard Markdown, this renderer supports specialized formatting:

- **Marker Highlight**: Use `##your text##` to apply a realistic yellow highlighter effect to any phrase.
- **Stylized Links**: Standard markdown links `[link text](url)` are rendered as elegant, deep-blue "ink" links with minimalist arrow indicators.
- **Auto-Formatting**: Automatically cleans and splits paragraphs while preserving the handwriting rhythm.

### 📂 Multi-Page Documentation

The system supports multiple entry points, each with its own data source:

- **Home (`/`)**: Renders content from `content.md`. Ideal for main messages.
- **My Efforts (`/efforts`)**: Renders content from `efforts.md`. Focused on personal commitments and growth.
- **Daily Inspiration (`/meaning`)**: Renders content from `quote.md` with a special layout.

### 🎭 Specialized Layouts

- **Staggered Quote System**: On the `/meaning` page, thoughts are automatically arranged in a beautiful left-right-left staggered layout, mimicking post-it notes or hand-scripted quotes.
- **Responsive Geometry**: The layout intelligently adjusts for everything from large desktops to extra-small mobile screens (300px+), maintaining 100% legibility.

---

## 🛠️ Content Structure Guide

Each `.md` file in the root directory follows this optimized structure:

```markdown
# Your Beautiful Title ✨

**Date:** January 25, 2026

---

Hello! This is where you write your message.
You can ##highlight important words## like this.
Check out this [link to my work](https://example.com).

This is a second paragraph with more thoughts.

---

**Signature:** Written with love 💕
```

### Metadata Fields:

1.  **Title**: Extracted from the first `#` heading.
2.  **Date**: Extracted from the line starting with `**Date:**`.
3.  **Body**: All text between the `---` separators.
4.  **Signature**: Extracted from the line starting with `**Signature:**` at the end.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla Modern CSS
- **Parsing**: [Gray-matter](https://github.com/jonschlinkert/gray-matter) for Markdown processing
- **Icons**: Custom CSS-based iconography and Emojis

---

## 📖 Developer Workflow

1.  **Adding a New Page**: Create a new folder in `/app` with a `page.tsx` file.
2.  **Updating Content**: Simply edit the corresponding `.md` file in the root directory.
3.  **Styles**: Core notebook aesthetics are managed in `app/globals.css`.

---

**Developed with care to make digital messages feel personal.** ✍️🧿
