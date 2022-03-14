let bitsState = 0b0000_0000;

const buttonsClass = '.light-bulb-button';

function generateButtons() {
  const bitTiggle = document.querySelector('.bit-toggle');
  let beforeTheLast = bitTiggle;

  beforeTheLast.querySelector('.power-of-two').textContent = 2**7;

  for (let i = 6; i >= 0; i--) {
    const clone = bitTiggle.cloneNode(true);

    clone.querySelector(buttonsClass).dataset.index = i;
    clone.querySelector('.power-of-two').textContent = 2**i;
    beforeTheLast.after(clone);
    beforeTheLast = clone;
  }
}

const getSum = binNum => {
  const operands = [];

  for (let i = 0; i < 7; i++) {
    const term = 2**i;
    const isBitOn = binNum & term;

    if (isBitOn) {
      operands.push(term)
    }
  }

  return operands.length > 1 ? `${operands.join(' + ')} = ${binNum}` : binNum;
}

const scrollBitsToRight = () => {
  const bitsContainer = document.querySelector('.bits');

  bitsContainer.scrollLeft = bitsContainer.clientWidth;
}

const isButtonOn = button => button.getAttribute('aria-pressed') === 'true';

const toggle = (button) => {
    const soundOn = 'mixkit-typewriter-hit-1362';
    const soundOff = 'mixkit-blow-breaking-the-air-2057';

    const currentState = button.getAttribute('aria-pressed') === 'true';
    const nextState = !currentState;
    new Audio(`audio/${nextState ? soundOn : soundOff}.wav`).play();

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

  scrollBitsToRight();
  syncDomWithState(bitsState);

  bits.addEventListener('click', ({ target }) => {
    const btn = target.closest('.light-bulb-button');

    if (btn) {
      bitsState = bitsState ^ 2**Number(btn.dataset.index);
      console.log(bitsState, btn);

      toggle(btn);
      decimalResult.textContent = getSum(bitsState);
    }
  });
});