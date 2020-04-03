import Keyboard from './components/keyboard.js';
import Textarea from './components/textarea.js';
import english from './accessories/english.js';
import russian from './accessories/russian.js';

export default class App {
  constructor(anchor) {
    this.anchor = anchor;
    this.container = null;
    this.keyboard = null;
    this.textArea = null;
    this.lang = english;
    this.isCapsOn = false;
    this.isShiftOn = false;
  }

  onInit() {
    this.checkLanguage();
    this.render();
    this.addEventListenersKeys();
    this.addEventListenerClick();
  }

  addActiveStatus(code) {
    const keys = this.keyboard.querySelectorAll('.key');

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i].classList.contains(code)) {
        this.addSymbol(keys[i]);
        if (keys[i].classList.contains('CapsLock')) {
          break;
        }

        keys[i].classList.add('active');
        break;
      }
    }
  }

  addEventListenersKeys() {
    window.onload = document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.ctrlKey && e.altKey) {
        if (this.lang === english) {
          this.changeLanguage(russian);
        } else {
          this.changeLanguage(english);
        }
      }

      if (e.code === 'CapsLock') {
        if (this.isCapsOn) {
          this.isCapsOn = false;
        } else {
          this.isCapsOn = true;
        }
      }

      if (this.isCapsOn && e.getModifierState('Shift')) {
        this.changeKeys('lower-case');
      } else if (e.getModifierState('Shift')) {
        this.changeKeys('upper-case');
      }

      this.addActiveStatus(e.code);
    });

    window.onload = document.addEventListener('keyup', (e) => {
      e.preventDefault();

      console.log(e)
      if (this.isCapsOn && e.getModifierState('Shift')) {
        this.changeKeys('lower-case');
      }

      if (!e.getModifierState('Shift')) {
        this.changeKeys('lower-case');
      }

      if (this.isCapsOn && !e.getModifierState('Shift')) {
        this.changeKeys('upper-case');
      }

      this.deleteActiveStatus(e.code);
    });
  }

  addEventListenerClick() {
    this.keyboard.addEventListener('click', (e) => {
      if (e.target.parentNode.classList.contains('CapsLock')) {
        if (this.isCapsOn) {
          this.changeKeys('lower-case');
          this.isCapsOn = false;
        } else {
          this.changeKeys('upper-case');
          this.isCapsOn = true;
        }
        this.deleteActiveStatus('CapsLock');
      }

      if (e.target.parentNode.classList.contains('OSLeft')) {
        if (this.lang === english) {
          this.changeLanguage(russian);
          this.addAnimation('OSLeft');
        } else {
          this.changeLanguage(english);
          this.addAnimation('OSLeft');
        }
      }

      if (e.target.tagName === 'SPAN' && !e.target.parentNode.classList.contains('CapsLock')) {
        this.addSymbol(e.target.parentNode);
        this.addAnimation(e.target.parentNode);
      }
    });
  }

  addLanguage() {
    if (this.lang === english) {
      localStorage.setItem('language', 'english');
    } else {
      localStorage.setItem('language', 'russian');
    }
  }

  addSymbol(key) {
    if (key.classList.contains('common')) {
      if (!key.children[0].classList.contains('hidden')) {
        this.textArea.value += key.children[0].innerText;
      } else {
        this.textArea.value += key.children[1].innerText;
      }
    }

    if (key.classList.contains('Space')) {
      this.textArea.value += ' ';
    }

    if (key.classList.contains('Tab')) {
      this.textArea.value += '  ';
    }

    if (key.classList.contains('Enter')) {
      this.textArea.value += '\r';
    }

    if (key.classList.contains('Backspace')) {
      this.textArea.value = this.textArea.value.slice(0, this.textArea.value.length - 1);
    }
  }

  addAnimation(key) {
    if (key === 'OSLeft') {
      const newKey = this.keyboard.querySelector('.OSLeft');
      newKey.classList.add('active');
      setTimeout(() => {
        newKey.classList.remove('active');
      }, 200);
    } else {
      key.classList.add('active');
      setTimeout(() => {
        key.classList.remove('active');
      }, 200);
    }
  }

  changeKeys(register) {
    const spans = this.keyboard.querySelectorAll('span');

    spans.forEach((span) => {
      if (span.classList.contains(register)) {
        span.classList.remove('hidden');
      } else {
        span.classList.add('hidden');
      }
    });
  }

  changeLanguage(lang) {
    this.lang = lang;
    this.container.lastChild.remove();
    this.keyboard = Keyboard.createKeyboard(this.lang);
    this.container.append(this.keyboard);
    this.isCapsOn = false;
    this.isShiftOn = false;
    this.addLanguage();
    this.addEventListenerClick();
  }

  deleteActiveStatus(code) {
    const keys = this.keyboard.querySelectorAll('.key');

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i].classList.contains(code)) {
        if (keys[i].classList.contains('CapsLock')) {
          keys[i].classList.toggle('active');
          break;
        }
        keys[i].classList.remove('active');
        break;
      }
    }
  }

  checkLanguage() {
    if (localStorage.length === 0) {
      this.addLanguage();
    } else if (localStorage.getItem('language') === 'english') {
      this.lang = english;
    } else {
      this.lang = russian;
    }
  }

  render() {
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    const text = document.createElement('p');

    container.classList.add('container');
    heading.innerText = 'Virtual-keyboard';
    text.innerText = 'Расскладка для клавиатуры Windows.Смена языка на ctrl + alt, при использовании с экрана на Win.';

    this.keyboard = Keyboard.createKeyboard(this.lang);
    this.textArea = Textarea.createTextarea();
    this.container = container;
    this.container.append(heading);
    this.container.append(text);
    this.container.append(this.textArea);
    this.container.append(this.keyboard);

    this.anchor.append(this.container);
  }
}
