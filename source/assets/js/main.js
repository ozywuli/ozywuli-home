(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":6}],2:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":1,"./_getRawTag":4,"./_objectToString":5}],3:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":1}],5:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],6:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":3}],7:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":8,"./now":11,"./toNumber":12}],8:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],9:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],10:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":2,"./isObjectLike":9}],11:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":6}],12:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":8,"./isSymbol":10}],13:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Modalx = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * Modalx.js
 * @author Ozy Wu-Li - @ousikaa
 * @description Simple modal toggler
 */

// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function ($, window, document, undefined) {
    /**
     * Plugin namespace
     */
    var namespace = {
        pluginName: 'Modalx'
    };

    /**
     * Defaults
     */
    var defaults = {
        opener: 'js-modalx-open',
        target: 'js-modalx-target',
        closer: 'js-modalx-close',
        content: 'js-modalx-content',
        isVisibleClass: 'is-visible',
        singleModalTarget: false,
        autoTarget: true,
        openCallback: function openCallback(event) {
            // console.log('open callback');
        },
        closeCallback: function closeCallback(event) {
            // console.log('close callback');
        }
    };

    /**
     * Plugin Constructor
     */
    namespace['pluginName'] = function (options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    /**
     * Prototype
     */
    namespace['pluginName'].prototype = {
        /**
         * 
         */
        init: function init() {
            $('.' + this.options.opener).on('click', this.openEventHandler.bind(this));
            // $(`.${this.options.closer}`).on('click', this.closeModal.bind(this));
            $('.' + this.options.target).on('click', this.closeEventHandler.bind(this));
            $('.' + this.options.opener + ', .' + this.options.closer).children().css('pointer-events', 'none');

            if (this.options.autoTarget) {
                this.addId();
            }
        },

        /**
         * Automatically add IDs
         */
        addId: function addId() {
            if (!this.options.singleModalTarget) {
                for (var index = 0; index < $('.' + this.options.opener).length; index++) {
                    $('\n                        .' + this.options.opener + ':eq(' + index + '),\n                        .' + this.options.closer + ':eq(' + index + '), \n                        .' + this.options.target + ':eq(' + index + ')\n                    ').attr('data-modalx-id', '' + index);
                }
            } else {
                $('\n                    .' + this.options.opener + ', \n                    .' + this.options.closer + ', \n                    .' + this.options.target + '\n                ').attr('data-modalx-id', 'single');
            }
        },


        /**
         * Open Modal
         */
        openModal: function openModal(target, event) {
            $(target).addClass(this.options.isVisibleClass);

            // Run callback after user opens modal
            if (this.options.openCallback) {
                this.options.openCallback(target, event);
            }
        },


        /**
         * Open Event Handler
         */
        openEventHandler: function openEventHandler(event) {
            event.preventDefault();
            $(event.target).addClass(this.options.isVisibleClass);
            var thisTargetId = $(event.target).attr('data-modalx-id');

            this.openModal('.' + this.options.target + '[data-modalx-id="' + thisTargetId + '"]', event);
        },

        /**
         * Close Event handler
         */
        closeEventHandler: function closeEventHandler(event) {
            event.preventDefault();
            if ($(event.target).closest('.' + this.options.content).length) {} else {
                this.closeModal();
            }
        },

        /**
         * Close modal
         */
        closeModal: function closeModal(event) {
            // remove modal visibility
            $('.' + this.options.opener + ', .' + this.options.target).removeClass(this.options.isVisibleClass);

            // Run callback after user closes modal
            if (this.options.closeCallback) {
                this.options.closeCallback(event);
            }
        }
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];
})(jQuery, window, document);

},{}]},{},[1])(1)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function( $, window, document, undefined ) {
    let pluginName = 'OnToggle';

    /**
     * 
     */
    let defaults = {
        toggleEl: '.js-toggle',
        toggleTargetEl: '.js-toggle-target',
        isVisibleClass: 'is-visible'
    }

    /**
     * PLUGIN CONSTRUCTOR 
     */
    let OnToggle = function( options ) {
        this.options = $.extend( {}, defaults, options );
        this.init();
    }

    /**
     * 
     */
    // https://stackoverflow.com/questions/4736910/javascript-when-to-use-prototypes
    OnToggle.prototype = {
        
        /**
         * 
         */
        init: function() {
            this.checkDevice();
            $(this.options.toggleEl).on('click', this.openToggle.bind(this));
            $(document).on(this.eventType, this.detectOutsideClick.bind(this));
        },
        
        /**
         * 
         */
        eventType: 'click',

        /**
         * 
         */
        checkDevice: function() {
            // if we detect an ios device, then use the `touchstart`event instead of the `click` event
            let event = (/iPad|iPhone|iPod/.test(navigator.userAgent)) ? "touchstart" : "click";
            this.eventType = event;
        },
        /**
         * 
         */
        openToggle: function(event) {
            event.preventDefault();

            // TOGGLE THIS EL'S CLASS
            $(event.target).toggleClass(this.options.isVisibleClass);

            // get the associated toggle target
            let thisToggleTargetEl = $(event.target).attr('data-toggle-target');

            // hide any toggle target that isn't the associated target
            $(this.options.toggleTargetEl).not( $(`.${thisToggleTargetEl}`) ).removeClass(this.options.isVisibleClass);
            $(`.${thisToggleTargetEl}`).toggleClass(this.options.isVisibleClass);
        },

        /**
         * 
         */
        detectOutsideClick: function(event) {
            if ( !$(event.target).closest( `${this.options.toggleEl}, ${this.options.toggleTargetEl}` ).length ) {
                $(`${this.options.toggleEl}, ${this.options.toggleTargetEl}`).removeClass(this.options.isVisibleClass);
            }
        }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new OnToggle( options ));
            }
        });
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    // if (typeof define === 'function' && define.amd) {
    //     define([], function() {
    //         return toggle;
    //     });
    // } else if (typeof exports !== "undefined" && exports !== null) {
    //     module.exports = toggle;
    // } else {
    //     window.toggle = toggle;
    // }

    module.exports = OnToggle;

})( jQuery, window , document );
},{}],15:[function(require,module,exports){
'use strict';

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _OnToggle = require('ontoggle/dist/OnToggle');

var _OnToggle2 = _interopRequireDefault(_OnToggle);

var _Modalx = require('modalx/dist/Modalx');

var _Modalx2 = _interopRequireDefault(_Modalx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//==============================================================================
// DOCUMENT READY
//==============================================================================
$(document).ready(function () {

	lazyLoadImg.init();
	scrollUpObj.init();

	// https://stackoverflow.com/questions/138669/how-can-i-determine-if-a-javascript-variable-is-defined-in-a-page
	if ('undefined' !== typeof mapboxgl && $('#contact-map').length) {
		contactMapObj.init();
	}
	if ('undefined' !== typeof mapboxgl && $('#travel-map').length) {
		TravelMap().init();
	}
});

//==============================================================================
// GLOBAL SCROLL EVENT
//==============================================================================
function scrollHandler() {
	if ($(window).scrollTop() > $(window).height() / 1.5) {
		$('.js-scrollup').addClass('is-revealed');
	} else {
		$('.js-scrollup').removeClass('is-revealed');
	}
}

$(window).on('scroll', (0, _debounce3.default)(scrollHandler, 150));

//==============================================================================
// SCROLL TO TOP / SCROLL UP
//==============================================================================
var scrollUpObj = {
	$scrollUpBtn: $('.js-scrollup-btn'),
	scrollUp: function scrollUp(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	},
	init: function init() {
		this.$scrollUpBtn.on('click', this.scrollUp);
	}

	//==============================================================================
	// Lazy Load Images
	//==============================================================================
};var lazyLoadImg = {
	$featuredItem: $('.js-featured-list-item'),
	featuredItemOffsets: [],
	scrolled: $(window).scrollTop(),
	windowHeight: $(window).height(),

	updateOffsets: function updateOffsets() {

		var featuredItemOffsets = this.featuredItemOffsets;
		this.$featuredItem.each(function () {
			featuredItemOffsets.push($(this).offset().top);
		});
	},

	scrolling: function scrolling() {
		this.scrolled = $(window).scrollTop();

		for (var i = 0; i < this.featuredItemOffsets.length; i++) {

			if (this.scrolled + this.windowHeight - 200 > this.featuredItemOffsets[i]) {

				this.$featuredItem.eq(i).find('.featured-list-item-img').css('background-image', 'url("' + this.$featuredItem.eq(i).attr('data-img') + '")');
			}
		}
	},

	init: function init() {
		this.updateOffsets();

		$(window).on('scroll', this.scrolling.bind(this));
	}

	//==============================================================================
	// CONTACT MAP
	//==============================================================================
};var contactMapObj = {
	init: function init() {
		mapboxgl.accessToken = 'pk.eyJ1IjoibXJvd2wiLCJhIjoiQW5seEFHVSJ9.fC2U7HkEIM-7EPNDMIoRXA';
		var map = new mapboxgl.Map({
			container: 'contact-map',
			style: 'mapbox://styles/mapbox/dark-v9',
			center: [-118.2468, 34.0407],
			zoom: 9
		});

		map.on('load', function () {
			// var el = document.createElement('div');
			// el.className = 'marker';
			// el.style.backgroundImage = 'url(/assets/images/marker.png)';
			// el.style.width = '64px';
			// el.style.height = '64px';

			// add marker to map
			// new mapboxgl.Marker(el)
			//     .setLngLat([-118.2468, 34.12])
			//     .addTo(map);
		});
	}
};

//==============================================================================
// INITIALIZE ONTOGGLE
//==============================================================================
var myOnToggle = new _OnToggle2.default();

//==============================================================================
// MASONRY
//==============================================================================
if (typeof imagesLoaded !== 'undefined') {
	var $msnry = $('.msnry-grid').imagesLoaded(function () {
		$msnry.css({ opacity: 1 });
		$msnry.masonry({
			itemSelector: '.msnry-grid__item',
			// columnWidth: '.msnry-gris__sizer',
			percentPosition: true
			// gutter: '.msnry-grid__gutter'
		});
	});
}

//==============================================================================
// Swiper
//==============================================================================
if ($('.swiper-container').length) {
	var mySwiper = new Swiper('.swiper-container', {
		// Optional parameters
		loop: true,
		slidesPerView: 4,
		spaceBetween: 30,
		centeredSlides: true,
		breakpoints: {
			1024: {
				slidesPerView: 3
			},
			640: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		}
	});
}

//==============================================================================
// Modalx
//==============================================================================
var myModalx = new _Modalx2.default({
	singleModalTarget: true,
	openCallback: function openCallback(target, event) {
		$('.js-modalx-content').append('\n\t\t<img src="' + event.currentTarget.dataset.img + '" alt=""/>\n\t\t');

		var $modalImg = $('.js-modalx-content img');

		if ($modalImg.height() > $modalImg.width()) {
			$('.js-modalx-content').addClass('is-vertical');
		}
	},
	closeCallback: function closeCallback() {
		$('.js-modalx-content').removeClass('is-vertical').empty();
	}
});

//==============================================================================
// Travel Map
//==============================================================================
var TravelMap = function TravelMap() {
	var geojson = {
		type: 'FeatureCollection',
		features: [{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-77.032, 38.913]
			},
			properties: {
				title: 'Mapbox',
				description: 'Washington, D.C.'
			}
		}, {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-122.414, 37.776]
			},
			properties: {
				title: 'Mapbox',
				description: 'San Francisco, California'
			}
		}]
	};

	var init = function init() {
		var map = new mapboxgl.Map({
			container: 'travel-map',
			style: 'https://api.maptiler.com/maps/86d71b2a-af5f-4fa8-8bfa-fc297f69b82d/style.json?key=7rAR6VoxhJjbXn8HZNcj',
			center: [0, 0],
			zoom: 0
		});

		geojson.features.forEach(function (marker) {

			// create a HTML element for each feature
			var el = document.createElement('div');
			el.className = 'marker';

			// make a marker for each feature and add to the map
			new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
		});
	};

	return { init: init };
};

},{"lodash/debounce":7,"modalx/dist/Modalx":13,"ontoggle/dist/OnToggle":14}]},{},[15])

//# sourceMappingURL=main.js.map
