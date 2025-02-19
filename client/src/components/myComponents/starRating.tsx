import { IconStarFilled } from "@tabler/icons-react";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility is in this path

interface StarRatingProps {
  rating: string;
}

const ratingToStars: Record<StarRatingProps["rating"], number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export const StarRating = ({ rating }: StarRatingProps) => {
  const stars = [1, 2, 3, 4, 5];
  const activeStars = ratingToStars[rating];

  return (
    <div className="w-full flex gap-1 justify-center items-center">
      {stars.map((star, idx) => (
        <IconStarFilled
          key={idx}
          size={50}
          className={cn(
            "transition-colors duration-300",
            idx < activeStars ? "text-yellow-400" : "text-gray-300",
          )}
        />
      ))}
    </div>
  );
};
