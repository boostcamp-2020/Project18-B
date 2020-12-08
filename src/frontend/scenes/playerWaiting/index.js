import renderPlayerWaiting from './render';

const PlayerWaiting = class {
  constructor({ ProgressBar }) {
    this.ProgressBar = ProgressBar || null;
  }

  render() {
    const { arrayToBeRemoved = [] } = renderPlayerWaiting();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default PlayerWaiting;
