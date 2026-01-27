import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "PetGo",
  description: "HyunGyeong Portfolio",
  authors: [{name: "HyunGyeong Portfolio", url: "https://petgo-orcin.vercel.app"}],
  robots: {index: true, follow: true},
  keywords: ["Portfolio", "Publishing", "HomePage", "Responsive"],
  publisher: "HyunGyeong",
  generator: "Next.js",
  twitter: {
    card: "summary",
    creator: "HyunGyeong",
    images: "https://petgo-orcin.vercel.app/favicon.ico"
  },
  openGraph: {
    type: "website",
    url: "https://petgo-orcin.vercel.app",
    title: "PetGo",
    description: "HyunGyeong Portfolio",
    siteName: "PetGo",
    images: [{url: "https://petgo-orcin.vercel.app/favicon.ico"}],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
