import './style.scss';
import CardManager from '@utils/CardManager';
import renderPlayerWaiting from './render';
import setupPlayerWaiting from './socket';

const PlayerWaiting = class {
  constructor({ ProgressBar, endTime }) {
    this.endTime = endTime;
    this.ProgressBar = ProgressBar;
    this.ducks = new Map();

    Array.from({ length: CardManager.beforeSubmittedCount }, () =>
      CardManager.dropNewCard(),
    );
    setupPlayerWaiting();
  }

  render() {
    const { ProgressBar, endTime } = this;
    const { arrayToBeRemoved } = renderPlayerWaiting({ ProgressBar, endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default PlayerWaiting;
