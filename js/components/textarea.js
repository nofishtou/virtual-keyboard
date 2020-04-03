export default class Textarea {
  static createTextarea() {
    const textArea = document.createElement('textarea');
    textArea.classList.add('textarea');
    return textArea;
  }
}
