import { binaryToDecimal } from './binary-operations.js'
import { generateButtons, toggle } from './dom.js';

let bitsState = 0;

generateButtons();

const bits = document.querySelector('.bits');
const decimalResult = document.getElementById('decimal-result');

bits.addEventListener('click', ({ target }) => {
  const btn = target.closest('.light-bulb-button');

  if (btn) {
    bitsState = bitsState ^ 2**Number(btn.dataset.index);

    toggle(btn);
    decimalResult.textContent = binaryToDecimal(bitsState);
  }
});
