import Image from "next/image";

export default function GameCard({ game }) {
  return (
    <a href={`/games/${game.id}`}>
      <div className="bg-zinc-700 rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full aspect-[9/15]">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-contain rounded"
          />
        </div>
        <div className="px-4 py-2">
          <h3 className="text-gray-200 text-md md:text-xl font-bold text-center">
            {game.title}
          </h3>
          {/* <p className="text-gray-600">{game.description}</p> */}
        </div>
      </div>
    </a>
  );
}
