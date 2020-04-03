export default class Keyboard {
  static createRow(row) {
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
      span.innerHTML = el.key;
      span.classList.add('lower-case');

      spanShifted = document.createElement('span');
      spanShifted.innerHTML = el.shifted;
      spanShifted.classList.add('hidden');
      spanShifted.classList.add('upper-case');

      key.append(span);
      key.append(spanShifted);

      return container.append(key);
    });

    return container;
  }

  static createKeyboard(language) {
    const container = document.createElement('div');
    container.classList.add('keyboard');

    language.forEach((row) => {
      container.append(Keyboard.createRow(row));
    });

    return container;
  }
}
