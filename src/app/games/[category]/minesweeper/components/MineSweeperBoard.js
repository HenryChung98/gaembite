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
  const [isGameWon, setIsGameWon] = useState(false);
  const [temporaryFace, setTemporaryFace] = useState(null);

  const DEBUG_MODE = false;

  const resetGame = () => {
    setMinePositions(generateMinePositions(mineNum, totalCells));
    setOpenCells(new Set());
    setFlaggedCells(new Set());
    setRevealedMines(new Set());
    setIsGameOver(false);
    setIsGameWon(false);
  };

  useEffect(() => {
    const totalNonMines = totalCells - mineNum;
    if (openCells.size === totalNonMines && !isGameOver) {
      setIsGameWon(true);
      setRevealedMines(new Set(minePositions));
    } else {
      setIsGameWon(false);
    }
  }, [openCells, minePositions, isGameOver, totalCells, mineNum]);

  useEffect(() => {
    resetGame();
  }, [row, col, mineNum]);

  const handleRightClick = (e, index) => {
    e.preventDefault();
    if (isGameOver || isGameWon) return;
    toggleFlag(index);
  };

  const handleCellTouch = (index) => {
    if (isGameOver || isGameWon || openCells.has(index)) return;

    if (isFlagMode) {
      toggleFlag(index);
    } else {
      if (flaggedCells.has(index)) return;

      if (minePositions.includes(index)) {
        setIsGameOver(true);
        setRevealedMines(new Set(minePositions));
      } else {
        const newOpenCells = new Set(openCells);
        openRecursive(
          index,
          newOpenCells,
          row,
          col,
          minePositions,
          flaggedCells
        );

        const totalNonMines = totalCells - mineNum;
        const predictedOpenCount = newOpenCells.size;

        const willWin = predictedOpenCount === totalNonMines;

        if (!willWin) {
          setTemporaryFace("/minesweeper/superstar.webp");
          setTimeout(() => {
            setTemporaryFace(null);
          }, 200);
        }

        setOpenCells(newOpenCells);
      }
    }
  };

  const toggleFlag = (index) => {
    if (isGameOver || isGameWon) return;
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

  const getFaceImage = () => {
    if (temporaryFace) return temporaryFace;
    if (isGameOver) return "/minesweeper/dizzy.webp";
    if (isGameWon) return "/minesweeper/sunglasses.webp";
    return "/minesweeper/smile.webp";
  };

  return (
    <div className="m-10 flex flex-col justify-center items-center gap-2">
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex flex-col items-center gap-2">
          <button onClick={resetGame}>
            <Image
              src={getFaceImage()}
              alt="restart"
              width={60}
              height={60}
              className="object-contain rounded bg-[#9fb2f1] border-3 border-[#07133b] p-1"
            />
          </button>

          <button
            onClick={() => setIsFlagMode((prev) => !prev)}
            className={`p-1 text-white rounded ${
              isFlagMode ? "bg-[#1d2c5a]" : "bg-[#07133b]"
            }`}
          >
            🚩
          </button>
        </div>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${col}, 25px)` }}
      >
        {Array.from({ length: totalCells }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleCellTouch(index)}
            onContextMenu={(e) => handleRightClick(e, index)}
            className={`w-[25px] h-[25px] rounded flex items-center justify-center text-sm font-bold
  ${
    revealedMines.has(index)
      ? "bg-red-500"
      : openCells.has(index)
      ? "bg-[#1d2c5a]"
      : "bg-[#07133b] hover:opacity-70 cursor-pointer"
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
