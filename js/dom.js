export function activateSoundToggle(toggleElement) {
  toggleElement.addEventListener('click', () => {
    const currentState = toggleElement.getAttribute('aria-pressed') === 'true';
    const nextState = !currentState;
    const text =  `${nextState ? 'Вимкнути' : 'Увімкнути'} звук кнопок`;

    toggleElement.classList.toggle('sound-toggle--on');
    toggleElement.setAttribute('aria-pressed', nextState);
    toggleElement.setAttribute('aria-label', text);
  })
}

export function generateButtons() {
  const padding = 16;
  const bitToggle = document.querySelector('.bit-toggle');

  const toggleWidth = bitToggle.offsetWidth;
  const windowWidth = document.documentElement.clientWidth - padding;
  const buttonsWillFit = Math.min(8, Math.floor(windowWidth / toggleWidth))

  let beforeTheLast = bitToggle;

  // Starts from 1 because we already have one button in HTML
  for (let i = 1; i < buttonsWillFit; i++) {
    const clone = bitToggle.cloneNode(true);

    clone.querySelector('.light-bulb-button').dataset.index = i;
    clone.querySelector('.power-of-two').textContent = 2**i;
    beforeTheLast.before(clone);
    beforeTheLast = clone;
  }
}

export function toggle (button, isSoundOn) {
  const soundOn = 'on';
  const soundOff = 'off';

  const currentState = button.getAttribute('aria-pressed') === 'true';
  const nextState = !currentState;

  if (isSoundOn) {
    const audio = new Audio(`audio/${nextState ? soundOn : soundOff}.wav`);
    audio.volume = 0.2;
    audio.play();
  }

  button.setAttribute(
    'aria-label',
    `Лампочка ${nextState ? 'увімкнута' : 'вимкнута'}`
  );

  button.setAttribute('aria-pressed', nextState);
  button.querySelector('.bit').textContent = nextState ? 1 : 0;
}

const soundPreferenceKey = 'is-sound-on';

export function getSoundPreference() {
  return localStorage.getItem(soundPreferenceKey) === 'true';
}

export function setSoundPreference(isOn) {
  return localStorage.setItem(soundPreferenceKey, isOn);
}
