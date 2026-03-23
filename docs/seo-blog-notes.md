# Blog SEO & AI search — notes

What we implemented:

- **Unique URLs** — `/blog` index + `/blog/[slug]` per article (shareable, crawlable).
- **Metadata** — `title`, `description`, `canonical`, Open Graph, Twitter cards on each post (helps Google, Bing, social).
- **Structured data (JSON-LD)** — `Blog` on the index; `Article` on each post (`headline`, `description`, `publisher`). Many AI and search systems use schema.org for context.
- **`robots: index, follow`** — pages are meant to be indexed (adjust if you ever want to hide a URL).
- **Semantic HTML** — `<article>`, headings hierarchy, `itemScope` where useful.
- **en-AU / locale** — signals Australian audience in metadata.

What helps rankings & AI answers (ongoing):

- **Clear titles & first paragraphs** — each article already answers “who / what / where” (civil contractors, Australia).
- **Internal links** — link from blog posts to `/start-trial`, product pages, etc. where natural.
- **Fresh content** — update articles or add new posts periodically.
- **Sitemap** — consider adding `/blog` and post URLs to `sitemap.xml` if you add one later.

“AI search” (ChatGPT, Perplexity, etc.) often pulls from indexed pages and structured data; there is no separate “AI SEO” switch — strong pages + schema + backlinks help everywhere.
