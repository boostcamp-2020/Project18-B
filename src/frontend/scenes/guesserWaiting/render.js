import './guesserWaiting.scss';
import GameObject from '@engine/GameObject';
import CardObject from '@engine/CardObject';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import DuckObject from '@engine/DuckObject';
import TEXT from '@utils/text';
import TIME from '@utils/time';
import { DUCK_TYPE } from '@utils/type';

const createCards = () => {
  const emptyObject = new GameObject();
  emptyObject.createElement();
  emptyObject.addClass('teller-cards-wrapper');
  const cards = [...new Array(6).fill(1)].map(() => {
    const card = new CardObject();
    card.addClass('teller-duck-card');
    card.move(10, 10, 0);
    emptyObject.appendChild(card);
    return card;
  });
  return { CardsWrapper: emptyObject, cards };
};

const renderGuesserWaiting = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.WAIT_TELLER_SELECT;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.addClass('other');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const TellerDuck = new DuckObject({ type: DUCK_TYPE.TELLER });
  // TODO : setColor 텔러에 맞는 색깔로 하면 될까?
  TellerDuck.createElement();
  TellerDuck.attachToRoot();

  const { CardsWrapper, cards } = createCards();
  CardsWrapper.attachToRoot();

  const removeArray = [NotifyingTellerText, ProgressBar, TellerDuck];

  return {
    removeArray,
  };
};

export default renderGuesserWaiting;
