import { NavLink } from "react-router-dom";
import type { WpPost } from "@/types/wordpress";
import { getPostView } from "@/lib/blog";
import BlogCover, { CategoryChip } from "./BlogCover";

const BlogListCard = ({ post }: { post: WpPost }) => {
  const p = getPostView(post);
  return (
    <NavLink
      to={`/blog/${p.slug}`}
      className="group flex gap-[4rem] border-b border-[#E7EDF6] pb-[3rem] hover:border-[#006BFF]"
    >
      <div className="aspect-[16/10] w-[34rem] shrink-0 overflow-hidden rounded-[1rem]">
        <BlogCover src={p.image} alt={p.title} />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-[1.2rem]">
        <div className="flex items-center gap-[1.2rem]">
          <CategoryChip label={p.category} />
          <span className="text-[1.3rem] text-[#5A6F77]">
            {p.date} · {p.readingTime}
          </span>
        </div>
        <h3 className="line-clamp-2 text-[2.8rem] leading-[3.6rem] font-medium text-[#0B3558] group-hover:underline">
          {p.title}
        </h3>
        {p.excerpt && (
          <p className="line-clamp-2 max-w-[80rem] text-[1.7rem] leading-[2.6rem] font-extralight">
            {p.excerpt}
          </p>
        )}
        {p.author && (
          <p className="text-[1.4rem] text-[#5A6F77]">
            By <span className="font-medium text-[#0B3558]">{p.author}</span>
          </p>
        )}
      </div>
    </NavLink>
  );
};

export default BlogListCard;
