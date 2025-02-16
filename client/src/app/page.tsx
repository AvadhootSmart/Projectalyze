"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import axios from "axios";
import { useState } from "react";
import { motion as m } from "framer-motion";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import { StepLoader } from "@/components/myComponents/Loader";
import { urlSchema } from "@/schemas/url.schema";
import { toast } from "sonner";

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
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data>();

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
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                <div className="fixed p-10 top-0 left-0 w-full backdrop-blur z-[150]">
                    <h1 className="text-white text-2xl top-10 left-8">Project_alyze</h1>
                </div>
                <h1 className="sm:mb-20 lg:text-5xl text-center sm:text-4xl text-white ">
                    Interested to know how good your project is?
                </h1>
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:px-10"
                >
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                </m.div>
                {loading && <StepLoader loading={loading} />}
            </div>
            {data && (
                <div className="text-white text-xl min-h-screen flex flex-col gap-2 p-10 mb-10">
                    <h1 className="text-4xl">Summary</h1>
                    <p>{data.summary}</p>
                    <h1 className="text-4xl">Rating</h1>
                    <p className="text-3xl p-2 bg-zinc-800 w-fit rounded">{data.overall_rating}</p>
                    <h1 className="text-4xl">Strengths</h1>
                    <p>{data.strengths}</p>
                    <h1 className="text-4xl">Weaknesses</h1>
                    <p>{data.weaknesses}</p>
                    <h1 className="text-4xl">Improvments</h1>
                    <p>{data.improvements}</p>
                </div>
            )}
            <footer className="sm:p-6 lg:p-10 w-full bg-zinc-900 -mt-40 flex justify-between items-center">
                <h1 className="text-white sm:text-xl">DocxGen</h1>
                <IconBrandGithub
                    className="text-white text-2xl cursor-pointer hover:scale-110 transition"
                    onClick={() =>
                        window.open("https://github.com/AvadhootSmart/DocxGen")
                    }
                />
            </footer>
        </div>
    );
}
