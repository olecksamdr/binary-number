import { createToggle } from './toggle.js';

function getButtonArialLabel(isOn) {
  return `Лампочка ${isOn ? 'увімкнута' : 'вимкнута'}`;
}

export function generateButtons() {
  const padding = 16;
  const bitToggle = document.querySelector('.bit-toggle');

  const toggleWidth = bitToggle.offsetWidth;
  const windowWidth = document.documentElement.clientWidth - padding;
  const buttonsWillFit = Math.min(8, Math.floor(windowWidth / toggleWidth))

  createToggle({
    element: bitToggle.querySelector('.light-bulb-button'),
    getAriaLabel: getButtonArialLabel,
  });

  let beforeTheLast = bitToggle;

  // Starts from 1 because we already have one button in HTML
  for (let i = 1; i < buttonsWillFit; i++) {
    const clone = bitToggle.cloneNode(true);

    createToggle({
      element: clone.querySelector('.light-bulb-button'),
      getAriaLabel: getButtonArialLabel,
    });

    clone.querySelector('.light-bulb-button').dataset.index = i;
    clone.querySelector('.power-of-two').textContent = 2**i;
    beforeTheLast.before(clone);
    beforeTheLast = clone;
  }
}

export function toggle ({ button, isOn, isSoundOn }) {
  if (isSoundOn) {
    const audio = new Audio(`audio/${isOn ? 'on' : 'off'}.wav`);
    audio.volume = 0.2;
    audio.play();
  }

  button.querySelector('.bit').textContent = isOn ? 1 : 0;
}

const soundPreferenceKey = 'is-sound-on';

export function getSoundPreference() {
  return localStorage.getItem(soundPreferenceKey) === 'true';
}

export function setSoundPreference(isOn) {
  return localStorage.setItem(soundPreferenceKey, isOn);
}
