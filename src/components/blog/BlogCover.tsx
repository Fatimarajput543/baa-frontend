import { useState } from "react";
import logo from "@/assets/images/baa-logo.svg";

// Post image, or a quiet branded placeholder when the post has no image
// (or the image link is broken).
const BlogCover = ({ src, alt }: { src: string | null; alt: string }) => {
  const [failed, setFailed] = useState(false);

  return src && !failed ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="flex size-full items-center justify-center bg-[#EFECEB]">
      <img src={logo} alt="" className="h-[5rem] opacity-25" />
    </div>
  );
};

export const CategoryChip = ({ label }: { label: string }) => (
  <span className="inline-block w-fit rounded-[50px] bg-[#E6F0FF] px-[1.2rem] py-[.4rem] text-[1.2rem] leading-[1.6rem] font-medium tracking-[.4px] text-[#0B3558] uppercase">
    {label}
  </span>
);

export default BlogCover;
