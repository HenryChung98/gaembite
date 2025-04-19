"use client";
import GameNavBar from "@/components/games/GameNavBar";
import { useState, useEffect, useRef } from "react";
import styles from "./minesweeper.module.css";

export default function Minesweeper() {
  const [minePositions, setMinePositions] = useState([]);
  const [flaggedCells, setFlaggedCells] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [checkGame, setCheckGame] = useState(0);
  const [timer, setTimer] = useState(0);
  const [remainingMines, setRemainingMines] = useState(0);
  const [boardState, setBoardState] = useState([]);
  const [customSettings, setCustomSettings] = useState({
    row: 0,
    col: 0,
    mine: 0,
  });

  const timerRef = useRef(null);

  // 타이머 관련 함수들
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // 게임 초기화 함수
  const initializeGame = (row, col, mineNum) => {
    setIsStarted(true);
    const newMinePositions = generateMinePositions(mineNum, row * col);
    setMinePositions(newMinePositions);
    setRemainingMines(mineNum);
    setBoardState(Array(row * col).fill({ isOpen: false, content: "" }));
    startTimer();
  };

  // 게임 난이도 설정 함수들
  const easyGame = () => {
    setCheckGame(1);
    initializeGame(10, 10, 9);
  };

  const midGame = () => {
    setCheckGame(2);
    initializeGame(16, 16, 40);
  };

  const hardGame = () => {
    setCheckGame(3);
    initializeGame(30, 30, 180);
  };

  // 셀 클릭 핸들러
  const handleCellClick = (index) => {
    if (isGameOver) return;

    if (isToggled) {
      // 깃발 모드
      setFlaggedCells((prev) => {
        if (prev.includes(index)) {
          return prev.filter((i) => i !== index);
        } else {
          return [...prev, index];
        }
      });
    } else {
      // 일반 모드
      if (minePositions.includes(index)) {
        setIsGameOver(true);
        stopTimer();
        // 모든 지뢰 표시
      } else {
        // 셀 열기 로직
        const newBoardState = [...boardState];
        openCell(index, newBoardState);
        setBoardState(newBoardState);
        checkWinCondition();
      }
    }
  };

  // 빈 셀 열기 함수
  const openCell = (index, board) => {
    // 구현 필요
  };

  // 승리 조건 체크
  const checkWinCondition = () => {
    // 구현 필요
  };

  // 컴포넌트 정리
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className={styles.minesweeperContainer}>
      <GameNavBar />
      <div className={styles.controls}>
        <button onClick={easyGame}>Easy</button>
        <button onClick={midGame}>Medium</button>
        <button onClick={hardGame}>Hard</button>
        <button
          onClick={() => setIsToggled(!isToggled)}
          className={isToggled ? styles.toggledOn : styles.toggledOff}
        >
          🚩
        </button>
      </div>

      <div className={styles.info}>
        <div>Time: {timer}</div>
        <div>Remaining Mines: {remainingMines}</div>
      </div>

      <div className={styles.gameBoard}>
        {boardState.map((cell, index) => (
          <div
            key={index}
            className={`${styles.cell} ${cell.isOpen ? styles.open : ""}`}
            onClick={() => handleCellClick(index)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleCellClick(index);
            }}
          >
            {cell.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// 유틸리티 함수
function generateMinePositions(mineNum, totalCells) {
  const positions = [];
  while (positions.length < mineNum) {
    const pos = Math.floor(Math.random() * totalCells);
    if (!positions.includes(pos)) {
      positions.push(pos);
    }
  }
  return positions;
}
