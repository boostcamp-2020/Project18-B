const TEXT = {
  TELLER_SELECT: '당신은 이야기꾼입니다.\n어떤 카드로 이야기를 해볼까요?',
  WAIT_TELLER_SELECT:
    '이야기꾼이 카드를 고르고 있습니다.\n잠시만 기다려주세요.',
  WAIT_PLAYER_SELECT:
    '다른 플레이어들이 카드를 고르고 있습니다.\n잠시만 기다려주세요.',
  TELLER: {
    true: '당신은 이야기꾼입니다.\n어떤 카드로 이야기를 해볼까요?',
    false: '이야기꾼이 카드를 고르고 있습니다.\n잠시만 기다려주세요.',
  },
  GUESSER_SELECT: {
    TITLE: (topic) => `이 카드가 <${topic}>과 어울리나요?`,
    OK: '네',
    CANCLE: '아니에요',
  },
};

export const GET_IMAGE_PATH = (cardID) => {
  return `${process.env.ASSET_URL}/${cardID}.png`;
};

export default TEXT;
