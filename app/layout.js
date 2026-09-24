import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import PlanProvider from "@/components/PlanProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Oswald({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <PlanProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
