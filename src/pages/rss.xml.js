import rss from '@astrojs/rss';
import { getPublishedPosts, postUrl } from '../lib/posts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Andrew Williamson',
    description: 'Notes on writing, editing, reading, and watching.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: postUrl(post),
    })),
  });
}
