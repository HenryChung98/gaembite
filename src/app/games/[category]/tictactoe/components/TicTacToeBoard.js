"use client";
import { useState } from "react";

const BOARD_SIZE = 10;
const WIN_CONDITION = 5;

export default function TicTacToeBoard() {
  const [board, setBoard] = useState(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, rIdx) =>
      r.map((cell, cIdx) =>
        rIdx === row && cIdx === col ? currentPlayer : cell
      )
    );

    setBoard(newBoard);

    const result = checkWin(newBoard, row, col, currentPlayer);
    if (result) {
      setWinner(currentPlayer);
      setWinningCells(result);
    } else if (newBoard.flat().every((cell) => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWin = (board, row, col, player) => {
    const directions = [
      [0, 1],  // horizontal
      [1, 0],  // vertical
      [1, 1],  // diagonal ↘
      [1, -1], // diagonal ↙
    ];

    for (let [dx, dy] of directions) {
      let cells = [[row, col]];

      for (let dir of [-1, 1]) {
        let r = row + dir * dx;
        let c = col + dir * dy;

        while (
          r >= 0 &&
          r < BOARD_SIZE &&
          c >= 0 &&
          c < BOARD_SIZE &&
          board[r][c] === player
        ) {
          cells.push([r, c]);
          r += dir * dx;
          c += dir * dy;
        }
      }

      if (cells.length >= WIN_CONDITION) {
        return cells;
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null))
    );
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setWinningCells([]);
  };

  return (
    <div className="m-10 flex flex-col justify-center items-center gap-2">
      <div
        className={`mb-2 text-lg font-semibold ${
          currentPlayer === "X" ? "text-red-400" : "text-blue-400"
        }`}
      >
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a Draw!"
          : `Current: ${currentPlayer}`}
      </div>

      <button
        onClick={resetGame}
        className="mb-4 bg-[#e4e1e1] text-black px-4 py-2 rounded hover:bg-[#758fe3] duration-300"
      >
        Reset
      </button>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 38px)` }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isWinningCell = winningCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );

            const baseStyle =
              cell === null
                ? "bg-[#07133b] hover:opacity-70 cursor-pointer"
                : isWinningCell
                ? "bg-[#c2c3e8]" // winner
                : "bg-[#1d2c5a]";

            const cellTextColor =
              cell === "X" ? "text-red-400" : cell === "O" ? "text-blue-400" : "";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`w-[38px] h-[38px] rounded flex items-center justify-center text-sm font-bold ${baseStyle} ${cellTextColor}`}
              >
                {cell}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
