import { NavLink } from "react-router-dom";
import type { WpPost } from "@/types/wordpress";
import { getPostView } from "@/lib/blog";
import BlogCover, { CategoryChip } from "./BlogCover";

const BlogGridCard = ({ post }: { post: WpPost }) => {
  const p = getPostView(post);
  return (
    <NavLink
      to={`/blog/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-[#E7EDF6] bg-white transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(11,53,88,.12)]"
    >
      <div className="aspect-[16/10] w-full overflow-hidden">
        <BlogCover src={p.image} alt={p.title} />
      </div>
      <div className="flex flex-1 flex-col gap-[1.2rem] p-[2rem]">
        <CategoryChip label={p.category} />
        <h3 className="line-clamp-2 text-[2.2rem] leading-[3rem] font-medium text-[#0B3558] group-hover:underline">
          {p.title}
        </h3>
        {p.excerpt && (
          <p className="line-clamp-3 text-[1.5rem] leading-[2.4rem] font-extralight">
            {p.excerpt}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-[1rem] gap-y-[.2rem] border-t border-[#E7EDF6] pt-[1.4rem] text-[1.3rem] text-[#5A6F77]">
          {p.author && <span className="font-medium text-[#0B3558]">{p.author}</span>}
          <span>{p.date}</span>
          <span aria-hidden>·</span>
          <span>{p.readingTime}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default BlogGridCard;
