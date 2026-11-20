const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// Adds the site's base path (e.g. /DadsWebsite) to an internal link.
export function withBase(path: string): string {
  return base + path;
}

// The current page path with the base removed, for matching against nav links.
export function stripBase(pathname: string): string {
  return pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
}
