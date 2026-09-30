import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { WpPost } from "@/types/wordpress";
import { getPostView } from "@/lib/blog";
import BlogCover, { CategoryChip } from "./BlogCover";

const BlogFeaturedCard = ({ post }: { post: WpPost }) => {
  const p = getPostView(post);
  return (
    <NavLink to={`/blog/${p.slug}`} className="group flex flex-col gap-[2.4rem]">
      <div className="aspect-[2/1] w-full overflow-hidden rounded-[1.2rem]">
        <BlogCover src={p.image} alt={p.title} />
      </div>
      <div className="flex flex-col gap-[1.4rem]">
        <CategoryChip label={p.category} />
        <h2 className="text-[2.8rem] leading-[3.6rem] font-medium tracking-[-0.3px] text-[#0B3558] group-hover:underline md:text-[3.6rem] md:leading-[4.4rem]">
          {p.title}
        </h2>
        {p.excerpt && (
          <p className="line-clamp-3 max-w-[72rem] text-[1.8rem] leading-[2.8rem] font-extralight">
            {p.excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-[1.2rem] gap-y-[.4rem] text-[1.4rem] text-[#5A6F77]">
          {p.author && <span className="font-medium text-[#0B3558]">{p.author}</span>}
          <span>{p.date}</span>
          <span aria-hidden>·</span>
          <span>{p.readingTime}</span>
        </div>
        <span className="inline-flex items-center gap-[.8rem] text-[1.6rem] font-medium text-[#006BFF]">
          Read article
          <ArrowRight className="size-[1.8rem] transition-transform group-hover:translate-x-[.4rem]" />
        </span>
      </div>
    </NavLink>
  );
};

export default BlogFeaturedCard;
