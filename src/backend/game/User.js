class User {
  constructor({ socketID, nickname, color }) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.turnID = 0;
    this.submittedCard = null;
    this.votedCard = null;
    this.isTeller = null;
    this.cards = [];
    this.score = 0;
    this.isReady = false;
  }

  toggleReady(isReady) {
    this.isReady = isReady;
  }

  submitCard(cardID) {
    this.submittedCard = cardID;
  }

  voteCard(cardID) {
    this.votedCard = cardID;
  }

  addCard(cardID) {
    this.cards = [...this.cards, cardID];
  }

  getUserInfo() {
    const {
      socketID,
      nickname,
      color,
      turnID,
      submittedCard,
      votedCard,
      isTeller,
      cards,
      score,
      isReady,
    } = this;

    return {
      socketID,
      nickname,
      color,
      turnID,
      submittedCard,
      votedCard,
      isTeller,
      cards,
      score,
      isReady,
    };
  }

  getProfile() {
    const { nickname, color } = this;
    return {
      nickname,
      color,
    };
  }
}

export default User;
