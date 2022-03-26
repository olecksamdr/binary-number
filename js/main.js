import { binaryToDecimal } from './binary-operations.js';
import { createToggle } from './toggle.js';
import {
  toggle,
  generateButtons,
  getSoundPreference,
  setSoundPreference,
} from './dom.js';

let bitsState = 0;
let isSoundOn = getSoundPreference();


const soundToggle = createToggle({
  element: document.querySelector('.sound-toggle'),
  getAriaLabel(isOn) {
    return `${isOn ? 'Увімкнути' : 'Вимкнути'} звук кнопок`;
  }
});

if (isSoundOn) {
  soundToggle.classList.add('sound-toggle--on');
}

soundToggle.addEventListener('change', ({ currentTarget, detail: isOn }) => {
  currentTarget.classList.toggle('sound-toggle--on');

  setSoundPreference(isOn);
  isSoundOn = isOn;
});

generateButtons();

const bits = document.querySelector('.bits');
const decimalResult = document.getElementById('decimal-result');

bits.addEventListener('change', ({ target, detail: isOn }) => {
  const btn = target.closest('.light-bulb-button');

  if (btn) {
    bitsState = bitsState ^ 2**Number(btn.dataset.index);

    toggle({ button: btn, isSoundOn, isOn });
    decimalResult.textContent = binaryToDecimal(bitsState);
  }
});
