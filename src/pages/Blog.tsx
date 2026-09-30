import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AlignJustify, LayoutGrid } from "lucide-react";
import { getFeaturedPost, getPosts, getWhatsNewPosts } from "@/api/wordpress";
import type { WpPost } from "@/types/wordpress";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogCompactCard from "@/components/blog/BlogCompactCard";
import BlogGridCard from "@/components/blog/BlogGridCard";
import BlogListCard from "@/components/blog/BlogListCard";
import BlogPagination from "@/components/blog/BlogPagination";
import SubscribeForm from "@/components/ui/SubscribeForm";
import { GridSkeleton, HeroSkeleton } from "@/components/blog/BlogSkeleton";

const PER_PAGE = 10;

const Label = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-[2rem] text-[1.2rem] leading-[2rem] font-medium tracking-[.6px] text-[#5A6F77] uppercase">
    {children}
  </h2>
);

const Blog = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [total, setTotal] = useState(0);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(false);

  const [featured, setFeatured] = useState<WpPost | null>(null);
  const [latest, setLatest] = useState<WpPost[]>([]);
  const [heroLoading, setHeroLoading] = useState(true);

  const listRef = useRef<HTMLElement>(null);

  const loadPosts = useCallback((p: number) => {
    setPostsLoading(true);
    setPostsError(false);
    getPosts(p, PER_PAGE)
      .then((d) => {
        setPosts(d.posts);
        setTotal(Number.isNaN(d.total) ? d.posts.length : d.total);
      })
      .catch(() => setPostsError(true))
      .finally(() => setPostsLoading(false));
  }, []);

  useEffect(() => {
    loadPosts(page);
  }, [page, loadPosts]);

  useEffect(() => {
    Promise.allSettled([getFeaturedPost(), getWhatsNewPosts()])
      .then(([f, w]) => {
        const feat = f.status === "fulfilled" ? (f.value ?? null) : null;
        const news = w.status === "fulfilled" ? (w.value as WpPost[]) : [];
        // Not enough posts for a separate featured story: promote the newest.
        if (!feat && news.length) {
          setFeatured(news[0]);
          setLatest(news.slice(1));
        } else {
          setFeatured(feat);
          setLatest(news);
        }
      })
      .finally(() => setHeroLoading(false));
  }, []);

  const goToPage = (p: number) => {
    setPage(p);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggle = (mode: "grid" | "list", label: string, Icon: typeof LayoutGrid) => (
    <button
      onClick={() => setView(mode)}
      aria-label={label}
      aria-pressed={view === mode}
      className={`inline-flex size-[4rem] cursor-pointer items-center justify-center rounded-[.8rem] ${
        view === mode ? "bg-[#E6F0FF] text-[#006BFF]" : "text-[#5A6F77] hover:bg-[#F2F4F7]"
      }`}
    >
      <Icon className="size-[2.2rem]" />
    </button>
  );

  return (
    <main>
      <Helmet>
        <title>BAA – Blog</title>
        <meta
          name="description"
          content="Insights, stories and updates on using data for humanitarian and development work."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-[#EFECEB] px-[2rem] pt-[14rem] pb-[6rem] md:px-[4rem] md:pt-[16rem] md:pb-[8rem]">
        <div className="mx-auto flex max-w-[128rem] flex-col gap-[2rem]">
          <h1 className="text-[3.6rem] leading-[4.4rem] font-medium tracking-[-0.4px] md:text-[5.2rem] md:leading-[6rem]">
            <span className="text-[#006BFF]">Insights</span> that turn data
            into action.
          </h1>
          <p className="max-w-[70rem] text-[1.8rem] font-extralight md:text-[2rem] md:leading-[3rem]">
            Stories, analysis and updates from our work in humanitarian and
            development data.
          </p>
        </div>
      </section>

      {/* Featured + What's new */}
      <section className="px-[2rem] pt-[6rem] md:px-[4rem] md:pt-[8rem]">
        <div className="mx-auto max-w-[128rem]">
          {heroLoading ? (
            <HeroSkeleton />
          ) : (
            featured && (
              <div className="grid gap-[5rem] lg:grid-cols-[2fr_1fr] lg:gap-[6rem]">
                <div>
                  <Label>Featured story</Label>
                  <BlogFeaturedCard post={featured} />
                </div>
                {latest.length > 0 && (
                  <div>
                    <Label>What's new</Label>
                    <div className="flex flex-col gap-[2rem]">
                      {latest.map((p) => (
                        <BlogCompactCard key={p.id} post={p} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* All articles */}
      <section
        ref={listRef}
        className="scroll-mt-[10rem] px-[2rem] pt-[6rem] pb-[6rem] md:px-[4rem] md:pt-[8rem]"
      >
        <div className="mx-auto max-w-[128rem]">
          <div className="mb-[3rem] flex items-center justify-between gap-[2rem]">
            <h2 className="text-[3rem] leading-[4rem] font-medium tracking-[-0.3px] md:text-[4rem] md:leading-[4.8rem]">
              All articles
              {!postsLoading && total > 0 && (
                <span className="ml-[1.2rem] text-[2rem] font-light text-[#5A6F77]">
                  {total}
                </span>
              )}
            </h2>
            <div className="hidden items-center gap-[.6rem] xl:flex">
              {toggle("grid", "Grid view", LayoutGrid)}
              {toggle("list", "List view", AlignJustify)}
            </div>
          </div>

          {postsLoading ? (
            <GridSkeleton count={6} />
          ) : postsError ? (
            <div role="alert" className="rounded-[1.2rem] border border-dashed border-[#C9C9C9] p-[4rem] text-center">
              <p className="text-[1.8rem] font-medium">We couldn't load the articles right now.</p>
              <p className="mt-[.6rem] text-[1.5rem] text-[#5A6F77]">
                Check your connection and try again.
              </p>
              <button
                onClick={() => loadPosts(page)}
                className="mt-[2rem] cursor-pointer rounded-[1rem] bg-[#0B3558] px-[2.4rem] py-[1.1rem] text-[1.6rem] text-white"
              >
                Try again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <p className="rounded-[1.2rem] border border-dashed border-[#C9C9C9] p-[4rem] text-center text-[1.8rem]">
              No articles yet. Check back soon.
            </p>
          ) : (
            <>
              {view === "list" && (
                <div className="hidden flex-col gap-[3rem] xl:flex">
                  {posts.map((p) => (
                    <BlogListCard key={p.id} post={p} />
                  ))}
                </div>
              )}
              <div
                className={`grid grid-cols-1 gap-[3rem] sm:grid-cols-2 xl:grid-cols-3 ${
                  view === "list" ? "xl:hidden" : ""
                }`}
              >
                {posts.map((p) => (
                  <BlogGridCard key={p.id} post={p} />
                ))}
              </div>
              <div className="mt-[5rem]">
                <BlogPagination
                  currentPage={page}
                  totalPages={Math.ceil(total / PER_PAGE)}
                  totalPosts={total}
                  perPage={PER_PAGE}
                  onPageChange={goToPage}
                />
              </div>
            </>
          )}
        </div>
      </section>
      {/* Newsletter */}
      <section className="px-[2rem] pb-[8rem] md:px-[4rem]">
        <div className="mx-auto grid max-w-[128rem] gap-[3rem] rounded-[2rem] bg-[#EFECEB] p-[3rem] md:grid-cols-2 md:gap-[6rem] md:p-[6rem]">
          <div className="flex flex-col justify-center gap-[1.6rem]">
            <h2 className="text-[3.2rem] leading-[4rem] font-medium tracking-[-0.3px] md:text-[4.4rem] md:leading-[5.2rem]">
              Never miss a BAA post
            </h2>
            <p className="text-[1.7rem] leading-[2.6rem] font-extralight">
              Subscribe to the categories you care about and get the latest
              posts delivered to your inbox.
            </p>
          </div>
          <div className="rounded-[1.2rem] bg-white p-[2rem] md:p-[3rem]">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
