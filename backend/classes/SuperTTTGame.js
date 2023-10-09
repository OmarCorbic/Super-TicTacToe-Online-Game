const { checkForWinner } = require("../utils/checkForWinner.js");
const BasicTTTGame = require("./BasicTTTGame.js");
const Game = require("./Game.js");

class SuperTTTGame extends Game {
  nextMandatoryPos;

  constructor(playerOne, playerTwo) {
    const superTTTBoard = [
      ["TL", "TM", "TR"],
      ["ML", "MD", "MR"],
      ["BL", "BM", "BR"],
    ];
    const gameMode = "SUPER";
    super(superTTTBoard, playerOne, playerTwo, gameMode);
  }

  play(posSuper, posBasic) {
    if (this.gameState === "finished") return;
    if (
      this.nextMandatoryPos !== undefined &&
      (this.nextMandatoryPos.x !== posSuper.x ||
        this.nextMandatoryPos.y !== posSuper.y)
    ) {
      return false;
    }

    // check if the field is populated with a basic game
    if (!(this.board[posSuper.y][posSuper.x] instanceof BasicTTTGame)) {
      // if not, populate it
      const newBasicGame = new BasicTTTGame(this.playerOne, this.playerTwo);

      newBasicGame.playerTurn = this.playerTurn;
      newBasicGame.play(posBasic);

      this.changePlayerTurn();
      this.board[posSuper.y][posSuper.x] = newBasicGame;
      this.nextMandatoryPos = newBasicGame.lastTurnPosition;
    } else {
      const currentGame = this.board[posSuper.y][posSuper.x];

      currentGame.playerTurn = this.playerTurn;
      currentGame.play(posBasic);

      this.changePlayerTurn();
      this.board[posSuper.y][posSuper.x] = currentGame;
      this.nextMandatoryPos = currentGame.lastTurnPosition;

      const basicGameWinner = currentGame.winner;
      if (basicGameWinner) {
        this.board[posSuper.y][posSuper.x] = basicGameWinner.sign;
      }
    }

    if (
      this.board[this.nextMandatoryPos.y][this.nextMandatoryPos.x] === "X" ||
      this.board[this.nextMandatoryPos.y][this.nextMandatoryPos.x] === "O"
    ) {
      this.nextMandatoryPos = undefined; // player picks quadrant freely if last positon landed on the finished game
    }

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
      this.nextMandatoryPos = undefined;
    }

    return true;
  }

  // Getters
  getNextMandatoryPos() {
    return this.nextMandatoryPos;
  }

  // Setters
  setNextMandatoryPos(pos) {
    this.nextMandatoryPos = pos;
  }
}

module.exports = SuperTTTGame;
