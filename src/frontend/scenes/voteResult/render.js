import './voteResult.scss';
import TextObject from '@engine/TextObject';
import CardManager from '@utils/CardManager';
import TEXT from '@utils/text';
import DuckObject from '@engine/DuckObject';
import PlayerManager from '@utils/PlayerManager';
import GameObject from '@engine/GameObject';

const DIFF_Y_POSITION_STAMP = 14;
const DIFF_Y_POSITION_NAME = -15;
const ORIGIN_STAMP = [50, 0];
const ORIGIN_NAME = [50, 0];
const WIDTH_STAMP_DUCK = 40;
const WIDTH_NAME_DUCK = 25;

const renderVoteResult = () => {
  const cards = CardManager.submittedCards;
  const players = PlayerManager.getPlayers();

  const containers = cards.reduce((prev, card) => {
    const { position, cardID } = card;
    const [cardX, cardY] = position;
    const stampContainer = new GameObject({
      position: [cardX, cardY + DIFF_Y_POSITION_STAMP],
      origin: ORIGIN_STAMP,
    });
    stampContainer.addClass('stamp-wrapper');
    stampContainer.attachToRoot();

    const nameContainer = new GameObject({
      position: [cardX, cardY - DIFF_Y_POSITION_NAME],
      origin: ORIGIN_NAME,
    });
    nameContainer.addClass('name-wrapper');
    nameContainer.attachToRoot();

    return {
      ...prev,
      [cardID]: {
        stampContainer,
        nameContainer,
      },
    };
  }, {});

  const voteResultObjects = players.reduce((prev, player) => {
    const { color, votedCardID, submittedCardID, nickname, isTeller } = player;

    const { nameContainer } = containers[submittedCardID];
    const nameDuck = new DuckObject({ color, width: WIDTH_NAME_DUCK });
    const nicknameText = new TextObject();
    nameDuck.addClass('duck-stamp');
    nameDuck.attachToObject(nameContainer);
    nicknameText.setContent(nickname);
    nicknameText.addClass('nickname-text');
    nicknameText.attachToObject(nameContainer);

    if (isTeller) {
      const tellerCard = cards.find((card) => card.cardID === submittedCardID);
      tellerCard.addClass('card-glow-gold');
      return [...prev, nameDuck, nicknameText, nameContainer];
    }

    const { stampContainer } = containers[votedCardID];
    const stampDuck = new DuckObject({ color, width: WIDTH_STAMP_DUCK });
    stampDuck.addClass('duck-stamp');
    stampDuck.attachToObject(stampContainer);
    return [...prev, nameDuck, stampDuck, nicknameText, nameContainer];
  }, []);

  const HelpText = new TextObject();
  HelpText.addClass(['helper-text', 'vote-result-text']);
  HelpText.setContent(TEXT.VOTE_RESULT.TITLE);
  HelpText.attachToRoot();

  const stampContainers = Object.values(containers).map(
    (container) => container.stampContainer,
  );
  const arrayToBeRemoved = [HelpText, ...voteResultObjects, ...stampContainers];

  return {
    arrayToBeRemoved,
  };
};

export default renderVoteResult;
