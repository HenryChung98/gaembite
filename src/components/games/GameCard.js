import Image from 'next/image';

export default function GameCard({ game }) {
  return (
    <a href={`/games/${game.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={game.thumbnail}
          alt={game.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="px-4 py-3">
          <h3 className="text-gray-600 text-xl font-bold">{game.title}</h3>
          <p className="text-gray-600">{game.description}</p>
        </div>
      </div>
    </a>
  );
}