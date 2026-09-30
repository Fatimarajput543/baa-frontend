import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

const pageList = (cur: number, total: number): (number | "…")[] => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, cur - 1, cur, cur + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
};

const btn =
  "inline-flex size-[4rem] items-center justify-center rounded-[.8rem] text-[1.4rem] font-medium transition-colors";

const BlogPagination = ({ currentPage, totalPages, totalPosts, perPage, onPageChange }: Props) => {
  if (totalPages <= 1) return null;
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalPosts);

  return (
    <nav
      aria-label="Blog pagination"
      className="flex flex-col items-center justify-between gap-[1.6rem] sm:flex-row"
    >
      <p className="text-[1.4rem] text-[#5A6F77]">
        Showing {from}–{to} of {totalPosts} articles
      </p>

      <div className="flex items-center gap-[.6rem]">
        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`${btn} border border-[#E7EDF6] enabled:cursor-pointer enabled:hover:bg-[#EDF2F8] disabled:opacity-40`}
        >
          <ChevronLeft className="size-[2rem]" />
        </button>

        {pageList(currentPage, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="px-[.6rem] text-[#5A6F77]">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              aria-label={`Page ${p}`}
              className={`${btn} cursor-pointer ${
                p === currentPage
                  ? "bg-[#006BFF] text-white"
                  : "border border-[#E7EDF6] hover:bg-[#EDF2F8]"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`${btn} border border-[#E7EDF6] enabled:cursor-pointer enabled:hover:bg-[#EDF2F8] disabled:opacity-40`}
        >
          <ChevronRight className="size-[2rem]" />
        </button>
      </div>
    </nav>
  );
};

export default BlogPagination;
