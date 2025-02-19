import { useTheme } from "next-themes";
import React from "react";
import { MagicCard } from "../magicui/magic-card";
import { Rating } from "@/types/ratings";
import { IconStarFilled } from "@tabler/icons-react";
import { StarRating } from "./starRating";

interface BentoGridProps {
  projectName: string;
  summary: string;
  overall_rating: Rating;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

export const BentoGrid = ({
  projectName,
  summary,
  overall_rating,
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
          className="cursor-pointer flex flex-col lg:p-3 sm:p-4 text-white items-center justify-center"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <h1 className="text-4xl font-bold">{projectName}</h1>
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex flex-col lg:p-3 sm:p-4 row-start-2 justify-center items-center text-white"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className="text-4xl font-bold sm:hidden">Rating</div>
          {/* present the grades using stars rather than words */}
          <StarRating rating={overall_rating.rating} />
        </MagicCard>
      </div>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 col-start-2  text-white "
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Summary</h1>
        <p className="my-2 text-xl">{summary}</p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3  text-white"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Strengths</h1>
        <ul className="flex flex-col gap-1 list-disc ml-8 mt-1 text-xl">
          {strengths.map((strength, index: number) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3  text-white "
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Weaknesses</h1>
        <ul className="flex flex-col gap-1 list-disc ml-8 mt-1 text-xl">
          {weaknesses.map((weakness, index: number) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex flex-col p-3 col-span-2 text-white "
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className="text-4xl font-bold">Improvements</h1>
        <ul className="flex flex-col gap-1 list-disc ml-8 mt-1 text-xl">
          {improvements.map((improvement, index: number) => (
            <li key={index}>{improvement}</li>
          ))}
        </ul>
      </MagicCard>
    </div>
  );
};
