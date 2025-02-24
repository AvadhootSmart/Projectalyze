"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import axios from "axios";
import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
// import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
// import { IconBrandGithub } from "@tabler/icons-react";
// import { StepLoader } from "@/components/myComponents/Loader";
import { urlSchema } from "@/schemas/url.schema";
import { toast } from "sonner";
import { BentoGrid } from "@/components/myComponents/bentoGrid";
import { RatingResponse } from "@/schemas/ratingResponse.schema";
import { BentoGridSkeleton } from "@/components/myComponents/bentoLoader";

export default function Home() {
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<RatingResponse>();
    const [projectName, setProjectName] = useState<string>("");

    const placeholders = [
        "Enter a GitHub Repo URL",
        "https://github.com/AvadhootSmart/LCDiary",
        "https://github.com/AvadhootSmart/DevDiary",
    ];

    const fetchData = async () => {
        try {
            if (!url) {
                toast.error("Please enter a GitHub Repository URL");
                return;
            }

            const result = urlSchema.safeParse({ github_repo_url: url });
            setProjectName(url.split("/")[4]);

            if (!result.success) {
                setUrl("");
                toast.error("Invalid Github Repository URL");
                return;
            }

            setLoading(true);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/process-repo`,
                {
                    repo_url: url,
                },
            );

            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.message(
                "Error Processing Repository, Try again with a smaller codebase public repository",
            );
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data) {
            setData(undefined);
        }
        await fetchData();
    };

    return (
        <div
            className={cn(
                "w-full min-h-screen flex flex-col justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat  font-Poppins items-center lg:px-4 relative overflow-x-hidden z-10 transition-all",
            )}
        >
            <div className="fixed lg:p-10 sm:p-5 top-0 left-0 w-full  z-[150]">
                <h1 className="text-white text-2xl top-10 left-10 ">Project_alyze</h1>
            </div>
            {data ? (
                <div className="mt-10">
                    <BentoGrid
                        projectName={projectName}
                        summary={data.summary}
                        overall_rating={data.overall_rating}
                        strengths={data.strengths}
                        improvements={data.improvements}
                        weaknesses={data.weaknesses}
                    />
                </div>
            ) : (
                <>
                    {loading ? (
                        <AnimatePresence>
                            <m.div
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="flex flex-col gap-8 lg:text-center text-white w-full"
                            >
                                <BentoGridSkeleton />
                            </m.div>
                        </AnimatePresence>
                    ) : (
                        <AnimatePresence>
                            <div className="flex flex-col gap-8 lg:text-center text-white w-full">
                                <m.h1
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    className="font-bold lg:text-6xl text-center sm:text-3xl text-white text-balance"
                                >
                                    Interested to know how good your project is?
                                </m.h1>
                                <m.p
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    className="px-[20vw] mb-10 lg:text-2xl sm:text-md sm:text-center"
                                >
                                    Projectalyze your GitHub repo for an instant rating and
                                    actionable insights to improve your coding skills!
                                </m.p>
                            </div>
                        </AnimatePresence>
                    )}
                </>
            )}
            <m.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn("w-full sm:px-10 lg:px-72", {
                    "my-20": data || loading,
                })}
            >
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </m.div>
        </div>
    );
}
