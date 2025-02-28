import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Projectalyze",
    description: "Get your project analyzed and rated by AI",
    openGraph: {
        title: "Projectalyze",
        description: "Get your project analyzed and rated by AI",
        type: "website",
        siteName: "Projectalyze",
        url: "https://projectalyze.avadhootsmart.xyz",
    },
    twitter: {
        title: "Projectalyze",
        description: "Get your project analyzed and rated by AI",
        card: "summary_large_image",
        creator: "@caffeinevimmer",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
