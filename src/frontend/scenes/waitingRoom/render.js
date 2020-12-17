import './style.scss';
import ButtonObject from '@engine/ButtonObject';
import GameObject from '@engine/GameObject';
import TextObject from '@engine/TextObject';
import InputObject from '@engine/InputObject';
import SvgObject from '@engine/SvgObject';
import Svg from '@type/svg';
import defaultColors from '@type/defaultColors.json';
import { getRandomColor } from '@utils/hexColor';
import { onClickGuide } from '@utils/modal';
import {
  copyGameCode,
  redirectToLobby,
  toggleReady,
  changeNickname,
  inputColorHandler,
  changeColor,
} from './events';

const renderWaitingRoom = (roomID = '') => {
  const Header = new GameObject();
  Header.addClass('waiting-header');
  Header.attachToRoot();

  const NicknameHelpText = new TextObject();
  NicknameHelpText.setContent('게임에 참여할 닉네임을 정해주세요');
  NicknameHelpText.addClass('waiting-nickname-help');
  NicknameHelpText.attachToObject(Header);

  const InputWrapper = new GameObject();
  InputWrapper.addClass('waiting-input-wrapper');
  InputWrapper.attachToObject(Header);

  const ColorButtonWrapper = new GameObject({
    classes: ['color-button-wrapper'],
    parent: InputWrapper,
  });

  const ColorButton = new ButtonObject({
    classes: ['refresh-button'],
    parent: ColorButtonWrapper,
  });

  const BrushIcon = new SvgObject();
  BrushIcon.setSvg(Svg.brush);
  BrushIcon.attachToObject(ColorButton);

  const ColorPickerWrapper = new GameObject({
    classes: ['color-picker-wrapper'],
    parent: ColorButtonWrapper,
  });

  const ColorPickerTops = new GameObject({
    parent: ColorPickerWrapper,
  });

  const RandomColorButton = new ButtonObject({
    classes: ['refresh-button', 'refresh-button-small'],
    parent: ColorPickerTops,
  });

  const RandomIcon = new SvgObject();
  RandomIcon.setSvg(Svg.refresh);
  RandomIcon.attachToObject(RandomColorButton);

  const ColorInput = new InputObject({
    classes: ['waiting-color-input'],
    parent: ColorPickerTops,
  });
  ColorInput.setAttributes({
    maxlength: 8,
    size: 7,
    autocomplete: 'off',
    placeholder: '#',
    title: '16진 색상 코드를 직접 입력해보세요.',
    value: '#',
  });

  const ColorSampleGrid = new GameObject({
    classes: ['color-sample-grid'],
    parent: ColorPickerWrapper,
  });

  const emitChangeColor = (colorFunction) => () => {
    ColorInput.setValue(colorFunction());
    changeColor({ target: ColorInput.instance });
  };

  ColorInput.instance.addEventListener('input', inputColorHandler);
  RandomColorButton.addClickHandler(emitChangeColor(() => getRandomColor()));
  defaultColors.forEach((color) => {
    const sampleButton = new ButtonObject({
      classes: ['color-sample-button'],
      parent: ColorSampleGrid,
    });
    sampleButton.setAttributes({
      title: color,
    });
    sampleButton.instance.style.backgroundColor = color;
    sampleButton.addClickHandler(emitChangeColor(() => color));
  });

  const NicknameInput = new InputObject();
  NicknameInput.addClass('waiting-nickname-input');
  NicknameInput.setAttributes({
    maxlength: 12,
    autocomplete: 'off',
    placeholder: '닉네임을 정해보세요.',
  });
  NicknameInput.attachToObject(InputWrapper);

  const NicknameSubmitButton = new ButtonObject();
  NicknameSubmitButton.addClass('refresh-button');
  NicknameSubmitButton.attachToObject(InputWrapper);
  NicknameSubmitButton.addClickHandler(() => changeNickname(NicknameInput));

  const CheckIcon = new SvgObject();
  CheckIcon.setSvg(Svg.check);
  CheckIcon.attachToObject(NicknameSubmitButton);

  const GuideWrapper = new GameObject();
  GuideWrapper.addClass('guide-wrapper');
  GuideWrapper.attachToRoot();

  const GuideButton = new ButtonObject();
  GuideButton.addClass('guide-button');
  GuideButton.attachToObject(GuideWrapper);
  GuideButton.addClickHandler(() => onClickGuide());

  const GuideIcon = new SvgObject();
  GuideIcon.setSvg(Svg.guide);
  GuideIcon.attachToObject(GuideButton);

  const ActionWrapper = new GameObject();
  ActionWrapper.addClass('waiting-action-wrapper');
  ActionWrapper.attachToRoot();

  const ButtonReturnToLobby = new ButtonObject();
  ButtonReturnToLobby.setContent('로비로 돌아가기');
  ButtonReturnToLobby.addClass('button-cancel');
  ButtonReturnToLobby.attachToObject(ActionWrapper);
  ButtonReturnToLobby.addClickHandler(redirectToLobby);

  const ButtonReady = new ButtonObject();
  ButtonReady.setContent('준비 완료');
  ButtonReady.addClass('button-primary');
  ButtonReady.attachToObject(ActionWrapper);
  ButtonReady.instance.dataset.data = JSON.stringify({ bReady: false });
  ButtonReady.addClickHandler(toggleReady);

  const GameCodeWrapper = new ButtonObject();
  GameCodeWrapper.addClass('waiting-game-code-wrapper');
  GameCodeWrapper.attachToRoot();
  GameCodeWrapper.addClickHandler(copyGameCode);

  const GameCodeText = new TextObject();
  GameCodeText.setContent(roomID);
  GameCodeText.attachToObject(GameCodeWrapper);

  const GameCodeCopyButton = new GameObject();
  GameCodeCopyButton.addClass('waiting-code-icon');
  GameCodeCopyButton.attachToObject(GameCodeWrapper);

  const CopyIcon = new SvgObject();
  CopyIcon.setSvg(Svg.copy);
  CopyIcon.attachToObject(GameCodeCopyButton);

  const CopyNotice = new TextObject({
    origin: [50, 50],
    position: [91, 88],
  });
  CopyNotice.setContent('코드가 복사되었습니다.');
  CopyNotice.addClass(['copy-notice']);
  CopyNotice.attachToRoot();

  const arrayToBeRemoved = [Header, ActionWrapper, GameCodeWrapper];

  return {
    arrayToBeRemoved,
    NicknameInput,
    ColorButton,
    RandomColorButton,
    ColorInput,
    CopyNotice,
  };
};

export default renderWaitingRoom;
