import type { Metadata } from "next";
import "./globals.css";
import TextureOverlay from "@/components/layout/TextureOverlay";
import Navbar from "@/components/layout/Navbar";
import SandCanvas from "@/components/home/SandCanvas";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
    title: {
        template: '%s | Qicheng Domino',
        default: 'Qicheng Domino',
    },
    description: "Creative portfolio, thoughts, and photography of Qicheng (Domino). A builder, designer, writer, and wanderer.",
    keywords: ["Qicheng", "Domino", "Portfolio", "Photography", "Design", "Writer", "Web Development"],
    authors: [{ name: "Qicheng Domino" }],
    creator: "Qicheng Domino",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://qicheng-domino.com",
        title: "Qicheng Domino | Wonderland",
        description: "Creative portfolio, thoughts, and photography of Qicheng (Domino).",
        siteName: "Qicheng Domino",
    },
    twitter: {
        card: "summary_large_image",
        title: "Qicheng Domino",
        description: "Creative portfolio, thoughts, and photography of Qicheng (Domino).",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=Hepta+Slab:wght@1..900&display=swap" rel="stylesheet" />
            </head>
            <body>
                {/* 🎓 这里的设计决策：布局组件（Texture, Navbar, SandCanvas）放在根层级，确保路由跳转时不重复卸载渲染，保持动效丝滑。 */}
                <SandCanvas />
                <TextureOverlay />
                <Navbar />
                <main>
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
            </body>
        </html>
    );
}
