import { Rating } from "./ratings";

export interface RatingResponse {
  summary: string;
  complexity: string;
  improvements: string[];
  strengths: string[];
  weaknesses: string[];
  cq_rating: Rating;
  overall_rating: Rating;
  readability_rating: Rating;
  maintainability_rating: Rating;
}
