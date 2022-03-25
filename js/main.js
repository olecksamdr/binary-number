import { binaryToDecimal } from './binary-operations.js'
import {
  toggle,
  generateButtons,
  getSoundPreference,
  setSoundPreference,
  activateSoundToggle,
} from './dom.js';

let bitsState = 0;
let isSoundOn = getSoundPreference();

activateSoundToggle(isSoundOn, isOn => {
  setSoundPreference(isOn);
  isSoundOn = isOn;
});

generateButtons();

const bits = document.querySelector('.bits');
const decimalResult = document.getElementById('decimal-result');

bits.addEventListener('click', ({ target }) => {
  const btn = target.closest('.light-bulb-button');

  if (btn) {
    bitsState = bitsState ^ 2**Number(btn.dataset.index);

    toggle(btn, isSoundOn);
    decimalResult.textContent = binaryToDecimal(bitsState);
  }
});
