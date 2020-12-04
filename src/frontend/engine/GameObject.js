import { $create, $id } from '@utils/dom';
import TIME from '@utils/time';

// https://easings.net/#easeInOutCubic
const easeOutCubic = (x) => 1 - (1 - x) ** 4;
const makeUnitString = (numericValue, unit) => `${numericValue}${unit}`;
const makeFloat = (unitValue) => parseFloat(unitValue);

const GameObject = class {
  constructor({
    origin = null,
    position = null,
    parent = null,
    depth = null,
    classes = [],
  } = {}) {
    this.createElement();
    this.animationFrame = null;
    this.originStyle = '';
    this.rotateStyle = '';

    this.angle = 0;
    this.position = [0, 0];

    if (depth) this.setDepth(depth);
    if (origin) this.setOrigin(...origin);
    if (position) this.move(...position, 0);
    if (parent) this.attachToObject(parent);
    classes.forEach((className) => {
      this.setClass(className);
    });
  }

  attachToObject(parentObject) {
    if (parentObject) parentObject.appendChild(this);
    else this.attachToRoot();
  }

  delete(duration = TIME.ONE_SECOND) {
    this.instance.style.transition = `opacity ${duration / TIME.ONE_SECOND}s`;
    this.instance.style.opacity = 0;
    setTimeout(() => this.instance.remove(), duration);
  }

  setAttributes(attributes = {}) {
    Object.entries(attributes).forEach(([name, value]) => {
      this.instance.setAttribute(name, value);
    });
  }

  attachToRoot() {
    $id('root').appendChild(this.instance);
  }

  createElement(elementType = 'div') {
    const element = $create(elementType);
    this.setElement(element);
  }

  appendChild(object) {
    this.instance.appendChild(object.instance);
  }

  addClass(className) {
    this.instance.classList.add(className);
  }

  toggleClass(className) {
    this.instance.classList.toggle(className);
  }

  removeClass(className) {
    this.instance.classList.remove(className);
  }

  setElement(element) {
    this.instance = element;
  }

  setOriginCenter() {
    this.setOrigin();
  }

  setOrigin(x = '50%', y = '50%') {
    const numberY = makeFloat(y);
    const numberX = makeFloat(x);
    this.originStyle = `translate(-${x}, -${y})`;
    this.instance.style.transformOrigin = `${50 - numberX}% ${50 - numberY}%`;
    this.transform();
  }

  setInnerHTML(html = '') {
    this.instance.innerHTML = html;
  }

  transform() {
    this.instance.style.transform = `${this.rotateStyle} ${this.originStyle}`;
  }

  setDepth(zIndex) {
    this.instance.style.zIndex = zIndex;
  }

  move(x = 0, y = 0, duration = TIME.ONE_SECOND / 2) {
    this.position = [x, y];
    const xString = makeUnitString(x, '%');
    const yString = makeUnitString(y, '%');

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    if (!xString && !yString) {
      this.instance.style.removeProperty('top');
      this.instance.style.removeProperty('left');
    }
    if (duration === 0) {
      this.instance.style.top = yString;
      this.instance.style.left = xString;
      return;
    }
    const initialY = makeFloat(this.instance.style.top) || 0;
    const initialX = makeFloat(this.instance.style.left) || 0;
    const targetY = y;
    const targetX = x;

    const miliseconds = duration;
    let start = null;
    const animateFunction = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed > miliseconds) {
        this.instance.style.top = yString;
        this.instance.style.left = xString;
        this.animationFrame = null;
        return;
      }
      const newY =
        initialY + (targetY - initialY) * easeOutCubic(elapsed / miliseconds);
      const newX =
        initialX + (targetX - initialX) * easeOutCubic(elapsed / miliseconds);
      // this.position = [newX, newY];

      this.instance.style.left = makeUnitString(newX, '%');
      this.instance.style.top = makeUnitString(newY, '%');

      requestAnimationFrame(animateFunction);
    };

    this.animationFrame = requestAnimationFrame(animateFunction);
  }

  rotate(angle = 0, duration = TIME.ONE_SECOND / 5) {
    this.angle = angle;
    const angleString = makeUnitString(angle, 'deg');
    const keyframes = [
      { transform: this.instance.style.transform },
      { transform: `rotateZ(${angleString}) ${this.originStyle}` },
    ];
    const options = {
      duration,
      easing: 'ease',
    };
    this.instance.animate(keyframes, options);

    this.instance.style.transform = `rotateZ(${angleString}) ${this.originStyle}`;
    this.rotateStyle = `rotateZ(${angleString})`;
  }
};

export default GameObject;
