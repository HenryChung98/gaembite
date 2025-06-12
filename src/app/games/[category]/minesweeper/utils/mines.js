export function generateMinePositions(mineNum, totalCells) {
  const minePositions = new Set();
  while (minePositions.size < mineNum) {
    const random = Math.floor(Math.random() * totalCells);
    minePositions.add(random);
  }
  return Array.from(minePositions);
}

export function countNearbyMines(index, rowNum, colNum, minePositions) {
  const row = Math.floor(index / colNum);
  const col = index % colNum;
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < rowNum && newCol >= 0 && newCol < colNum) {
        const newIndex = newRow * colNum + newCol;
        if (minePositions.includes(newIndex)) {
          count++;
        }
      }
    }
  }
  return count;
}

export function openRecursive(index, opened, row, col, minePositions) {
  const queue = [index];

  while (queue.length) {
    const current = queue.pop();
    if (opened.has(current)) continue;

    opened.add(current);

    const count = countNearbyMines(current, row, col, minePositions);
    if (count === 0) {
      const r = Math.floor(current / col);
      const c = current % col;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < row && nc >= 0 && nc < col) {
            queue.push(nr * col + nc);
          }
        }
      }
    }
  }
}
