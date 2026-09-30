import type { WpPost } from "@/types/wordpress";

// Plain-text version of WordPress HTML (also decodes entities like &#8217;).
const toText = (html: string) =>
  new DOMParser().parseFromString(html, "text/html").documentElement
    .textContent ?? "";

// Display-ready values for a WordPress post. UI only: no API calls here.
export const getPostView = (post: WpPost) => {
  const words = toText(post.content.rendered)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    slug: post.slug,
    title: toText(post.title.rendered).trim(),
    excerpt: toText(post.excerpt.rendered)
      .replace(/\s*\[(…|&hellip;|\.\.\.)\]\s*$/, "")
      .trim(),
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Article",
    author: post._embedded?.author?.[0]?.name ?? null,
    date: new Date(post.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    readingTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
  };
};

export type PostView = ReturnType<typeof getPostView>;
