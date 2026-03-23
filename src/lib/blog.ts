import fs from 'fs/promises';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'public', 'blogsciv');

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  return files
    .filter((f) => /^article-\d+-(.+)\.md$/.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/^article-(\d+)/)?.[1] ?? '0', 10);
      const nb = parseInt(b.match(/^article-(\d+)/)?.[1] ?? '0', 10);
      return na - nb;
    })
    .map((f) => {
      const m = f.match(/^article-\d+-(.+)\.md$/);
      return m ? m[1] : '';
    })
    .filter(Boolean);
}

export function extractTitleFromMarkdown(md: string): string {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : 'Article';
}

export function extractDescriptionFromMarkdown(md: string): string {
  const withoutTitle = md.replace(/^#\s+.+\n+/, '').trim();
  const firstPara = withoutTitle.split(/\n\n+/).find((p) => {
    const t = p.trim();
    return t && !t.startsWith('#') && !t.startsWith('---');
  });
  if (!firstPara) return 'Guides for civil contractors and plant hire in Australia.';
  const plain = firstPara.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > 165 ? `${plain.slice(0, 162)}…` : plain;
}

/** Body without first H1 for rendering (title shown separately) */
export function stripMarkdownTitle(md: string): string {
  return md.replace(/^#\s+.+\n+/, '').trim();
}

export async function getPostBySlug(slug: string): Promise<{
  content: string;
  title: string;
  description: string;
} | null> {
  const files = await fs.readdir(BLOG_DIR);
  const file = files.find((f) => f.endsWith(`-${slug}.md`));
  if (!file) return null;
  const content = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
  const title = extractTitleFromMarkdown(content);
  const description = extractDescriptionFromMarkdown(content);
  return { content, title, description };
}

export async function getAllPosts() {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post ? { slug, title: post.title, description: post.description } : null;
    })
  );
  return posts.filter((p): p is { slug: string; title: string; description: string } => p !== null);
}
