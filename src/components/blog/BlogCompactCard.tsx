import { NavLink } from "react-router-dom";
import type { WpPost } from "@/types/wordpress";
import { getPostView } from "@/lib/blog";
import BlogCover, { CategoryChip } from "./BlogCover";

// Small horizontal card for the "What's new" column.
const BlogCompactCard = ({ post }: { post: WpPost }) => {
  const p = getPostView(post);
  return (
    <NavLink
      to={`/blog/${p.slug}`}
      className="group flex gap-[1.6rem] border-b border-[#E7EDF6] pb-[2rem] last:border-b-0 last:pb-0"
    >
      <div className="aspect-square w-[10rem] shrink-0 overflow-hidden rounded-[.8rem] sm:w-[12rem]">
        <BlogCover src={p.image} alt={p.title} />
      </div>
      <div className="flex min-w-0 flex-col gap-[.8rem]">
        <CategoryChip label={p.category} />
        <h3 className="line-clamp-3 text-[1.8rem] leading-[2.4rem] font-medium text-[#0B3558] group-hover:underline">
          {p.title}
        </h3>
        <p className="text-[1.3rem] text-[#5A6F77]">
          {p.date} · {p.readingTime}
        </p>
      </div>
    </NavLink>
  );
};

export default BlogCompactCard;
