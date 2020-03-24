/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) : typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) : (global = global || self, factory(global.bootstrap = {}, global.jQuery));
})(this, function (exports, $) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */


  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype; // Public

    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$1 = 'button';
  var VERSION$1 = '4.3.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype; // Public

    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$2 = 'carousel';
  var VERSION$2 = '4.3.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype; // Public

    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread({}, Default, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread({}, $(target).data(), $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$3 = 'collapse';
  var VERSION$3 = '4.3.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype; // Public

    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };
  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.7
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */


  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;

  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }

      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;
  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */

  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */

  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */


  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    } // NOTE: 1 DOM access here


    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }
  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */


  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }

    return element.parentNode || element.host;
  }
  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */


  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;

      case '#document':
        return element.body;
    } // Firefox want us to check `-x` and `-y` variations as well


    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */

  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }

    if (version === 10) {
      return isIE10;
    }

    return isIE11 || isIE10;
  }
  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */


  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

    var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    } // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...


    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }

    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }
  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */


  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }
  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */


  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    } // Here we make sure to give as "start" the element that comes first in the DOM


    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1; // Get common ancestor container

    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    } // one of the nodes is inside shadowDOM, find which one


    var element1root = getRoot(element1);

    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }
  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */


  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }
  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */


  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }
  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */


  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);
    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
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
  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */


  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }
  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */


  function getBoundingClientRect(element) {
    var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11

    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }; // subtract scrollbar size from sizes

    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;
    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons

    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');
      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);
    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }

    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.

    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);
      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);
    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };
    return getClientRect(offset);
  }
  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */


  function isFixed(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }

    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }

    var parentNode = getParentNode(element);

    if (!parentNode) {
      return false;
    }

    return isFixed(parentNode);
  }
  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */


  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }

    var el = element.parentElement;

    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }

    return el || document.documentElement;
  }
  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */


  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

    var boundaries = {
      top: 0,
      left: 0
    };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;

      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));

        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    } // Add paddings


    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;
    return width * height;
  }
  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };
    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });
    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });
    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
    var variation = placement.split('-')[1];
    return computedPlacement + (variation ? '-' + variation : '');
  }
  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */


  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }
  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */


  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }
  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */


  function getOppositePlacement(placement) {
    var hash = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }
  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */


  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0]; // Get popper node sizes

    var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    }; // depending by the popper placement we have to compute its offsets slightly differently

    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';
    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }
  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    } // use `filter` to obtain the same behavior of `find`


    return arr.filter(check)[0];
  }
  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    } // use `find` + `indexOf` if `findIndex` isn't supported


    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }
  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */


  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }

      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);
        data = fn(data, modifier);
      }
    });
    return data;
  }
  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */


  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    }; // compute reference element offsets

    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

    data.originalPlacement = data.placement;
    data.positionFixed = this.options.positionFixed; // compute the popper offsets

    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

    data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback

    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }
  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */


  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }
  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */


  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;

      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }

    return null;
  }
  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */


  function destroy() {
    this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it

    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }

    return this;
  }
  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */


  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, {
      passive: true
    });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }

    scrollParents.push(target);
  }
  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, {
      passive: true
    }); // Scroll event listener on scroll parents

    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;
    return state;
  }
  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */


  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }
  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    }); // Reset state

    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }
  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */


  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }
  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */


  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }
  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = ''; // add unit if the value is numeric and is one of the following

      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }

      element.style[prop] = styles[prop] + unit;
    });
  }
  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];

      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */


  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element

    setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }
  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */


  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
    popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations

    setStyles(popper, {
      position: options.positionFixed ? 'fixed' : 'absolute'
    });
    return options;
  }
  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */


  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);
    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;
    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;

    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }

    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

    var styles = {
      position: popper.position
    };
    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed

    var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.

    var left = void 0,
        top = void 0;

    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }

    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }

    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    } // Attributes


    var attributes = {
      'x-placement': data.placement
    }; // Update `data` attributes, styles and arrowStyles

    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
    return data;
  }
  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */


  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });
    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';

      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }

    return isRequired;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function arrow(data, options) {
    var _data$offsets$arrow; // arrow depends on keepTogether in order to work


    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isVertical = ['left', 'right'].indexOf(placement) !== -1;
    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len]; //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //
    // top/left side

    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    } // bottom/right side


    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }

    data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available

    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
    return data;
  }
  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */


  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }

    return variation;
  }
  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */


  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

  var validPlacements = placements.slice(3);
  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */

  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';
    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;

      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;

      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;

      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);
      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future

        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }

    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }
  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */


  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2]; // If it's not a number it's an operator, I guess

    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;

      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;

        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;

      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }

      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }
  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */


  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one

    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    }); // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space

    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    } // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.


    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, []) // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    }); // Loop trough the offsets arrays and execute the operations

    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */


  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var basePlacement = placement.split('-')[0];
    var offsets = void 0;

    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken

    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    } // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself


    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification

    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];
    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';
    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed

    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;
    options.boundaries = boundaries;
    var order = options.priority;
    var popper = data.offsets.popper;
    var check = {
      primary: function primary(placement) {
        var value = popper[placement];

        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }

        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];

        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }

        return defineProperty({}, mainSide, value);
      }
    };
    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });
    data.offsets.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;
      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';
      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };
      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);
    return data;
  }
  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */


  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: offset,

      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: preventOverflow,

      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],

      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: arrow,

      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: flip,

      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',

      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,

      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,

      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: computeStyle,

      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,

      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',

      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: applyStyle,

      /** @prop {Function} */
      onLoad: applyStyleOnLoad,

      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };
  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */

  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };
  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */
  // Utils
  // Methods

  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      }; // make update() debounced, so that it only runs at most once-per-tick


      this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

      this.options = _extends({}, Popper.Defaults, options); // init state

      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      }; // get reference and popper elements (allow jQuery wrappers)

      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      }); // Refactoring modifiers' list (Object => Array)

      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      }) // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      }); // fire the first update to position the popper in the right place

      this.update();
      var eventsEnabled = this.options.eventsEnabled;

      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    } // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }
      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */

      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();
  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.3.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype; // Public

    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.show = function show() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          } // Disable Popper.js if we have a static display

        }
      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$5 = 'modal';
  var VERSION$5 = '4.3.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype; // Public

    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
        this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.3.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype; // Public

    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$6.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            return _this._handlePopperPlacementChange(data);
          }
        });
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getOffset = function _getOffset() {
      var _this3 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this4 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
            return _this4.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
          $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
            return _this4._enter(event);
          }).on(eventOut, _this4.config.selector, function (event) {
            return _this4._leave(event);
          });
        }
      });
      $(this.element).closest('.modal').on('hide.bs.modal', function () {
        if (_this4.element) {
          _this4.hide();
        }
      });

      if (this.config.selector) {
        this.config = _objectSpread({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$6;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$7 = 'popover';
  var VERSION$7 = '4.3.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype; // Overrides

    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$7;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.3.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype; // Public

    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$9 = 'tab';
  var VERSION$9 = '4.3.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$a = 'toast';
  var VERSION$a = '4.3.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      $(this._element).trigger(Event$a.SHOW);

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this.hide();
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide(withoutTimeout) {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      $(this._element).trigger(Event$a.HIDE);

      if (withoutTimeout) {
        this._close();
      } else {
        this._timeout = setTimeout(function () {
          _this2._close();
        }, this._config.delay);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this3.hide(true);
      });
    };

    _proto._close = function _close() {
      var _this4 = this;

      var complete = function complete() {
        _this4._element.classList.add(ClassName$a.HIDE);

        $(_this4._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
      isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
      isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element;

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
})();
//Test
console.log("Hello"); //Dark-mode

var checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function myFunction() {
  if (this.checked) {
    var cards = document.getElementsByClassName("card");
    var len = cards.length;

    for (var i = 0; i < len; i++) {
      cards[i].style.backgroundColor = "#343a40";
    }

    document.getElementsByTagName("BODY")[0].setAttribute('class', 'democlass');
    document.getElementsByClassName("widget-card")[0].style.backgroundColor = "#343a40";
  } else {
    var cards = document.getElementsByClassName("card");
    var len = cards.length;

    for (var i = 0; i < len; i++) {
      cards[i].style.backgroundColor = "#f8f9fa";
    }

    document.getElementsByTagName("BODY")[0].setAttribute('class', 'light');
    document.getElementsByClassName("widget-card")[0].style.backgroundColor = "#f8f9fa";
  }
}); //Hide footer on Y scroll

var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollpos = window.pageYOffset;

  if (prevScrollpos > currentScrollpos) {
    document.getElementById('telefono').style.opacity = '1';
    document.getElementById('darkmode').style.opacity = '1';
    document.getElementsByTagName("NAV")[0].style.opacity = '1';
  } else {
    document.getElementById('telefono').style.opacity = '0';
    document.getElementById('darkmode').style.opacity = '0';
    document.getElementsByTagName("NAV")[0].style.opacity = '0';
  }

  prevScrollpos = currentScrollpos;
};

console.log("Questo è un test dal file per Swup"); //Swup

/* (function ($) {

    //Swup
    const options = {
        animateHistoryBrowsing: true,
        animateSelector: '[class*="transition"]',
        containers: ["swup"],
        cache: true,
        linkSelector:
        'a[href^="' + 
        window.location.origin + 
        '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
        skipPopStateHandling: function(event){
            if (event.state && event.state.source == "swup"){
                return false;
            }

            return false;
        }        
    };

    const swup = new Swup(options);

}(jQuery)); */

!function (t) {
  var e = {};

  function i(n) {
    if (e[n]) return e[n].exports;
    var r = e[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return t[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
  }

  i.m = t, i.c = e, i.d = function (t, e, n) {
    i.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: n
    });
  }, i.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, i.t = function (t, e) {
    if (1 & e && (t = i(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var r in t) i.d(n, r, function (e) {
      return t[e];
    }.bind(null, r));
    return n;
  }, i.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };
    return i.d(e, "a", e), e;
  }, i.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, i.p = "", i(i.s = 39);
}([function (t, e, i) {
  "use strict";

  (function (t, n) {
    i.d(e, "e", function () {
      return r;
    }), i.d(e, "g", function () {
      return o;
    }), i.d(e, "f", function () {
      return s;
    }), i.d(e, "c", function () {
      return l;
    }), i.d(e, "a", function () {
      return h;
    }), i.d(e, "b", function () {
      return u;
    }), i.d(e, "d", function () {
      return c;
    });
    /*!
     * VERSION: 2.0.2
     * DATE: 2018-08-27
     * UPDATES AND DOCS AT: http://greensock.com
     *
     * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
     * This work is subject to the terms at http://greensock.com/standard-license or for
     * Club GreenSock members, the software agreement that was issued with your membership.
     *
     * @author: Jack Doyle, jack@greensock.com
     */

    var r = "undefined" != typeof window ? window : t.exports && void 0 !== n ? n : {},
        s = function (t, e) {
      var i = {},
          n = t.document,
          r = t.GreenSockGlobals = t.GreenSockGlobals || t;
      if (r.TweenLite) return r.TweenLite;

      var s,
          o,
          a,
          l,
          h,
          u = function (t) {
        var e,
            i = t.split("."),
            n = r;

        for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};

        return n;
      },
          c = u("com.greensock"),
          f = function (t) {
        var e,
            i = [],
            n = t.length;

        for (e = 0; e !== n; i.push(t[e++]));

        return i;
      },
          p = function () {},
          _ = function () {
        var t = Object.prototype.toString,
            e = t.call([]);
        return function (i) {
          return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e);
        };
      }(),
          d = {},
          m = function (t, e, n, s) {
        this.sc = d[t] ? d[t].sc : [], d[t] = this, this.gsClass = null, this.func = n;
        var o = [];
        this.check = function (a) {
          for (var l, h, c, f, p = e.length, _ = p; --p > -1;) (l = d[e[p]] || new m(e[p], [])).gsClass ? (o[p] = l.gsClass, _--) : a && l.sc.push(this);

          if (0 === _ && n) for (c = (h = ("com.greensock." + t).split(".")).pop(), f = u(h.join("."))[c] = this.gsClass = n.apply(n, o), s && (r[c] = i[c] = f), p = 0; p < this.sc.length; p++) this.sc[p].check();
        }, this.check(!0);
      },
          g = t._gsDefine = function (t, e, i, n) {
        return new m(t, e, i, n);
      },
          y = c._class = function (t, e, i) {
        return e = e || function () {}, g(t, [], function () {
          return e;
        }, i), e;
      };

      g.globals = r;

      var v = [0, 0, 1, 1],
          w = y("easing.Ease", function (t, e, i, n) {
        this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? v.concat(e) : v;
      }, !0),
          b = w.map = {},
          T = w.register = function (t, e, i, n) {
        for (var r, s, o, a, l = e.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;) for (s = l[h], r = n ? y("easing." + s, null, !0) : c.easing[s] || {}, o = u.length; --o > -1;) a = u[o], b[s + "." + a] = b[a + s] = r[a] = t.getRatio ? t : t[a] || new t();
      };

      for ((a = w.prototype)._calcEnd = !1, a.getRatio = function (t) {
        if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
        var e = this._type,
            i = this._power,
            n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
        return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2;
      }, o = (s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --o > -1;) a = s[o] + ",Power" + o, T(new w(null, null, 1, o), a, "easeOut", !0), T(new w(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), T(new w(null, null, 3, o), a, "easeInOut");

      b.linear = c.easing.Linear.easeIn, b.swing = c.easing.Quad.easeInOut;
      var x = y("events.EventDispatcher", function (t) {
        this._listeners = {}, this._eventTarget = t || this;
      });
      (a = x.prototype).addEventListener = function (t, e, i, n, r) {
        r = r || 0;
        var s,
            o,
            a = this._listeners[t],
            u = 0;

        for (this !== l || h || l.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1;) (s = a[o]).c === e && s.s === i ? a.splice(o, 1) : 0 === u && s.pr < r && (u = o + 1);

        a.splice(u, 0, {
          c: e,
          s: i,
          up: n,
          pr: r
        });
      }, a.removeEventListener = function (t, e) {
        var i,
            n = this._listeners[t];
        if (n) for (i = n.length; --i > -1;) if (n[i].c === e) return void n.splice(i, 1);
      }, a.dispatchEvent = function (t) {
        var e,
            i,
            n,
            r = this._listeners[t];
        if (r) for ((e = r.length) > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;) (n = r[e]) && (n.up ? n.c.call(n.s || i, {
          type: t,
          target: i
        }) : n.c.call(n.s || i));
      };

      var P = t.requestAnimationFrame,
          O = t.cancelAnimationFrame,
          k = Date.now || function () {
        return new Date().getTime();
      },
          S = k();

      for (o = (s = ["ms", "moz", "webkit", "o"]).length; --o > -1 && !P;) P = t[s[o] + "RequestAnimationFrame"], O = t[s[o] + "CancelAnimationFrame"] || t[s[o] + "CancelRequestAnimationFrame"];

      y("Ticker", function (t, e) {
        var i,
            r,
            s,
            o,
            a,
            u = this,
            c = k(),
            f = !(!1 === e || !P) && "auto",
            _ = 500,
            d = 33,
            m = function (t) {
          var e,
              n,
              l = k() - S;
          l > _ && (c += l - d), S += l, u.time = (S - c) / 1e3, e = u.time - a, (!i || e > 0 || !0 === t) && (u.frame++, a += e + (e >= o ? .004 : o - e), n = !0), !0 !== t && (s = r(m)), n && u.dispatchEvent("tick");
        };

        x.call(u), u.time = u.frame = 0, u.tick = function () {
          m(!0);
        }, u.lagSmoothing = function (t, e) {
          if (!arguments.length) return _ < 1e10;
          _ = t || 1e10, d = Math.min(e, _, 0);
        }, u.sleep = function () {
          null != s && (f && O ? O(s) : clearTimeout(s), r = p, s = null, u === l && (h = !1));
        }, u.wake = function (t) {
          null !== s ? u.sleep() : t ? c += -S + (S = k()) : u.frame > 10 && (S = k() - _ + 5), r = 0 === i ? p : f && P ? P : function (t) {
            return setTimeout(t, 1e3 * (a - u.time) + 1 | 0);
          }, u === l && (h = !0), m(2);
        }, u.fps = function (t) {
          if (!arguments.length) return i;
          o = 1 / ((i = t) || 60), a = this.time + o, u.wake();
        }, u.useRAF = function (t) {
          if (!arguments.length) return f;
          u.sleep(), f = t, u.fps(i);
        }, u.fps(t), setTimeout(function () {
          "auto" === f && u.frame < 5 && "hidden" !== (n || {}).visibilityState && u.useRAF(!1);
        }, 1500);
      }), (a = c.Ticker.prototype = new c.events.EventDispatcher()).constructor = c.Ticker;
      var A = y("core.Animation", function (t, e) {
        if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, G) {
          h || l.wake();
          var i = this.vars.useFrames ? V : G;
          i.add(this, i._time), this.vars.paused && this.paused(!0);
        }
      });
      l = A.ticker = new c.Ticker(), (a = A.prototype)._dirty = a._gc = a._initted = a._paused = !1, a._totalTime = a._time = 0, a._rawPrevTime = -1, a._next = a._last = a._onUpdate = a._timeline = a.timeline = null, a._paused = !1;

      var E = function () {
        h && k() - S > 2e3 && ("hidden" !== (n || {}).visibilityState || !l.lagSmoothing()) && l.wake();
        var t = setTimeout(E, 2e3);
        t.unref && t.unref();
      };

      E(), a.play = function (t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
      }, a.pause = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
      }, a.resume = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!1);
      }, a.seek = function (t, e) {
        return this.totalTime(Number(t), !1 !== e);
      }, a.restart = function (t, e) {
        return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0);
      }, a.reverse = function (t, e) {
        return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
      }, a.render = function (t, e, i) {}, a.invalidate = function () {
        return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this;
      }, a.isActive = function () {
        var t,
            e = this._timeline,
            i = this._startTime;
        return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7;
      }, a._enabled = function (t, e) {
        return h || l.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1;
      }, a._kill = function (t, e) {
        return this._enabled(!1, !1);
      }, a.kill = function (t, e) {
        return this._kill(t, e), this;
      }, a._uncache = function (t) {
        for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;

        return this;
      }, a._swapSelfInParams = function (t) {
        for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);

        return i;
      }, a._callback = function (t) {
        var e = this.vars,
            i = e[t],
            n = e[t + "Params"],
            r = e[t + "Scope"] || e.callbackScope || this;

        switch (n ? n.length : 0) {
          case 0:
            i.call(r);
            break;

          case 1:
            i.call(r, n[0]);
            break;

          case 2:
            i.call(r, n[0], n[1]);
            break;

          default:
            i.apply(r, n);
        }
      }, a.eventCallback = function (t, e, i, n) {
        if ("on" === (t || "").substr(0, 2)) {
          var r = this.vars;
          if (1 === arguments.length) return r[t];
          null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = _(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e);
        }

        return this;
      }, a.delay = function (t) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay;
      }, a.duration = function (t) {
        return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration);
      }, a.totalDuration = function (t) {
        return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration;
      }, a.time = function (t, e) {
        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time;
      }, a.totalTime = function (t, e, i) {
        if (h || l.wake(), !arguments.length) return this._totalTime;

        if (this._timeline) {
          if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
            this._dirty && this.totalDuration();
            var n = this._totalDuration,
                r = this._timeline;
            if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline) for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline;
          }

          this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (L.length && $(), this.render(t, e, !1), L.length && $());
        }

        return this;
      }, a.progress = a.totalProgress = function (t, e) {
        var i = this.duration();
        return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio;
      }, a.startTime = function (t) {
        return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime;
      }, a.endTime = function (t) {
        return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale;
      }, a.timeScale = function (t) {
        if (!arguments.length) return this._timeScale;
        var e, i;

        for (t = t || 1e-10, this._timeline && this._timeline.smoothChildTiming && (i = (e = this._pauseTime) || 0 === e ? e : this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / t), this._timeScale = t, i = this.timeline; i && i.timeline;) i._dirty = !0, i.totalDuration(), i = i.timeline;

        return this;
      }, a.reversed = function (t) {
        return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed;
      }, a.paused = function (t) {
        if (!arguments.length) return this._paused;
        var e,
            i,
            n = this._timeline;
        return t != this._paused && n && (h || t || l.wake(), i = (e = n.rawTime()) - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this;
      };
      var R = y("core.SimpleTimeline", function (t) {
        A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0;
      });
      (a = R.prototype = new A()).constructor = R, a.kill()._gc = !1, a._first = a._last = a._recent = null, a._sortChildren = !1, a.add = a.insert = function (t, e, i, n) {
        var r, s;
        if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren) for (s = t._startTime; r && r._startTime > s;) r = r._prev;
        return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this;
      }, a._remove = function (t, e) {
        return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this;
      }, a.render = function (t, e, i) {
        var n,
            r = this._first;

        for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n;
      }, a.rawTime = function () {
        return h || l.wake(), this._totalTime;
      };

      var C = y("TweenLite", function (e, i, n) {
        if (A.call(this, i, n), this.render = C.prototype.render, null == e) throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : C.selector(e) || e;
        var r,
            s,
            o,
            a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
            l = this.vars.overwrite;
        if (this._overwrite = l = null == l ? Y[C.defaultOverwrite] : "number" == typeof l ? l >> 0 : Y[l], (a || e instanceof Array || e.push && _(e)) && "number" != typeof e[0]) for (this._targets = o = f(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) (s = o[r]) ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(f(s))) : (this._siblings[r] = Z(s, this, !1), 1 === l && this._siblings[r].length > 1 && K(s, this, null, 1, this._siblings[r])) : "string" == typeof (s = o[r--] = C.selector(s)) && o.splice(r + 1, 1) : o.splice(r--, 1);else this._propLookup = {}, this._siblings = Z(e, this, !1), 1 === l && this._siblings.length > 1 && K(e, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -1e-10, this.render(Math.min(0, -this._delay)));
      }, !0),
          M = function (e) {
        return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType);
      };

      (a = C.prototype = new A()).constructor = C, a.kill()._gc = !1, a.ratio = 0, a._firstPT = a._targets = a._overwrittenProps = a._startAt = null, a._notifyPluginsOfEnabled = a._lazy = !1, C.version = "2.0.2", C.defaultEase = a._ease = new w(null, null, 1, 1), C.defaultOverwrite = "auto", C.ticker = l, C.autoSleep = 120, C.lagSmoothing = function (t, e) {
        l.lagSmoothing(t, e);
      }, C.selector = t.$ || t.jQuery || function (e) {
        var i = t.$ || t.jQuery;
        return i ? (C.selector = i, i(e)) : (n || (n = t.document), n ? n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e);
      };

      var L = [],
          D = {},
          j = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
          F = /[\+-]=-?[\.\d]/,
          z = function (t) {
        for (var e, i = this._firstPT; i;) e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m.call(this._tween, e, this._target || i.t, this._tween) : e < 1e-6 && e > -1e-6 && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next;
      },
          I = function (t, e, i, n) {
        var r,
            s,
            o,
            a,
            l,
            h,
            u,
            c = [],
            f = 0,
            p = "",
            _ = 0;

        for (c.start = t, c.end = e, t = c[0] = t + "", e = c[1] = e + "", i && (i(c), t = c[0], e = c[1]), c.length = 0, r = t.match(j) || [], s = e.match(j) || [], n && (n._next = null, n.blob = 1, c._firstPT = c._applyPT = n), l = s.length, a = 0; a < l; a++) u = s[a], p += (h = e.substr(f, e.indexOf(u, f) - f)) || !a ? h : ",", f += h.length, _ ? _ = (_ + 1) % 5 : "rgba(" === h.substr(-5) && (_ = 1), u === r[a] || r.length <= a ? p += u : (p && (c.push(p), p = ""), o = parseFloat(r[a]), c.push(o), c._firstPT = {
          _next: c._firstPT,
          t: c,
          p: c.length - 1,
          s: o,
          c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
          f: 0,
          m: _ && _ < 4 ? Math.round : 0
        }), f += u.length;

        return (p += e.substr(f)) && c.push(p), c.setRatio = z, F.test(e) && (c.end = null), c;
      },
          N = function (t, e, i, n, r, s, o, a, l) {
        "function" == typeof n && (n = n(l || 0, t));
        var h = typeof t[e],
            u = "function" !== h ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
            c = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e],
            f = "string" == typeof n && "=" === n.charAt(1),
            p = {
          t: t,
          p: e,
          s: c,
          f: "function" === h,
          pg: 0,
          n: r || e,
          m: s ? "function" == typeof s ? s : Math.round : 0,
          pr: 0,
          c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - c || 0
        };
        if (("number" != typeof c || "number" != typeof n && !f) && (o || isNaN(c) || !f && isNaN(n) || "boolean" == typeof c || "boolean" == typeof n ? (p.fp = o, p = {
          t: I(c, f ? parseFloat(p.s) + p.c + (p.s + "").replace(/[0-9\-\.]/g, "") : n, a || C.defaultStringFilter, p),
          p: "setRatio",
          s: 0,
          c: 1,
          f: 2,
          pg: 0,
          n: r || e,
          pr: 0,
          m: 0
        }) : (p.s = parseFloat(c), f || (p.c = parseFloat(n) - p.s || 0))), p.c) return (p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p;
      },
          X = C._internals = {
        isArray: _,
        isSelector: M,
        lazyTweens: L,
        blobDif: I
      },
          B = C._plugins = {},
          q = X.tweenLookup = {},
          U = 0,
          H = X.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1
      },
          Y = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0
      },
          V = A._rootFramesTimeline = new R(),
          G = A._rootTimeline = new R(),
          W = 30,
          $ = X.lazyRender = function () {
        var t,
            e = L.length;

        for (D = {}; --e > -1;) (t = L[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);

        L.length = 0;
      };

      G._startTime = l.time, V._startTime = l.frame, G._active = V._active = !0, setTimeout($, 1), A._updateRoot = C.render = function () {
        var t, e, i;

        if (L.length && $(), G.render((l.time - G._startTime) * G._timeScale, !1, !1), V.render((l.frame - V._startTime) * V._timeScale, !1, !1), L.length && $(), l.frame >= W) {
          for (i in W = l.frame + (parseInt(C.autoSleep, 10) || 120), q) {
            for (t = (e = q[i].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);

            0 === e.length && delete q[i];
          }

          if ((!(i = G._first) || i._paused) && C.autoSleep && !V._first && 1 === l._listeners.tick.length) {
            for (; i && i._paused;) i = i._next;

            i || l.sleep();
          }
        }
      }, l.addEventListener("tick", A._updateRoot);

      var Z = function (t, e, i) {
        var n,
            r,
            s = t._gsTweenID;
        if (q[s || (t._gsTweenID = s = "t" + U++)] || (q[s] = {
          target: t,
          tweens: []
        }), e && ((n = q[s].tweens)[r = n.length] = e, i)) for (; --r > -1;) n[r] === e && n.splice(r, 1);
        return q[s].tweens;
      },
          Q = function (t, e, i, n) {
        var r,
            s,
            o = t.vars.onOverwrite;
        return o && (r = o(t, e, i, n)), (o = C.onOverwrite) && (s = o(t, e, i, n)), !1 !== r && !1 !== s;
      },
          K = function (t, e, i, n, r) {
        var s, o, a, l;

        if (1 === n || n >= 4) {
          for (l = r.length, s = 0; s < l; s++) if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);else if (5 === n) break;

          return o;
        }

        var h,
            u = e._startTime + 1e-10,
            c = [],
            f = 0,
            p = 0 === e._duration;

        for (s = r.length; --s > -1;) (a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || J(e, 0, p), 0 === J(a, h, p) && (c[f++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((p || !a._initted) && u - a._startTime <= 2e-10 || (c[f++] = a)));

        for (s = f; --s > -1;) if (l = (a = c[s])._firstPT, 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted && l) {
          if (2 !== n && !Q(a, e)) continue;
          a._enabled(!1, !1) && (o = !0);
        }

        return o;
      },
          J = function (t, e, i) {
        for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
          if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
          n = n._timeline;
        }

        return (s /= r) > e ? s - e : i && s === e || !t._initted && s - e < 2e-10 ? 1e-10 : (s += t.totalDuration() / t._timeScale / r) > e + 1e-10 ? 0 : s - e - 1e-10;
      };

      a._init = function () {
        var t,
            e,
            i,
            n,
            r,
            s,
            o = this.vars,
            a = this._overwrittenProps,
            l = this._duration,
            h = !!o.immediateRender,
            u = o.ease;

        if (o.startAt) {
          for (n in this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {}, o.startAt) r[n] = o.startAt[n];

          if (r.data = "isStart", r.overwrite = !1, r.immediateRender = !0, r.lazy = h && !1 !== o.lazy, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateParams = o.onUpdateParams, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = C.to(this.target || {}, 0, r), h) if (this._time > 0) this._startAt = null;else if (0 !== l) return;
        } else if (o.runBackwards && 0 !== l) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;else {
          for (n in 0 !== this._time && (h = !1), i = {}, o) H[n] && "autoCSS" !== n || (i[n] = o[n]);

          if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== o.lazy, i.immediateRender = h, this._startAt = C.to(this.target, 0, i), h) {
            if (0 === this._time) return;
          } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
        }

        if (this._ease = u = u ? u instanceof w ? u : "function" == typeof u ? new w(u, o.easeParams) : b[u] || C.defaultEase : C.defaultEase, o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (s = this._targets.length, t = 0; t < s; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
        if (e && C._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards) for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
        this._onUpdate = o.onUpdate, this._initted = !0;
      }, a._initProps = function (e, i, n, r, s) {
        var o, a, l, h, u, c;
        if (null == e) return !1;

        for (o in D[e._gsTweenID] && $(), this.vars.css || e.style && e !== t && e.nodeType && B.css && !1 !== this.vars.autoCSS && function (t, e) {
          var i,
              n = {};

          for (i in t) H[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!B[i] || B[i] && B[i]._autoCSS) || (n[i] = t[i], delete t[i]);

          t.css = n;
        }(this.vars, e), this.vars) if (c = this.vars[o], H[o]) c && (c instanceof Array || c.push && _(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this));else if (B[o] && (h = new B[o]())._onInitTween(e, this.vars[o], this, s)) {
          for (this._firstPT = u = {
            _next: this._firstPT,
            t: h,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 1,
            n: o,
            pg: 1,
            pr: h._priority,
            m: 0
          }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;

          (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), u._next && (u._next._prev = u);
        } else i[o] = N.call(this, e, o, "get", c, o, 0, null, this.vars.stringFilter, s);

        return r && this._kill(r, e) ? this._initProps(e, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && K(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (D[e._gsTweenID] = !0), l);
      }, a.render = function (t, e, i) {
        var n,
            r,
            s,
            o,
            a = this._time,
            l = this._duration,
            h = this._rawPrevTime;
        if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && t >= -1e-7 || 1e-10 === h && "isPause" !== this.data) && h !== t && (i = !0, h > 1e-10 && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : 1e-10);else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (1e-10 !== h || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : 1e-10)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);else if (this._totalTime = this._time = t, this._easeType) {
          var u = t / l,
              c = this._easeType,
              f = this._easePower;
          (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : t / l < .5 ? u / 2 : 1 - u / 2;
        } else this.ratio = this._ease.getRatio(t / l);

        if (this._time !== a || i) {
          if (!this._initted) {
            if (this._init(), !this._initted || this._gc) return;
            if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, L.push(this), void (this._lazy = [t, e]);
            this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }

          for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;

          this._onUpdate && (t < 0 && this._startAt && -1e-4 !== t && this._startAt.render(t, !0, i), e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, !0, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && 1e-10 === this._rawPrevTime && 1e-10 !== o && (this._rawPrevTime = 0)));
        }
      }, a._kill = function (t, e, i) {
        if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
        e = "string" != typeof e ? e || this._targets || this.target : C.selector(e) || e;
        var n,
            r,
            s,
            o,
            a,
            l,
            h,
            u,
            c,
            f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline,
            p = this._firstPT;
        if ((_(e) || M(e)) && "number" != typeof e[0]) for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);else {
          if (this._targets) {
            for (n = this._targets.length; --n > -1;) if (e === this._targets[n]) {
              a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
              break;
            }
          } else {
            if (e !== this.target) return !1;
            a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all";
          }

          if (a) {
            if (h = t || a, u = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (C.onOverwrite || this.vars.onOverwrite)) {
              for (s in h) a[s] && (c || (c = []), c.push(s));

              if ((c || !t) && !Q(this, i, e, c)) return !1;
            }

            for (s in h) (o = a[s]) && (f && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), u && (r[s] = 1);

            !this._firstPT && this._initted && p && this._enabled(!1, !1);
          }
        }
        return l;
      }, a.invalidate = function () {
        return this._notifyPluginsOfEnabled && C._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], A.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -1e-10, this.render(Math.min(0, -this._delay))), this;
      }, a._enabled = function (t, e) {
        if (h || l.wake(), t && this._gc) {
          var i,
              n = this._targets;
          if (n) for (i = n.length; --i > -1;) this._siblings[i] = Z(n[i], this, !0);else this._siblings = Z(this.target, this, !0);
        }

        return A.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && C._onPluginEvent(t ? "_onEnable" : "_onDisable", this);
      }, C.to = function (t, e, i) {
        return new C(t, e, i);
      }, C.from = function (t, e, i) {
        return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new C(t, e, i);
      }, C.fromTo = function (t, e, i, n) {
        return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new C(t, e, n);
      }, C.delayedCall = function (t, e, i, n, r) {
        return new C(e, 0, {
          delay: t,
          onComplete: e,
          onCompleteParams: i,
          callbackScope: n,
          onReverseComplete: e,
          onReverseCompleteParams: i,
          immediateRender: !1,
          lazy: !1,
          useFrames: r,
          overwrite: 0
        });
      }, C.set = function (t, e) {
        return new C(t, 0, e);
      }, C.getTweensOf = function (t, e) {
        if (null == t) return [];
        var i, n, r, s;

        if (t = "string" != typeof t ? t : C.selector(t) || t, (_(t) || M(t)) && "number" != typeof t[0]) {
          for (i = t.length, n = []; --i > -1;) n = n.concat(C.getTweensOf(t[i], e));

          for (i = n.length; --i > -1;) for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1);
        } else if (t._gsTweenID) for (i = (n = Z(t).concat()).length; --i > -1;) (n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);

        return n || [];
      }, C.killTweensOf = C.killDelayedCallsTo = function (t, e, i) {
        "object" == typeof e && (i = e, e = !1);

        for (var n = C.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t);
      };
      var tt = y("plugins.TweenPlugin", function (t, e) {
        this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = tt.prototype;
      }, !0);

      if (a = tt.prototype, tt.version = "1.19.0", tt.API = 2, a._firstPT = null, a._addTween = N, a.setRatio = z, a._kill = function (t) {
        var e,
            i = this._overwriteProps,
            n = this._firstPT;
        if (null != t[this._propName]) this._overwriteProps = [];else for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);

        for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;

        return !1;
      }, a._mod = a._roundProps = function (t) {
        for (var e, i = this._firstPT; i;) (e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next;
      }, C._onPluginEvent = function (t, e) {
        var i,
            n,
            r,
            s,
            o,
            a = e._firstPT;

        if ("_onInitAllProps" === t) {
          for (; a;) {
            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;

            (a._prev = n ? n._prev : s) ? a._prev._next = a : r = a, (a._next = n) ? n._prev = a : s = a, a = o;
          }

          a = e._firstPT = r;
        }

        for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;

        return i;
      }, tt.activate = function (t) {
        for (var e = t.length; --e > -1;) t[e].API === tt.API && (B[new t[e]()._propName] = t[e]);

        return !0;
      }, g.plugin = function (t) {
        if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
        var e,
            i = t.propName,
            n = t.priority || 0,
            r = t.overwriteProps,
            s = {
          init: "_onInitTween",
          set: "setRatio",
          kill: "_kill",
          round: "_mod",
          mod: "_mod",
          initAll: "_onInitAllProps"
        },
            o = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
          tt.call(this, i, n), this._overwriteProps = r || [];
        }, !0 === t.global),
            a = o.prototype = new tt(i);

        for (e in a.constructor = o, o.API = t.API, s) "function" == typeof t[e] && (a[s[e]] = t[e]);

        return o.version = t.version, tt.activate([o]), o;
      }, s = t._gsQueue) {
        for (o = 0; o < s.length; o++) s[o]();

        for (a in d) d[a].func || t.console.log("GSAP encountered missing dependency: " + a);
      }

      return h = !1, C;
    }(r),
        o = r.GreenSockGlobals,
        a = o.com.greensock,
        l = a.core.SimpleTimeline,
        h = a.core.Animation,
        u = o.Ease,
        c = (o.Linear, o.Power1, o.Power2, o.Power3, o.Power4, o.TweenPlugin);

    a.events.EventDispatcher;
  }).call(this, i(32)(t), i(6));
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.Link = e.markSwupElements = e.getCurrentUrl = e.transitionEnd = e.fetch = e.getDataFromHTML = e.createHistoryRecord = e.classify = void 0;
  var n = c(i(15)),
      r = c(i(16)),
      s = c(i(17)),
      o = c(i(18)),
      a = c(i(19)),
      l = c(i(20)),
      h = c(i(21)),
      u = c(i(22));

  function c(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }

  e.classify = n.default, e.createHistoryRecord = r.default, e.getDataFromHTML = s.default, e.fetch = o.default, e.transitionEnd = a.default, e.getCurrentUrl = l.default, e.markSwupElements = h.default, e.Link = u.default;
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  e.query = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
    return "string" != typeof t ? t : e.querySelector(t);
  }, e.queryAll = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
    return "string" != typeof t ? t : Array.prototype.slice.call(e.querySelectorAll(t));
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }();

  i(36);

  var r = function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }(i(38));

  var s = function (t) {
    function e() {
      return function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, e), function (t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
    }

    return function (t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
    }(e, r.default), n(e, [{
      key: "require",
      value: function () {
        var t = function (t) {
          return function () {
            var e = t.apply(this, arguments);
            return new Promise(function (t, i) {
              return function n(r, s) {
                try {
                  var o = e[r](s),
                      a = o.value;
                } catch (t) {
                  return void i(t);
                }

                if (!o.done) return Promise.resolve(a).then(function (t) {
                  n("next", t);
                }, function (t) {
                  n("throw", t);
                });
                t(a);
              }("next");
            });
          };
        }(regeneratorRuntime.mark(function t() {
          return regeneratorRuntime.wrap(function (t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
              case "end":
                return t.stop();
            }
          }, t, this);
        }));

        return function () {
          return t.apply(this, arguments);
        };
      }()
    }, {
      key: "_load",
      value: function () {
        this.require().then(this.mount.bind(this));
      }
    }]), e;
  }();

  e.default = s;
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement;
    if (!t || 0 === Object.keys(t).length) return void console.warn("App has no components");
    var i = [];
    (0, n.queryAll)("[g-component]", e).forEach(function (e) {
      var n = (0, r.default)(e);
      if (n) return console.warn("Error: instance exists: \n", n), !0;
      var o = e.getAttribute("g-component");
      "function" == typeof t[o] ? i.push((0, s.default)(e, o, t[o])) : console.warn('Constructor for component "' + o + '" not found.');
    }), i.forEach(function (t) {
      t._load();
    });
  };
  var n = i(7),
      r = o(i(33)),
      s = o(i(34));

  function o(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }();

  var r = function () {
    function t() {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.isSwupPlugin = !0;
    }

    return n(t, [{
      key: "mount",
      value: function () {}
    }, {
      key: "unmount",
      value: function () {}
    }, {
      key: "_beforeMount",
      value: function () {}
    }, {
      key: "_afterUnmount",
      value: function () {}
    }]), t;
  }();

  e.default = r;
}, function (t, e) {
  var i;

  i = function () {
    return this;
  }();

  try {
    i = i || Function("return this")() || (0, eval)("this");
  } catch (t) {
    "object" == typeof window && (i = window);
  }

  t.exports = i;
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.query = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
    if ("string" != typeof t) return t;
    return e.querySelector(t);
  }, e.queryAll = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
    if ("string" != typeof t) return t;
    return Array.prototype.slice.call(e.querySelectorAll(t));
  }, e.toggleClass = function (t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
    null === i ? t.classList.contains(e) ? t.classList.remove(e) : t.classList.add(e) : i ? t.classList.add(e) : t.classList.remove(e);
  }, e.removeClass = function (t, e) {
    Array.isArray(t) ? t.forEach(function (t) {
      return t.classList.remove(e);
    }) : t.classList.remove(e);
    return t;
  }, e.addClass = function (t, e) {
    Array.isArray(t) ? t.forEach(function (t) {
      return t.classList.add(e);
    }) : t.classList.add(e);
    return t;
  }, e.triggerEvent = function (t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
        n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
      bubbles: !0,
      cancelable: !0,
      detail: null
    };
    n.detail = i;
    var r = new CustomEvent(e, n);
    t.dispatchEvent(r);
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];

      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }

    return t;
  },
      r = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }(),
      s = y(i(11)),
      o = y(i(13)),
      a = y(i(14)),
      l = y(i(23)),
      h = y(i(24)),
      u = y(i(25)),
      c = y(i(26)),
      f = y(i(27)),
      p = y(i(28)),
      _ = y(i(29)),
      d = i(30),
      m = i(2),
      g = i(1);

  function y(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }

  var v = function () {
    function t(e) {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t);
      var i = {
        animateHistoryBrowsing: !1,
        animationSelector: '[class*="transition-"]',
        linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
        cache: !0,
        containers: ["#swup"],
        requestHeaders: {
          "X-Requested-With": "swup",
          Accept: "text/html, application/xhtml+xml"
        },
        plugins: [],
        skipPopStateHandling: function (t) {
          return !(t.state && "swup" === t.state.source);
        }
      },
          r = n({}, i, e);
      this._handlers = {
        animationInDone: [],
        animationInStart: [],
        animationOutDone: [],
        animationOutStart: [],
        animationSkipped: [],
        clickLink: [],
        contentReplaced: [],
        disabled: [],
        enabled: [],
        openPageInNewTab: [],
        pageLoaded: [],
        pageRetrievedFromCache: [],
        pageView: [],
        popState: [],
        samePage: [],
        samePageWithHash: [],
        serverError: [],
        transitionStart: [],
        transitionEnd: [],
        willReplaceContent: []
      }, this.scrollToElement = null, this.preloadPromise = null, this.options = r, this.plugins = [], this.transition = {}, this.delegatedListeners = {}, this.cache = new o.default(), this.cache.swup = this, this.loadPage = a.default, this.renderPage = l.default, this.triggerEvent = h.default, this.on = u.default, this.off = c.default, this.updateTransition = f.default, this.getAnimationPromises = p.default, this.getPageData = _.default, this.log = function () {}, this.use = d.use, this.unuse = d.unuse, this.findPlugin = d.findPlugin, this.enable();
    }

    return r(t, [{
      key: "enable",
      value: function () {
        var t = this;

        if ("undefined" != typeof Promise) {
          this.delegatedListeners.click = (0, s.default)(document, this.options.linkSelector, "click", this.linkClickHandler.bind(this)), window.addEventListener("popstate", this.popStateHandler.bind(this));
          var e = (0, g.getDataFromHTML)(document.documentElement.outerHTML, this.options.containers);
          e.url = e.responseURL = (0, g.getCurrentUrl)(), this.options.cache && this.cache.cacheUrl(e), (0, g.markSwupElements)(document.documentElement, this.options.containers), this.options.plugins.forEach(function (e) {
            t.use(e);
          }), window.history.replaceState(Object.assign({}, window.history.state, {
            url: window.location.href,
            random: Math.random(),
            source: "swup"
          }), document.title, window.location.href), this.triggerEvent("enabled"), document.documentElement.classList.add("swup-enabled"), this.triggerEvent("pageView");
        } else console.warn("Promise is not supported");
      }
    }, {
      key: "destroy",
      value: function () {
        var t = this;
        this.delegatedListeners.click.destroy(), this.delegatedListeners.mouseover.destroy(), window.removeEventListener("popstate", this.popStateHandler.bind(this)), this.cache.empty(), this.options.plugins.forEach(function (e) {
          t.unuse(e);
        }), (0, m.queryAll)("[data-swup]").forEach(function (t) {
          delete t.dataset.swup;
        }), this.off(), this.triggerEvent("disabled"), document.documentElement.classList.remove("swup-enabled");
      }
    }, {
      key: "linkClickHandler",
      value: function (t) {
        if (t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) this.triggerEvent("openPageInNewTab", t);else if (0 === t.button) {
          this.triggerEvent("clickLink", t), t.preventDefault();
          var e = new g.Link(t.delegateTarget);

          if (e.getAddress() == (0, g.getCurrentUrl)() || "" == e.getAddress()) {
            if ("" != e.getHash()) this.triggerEvent("samePageWithHash", t), null != document.querySelector(e.getHash()) ? history.replaceState({
              url: e.getAddress() + e.getHash(),
              random: Math.random(),
              source: "swup"
            }, document.title, e.getAddress() + e.getHash()) : console.warn("Element for offset not found (" + e.getHash() + ")");else this.triggerEvent("samePage", t);
          } else {
            "" != e.getHash() && (this.scrollToElement = e.getHash());
            var i = t.delegateTarget.dataset.swupTransition;
            this.loadPage({
              url: e.getAddress(),
              customTransition: i
            }, !1);
          }
        }
      }
    }, {
      key: "popStateHandler",
      value: function (t) {
        if (!this.options.skipPopStateHandling(t)) {
          var e = new g.Link(t.state ? t.state.url : window.location.pathname);
          "" !== e.getHash() ? this.scrollToElement = e.getHash() : t.preventDefault(), this.triggerEvent("popState", t), this.loadPage({
            url: e.getAddress()
          }, t);
        }
      }
    }]), t;
  }();

  e.default = v;
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];

      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }

    return t;
  },
      r = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }(),
      s = a(i(5)),
      o = a(i(31));

  function a(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }

  var l = function (t) {
    function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, e);

      var i = function (t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));

      i.name = "JsPlugin", i.currentAnimation = null, i.getAnimationPromises = function (t) {
        var e = i.getAnimationIndex(t);
        return [i.createAnimationPromise(e, t)];
      }, i.createAnimationPromise = function (t, e) {
        var n = i.swup.transition,
            r = i.options[t];
        return new Promise(function (t) {
          r[e](t, {
            paramsFrom: r.regFrom.exec(n.from),
            paramsTo: r.regTo.exec(n.to),
            transition: n,
            from: r.from,
            to: r.to
          });
        });
      }, i.getAnimationIndex = function (t) {
        if ("in" === t) return i.currentAnimation;
        var e = i.options,
            n = 0,
            r = 0;
        return Object.keys(e).forEach(function (t, s) {
          var o = e[t],
              a = i.rateAnimation(o);
          a >= r && (n = s, r = a);
        }), i.currentAnimation = n, i.currentAnimation;
      }, i.rateAnimation = function (t) {
        var e = i.swup.transition,
            n = 0,
            r = t.regFrom.test(e.from),
            s = t.regTo.test(e.to);
        return n += r ? 1 : 0, n += s ? 1 : 0, n += r && t.to === e.custom ? 2 : 0;
      };
      return i.options = n({}, [{
        from: "(.*)",
        to: "(.*)",
        out: function (t) {
          return t();
        },
        in: function (t) {
          return t();
        }
      }], t), i.generateRegex(), i;
    }

    return function (t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
    }(e, s.default), r(e, [{
      key: "mount",
      value: function () {
        var t = this.swup;
        t._getAnimationPromises = t.getAnimationPromises, t.getAnimationPromises = this.getAnimationPromises;
      }
    }, {
      key: "unmount",
      value: function () {
        swup.getAnimationPromises = swup._getAnimationPromises, swup._getAnimationPromises = null;
      }
    }, {
      key: "generateRegex",
      value: function () {
        var t = this,
            e = function (t) {
          return t instanceof RegExp;
        };

        this.options = Object.keys(this.options).map(function (i) {
          return n({}, t.options[i], {
            regFrom: e(t.options[i].from) ? t.options[i].from : (0, o.default)(t.options[i].from),
            regTo: e(t.options[i].to) ? t.options[i].to : (0, o.default)(t.options[i].to)
          });
        });
      }
    }]), e;
  }();

  e.default = l;
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }(),
      r = function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }(i(5));

  function s(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
  }

  var o = function (t) {
    function e() {
      var t, i, n;
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, e);

      for (var r = arguments.length, o = Array(r), a = 0; a < r; a++) o[a] = arguments[a];

      return i = n = s(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [this].concat(o))), n.name = "DebugPlugin", n.triggerEvent = function (t, e) {
        e ? (console.groupCollapsed("%cswup:%c" + t, "color: #343434", "color: #009ACD"), console.log(e), console.groupEnd()) : console.log("%cswup:%c" + t, "color: #343434", "color: #009ACD"), n.swup._triggerEvent(t, e);
      }, n.log = function (t, e) {
        if (e) {
          for (var i in console.groupCollapsed(t), e) console.log(e[i]);

          console.groupEnd();
        } else console.log(t + "%c", "color: #009ACD");
      }, n.debugLog = function (t, e) {
        "error" === e ? console.error("DEBUG PLUGIN: " + t) : console.warn("DEBUG PLUGIN: " + t);
      }, s(n, i);
    }

    return function (t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
    }(e, r.default), n(e, [{
      key: "mount",
      value: function () {
        var t = this.swup;
        t.log = this.log, window.swup = t, t._triggerEvent = t.triggerEvent, t.triggerEvent = this.triggerEvent;
        var e = 'a[href]:not([href^="' + window.location.origin + '"]):not([href^="/"]):not([href^="http"]):not([href^="/"]):not([href^="?"]):not([href^="#"])';
        t.on("pageView", function () {
          if (document.querySelectorAll(e).length) {
            console.warn('DEBUG PLUGIN: It seems there are some links with a href attribute not starting with "#", "/" or current domain, which is potentially a problem.', document.querySelectorAll(e));
          }

          if (document.querySelectorAll(e).length) {
            console.warn('DEBUG PLUGIN: It seems there are some links with a href attribute not starting with "#", "/" or current domain, which is potentially a problem.', document.querySelectorAll(e));
          }
        });
      }
    }, {
      key: "unmount",
      value: function () {
        this.swup.log = function () {}, this.swup.triggerEvent = this.swup._triggerEvent;
      }
    }]), e;
  }();

  e.default = o;
}, function (t, e, i) {
  var n = i(12);

  t.exports = function (t, e, i, r, s) {
    var o = function (t, e, i, r) {
      return function (i) {
        i.delegateTarget = n(i.target, e), i.delegateTarget && r.call(t, i);
      };
    }.apply(this, arguments);

    return t.addEventListener(i, o, s), {
      destroy: function () {
        t.removeEventListener(i, o, s);
      }
    };
  };
}, function (t, e) {
  var i = 9;

  if ("undefined" != typeof Element && !Element.prototype.matches) {
    var n = Element.prototype;
    n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector;
  }

  t.exports = function (t, e) {
    for (; t && t.nodeType !== i;) {
      if ("function" == typeof t.matches && t.matches(e)) return t;
      t = t.parentNode;
    }
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }();

  var r = e.Cache = function () {
    function t() {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.pages = {}, this.last = null;
    }

    return n(t, [{
      key: "cacheUrl",
      value: function (t) {
        t.url in this.pages == !1 && (this.pages[t.url] = t), this.last = this.pages[t.url], this.swup.log("Cache (" + Object.keys(this.pages).length + ")", this.pages);
      }
    }, {
      key: "getPage",
      value: function (t) {
        return this.pages[t];
      }
    }, {
      key: "getCurrentPage",
      value: function () {
        return this.getPage(window.location.pathname + window.location.search);
      }
    }, {
      key: "exists",
      value: function (t) {
        return t in this.pages;
      }
    }, {
      key: "empty",
      value: function () {
        this.pages = {}, this.last = null, this.swup.log("Cache cleared");
      }
    }, {
      key: "remove",
      value: function (t) {
        delete this.pages[t];
      }
    }]), t;
  }();

  e.default = r;
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];

      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }

    return t;
  },
      r = i(1);

  e.default = function (t, e) {
    var i = this,
        s = [],
        o = void 0;
    this.triggerEvent("transitionStart", e), null != t.customTransition ? (this.updateTransition(window.location.pathname, t.url, t.customTransition), document.documentElement.classList.add("to-" + (0, r.classify)(t.customTransition))) : this.updateTransition(window.location.pathname, t.url), !e || this.options.animateHistoryBrowsing ? function () {
      if (i.triggerEvent("animationOutStart"), document.documentElement.classList.add("is-changing"), document.documentElement.classList.add("is-leaving"), document.documentElement.classList.add("is-animating"), e && document.documentElement.classList.add("is-popstate"), document.documentElement.classList.add("to-" + (0, r.classify)(t.url)), s = i.getAnimationPromises("out"), Promise.all(s).then(function () {
        i.triggerEvent("animationOutDone");
      }), !e) {
        var n = void 0;
        n = null != i.scrollToElement ? t.url + i.scrollToElement : t.url, (0, r.createHistoryRecord)(n);
      }
    }() : this.triggerEvent("animationSkipped"), this.cache.exists(t.url) ? (o = new Promise(function (t) {
      t();
    }), this.triggerEvent("pageRetrievedFromCache")) : o = this.preloadPromise && this.preloadPromise.route == t.url ? this.preloadPromise : new Promise(function (e, s) {
      (0, r.fetch)(n({}, t, {
        headers: i.options.requestHeaders
      }), function (n) {
        if (500 === n.status) return i.triggerEvent("serverError"), void s(t.url);
        var r = i.getPageData(n);
        null != r ? (r.url = t.url, i.cache.cacheUrl(r), i.triggerEvent("pageLoaded"), e()) : s(t.url);
      });
    }), Promise.all(s.concat([o])).then(function () {
      i.renderPage(i.cache.getPage(t.url), e), i.preloadPromise = null;
    }).catch(function (t) {
      i.options.skipPopStateHandling = function () {
        return window.location = t, !0;
      }, window.history.go(-1);
    });
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function (t) {
    var e = t.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    return "/" === e[0] && (e = e.splice(1)), "" === e && (e = "homepage"), e;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function (t) {
    window.history.pushState({
      url: t || window.location.href.split(window.location.hostname)[1],
      random: Math.random(),
      source: "swup"
    }, document.getElementsByTagName("title")[0].innerText, t || window.location.href.split(window.location.hostname)[1]);
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  },
      r = i(2);

  e.default = function (t, e) {
    var i = t.replace("<body", '<div id="swupBody"').replace("</body>", "</div>"),
        s = document.createElement("div");
    s.innerHTML = i;

    for (var o = [], a = function (t) {
      if (null == s.querySelector(e[t])) return {
        v: null
      };
      (0, r.queryAll)(e[t]).forEach(function (i, n) {
        (0, r.queryAll)(e[t], s)[n].dataset.swup = o.length, o.push((0, r.queryAll)(e[t], s)[n].outerHTML);
      });
    }, l = 0; l < e.length; l++) {
      var h = a(l);
      if ("object" === (void 0 === h ? "undefined" : n(h))) return h.v;
    }

    var u = {
      title: s.querySelector("title").innerText,
      pageClass: s.querySelector("#swupBody").className,
      originalContent: t,
      blocks: o
    };
    return s.innerHTML = "", s = null, u;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];

      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }

    return t;
  };

  e.default = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        i = {
      url: window.location.pathname + window.location.search,
      method: "GET",
      data: null,
      headers: {}
    },
        r = n({}, i, t),
        s = new XMLHttpRequest();
    return s.onreadystatechange = function () {
      4 === s.readyState && (s.status, e(s));
    }, s.open(r.method, r.url, !0), Object.keys(r.headers).forEach(function (t) {
      s.setRequestHeader(t, r.headers[t]);
    }), s.send(r.data), s;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function () {
    var t = document.createElement("div"),
        e = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };

    for (var i in e) if (void 0 !== t.style[i]) return e[i];

    return !1;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function () {
    return window.location.pathname + window.location.search;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var n = i(2);

  e.default = function (t, e) {
    for (var i = 0, r = function (r) {
      null == t.querySelector(e[r]) ? console.warn("Element " + e[r] + " is not in current page.") : (0, n.queryAll)(e[r]).forEach(function (s, o) {
        (0, n.queryAll)(e[r], t)[o].dataset.swup = i, i++;
      });
    }, s = 0; s < e.length; s++) r(s);
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }();

  var r = function () {
    function t(e) {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), e instanceof Element || e instanceof SVGElement ? this.link = e : (this.link = document.createElement("a"), this.link.href = e);
    }

    return n(t, [{
      key: "getPath",
      value: function () {
        var t = this.link.pathname;
        return "/" !== t[0] && (t = "/" + t), t;
      }
    }, {
      key: "getAddress",
      value: function () {
        var t = this.link.pathname + this.link.search;
        return this.link.getAttribute("xlink:href") && (t = this.link.getAttribute("xlink:href")), "/" !== t[0] && (t = "/" + t), t;
      }
    }, {
      key: "getHash",
      value: function () {
        return this.link.hash;
      }
    }]), t;
  }();

  e.default = r;
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];

      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }

    return t;
  },
      r = (i(2), i(1));

  e.default = function (t, e) {
    var i = this;
    document.documentElement.classList.remove("is-leaving");
    var s = new r.Link(t.responseURL);
    window.location.pathname !== s.getPath() && (window.history.replaceState({
      url: s.getPath(),
      random: Math.random(),
      source: "swup"
    }, document.title, s.getPath()), this.cache.cacheUrl(n({}, t, {
      url: s.getPath()
    }))), e && !this.options.animateHistoryBrowsing || document.documentElement.classList.add("is-rendering"), this.triggerEvent("willReplaceContent", e);

    for (var o = 0; o < t.blocks.length; o++) document.body.querySelector('[data-swup="' + o + '"]').outerHTML = t.blocks[o];

    document.title = t.title, this.triggerEvent("contentReplaced", e), this.triggerEvent("pageView", e), this.options.cache || this.cache.empty(), setTimeout(function () {
      e && !i.options.animateHistoryBrowsing || (i.triggerEvent("animationInStart"), document.documentElement.classList.remove("is-animating"));
    }, 10);
    var a = this.getAnimationPromises("in");
    !e || this.options.animateHistoryBrowsing ? Promise.all(a).then(function () {
      i.triggerEvent("animationInDone"), i.triggerEvent("transitionEnd", e), document.documentElement.className.split(" ").forEach(function (t) {
        (new RegExp("^to-").test(t) || "is-changing" === t || "is-rendering" === t || "is-popstate" === t) && document.documentElement.classList.remove(t);
      });
    }) : this.triggerEvent("transitionEnd", e), this.scrollToElement = null;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function (t, e) {
    this._handlers[t].forEach(function (t) {
      try {
        t(e);
      } catch (t) {
        console.error(t);
      }
    });

    var i = new CustomEvent("swup:" + t, {
      detail: t
    });
    document.dispatchEvent(i);
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function (t, e) {
    this._handlers[t] ? this._handlers[t].push(e) : console.warn("Unsupported event " + t + ".");
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function (t, e) {
    var i = this;
    if (null != t) {
      if (null != e) {
        if (this._handlers[t] && this._handlers[t].filter(function (t) {
          return t === e;
        }).length) {
          var n = this._handlers[t].filter(function (t) {
            return t === e;
          })[0],
              r = this._handlers[t].indexOf(n);

          r > -1 && this._handlers[t].splice(r, 1);
        } else console.warn("Handler for event '" + t + "' no found.");
      } else this._handlers[t] = [];
    } else Object.keys(this._handlers).forEach(function (t) {
      i._handlers[t] = [];
    });
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  e.default = function (t, e, i) {
    this.transition = {
      from: t,
      to: e,
      custom: i
    };
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var n = i(2),
      r = i(1);

  e.default = function () {
    var t = [];
    return (0, n.queryAll)(this.options.animationSelector).forEach(function (e) {
      var i = new Promise(function (t) {
        e.addEventListener((0, r.transitionEnd)(), function (i) {
          e == i.target && t();
        });
      });
      t.push(i);
    }), t;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var n = i(1);

  e.default = function (t) {
    var e = t.responseText,
        i = (0, n.getDataFromHTML)(e, this.options.containers);
    return i ? (i.responseURL = t.responseURL ? t.responseURL : window.location.href, i) : (console.warn("Received page is invalid."), null);
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  e.use = function (t) {
    if (t.isSwupPlugin) return this.plugins.push(t), t.swup = this, "function" == typeof t._beforeMount && t._beforeMount(), t.mount(), this.plugins;
    console.warn("Not swup plugin instance " + t + ".");
  }, e.unuse = function (t) {
    var e = void 0;

    if (e = "string" == typeof t ? this.plugins.find(function (e) {
      return t === e.name;
    }) : t) {
      e.unmount(), "function" == typeof e._afterUnmount && e._afterUnmount();
      var i = this.plugins.indexOf(e);
      return this.plugins.splice(i, 1), this.plugins;
    }

    console.warn("No such plugin.");
  }, e.findPlugin = function (t) {
    return this.plugins.find(function (e) {
      return t === e.name;
    });
  };
}, function (t, e) {
  t.exports = u, t.exports.parse = r, t.exports.compile = function (t, e) {
    return s(r(t, e));
  }, t.exports.tokensToFunction = s, t.exports.tokensToRegExp = h;
  var i = "/",
      n = new RegExp(["(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"), "g");

  function r(t, e) {
    for (var r, s = [], l = 0, h = 0, u = "", c = e && e.delimiter || i, f = e && e.whitelist || void 0, p = !1; null !== (r = n.exec(t));) {
      var _ = r[0],
          d = r[1],
          m = r.index;
      if (u += t.slice(h, m), h = m + _.length, d) u += d[1], p = !0;else {
        var g = "",
            y = r[2],
            v = r[3],
            w = r[4],
            b = r[5];

        if (!p && u.length) {
          var T = u.length - 1,
              x = u[T];
          (!f || f.indexOf(x) > -1) && (g = x, u = u.slice(0, T));
        }

        u && (s.push(u), u = "", p = !1);
        var P = "+" === b || "*" === b,
            O = "?" === b || "*" === b,
            k = v || w,
            S = g || c;
        s.push({
          name: y || l++,
          prefix: g,
          delimiter: S,
          optional: O,
          repeat: P,
          pattern: k ? a(k) : "[^" + o(S === c ? S : S + c) + "]+?"
        });
      }
    }

    return (u || h < t.length) && s.push(u + t.substr(h)), s;
  }

  function s(t) {
    for (var e = new Array(t.length), i = 0; i < t.length; i++) "object" == typeof t[i] && (e[i] = new RegExp("^(?:" + t[i].pattern + ")$"));

    return function (i, n) {
      for (var r = "", s = n && n.encode || encodeURIComponent, o = 0; o < t.length; o++) {
        var a = t[o];

        if ("string" != typeof a) {
          var l,
              h = i ? i[a.name] : void 0;

          if (Array.isArray(h)) {
            if (!a.repeat) throw new TypeError('Expected "' + a.name + '" to not repeat, but got array');

            if (0 === h.length) {
              if (a.optional) continue;
              throw new TypeError('Expected "' + a.name + '" to not be empty');
            }

            for (var u = 0; u < h.length; u++) {
              if (l = s(h[u], a), !e[o].test(l)) throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '"');
              r += (0 === u ? a.prefix : a.delimiter) + l;
            }
          } else if ("string" != typeof h && "number" != typeof h && "boolean" != typeof h) {
            if (!a.optional) throw new TypeError('Expected "' + a.name + '" to be ' + (a.repeat ? "an array" : "a string"));
          } else {
            if (l = s(String(h), a), !e[o].test(l)) throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but got "' + l + '"');
            r += a.prefix + l;
          }
        } else r += a;
      }

      return r;
    };
  }

  function o(t) {
    return t.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }

  function a(t) {
    return t.replace(/([=!:$/()])/g, "\\$1");
  }

  function l(t) {
    return t && t.sensitive ? "" : "i";
  }

  function h(t, e, n) {
    for (var r = (n = n || {}).strict, s = !1 !== n.start, a = !1 !== n.end, h = n.delimiter || i, u = [].concat(n.endsWith || []).map(o).concat("$").join("|"), c = s ? "^" : "", f = 0; f < t.length; f++) {
      var p = t[f];
      if ("string" == typeof p) c += o(p);else {
        var _ = p.repeat ? "(?:" + p.pattern + ")(?:" + o(p.delimiter) + "(?:" + p.pattern + "))*" : p.pattern;

        e && e.push(p), p.optional ? p.prefix ? c += "(?:" + o(p.prefix) + "(" + _ + "))?" : c += "(" + _ + ")?" : c += o(p.prefix) + "(" + _ + ")";
      }
    }

    if (a) r || (c += "(?:" + o(h) + ")?"), c += "$" === u ? "$" : "(?=" + u + ")";else {
      var d = t[t.length - 1],
          m = "string" == typeof d ? d[d.length - 1] === h : void 0 === d;
      r || (c += "(?:" + o(h) + "(?=" + u + "))?"), m || (c += "(?=" + o(h) + "|" + u + ")");
    }
    return new RegExp(c, l(n));
  }

  function u(t, e, i) {
    return t instanceof RegExp ? function (t, e) {
      if (!e) return t;
      var i = t.source.match(/\((?!\?)/g);
      if (i) for (var n = 0; n < i.length; n++) e.push({
        name: n,
        prefix: null,
        delimiter: null,
        optional: !1,
        repeat: !1,
        pattern: null
      });
      return t;
    }(t, e) : Array.isArray(t) ? function (t, e, i) {
      for (var n = [], r = 0; r < t.length; r++) n.push(u(t[r], e, i).source);

      return new RegExp("(?:" + n.join("|") + ")", l(i));
    }(t, e, i) : function (t, e, i) {
      return h(r(t, i), e, i);
    }(t, e, i);
  }
}, function (t, e) {
  t.exports = function (t) {
    if (!t.webpackPolyfill) {
      var e = Object.create(t);
      e.children || (e.children = []), Object.defineProperty(e, "loaded", {
        enumerable: !0,
        get: function () {
          return e.l;
        }
      }), Object.defineProperty(e, "id", {
        enumerable: !0,
        get: function () {
          return e.i;
        }
      }), Object.defineProperty(e, "exports", {
        enumerable: !0
      }), e.webpackPolyfill = 1;
    }

    return e;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = function (t) {
    if ("string" == typeof t && !(t = document.getElementById(t))) return null;
    return t.__gia_component__;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = function (t, e, i, r) {
    i.prototype._name = e;
    var s = new i(t, r);
    n.default.get("log") && console.info('Created instance of component "' + e + '".');
    return s;
  };

  var n = function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }(i(35));
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }();

  var r = function () {
    function t() {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this._options = {
        log: !0
      };
    }

    return n(t, [{
      key: "set",
      value: function (t, e) {
        this._options[t] = e;
      }
    }, {
      key: "get",
      value: function (t) {
        return this._options[t];
      }
    }]), t;
  }();

  e.default = new r();
}, function (t, e, i) {
  (function (e, i) {
    !function (e) {
      "use strict";

      var n,
          r = Object.prototype.hasOwnProperty,
          s = "function" == typeof Symbol && Symbol.iterator || "@@iterator",
          o = "object" == typeof t,
          a = e.regeneratorRuntime;
      if (a) o && (t.exports = a);else {
        (a = e.regeneratorRuntime = o ? t.exports : {}).wrap = _;
        var l = "suspendedStart",
            h = "suspendedYield",
            u = "executing",
            c = "completed",
            f = {},
            p = y.prototype = m.prototype;
        g.prototype = p.constructor = y, y.constructor = g, g.displayName = "GeneratorFunction", a.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name));
        }, a.mark = function (t) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : t.__proto__ = y, t.prototype = Object.create(p), t;
        }, a.awrap = function (t) {
          return new w(t);
        }, v(b.prototype), a.async = function (t, e, i, n) {
          var r = new b(_(t, e, i, n));
          return a.isGeneratorFunction(e) ? r : r.next().then(function (t) {
            return t.done ? t.value : r.next();
          });
        }, v(p), p[s] = function () {
          return this;
        }, p.toString = function () {
          return "[object Generator]";
        }, a.keys = function (t) {
          var e = [];

          for (var i in t) e.push(i);

          return e.reverse(), function i() {
            for (; e.length;) {
              var n = e.pop();
              if (n in t) return i.value = n, i.done = !1, i;
            }

            return i.done = !0, i;
          };
        }, a.values = O, P.prototype = {
          constructor: P,
          reset: function (t) {
            if (this.prev = 0, this.next = 0, this.sent = n, this.done = !1, this.delegate = null, this.tryEntries.forEach(x), !t) for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = n);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var e = this;

            function i(i, n) {
              return o.type = "throw", o.arg = t, e.next = i, !!n;
            }

            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var s = this.tryEntries[n],
                  o = s.completion;
              if ("root" === s.tryLoc) return i("end");

              if (s.tryLoc <= this.prev) {
                var a = r.call(s, "catchLoc"),
                    l = r.call(s, "finallyLoc");

                if (a && l) {
                  if (this.prev < s.catchLoc) return i(s.catchLoc, !0);
                  if (this.prev < s.finallyLoc) return i(s.finallyLoc);
                } else if (a) {
                  if (this.prev < s.catchLoc) return i(s.catchLoc, !0);
                } else {
                  if (!l) throw new Error("try statement without catch or finally");
                  if (this.prev < s.finallyLoc) return i(s.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var n = this.tryEntries[i];

              if (n.tryLoc <= this.prev && r.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                var s = n;
                break;
              }
            }

            s && ("break" === t || "continue" === t) && s.tryLoc <= e && e <= s.finallyLoc && (s = null);
            var o = s ? s.completion : {};
            return o.type = t, o.arg = e, s ? this.next = s.finallyLoc : this.complete(o), f;
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = t.arg, this.next = "end") : "normal" === t.type && e && (this.next = e);
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var i = this.tryEntries[e];
              if (i.finallyLoc === t) return this.complete(i.completion, i.afterLoc), x(i), f;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var i = this.tryEntries[e];

              if (i.tryLoc === t) {
                var n = i.completion;

                if ("throw" === n.type) {
                  var r = n.arg;
                  x(i);
                }

                return r;
              }
            }

            throw new Error("illegal catch attempt");
          },
          delegateYield: function (t, e, i) {
            return this.delegate = {
              iterator: O(t),
              resultName: e,
              nextLoc: i
            }, f;
          }
        };
      }

      function _(t, e, i, r) {
        var s = Object.create((e || m).prototype),
            o = new P(r || []);
        return s._invoke = function (t, e, i) {
          var r = l;
          return function (s, o) {
            if (r === u) throw new Error("Generator is already running");

            if (r === c) {
              if ("throw" === s) throw o;
              return k();
            }

            for (;;) {
              var a = i.delegate;

              if (a) {
                if ("return" === s || "throw" === s && a.iterator[s] === n) {
                  i.delegate = null;
                  var p = a.iterator.return;

                  if (p) {
                    var _ = d(p, a.iterator, o);

                    if ("throw" === _.type) {
                      s = "throw", o = _.arg;
                      continue;
                    }
                  }

                  if ("return" === s) continue;
                }

                var _ = d(a.iterator[s], a.iterator, o);

                if ("throw" === _.type) {
                  i.delegate = null, s = "throw", o = _.arg;
                  continue;
                }

                s = "next", o = n;
                var m = _.arg;
                if (!m.done) return r = h, m;
                i[a.resultName] = m.value, i.next = a.nextLoc, i.delegate = null;
              }

              if ("next" === s) i._sent = o, i.sent = r === h ? o : n;else if ("throw" === s) {
                if (r === l) throw r = c, o;
                i.dispatchException(o) && (s = "next", o = n);
              } else "return" === s && i.abrupt("return", o);
              r = u;

              var _ = d(t, e, i);

              if ("normal" === _.type) {
                r = i.done ? c : h;
                var m = {
                  value: _.arg,
                  done: i.done
                };
                if (_.arg !== f) return m;
                i.delegate && "next" === s && (o = n);
              } else "throw" === _.type && (r = c, s = "throw", o = _.arg);
            }
          };
        }(t, i, o), s;
      }

      function d(t, e, i) {
        try {
          return {
            type: "normal",
            arg: t.call(e, i)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }

      function m() {}

      function g() {}

      function y() {}

      function v(t) {
        ["next", "throw", "return"].forEach(function (e) {
          t[e] = function (t) {
            return this._invoke(e, t);
          };
        });
      }

      function w(t) {
        this.arg = t;
      }

      function b(t) {
        function e(e, i) {
          var n = t[e](i),
              o = n.value;
          return o instanceof w ? Promise.resolve(o.arg).then(r, s) : Promise.resolve(o).then(function (t) {
            return n.value = t, n;
          });
        }

        "object" == typeof i && i.domain && (e = i.domain.bind(e));
        var n,
            r = e.bind(t, "next"),
            s = e.bind(t, "throw");
        e.bind(t, "return");

        this._invoke = function (t, i) {
          function r() {
            return e(t, i);
          }

          return n = n ? n.then(r, r) : new Promise(function (t) {
            t(r());
          });
        };
      }

      function T(t) {
        var e = {
          tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }

      function x(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }

      function P(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(T, this), this.reset(!0);
      }

      function O(t) {
        if (t) {
          var e = t[s];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;

          if (!isNaN(t.length)) {
            var i = -1,
                o = function e() {
              for (; ++i < t.length;) if (r.call(t, i)) return e.value = t[i], e.done = !1, e;

              return e.value = n, e.done = !0, e;
            };

            return o.next = o;
          }
        }

        return {
          next: k
        };
      }

      function k() {
        return {
          value: n,
          done: !0
        };
      }
    }("object" == typeof e ? e : "object" == typeof window ? window : "object" == typeof self ? self : this);
  }).call(this, i(6), i(37));
}, function (t, e) {
  var i,
      n,
      r = t.exports = {};

  function s() {
    throw new Error("setTimeout has not been defined");
  }

  function o() {
    throw new Error("clearTimeout has not been defined");
  }

  function a(t) {
    if (i === setTimeout) return setTimeout(t, 0);
    if ((i === s || !i) && setTimeout) return i = setTimeout, setTimeout(t, 0);

    try {
      return i(t, 0);
    } catch (e) {
      try {
        return i.call(null, t, 0);
      } catch (e) {
        return i.call(this, t, 0);
      }
    }
  }

  !function () {
    try {
      i = "function" == typeof setTimeout ? setTimeout : s;
    } catch (t) {
      i = s;
    }

    try {
      n = "function" == typeof clearTimeout ? clearTimeout : o;
    } catch (t) {
      n = o;
    }
  }();
  var l,
      h = [],
      u = !1,
      c = -1;

  function f() {
    u && l && (u = !1, l.length ? h = l.concat(h) : c = -1, h.length && p());
  }

  function p() {
    if (!u) {
      var t = a(f);
      u = !0;

      for (var e = h.length; e;) {
        for (l = h, h = []; ++c < e;) l && l[c].run();

        c = -1, e = h.length;
      }

      l = null, u = !1, function (t) {
        if (n === clearTimeout) return clearTimeout(t);
        if ((n === o || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);

        try {
          n(t);
        } catch (e) {
          try {
            return n.call(null, t);
          } catch (e) {
            return n.call(this, t);
          }
        }
      }(t);
    }
  }

  function _(t, e) {
    this.fun = t, this.array = e;
  }

  function d() {}

  r.nextTick = function (t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
    h.push(new _(t, e)), 1 !== h.length || u || a(p);
  }, _.prototype.run = function () {
    this.fun.apply(null, this.array);
  }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = d, r.addListener = d, r.once = d, r.off = d, r.removeListener = d, r.removeAllListeners = d, r.emit = d, r.prependListener = d, r.prependOnceListener = d, r.listeners = function (t) {
    return [];
  }, r.binding = function (t) {
    throw new Error("process.binding is not supported");
  }, r.cwd = function () {
    return "/";
  }, r.chdir = function (t) {
    throw new Error("process.chdir is not supported");
  }, r.umask = function () {
    return 0;
  };
}, function (t, e, i) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var n = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];

      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }

    return t;
  },
      r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  },
      s = function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  }(),
      o = i(7);

  var a = function () {
    function t(e, i) {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.element = e, this.element.__gia_component__ = this, this._ref = {}, this._options = i || {}, this._state = {};
    }

    return s(t, [{
      key: "_load",
      value: function () {
        this.mount();
      }
    }, {
      key: "mount",
      value: function () {
        console.warn("Component " + this._name + ' does not have "mount" method.');
      }
    }, {
      key: "unmount",
      value: function () {}
    }, {
      key: "getRef",
      value: function (t) {
        return '[g-ref="' + (arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? this._name + ":" : "") + t + '"]';
      }
    }, {
      key: "setState",
      value: function (t) {
        var e = this,
            i = {};
        Object.keys(t).forEach(function (s) {
          Array.isArray(t[s]) ? null != e._state[s] && Array.isArray(e._state[s]) && e._state[s].length === t[s].length ? t[s].some(function (n, r) {
            return e._state[s][r] !== n && (i[s] = t[s], e._state[s] = i[s], !0);
          }) : (i[s] = t[s], e._state[s] = i[s]) : "object" === r(t[s]) ? (null != e._state[s] && "object" === r(e._state[s]) ? (i[s] = {}, Object.keys(t[s]).forEach(function (n) {
            e._state[s][n] !== t[s][n] && (i[s][n] = t[s][n]);
          })) : i[s] = t[s], e._state[s] = n({}, e._state[s], i[s])) : e._state[s] !== t[s] && (i[s] = t[s], e._state[s] = t[s]);
        }), Object.keys(i).forEach(function (e) {
          Array.isArray(t[e]) ? 0 === i[e].length && delete i[e] : "object" === r(t[e]) && 0 === Object.keys(i[e]).length && delete i[e];
        }), this.stateChange(i);
      }
    }, {
      key: "stateChange",
      value: function (t) {}
    }, {
      key: "ref",
      get: function () {
        return this._ref;
      },
      set: function (t) {
        var e = this,
            i = (0, o.queryAll)("[g-ref]", this.element);
        return 0 === Object.keys(t).length ? i.forEach(function (t) {
          var n = t.getAttribute("g-ref");

          if (-1 !== n.indexOf(":")) {
            var r = n.split(":");
            if (r[0] != e._name) return;
            e._ref[r[1]] || (e._ref[r[1]] = i.filter(function (t) {
              return t.getAttribute("g-ref") === n;
            }));
          } else e._ref[n] || (e._ref[n] = i.filter(function (t) {
            return t.getAttribute("g-ref") === n;
          }));
        }) : this._ref = Object.keys(t).map(function (n) {
          var r = Array.isArray(t[n]);
          if (null !== t[n] && r && t[n].length > 0) return {
            name: n,
            value: t[n]
          };
          var s = n,
              o = e._name + ":" + s,
              a = i.filter(function (t) {
            return t.getAttribute("g-ref") === o;
          });
          return 0 === a.length && (a = i.filter(function (t) {
            return t.getAttribute("g-ref") === s;
          })), r || (a = a.length ? a[0] : null), {
            name: n,
            value: a
          };
        }).reduce(function (t, e) {
          return t[e.name] = e.value, t;
        }, {}), this._ref;
      }
    }, {
      key: "options",
      get: function () {
        return this._options;
      },
      set: function (t) {
        var e = {},
            i = this.element.getAttribute("g-options");
        return i && (e = JSON.parse(i)), this._options = n({}, this._options, t, e), this._options;
      }
    }, {
      key: "state",
      get: function () {
        return this._state;
      },
      set: function (t) {
        console.warn("You should not change state manually. Use setState instead."), this._state = t;
      }
    }]), t;
  }();

  e.default = a;
}, function (t, e, i) {
  "use strict";

  i.r(e);
  var n = i(8),
      r = i.n(n),
      s = i(9),
      o = i.n(s),
      a = i(10),
      l = i.n(a),
      h = i(0);
  /*!
   * VERSION: 2.0.2
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   **/

  h.e._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
    var t = function (t) {
      var e,
          i = [],
          n = t.length;

      for (e = 0; e !== n; i.push(t[e++]));

      return i;
    },
        e = function (t, e, i) {
      var n,
          r,
          s = t.cycle;

      for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];

      delete t.cycle;
    },
        i = function (t, e, n) {
      h.f.call(this, t, e, n), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._repeat && this._uncache(!0), this.render = i.prototype.render;
    },
        n = h.f._internals,
        r = n.isSelector,
        s = n.isArray,
        o = i.prototype = h.f.to({}, .1, {}),
        a = [];

    i.version = "2.0.2", o.constructor = i, o.kill()._gc = !1, i.killTweensOf = i.killDelayedCallsTo = h.f.killTweensOf, i.getTweensOf = h.f.getTweensOf, i.lagSmoothing = h.f.lagSmoothing, i.ticker = h.f.ticker, i.render = h.f.render, o.invalidate = function () {
      return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), h.f.prototype.invalidate.call(this);
    }, o.updateTo = function (t, e) {
      var i,
          n = this.ratio,
          r = this.vars.immediateRender || t.immediateRender;

      for (i in e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay)), t) this.vars[i] = t[i];

      if (this._initted || r) if (e) this._initted = !1, r && this.render(0, !0, !0);else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && h.f._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
        var s = this._totalTime;
        this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1);
      } else if (this._initted = !1, this._init(), this._time > 0 || r) for (var o, a = 1 / (1 - n), l = this._firstPT; l;) o = l.s + l.c, l.c *= a, l.s = o - l.c, l = l._next;
      return this;
    }, o.render = function (t, e, i) {
      this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();

      var r,
          s,
          o,
          a,
          l,
          u,
          c,
          f,
          p,
          _ = this._dirty ? this.totalDuration() : this._totalDuration,
          d = this._time,
          m = this._totalTime,
          g = this._cycle,
          y = this._duration,
          v = this._rawPrevTime;

      if (t >= _ - 1e-7 && t >= 0 ? (this._totalTime = _, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, s = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === y && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (v < 0 || t <= 0 && t >= -1e-7 || 1e-10 === v && "isPause" !== this.data) && v !== t && (i = !0, v > 1e-10 && (s = "onReverseComplete")), this._rawPrevTime = f = !e || t || v === t ? t : 1e-10)) : t < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === y && v > 0) && (s = "onReverseComplete", r = this._reversed), t < 0 && (this._active = !1, 0 === y && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0), this._rawPrevTime = f = !e || t || v === t ? t : 1e-10)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (a = y + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && m <= t && this._cycle--, this._time = this._totalTime - this._cycle * a, this._yoyo && 0 != (1 & this._cycle) && (this._time = y - this._time, (p = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== p || this._initted ? this._yoyoEase = p = !0 === p ? this._ease : p instanceof h.b ? p : h.b.map[p] : (p = this.vars.ease, this._yoyoEase = p = p ? p instanceof h.b ? p : "function" == typeof p ? new h.b(p, this.vars.easeParams) : h.b.map[p] || h.f.defaultEase : h.f.defaultEase)), this.ratio = p ? 1 - p.getRatio((y - this._time) / y) : 0)), this._time > y ? this._time = y : this._time < 0 && (this._time = 0)), this._easeType && !p ? (l = this._time / y, u = this._easeType, c = this._easePower, (1 === u || 3 === u && l >= .5) && (l = 1 - l), 3 === u && (l *= 2), 1 === c ? l *= l : 2 === c ? l *= l * l : 3 === c ? l *= l * l * l : 4 === c && (l *= l * l * l * l), 1 === u ? this.ratio = 1 - l : 2 === u ? this.ratio = l : this._time / y < .5 ? this.ratio = l / 2 : this.ratio = 1 - l / 2) : p || (this.ratio = this._ease.getRatio(this._time / y))), d !== this._time || i || g !== this._cycle) {
        if (!this._initted) {
          if (this._init(), !this._initted || this._gc) return;
          if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = m, this._rawPrevTime = v, this._cycle = g, n.lazyTweens.push(this), void (this._lazy = [t, e]);
          !this._time || r || p ? r && this._ease._calcEnd && !p && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / y);
        }

        for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== d && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : s || (s = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== y || e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;

        this._onUpdate && (t < 0 && this._startAt && this._startTime && this._startAt.render(t, !0, i), e || (this._totalTime !== m || s) && this._callback("onUpdate")), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), s && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, !0, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this._callback(s), 0 === y && 1e-10 === this._rawPrevTime && 1e-10 !== f && (this._rawPrevTime = 0)));
      } else m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"));
    }, i.to = function (t, e, n) {
      return new i(t, e, n);
    }, i.from = function (t, e, n) {
      return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new i(t, e, n);
    }, i.fromTo = function (t, e, n, r) {
      return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new i(t, e, r);
    }, i.staggerTo = i.allTo = function (n, o, l, u, c, f, p) {
      u = u || 0;

      var _,
          d,
          m,
          g,
          y = 0,
          v = [],
          w = function () {
        l.onComplete && l.onComplete.apply(l.onCompleteScope || this, arguments), c.apply(p || l.callbackScope || this, f || a);
      },
          b = l.cycle,
          T = l.startAt && l.startAt.cycle;

      for (s(n) || ("string" == typeof n && (n = h.f.selector(n) || n), r(n) && (n = t(n))), n = n || [], u < 0 && ((n = t(n)).reverse(), u *= -1), _ = n.length - 1, m = 0; m <= _; m++) {
        for (g in d = {}, l) d[g] = l[g];

        if (b && (e(d, n, m), null != d.duration && (o = d.duration, delete d.duration)), T) {
          for (g in T = d.startAt = {}, l.startAt) T[g] = l.startAt[g];

          e(d.startAt, n, m);
        }

        d.delay = y + (d.delay || 0), m === _ && c && (d.onComplete = w), v[m] = new i(n[m], o, d), y += u;
      }

      return v;
    }, i.staggerFrom = i.allFrom = function (t, e, n, r, s, o, a) {
      return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, i.staggerTo(t, e, n, r, s, o, a);
    }, i.staggerFromTo = i.allFromTo = function (t, e, n, r, s, o, a, l) {
      return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, i.staggerTo(t, e, r, s, o, a, l);
    }, i.delayedCall = function (t, e, n, r, s) {
      return new i(e, 0, {
        delay: t,
        onComplete: e,
        onCompleteParams: n,
        callbackScope: r,
        onReverseComplete: e,
        onReverseCompleteParams: n,
        immediateRender: !1,
        useFrames: s,
        overwrite: 0
      });
    }, i.set = function (t, e) {
      return new i(t, 0, e);
    }, i.isTweening = function (t) {
      return h.f.getTweensOf(t, !0).length > 0;
    };

    var l = function (t, e) {
      for (var i = [], n = 0, r = t._first; r;) r instanceof h.f ? i[n++] = r : (e && (i[n++] = r), n = (i = i.concat(l(r, e))).length), r = r._next;

      return i;
    },
        u = i.getAllTweens = function (t) {
      return l(h.a._rootTimeline, t).concat(l(h.a._rootFramesTimeline, t));
    };

    i.killAll = function (t, e, i, n) {
      null == e && (e = !0), null == i && (i = !0);
      var r,
          s,
          o,
          a = u(0 != n),
          l = a.length,
          c = e && i && n;

      for (o = 0; o < l; o++) s = a[o], (c || s instanceof h.c || (r = s.target === s.vars.onComplete) && i || e && !r) && (t ? s.totalTime(s._reversed ? 0 : s.totalDuration()) : s._enabled(!1, !1));
    }, i.killChildTweensOf = function (e, o) {
      if (null != e) {
        var a,
            l,
            u,
            c,
            f,
            p = n.tweenLookup;
        if ("string" == typeof e && (e = h.f.selector(e) || e), r(e) && (e = t(e)), s(e)) for (c = e.length; --c > -1;) i.killChildTweensOf(e[c], o);else {
          for (u in a = [], p) for (l = p[u].target.parentNode; l;) l === e && (a = a.concat(p[u].tweens)), l = l.parentNode;

          for (f = a.length, c = 0; c < f; c++) o && a[c].totalTime(a[c].totalDuration()), a[c]._enabled(!1, !1);
        }
      }
    };

    var c = function (t, e, i, n) {
      e = !1 !== e, i = !1 !== i;

      for (var r, s, o = u(n = !1 !== n), a = e && i && n, l = o.length; --l > -1;) s = o[l], (a || s instanceof h.c || (r = s.target === s.vars.onComplete) && i || e && !r) && s.paused(t);
    };

    return i.pauseAll = function (t, e, i) {
      c(!0, t, e, i);
    }, i.resumeAll = function (t, e, i) {
      c(!1, t, e, i);
    }, i.globalTimeScale = function (t) {
      var e = h.a._rootTimeline,
          i = h.f.ticker.time;
      return arguments.length ? (t = t || 1e-10, e._startTime = i - (i - e._startTime) * e._timeScale / t, e = h.a._rootFramesTimeline, i = h.f.ticker.frame, e._startTime = i - (i - e._startTime) * e._timeScale / t, e._timeScale = h.a._rootTimeline._timeScale = t, t) : e._timeScale;
    }, o.progress = function (t, e) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration();
    }, o.totalProgress = function (t, e) {
      return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration();
    }, o.time = function (t, e) {
      return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time;
    }, o.duration = function (t) {
      return arguments.length ? h.a.prototype.duration.call(this, t) : this._duration;
    }, o.totalDuration = function (t) {
      return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration);
    }, o.repeat = function (t) {
      return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat;
    }, o.repeatDelay = function (t) {
      return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay;
    }, o.yoyo = function (t) {
      return arguments.length ? (this._yoyo = t, this) : this._yoyo;
    }, i;
  }, !0);

  var u = h.g.TweenMax;
  /*!
   * VERSION: 2.0.2
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   */

  h.e._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function () {
    var t,
        e,
        i,
        n,
        r = function () {
      h.d.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = r.prototype.setRatio;
    },
        s = h.e._gsDefine.globals,
        o = {},
        a = r.prototype = new h.d("css");

    a.constructor = r, r.version = "2.0.2", r.API = 2, r.defaultTransformPerspective = 0, r.defaultSkewType = "compensated", r.defaultSmoothOrigin = !0, a = "px", r.suffixMap = {
      top: a,
      right: a,
      bottom: a,
      left: a,
      width: a,
      height: a,
      fontSize: a,
      padding: a,
      margin: a,
      perspective: a,
      lineHeight: ""
    };

    var l,
        u,
        c,
        f,
        p,
        _,
        d,
        m,
        g = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        b = /(?:\d|\-|\+|=|#|\.)*/g,
        T = /opacity *= *([^)]*)/i,
        x = /opacity:([^;]*)/i,
        P = /alpha\(opacity *=.+?\)/i,
        O = /^(rgb|hsl)/,
        k = /([A-Z])/g,
        S = /-([a-z])/gi,
        A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        E = function (t, e) {
      return e.toUpperCase();
    },
        R = /(?:Left|Right|Width)/i,
        C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        L = /,(?=[^\)]*(?:\(|$))/gi,
        D = /[\s,\(]/i,
        j = Math.PI / 180,
        F = 180 / Math.PI,
        z = {},
        I = {
      style: {}
    },
        N = h.e.document || {
      createElement: function () {
        return I;
      }
    },
        X = function (t, e) {
      return N.createElementNS ? N.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : N.createElement(t);
    },
        B = X("div"),
        q = X("img"),
        U = r._internals = {
      _specialProps: o
    },
        H = (h.e.navigator || {}).userAgent || "",
        Y = function () {
      var t = H.indexOf("Android"),
          e = X("a");
      return c = -1 !== H.indexOf("Safari") && -1 === H.indexOf("Chrome") && (-1 === t || parseFloat(H.substr(t + 8, 2)) > 3), p = c && parseFloat(H.substr(H.indexOf("Version/") + 8, 2)) < 6, f = -1 !== H.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(H) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(H)) && (_ = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity));
    }(),
        V = function (t) {
      return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
    },
        G = function (t) {
      h.e.console && console.log(t);
    },
        W = "",
        $ = "",
        Z = function (t, e) {
      var i,
          n,
          r = (e = e || B).style;
      if (void 0 !== r[t]) return t;

      for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);

      return n >= 0 ? (W = "-" + ($ = 3 === n ? "ms" : i[n]).toLowerCase() + "-", $ + t) : null;
    },
        Q = ("undefined" != typeof window ? window : N.defaultView || {
      getComputedStyle: function () {}
    }).getComputedStyle,
        K = r.getStyle = function (t, e, i, n, r) {
      var s;
      return Y || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || Q(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : V(t);
    },
        J = U.convertToPixels = function (t, e, i, n, s) {
      if ("px" === n || !n && "lineHeight" !== e) return i;
      if ("auto" === n || !i) return 0;

      var o,
          a,
          l,
          u = R.test(e),
          c = t,
          f = B.style,
          p = i < 0,
          _ = 1 === i;

      if (p && (i = -i), _ && (i *= 100), "lineHeight" !== e || n) {
        if ("%" === n && -1 !== e.indexOf("border")) o = i / 100 * (u ? t.clientWidth : t.clientHeight);else {
          if (f.cssText = "border:0 solid red;position:" + K(t, "position") + ";line-height:0;", "%" !== n && c.appendChild && "v" !== n.charAt(0) && "rem" !== n) f[u ? "borderLeftWidth" : "borderTopWidth"] = i + n;else {
            if (c = t.parentNode || N.body, -1 !== K(c, "display").indexOf("flex") && (f.position = "absolute"), a = c._gsCache, l = h.f.ticker.frame, a && u && a.time === l) return a.width * i / 100;
            f[u ? "width" : "height"] = i + n;
          }
          c.appendChild(B), o = parseFloat(B[u ? "offsetWidth" : "offsetHeight"]), c.removeChild(B), u && "%" === n && !1 !== r.cacheWidths && ((a = c._gsCache = c._gsCache || {}).time = l, a.width = o / i * 100), 0 !== o || s || (o = J(t, e, i, n, !0));
        }
      } else a = Q(t).lineHeight, t.style.lineHeight = i, o = parseFloat(Q(t).lineHeight), t.style.lineHeight = a;
      return _ && (o /= 100), p ? -o : o;
    },
        tt = U.calculateOffset = function (t, e, i) {
      if ("absolute" !== K(t, "position", i)) return 0;
      var n = "left" === e ? "Left" : "Top",
          r = K(t, "margin" + n, i);
      return t["offset" + n] - (J(t, e, parseFloat(r), r.replace(b, "")) || 0);
    },
        et = function (t, e) {
      var i,
          n,
          r,
          s = {};
      if (e = e || Q(t, null)) {
        if (i = e.length) for (; --i > -1;) -1 !== (r = e[i]).indexOf("-transform") && At !== r || (s[r.replace(S, E)] = e.getPropertyValue(r));else for (i in e) -1 !== i.indexOf("Transform") && St !== i || (s[i] = e[i]);
      } else if (e = t.currentStyle || t.style) for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(S, E)] = e[i]);
      return Y || (s.opacity = V(t)), n = Bt(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Rt && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s;
    },
        it = function (t, e, i, n, r) {
      var s,
          o,
          a,
          l = {},
          h = t.style;

      for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" != typeof s && "string" != typeof s || (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(w, "") ? s : 0 : tt(t, o), void 0 !== h[o] && (a = new gt(h, o, h[o], a))));

      if (n) for (o in n) "className" !== o && (l[o] = n[o]);
      return {
        difs: l,
        firstMPT: a
      };
    },
        nt = {
      width: ["Left", "Right"],
      height: ["Top", "Bottom"]
    },
        rt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        st = function (t, e, i) {
      if ("svg" === (t.nodeName + "").toLowerCase()) return (i || Q(t))[e] || 0;
      if (t.getCTM && It(t)) return t.getBBox()[e] || 0;
      var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
          r = nt[e],
          s = r.length;

      for (i = i || Q(t, null); --s > -1;) n -= parseFloat(K(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(K(t, "border" + r[s] + "Width", i, !0)) || 0;

      return n;
    },
        ot = function (t, e) {
      if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
      null != t && "" !== t || (t = "0 0");
      var i,
          n = t.split(" "),
          r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
          s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];

      if (n.length > 3 && !e) {
        for (n = t.split(", ").join(",").split(","), t = [], i = 0; i < n.length; i++) t.push(ot(n[i]));

        return t.join(",");
      }

      return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + s + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(w, "")), e.oy = parseFloat(s.replace(w, "")), e.v = t), e || t;
    },
        at = function (t, e) {
      return "function" == typeof t && (t = t(m, d)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0;
    },
        lt = function (t, e) {
      "function" == typeof t && (t = t(m, d));
      var i = "string" == typeof t && "=" === t.charAt(1);
      return "string" == typeof t && "v" === t.charAt(t.length - 2) && (t = (i ? t.substr(0, 2) : 0) + window["inner" + ("vh" === t.substr(-2) ? "Height" : "Width")] * (parseFloat(i ? t.substr(2) : t) / 100)), null == t ? e : i ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0;
    },
        ht = function (t, e, i, n) {
      var r, s, o, a, l;
      return "function" == typeof t && (t = t(m, d)), null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), o = ((l = "=" === t.charAt(1)) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : F) - (l ? 0 : e), s.length && (n && (n[i] = e + o), -1 !== t.indexOf("short") && (o %= r) !== o % (r / 2) && (o = o < 0 ? o + r : o - r), -1 !== t.indexOf("_cw") && o < 0 ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = e + o), a < 1e-6 && a > -1e-6 && (a = 0), a;
    },
        ut = {
      aqua: [0, 255, 255],
      lime: [0, 255, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, 255],
      navy: [0, 0, 128],
      white: [255, 255, 255],
      fuchsia: [255, 0, 255],
      olive: [128, 128, 0],
      yellow: [255, 255, 0],
      orange: [255, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [255, 0, 0],
      pink: [255, 192, 203],
      cyan: [0, 255, 255],
      transparent: [255, 255, 255, 0]
    },
        ct = function (t, e, i) {
      return 255 * (6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0;
    },
        ft = r.parseColor = function (t, e) {
      var i, n, r, s, o, a, l, h, u, c, f;
      if (t) {
        if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];else {
          if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) i = ut[t];else if ("#" === t.charAt(0)) 4 === t.length && (t = "#" + (n = t.charAt(1)) + n + (r = t.charAt(2)) + r + (s = t.charAt(3)) + s), i = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t];else if ("hsl" === t.substr(0, 3)) {
            if (i = f = t.match(g), e) {
              if (-1 !== t.indexOf("=")) return t.match(y);
            } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, n = 2 * (l = Number(i[2]) / 100) - (r = l <= .5 ? l * (a + 1) : l + a - l * a), i.length > 3 && (i[3] = Number(i[3])), i[0] = ct(o + 1 / 3, n, r), i[1] = ct(o, n, r), i[2] = ct(o - 1 / 3, n, r);
          } else i = t.match(g) || ut.transparent;
          i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]));
        }
      } else i = ut.black;
      return e && !f && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, l = ((h = Math.max(n, r, s)) + (u = Math.min(n, r, s))) / 2, h === u ? o = a = 0 : (c = h - u, a = l > .5 ? c / (2 - h - u) : c / (h + u), o = h === n ? (r - s) / c + (r < s ? 6 : 0) : h === r ? (s - n) / c + 2 : (n - r) / c + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i;
    },
        pt = function (t, e) {
      var i,
          n,
          r,
          s = t.match(_t) || [],
          o = 0,
          a = "";
      if (!s.length) return t;

      for (i = 0; i < s.length; i++) n = s[i], o += (r = t.substr(o, t.indexOf(n, o) - o)).length + n.length, 3 === (n = ft(n, e)).length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";

      return a + t.substr(o);
    },
        _t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";

    for (a in ut) _t += "|" + a + "\\b";

    _t = new RegExp(_t + ")", "gi"), r.colorStringFilter = function (t) {
      var e,
          i = t[0] + " " + t[1];
      _t.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = pt(t[0], e), t[1] = pt(t[1], e)), _t.lastIndex = 0;
    }, h.f.defaultStringFilter || (h.f.defaultStringFilter = r.colorStringFilter);

    var dt = function (t, e, i, n) {
      if (null == t) return function (t) {
        return t;
      };
      var r,
          s = e ? (t.match(_t) || [""])[0] : "",
          o = t.split(s).join("").match(v) || [],
          a = t.substr(0, t.indexOf(o[0])),
          l = ")" === t.charAt(t.length - 1) ? ")" : "",
          h = -1 !== t.indexOf(" ") ? " " : ",",
          u = o.length,
          c = u > 0 ? o[0].replace(g, "") : "";
      return u ? r = e ? function (t) {
        var e, f, p, _;

        if ("number" == typeof t) t += c;else if (n && L.test(t)) {
          for (_ = t.replace(L, "|").split("|"), p = 0; p < _.length; p++) _[p] = r(_[p]);

          return _.join(",");
        }
        if (e = (t.match(_t) || [s])[0], p = (f = t.split(e).join("").match(v) || []).length, u > p--) for (; ++p < u;) f[p] = i ? f[(p - 1) / 2 | 0] : o[p];
        return a + f.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "");
      } : function (t) {
        var e, s, f;
        if ("number" == typeof t) t += c;else if (n && L.test(t)) {
          for (s = t.replace(L, "|").split("|"), f = 0; f < s.length; f++) s[f] = r(s[f]);

          return s.join(",");
        }
        if (f = (e = t.match(v) || []).length, u > f--) for (; ++f < u;) e[f] = i ? e[(f - 1) / 2 | 0] : o[f];
        return a + e.join(h) + l;
      } : function (t) {
        return t;
      };
    },
        mt = function (t) {
      return t = t.split(","), function (e, i, n, r, s, o, a) {
        var l,
            h = (i + "").split(" ");

        for (a = {}, l = 0; l < 4; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];

        return r.parse(e, a, s, o);
      };
    },
        gt = (U._setPluginRatio = function (t) {
      this.plugin.setRatio(t);

      for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT; l;) e = a[l.v], l.r ? e = l.r(e) : e < 1e-6 && e > -1e-6 && (e = 0), l.t[l.p] = e, l = l._next;

      if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod.call(this._tween, a.rotation, this.t, this._tween) : a.rotation), 1 === t || 0 === t) for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l;) {
        if ((i = l.t).type) {
          if (1 === i.type) {
            for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];

            i[s] = r;
          }
        } else i[s] = i.s + i.xs0;

        l = l._next;
      }
    }, function (t, e, i, n, r) {
      this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n);
    }),
        yt = (U._parseToProxy = function (t, e, i, n, r, s) {
      var o,
          a,
          l,
          h,
          u,
          c = n,
          f = {},
          p = {},
          _ = i._transform,
          d = z;

      for (i._transform = null, z = e, n = u = i.parse(t, e, n, r), z = d, s && (i._transform = _, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
        if (n.type <= 1 && (p[a = n.p] = n.s + n.c, f[a] = n.s, s || (h = new gt(n, "s", a, h, n.r), n.c = 0), 1 === n.type)) for (o = n.l; --o > 0;) l = "xn" + o, p[a = n.p + "_" + l] = n.data[l], f[a] = n[l], s || (h = new gt(n, l, a, h, n.rxp[l]));
        n = n._next;
      }

      return {
        proxy: f,
        end: p,
        firstMPT: h,
        pt: u
      };
    }, U.CSSPropTween = function (e, i, r, s, o, a, l, h, u, c, f) {
      this.t = e, this.p = i, this.s = r, this.c = s, this.n = l || i, e instanceof yt || n.push(this.n), this.r = h ? "function" == typeof h ? h : Math.round : h, this.type = a || 0, u && (this.pr = u, t = !0), this.b = void 0 === c ? r : c, this.e = void 0 === f ? r + s : f, o && (this._next = o, o._prev = this);
    }),
        vt = function (t, e, i, n, r, s) {
      var o = new yt(t, e, i, n - i, r, -1, s);
      return o.b = i, o.e = o.xs0 = n, o;
    },
        wt = r.parseComplex = function (t, e, i, n, s, o, a, h, u, c) {
      i = i || o || "", "function" == typeof n && (n = n(m, d)), a = new yt(t, e, 0, 0, a, c ? 2 : 1, null, !1, h, i, n), n += "", s && _t.test(n + i) && (n = [i, n], r.colorStringFilter(n), i = n[0], n = n[1]);

      var f,
          p,
          _,
          v,
          w,
          b,
          T,
          x,
          P,
          O,
          k,
          S,
          A,
          E = i.split(", ").join(",").split(" "),
          R = n.split(", ").join(",").split(" "),
          C = E.length,
          M = !1 !== l;

      for (-1 === n.indexOf(",") && -1 === i.indexOf(",") || (-1 !== (n + i).indexOf("rgb") || -1 !== (n + i).indexOf("hsl") ? (E = E.join(" ").replace(L, ", ").split(" "), R = R.join(" ").replace(L, ", ").split(" ")) : (E = E.join(" ").split(",").join(", ").split(" "), R = R.join(" ").split(",").join(", ").split(" ")), C = E.length), C !== R.length && (C = (E = (o || "").split(" ")).length), a.plugin = u, a.setRatio = c, _t.lastIndex = 0, f = 0; f < C; f++) if (v = E[f], w = R[f] + "", (x = parseFloat(v)) || 0 === x) a.appendXtra("", x, at(w, x), w.replace(y, ""), !(!M || -1 === w.indexOf("px")) && Math.round, !0);else if (s && _t.test(v)) S = ")" + ((S = w.indexOf(")") + 1) ? w.substr(S) : ""), A = -1 !== w.indexOf("hsl") && Y, O = w, v = ft(v, A), w = ft(w, A), (P = v.length + w.length > 6) && !Y && 0 === w[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[f]).join("transparent")) : (Y || (P = !1), A ? a.appendXtra(O.substr(0, O.indexOf("hsl")) + (P ? "hsla(" : "hsl("), v[0], at(w[0], v[0]), ",", !1, !0).appendXtra("", v[1], at(w[1], v[1]), "%,", !1).appendXtra("", v[2], at(w[2], v[2]), P ? "%," : "%" + S, !1) : a.appendXtra(O.substr(0, O.indexOf("rgb")) + (P ? "rgba(" : "rgb("), v[0], w[0] - v[0], ",", Math.round, !0).appendXtra("", v[1], w[1] - v[1], ",", Math.round).appendXtra("", v[2], w[2] - v[2], P ? "," : S, Math.round), P && (v = v.length < 4 ? 1 : v[3], a.appendXtra("", v, (w.length < 4 ? 1 : w[3]) - v, S, !1))), _t.lastIndex = 0;else if (b = v.match(g)) {
        if (!(T = w.match(y)) || T.length !== b.length) return a;

        for (_ = 0, p = 0; p < b.length; p++) k = b[p], O = v.indexOf(k, _), a.appendXtra(v.substr(_, O - _), Number(k), at(T[p], k), "", !(!M || "px" !== v.substr(O + k.length, 2)) && Math.round, 0 === p), _ = O + k.length;

        a["xs" + a.l] += v.substr(_);
      } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + w : w;

      if (-1 !== n.indexOf("=") && a.data) {
        for (S = a.xs0 + a.data.s, f = 1; f < a.l; f++) S += a["xs" + f] + a.data["xn" + f];

        a.e = S + a["xs" + f];
      }

      return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a;
    },
        bt = 9;

    for ((a = yt.prototype).l = a.pr = 0; --bt > 0;) a["xn" + bt] = 0, a["xs" + bt] = "";

    a.xs0 = "", a._next = a._prev = a.xfirst = a.data = a.plugin = a.setRatio = a.rxp = null, a.appendXtra = function (t, e, i, n, r, s) {
      var o = this,
          a = o.l;
      return o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new yt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
        s: e + i
      }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o);
    };

    var Tt = function (t, e) {
      e = e || {}, this.p = e.prefix && Z(t) || t, o[t] = o[this.p] = this, this.format = e.formatter || dt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0;
    },
        xt = U._registerComplexSpecialProp = function (t, e, i) {
      "object" != typeof e && (e = {
        parser: i
      });
      var n,
          r = t.split(","),
          s = e.defaultValue;

      for (i = i || [s], n = 0; n < r.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || s, new Tt(r[n], e);
    },
        Pt = U._registerPluginProp = function (t) {
      if (!o[t]) {
        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
        xt(t, {
          parser: function (t, i, n, r, a, l, h) {
            var u = s.com.greensock.plugins[e];
            return u ? (u._cssRegister(), o[n].parse(t, i, n, r, a, l, h)) : (G("Error: " + e + " js file not loaded."), a);
          }
        });
      }
    };

    (a = Tt.prototype).parseComplex = function (t, e, i, n, r, s) {
      var o,
          a,
          l,
          h,
          u,
          c,
          f = this.keyword;

      if (this.multi && (L.test(i) || L.test(e) ? (a = e.replace(L, "|").split("|"), l = i.replace(L, "|").split("|")) : f && (a = [e], l = [i])), l) {
        for (h = l.length > a.length ? l.length : a.length, o = 0; o < h; o++) e = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, f && (u = e.indexOf(f)) !== (c = i.indexOf(f)) && (-1 === c ? a[o] = a[o].split(f).join("") : -1 === u && (a[o] += " " + f));

        e = a.join(", "), i = l.join(", ");
      }

      return wt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s);
    }, a.parse = function (t, e, n, r, s, o, a) {
      return this.parseComplex(t.style, this.format(K(t, this.p, i, !1, this.dflt)), this.format(e), s, o);
    }, r.registerSpecialProp = function (t, e, i) {
      xt(t, {
        parser: function (t, n, r, s, o, a, l) {
          var h = new yt(t, r, 0, 0, o, 2, r, !1, i);
          return h.plugin = a, h.setRatio = e(t, n, s._tween, r), h;
        },
        priority: i
      });
    }, r.useSVGTransformAttr = !0;

    var Ot,
        kt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
        St = Z("transform"),
        At = W + "transform",
        Et = Z("transformOrigin"),
        Rt = null !== Z("perspective"),
        Ct = U.Transform = function () {
      this.perspective = parseFloat(r.defaultTransformPerspective) || 0, this.force3D = !(!1 === r.defaultForce3D || !Rt) && (r.defaultForce3D || "auto");
    },
        Mt = h.e.SVGElement,
        Lt = function (t, e, i) {
      var n,
          r = N.createElementNS("http://www.w3.org/2000/svg", t),
          s = /([a-z])([A-Z])/g;

      for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);

      return e.appendChild(r), r;
    },
        Dt = N.documentElement || {},
        jt = function () {
      var t,
          e,
          i,
          n = _ || /Android/i.test(H) && !h.e.chrome;

      return N.createElementNS && !n && (t = Lt("svg", Dt), i = (e = Lt("rect", t, {
        width: 100,
        height: 50,
        x: 100
      })).getBoundingClientRect().width, e.style[Et] = "50% 50%", e.style[St] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(f && Rt), Dt.removeChild(t)), n;
    }(),
        Ft = function (t, e, i, n, s, o) {
      var a,
          l,
          h,
          u,
          c,
          f,
          p,
          _,
          d,
          m,
          g,
          y,
          v,
          w,
          b = t._gsTransform,
          T = Xt(t, !0);

      b && (v = b.xOrigin, w = b.yOrigin), (!n || (a = n.split(" ")).length < 2) && (0 === (p = t.getBBox()).x && 0 === p.y && p.width + p.height === 0 && (p = {
        x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
        y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
        width: 0,
        height: 0
      }), a = [(-1 !== (e = ot(e).split(" "))[0].indexOf("%") ? parseFloat(e[0]) / 100 * p.width : parseFloat(e[0])) + p.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * p.height : parseFloat(e[1])) + p.y]), i.xOrigin = u = parseFloat(a[0]), i.yOrigin = c = parseFloat(a[1]), n && T !== Nt && (f = T[0], p = T[1], _ = T[2], d = T[3], m = T[4], g = T[5], (y = f * d - p * _) && (l = u * (d / y) + c * (-_ / y) + (_ * g - d * m) / y, h = u * (-p / y) + c * (f / y) - (f * g - p * m) / y, u = i.xOrigin = a[0] = l, c = i.yOrigin = a[1] = h)), b && (o && (i.xOffset = b.xOffset, i.yOffset = b.yOffset, b = i), s || !1 !== s && !1 !== r.defaultSmoothOrigin ? (l = u - v, h = c - w, b.xOffset += l * T[0] + h * T[2] - l, b.yOffset += l * T[1] + h * T[3] - h) : b.xOffset = b.yOffset = 0), o || t.setAttribute("data-svg-origin", a.join(" "));
    },
        zt = function (t) {
      var e,
          i = X("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
          n = this.parentNode,
          r = this.nextSibling,
          s = this.style.cssText;
      if (Dt.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
        e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = zt;
      } catch (t) {} else this._originalGetBBox && (e = this._originalGetBBox());
      return r ? n.insertBefore(this, r) : n.appendChild(this), Dt.removeChild(i), this.style.cssText = s, e;
    },
        It = function (t) {
      return !(!Mt || !t.getCTM || t.parentNode && !t.ownerSVGElement || !function (t) {
        try {
          return t.getBBox();
        } catch (e) {
          return zt.call(t, !0);
        }
      }(t));
    },
        Nt = [1, 0, 0, 1, 0, 0],
        Xt = function (t, e) {
      var i,
          n,
          r,
          s,
          o,
          a,
          l = t._gsTransform || new Ct(),
          h = t.style;
      if (St ? n = K(t, At, null, !0) : t.currentStyle && (n = (n = t.currentStyle.filter.match(C)) && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !St || !(a = !Q(t) || "none" === Q(t).display) && t.parentNode || (a && (s = h.display, h.display = "block"), t.parentNode || (o = 1, Dt.appendChild(t)), i = !(n = K(t, At, null, !0)) || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? h.display = s : a && Yt(h, "display"), o && Dt.removeChild(t)), (l.svg || t.getCTM && It(t)) && (i && -1 !== (h[St] + "").indexOf("matrix") && (n = h[St], i = 0), r = t.getAttribute("transform"), i && r && (n = "matrix(" + (r = t.transform.baseVal.consolidate().matrix).a + "," + r.b + "," + r.c + "," + r.d + "," + r.e + "," + r.f + ")", i = 0)), i) return Nt;

      for (r = (n || "").match(g) || [], bt = r.length; --bt > -1;) s = Number(r[bt]), r[bt] = (o = s - (s |= 0)) ? (1e5 * o + (o < 0 ? -.5 : .5) | 0) / 1e5 + s : s;

      return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r;
    },
        Bt = U.getTransform = function (t, e, i, n) {
      if (t._gsTransform && i && !n) return t._gsTransform;

      var s,
          o,
          a,
          l,
          u,
          c,
          f = i && t._gsTransform || new Ct(),
          p = f.scaleX < 0,
          _ = Rt && (parseFloat(K(t, Et, e, !1, "0 0 0").split(" ")[2]) || f.zOrigin) || 0,
          d = parseFloat(r.defaultTransformPerspective) || 0;

      if (f.svg = !(!t.getCTM || !It(t)), f.svg && (Ft(t, K(t, Et, e, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), Ot = r.useSVGTransformAttr || jt), (s = Xt(t)) !== Nt) {
        if (16 === s.length) {
          var m,
              g,
              y,
              v,
              w,
              b = s[0],
              T = s[1],
              x = s[2],
              P = s[3],
              O = s[4],
              k = s[5],
              S = s[6],
              A = s[7],
              E = s[8],
              R = s[9],
              C = s[10],
              M = s[12],
              L = s[13],
              D = s[14],
              j = s[11],
              z = Math.atan2(S, C);
          f.zOrigin && (M = E * (D = -f.zOrigin) - s[12], L = R * D - s[13], D = C * D + f.zOrigin - s[14]), f.rotationX = z * F, z && (m = O * (v = Math.cos(-z)) + E * (w = Math.sin(-z)), g = k * v + R * w, y = S * v + C * w, E = O * -w + E * v, R = k * -w + R * v, C = S * -w + C * v, j = A * -w + j * v, O = m, k = g, S = y), z = Math.atan2(-x, C), f.rotationY = z * F, z && (g = T * (v = Math.cos(-z)) - R * (w = Math.sin(-z)), y = x * v - C * w, R = T * w + R * v, C = x * w + C * v, j = P * w + j * v, b = m = b * v - E * w, T = g, x = y), z = Math.atan2(T, b), f.rotation = z * F, z && (m = b * (v = Math.cos(z)) + T * (w = Math.sin(z)), g = O * v + k * w, y = E * v + R * w, T = T * v - b * w, k = k * v - O * w, R = R * v - E * w, b = m, O = g, E = y), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY = 180 - f.rotationY), z = Math.atan2(O, k), f.scaleX = (1e5 * Math.sqrt(b * b + T * T + x * x) + .5 | 0) / 1e5, f.scaleY = (1e5 * Math.sqrt(k * k + S * S) + .5 | 0) / 1e5, f.scaleZ = (1e5 * Math.sqrt(E * E + R * R + C * C) + .5 | 0) / 1e5, b /= f.scaleX, O /= f.scaleY, T /= f.scaleX, k /= f.scaleY, Math.abs(z) > 2e-5 ? (f.skewX = z * F, O = 0, "simple" !== f.skewType && (f.scaleY *= 1 / Math.cos(z))) : f.skewX = 0, f.perspective = j ? 1 / (j < 0 ? -j : j) : 0, f.x = M, f.y = L, f.z = D, f.svg && (f.x -= f.xOrigin - (f.xOrigin * b - f.yOrigin * O), f.y -= f.yOrigin - (f.yOrigin * T - f.xOrigin * k));
        } else if (!Rt || n || !s.length || f.x !== s[4] || f.y !== s[5] || !f.rotationX && !f.rotationY) {
          var I = s.length >= 6,
              N = I ? s[0] : 1,
              X = s[1] || 0,
              B = s[2] || 0,
              q = I ? s[3] : 1;
          f.x = s[4] || 0, f.y = s[5] || 0, a = Math.sqrt(N * N + X * X), l = Math.sqrt(q * q + B * B), u = N || X ? Math.atan2(X, N) * F : f.rotation || 0, c = B || q ? Math.atan2(B, q) * F + u : f.skewX || 0, f.scaleX = a, f.scaleY = l, f.rotation = u, f.skewX = c, Rt && (f.rotationX = f.rotationY = f.z = 0, f.perspective = d, f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * N + f.yOrigin * B), f.y -= f.yOrigin - (f.xOrigin * X + f.yOrigin * q));
        }

        for (o in Math.abs(f.skewX) > 90 && Math.abs(f.skewX) < 270 && (p ? (f.scaleX *= -1, f.skewX += f.rotation <= 0 ? 180 : -180, f.rotation += f.rotation <= 0 ? 180 : -180) : (f.scaleY *= -1, f.skewX += f.skewX <= 0 ? 180 : -180)), f.zOrigin = _, f) f[o] < 2e-5 && f[o] > -2e-5 && (f[o] = 0);
      }

      return i && (t._gsTransform = f, f.svg && (Ot && t.style[St] ? h.f.delayedCall(.001, function () {
        Yt(t.style, St);
      }) : !Ot && t.getAttribute("transform") && h.f.delayedCall(.001, function () {
        t.removeAttribute("transform");
      }))), f;
    },
        qt = function (t) {
      var e,
          i,
          n = this.data,
          r = -n.rotation * j,
          s = r + n.skewX * j,
          o = (Math.cos(r) * n.scaleX * 1e5 | 0) / 1e5,
          a = (Math.sin(r) * n.scaleX * 1e5 | 0) / 1e5,
          l = (Math.sin(s) * -n.scaleY * 1e5 | 0) / 1e5,
          h = (Math.cos(s) * n.scaleY * 1e5 | 0) / 1e5,
          u = this.t.style,
          c = this.t.currentStyle;

      if (c) {
        i = a, a = -l, l = -i, e = c.filter, u.filter = "";
        var f,
            p,
            d = this.t.offsetWidth,
            m = this.t.offsetHeight,
            g = "absolute" !== c.position,
            y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + a + ", M21=" + l + ", M22=" + h,
            v = n.x + d * n.xPercent / 100,
            w = n.y + m * n.yPercent / 100;

        if (null != n.ox && (v += (f = (n.oxp ? d * n.ox * .01 : n.ox) - d / 2) - (f * o + (p = (n.oyp ? m * n.oy * .01 : n.oy) - m / 2) * a), w += p - (f * l + p * h)), y += g ? ", Dx=" + ((f = d / 2) - (f * o + (p = m / 2) * a) + v) + ", Dy=" + (p - (f * l + p * h) + w) + ")" : ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? u.filter = e.replace(M, y) : u.filter = y + " " + e, 0 !== t && 1 !== t || 1 === o && 0 === a && 0 === l && 1 === h && (g && -1 === y.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter")), !g) {
          var x,
              P,
              O,
              k = _ < 8 ? 1 : -1;

          for (f = n.ieOffsetX || 0, p = n.ieOffsetY || 0, n.ieOffsetX = Math.round((d - ((o < 0 ? -o : o) * d + (a < 0 ? -a : a) * m)) / 2 + v), n.ieOffsetY = Math.round((m - ((h < 0 ? -h : h) * m + (l < 0 ? -l : l) * d)) / 2 + w), bt = 0; bt < 4; bt++) O = (i = -1 !== (x = c[P = rt[bt]]).indexOf("px") ? parseFloat(x) : J(this.t, P, parseFloat(x), x.replace(b, "")) || 0) !== n[P] ? bt < 2 ? -n.ieOffsetX : -n.ieOffsetY : bt < 2 ? f - n.ieOffsetX : p - n.ieOffsetY, u[P] = (n[P] = Math.round(i - O * (0 === bt || 2 === bt ? 1 : k))) + "px";
        }
      }
    },
        Ut = U.set3DTransformRatio = U.setTransformRatio = function (t) {
      var e,
          i,
          n,
          r,
          s,
          o,
          a,
          l,
          h,
          u,
          c,
          p,
          _,
          d,
          m,
          g,
          y,
          v,
          w,
          b,
          T,
          x = this.data,
          P = this.t.style,
          O = x.rotation,
          k = x.rotationX,
          S = x.rotationY,
          A = x.scaleX,
          E = x.scaleY,
          R = x.scaleZ,
          C = x.x,
          M = x.y,
          L = x.z,
          D = x.svg,
          F = x.perspective,
          z = x.force3D,
          I = x.skewY,
          N = x.skewX;

      if (I && (N += I, O += I), !((1 !== t && 0 !== t || "auto" !== z || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && z || L || F || S || k || 1 !== R) || Ot && D || !Rt) O || N || D ? (O *= j, b = N * j, T = 1e5, i = Math.cos(O) * A, s = Math.sin(O) * A, n = Math.sin(O - b) * -E, o = Math.cos(O - b) * E, b && "simple" === x.skewType && (e = Math.tan(b - I * j), n *= e = Math.sqrt(1 + e * e), o *= e, I && (e = Math.tan(I * j), i *= e = Math.sqrt(1 + e * e), s *= e)), D && (C += x.xOrigin - (x.xOrigin * i + x.yOrigin * n) + x.xOffset, M += x.yOrigin - (x.xOrigin * s + x.yOrigin * o) + x.yOffset, Ot && (x.xPercent || x.yPercent) && (m = this.t.getBBox(), C += .01 * x.xPercent * m.width, M += .01 * x.yPercent * m.height), C < (m = 1e-6) && C > -m && (C = 0), M < m && M > -m && (M = 0)), w = (i * T | 0) / T + "," + (s * T | 0) / T + "," + (n * T | 0) / T + "," + (o * T | 0) / T + "," + C + "," + M + ")", D && Ot ? this.t.setAttribute("transform", "matrix(" + w) : P[St] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix(" : "matrix(") + w) : P[St] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix(" : "matrix(") + A + ",0,0," + E + "," + C + "," + M + ")";else {
        if (f && (A < (m = 1e-4) && A > -m && (A = R = 2e-5), E < m && E > -m && (E = R = 2e-5), !F || x.z || x.rotationX || x.rotationY || (F = 0)), O || N) O *= j, g = i = Math.cos(O), y = s = Math.sin(O), N && (O -= N * j, g = Math.cos(O), y = Math.sin(O), "simple" === x.skewType && (e = Math.tan((N - I) * j), g *= e = Math.sqrt(1 + e * e), y *= e, x.skewY && (e = Math.tan(I * j), i *= e = Math.sqrt(1 + e * e), s *= e))), n = -y, o = g;else {
          if (!(S || k || 1 !== R || F || D)) return void (P[St] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) translate3d(" : "translate3d(") + C + "px," + M + "px," + L + "px)" + (1 !== A || 1 !== E ? " scale(" + A + "," + E + ")" : ""));
          i = o = 1, n = s = 0;
        }
        u = 1, r = a = l = h = c = p = 0, _ = F ? -1 / F : 0, d = x.zOrigin, m = 1e-6, ",", "0", (O = S * j) && (g = Math.cos(O), l = -(y = Math.sin(O)), c = _ * -y, r = i * y, a = s * y, u = g, _ *= g, i *= g, s *= g), (O = k * j) && (e = n * (g = Math.cos(O)) + r * (y = Math.sin(O)), v = o * g + a * y, h = u * y, p = _ * y, r = n * -y + r * g, a = o * -y + a * g, u *= g, _ *= g, n = e, o = v), 1 !== R && (r *= R, a *= R, u *= R, _ *= R), 1 !== E && (n *= E, o *= E, h *= E, p *= E), 1 !== A && (i *= A, s *= A, l *= A, c *= A), (d || D) && (d && (C += r * -d, M += a * -d, L += u * -d + d), D && (C += x.xOrigin - (x.xOrigin * i + x.yOrigin * n) + x.xOffset, M += x.yOrigin - (x.xOrigin * s + x.yOrigin * o) + x.yOffset), C < m && C > -m && (C = "0"), M < m && M > -m && (M = "0"), L < m && L > -m && (L = 0)), w = x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix3d(" : "matrix3d(", w += (i < m && i > -m ? "0" : i) + "," + (s < m && s > -m ? "0" : s) + "," + (l < m && l > -m ? "0" : l), w += "," + (c < m && c > -m ? "0" : c) + "," + (n < m && n > -m ? "0" : n) + "," + (o < m && o > -m ? "0" : o), k || S || 1 !== R ? (w += "," + (h < m && h > -m ? "0" : h) + "," + (p < m && p > -m ? "0" : p) + "," + (r < m && r > -m ? "0" : r), w += "," + (a < m && a > -m ? "0" : a) + "," + (u < m && u > -m ? "0" : u) + "," + (_ < m && _ > -m ? "0" : _) + ",") : w += ",0,0,0,0,1,0,", w += C + "," + M + "," + L + "," + (F ? 1 + -L / F : 1) + ")", P[St] = w;
      }
    };

    (a = Ct.prototype).x = a.y = a.z = a.skewX = a.skewY = a.rotation = a.rotationX = a.rotationY = a.zOrigin = a.xPercent = a.yPercent = a.xOffset = a.yOffset = 0, a.scaleX = a.scaleY = a.scaleZ = 1, xt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
      parser: function (t, e, n, s, o, a, l) {
        if (s._lastParsedTransform === l) return o;
        s._lastParsedTransform = l;
        var h,
            u = l.scale && "function" == typeof l.scale ? l.scale : 0;
        "function" == typeof l[n] && (h = l[n], l[n] = e), u && (l.scale = u(m, t));

        var c,
            f,
            p,
            _,
            g,
            y,
            v,
            w,
            b,
            T = t._gsTransform,
            x = t.style,
            P = kt.length,
            O = l,
            k = {},
            S = Bt(t, i, !0, O.parseTransform),
            A = O.transform && ("function" == typeof O.transform ? O.transform(m, d) : O.transform);

        if (S.skewType = O.skewType || S.skewType || r.defaultSkewType, s._transform = S, "rotationZ" in O && (O.rotation = O.rotationZ), A && "string" == typeof A && St) (f = B.style)[St] = A, f.display = "block", f.position = "absolute", -1 !== A.indexOf("%") && (f.width = K(t, "width"), f.height = K(t, "height")), N.body.appendChild(B), c = Bt(B, null, !1), "simple" === S.skewType && (c.scaleY *= Math.cos(c.skewX * j)), S.svg && (y = S.xOrigin, v = S.yOrigin, c.x -= S.xOffset, c.y -= S.yOffset, (O.transformOrigin || O.svgOrigin) && (A = {}, Ft(t, ot(O.transformOrigin), A, O.svgOrigin, O.smoothOrigin, !0), y = A.xOrigin, v = A.yOrigin, c.x -= A.xOffset - S.xOffset, c.y -= A.yOffset - S.yOffset), (y || v) && (w = Xt(B, !0), c.x -= y - (y * w[0] + v * w[2]), c.y -= v - (y * w[1] + v * w[3]))), N.body.removeChild(B), c.perspective || (c.perspective = S.perspective), null != O.xPercent && (c.xPercent = lt(O.xPercent, S.xPercent)), null != O.yPercent && (c.yPercent = lt(O.yPercent, S.yPercent));else if ("object" == typeof O) {
          if (c = {
            scaleX: lt(null != O.scaleX ? O.scaleX : O.scale, S.scaleX),
            scaleY: lt(null != O.scaleY ? O.scaleY : O.scale, S.scaleY),
            scaleZ: lt(O.scaleZ, S.scaleZ),
            x: lt(O.x, S.x),
            y: lt(O.y, S.y),
            z: lt(O.z, S.z),
            xPercent: lt(O.xPercent, S.xPercent),
            yPercent: lt(O.yPercent, S.yPercent),
            perspective: lt(O.transformPerspective, S.perspective)
          }, null != (g = O.directionalRotation)) if ("object" == typeof g) for (f in g) O[f] = g[f];else O.rotation = g;
          "string" == typeof O.x && -1 !== O.x.indexOf("%") && (c.x = 0, c.xPercent = lt(O.x, S.xPercent)), "string" == typeof O.y && -1 !== O.y.indexOf("%") && (c.y = 0, c.yPercent = lt(O.y, S.yPercent)), c.rotation = ht("rotation" in O ? O.rotation : "shortRotation" in O ? O.shortRotation + "_short" : S.rotation, S.rotation, "rotation", k), Rt && (c.rotationX = ht("rotationX" in O ? O.rotationX : "shortRotationX" in O ? O.shortRotationX + "_short" : S.rotationX || 0, S.rotationX, "rotationX", k), c.rotationY = ht("rotationY" in O ? O.rotationY : "shortRotationY" in O ? O.shortRotationY + "_short" : S.rotationY || 0, S.rotationY, "rotationY", k)), c.skewX = ht(O.skewX, S.skewX), c.skewY = ht(O.skewY, S.skewY);
        }

        for (Rt && null != O.force3D && (S.force3D = O.force3D, _ = !0), (p = S.force3D || S.z || S.rotationX || S.rotationY || c.z || c.rotationX || c.rotationY || c.perspective) || null == O.scale || (c.scaleZ = 1); --P > -1;) ((A = c[b = kt[P]] - S[b]) > 1e-6 || A < -1e-6 || null != O[b] || null != z[b]) && (_ = !0, o = new yt(S, b, S[b], A, o), b in k && (o.e = k[b]), o.xs0 = 0, o.plugin = a, s._overwriteProps.push(o.n));

        return A = O.transformOrigin, S.svg && (A || O.svgOrigin) && (y = S.xOffset, v = S.yOffset, Ft(t, ot(A), c, O.svgOrigin, O.smoothOrigin), o = vt(S, "xOrigin", (T ? S : c).xOrigin, c.xOrigin, o, "transformOrigin"), o = vt(S, "yOrigin", (T ? S : c).yOrigin, c.yOrigin, o, "transformOrigin"), y === S.xOffset && v === S.yOffset || (o = vt(S, "xOffset", T ? y : S.xOffset, S.xOffset, o, "transformOrigin"), o = vt(S, "yOffset", T ? v : S.yOffset, S.yOffset, o, "transformOrigin")), A = "0px 0px"), (A || Rt && p && S.zOrigin) && (St ? (_ = !0, b = Et, A = (A || K(t, b, i, !1, "50% 50%")) + "", (o = new yt(x, b, 0, 0, o, -1, "transformOrigin")).b = x[b], o.plugin = a, Rt ? (f = S.zOrigin, A = A.split(" "), S.zOrigin = (A.length > 2 && (0 === f || "0px" !== A[2]) ? parseFloat(A[2]) : f) || 0, o.xs0 = o.e = A[0] + " " + (A[1] || "50%") + " 0px", (o = new yt(S, "zOrigin", 0, 0, o, -1, o.n)).b = f, o.xs0 = o.e = S.zOrigin) : o.xs0 = o.e = A) : ot(A + "", S)), _ && (s._transformType = S.svg && Ot || !p && 3 !== this._transformType ? 2 : 3), h && (l[n] = h), u && (l.scale = u), o;
      },
      prefix: !0
    }), xt("boxShadow", {
      defaultValue: "0px 0px 0px 0px #999",
      prefix: !0,
      color: !0,
      multi: !0,
      keyword: "inset"
    }), xt("borderRadius", {
      defaultValue: "0px",
      parser: function (t, n, r, s, o, a) {
        n = this.format(n);

        var l,
            h,
            u,
            c,
            f,
            p,
            _,
            d,
            m,
            g,
            y,
            v,
            w,
            b,
            T,
            x,
            P = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
            O = t.style;

        for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), l = n.split(" "), h = 0; h < P.length; h++) this.p.indexOf("border") && (P[h] = Z(P[h])), -1 !== (f = c = K(t, P[h], i, !1, "0px")).indexOf(" ") && (f = (c = f.split(" "))[0], c = c[1]), p = u = l[h], _ = parseFloat(f), v = f.substr((_ + "").length), (w = "=" === p.charAt(1)) ? (d = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), d *= parseFloat(p), y = p.substr((d + "").length - (d < 0 ? 1 : 0)) || "") : (d = parseFloat(p), y = p.substr((d + "").length)), "" === y && (y = e[r] || v), y !== v && (b = J(t, "borderLeft", _, v), T = J(t, "borderTop", _, v), "%" === y ? (f = b / m * 100 + "%", c = T / g * 100 + "%") : "em" === y ? (f = b / (x = J(t, "borderLeft", 1, "em")) + "em", c = T / x + "em") : (f = b + "px", c = T + "px"), w && (p = parseFloat(f) + d + y, u = parseFloat(c) + d + y)), o = wt(O, P[h], f + " " + c, p + " " + u, !1, "0px", o);

        return o;
      },
      prefix: !0,
      formatter: dt("0px 0px 0px 0px", !1, !0)
    }), xt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
      defaultValue: "0px",
      parser: function (t, e, n, r, s, o) {
        return wt(t.style, n, this.format(K(t, n, i, !1, "0px 0px")), this.format(e), !1, "0px", s);
      },
      prefix: !0,
      formatter: dt("0px 0px", !1, !0)
    }), xt("backgroundPosition", {
      defaultValue: "0 0",
      parser: function (t, e, n, r, s, o) {
        var a,
            l,
            h,
            u,
            c,
            f,
            p = "background-position",
            d = i || Q(t, null),
            m = this.format((d ? _ ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
            g = this.format(e);

        if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && (f = K(t, "backgroundImage").replace(A, "")) && "none" !== f) {
          for (a = m.split(" "), l = g.split(" "), q.setAttribute("src", f), h = 2; --h > -1;) (u = -1 !== (m = a[h]).indexOf("%")) !== (-1 !== l[h].indexOf("%")) && (c = 0 === h ? t.offsetWidth - q.width : t.offsetHeight - q.height, a[h] = u ? parseFloat(m) / 100 * c + "px" : parseFloat(m) / c * 100 + "%");

          m = a.join(" ");
        }

        return this.parseComplex(t.style, m, g, s, o);
      },
      formatter: ot
    }), xt("backgroundSize", {
      defaultValue: "0 0",
      formatter: function (t) {
        return "co" === (t += "").substr(0, 2) ? t : ot(-1 === t.indexOf(" ") ? t + " " + t : t);
      }
    }), xt("perspective", {
      defaultValue: "0px",
      prefix: !0
    }), xt("perspectiveOrigin", {
      defaultValue: "50% 50%",
      prefix: !0
    }), xt("transformStyle", {
      prefix: !0
    }), xt("backfaceVisibility", {
      prefix: !0
    }), xt("userSelect", {
      prefix: !0
    }), xt("margin", {
      parser: mt("marginTop,marginRight,marginBottom,marginLeft")
    }), xt("padding", {
      parser: mt("paddingTop,paddingRight,paddingBottom,paddingLeft")
    }), xt("clip", {
      defaultValue: "rect(0px,0px,0px,0px)",
      parser: function (t, e, n, r, s, o) {
        var a, l, h;
        return _ < 9 ? (l = t.currentStyle, h = _ < 8 ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (a = this.format(K(t, this.p, i, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, s, o);
      }
    }), xt("textShadow", {
      defaultValue: "0px 0px 0px #999",
      color: !0,
      multi: !0
    }), xt("autoRound,strictUnits", {
      parser: function (t, e, i, n, r) {
        return r;
      }
    }), xt("border", {
      defaultValue: "0px solid #000",
      parser: function (t, e, n, r, s, o) {
        var a = K(t, "borderTopWidth", i, !1, "0px"),
            l = this.format(e).split(" "),
            h = l[0].replace(b, "");
        return "px" !== h && (a = parseFloat(a) / J(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(a + " " + K(t, "borderTopStyle", i, !1, "solid") + " " + K(t, "borderTopColor", i, !1, "#000")), l.join(" "), s, o);
      },
      color: !0,
      formatter: function (t) {
        var e = t.split(" ");
        return e[0] + " " + (e[1] || "solid") + " " + (t.match(_t) || ["#000"])[0];
      }
    }), xt("borderWidth", {
      parser: mt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
    }), xt("float,cssFloat,styleFloat", {
      parser: function (t, e, i, n, r, s) {
        var o = t.style,
            a = "cssFloat" in o ? "cssFloat" : "styleFloat";
        return new yt(o, a, 0, 0, r, -1, i, !1, 0, o[a], e);
      }
    });

    var Ht = function (t) {
      var e,
          i = this.t,
          n = i.filter || K(this.data, "filter") || "",
          r = this.s + this.c * t | 0;
      100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !K(this.data, "filter")) : (i.filter = n.replace(P, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(T, "opacity=" + r));
    };

    xt("opacity,alpha,autoAlpha", {
      defaultValue: "1",
      parser: function (t, e, n, r, s, o) {
        var a = parseFloat(K(t, "opacity", i, !1, "1")),
            l = t.style,
            h = "autoAlpha" === n;
        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), h && 1 === a && "hidden" === K(t, "visibility", i) && 0 !== e && (a = 0), Y ? s = new yt(l, "opacity", a, e - a, s) : ((s = new yt(l, "opacity", 100 * a, 100 * (e - a), s)).xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = o, s.setRatio = Ht), h && ((s = new yt(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit")).xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(n)), s;
      }
    });

    var Yt = function (t, e) {
      e && (t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e));
    },
        Vt = function (t) {
      if (this.t._gsClassPT = this, 1 === t || 0 === t) {
        this.t.setAttribute("class", 0 === t ? this.b : this.e);

        for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Yt(i, e.p), e = e._next;

        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
      } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e);
    };

    xt("className", {
      parser: function (e, n, r, s, o, a, l) {
        var h,
            u,
            c,
            f,
            p,
            _ = e.getAttribute("class") || "",
            d = e.style.cssText;

        if ((o = s._classNamePT = new yt(e, r, 0, 0, o, 2)).setRatio = Vt, o.pr = -11, t = !0, o.b = _, u = et(e, i), c = e._gsClassPT) {
          for (f = {}, p = c.data; p;) f[p.p] = 1, p = p._next;

          c.setRatio(1);
        }

        return e._gsClassPT = o, o.e = "=" !== n.charAt(1) ? n : _.replace(new RegExp("(?:\\s|^)" + n.substr(2) + "(?![\\w-])"), "") + ("+" === n.charAt(0) ? " " + n.substr(2) : ""), e.setAttribute("class", o.e), h = it(e, u, et(e), l, f), e.setAttribute("class", _), o.data = h.firstMPT, e.style.cssText = d, o = o.xfirst = s.parse(e, h.difs, o, a);
      }
    });

    var Gt = function (t) {
      if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
        var e,
            i,
            n,
            r,
            s,
            a = this.t.style,
            l = o.transform.parse;
        if ("all" === this.e) a.cssText = "", r = !0;else for (n = (e = this.e.split(" ").join("").split(",")).length; --n > -1;) i = e[n], o[i] && (o[i].parse === l ? r = !0 : i = "transformOrigin" === i ? Et : o[i].p), Yt(a, i);
        r && (Yt(a, St), (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform));
      }
    };

    for (xt("clearProps", {
      parser: function (e, i, n, r, s) {
        return (s = new yt(e, n, 0, 0, s, 2)).setRatio = Gt, s.e = i, s.pr = -10, s.data = r._tween, t = !0, s;
      }
    }), a = "bezier,throwProps,physicsProps,physics2D".split(","), bt = a.length; bt--;) Pt(a[bt]);

    (a = r.prototype)._firstPT = a._lastParsedTransform = a._transform = null, a._onInitTween = function (s, a, h, f) {
      if (!s.nodeType) return !1;
      this._target = d = s, this._tween = h, this._vars = a, m = f, l = a.autoRound, t = !1, e = a.suffixMap || r.suffixMap, i = Q(s, ""), n = this._overwriteProps;

      var _,
          g,
          y,
          v,
          w,
          b,
          T,
          P,
          O,
          k = s.style;

      if (u && "" === k.zIndex && ("auto" !== (_ = K(s, "zIndex", i)) && "" !== _ || this._addLazySet(k, "zIndex", 0)), "string" == typeof a && (v = k.cssText, _ = et(s, i), k.cssText = v + ";" + a, _ = it(s, _, et(s)).difs, !Y && x.test(a) && (_.opacity = parseFloat(RegExp.$1)), a = _, k.cssText = v), a.className ? this._firstPT = g = o.className.parse(s, a.className, "className", this, null, null, a) : this._firstPT = g = this.parse(s, a, null), this._transformType) {
        for (O = 3 === this._transformType, St ? c && (u = !0, "" === k.zIndex && ("auto" !== (T = K(s, "zIndex", i)) && "" !== T || this._addLazySet(k, "zIndex", 0)), p && this._addLazySet(k, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (O ? "visible" : "hidden"))) : k.zoom = 1, y = g; y && y._next;) y = y._next;

        P = new yt(s, "transform", 0, 0, null, 2), this._linkCSSP(P, null, y), P.setRatio = St ? Ut : qt, P.data = this._transform || Bt(s, i, !0), P.tween = h, P.pr = -1, n.pop();
      }

      if (t) {
        for (; g;) {
          for (b = g._next, y = v; y && y.pr > g.pr;) y = y._next;

          (g._prev = y ? y._prev : w) ? g._prev._next = g : v = g, (g._next = y) ? y._prev = g : w = g, g = b;
        }

        this._firstPT = v;
      }

      return !0;
    }, a.parse = function (t, n, r, s) {
      var a,
          h,
          u,
          c,
          f,
          p,
          _,
          g,
          y,
          v,
          w = t.style;

      for (a in n) {
        if ("function" == typeof (p = n[a]) && (p = p(m, d)), h = o[a]) r = h.parse(t, p, a, this, r, s, n);else {
          if ("--" === a.substr(0, 2)) {
            this._tween._propLookup[a] = this._addTween.call(this._tween, t.style, "setProperty", Q(t).getPropertyValue(a) + "", p + "", a, !1, a);
            continue;
          }

          f = K(t, a, i) + "", y = "string" == typeof p, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || y && O.test(p) ? (y || (p = ((p = ft(p)).length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), r = wt(w, a, f, p, !0, "transparent", r, 0, s)) : y && D.test(p) ? r = wt(w, a, f, p, !0, null, r, 0, s) : (_ = (u = parseFloat(f)) || 0 === u ? f.substr((u + "").length) : "", "" !== f && "auto" !== f || ("width" === a || "height" === a ? (u = st(t, a, i), _ = "px") : "left" === a || "top" === a ? (u = tt(t, a, i), _ = "px") : (u = "opacity" !== a ? 0 : 1, _ = "")), (v = y && "=" === p.charAt(1)) ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), g = p.replace(b, "")) : (c = parseFloat(p), g = y ? p.replace(b, "") : ""), "" === g && (g = a in e ? e[a] : _), p = c || 0 === c ? (v ? c + u : c) + g : n[a], _ !== g && ("" === g && "lineHeight" !== a || (c || 0 === c) && u && (u = J(t, a, u, _), "%" === g ? (u /= J(t, a, 100, "%") / 100, !0 !== n.strictUnits && (f = u + "%")) : "em" === g || "rem" === g || "vw" === g || "vh" === g ? u /= J(t, a, 1, g) : "px" !== g && (c = J(t, a, c, g), g = "px"), v && (c || 0 === c) && (p = c + u + g))), v && (c += u), !u && 0 !== u || !c && 0 !== c ? void 0 !== w[a] && (p || p + "" != "NaN" && null != p) ? (r = new yt(w, a, c || u || 0, 0, r, -1, a, !1, 0, f, p)).xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p : f : G("invalid " + a + " tween value: " + n[a]) : (r = new yt(w, a, u, c - u, r, 0, a, !1 !== l && ("px" === g || "zIndex" === a), 0, f, p)).xs0 = g);
        }
        s && r && !r.plugin && (r.plugin = s);
      }

      return r;
    }, a.setRatio = function (t) {
      var e,
          i,
          n,
          r = this._firstPT;
      if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) {
        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime) for (; r;) {
          if (e = r.c * t + r.s, r.r ? e = r.r(e) : e < 1e-6 && e > -1e-6 && (e = 0), r.type) {
            if (1 === r.type) {
              if (2 === (n = r.l)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;else {
                for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];

                r.t[r.p] = i;
              }
            } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
          } else r.t[r.p] = e + r.xs0;
          r = r._next;
        } else for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
      } else for (; r;) {
        if (2 !== r.type) {
          if (r.r && -1 !== r.type) {
            if (e = r.r(r.s + r.c), r.type) {
              if (1 === r.type) {
                for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];

                r.t[r.p] = i;
              }
            } else r.t[r.p] = e + r.xs0;
          } else r.t[r.p] = r.e;
        } else r.setRatio(t);
        r = r._next;
      }
    }, a._enableTransforms = function (t) {
      this._transform = this._transform || Bt(this._target, i, !0), this._transformType = this._transform.svg && Ot || !t && 3 !== this._transformType ? 2 : 3;
    };

    var Wt = function (t) {
      this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0);
    };

    a._addLazySet = function (t, e, i) {
      var n = this._firstPT = new yt(t, e, 0, 0, this._firstPT, 2);
      n.e = i, n.setRatio = Wt, n.data = this;
    }, a._linkCSSP = function (t, e, i, n) {
      return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t;
    }, a._mod = function (t) {
      for (var e = this._firstPT; e;) "function" == typeof t[e.p] && (e.r = t[e.p]), e = e._next;
    }, a._kill = function (t) {
      var e,
          i,
          n,
          r = t;

      if (t.autoAlpha || t.alpha) {
        for (i in r = {}, t) r[i] = t[i];

        r.opacity = 1, r.autoAlpha && (r.visibility = 1);
      }

      for (t.className && (e = this._classNamePT) && ((n = e.xfirst) && n._prev ? this._linkCSSP(n._prev, e._next, n._prev._prev) : n === this._firstPT && (this._firstPT = e._next), e._next && this._linkCSSP(e._next, e._next._next, n._prev), this._classNamePT = null), e = this._firstPT; e;) e.plugin && e.plugin !== i && e.plugin._kill && (e.plugin._kill(t), i = e.plugin), e = e._next;

      return h.d.prototype._kill.call(this, r);
    };

    var $t = function (t, e, i) {
      var n, r, s, o;
      if (t.slice) for (r = t.length; --r > -1;) $t(t[r], e, i);else for (r = (n = t.childNodes).length; --r > -1;) o = (s = n[r]).type, s.style && (e.push(et(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || $t(s, e, i);
    };

    return r.cascadeTo = function (t, e, i) {
      var n,
          r,
          s,
          o,
          a = h.f.to(t, e, i),
          l = [a],
          u = [],
          c = [],
          f = [],
          p = h.f._internals.reservedProps;

      for (t = a._targets || a.target, $t(t, u, f), a.render(e, !0, !0), $t(t, c), a.render(0, !0, !0), a._enabled(!0), n = f.length; --n > -1;) if ((r = it(f[n], u[n], c[n])).firstMPT) {
        for (s in r = r.difs, i) p[s] && (r[s] = i[s]);

        for (s in o = {}, r) o[s] = u[n][s];

        l.push(h.f.fromTo(f[n], e, o, r));
      }

      return l;
    }, h.d.activate([r]), r;
  }, !0);

  var c = h.g.CSSPlugin,
      f = h.e._gsDefine.plugin({
    propName: "attr",
    API: 2,
    version: "0.6.1",
    init: function (t, e, i, n) {
      var r, s;
      if ("function" != typeof t.setAttribute) return !1;

      for (r in e) "function" == typeof (s = e[r]) && (s = s(n, t)), this._addTween(t, "setAttribute", t.getAttribute(r) + "", s + "", r, !1, r), this._overwriteProps.push(r);

      return !0;
    }
  }),
      p = h.e._gsDefine.plugin({
    propName: "roundProps",
    version: "1.7.0",
    priority: -1,
    API: 2,
    init: function (t, e, i) {
      return this._tween = i, !0;
    }
  }),
      _ = function (t) {
    var e = t < 1 ? Math.pow(10, (t + "").length - 2) : 1;
    return function (i) {
      return (Math.round(i / t) * t * e | 0) / e;
    };
  },
      d = function (t, e) {
    for (; t;) t.f || t.blob || (t.m = e || Math.round), t = t._next;
  },
      m = p.prototype;
  /*!
   * VERSION: 0.6.1
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   */


  m._onInitAllProps = function () {
    var t,
        e,
        i,
        n,
        r = this._tween,
        s = r.vars.roundProps,
        o = {},
        a = r._propLookup.roundProps;
    if ("object" != typeof s || s.push) for ("string" == typeof s && (s = s.split(",")), i = s.length; --i > -1;) o[s[i]] = Math.round;else for (n in s) o[n] = _(s[n]);

    for (n in o) for (t = r._firstPT; t;) e = t._next, t.pg ? t.t._mod(o) : t.n === n && (2 === t.f && t.t ? d(t.t._firstPT, o[n]) : (this._add(t.t, n, t.s, t.c, o[n]), e && (e._prev = t._prev), t._prev ? t._prev._next = e : r._firstPT === t && (r._firstPT = e), t._next = t._prev = null, r._propLookup[n] = a)), t = e;

    return !1;
  }, m._add = function (t, e, i, n, r) {
    this._addTween(t, e, i, i + n, e, r || Math.round), this._overwriteProps.push(e);
  };
  /*!
   * VERSION: 0.3.1
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   **/

  var g = h.e._gsDefine.plugin({
    propName: "directionalRotation",
    version: "0.3.1",
    API: 2,
    init: function (t, e, i, n) {
      "object" != typeof e && (e = {
        rotation: e
      }), this.finals = {};
      var r,
          s,
          o,
          a,
          l,
          h,
          u = !0 === e.useRadians ? 2 * Math.PI : 360;

      for (r in e) "useRadians" !== r && ("function" == typeof (a = e[r]) && (a = a(n, t)), s = (h = (a + "").split("_"))[0], o = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), l = (a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0) - o, h.length && (-1 !== (s = h.join("_")).indexOf("short") && (l %= u) !== l % (u / 2) && (l = l < 0 ? l + u : l - u), -1 !== s.indexOf("_cw") && l < 0 ? l = (l + 9999999999 * u) % u - (l / u | 0) * u : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * u) % u - (l / u | 0) * u)), (l > 1e-6 || l < -1e-6) && (this._addTween(t, r, o, o + l, r), this._overwriteProps.push(r)));

      return !0;
    },
    set: function (t) {
      var e;
      if (1 !== t) this._super.setRatio.call(this, t);else for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next;
    }
  });

  g._autoCSS = !0,
  /*!
   * VERSION: 2.0.2
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   */
  h.e._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
    var t = function (t) {
      h.c.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
      var e,
          i,
          n = this.vars;

      for (i in n) e = n[i], r(e) && -1 !== e.join("").indexOf("{self}") && (n[i] = this._swapSelfInParams(e));

      r(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger);
    },
        e = h.f._internals,
        i = t._internals = {},
        n = e.isSelector,
        r = e.isArray,
        s = e.lazyTweens,
        o = e.lazyRender,
        a = h.e._gsDefine.globals,
        l = function (t) {
      var e,
          i = {};

      for (e in t) i[e] = t[e];

      return i;
    },
        u = function (t, e, i) {
      var n,
          r,
          s = t.cycle;

      for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];

      delete t.cycle;
    },
        c = i.pauseCallback = function () {},
        f = function (t) {
      var e,
          i = [],
          n = t.length;

      for (e = 0; e !== n; i.push(t[e++]));

      return i;
    },
        p = t.prototype = new h.c();

    return t.version = "2.0.2", p.constructor = t, p.kill()._gc = p._forcingPlayhead = p._hasPause = !1, p.to = function (t, e, i, n) {
      var r = i.repeat && a.TweenMax || h.f;
      return e ? this.add(new r(t, e, i), n) : this.set(t, i, n);
    }, p.from = function (t, e, i, n) {
      return this.add((i.repeat && a.TweenMax || h.f).from(t, e, i), n);
    }, p.fromTo = function (t, e, i, n, r) {
      var s = n.repeat && a.TweenMax || h.f;
      return e ? this.add(s.fromTo(t, e, i, n), r) : this.set(t, n, r);
    }, p.staggerTo = function (e, i, r, s, o, a, c, p) {
      var _,
          d,
          m = new t({
        onComplete: a,
        onCompleteParams: c,
        callbackScope: p,
        smoothChildTiming: this.smoothChildTiming
      }),
          g = r.cycle;

      for ("string" == typeof e && (e = h.f.selector(e) || e), n(e = e || []) && (e = f(e)), (s = s || 0) < 0 && ((e = f(e)).reverse(), s *= -1), d = 0; d < e.length; d++) (_ = l(r)).startAt && (_.startAt = l(_.startAt), _.startAt.cycle && u(_.startAt, e, d)), g && (u(_, e, d), null != _.duration && (i = _.duration, delete _.duration)), m.to(e[d], i, _, d * s);

      return this.add(m, o);
    }, p.staggerFrom = function (t, e, i, n, r, s, o, a) {
      return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a);
    }, p.staggerFromTo = function (t, e, i, n, r, s, o, a, l) {
      return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l);
    }, p.call = function (t, e, i, n) {
      return this.add(h.f.delayedCall(0, t, e, i), n);
    }, p.set = function (t, e, i) {
      return i = this._parseTimeOrLabel(i, 0, !0), null == e.immediateRender && (e.immediateRender = i === this._time && !this._paused), this.add(new h.f(t, 0, e), i);
    }, t.exportRoot = function (e, i) {
      null == (e = e || {}).smoothChildTiming && (e.smoothChildTiming = !0);
      var n,
          r,
          s,
          o,
          a = new t(e),
          l = a._timeline;

      for (null == i && (i = !0), l._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = l._time, s = l._first; s;) o = s._next, i && s instanceof h.f && s.target === s.vars.onComplete || ((r = s._startTime - s._delay) < 0 && (n = 1), a.add(s, r)), s = o;

      return l.add(a, 0), n && a.totalDuration(), a;
    }, p.add = function (e, i, n, s) {
      var o, a, l, u, c, f;

      if ("number" != typeof i && (i = this._parseTimeOrLabel(i, 0, !0, e)), !(e instanceof h.a)) {
        if (e instanceof Array || e && e.push && r(e)) {
          for (n = n || "normal", s = s || 0, o = i, a = e.length, l = 0; l < a; l++) r(u = e[l]) && (u = new t({
            tweens: u
          })), this.add(u, o), "string" != typeof u && "function" != typeof u && ("sequence" === n ? o = u._startTime + u.totalDuration() / u._timeScale : "start" === n && (u._startTime -= u.delay())), o += s;

          return this._uncache(!0);
        }

        if ("string" == typeof e) return this.addLabel(e, i);
        if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
        e = h.f.delayedCall(0, e);
      }

      if (h.c.prototype.add.call(this, e, i), e._time && (o = Math.max(0, Math.min(e.totalDuration(), (this.rawTime() - e._startTime) * e._timeScale)), Math.abs(o - e._totalTime) > 1e-5 && e.render(o, !1, !1)), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (f = (c = this).rawTime() > e._startTime; c._timeline;) f && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline;
      return this;
    }, p.remove = function (t) {
      if (t instanceof h.a) {
        this._remove(t, !1);

        var e = t._timeline = t.vars.useFrames ? h.a._rootFramesTimeline : h.a._rootTimeline;
        return t._startTime = (t._paused ? t._pauseTime : e._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale, this;
      }

      if (t instanceof Array || t && t.push && r(t)) {
        for (var i = t.length; --i > -1;) this.remove(t[i]);

        return this;
      }

      return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t);
    }, p._remove = function (t, e) {
      return h.c.prototype._remove.call(this, t, e), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this;
    }, p.append = function (t, e) {
      return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
    }, p.insert = p.insertMultiple = function (t, e, i, n) {
      return this.add(t, e || 0, i, n);
    }, p.appendMultiple = function (t, e, i, n) {
      return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n);
    }, p.addLabel = function (t, e) {
      return this._labels[t] = this._parseTimeOrLabel(e), this;
    }, p.addPause = function (t, e, i, n) {
      var r = h.f.delayedCall(0, c, i, n || this);
      return r.vars.onComplete = r.vars.onReverseComplete = e, r.data = "isPause", this._hasPause = !0, this.add(r, t);
    }, p.removeLabel = function (t) {
      return delete this._labels[t], this;
    }, p.getLabelTime = function (t) {
      return null != this._labels[t] ? this._labels[t] : -1;
    }, p._parseTimeOrLabel = function (t, e, i, n) {
      var s, o;
      if (n instanceof h.a && n.timeline === this) this.remove(n);else if (n && (n instanceof Array || n.push && r(n))) for (o = n.length; --o > -1;) n[o] instanceof h.a && n[o].timeline === this && this.remove(n[o]);
      if (s = "number" != typeof t || e ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof e) return this._parseTimeOrLabel(e, i && "number" == typeof t && null == this._labels[e] ? t - s : 0, i);
      if (e = e || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = s);else {
        if (-1 === (o = t.indexOf("="))) return null == this._labels[t] ? i ? this._labels[t] = s + e : e : this._labels[t] + e;
        e = parseInt(t.charAt(o - 1) + "1", 10) * Number(t.substr(o + 1)), t = o > 1 ? this._parseTimeOrLabel(t.substr(0, o - 1), 0, i) : s;
      }
      return Number(t) + e;
    }, p.seek = function (t, e) {
      return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e);
    }, p.stop = function () {
      return this.paused(!0);
    }, p.gotoAndPlay = function (t, e) {
      return this.play(t, e);
    }, p.gotoAndStop = function (t, e) {
      return this.pause(t, e);
    }, p.render = function (t, e, i) {
      this._gc && this._enabled(!0, !1);
      var n,
          r,
          a,
          l,
          h,
          u,
          c,
          f = this._time,
          p = this._dirty ? this.totalDuration() : this._totalDuration,
          _ = this._startTime,
          d = this._timeScale,
          m = this._paused;
      if (f !== this._time && (t += this._time - f), t >= p - 1e-7 && t >= 0) this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (r = !0, l = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || this._rawPrevTime < 0 || 1e-10 === this._rawPrevTime) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > 1e-10 && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-10, t = p + 1e-4;else if (t < 1e-7) {
        if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && 1e-10 !== this._rawPrevTime && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (l = "onReverseComplete", r = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = r = !0, l = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t;else {
          if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-10, 0 === t && r) for (n = this._first; n && 0 === n._startTime;) n._duration || (r = !1), n = n._next;
          t = 0, this._initted || (h = !0);
        }
      } else {
        if (this._hasPause && !this._forcingPlayhead && !e) {
          if (t >= f) for (n = this._first; n && n._startTime <= t && !u;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n), n = n._next;else for (n = this._last; n && n._startTime >= t && !u;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n), n = n._prev;
          u && (this._time = t = u._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay));
        }

        this._totalTime = this._time = this._rawPrevTime = t;
      }

      if (this._time !== f && this._first || i || h || u) {
        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), (c = this._time) >= f) for (n = this._first; n && (a = n._next, c === this._time && (!this._paused || m));) (n._active || n._startTime <= c && !n._paused && !n._gc) && (u === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = a;else for (n = this._last; n && (a = n._prev, c === this._time && (!this._paused || m));) {
          if (n._active || n._startTime <= f && !n._paused && !n._gc) {
            if (u === n) {
              for (u = n._prev; u && u.endTime() > this._time;) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), u = u._prev;

              u = null, this.pause();
            }

            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i);
          }

          n = a;
        }
        this._onUpdate && (e || (s.length && o(), this._callback("onUpdate"))), l && (this._gc || _ !== this._startTime && d === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (r && (s.length && o(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this._callback(l)));
      }
    }, p._hasPausedChild = function () {
      for (var e = this._first; e;) {
        if (e._paused || e instanceof t && e._hasPausedChild()) return !0;
        e = e._next;
      }

      return !1;
    }, p.getChildren = function (t, e, i, n) {
      n = n || -9999999999;

      for (var r = [], s = this._first, o = 0; s;) s._startTime < n || (s instanceof h.f ? !1 !== e && (r[o++] = s) : (!1 !== i && (r[o++] = s), !1 !== t && (o = (r = r.concat(s.getChildren(!0, e, i))).length))), s = s._next;

      return r;
    }, p.getTweensOf = function (t, e) {
      var i,
          n,
          r = this._gc,
          s = [],
          o = 0;

      for (r && this._enabled(!0, !0), n = (i = h.f.getTweensOf(t)).length; --n > -1;) (i[n].timeline === this || e && this._contains(i[n])) && (s[o++] = i[n]);

      return r && this._enabled(!1, !0), s;
    }, p.recent = function () {
      return this._recent;
    }, p._contains = function (t) {
      for (var e = t.timeline; e;) {
        if (e === this) return !0;
        e = e.timeline;
      }

      return !1;
    }, p.shiftChildren = function (t, e, i) {
      i = i || 0;

      for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;

      if (e) for (n in s) s[n] >= i && (s[n] += t);
      return this._uncache(!0);
    }, p._kill = function (t, e) {
      if (!t && !e) return this._enabled(!1, !1);

      for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);

      return r;
    }, p.clear = function (t) {
      var e = this.getChildren(!1, !0, !0),
          i = e.length;

      for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);

      return !1 !== t && (this._labels = {}), this._uncache(!0);
    }, p.invalidate = function () {
      for (var t = this._first; t;) t.invalidate(), t = t._next;

      return h.a.prototype.invalidate.call(this);
    }, p._enabled = function (t, e) {
      if (t === this._gc) for (var i = this._first; i;) i._enabled(t, !0), i = i._next;
      return h.c.prototype._enabled.call(this, t, e);
    }, p.totalTime = function (t, e, i) {
      this._forcingPlayhead = !0;
      var n = h.a.prototype.totalTime.apply(this, arguments);
      return this._forcingPlayhead = !1, n;
    }, p.duration = function (t) {
      return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration);
    }, p.totalDuration = function (t) {
      if (!arguments.length) {
        if (this._dirty) {
          for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(r, r._startTime - r._delay), this._calculatingDuration = 0) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale, this._time -= r._startTime, this._totalTime -= r._startTime, this._rawPrevTime -= r._startTime), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), (i = r._startTime + r._totalDuration / r._timeScale) > n && (n = i), r = e;

          this._duration = this._totalDuration = n, this._dirty = !1;
        }

        return this._totalDuration;
      }

      return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this;
    }, p.paused = function (t) {
      if (!t) for (var e = this._first, i = this._time; e;) e._startTime === i && "isPause" === e.data && (e._rawPrevTime = 0), e = e._next;
      return h.a.prototype.paused.apply(this, arguments);
    }, p.usesFrames = function () {
      for (var t = this._timeline; t._timeline;) t = t._timeline;

      return t === h.a._rootFramesTimeline;
    }, p.rawTime = function (t) {
      return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale;
    }, t;
  }, !0);
  var y = h.g.TimelineLite;
  /*!
   * VERSION: 2.0.2
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   */

  h.e._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function () {
    var t = function (t) {
      y.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0;
    },
        e = h.f._internals,
        i = e.lazyTweens,
        n = e.lazyRender,
        r = h.e._gsDefine.globals,
        s = new h.b(null, null, 1, 0),
        o = t.prototype = new y();

    return o.constructor = t, o.kill()._gc = !1, t.version = "2.0.2", o.invalidate = function () {
      return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), y.prototype.invalidate.call(this);
    }, o.addCallback = function (t, e, i, n) {
      return this.add(h.f.delayedCall(0, t, i, n), e);
    }, o.removeCallback = function (t, e) {
      if (t) if (null == e) this._kill(null, t);else for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
      return this;
    }, o.removePause = function (t) {
      return this.removeCallback(y._internals.pauseCallback, t);
    }, o.tweenTo = function (t, e) {
      e = e || {};
      var i,
          n,
          o,
          a = {
        ease: s,
        useFrames: this.usesFrames(),
        immediateRender: !1,
        lazy: !1
      },
          l = e.repeat && r.TweenMax || h.f;

      for (n in e) a[n] = e[n];

      return a.time = this._parseTimeOrLabel(t), i = Math.abs(Number(a.time) - this._time) / this._timeScale || .001, o = new l(this, i, a), a.onStart = function () {
        o.target.paused(!0), o.vars.time === o.target.time() || i !== o.duration() || o.isFromTo || o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale).render(o.time(), !0, !0), e.onStart && e.onStart.apply(e.onStartScope || e.callbackScope || o, e.onStartParams || []);
      }, o;
    }, o.tweenFromTo = function (t, e, i) {
      i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
        onComplete: this.seek,
        onCompleteParams: [t],
        callbackScope: this
      }, i.immediateRender = !1 !== i.immediateRender;
      var n = this.tweenTo(e, i);
      return n.isFromTo = 1, n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001);
    }, o.render = function (t, e, r) {
      this._gc && this._enabled(!0, !1);

      var s,
          o,
          a,
          l,
          h,
          u,
          c,
          f,
          p = this._time,
          _ = this._dirty ? this.totalDuration() : this._totalDuration,
          d = this._duration,
          m = this._totalTime,
          g = this._startTime,
          y = this._timeScale,
          v = this._rawPrevTime,
          w = this._paused,
          b = this._cycle;

      if (p !== this._time && (t += this._time - p), t >= _ - 1e-7 && t >= 0) this._locked || (this._totalTime = _, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (o = !0, l = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || v < 0 || 1e-10 === v) && v !== t && this._first && (h = !0, v > 1e-10 && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-10, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = d, t = d + 1e-4);else if (t < 1e-7) {
        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === d && 1e-10 !== v && (v > 0 || t < 0 && v >= 0) && !this._locked) && (l = "onReverseComplete", o = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = o = !0, l = "onReverseComplete") : v >= 0 && this._first && (h = !0), this._rawPrevTime = t;else {
          if (this._rawPrevTime = d || !e || t || this._rawPrevTime === t ? t : 1e-10, 0 === t && o) for (s = this._first; s && 0 === s._startTime;) s._duration || (o = !1), s = s._next;
          t = 0, this._initted || (h = !0);
        }
      } else if (0 === d && v < 0 && (h = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = d + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && m <= t && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 != (1 & this._cycle) && (this._time = d - this._time), this._time > d ? (this._time = d, t = d + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
        if ((t = this._time) >= p || this._repeat && b !== this._cycle) for (s = this._first; s && s._startTime <= t && !c;) s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (c = s), s = s._next;else for (s = this._last; s && s._startTime >= t && !c;) s._duration || "isPause" === s.data && s._rawPrevTime > 0 && (c = s), s = s._prev;
        c && c._startTime < d && (this._time = t = c._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay));
      }

      if (this._cycle !== b && !this._locked) {
        var T = this._yoyo && 0 != (1 & b),
            x = T === (this._yoyo && 0 != (1 & this._cycle)),
            P = this._totalTime,
            O = this._cycle,
            k = this._rawPrevTime,
            S = this._time;
        if (this._totalTime = b * d, this._cycle < b ? T = !T : this._totalTime += d, this._time = p, this._rawPrevTime = 0 === d ? v - 1e-4 : v, this._cycle = b, this._locked = !0, p = T ? 0 : d, this.render(p, e, 0 === d), e || this._gc || this.vars.onRepeat && (this._cycle = O, this._locked = !1, this._callback("onRepeat")), p !== this._time) return;
        if (x && (this._cycle = b, this._locked = !0, p = T ? d + 1e-4 : -1e-4, this.render(p, !0, !1)), this._locked = !1, this._paused && !w) return;
        this._time = S, this._totalTime = P, this._cycle = O, this._rawPrevTime = k;
      }

      if (this._time !== p && this._first || r || h || c) {
        if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== m && t > 0 && (this._active = !0), 0 === m && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), (f = this._time) >= p) for (s = this._first; s && (a = s._next, f === this._time && (!this._paused || w));) (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (c === s && this.pause(), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, r) : s.render((t - s._startTime) * s._timeScale, e, r)), s = a;else for (s = this._last; s && (a = s._prev, f === this._time && (!this._paused || w));) {
          if (s._active || s._startTime <= p && !s._paused && !s._gc) {
            if (c === s) {
              for (c = s._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (t - c._startTime) * c._timeScale : (t - c._startTime) * c._timeScale, e, r), c = c._prev;

              c = null, this.pause();
            }

            s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, r) : s.render((t - s._startTime) * s._timeScale, e, r);
          }

          s = a;
        }
        this._onUpdate && (e || (i.length && n(), this._callback("onUpdate"))), l && (this._locked || this._gc || g !== this._startTime && y === this._timeScale || (0 === this._time || _ >= this.totalDuration()) && (o && (i.length && n(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this._callback(l)));
      } else m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"));
    }, o.getActive = function (t, e, i) {
      null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
      var n,
          r,
          s = [],
          o = this.getChildren(t, e, i),
          a = 0,
          l = o.length;

      for (n = 0; n < l; n++) (r = o[n]).isActive() && (s[a++] = r);

      return s;
    }, o.getLabelAfter = function (t) {
      t || 0 !== t && (t = this._time);
      var e,
          i = this.getLabelsArray(),
          n = i.length;

      for (e = 0; e < n; e++) if (i[e].time > t) return i[e].name;

      return null;
    }, o.getLabelBefore = function (t) {
      null == t && (t = this._time);

      for (var e = this.getLabelsArray(), i = e.length; --i > -1;) if (e[i].time < t) return e[i].name;

      return null;
    }, o.getLabelsArray = function () {
      var t,
          e = [],
          i = 0;

      for (t in this._labels) e[i++] = {
        time: this._labels[t],
        name: t
      };

      return e.sort(function (t, e) {
        return t.time - e.time;
      }), e;
    }, o.invalidate = function () {
      return this._locked = !1, y.prototype.invalidate.call(this);
    }, o.progress = function (t, e) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0;
    }, o.totalProgress = function (t, e) {
      return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0;
    }, o.totalDuration = function (t) {
      return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (y.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration);
    }, o.time = function (t, e) {
      return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time;
    }, o.repeat = function (t) {
      return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat;
    }, o.repeatDelay = function (t) {
      return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay;
    }, o.yoyo = function (t) {
      return arguments.length ? (this._yoyo = t, this) : this._yoyo;
    }, o.currentLabel = function (t) {
      return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8);
    }, t;
  }, !0);

  var v = h.g.TimelineMax,
      w = 180 / Math.PI,
      b = [],
      T = [],
      x = [],
      P = {},
      O = h.e._gsDefine.globals,
      k = function (t, e, i, n) {
    i === n && (i = n - (n - e) / 1e6), t === e && (e = t + (i - t) / 1e6), this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t;
  },
      S = function (t, e, i, n) {
    var r = {
      a: t
    },
        s = {},
        o = {},
        a = {
      c: n
    },
        l = (t + e) / 2,
        h = (e + i) / 2,
        u = (i + n) / 2,
        c = (l + h) / 2,
        f = (h + u) / 2,
        p = (f - c) / 8;
    return r.b = l + (t - l) / 4, s.b = c + p, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (c + f) / 2, o.b = f - p, a.b = u + (n - u) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a];
  },
      A = function (t, e, i, n, r) {
    var s,
        o,
        a,
        l,
        h,
        u,
        c,
        f,
        p,
        _,
        d,
        m,
        g,
        y = t.length - 1,
        v = 0,
        w = t[0].a;

    for (s = 0; s < y; s++) o = (h = t[v]).a, a = h.d, l = t[v + 1].d, r ? (d = b[s], g = ((m = T[s]) + d) * e * .25 / (n ? .5 : x[s] || .5), f = a - ((u = a - (a - o) * (n ? .5 * e : 0 !== d ? g / d : 0)) + (((c = a + (l - a) * (n ? .5 * e : 0 !== m ? g / m : 0)) - u) * (3 * d / (d + m) + .5) / 4 || 0))) : f = a - ((u = a - (a - o) * e * .5) + (c = a + (l - a) * e * .5)) / 2, u += f, c += f, h.c = p = u, h.b = 0 !== s ? w : w = h.a + .6 * (h.c - h.a), h.da = a - o, h.ca = p - o, h.ba = w - o, i ? (_ = S(o, w, p, a), t.splice(v, 1, _[0], _[1], _[2], _[3]), v += 4) : v++, w = c;

    (h = t[v]).b = w, h.c = w + .4 * (h.d - w), h.da = h.d - h.a, h.ca = h.c - h.a, h.ba = w - h.a, i && (_ = S(h.a, w, h.c, h.d), t.splice(v, 1, _[0], _[1], _[2], _[3]));
  },
      E = function (t, e, i, n) {
    var r,
        s,
        o,
        a,
        l,
        h,
        u = [];
    if (n) for (s = (t = [n].concat(t)).length; --s > -1;) "string" == typeof (h = t[s][e]) && "=" === h.charAt(1) && (t[s][e] = n[e] + Number(h.charAt(0) + h.substr(2)));
    if ((r = t.length - 2) < 0) return u[0] = new k(t[0][e], 0, 0, t[0][e]), u;

    for (s = 0; s < r; s++) o = t[s][e], a = t[s + 1][e], u[s] = new k(o, 0, 0, a), i && (l = t[s + 2][e], b[s] = (b[s] || 0) + (a - o) * (a - o), T[s] = (T[s] || 0) + (l - a) * (l - a));

    return u[s] = new k(t[s][e], 0, 0, t[s + 1][e]), u;
  },
      R = function (t, e, i, n, r, s) {
    var o,
        a,
        l,
        h,
        u,
        c,
        f,
        p,
        _ = {},
        d = [],
        m = s || t[0];

    for (a in r = "string" == typeof r ? "," + r + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == e && (e = 1), t[0]) d.push(a);

    if (t.length > 1) {
      for (p = t[t.length - 1], f = !0, o = d.length; --o > -1;) if (a = d[o], Math.abs(m[a] - p[a]) > .05) {
        f = !1;
        break;
      }

      f && (t = t.concat(), s && t.unshift(s), t.push(t[1]), s = t[t.length - 3]);
    }

    for (b.length = T.length = x.length = 0, o = d.length; --o > -1;) a = d[o], P[a] = -1 !== r.indexOf("," + a + ","), _[a] = E(t, a, P[a], s);

    for (o = b.length; --o > -1;) b[o] = Math.sqrt(b[o]), T[o] = Math.sqrt(T[o]);

    if (!n) {
      for (o = d.length; --o > -1;) if (P[a]) for (c = (l = _[d[o]]).length - 1, h = 0; h < c; h++) u = l[h + 1].da / T[h] + l[h].da / b[h] || 0, x[h] = (x[h] || 0) + u * u;

      for (o = x.length; --o > -1;) x[o] = Math.sqrt(x[o]);
    }

    for (o = d.length, h = i ? 4 : 1; --o > -1;) l = _[a = d[o]], A(l, e, i, n, P[a]), f && (l.splice(0, h), l.splice(l.length - h, h));

    return _;
  },
      C = function (t, e, i) {
    for (var n, r, s, o, a, l, h, u, c, f, p, _ = 1 / i, d = t.length; --d > -1;) for (s = (f = t[d]).a, o = f.d - s, a = f.c - s, l = f.b - s, n = r = 0, u = 1; u <= i; u++) n = r - (r = ((h = _ * u) * h * o + 3 * (c = 1 - h) * (h * a + c * l)) * h), e[p = d * i + u - 1] = (e[p] || 0) + n * n;
  },
      M = h.e._gsDefine.plugin({
    propName: "bezier",
    priority: -1,
    version: "1.3.8",
    API: 2,
    global: !0,
    init: function (t, e, i) {
      this._target = t, e instanceof Array && (e = {
        values: e
      }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
      var n,
          r,
          s,
          o,
          a,
          l = e.values || [],
          h = {},
          u = l[0],
          c = e.autoRotate || i.vars.orientToBezier;

      for (n in this._autoRotate = c ? c instanceof Array ? c : [["x", "y", "rotation", !0 === c ? 0 : Number(c) || 0]] : null, u) this._props.push(n);

      for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || h[n] !== l[0][n] && (a = h);

      if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? R(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : function (t, e, i) {
        var n,
            r,
            s,
            o,
            a,
            l,
            h,
            u,
            c,
            f,
            p,
            _ = {},
            d = "cubic" === (e = e || "soft") ? 3 : 2,
            m = "soft" === e,
            g = [];
        if (m && i && (t = [i].concat(t)), null == t || t.length < d + 1) throw "invalid Bezier data";

        for (c in t[0]) g.push(c);

        for (l = g.length; --l > -1;) {
          for (_[c = g[l]] = a = [], f = 0, u = t.length, h = 0; h < u; h++) n = null == i ? t[h][c] : "string" == typeof (p = t[h][c]) && "=" === p.charAt(1) ? i[c] + Number(p.charAt(0) + p.substr(2)) : Number(p), m && h > 1 && h < u - 1 && (a[f++] = (n + a[f - 2]) / 2), a[f++] = n;

          for (u = f - d + 1, f = 0, h = 0; h < u; h += d) n = a[h], r = a[h + 1], s = a[h + 2], o = 2 === d ? 0 : a[h + 3], a[f++] = p = 3 === d ? new k(n, r, s, o) : new k(n, (2 * r + n) / 3, (2 * r + s) / 3, s);

          a.length = f;
        }

        return _;
      }(l, e.type, h), this._segCount = this._beziers[n].length, this._timeRes) {
        var f = function (t, e) {
          var i,
              n,
              r,
              s,
              o = [],
              a = [],
              l = 0,
              h = 0,
              u = (e = e >> 0 || 6) - 1,
              c = [],
              f = [];

          for (i in t) C(t[i], o, e);

          for (r = o.length, n = 0; n < r; n++) l += Math.sqrt(o[n]), f[s = n % e] = l, s === u && (h += l, c[s = n / e >> 0] = f, a[s] = h, l = 0, f = []);

          return {
            length: h,
            lengths: a,
            segments: c
          };
        }(this._beziers, this._timeRes);

        this._length = f.length, this._lengths = f.lengths, this._segments = f.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length;
      }

      if (c = this._autoRotate) for (this._initialRotations = [], c[0] instanceof Array || (this._autoRotate = c = [c]), s = c.length; --s > -1;) {
        for (o = 0; o < 3; o++) n = c[s][o], this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];

        n = c[s][2], this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0, this._overwriteProps.push(n);
      }
      return this._startRatio = i.vars.runBackwards ? 1 : 0, !0;
    },
    set: function (t) {
      var e,
          i,
          n,
          r,
          s,
          o,
          a,
          l,
          h,
          u,
          c = this._segCount,
          f = this._func,
          p = this._target,
          _ = t !== this._startRatio;

      if (this._timeRes) {
        if (h = this._lengths, u = this._curSeg, t *= this._length, n = this._li, t > this._l2 && n < c - 1) {
          for (l = c - 1; n < l && (this._l2 = h[++n]) <= t;);

          this._l1 = h[n - 1], this._li = n, this._curSeg = u = this._segments[n], this._s2 = u[this._s1 = this._si = 0];
        } else if (t < this._l1 && n > 0) {
          for (; n > 0 && (this._l1 = h[--n]) >= t;);

          0 === n && t < this._l1 ? this._l1 = 0 : n++, this._l2 = h[n], this._li = n, this._curSeg = u = this._segments[n], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si];
        }

        if (e = n, t -= this._l1, n = this._si, t > this._s2 && n < u.length - 1) {
          for (l = u.length - 1; n < l && (this._s2 = u[++n]) <= t;);

          this._s1 = u[n - 1], this._si = n;
        } else if (t < this._s1 && n > 0) {
          for (; n > 0 && (this._s1 = u[--n]) >= t;);

          0 === n && t < this._s1 ? this._s1 = 0 : n++, this._s2 = u[n], this._si = n;
        }

        o = (n + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
      } else o = (t - (e = t < 0 ? 0 : t >= 1 ? c - 1 : c * t >> 0) * (1 / c)) * c;

      for (i = 1 - o, n = this._props.length; --n > -1;) r = this._props[n], a = (o * o * (s = this._beziers[r][e]).da + 3 * i * (o * s.ca + i * s.ba)) * o + s.a, this._mod[r] && (a = this._mod[r](a, p)), f[r] ? p[r](a) : p[r] = a;

      if (this._autoRotate) {
        var d,
            m,
            g,
            y,
            v,
            b,
            T,
            x = this._autoRotate;

        for (n = x.length; --n > -1;) r = x[n][2], b = x[n][3] || 0, T = !0 === x[n][4] ? 1 : w, s = this._beziers[x[n][0]], d = this._beziers[x[n][1]], s && d && (s = s[e], d = d[e], m = s.a + (s.b - s.a) * o, m += ((y = s.b + (s.c - s.b) * o) - m) * o, y += (s.c + (s.d - s.c) * o - y) * o, g = d.a + (d.b - d.a) * o, g += ((v = d.b + (d.c - d.b) * o) - g) * o, v += (d.c + (d.d - d.c) * o - v) * o, a = _ ? Math.atan2(v - g, y - m) * T + b : this._initialRotations[n], this._mod[r] && (a = this._mod[r](a, p)), f[r] ? p[r](a) : p[r] = a);
      }
    }
  }),
      L = M.prototype;
  /*!
   * VERSION: 1.3.8
   * DATE: 2018-05-30
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   **/


  M.bezierThrough = R, M.cubicToQuadratic = S, M._autoCSS = !0, M.quadraticToCubic = function (t, e, i) {
    return new k(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
  }, M._cssRegister = function () {
    var t = O.CSSPlugin;

    if (t) {
      var e = t._internals,
          i = e._parseToProxy,
          n = e._setPluginRatio,
          r = e.CSSPropTween;

      e._registerComplexSpecialProp("bezier", {
        parser: function (t, e, s, o, a, l) {
          e instanceof Array && (e = {
            values: e
          }), l = new M();
          var h,
              u,
              c,
              f = e.values,
              p = f.length - 1,
              _ = [],
              d = {};
          if (p < 0) return a;

          for (h = 0; h <= p; h++) c = i(t, f[h], o, a, l, p !== h), _[h] = c.end;

          for (u in e) d[u] = e[u];

          return d.values = _, (a = new r(t, "bezier", 0, 0, c.pt, 2)).data = c, a.plugin = l, a.setRatio = n, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (h = !0 === d.autoRotate ? 0 : Number(d.autoRotate), d.autoRotate = null != c.end.left ? [["left", "top", "rotation", h, !1]] : null != c.end.x && [["x", "y", "rotation", h, !1]]), d.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform, c.proxy.rotation = c.autoRotate.rotation || 0, o._overwriteProps.push("rotation")), l._onInitTween(c.proxy, d, o._tween), a;
        }
      });
    }
  }, L._mod = function (t) {
    for (var e, i = this._overwriteProps, n = i.length; --n > -1;) (e = t[i[n]]) && "function" == typeof e && (this._mod[i[n]] = e);
  }, L._kill = function (t) {
    var e,
        i,
        n = this._props;

    for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);

    if (n = this._autoRotate) for (i = n.length; --i > -1;) t[n[i][2]] && n.splice(i, 1);
    return this._super._kill.call(this, t);
  },
  /*!
   * VERSION: 1.16.1
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   * 
   * @author: Jack Doyle, jack@greensock.com
   **/
  h.e._gsDefine("easing.Back", ["easing.Ease"], function () {
    var t,
        e,
        i,
        n,
        r = h.e.GreenSockGlobals || h.e,
        s = r.com.greensock,
        o = 2 * Math.PI,
        a = Math.PI / 2,
        l = s._class,
        u = function (t, e) {
      var i = l("easing." + t, function () {}, !0),
          n = i.prototype = new h.b();
      return n.constructor = i, n.getRatio = e, i;
    },
        c = h.b.register || function () {},
        f = function (t, e, i, n, r) {
      var s = l("easing." + t, {
        easeOut: new e(),
        easeIn: new i(),
        easeInOut: new n()
      }, !0);
      return c(s, t), s;
    },
        p = function (t, e, i) {
      this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t);
    },
        _ = function (t, e) {
      var i = l("easing." + t, function (t) {
        this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1;
      }, !0),
          n = i.prototype = new h.b();
      return n.constructor = i, n.getRatio = e, n.config = function (t) {
        return new i(t);
      }, i;
    },
        d = f("Back", _("BackOut", function (t) {
      return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
    }), _("BackIn", function (t) {
      return t * t * ((this._p1 + 1) * t - this._p1);
    }), _("BackInOut", function (t) {
      return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
    })),
        m = l("easing.SlowMo", function (t, e, i) {
      e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i;
    }, !0),
        g = m.prototype = new h.b();

    return g.constructor = m, g.getRatio = function (t) {
      var e = t + (.5 - t) * this._p;
      return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 === t ? 0 : 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e;
    }, m.ease = new m(.7, .7), g.config = m.config = function (t, e, i) {
      return new m(t, e, i);
    }, (g = (t = l("easing.SteppedEase", function (t, e) {
      t = t || 1, this._p1 = 1 / t, this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0;
    }, !0)).prototype = new h.b()).constructor = t, g.getRatio = function (t) {
      return t < 0 ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1;
    }, g.config = t.config = function (e, i) {
      return new t(e, i);
    }, (g = (e = l("easing.ExpoScaleEase", function (t, e, i) {
      this._p1 = Math.log(e / t), this._p2 = e - t, this._p3 = t, this._ease = i;
    }, !0)).prototype = new h.b()).constructor = e, g.getRatio = function (t) {
      return this._ease && (t = this._ease.getRatio(t)), (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2;
    }, g.config = e.config = function (t, i, n) {
      return new e(t, i, n);
    }, (g = (i = l("easing.RoughEase", function (t) {
      for (var e, i, n, r, s, o, a = (t = t || {}).taper || "none", l = [], u = 0, c = 0 | (t.points || 20), f = c, _ = !1 !== t.randomize, d = !0 === t.clamp, m = t.template instanceof h.b ? t.template : null, g = "number" == typeof t.strength ? .4 * t.strength : .4; --f > -1;) e = _ ? Math.random() : 1 / c * f, i = m ? m.getRatio(e) : e, n = "none" === a ? g : "out" === a ? (r = 1 - e) * r * g : "in" === a ? e * e * g : e < .5 ? (r = 2 * e) * r * .5 * g : (r = 2 * (1 - e)) * r * .5 * g, _ ? i += Math.random() * n - .5 * n : f % 2 ? i += .5 * n : i -= .5 * n, d && (i > 1 ? i = 1 : i < 0 && (i = 0)), l[u++] = {
        x: e,
        y: i
      };

      for (l.sort(function (t, e) {
        return t.x - e.x;
      }), o = new p(1, 1, null), f = c; --f > -1;) s = l[f], o = new p(s.x, s.y, o);

      this._prev = new p(0, 0, 0 !== o.t ? o : o.next);
    }, !0)).prototype = new h.b()).constructor = i, g.getRatio = function (t) {
      var e = this._prev;

      if (t > e.t) {
        for (; e.next && t >= e.t;) e = e.next;

        e = e.prev;
      } else for (; e.prev && t <= e.t;) e = e.prev;

      return this._prev = e, e.v + (t - e.t) / e.gap * e.c;
    }, g.config = function (t) {
      return new i(t);
    }, i.ease = new i(), f("Bounce", u("BounceOut", function (t) {
      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    }), u("BounceIn", function (t) {
      return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
    }), u("BounceInOut", function (t) {
      var e = t < .5;
      return (t = e ? 1 - 2 * t : 2 * t - 1) < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5;
    })), f("Circ", u("CircOut", function (t) {
      return Math.sqrt(1 - (t -= 1) * t);
    }), u("CircIn", function (t) {
      return -(Math.sqrt(1 - t * t) - 1);
    }), u("CircInOut", function (t) {
      return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    })), f("Elastic", (n = function (t, e, i) {
      var n = l("easing." + t, function (t, e) {
        this._p1 = t >= 1 ? t : 1, this._p2 = (e || i) / (t < 1 ? t : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2;
      }, !0),
          r = n.prototype = new h.b();
      return r.constructor = n, r.getRatio = e, r.config = function (t, e) {
        return new n(t, e);
      }, n;
    })("ElasticOut", function (t) {
      return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1;
    }, .3), n("ElasticIn", function (t) {
      return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2);
    }, .3), n("ElasticInOut", function (t) {
      return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1;
    }, .45)), f("Expo", u("ExpoOut", function (t) {
      return 1 - Math.pow(2, -10 * t);
    }), u("ExpoIn", function (t) {
      return Math.pow(2, 10 * (t - 1)) - .001;
    }), u("ExpoInOut", function (t) {
      return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
    })), f("Sine", u("SineOut", function (t) {
      return Math.sin(t * a);
    }), u("SineIn", function (t) {
      return 1 - Math.cos(t * a);
    }), u("SineInOut", function (t) {
      return -.5 * (Math.cos(Math.PI * t) - 1);
    })), l("easing.EaseLookup", {
      find: function (t) {
        return h.b.map[t];
      }
    }, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(t, "SteppedEase", "ease,"), d;
  }, !0);
  var D = h.g.Back,
      j = h.g.Elastic,
      F = h.g.Bounce,
      z = h.g.RoughEase,
      I = h.g.SlowMo,
      N = h.g.SteppedEase,
      X = h.g.Circ,
      B = h.g.Expo,
      q = h.g.Sine,
      U = h.g.ExpoScaleEase,
      H = u;
  H._autoActivated = [y, v, c, f, M, p, g, D, j, F, z, I, N, X, B, q, U];
  var Y = i(4),
      V = i.n(Y),
      G = i(3),
      W = i.n(G);
  var $ = {
    Increment: class extends W.a {
      constructor(t) {
        super(t), this.index = 0, this.ref = {
          button: null,
          display: null
        };
      }

      mount() {
        this.ref.button.addEventListener("click", this.increment.bind(this)), this.increment();
      }

      increment() {
        this.index++, this.ref.display.innerText = this.index;
      }

    },
    SeparateText: class extends W.a {
      constructor(t) {
        super(t), this.options = {
          delay: .3
        };
      }

      mount() {
        let t = "";
        this.element.innerText.split(" ").forEach(function (e, i) {
          t += `<span><span style="animation-delay: ${i * this.options.delay + .4}s">${e}</span></span> `;
        }.bind(this)), this.element.innerHTML = t;
      }

    }
  };
  V()($), new r.a({
    linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
    plugins: [new o.a([{
      from: "(.*)",
      to: "(.*)",
      in: t => {
        document.querySelector("#swup").style.opacity = 0, H.to(document.querySelector("#swup"), .5, {
          opacity: 1,
          onComplete: t
        });
      },
      out: t => {
        document.querySelector("#swup").style.opacity = 1, H.to(document.querySelector("#swup"), .5, {
          opacity: 0,
          onComplete: t
        });
      }
    }]), new l.a()]
  }).on("contentReplaced", function () {
    document.querySelectorAll("[data-swup]").forEach(function (t) {
      V()($, t);
    });
  });
}]);