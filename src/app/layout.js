import { Poppins } from "next/font/google";
import "./globals.css";
import GoogleAdSense from "@/components/GoogleAdSense";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Gaem Bite",
  description: "Welcome to Gaem Bite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
      <GoogleAdSense />
    </html>
  );
}
