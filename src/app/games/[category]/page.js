import { games } from "@/lib/games/gameData";
import Link from "next/link";
import GameCard from "@/components/games/GameCard";
import NotFound from "@/app/not-found";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const filteredGames = games.filter((game) => game.category === category);

  if (filteredGames.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NotFound message="game category page" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {category.toUpperCase()}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <Link key={game.id} href={`/games/${category}/${game.id}`}>
            <GameCard game={game} />
          </Link>
        ))}
      </div>
    </div>
  );
}

// 정적 경로 생성을 위한 함수
// export async function generateStaticParams() {
//   const uniqueCategories = Array.from(
//     new Set(games.map((game) => game.category))
//   );

//   return uniqueCategories.map((category) => ({
//     category,
//   }));
// }
