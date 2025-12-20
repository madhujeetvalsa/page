# Notebook Page - Dynamic Content

This notebook page dynamically reads content from the `content.md` file and renders it in a beautiful notebook design.

## 📝 How to Edit Content

Simply edit the `content.md` file in the root directory to update your notebook content!

### File Structure

```markdown
# Your Title Here

**Date:** Your date here

---

Your first paragraph goes here...

Your second paragraph goes here...

Your third paragraph goes here...

---

**Signature:** Your signature here
```

### What You Can Edit

1. **Title**: The first `# Heading` in the file
2. **Date**: Text after `**Date:**`
3. **Paragraphs**: Any text separated by blank lines (double newlines)
4. **Signature**: Text after `**Signature:**`

## 🔄 How It Works

- The page reads `content.md` on every page load
- Content is parsed using `gray-matter`
- Paragraphs are automatically split by double newlines
- Everything renders in the notebook design with handwriting fonts

## ✏️ Editing Workflow

1. Open `content.md` in any text editor
2. Make your changes
3. Save the file
4. Refresh your browser (or wait for hot reload)
5. See your changes instantly on the notebook page!

## 📁 File Location

```
e:\JEETU\page\content.md
```

## 🎨 Features

- ✅ Handwriting fonts (Kalam & Caveat)
- ✅ Responsive design (300-400px mobile optimized)
- ✅ Darker notebook lines for better visibility
- ✅ Authentic paper texture
- ✅ Dynamic content from markdown file

## 🚀 Running the Project

```bash
pnpm dev
# or
pnpm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

**Enjoy your dynamic notebook page!** ✍️📓
