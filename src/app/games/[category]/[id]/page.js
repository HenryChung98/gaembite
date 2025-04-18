import { games } from "@/lib/games/gameData";
import GamePlayer from "@/components/games/GamePlayer";
import NotFound from "@/app/not-found";

export default async function GamePage({ params }) {
  const { category, id } = await params;

  const game = games.find((g) => g.id === id && g.category === category);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NotFound message="game" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-8">{game.title}</h1> */}
      <GamePlayer game={game} />
    </div>
  );
}

// 정적 경로 생성을 위한 함수
// export async function generateStaticParams() {
//   return games.map((game) => ({
//     category: game.category,
//     id: game.id,
//   }));
// }
