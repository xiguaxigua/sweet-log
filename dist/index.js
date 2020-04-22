(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SweetLog = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".sweet-log__button.fixed-btn {\n  position: fixed;\n  right: 5px;\n  bottom: 5px;\n  z-index: 1001;\n}\n.sweet-log__button {\n  padding: 5px 10px;\n  outline: none;\n  background-color: #fff;\n  border-radius: 3px;\n}\n\n.sweet-log__content {\n  position: fixed;\n  z-index: 1000;\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.sweet-log__content-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  padding: 5px 8px;\n  border-bottom: 1px solid #fff;\n  height: 30px;\n  line-height: 30px;\n}\n\n.sweet-log__content-section {\n  -webkit-box-flex: 1;\n          flex: 1;\n  overflow: auto;\n}\n\n.sweet-log__log-item {\n  padding: 5px 8px;\n  color: #96b38a;\n  border-bottom: 1px solid gray;\n}\n\n.sweet-log__content.top {\n  top: 0;\n  left: 0;\n  right: 0;\n}\n\n.sweet-log__content.bottom {\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.sweet-log__content.left {\n  top: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.sweet-log__content.right {\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n";
  styleInject(css_248z);

  function create(tag, options) {
    var result = document.createElement(tag);
    Object.keys(options).forEach(function (key) {
      var value = options[key];

      if (_typeof(value) === 'object') {
        Object.keys(value).forEach(function (valueKey) {
          result[key][valueKey] = value[valueKey];
        });
      } else {
        result[key] = options[key];
      }
    });
    return result;
  }

  var DEFAULT_SETTINGS = {
    /** 是否默认展示 */
    display: false,

    /** 位置，支持 top / right / bottom / left */
    position: 'right',

    /** 展示区域宽度 */
    width: '',

    /** 展示区域高度 */
    height: ''
  };

  var SweetLog = /*#__PURE__*/function () {
    function SweetLog() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SweetLog);

      this.settings = _extends({}, DEFAULT_SETTINGS, config);
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

    _createClass(SweetLog, [{
      key: "init",
      value: function init() {
        var _this$settings = this.settings,
            width = _this$settings.width,
            height = _this$settings.height,
            position = _this$settings.position;
        this.container = create('div', {
          className: 'sweet-log'
        });
        this.btn = create('button', {
          className: 'sweet-log__button fixed-btn',
          innerHTML: 'log'
        });
        this.btn.addEventListener('click', this.toggleDisplay.bind(this));
        this.content = create('div', {
          className: "sweet-log__content ".concat(position),
          style: {
            width: width,
            height: height,
            display: this.display ? 'flex' : 'none'
          }
        });
        var contentHeader = create('div', {
          className: 'sweet-log__content-header',
          innerHTML: '<span class="title">Sweet Log</span>'
        });
        var clearButton = create('button', {
          innerHTML: 'clear',
          className: 'sweet-log__button'
        });
        clearButton.addEventListener('click', this.clearLog.bind(this));
        this.contentSection = create('div', {
          className: 'sweet-log__content-section'
        });
        contentHeader.appendChild(clearButton);
        this.content.appendChild(contentHeader);
        this.content.appendChild(this.contentSection);
        this.container.appendChild(this.btn);
        this.container.appendChild(this.content);
        document.body.appendChild(this.container);
        this.changeConsole();
      }
    }, {
      key: "changeConsole",
      value: function changeConsole() {
        var _this = this;

        var tmp = {};
        ['log', 'info', 'warning', 'error'].forEach(function (key) {
          tmp[key] = console[key];

          console[key] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this.pushLog(args);

            return tmp[key](args);
          };
        });
      }
    }, {
      key: "pushLog",
      value: function pushLog(target) {
        var logItem = "<div class=\"sweet-log__log-item\">".concat(JSON.stringify(target.join(' ')), "</div>");
        this.contentSection.innerHTML += logItem;
        this.contentSection.scrollTop = this.contentSection.scrollHeight - this.contentSection.clientHeight;
      }
    }, {
      key: "clearLog",
      value: function clearLog() {
        this.contentSection.innerHTML = '';
      }
    }, {
      key: "toggleDisplay",
      value: function toggleDisplay() {
        this.display = !this.display;
        this.content.style.display = this.display ? 'flex' : 'none';
      }
    }]);

    return SweetLog;
  }();

  var index = new SweetLog(window.SWEET_LOG_CONFIG);

  return index;

})));
