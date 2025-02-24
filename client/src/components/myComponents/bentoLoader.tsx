'use client';

import { useTheme } from "next-themes";
import { MagicCard } from "../magicui/magic-card";
import { Skeleton } from "@/components/ui/skeleton";

export const BentoGridSkeleton = () => {
  const { theme } = useTheme();

  return (
    <div className="lg:grid lg:grid-cols-2 gap-4 sm:flex sm:flex-col dark w-full lg:px-72 mt-20">
      <div className="grid grid-rows-2 gap-4">
        <MagicCard
          className="cursor-pointer flex flex-col lg:p-3 sm:p-4 text-white items-center justify-center"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <Skeleton className="h-10 w-3/4" />
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex flex-col lg:p-3 sm:p-4 row-start-2 justify-center items-center text-white"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className="flex flex-col items-center gap-4 w-full">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </MagicCard>
      </div>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 col-start-2 text-white"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <Skeleton className="h-10 w-1/3 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 text-white"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <Skeleton className="h-10 w-1/3 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 text-white"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <Skeleton className="h-10 w-1/3 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 col-span-2 text-white"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <Skeleton className="h-10 w-1/3 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </MagicCard>
    </div>
  );
};
