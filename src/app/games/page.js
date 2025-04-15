import Link from "next/link";

const CategoryButton = ({ category }) => {
  return (
    <>
      <div className="flex justify-center mb-8">
        <Link
          href={`/games/${category}`}
          className="w-full bg-zinc-700 text-gray-200 p-3 text-center border-1 rounded-xl uppercase font-bold hover:opacity-50 duration-100"
        >
          {category}
        </Link>
      </div>
    </>
  );
};

export default function GamesPage() {
  return (
    <div className="flex flex-col px-4 py-8 w-[300px] border-1">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Games Gallery</h1> */}
      <CategoryButton category="minimalism" />
      <CategoryButton category="test" />
    </div>
  );
}
