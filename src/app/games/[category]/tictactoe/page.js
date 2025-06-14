"use client";
import { useState, useCallback, useMemo } from "react";
import GameNavBar from "@/components/games/GameNavBar";


const DIFFICULTY_LEVELS = {
  Beginner: { row: 10, col: 10, mineNum: 9 },
  Intermediate: { row: 13, col: 13, mineNum: 30 },
  Expert: { row: 20, col: 15, mineNum: 70 },
};

export default function TicTacToe() {
  const [isStarted, setIsStarted] = useState(false);
  const [boardSetting, setBoardSetting] = useState({
    row: 0,
    col: 0,
    mineNum: 0,
  });

  const handleCreateBoard = useCallback((row, col, mineNum) => {
    if (row <= 0 || col <= 0 || mineNum <= 0) {
      console.error("Invalid board settings");
      return;
    }
    if (mineNum >= row * col) {
      console.error("Mines cannot exceed total cells");
      return;
    }

    setBoardSetting({ row, col, mineNum });
    setIsStarted(true);
  }, []);

  const difficultyButtons = useMemo(
    () =>
      Object.entries(DIFFICULTY_LEVELS).map(([level, config]) => (
        <button
          key={level}
          className="rounded py-2 text-black w-[150px] bg-[#e4e1e1] duration-300 hover:bg-[#758fe3]"
          onClick={() =>
            handleCreateBoard(config.row, config.col, config.mineNum)
          }
        >
          {level}
        </button>
      )),
    [handleCreateBoard]
  );

  return (
    <>
      <GameNavBar />
      <div className="bg-[#38406f] rounded">
        {/* {!isStarted ? (
          <div className="bg-[#07133b] rounded-xl m-10 p-10 flex flex-col md:flex-row items-center gap-5">
            {difficultyButtons}
          </div>
        ) : (
          <MineSweeperBoard
            row={boardSetting.row}
            col={boardSetting.col}
            mineNum={boardSetting.mineNum}
          />
        )} */}
      </div>
    </>
  );
}
