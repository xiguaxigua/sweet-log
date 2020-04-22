import './style.css';
import { create } from './utils';

const DEFAULT_SETTINGS = {
  /** 是否默认展示 */
  display: false,
  /** 位置，支持 top / right / bottom / left */
  position: 'right',
  /** 展示区域宽度 */
  width: '',
  /** 展示区域高度 */
  height: '',
};

class SweetLog {
  constructor(config = {}) {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, config);
    this.display = this.settings.display;

    if (['left', 'right'].includes(this.settings.position)) {
      this.settings.width = this.settings.width || '200px';
      this.settings.height = this.settings.height || '100%';
    } else {
      this.settings.height = this.settings.height || '200px';
      this.settings.width = this.settings.width || '100%';
    }

    this.init();
  }

  init() {
    const { width, height, position } = this.settings;
    this.container = create('div', { className: 'sweet-log' });

    this.btn = create('button', {
      className: 'sweet-log__button fixed-btn',
      innerHTML: 'log',
    });
    this.btn.addEventListener('click', this.toggleDisplay.bind(this));

    this.content = create('div', {
      className: `sweet-log__content ${position}`,
      style: {
        width,
        height,
        display: this.display ? 'flex' : 'none',
      },
    });

    const contentHeader = create('div', {
      className: 'sweet-log__content-header',
      innerHTML: '<span class="title">Sweet Log</span>',
    });
    const clearButton = create('button', {
      innerHTML: 'clear',
      className: 'sweet-log__button',
    });
    clearButton.addEventListener('click', this.clearLog.bind(this));

    this.contentSection = create('div', {
      className: 'sweet-log__content-section',
    });
    contentHeader.appendChild(clearButton);
    this.content.appendChild(contentHeader);
    this.content.appendChild(this.contentSection);

    this.container.appendChild(this.btn);
    this.container.appendChild(this.content);
    document.body.appendChild(this.container);

    this.changeConsole();
  }

  changeConsole() {
    const tmp = {};
    ['log', 'info', 'warning', 'error'].forEach((key) => {
      tmp[key] = console[key];
      console[key] = (...args) => {
        this.pushLog(args);
        return tmp[key](args);
      };
    });
  }

  pushLog(target) {
    const logItem = `<div class="sweet-log__log-item">${JSON.stringify(
      target.join(' ')
    )}</div>`;
    this.contentSection.innerHTML += logItem;
    this.contentSection.scrollTop =
      this.contentSection.scrollHeight - this.contentSection.clientHeight;
  }

  clearLog() {
    this.contentSection.innerHTML = '';
  }

  toggleDisplay() {
    this.display = !this.display;
    this.content.style.display = this.display ? 'flex' : 'none';
  }
}

export default new SweetLog(window.SWEET_LOG_CONFIG);
