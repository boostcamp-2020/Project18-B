import { TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';
import TOPIC from '@utils/cardTopic.json';

function startTellerScene() {
  this.setState(GAME_STATE.TELLER);
  this.startRound();
  setTimeout(() => {
    this.endTellerScene();
  }, TIME.WAIT_TELLER_SELECT);
}

function forceTellerSelect() {
  const teller = this.getTeller();
  if (teller.submittedCard) return;

  teller.forceSubmitCard();
  this.status.topic = TOPIC[teller.submittedCard];
}

function emitTellerDecision() {
  const endTime = this.getEndTime(TIME.WAIT_GUESSER_SELECT);

  emit({
    users: this.getGuessers(),
    name: 'teller decision',
    params: { topic: this.status.topic, endTime },
  });

  const teller = this.getTeller();
  emit({
    socketID: teller.socketID,
    name: 'teller select card',
    params: {
      cardID: teller.submittedCard,
      topic: this.status.topic,
      endTime,
    },
  });
}

function endTellerScene() {
  if (this.getState() !== GAME_STATE.TELLER) return;

  this.forceTellerSelect();
  this.emitTellerDecision();
  this.startGuesserScene();
}

const methodGroup = {
  startTellerScene,
  forceTellerSelect,
  emitTellerDecision,
  endTellerScene,
};

export default methodGroup;
