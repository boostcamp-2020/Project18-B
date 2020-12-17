import Player from './Player';
import socket from './socket';

const PlayerManager = class extends Map {
  constructor(...props) {
    super(...props);
    this.currentPlayerID = '';
    this.tellerID = '';

    this.onInitialize = [];
    this.onUpdate = [];
    this.onDelete = [];
  }

  initialize(players = []) {
    this.currentPlayerID = socket.id;
    this.tellerID = '';
    super.clear();
    players.forEach((player) => super.set(player.socketID, this.set(player)));
    this.onInitialize.forEach((callback) => callback(this.getPlayers()));
  }

  setTellerID(tellerID = '') {
    this.tellerID = tellerID;
    this.forEach((player) => {
      const bTeller = player.socketID === tellerID;
      this.set({
        ...player,
        bTeller,
      });
    });
  }

  set(playerParams = {}) {
    const { socketID } = playerParams;
    if (!socketID) return this;

    let player;
    if (this.has(socketID)) {
      player = this.get(socketID);
      player.update(playerParams);
    } else {
      const isCurrentPlayer = this.currentPlayerID === socketID;
      player = new Player({ ...playerParams, isCurrentPlayer });
      super.set(socketID, player);
    }

    this.onUpdate.forEach((callback) => callback(player));
    return player;
  }

  updateCurrentPlayer(playerParams = {}) {
    this.set({ ...playerParams, socketID: this.currentPlayerID });
  }

  updateCurrentScore() {
    this.forEach((player) => {
      const { score } = player;
      const { current, correct, bonus } = score;
      this.set({
        ...player,
        score: { current: current + correct + bonus, correct: 0, bonus: 0 },
      });
    });
  }

  delete(socketID) {
    if (!this.has(socketID)) return false;

    this.get(socketID).delete();
    const result = super.delete(socketID);
    this.onDelete.forEach((callback) => callback({ socketID }));
    return result;
  }

  clear() {
    this.initialize();
  }

  getMapObject() {
    return this.map.entries.reduce(
      (state, [socketID, player]) => ({ ...state, [socketID]: player }),
      {},
    );
  }

  getPlayers() {
    return [...this.values()];
  }

  getCurrentPlayer() {
    return this.get(this.currentPlayerID);
  }

  getTeller() {
    if (this.tellerID) return this.get(this.tellerID);
    return [...this.map].find((player) => player.bTeller) || null;
  }

  isTeller() {
    return this.currentPlayerID === this.tellerID;
  }
};

export default new PlayerManager();
