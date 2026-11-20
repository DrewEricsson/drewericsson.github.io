import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './url';

export type Post = CollectionEntry<'posts'>;

export interface NumberedPost {
  post: Post;
  prog: number;
}

const WORDS_PER_MINUTE = 230;

export async function getPublishedPosts(): Promise<Post[]> {
  const now = new Date();
  const posts = await getCollection('posts', ({ data }) => {
    if (import.meta.env.PROD && data.draft) return false;
    return data.date <= now;
  });
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function withProgNumbers(posts: Post[]): NumberedPost[] {
  const oldestFirst = [...posts].sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  const progById = new Map(oldestFirst.map((post, index) => [post.id, index + 1]));
  return posts.map((post) => ({ post, prog: progById.get(post.id) ?? 0 }));
}

export async function getNumberedPosts(): Promise<NumberedPost[]> {
  return withProgNumbers(await getPublishedPosts());
}

export function formatProg(prog: number): string {
  return `Prog ${String(prog).padStart(3, '0')}`;
}

export function wordCount(body: string | undefined): number {
  if (!body) return 0;
  const text = body
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // keep link text, drop the URL
    .replace(/<[^>]+>/g, ' '); // inline HTML
  return text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function readingTime(words: number): number {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-GB');
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagUrl(tag: string): string {
  return withBase(`/blog/tags/${tagSlug(tag)}/`);
}

export function postUrl(post: Post): string {
  return withBase(`/blog/${post.id}/`);
}
