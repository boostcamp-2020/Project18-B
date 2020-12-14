import { $create, $id } from '@utils/dom';
import TIME from '@type/time';
import GameObject from './GameObject';

const RED = '#d82e21';
const YELLOW = '#ffd600';

const ProgressBarObject = class extends GameObject {
  setTime(endTime) {
    this.endTime = new Date(endTime).getTime();
    this.time = this.endTime - new Date().getTime();
  }

  setFinishCallBack(callback) {
    this.callback = callback;
  }

  finish() {
    if (this.callback) this.callback();
    clearInterval(this.progressBarTimer);
    clearTimeout(this.timeOutlManager);
    this.progressBarTimer = null;
    this.timeOutlManager = null;
    this.addClass('hide');
  }

  createElement() {
    const wrapper = $create('div');
    const progressBar = $create('div');
    const timeText = $create('span');

    this.setElement(wrapper);
    this.instance.appendChild(progressBar);
    progressBar.appendChild(timeText);

    wrapper.classList.add('progress-bar-wrapper');
    progressBar.classList.add('progress-bar');
    timeText.classList.add('time-text');
  }

  getProgessBar() {
    const progressBar = this.instance.children.item(0);
    const timeText = progressBar.children.item(0);
    return [progressBar, timeText];
  }

  start() {
    this.removeClass('hide');
    const [progressBar, timeText] = this.getProgessBar();
    const { endTime } = this;
    this.progressBarTimer = setInterval(() => {
      const remainTime = endTime - new Date().getTime();
      const widthSize = (remainTime / this.time) * 100;
      progressBar.style.width = `${widthSize}%`;
      if (widthSize < 30) progressBar.style.backgroundColor = RED;
      else if (widthSize < 60) progressBar.style.backgroundColor = YELLOW;
      timeText.innerText = (remainTime / 1000).toFixed(0);
    }, TIME.HALF_SECOND);

    this.timeOutManager = setTimeout(() => {
      this.finish();
    }, this.time);
  }

  clear() {
    if (this.progressBarTimer) this.finish();
  }

  remove() {
    $id('root').removeChild(this.instance);
  }
};

export default ProgressBarObject;
