import { games } from "@/lib/games/gameData";
import GamePlayer from "@/components/games/GamePlayer";

export default async function GamePage({ params }) {
  const { id } = await params; // params에서 id를 추출

  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Game not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{game.title}</h1>
      <GamePlayer game={game} />
    </div>
  );
}

// 정적 경로 생성을 위한 함수 추가
export async function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }));
}
