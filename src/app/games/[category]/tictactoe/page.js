"use client";
import { useState } from "react";
import GameNavBar from "@/components/games/GameNavBar";
import TicTacToeBoard from "./components/TicTacToeBoard";
// reset btn, tie func, check win func, 
export default function TicTacToe() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartGame = () => {
    setIsStarted(true);
  };

  return (
    <>
      <GameNavBar />
      <div className="bg-[#38406f] rounded">
        {!isStarted ? (
          <div className="bg-[#07133b] rounded-xl m-10 p-10 flex flex-col md:flex-row items-center gap-5">
            <button
              className="rounded py-2 text-black w-[150px] bg-[#e4e1e1] duration-300 hover:bg-[#758fe3]"
              onClick={handleStartGame}
            >
              2 Players
            </button>
          </div>
        ) : (
          <TicTacToeBoard />
        )}
      </div>
    </>
  );
}
