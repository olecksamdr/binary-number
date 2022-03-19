let bitsState = 0;
let bitsCount = 1;

const buttonsClass = '.light-bulb-button';

function generateButtons() {
  const padding = 16;
  const bitToggle = document.querySelector('.bit-toggle');

  const toggleWidth = bitToggle.offsetWidth;
  const windowWidth = document.documentElement.clientWidth - padding;
  const buttonsWillFit = Math.min(8, Math.floor(windowWidth / toggleWidth))

  bitsCount = buttonsWillFit;
  let beforeTheLast = bitToggle;

  // Starts from 1 because we already have one button in HTML
  for (let i = 1; i < buttonsWillFit; i++) {
    const clone = bitToggle.cloneNode(true);

    clone.querySelector(buttonsClass).dataset.index = i;
    clone.querySelector('.power-of-two').textContent = 2**i;
    beforeTheLast.before(clone);
    beforeTheLast = clone;
  }
}

const getSum = binNum => {
  const operands = [];

  for (let i = 0; i <= 7; i++) {
    const term = 2**i;
    const isBitOn = binNum & term;

    if (isBitOn) {
      operands.push(term)
    }
  }

  return operands.length > 1 ? `${operands.join(' + ')} = ${binNum}` : binNum;
}

const isButtonOn = button => button.getAttribute('aria-pressed') === 'true';

const toggle = (button) => {
    const soundOn = 'mixkit-select-click-1109';
    const soundOff = 'mixkit-mouse-click-close-1113';

    const currentState = button.getAttribute('aria-pressed') === 'true';
    const nextState = !currentState;
    const audio = new Audio(`audio/${nextState ? soundOn : soundOff}.wav`);

    audio.volume = 0.2;
    audio.play()


    button.setAttribute(
      'aria-label',
      `Лампочка ${nextState ? 'увімкнута' : 'вимкнута'}`
    );

    button.setAttribute('aria-pressed', nextState);
    button.querySelector('.bit').textContent = nextState ? 1 : 0;
}

const syncDomWithState = binaryNumber => {
  const bitButtons = document.querySelectorAll(buttonsClass);

  // TODO: detects bits count
  for (let i = 1; i < bitButtons.length; i++) {
    const btn = bitButtons[bitButtons.length - i];
    const isBitOn = binaryNumber & 2**i;

    if (isBitOn && !isButtonOn(btn) || !isBitOn && isButtonOn(btn)) {
      toggle(btn);
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const bits = document.querySelector('.bits');

  generateButtons();

  const decimalResult = document.getElementById('decimal-result');

  syncDomWithState(bitsState);

  bits.addEventListener('click', ({ target }) => {
    const btn = target.closest('.light-bulb-button');

    if (btn) {
      bitsState = bitsState ^ 2**Number(btn.dataset.index);

      toggle(btn);
      decimalResult.textContent = getSum(bitsState);
    }
  });
});