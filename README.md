# The Hunter Herald — Virtual CV of Kirsti Hunter

A two-part virtual CV with a warm vintage newsroom feel:

- **The Newsroom Desk** (`index.html`) — an editor's desk collage presenting the CV: press pass, typed profile sheet, newspaper clippings for experience, index cards for skills and education, and a calling card for contact details.
- **The Hunter Herald** (`newspaper.html`) — a pageable broadsheet newspaper (realistic page-flip with folds and shadows) collecting her articles.

## Editing the articles

All newspaper content lives in **`js/articles.js`** — one object per article:

```js
{
  "headline": "...",
  "subhead": "...",
  "dateline": "MOSSEL BAY",
  "date": "14 May 2025",
  "category": "Community",     // Campus | Community | Environment | Arts | Opinion
  "credit": "Mossel Bay Advertiser",
  "pullquote": "...",
  "body": ["paragraph 1", "paragraph 2", "..."]
}
```

Replace the placeholder articles with real ones — pages, the front-page index and page numbers regenerate automatically. Keep bodies roughly 280–420 words so they fit a page. Deep-link to a page with `newspaper.html?page=4`.

> **Note:** the current articles are realistic placeholders written for the MVP, not published work.

## Stack

Static HTML/CSS/JS, no build step. Page-turn engine: [StPageFlip](https://github.com/Nodlik/StPageFlip) (vendored in `vendor/`). Typography scales with CSS container-query units so newspaper pages never reflow or overflow.
