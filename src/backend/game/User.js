import generateRandom from '@utils/generateRandom';

class User {
  constructor({ socketID, nickname, color }) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.turnID = 0;
    this.submittedCard = null;
    this.votedCard = null;
    this.isTeller = false;
    this.cards = [];
    this.score = 0;
    this.isReady = false;
    this.isSkip = false;
  }

  initOnStart({ turnID } = {}) {
    this.turnID = turnID;
    this.score = 0;
  }

  initOnRound() {
    this.submittedCard = null;
    this.votedCard = null;
    this.isReady = false;
    this.isSkip = false;
  }

  setTeller(boolean) {
    this.isTeller = boolean;
  }

  setReady(isReady) {
    this.isReady = isReady;
  }

  setSkip() {
    this.isSkip = true;
  }

  setColor(color) {
    this.color = color;
  }

  setNickname(nickname) {
    this.nickname = nickname;
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

  getState() {
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
    const { nickname, color, score, isReady } = this;
    return {
      nickname,
      color,
      score,
      isReady,
    };
  }

  forceSubmitCard() {
    const cardID = generateRandom.pickOneFromArray(this.cards);
    this.submittedCard = cardID;
    // 뽑은 카드를 리스트에서 지움
    this.cards = this.cards.filter((card) => card !== cardID);
  }

  // forceVoteCard는 다른 플레이어들의 정보가 필요하기 때문에 voteScene에 작성
}

export default User;
