import { IconStarFilled } from "@tabler/icons-react";
import React from "react";

interface StarRatingProps {
  rating?: string;
}

export const StarRating = ({ rating }: StarRatingProps) => {
  // const stars = [1, 2, 3, 4, 5];
  return (
    <div className="w-full flex gap-1 justify-center items-center">
      <IconStarFilled size={50} />
    </div>
  );
};
