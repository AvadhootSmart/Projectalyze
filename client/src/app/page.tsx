"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import axios from "axios";
import { useState } from "react";
import { motion as m } from "framer-motion";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
// import { IconBrandGithub } from "@tabler/icons-react";
// import { StepLoader } from "@/components/myComponents/Loader";
import { urlSchema } from "@/schemas/url.schema";
import { toast } from "sonner";
import { BentoGrid } from "@/components/myComponents/bentoGrid";

interface Data {
  summary: string;
  overall_rating: string;
  strengths: string;
  weaknesses: string;
  cq_rating: string;
  readability_rating: string;
  maintainability_rating: string;
  improvements: string;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data>();
  const [projectName, setProjectName] = useState<string>("");

  const placeholders = [
    "Enter a GitHub Repo URL",
    "https://github.com/AvadhootSmart/LCDiary",
    "https://github.com/AvadhootSmart/DevDiary",
  ];

  const fetchData = async () => {
    try {
      if (!url) {
        toast.error("Please enter a GitHub Repo URL");
        return;
      }

      const result = urlSchema.safeParse({ github_repo_url: url });
      setProjectName(url.split("/")[4]);

      if (!result.success) {
        setUrl("");
        toast.error("Invalid Github Repository URL");
        return;
      }

      // setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/process-repo`,
        {
          repo_url: url,
        },
      );

      setData(response.data);
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
      setData(undefined);
    }
    fetchData();
  };

  return (
    <div className="bg-black">
      <div className="w-full min-h-screen flex flex-col justify-center bg-black font-Poppins items-center lg:px-4 relative overflow-x-hidden z-10">
        <m.div
          animate={{
            opacity: [0, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <DotPattern
            className={cn(
              "lg:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
              "sm:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
              { "opacity-0 transition-all duration-500 ease-in-out": data },
            )}
          />
        </m.div>
        <div className="fixed lg:p-10 sm:p-5 top-0 left-0 w-full backdrop-blur z-[150]">
          <h1 className="text-white text-2xl top-10 left-10 ">
            Project_alyze
          </h1>
        </div>
        {data ? (
          <BentoGrid
            projectName={projectName}
            summary={data.summary}
            rating={data.overall_rating}
            strengths={data.strengths}
            improvements={data.improvements}
            weaknesses={data.weaknesses}
          />
        ) : (
          <div>
            <h1 className="sm:mb-20 lg:text-5xl text-center sm:text-4xl text-white ">
              Interested to know how good your project is?
            </h1>
          </div>
        )}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn("w-full sm:px-10 lg:px-72", { "my-20": data })}
        >
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </m.div>
      </div>
    </div>
  );
}
