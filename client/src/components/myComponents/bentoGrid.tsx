import { useTheme } from "next-themes";
import React from "react";
import { MagicCard } from "../magicui/magic-card";

interface BentoGridProps {
  projectName: string;
  summary: string;
  rating: string;
  strengths: string;
  weaknesses: string;
  improvements: string;
}

export const BentoGrid = ({
  projectName,
  summary,
  rating,
  strengths,
  weaknesses,
  improvements,
}: BentoGridProps) => {
  const { theme } = useTheme();
  // ("name, rating(overall,cq,readabiltiy, maintainability), summary, strenghts, weaknesses, improvements");
  return (
    <div className="lg:grid lg:grid-cols-2 gap-4 sm:flex sm:flex-col dark w-full lg:px-72 mt-20">
      <div className="grid grid-rows-2 gap-4">
        <MagicCard
          className="cursor-pointer flex flex-col h-28 p-3 text-white items-center justify-center"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <h1 className="text-4xl font-bold">{projectName}</h1>
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex flex-col p-3 row-start-2 text-white"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className="text-4xl font-bold">Rating</div>
          <h1 className="text-4xl font-bold">{rating}</h1>
        </MagicCard>
      </div>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 col-start-2  text-white h-fit"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Summary</h1>
        <p className="my-2">{summary}</p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3  text-white h-fit"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Strengths</h1>
        <p className="my-2">{strengths}</p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3  text-white h-fit"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Weaknesses</h1>
        <p className="my-2">{weaknesses}</p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 col-span-2 text-white h-fit"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Improvements</h1>
        <p className="my-2">{improvements}</p>
      </MagicCard>
    </div>
  );
};
