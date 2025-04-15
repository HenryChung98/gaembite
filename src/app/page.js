"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isBounceStopped, setIsBounceStopped] = useState(false);
  const linkDesign =
    "w-full bg-zinc-700 text-gray-200 p-3 border-1 rounded-xl uppercase font-bold hover:opacity-50 duration-100";

  return (
    <div className="flex flex-col gap-3 items-center justify-center text-center h-screen">
      <Image
        src="/images/gaembitebg-web.webp"
        alt="gaembitebg-web.webp"
        width={200}
        height={200}
        onClick={() => setIsBounceStopped(!isBounceStopped)}
        className={`object-contain rounded-xl duration-1000 ease-in-out ${
          !isBounceStopped && "animate-bounce"
        }`}
      />
      <Link className={linkDesign} href="/games">
        Browse Gaems 🕹️
      </Link>
      <Link className={linkDesign} href="/credits">
        credits 📜
      </Link>
      <a className={linkDesign} href="mailto:tongsik98@gmail.com">
        Send Feedback 📤
      </a>
    </div>
  );
}
