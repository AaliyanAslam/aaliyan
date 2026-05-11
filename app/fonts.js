import { Urbanist, Inter ,  Nova_Oval } from "next/font/google";

export const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});


export const novaOval = Nova_Oval({
  variable: "--font-nova-oval",
  subsets: ["latin"],
  weight: [  '400'],
});