const { v4: uuid } = require("uuid");

class Game {
  playerTurn;
  playerOne;
  playerTwo;
  gameId;
  board;
  winner;
  gameState;
  gameMode;

  // Constructor
  constructor(board, playerOne, playerTwo, gameMode) {
    this.gameId = uuid();
    this.board = board;
    this.playerOne = { ...playerOne, sign: "X" };
    this.playerTwo = { ...playerTwo, sign: "O" };
    this.playerTurn = this.playerOne;
    this.gameState = "playing";
    this.winner = null;
    this.gameMode = gameMode;
  }

  changePlayerTurn() {
    if (this.playerTurn.playerId === this.playerOne.playerId) {
      this.playerTurn = this.playerTwo;
    } else {
      this.playerTurn = this.playerOne;
    }
  }

  // Getters
  getPlayerOne() {
    return this.playerOne;
  }

  getPlayerTwo() {
    return this.playerTwo;
  }

  getBoard() {
    return this.board;
  }

  getGameId() {
    return this.gameId;
  }
  getPlayerTurn() {
    return this.playerTurn;
  }

  getWinner() {
    return this.winner;
  }

  getGameState() {
    return this.gameState;
  }

  // Setters
  setPlayerOne(player) {
    this.playerOne = player;
  }

  setPlayerTwo(player) {
    this.playerTwo = player;
  }

  setBoard(board) {
    this.board = board;
  }

  setPlayerTurn(playerId) {
    this.playerTurn = playerId;
  }

  setWinner(winnerInfo) {
    this.winner = winnerInfo;
  }

  setGameState(state) {
    this.gameState = state;
  }
}

module.exports = Game;
