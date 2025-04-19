"use client";
import Link from "next/link";
import NavBar from "@/components/NavBar";

const CategoryButton = ({ category }) => {
  return (
    <>
      <div className="flex justify-center mb-8">
        <Link
          href={`/games/${category}`}
          className="w-full bg-zinc-700 text-gray-200 p-3 m-1 text-center border-1 rounded-xl uppercase font-bold hover:opacity-50 duration-100"
        >
          {category}
        </Link>
      </div>
    </>
  );
};

export default function GamesPage() {
  return (
    <div className="grid grid-cols-2 grid-cols-2 gap-6 p-8 w-[500px]">
      <NavBar />
      <CategoryButton category="web-based" />
      <CategoryButton category="minimalism" />
      <Link
          href={`/gamess`}
          className="w-full bg-zinc-700 text-gray-200 p-3 m-1 text-center border-1 rounded-xl uppercase font-bold hover:opacity-50 duration-100"
        >
          404
        </Link>
    </div>
  );
}
