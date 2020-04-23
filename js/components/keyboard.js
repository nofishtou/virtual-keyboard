/* eslint-disable import/extensions */
import keyboardData from '../accessories/keyboardData.js';

export default class Keyboard {
  static createRow(row, language) {
    const container = document.createElement('div');
    container.classList.add('row');
    let key;
    let span;
    let spanShifted;
    row.forEach((el) => {
      key = document.createElement('div');
      key.classList.add('key');
      key.classList.add(`${el.keyCode}`);
      if (el.size === 'small') {
        key.classList.add('small');
      }

      if (el.size === 'medium') {
        key.classList.add('medium');
      }

      if (el.size === 'upper-medium') {
        key.classList.add('upper-medium');
      }

      if (el.size === 'big') {
        key.classList.add('big');
      }

      if (el.purpose === 'common') {
        key.classList.add('common');
      } else {
        key.classList.add('special');
      }

      span = document.createElement('span');
      spanShifted = document.createElement('span');

      if (language === 'russian') {
        // for same keys
        if (el.ruKey) {
          span.innerHTML = el.ruKey;
          span.classList.add('lower-case');
        } else {
          span.innerHTML = el.key;
          span.classList.add('lower-case');
        }

        if (el.ruShifted) {
          spanShifted.innerHTML = el.ruShifted;
          spanShifted.classList.add('hidden');
          spanShifted.classList.add('upper-case');
        } else {
          spanShifted.innerHTML = el.shifted;
          spanShifted.classList.add('hidden');
          spanShifted.classList.add('upper-case');
        }
      } else {
        span.innerHTML = el.key;
        span.classList.add('lower-case');

        spanShifted.innerHTML = el.shifted;
        spanShifted.classList.add('hidden');
        spanShifted.classList.add('upper-case');
      }

      key.append(span);
      key.append(spanShifted);

      return container.append(key);
    });

    return container;
  }

  static createKeyboard(language) {
    const container = document.createElement('div');
    container.classList.add('keyboard');

    keyboardData.forEach((row) => {
      container.append(Keyboard.createRow(row, language));
    });

    return container;
  }
}
