const Block = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-[.6rem] bg-[#EEF1F5] ${className}`} />
);

export const GridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div
    className="grid grid-cols-1 gap-[3rem] sm:grid-cols-2 xl:grid-cols-3"
    aria-busy="true"
    aria-label="Loading articles"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="overflow-hidden rounded-[1.2rem] border border-[#E7EDF6]">
        <Block className="aspect-[16/10] w-full !rounded-none" />
        <div className="flex flex-col gap-[1.2rem] p-[2rem]">
          <Block className="h-[2.4rem] w-[10rem]" />
          <Block className="h-[2.6rem] w-full" />
          <Block className="h-[2.6rem] w-[70%]" />
          <Block className="h-[1.6rem] w-[50%]" />
        </div>
      </div>
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <div className="grid gap-[4rem] lg:grid-cols-[2fr_1fr]" aria-busy="true">
    <div className="flex flex-col gap-[2rem]">
      <Block className="aspect-[16/9] w-full !rounded-[1.2rem]" />
      <Block className="h-[2.4rem] w-[12rem]" />
      <Block className="h-[4rem] w-full" />
      <Block className="h-[2rem] w-[60%]" />
    </div>
    <div className="flex flex-col gap-[2rem]">
      {[0, 1].map((i) => (
        <div key={i} className="flex gap-[1.6rem]">
          <Block className="size-[12rem] shrink-0" />
          <div className="flex flex-1 flex-col gap-[1rem]">
            <Block className="h-[2.4rem] w-[10rem]" />
            <Block className="h-[2.4rem] w-full" />
            <Block className="h-[1.6rem] w-[60%]" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
