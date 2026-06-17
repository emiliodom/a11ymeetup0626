# My Notice Block — WordPress Accessibility Meetup, June 2026

A hands-on demo built live at the WordPress Accessibility Meetup. It walks through creating a custom Gutenberg block from scratch, with accessibility baked in from line one — not bolted on afterwards.

Presenter: **Emilio Dominguez**

---

## What's in this repo

| File | What it is |
|---|---|
| `block.json` | Block manifest — name, attributes, supports |
| `edit.js` | Editor view (what the content editor sees in the dashboard) |
| `save.js` | Frontend view (what visitors see on the live site) |
| `style.scss` | Shared styles loaded in both the editor and on the frontend |
| `wp_block_cheatsheet_final.pdf` | Quick-reference cheatsheet for building blocks (Mac + Windows shortcuts) |
| `participant_handout.pdf` | Step-by-step handout for following along during the session |
| `presenter_guide.pdf` | Full presenter notes and talking points |
| `emilio_gutenberg_block_presentation.pdf` | Slide deck (PDF export) |
| `emilio_gutenberg_block_presentation.pptx` | Slide deck (editable PowerPoint) |

---

## The block: My Notice Block

An accessible notice / call-to-action block with four variants: **Info**, **Warning**, **Error**, and **Success**.

Content editors pick the notice type from a sidebar dropdown. The block renders a coloured panel with a decorative icon and editable rich text.

### Accessibility features

Every decision maps to a specific WCAG success criterion:

| Feature | WCAG criterion |
|---|---|
| `<section>` instead of `<div>` | 1.3.1 — Info and Relationships |
| `role="region"` + `aria-label` | 4.1.2 — Name, Role, Value |
| `aria-hidden="true"` on the icon | 1.1.1 — Non-text Content |
| `aria-live="polite"` on the wrapper | 4.1.3 — Status Messages |
| `SelectControl` has an explicit label | 1.3.1 — Info and Relationships |
| All text colours ≥ 4.5:1 contrast ratio | 1.4.3 — Contrast (Minimum) |
| Non-text elements ≥ 3:1 contrast ratio | 1.4.11 — Non-text Contrast |
| `:focus-visible` focus ring (≥ 3 px) | 2.4.7 + 2.4.11 — Focus Visible |
| Type conveyed by colour + icon + label | 1.4.1 — Use of Colour |
| `forced-colors` media query | 1.4.3 — Windows High Contrast Mode |
| `prefers-reduced-motion` guard | 2.3.3 — Animation from Interactions |

---

## How to use the block files

These four files (`block.json`, `edit.js`, `save.js`, `style.scss`) are the core of a custom block plugin. To scaffold a full working plugin around them:

### 1. Scaffold a new block plugin

```bash
npx @wordpress/create-block my-notice-block
```

### 2. Replace the generated source files

Copy `block.json`, `edit.js`, `save.js`, and `style.scss` from this repo into the `src/` folder of the scaffolded plugin, replacing the generated versions.

### 3. Install dependencies and build

```bash
cd my-notice-block
npm install
npm run build
```

### 4. Activate in WordPress

Copy the plugin folder to `wp-content/plugins/`, then activate it from **Plugins → Installed Plugins** in the WordPress dashboard.

### 5. Use the block

Open any post or page in the block editor, search for **"My Notice Block"**, and insert it.

---

## Key concepts covered in the session

- **`block.json`** — the single source of truth for a block's metadata, attributes, and feature flags (`supports`)
- **`edit.js` vs `save.js`** — why these are two separate files and what goes in each
- **`useBlockProps` vs `useBlockProps.save()`** — the correct hook for each file
- **`RichText` vs `RichText.Content`** — inline editor in the dashboard vs. saved HTML on the frontend
- **`InspectorControls`** — how to add controls to the block settings sidebar
- **Block validation** — why changing `save.js` after content exists causes a validation error
- **ARIA landmarks** — `role="region"` + `aria-label` creates a navigable section for screen reader users
- **BEM + SCSS** — scoping block styles with the `.notice` namespace

---

## Reference documents

- **Cheatsheet** (`wp_block_cheatsheet_final.pdf`) — keep this open while coding; covers the most-used hooks, components, and CLI commands
- **Participant handout** (`participant_handout.pdf`) — follow-along guide with each step written out
- **Presenter guide** (`presenter_guide.pdf`) — full talking points, pacing notes, and Q&A prompts
- **Slide deck** (`emilio_gutenberg_block_presentation.pdf` / `.pptx`) — presentation slides used during the session

---

## Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [`@wordpress/create-block`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/)
- [Make WordPress Accessible](https://make.wordpress.org/accessibility/)
