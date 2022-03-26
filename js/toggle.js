function getDefaultLabel(isOn) {
  return isOn ? 'Увімкнуто' : 'Вимкнуто';
}

export function createToggle({ element, getAriaLabel = getDefaultLabel }) {
  element.addEventListener('click', () => {
    const currentState = element.getAttribute('aria-pressed') === 'true';
    const nextState = !currentState;

    element.setAttribute('aria-pressed', nextState);
    element.setAttribute('aria-label', getAriaLabel(nextState));

    const event = new CustomEvent(
      'change',
      {
        detail: nextState,
        bubbles: true,
      }
    );

    element.dispatchEvent(event);
  });

  return element;
}
