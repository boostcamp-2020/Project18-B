import DuckObject from '@engine/DuckObject';
import DuckCursorObject from '@engine/DuckCursorObject';

const Player = class {
  constructor({
    socketID,
    nickname,
    color,
    bTeller = false,
    isCurrentPlayer = false,
    bReady = false,
  } = {}) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.score = {
      correct: 0,
      bonus: 0,
      current: 0,
    };
    this.bTeller = bTeller;
    this.isCurrentPlayer = isCurrentPlayer;
    this.bReady = bReady;
    this.duck = new DuckCursorObject({ bReady, color });
    this.votedCardID = null;
    this.submittedCardID = null;
  }

  makeDuck(options = {}) {
    return new DuckObject({ color: this.color, ...options });
  }

  update(params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      this[key] = params[key];
    });

    this.duck.setColor(this.color);
  }

  delete() {
    this.duck.delete();
  }

  setReady(value) {
    if (this.bReady === value) return;
    this.bReady = value;
    this.duck.setVisibility(value, this.isCurrentPlayer);
  }

  updateScore(score) {
    const { correctScore: correct, bonusScore: bonus } = score;
    this.score = {
      ...this.score,
      correct,
      bonus,
    };
  }

  updateCard(cards) {
    const { votedCardID, submittedCardID } = cards;
    this.submittedCardID = submittedCardID;
    this.votedCardID = votedCardID;
  }
};

export default Player;
