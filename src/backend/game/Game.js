import generateRandom from '@utils/generateRandom';
import GameList from '@game/GameList';
import User from './User';

const MAX_PLAYER = 6;

export default class Game {
  constructor(roomID) {
    this.roomID = roomID;
    this.users = new Map();
    this.status = {
      isPlaying: false,
      unusedCards: [],
      topic: '',
      turn: 0,
    };
  }

  isEnterable() {
    if (this.status.isPlaying || this.users.size >= MAX_PLAYER) return false;
    return true;
  }

  addUser({ socketID }) {
    const nickname = generateRandom.nickname();
    const color = generateRandom.color();
    const user = new User({ socketID, nickname, color });
    GameList.addID(socketID, this);
    this.users.set(socketID, user);
    return user;
  }

  removeUser({ socketID }) {
    this.users.delete(socketID);
    GameList.removeID(socketID);
    if (this.users.size < 1) {
      GameList.removeID(this.roomID);
    }
  }

  getUser(socketID) {
    if (!this.users.has(socketID)) {
      console.log(`getUser: socketID ${socketID} does not exist`);
      return null;
    }

    return this.users.get(socketID);
  }
}
