const { checkForWinner } = require("../utils/checkForWinner.js");
const Game = require("./Game.js");

class BasicTTTGame extends Game {
  lastTurnPosition;

  constructor(playerOne, playerTwo) {
    const basicTTTBoard = [
      ["TL", "TM", "TR"],
      ["ML", "MD", "MR"],
      ["BL", "BM", "BR"],
    ];
    const gameMode = "BASIC";
    super(basicTTTBoard, playerOne, playerTwo, gameMode);
  }

  play(pos) {
    if (this.gameState !== "finished") {
      if (pos.x >= this.board.length || pos.y >= this.board.length)
        return false;

      if (this.board[pos.y][pos.x] === "X" || this.board[pos.y][pos.x] === "O")
        return false;

      this.board[pos.y][pos.x] = this.playerTurn.sign;
      this.changePlayerTurn();
      this.setLastTurnPosition(pos);

      const winner = checkForWinner(this.board);
      if (winner) {
        let playerId = null;
        if (this.playerOne.sign === winner.sign) {
          playerId = this.playerOne.playerId;
        } else {
          playerId = this.playerTwo.playerId;
        }
        const winnerInfo = { ...winner, playerId };
        this.winner = winnerInfo;
        this.gameState = "finished";
      }
      return true;
    }
  }

  // Getters
  getLastTurnPosition() {
    return this.lastTurnPosition;
  }

  // Setters
  setLastTurnPosition(pos) {
    this.lastTurnPosition = pos;
  }
}

module.exports = BasicTTTGame;
