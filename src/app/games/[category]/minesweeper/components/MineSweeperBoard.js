import { useEffect, useState } from "react";
import {
  generateMinePositions,
  countNearbyMines,
  openRecursive,
} from "../utils/mines";
import Image from "next/image";

export default function MineSweeperBoard({ row, col, mineNum }) {
  const totalCells = row * col;

  const [minePositions, setMinePositions] = useState([]);
  const [openCells, setOpenCells] = useState(new Set());
  const [flaggedCells, setFlaggedCells] = useState(new Set());
  const [revealedMines, setRevealedMines] = useState(new Set());
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFlagMode, setIsFlagMode] = useState(false);

  const DEBUG_MODE = true;

  const resetGame = () => {
    setMinePositions(generateMinePositions(mineNum, totalCells));
    setOpenCells(new Set());
    setFlaggedCells(new Set());
    setRevealedMines(new Set());
    setIsGameOver(false);
  };

  useEffect(() => {
    resetGame();
  }, [row, col, mineNum]);

  const handleRightClick = (e, index) => {
    e.preventDefault();
    toggleFlag(index);
  };

  const handleCellTouch = (index) => {
    if (isGameOver || openCells.has(index)) return;

    if (isFlagMode) {
      toggleFlag(index);
    } else {
      if (flaggedCells.has(index)) return;

      if (minePositions.includes(index)) {
        setIsGameOver(true);
        setRevealedMines(new Set(minePositions));
      } else {
        const newOpenCells = new Set(openCells);
        openRecursive(index, newOpenCells, row, col, minePositions);
        setOpenCells(newOpenCells);
      }
    }
  };

  const toggleFlag = (index) => {
    const newFlags = new Set(flaggedCells);
    if (newFlags.has(index)) newFlags.delete(index);
    else newFlags.add(index);
    setFlaggedCells(newFlags);
  };

  const renderCellContent = (index) => {
    const isMine = minePositions.includes(index);
    const isRevealed = revealedMines.has(index);
    const isOpen = openCells.has(index);

    if (isMine && (isRevealed || DEBUG_MODE)) return "💣";
    if (isOpen) {
      const count = countNearbyMines(index, row, col, minePositions);
      return count > 0 ? count : "";
    }
    return "";
  };

  return (
    <div className="m-10 flex flex-col justify-center items-center gap-5">
      <div className="flex items-center space-x-4 mb-2">
        <button onClick={resetGame}>
          <Image
            src="/minesweeper/smile.png"
            alt="restart"
            width={50}
            height={50}
            className="object-contain rounded"
          />
        </button>

        <button
          onClick={() => setIsFlagMode((prev) => !prev)}
          className={`px-3 py-2 text-white rounded ${
            isFlagMode ? "bg-red-500" : "bg-gray-500"
          }`}
        >
          🚩 {isFlagMode ? "Flag ON" : "Flag OFF"}
        </button>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${col}, 30px)` }}
      >
        {Array.from({ length: totalCells }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleCellTouch(index)}
            onContextMenu={(e) => handleRightClick(e, index)}
            className={`w-[30px] h-[30px] border border-gray-400 flex items-center justify-center text-sm font-bold
              ${
                openCells.has(index) || revealedMines.has(index)
                  ? "bg-gray-500"
                  : "bg-gray-900 hover:bg-gray-400 cursor-pointer"
              }`}
          >
            {flaggedCells.has(index) &&
            !openCells.has(index) &&
            !revealedMines.has(index)
              ? "🚩"
              : renderCellContent(index)}
          </div>
        ))}
      </div>
    </div>
  );
}
