const checkTrBlDiagonal = (mx) => {
  if (mx.length === 0) return false;

  if (mx[0][2] === mx[1][1] && mx[1][1] === mx[2][0]) {
    return { sign: mx[0][2], diagonal: "TR-BL" };
  }

  return false;
};

const checkTlBrDiagonal = (mx) => {
  if (mx.length === 0) return false;

  if (mx[0][0] === mx[1][1] && mx[1][1] === mx[2][2]) {
    return { sign: mx[0][0], diagonal: "TL-BR" };
  }

  return false;
};

const checkRows = (board) => {
  for (let i = 0; i < board.length; i++) {
    const firstElement = board[i][0];

    if (!firstElement) {
      continue;
    }

    const flag = isRowIdentical(board[i]);

    if (flag) {
      return { sign: firstElement, row: i };
    }
  }

  return false;
};

function isRowIdentical(row) {
  if (row.length === 0) return false;

  const firstElement = row[0];

  for (let i = 1; i < row.length; i++) {
    if (row[i] !== firstElement) {
      return false;
    }
  }

  return true;
}

const checkColumns = (board) => {
  for (let i = 0; i < board.length; i++) {
    const flag = isColumnIdentical(board, i);

    if (flag) {
      return { sign: board[0][i], column: i };
    }
  }

  return false;
};

const isColumnIdentical = (mx, col) => {
  if (mx.length === 0) return false;

  let j = 0;
  const firstElement = mx[j][col];

  for (j = 1; j < mx.length; j++) {
    if (mx[j][col] !== firstElement) {
      return false;
    }
  }

  return true;
};

const checkForWinner = (board) => {
  const rowsResult = checkRows(board);
  if (rowsResult) {
    // console.log(`Row #${rowsResult.row + 1}`);
    return rowsResult;
  }
  const colsResult = checkColumns(board);
  if (colsResult) {
    // console.log(`Column #${colsResult.column + 1}`);
    return colsResult;
  }
  const tlBrDiagonalResult = checkTlBrDiagonal(board);
  if (tlBrDiagonalResult) {
    // console.log(`${tlBrDiagonalResult.diagonal} diagonal`);
    return tlBrDiagonalResult;
  }
  const trBlDiagonalResult = checkTrBlDiagonal(board);
  if (trBlDiagonalResult) {
    // console.log(`${trBlDiagonalResult.diagonal} diagonal`);
    return trBlDiagonalResult;
  }

  return false;
};

module.exports = { checkForWinner };
