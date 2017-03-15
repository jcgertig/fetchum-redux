(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Fetchum-Redux"] = factory();
	else
		root["Fetchum-Redux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _fetchumRedux = __webpack_require__(1);

	Object.keys(_fetchumRedux).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _fetchumRedux[key];
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.apiPostFormReq = exports.apiPutFormReq = exports.apiDeleteReq = exports.apiPatchReq = exports.apiPostReq = exports.apiPutReq = exports.apiGetReq = exports.apiRequest = exports.postFormReq = exports.putFormReq = exports.deleteReq = exports.patchReq = exports.postReq = exports.putReq = exports.getReq = exports.request = exports.generateCRUDRequests = exports.generateRequest = undefined;

	var _fetchum = __webpack_require__(3);

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Fetchum Redux - Redux action wrapper for fetchum
	 */
	__webpack_require__(2).polyfill();

	var defaultNewRequest = 'NEW_FETCH_REQUEST';
	var defaultSuccessRequest = 'FETCH_REQUEST_SUCCESS';
	var defaultFailureRequest = 'FETCH_REQUEST_FAILURE';

	/**
	 * Generate a api request
	 * @param  {Object} options - {method, token, route, external, form, headers}
	 *
	 */
	var generateRequest = exports.generateRequest = function generateRequest(options) {
	  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'FETCH';

	  return function (params, body, headers, customToken, tokenType) {
	    return function (dispatch) {
	      return new Promise(function (accept, reject) {
	        dispatch({ payload: options, type: defaultNewRequest.replace('_FETCH', '_' + name.toUpperCase()) });
	        (0, _fetchum.generateRequest)(options)(params, body, headers, customToken, tokenType).then(function (res) {
	          dispatch({ payload: (0, _lodash2['default'])({}, options, { res: res }), type: defaultSuccessRequest.replace('FETCH_', name.toUpperCase() + '_') });
	          accept(res);
	        })['catch'](function (res) {
	          dispatch({ payload: (0, _lodash2['default'])({}, options, { res: res }), type: defaultFailureRequest.replace('FETCH_', name.toUpperCase() + '_') });
	          reject(res);
	        });
	      });
	    };
	  };
	};

	/**
	 * Generate a crud api requests
	 * @param  {Object} baseUrl
	 * @param  {Object} idVar
	 * @param  {Object} useToken
	 *
	 */
	var generateCRUDRequests = exports.generateCRUDRequests = function generateCRUDRequests() {
	  var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var idVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
	  var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'FETCH';
	  return {
	    fetchAll: generateRequest({
	      token: token,
	      method: 'GET',
	      route: baseUrl
	    }, 'FETCH_ALL_' + name.toUpperCase()),
	    create: generateRequest({
	      token: token,
	      method: 'POST',
	      route: baseUrl
	    }, 'CREATE_' + name.toUpperCase()),
	    fetchOne: generateRequest({
	      token: token,
	      method: 'GET',
	      route: baseUrl + '/:' + idVar
	    }, 'FETCH_ONE_' + name.toUpperCase()),
	    update: generateRequest({
	      token: token,
	      method: 'PUT',
	      route: baseUrl + '/:' + idVar
	    }, 'UPDATE_' + name.toUpperCase()),
	    'delete': generateRequest({
	      token: token,
	      method: 'DELETE',
	      route: baseUrl + '/:' + idVar
	    }, 'DELETE_' + name.toUpperCase())
	  };
	};

	var request = exports.request = function request(isFormData, method, url, body, headers, others) {
	  var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'FETCH';

	  return function (dispatch) {
	    return new Promise(function (accept, reject) {
	      dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others }, type: defaultNewRequest.replace('_FETCH', '_' + name.toUpperCase()) });
	      (0, _fetchum.request)(isFormData, method, url, body, headers, others).then(function (res) {
	        dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res }, type: defaultSuccessRequest.replace('FETCH_', name.toUpperCase() + '_') });
	        accept(res);
	      })['catch'](function (res) {
	        dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res }, type: defaultFailureRequest.replace('FETCH_', name.toUpperCase() + '_') });
	        reject(res);
	      });
	    });
	  };
	};

	var getReq = exports.getReq = request.bind(null, false, 'get');
	var putReq = exports.putReq = request.bind(null, false, 'put');
	var postReq = exports.postReq = request.bind(null, false, 'post');
	var patchReq = exports.patchReq = request.bind(null, false, 'patch');
	var deleteReq = exports.deleteReq = request.bind(null, false, 'delete');

	var putFormReq = exports.putFormReq = request.bind(null, true, 'put');
	var postFormReq = exports.postFormReq = request.bind(null, true, 'post');

	var apiRequest = exports.apiRequest = function apiRequest(isFormData, method, route, body, headers, others) {
	  var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'FETCH';

	  return function (dispatch) {
	    return new Promise(function (accept, reject) {
	      dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others }, type: defaultNewRequest.replace('_FETCH', '_' + name.toUpperCase()) });
	      (0, _fetchum.apiRequest)(isFormData, method, route, body, headers, others).then(function (res) {
	        dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res }, type: defaultSuccessRequest.replace('FETCH_', name.toUpperCase() + '_') });
	        accept(res);
	      })['catch'](function (res) {
	        dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res }, type: defaultFailureRequest.replace('FETCH_', name.toUpperCase() + '_') });
	        reject(res);
	      });
	    });
	  };
	};

	var apiGetReq = exports.apiGetReq = apiRequest.bind(null, false, 'get');
	var apiPutReq = exports.apiPutReq = apiRequest.bind(null, false, 'put');
	var apiPostReq = exports.apiPostReq = apiRequest.bind(null, false, 'post');
	var apiPatchReq = exports.apiPatchReq = apiRequest.bind(null, false, 'patch');
	var apiDeleteReq = exports.apiDeleteReq = apiRequest.bind(null, false, 'delete');

	var apiPutFormReq = exports.apiPutFormReq = apiRequest.bind(null, true, 'put');
	var apiPostFormReq = exports.apiPostFormReq = apiRequest.bind(null, true, 'post');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(6);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Fetchum"] = factory();
		else
			root["Fetchum"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;
		exports.LocalStorage = undefined;

		var _fetchum = __webpack_require__(19);

		Object.keys(_fetchum).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _fetchum[key];
		    }
		  });
		});

		var _localStorage = __webpack_require__(11);

		var storage = _interopRequireWildcard(_localStorage);

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

		var LocalStorage = exports.LocalStorage = storage;

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		// shim for using process in browser
		var process = module.exports = {};

		// cached from whatever global is present so that test runners that stub it
		// don't break things.  But we need to wrap it in a try catch in case it is
		// wrapped in strict mode code which doesn't define any globals.  It's inside a
		// function because try/catches deoptimize in certain engines.

		var cachedSetTimeout;
		var cachedClearTimeout;

		function defaultSetTimout() {
		    throw new Error('setTimeout has not been defined');
		}
		function defaultClearTimeout () {
		    throw new Error('clearTimeout has not been defined');
		}
		(function () {
		    try {
		        if (typeof setTimeout === 'function') {
		            cachedSetTimeout = setTimeout;
		        } else {
		            cachedSetTimeout = defaultSetTimout;
		        }
		    } catch (e) {
		        cachedSetTimeout = defaultSetTimout;
		    }
		    try {
		        if (typeof clearTimeout === 'function') {
		            cachedClearTimeout = clearTimeout;
		        } else {
		            cachedClearTimeout = defaultClearTimeout;
		        }
		    } catch (e) {
		        cachedClearTimeout = defaultClearTimeout;
		    }
		} ())
		function runTimeout(fun) {
		    if (cachedSetTimeout === setTimeout) {
		        //normal enviroments in sane situations
		        return setTimeout(fun, 0);
		    }
		    // if setTimeout wasn't available but was latter defined
		    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
		        cachedSetTimeout = setTimeout;
		        return setTimeout(fun, 0);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedSetTimeout(fun, 0);
		    } catch(e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
		            return cachedSetTimeout.call(null, fun, 0);
		        } catch(e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
		            return cachedSetTimeout.call(this, fun, 0);
		        }
		    }


		}
		function runClearTimeout(marker) {
		    if (cachedClearTimeout === clearTimeout) {
		        //normal enviroments in sane situations
		        return clearTimeout(marker);
		    }
		    // if clearTimeout wasn't available but was latter defined
		    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
		        cachedClearTimeout = clearTimeout;
		        return clearTimeout(marker);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedClearTimeout(marker);
		    } catch (e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
		            return cachedClearTimeout.call(null, marker);
		        } catch (e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
		            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
		            return cachedClearTimeout.call(this, marker);
		        }
		    }



		}
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;

		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}

		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = runTimeout(cleanUpNextTick);
		    draining = true;

		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    runClearTimeout(timeout);
		}

		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        runTimeout(drainQueue);
		    }
		};

		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};

		function noop() {}

		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;

		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};

		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };


	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		// a duplex stream is just a stream that is both readable and writable.
		// Since JS doesn't have multiple prototypal inheritance, this class
		// prototypally inherits from Readable, and then parasitically from
		// Writable.

		module.exports = Duplex;

		/*<replacement>*/
		var objectKeys = Object.keys || function (obj) {
		  var keys = [];
		  for (var key in obj) keys.push(key);
		  return keys;
		}
		/*</replacement>*/


		/*<replacement>*/
		var util = __webpack_require__(5);
		util.inherits = __webpack_require__(3);
		/*</replacement>*/

		var Readable = __webpack_require__(16);
		var Writable = __webpack_require__(9);

		util.inherits(Duplex, Readable);

		forEach(objectKeys(Writable.prototype), function(method) {
		  if (!Duplex.prototype[method])
		    Duplex.prototype[method] = Writable.prototype[method];
		});

		function Duplex(options) {
		  if (!(this instanceof Duplex))
		    return new Duplex(options);

		  Readable.call(this, options);
		  Writable.call(this, options);

		  if (options && options.readable === false)
		    this.readable = false;

		  if (options && options.writable === false)
		    this.writable = false;

		  this.allowHalfOpen = true;
		  if (options && options.allowHalfOpen === false)
		    this.allowHalfOpen = false;

		  this.once('end', onend);
		}

		// the no-half-open enforcer
		function onend() {
		  // if we allow half-open state, or if the writable side ended,
		  // then we're ok.
		  if (this.allowHalfOpen || this._writableState.ended)
		    return;

		  // no more data can be written.
		  // But allow more writes to happen in this tick.
		  process.nextTick(this.end.bind(this));
		}

		function forEach (xs, f) {
		  for (var i = 0, l = xs.length; i < l; i++) {
		    f(xs[i], i);
		  }
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		if (typeof Object.create === 'function') {
		  // implementation from standard node.js 'util' module
		  module.exports = function inherits(ctor, superCtor) {
		    ctor.super_ = superCtor
		    ctor.prototype = Object.create(superCtor.prototype, {
		      constructor: {
		        value: ctor,
		        enumerable: false,
		        writable: true,
		        configurable: true
		      }
		    });
		  };
		} else {
		  // old school shim for old browsers
		  module.exports = function inherits(ctor, superCtor) {
		    ctor.super_ = superCtor
		    var TempCtor = function () {}
		    TempCtor.prototype = superCtor.prototype
		    ctor.prototype = new TempCtor()
		    ctor.prototype.constructor = ctor
		  }
		}


	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
		 * The buffer module from node.js, for the browser.
		 *
		 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
		 * @license  MIT
		 */
		/* eslint-disable no-proto */

		'use strict'

		var base64 = __webpack_require__(20)
		var ieee754 = __webpack_require__(25)
		var isArray = __webpack_require__(27)

		exports.Buffer = Buffer
		exports.SlowBuffer = SlowBuffer
		exports.INSPECT_MAX_BYTES = 50

		/**
		 * If `Buffer.TYPED_ARRAY_SUPPORT`:
		 *   === true    Use Uint8Array implementation (fastest)
		 *   === false   Use Object implementation (most compatible, even IE6)
		 *
		 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
		 * Opera 11.6+, iOS 4.2+.
		 *
		 * Due to various browser bugs, sometimes the Object implementation will be used even
		 * when the browser supports typed arrays.
		 *
		 * Note:
		 *
		 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
		 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
		 *
		 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
		 *
		 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
		 *     incorrect length in some situations.

		 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
		 * get the Object implementation, which is slower but behaves correctly.
		 */
		Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
		  ? global.TYPED_ARRAY_SUPPORT
		  : typedArraySupport()

		/*
		 * Export kMaxLength after typed array support is determined.
		 */
		exports.kMaxLength = kMaxLength()

		function typedArraySupport () {
		  try {
		    var arr = new Uint8Array(1)
		    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
		    return arr.foo() === 42 && // typed array instances can be augmented
		        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
		        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
		  } catch (e) {
		    return false
		  }
		}

		function kMaxLength () {
		  return Buffer.TYPED_ARRAY_SUPPORT
		    ? 0x7fffffff
		    : 0x3fffffff
		}

		function createBuffer (that, length) {
		  if (kMaxLength() < length) {
		    throw new RangeError('Invalid typed array length')
		  }
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    // Return an augmented `Uint8Array` instance, for best performance
		    that = new Uint8Array(length)
		    that.__proto__ = Buffer.prototype
		  } else {
		    // Fallback: Return an object instance of the Buffer class
		    if (that === null) {
		      that = new Buffer(length)
		    }
		    that.length = length
		  }

		  return that
		}

		/**
		 * The Buffer constructor returns instances of `Uint8Array` that have their
		 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
		 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
		 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
		 * returns a single octet.
		 *
		 * The `Uint8Array` prototype remains unmodified.
		 */

		function Buffer (arg, encodingOrOffset, length) {
		  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
		    return new Buffer(arg, encodingOrOffset, length)
		  }

		  // Common case.
		  if (typeof arg === 'number') {
		    if (typeof encodingOrOffset === 'string') {
		      throw new Error(
		        'If encoding is specified then the first argument must be a string'
		      )
		    }
		    return allocUnsafe(this, arg)
		  }
		  return from(this, arg, encodingOrOffset, length)
		}

		Buffer.poolSize = 8192 // not used by this implementation

		// TODO: Legacy, not needed anymore. Remove in next major version.
		Buffer._augment = function (arr) {
		  arr.__proto__ = Buffer.prototype
		  return arr
		}

		function from (that, value, encodingOrOffset, length) {
		  if (typeof value === 'number') {
		    throw new TypeError('"value" argument must not be a number')
		  }

		  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
		    return fromArrayBuffer(that, value, encodingOrOffset, length)
		  }

		  if (typeof value === 'string') {
		    return fromString(that, value, encodingOrOffset)
		  }

		  return fromObject(that, value)
		}

		/**
		 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
		 * if value is a number.
		 * Buffer.from(str[, encoding])
		 * Buffer.from(array)
		 * Buffer.from(buffer)
		 * Buffer.from(arrayBuffer[, byteOffset[, length]])
		 **/
		Buffer.from = function (value, encodingOrOffset, length) {
		  return from(null, value, encodingOrOffset, length)
		}

		if (Buffer.TYPED_ARRAY_SUPPORT) {
		  Buffer.prototype.__proto__ = Uint8Array.prototype
		  Buffer.__proto__ = Uint8Array
		  if (typeof Symbol !== 'undefined' && Symbol.species &&
		      Buffer[Symbol.species] === Buffer) {
		    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
		    Object.defineProperty(Buffer, Symbol.species, {
		      value: null,
		      configurable: true
		    })
		  }
		}

		function assertSize (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('"size" argument must be a number')
		  } else if (size < 0) {
		    throw new RangeError('"size" argument must not be negative')
		  }
		}

		function alloc (that, size, fill, encoding) {
		  assertSize(size)
		  if (size <= 0) {
		    return createBuffer(that, size)
		  }
		  if (fill !== undefined) {
		    // Only pay attention to encoding if it's a string. This
		    // prevents accidentally sending in a number that would
		    // be interpretted as a start offset.
		    return typeof encoding === 'string'
		      ? createBuffer(that, size).fill(fill, encoding)
		      : createBuffer(that, size).fill(fill)
		  }
		  return createBuffer(that, size)
		}

		/**
		 * Creates a new filled Buffer instance.
		 * alloc(size[, fill[, encoding]])
		 **/
		Buffer.alloc = function (size, fill, encoding) {
		  return alloc(null, size, fill, encoding)
		}

		function allocUnsafe (that, size) {
		  assertSize(size)
		  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
		  if (!Buffer.TYPED_ARRAY_SUPPORT) {
		    for (var i = 0; i < size; ++i) {
		      that[i] = 0
		    }
		  }
		  return that
		}

		/**
		 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
		 * */
		Buffer.allocUnsafe = function (size) {
		  return allocUnsafe(null, size)
		}
		/**
		 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
		 */
		Buffer.allocUnsafeSlow = function (size) {
		  return allocUnsafe(null, size)
		}

		function fromString (that, string, encoding) {
		  if (typeof encoding !== 'string' || encoding === '') {
		    encoding = 'utf8'
		  }

		  if (!Buffer.isEncoding(encoding)) {
		    throw new TypeError('"encoding" must be a valid string encoding')
		  }

		  var length = byteLength(string, encoding) | 0
		  that = createBuffer(that, length)

		  var actual = that.write(string, encoding)

		  if (actual !== length) {
		    // Writing a hex string, for example, that contains invalid characters will
		    // cause everything after the first invalid character to be ignored. (e.g.
		    // 'abxxcd' will be treated as 'ab')
		    that = that.slice(0, actual)
		  }

		  return that
		}

		function fromArrayLike (that, array) {
		  var length = array.length < 0 ? 0 : checked(array.length) | 0
		  that = createBuffer(that, length)
		  for (var i = 0; i < length; i += 1) {
		    that[i] = array[i] & 255
		  }
		  return that
		}

		function fromArrayBuffer (that, array, byteOffset, length) {
		  array.byteLength // this throws if `array` is not a valid ArrayBuffer

		  if (byteOffset < 0 || array.byteLength < byteOffset) {
		    throw new RangeError('\'offset\' is out of bounds')
		  }

		  if (array.byteLength < byteOffset + (length || 0)) {
		    throw new RangeError('\'length\' is out of bounds')
		  }

		  if (byteOffset === undefined && length === undefined) {
		    array = new Uint8Array(array)
		  } else if (length === undefined) {
		    array = new Uint8Array(array, byteOffset)
		  } else {
		    array = new Uint8Array(array, byteOffset, length)
		  }

		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    // Return an augmented `Uint8Array` instance, for best performance
		    that = array
		    that.__proto__ = Buffer.prototype
		  } else {
		    // Fallback: Return an object instance of the Buffer class
		    that = fromArrayLike(that, array)
		  }
		  return that
		}

		function fromObject (that, obj) {
		  if (Buffer.isBuffer(obj)) {
		    var len = checked(obj.length) | 0
		    that = createBuffer(that, len)

		    if (that.length === 0) {
		      return that
		    }

		    obj.copy(that, 0, 0, len)
		    return that
		  }

		  if (obj) {
		    if ((typeof ArrayBuffer !== 'undefined' &&
		        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
		      if (typeof obj.length !== 'number' || isnan(obj.length)) {
		        return createBuffer(that, 0)
		      }
		      return fromArrayLike(that, obj)
		    }

		    if (obj.type === 'Buffer' && isArray(obj.data)) {
		      return fromArrayLike(that, obj.data)
		    }
		  }

		  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
		}

		function checked (length) {
		  // Note: cannot use `length < kMaxLength()` here because that fails when
		  // length is NaN (which is otherwise coerced to zero.)
		  if (length >= kMaxLength()) {
		    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
		                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
		  }
		  return length | 0
		}

		function SlowBuffer (length) {
		  if (+length != length) { // eslint-disable-line eqeqeq
		    length = 0
		  }
		  return Buffer.alloc(+length)
		}

		Buffer.isBuffer = function isBuffer (b) {
		  return !!(b != null && b._isBuffer)
		}

		Buffer.compare = function compare (a, b) {
		  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
		    throw new TypeError('Arguments must be Buffers')
		  }

		  if (a === b) return 0

		  var x = a.length
		  var y = b.length

		  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
		    if (a[i] !== b[i]) {
		      x = a[i]
		      y = b[i]
		      break
		    }
		  }

		  if (x < y) return -1
		  if (y < x) return 1
		  return 0
		}

		Buffer.isEncoding = function isEncoding (encoding) {
		  switch (String(encoding).toLowerCase()) {
		    case 'hex':
		    case 'utf8':
		    case 'utf-8':
		    case 'ascii':
		    case 'latin1':
		    case 'binary':
		    case 'base64':
		    case 'ucs2':
		    case 'ucs-2':
		    case 'utf16le':
		    case 'utf-16le':
		      return true
		    default:
		      return false
		  }
		}

		Buffer.concat = function concat (list, length) {
		  if (!isArray(list)) {
		    throw new TypeError('"list" argument must be an Array of Buffers')
		  }

		  if (list.length === 0) {
		    return Buffer.alloc(0)
		  }

		  var i
		  if (length === undefined) {
		    length = 0
		    for (i = 0; i < list.length; ++i) {
		      length += list[i].length
		    }
		  }

		  var buffer = Buffer.allocUnsafe(length)
		  var pos = 0
		  for (i = 0; i < list.length; ++i) {
		    var buf = list[i]
		    if (!Buffer.isBuffer(buf)) {
		      throw new TypeError('"list" argument must be an Array of Buffers')
		    }
		    buf.copy(buffer, pos)
		    pos += buf.length
		  }
		  return buffer
		}

		function byteLength (string, encoding) {
		  if (Buffer.isBuffer(string)) {
		    return string.length
		  }
		  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
		      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
		    return string.byteLength
		  }
		  if (typeof string !== 'string') {
		    string = '' + string
		  }

		  var len = string.length
		  if (len === 0) return 0

		  // Use a for loop to avoid recursion
		  var loweredCase = false
		  for (;;) {
		    switch (encoding) {
		      case 'ascii':
		      case 'latin1':
		      case 'binary':
		        return len
		      case 'utf8':
		      case 'utf-8':
		      case undefined:
		        return utf8ToBytes(string).length
		      case 'ucs2':
		      case 'ucs-2':
		      case 'utf16le':
		      case 'utf-16le':
		        return len * 2
		      case 'hex':
		        return len >>> 1
		      case 'base64':
		        return base64ToBytes(string).length
		      default:
		        if (loweredCase) return utf8ToBytes(string).length // assume utf8
		        encoding = ('' + encoding).toLowerCase()
		        loweredCase = true
		    }
		  }
		}
		Buffer.byteLength = byteLength

		function slowToString (encoding, start, end) {
		  var loweredCase = false

		  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
		  // property of a typed array.

		  // This behaves neither like String nor Uint8Array in that we set start/end
		  // to their upper/lower bounds if the value passed is out of range.
		  // undefined is handled specially as per ECMA-262 6th Edition,
		  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
		  if (start === undefined || start < 0) {
		    start = 0
		  }
		  // Return early if start > this.length. Done here to prevent potential uint32
		  // coercion fail below.
		  if (start > this.length) {
		    return ''
		  }

		  if (end === undefined || end > this.length) {
		    end = this.length
		  }

		  if (end <= 0) {
		    return ''
		  }

		  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
		  end >>>= 0
		  start >>>= 0

		  if (end <= start) {
		    return ''
		  }

		  if (!encoding) encoding = 'utf8'

		  while (true) {
		    switch (encoding) {
		      case 'hex':
		        return hexSlice(this, start, end)

		      case 'utf8':
		      case 'utf-8':
		        return utf8Slice(this, start, end)

		      case 'ascii':
		        return asciiSlice(this, start, end)

		      case 'latin1':
		      case 'binary':
		        return latin1Slice(this, start, end)

		      case 'base64':
		        return base64Slice(this, start, end)

		      case 'ucs2':
		      case 'ucs-2':
		      case 'utf16le':
		      case 'utf-16le':
		        return utf16leSlice(this, start, end)

		      default:
		        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
		        encoding = (encoding + '').toLowerCase()
		        loweredCase = true
		    }
		  }
		}

		// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
		// Buffer instances.
		Buffer.prototype._isBuffer = true

		function swap (b, n, m) {
		  var i = b[n]
		  b[n] = b[m]
		  b[m] = i
		}

		Buffer.prototype.swap16 = function swap16 () {
		  var len = this.length
		  if (len % 2 !== 0) {
		    throw new RangeError('Buffer size must be a multiple of 16-bits')
		  }
		  for (var i = 0; i < len; i += 2) {
		    swap(this, i, i + 1)
		  }
		  return this
		}

		Buffer.prototype.swap32 = function swap32 () {
		  var len = this.length
		  if (len % 4 !== 0) {
		    throw new RangeError('Buffer size must be a multiple of 32-bits')
		  }
		  for (var i = 0; i < len; i += 4) {
		    swap(this, i, i + 3)
		    swap(this, i + 1, i + 2)
		  }
		  return this
		}

		Buffer.prototype.swap64 = function swap64 () {
		  var len = this.length
		  if (len % 8 !== 0) {
		    throw new RangeError('Buffer size must be a multiple of 64-bits')
		  }
		  for (var i = 0; i < len; i += 8) {
		    swap(this, i, i + 7)
		    swap(this, i + 1, i + 6)
		    swap(this, i + 2, i + 5)
		    swap(this, i + 3, i + 4)
		  }
		  return this
		}

		Buffer.prototype.toString = function toString () {
		  var length = this.length | 0
		  if (length === 0) return ''
		  if (arguments.length === 0) return utf8Slice(this, 0, length)
		  return slowToString.apply(this, arguments)
		}

		Buffer.prototype.equals = function equals (b) {
		  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
		  if (this === b) return true
		  return Buffer.compare(this, b) === 0
		}

		Buffer.prototype.inspect = function inspect () {
		  var str = ''
		  var max = exports.INSPECT_MAX_BYTES
		  if (this.length > 0) {
		    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
		    if (this.length > max) str += ' ... '
		  }
		  return '<Buffer ' + str + '>'
		}

		Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
		  if (!Buffer.isBuffer(target)) {
		    throw new TypeError('Argument must be a Buffer')
		  }

		  if (start === undefined) {
		    start = 0
		  }
		  if (end === undefined) {
		    end = target ? target.length : 0
		  }
		  if (thisStart === undefined) {
		    thisStart = 0
		  }
		  if (thisEnd === undefined) {
		    thisEnd = this.length
		  }

		  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
		    throw new RangeError('out of range index')
		  }

		  if (thisStart >= thisEnd && start >= end) {
		    return 0
		  }
		  if (thisStart >= thisEnd) {
		    return -1
		  }
		  if (start >= end) {
		    return 1
		  }

		  start >>>= 0
		  end >>>= 0
		  thisStart >>>= 0
		  thisEnd >>>= 0

		  if (this === target) return 0

		  var x = thisEnd - thisStart
		  var y = end - start
		  var len = Math.min(x, y)

		  var thisCopy = this.slice(thisStart, thisEnd)
		  var targetCopy = target.slice(start, end)

		  for (var i = 0; i < len; ++i) {
		    if (thisCopy[i] !== targetCopy[i]) {
		      x = thisCopy[i]
		      y = targetCopy[i]
		      break
		    }
		  }

		  if (x < y) return -1
		  if (y < x) return 1
		  return 0
		}

		// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
		// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
		//
		// Arguments:
		// - buffer - a Buffer to search
		// - val - a string, Buffer, or number
		// - byteOffset - an index into `buffer`; will be clamped to an int32
		// - encoding - an optional encoding, relevant is val is a string
		// - dir - true for indexOf, false for lastIndexOf
		function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
		  // Empty buffer means no match
		  if (buffer.length === 0) return -1

		  // Normalize byteOffset
		  if (typeof byteOffset === 'string') {
		    encoding = byteOffset
		    byteOffset = 0
		  } else if (byteOffset > 0x7fffffff) {
		    byteOffset = 0x7fffffff
		  } else if (byteOffset < -0x80000000) {
		    byteOffset = -0x80000000
		  }
		  byteOffset = +byteOffset  // Coerce to Number.
		  if (isNaN(byteOffset)) {
		    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
		    byteOffset = dir ? 0 : (buffer.length - 1)
		  }

		  // Normalize byteOffset: negative offsets start from the end of the buffer
		  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
		  if (byteOffset >= buffer.length) {
		    if (dir) return -1
		    else byteOffset = buffer.length - 1
		  } else if (byteOffset < 0) {
		    if (dir) byteOffset = 0
		    else return -1
		  }

		  // Normalize val
		  if (typeof val === 'string') {
		    val = Buffer.from(val, encoding)
		  }

		  // Finally, search either indexOf (if dir is true) or lastIndexOf
		  if (Buffer.isBuffer(val)) {
		    // Special case: looking for empty string/buffer always fails
		    if (val.length === 0) {
		      return -1
		    }
		    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
		  } else if (typeof val === 'number') {
		    val = val & 0xFF // Search for a byte value [0-255]
		    if (Buffer.TYPED_ARRAY_SUPPORT &&
		        typeof Uint8Array.prototype.indexOf === 'function') {
		      if (dir) {
		        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
		      } else {
		        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
		      }
		    }
		    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
		  }

		  throw new TypeError('val must be string, number or Buffer')
		}

		function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
		  var indexSize = 1
		  var arrLength = arr.length
		  var valLength = val.length

		  if (encoding !== undefined) {
		    encoding = String(encoding).toLowerCase()
		    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
		        encoding === 'utf16le' || encoding === 'utf-16le') {
		      if (arr.length < 2 || val.length < 2) {
		        return -1
		      }
		      indexSize = 2
		      arrLength /= 2
		      valLength /= 2
		      byteOffset /= 2
		    }
		  }

		  function read (buf, i) {
		    if (indexSize === 1) {
		      return buf[i]
		    } else {
		      return buf.readUInt16BE(i * indexSize)
		    }
		  }

		  var i
		  if (dir) {
		    var foundIndex = -1
		    for (i = byteOffset; i < arrLength; i++) {
		      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
		        if (foundIndex === -1) foundIndex = i
		        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
		      } else {
		        if (foundIndex !== -1) i -= i - foundIndex
		        foundIndex = -1
		      }
		    }
		  } else {
		    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
		    for (i = byteOffset; i >= 0; i--) {
		      var found = true
		      for (var j = 0; j < valLength; j++) {
		        if (read(arr, i + j) !== read(val, j)) {
		          found = false
		          break
		        }
		      }
		      if (found) return i
		    }
		  }

		  return -1
		}

		Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
		  return this.indexOf(val, byteOffset, encoding) !== -1
		}

		Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
		  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
		}

		Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
		  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
		}

		function hexWrite (buf, string, offset, length) {
		  offset = Number(offset) || 0
		  var remaining = buf.length - offset
		  if (!length) {
		    length = remaining
		  } else {
		    length = Number(length)
		    if (length > remaining) {
		      length = remaining
		    }
		  }

		  // must be an even number of digits
		  var strLen = string.length
		  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

		  if (length > strLen / 2) {
		    length = strLen / 2
		  }
		  for (var i = 0; i < length; ++i) {
		    var parsed = parseInt(string.substr(i * 2, 2), 16)
		    if (isNaN(parsed)) return i
		    buf[offset + i] = parsed
		  }
		  return i
		}

		function utf8Write (buf, string, offset, length) {
		  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
		}

		function asciiWrite (buf, string, offset, length) {
		  return blitBuffer(asciiToBytes(string), buf, offset, length)
		}

		function latin1Write (buf, string, offset, length) {
		  return asciiWrite(buf, string, offset, length)
		}

		function base64Write (buf, string, offset, length) {
		  return blitBuffer(base64ToBytes(string), buf, offset, length)
		}

		function ucs2Write (buf, string, offset, length) {
		  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
		}

		Buffer.prototype.write = function write (string, offset, length, encoding) {
		  // Buffer#write(string)
		  if (offset === undefined) {
		    encoding = 'utf8'
		    length = this.length
		    offset = 0
		  // Buffer#write(string, encoding)
		  } else if (length === undefined && typeof offset === 'string') {
		    encoding = offset
		    length = this.length
		    offset = 0
		  // Buffer#write(string, offset[, length][, encoding])
		  } else if (isFinite(offset)) {
		    offset = offset | 0
		    if (isFinite(length)) {
		      length = length | 0
		      if (encoding === undefined) encoding = 'utf8'
		    } else {
		      encoding = length
		      length = undefined
		    }
		  // legacy write(string, encoding, offset, length) - remove in v0.13
		  } else {
		    throw new Error(
		      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
		    )
		  }

		  var remaining = this.length - offset
		  if (length === undefined || length > remaining) length = remaining

		  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
		    throw new RangeError('Attempt to write outside buffer bounds')
		  }

		  if (!encoding) encoding = 'utf8'

		  var loweredCase = false
		  for (;;) {
		    switch (encoding) {
		      case 'hex':
		        return hexWrite(this, string, offset, length)

		      case 'utf8':
		      case 'utf-8':
		        return utf8Write(this, string, offset, length)

		      case 'ascii':
		        return asciiWrite(this, string, offset, length)

		      case 'latin1':
		      case 'binary':
		        return latin1Write(this, string, offset, length)

		      case 'base64':
		        // Warning: maxLength not taken into account in base64Write
		        return base64Write(this, string, offset, length)

		      case 'ucs2':
		      case 'ucs-2':
		      case 'utf16le':
		      case 'utf-16le':
		        return ucs2Write(this, string, offset, length)

		      default:
		        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
		        encoding = ('' + encoding).toLowerCase()
		        loweredCase = true
		    }
		  }
		}

		Buffer.prototype.toJSON = function toJSON () {
		  return {
		    type: 'Buffer',
		    data: Array.prototype.slice.call(this._arr || this, 0)
		  }
		}

		function base64Slice (buf, start, end) {
		  if (start === 0 && end === buf.length) {
		    return base64.fromByteArray(buf)
		  } else {
		    return base64.fromByteArray(buf.slice(start, end))
		  }
		}

		function utf8Slice (buf, start, end) {
		  end = Math.min(buf.length, end)
		  var res = []

		  var i = start
		  while (i < end) {
		    var firstByte = buf[i]
		    var codePoint = null
		    var bytesPerSequence = (firstByte > 0xEF) ? 4
		      : (firstByte > 0xDF) ? 3
		      : (firstByte > 0xBF) ? 2
		      : 1

		    if (i + bytesPerSequence <= end) {
		      var secondByte, thirdByte, fourthByte, tempCodePoint

		      switch (bytesPerSequence) {
		        case 1:
		          if (firstByte < 0x80) {
		            codePoint = firstByte
		          }
		          break
		        case 2:
		          secondByte = buf[i + 1]
		          if ((secondByte & 0xC0) === 0x80) {
		            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
		            if (tempCodePoint > 0x7F) {
		              codePoint = tempCodePoint
		            }
		          }
		          break
		        case 3:
		          secondByte = buf[i + 1]
		          thirdByte = buf[i + 2]
		          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
		            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
		            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
		              codePoint = tempCodePoint
		            }
		          }
		          break
		        case 4:
		          secondByte = buf[i + 1]
		          thirdByte = buf[i + 2]
		          fourthByte = buf[i + 3]
		          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
		            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
		            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
		              codePoint = tempCodePoint
		            }
		          }
		      }
		    }

		    if (codePoint === null) {
		      // we did not generate a valid codePoint so insert a
		      // replacement char (U+FFFD) and advance only 1 byte
		      codePoint = 0xFFFD
		      bytesPerSequence = 1
		    } else if (codePoint > 0xFFFF) {
		      // encode to utf16 (surrogate pair dance)
		      codePoint -= 0x10000
		      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
		      codePoint = 0xDC00 | codePoint & 0x3FF
		    }

		    res.push(codePoint)
		    i += bytesPerSequence
		  }

		  return decodeCodePointsArray(res)
		}

		// Based on http://stackoverflow.com/a/22747272/680742, the browser with
		// the lowest limit is Chrome, with 0x10000 args.
		// We go 1 magnitude less, for safety
		var MAX_ARGUMENTS_LENGTH = 0x1000

		function decodeCodePointsArray (codePoints) {
		  var len = codePoints.length
		  if (len <= MAX_ARGUMENTS_LENGTH) {
		    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
		  }

		  // Decode in chunks to avoid "call stack size exceeded".
		  var res = ''
		  var i = 0
		  while (i < len) {
		    res += String.fromCharCode.apply(
		      String,
		      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
		    )
		  }
		  return res
		}

		function asciiSlice (buf, start, end) {
		  var ret = ''
		  end = Math.min(buf.length, end)

		  for (var i = start; i < end; ++i) {
		    ret += String.fromCharCode(buf[i] & 0x7F)
		  }
		  return ret
		}

		function latin1Slice (buf, start, end) {
		  var ret = ''
		  end = Math.min(buf.length, end)

		  for (var i = start; i < end; ++i) {
		    ret += String.fromCharCode(buf[i])
		  }
		  return ret
		}

		function hexSlice (buf, start, end) {
		  var len = buf.length

		  if (!start || start < 0) start = 0
		  if (!end || end < 0 || end > len) end = len

		  var out = ''
		  for (var i = start; i < end; ++i) {
		    out += toHex(buf[i])
		  }
		  return out
		}

		function utf16leSlice (buf, start, end) {
		  var bytes = buf.slice(start, end)
		  var res = ''
		  for (var i = 0; i < bytes.length; i += 2) {
		    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
		  }
		  return res
		}

		Buffer.prototype.slice = function slice (start, end) {
		  var len = this.length
		  start = ~~start
		  end = end === undefined ? len : ~~end

		  if (start < 0) {
		    start += len
		    if (start < 0) start = 0
		  } else if (start > len) {
		    start = len
		  }

		  if (end < 0) {
		    end += len
		    if (end < 0) end = 0
		  } else if (end > len) {
		    end = len
		  }

		  if (end < start) end = start

		  var newBuf
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    newBuf = this.subarray(start, end)
		    newBuf.__proto__ = Buffer.prototype
		  } else {
		    var sliceLen = end - start
		    newBuf = new Buffer(sliceLen, undefined)
		    for (var i = 0; i < sliceLen; ++i) {
		      newBuf[i] = this[i + start]
		    }
		  }

		  return newBuf
		}

		/*
		 * Need to make sure that buffer isn't trying to write out of bounds.
		 */
		function checkOffset (offset, ext, length) {
		  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
		  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
		}

		Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
		  offset = offset | 0
		  byteLength = byteLength | 0
		  if (!noAssert) checkOffset(offset, byteLength, this.length)

		  var val = this[offset]
		  var mul = 1
		  var i = 0
		  while (++i < byteLength && (mul *= 0x100)) {
		    val += this[offset + i] * mul
		  }

		  return val
		}

		Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
		  offset = offset | 0
		  byteLength = byteLength | 0
		  if (!noAssert) {
		    checkOffset(offset, byteLength, this.length)
		  }

		  var val = this[offset + --byteLength]
		  var mul = 1
		  while (byteLength > 0 && (mul *= 0x100)) {
		    val += this[offset + --byteLength] * mul
		  }

		  return val
		}

		Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 1, this.length)
		  return this[offset]
		}

		Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length)
		  return this[offset] | (this[offset + 1] << 8)
		}

		Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length)
		  return (this[offset] << 8) | this[offset + 1]
		}

		Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length)

		  return ((this[offset]) |
		      (this[offset + 1] << 8) |
		      (this[offset + 2] << 16)) +
		      (this[offset + 3] * 0x1000000)
		}

		Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length)

		  return (this[offset] * 0x1000000) +
		    ((this[offset + 1] << 16) |
		    (this[offset + 2] << 8) |
		    this[offset + 3])
		}

		Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
		  offset = offset | 0
		  byteLength = byteLength | 0
		  if (!noAssert) checkOffset(offset, byteLength, this.length)

		  var val = this[offset]
		  var mul = 1
		  var i = 0
		  while (++i < byteLength && (mul *= 0x100)) {
		    val += this[offset + i] * mul
		  }
		  mul *= 0x80

		  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

		  return val
		}

		Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
		  offset = offset | 0
		  byteLength = byteLength | 0
		  if (!noAssert) checkOffset(offset, byteLength, this.length)

		  var i = byteLength
		  var mul = 1
		  var val = this[offset + --i]
		  while (i > 0 && (mul *= 0x100)) {
		    val += this[offset + --i] * mul
		  }
		  mul *= 0x80

		  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

		  return val
		}

		Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 1, this.length)
		  if (!(this[offset] & 0x80)) return (this[offset])
		  return ((0xff - this[offset] + 1) * -1)
		}

		Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length)
		  var val = this[offset] | (this[offset + 1] << 8)
		  return (val & 0x8000) ? val | 0xFFFF0000 : val
		}

		Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length)
		  var val = this[offset + 1] | (this[offset] << 8)
		  return (val & 0x8000) ? val | 0xFFFF0000 : val
		}

		Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length)

		  return (this[offset]) |
		    (this[offset + 1] << 8) |
		    (this[offset + 2] << 16) |
		    (this[offset + 3] << 24)
		}

		Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length)

		  return (this[offset] << 24) |
		    (this[offset + 1] << 16) |
		    (this[offset + 2] << 8) |
		    (this[offset + 3])
		}

		Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length)
		  return ieee754.read(this, offset, true, 23, 4)
		}

		Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length)
		  return ieee754.read(this, offset, false, 23, 4)
		}

		Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 8, this.length)
		  return ieee754.read(this, offset, true, 52, 8)
		}

		Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 8, this.length)
		  return ieee754.read(this, offset, false, 52, 8)
		}

		function checkInt (buf, value, offset, ext, max, min) {
		  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
		  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
		  if (offset + ext > buf.length) throw new RangeError('Index out of range')
		}

		Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
		  value = +value
		  offset = offset | 0
		  byteLength = byteLength | 0
		  if (!noAssert) {
		    var maxBytes = Math.pow(2, 8 * byteLength) - 1
		    checkInt(this, value, offset, byteLength, maxBytes, 0)
		  }

		  var mul = 1
		  var i = 0
		  this[offset] = value & 0xFF
		  while (++i < byteLength && (mul *= 0x100)) {
		    this[offset + i] = (value / mul) & 0xFF
		  }

		  return offset + byteLength
		}

		Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
		  value = +value
		  offset = offset | 0
		  byteLength = byteLength | 0
		  if (!noAssert) {
		    var maxBytes = Math.pow(2, 8 * byteLength) - 1
		    checkInt(this, value, offset, byteLength, maxBytes, 0)
		  }

		  var i = byteLength - 1
		  var mul = 1
		  this[offset + i] = value & 0xFF
		  while (--i >= 0 && (mul *= 0x100)) {
		    this[offset + i] = (value / mul) & 0xFF
		  }

		  return offset + byteLength
		}

		Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
		  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
		  this[offset] = (value & 0xff)
		  return offset + 1
		}

		function objectWriteUInt16 (buf, value, offset, littleEndian) {
		  if (value < 0) value = 0xffff + value + 1
		  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
		    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
		      (littleEndian ? i : 1 - i) * 8
		  }
		}

		Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value & 0xff)
		    this[offset + 1] = (value >>> 8)
		  } else {
		    objectWriteUInt16(this, value, offset, true)
		  }
		  return offset + 2
		}

		Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 8)
		    this[offset + 1] = (value & 0xff)
		  } else {
		    objectWriteUInt16(this, value, offset, false)
		  }
		  return offset + 2
		}

		function objectWriteUInt32 (buf, value, offset, littleEndian) {
		  if (value < 0) value = 0xffffffff + value + 1
		  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
		    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
		  }
		}

		Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset + 3] = (value >>> 24)
		    this[offset + 2] = (value >>> 16)
		    this[offset + 1] = (value >>> 8)
		    this[offset] = (value & 0xff)
		  } else {
		    objectWriteUInt32(this, value, offset, true)
		  }
		  return offset + 4
		}

		Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 24)
		    this[offset + 1] = (value >>> 16)
		    this[offset + 2] = (value >>> 8)
		    this[offset + 3] = (value & 0xff)
		  } else {
		    objectWriteUInt32(this, value, offset, false)
		  }
		  return offset + 4
		}

		Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) {
		    var limit = Math.pow(2, 8 * byteLength - 1)

		    checkInt(this, value, offset, byteLength, limit - 1, -limit)
		  }

		  var i = 0
		  var mul = 1
		  var sub = 0
		  this[offset] = value & 0xFF
		  while (++i < byteLength && (mul *= 0x100)) {
		    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
		      sub = 1
		    }
		    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
		  }

		  return offset + byteLength
		}

		Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) {
		    var limit = Math.pow(2, 8 * byteLength - 1)

		    checkInt(this, value, offset, byteLength, limit - 1, -limit)
		  }

		  var i = byteLength - 1
		  var mul = 1
		  var sub = 0
		  this[offset + i] = value & 0xFF
		  while (--i >= 0 && (mul *= 0x100)) {
		    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
		      sub = 1
		    }
		    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
		  }

		  return offset + byteLength
		}

		Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
		  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
		  if (value < 0) value = 0xff + value + 1
		  this[offset] = (value & 0xff)
		  return offset + 1
		}

		Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value & 0xff)
		    this[offset + 1] = (value >>> 8)
		  } else {
		    objectWriteUInt16(this, value, offset, true)
		  }
		  return offset + 2
		}

		Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 8)
		    this[offset + 1] = (value & 0xff)
		  } else {
		    objectWriteUInt16(this, value, offset, false)
		  }
		  return offset + 2
		}

		Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value & 0xff)
		    this[offset + 1] = (value >>> 8)
		    this[offset + 2] = (value >>> 16)
		    this[offset + 3] = (value >>> 24)
		  } else {
		    objectWriteUInt32(this, value, offset, true)
		  }
		  return offset + 4
		}

		Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
		  value = +value
		  offset = offset | 0
		  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
		  if (value < 0) value = 0xffffffff + value + 1
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 24)
		    this[offset + 1] = (value >>> 16)
		    this[offset + 2] = (value >>> 8)
		    this[offset + 3] = (value & 0xff)
		  } else {
		    objectWriteUInt32(this, value, offset, false)
		  }
		  return offset + 4
		}

		function checkIEEE754 (buf, value, offset, ext, max, min) {
		  if (offset + ext > buf.length) throw new RangeError('Index out of range')
		  if (offset < 0) throw new RangeError('Index out of range')
		}

		function writeFloat (buf, value, offset, littleEndian, noAssert) {
		  if (!noAssert) {
		    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
		  }
		  ieee754.write(buf, value, offset, littleEndian, 23, 4)
		  return offset + 4
		}

		Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
		  return writeFloat(this, value, offset, true, noAssert)
		}

		Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
		  return writeFloat(this, value, offset, false, noAssert)
		}

		function writeDouble (buf, value, offset, littleEndian, noAssert) {
		  if (!noAssert) {
		    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
		  }
		  ieee754.write(buf, value, offset, littleEndian, 52, 8)
		  return offset + 8
		}

		Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
		  return writeDouble(this, value, offset, true, noAssert)
		}

		Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
		  return writeDouble(this, value, offset, false, noAssert)
		}

		// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
		Buffer.prototype.copy = function copy (target, targetStart, start, end) {
		  if (!start) start = 0
		  if (!end && end !== 0) end = this.length
		  if (targetStart >= target.length) targetStart = target.length
		  if (!targetStart) targetStart = 0
		  if (end > 0 && end < start) end = start

		  // Copy 0 bytes; we're done
		  if (end === start) return 0
		  if (target.length === 0 || this.length === 0) return 0

		  // Fatal error conditions
		  if (targetStart < 0) {
		    throw new RangeError('targetStart out of bounds')
		  }
		  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
		  if (end < 0) throw new RangeError('sourceEnd out of bounds')

		  // Are we oob?
		  if (end > this.length) end = this.length
		  if (target.length - targetStart < end - start) {
		    end = target.length - targetStart + start
		  }

		  var len = end - start
		  var i

		  if (this === target && start < targetStart && targetStart < end) {
		    // descending copy from end
		    for (i = len - 1; i >= 0; --i) {
		      target[i + targetStart] = this[i + start]
		    }
		  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
		    // ascending copy from start
		    for (i = 0; i < len; ++i) {
		      target[i + targetStart] = this[i + start]
		    }
		  } else {
		    Uint8Array.prototype.set.call(
		      target,
		      this.subarray(start, start + len),
		      targetStart
		    )
		  }

		  return len
		}

		// Usage:
		//    buffer.fill(number[, offset[, end]])
		//    buffer.fill(buffer[, offset[, end]])
		//    buffer.fill(string[, offset[, end]][, encoding])
		Buffer.prototype.fill = function fill (val, start, end, encoding) {
		  // Handle string cases:
		  if (typeof val === 'string') {
		    if (typeof start === 'string') {
		      encoding = start
		      start = 0
		      end = this.length
		    } else if (typeof end === 'string') {
		      encoding = end
		      end = this.length
		    }
		    if (val.length === 1) {
		      var code = val.charCodeAt(0)
		      if (code < 256) {
		        val = code
		      }
		    }
		    if (encoding !== undefined && typeof encoding !== 'string') {
		      throw new TypeError('encoding must be a string')
		    }
		    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
		      throw new TypeError('Unknown encoding: ' + encoding)
		    }
		  } else if (typeof val === 'number') {
		    val = val & 255
		  }

		  // Invalid ranges are not set to a default, so can range check early.
		  if (start < 0 || this.length < start || this.length < end) {
		    throw new RangeError('Out of range index')
		  }

		  if (end <= start) {
		    return this
		  }

		  start = start >>> 0
		  end = end === undefined ? this.length : end >>> 0

		  if (!val) val = 0

		  var i
		  if (typeof val === 'number') {
		    for (i = start; i < end; ++i) {
		      this[i] = val
		    }
		  } else {
		    var bytes = Buffer.isBuffer(val)
		      ? val
		      : utf8ToBytes(new Buffer(val, encoding).toString())
		    var len = bytes.length
		    for (i = 0; i < end - start; ++i) {
		      this[i + start] = bytes[i % len]
		    }
		  }

		  return this
		}

		// HELPER FUNCTIONS
		// ================

		var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

		function base64clean (str) {
		  // Node strips out invalid characters like \n and \t from the string, base64-js does not
		  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
		  // Node converts strings with length < 2 to ''
		  if (str.length < 2) return ''
		  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
		  while (str.length % 4 !== 0) {
		    str = str + '='
		  }
		  return str
		}

		function stringtrim (str) {
		  if (str.trim) return str.trim()
		  return str.replace(/^\s+|\s+$/g, '')
		}

		function toHex (n) {
		  if (n < 16) return '0' + n.toString(16)
		  return n.toString(16)
		}

		function utf8ToBytes (string, units) {
		  units = units || Infinity
		  var codePoint
		  var length = string.length
		  var leadSurrogate = null
		  var bytes = []

		  for (var i = 0; i < length; ++i) {
		    codePoint = string.charCodeAt(i)

		    // is surrogate component
		    if (codePoint > 0xD7FF && codePoint < 0xE000) {
		      // last char was a lead
		      if (!leadSurrogate) {
		        // no lead yet
		        if (codePoint > 0xDBFF) {
		          // unexpected trail
		          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
		          continue
		        } else if (i + 1 === length) {
		          // unpaired lead
		          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
		          continue
		        }

		        // valid lead
		        leadSurrogate = codePoint

		        continue
		      }

		      // 2 leads in a row
		      if (codePoint < 0xDC00) {
		        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
		        leadSurrogate = codePoint
		        continue
		      }

		      // valid surrogate pair
		      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
		    } else if (leadSurrogate) {
		      // valid bmp char, but last char was a lead
		      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
		    }

		    leadSurrogate = null

		    // encode utf8
		    if (codePoint < 0x80) {
		      if ((units -= 1) < 0) break
		      bytes.push(codePoint)
		    } else if (codePoint < 0x800) {
		      if ((units -= 2) < 0) break
		      bytes.push(
		        codePoint >> 0x6 | 0xC0,
		        codePoint & 0x3F | 0x80
		      )
		    } else if (codePoint < 0x10000) {
		      if ((units -= 3) < 0) break
		      bytes.push(
		        codePoint >> 0xC | 0xE0,
		        codePoint >> 0x6 & 0x3F | 0x80,
		        codePoint & 0x3F | 0x80
		      )
		    } else if (codePoint < 0x110000) {
		      if ((units -= 4) < 0) break
		      bytes.push(
		        codePoint >> 0x12 | 0xF0,
		        codePoint >> 0xC & 0x3F | 0x80,
		        codePoint >> 0x6 & 0x3F | 0x80,
		        codePoint & 0x3F | 0x80
		      )
		    } else {
		      throw new Error('Invalid code point')
		    }
		  }

		  return bytes
		}

		function asciiToBytes (str) {
		  var byteArray = []
		  for (var i = 0; i < str.length; ++i) {
		    // Node's code seems to be doing this and not & 0x7F..
		    byteArray.push(str.charCodeAt(i) & 0xFF)
		  }
		  return byteArray
		}

		function utf16leToBytes (str, units) {
		  var c, hi, lo
		  var byteArray = []
		  for (var i = 0; i < str.length; ++i) {
		    if ((units -= 2) < 0) break

		    c = str.charCodeAt(i)
		    hi = c >> 8
		    lo = c % 256
		    byteArray.push(lo)
		    byteArray.push(hi)
		  }

		  return byteArray
		}

		function base64ToBytes (str) {
		  return base64.toByteArray(base64clean(str))
		}

		function blitBuffer (src, dst, offset, length) {
		  for (var i = 0; i < length; ++i) {
		    if ((i + offset >= dst.length) || (i >= src.length)) break
		    dst[i + offset] = src[i]
		  }
		  return i
		}

		function isnan (val) {
		  return val !== val // eslint-disable-line no-self-compare
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer, (function() { return this; }())))

	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		// NOTE: These type checking functions intentionally don't use `instanceof`
		// because it is fragile and can be easily faked with `Object.create()`.

		function isArray(arg) {
		  if (Array.isArray) {
		    return Array.isArray(arg);
		  }
		  return objectToString(arg) === '[object Array]';
		}
		exports.isArray = isArray;

		function isBoolean(arg) {
		  return typeof arg === 'boolean';
		}
		exports.isBoolean = isBoolean;

		function isNull(arg) {
		  return arg === null;
		}
		exports.isNull = isNull;

		function isNullOrUndefined(arg) {
		  return arg == null;
		}
		exports.isNullOrUndefined = isNullOrUndefined;

		function isNumber(arg) {
		  return typeof arg === 'number';
		}
		exports.isNumber = isNumber;

		function isString(arg) {
		  return typeof arg === 'string';
		}
		exports.isString = isString;

		function isSymbol(arg) {
		  return typeof arg === 'symbol';
		}
		exports.isSymbol = isSymbol;

		function isUndefined(arg) {
		  return arg === void 0;
		}
		exports.isUndefined = isUndefined;

		function isRegExp(re) {
		  return objectToString(re) === '[object RegExp]';
		}
		exports.isRegExp = isRegExp;

		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}
		exports.isObject = isObject;

		function isDate(d) {
		  return objectToString(d) === '[object Date]';
		}
		exports.isDate = isDate;

		function isError(e) {
		  return (objectToString(e) === '[object Error]' || e instanceof Error);
		}
		exports.isError = isError;

		function isFunction(arg) {
		  return typeof arg === 'function';
		}
		exports.isFunction = isFunction;

		function isPrimitive(arg) {
		  return arg === null ||
		         typeof arg === 'boolean' ||
		         typeof arg === 'number' ||
		         typeof arg === 'string' ||
		         typeof arg === 'symbol' ||  // ES6 symbol
		         typeof arg === 'undefined';
		}
		exports.isPrimitive = isPrimitive;

		exports.isBuffer = Buffer.isBuffer;

		function objectToString(o) {
		  return Object.prototype.toString.call(o);
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		module.exports = Stream;

		var EE = __webpack_require__(7).EventEmitter;
		var inherits = __webpack_require__(3);

		inherits(Stream, EE);
		Stream.Readable = __webpack_require__(38);
		Stream.Writable = __webpack_require__(40);
		Stream.Duplex = __webpack_require__(36);
		Stream.Transform = __webpack_require__(39);
		Stream.PassThrough = __webpack_require__(37);

		// Backwards-compat with node 0.4.x
		Stream.Stream = Stream;



		// old-style streams.  Note that the pipe method (the only relevant
		// part of this class) is overridden in the Readable class.

		function Stream() {
		  EE.call(this);
		}

		Stream.prototype.pipe = function(dest, options) {
		  var source = this;

		  function ondata(chunk) {
		    if (dest.writable) {
		      if (false === dest.write(chunk) && source.pause) {
		        source.pause();
		      }
		    }
		  }

		  source.on('data', ondata);

		  function ondrain() {
		    if (source.readable && source.resume) {
		      source.resume();
		    }
		  }

		  dest.on('drain', ondrain);

		  // If the 'end' option is not supplied, dest.end() will be called when
		  // source gets the 'end' or 'close' events.  Only dest.end() once.
		  if (!dest._isStdio && (!options || options.end !== false)) {
		    source.on('end', onend);
		    source.on('close', onclose);
		  }

		  var didOnEnd = false;
		  function onend() {
		    if (didOnEnd) return;
		    didOnEnd = true;

		    dest.end();
		  }


		  function onclose() {
		    if (didOnEnd) return;
		    didOnEnd = true;

		    if (typeof dest.destroy === 'function') dest.destroy();
		  }

		  // don't leave dangling pipes when there are errors.
		  function onerror(er) {
		    cleanup();
		    if (EE.listenerCount(this, 'error') === 0) {
		      throw er; // Unhandled stream error in pipe.
		    }
		  }

		  source.on('error', onerror);
		  dest.on('error', onerror);

		  // remove all the event listeners that were added.
		  function cleanup() {
		    source.removeListener('data', ondata);
		    dest.removeListener('drain', ondrain);

		    source.removeListener('end', onend);
		    source.removeListener('close', onclose);

		    source.removeListener('error', onerror);
		    dest.removeListener('error', onerror);

		    source.removeListener('end', cleanup);
		    source.removeListener('close', cleanup);

		    dest.removeListener('close', cleanup);
		  }

		  source.on('end', cleanup);
		  source.on('close', cleanup);

		  dest.on('close', cleanup);

		  dest.emit('pipe', source);

		  // Allow for unix-like usage: A.pipe(B).pipe(C)
		  return dest;
		};


	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		function EventEmitter() {
		  this._events = this._events || {};
		  this._maxListeners = this._maxListeners || undefined;
		}
		module.exports = EventEmitter;

		// Backwards-compat with node 0.10.x
		EventEmitter.EventEmitter = EventEmitter;

		EventEmitter.prototype._events = undefined;
		EventEmitter.prototype._maxListeners = undefined;

		// By default EventEmitters will print a warning if more than 10 listeners are
		// added to it. This is a useful default which helps finding memory leaks.
		EventEmitter.defaultMaxListeners = 10;

		// Obviously not all Emitters should be limited to 10. This function allows
		// that to be increased. Set to zero for unlimited.
		EventEmitter.prototype.setMaxListeners = function(n) {
		  if (!isNumber(n) || n < 0 || isNaN(n))
		    throw TypeError('n must be a positive number');
		  this._maxListeners = n;
		  return this;
		};

		EventEmitter.prototype.emit = function(type) {
		  var er, handler, len, args, i, listeners;

		  if (!this._events)
		    this._events = {};

		  // If there is no 'error' event listener then throw.
		  if (type === 'error') {
		    if (!this._events.error ||
		        (isObject(this._events.error) && !this._events.error.length)) {
		      er = arguments[1];
		      if (er instanceof Error) {
		        throw er; // Unhandled 'error' event
		      } else {
		        // At least give some kind of context to the user
		        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
		        err.context = er;
		        throw err;
		      }
		    }
		  }

		  handler = this._events[type];

		  if (isUndefined(handler))
		    return false;

		  if (isFunction(handler)) {
		    switch (arguments.length) {
		      // fast cases
		      case 1:
		        handler.call(this);
		        break;
		      case 2:
		        handler.call(this, arguments[1]);
		        break;
		      case 3:
		        handler.call(this, arguments[1], arguments[2]);
		        break;
		      // slower
		      default:
		        args = Array.prototype.slice.call(arguments, 1);
		        handler.apply(this, args);
		    }
		  } else if (isObject(handler)) {
		    args = Array.prototype.slice.call(arguments, 1);
		    listeners = handler.slice();
		    len = listeners.length;
		    for (i = 0; i < len; i++)
		      listeners[i].apply(this, args);
		  }

		  return true;
		};

		EventEmitter.prototype.addListener = function(type, listener) {
		  var m;

		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');

		  if (!this._events)
		    this._events = {};

		  // To avoid recursion in the case that type === "newListener"! Before
		  // adding it to the listeners, first emit "newListener".
		  if (this._events.newListener)
		    this.emit('newListener', type,
		              isFunction(listener.listener) ?
		              listener.listener : listener);

		  if (!this._events[type])
		    // Optimize the case of one listener. Don't need the extra array object.
		    this._events[type] = listener;
		  else if (isObject(this._events[type]))
		    // If we've already got an array, just append.
		    this._events[type].push(listener);
		  else
		    // Adding the second element, need to change to array.
		    this._events[type] = [this._events[type], listener];

		  // Check for listener leak
		  if (isObject(this._events[type]) && !this._events[type].warned) {
		    if (!isUndefined(this._maxListeners)) {
		      m = this._maxListeners;
		    } else {
		      m = EventEmitter.defaultMaxListeners;
		    }

		    if (m && m > 0 && this._events[type].length > m) {
		      this._events[type].warned = true;
		      console.error('(node) warning: possible EventEmitter memory ' +
		                    'leak detected. %d listeners added. ' +
		                    'Use emitter.setMaxListeners() to increase limit.',
		                    this._events[type].length);
		      if (typeof console.trace === 'function') {
		        // not supported in IE 10
		        console.trace();
		      }
		    }
		  }

		  return this;
		};

		EventEmitter.prototype.on = EventEmitter.prototype.addListener;

		EventEmitter.prototype.once = function(type, listener) {
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');

		  var fired = false;

		  function g() {
		    this.removeListener(type, g);

		    if (!fired) {
		      fired = true;
		      listener.apply(this, arguments);
		    }
		  }

		  g.listener = listener;
		  this.on(type, g);

		  return this;
		};

		// emits a 'removeListener' event iff the listener was removed
		EventEmitter.prototype.removeListener = function(type, listener) {
		  var list, position, length, i;

		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');

		  if (!this._events || !this._events[type])
		    return this;

		  list = this._events[type];
		  length = list.length;
		  position = -1;

		  if (list === listener ||
		      (isFunction(list.listener) && list.listener === listener)) {
		    delete this._events[type];
		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);

		  } else if (isObject(list)) {
		    for (i = length; i-- > 0;) {
		      if (list[i] === listener ||
		          (list[i].listener && list[i].listener === listener)) {
		        position = i;
		        break;
		      }
		    }

		    if (position < 0)
		      return this;

		    if (list.length === 1) {
		      list.length = 0;
		      delete this._events[type];
		    } else {
		      list.splice(position, 1);
		    }

		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);
		  }

		  return this;
		};

		EventEmitter.prototype.removeAllListeners = function(type) {
		  var key, listeners;

		  if (!this._events)
		    return this;

		  // not listening for removeListener, no need to emit
		  if (!this._events.removeListener) {
		    if (arguments.length === 0)
		      this._events = {};
		    else if (this._events[type])
		      delete this._events[type];
		    return this;
		  }

		  // emit removeListener for all listeners on all events
		  if (arguments.length === 0) {
		    for (key in this._events) {
		      if (key === 'removeListener') continue;
		      this.removeAllListeners(key);
		    }
		    this.removeAllListeners('removeListener');
		    this._events = {};
		    return this;
		  }

		  listeners = this._events[type];

		  if (isFunction(listeners)) {
		    this.removeListener(type, listeners);
		  } else if (listeners) {
		    // LIFO order
		    while (listeners.length)
		      this.removeListener(type, listeners[listeners.length - 1]);
		  }
		  delete this._events[type];

		  return this;
		};

		EventEmitter.prototype.listeners = function(type) {
		  var ret;
		  if (!this._events || !this._events[type])
		    ret = [];
		  else if (isFunction(this._events[type]))
		    ret = [this._events[type]];
		  else
		    ret = this._events[type].slice();
		  return ret;
		};

		EventEmitter.prototype.listenerCount = function(type) {
		  if (this._events) {
		    var evlistener = this._events[type];

		    if (isFunction(evlistener))
		      return 1;
		    else if (evlistener)
		      return evlistener.length;
		  }
		  return 0;
		};

		EventEmitter.listenerCount = function(emitter, type) {
		  return emitter.listenerCount(type);
		};

		function isFunction(arg) {
		  return typeof arg === 'function';
		}

		function isNumber(arg) {
		  return typeof arg === 'number';
		}

		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}

		function isUndefined(arg) {
		  return arg === void 0;
		}


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.


		// a transform stream is a readable/writable stream where you do
		// something with the data.  Sometimes it's called a "filter",
		// but that's not a great name for it, since that implies a thing where
		// some bits pass through, and others are simply ignored.  (That would
		// be a valid example of a transform, of course.)
		//
		// While the output is causally related to the input, it's not a
		// necessarily symmetric or synchronous transformation.  For example,
		// a zlib stream might take multiple plain-text writes(), and then
		// emit a single compressed chunk some time in the future.
		//
		// Here's how this works:
		//
		// The Transform stream has all the aspects of the readable and writable
		// stream classes.  When you write(chunk), that calls _write(chunk,cb)
		// internally, and returns false if there's a lot of pending writes
		// buffered up.  When you call read(), that calls _read(n) until
		// there's enough pending readable data buffered up.
		//
		// In a transform stream, the written data is placed in a buffer.  When
		// _read(n) is called, it transforms the queued up data, calling the
		// buffered _write cb's as it consumes chunks.  If consuming a single
		// written chunk would result in multiple output chunks, then the first
		// outputted bit calls the readcb, and subsequent chunks just go into
		// the read buffer, and will cause it to emit 'readable' if necessary.
		//
		// This way, back-pressure is actually determined by the reading side,
		// since _read has to be called to start processing a new chunk.  However,
		// a pathological inflate type of transform can cause excessive buffering
		// here.  For example, imagine a stream where every byte of input is
		// interpreted as an integer from 0-255, and then results in that many
		// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
		// 1kb of data being output.  In this case, you could write a very small
		// amount of input, and end up with a very large amount of output.  In
		// such a pathological inflating mechanism, there'd be no way to tell
		// the system to stop doing the transform.  A single 4MB write could
		// cause the system to run out of memory.
		//
		// However, even in such a pathological case, only a single written chunk
		// would be consumed, and then the rest would wait (un-transformed) until
		// the results of the previous transformed chunk were consumed.

		module.exports = Transform;

		var Duplex = __webpack_require__(2);

		/*<replacement>*/
		var util = __webpack_require__(5);
		util.inherits = __webpack_require__(3);
		/*</replacement>*/

		util.inherits(Transform, Duplex);


		function TransformState(options, stream) {
		  this.afterTransform = function(er, data) {
		    return afterTransform(stream, er, data);
		  };

		  this.needTransform = false;
		  this.transforming = false;
		  this.writecb = null;
		  this.writechunk = null;
		}

		function afterTransform(stream, er, data) {
		  var ts = stream._transformState;
		  ts.transforming = false;

		  var cb = ts.writecb;

		  if (!cb)
		    return stream.emit('error', new Error('no writecb in Transform class'));

		  ts.writechunk = null;
		  ts.writecb = null;

		  if (!util.isNullOrUndefined(data))
		    stream.push(data);

		  if (cb)
		    cb(er);

		  var rs = stream._readableState;
		  rs.reading = false;
		  if (rs.needReadable || rs.length < rs.highWaterMark) {
		    stream._read(rs.highWaterMark);
		  }
		}


		function Transform(options) {
		  if (!(this instanceof Transform))
		    return new Transform(options);

		  Duplex.call(this, options);

		  this._transformState = new TransformState(options, this);

		  // when the writable side finishes, then flush out anything remaining.
		  var stream = this;

		  // start out asking for a readable event once data is transformed.
		  this._readableState.needReadable = true;

		  // we have implemented the _read method, and done the other things
		  // that Readable wants before the first _read call, so unset the
		  // sync guard flag.
		  this._readableState.sync = false;

		  this.once('prefinish', function() {
		    if (util.isFunction(this._flush))
		      this._flush(function(er) {
		        done(stream, er);
		      });
		    else
		      done(stream);
		  });
		}

		Transform.prototype.push = function(chunk, encoding) {
		  this._transformState.needTransform = false;
		  return Duplex.prototype.push.call(this, chunk, encoding);
		};

		// This is the part where you do stuff!
		// override this function in implementation classes.
		// 'chunk' is an input chunk.
		//
		// Call `push(newChunk)` to pass along transformed output
		// to the readable side.  You may call 'push' zero or more times.
		//
		// Call `cb(err)` when you are done with this chunk.  If you pass
		// an error, then that'll put the hurt on the whole operation.  If you
		// never call cb(), then you'll never get another chunk.
		Transform.prototype._transform = function(chunk, encoding, cb) {
		  throw new Error('not implemented');
		};

		Transform.prototype._write = function(chunk, encoding, cb) {
		  var ts = this._transformState;
		  ts.writecb = cb;
		  ts.writechunk = chunk;
		  ts.writeencoding = encoding;
		  if (!ts.transforming) {
		    var rs = this._readableState;
		    if (ts.needTransform ||
		        rs.needReadable ||
		        rs.length < rs.highWaterMark)
		      this._read(rs.highWaterMark);
		  }
		};

		// Doesn't matter what the args are here.
		// _transform does all the work.
		// That we got here means that the readable side wants more data.
		Transform.prototype._read = function(n) {
		  var ts = this._transformState;

		  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
		    ts.transforming = true;
		    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		  } else {
		    // mark that we need a transform, so that any data that comes in
		    // will get processed, now that we've asked for it.
		    ts.needTransform = true;
		  }
		};


		function done(stream, er) {
		  if (er)
		    return stream.emit('error', er);

		  // if there's nothing in the write buffer, then that means
		  // that nothing more will ever be provided
		  var ws = stream._writableState;
		  var ts = stream._transformState;

		  if (ws.length)
		    throw new Error('calling transform done when ws.length != 0');

		  if (ts.transforming)
		    throw new Error('calling transform done when still transforming');

		  return stream.push(null);
		}


	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		// A bit simpler than readable streams.
		// Implement an async ._write(chunk, cb), and it'll handle all
		// the drain event emission and buffering.

		module.exports = Writable;

		/*<replacement>*/
		var Buffer = __webpack_require__(4).Buffer;
		/*</replacement>*/

		Writable.WritableState = WritableState;


		/*<replacement>*/
		var util = __webpack_require__(5);
		util.inherits = __webpack_require__(3);
		/*</replacement>*/

		var Stream = __webpack_require__(6);

		util.inherits(Writable, Stream);

		function WriteReq(chunk, encoding, cb) {
		  this.chunk = chunk;
		  this.encoding = encoding;
		  this.callback = cb;
		}

		function WritableState(options, stream) {
		  var Duplex = __webpack_require__(2);

		  options = options || {};

		  // the point at which write() starts returning false
		  // Note: 0 is a valid value, means that we always return false if
		  // the entire buffer is not flushed immediately on write()
		  var hwm = options.highWaterMark;
		  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
		  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

		  // object stream flag to indicate whether or not this stream
		  // contains buffers or objects.
		  this.objectMode = !!options.objectMode;

		  if (stream instanceof Duplex)
		    this.objectMode = this.objectMode || !!options.writableObjectMode;

		  // cast to ints.
		  this.highWaterMark = ~~this.highWaterMark;

		  this.needDrain = false;
		  // at the start of calling end()
		  this.ending = false;
		  // when end() has been called, and returned
		  this.ended = false;
		  // when 'finish' is emitted
		  this.finished = false;

		  // should we decode strings into buffers before passing to _write?
		  // this is here so that some node-core streams can optimize string
		  // handling at a lower level.
		  var noDecode = options.decodeStrings === false;
		  this.decodeStrings = !noDecode;

		  // Crypto is kind of old and crusty.  Historically, its default string
		  // encoding is 'binary' so we have to make this configurable.
		  // Everything else in the universe uses 'utf8', though.
		  this.defaultEncoding = options.defaultEncoding || 'utf8';

		  // not an actual buffer we keep track of, but a measurement
		  // of how much we're waiting to get pushed to some underlying
		  // socket or file.
		  this.length = 0;

		  // a flag to see when we're in the middle of a write.
		  this.writing = false;

		  // when true all writes will be buffered until .uncork() call
		  this.corked = 0;

		  // a flag to be able to tell if the onwrite cb is called immediately,
		  // or on a later tick.  We set this to true at first, because any
		  // actions that shouldn't happen until "later" should generally also
		  // not happen before the first write call.
		  this.sync = true;

		  // a flag to know if we're processing previously buffered items, which
		  // may call the _write() callback in the same tick, so that we don't
		  // end up in an overlapped onwrite situation.
		  this.bufferProcessing = false;

		  // the callback that's passed to _write(chunk,cb)
		  this.onwrite = function(er) {
		    onwrite(stream, er);
		  };

		  // the callback that the user supplies to write(chunk,encoding,cb)
		  this.writecb = null;

		  // the amount that is being written when _write is called.
		  this.writelen = 0;

		  this.buffer = [];

		  // number of pending user-supplied write callbacks
		  // this must be 0 before 'finish' can be emitted
		  this.pendingcb = 0;

		  // emit prefinish if the only thing we're waiting for is _write cbs
		  // This is relevant for synchronous Transform streams
		  this.prefinished = false;

		  // True if the error was already emitted and should not be thrown again
		  this.errorEmitted = false;
		}

		function Writable(options) {
		  var Duplex = __webpack_require__(2);

		  // Writable ctor is applied to Duplexes, though they're not
		  // instanceof Writable, they're instanceof Readable.
		  if (!(this instanceof Writable) && !(this instanceof Duplex))
		    return new Writable(options);

		  this._writableState = new WritableState(options, this);

		  // legacy.
		  this.writable = true;

		  Stream.call(this);
		}

		// Otherwise people can pipe Writable streams, which is just wrong.
		Writable.prototype.pipe = function() {
		  this.emit('error', new Error('Cannot pipe. Not readable.'));
		};


		function writeAfterEnd(stream, state, cb) {
		  var er = new Error('write after end');
		  // TODO: defer error events consistently everywhere, not just the cb
		  stream.emit('error', er);
		  process.nextTick(function() {
		    cb(er);
		  });
		}

		// If we get something that is not a buffer, string, null, or undefined,
		// and we're not in objectMode, then that's an error.
		// Otherwise stream chunks are all considered to be of length=1, and the
		// watermarks determine how many objects to keep in the buffer, rather than
		// how many bytes or characters.
		function validChunk(stream, state, chunk, cb) {
		  var valid = true;
		  if (!util.isBuffer(chunk) &&
		      !util.isString(chunk) &&
		      !util.isNullOrUndefined(chunk) &&
		      !state.objectMode) {
		    var er = new TypeError('Invalid non-string/buffer chunk');
		    stream.emit('error', er);
		    process.nextTick(function() {
		      cb(er);
		    });
		    valid = false;
		  }
		  return valid;
		}

		Writable.prototype.write = function(chunk, encoding, cb) {
		  var state = this._writableState;
		  var ret = false;

		  if (util.isFunction(encoding)) {
		    cb = encoding;
		    encoding = null;
		  }

		  if (util.isBuffer(chunk))
		    encoding = 'buffer';
		  else if (!encoding)
		    encoding = state.defaultEncoding;

		  if (!util.isFunction(cb))
		    cb = function() {};

		  if (state.ended)
		    writeAfterEnd(this, state, cb);
		  else if (validChunk(this, state, chunk, cb)) {
		    state.pendingcb++;
		    ret = writeOrBuffer(this, state, chunk, encoding, cb);
		  }

		  return ret;
		};

		Writable.prototype.cork = function() {
		  var state = this._writableState;

		  state.corked++;
		};

		Writable.prototype.uncork = function() {
		  var state = this._writableState;

		  if (state.corked) {
		    state.corked--;

		    if (!state.writing &&
		        !state.corked &&
		        !state.finished &&
		        !state.bufferProcessing &&
		        state.buffer.length)
		      clearBuffer(this, state);
		  }
		};

		function decodeChunk(state, chunk, encoding) {
		  if (!state.objectMode &&
		      state.decodeStrings !== false &&
		      util.isString(chunk)) {
		    chunk = new Buffer(chunk, encoding);
		  }
		  return chunk;
		}

		// if we're already writing something, then just put this
		// in the queue, and wait our turn.  Otherwise, call _write
		// If we return false, then we need a drain event, so set that flag.
		function writeOrBuffer(stream, state, chunk, encoding, cb) {
		  chunk = decodeChunk(state, chunk, encoding);
		  if (util.isBuffer(chunk))
		    encoding = 'buffer';
		  var len = state.objectMode ? 1 : chunk.length;

		  state.length += len;

		  var ret = state.length < state.highWaterMark;
		  // we must ensure that previous needDrain will not be reset to false.
		  if (!ret)
		    state.needDrain = true;

		  if (state.writing || state.corked)
		    state.buffer.push(new WriteReq(chunk, encoding, cb));
		  else
		    doWrite(stream, state, false, len, chunk, encoding, cb);

		  return ret;
		}

		function doWrite(stream, state, writev, len, chunk, encoding, cb) {
		  state.writelen = len;
		  state.writecb = cb;
		  state.writing = true;
		  state.sync = true;
		  if (writev)
		    stream._writev(chunk, state.onwrite);
		  else
		    stream._write(chunk, encoding, state.onwrite);
		  state.sync = false;
		}

		function onwriteError(stream, state, sync, er, cb) {
		  if (sync)
		    process.nextTick(function() {
		      state.pendingcb--;
		      cb(er);
		    });
		  else {
		    state.pendingcb--;
		    cb(er);
		  }

		  stream._writableState.errorEmitted = true;
		  stream.emit('error', er);
		}

		function onwriteStateUpdate(state) {
		  state.writing = false;
		  state.writecb = null;
		  state.length -= state.writelen;
		  state.writelen = 0;
		}

		function onwrite(stream, er) {
		  var state = stream._writableState;
		  var sync = state.sync;
		  var cb = state.writecb;

		  onwriteStateUpdate(state);

		  if (er)
		    onwriteError(stream, state, sync, er, cb);
		  else {
		    // Check if we're actually ready to finish, but don't emit yet
		    var finished = needFinish(stream, state);

		    if (!finished &&
		        !state.corked &&
		        !state.bufferProcessing &&
		        state.buffer.length) {
		      clearBuffer(stream, state);
		    }

		    if (sync) {
		      process.nextTick(function() {
		        afterWrite(stream, state, finished, cb);
		      });
		    } else {
		      afterWrite(stream, state, finished, cb);
		    }
		  }
		}

		function afterWrite(stream, state, finished, cb) {
		  if (!finished)
		    onwriteDrain(stream, state);
		  state.pendingcb--;
		  cb();
		  finishMaybe(stream, state);
		}

		// Must force callback to be called on nextTick, so that we don't
		// emit 'drain' before the write() consumer gets the 'false' return
		// value, and has a chance to attach a 'drain' listener.
		function onwriteDrain(stream, state) {
		  if (state.length === 0 && state.needDrain) {
		    state.needDrain = false;
		    stream.emit('drain');
		  }
		}


		// if there's something in the buffer waiting, then process it
		function clearBuffer(stream, state) {
		  state.bufferProcessing = true;

		  if (stream._writev && state.buffer.length > 1) {
		    // Fast case, write everything using _writev()
		    var cbs = [];
		    for (var c = 0; c < state.buffer.length; c++)
		      cbs.push(state.buffer[c].callback);

		    // count the one we are adding, as well.
		    // TODO(isaacs) clean this up
		    state.pendingcb++;
		    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
		      for (var i = 0; i < cbs.length; i++) {
		        state.pendingcb--;
		        cbs[i](err);
		      }
		    });

		    // Clear buffer
		    state.buffer = [];
		  } else {
		    // Slow case, write chunks one-by-one
		    for (var c = 0; c < state.buffer.length; c++) {
		      var entry = state.buffer[c];
		      var chunk = entry.chunk;
		      var encoding = entry.encoding;
		      var cb = entry.callback;
		      var len = state.objectMode ? 1 : chunk.length;

		      doWrite(stream, state, false, len, chunk, encoding, cb);

		      // if we didn't call the onwrite immediately, then
		      // it means that we need to wait until it does.
		      // also, that means that the chunk and cb are currently
		      // being processed, so move the buffer counter past them.
		      if (state.writing) {
		        c++;
		        break;
		      }
		    }

		    if (c < state.buffer.length)
		      state.buffer = state.buffer.slice(c);
		    else
		      state.buffer.length = 0;
		  }

		  state.bufferProcessing = false;
		}

		Writable.prototype._write = function(chunk, encoding, cb) {
		  cb(new Error('not implemented'));

		};

		Writable.prototype._writev = null;

		Writable.prototype.end = function(chunk, encoding, cb) {
		  var state = this._writableState;

		  if (util.isFunction(chunk)) {
		    cb = chunk;
		    chunk = null;
		    encoding = null;
		  } else if (util.isFunction(encoding)) {
		    cb = encoding;
		    encoding = null;
		  }

		  if (!util.isNullOrUndefined(chunk))
		    this.write(chunk, encoding);

		  // .end() fully uncorks
		  if (state.corked) {
		    state.corked = 1;
		    this.uncork();
		  }

		  // ignore unnecessary end() calls.
		  if (!state.ending && !state.finished)
		    endWritable(this, state, cb);
		};


		function needFinish(stream, state) {
		  return (state.ending &&
		          state.length === 0 &&
		          !state.finished &&
		          !state.writing);
		}

		function prefinish(stream, state) {
		  if (!state.prefinished) {
		    state.prefinished = true;
		    stream.emit('prefinish');
		  }
		}

		function finishMaybe(stream, state) {
		  var need = needFinish(stream, state);
		  if (need) {
		    if (state.pendingcb === 0) {
		      prefinish(stream, state);
		      state.finished = true;
		      stream.emit('finish');
		    } else
		      prefinish(stream, state);
		  }
		  return need;
		}

		function endWritable(stream, state, cb) {
		  state.ending = true;
		  finishMaybe(stream, state);
		  if (cb) {
		    if (state.finished)
		      process.nextTick(cb);
		    else
		      stream.once('finish', cb);
		  }
		  state.ended = true;
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		var formatRegExp = /%[sdj%]/g;
		exports.format = function(f) {
		  if (!isString(f)) {
		    var objects = [];
		    for (var i = 0; i < arguments.length; i++) {
		      objects.push(inspect(arguments[i]));
		    }
		    return objects.join(' ');
		  }

		  var i = 1;
		  var args = arguments;
		  var len = args.length;
		  var str = String(f).replace(formatRegExp, function(x) {
		    if (x === '%%') return '%';
		    if (i >= len) return x;
		    switch (x) {
		      case '%s': return String(args[i++]);
		      case '%d': return Number(args[i++]);
		      case '%j':
		        try {
		          return JSON.stringify(args[i++]);
		        } catch (_) {
		          return '[Circular]';
		        }
		      default:
		        return x;
		    }
		  });
		  for (var x = args[i]; i < len; x = args[++i]) {
		    if (isNull(x) || !isObject(x)) {
		      str += ' ' + x;
		    } else {
		      str += ' ' + inspect(x);
		    }
		  }
		  return str;
		};


		// Mark that a method should not be used.
		// Returns a modified function which warns once by default.
		// If --no-deprecation is set, then it is a no-op.
		exports.deprecate = function(fn, msg) {
		  // Allow for deprecating things in the process of starting up.
		  if (isUndefined(global.process)) {
		    return function() {
		      return exports.deprecate(fn, msg).apply(this, arguments);
		    };
		  }

		  if (process.noDeprecation === true) {
		    return fn;
		  }

		  var warned = false;
		  function deprecated() {
		    if (!warned) {
		      if (process.throwDeprecation) {
		        throw new Error(msg);
		      } else if (process.traceDeprecation) {
		        console.trace(msg);
		      } else {
		        console.error(msg);
		      }
		      warned = true;
		    }
		    return fn.apply(this, arguments);
		  }

		  return deprecated;
		};


		var debugs = {};
		var debugEnviron;
		exports.debuglog = function(set) {
		  if (isUndefined(debugEnviron))
		    debugEnviron = process.env.NODE_DEBUG || '';
		  set = set.toUpperCase();
		  if (!debugs[set]) {
		    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
		      var pid = process.pid;
		      debugs[set] = function() {
		        var msg = exports.format.apply(exports, arguments);
		        console.error('%s %d: %s', set, pid, msg);
		      };
		    } else {
		      debugs[set] = function() {};
		    }
		  }
		  return debugs[set];
		};


		/**
		 * Echos the value of a value. Trys to print the value out
		 * in the best way possible given the different types.
		 *
		 * @param {Object} obj The object to print out.
		 * @param {Object} opts Optional options object that alters the output.
		 */
		/* legacy: obj, showHidden, depth, colors*/
		function inspect(obj, opts) {
		  // default options
		  var ctx = {
		    seen: [],
		    stylize: stylizeNoColor
		  };
		  // legacy...
		  if (arguments.length >= 3) ctx.depth = arguments[2];
		  if (arguments.length >= 4) ctx.colors = arguments[3];
		  if (isBoolean(opts)) {
		    // legacy...
		    ctx.showHidden = opts;
		  } else if (opts) {
		    // got an "options" object
		    exports._extend(ctx, opts);
		  }
		  // set default options
		  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
		  if (isUndefined(ctx.depth)) ctx.depth = 2;
		  if (isUndefined(ctx.colors)) ctx.colors = false;
		  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
		  if (ctx.colors) ctx.stylize = stylizeWithColor;
		  return formatValue(ctx, obj, ctx.depth);
		}
		exports.inspect = inspect;


		// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
		inspect.colors = {
		  'bold' : [1, 22],
		  'italic' : [3, 23],
		  'underline' : [4, 24],
		  'inverse' : [7, 27],
		  'white' : [37, 39],
		  'grey' : [90, 39],
		  'black' : [30, 39],
		  'blue' : [34, 39],
		  'cyan' : [36, 39],
		  'green' : [32, 39],
		  'magenta' : [35, 39],
		  'red' : [31, 39],
		  'yellow' : [33, 39]
		};

		// Don't use 'blue' not visible on cmd.exe
		inspect.styles = {
		  'special': 'cyan',
		  'number': 'yellow',
		  'boolean': 'yellow',
		  'undefined': 'grey',
		  'null': 'bold',
		  'string': 'green',
		  'date': 'magenta',
		  // "name": intentionally not styling
		  'regexp': 'red'
		};


		function stylizeWithColor(str, styleType) {
		  var style = inspect.styles[styleType];

		  if (style) {
		    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
		           '\u001b[' + inspect.colors[style][1] + 'm';
		  } else {
		    return str;
		  }
		}


		function stylizeNoColor(str, styleType) {
		  return str;
		}


		function arrayToHash(array) {
		  var hash = {};

		  array.forEach(function(val, idx) {
		    hash[val] = true;
		  });

		  return hash;
		}


		function formatValue(ctx, value, recurseTimes) {
		  // Provide a hook for user-specified inspect functions.
		  // Check that value is an object with an inspect function on it
		  if (ctx.customInspect &&
		      value &&
		      isFunction(value.inspect) &&
		      // Filter out the util module, it's inspect function is special
		      value.inspect !== exports.inspect &&
		      // Also filter out any prototype objects using the circular check.
		      !(value.constructor && value.constructor.prototype === value)) {
		    var ret = value.inspect(recurseTimes, ctx);
		    if (!isString(ret)) {
		      ret = formatValue(ctx, ret, recurseTimes);
		    }
		    return ret;
		  }

		  // Primitive types cannot have properties
		  var primitive = formatPrimitive(ctx, value);
		  if (primitive) {
		    return primitive;
		  }

		  // Look up the keys of the object.
		  var keys = Object.keys(value);
		  var visibleKeys = arrayToHash(keys);

		  if (ctx.showHidden) {
		    keys = Object.getOwnPropertyNames(value);
		  }

		  // IE doesn't make error fields non-enumerable
		  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
		  if (isError(value)
		      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
		    return formatError(value);
		  }

		  // Some type of object without properties can be shortcutted.
		  if (keys.length === 0) {
		    if (isFunction(value)) {
		      var name = value.name ? ': ' + value.name : '';
		      return ctx.stylize('[Function' + name + ']', 'special');
		    }
		    if (isRegExp(value)) {
		      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
		    }
		    if (isDate(value)) {
		      return ctx.stylize(Date.prototype.toString.call(value), 'date');
		    }
		    if (isError(value)) {
		      return formatError(value);
		    }
		  }

		  var base = '', array = false, braces = ['{', '}'];

		  // Make Array say that they are Array
		  if (isArray(value)) {
		    array = true;
		    braces = ['[', ']'];
		  }

		  // Make functions say that they are functions
		  if (isFunction(value)) {
		    var n = value.name ? ': ' + value.name : '';
		    base = ' [Function' + n + ']';
		  }

		  // Make RegExps say that they are RegExps
		  if (isRegExp(value)) {
		    base = ' ' + RegExp.prototype.toString.call(value);
		  }

		  // Make dates with properties first say the date
		  if (isDate(value)) {
		    base = ' ' + Date.prototype.toUTCString.call(value);
		  }

		  // Make error with message first say the error
		  if (isError(value)) {
		    base = ' ' + formatError(value);
		  }

		  if (keys.length === 0 && (!array || value.length == 0)) {
		    return braces[0] + base + braces[1];
		  }

		  if (recurseTimes < 0) {
		    if (isRegExp(value)) {
		      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
		    } else {
		      return ctx.stylize('[Object]', 'special');
		    }
		  }

		  ctx.seen.push(value);

		  var output;
		  if (array) {
		    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
		  } else {
		    output = keys.map(function(key) {
		      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
		    });
		  }

		  ctx.seen.pop();

		  return reduceToSingleString(output, base, braces);
		}


		function formatPrimitive(ctx, value) {
		  if (isUndefined(value))
		    return ctx.stylize('undefined', 'undefined');
		  if (isString(value)) {
		    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
		                                             .replace(/'/g, "\\'")
		                                             .replace(/\\"/g, '"') + '\'';
		    return ctx.stylize(simple, 'string');
		  }
		  if (isNumber(value))
		    return ctx.stylize('' + value, 'number');
		  if (isBoolean(value))
		    return ctx.stylize('' + value, 'boolean');
		  // For some reason typeof null is "object", so special case here.
		  if (isNull(value))
		    return ctx.stylize('null', 'null');
		}


		function formatError(value) {
		  return '[' + Error.prototype.toString.call(value) + ']';
		}


		function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
		  var output = [];
		  for (var i = 0, l = value.length; i < l; ++i) {
		    if (hasOwnProperty(value, String(i))) {
		      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
		          String(i), true));
		    } else {
		      output.push('');
		    }
		  }
		  keys.forEach(function(key) {
		    if (!key.match(/^\d+$/)) {
		      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
		          key, true));
		    }
		  });
		  return output;
		}


		function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
		  var name, str, desc;
		  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
		  if (desc.get) {
		    if (desc.set) {
		      str = ctx.stylize('[Getter/Setter]', 'special');
		    } else {
		      str = ctx.stylize('[Getter]', 'special');
		    }
		  } else {
		    if (desc.set) {
		      str = ctx.stylize('[Setter]', 'special');
		    }
		  }
		  if (!hasOwnProperty(visibleKeys, key)) {
		    name = '[' + key + ']';
		  }
		  if (!str) {
		    if (ctx.seen.indexOf(desc.value) < 0) {
		      if (isNull(recurseTimes)) {
		        str = formatValue(ctx, desc.value, null);
		      } else {
		        str = formatValue(ctx, desc.value, recurseTimes - 1);
		      }
		      if (str.indexOf('\n') > -1) {
		        if (array) {
		          str = str.split('\n').map(function(line) {
		            return '  ' + line;
		          }).join('\n').substr(2);
		        } else {
		          str = '\n' + str.split('\n').map(function(line) {
		            return '   ' + line;
		          }).join('\n');
		        }
		      }
		    } else {
		      str = ctx.stylize('[Circular]', 'special');
		    }
		  }
		  if (isUndefined(name)) {
		    if (array && key.match(/^\d+$/)) {
		      return str;
		    }
		    name = JSON.stringify('' + key);
		    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
		      name = name.substr(1, name.length - 2);
		      name = ctx.stylize(name, 'name');
		    } else {
		      name = name.replace(/'/g, "\\'")
		                 .replace(/\\"/g, '"')
		                 .replace(/(^"|"$)/g, "'");
		      name = ctx.stylize(name, 'string');
		    }
		  }

		  return name + ': ' + str;
		}


		function reduceToSingleString(output, base, braces) {
		  var numLinesEst = 0;
		  var length = output.reduce(function(prev, cur) {
		    numLinesEst++;
		    if (cur.indexOf('\n') >= 0) numLinesEst++;
		    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
		  }, 0);

		  if (length > 60) {
		    return braces[0] +
		           (base === '' ? '' : base + '\n ') +
		           ' ' +
		           output.join(',\n  ') +
		           ' ' +
		           braces[1];
		  }

		  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
		}


		// NOTE: These type checking functions intentionally don't use `instanceof`
		// because it is fragile and can be easily faked with `Object.create()`.
		function isArray(ar) {
		  return Array.isArray(ar);
		}
		exports.isArray = isArray;

		function isBoolean(arg) {
		  return typeof arg === 'boolean';
		}
		exports.isBoolean = isBoolean;

		function isNull(arg) {
		  return arg === null;
		}
		exports.isNull = isNull;

		function isNullOrUndefined(arg) {
		  return arg == null;
		}
		exports.isNullOrUndefined = isNullOrUndefined;

		function isNumber(arg) {
		  return typeof arg === 'number';
		}
		exports.isNumber = isNumber;

		function isString(arg) {
		  return typeof arg === 'string';
		}
		exports.isString = isString;

		function isSymbol(arg) {
		  return typeof arg === 'symbol';
		}
		exports.isSymbol = isSymbol;

		function isUndefined(arg) {
		  return arg === void 0;
		}
		exports.isUndefined = isUndefined;

		function isRegExp(re) {
		  return isObject(re) && objectToString(re) === '[object RegExp]';
		}
		exports.isRegExp = isRegExp;

		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}
		exports.isObject = isObject;

		function isDate(d) {
		  return isObject(d) && objectToString(d) === '[object Date]';
		}
		exports.isDate = isDate;

		function isError(e) {
		  return isObject(e) &&
		      (objectToString(e) === '[object Error]' || e instanceof Error);
		}
		exports.isError = isError;

		function isFunction(arg) {
		  return typeof arg === 'function';
		}
		exports.isFunction = isFunction;

		function isPrimitive(arg) {
		  return arg === null ||
		         typeof arg === 'boolean' ||
		         typeof arg === 'number' ||
		         typeof arg === 'string' ||
		         typeof arg === 'symbol' ||  // ES6 symbol
		         typeof arg === 'undefined';
		}
		exports.isPrimitive = isPrimitive;

		exports.isBuffer = __webpack_require__(42);

		function objectToString(o) {
		  return Object.prototype.toString.call(o);
		}


		function pad(n) {
		  return n < 10 ? '0' + n.toString(10) : n.toString(10);
		}


		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
		              'Oct', 'Nov', 'Dec'];

		// 26 Feb 16:19:34
		function timestamp() {
		  var d = new Date();
		  var time = [pad(d.getHours()),
		              pad(d.getMinutes()),
		              pad(d.getSeconds())].join(':');
		  return [d.getDate(), months[d.getMonth()], time].join(' ');
		}


		// log is just a thin wrapper to console.log that prepends a timestamp
		exports.log = function() {
		  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
		};


		/**
		 * Inherit the prototype methods from one constructor into another.
		 *
		 * The Function.prototype.inherits from lang.js rewritten as a standalone
		 * function (not on Function.prototype). NOTE: If this file is to be loaded
		 * during bootstrapping this function needs to be rewritten using some native
		 * functions as prototype setup using normal JavaScript does not work as
		 * expected during bootstrapping (see mirror.js in r114903).
		 *
		 * @param {function} ctor Constructor function which needs to inherit the
		 *     prototype.
		 * @param {function} superCtor Constructor function to inherit prototype from.
		 */
		exports.inherits = __webpack_require__(41);

		exports._extend = function(origin, add) {
		  // Don't do anything if add isn't an object
		  if (!add || !isObject(add)) return origin;

		  var keys = Object.keys(add);
		  var i = keys.length;
		  while (i--) {
		    origin[keys[i]] = add[keys[i]];
		  }
		  return origin;
		};

		function hasOwnProperty(obj, prop) {
		  return Object.prototype.hasOwnProperty.call(obj, prop);
		}

		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {'use strict';

		exports.__esModule = true;
		exports.isSet = exports.addHydratedState = exports.setHydratedState = exports.getHydratedState = exports.removeToken = exports.setToken = exports.getToken = exports.remove = exports.set = exports.get = exports.getPrefix = undefined;

		var _lodash = __webpack_require__(13);

		if (!(0, _lodash.has)(Object, 'assign')) {
		  Object.assign = _lodash.assign;
		} /* global FormData, fetch, Headers, Request, window, File, Blob */
		/**
		 * LocalStorage Wrapper
		 */


		var PRE_VAR = 'STORAGE_PREFIX';
		function getStore() {
		  if (typeof process === 'object' && '' + process === '[object process]') {
		    return __webpack_require__(30).LocalStorage;
		  }
		  return window.localStorage;
		}

		/**
		 * Return the storage prefix
		 *
		 */
		var getPrefix = exports.getPrefix = function getPrefix() {
		  var prefix = '';
		  if (!(0, _lodash.isUndefined)(process) && !(0, _lodash.isUndefined)(process.env) && !(0, _lodash.isUndefined)(process.env[PRE_VAR])) {
		    prefix = process.env[PRE_VAR];
		  }
		  if (prefix === '' && !(0, _lodash.isUndefined)(window) && !(0, _lodash.isUndefined)(window, PRE_VAR)) {
		    prefix = window[PRE_VAR];
		  }
		  return prefix;
		};

		/**
		 * Gets an item from localStorage
		 * @param  {string} id
		 *
		 */
		var get = exports.get = function get(id) {
		  try {
		    return JSON.parse(getStore().getItem(getPrefix() + '-' + id)).value;
		  } catch (err) {
		    return null;
		  }
		};

		/**
		 * Sets an item in localStorage
		 * @param  {String} id
		 * @param  {Any}    value
		 *
		 */
		var set = exports.set = function set(id, value) {
		  return getStore().setItem(getPrefix() + '-' + id, JSON.stringify({ value: value }));
		};

		/**
		 * Remove item from localStorage
		 * @param  {String} id
		 *
		 */
		var remove = exports.remove = function remove(id) {
		  return getStore().removeItem(getPrefix() + '-' + id);
		};

		/**
		 * Gets an token from localStorage
		 *
		 */
		var getToken = exports.getToken = function getToken() {
		  return get('token');
		};

		/**
		 * Sets the token in localStorage
		 * @param  {Any} value
		 *
		 */
		var setToken = exports.setToken = function setToken(value) {
		  return set('token', value);
		};

		/**
		 * Remove item from localStorage
		 * @param  {String} id
		 *
		 */
		var removeToken = exports.removeToken = function removeToken() {
		  return remove('token');
		};

		/**
		 * Return state to rehydrate store
		 * @return {Object}
		 *
		 */
		var getHydratedState = exports.getHydratedState = function getHydratedState() {
		  var state = get('state');
		  return state || {};
		};

		/**
		 * Sets the hydrated state
		 * @param  {Object} state
		 *
		 */
		var setHydratedState = exports.setHydratedState = function setHydratedState(state) {
		  return set('state', state);
		};

		/**
		 * Adds a key to hydrated state
		 * @param  {String} id
		 * @param  {Any}  value
		 */
		var addHydratedState = exports.addHydratedState = function addHydratedState(id, value) {
		  return set('state', Object.assign({}, getHydratedState(), { id: value }));
		};

		/**
		 * Checks if an item exists
		 * @param  {string} id
		 *
		 */
		var isSet = exports.isSet = function isSet(id) {
		  return get(id) !== null;
		};
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict'

		var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))

		module.exports = clone(fs)

		function clone (obj) {
		  if (obj === null || typeof obj !== 'object')
		    return obj

		  if (obj instanceof Object)
		    var copy = { __proto__: obj.__proto__ }
		  else
		    var copy = Object.create(null)

		  Object.getOwnPropertyNames(obj).forEach(function (key) {
		    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
		  })

		  return copy
		}


	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {/**
		 * @license
		 * Lodash <https://lodash.com/>
		 * Copyright JS Foundation and other contributors <https://js.foundation/>
		 * Released under MIT license <https://lodash.com/license>
		 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
		 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
		 */
		;(function() {

		  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
		  var undefined;

		  /** Used as the semantic version number. */
		  var VERSION = '4.17.2';

		  /** Used as the size to enable large array optimizations. */
		  var LARGE_ARRAY_SIZE = 200;

		  /** Error message constants. */
		  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
		      FUNC_ERROR_TEXT = 'Expected a function';

		  /** Used to stand-in for `undefined` hash values. */
		  var HASH_UNDEFINED = '__lodash_hash_undefined__';

		  /** Used as the maximum memoize cache size. */
		  var MAX_MEMOIZE_SIZE = 500;

		  /** Used as the internal argument placeholder. */
		  var PLACEHOLDER = '__lodash_placeholder__';

		  /** Used to compose bitmasks for cloning. */
		  var CLONE_DEEP_FLAG = 1,
		      CLONE_FLAT_FLAG = 2,
		      CLONE_SYMBOLS_FLAG = 4;

		  /** Used to compose bitmasks for value comparisons. */
		  var COMPARE_PARTIAL_FLAG = 1,
		      COMPARE_UNORDERED_FLAG = 2;

		  /** Used to compose bitmasks for function metadata. */
		  var WRAP_BIND_FLAG = 1,
		      WRAP_BIND_KEY_FLAG = 2,
		      WRAP_CURRY_BOUND_FLAG = 4,
		      WRAP_CURRY_FLAG = 8,
		      WRAP_CURRY_RIGHT_FLAG = 16,
		      WRAP_PARTIAL_FLAG = 32,
		      WRAP_PARTIAL_RIGHT_FLAG = 64,
		      WRAP_ARY_FLAG = 128,
		      WRAP_REARG_FLAG = 256,
		      WRAP_FLIP_FLAG = 512;

		  /** Used as default options for `_.truncate`. */
		  var DEFAULT_TRUNC_LENGTH = 30,
		      DEFAULT_TRUNC_OMISSION = '...';

		  /** Used to detect hot functions by number of calls within a span of milliseconds. */
		  var HOT_COUNT = 800,
		      HOT_SPAN = 16;

		  /** Used to indicate the type of lazy iteratees. */
		  var LAZY_FILTER_FLAG = 1,
		      LAZY_MAP_FLAG = 2,
		      LAZY_WHILE_FLAG = 3;

		  /** Used as references for various `Number` constants. */
		  var INFINITY = 1 / 0,
		      MAX_SAFE_INTEGER = 9007199254740991,
		      MAX_INTEGER = 1.7976931348623157e+308,
		      NAN = 0 / 0;

		  /** Used as references for the maximum length and index of an array. */
		  var MAX_ARRAY_LENGTH = 4294967295,
		      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
		      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

		  /** Used to associate wrap methods with their bit flags. */
		  var wrapFlags = [
		    ['ary', WRAP_ARY_FLAG],
		    ['bind', WRAP_BIND_FLAG],
		    ['bindKey', WRAP_BIND_KEY_FLAG],
		    ['curry', WRAP_CURRY_FLAG],
		    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
		    ['flip', WRAP_FLIP_FLAG],
		    ['partial', WRAP_PARTIAL_FLAG],
		    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
		    ['rearg', WRAP_REARG_FLAG]
		  ];

		  /** `Object#toString` result references. */
		  var argsTag = '[object Arguments]',
		      arrayTag = '[object Array]',
		      asyncTag = '[object AsyncFunction]',
		      boolTag = '[object Boolean]',
		      dateTag = '[object Date]',
		      domExcTag = '[object DOMException]',
		      errorTag = '[object Error]',
		      funcTag = '[object Function]',
		      genTag = '[object GeneratorFunction]',
		      mapTag = '[object Map]',
		      numberTag = '[object Number]',
		      nullTag = '[object Null]',
		      objectTag = '[object Object]',
		      promiseTag = '[object Promise]',
		      proxyTag = '[object Proxy]',
		      regexpTag = '[object RegExp]',
		      setTag = '[object Set]',
		      stringTag = '[object String]',
		      symbolTag = '[object Symbol]',
		      undefinedTag = '[object Undefined]',
		      weakMapTag = '[object WeakMap]',
		      weakSetTag = '[object WeakSet]';

		  var arrayBufferTag = '[object ArrayBuffer]',
		      dataViewTag = '[object DataView]',
		      float32Tag = '[object Float32Array]',
		      float64Tag = '[object Float64Array]',
		      int8Tag = '[object Int8Array]',
		      int16Tag = '[object Int16Array]',
		      int32Tag = '[object Int32Array]',
		      uint8Tag = '[object Uint8Array]',
		      uint8ClampedTag = '[object Uint8ClampedArray]',
		      uint16Tag = '[object Uint16Array]',
		      uint32Tag = '[object Uint32Array]';

		  /** Used to match empty string literals in compiled template source. */
		  var reEmptyStringLeading = /\b__p \+= '';/g,
		      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
		      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

		  /** Used to match HTML entities and HTML characters. */
		  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
		      reUnescapedHtml = /[&<>"']/g,
		      reHasEscapedHtml = RegExp(reEscapedHtml.source),
		      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

		  /** Used to match template delimiters. */
		  var reEscape = /<%-([\s\S]+?)%>/g,
		      reEvaluate = /<%([\s\S]+?)%>/g,
		      reInterpolate = /<%=([\s\S]+?)%>/g;

		  /** Used to match property names within property paths. */
		  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
		      reIsPlainProp = /^\w*$/,
		      reLeadingDot = /^\./,
		      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

		  /**
		   * Used to match `RegExp`
		   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
		   */
		  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
		      reHasRegExpChar = RegExp(reRegExpChar.source);

		  /** Used to match leading and trailing whitespace. */
		  var reTrim = /^\s+|\s+$/g,
		      reTrimStart = /^\s+/,
		      reTrimEnd = /\s+$/;

		  /** Used to match wrap detail comments. */
		  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
		      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
		      reSplitDetails = /,? & /;

		  /** Used to match words composed of alphanumeric characters. */
		  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

		  /** Used to match backslashes in property paths. */
		  var reEscapeChar = /\\(\\)?/g;

		  /**
		   * Used to match
		   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
		   */
		  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

		  /** Used to match `RegExp` flags from their coerced string values. */
		  var reFlags = /\w*$/;

		  /** Used to detect bad signed hexadecimal string values. */
		  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

		  /** Used to detect binary string values. */
		  var reIsBinary = /^0b[01]+$/i;

		  /** Used to detect host constructors (Safari). */
		  var reIsHostCtor = /^\[object .+?Constructor\]$/;

		  /** Used to detect octal string values. */
		  var reIsOctal = /^0o[0-7]+$/i;

		  /** Used to detect unsigned integer values. */
		  var reIsUint = /^(?:0|[1-9]\d*)$/;

		  /** Used to match Latin Unicode letters (excluding mathematical operators). */
		  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

		  /** Used to ensure capturing order of template delimiters. */
		  var reNoMatch = /($^)/;

		  /** Used to match unescaped characters in compiled string literals. */
		  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

		  /** Used to compose unicode character classes. */
		  var rsAstralRange = '\\ud800-\\udfff',
		      rsComboMarksRange = '\\u0300-\\u036f',
		      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
		      rsComboSymbolsRange = '\\u20d0-\\u20ff',
		      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
		      rsDingbatRange = '\\u2700-\\u27bf',
		      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
		      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
		      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
		      rsPunctuationRange = '\\u2000-\\u206f',
		      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
		      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
		      rsVarRange = '\\ufe0e\\ufe0f',
		      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

		  /** Used to compose unicode capture groups. */
		  var rsApos = "['\u2019]",
		      rsAstral = '[' + rsAstralRange + ']',
		      rsBreak = '[' + rsBreakRange + ']',
		      rsCombo = '[' + rsComboRange + ']',
		      rsDigits = '\\d+',
		      rsDingbat = '[' + rsDingbatRange + ']',
		      rsLower = '[' + rsLowerRange + ']',
		      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
		      rsFitz = '\\ud83c[\\udffb-\\udfff]',
		      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
		      rsNonAstral = '[^' + rsAstralRange + ']',
		      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
		      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
		      rsUpper = '[' + rsUpperRange + ']',
		      rsZWJ = '\\u200d';

		  /** Used to compose unicode regexes. */
		  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
		      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
		      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
		      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
		      reOptMod = rsModifier + '?',
		      rsOptVar = '[' + rsVarRange + ']?',
		      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
		      rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
		      rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
		      rsSeq = rsOptVar + reOptMod + rsOptJoin,
		      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
		      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

		  /** Used to match apostrophes. */
		  var reApos = RegExp(rsApos, 'g');

		  /**
		   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
		   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
		   */
		  var reComboMark = RegExp(rsCombo, 'g');

		  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
		  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

		  /** Used to match complex or compound words. */
		  var reUnicodeWord = RegExp([
		    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
		    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
		    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
		    rsUpper + '+' + rsOptContrUpper,
		    rsOrdUpper,
		    rsOrdLower,
		    rsDigits,
		    rsEmoji
		  ].join('|'), 'g');

		  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
		  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

		  /** Used to detect strings that need a more robust regexp to match words. */
		  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

		  /** Used to assign default `context` object properties. */
		  var contextProps = [
		    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
		    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
		    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
		    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
		    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
		  ];

		  /** Used to make template sourceURLs easier to identify. */
		  var templateCounter = -1;

		  /** Used to identify `toStringTag` values of typed arrays. */
		  var typedArrayTags = {};
		  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
		  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
		  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
		  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
		  typedArrayTags[uint32Tag] = true;
		  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
		  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
		  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
		  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
		  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
		  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
		  typedArrayTags[setTag] = typedArrayTags[stringTag] =
		  typedArrayTags[weakMapTag] = false;

		  /** Used to identify `toStringTag` values supported by `_.clone`. */
		  var cloneableTags = {};
		  cloneableTags[argsTag] = cloneableTags[arrayTag] =
		  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
		  cloneableTags[boolTag] = cloneableTags[dateTag] =
		  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
		  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
		  cloneableTags[int32Tag] = cloneableTags[mapTag] =
		  cloneableTags[numberTag] = cloneableTags[objectTag] =
		  cloneableTags[regexpTag] = cloneableTags[setTag] =
		  cloneableTags[stringTag] = cloneableTags[symbolTag] =
		  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
		  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
		  cloneableTags[errorTag] = cloneableTags[funcTag] =
		  cloneableTags[weakMapTag] = false;

		  /** Used to map Latin Unicode letters to basic Latin letters. */
		  var deburredLetters = {
		    // Latin-1 Supplement block.
		    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
		    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
		    '\xc7': 'C',  '\xe7': 'c',
		    '\xd0': 'D',  '\xf0': 'd',
		    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
		    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
		    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
		    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
		    '\xd1': 'N',  '\xf1': 'n',
		    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
		    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
		    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
		    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
		    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
		    '\xc6': 'Ae', '\xe6': 'ae',
		    '\xde': 'Th', '\xfe': 'th',
		    '\xdf': 'ss',
		    // Latin Extended-A block.
		    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
		    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
		    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
		    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
		    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
		    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
		    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
		    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
		    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
		    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
		    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
		    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
		    '\u0134': 'J',  '\u0135': 'j',
		    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
		    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
		    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
		    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
		    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
		    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
		    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
		    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
		    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
		    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
		    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
		    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
		    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
		    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
		    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
		    '\u0174': 'W',  '\u0175': 'w',
		    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
		    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
		    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
		    '\u0132': 'IJ', '\u0133': 'ij',
		    '\u0152': 'Oe', '\u0153': 'oe',
		    '\u0149': "'n", '\u017f': 's'
		  };

		  /** Used to map characters to HTML entities. */
		  var htmlEscapes = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		    '"': '&quot;',
		    "'": '&#39;'
		  };

		  /** Used to map HTML entities to characters. */
		  var htmlUnescapes = {
		    '&amp;': '&',
		    '&lt;': '<',
		    '&gt;': '>',
		    '&quot;': '"',
		    '&#39;': "'"
		  };

		  /** Used to escape characters for inclusion in compiled string literals. */
		  var stringEscapes = {
		    '\\': '\\',
		    "'": "'",
		    '\n': 'n',
		    '\r': 'r',
		    '\u2028': 'u2028',
		    '\u2029': 'u2029'
		  };

		  /** Built-in method references without a dependency on `root`. */
		  var freeParseFloat = parseFloat,
		      freeParseInt = parseInt;

		  /** Detect free variable `global` from Node.js. */
		  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

		  /** Detect free variable `self`. */
		  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

		  /** Used as a reference to the global object. */
		  var root = freeGlobal || freeSelf || Function('return this')();

		  /** Detect free variable `exports`. */
		  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

		  /** Detect free variable `module`. */
		  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

		  /** Detect the popular CommonJS extension `module.exports`. */
		  var moduleExports = freeModule && freeModule.exports === freeExports;

		  /** Detect free variable `process` from Node.js. */
		  var freeProcess = moduleExports && freeGlobal.process;

		  /** Used to access faster Node.js helpers. */
		  var nodeUtil = (function() {
		    try {
		      return freeProcess && freeProcess.binding && freeProcess.binding('util');
		    } catch (e) {}
		  }());

		  /* Node.js helper references. */
		  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
		      nodeIsDate = nodeUtil && nodeUtil.isDate,
		      nodeIsMap = nodeUtil && nodeUtil.isMap,
		      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
		      nodeIsSet = nodeUtil && nodeUtil.isSet,
		      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

		  /*--------------------------------------------------------------------------*/

		  /**
		   * Adds the key-value `pair` to `map`.
		   *
		   * @private
		   * @param {Object} map The map to modify.
		   * @param {Array} pair The key-value pair to add.
		   * @returns {Object} Returns `map`.
		   */
		  function addMapEntry(map, pair) {
		    // Don't return `map.set` because it's not chainable in IE 11.
		    map.set(pair[0], pair[1]);
		    return map;
		  }

		  /**
		   * Adds `value` to `set`.
		   *
		   * @private
		   * @param {Object} set The set to modify.
		   * @param {*} value The value to add.
		   * @returns {Object} Returns `set`.
		   */
		  function addSetEntry(set, value) {
		    // Don't return `set.add` because it's not chainable in IE 11.
		    set.add(value);
		    return set;
		  }

		  /**
		   * A faster alternative to `Function#apply`, this function invokes `func`
		   * with the `this` binding of `thisArg` and the arguments of `args`.
		   *
		   * @private
		   * @param {Function} func The function to invoke.
		   * @param {*} thisArg The `this` binding of `func`.
		   * @param {Array} args The arguments to invoke `func` with.
		   * @returns {*} Returns the result of `func`.
		   */
		  function apply(func, thisArg, args) {
		    switch (args.length) {
		      case 0: return func.call(thisArg);
		      case 1: return func.call(thisArg, args[0]);
		      case 2: return func.call(thisArg, args[0], args[1]);
		      case 3: return func.call(thisArg, args[0], args[1], args[2]);
		    }
		    return func.apply(thisArg, args);
		  }

		  /**
		   * A specialized version of `baseAggregator` for arrays.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} setter The function to set `accumulator` values.
		   * @param {Function} iteratee The iteratee to transform keys.
		   * @param {Object} accumulator The initial aggregated object.
		   * @returns {Function} Returns `accumulator`.
		   */
		  function arrayAggregator(array, setter, iteratee, accumulator) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      var value = array[index];
		      setter(accumulator, value, iteratee(value), array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.forEach` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayEach(array, iteratee) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (iteratee(array[index], index, array) === false) {
		        break;
		      }
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.forEachRight` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayEachRight(array, iteratee) {
		    var length = array == null ? 0 : array.length;

		    while (length--) {
		      if (iteratee(array[length], length, array) === false) {
		        break;
		      }
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.every` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {boolean} Returns `true` if all elements pass the predicate check,
		   *  else `false`.
		   */
		  function arrayEvery(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (!predicate(array[index], index, array)) {
		        return false;
		      }
		    }
		    return true;
		  }

		  /**
		   * A specialized version of `_.filter` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {Array} Returns the new filtered array.
		   */
		  function arrayFilter(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length,
		        resIndex = 0,
		        result = [];

		    while (++index < length) {
		      var value = array[index];
		      if (predicate(value, index, array)) {
		        result[resIndex++] = value;
		      }
		    }
		    return result;
		  }

		  /**
		   * A specialized version of `_.includes` for arrays without support for
		   * specifying an index to search from.
		   *
		   * @private
		   * @param {Array} [array] The array to inspect.
		   * @param {*} target The value to search for.
		   * @returns {boolean} Returns `true` if `target` is found, else `false`.
		   */
		  function arrayIncludes(array, value) {
		    var length = array == null ? 0 : array.length;
		    return !!length && baseIndexOf(array, value, 0) > -1;
		  }

		  /**
		   * This function is like `arrayIncludes` except that it accepts a comparator.
		   *
		   * @private
		   * @param {Array} [array] The array to inspect.
		   * @param {*} target The value to search for.
		   * @param {Function} comparator The comparator invoked per element.
		   * @returns {boolean} Returns `true` if `target` is found, else `false`.
		   */
		  function arrayIncludesWith(array, value, comparator) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (comparator(value, array[index])) {
		        return true;
		      }
		    }
		    return false;
		  }

		  /**
		   * A specialized version of `_.map` for arrays without support for iteratee
		   * shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns the new mapped array.
		   */
		  function arrayMap(array, iteratee) {
		    var index = -1,
		        length = array == null ? 0 : array.length,
		        result = Array(length);

		    while (++index < length) {
		      result[index] = iteratee(array[index], index, array);
		    }
		    return result;
		  }

		  /**
		   * Appends the elements of `values` to `array`.
		   *
		   * @private
		   * @param {Array} array The array to modify.
		   * @param {Array} values The values to append.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayPush(array, values) {
		    var index = -1,
		        length = values.length,
		        offset = array.length;

		    while (++index < length) {
		      array[offset + index] = values[index];
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.reduce` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} [accumulator] The initial value.
		   * @param {boolean} [initAccum] Specify using the first element of `array` as
		   *  the initial value.
		   * @returns {*} Returns the accumulated value.
		   */
		  function arrayReduce(array, iteratee, accumulator, initAccum) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    if (initAccum && length) {
		      accumulator = array[++index];
		    }
		    while (++index < length) {
		      accumulator = iteratee(accumulator, array[index], index, array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.reduceRight` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} [accumulator] The initial value.
		   * @param {boolean} [initAccum] Specify using the last element of `array` as
		   *  the initial value.
		   * @returns {*} Returns the accumulated value.
		   */
		  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
		    var length = array == null ? 0 : array.length;
		    if (initAccum && length) {
		      accumulator = array[--length];
		    }
		    while (length--) {
		      accumulator = iteratee(accumulator, array[length], length, array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.some` for arrays without support for iteratee
		   * shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {boolean} Returns `true` if any element passes the predicate check,
		   *  else `false`.
		   */
		  function arraySome(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (predicate(array[index], index, array)) {
		        return true;
		      }
		    }
		    return false;
		  }

		  /**
		   * Gets the size of an ASCII `string`.
		   *
		   * @private
		   * @param {string} string The string inspect.
		   * @returns {number} Returns the string size.
		   */
		  var asciiSize = baseProperty('length');

		  /**
		   * Converts an ASCII `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function asciiToArray(string) {
		    return string.split('');
		  }

		  /**
		   * Splits an ASCII `string` into an array of its words.
		   *
		   * @private
		   * @param {string} The string to inspect.
		   * @returns {Array} Returns the words of `string`.
		   */
		  function asciiWords(string) {
		    return string.match(reAsciiWord) || [];
		  }

		  /**
		   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
		   * without support for iteratee shorthands, which iterates over `collection`
		   * using `eachFunc`.
		   *
		   * @private
		   * @param {Array|Object} collection The collection to inspect.
		   * @param {Function} predicate The function invoked per iteration.
		   * @param {Function} eachFunc The function to iterate over `collection`.
		   * @returns {*} Returns the found element or its key, else `undefined`.
		   */
		  function baseFindKey(collection, predicate, eachFunc) {
		    var result;
		    eachFunc(collection, function(value, key, collection) {
		      if (predicate(value, key, collection)) {
		        result = key;
		        return false;
		      }
		    });
		    return result;
		  }

		  /**
		   * The base implementation of `_.findIndex` and `_.findLastIndex` without
		   * support for iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {Function} predicate The function invoked per iteration.
		   * @param {number} fromIndex The index to search from.
		   * @param {boolean} [fromRight] Specify iterating from right to left.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseFindIndex(array, predicate, fromIndex, fromRight) {
		    var length = array.length,
		        index = fromIndex + (fromRight ? 1 : -1);

		    while ((fromRight ? index-- : ++index < length)) {
		      if (predicate(array[index], index, array)) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseIndexOf(array, value, fromIndex) {
		    return value === value
		      ? strictIndexOf(array, value, fromIndex)
		      : baseFindIndex(array, baseIsNaN, fromIndex);
		  }

		  /**
		   * This function is like `baseIndexOf` except that it accepts a comparator.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @param {Function} comparator The comparator invoked per element.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseIndexOfWith(array, value, fromIndex, comparator) {
		    var index = fromIndex - 1,
		        length = array.length;

		    while (++index < length) {
		      if (comparator(array[index], value)) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * The base implementation of `_.isNaN` without support for number objects.
		   *
		   * @private
		   * @param {*} value The value to check.
		   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
		   */
		  function baseIsNaN(value) {
		    return value !== value;
		  }

		  /**
		   * The base implementation of `_.mean` and `_.meanBy` without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {number} Returns the mean.
		   */
		  function baseMean(array, iteratee) {
		    var length = array == null ? 0 : array.length;
		    return length ? (baseSum(array, iteratee) / length) : NAN;
		  }

		  /**
		   * The base implementation of `_.property` without support for deep paths.
		   *
		   * @private
		   * @param {string} key The key of the property to get.
		   * @returns {Function} Returns the new accessor function.
		   */
		  function baseProperty(key) {
		    return function(object) {
		      return object == null ? undefined : object[key];
		    };
		  }

		  /**
		   * The base implementation of `_.propertyOf` without support for deep paths.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @returns {Function} Returns the new accessor function.
		   */
		  function basePropertyOf(object) {
		    return function(key) {
		      return object == null ? undefined : object[key];
		    };
		  }

		  /**
		   * The base implementation of `_.reduce` and `_.reduceRight`, without support
		   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
		   *
		   * @private
		   * @param {Array|Object} collection The collection to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} accumulator The initial value.
		   * @param {boolean} initAccum Specify using the first or last element of
		   *  `collection` as the initial value.
		   * @param {Function} eachFunc The function to iterate over `collection`.
		   * @returns {*} Returns the accumulated value.
		   */
		  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
		    eachFunc(collection, function(value, index, collection) {
		      accumulator = initAccum
		        ? (initAccum = false, value)
		        : iteratee(accumulator, value, index, collection);
		    });
		    return accumulator;
		  }

		  /**
		   * The base implementation of `_.sortBy` which uses `comparer` to define the
		   * sort order of `array` and replaces criteria objects with their corresponding
		   * values.
		   *
		   * @private
		   * @param {Array} array The array to sort.
		   * @param {Function} comparer The function to define sort order.
		   * @returns {Array} Returns `array`.
		   */
		  function baseSortBy(array, comparer) {
		    var length = array.length;

		    array.sort(comparer);
		    while (length--) {
		      array[length] = array[length].value;
		    }
		    return array;
		  }

		  /**
		   * The base implementation of `_.sum` and `_.sumBy` without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {number} Returns the sum.
		   */
		  function baseSum(array, iteratee) {
		    var result,
		        index = -1,
		        length = array.length;

		    while (++index < length) {
		      var current = iteratee(array[index]);
		      if (current !== undefined) {
		        result = result === undefined ? current : (result + current);
		      }
		    }
		    return result;
		  }

		  /**
		   * The base implementation of `_.times` without support for iteratee shorthands
		   * or max array length checks.
		   *
		   * @private
		   * @param {number} n The number of times to invoke `iteratee`.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns the array of results.
		   */
		  function baseTimes(n, iteratee) {
		    var index = -1,
		        result = Array(n);

		    while (++index < n) {
		      result[index] = iteratee(index);
		    }
		    return result;
		  }

		  /**
		   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
		   * of key-value pairs for `object` corresponding to the property names of `props`.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @param {Array} props The property names to get values for.
		   * @returns {Object} Returns the key-value pairs.
		   */
		  function baseToPairs(object, props) {
		    return arrayMap(props, function(key) {
		      return [key, object[key]];
		    });
		  }

		  /**
		   * The base implementation of `_.unary` without support for storing metadata.
		   *
		   * @private
		   * @param {Function} func The function to cap arguments for.
		   * @returns {Function} Returns the new capped function.
		   */
		  function baseUnary(func) {
		    return function(value) {
		      return func(value);
		    };
		  }

		  /**
		   * The base implementation of `_.values` and `_.valuesIn` which creates an
		   * array of `object` property values corresponding to the property names
		   * of `props`.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @param {Array} props The property names to get values for.
		   * @returns {Object} Returns the array of property values.
		   */
		  function baseValues(object, props) {
		    return arrayMap(props, function(key) {
		      return object[key];
		    });
		  }

		  /**
		   * Checks if a `cache` value for `key` exists.
		   *
		   * @private
		   * @param {Object} cache The cache to query.
		   * @param {string} key The key of the entry to check.
		   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		   */
		  function cacheHas(cache, key) {
		    return cache.has(key);
		  }

		  /**
		   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
		   * that is not found in the character symbols.
		   *
		   * @private
		   * @param {Array} strSymbols The string symbols to inspect.
		   * @param {Array} chrSymbols The character symbols to find.
		   * @returns {number} Returns the index of the first unmatched string symbol.
		   */
		  function charsStartIndex(strSymbols, chrSymbols) {
		    var index = -1,
		        length = strSymbols.length;

		    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
		    return index;
		  }

		  /**
		   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
		   * that is not found in the character symbols.
		   *
		   * @private
		   * @param {Array} strSymbols The string symbols to inspect.
		   * @param {Array} chrSymbols The character symbols to find.
		   * @returns {number} Returns the index of the last unmatched string symbol.
		   */
		  function charsEndIndex(strSymbols, chrSymbols) {
		    var index = strSymbols.length;

		    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
		    return index;
		  }

		  /**
		   * Gets the number of `placeholder` occurrences in `array`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} placeholder The placeholder to search for.
		   * @returns {number} Returns the placeholder count.
		   */
		  function countHolders(array, placeholder) {
		    var length = array.length,
		        result = 0;

		    while (length--) {
		      if (array[length] === placeholder) {
		        ++result;
		      }
		    }
		    return result;
		  }

		  /**
		   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
		   * letters to basic Latin letters.
		   *
		   * @private
		   * @param {string} letter The matched letter to deburr.
		   * @returns {string} Returns the deburred letter.
		   */
		  var deburrLetter = basePropertyOf(deburredLetters);

		  /**
		   * Used by `_.escape` to convert characters to HTML entities.
		   *
		   * @private
		   * @param {string} chr The matched character to escape.
		   * @returns {string} Returns the escaped character.
		   */
		  var escapeHtmlChar = basePropertyOf(htmlEscapes);

		  /**
		   * Used by `_.template` to escape characters for inclusion in compiled string literals.
		   *
		   * @private
		   * @param {string} chr The matched character to escape.
		   * @returns {string} Returns the escaped character.
		   */
		  function escapeStringChar(chr) {
		    return '\\' + stringEscapes[chr];
		  }

		  /**
		   * Gets the value at `key` of `object`.
		   *
		   * @private
		   * @param {Object} [object] The object to query.
		   * @param {string} key The key of the property to get.
		   * @returns {*} Returns the property value.
		   */
		  function getValue(object, key) {
		    return object == null ? undefined : object[key];
		  }

		  /**
		   * Checks if `string` contains Unicode symbols.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
		   */
		  function hasUnicode(string) {
		    return reHasUnicode.test(string);
		  }

		  /**
		   * Checks if `string` contains a word composed of Unicode symbols.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {boolean} Returns `true` if a word is found, else `false`.
		   */
		  function hasUnicodeWord(string) {
		    return reHasUnicodeWord.test(string);
		  }

		  /**
		   * Converts `iterator` to an array.
		   *
		   * @private
		   * @param {Object} iterator The iterator to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function iteratorToArray(iterator) {
		    var data,
		        result = [];

		    while (!(data = iterator.next()).done) {
		      result.push(data.value);
		    }
		    return result;
		  }

		  /**
		   * Converts `map` to its key-value pairs.
		   *
		   * @private
		   * @param {Object} map The map to convert.
		   * @returns {Array} Returns the key-value pairs.
		   */
		  function mapToArray(map) {
		    var index = -1,
		        result = Array(map.size);

		    map.forEach(function(value, key) {
		      result[++index] = [key, value];
		    });
		    return result;
		  }

		  /**
		   * Creates a unary function that invokes `func` with its argument transformed.
		   *
		   * @private
		   * @param {Function} func The function to wrap.
		   * @param {Function} transform The argument transform.
		   * @returns {Function} Returns the new function.
		   */
		  function overArg(func, transform) {
		    return function(arg) {
		      return func(transform(arg));
		    };
		  }

		  /**
		   * Replaces all `placeholder` elements in `array` with an internal placeholder
		   * and returns an array of their indexes.
		   *
		   * @private
		   * @param {Array} array The array to modify.
		   * @param {*} placeholder The placeholder to replace.
		   * @returns {Array} Returns the new array of placeholder indexes.
		   */
		  function replaceHolders(array, placeholder) {
		    var index = -1,
		        length = array.length,
		        resIndex = 0,
		        result = [];

		    while (++index < length) {
		      var value = array[index];
		      if (value === placeholder || value === PLACEHOLDER) {
		        array[index] = PLACEHOLDER;
		        result[resIndex++] = index;
		      }
		    }
		    return result;
		  }

		  /**
		   * Converts `set` to an array of its values.
		   *
		   * @private
		   * @param {Object} set The set to convert.
		   * @returns {Array} Returns the values.
		   */
		  function setToArray(set) {
		    var index = -1,
		        result = Array(set.size);

		    set.forEach(function(value) {
		      result[++index] = value;
		    });
		    return result;
		  }

		  /**
		   * Converts `set` to its value-value pairs.
		   *
		   * @private
		   * @param {Object} set The set to convert.
		   * @returns {Array} Returns the value-value pairs.
		   */
		  function setToPairs(set) {
		    var index = -1,
		        result = Array(set.size);

		    set.forEach(function(value) {
		      result[++index] = [value, value];
		    });
		    return result;
		  }

		  /**
		   * A specialized version of `_.indexOf` which performs strict equality
		   * comparisons of values, i.e. `===`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function strictIndexOf(array, value, fromIndex) {
		    var index = fromIndex - 1,
		        length = array.length;

		    while (++index < length) {
		      if (array[index] === value) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * A specialized version of `_.lastIndexOf` which performs strict equality
		   * comparisons of values, i.e. `===`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function strictLastIndexOf(array, value, fromIndex) {
		    var index = fromIndex + 1;
		    while (index--) {
		      if (array[index] === value) {
		        return index;
		      }
		    }
		    return index;
		  }

		  /**
		   * Gets the number of symbols in `string`.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {number} Returns the string size.
		   */
		  function stringSize(string) {
		    return hasUnicode(string)
		      ? unicodeSize(string)
		      : asciiSize(string);
		  }

		  /**
		   * Converts `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function stringToArray(string) {
		    return hasUnicode(string)
		      ? unicodeToArray(string)
		      : asciiToArray(string);
		  }

		  /**
		   * Used by `_.unescape` to convert HTML entities to characters.
		   *
		   * @private
		   * @param {string} chr The matched character to unescape.
		   * @returns {string} Returns the unescaped character.
		   */
		  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

		  /**
		   * Gets the size of a Unicode `string`.
		   *
		   * @private
		   * @param {string} string The string inspect.
		   * @returns {number} Returns the string size.
		   */
		  function unicodeSize(string) {
		    var result = reUnicode.lastIndex = 0;
		    while (reUnicode.test(string)) {
		      ++result;
		    }
		    return result;
		  }

		  /**
		   * Converts a Unicode `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function unicodeToArray(string) {
		    return string.match(reUnicode) || [];
		  }

		  /**
		   * Splits a Unicode `string` into an array of its words.
		   *
		   * @private
		   * @param {string} The string to inspect.
		   * @returns {Array} Returns the words of `string`.
		   */
		  function unicodeWords(string) {
		    return string.match(reUnicodeWord) || [];
		  }

		  /*--------------------------------------------------------------------------*/

		  /**
		   * Create a new pristine `lodash` function using the `context` object.
		   *
		   * @static
		   * @memberOf _
		   * @since 1.1.0
		   * @category Util
		   * @param {Object} [context=root] The context object.
		   * @returns {Function} Returns a new `lodash` function.
		   * @example
		   *
		   * _.mixin({ 'foo': _.constant('foo') });
		   *
		   * var lodash = _.runInContext();
		   * lodash.mixin({ 'bar': lodash.constant('bar') });
		   *
		   * _.isFunction(_.foo);
		   * // => true
		   * _.isFunction(_.bar);
		   * // => false
		   *
		   * lodash.isFunction(lodash.foo);
		   * // => false
		   * lodash.isFunction(lodash.bar);
		   * // => true
		   *
		   * // Create a suped-up `defer` in Node.js.
		   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
		   */
		  var runInContext = (function runInContext(context) {
		    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

		    /** Built-in constructor references. */
		    var Array = context.Array,
		        Date = context.Date,
		        Error = context.Error,
		        Function = context.Function,
		        Math = context.Math,
		        Object = context.Object,
		        RegExp = context.RegExp,
		        String = context.String,
		        TypeError = context.TypeError;

		    /** Used for built-in method references. */
		    var arrayProto = Array.prototype,
		        funcProto = Function.prototype,
		        objectProto = Object.prototype;

		    /** Used to detect overreaching core-js shims. */
		    var coreJsData = context['__core-js_shared__'];

		    /** Used to resolve the decompiled source of functions. */
		    var funcToString = funcProto.toString;

		    /** Used to check objects for own properties. */
		    var hasOwnProperty = objectProto.hasOwnProperty;

		    /** Used to generate unique IDs. */
		    var idCounter = 0;

		    /** Used to detect methods masquerading as native. */
		    var maskSrcKey = (function() {
		      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
		      return uid ? ('Symbol(src)_1.' + uid) : '';
		    }());

		    /**
		     * Used to resolve the
		     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		     * of values.
		     */
		    var nativeObjectToString = objectProto.toString;

		    /** Used to infer the `Object` constructor. */
		    var objectCtorString = funcToString.call(Object);

		    /** Used to restore the original `_` reference in `_.noConflict`. */
		    var oldDash = root._;

		    /** Used to detect if a method is native. */
		    var reIsNative = RegExp('^' +
		      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
		      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
		    );

		    /** Built-in value references. */
		    var Buffer = moduleExports ? context.Buffer : undefined,
		        Symbol = context.Symbol,
		        Uint8Array = context.Uint8Array,
		        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
		        getPrototype = overArg(Object.getPrototypeOf, Object),
		        objectCreate = Object.create,
		        propertyIsEnumerable = objectProto.propertyIsEnumerable,
		        splice = arrayProto.splice,
		        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
		        symIterator = Symbol ? Symbol.iterator : undefined,
		        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

		    var defineProperty = (function() {
		      try {
		        var func = getNative(Object, 'defineProperty');
		        func({}, '', {});
		        return func;
		      } catch (e) {}
		    }());

		    /** Mocked built-ins. */
		    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
		        ctxNow = Date && Date.now !== root.Date.now && Date.now,
		        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

		    /* Built-in method references for those with the same name as other `lodash` methods. */
		    var nativeCeil = Math.ceil,
		        nativeFloor = Math.floor,
		        nativeGetSymbols = Object.getOwnPropertySymbols,
		        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
		        nativeIsFinite = context.isFinite,
		        nativeJoin = arrayProto.join,
		        nativeKeys = overArg(Object.keys, Object),
		        nativeMax = Math.max,
		        nativeMin = Math.min,
		        nativeNow = Date.now,
		        nativeParseInt = context.parseInt,
		        nativeRandom = Math.random,
		        nativeReverse = arrayProto.reverse;

		    /* Built-in method references that are verified to be native. */
		    var DataView = getNative(context, 'DataView'),
		        Map = getNative(context, 'Map'),
		        Promise = getNative(context, 'Promise'),
		        Set = getNative(context, 'Set'),
		        WeakMap = getNative(context, 'WeakMap'),
		        nativeCreate = getNative(Object, 'create');

		    /** Used to store function metadata. */
		    var metaMap = WeakMap && new WeakMap;

		    /** Used to lookup unminified function names. */
		    var realNames = {};

		    /** Used to detect maps, sets, and weakmaps. */
		    var dataViewCtorString = toSource(DataView),
		        mapCtorString = toSource(Map),
		        promiseCtorString = toSource(Promise),
		        setCtorString = toSource(Set),
		        weakMapCtorString = toSource(WeakMap);

		    /** Used to convert symbols to primitives and strings. */
		    var symbolProto = Symbol ? Symbol.prototype : undefined,
		        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
		        symbolToString = symbolProto ? symbolProto.toString : undefined;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a `lodash` object which wraps `value` to enable implicit method
		     * chain sequences. Methods that operate on and return arrays, collections,
		     * and functions can be chained together. Methods that retrieve a single value
		     * or may return a primitive value will automatically end the chain sequence
		     * and return the unwrapped value. Otherwise, the value must be unwrapped
		     * with `_#value`.
		     *
		     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
		     * enabled using `_.chain`.
		     *
		     * The execution of chained methods is lazy, that is, it's deferred until
		     * `_#value` is implicitly or explicitly called.
		     *
		     * Lazy evaluation allows several methods to support shortcut fusion.
		     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
		     * the creation of intermediate arrays and can greatly reduce the number of
		     * iteratee executions. Sections of a chain sequence qualify for shortcut
		     * fusion if the section is applied to an array of at least `200` elements
		     * and any iteratees accept only one argument. The heuristic for whether a
		     * section qualifies for shortcut fusion is subject to change.
		     *
		     * Chaining is supported in custom builds as long as the `_#value` method is
		     * directly or indirectly included in the build.
		     *
		     * In addition to lodash methods, wrappers have `Array` and `String` methods.
		     *
		     * The wrapper `Array` methods are:
		     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
		     *
		     * The wrapper `String` methods are:
		     * `replace` and `split`
		     *
		     * The wrapper methods that support shortcut fusion are:
		     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
		     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
		     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
		     *
		     * The chainable wrapper methods are:
		     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
		     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
		     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
		     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
		     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
		     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
		     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
		     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
		     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
		     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
		     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
		     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
		     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
		     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
		     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
		     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
		     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
		     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
		     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
		     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
		     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
		     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
		     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
		     * `zipObject`, `zipObjectDeep`, and `zipWith`
		     *
		     * The wrapper methods that are **not** chainable by default are:
		     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
		     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
		     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
		     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
		     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
		     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
		     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
		     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
		     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
		     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
		     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
		     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
		     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
		     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
		     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
		     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
		     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
		     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
		     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
		     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
		     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
		     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
		     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
		     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
		     * `upperFirst`, `value`, and `words`
		     *
		     * @name _
		     * @constructor
		     * @category Seq
		     * @param {*} value The value to wrap in a `lodash` instance.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var wrapped = _([1, 2, 3]);
		     *
		     * // Returns an unwrapped value.
		     * wrapped.reduce(_.add);
		     * // => 6
		     *
		     * // Returns a wrapped value.
		     * var squares = wrapped.map(square);
		     *
		     * _.isArray(squares);
		     * // => false
		     *
		     * _.isArray(squares.value());
		     * // => true
		     */
		    function lodash(value) {
		      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
		        if (value instanceof LodashWrapper) {
		          return value;
		        }
		        if (hasOwnProperty.call(value, '__wrapped__')) {
		          return wrapperClone(value);
		        }
		      }
		      return new LodashWrapper(value);
		    }

		    /**
		     * The base implementation of `_.create` without support for assigning
		     * properties to the created object.
		     *
		     * @private
		     * @param {Object} proto The object to inherit from.
		     * @returns {Object} Returns the new object.
		     */
		    var baseCreate = (function() {
		      function object() {}
		      return function(proto) {
		        if (!isObject(proto)) {
		          return {};
		        }
		        if (objectCreate) {
		          return objectCreate(proto);
		        }
		        object.prototype = proto;
		        var result = new object;
		        object.prototype = undefined;
		        return result;
		      };
		    }());

		    /**
		     * The function whose prototype chain sequence wrappers inherit from.
		     *
		     * @private
		     */
		    function baseLodash() {
		      // No operation performed.
		    }

		    /**
		     * The base constructor for creating `lodash` wrapper objects.
		     *
		     * @private
		     * @param {*} value The value to wrap.
		     * @param {boolean} [chainAll] Enable explicit method chain sequences.
		     */
		    function LodashWrapper(value, chainAll) {
		      this.__wrapped__ = value;
		      this.__actions__ = [];
		      this.__chain__ = !!chainAll;
		      this.__index__ = 0;
		      this.__values__ = undefined;
		    }

		    /**
		     * By default, the template delimiters used by lodash are like those in
		     * embedded Ruby (ERB). Change the following template settings to use
		     * alternative delimiters.
		     *
		     * @static
		     * @memberOf _
		     * @type {Object}
		     */
		    lodash.templateSettings = {

		      /**
		       * Used to detect `data` property values to be HTML-escaped.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'escape': reEscape,

		      /**
		       * Used to detect code to be evaluated.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'evaluate': reEvaluate,

		      /**
		       * Used to detect `data` property values to inject.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'interpolate': reInterpolate,

		      /**
		       * Used to reference the data object in the template text.
		       *
		       * @memberOf _.templateSettings
		       * @type {string}
		       */
		      'variable': '',

		      /**
		       * Used to import variables into the compiled template.
		       *
		       * @memberOf _.templateSettings
		       * @type {Object}
		       */
		      'imports': {

		        /**
		         * A reference to the `lodash` function.
		         *
		         * @memberOf _.templateSettings.imports
		         * @type {Function}
		         */
		        '_': lodash
		      }
		    };

		    // Ensure wrappers are instances of `baseLodash`.
		    lodash.prototype = baseLodash.prototype;
		    lodash.prototype.constructor = lodash;

		    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
		    LodashWrapper.prototype.constructor = LodashWrapper;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
		     *
		     * @private
		     * @constructor
		     * @param {*} value The value to wrap.
		     */
		    function LazyWrapper(value) {
		      this.__wrapped__ = value;
		      this.__actions__ = [];
		      this.__dir__ = 1;
		      this.__filtered__ = false;
		      this.__iteratees__ = [];
		      this.__takeCount__ = MAX_ARRAY_LENGTH;
		      this.__views__ = [];
		    }

		    /**
		     * Creates a clone of the lazy wrapper object.
		     *
		     * @private
		     * @name clone
		     * @memberOf LazyWrapper
		     * @returns {Object} Returns the cloned `LazyWrapper` object.
		     */
		    function lazyClone() {
		      var result = new LazyWrapper(this.__wrapped__);
		      result.__actions__ = copyArray(this.__actions__);
		      result.__dir__ = this.__dir__;
		      result.__filtered__ = this.__filtered__;
		      result.__iteratees__ = copyArray(this.__iteratees__);
		      result.__takeCount__ = this.__takeCount__;
		      result.__views__ = copyArray(this.__views__);
		      return result;
		    }

		    /**
		     * Reverses the direction of lazy iteration.
		     *
		     * @private
		     * @name reverse
		     * @memberOf LazyWrapper
		     * @returns {Object} Returns the new reversed `LazyWrapper` object.
		     */
		    function lazyReverse() {
		      if (this.__filtered__) {
		        var result = new LazyWrapper(this);
		        result.__dir__ = -1;
		        result.__filtered__ = true;
		      } else {
		        result = this.clone();
		        result.__dir__ *= -1;
		      }
		      return result;
		    }

		    /**
		     * Extracts the unwrapped value from its lazy wrapper.
		     *
		     * @private
		     * @name value
		     * @memberOf LazyWrapper
		     * @returns {*} Returns the unwrapped value.
		     */
		    function lazyValue() {
		      var array = this.__wrapped__.value(),
		          dir = this.__dir__,
		          isArr = isArray(array),
		          isRight = dir < 0,
		          arrLength = isArr ? array.length : 0,
		          view = getView(0, arrLength, this.__views__),
		          start = view.start,
		          end = view.end,
		          length = end - start,
		          index = isRight ? end : (start - 1),
		          iteratees = this.__iteratees__,
		          iterLength = iteratees.length,
		          resIndex = 0,
		          takeCount = nativeMin(length, this.__takeCount__);

		      if (!isArr || arrLength < LARGE_ARRAY_SIZE ||
		          (arrLength == length && takeCount == length)) {
		        return baseWrapperValue(array, this.__actions__);
		      }
		      var result = [];

		      outer:
		      while (length-- && resIndex < takeCount) {
		        index += dir;

		        var iterIndex = -1,
		            value = array[index];

		        while (++iterIndex < iterLength) {
		          var data = iteratees[iterIndex],
		              iteratee = data.iteratee,
		              type = data.type,
		              computed = iteratee(value);

		          if (type == LAZY_MAP_FLAG) {
		            value = computed;
		          } else if (!computed) {
		            if (type == LAZY_FILTER_FLAG) {
		              continue outer;
		            } else {
		              break outer;
		            }
		          }
		        }
		        result[resIndex++] = value;
		      }
		      return result;
		    }

		    // Ensure `LazyWrapper` is an instance of `baseLodash`.
		    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
		    LazyWrapper.prototype.constructor = LazyWrapper;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a hash object.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function Hash(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the hash.
		     *
		     * @private
		     * @name clear
		     * @memberOf Hash
		     */
		    function hashClear() {
		      this.__data__ = nativeCreate ? nativeCreate(null) : {};
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the hash.
		     *
		     * @private
		     * @name delete
		     * @memberOf Hash
		     * @param {Object} hash The hash to modify.
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function hashDelete(key) {
		      var result = this.has(key) && delete this.__data__[key];
		      this.size -= result ? 1 : 0;
		      return result;
		    }

		    /**
		     * Gets the hash value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf Hash
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function hashGet(key) {
		      var data = this.__data__;
		      if (nativeCreate) {
		        var result = data[key];
		        return result === HASH_UNDEFINED ? undefined : result;
		      }
		      return hasOwnProperty.call(data, key) ? data[key] : undefined;
		    }

		    /**
		     * Checks if a hash value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf Hash
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function hashHas(key) {
		      var data = this.__data__;
		      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
		    }

		    /**
		     * Sets the hash `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf Hash
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the hash instance.
		     */
		    function hashSet(key, value) {
		      var data = this.__data__;
		      this.size += this.has(key) ? 0 : 1;
		      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
		      return this;
		    }

		    // Add methods to `Hash`.
		    Hash.prototype.clear = hashClear;
		    Hash.prototype['delete'] = hashDelete;
		    Hash.prototype.get = hashGet;
		    Hash.prototype.has = hashHas;
		    Hash.prototype.set = hashSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an list cache object.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function ListCache(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the list cache.
		     *
		     * @private
		     * @name clear
		     * @memberOf ListCache
		     */
		    function listCacheClear() {
		      this.__data__ = [];
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the list cache.
		     *
		     * @private
		     * @name delete
		     * @memberOf ListCache
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function listCacheDelete(key) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      if (index < 0) {
		        return false;
		      }
		      var lastIndex = data.length - 1;
		      if (index == lastIndex) {
		        data.pop();
		      } else {
		        splice.call(data, index, 1);
		      }
		      --this.size;
		      return true;
		    }

		    /**
		     * Gets the list cache value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf ListCache
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function listCacheGet(key) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      return index < 0 ? undefined : data[index][1];
		    }

		    /**
		     * Checks if a list cache value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf ListCache
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function listCacheHas(key) {
		      return assocIndexOf(this.__data__, key) > -1;
		    }

		    /**
		     * Sets the list cache `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf ListCache
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the list cache instance.
		     */
		    function listCacheSet(key, value) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      if (index < 0) {
		        ++this.size;
		        data.push([key, value]);
		      } else {
		        data[index][1] = value;
		      }
		      return this;
		    }

		    // Add methods to `ListCache`.
		    ListCache.prototype.clear = listCacheClear;
		    ListCache.prototype['delete'] = listCacheDelete;
		    ListCache.prototype.get = listCacheGet;
		    ListCache.prototype.has = listCacheHas;
		    ListCache.prototype.set = listCacheSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a map cache object to store key-value pairs.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function MapCache(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the map.
		     *
		     * @private
		     * @name clear
		     * @memberOf MapCache
		     */
		    function mapCacheClear() {
		      this.size = 0;
		      this.__data__ = {
		        'hash': new Hash,
		        'map': new (Map || ListCache),
		        'string': new Hash
		      };
		    }

		    /**
		     * Removes `key` and its value from the map.
		     *
		     * @private
		     * @name delete
		     * @memberOf MapCache
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function mapCacheDelete(key) {
		      var result = getMapData(this, key)['delete'](key);
		      this.size -= result ? 1 : 0;
		      return result;
		    }

		    /**
		     * Gets the map value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf MapCache
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function mapCacheGet(key) {
		      return getMapData(this, key).get(key);
		    }

		    /**
		     * Checks if a map value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf MapCache
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function mapCacheHas(key) {
		      return getMapData(this, key).has(key);
		    }

		    /**
		     * Sets the map `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf MapCache
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the map cache instance.
		     */
		    function mapCacheSet(key, value) {
		      var data = getMapData(this, key),
		          size = data.size;

		      data.set(key, value);
		      this.size += data.size == size ? 0 : 1;
		      return this;
		    }

		    // Add methods to `MapCache`.
		    MapCache.prototype.clear = mapCacheClear;
		    MapCache.prototype['delete'] = mapCacheDelete;
		    MapCache.prototype.get = mapCacheGet;
		    MapCache.prototype.has = mapCacheHas;
		    MapCache.prototype.set = mapCacheSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     *
		     * Creates an array cache object to store unique values.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [values] The values to cache.
		     */
		    function SetCache(values) {
		      var index = -1,
		          length = values == null ? 0 : values.length;

		      this.__data__ = new MapCache;
		      while (++index < length) {
		        this.add(values[index]);
		      }
		    }

		    /**
		     * Adds `value` to the array cache.
		     *
		     * @private
		     * @name add
		     * @memberOf SetCache
		     * @alias push
		     * @param {*} value The value to cache.
		     * @returns {Object} Returns the cache instance.
		     */
		    function setCacheAdd(value) {
		      this.__data__.set(value, HASH_UNDEFINED);
		      return this;
		    }

		    /**
		     * Checks if `value` is in the array cache.
		     *
		     * @private
		     * @name has
		     * @memberOf SetCache
		     * @param {*} value The value to search for.
		     * @returns {number} Returns `true` if `value` is found, else `false`.
		     */
		    function setCacheHas(value) {
		      return this.__data__.has(value);
		    }

		    // Add methods to `SetCache`.
		    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
		    SetCache.prototype.has = setCacheHas;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a stack cache object to store key-value pairs.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function Stack(entries) {
		      var data = this.__data__ = new ListCache(entries);
		      this.size = data.size;
		    }

		    /**
		     * Removes all key-value entries from the stack.
		     *
		     * @private
		     * @name clear
		     * @memberOf Stack
		     */
		    function stackClear() {
		      this.__data__ = new ListCache;
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the stack.
		     *
		     * @private
		     * @name delete
		     * @memberOf Stack
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function stackDelete(key) {
		      var data = this.__data__,
		          result = data['delete'](key);

		      this.size = data.size;
		      return result;
		    }

		    /**
		     * Gets the stack value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf Stack
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function stackGet(key) {
		      return this.__data__.get(key);
		    }

		    /**
		     * Checks if a stack value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf Stack
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function stackHas(key) {
		      return this.__data__.has(key);
		    }

		    /**
		     * Sets the stack `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf Stack
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the stack cache instance.
		     */
		    function stackSet(key, value) {
		      var data = this.__data__;
		      if (data instanceof ListCache) {
		        var pairs = data.__data__;
		        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
		          pairs.push([key, value]);
		          this.size = ++data.size;
		          return this;
		        }
		        data = this.__data__ = new MapCache(pairs);
		      }
		      data.set(key, value);
		      this.size = data.size;
		      return this;
		    }

		    // Add methods to `Stack`.
		    Stack.prototype.clear = stackClear;
		    Stack.prototype['delete'] = stackDelete;
		    Stack.prototype.get = stackGet;
		    Stack.prototype.has = stackHas;
		    Stack.prototype.set = stackSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an array of the enumerable property names of the array-like `value`.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @param {boolean} inherited Specify returning inherited property names.
		     * @returns {Array} Returns the array of property names.
		     */
		    function arrayLikeKeys(value, inherited) {
		      var isArr = isArray(value),
		          isArg = !isArr && isArguments(value),
		          isBuff = !isArr && !isArg && isBuffer(value),
		          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
		          skipIndexes = isArr || isArg || isBuff || isType,
		          result = skipIndexes ? baseTimes(value.length, String) : [],
		          length = result.length;

		      for (var key in value) {
		        if ((inherited || hasOwnProperty.call(value, key)) &&
		            !(skipIndexes && (
		               // Safari 9 has enumerable `arguments.length` in strict mode.
		               key == 'length' ||
		               // Node.js 0.10 has enumerable non-index properties on buffers.
		               (isBuff && (key == 'offset' || key == 'parent')) ||
		               // PhantomJS 2 has enumerable non-index properties on typed arrays.
		               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
		               // Skip index properties.
		               isIndex(key, length)
		            ))) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * A specialized version of `_.sample` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to sample.
		     * @returns {*} Returns the random element.
		     */
		    function arraySample(array) {
		      var length = array.length;
		      return length ? array[baseRandom(0, length - 1)] : undefined;
		    }

		    /**
		     * A specialized version of `_.sampleSize` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to sample.
		     * @param {number} n The number of elements to sample.
		     * @returns {Array} Returns the random elements.
		     */
		    function arraySampleSize(array, n) {
		      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
		    }

		    /**
		     * A specialized version of `_.shuffle` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     */
		    function arrayShuffle(array) {
		      return shuffleSelf(copyArray(array));
		    }

		    /**
		     * Used by `_.defaults` to customize its `_.assignIn` use.
		     *
		     * @private
		     * @param {*} objValue The destination value.
		     * @param {*} srcValue The source value.
		     * @param {string} key The key of the property to assign.
		     * @param {Object} object The parent object of `objValue`.
		     * @returns {*} Returns the value to assign.
		     */
		    function assignInDefaults(objValue, srcValue, key, object) {
		      if (objValue === undefined ||
		          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
		        return srcValue;
		      }
		      return objValue;
		    }

		    /**
		     * This function is like `assignValue` except that it doesn't assign
		     * `undefined` values.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function assignMergeValue(object, key, value) {
		      if ((value !== undefined && !eq(object[key], value)) ||
		          (value === undefined && !(key in object))) {
		        baseAssignValue(object, key, value);
		      }
		    }

		    /**
		     * Assigns `value` to `key` of `object` if the existing value is not equivalent
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function assignValue(object, key, value) {
		      var objValue = object[key];
		      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
		          (value === undefined && !(key in object))) {
		        baseAssignValue(object, key, value);
		      }
		    }

		    /**
		     * Gets the index at which the `key` is found in `array` of key-value pairs.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {*} key The key to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     */
		    function assocIndexOf(array, key) {
		      var length = array.length;
		      while (length--) {
		        if (eq(array[length][0], key)) {
		          return length;
		        }
		      }
		      return -1;
		    }

		    /**
		     * Aggregates elements of `collection` on `accumulator` with keys transformed
		     * by `iteratee` and values set by `setter`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} setter The function to set `accumulator` values.
		     * @param {Function} iteratee The iteratee to transform keys.
		     * @param {Object} accumulator The initial aggregated object.
		     * @returns {Function} Returns `accumulator`.
		     */
		    function baseAggregator(collection, setter, iteratee, accumulator) {
		      baseEach(collection, function(value, key, collection) {
		        setter(accumulator, value, iteratee(value), collection);
		      });
		      return accumulator;
		    }

		    /**
		     * The base implementation of `_.assign` without support for multiple sources
		     * or `customizer` functions.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @returns {Object} Returns `object`.
		     */
		    function baseAssign(object, source) {
		      return object && copyObject(source, keys(source), object);
		    }

		    /**
		     * The base implementation of `_.assignIn` without support for multiple sources
		     * or `customizer` functions.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @returns {Object} Returns `object`.
		     */
		    function baseAssignIn(object, source) {
		      return object && copyObject(source, keysIn(source), object);
		    }

		    /**
		     * The base implementation of `assignValue` and `assignMergeValue` without
		     * value checks.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function baseAssignValue(object, key, value) {
		      if (key == '__proto__' && defineProperty) {
		        defineProperty(object, key, {
		          'configurable': true,
		          'enumerable': true,
		          'value': value,
		          'writable': true
		        });
		      } else {
		        object[key] = value;
		      }
		    }

		    /**
		     * The base implementation of `_.at` without support for individual paths.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {string[]} paths The property paths to pick.
		     * @returns {Array} Returns the picked elements.
		     */
		    function baseAt(object, paths) {
		      var index = -1,
		          length = paths.length,
		          result = Array(length),
		          skip = object == null;

		      while (++index < length) {
		        result[index] = skip ? undefined : get(object, paths[index]);
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.clamp` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {number} number The number to clamp.
		     * @param {number} [lower] The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the clamped number.
		     */
		    function baseClamp(number, lower, upper) {
		      if (number === number) {
		        if (upper !== undefined) {
		          number = number <= upper ? number : upper;
		        }
		        if (lower !== undefined) {
		          number = number >= lower ? number : lower;
		        }
		      }
		      return number;
		    }

		    /**
		     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
		     * traversed objects.
		     *
		     * @private
		     * @param {*} value The value to clone.
		     * @param {boolean} bitmask The bitmask flags.
		     *  1 - Deep clone
		     *  2 - Flatten inherited properties
		     *  4 - Clone symbols
		     * @param {Function} [customizer] The function to customize cloning.
		     * @param {string} [key] The key of `value`.
		     * @param {Object} [object] The parent object of `value`.
		     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
		     * @returns {*} Returns the cloned value.
		     */
		    function baseClone(value, bitmask, customizer, key, object, stack) {
		      var result,
		          isDeep = bitmask & CLONE_DEEP_FLAG,
		          isFlat = bitmask & CLONE_FLAT_FLAG,
		          isFull = bitmask & CLONE_SYMBOLS_FLAG;

		      if (customizer) {
		        result = object ? customizer(value, key, object, stack) : customizer(value);
		      }
		      if (result !== undefined) {
		        return result;
		      }
		      if (!isObject(value)) {
		        return value;
		      }
		      var isArr = isArray(value);
		      if (isArr) {
		        result = initCloneArray(value);
		        if (!isDeep) {
		          return copyArray(value, result);
		        }
		      } else {
		        var tag = getTag(value),
		            isFunc = tag == funcTag || tag == genTag;

		        if (isBuffer(value)) {
		          return cloneBuffer(value, isDeep);
		        }
		        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
		          result = (isFlat || isFunc) ? {} : initCloneObject(value);
		          if (!isDeep) {
		            return isFlat
		              ? copySymbolsIn(value, baseAssignIn(result, value))
		              : copySymbols(value, baseAssign(result, value));
		          }
		        } else {
		          if (!cloneableTags[tag]) {
		            return object ? value : {};
		          }
		          result = initCloneByTag(value, tag, baseClone, isDeep);
		        }
		      }
		      // Check for circular references and return its corresponding clone.
		      stack || (stack = new Stack);
		      var stacked = stack.get(value);
		      if (stacked) {
		        return stacked;
		      }
		      stack.set(value, result);

		      var keysFunc = isFull
		        ? (isFlat ? getAllKeysIn : getAllKeys)
		        : (isFlat ? keysIn : keys);

		      var props = isArr ? undefined : keysFunc(value);
		      arrayEach(props || value, function(subValue, key) {
		        if (props) {
		          key = subValue;
		          subValue = value[key];
		        }
		        // Recursively populate clone (susceptible to call stack limits).
		        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.conforms` which doesn't clone `source`.
		     *
		     * @private
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseConforms(source) {
		      var props = keys(source);
		      return function(object) {
		        return baseConformsTo(object, source, props);
		      };
		    }

		    /**
		     * The base implementation of `_.conformsTo` which accepts `props` to check.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
		     */
		    function baseConformsTo(object, source, props) {
		      var length = props.length;
		      if (object == null) {
		        return !length;
		      }
		      object = Object(object);
		      while (length--) {
		        var key = props[length],
		            predicate = source[key],
		            value = object[key];

		        if ((value === undefined && !(key in object)) || !predicate(value)) {
		          return false;
		        }
		      }
		      return true;
		    }

		    /**
		     * The base implementation of `_.delay` and `_.defer` which accepts `args`
		     * to provide to `func`.
		     *
		     * @private
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @param {Array} args The arguments to provide to `func`.
		     * @returns {number|Object} Returns the timer id or timeout object.
		     */
		    function baseDelay(func, wait, args) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      return setTimeout(function() { func.apply(undefined, args); }, wait);
		    }

		    /**
		     * The base implementation of methods like `_.difference` without support
		     * for excluding multiple arrays or iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Array} values The values to exclude.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     */
		    function baseDifference(array, values, iteratee, comparator) {
		      var index = -1,
		          includes = arrayIncludes,
		          isCommon = true,
		          length = array.length,
		          result = [],
		          valuesLength = values.length;

		      if (!length) {
		        return result;
		      }
		      if (iteratee) {
		        values = arrayMap(values, baseUnary(iteratee));
		      }
		      if (comparator) {
		        includes = arrayIncludesWith;
		        isCommon = false;
		      }
		      else if (values.length >= LARGE_ARRAY_SIZE) {
		        includes = cacheHas;
		        isCommon = false;
		        values = new SetCache(values);
		      }
		      outer:
		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee == null ? value : iteratee(value);

		        value = (comparator || value !== 0) ? value : 0;
		        if (isCommon && computed === computed) {
		          var valuesIndex = valuesLength;
		          while (valuesIndex--) {
		            if (values[valuesIndex] === computed) {
		              continue outer;
		            }
		          }
		          result.push(value);
		        }
		        else if (!includes(values, computed, comparator)) {
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.forEach` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     */
		    var baseEach = createBaseEach(baseForOwn);

		    /**
		     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     */
		    var baseEachRight = createBaseEach(baseForOwnRight, true);

		    /**
		     * The base implementation of `_.every` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {boolean} Returns `true` if all elements pass the predicate check,
		     *  else `false`
		     */
		    function baseEvery(collection, predicate) {
		      var result = true;
		      baseEach(collection, function(value, index, collection) {
		        result = !!predicate(value, index, collection);
		        return result;
		      });
		      return result;
		    }

		    /**
		     * The base implementation of methods like `_.max` and `_.min` which accepts a
		     * `comparator` to determine the extremum value.
		     *
		     * @private
		     * @param {Array} array The array to iterate over.
		     * @param {Function} iteratee The iteratee invoked per iteration.
		     * @param {Function} comparator The comparator used to compare values.
		     * @returns {*} Returns the extremum value.
		     */
		    function baseExtremum(array, iteratee, comparator) {
		      var index = -1,
		          length = array.length;

		      while (++index < length) {
		        var value = array[index],
		            current = iteratee(value);

		        if (current != null && (computed === undefined
		              ? (current === current && !isSymbol(current))
		              : comparator(current, computed)
		            )) {
		          var computed = current,
		              result = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.fill` without an iteratee call guard.
		     *
		     * @private
		     * @param {Array} array The array to fill.
		     * @param {*} value The value to fill `array` with.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns `array`.
		     */
		    function baseFill(array, value, start, end) {
		      var length = array.length;

		      start = toInteger(start);
		      if (start < 0) {
		        start = -start > length ? 0 : (length + start);
		      }
		      end = (end === undefined || end > length) ? length : toInteger(end);
		      if (end < 0) {
		        end += length;
		      }
		      end = start > end ? 0 : toLength(end);
		      while (start < end) {
		        array[start++] = value;
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.filter` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     */
		    function baseFilter(collection, predicate) {
		      var result = [];
		      baseEach(collection, function(value, index, collection) {
		        if (predicate(value, index, collection)) {
		          result.push(value);
		        }
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.flatten` with support for restricting flattening.
		     *
		     * @private
		     * @param {Array} array The array to flatten.
		     * @param {number} depth The maximum recursion depth.
		     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
		     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
		     * @param {Array} [result=[]] The initial result value.
		     * @returns {Array} Returns the new flattened array.
		     */
		    function baseFlatten(array, depth, predicate, isStrict, result) {
		      var index = -1,
		          length = array.length;

		      predicate || (predicate = isFlattenable);
		      result || (result = []);

		      while (++index < length) {
		        var value = array[index];
		        if (depth > 0 && predicate(value)) {
		          if (depth > 1) {
		            // Recursively flatten arrays (susceptible to call stack limits).
		            baseFlatten(value, depth - 1, predicate, isStrict, result);
		          } else {
		            arrayPush(result, value);
		          }
		        } else if (!isStrict) {
		          result[result.length] = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `baseForOwn` which iterates over `object`
		     * properties returned by `keysFunc` and invokes `iteratee` for each property.
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @returns {Object} Returns `object`.
		     */
		    var baseFor = createBaseFor();

		    /**
		     * This function is like `baseFor` except that it iterates over properties
		     * in the opposite order.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @returns {Object} Returns `object`.
		     */
		    var baseForRight = createBaseFor(true);

		    /**
		     * The base implementation of `_.forOwn` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     */
		    function baseForOwn(object, iteratee) {
		      return object && baseFor(object, iteratee, keys);
		    }

		    /**
		     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     */
		    function baseForOwnRight(object, iteratee) {
		      return object && baseForRight(object, iteratee, keys);
		    }

		    /**
		     * The base implementation of `_.functions` which creates an array of
		     * `object` function property names filtered from `props`.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Array} props The property names to filter.
		     * @returns {Array} Returns the function names.
		     */
		    function baseFunctions(object, props) {
		      return arrayFilter(props, function(key) {
		        return isFunction(object[key]);
		      });
		    }

		    /**
		     * The base implementation of `_.get` without support for default values.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to get.
		     * @returns {*} Returns the resolved value.
		     */
		    function baseGet(object, path) {
		      path = castPath(path, object);

		      var index = 0,
		          length = path.length;

		      while (object != null && index < length) {
		        object = object[toKey(path[index++])];
		      }
		      return (index && index == length) ? object : undefined;
		    }

		    /**
		     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
		     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
		     * symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @param {Function} symbolsFunc The function to get the symbols of `object`.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		      var result = keysFunc(object);
		      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
		    }

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
		      value = Object(value);
		      return (symToStringTag && symToStringTag in value)
		        ? getRawTag(value)
		        : objectToString(value);
		    }

		    /**
		     * The base implementation of `_.gt` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than `other`,
		     *  else `false`.
		     */
		    function baseGt(value, other) {
		      return value > other;
		    }

		    /**
		     * The base implementation of `_.has` without support for deep paths.
		     *
		     * @private
		     * @param {Object} [object] The object to query.
		     * @param {Array|string} key The key to check.
		     * @returns {boolean} Returns `true` if `key` exists, else `false`.
		     */
		    function baseHas(object, key) {
		      return object != null && hasOwnProperty.call(object, key);
		    }

		    /**
		     * The base implementation of `_.hasIn` without support for deep paths.
		     *
		     * @private
		     * @param {Object} [object] The object to query.
		     * @param {Array|string} key The key to check.
		     * @returns {boolean} Returns `true` if `key` exists, else `false`.
		     */
		    function baseHasIn(object, key) {
		      return object != null && key in Object(object);
		    }

		    /**
		     * The base implementation of `_.inRange` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {number} number The number to check.
		     * @param {number} start The start of the range.
		     * @param {number} end The end of the range.
		     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
		     */
		    function baseInRange(number, start, end) {
		      return number >= nativeMin(start, end) && number < nativeMax(start, end);
		    }

		    /**
		     * The base implementation of methods like `_.intersection`, without support
		     * for iteratee shorthands, that accepts an array of arrays to inspect.
		     *
		     * @private
		     * @param {Array} arrays The arrays to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of shared values.
		     */
		    function baseIntersection(arrays, iteratee, comparator) {
		      var includes = comparator ? arrayIncludesWith : arrayIncludes,
		          length = arrays[0].length,
		          othLength = arrays.length,
		          othIndex = othLength,
		          caches = Array(othLength),
		          maxLength = Infinity,
		          result = [];

		      while (othIndex--) {
		        var array = arrays[othIndex];
		        if (othIndex && iteratee) {
		          array = arrayMap(array, baseUnary(iteratee));
		        }
		        maxLength = nativeMin(array.length, maxLength);
		        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
		          ? new SetCache(othIndex && array)
		          : undefined;
		      }
		      array = arrays[0];

		      var index = -1,
		          seen = caches[0];

		      outer:
		      while (++index < length && result.length < maxLength) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        value = (comparator || value !== 0) ? value : 0;
		        if (!(seen
		              ? cacheHas(seen, computed)
		              : includes(result, computed, comparator)
		            )) {
		          othIndex = othLength;
		          while (--othIndex) {
		            var cache = caches[othIndex];
		            if (!(cache
		                  ? cacheHas(cache, computed)
		                  : includes(arrays[othIndex], computed, comparator))
		                ) {
		              continue outer;
		            }
		          }
		          if (seen) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.invert` and `_.invertBy` which inverts
		     * `object` with values transformed by `iteratee` and set by `setter`.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} setter The function to set `accumulator` values.
		     * @param {Function} iteratee The iteratee to transform values.
		     * @param {Object} accumulator The initial inverted object.
		     * @returns {Function} Returns `accumulator`.
		     */
		    function baseInverter(object, setter, iteratee, accumulator) {
		      baseForOwn(object, function(value, key, object) {
		        setter(accumulator, iteratee(value), key, object);
		      });
		      return accumulator;
		    }

		    /**
		     * The base implementation of `_.invoke` without support for individual
		     * method arguments.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {Array} args The arguments to invoke the method with.
		     * @returns {*} Returns the result of the invoked method.
		     */
		    function baseInvoke(object, path, args) {
		      path = castPath(path, object);
		      object = parent(object, path);
		      var func = object == null ? object : object[toKey(last(path))];
		      return func == null ? undefined : apply(func, object, args);
		    }

		    /**
		     * The base implementation of `_.isArguments`.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		     */
		    function baseIsArguments(value) {
		      return isObjectLike(value) && baseGetTag(value) == argsTag;
		    }

		    /**
		     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
		     */
		    function baseIsArrayBuffer(value) {
		      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
		    }

		    /**
		     * The base implementation of `_.isDate` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
		     */
		    function baseIsDate(value) {
		      return isObjectLike(value) && baseGetTag(value) == dateTag;
		    }

		    /**
		     * The base implementation of `_.isEqual` which supports partial comparisons
		     * and tracks traversed objects.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @param {boolean} bitmask The bitmask flags.
		     *  1 - Unordered comparison
		     *  2 - Partial comparison
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     */
		    function baseIsEqual(value, other, bitmask, customizer, stack) {
		      if (value === other) {
		        return true;
		      }
		      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
		        return value !== value && other !== other;
		      }
		      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
		    }

		    /**
		     * A specialized version of `baseIsEqual` for arrays and objects which performs
		     * deep comparisons and tracks traversed objects enabling objects with circular
		     * references to be compared.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
		      var objIsArr = isArray(object),
		          othIsArr = isArray(other),
		          objTag = arrayTag,
		          othTag = arrayTag;

		      if (!objIsArr) {
		        objTag = getTag(object);
		        objTag = objTag == argsTag ? objectTag : objTag;
		      }
		      if (!othIsArr) {
		        othTag = getTag(other);
		        othTag = othTag == argsTag ? objectTag : othTag;
		      }
		      var objIsObj = objTag == objectTag,
		          othIsObj = othTag == objectTag,
		          isSameTag = objTag == othTag;

		      if (isSameTag && isBuffer(object)) {
		        if (!isBuffer(other)) {
		          return false;
		        }
		        objIsArr = true;
		        objIsObj = false;
		      }
		      if (isSameTag && !objIsObj) {
		        stack || (stack = new Stack);
		        return (objIsArr || isTypedArray(object))
		          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
		          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
		      }
		      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
		        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
		            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

		        if (objIsWrapped || othIsWrapped) {
		          var objUnwrapped = objIsWrapped ? object.value() : object,
		              othUnwrapped = othIsWrapped ? other.value() : other;

		          stack || (stack = new Stack);
		          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		        }
		      }
		      if (!isSameTag) {
		        return false;
		      }
		      stack || (stack = new Stack);
		      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
		    }

		    /**
		     * The base implementation of `_.isMap` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		     */
		    function baseIsMap(value) {
		      return isObjectLike(value) && getTag(value) == mapTag;
		    }

		    /**
		     * The base implementation of `_.isMatch` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @param {Array} matchData The property names, values, and compare flags to match.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     */
		    function baseIsMatch(object, source, matchData, customizer) {
		      var index = matchData.length,
		          length = index,
		          noCustomizer = !customizer;

		      if (object == null) {
		        return !length;
		      }
		      object = Object(object);
		      while (index--) {
		        var data = matchData[index];
		        if ((noCustomizer && data[2])
		              ? data[1] !== object[data[0]]
		              : !(data[0] in object)
		            ) {
		          return false;
		        }
		      }
		      while (++index < length) {
		        data = matchData[index];
		        var key = data[0],
		            objValue = object[key],
		            srcValue = data[1];

		        if (noCustomizer && data[2]) {
		          if (objValue === undefined && !(key in object)) {
		            return false;
		          }
		        } else {
		          var stack = new Stack;
		          if (customizer) {
		            var result = customizer(objValue, srcValue, key, object, source, stack);
		          }
		          if (!(result === undefined
		                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
		                : result
		              )) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }

		    /**
		     * The base implementation of `_.isNative` without bad shim checks.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a native function,
		     *  else `false`.
		     */
		    function baseIsNative(value) {
		      if (!isObject(value) || isMasked(value)) {
		        return false;
		      }
		      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
		      return pattern.test(toSource(value));
		    }

		    /**
		     * The base implementation of `_.isRegExp` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
		     */
		    function baseIsRegExp(value) {
		      return isObjectLike(value) && baseGetTag(value) == regexpTag;
		    }

		    /**
		     * The base implementation of `_.isSet` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		     */
		    function baseIsSet(value) {
		      return isObjectLike(value) && getTag(value) == setTag;
		    }

		    /**
		     * The base implementation of `_.isTypedArray` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		     */
		    function baseIsTypedArray(value) {
		      return isObjectLike(value) &&
		        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
		    }

		    /**
		     * The base implementation of `_.iteratee`.
		     *
		     * @private
		     * @param {*} [value=_.identity] The value to convert to an iteratee.
		     * @returns {Function} Returns the iteratee.
		     */
		    function baseIteratee(value) {
		      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
		      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
		      if (typeof value == 'function') {
		        return value;
		      }
		      if (value == null) {
		        return identity;
		      }
		      if (typeof value == 'object') {
		        return isArray(value)
		          ? baseMatchesProperty(value[0], value[1])
		          : baseMatches(value);
		      }
		      return property(value);
		    }

		    /**
		     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function baseKeys(object) {
		      if (!isPrototype(object)) {
		        return nativeKeys(object);
		      }
		      var result = [];
		      for (var key in Object(object)) {
		        if (hasOwnProperty.call(object, key) && key != 'constructor') {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function baseKeysIn(object) {
		      if (!isObject(object)) {
		        return nativeKeysIn(object);
		      }
		      var isProto = isPrototype(object),
		          result = [];

		      for (var key in object) {
		        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.lt` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than `other`,
		     *  else `false`.
		     */
		    function baseLt(value, other) {
		      return value < other;
		    }

		    /**
		     * The base implementation of `_.map` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array} Returns the new mapped array.
		     */
		    function baseMap(collection, iteratee) {
		      var index = -1,
		          result = isArrayLike(collection) ? Array(collection.length) : [];

		      baseEach(collection, function(value, key, collection) {
		        result[++index] = iteratee(value, key, collection);
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.matches` which doesn't clone `source`.
		     *
		     * @private
		     * @param {Object} source The object of property values to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseMatches(source) {
		      var matchData = getMatchData(source);
		      if (matchData.length == 1 && matchData[0][2]) {
		        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
		      }
		      return function(object) {
		        return object === source || baseIsMatch(object, source, matchData);
		      };
		    }

		    /**
		     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
		     *
		     * @private
		     * @param {string} path The path of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseMatchesProperty(path, srcValue) {
		      if (isKey(path) && isStrictComparable(srcValue)) {
		        return matchesStrictComparable(toKey(path), srcValue);
		      }
		      return function(object) {
		        var objValue = get(object, path);
		        return (objValue === undefined && objValue === srcValue)
		          ? hasIn(object, path)
		          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
		      };
		    }

		    /**
		     * The base implementation of `_.merge` without support for multiple sources.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @param {number} srcIndex The index of `source`.
		     * @param {Function} [customizer] The function to customize merged values.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     */
		    function baseMerge(object, source, srcIndex, customizer, stack) {
		      if (object === source) {
		        return;
		      }
		      baseFor(source, function(srcValue, key) {
		        if (isObject(srcValue)) {
		          stack || (stack = new Stack);
		          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
		        }
		        else {
		          var newValue = customizer
		            ? customizer(object[key], srcValue, (key + ''), object, source, stack)
		            : undefined;

		          if (newValue === undefined) {
		            newValue = srcValue;
		          }
		          assignMergeValue(object, key, newValue);
		        }
		      }, keysIn);
		    }

		    /**
		     * A specialized version of `baseMerge` for arrays and objects which performs
		     * deep merges and tracks traversed objects enabling objects with circular
		     * references to be merged.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @param {string} key The key of the value to merge.
		     * @param {number} srcIndex The index of `source`.
		     * @param {Function} mergeFunc The function to merge values.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     */
		    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
		      var objValue = object[key],
		          srcValue = source[key],
		          stacked = stack.get(srcValue);

		      if (stacked) {
		        assignMergeValue(object, key, stacked);
		        return;
		      }
		      var newValue = customizer
		        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
		        : undefined;

		      var isCommon = newValue === undefined;

		      if (isCommon) {
		        var isArr = isArray(srcValue),
		            isBuff = !isArr && isBuffer(srcValue),
		            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

		        newValue = srcValue;
		        if (isArr || isBuff || isTyped) {
		          if (isArray(objValue)) {
		            newValue = objValue;
		          }
		          else if (isArrayLikeObject(objValue)) {
		            newValue = copyArray(objValue);
		          }
		          else if (isBuff) {
		            isCommon = false;
		            newValue = cloneBuffer(srcValue, true);
		          }
		          else if (isTyped) {
		            isCommon = false;
		            newValue = cloneTypedArray(srcValue, true);
		          }
		          else {
		            newValue = [];
		          }
		        }
		        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
		          newValue = objValue;
		          if (isArguments(objValue)) {
		            newValue = toPlainObject(objValue);
		          }
		          else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
		            newValue = initCloneObject(srcValue);
		          }
		        }
		        else {
		          isCommon = false;
		        }
		      }
		      if (isCommon) {
		        // Recursively merge objects and arrays (susceptible to call stack limits).
		        stack.set(srcValue, newValue);
		        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
		        stack['delete'](srcValue);
		      }
		      assignMergeValue(object, key, newValue);
		    }

		    /**
		     * The base implementation of `_.nth` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {Array} array The array to query.
		     * @param {number} n The index of the element to return.
		     * @returns {*} Returns the nth element of `array`.
		     */
		    function baseNth(array, n) {
		      var length = array.length;
		      if (!length) {
		        return;
		      }
		      n += n < 0 ? length : 0;
		      return isIndex(n, length) ? array[n] : undefined;
		    }

		    /**
		     * The base implementation of `_.orderBy` without param guards.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
		     * @param {string[]} orders The sort orders of `iteratees`.
		     * @returns {Array} Returns the new sorted array.
		     */
		    function baseOrderBy(collection, iteratees, orders) {
		      var index = -1;
		      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

		      var result = baseMap(collection, function(value, key, collection) {
		        var criteria = arrayMap(iteratees, function(iteratee) {
		          return iteratee(value);
		        });
		        return { 'criteria': criteria, 'index': ++index, 'value': value };
		      });

		      return baseSortBy(result, function(object, other) {
		        return compareMultiple(object, other, orders);
		      });
		    }

		    /**
		     * The base implementation of `_.pick` without support for individual
		     * property identifiers.
		     *
		     * @private
		     * @param {Object} object The source object.
		     * @param {string[]} paths The property paths to pick.
		     * @returns {Object} Returns the new object.
		     */
		    function basePick(object, paths) {
		      object = Object(object);
		      return basePickBy(object, paths, function(value, path) {
		        return hasIn(object, path);
		      });
		    }

		    /**
		     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The source object.
		     * @param {string[]} paths The property paths to pick.
		     * @param {Function} predicate The function invoked per property.
		     * @returns {Object} Returns the new object.
		     */
		    function basePickBy(object, paths, predicate) {
		      var index = -1,
		          length = paths.length,
		          result = {};

		      while (++index < length) {
		        var path = paths[index],
		            value = baseGet(object, path);

		        if (predicate(value, path)) {
		          baseSet(result, castPath(path, object), value);
		        }
		      }
		      return result;
		    }

		    /**
		     * A specialized version of `baseProperty` which supports deep paths.
		     *
		     * @private
		     * @param {Array|string} path The path of the property to get.
		     * @returns {Function} Returns the new accessor function.
		     */
		    function basePropertyDeep(path) {
		      return function(object) {
		        return baseGet(object, path);
		      };
		    }

		    /**
		     * The base implementation of `_.pullAllBy` without support for iteratee
		     * shorthands.
		     *
		     * @private
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns `array`.
		     */
		    function basePullAll(array, values, iteratee, comparator) {
		      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
		          index = -1,
		          length = values.length,
		          seen = array;

		      if (array === values) {
		        values = copyArray(values);
		      }
		      if (iteratee) {
		        seen = arrayMap(array, baseUnary(iteratee));
		      }
		      while (++index < length) {
		        var fromIndex = 0,
		            value = values[index],
		            computed = iteratee ? iteratee(value) : value;

		        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
		          if (seen !== array) {
		            splice.call(seen, fromIndex, 1);
		          }
		          splice.call(array, fromIndex, 1);
		        }
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.pullAt` without support for individual
		     * indexes or capturing the removed elements.
		     *
		     * @private
		     * @param {Array} array The array to modify.
		     * @param {number[]} indexes The indexes of elements to remove.
		     * @returns {Array} Returns `array`.
		     */
		    function basePullAt(array, indexes) {
		      var length = array ? indexes.length : 0,
		          lastIndex = length - 1;

		      while (length--) {
		        var index = indexes[length];
		        if (length == lastIndex || index !== previous) {
		          var previous = index;
		          if (isIndex(index)) {
		            splice.call(array, index, 1);
		          } else {
		            baseUnset(array, index);
		          }
		        }
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.random` without support for returning
		     * floating-point numbers.
		     *
		     * @private
		     * @param {number} lower The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the random number.
		     */
		    function baseRandom(lower, upper) {
		      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
		    }

		    /**
		     * The base implementation of `_.range` and `_.rangeRight` which doesn't
		     * coerce arguments.
		     *
		     * @private
		     * @param {number} start The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} step The value to increment or decrement by.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Array} Returns the range of numbers.
		     */
		    function baseRange(start, end, step, fromRight) {
		      var index = -1,
		          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
		          result = Array(length);

		      while (length--) {
		        result[fromRight ? length : ++index] = start;
		        start += step;
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.repeat` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {string} string The string to repeat.
		     * @param {number} n The number of times to repeat the string.
		     * @returns {string} Returns the repeated string.
		     */
		    function baseRepeat(string, n) {
		      var result = '';
		      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
		        return result;
		      }
		      // Leverage the exponentiation by squaring algorithm for a faster repeat.
		      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
		      do {
		        if (n % 2) {
		          result += string;
		        }
		        n = nativeFloor(n / 2);
		        if (n) {
		          string += string;
		        }
		      } while (n);

		      return result;
		    }

		    /**
		     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @returns {Function} Returns the new function.
		     */
		    function baseRest(func, start) {
		      return setToString(overRest(func, start, identity), func + '');
		    }

		    /**
		     * The base implementation of `_.sample`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to sample.
		     * @returns {*} Returns the random element.
		     */
		    function baseSample(collection) {
		      return arraySample(values(collection));
		    }

		    /**
		     * The base implementation of `_.sampleSize` without param guards.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to sample.
		     * @param {number} n The number of elements to sample.
		     * @returns {Array} Returns the random elements.
		     */
		    function baseSampleSize(collection, n) {
		      var array = values(collection);
		      return shuffleSelf(array, baseClamp(n, 0, array.length));
		    }

		    /**
		     * The base implementation of `_.set`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @param {Function} [customizer] The function to customize path creation.
		     * @returns {Object} Returns `object`.
		     */
		    function baseSet(object, path, value, customizer) {
		      if (!isObject(object)) {
		        return object;
		      }
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length,
		          lastIndex = length - 1,
		          nested = object;

		      while (nested != null && ++index < length) {
		        var key = toKey(path[index]),
		            newValue = value;

		        if (index != lastIndex) {
		          var objValue = nested[key];
		          newValue = customizer ? customizer(objValue, key, nested) : undefined;
		          if (newValue === undefined) {
		            newValue = isObject(objValue)
		              ? objValue
		              : (isIndex(path[index + 1]) ? [] : {});
		          }
		        }
		        assignValue(nested, key, newValue);
		        nested = nested[key];
		      }
		      return object;
		    }

		    /**
		     * The base implementation of `setData` without support for hot loop shorting.
		     *
		     * @private
		     * @param {Function} func The function to associate metadata with.
		     * @param {*} data The metadata.
		     * @returns {Function} Returns `func`.
		     */
		    var baseSetData = !metaMap ? identity : function(func, data) {
		      metaMap.set(func, data);
		      return func;
		    };

		    /**
		     * The base implementation of `setToString` without support for hot loop shorting.
		     *
		     * @private
		     * @param {Function} func The function to modify.
		     * @param {Function} string The `toString` result.
		     * @returns {Function} Returns `func`.
		     */
		    var baseSetToString = !defineProperty ? identity : function(func, string) {
		      return defineProperty(func, 'toString', {
		        'configurable': true,
		        'enumerable': false,
		        'value': constant(string),
		        'writable': true
		      });
		    };

		    /**
		     * The base implementation of `_.shuffle`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     */
		    function baseShuffle(collection) {
		      return shuffleSelf(values(collection));
		    }

		    /**
		     * The base implementation of `_.slice` without an iteratee call guard.
		     *
		     * @private
		     * @param {Array} array The array to slice.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function baseSlice(array, start, end) {
		      var index = -1,
		          length = array.length;

		      if (start < 0) {
		        start = -start > length ? 0 : (length + start);
		      }
		      end = end > length ? length : end;
		      if (end < 0) {
		        end += length;
		      }
		      length = start > end ? 0 : ((end - start) >>> 0);
		      start >>>= 0;

		      var result = Array(length);
		      while (++index < length) {
		        result[index] = array[index + start];
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.some` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {boolean} Returns `true` if any element passes the predicate check,
		     *  else `false`.
		     */
		    function baseSome(collection, predicate) {
		      var result;

		      baseEach(collection, function(value, index, collection) {
		        result = predicate(value, index, collection);
		        return !result;
		      });
		      return !!result;
		    }

		    /**
		     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
		     * performs a binary search of `array` to determine the index at which `value`
		     * should be inserted into `array` in order to maintain its sort order.
		     *
		     * @private
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {boolean} [retHighest] Specify returning the highest qualified index.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     */
		    function baseSortedIndex(array, value, retHighest) {
		      var low = 0,
		          high = array == null ? low : array.length;

		      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
		        while (low < high) {
		          var mid = (low + high) >>> 1,
		              computed = array[mid];

		          if (computed !== null && !isSymbol(computed) &&
		              (retHighest ? (computed <= value) : (computed < value))) {
		            low = mid + 1;
		          } else {
		            high = mid;
		          }
		        }
		        return high;
		      }
		      return baseSortedIndexBy(array, value, identity, retHighest);
		    }

		    /**
		     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
		     * which invokes `iteratee` for `value` and each element of `array` to compute
		     * their sort ranking. The iteratee is invoked with one argument; (value).
		     *
		     * @private
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} iteratee The iteratee invoked per element.
		     * @param {boolean} [retHighest] Specify returning the highest qualified index.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     */
		    function baseSortedIndexBy(array, value, iteratee, retHighest) {
		      value = iteratee(value);

		      var low = 0,
		          high = array == null ? 0 : array.length,
		          valIsNaN = value !== value,
		          valIsNull = value === null,
		          valIsSymbol = isSymbol(value),
		          valIsUndefined = value === undefined;

		      while (low < high) {
		        var mid = nativeFloor((low + high) / 2),
		            computed = iteratee(array[mid]),
		            othIsDefined = computed !== undefined,
		            othIsNull = computed === null,
		            othIsReflexive = computed === computed,
		            othIsSymbol = isSymbol(computed);

		        if (valIsNaN) {
		          var setLow = retHighest || othIsReflexive;
		        } else if (valIsUndefined) {
		          setLow = othIsReflexive && (retHighest || othIsDefined);
		        } else if (valIsNull) {
		          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
		        } else if (valIsSymbol) {
		          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
		        } else if (othIsNull || othIsSymbol) {
		          setLow = false;
		        } else {
		          setLow = retHighest ? (computed <= value) : (computed < value);
		        }
		        if (setLow) {
		          low = mid + 1;
		        } else {
		          high = mid;
		        }
		      }
		      return nativeMin(high, MAX_ARRAY_INDEX);
		    }

		    /**
		     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
		     * support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     */
		    function baseSortedUniq(array, iteratee) {
		      var index = -1,
		          length = array.length,
		          resIndex = 0,
		          result = [];

		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        if (!index || !eq(computed, seen)) {
		          var seen = computed;
		          result[resIndex++] = value === 0 ? 0 : value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.toNumber` which doesn't ensure correct
		     * conversions of binary, hexadecimal, or octal string values.
		     *
		     * @private
		     * @param {*} value The value to process.
		     * @returns {number} Returns the number.
		     */
		    function baseToNumber(value) {
		      if (typeof value == 'number') {
		        return value;
		      }
		      if (isSymbol(value)) {
		        return NAN;
		      }
		      return +value;
		    }

		    /**
		     * The base implementation of `_.toString` which doesn't convert nullish
		     * values to empty strings.
		     *
		     * @private
		     * @param {*} value The value to process.
		     * @returns {string} Returns the string.
		     */
		    function baseToString(value) {
		      // Exit early for strings to avoid a performance hit in some environments.
		      if (typeof value == 'string') {
		        return value;
		      }
		      if (isArray(value)) {
		        // Recursively convert values (susceptible to call stack limits).
		        return arrayMap(value, baseToString) + '';
		      }
		      if (isSymbol(value)) {
		        return symbolToString ? symbolToString.call(value) : '';
		      }
		      var result = (value + '');
		      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
		    }

		    /**
		     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     */
		    function baseUniq(array, iteratee, comparator) {
		      var index = -1,
		          includes = arrayIncludes,
		          length = array.length,
		          isCommon = true,
		          result = [],
		          seen = result;

		      if (comparator) {
		        isCommon = false;
		        includes = arrayIncludesWith;
		      }
		      else if (length >= LARGE_ARRAY_SIZE) {
		        var set = iteratee ? null : createSet(array);
		        if (set) {
		          return setToArray(set);
		        }
		        isCommon = false;
		        includes = cacheHas;
		        seen = new SetCache;
		      }
		      else {
		        seen = iteratee ? [] : result;
		      }
		      outer:
		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        value = (comparator || value !== 0) ? value : 0;
		        if (isCommon && computed === computed) {
		          var seenIndex = seen.length;
		          while (seenIndex--) {
		            if (seen[seenIndex] === computed) {
		              continue outer;
		            }
		          }
		          if (iteratee) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		        else if (!includes(seen, computed, comparator)) {
		          if (seen !== result) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.unset`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The property path to unset.
		     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
		     */
		    function baseUnset(object, path) {
		      path = castPath(path, object);
		      object = parent(object, path);
		      return object == null || delete object[toKey(last(path))];
		    }

		    /**
		     * The base implementation of `_.update`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to update.
		     * @param {Function} updater The function to produce the updated value.
		     * @param {Function} [customizer] The function to customize path creation.
		     * @returns {Object} Returns `object`.
		     */
		    function baseUpdate(object, path, updater, customizer) {
		      return baseSet(object, path, updater(baseGet(object, path)), customizer);
		    }

		    /**
		     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
		     * without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to query.
		     * @param {Function} predicate The function invoked per iteration.
		     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function baseWhile(array, predicate, isDrop, fromRight) {
		      var length = array.length,
		          index = fromRight ? length : -1;

		      while ((fromRight ? index-- : ++index < length) &&
		        predicate(array[index], index, array)) {}

		      return isDrop
		        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
		        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
		    }

		    /**
		     * The base implementation of `wrapperValue` which returns the result of
		     * performing a sequence of actions on the unwrapped `value`, where each
		     * successive action is supplied the return value of the previous.
		     *
		     * @private
		     * @param {*} value The unwrapped value.
		     * @param {Array} actions Actions to perform to resolve the unwrapped value.
		     * @returns {*} Returns the resolved value.
		     */
		    function baseWrapperValue(value, actions) {
		      var result = value;
		      if (result instanceof LazyWrapper) {
		        result = result.value();
		      }
		      return arrayReduce(actions, function(result, action) {
		        return action.func.apply(action.thisArg, arrayPush([result], action.args));
		      }, result);
		    }

		    /**
		     * The base implementation of methods like `_.xor`, without support for
		     * iteratee shorthands, that accepts an array of arrays to inspect.
		     *
		     * @private
		     * @param {Array} arrays The arrays to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of values.
		     */
		    function baseXor(arrays, iteratee, comparator) {
		      var length = arrays.length;
		      if (length < 2) {
		        return length ? baseUniq(arrays[0]) : [];
		      }
		      var index = -1,
		          result = Array(length);

		      while (++index < length) {
		        var array = arrays[index],
		            othIndex = -1;

		        while (++othIndex < length) {
		          if (othIndex != index) {
		            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
		          }
		        }
		      }
		      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
		    }

		    /**
		     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
		     *
		     * @private
		     * @param {Array} props The property identifiers.
		     * @param {Array} values The property values.
		     * @param {Function} assignFunc The function to assign values.
		     * @returns {Object} Returns the new object.
		     */
		    function baseZipObject(props, values, assignFunc) {
		      var index = -1,
		          length = props.length,
		          valsLength = values.length,
		          result = {};

		      while (++index < length) {
		        var value = index < valsLength ? values[index] : undefined;
		        assignFunc(result, props[index], value);
		      }
		      return result;
		    }

		    /**
		     * Casts `value` to an empty array if it's not an array like object.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {Array|Object} Returns the cast array-like object.
		     */
		    function castArrayLikeObject(value) {
		      return isArrayLikeObject(value) ? value : [];
		    }

		    /**
		     * Casts `value` to `identity` if it's not a function.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {Function} Returns cast function.
		     */
		    function castFunction(value) {
		      return typeof value == 'function' ? value : identity;
		    }

		    /**
		     * Casts `value` to a path array if it's not one.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @param {Object} [object] The object to query keys on.
		     * @returns {Array} Returns the cast property path array.
		     */
		    function castPath(value, object) {
		      if (isArray(value)) {
		        return value;
		      }
		      return isKey(value, object) ? [value] : stringToPath(toString(value));
		    }

		    /**
		     * A `baseRest` alias which can be replaced with `identity` by module
		     * replacement plugins.
		     *
		     * @private
		     * @type {Function}
		     * @param {Function} func The function to apply a rest parameter to.
		     * @returns {Function} Returns the new function.
		     */
		    var castRest = baseRest;

		    /**
		     * Casts `array` to a slice if it's needed.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {number} start The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the cast slice.
		     */
		    function castSlice(array, start, end) {
		      var length = array.length;
		      end = end === undefined ? length : end;
		      return (!start && end >= length) ? array : baseSlice(array, start, end);
		    }

		    /**
		     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
		     *
		     * @private
		     * @param {number|Object} id The timer id or timeout object of the timer to clear.
		     */
		    var clearTimeout = ctxClearTimeout || function(id) {
		      return root.clearTimeout(id);
		    };

		    /**
		     * Creates a clone of  `buffer`.
		     *
		     * @private
		     * @param {Buffer} buffer The buffer to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Buffer} Returns the cloned buffer.
		     */
		    function cloneBuffer(buffer, isDeep) {
		      if (isDeep) {
		        return buffer.slice();
		      }
		      var length = buffer.length,
		          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

		      buffer.copy(result);
		      return result;
		    }

		    /**
		     * Creates a clone of `arrayBuffer`.
		     *
		     * @private
		     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
		     * @returns {ArrayBuffer} Returns the cloned array buffer.
		     */
		    function cloneArrayBuffer(arrayBuffer) {
		      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
		      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
		      return result;
		    }

		    /**
		     * Creates a clone of `dataView`.
		     *
		     * @private
		     * @param {Object} dataView The data view to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned data view.
		     */
		    function cloneDataView(dataView, isDeep) {
		      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
		      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
		    }

		    /**
		     * Creates a clone of `map`.
		     *
		     * @private
		     * @param {Object} map The map to clone.
		     * @param {Function} cloneFunc The function to clone values.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned map.
		     */
		    function cloneMap(map, isDeep, cloneFunc) {
		      var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
		      return arrayReduce(array, addMapEntry, new map.constructor);
		    }

		    /**
		     * Creates a clone of `regexp`.
		     *
		     * @private
		     * @param {Object} regexp The regexp to clone.
		     * @returns {Object} Returns the cloned regexp.
		     */
		    function cloneRegExp(regexp) {
		      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
		      result.lastIndex = regexp.lastIndex;
		      return result;
		    }

		    /**
		     * Creates a clone of `set`.
		     *
		     * @private
		     * @param {Object} set The set to clone.
		     * @param {Function} cloneFunc The function to clone values.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned set.
		     */
		    function cloneSet(set, isDeep, cloneFunc) {
		      var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
		      return arrayReduce(array, addSetEntry, new set.constructor);
		    }

		    /**
		     * Creates a clone of the `symbol` object.
		     *
		     * @private
		     * @param {Object} symbol The symbol object to clone.
		     * @returns {Object} Returns the cloned symbol object.
		     */
		    function cloneSymbol(symbol) {
		      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
		    }

		    /**
		     * Creates a clone of `typedArray`.
		     *
		     * @private
		     * @param {Object} typedArray The typed array to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned typed array.
		     */
		    function cloneTypedArray(typedArray, isDeep) {
		      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
		      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
		    }

		    /**
		     * Compares values to sort them in ascending order.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {number} Returns the sort order indicator for `value`.
		     */
		    function compareAscending(value, other) {
		      if (value !== other) {
		        var valIsDefined = value !== undefined,
		            valIsNull = value === null,
		            valIsReflexive = value === value,
		            valIsSymbol = isSymbol(value);

		        var othIsDefined = other !== undefined,
		            othIsNull = other === null,
		            othIsReflexive = other === other,
		            othIsSymbol = isSymbol(other);

		        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
		            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
		            (valIsNull && othIsDefined && othIsReflexive) ||
		            (!valIsDefined && othIsReflexive) ||
		            !valIsReflexive) {
		          return 1;
		        }
		        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
		            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
		            (othIsNull && valIsDefined && valIsReflexive) ||
		            (!othIsDefined && valIsReflexive) ||
		            !othIsReflexive) {
		          return -1;
		        }
		      }
		      return 0;
		    }

		    /**
		     * Used by `_.orderBy` to compare multiple properties of a value to another
		     * and stable sort them.
		     *
		     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
		     * specify an order of "desc" for descending or "asc" for ascending sort order
		     * of corresponding values.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {boolean[]|string[]} orders The order to sort by for each property.
		     * @returns {number} Returns the sort order indicator for `object`.
		     */
		    function compareMultiple(object, other, orders) {
		      var index = -1,
		          objCriteria = object.criteria,
		          othCriteria = other.criteria,
		          length = objCriteria.length,
		          ordersLength = orders.length;

		      while (++index < length) {
		        var result = compareAscending(objCriteria[index], othCriteria[index]);
		        if (result) {
		          if (index >= ordersLength) {
		            return result;
		          }
		          var order = orders[index];
		          return result * (order == 'desc' ? -1 : 1);
		        }
		      }
		      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
		      // that causes it, under certain circumstances, to provide the same value for
		      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
		      // for more details.
		      //
		      // This also ensures a stable sort in V8 and other engines.
		      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
		      return object.index - other.index;
		    }

		    /**
		     * Creates an array that is the composition of partially applied arguments,
		     * placeholders, and provided arguments into a single array of arguments.
		     *
		     * @private
		     * @param {Array} args The provided arguments.
		     * @param {Array} partials The arguments to prepend to those provided.
		     * @param {Array} holders The `partials` placeholder indexes.
		     * @params {boolean} [isCurried] Specify composing for a curried function.
		     * @returns {Array} Returns the new array of composed arguments.
		     */
		    function composeArgs(args, partials, holders, isCurried) {
		      var argsIndex = -1,
		          argsLength = args.length,
		          holdersLength = holders.length,
		          leftIndex = -1,
		          leftLength = partials.length,
		          rangeLength = nativeMax(argsLength - holdersLength, 0),
		          result = Array(leftLength + rangeLength),
		          isUncurried = !isCurried;

		      while (++leftIndex < leftLength) {
		        result[leftIndex] = partials[leftIndex];
		      }
		      while (++argsIndex < holdersLength) {
		        if (isUncurried || argsIndex < argsLength) {
		          result[holders[argsIndex]] = args[argsIndex];
		        }
		      }
		      while (rangeLength--) {
		        result[leftIndex++] = args[argsIndex++];
		      }
		      return result;
		    }

		    /**
		     * This function is like `composeArgs` except that the arguments composition
		     * is tailored for `_.partialRight`.
		     *
		     * @private
		     * @param {Array} args The provided arguments.
		     * @param {Array} partials The arguments to append to those provided.
		     * @param {Array} holders The `partials` placeholder indexes.
		     * @params {boolean} [isCurried] Specify composing for a curried function.
		     * @returns {Array} Returns the new array of composed arguments.
		     */
		    function composeArgsRight(args, partials, holders, isCurried) {
		      var argsIndex = -1,
		          argsLength = args.length,
		          holdersIndex = -1,
		          holdersLength = holders.length,
		          rightIndex = -1,
		          rightLength = partials.length,
		          rangeLength = nativeMax(argsLength - holdersLength, 0),
		          result = Array(rangeLength + rightLength),
		          isUncurried = !isCurried;

		      while (++argsIndex < rangeLength) {
		        result[argsIndex] = args[argsIndex];
		      }
		      var offset = argsIndex;
		      while (++rightIndex < rightLength) {
		        result[offset + rightIndex] = partials[rightIndex];
		      }
		      while (++holdersIndex < holdersLength) {
		        if (isUncurried || argsIndex < argsLength) {
		          result[offset + holders[holdersIndex]] = args[argsIndex++];
		        }
		      }
		      return result;
		    }

		    /**
		     * Copies the values of `source` to `array`.
		     *
		     * @private
		     * @param {Array} source The array to copy values from.
		     * @param {Array} [array=[]] The array to copy values to.
		     * @returns {Array} Returns `array`.
		     */
		    function copyArray(source, array) {
		      var index = -1,
		          length = source.length;

		      array || (array = Array(length));
		      while (++index < length) {
		        array[index] = source[index];
		      }
		      return array;
		    }

		    /**
		     * Copies properties of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy properties from.
		     * @param {Array} props The property identifiers to copy.
		     * @param {Object} [object={}] The object to copy properties to.
		     * @param {Function} [customizer] The function to customize copied values.
		     * @returns {Object} Returns `object`.
		     */
		    function copyObject(source, props, object, customizer) {
		      var isNew = !object;
		      object || (object = {});

		      var index = -1,
		          length = props.length;

		      while (++index < length) {
		        var key = props[index];

		        var newValue = customizer
		          ? customizer(object[key], source[key], key, object, source)
		          : undefined;

		        if (newValue === undefined) {
		          newValue = source[key];
		        }
		        if (isNew) {
		          baseAssignValue(object, key, newValue);
		        } else {
		          assignValue(object, key, newValue);
		        }
		      }
		      return object;
		    }

		    /**
		     * Copies own symbols of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy symbols from.
		     * @param {Object} [object={}] The object to copy symbols to.
		     * @returns {Object} Returns `object`.
		     */
		    function copySymbols(source, object) {
		      return copyObject(source, getSymbols(source), object);
		    }

		    /**
		     * Copies own and inherited symbols of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy symbols from.
		     * @param {Object} [object={}] The object to copy symbols to.
		     * @returns {Object} Returns `object`.
		     */
		    function copySymbolsIn(source, object) {
		      return copyObject(source, getSymbolsIn(source), object);
		    }

		    /**
		     * Creates a function like `_.groupBy`.
		     *
		     * @private
		     * @param {Function} setter The function to set accumulator values.
		     * @param {Function} [initializer] The accumulator object initializer.
		     * @returns {Function} Returns the new aggregator function.
		     */
		    function createAggregator(setter, initializer) {
		      return function(collection, iteratee) {
		        var func = isArray(collection) ? arrayAggregator : baseAggregator,
		            accumulator = initializer ? initializer() : {};

		        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
		      };
		    }

		    /**
		     * Creates a function like `_.assign`.
		     *
		     * @private
		     * @param {Function} assigner The function to assign values.
		     * @returns {Function} Returns the new assigner function.
		     */
		    function createAssigner(assigner) {
		      return baseRest(function(object, sources) {
		        var index = -1,
		            length = sources.length,
		            customizer = length > 1 ? sources[length - 1] : undefined,
		            guard = length > 2 ? sources[2] : undefined;

		        customizer = (assigner.length > 3 && typeof customizer == 'function')
		          ? (length--, customizer)
		          : undefined;

		        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
		          customizer = length < 3 ? undefined : customizer;
		          length = 1;
		        }
		        object = Object(object);
		        while (++index < length) {
		          var source = sources[index];
		          if (source) {
		            assigner(object, source, index, customizer);
		          }
		        }
		        return object;
		      });
		    }

		    /**
		     * Creates a `baseEach` or `baseEachRight` function.
		     *
		     * @private
		     * @param {Function} eachFunc The function to iterate over a collection.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new base function.
		     */
		    function createBaseEach(eachFunc, fromRight) {
		      return function(collection, iteratee) {
		        if (collection == null) {
		          return collection;
		        }
		        if (!isArrayLike(collection)) {
		          return eachFunc(collection, iteratee);
		        }
		        var length = collection.length,
		            index = fromRight ? length : -1,
		            iterable = Object(collection);

		        while ((fromRight ? index-- : ++index < length)) {
		          if (iteratee(iterable[index], index, iterable) === false) {
		            break;
		          }
		        }
		        return collection;
		      };
		    }

		    /**
		     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new base function.
		     */
		    function createBaseFor(fromRight) {
		      return function(object, iteratee, keysFunc) {
		        var index = -1,
		            iterable = Object(object),
		            props = keysFunc(object),
		            length = props.length;

		        while (length--) {
		          var key = props[fromRight ? length : ++index];
		          if (iteratee(iterable[key], key, iterable) === false) {
		            break;
		          }
		        }
		        return object;
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with the optional `this`
		     * binding of `thisArg`.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createBind(func, bitmask, thisArg) {
		      var isBind = bitmask & WRAP_BIND_FLAG,
		          Ctor = createCtor(func);

		      function wrapper() {
		        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
		        return fn.apply(isBind ? thisArg : this, arguments);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a function like `_.lowerFirst`.
		     *
		     * @private
		     * @param {string} methodName The name of the `String` case method to use.
		     * @returns {Function} Returns the new case function.
		     */
		    function createCaseFirst(methodName) {
		      return function(string) {
		        string = toString(string);

		        var strSymbols = hasUnicode(string)
		          ? stringToArray(string)
		          : undefined;

		        var chr = strSymbols
		          ? strSymbols[0]
		          : string.charAt(0);

		        var trailing = strSymbols
		          ? castSlice(strSymbols, 1).join('')
		          : string.slice(1);

		        return chr[methodName]() + trailing;
		      };
		    }

		    /**
		     * Creates a function like `_.camelCase`.
		     *
		     * @private
		     * @param {Function} callback The function to combine each word.
		     * @returns {Function} Returns the new compounder function.
		     */
		    function createCompounder(callback) {
		      return function(string) {
		        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
		      };
		    }

		    /**
		     * Creates a function that produces an instance of `Ctor` regardless of
		     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
		     *
		     * @private
		     * @param {Function} Ctor The constructor to wrap.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createCtor(Ctor) {
		      return function() {
		        // Use a `switch` statement to work with class constructors. See
		        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
		        // for more details.
		        var args = arguments;
		        switch (args.length) {
		          case 0: return new Ctor;
		          case 1: return new Ctor(args[0]);
		          case 2: return new Ctor(args[0], args[1]);
		          case 3: return new Ctor(args[0], args[1], args[2]);
		          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
		          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
		          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
		          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
		        }
		        var thisBinding = baseCreate(Ctor.prototype),
		            result = Ctor.apply(thisBinding, args);

		        // Mimic the constructor's `return` behavior.
		        // See https://es5.github.io/#x13.2.2 for more details.
		        return isObject(result) ? result : thisBinding;
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to enable currying.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {number} arity The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createCurry(func, bitmask, arity) {
		      var Ctor = createCtor(func);

		      function wrapper() {
		        var length = arguments.length,
		            args = Array(length),
		            index = length,
		            placeholder = getHolder(wrapper);

		        while (index--) {
		          args[index] = arguments[index];
		        }
		        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
		          ? []
		          : replaceHolders(args, placeholder);

		        length -= holders.length;
		        if (length < arity) {
		          return createRecurry(
		            func, bitmask, createHybrid, wrapper.placeholder, undefined,
		            args, holders, undefined, undefined, arity - length);
		        }
		        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
		        return apply(fn, this, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a `_.find` or `_.findLast` function.
		     *
		     * @private
		     * @param {Function} findIndexFunc The function to find the collection index.
		     * @returns {Function} Returns the new find function.
		     */
		    function createFind(findIndexFunc) {
		      return function(collection, predicate, fromIndex) {
		        var iterable = Object(collection);
		        if (!isArrayLike(collection)) {
		          var iteratee = getIteratee(predicate, 3);
		          collection = keys(collection);
		          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
		        }
		        var index = findIndexFunc(collection, predicate, fromIndex);
		        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
		      };
		    }

		    /**
		     * Creates a `_.flow` or `_.flowRight` function.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new flow function.
		     */
		    function createFlow(fromRight) {
		      return flatRest(function(funcs) {
		        var length = funcs.length,
		            index = length,
		            prereq = LodashWrapper.prototype.thru;

		        if (fromRight) {
		          funcs.reverse();
		        }
		        while (index--) {
		          var func = funcs[index];
		          if (typeof func != 'function') {
		            throw new TypeError(FUNC_ERROR_TEXT);
		          }
		          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
		            var wrapper = new LodashWrapper([], true);
		          }
		        }
		        index = wrapper ? index : length;
		        while (++index < length) {
		          func = funcs[index];

		          var funcName = getFuncName(func),
		              data = funcName == 'wrapper' ? getData(func) : undefined;

		          if (data && isLaziable(data[0]) &&
		                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
		                !data[4].length && data[9] == 1
		              ) {
		            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
		          } else {
		            wrapper = (func.length == 1 && isLaziable(func))
		              ? wrapper[funcName]()
		              : wrapper.thru(func);
		          }
		        }
		        return function() {
		          var args = arguments,
		              value = args[0];

		          if (wrapper && args.length == 1 &&
		              isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
		            return wrapper.plant(value).value();
		          }
		          var index = 0,
		              result = length ? funcs[index].apply(this, args) : value;

		          while (++index < length) {
		            result = funcs[index].call(this, result);
		          }
		          return result;
		        };
		      });
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with optional `this`
		     * binding of `thisArg`, partial application, and currying.
		     *
		     * @private
		     * @param {Function|string} func The function or method name to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to prepend to those provided to
		     *  the new function.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [partialsRight] The arguments to append to those provided
		     *  to the new function.
		     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
		      var isAry = bitmask & WRAP_ARY_FLAG,
		          isBind = bitmask & WRAP_BIND_FLAG,
		          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
		          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
		          isFlip = bitmask & WRAP_FLIP_FLAG,
		          Ctor = isBindKey ? undefined : createCtor(func);

		      function wrapper() {
		        var length = arguments.length,
		            args = Array(length),
		            index = length;

		        while (index--) {
		          args[index] = arguments[index];
		        }
		        if (isCurried) {
		          var placeholder = getHolder(wrapper),
		              holdersCount = countHolders(args, placeholder);
		        }
		        if (partials) {
		          args = composeArgs(args, partials, holders, isCurried);
		        }
		        if (partialsRight) {
		          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
		        }
		        length -= holdersCount;
		        if (isCurried && length < arity) {
		          var newHolders = replaceHolders(args, placeholder);
		          return createRecurry(
		            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
		            args, newHolders, argPos, ary, arity - length
		          );
		        }
		        var thisBinding = isBind ? thisArg : this,
		            fn = isBindKey ? thisBinding[func] : func;

		        length = args.length;
		        if (argPos) {
		          args = reorder(args, argPos);
		        } else if (isFlip && length > 1) {
		          args.reverse();
		        }
		        if (isAry && ary < length) {
		          args.length = ary;
		        }
		        if (this && this !== root && this instanceof wrapper) {
		          fn = Ctor || createCtor(fn);
		        }
		        return fn.apply(thisBinding, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a function like `_.invertBy`.
		     *
		     * @private
		     * @param {Function} setter The function to set accumulator values.
		     * @param {Function} toIteratee The function to resolve iteratees.
		     * @returns {Function} Returns the new inverter function.
		     */
		    function createInverter(setter, toIteratee) {
		      return function(object, iteratee) {
		        return baseInverter(object, setter, toIteratee(iteratee), {});
		      };
		    }

		    /**
		     * Creates a function that performs a mathematical operation on two values.
		     *
		     * @private
		     * @param {Function} operator The function to perform the operation.
		     * @param {number} [defaultValue] The value used for `undefined` arguments.
		     * @returns {Function} Returns the new mathematical operation function.
		     */
		    function createMathOperation(operator, defaultValue) {
		      return function(value, other) {
		        var result;
		        if (value === undefined && other === undefined) {
		          return defaultValue;
		        }
		        if (value !== undefined) {
		          result = value;
		        }
		        if (other !== undefined) {
		          if (result === undefined) {
		            return other;
		          }
		          if (typeof value == 'string' || typeof other == 'string') {
		            value = baseToString(value);
		            other = baseToString(other);
		          } else {
		            value = baseToNumber(value);
		            other = baseToNumber(other);
		          }
		          result = operator(value, other);
		        }
		        return result;
		      };
		    }

		    /**
		     * Creates a function like `_.over`.
		     *
		     * @private
		     * @param {Function} arrayFunc The function to iterate over iteratees.
		     * @returns {Function} Returns the new over function.
		     */
		    function createOver(arrayFunc) {
		      return flatRest(function(iteratees) {
		        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
		        return baseRest(function(args) {
		          var thisArg = this;
		          return arrayFunc(iteratees, function(iteratee) {
		            return apply(iteratee, thisArg, args);
		          });
		        });
		      });
		    }

		    /**
		     * Creates the padding for `string` based on `length`. The `chars` string
		     * is truncated if the number of characters exceeds `length`.
		     *
		     * @private
		     * @param {number} length The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padding for `string`.
		     */
		    function createPadding(length, chars) {
		      chars = chars === undefined ? ' ' : baseToString(chars);

		      var charsLength = chars.length;
		      if (charsLength < 2) {
		        return charsLength ? baseRepeat(chars, length) : chars;
		      }
		      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
		      return hasUnicode(chars)
		        ? castSlice(stringToArray(result), 0, length).join('')
		        : result.slice(0, length);
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with the `this` binding
		     * of `thisArg` and `partials` prepended to the arguments it receives.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} thisArg The `this` binding of `func`.
		     * @param {Array} partials The arguments to prepend to those provided to
		     *  the new function.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createPartial(func, bitmask, thisArg, partials) {
		      var isBind = bitmask & WRAP_BIND_FLAG,
		          Ctor = createCtor(func);

		      function wrapper() {
		        var argsIndex = -1,
		            argsLength = arguments.length,
		            leftIndex = -1,
		            leftLength = partials.length,
		            args = Array(leftLength + argsLength),
		            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

		        while (++leftIndex < leftLength) {
		          args[leftIndex] = partials[leftIndex];
		        }
		        while (argsLength--) {
		          args[leftIndex++] = arguments[++argsIndex];
		        }
		        return apply(fn, isBind ? thisArg : this, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a `_.range` or `_.rangeRight` function.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new range function.
		     */
		    function createRange(fromRight) {
		      return function(start, end, step) {
		        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
		          end = step = undefined;
		        }
		        // Ensure the sign of `-0` is preserved.
		        start = toFinite(start);
		        if (end === undefined) {
		          end = start;
		          start = 0;
		        } else {
		          end = toFinite(end);
		        }
		        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
		        return baseRange(start, end, step, fromRight);
		      };
		    }

		    /**
		     * Creates a function that performs a relational operation on two values.
		     *
		     * @private
		     * @param {Function} operator The function to perform the operation.
		     * @returns {Function} Returns the new relational operation function.
		     */
		    function createRelationalOperation(operator) {
		      return function(value, other) {
		        if (!(typeof value == 'string' && typeof other == 'string')) {
		          value = toNumber(value);
		          other = toNumber(other);
		        }
		        return operator(value, other);
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to continue currying.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {Function} wrapFunc The function to create the `func` wrapper.
		     * @param {*} placeholder The placeholder value.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to prepend to those provided to
		     *  the new function.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
		      var isCurry = bitmask & WRAP_CURRY_FLAG,
		          newHolders = isCurry ? holders : undefined,
		          newHoldersRight = isCurry ? undefined : holders,
		          newPartials = isCurry ? partials : undefined,
		          newPartialsRight = isCurry ? undefined : partials;

		      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
		      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

		      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
		        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
		      }
		      var newData = [
		        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
		        newHoldersRight, argPos, ary, arity
		      ];

		      var result = wrapFunc.apply(undefined, newData);
		      if (isLaziable(func)) {
		        setData(result, newData);
		      }
		      result.placeholder = placeholder;
		      return setWrapToString(result, func, bitmask);
		    }

		    /**
		     * Creates a function like `_.round`.
		     *
		     * @private
		     * @param {string} methodName The name of the `Math` method to use when rounding.
		     * @returns {Function} Returns the new round function.
		     */
		    function createRound(methodName) {
		      var func = Math[methodName];
		      return function(number, precision) {
		        number = toNumber(number);
		        precision = nativeMin(toInteger(precision), 292);
		        if (precision) {
		          // Shift with exponential notation to avoid floating-point issues.
		          // See [MDN](https://mdn.io/round#Examples) for more details.
		          var pair = (toString(number) + 'e').split('e'),
		              value = func(pair[0] + 'e' + (+pair[1] + precision));

		          pair = (toString(value) + 'e').split('e');
		          return +(pair[0] + 'e' + (+pair[1] - precision));
		        }
		        return func(number);
		      };
		    }

		    /**
		     * Creates a set object of `values`.
		     *
		     * @private
		     * @param {Array} values The values to add to the set.
		     * @returns {Object} Returns the new set.
		     */
		    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
		      return new Set(values);
		    };

		    /**
		     * Creates a `_.toPairs` or `_.toPairsIn` function.
		     *
		     * @private
		     * @param {Function} keysFunc The function to get the keys of a given object.
		     * @returns {Function} Returns the new pairs function.
		     */
		    function createToPairs(keysFunc) {
		      return function(object) {
		        var tag = getTag(object);
		        if (tag == mapTag) {
		          return mapToArray(object);
		        }
		        if (tag == setTag) {
		          return setToPairs(object);
		        }
		        return baseToPairs(object, keysFunc(object));
		      };
		    }

		    /**
		     * Creates a function that either curries or invokes `func` with optional
		     * `this` binding and partially applied arguments.
		     *
		     * @private
		     * @param {Function|string} func The function or method name to wrap.
		     * @param {number} bitmask The bitmask flags.
		     *    1 - `_.bind`
		     *    2 - `_.bindKey`
		     *    4 - `_.curry` or `_.curryRight` of a bound function
		     *    8 - `_.curry`
		     *   16 - `_.curryRight`
		     *   32 - `_.partial`
		     *   64 - `_.partialRight`
		     *  128 - `_.rearg`
		     *  256 - `_.ary`
		     *  512 - `_.flip`
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to be partially applied.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
		      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
		      if (!isBindKey && typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      var length = partials ? partials.length : 0;
		      if (!length) {
		        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
		        partials = holders = undefined;
		      }
		      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
		      arity = arity === undefined ? arity : toInteger(arity);
		      length -= holders ? holders.length : 0;

		      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
		        var partialsRight = partials,
		            holdersRight = holders;

		        partials = holders = undefined;
		      }
		      var data = isBindKey ? undefined : getData(func);

		      var newData = [
		        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
		        argPos, ary, arity
		      ];

		      if (data) {
		        mergeData(newData, data);
		      }
		      func = newData[0];
		      bitmask = newData[1];
		      thisArg = newData[2];
		      partials = newData[3];
		      holders = newData[4];
		      arity = newData[9] = newData[9] == null
		        ? (isBindKey ? 0 : func.length)
		        : nativeMax(newData[9] - length, 0);

		      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
		        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
		      }
		      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
		        var result = createBind(func, bitmask, thisArg);
		      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
		        result = createCurry(func, bitmask, arity);
		      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
		        result = createPartial(func, bitmask, thisArg, partials);
		      } else {
		        result = createHybrid.apply(undefined, newData);
		      }
		      var setter = data ? baseSetData : setData;
		      return setWrapToString(setter(result, newData), func, bitmask);
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for arrays with support for
		     * partial deep comparisons.
		     *
		     * @private
		     * @param {Array} array The array to compare.
		     * @param {Array} other The other array to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `array` and `other` objects.
		     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
		     */
		    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
		      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
		          arrLength = array.length,
		          othLength = other.length;

		      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
		        return false;
		      }
		      // Assume cyclic values are equal.
		      var stacked = stack.get(array);
		      if (stacked && stack.get(other)) {
		        return stacked == other;
		      }
		      var index = -1,
		          result = true,
		          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

		      stack.set(array, other);
		      stack.set(other, array);

		      // Ignore non-index properties.
		      while (++index < arrLength) {
		        var arrValue = array[index],
		            othValue = other[index];

		        if (customizer) {
		          var compared = isPartial
		            ? customizer(othValue, arrValue, index, other, array, stack)
		            : customizer(arrValue, othValue, index, array, other, stack);
		        }
		        if (compared !== undefined) {
		          if (compared) {
		            continue;
		          }
		          result = false;
		          break;
		        }
		        // Recursively compare arrays (susceptible to call stack limits).
		        if (seen) {
		          if (!arraySome(other, function(othValue, othIndex) {
		                if (!cacheHas(seen, othIndex) &&
		                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
		                  return seen.push(othIndex);
		                }
		              })) {
		            result = false;
		            break;
		          }
		        } else if (!(
		              arrValue === othValue ||
		                equalFunc(arrValue, othValue, bitmask, customizer, stack)
		            )) {
		          result = false;
		          break;
		        }
		      }
		      stack['delete'](array);
		      stack['delete'](other);
		      return result;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for comparing objects of
		     * the same `toStringTag`.
		     *
		     * **Note:** This function only supports comparing values with tags of
		     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {string} tag The `toStringTag` of the objects to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
		      switch (tag) {
		        case dataViewTag:
		          if ((object.byteLength != other.byteLength) ||
		              (object.byteOffset != other.byteOffset)) {
		            return false;
		          }
		          object = object.buffer;
		          other = other.buffer;

		        case arrayBufferTag:
		          if ((object.byteLength != other.byteLength) ||
		              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
		            return false;
		          }
		          return true;

		        case boolTag:
		        case dateTag:
		        case numberTag:
		          // Coerce booleans to `1` or `0` and dates to milliseconds.
		          // Invalid dates are coerced to `NaN`.
		          return eq(+object, +other);

		        case errorTag:
		          return object.name == other.name && object.message == other.message;

		        case regexpTag:
		        case stringTag:
		          // Coerce regexes to strings and treat strings, primitives and objects,
		          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
		          // for more details.
		          return object == (other + '');

		        case mapTag:
		          var convert = mapToArray;

		        case setTag:
		          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
		          convert || (convert = setToArray);

		          if (object.size != other.size && !isPartial) {
		            return false;
		          }
		          // Assume cyclic values are equal.
		          var stacked = stack.get(object);
		          if (stacked) {
		            return stacked == other;
		          }
		          bitmask |= COMPARE_UNORDERED_FLAG;

		          // Recursively compare objects (susceptible to call stack limits).
		          stack.set(object, other);
		          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
		          stack['delete'](object);
		          return result;

		        case symbolTag:
		          if (symbolValueOf) {
		            return symbolValueOf.call(object) == symbolValueOf.call(other);
		          }
		      }
		      return false;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for objects with support for
		     * partial deep comparisons.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
		      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
		          objProps = keys(object),
		          objLength = objProps.length,
		          othProps = keys(other),
		          othLength = othProps.length;

		      if (objLength != othLength && !isPartial) {
		        return false;
		      }
		      var index = objLength;
		      while (index--) {
		        var key = objProps[index];
		        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
		          return false;
		        }
		      }
		      // Assume cyclic values are equal.
		      var stacked = stack.get(object);
		      if (stacked && stack.get(other)) {
		        return stacked == other;
		      }
		      var result = true;
		      stack.set(object, other);
		      stack.set(other, object);

		      var skipCtor = isPartial;
		      while (++index < objLength) {
		        key = objProps[index];
		        var objValue = object[key],
		            othValue = other[key];

		        if (customizer) {
		          var compared = isPartial
		            ? customizer(othValue, objValue, key, other, object, stack)
		            : customizer(objValue, othValue, key, object, other, stack);
		        }
		        // Recursively compare objects (susceptible to call stack limits).
		        if (!(compared === undefined
		              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
		              : compared
		            )) {
		          result = false;
		          break;
		        }
		        skipCtor || (skipCtor = key == 'constructor');
		      }
		      if (result && !skipCtor) {
		        var objCtor = object.constructor,
		            othCtor = other.constructor;

		        // Non `Object` object instances with different constructors are not equal.
		        if (objCtor != othCtor &&
		            ('constructor' in object && 'constructor' in other) &&
		            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
		              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
		          result = false;
		        }
		      }
		      stack['delete'](object);
		      stack['delete'](other);
		      return result;
		    }

		    /**
		     * A specialized version of `baseRest` which flattens the rest array.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @returns {Function} Returns the new function.
		     */
		    function flatRest(func) {
		      return setToString(overRest(func, undefined, flatten), func + '');
		    }

		    /**
		     * Creates an array of own enumerable property names and symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function getAllKeys(object) {
		      return baseGetAllKeys(object, keys, getSymbols);
		    }

		    /**
		     * Creates an array of own and inherited enumerable property names and
		     * symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function getAllKeysIn(object) {
		      return baseGetAllKeys(object, keysIn, getSymbolsIn);
		    }

		    /**
		     * Gets metadata for `func`.
		     *
		     * @private
		     * @param {Function} func The function to query.
		     * @returns {*} Returns the metadata for `func`.
		     */
		    var getData = !metaMap ? noop : function(func) {
		      return metaMap.get(func);
		    };

		    /**
		     * Gets the name of `func`.
		     *
		     * @private
		     * @param {Function} func The function to query.
		     * @returns {string} Returns the function name.
		     */
		    function getFuncName(func) {
		      var result = (func.name + ''),
		          array = realNames[result],
		          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

		      while (length--) {
		        var data = array[length],
		            otherFunc = data.func;
		        if (otherFunc == null || otherFunc == func) {
		          return data.name;
		        }
		      }
		      return result;
		    }

		    /**
		     * Gets the argument placeholder value for `func`.
		     *
		     * @private
		     * @param {Function} func The function to inspect.
		     * @returns {*} Returns the placeholder value.
		     */
		    function getHolder(func) {
		      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
		      return object.placeholder;
		    }

		    /**
		     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
		     * this function returns the custom method, otherwise it returns `baseIteratee`.
		     * If arguments are provided, the chosen function is invoked with them and
		     * its result is returned.
		     *
		     * @private
		     * @param {*} [value] The value to convert to an iteratee.
		     * @param {number} [arity] The arity of the created iteratee.
		     * @returns {Function} Returns the chosen function or its result.
		     */
		    function getIteratee() {
		      var result = lodash.iteratee || iteratee;
		      result = result === iteratee ? baseIteratee : result;
		      return arguments.length ? result(arguments[0], arguments[1]) : result;
		    }

		    /**
		     * Gets the data for `map`.
		     *
		     * @private
		     * @param {Object} map The map to query.
		     * @param {string} key The reference key.
		     * @returns {*} Returns the map data.
		     */
		    function getMapData(map, key) {
		      var data = map.__data__;
		      return isKeyable(key)
		        ? data[typeof key == 'string' ? 'string' : 'hash']
		        : data.map;
		    }

		    /**
		     * Gets the property names, values, and compare flags of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the match data of `object`.
		     */
		    function getMatchData(object) {
		      var result = keys(object),
		          length = result.length;

		      while (length--) {
		        var key = result[length],
		            value = object[key];

		        result[length] = [key, value, isStrictComparable(value)];
		      }
		      return result;
		    }

		    /**
		     * Gets the native function at `key` of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {string} key The key of the method to get.
		     * @returns {*} Returns the function if it's native, else `undefined`.
		     */
		    function getNative(object, key) {
		      var value = getValue(object, key);
		      return baseIsNative(value) ? value : undefined;
		    }

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

		    /**
		     * Creates an array of the own enumerable symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of symbols.
		     */
		    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

		    /**
		     * Creates an array of the own and inherited enumerable symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of symbols.
		     */
		    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
		      var result = [];
		      while (object) {
		        arrayPush(result, getSymbols(object));
		        object = getPrototype(object);
		      }
		      return result;
		    };

		    /**
		     * Gets the `toStringTag` of `value`.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @returns {string} Returns the `toStringTag`.
		     */
		    var getTag = baseGetTag;

		    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
		    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
		        (Map && getTag(new Map) != mapTag) ||
		        (Promise && getTag(Promise.resolve()) != promiseTag) ||
		        (Set && getTag(new Set) != setTag) ||
		        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
		      getTag = function(value) {
		        var result = baseGetTag(value),
		            Ctor = result == objectTag ? value.constructor : undefined,
		            ctorString = Ctor ? toSource(Ctor) : '';

		        if (ctorString) {
		          switch (ctorString) {
		            case dataViewCtorString: return dataViewTag;
		            case mapCtorString: return mapTag;
		            case promiseCtorString: return promiseTag;
		            case setCtorString: return setTag;
		            case weakMapCtorString: return weakMapTag;
		          }
		        }
		        return result;
		      };
		    }

		    /**
		     * Gets the view, applying any `transforms` to the `start` and `end` positions.
		     *
		     * @private
		     * @param {number} start The start of the view.
		     * @param {number} end The end of the view.
		     * @param {Array} transforms The transformations to apply to the view.
		     * @returns {Object} Returns an object containing the `start` and `end`
		     *  positions of the view.
		     */
		    function getView(start, end, transforms) {
		      var index = -1,
		          length = transforms.length;

		      while (++index < length) {
		        var data = transforms[index],
		            size = data.size;

		        switch (data.type) {
		          case 'drop':      start += size; break;
		          case 'dropRight': end -= size; break;
		          case 'take':      end = nativeMin(end, start + size); break;
		          case 'takeRight': start = nativeMax(start, end - size); break;
		        }
		      }
		      return { 'start': start, 'end': end };
		    }

		    /**
		     * Extracts wrapper details from the `source` body comment.
		     *
		     * @private
		     * @param {string} source The source to inspect.
		     * @returns {Array} Returns the wrapper details.
		     */
		    function getWrapDetails(source) {
		      var match = source.match(reWrapDetails);
		      return match ? match[1].split(reSplitDetails) : [];
		    }

		    /**
		     * Checks if `path` exists on `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @param {Function} hasFunc The function to check properties.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     */
		    function hasPath(object, path, hasFunc) {
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length,
		          result = false;

		      while (++index < length) {
		        var key = toKey(path[index]);
		        if (!(result = object != null && hasFunc(object, key))) {
		          break;
		        }
		        object = object[key];
		      }
		      if (result || ++index != length) {
		        return result;
		      }
		      length = object == null ? 0 : object.length;
		      return !!length && isLength(length) && isIndex(key, length) &&
		        (isArray(object) || isArguments(object));
		    }

		    /**
		     * Initializes an array clone.
		     *
		     * @private
		     * @param {Array} array The array to clone.
		     * @returns {Array} Returns the initialized clone.
		     */
		    function initCloneArray(array) {
		      var length = array.length,
		          result = array.constructor(length);

		      // Add properties assigned by `RegExp#exec`.
		      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
		        result.index = array.index;
		        result.input = array.input;
		      }
		      return result;
		    }

		    /**
		     * Initializes an object clone.
		     *
		     * @private
		     * @param {Object} object The object to clone.
		     * @returns {Object} Returns the initialized clone.
		     */
		    function initCloneObject(object) {
		      return (typeof object.constructor == 'function' && !isPrototype(object))
		        ? baseCreate(getPrototype(object))
		        : {};
		    }

		    /**
		     * Initializes an object clone based on its `toStringTag`.
		     *
		     * **Note:** This function only supports cloning values with tags of
		     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
		     *
		     * @private
		     * @param {Object} object The object to clone.
		     * @param {string} tag The `toStringTag` of the object to clone.
		     * @param {Function} cloneFunc The function to clone values.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the initialized clone.
		     */
		    function initCloneByTag(object, tag, cloneFunc, isDeep) {
		      var Ctor = object.constructor;
		      switch (tag) {
		        case arrayBufferTag:
		          return cloneArrayBuffer(object);

		        case boolTag:
		        case dateTag:
		          return new Ctor(+object);

		        case dataViewTag:
		          return cloneDataView(object, isDeep);

		        case float32Tag: case float64Tag:
		        case int8Tag: case int16Tag: case int32Tag:
		        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
		          return cloneTypedArray(object, isDeep);

		        case mapTag:
		          return cloneMap(object, isDeep, cloneFunc);

		        case numberTag:
		        case stringTag:
		          return new Ctor(object);

		        case regexpTag:
		          return cloneRegExp(object);

		        case setTag:
		          return cloneSet(object, isDeep, cloneFunc);

		        case symbolTag:
		          return cloneSymbol(object);
		      }
		    }

		    /**
		     * Inserts wrapper `details` in a comment at the top of the `source` body.
		     *
		     * @private
		     * @param {string} source The source to modify.
		     * @returns {Array} details The details to insert.
		     * @returns {string} Returns the modified source.
		     */
		    function insertWrapDetails(source, details) {
		      var length = details.length;
		      if (!length) {
		        return source;
		      }
		      var lastIndex = length - 1;
		      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
		      details = details.join(length > 2 ? ', ' : ' ');
		      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
		    }

		    /**
		     * Checks if `value` is a flattenable `arguments` object or array.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
		     */
		    function isFlattenable(value) {
		      return isArray(value) || isArguments(value) ||
		        !!(spreadableSymbol && value && value[spreadableSymbol]);
		    }

		    /**
		     * Checks if `value` is a valid array-like index.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
		     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
		     */
		    function isIndex(value, length) {
		      length = length == null ? MAX_SAFE_INTEGER : length;
		      return !!length &&
		        (typeof value == 'number' || reIsUint.test(value)) &&
		        (value > -1 && value % 1 == 0 && value < length);
		    }

		    /**
		     * Checks if the given arguments are from an iteratee call.
		     *
		     * @private
		     * @param {*} value The potential iteratee value argument.
		     * @param {*} index The potential iteratee index or key argument.
		     * @param {*} object The potential iteratee object argument.
		     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
		     *  else `false`.
		     */
		    function isIterateeCall(value, index, object) {
		      if (!isObject(object)) {
		        return false;
		      }
		      var type = typeof index;
		      if (type == 'number'
		            ? (isArrayLike(object) && isIndex(index, object.length))
		            : (type == 'string' && index in object)
		          ) {
		        return eq(object[index], value);
		      }
		      return false;
		    }

		    /**
		     * Checks if `value` is a property name and not a property path.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @param {Object} [object] The object to query keys on.
		     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
		     */
		    function isKey(value, object) {
		      if (isArray(value)) {
		        return false;
		      }
		      var type = typeof value;
		      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
		          value == null || isSymbol(value)) {
		        return true;
		      }
		      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
		        (object != null && value in Object(object));
		    }

		    /**
		     * Checks if `value` is suitable for use as unique object key.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
		     */
		    function isKeyable(value) {
		      var type = typeof value;
		      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
		        ? (value !== '__proto__')
		        : (value === null);
		    }

		    /**
		     * Checks if `func` has a lazy counterpart.
		     *
		     * @private
		     * @param {Function} func The function to check.
		     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
		     *  else `false`.
		     */
		    function isLaziable(func) {
		      var funcName = getFuncName(func),
		          other = lodash[funcName];

		      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
		        return false;
		      }
		      if (func === other) {
		        return true;
		      }
		      var data = getData(other);
		      return !!data && func === data[0];
		    }

		    /**
		     * Checks if `func` has its source masked.
		     *
		     * @private
		     * @param {Function} func The function to check.
		     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
		     */
		    function isMasked(func) {
		      return !!maskSrcKey && (maskSrcKey in func);
		    }

		    /**
		     * Checks if `func` is capable of being masked.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
		     */
		    var isMaskable = coreJsData ? isFunction : stubFalse;

		    /**
		     * Checks if `value` is likely a prototype object.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
		     */
		    function isPrototype(value) {
		      var Ctor = value && value.constructor,
		          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

		      return value === proto;
		    }

		    /**
		     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` if suitable for strict
		     *  equality comparisons, else `false`.
		     */
		    function isStrictComparable(value) {
		      return value === value && !isObject(value);
		    }

		    /**
		     * A specialized version of `matchesProperty` for source values suitable
		     * for strict equality comparisons, i.e. `===`.
		     *
		     * @private
		     * @param {string} key The key of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function matchesStrictComparable(key, srcValue) {
		      return function(object) {
		        if (object == null) {
		          return false;
		        }
		        return object[key] === srcValue &&
		          (srcValue !== undefined || (key in Object(object)));
		      };
		    }

		    /**
		     * A specialized version of `_.memoize` which clears the memoized function's
		     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
		     *
		     * @private
		     * @param {Function} func The function to have its output memoized.
		     * @returns {Function} Returns the new memoized function.
		     */
		    function memoizeCapped(func) {
		      var result = memoize(func, function(key) {
		        if (cache.size === MAX_MEMOIZE_SIZE) {
		          cache.clear();
		        }
		        return key;
		      });

		      var cache = result.cache;
		      return result;
		    }

		    /**
		     * Merges the function metadata of `source` into `data`.
		     *
		     * Merging metadata reduces the number of wrappers used to invoke a function.
		     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
		     * may be applied regardless of execution order. Methods like `_.ary` and
		     * `_.rearg` modify function arguments, making the order in which they are
		     * executed important, preventing the merging of metadata. However, we make
		     * an exception for a safe combined case where curried functions have `_.ary`
		     * and or `_.rearg` applied.
		     *
		     * @private
		     * @param {Array} data The destination metadata.
		     * @param {Array} source The source metadata.
		     * @returns {Array} Returns `data`.
		     */
		    function mergeData(data, source) {
		      var bitmask = data[1],
		          srcBitmask = source[1],
		          newBitmask = bitmask | srcBitmask,
		          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

		      var isCombo =
		        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
		        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
		        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

		      // Exit early if metadata can't be merged.
		      if (!(isCommon || isCombo)) {
		        return data;
		      }
		      // Use source `thisArg` if available.
		      if (srcBitmask & WRAP_BIND_FLAG) {
		        data[2] = source[2];
		        // Set when currying a bound function.
		        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
		      }
		      // Compose partial arguments.
		      var value = source[3];
		      if (value) {
		        var partials = data[3];
		        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
		        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
		      }
		      // Compose partial right arguments.
		      value = source[5];
		      if (value) {
		        partials = data[5];
		        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
		        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
		      }
		      // Use source `argPos` if available.
		      value = source[7];
		      if (value) {
		        data[7] = value;
		      }
		      // Use source `ary` if it's smaller.
		      if (srcBitmask & WRAP_ARY_FLAG) {
		        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
		      }
		      // Use source `arity` if one is not provided.
		      if (data[9] == null) {
		        data[9] = source[9];
		      }
		      // Use source `func` and merge bitmasks.
		      data[0] = source[0];
		      data[1] = newBitmask;

		      return data;
		    }

		    /**
		     * Used by `_.defaultsDeep` to customize its `_.merge` use.
		     *
		     * @private
		     * @param {*} objValue The destination value.
		     * @param {*} srcValue The source value.
		     * @param {string} key The key of the property to merge.
		     * @param {Object} object The parent object of `objValue`.
		     * @param {Object} source The parent object of `srcValue`.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     * @returns {*} Returns the value to assign.
		     */
		    function mergeDefaults(objValue, srcValue, key, object, source, stack) {
		      if (isObject(objValue) && isObject(srcValue)) {
		        // Recursively merge objects and arrays (susceptible to call stack limits).
		        stack.set(srcValue, objValue);
		        baseMerge(objValue, srcValue, undefined, mergeDefaults, stack);
		        stack['delete'](srcValue);
		      }
		      return objValue;
		    }

		    /**
		     * This function is like
		     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		     * except that it includes inherited enumerable properties.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function nativeKeysIn(object) {
		      var result = [];
		      if (object != null) {
		        for (var key in Object(object)) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

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

		    /**
		     * A specialized version of `baseRest` which transforms the rest array.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @param {Function} transform The rest array transform.
		     * @returns {Function} Returns the new function.
		     */
		    function overRest(func, start, transform) {
		      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
		      return function() {
		        var args = arguments,
		            index = -1,
		            length = nativeMax(args.length - start, 0),
		            array = Array(length);

		        while (++index < length) {
		          array[index] = args[start + index];
		        }
		        index = -1;
		        var otherArgs = Array(start + 1);
		        while (++index < start) {
		          otherArgs[index] = args[index];
		        }
		        otherArgs[start] = transform(array);
		        return apply(func, this, otherArgs);
		      };
		    }

		    /**
		     * Gets the parent value at `path` of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array} path The path to get the parent value of.
		     * @returns {*} Returns the parent value.
		     */
		    function parent(object, path) {
		      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
		    }

		    /**
		     * Reorder `array` according to the specified indexes where the element at
		     * the first index is assigned as the first element, the element at
		     * the second index is assigned as the second element, and so on.
		     *
		     * @private
		     * @param {Array} array The array to reorder.
		     * @param {Array} indexes The arranged array indexes.
		     * @returns {Array} Returns `array`.
		     */
		    function reorder(array, indexes) {
		      var arrLength = array.length,
		          length = nativeMin(indexes.length, arrLength),
		          oldArray = copyArray(array);

		      while (length--) {
		        var index = indexes[length];
		        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
		      }
		      return array;
		    }

		    /**
		     * Sets metadata for `func`.
		     *
		     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
		     * period of time, it will trip its breaker and transition to an identity
		     * function to avoid garbage collection pauses in V8. See
		     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
		     * for more details.
		     *
		     * @private
		     * @param {Function} func The function to associate metadata with.
		     * @param {*} data The metadata.
		     * @returns {Function} Returns `func`.
		     */
		    var setData = shortOut(baseSetData);

		    /**
		     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
		     *
		     * @private
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @returns {number|Object} Returns the timer id or timeout object.
		     */
		    var setTimeout = ctxSetTimeout || function(func, wait) {
		      return root.setTimeout(func, wait);
		    };

		    /**
		     * Sets the `toString` method of `func` to return `string`.
		     *
		     * @private
		     * @param {Function} func The function to modify.
		     * @param {Function} string The `toString` result.
		     * @returns {Function} Returns `func`.
		     */
		    var setToString = shortOut(baseSetToString);

		    /**
		     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
		     * with wrapper details in a comment at the top of the source body.
		     *
		     * @private
		     * @param {Function} wrapper The function to modify.
		     * @param {Function} reference The reference function.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @returns {Function} Returns `wrapper`.
		     */
		    function setWrapToString(wrapper, reference, bitmask) {
		      var source = (reference + '');
		      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
		    }

		    /**
		     * Creates a function that'll short out and invoke `identity` instead
		     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
		     * milliseconds.
		     *
		     * @private
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new shortable function.
		     */
		    function shortOut(func) {
		      var count = 0,
		          lastCalled = 0;

		      return function() {
		        var stamp = nativeNow(),
		            remaining = HOT_SPAN - (stamp - lastCalled);

		        lastCalled = stamp;
		        if (remaining > 0) {
		          if (++count >= HOT_COUNT) {
		            return arguments[0];
		          }
		        } else {
		          count = 0;
		        }
		        return func.apply(undefined, arguments);
		      };
		    }

		    /**
		     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
		     *
		     * @private
		     * @param {Array} array The array to shuffle.
		     * @param {number} [size=array.length] The size of `array`.
		     * @returns {Array} Returns `array`.
		     */
		    function shuffleSelf(array, size) {
		      var index = -1,
		          length = array.length,
		          lastIndex = length - 1;

		      size = size === undefined ? length : size;
		      while (++index < size) {
		        var rand = baseRandom(index, lastIndex),
		            value = array[rand];

		        array[rand] = array[index];
		        array[index] = value;
		      }
		      array.length = size;
		      return array;
		    }

		    /**
		     * Converts `string` to a property path array.
		     *
		     * @private
		     * @param {string} string The string to convert.
		     * @returns {Array} Returns the property path array.
		     */
		    var stringToPath = memoizeCapped(function(string) {
		      var result = [];
		      if (reLeadingDot.test(string)) {
		        result.push('');
		      }
		      string.replace(rePropName, function(match, number, quote, string) {
		        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
		      });
		      return result;
		    });

		    /**
		     * Converts `value` to a string key if it's not a string or symbol.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {string|symbol} Returns the key.
		     */
		    function toKey(value) {
		      if (typeof value == 'string' || isSymbol(value)) {
		        return value;
		      }
		      var result = (value + '');
		      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
		    }

		    /**
		     * Converts `func` to its source code.
		     *
		     * @private
		     * @param {Function} func The function to convert.
		     * @returns {string} Returns the source code.
		     */
		    function toSource(func) {
		      if (func != null) {
		        try {
		          return funcToString.call(func);
		        } catch (e) {}
		        try {
		          return (func + '');
		        } catch (e) {}
		      }
		      return '';
		    }

		    /**
		     * Updates wrapper `details` based on `bitmask` flags.
		     *
		     * @private
		     * @returns {Array} details The details to modify.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @returns {Array} Returns `details`.
		     */
		    function updateWrapDetails(details, bitmask) {
		      arrayEach(wrapFlags, function(pair) {
		        var value = '_.' + pair[0];
		        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
		          details.push(value);
		        }
		      });
		      return details.sort();
		    }

		    /**
		     * Creates a clone of `wrapper`.
		     *
		     * @private
		     * @param {Object} wrapper The wrapper to clone.
		     * @returns {Object} Returns the cloned wrapper.
		     */
		    function wrapperClone(wrapper) {
		      if (wrapper instanceof LazyWrapper) {
		        return wrapper.clone();
		      }
		      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
		      result.__actions__ = copyArray(wrapper.__actions__);
		      result.__index__  = wrapper.__index__;
		      result.__values__ = wrapper.__values__;
		      return result;
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an array of elements split into groups the length of `size`.
		     * If `array` can't be split evenly, the final chunk will be the remaining
		     * elements.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to process.
		     * @param {number} [size=1] The length of each chunk
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the new array of chunks.
		     * @example
		     *
		     * _.chunk(['a', 'b', 'c', 'd'], 2);
		     * // => [['a', 'b'], ['c', 'd']]
		     *
		     * _.chunk(['a', 'b', 'c', 'd'], 3);
		     * // => [['a', 'b', 'c'], ['d']]
		     */
		    function chunk(array, size, guard) {
		      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
		        size = 1;
		      } else {
		        size = nativeMax(toInteger(size), 0);
		      }
		      var length = array == null ? 0 : array.length;
		      if (!length || size < 1) {
		        return [];
		      }
		      var index = 0,
		          resIndex = 0,
		          result = Array(nativeCeil(length / size));

		      while (index < length) {
		        result[resIndex++] = baseSlice(array, index, (index += size));
		      }
		      return result;
		    }

		    /**
		     * Creates an array with all falsey values removed. The values `false`, `null`,
		     * `0`, `""`, `undefined`, and `NaN` are falsey.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to compact.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.compact([0, 1, false, 2, '', 3]);
		     * // => [1, 2, 3]
		     */
		    function compact(array) {
		      var index = -1,
		          length = array == null ? 0 : array.length,
		          resIndex = 0,
		          result = [];

		      while (++index < length) {
		        var value = array[index];
		        if (value) {
		          result[resIndex++] = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * Creates a new array concatenating `array` with any additional arrays
		     * and/or values.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to concatenate.
		     * @param {...*} [values] The values to concatenate.
		     * @returns {Array} Returns the new concatenated array.
		     * @example
		     *
		     * var array = [1];
		     * var other = _.concat(array, 2, [3], [[4]]);
		     *
		     * console.log(other);
		     * // => [1, 2, 3, [4]]
		     *
		     * console.log(array);
		     * // => [1]
		     */
		    function concat() {
		      var length = arguments.length;
		      if (!length) {
		        return [];
		      }
		      var args = Array(length - 1),
		          array = arguments[0],
		          index = length;

		      while (index--) {
		        args[index - 1] = arguments[index];
		      }
		      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
		    }

		    /**
		     * Creates an array of `array` values not included in the other given arrays
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. The order and references of result values are
		     * determined by the first array.
		     *
		     * **Note:** Unlike `_.pullAll`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.without, _.xor
		     * @example
		     *
		     * _.difference([2, 1], [2, 3]);
		     * // => [1]
		     */
		    var difference = baseRest(function(array, values) {
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
		        : [];
		    });

		    /**
		     * This method is like `_.difference` except that it accepts `iteratee` which
		     * is invoked for each element of `array` and `values` to generate the criterion
		     * by which they're compared. The order and references of result values are
		     * determined by the first array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
		     * // => [{ 'x': 2 }]
		     */
		    var differenceBy = baseRest(function(array, values) {
		      var iteratee = last(values);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined;
		      }
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
		        : [];
		    });

		    /**
		     * This method is like `_.difference` except that it accepts `comparator`
		     * which is invoked to compare elements of `array` to `values`. The order and
		     * references of result values are determined by the first array. The comparator
		     * is invoked with two arguments: (arrVal, othVal).
		     *
		     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     *
		     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
		     * // => [{ 'x': 2, 'y': 1 }]
		     */
		    var differenceWith = baseRest(function(array, values) {
		      var comparator = last(values);
		      if (isArrayLikeObject(comparator)) {
		        comparator = undefined;
		      }
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
		        : [];
		    });

		    /**
		     * Creates a slice of `array` with `n` elements dropped from the beginning.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to drop.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.drop([1, 2, 3]);
		     * // => [2, 3]
		     *
		     * _.drop([1, 2, 3], 2);
		     * // => [3]
		     *
		     * _.drop([1, 2, 3], 5);
		     * // => []
		     *
		     * _.drop([1, 2, 3], 0);
		     * // => [1, 2, 3]
		     */
		    function drop(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined) ? 1 : toInteger(n);
		      return baseSlice(array, n < 0 ? 0 : n, length);
		    }

		    /**
		     * Creates a slice of `array` with `n` elements dropped from the end.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to drop.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.dropRight([1, 2, 3]);
		     * // => [1, 2]
		     *
		     * _.dropRight([1, 2, 3], 2);
		     * // => [1]
		     *
		     * _.dropRight([1, 2, 3], 5);
		     * // => []
		     *
		     * _.dropRight([1, 2, 3], 0);
		     * // => [1, 2, 3]
		     */
		    function dropRight(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined) ? 1 : toInteger(n);
		      n = length - n;
		      return baseSlice(array, 0, n < 0 ? 0 : n);
		    }

		    /**
		     * Creates a slice of `array` excluding elements dropped from the end.
		     * Elements are dropped until `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.dropRightWhile(users, function(o) { return !o.active; });
		     * // => objects for ['barney']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.dropRightWhile(users, ['active', false]);
		     * // => objects for ['barney']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.dropRightWhile(users, 'active');
		     * // => objects for ['barney', 'fred', 'pebbles']
		     */
		    function dropRightWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), true, true)
		        : [];
		    }

		    /**
		     * Creates a slice of `array` excluding elements dropped from the beginning.
		     * Elements are dropped until `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.dropWhile(users, function(o) { return !o.active; });
		     * // => objects for ['pebbles']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.dropWhile(users, { 'user': 'barney', 'active': false });
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.dropWhile(users, ['active', false]);
		     * // => objects for ['pebbles']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.dropWhile(users, 'active');
		     * // => objects for ['barney', 'fred', 'pebbles']
		     */
		    function dropWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), true)
		        : [];
		    }

		    /**
		     * Fills elements of `array` with `value` from `start` up to, but not
		     * including, `end`.
		     *
		     * **Note:** This method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Array
		     * @param {Array} array The array to fill.
		     * @param {*} value The value to fill `array` with.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _.fill(array, 'a');
		     * console.log(array);
		     * // => ['a', 'a', 'a']
		     *
		     * _.fill(Array(3), 2);
		     * // => [2, 2, 2]
		     *
		     * _.fill([4, 6, 8, 10], '*', 1, 3);
		     * // => [4, '*', '*', 10]
		     */
		    function fill(array, value, start, end) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
		        start = 0;
		        end = length;
		      }
		      return baseFill(array, value, start, end);
		    }

		    /**
		     * This method is like `_.find` except that it returns the index of the first
		     * element `predicate` returns truthy for instead of the element itself.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {number} Returns the index of the found element, else `-1`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.findIndex(users, function(o) { return o.user == 'barney'; });
		     * // => 0
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findIndex(users, { 'user': 'fred', 'active': false });
		     * // => 1
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findIndex(users, ['active', false]);
		     * // => 0
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findIndex(users, 'active');
		     * // => 2
		     */
		    function findIndex(array, predicate, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = fromIndex == null ? 0 : toInteger(fromIndex);
		      if (index < 0) {
		        index = nativeMax(length + index, 0);
		      }
		      return baseFindIndex(array, getIteratee(predicate, 3), index);
		    }

		    /**
		     * This method is like `_.findIndex` except that it iterates over elements
		     * of `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=array.length-1] The index to search from.
		     * @returns {number} Returns the index of the found element, else `-1`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
		     * // => 2
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
		     * // => 0
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findLastIndex(users, ['active', false]);
		     * // => 2
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findLastIndex(users, 'active');
		     * // => 0
		     */
		    function findLastIndex(array, predicate, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = length - 1;
		      if (fromIndex !== undefined) {
		        index = toInteger(fromIndex);
		        index = fromIndex < 0
		          ? nativeMax(length + index, 0)
		          : nativeMin(index, length - 1);
		      }
		      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
		    }

		    /**
		     * Flattens `array` a single level deep.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * _.flatten([1, [2, [3, [4]], 5]]);
		     * // => [1, 2, [3, [4]], 5]
		     */
		    function flatten(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseFlatten(array, 1) : [];
		    }

		    /**
		     * Recursively flattens `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * _.flattenDeep([1, [2, [3, [4]], 5]]);
		     * // => [1, 2, 3, 4, 5]
		     */
		    function flattenDeep(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseFlatten(array, INFINITY) : [];
		    }

		    /**
		     * Recursively flatten `array` up to `depth` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.4.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @param {number} [depth=1] The maximum recursion depth.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * var array = [1, [2, [3, [4]], 5]];
		     *
		     * _.flattenDepth(array, 1);
		     * // => [1, 2, [3, [4]], 5]
		     *
		     * _.flattenDepth(array, 2);
		     * // => [1, 2, 3, [4], 5]
		     */
		    function flattenDepth(array, depth) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      depth = depth === undefined ? 1 : toInteger(depth);
		      return baseFlatten(array, depth);
		    }

		    /**
		     * The inverse of `_.toPairs`; this method returns an object composed
		     * from key-value `pairs`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} pairs The key-value pairs.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.fromPairs([['a', 1], ['b', 2]]);
		     * // => { 'a': 1, 'b': 2 }
		     */
		    function fromPairs(pairs) {
		      var index = -1,
		          length = pairs == null ? 0 : pairs.length,
		          result = {};

		      while (++index < length) {
		        var pair = pairs[index];
		        result[pair[0]] = pair[1];
		      }
		      return result;
		    }

		    /**
		     * Gets the first element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @alias first
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {*} Returns the first element of `array`.
		     * @example
		     *
		     * _.head([1, 2, 3]);
		     * // => 1
		     *
		     * _.head([]);
		     * // => undefined
		     */
		    function head(array) {
		      return (array && array.length) ? array[0] : undefined;
		    }

		    /**
		     * Gets the index at which the first occurrence of `value` is found in `array`
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. If `fromIndex` is negative, it's used as the
		     * offset from the end of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.indexOf([1, 2, 1, 2], 2);
		     * // => 1
		     *
		     * // Search from the `fromIndex`.
		     * _.indexOf([1, 2, 1, 2], 2, 2);
		     * // => 3
		     */
		    function indexOf(array, value, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = fromIndex == null ? 0 : toInteger(fromIndex);
		      if (index < 0) {
		        index = nativeMax(length + index, 0);
		      }
		      return baseIndexOf(array, value, index);
		    }

		    /**
		     * Gets all but the last element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.initial([1, 2, 3]);
		     * // => [1, 2]
		     */
		    function initial(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseSlice(array, 0, -1) : [];
		    }

		    /**
		     * Creates an array of unique values that are included in all given arrays
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. The order and references of result values are
		     * determined by the first array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * _.intersection([2, 1], [2, 3]);
		     * // => [2]
		     */
		    var intersection = baseRest(function(arrays) {
		      var mapped = arrayMap(arrays, castArrayLikeObject);
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped)
		        : [];
		    });

		    /**
		     * This method is like `_.intersection` except that it accepts `iteratee`
		     * which is invoked for each element of each `arrays` to generate the criterion
		     * by which they're compared. The order and references of result values are
		     * determined by the first array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [2.1]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }]
		     */
		    var intersectionBy = baseRest(function(arrays) {
		      var iteratee = last(arrays),
		          mapped = arrayMap(arrays, castArrayLikeObject);

		      if (iteratee === last(mapped)) {
		        iteratee = undefined;
		      } else {
		        mapped.pop();
		      }
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped, getIteratee(iteratee, 2))
		        : [];
		    });

		    /**
		     * This method is like `_.intersection` except that it accepts `comparator`
		     * which is invoked to compare elements of `arrays`. The order and references
		     * of result values are determined by the first array. The comparator is
		     * invoked with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.intersectionWith(objects, others, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }]
		     */
		    var intersectionWith = baseRest(function(arrays) {
		      var comparator = last(arrays),
		          mapped = arrayMap(arrays, castArrayLikeObject);

		      comparator = typeof comparator == 'function' ? comparator : undefined;
		      if (comparator) {
		        mapped.pop();
		      }
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped, undefined, comparator)
		        : [];
		    });

		    /**
		     * Converts all elements in `array` into a string separated by `separator`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to convert.
		     * @param {string} [separator=','] The element separator.
		     * @returns {string} Returns the joined string.
		     * @example
		     *
		     * _.join(['a', 'b', 'c'], '~');
		     * // => 'a~b~c'
		     */
		    function join(array, separator) {
		      return array == null ? '' : nativeJoin.call(array, separator);
		    }

		    /**
		     * Gets the last element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {*} Returns the last element of `array`.
		     * @example
		     *
		     * _.last([1, 2, 3]);
		     * // => 3
		     */
		    function last(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? array[length - 1] : undefined;
		    }

		    /**
		     * This method is like `_.indexOf` except that it iterates over elements of
		     * `array` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=array.length-1] The index to search from.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.lastIndexOf([1, 2, 1, 2], 2);
		     * // => 3
		     *
		     * // Search from the `fromIndex`.
		     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
		     * // => 1
		     */
		    function lastIndexOf(array, value, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = length;
		      if (fromIndex !== undefined) {
		        index = toInteger(fromIndex);
		        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
		      }
		      return value === value
		        ? strictLastIndexOf(array, value, index)
		        : baseFindIndex(array, baseIsNaN, index, true);
		    }

		    /**
		     * Gets the element at index `n` of `array`. If `n` is negative, the nth
		     * element from the end is returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.11.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=0] The index of the element to return.
		     * @returns {*} Returns the nth element of `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'd'];
		     *
		     * _.nth(array, 1);
		     * // => 'b'
		     *
		     * _.nth(array, -2);
		     * // => 'c';
		     */
		    function nth(array, n) {
		      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
		    }

		    /**
		     * Removes all given values from `array` using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
		     * to remove elements from an array by predicate.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {...*} [values] The values to remove.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
		     *
		     * _.pull(array, 'a', 'c');
		     * console.log(array);
		     * // => ['b', 'b']
		     */
		    var pull = baseRest(pullAll);

		    /**
		     * This method is like `_.pull` except that it accepts an array of values to remove.
		     *
		     * **Note:** Unlike `_.difference`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
		     *
		     * _.pullAll(array, ['a', 'c']);
		     * console.log(array);
		     * // => ['b', 'b']
		     */
		    function pullAll(array, values) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values)
		        : array;
		    }

		    /**
		     * This method is like `_.pullAll` except that it accepts `iteratee` which is
		     * invoked for each element of `array` and `values` to generate the criterion
		     * by which they're compared. The iteratee is invoked with one argument: (value).
		     *
		     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
		     *
		     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
		     * console.log(array);
		     * // => [{ 'x': 2 }]
		     */
		    function pullAllBy(array, values, iteratee) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values, getIteratee(iteratee, 2))
		        : array;
		    }

		    /**
		     * This method is like `_.pullAll` except that it accepts `comparator` which
		     * is invoked to compare elements of `array` to `values`. The comparator is
		     * invoked with two arguments: (arrVal, othVal).
		     *
		     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
		     *
		     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
		     * console.log(array);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
		     */
		    function pullAllWith(array, values, comparator) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values, undefined, comparator)
		        : array;
		    }

		    /**
		     * Removes elements from `array` corresponding to `indexes` and returns an
		     * array of removed elements.
		     *
		     * **Note:** Unlike `_.at`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
		     * @returns {Array} Returns the new array of removed elements.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'd'];
		     * var pulled = _.pullAt(array, [1, 3]);
		     *
		     * console.log(array);
		     * // => ['a', 'c']
		     *
		     * console.log(pulled);
		     * // => ['b', 'd']
		     */
		    var pullAt = flatRest(function(array, indexes) {
		      var length = array == null ? 0 : array.length,
		          result = baseAt(array, indexes);

		      basePullAt(array, arrayMap(indexes, function(index) {
		        return isIndex(index, length) ? +index : index;
		      }).sort(compareAscending));

		      return result;
		    });

		    /**
		     * Removes all elements from `array` that `predicate` returns truthy for
		     * and returns an array of the removed elements. The predicate is invoked
		     * with three arguments: (value, index, array).
		     *
		     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
		     * to pull elements from an array by value.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new array of removed elements.
		     * @example
		     *
		     * var array = [1, 2, 3, 4];
		     * var evens = _.remove(array, function(n) {
		     *   return n % 2 == 0;
		     * });
		     *
		     * console.log(array);
		     * // => [1, 3]
		     *
		     * console.log(evens);
		     * // => [2, 4]
		     */
		    function remove(array, predicate) {
		      var result = [];
		      if (!(array && array.length)) {
		        return result;
		      }
		      var index = -1,
		          indexes = [],
		          length = array.length;

		      predicate = getIteratee(predicate, 3);
		      while (++index < length) {
		        var value = array[index];
		        if (predicate(value, index, array)) {
		          result.push(value);
		          indexes.push(index);
		        }
		      }
		      basePullAt(array, indexes);
		      return result;
		    }

		    /**
		     * Reverses `array` so that the first element becomes the last, the second
		     * element becomes the second to last, and so on.
		     *
		     * **Note:** This method mutates `array` and is based on
		     * [`Array#reverse`](https://mdn.io/Array/reverse).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _.reverse(array);
		     * // => [3, 2, 1]
		     *
		     * console.log(array);
		     * // => [3, 2, 1]
		     */
		    function reverse(array) {
		      return array == null ? array : nativeReverse.call(array);
		    }

		    /**
		     * Creates a slice of `array` from `start` up to, but not including, `end`.
		     *
		     * **Note:** This method is used instead of
		     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
		     * returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to slice.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function slice(array, start, end) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
		        start = 0;
		        end = length;
		      }
		      else {
		        start = start == null ? 0 : toInteger(start);
		        end = end === undefined ? length : toInteger(end);
		      }
		      return baseSlice(array, start, end);
		    }

		    /**
		     * Uses a binary search to determine the lowest index at which `value`
		     * should be inserted into `array` in order to maintain its sort order.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * _.sortedIndex([30, 50], 40);
		     * // => 1
		     */
		    function sortedIndex(array, value) {
		      return baseSortedIndex(array, value);
		    }

		    /**
		     * This method is like `_.sortedIndex` except that it accepts `iteratee`
		     * which is invoked for `value` and each element of `array` to compute their
		     * sort ranking. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * var objects = [{ 'x': 4 }, { 'x': 5 }];
		     *
		     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
		     * // => 0
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
		     * // => 0
		     */
		    function sortedIndexBy(array, value, iteratee) {
		      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
		    }

		    /**
		     * This method is like `_.indexOf` except that it performs a binary
		     * search on a sorted `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
		     * // => 1
		     */
		    function sortedIndexOf(array, value) {
		      var length = array == null ? 0 : array.length;
		      if (length) {
		        var index = baseSortedIndex(array, value);
		        if (index < length && eq(array[index], value)) {
		          return index;
		        }
		      }
		      return -1;
		    }

		    /**
		     * This method is like `_.sortedIndex` except that it returns the highest
		     * index at which `value` should be inserted into `array` in order to
		     * maintain its sort order.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
		     * // => 4
		     */
		    function sortedLastIndex(array, value) {
		      return baseSortedIndex(array, value, true);
		    }

		    /**
		     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
		     * which is invoked for `value` and each element of `array` to compute their
		     * sort ranking. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * var objects = [{ 'x': 4 }, { 'x': 5 }];
		     *
		     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
		     * // => 1
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
		     * // => 1
		     */
		    function sortedLastIndexBy(array, value, iteratee) {
		      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
		    }

		    /**
		     * This method is like `_.lastIndexOf` except that it performs a binary
		     * search on a sorted `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
		     * // => 3
		     */
		    function sortedLastIndexOf(array, value) {
		      var length = array == null ? 0 : array.length;
		      if (length) {
		        var index = baseSortedIndex(array, value, true) - 1;
		        if (eq(array[index], value)) {
		          return index;
		        }
		      }
		      return -1;
		    }

		    /**
		     * This method is like `_.uniq` except that it's designed and optimized
		     * for sorted arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.sortedUniq([1, 1, 2]);
		     * // => [1, 2]
		     */
		    function sortedUniq(array) {
		      return (array && array.length)
		        ? baseSortedUniq(array)
		        : [];
		    }

		    /**
		     * This method is like `_.uniqBy` except that it's designed and optimized
		     * for sorted arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
		     * // => [1.1, 2.3]
		     */
		    function sortedUniqBy(array, iteratee) {
		      return (array && array.length)
		        ? baseSortedUniq(array, getIteratee(iteratee, 2))
		        : [];
		    }

		    /**
		     * Gets all but the first element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.tail([1, 2, 3]);
		     * // => [2, 3]
		     */
		    function tail(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseSlice(array, 1, length) : [];
		    }

		    /**
		     * Creates a slice of `array` with `n` elements taken from the beginning.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to take.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.take([1, 2, 3]);
		     * // => [1]
		     *
		     * _.take([1, 2, 3], 2);
		     * // => [1, 2]
		     *
		     * _.take([1, 2, 3], 5);
		     * // => [1, 2, 3]
		     *
		     * _.take([1, 2, 3], 0);
		     * // => []
		     */
		    function take(array, n, guard) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      n = (guard || n === undefined) ? 1 : toInteger(n);
		      return baseSlice(array, 0, n < 0 ? 0 : n);
		    }

		    /**
		     * Creates a slice of `array` with `n` elements taken from the end.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to take.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.takeRight([1, 2, 3]);
		     * // => [3]
		     *
		     * _.takeRight([1, 2, 3], 2);
		     * // => [2, 3]
		     *
		     * _.takeRight([1, 2, 3], 5);
		     * // => [1, 2, 3]
		     *
		     * _.takeRight([1, 2, 3], 0);
		     * // => []
		     */
		    function takeRight(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined) ? 1 : toInteger(n);
		      n = length - n;
		      return baseSlice(array, n < 0 ? 0 : n, length);
		    }

		    /**
		     * Creates a slice of `array` with elements taken from the end. Elements are
		     * taken until `predicate` returns falsey. The predicate is invoked with
		     * three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.takeRightWhile(users, function(o) { return !o.active; });
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
		     * // => objects for ['pebbles']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.takeRightWhile(users, ['active', false]);
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.takeRightWhile(users, 'active');
		     * // => []
		     */
		    function takeRightWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), false, true)
		        : [];
		    }

		    /**
		     * Creates a slice of `array` with elements taken from the beginning. Elements
		     * are taken until `predicate` returns falsey. The predicate is invoked with
		     * three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false},
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.takeWhile(users, function(o) { return !o.active; });
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.takeWhile(users, { 'user': 'barney', 'active': false });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.takeWhile(users, ['active', false]);
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.takeWhile(users, 'active');
		     * // => []
		     */
		    function takeWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3))
		        : [];
		    }

		    /**
		     * Creates an array of unique values, in order, from all given arrays using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * _.union([2], [1, 2]);
		     * // => [2, 1]
		     */
		    var union = baseRest(function(arrays) {
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
		    });

		    /**
		     * This method is like `_.union` except that it accepts `iteratee` which is
		     * invoked for each element of each `arrays` to generate the criterion by
		     * which uniqueness is computed. Result values are chosen from the first
		     * array in which the value occurs. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
		     * // => [2.1, 1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }, { 'x': 2 }]
		     */
		    var unionBy = baseRest(function(arrays) {
		      var iteratee = last(arrays);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined;
		      }
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
		    });

		    /**
		     * This method is like `_.union` except that it accepts `comparator` which
		     * is invoked to compare elements of `arrays`. Result values are chosen from
		     * the first array in which the value occurs. The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.unionWith(objects, others, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
		     */
		    var unionWith = baseRest(function(arrays) {
		      var comparator = last(arrays);
		      comparator = typeof comparator == 'function' ? comparator : undefined;
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
		    });

		    /**
		     * Creates a duplicate-free version of an array, using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons, in which only the first occurrence of each element
		     * is kept. The order of result values is determined by the order they occur
		     * in the array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.uniq([2, 1, 2]);
		     * // => [2, 1]
		     */
		    function uniq(array) {
		      return (array && array.length) ? baseUniq(array) : [];
		    }

		    /**
		     * This method is like `_.uniq` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * uniqueness is computed. The order of result values is determined by the
		     * order they occur in the array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
		     * // => [2.1, 1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }, { 'x': 2 }]
		     */
		    function uniqBy(array, iteratee) {
		      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
		    }

		    /**
		     * This method is like `_.uniq` except that it accepts `comparator` which
		     * is invoked to compare elements of `array`. The order of result values is
		     * determined by the order they occur in the array.The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.uniqWith(objects, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
		     */
		    function uniqWith(array, comparator) {
		      comparator = typeof comparator == 'function' ? comparator : undefined;
		      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
		    }

		    /**
		     * This method is like `_.zip` except that it accepts an array of grouped
		     * elements and creates an array regrouping the elements to their pre-zip
		     * configuration.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.2.0
		     * @category Array
		     * @param {Array} array The array of grouped elements to process.
		     * @returns {Array} Returns the new array of regrouped elements.
		     * @example
		     *
		     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
		     * // => [['a', 1, true], ['b', 2, false]]
		     *
		     * _.unzip(zipped);
		     * // => [['a', 'b'], [1, 2], [true, false]]
		     */
		    function unzip(array) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      var length = 0;
		      array = arrayFilter(array, function(group) {
		        if (isArrayLikeObject(group)) {
		          length = nativeMax(group.length, length);
		          return true;
		        }
		      });
		      return baseTimes(length, function(index) {
		        return arrayMap(array, baseProperty(index));
		      });
		    }

		    /**
		     * This method is like `_.unzip` except that it accepts `iteratee` to specify
		     * how regrouped values should be combined. The iteratee is invoked with the
		     * elements of each group: (...group).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Array
		     * @param {Array} array The array of grouped elements to process.
		     * @param {Function} [iteratee=_.identity] The function to combine
		     *  regrouped values.
		     * @returns {Array} Returns the new array of regrouped elements.
		     * @example
		     *
		     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
		     * // => [[1, 10, 100], [2, 20, 200]]
		     *
		     * _.unzipWith(zipped, _.add);
		     * // => [3, 30, 300]
		     */
		    function unzipWith(array, iteratee) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      var result = unzip(array);
		      if (iteratee == null) {
		        return result;
		      }
		      return arrayMap(result, function(group) {
		        return apply(iteratee, undefined, group);
		      });
		    }

		    /**
		     * Creates an array excluding all given values using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * **Note:** Unlike `_.pull`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...*} [values] The values to exclude.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.difference, _.xor
		     * @example
		     *
		     * _.without([2, 1, 2, 3], 1, 2);
		     * // => [3]
		     */
		    var without = baseRest(function(array, values) {
		      return isArrayLikeObject(array)
		        ? baseDifference(array, values)
		        : [];
		    });

		    /**
		     * Creates an array of unique values that is the
		     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
		     * of the given arrays. The order of result values is determined by the order
		     * they occur in the arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.difference, _.without
		     * @example
		     *
		     * _.xor([2, 1], [2, 3]);
		     * // => [1, 3]
		     */
		    var xor = baseRest(function(arrays) {
		      return baseXor(arrayFilter(arrays, isArrayLikeObject));
		    });

		    /**
		     * This method is like `_.xor` except that it accepts `iteratee` which is
		     * invoked for each element of each `arrays` to generate the criterion by
		     * which by which they're compared. The order of result values is determined
		     * by the order they occur in the arrays. The iteratee is invoked with one
		     * argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [1.2, 3.4]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 2 }]
		     */
		    var xorBy = baseRest(function(arrays) {
		      var iteratee = last(arrays);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined;
		      }
		      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
		    });

		    /**
		     * This method is like `_.xor` except that it accepts `comparator` which is
		     * invoked to compare elements of `arrays`. The order of result values is
		     * determined by the order they occur in the arrays. The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.xorWith(objects, others, _.isEqual);
		     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
		     */
		    var xorWith = baseRest(function(arrays) {
		      var comparator = last(arrays);
		      comparator = typeof comparator == 'function' ? comparator : undefined;
		      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
		    });

		    /**
		     * Creates an array of grouped elements, the first of which contains the
		     * first elements of the given arrays, the second of which contains the
		     * second elements of the given arrays, and so on.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to process.
		     * @returns {Array} Returns the new array of grouped elements.
		     * @example
		     *
		     * _.zip(['a', 'b'], [1, 2], [true, false]);
		     * // => [['a', 1, true], ['b', 2, false]]
		     */
		    var zip = baseRest(unzip);

		    /**
		     * This method is like `_.fromPairs` except that it accepts two arrays,
		     * one of property identifiers and one of corresponding values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.4.0
		     * @category Array
		     * @param {Array} [props=[]] The property identifiers.
		     * @param {Array} [values=[]] The property values.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.zipObject(['a', 'b'], [1, 2]);
		     * // => { 'a': 1, 'b': 2 }
		     */
		    function zipObject(props, values) {
		      return baseZipObject(props || [], values || [], assignValue);
		    }

		    /**
		     * This method is like `_.zipObject` except that it supports property paths.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.1.0
		     * @category Array
		     * @param {Array} [props=[]] The property identifiers.
		     * @param {Array} [values=[]] The property values.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
		     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
		     */
		    function zipObjectDeep(props, values) {
		      return baseZipObject(props || [], values || [], baseSet);
		    }

		    /**
		     * This method is like `_.zip` except that it accepts `iteratee` to specify
		     * how grouped values should be combined. The iteratee is invoked with the
		     * elements of each group: (...group).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to process.
		     * @param {Function} [iteratee=_.identity] The function to combine
		     *  grouped values.
		     * @returns {Array} Returns the new array of grouped elements.
		     * @example
		     *
		     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
		     *   return a + b + c;
		     * });
		     * // => [111, 222]
		     */
		    var zipWith = baseRest(function(arrays) {
		      var length = arrays.length,
		          iteratee = length > 1 ? arrays[length - 1] : undefined;

		      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
		      return unzipWith(arrays, iteratee);
		    });

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
		     * chain sequences enabled. The result of such sequences must be unwrapped
		     * with `_#value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.3.0
		     * @category Seq
		     * @param {*} value The value to wrap.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36 },
		     *   { 'user': 'fred',    'age': 40 },
		     *   { 'user': 'pebbles', 'age': 1 }
		     * ];
		     *
		     * var youngest = _
		     *   .chain(users)
		     *   .sortBy('age')
		     *   .map(function(o) {
		     *     return o.user + ' is ' + o.age;
		     *   })
		     *   .head()
		     *   .value();
		     * // => 'pebbles is 1'
		     */
		    function chain(value) {
		      var result = lodash(value);
		      result.__chain__ = true;
		      return result;
		    }

		    /**
		     * This method invokes `interceptor` and returns `value`. The interceptor
		     * is invoked with one argument; (value). The purpose of this method is to
		     * "tap into" a method chain sequence in order to modify intermediate results.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @param {*} value The value to provide to `interceptor`.
		     * @param {Function} interceptor The function to invoke.
		     * @returns {*} Returns `value`.
		     * @example
		     *
		     * _([1, 2, 3])
		     *  .tap(function(array) {
		     *    // Mutate input array.
		     *    array.pop();
		     *  })
		     *  .reverse()
		     *  .value();
		     * // => [2, 1]
		     */
		    function tap(value, interceptor) {
		      interceptor(value);
		      return value;
		    }

		    /**
		     * This method is like `_.tap` except that it returns the result of `interceptor`.
		     * The purpose of this method is to "pass thru" values replacing intermediate
		     * results in a method chain sequence.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Seq
		     * @param {*} value The value to provide to `interceptor`.
		     * @param {Function} interceptor The function to invoke.
		     * @returns {*} Returns the result of `interceptor`.
		     * @example
		     *
		     * _('  abc  ')
		     *  .chain()
		     *  .trim()
		     *  .thru(function(value) {
		     *    return [value];
		     *  })
		     *  .value();
		     * // => ['abc']
		     */
		    function thru(value, interceptor) {
		      return interceptor(value);
		    }

		    /**
		     * This method is the wrapper version of `_.at`.
		     *
		     * @name at
		     * @memberOf _
		     * @since 1.0.0
		     * @category Seq
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
		     *
		     * _(object).at(['a[0].b.c', 'a[1]']).value();
		     * // => [3, 4]
		     */
		    var wrapperAt = flatRest(function(paths) {
		      var length = paths.length,
		          start = length ? paths[0] : 0,
		          value = this.__wrapped__,
		          interceptor = function(object) { return baseAt(object, paths); };

		      if (length > 1 || this.__actions__.length ||
		          !(value instanceof LazyWrapper) || !isIndex(start)) {
		        return this.thru(interceptor);
		      }
		      value = value.slice(start, +start + (length ? 1 : 0));
		      value.__actions__.push({
		        'func': thru,
		        'args': [interceptor],
		        'thisArg': undefined
		      });
		      return new LodashWrapper(value, this.__chain__).thru(function(array) {
		        if (length && !array.length) {
		          array.push(undefined);
		        }
		        return array;
		      });
		    });

		    /**
		     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
		     *
		     * @name chain
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36 },
		     *   { 'user': 'fred',   'age': 40 }
		     * ];
		     *
		     * // A sequence without explicit chaining.
		     * _(users).head();
		     * // => { 'user': 'barney', 'age': 36 }
		     *
		     * // A sequence with explicit chaining.
		     * _(users)
		     *   .chain()
		     *   .head()
		     *   .pick('user')
		     *   .value();
		     * // => { 'user': 'barney' }
		     */
		    function wrapperChain() {
		      return chain(this);
		    }

		    /**
		     * Executes the chain sequence and returns the wrapped result.
		     *
		     * @name commit
		     * @memberOf _
		     * @since 3.2.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var array = [1, 2];
		     * var wrapped = _(array).push(3);
		     *
		     * console.log(array);
		     * // => [1, 2]
		     *
		     * wrapped = wrapped.commit();
		     * console.log(array);
		     * // => [1, 2, 3]
		     *
		     * wrapped.last();
		     * // => 3
		     *
		     * console.log(array);
		     * // => [1, 2, 3]
		     */
		    function wrapperCommit() {
		      return new LodashWrapper(this.value(), this.__chain__);
		    }

		    /**
		     * Gets the next value on a wrapped object following the
		     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
		     *
		     * @name next
		     * @memberOf _
		     * @since 4.0.0
		     * @category Seq
		     * @returns {Object} Returns the next iterator value.
		     * @example
		     *
		     * var wrapped = _([1, 2]);
		     *
		     * wrapped.next();
		     * // => { 'done': false, 'value': 1 }
		     *
		     * wrapped.next();
		     * // => { 'done': false, 'value': 2 }
		     *
		     * wrapped.next();
		     * // => { 'done': true, 'value': undefined }
		     */
		    function wrapperNext() {
		      if (this.__values__ === undefined) {
		        this.__values__ = toArray(this.value());
		      }
		      var done = this.__index__ >= this.__values__.length,
		          value = done ? undefined : this.__values__[this.__index__++];

		      return { 'done': done, 'value': value };
		    }

		    /**
		     * Enables the wrapper to be iterable.
		     *
		     * @name Symbol.iterator
		     * @memberOf _
		     * @since 4.0.0
		     * @category Seq
		     * @returns {Object} Returns the wrapper object.
		     * @example
		     *
		     * var wrapped = _([1, 2]);
		     *
		     * wrapped[Symbol.iterator]() === wrapped;
		     * // => true
		     *
		     * Array.from(wrapped);
		     * // => [1, 2]
		     */
		    function wrapperToIterator() {
		      return this;
		    }

		    /**
		     * Creates a clone of the chain sequence planting `value` as the wrapped value.
		     *
		     * @name plant
		     * @memberOf _
		     * @since 3.2.0
		     * @category Seq
		     * @param {*} value The value to plant.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var wrapped = _([1, 2]).map(square);
		     * var other = wrapped.plant([3, 4]);
		     *
		     * other.value();
		     * // => [9, 16]
		     *
		     * wrapped.value();
		     * // => [1, 4]
		     */
		    function wrapperPlant(value) {
		      var result,
		          parent = this;

		      while (parent instanceof baseLodash) {
		        var clone = wrapperClone(parent);
		        clone.__index__ = 0;
		        clone.__values__ = undefined;
		        if (result) {
		          previous.__wrapped__ = clone;
		        } else {
		          result = clone;
		        }
		        var previous = clone;
		        parent = parent.__wrapped__;
		      }
		      previous.__wrapped__ = value;
		      return result;
		    }

		    /**
		     * This method is the wrapper version of `_.reverse`.
		     *
		     * **Note:** This method mutates the wrapped array.
		     *
		     * @name reverse
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _(array).reverse().value()
		     * // => [3, 2, 1]
		     *
		     * console.log(array);
		     * // => [3, 2, 1]
		     */
		    function wrapperReverse() {
		      var value = this.__wrapped__;
		      if (value instanceof LazyWrapper) {
		        var wrapped = value;
		        if (this.__actions__.length) {
		          wrapped = new LazyWrapper(this);
		        }
		        wrapped = wrapped.reverse();
		        wrapped.__actions__.push({
		          'func': thru,
		          'args': [reverse],
		          'thisArg': undefined
		        });
		        return new LodashWrapper(wrapped, this.__chain__);
		      }
		      return this.thru(reverse);
		    }

		    /**
		     * Executes the chain sequence to resolve the unwrapped value.
		     *
		     * @name value
		     * @memberOf _
		     * @since 0.1.0
		     * @alias toJSON, valueOf
		     * @category Seq
		     * @returns {*} Returns the resolved unwrapped value.
		     * @example
		     *
		     * _([1, 2, 3]).value();
		     * // => [1, 2, 3]
		     */
		    function wrapperValue() {
		      return baseWrapperValue(this.__wrapped__, this.__actions__);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The corresponding value of
		     * each key is the number of times the key was returned by `iteratee`. The
		     * iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * _.countBy([6.1, 4.2, 6.3], Math.floor);
		     * // => { '4': 1, '6': 2 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.countBy(['one', 'two', 'three'], 'length');
		     * // => { '3': 2, '5': 1 }
		     */
		    var countBy = createAggregator(function(result, value, key) {
		      if (hasOwnProperty.call(result, key)) {
		        ++result[key];
		      } else {
		        baseAssignValue(result, key, 1);
		      }
		    });

		    /**
		     * Checks if `predicate` returns truthy for **all** elements of `collection`.
		     * Iteration is stopped once `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index|key, collection).
		     *
		     * **Note:** This method returns `true` for
		     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
		     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
		     * elements of empty collections.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {boolean} Returns `true` if all elements pass the predicate check,
		     *  else `false`.
		     * @example
		     *
		     * _.every([true, 1, null, 'yes'], Boolean);
		     * // => false
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': false },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.every(users, { 'user': 'barney', 'active': false });
		     * // => false
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.every(users, ['active', false]);
		     * // => true
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.every(users, 'active');
		     * // => false
		     */
		    function every(collection, predicate, guard) {
		      var func = isArray(collection) ? arrayEvery : baseEvery;
		      if (guard && isIterateeCall(collection, predicate, guard)) {
		        predicate = undefined;
		      }
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Iterates over elements of `collection`, returning an array of all elements
		     * `predicate` returns truthy for. The predicate is invoked with three
		     * arguments: (value, index|key, collection).
		     *
		     * **Note:** Unlike `_.remove`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     * @see _.reject
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': true },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * _.filter(users, function(o) { return !o.active; });
		     * // => objects for ['fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.filter(users, { 'age': 36, 'active': true });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.filter(users, ['active', false]);
		     * // => objects for ['fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.filter(users, 'active');
		     * // => objects for ['barney']
		     */
		    function filter(collection, predicate) {
		      var func = isArray(collection) ? arrayFilter : baseFilter;
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Iterates over elements of `collection`, returning the first element
		     * `predicate` returns truthy for. The predicate is invoked with three
		     * arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {*} Returns the matched element, else `undefined`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36, 'active': true },
		     *   { 'user': 'fred',    'age': 40, 'active': false },
		     *   { 'user': 'pebbles', 'age': 1,  'active': true }
		     * ];
		     *
		     * _.find(users, function(o) { return o.age < 40; });
		     * // => object for 'barney'
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.find(users, { 'age': 1, 'active': true });
		     * // => object for 'pebbles'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.find(users, ['active', false]);
		     * // => object for 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.find(users, 'active');
		     * // => object for 'barney'
		     */
		    var find = createFind(findIndex);

		    /**
		     * This method is like `_.find` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=collection.length-1] The index to search from.
		     * @returns {*} Returns the matched element, else `undefined`.
		     * @example
		     *
		     * _.findLast([1, 2, 3, 4], function(n) {
		     *   return n % 2 == 1;
		     * });
		     * // => 3
		     */
		    var findLast = createFind(findLastIndex);

		    /**
		     * Creates a flattened array of values by running each element in `collection`
		     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
		     * with three arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [n, n];
		     * }
		     *
		     * _.flatMap([1, 2], duplicate);
		     * // => [1, 1, 2, 2]
		     */
		    function flatMap(collection, iteratee) {
		      return baseFlatten(map(collection, iteratee), 1);
		    }

		    /**
		     * This method is like `_.flatMap` except that it recursively flattens the
		     * mapped results.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [[[n, n]]];
		     * }
		     *
		     * _.flatMapDeep([1, 2], duplicate);
		     * // => [1, 1, 2, 2]
		     */
		    function flatMapDeep(collection, iteratee) {
		      return baseFlatten(map(collection, iteratee), INFINITY);
		    }

		    /**
		     * This method is like `_.flatMap` except that it recursively flattens the
		     * mapped results up to `depth` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {number} [depth=1] The maximum recursion depth.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [[[n, n]]];
		     * }
		     *
		     * _.flatMapDepth([1, 2], duplicate, 2);
		     * // => [[1, 1], [2, 2]]
		     */
		    function flatMapDepth(collection, iteratee, depth) {
		      depth = depth === undefined ? 1 : toInteger(depth);
		      return baseFlatten(map(collection, iteratee), depth);
		    }

		    /**
		     * Iterates over elements of `collection` and invokes `iteratee` for each element.
		     * The iteratee is invoked with three arguments: (value, index|key, collection).
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * **Note:** As with other "Collections" methods, objects with a "length"
		     * property are iterated like arrays. To avoid this behavior use `_.forIn`
		     * or `_.forOwn` for object iteration.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @alias each
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     * @see _.forEachRight
		     * @example
		     *
		     * _.forEach([1, 2], function(value) {
		     *   console.log(value);
		     * });
		     * // => Logs `1` then `2`.
		     *
		     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
		     */
		    function forEach(collection, iteratee) {
		      var func = isArray(collection) ? arrayEach : baseEach;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.forEach` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @alias eachRight
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     * @see _.forEach
		     * @example
		     *
		     * _.forEachRight([1, 2], function(value) {
		     *   console.log(value);
		     * });
		     * // => Logs `2` then `1`.
		     */
		    function forEachRight(collection, iteratee) {
		      var func = isArray(collection) ? arrayEachRight : baseEachRight;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The order of grouped values
		     * is determined by the order they occur in `collection`. The corresponding
		     * value of each key is an array of elements responsible for generating the
		     * key. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
		     * // => { '4': [4.2], '6': [6.1, 6.3] }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.groupBy(['one', 'two', 'three'], 'length');
		     * // => { '3': ['one', 'two'], '5': ['three'] }
		     */
		    var groupBy = createAggregator(function(result, value, key) {
		      if (hasOwnProperty.call(result, key)) {
		        result[key].push(value);
		      } else {
		        baseAssignValue(result, key, [value]);
		      }
		    });

		    /**
		     * Checks if `value` is in `collection`. If `collection` is a string, it's
		     * checked for a substring of `value`, otherwise
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * is used for equality comparisons. If `fromIndex` is negative, it's used as
		     * the offset from the end of `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object|string} collection The collection to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
		     * @returns {boolean} Returns `true` if `value` is found, else `false`.
		     * @example
		     *
		     * _.includes([1, 2, 3], 1);
		     * // => true
		     *
		     * _.includes([1, 2, 3], 1, 2);
		     * // => false
		     *
		     * _.includes({ 'a': 1, 'b': 2 }, 1);
		     * // => true
		     *
		     * _.includes('abcd', 'bc');
		     * // => true
		     */
		    function includes(collection, value, fromIndex, guard) {
		      collection = isArrayLike(collection) ? collection : values(collection);
		      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

		      var length = collection.length;
		      if (fromIndex < 0) {
		        fromIndex = nativeMax(length + fromIndex, 0);
		      }
		      return isString(collection)
		        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
		        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
		    }

		    /**
		     * Invokes the method at `path` of each element in `collection`, returning
		     * an array of the results of each invoked method. Any additional arguments
		     * are provided to each invoked method. If `path` is a function, it's invoked
		     * for, and `this` bound to, each element in `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Array|Function|string} path The path of the method to invoke or
		     *  the function invoked per iteration.
		     * @param {...*} [args] The arguments to invoke each method with.
		     * @returns {Array} Returns the array of results.
		     * @example
		     *
		     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
		     * // => [[1, 5, 7], [1, 2, 3]]
		     *
		     * _.invokeMap([123, 456], String.prototype.split, '');
		     * // => [['1', '2', '3'], ['4', '5', '6']]
		     */
		    var invokeMap = baseRest(function(collection, path, args) {
		      var index = -1,
		          isFunc = typeof path == 'function',
		          result = isArrayLike(collection) ? Array(collection.length) : [];

		      baseEach(collection, function(value) {
		        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
		      });
		      return result;
		    });

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The corresponding value of
		     * each key is the last element responsible for generating the key. The
		     * iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * var array = [
		     *   { 'dir': 'left', 'code': 97 },
		     *   { 'dir': 'right', 'code': 100 }
		     * ];
		     *
		     * _.keyBy(array, function(o) {
		     *   return String.fromCharCode(o.code);
		     * });
		     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
		     *
		     * _.keyBy(array, 'dir');
		     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
		     */
		    var keyBy = createAggregator(function(result, value, key) {
		      baseAssignValue(result, key, value);
		    });

		    /**
		     * Creates an array of values by running each element in `collection` thru
		     * `iteratee`. The iteratee is invoked with three arguments:
		     * (value, index|key, collection).
		     *
		     * Many lodash methods are guarded to work as iteratees for methods like
		     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
		     *
		     * The guarded methods are:
		     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
		     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
		     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
		     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new mapped array.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * _.map([4, 8], square);
		     * // => [16, 64]
		     *
		     * _.map({ 'a': 4, 'b': 8 }, square);
		     * // => [16, 64] (iteration order is not guaranteed)
		     *
		     * var users = [
		     *   { 'user': 'barney' },
		     *   { 'user': 'fred' }
		     * ];
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.map(users, 'user');
		     * // => ['barney', 'fred']
		     */
		    function map(collection, iteratee) {
		      var func = isArray(collection) ? arrayMap : baseMap;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.sortBy` except that it allows specifying the sort
		     * orders of the iteratees to sort by. If `orders` is unspecified, all values
		     * are sorted in ascending order. Otherwise, specify an order of "desc" for
		     * descending or "asc" for ascending sort order of corresponding values.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
		     *  The iteratees to sort by.
		     * @param {string[]} [orders] The sort orders of `iteratees`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
		     * @returns {Array} Returns the new sorted array.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'fred',   'age': 48 },
		     *   { 'user': 'barney', 'age': 34 },
		     *   { 'user': 'fred',   'age': 40 },
		     *   { 'user': 'barney', 'age': 36 }
		     * ];
		     *
		     * // Sort by `user` in ascending order and by `age` in descending order.
		     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
		     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
		     */
		    function orderBy(collection, iteratees, orders, guard) {
		      if (collection == null) {
		        return [];
		      }
		      if (!isArray(iteratees)) {
		        iteratees = iteratees == null ? [] : [iteratees];
		      }
		      orders = guard ? undefined : orders;
		      if (!isArray(orders)) {
		        orders = orders == null ? [] : [orders];
		      }
		      return baseOrderBy(collection, iteratees, orders);
		    }

		    /**
		     * Creates an array of elements split into two groups, the first of which
		     * contains elements `predicate` returns truthy for, the second of which
		     * contains elements `predicate` returns falsey for. The predicate is
		     * invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the array of grouped elements.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36, 'active': false },
		     *   { 'user': 'fred',    'age': 40, 'active': true },
		     *   { 'user': 'pebbles', 'age': 1,  'active': false }
		     * ];
		     *
		     * _.partition(users, function(o) { return o.active; });
		     * // => objects for [['fred'], ['barney', 'pebbles']]
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.partition(users, { 'age': 1, 'active': false });
		     * // => objects for [['pebbles'], ['barney', 'fred']]
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.partition(users, ['active', false]);
		     * // => objects for [['barney', 'pebbles'], ['fred']]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.partition(users, 'active');
		     * // => objects for [['fred'], ['barney', 'pebbles']]
		     */
		    var partition = createAggregator(function(result, value, key) {
		      result[key ? 0 : 1].push(value);
		    }, function() { return [[], []]; });

		    /**
		     * Reduces `collection` to a value which is the accumulated result of running
		     * each element in `collection` thru `iteratee`, where each successive
		     * invocation is supplied the return value of the previous. If `accumulator`
		     * is not given, the first element of `collection` is used as the initial
		     * value. The iteratee is invoked with four arguments:
		     * (accumulator, value, index|key, collection).
		     *
		     * Many lodash methods are guarded to work as iteratees for methods like
		     * `_.reduce`, `_.reduceRight`, and `_.transform`.
		     *
		     * The guarded methods are:
		     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
		     * and `sortBy`
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The initial value.
		     * @returns {*} Returns the accumulated value.
		     * @see _.reduceRight
		     * @example
		     *
		     * _.reduce([1, 2], function(sum, n) {
		     *   return sum + n;
		     * }, 0);
		     * // => 3
		     *
		     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
		     *   (result[value] || (result[value] = [])).push(key);
		     *   return result;
		     * }, {});
		     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
		     */
		    function reduce(collection, iteratee, accumulator) {
		      var func = isArray(collection) ? arrayReduce : baseReduce,
		          initAccum = arguments.length < 3;

		      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
		    }

		    /**
		     * This method is like `_.reduce` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The initial value.
		     * @returns {*} Returns the accumulated value.
		     * @see _.reduce
		     * @example
		     *
		     * var array = [[0, 1], [2, 3], [4, 5]];
		     *
		     * _.reduceRight(array, function(flattened, other) {
		     *   return flattened.concat(other);
		     * }, []);
		     * // => [4, 5, 2, 3, 0, 1]
		     */
		    function reduceRight(collection, iteratee, accumulator) {
		      var func = isArray(collection) ? arrayReduceRight : baseReduce,
		          initAccum = arguments.length < 3;

		      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
		    }

		    /**
		     * The opposite of `_.filter`; this method returns the elements of `collection`
		     * that `predicate` does **not** return truthy for.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     * @see _.filter
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': false },
		     *   { 'user': 'fred',   'age': 40, 'active': true }
		     * ];
		     *
		     * _.reject(users, function(o) { return !o.active; });
		     * // => objects for ['fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.reject(users, { 'age': 40, 'active': true });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.reject(users, ['active', false]);
		     * // => objects for ['fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.reject(users, 'active');
		     * // => objects for ['barney']
		     */
		    function reject(collection, predicate) {
		      var func = isArray(collection) ? arrayFilter : baseFilter;
		      return func(collection, negate(getIteratee(predicate, 3)));
		    }

		    /**
		     * Gets a random element from `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to sample.
		     * @returns {*} Returns the random element.
		     * @example
		     *
		     * _.sample([1, 2, 3, 4]);
		     * // => 2
		     */
		    function sample(collection) {
		      var func = isArray(collection) ? arraySample : baseSample;
		      return func(collection);
		    }

		    /**
		     * Gets `n` random elements at unique keys from `collection` up to the
		     * size of `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to sample.
		     * @param {number} [n=1] The number of elements to sample.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the random elements.
		     * @example
		     *
		     * _.sampleSize([1, 2, 3], 2);
		     * // => [3, 1]
		     *
		     * _.sampleSize([1, 2, 3], 4);
		     * // => [2, 3, 1]
		     */
		    function sampleSize(collection, n, guard) {
		      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
		        n = 1;
		      } else {
		        n = toInteger(n);
		      }
		      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
		      return func(collection, n);
		    }

		    /**
		     * Creates an array of shuffled values, using a version of the
		     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     * @example
		     *
		     * _.shuffle([1, 2, 3, 4]);
		     * // => [4, 1, 3, 2]
		     */
		    function shuffle(collection) {
		      var func = isArray(collection) ? arrayShuffle : baseShuffle;
		      return func(collection);
		    }

		    /**
		     * Gets the size of `collection` by returning its length for array-like
		     * values or the number of own enumerable string keyed properties for objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object|string} collection The collection to inspect.
		     * @returns {number} Returns the collection size.
		     * @example
		     *
		     * _.size([1, 2, 3]);
		     * // => 3
		     *
		     * _.size({ 'a': 1, 'b': 2 });
		     * // => 2
		     *
		     * _.size('pebbles');
		     * // => 7
		     */
		    function size(collection) {
		      if (collection == null) {
		        return 0;
		      }
		      if (isArrayLike(collection)) {
		        return isString(collection) ? stringSize(collection) : collection.length;
		      }
		      var tag = getTag(collection);
		      if (tag == mapTag || tag == setTag) {
		        return collection.size;
		      }
		      return baseKeys(collection).length;
		    }

		    /**
		     * Checks if `predicate` returns truthy for **any** element of `collection`.
		     * Iteration is stopped once `predicate` returns truthy. The predicate is
		     * invoked with three arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {boolean} Returns `true` if any element passes the predicate check,
		     *  else `false`.
		     * @example
		     *
		     * _.some([null, 0, 'yes', false], Boolean);
		     * // => true
		     *
		     * var users = [
		     *   { 'user': 'barney', 'active': true },
		     *   { 'user': 'fred',   'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.some(users, { 'user': 'barney', 'active': false });
		     * // => false
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.some(users, ['active', false]);
		     * // => true
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.some(users, 'active');
		     * // => true
		     */
		    function some(collection, predicate, guard) {
		      var func = isArray(collection) ? arraySome : baseSome;
		      if (guard && isIterateeCall(collection, predicate, guard)) {
		        predicate = undefined;
		      }
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Creates an array of elements, sorted in ascending order by the results of
		     * running each element in a collection thru each iteratee. This method
		     * performs a stable sort, that is, it preserves the original sort order of
		     * equal elements. The iteratees are invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {...(Function|Function[])} [iteratees=[_.identity]]
		     *  The iteratees to sort by.
		     * @returns {Array} Returns the new sorted array.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'fred',   'age': 48 },
		     *   { 'user': 'barney', 'age': 36 },
		     *   { 'user': 'fred',   'age': 40 },
		     *   { 'user': 'barney', 'age': 34 }
		     * ];
		     *
		     * _.sortBy(users, [function(o) { return o.user; }]);
		     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
		     *
		     * _.sortBy(users, ['user', 'age']);
		     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
		     */
		    var sortBy = baseRest(function(collection, iteratees) {
		      if (collection == null) {
		        return [];
		      }
		      var length = iteratees.length;
		      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
		        iteratees = [];
		      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
		        iteratees = [iteratees[0]];
		      }
		      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
		    });

		    /*------------------------------------------------------------------------*/

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
		    var now = ctxNow || function() {
		      return root.Date.now();
		    };

		    /*------------------------------------------------------------------------*/

		    /**
		     * The opposite of `_.before`; this method creates a function that invokes
		     * `func` once it's called `n` or more times.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {number} n The number of calls before `func` is invoked.
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * var saves = ['profile', 'settings'];
		     *
		     * var done = _.after(saves.length, function() {
		     *   console.log('done saving!');
		     * });
		     *
		     * _.forEach(saves, function(type) {
		     *   asyncSave({ 'type': type, 'complete': done });
		     * });
		     * // => Logs 'done saving!' after the two async saves have completed.
		     */
		    function after(n, func) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      n = toInteger(n);
		      return function() {
		        if (--n < 1) {
		          return func.apply(this, arguments);
		        }
		      };
		    }

		    /**
		     * Creates a function that invokes `func`, with up to `n` arguments,
		     * ignoring any additional arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to cap arguments for.
		     * @param {number} [n=func.length] The arity cap.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new capped function.
		     * @example
		     *
		     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
		     * // => [6, 8, 10]
		     */
		    function ary(func, n, guard) {
		      n = guard ? undefined : n;
		      n = (func && n == null) ? func.length : n;
		      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
		    }

		    /**
		     * Creates a function that invokes `func`, with the `this` binding and arguments
		     * of the created function, while it's called less than `n` times. Subsequent
		     * calls to the created function return the result of the last `func` invocation.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {number} n The number of calls at which `func` is no longer invoked.
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * jQuery(element).on('click', _.before(5, addContactToList));
		     * // => Allows adding up to 4 contacts to the list.
		     */
		    function before(n, func) {
		      var result;
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      n = toInteger(n);
		      return function() {
		        if (--n > 0) {
		          result = func.apply(this, arguments);
		        }
		        if (n <= 1) {
		          func = undefined;
		        }
		        return result;
		      };
		    }

		    /**
		     * Creates a function that invokes `func` with the `this` binding of `thisArg`
		     * and `partials` prepended to the arguments it receives.
		     *
		     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
		     * may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
		     * property of bound functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to bind.
		     * @param {*} thisArg The `this` binding of `func`.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new bound function.
		     * @example
		     *
		     * function greet(greeting, punctuation) {
		     *   return greeting + ' ' + this.user + punctuation;
		     * }
		     *
		     * var object = { 'user': 'fred' };
		     *
		     * var bound = _.bind(greet, object, 'hi');
		     * bound('!');
		     * // => 'hi fred!'
		     *
		     * // Bound with placeholders.
		     * var bound = _.bind(greet, object, _, '!');
		     * bound('hi');
		     * // => 'hi fred!'
		     */
		    var bind = baseRest(function(func, thisArg, partials) {
		      var bitmask = WRAP_BIND_FLAG;
		      if (partials.length) {
		        var holders = replaceHolders(partials, getHolder(bind));
		        bitmask |= WRAP_PARTIAL_FLAG;
		      }
		      return createWrap(func, bitmask, thisArg, partials, holders);
		    });

		    /**
		     * Creates a function that invokes the method at `object[key]` with `partials`
		     * prepended to the arguments it receives.
		     *
		     * This method differs from `_.bind` by allowing bound functions to reference
		     * methods that may be redefined or don't yet exist. See
		     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
		     * for more details.
		     *
		     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.10.0
		     * @category Function
		     * @param {Object} object The object to invoke the method on.
		     * @param {string} key The key of the method.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new bound function.
		     * @example
		     *
		     * var object = {
		     *   'user': 'fred',
		     *   'greet': function(greeting, punctuation) {
		     *     return greeting + ' ' + this.user + punctuation;
		     *   }
		     * };
		     *
		     * var bound = _.bindKey(object, 'greet', 'hi');
		     * bound('!');
		     * // => 'hi fred!'
		     *
		     * object.greet = function(greeting, punctuation) {
		     *   return greeting + 'ya ' + this.user + punctuation;
		     * };
		     *
		     * bound('!');
		     * // => 'hiya fred!'
		     *
		     * // Bound with placeholders.
		     * var bound = _.bindKey(object, 'greet', _, '!');
		     * bound('hi');
		     * // => 'hiya fred!'
		     */
		    var bindKey = baseRest(function(object, key, partials) {
		      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
		      if (partials.length) {
		        var holders = replaceHolders(partials, getHolder(bindKey));
		        bitmask |= WRAP_PARTIAL_FLAG;
		      }
		      return createWrap(key, bitmask, object, partials, holders);
		    });

		    /**
		     * Creates a function that accepts arguments of `func` and either invokes
		     * `func` returning its result, if at least `arity` number of arguments have
		     * been provided, or returns a function that accepts the remaining `func`
		     * arguments, and so on. The arity of `func` may be specified if `func.length`
		     * is not sufficient.
		     *
		     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
		     * may be used as a placeholder for provided arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of curried functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Function
		     * @param {Function} func The function to curry.
		     * @param {number} [arity=func.length] The arity of `func`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new curried function.
		     * @example
		     *
		     * var abc = function(a, b, c) {
		     *   return [a, b, c];
		     * };
		     *
		     * var curried = _.curry(abc);
		     *
		     * curried(1)(2)(3);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2)(3);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2, 3);
		     * // => [1, 2, 3]
		     *
		     * // Curried with placeholders.
		     * curried(1)(_, 3)(2);
		     * // => [1, 2, 3]
		     */
		    function curry(func, arity, guard) {
		      arity = guard ? undefined : arity;
		      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
		      result.placeholder = curry.placeholder;
		      return result;
		    }

		    /**
		     * This method is like `_.curry` except that arguments are applied to `func`
		     * in the manner of `_.partialRight` instead of `_.partial`.
		     *
		     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for provided arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of curried functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to curry.
		     * @param {number} [arity=func.length] The arity of `func`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new curried function.
		     * @example
		     *
		     * var abc = function(a, b, c) {
		     *   return [a, b, c];
		     * };
		     *
		     * var curried = _.curryRight(abc);
		     *
		     * curried(3)(2)(1);
		     * // => [1, 2, 3]
		     *
		     * curried(2, 3)(1);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2, 3);
		     * // => [1, 2, 3]
		     *
		     * // Curried with placeholders.
		     * curried(3)(1, _)(2);
		     * // => [1, 2, 3]
		     */
		    function curryRight(func, arity, guard) {
		      arity = guard ? undefined : arity;
		      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
		      result.placeholder = curryRight.placeholder;
		      return result;
		    }

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
		            result = wait - timeSinceLastCall;

		        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
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

		    /**
		     * Defers invoking the `func` until the current call stack has cleared. Any
		     * additional arguments are provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to defer.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {number} Returns the timer id.
		     * @example
		     *
		     * _.defer(function(text) {
		     *   console.log(text);
		     * }, 'deferred');
		     * // => Logs 'deferred' after one millisecond.
		     */
		    var defer = baseRest(function(func, args) {
		      return baseDelay(func, 1, args);
		    });

		    /**
		     * Invokes `func` after `wait` milliseconds. Any additional arguments are
		     * provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {number} Returns the timer id.
		     * @example
		     *
		     * _.delay(function(text) {
		     *   console.log(text);
		     * }, 1000, 'later');
		     * // => Logs 'later' after one second.
		     */
		    var delay = baseRest(function(func, wait, args) {
		      return baseDelay(func, toNumber(wait) || 0, args);
		    });

		    /**
		     * Creates a function that invokes `func` with arguments reversed.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to flip arguments for.
		     * @returns {Function} Returns the new flipped function.
		     * @example
		     *
		     * var flipped = _.flip(function() {
		     *   return _.toArray(arguments);
		     * });
		     *
		     * flipped('a', 'b', 'c', 'd');
		     * // => ['d', 'c', 'b', 'a']
		     */
		    function flip(func) {
		      return createWrap(func, WRAP_FLIP_FLAG);
		    }

		    /**
		     * Creates a function that memoizes the result of `func`. If `resolver` is
		     * provided, it determines the cache key for storing the result based on the
		     * arguments provided to the memoized function. By default, the first argument
		     * provided to the memoized function is used as the map cache key. The `func`
		     * is invoked with the `this` binding of the memoized function.
		     *
		     * **Note:** The cache is exposed as the `cache` property on the memoized
		     * function. Its creation may be customized by replacing the `_.memoize.Cache`
		     * constructor with one whose instances implement the
		     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
		     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to have its output memoized.
		     * @param {Function} [resolver] The function to resolve the cache key.
		     * @returns {Function} Returns the new memoized function.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     * var other = { 'c': 3, 'd': 4 };
		     *
		     * var values = _.memoize(_.values);
		     * values(object);
		     * // => [1, 2]
		     *
		     * values(other);
		     * // => [3, 4]
		     *
		     * object.a = 2;
		     * values(object);
		     * // => [1, 2]
		     *
		     * // Modify the result cache.
		     * values.cache.set(object, ['a', 'b']);
		     * values(object);
		     * // => ['a', 'b']
		     *
		     * // Replace `_.memoize.Cache`.
		     * _.memoize.Cache = WeakMap;
		     */
		    function memoize(func, resolver) {
		      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      var memoized = function() {
		        var args = arguments,
		            key = resolver ? resolver.apply(this, args) : args[0],
		            cache = memoized.cache;

		        if (cache.has(key)) {
		          return cache.get(key);
		        }
		        var result = func.apply(this, args);
		        memoized.cache = cache.set(key, result) || cache;
		        return result;
		      };
		      memoized.cache = new (memoize.Cache || MapCache);
		      return memoized;
		    }

		    // Expose `MapCache`.
		    memoize.Cache = MapCache;

		    /**
		     * Creates a function that negates the result of the predicate `func`. The
		     * `func` predicate is invoked with the `this` binding and arguments of the
		     * created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} predicate The predicate to negate.
		     * @returns {Function} Returns the new negated function.
		     * @example
		     *
		     * function isEven(n) {
		     *   return n % 2 == 0;
		     * }
		     *
		     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
		     * // => [1, 3, 5]
		     */
		    function negate(predicate) {
		      if (typeof predicate != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      return function() {
		        var args = arguments;
		        switch (args.length) {
		          case 0: return !predicate.call(this);
		          case 1: return !predicate.call(this, args[0]);
		          case 2: return !predicate.call(this, args[0], args[1]);
		          case 3: return !predicate.call(this, args[0], args[1], args[2]);
		        }
		        return !predicate.apply(this, args);
		      };
		    }

		    /**
		     * Creates a function that is restricted to invoking `func` once. Repeat calls
		     * to the function return the value of the first invocation. The `func` is
		     * invoked with the `this` binding and arguments of the created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * var initialize = _.once(createApplication);
		     * initialize();
		     * initialize();
		     * // => `createApplication` is invoked once
		     */
		    function once(func) {
		      return before(2, func);
		    }

		    /**
		     * Creates a function that invokes `func` with its arguments transformed.
		     *
		     * @static
		     * @since 4.0.0
		     * @memberOf _
		     * @category Function
		     * @param {Function} func The function to wrap.
		     * @param {...(Function|Function[])} [transforms=[_.identity]]
		     *  The argument transforms.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * function doubled(n) {
		     *   return n * 2;
		     * }
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var func = _.overArgs(function(x, y) {
		     *   return [x, y];
		     * }, [square, doubled]);
		     *
		     * func(9, 3);
		     * // => [81, 6]
		     *
		     * func(10, 5);
		     * // => [100, 10]
		     */
		    var overArgs = castRest(function(func, transforms) {
		      transforms = (transforms.length == 1 && isArray(transforms[0]))
		        ? arrayMap(transforms[0], baseUnary(getIteratee()))
		        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

		      var funcsLength = transforms.length;
		      return baseRest(function(args) {
		        var index = -1,
		            length = nativeMin(args.length, funcsLength);

		        while (++index < length) {
		          args[index] = transforms[index].call(this, args[index]);
		        }
		        return apply(func, this, args);
		      });
		    });

		    /**
		     * Creates a function that invokes `func` with `partials` prepended to the
		     * arguments it receives. This method is like `_.bind` except it does **not**
		     * alter the `this` binding.
		     *
		     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of partially
		     * applied functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.2.0
		     * @category Function
		     * @param {Function} func The function to partially apply arguments to.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new partially applied function.
		     * @example
		     *
		     * function greet(greeting, name) {
		     *   return greeting + ' ' + name;
		     * }
		     *
		     * var sayHelloTo = _.partial(greet, 'hello');
		     * sayHelloTo('fred');
		     * // => 'hello fred'
		     *
		     * // Partially applied with placeholders.
		     * var greetFred = _.partial(greet, _, 'fred');
		     * greetFred('hi');
		     * // => 'hi fred'
		     */
		    var partial = baseRest(function(func, partials) {
		      var holders = replaceHolders(partials, getHolder(partial));
		      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
		    });

		    /**
		     * This method is like `_.partial` except that partially applied arguments
		     * are appended to the arguments it receives.
		     *
		     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of partially
		     * applied functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Function
		     * @param {Function} func The function to partially apply arguments to.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new partially applied function.
		     * @example
		     *
		     * function greet(greeting, name) {
		     *   return greeting + ' ' + name;
		     * }
		     *
		     * var greetFred = _.partialRight(greet, 'fred');
		     * greetFred('hi');
		     * // => 'hi fred'
		     *
		     * // Partially applied with placeholders.
		     * var sayHelloTo = _.partialRight(greet, 'hello', _);
		     * sayHelloTo('fred');
		     * // => 'hello fred'
		     */
		    var partialRight = baseRest(function(func, partials) {
		      var holders = replaceHolders(partials, getHolder(partialRight));
		      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
		    });

		    /**
		     * Creates a function that invokes `func` with arguments arranged according
		     * to the specified `indexes` where the argument value at the first index is
		     * provided as the first argument, the argument value at the second index is
		     * provided as the second argument, and so on.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to rearrange arguments for.
		     * @param {...(number|number[])} indexes The arranged argument indexes.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var rearged = _.rearg(function(a, b, c) {
		     *   return [a, b, c];
		     * }, [2, 0, 1]);
		     *
		     * rearged('b', 'c', 'a')
		     * // => ['a', 'b', 'c']
		     */
		    var rearg = flatRest(function(func, indexes) {
		      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
		    });

		    /**
		     * Creates a function that invokes `func` with the `this` binding of the
		     * created function and arguments from `start` and beyond provided as
		     * an array.
		     *
		     * **Note:** This method is based on the
		     * [rest parameter](https://mdn.io/rest_parameters).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var say = _.rest(function(what, names) {
		     *   return what + ' ' + _.initial(names).join(', ') +
		     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
		     * });
		     *
		     * say('hello', 'fred', 'barney', 'pebbles');
		     * // => 'hello fred, barney, & pebbles'
		     */
		    function rest(func, start) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      start = start === undefined ? start : toInteger(start);
		      return baseRest(func, start);
		    }

		    /**
		     * Creates a function that invokes `func` with the `this` binding of the
		     * create function and an array of arguments much like
		     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
		     *
		     * **Note:** This method is based on the
		     * [spread operator](https://mdn.io/spread_operator).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Function
		     * @param {Function} func The function to spread arguments over.
		     * @param {number} [start=0] The start position of the spread.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var say = _.spread(function(who, what) {
		     *   return who + ' says ' + what;
		     * });
		     *
		     * say(['fred', 'hello']);
		     * // => 'fred says hello'
		     *
		     * var numbers = Promise.all([
		     *   Promise.resolve(40),
		     *   Promise.resolve(36)
		     * ]);
		     *
		     * numbers.then(_.spread(function(x, y) {
		     *   return x + y;
		     * }));
		     * // => a Promise of 76
		     */
		    function spread(func, start) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      start = start === undefined ? 0 : nativeMax(toInteger(start), 0);
		      return baseRest(function(args) {
		        var array = args[start],
		            otherArgs = castSlice(args, 0, start);

		        if (array) {
		          arrayPush(otherArgs, array);
		        }
		        return apply(func, this, otherArgs);
		      });
		    }

		    /**
		     * Creates a throttled function that only invokes `func` at most once per
		     * every `wait` milliseconds. The throttled function comes with a `cancel`
		     * method to cancel delayed `func` invocations and a `flush` method to
		     * immediately invoke them. Provide `options` to indicate whether `func`
		     * should be invoked on the leading and/or trailing edge of the `wait`
		     * timeout. The `func` is invoked with the last arguments provided to the
		     * throttled function. Subsequent calls to the throttled function return the
		     * result of the last `func` invocation.
		     *
		     * **Note:** If `leading` and `trailing` options are `true`, `func` is
		     * invoked on the trailing edge of the timeout only if the throttled function
		     * is invoked more than once during the `wait` timeout.
		     *
		     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
		     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
		     *
		     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
		     * for details over the differences between `_.throttle` and `_.debounce`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to throttle.
		     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.leading=true]
		     *  Specify invoking on the leading edge of the timeout.
		     * @param {boolean} [options.trailing=true]
		     *  Specify invoking on the trailing edge of the timeout.
		     * @returns {Function} Returns the new throttled function.
		     * @example
		     *
		     * // Avoid excessively updating the position while scrolling.
		     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
		     *
		     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
		     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
		     * jQuery(element).on('click', throttled);
		     *
		     * // Cancel the trailing throttled invocation.
		     * jQuery(window).on('popstate', throttled.cancel);
		     */
		    function throttle(func, wait, options) {
		      var leading = true,
		          trailing = true;

		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      if (isObject(options)) {
		        leading = 'leading' in options ? !!options.leading : leading;
		        trailing = 'trailing' in options ? !!options.trailing : trailing;
		      }
		      return debounce(func, wait, {
		        'leading': leading,
		        'maxWait': wait,
		        'trailing': trailing
		      });
		    }

		    /**
		     * Creates a function that accepts up to one argument, ignoring any
		     * additional arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to cap arguments for.
		     * @returns {Function} Returns the new capped function.
		     * @example
		     *
		     * _.map(['6', '8', '10'], _.unary(parseInt));
		     * // => [6, 8, 10]
		     */
		    function unary(func) {
		      return ary(func, 1);
		    }

		    /**
		     * Creates a function that provides `value` to `wrapper` as its first
		     * argument. Any additional arguments provided to the function are appended
		     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
		     * binding of the created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {*} value The value to wrap.
		     * @param {Function} [wrapper=identity] The wrapper function.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var p = _.wrap(_.escape, function(func, text) {
		     *   return '<p>' + func(text) + '</p>';
		     * });
		     *
		     * p('fred, barney, & pebbles');
		     * // => '<p>fred, barney, &amp; pebbles</p>'
		     */
		    function wrap(value, wrapper) {
		      return partial(castFunction(wrapper), value);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Casts `value` as an array if it's not one.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.4.0
		     * @category Lang
		     * @param {*} value The value to inspect.
		     * @returns {Array} Returns the cast array.
		     * @example
		     *
		     * _.castArray(1);
		     * // => [1]
		     *
		     * _.castArray({ 'a': 1 });
		     * // => [{ 'a': 1 }]
		     *
		     * _.castArray('abc');
		     * // => ['abc']
		     *
		     * _.castArray(null);
		     * // => [null]
		     *
		     * _.castArray(undefined);
		     * // => [undefined]
		     *
		     * _.castArray();
		     * // => []
		     *
		     * var array = [1, 2, 3];
		     * console.log(_.castArray(array) === array);
		     * // => true
		     */
		    function castArray() {
		      if (!arguments.length) {
		        return [];
		      }
		      var value = arguments[0];
		      return isArray(value) ? value : [value];
		    }

		    /**
		     * Creates a shallow clone of `value`.
		     *
		     * **Note:** This method is loosely based on the
		     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
		     * and supports cloning arrays, array buffers, booleans, date objects, maps,
		     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
		     * arrays. The own enumerable properties of `arguments` objects are cloned
		     * as plain objects. An empty object is returned for uncloneable values such
		     * as error objects, functions, DOM nodes, and WeakMaps.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to clone.
		     * @returns {*} Returns the cloned value.
		     * @see _.cloneDeep
		     * @example
		     *
		     * var objects = [{ 'a': 1 }, { 'b': 2 }];
		     *
		     * var shallow = _.clone(objects);
		     * console.log(shallow[0] === objects[0]);
		     * // => true
		     */
		    function clone(value) {
		      return baseClone(value, CLONE_SYMBOLS_FLAG);
		    }

		    /**
		     * This method is like `_.clone` except that it accepts `customizer` which
		     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
		     * cloning is handled by the method instead. The `customizer` is invoked with
		     * up to four arguments; (value [, index|key, object, stack]).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to clone.
		     * @param {Function} [customizer] The function to customize cloning.
		     * @returns {*} Returns the cloned value.
		     * @see _.cloneDeepWith
		     * @example
		     *
		     * function customizer(value) {
		     *   if (_.isElement(value)) {
		     *     return value.cloneNode(false);
		     *   }
		     * }
		     *
		     * var el = _.cloneWith(document.body, customizer);
		     *
		     * console.log(el === document.body);
		     * // => false
		     * console.log(el.nodeName);
		     * // => 'BODY'
		     * console.log(el.childNodes.length);
		     * // => 0
		     */
		    function cloneWith(value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined;
		      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
		    }

		    /**
		     * This method is like `_.clone` except that it recursively clones `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Lang
		     * @param {*} value The value to recursively clone.
		     * @returns {*} Returns the deep cloned value.
		     * @see _.clone
		     * @example
		     *
		     * var objects = [{ 'a': 1 }, { 'b': 2 }];
		     *
		     * var deep = _.cloneDeep(objects);
		     * console.log(deep[0] === objects[0]);
		     * // => false
		     */
		    function cloneDeep(value) {
		      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
		    }

		    /**
		     * This method is like `_.cloneWith` except that it recursively clones `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to recursively clone.
		     * @param {Function} [customizer] The function to customize cloning.
		     * @returns {*} Returns the deep cloned value.
		     * @see _.cloneWith
		     * @example
		     *
		     * function customizer(value) {
		     *   if (_.isElement(value)) {
		     *     return value.cloneNode(true);
		     *   }
		     * }
		     *
		     * var el = _.cloneDeepWith(document.body, customizer);
		     *
		     * console.log(el === document.body);
		     * // => false
		     * console.log(el.nodeName);
		     * // => 'BODY'
		     * console.log(el.childNodes.length);
		     * // => 20
		     */
		    function cloneDeepWith(value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined;
		      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
		    }

		    /**
		     * Checks if `object` conforms to `source` by invoking the predicate
		     * properties of `source` with the corresponding property values of `object`.
		     *
		     * **Note:** This method is equivalent to `_.conforms` when `source` is
		     * partially applied.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.14.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     *
		     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
		     * // => true
		     *
		     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
		     * // => false
		     */
		    function conformsTo(object, source) {
		      return source == null || baseConformsTo(object, source, keys(source));
		    }

		    /**
		     * Performs a
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * comparison between two values to determine if they are equivalent.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     * var other = { 'a': 1 };
		     *
		     * _.eq(object, object);
		     * // => true
		     *
		     * _.eq(object, other);
		     * // => false
		     *
		     * _.eq('a', 'a');
		     * // => true
		     *
		     * _.eq('a', Object('a'));
		     * // => false
		     *
		     * _.eq(NaN, NaN);
		     * // => true
		     */
		    function eq(value, other) {
		      return value === other || (value !== value && other !== other);
		    }

		    /**
		     * Checks if `value` is greater than `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than `other`,
		     *  else `false`.
		     * @see _.lt
		     * @example
		     *
		     * _.gt(3, 1);
		     * // => true
		     *
		     * _.gt(3, 3);
		     * // => false
		     *
		     * _.gt(1, 3);
		     * // => false
		     */
		    var gt = createRelationalOperation(baseGt);

		    /**
		     * Checks if `value` is greater than or equal to `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than or equal to
		     *  `other`, else `false`.
		     * @see _.lte
		     * @example
		     *
		     * _.gte(3, 1);
		     * // => true
		     *
		     * _.gte(3, 3);
		     * // => true
		     *
		     * _.gte(1, 3);
		     * // => false
		     */
		    var gte = createRelationalOperation(function(value, other) {
		      return value >= other;
		    });

		    /**
		     * Checks if `value` is likely an `arguments` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		     *  else `false`.
		     * @example
		     *
		     * _.isArguments(function() { return arguments; }());
		     * // => true
		     *
		     * _.isArguments([1, 2, 3]);
		     * // => false
		     */
		    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
		      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
		        !propertyIsEnumerable.call(value, 'callee');
		    };

		    /**
		     * Checks if `value` is classified as an `Array` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
		     * @example
		     *
		     * _.isArray([1, 2, 3]);
		     * // => true
		     *
		     * _.isArray(document.body.children);
		     * // => false
		     *
		     * _.isArray('abc');
		     * // => false
		     *
		     * _.isArray(_.noop);
		     * // => false
		     */
		    var isArray = Array.isArray;

		    /**
		     * Checks if `value` is classified as an `ArrayBuffer` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
		     * @example
		     *
		     * _.isArrayBuffer(new ArrayBuffer(2));
		     * // => true
		     *
		     * _.isArrayBuffer(new Array(2));
		     * // => false
		     */
		    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

		    /**
		     * Checks if `value` is array-like. A value is considered array-like if it's
		     * not a function and has a `value.length` that's an integer greater than or
		     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
		     * @example
		     *
		     * _.isArrayLike([1, 2, 3]);
		     * // => true
		     *
		     * _.isArrayLike(document.body.children);
		     * // => true
		     *
		     * _.isArrayLike('abc');
		     * // => true
		     *
		     * _.isArrayLike(_.noop);
		     * // => false
		     */
		    function isArrayLike(value) {
		      return value != null && isLength(value.length) && !isFunction(value);
		    }

		    /**
		     * This method is like `_.isArrayLike` except that it also checks if `value`
		     * is an object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array-like object,
		     *  else `false`.
		     * @example
		     *
		     * _.isArrayLikeObject([1, 2, 3]);
		     * // => true
		     *
		     * _.isArrayLikeObject(document.body.children);
		     * // => true
		     *
		     * _.isArrayLikeObject('abc');
		     * // => false
		     *
		     * _.isArrayLikeObject(_.noop);
		     * // => false
		     */
		    function isArrayLikeObject(value) {
		      return isObjectLike(value) && isArrayLike(value);
		    }

		    /**
		     * Checks if `value` is classified as a boolean primitive or object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
		     * @example
		     *
		     * _.isBoolean(false);
		     * // => true
		     *
		     * _.isBoolean(null);
		     * // => false
		     */
		    function isBoolean(value) {
		      return value === true || value === false ||
		        (isObjectLike(value) && baseGetTag(value) == boolTag);
		    }

		    /**
		     * Checks if `value` is a buffer.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
		     * @example
		     *
		     * _.isBuffer(new Buffer(2));
		     * // => true
		     *
		     * _.isBuffer(new Uint8Array(2));
		     * // => false
		     */
		    var isBuffer = nativeIsBuffer || stubFalse;

		    /**
		     * Checks if `value` is classified as a `Date` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
		     * @example
		     *
		     * _.isDate(new Date);
		     * // => true
		     *
		     * _.isDate('Mon April 23 2012');
		     * // => false
		     */
		    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

		    /**
		     * Checks if `value` is likely a DOM element.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
		     * @example
		     *
		     * _.isElement(document.body);
		     * // => true
		     *
		     * _.isElement('<body>');
		     * // => false
		     */
		    function isElement(value) {
		      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
		    }

		    /**
		     * Checks if `value` is an empty object, collection, map, or set.
		     *
		     * Objects are considered empty if they have no own enumerable string keyed
		     * properties.
		     *
		     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
		     * jQuery-like collections are considered empty if they have a `length` of `0`.
		     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
		     * @example
		     *
		     * _.isEmpty(null);
		     * // => true
		     *
		     * _.isEmpty(true);
		     * // => true
		     *
		     * _.isEmpty(1);
		     * // => true
		     *
		     * _.isEmpty([1, 2, 3]);
		     * // => false
		     *
		     * _.isEmpty({ 'a': 1 });
		     * // => false
		     */
		    function isEmpty(value) {
		      if (value == null) {
		        return true;
		      }
		      if (isArrayLike(value) &&
		          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
		            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
		        return !value.length;
		      }
		      var tag = getTag(value);
		      if (tag == mapTag || tag == setTag) {
		        return !value.size;
		      }
		      if (isPrototype(value)) {
		        return !baseKeys(value).length;
		      }
		      for (var key in value) {
		        if (hasOwnProperty.call(value, key)) {
		          return false;
		        }
		      }
		      return true;
		    }

		    /**
		     * Performs a deep comparison between two values to determine if they are
		     * equivalent.
		     *
		     * **Note:** This method supports comparing arrays, array buffers, booleans,
		     * date objects, error objects, maps, numbers, `Object` objects, regexes,
		     * sets, strings, symbols, and typed arrays. `Object` objects are compared
		     * by their own, not inherited, enumerable properties. Functions and DOM
		     * nodes are **not** supported.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     * var other = { 'a': 1 };
		     *
		     * _.isEqual(object, other);
		     * // => true
		     *
		     * object === other;
		     * // => false
		     */
		    function isEqual(value, other) {
		      return baseIsEqual(value, other);
		    }

		    /**
		     * This method is like `_.isEqual` except that it accepts `customizer` which
		     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
		     * are handled by the method instead. The `customizer` is invoked with up to
		     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * function isGreeting(value) {
		     *   return /^h(?:i|ello)$/.test(value);
		     * }
		     *
		     * function customizer(objValue, othValue) {
		     *   if (isGreeting(objValue) && isGreeting(othValue)) {
		     *     return true;
		     *   }
		     * }
		     *
		     * var array = ['hello', 'goodbye'];
		     * var other = ['hi', 'goodbye'];
		     *
		     * _.isEqualWith(array, other, customizer);
		     * // => true
		     */
		    function isEqualWith(value, other, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined;
		      var result = customizer ? customizer(value, other) : undefined;
		      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
		    }

		    /**
		     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
		     * `SyntaxError`, `TypeError`, or `URIError` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
		     * @example
		     *
		     * _.isError(new Error);
		     * // => true
		     *
		     * _.isError(Error);
		     * // => false
		     */
		    function isError(value) {
		      if (!isObjectLike(value)) {
		        return false;
		      }
		      var tag = baseGetTag(value);
		      return tag == errorTag || tag == domExcTag ||
		        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
		    }

		    /**
		     * Checks if `value` is a finite primitive number.
		     *
		     * **Note:** This method is based on
		     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
		     * @example
		     *
		     * _.isFinite(3);
		     * // => true
		     *
		     * _.isFinite(Number.MIN_VALUE);
		     * // => true
		     *
		     * _.isFinite(Infinity);
		     * // => false
		     *
		     * _.isFinite('3');
		     * // => false
		     */
		    function isFinite(value) {
		      return typeof value == 'number' && nativeIsFinite(value);
		    }

		    /**
		     * Checks if `value` is classified as a `Function` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
		     * @example
		     *
		     * _.isFunction(_);
		     * // => true
		     *
		     * _.isFunction(/abc/);
		     * // => false
		     */
		    function isFunction(value) {
		      if (!isObject(value)) {
		        return false;
		      }
		      // The use of `Object#toString` avoids issues with the `typeof` operator
		      // in Safari 9 which returns 'object' for typed arrays and other constructors.
		      var tag = baseGetTag(value);
		      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
		    }

		    /**
		     * Checks if `value` is an integer.
		     *
		     * **Note:** This method is based on
		     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
		     * @example
		     *
		     * _.isInteger(3);
		     * // => true
		     *
		     * _.isInteger(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isInteger(Infinity);
		     * // => false
		     *
		     * _.isInteger('3');
		     * // => false
		     */
		    function isInteger(value) {
		      return typeof value == 'number' && value == toInteger(value);
		    }

		    /**
		     * Checks if `value` is a valid array-like length.
		     *
		     * **Note:** This method is loosely based on
		     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
		     * @example
		     *
		     * _.isLength(3);
		     * // => true
		     *
		     * _.isLength(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isLength(Infinity);
		     * // => false
		     *
		     * _.isLength('3');
		     * // => false
		     */
		    function isLength(value) {
		      return typeof value == 'number' &&
		        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
		    }

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

		    /**
		     * Checks if `value` is classified as a `Map` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		     * @example
		     *
		     * _.isMap(new Map);
		     * // => true
		     *
		     * _.isMap(new WeakMap);
		     * // => false
		     */
		    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

		    /**
		     * Performs a partial deep comparison between `object` and `source` to
		     * determine if `object` contains equivalent property values.
		     *
		     * **Note:** This method is equivalent to `_.matches` when `source` is
		     * partially applied.
		     *
		     * Partial comparisons will match empty array and empty object `source`
		     * values against any array or object value, respectively. See `_.isEqual`
		     * for a list of supported value comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     *
		     * _.isMatch(object, { 'b': 2 });
		     * // => true
		     *
		     * _.isMatch(object, { 'b': 1 });
		     * // => false
		     */
		    function isMatch(object, source) {
		      return object === source || baseIsMatch(object, source, getMatchData(source));
		    }

		    /**
		     * This method is like `_.isMatch` except that it accepts `customizer` which
		     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
		     * are handled by the method instead. The `customizer` is invoked with five
		     * arguments: (objValue, srcValue, index|key, object, source).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     * @example
		     *
		     * function isGreeting(value) {
		     *   return /^h(?:i|ello)$/.test(value);
		     * }
		     *
		     * function customizer(objValue, srcValue) {
		     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
		     *     return true;
		     *   }
		     * }
		     *
		     * var object = { 'greeting': 'hello' };
		     * var source = { 'greeting': 'hi' };
		     *
		     * _.isMatchWith(object, source, customizer);
		     * // => true
		     */
		    function isMatchWith(object, source, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined;
		      return baseIsMatch(object, source, getMatchData(source), customizer);
		    }

		    /**
		     * Checks if `value` is `NaN`.
		     *
		     * **Note:** This method is based on
		     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
		     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
		     * `undefined` and other non-number values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
		     * @example
		     *
		     * _.isNaN(NaN);
		     * // => true
		     *
		     * _.isNaN(new Number(NaN));
		     * // => true
		     *
		     * isNaN(undefined);
		     * // => true
		     *
		     * _.isNaN(undefined);
		     * // => false
		     */
		    function isNaN(value) {
		      // An `NaN` primitive is the only value that is not equal to itself.
		      // Perform the `toStringTag` check first to avoid errors with some
		      // ActiveX objects in IE.
		      return isNumber(value) && value != +value;
		    }

		    /**
		     * Checks if `value` is a pristine native function.
		     *
		     * **Note:** This method can't reliably detect native functions in the presence
		     * of the core-js package because core-js circumvents this kind of detection.
		     * Despite multiple requests, the core-js maintainer has made it clear: any
		     * attempt to fix the detection will be obstructed. As a result, we're left
		     * with little choice but to throw an error. Unfortunately, this also affects
		     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
		     * which rely on core-js.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a native function,
		     *  else `false`.
		     * @example
		     *
		     * _.isNative(Array.prototype.push);
		     * // => true
		     *
		     * _.isNative(_);
		     * // => false
		     */
		    function isNative(value) {
		      if (isMaskable(value)) {
		        throw new Error(CORE_ERROR_TEXT);
		      }
		      return baseIsNative(value);
		    }

		    /**
		     * Checks if `value` is `null`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
		     * @example
		     *
		     * _.isNull(null);
		     * // => true
		     *
		     * _.isNull(void 0);
		     * // => false
		     */
		    function isNull(value) {
		      return value === null;
		    }

		    /**
		     * Checks if `value` is `null` or `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
		     * @example
		     *
		     * _.isNil(null);
		     * // => true
		     *
		     * _.isNil(void 0);
		     * // => true
		     *
		     * _.isNil(NaN);
		     * // => false
		     */
		    function isNil(value) {
		      return value == null;
		    }

		    /**
		     * Checks if `value` is classified as a `Number` primitive or object.
		     *
		     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
		     * classified as numbers, use the `_.isFinite` method.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
		     * @example
		     *
		     * _.isNumber(3);
		     * // => true
		     *
		     * _.isNumber(Number.MIN_VALUE);
		     * // => true
		     *
		     * _.isNumber(Infinity);
		     * // => true
		     *
		     * _.isNumber('3');
		     * // => false
		     */
		    function isNumber(value) {
		      return typeof value == 'number' ||
		        (isObjectLike(value) && baseGetTag(value) == numberTag);
		    }

		    /**
		     * Checks if `value` is a plain object, that is, an object created by the
		     * `Object` constructor or one with a `[[Prototype]]` of `null`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.8.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * _.isPlainObject(new Foo);
		     * // => false
		     *
		     * _.isPlainObject([1, 2, 3]);
		     * // => false
		     *
		     * _.isPlainObject({ 'x': 0, 'y': 0 });
		     * // => true
		     *
		     * _.isPlainObject(Object.create(null));
		     * // => true
		     */
		    function isPlainObject(value) {
		      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
		        return false;
		      }
		      var proto = getPrototype(value);
		      if (proto === null) {
		        return true;
		      }
		      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
		      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
		        funcToString.call(Ctor) == objectCtorString;
		    }

		    /**
		     * Checks if `value` is classified as a `RegExp` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
		     * @example
		     *
		     * _.isRegExp(/abc/);
		     * // => true
		     *
		     * _.isRegExp('/abc/');
		     * // => false
		     */
		    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

		    /**
		     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
		     * double precision number which isn't the result of a rounded unsafe integer.
		     *
		     * **Note:** This method is based on
		     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
		     * @example
		     *
		     * _.isSafeInteger(3);
		     * // => true
		     *
		     * _.isSafeInteger(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isSafeInteger(Infinity);
		     * // => false
		     *
		     * _.isSafeInteger('3');
		     * // => false
		     */
		    function isSafeInteger(value) {
		      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
		    }

		    /**
		     * Checks if `value` is classified as a `Set` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		     * @example
		     *
		     * _.isSet(new Set);
		     * // => true
		     *
		     * _.isSet(new WeakSet);
		     * // => false
		     */
		    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

		    /**
		     * Checks if `value` is classified as a `String` primitive or object.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
		     * @example
		     *
		     * _.isString('abc');
		     * // => true
		     *
		     * _.isString(1);
		     * // => false
		     */
		    function isString(value) {
		      return typeof value == 'string' ||
		        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
		    }

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

		    /**
		     * Checks if `value` is classified as a typed array.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		     * @example
		     *
		     * _.isTypedArray(new Uint8Array);
		     * // => true
		     *
		     * _.isTypedArray([]);
		     * // => false
		     */
		    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

		    /**
		     * Checks if `value` is `undefined`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
		     * @example
		     *
		     * _.isUndefined(void 0);
		     * // => true
		     *
		     * _.isUndefined(null);
		     * // => false
		     */
		    function isUndefined(value) {
		      return value === undefined;
		    }

		    /**
		     * Checks if `value` is classified as a `WeakMap` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
		     * @example
		     *
		     * _.isWeakMap(new WeakMap);
		     * // => true
		     *
		     * _.isWeakMap(new Map);
		     * // => false
		     */
		    function isWeakMap(value) {
		      return isObjectLike(value) && getTag(value) == weakMapTag;
		    }

		    /**
		     * Checks if `value` is classified as a `WeakSet` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
		     * @example
		     *
		     * _.isWeakSet(new WeakSet);
		     * // => true
		     *
		     * _.isWeakSet(new Set);
		     * // => false
		     */
		    function isWeakSet(value) {
		      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
		    }

		    /**
		     * Checks if `value` is less than `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than `other`,
		     *  else `false`.
		     * @see _.gt
		     * @example
		     *
		     * _.lt(1, 3);
		     * // => true
		     *
		     * _.lt(3, 3);
		     * // => false
		     *
		     * _.lt(3, 1);
		     * // => false
		     */
		    var lt = createRelationalOperation(baseLt);

		    /**
		     * Checks if `value` is less than or equal to `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than or equal to
		     *  `other`, else `false`.
		     * @see _.gte
		     * @example
		     *
		     * _.lte(1, 3);
		     * // => true
		     *
		     * _.lte(3, 3);
		     * // => true
		     *
		     * _.lte(3, 1);
		     * // => false
		     */
		    var lte = createRelationalOperation(function(value, other) {
		      return value <= other;
		    });

		    /**
		     * Converts `value` to an array.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {Array} Returns the converted array.
		     * @example
		     *
		     * _.toArray({ 'a': 1, 'b': 2 });
		     * // => [1, 2]
		     *
		     * _.toArray('abc');
		     * // => ['a', 'b', 'c']
		     *
		     * _.toArray(1);
		     * // => []
		     *
		     * _.toArray(null);
		     * // => []
		     */
		    function toArray(value) {
		      if (!value) {
		        return [];
		      }
		      if (isArrayLike(value)) {
		        return isString(value) ? stringToArray(value) : copyArray(value);
		      }
		      if (symIterator && value[symIterator]) {
		        return iteratorToArray(value[symIterator]());
		      }
		      var tag = getTag(value),
		          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

		      return func(value);
		    }

		    /**
		     * Converts `value` to a finite number.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.12.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted number.
		     * @example
		     *
		     * _.toFinite(3.2);
		     * // => 3.2
		     *
		     * _.toFinite(Number.MIN_VALUE);
		     * // => 5e-324
		     *
		     * _.toFinite(Infinity);
		     * // => 1.7976931348623157e+308
		     *
		     * _.toFinite('3.2');
		     * // => 3.2
		     */
		    function toFinite(value) {
		      if (!value) {
		        return value === 0 ? value : 0;
		      }
		      value = toNumber(value);
		      if (value === INFINITY || value === -INFINITY) {
		        var sign = (value < 0 ? -1 : 1);
		        return sign * MAX_INTEGER;
		      }
		      return value === value ? value : 0;
		    }

		    /**
		     * Converts `value` to an integer.
		     *
		     * **Note:** This method is loosely based on
		     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toInteger(3.2);
		     * // => 3
		     *
		     * _.toInteger(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toInteger(Infinity);
		     * // => 1.7976931348623157e+308
		     *
		     * _.toInteger('3.2');
		     * // => 3
		     */
		    function toInteger(value) {
		      var result = toFinite(value),
		          remainder = result % 1;

		      return result === result ? (remainder ? result - remainder : result) : 0;
		    }

		    /**
		     * Converts `value` to an integer suitable for use as the length of an
		     * array-like object.
		     *
		     * **Note:** This method is based on
		     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toLength(3.2);
		     * // => 3
		     *
		     * _.toLength(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toLength(Infinity);
		     * // => 4294967295
		     *
		     * _.toLength('3.2');
		     * // => 3
		     */
		    function toLength(value) {
		      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
		    }

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

		    /**
		     * Converts `value` to a plain object flattening inherited enumerable string
		     * keyed properties of `value` to own properties of the plain object.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {Object} Returns the converted plain object.
		     * @example
		     *
		     * function Foo() {
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.assign({ 'a': 1 }, new Foo);
		     * // => { 'a': 1, 'b': 2 }
		     *
		     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
		     * // => { 'a': 1, 'b': 2, 'c': 3 }
		     */
		    function toPlainObject(value) {
		      return copyObject(value, keysIn(value));
		    }

		    /**
		     * Converts `value` to a safe integer. A safe integer can be compared and
		     * represented correctly.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toSafeInteger(3.2);
		     * // => 3
		     *
		     * _.toSafeInteger(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toSafeInteger(Infinity);
		     * // => 9007199254740991
		     *
		     * _.toSafeInteger('3.2');
		     * // => 3
		     */
		    function toSafeInteger(value) {
		      return baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
		    }

		    /**
		     * Converts `value` to a string. An empty string is returned for `null`
		     * and `undefined` values. The sign of `-0` is preserved.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.toString(null);
		     * // => ''
		     *
		     * _.toString(-0);
		     * // => '-0'
		     *
		     * _.toString([1, 2, 3]);
		     * // => '1,2,3'
		     */
		    function toString(value) {
		      return value == null ? '' : baseToString(value);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Assigns own enumerable string keyed properties of source objects to the
		     * destination object. Source objects are applied from left to right.
		     * Subsequent sources overwrite property assignments of previous sources.
		     *
		     * **Note:** This method mutates `object` and is loosely based on
		     * [`Object.assign`](https://mdn.io/Object/assign).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.10.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.assignIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * function Bar() {
		     *   this.c = 3;
		     * }
		     *
		     * Foo.prototype.b = 2;
		     * Bar.prototype.d = 4;
		     *
		     * _.assign({ 'a': 0 }, new Foo, new Bar);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    var assign = createAssigner(function(object, source) {
		      if (isPrototype(source) || isArrayLike(source)) {
		        copyObject(source, keys(source), object);
		        return;
		      }
		      for (var key in source) {
		        if (hasOwnProperty.call(source, key)) {
		          assignValue(object, key, source[key]);
		        }
		      }
		    });

		    /**
		     * This method is like `_.assign` except that it iterates over own and
		     * inherited source properties.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias extend
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.assign
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * function Bar() {
		     *   this.c = 3;
		     * }
		     *
		     * Foo.prototype.b = 2;
		     * Bar.prototype.d = 4;
		     *
		     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
		     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
		     */
		    var assignIn = createAssigner(function(object, source) {
		      copyObject(source, keysIn(source), object);
		    });

		    /**
		     * This method is like `_.assignIn` except that it accepts `customizer`
		     * which is invoked to produce the assigned values. If `customizer` returns
		     * `undefined`, assignment is handled by the method instead. The `customizer`
		     * is invoked with five arguments: (objValue, srcValue, key, object, source).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias extendWith
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @see _.assignWith
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   return _.isUndefined(objValue) ? srcValue : objValue;
		     * }
		     *
		     * var defaults = _.partialRight(_.assignInWith, customizer);
		     *
		     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
		      copyObject(source, keysIn(source), object, customizer);
		    });

		    /**
		     * This method is like `_.assign` except that it accepts `customizer`
		     * which is invoked to produce the assigned values. If `customizer` returns
		     * `undefined`, assignment is handled by the method instead. The `customizer`
		     * is invoked with five arguments: (objValue, srcValue, key, object, source).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @see _.assignInWith
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   return _.isUndefined(objValue) ? srcValue : objValue;
		     * }
		     *
		     * var defaults = _.partialRight(_.assignWith, customizer);
		     *
		     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
		      copyObject(source, keys(source), object, customizer);
		    });

		    /**
		     * Creates an array of values corresponding to `paths` of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Array} Returns the picked values.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
		     *
		     * _.at(object, ['a[0].b.c', 'a[1]']);
		     * // => [3, 4]
		     */
		    var at = flatRest(baseAt);

		    /**
		     * Creates an object that inherits from the `prototype` object. If a
		     * `properties` object is given, its own enumerable string keyed properties
		     * are assigned to the created object.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.3.0
		     * @category Object
		     * @param {Object} prototype The object to inherit from.
		     * @param {Object} [properties] The properties to assign to the object.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * function Shape() {
		     *   this.x = 0;
		     *   this.y = 0;
		     * }
		     *
		     * function Circle() {
		     *   Shape.call(this);
		     * }
		     *
		     * Circle.prototype = _.create(Shape.prototype, {
		     *   'constructor': Circle
		     * });
		     *
		     * var circle = new Circle;
		     * circle instanceof Circle;
		     * // => true
		     *
		     * circle instanceof Shape;
		     * // => true
		     */
		    function create(prototype, properties) {
		      var result = baseCreate(prototype);
		      return properties == null ? result : baseAssign(result, properties);
		    }

		    /**
		     * Assigns own and inherited enumerable string keyed properties of source
		     * objects to the destination object for all destination properties that
		     * resolve to `undefined`. Source objects are applied from left to right.
		     * Once a property is set, additional values of the same property are ignored.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.defaultsDeep
		     * @example
		     *
		     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var defaults = baseRest(function(args) {
		      args.push(undefined, assignInDefaults);
		      return apply(assignInWith, undefined, args);
		    });

		    /**
		     * This method is like `_.defaults` except that it recursively assigns
		     * default properties.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.defaults
		     * @example
		     *
		     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
		     * // => { 'a': { 'b': 2, 'c': 3 } }
		     */
		    var defaultsDeep = baseRest(function(args) {
		      args.push(undefined, mergeDefaults);
		      return apply(mergeWith, undefined, args);
		    });

		    /**
		     * This method is like `_.find` except that it returns the key of the first
		     * element `predicate` returns truthy for instead of the element itself.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {string|undefined} Returns the key of the matched element,
		     *  else `undefined`.
		     * @example
		     *
		     * var users = {
		     *   'barney':  { 'age': 36, 'active': true },
		     *   'fred':    { 'age': 40, 'active': false },
		     *   'pebbles': { 'age': 1,  'active': true }
		     * };
		     *
		     * _.findKey(users, function(o) { return o.age < 40; });
		     * // => 'barney' (iteration order is not guaranteed)
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findKey(users, { 'age': 1, 'active': true });
		     * // => 'pebbles'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findKey(users, ['active', false]);
		     * // => 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findKey(users, 'active');
		     * // => 'barney'
		     */
		    function findKey(object, predicate) {
		      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
		    }

		    /**
		     * This method is like `_.findKey` except that it iterates over elements of
		     * a collection in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {string|undefined} Returns the key of the matched element,
		     *  else `undefined`.
		     * @example
		     *
		     * var users = {
		     *   'barney':  { 'age': 36, 'active': true },
		     *   'fred':    { 'age': 40, 'active': false },
		     *   'pebbles': { 'age': 1,  'active': true }
		     * };
		     *
		     * _.findLastKey(users, function(o) { return o.age < 40; });
		     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findLastKey(users, { 'age': 36, 'active': true });
		     * // => 'barney'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findLastKey(users, ['active', false]);
		     * // => 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findLastKey(users, 'active');
		     * // => 'pebbles'
		     */
		    function findLastKey(object, predicate) {
		      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
		    }

		    /**
		     * Iterates over own and inherited enumerable string keyed properties of an
		     * object and invokes `iteratee` for each property. The iteratee is invoked
		     * with three arguments: (value, key, object). Iteratee functions may exit
		     * iteration early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forInRight
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forIn(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
		     */
		    function forIn(object, iteratee) {
		      return object == null
		        ? object
		        : baseFor(object, getIteratee(iteratee, 3), keysIn);
		    }

		    /**
		     * This method is like `_.forIn` except that it iterates over properties of
		     * `object` in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forInRight(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
		     */
		    function forInRight(object, iteratee) {
		      return object == null
		        ? object
		        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
		    }

		    /**
		     * Iterates over own enumerable string keyed properties of an object and
		     * invokes `iteratee` for each property. The iteratee is invoked with three
		     * arguments: (value, key, object). Iteratee functions may exit iteration
		     * early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forOwnRight
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forOwn(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
		     */
		    function forOwn(object, iteratee) {
		      return object && baseForOwn(object, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.forOwn` except that it iterates over properties of
		     * `object` in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forOwn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forOwnRight(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
		     */
		    function forOwnRight(object, iteratee) {
		      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
		    }

		    /**
		     * Creates an array of function property names from own enumerable properties
		     * of `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @returns {Array} Returns the function names.
		     * @see _.functionsIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = _.constant('a');
		     *   this.b = _.constant('b');
		     * }
		     *
		     * Foo.prototype.c = _.constant('c');
		     *
		     * _.functions(new Foo);
		     * // => ['a', 'b']
		     */
		    function functions(object) {
		      return object == null ? [] : baseFunctions(object, keys(object));
		    }

		    /**
		     * Creates an array of function property names from own and inherited
		     * enumerable properties of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @returns {Array} Returns the function names.
		     * @see _.functions
		     * @example
		     *
		     * function Foo() {
		     *   this.a = _.constant('a');
		     *   this.b = _.constant('b');
		     * }
		     *
		     * Foo.prototype.c = _.constant('c');
		     *
		     * _.functionsIn(new Foo);
		     * // => ['a', 'b', 'c']
		     */
		    function functionsIn(object) {
		      return object == null ? [] : baseFunctions(object, keysIn(object));
		    }

		    /**
		     * Gets the value at `path` of `object`. If the resolved value is
		     * `undefined`, the `defaultValue` is returned in its place.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to get.
		     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.get(object, 'a[0].b.c');
		     * // => 3
		     *
		     * _.get(object, ['a', '0', 'b', 'c']);
		     * // => 3
		     *
		     * _.get(object, 'a.b.c', 'default');
		     * // => 'default'
		     */
		    function get(object, path, defaultValue) {
		      var result = object == null ? undefined : baseGet(object, path);
		      return result === undefined ? defaultValue : result;
		    }

		    /**
		     * Checks if `path` is a direct property of `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     * @example
		     *
		     * var object = { 'a': { 'b': 2 } };
		     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
		     *
		     * _.has(object, 'a');
		     * // => true
		     *
		     * _.has(object, 'a.b');
		     * // => true
		     *
		     * _.has(object, ['a', 'b']);
		     * // => true
		     *
		     * _.has(other, 'a');
		     * // => false
		     */
		    function has(object, path) {
		      return object != null && hasPath(object, path, baseHas);
		    }

		    /**
		     * Checks if `path` is a direct or inherited property of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     * @example
		     *
		     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
		     *
		     * _.hasIn(object, 'a');
		     * // => true
		     *
		     * _.hasIn(object, 'a.b');
		     * // => true
		     *
		     * _.hasIn(object, ['a', 'b']);
		     * // => true
		     *
		     * _.hasIn(object, 'b');
		     * // => false
		     */
		    function hasIn(object, path) {
		      return object != null && hasPath(object, path, baseHasIn);
		    }

		    /**
		     * Creates an object composed of the inverted keys and values of `object`.
		     * If `object` contains duplicate values, subsequent values overwrite
		     * property assignments of previous values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.7.0
		     * @category Object
		     * @param {Object} object The object to invert.
		     * @returns {Object} Returns the new inverted object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2, 'c': 1 };
		     *
		     * _.invert(object);
		     * // => { '1': 'c', '2': 'b' }
		     */
		    var invert = createInverter(function(result, value, key) {
		      result[value] = key;
		    }, constant(identity));

		    /**
		     * This method is like `_.invert` except that the inverted object is generated
		     * from the results of running each element of `object` thru `iteratee`. The
		     * corresponding inverted value of each inverted key is an array of keys
		     * responsible for generating the inverted value. The iteratee is invoked
		     * with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.1.0
		     * @category Object
		     * @param {Object} object The object to invert.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Object} Returns the new inverted object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2, 'c': 1 };
		     *
		     * _.invertBy(object);
		     * // => { '1': ['a', 'c'], '2': ['b'] }
		     *
		     * _.invertBy(object, function(value) {
		     *   return 'group' + value;
		     * });
		     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
		     */
		    var invertBy = createInverter(function(result, value, key) {
		      if (hasOwnProperty.call(result, value)) {
		        result[value].push(key);
		      } else {
		        result[value] = [key];
		      }
		    }, getIteratee);

		    /**
		     * Invokes the method at `path` of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {*} Returns the result of the invoked method.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
		     *
		     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
		     * // => [2, 3]
		     */
		    var invoke = baseRest(baseInvoke);

		    /**
		     * Creates an array of the own enumerable property names of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects. See the
		     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		     * for more details.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.keys(new Foo);
		     * // => ['a', 'b'] (iteration order is not guaranteed)
		     *
		     * _.keys('hi');
		     * // => ['0', '1']
		     */
		    function keys(object) {
		      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
		    }

		    /**
		     * Creates an array of the own and inherited enumerable property names of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.keysIn(new Foo);
		     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
		     */
		    function keysIn(object) {
		      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
		    }

		    /**
		     * The opposite of `_.mapValues`; this method creates an object with the
		     * same values as `object` and keys generated by running each own enumerable
		     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
		     * with three arguments: (value, key, object).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns the new mapped object.
		     * @see _.mapValues
		     * @example
		     *
		     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
		     *   return key + value;
		     * });
		     * // => { 'a1': 1, 'b2': 2 }
		     */
		    function mapKeys(object, iteratee) {
		      var result = {};
		      iteratee = getIteratee(iteratee, 3);

		      baseForOwn(object, function(value, key, object) {
		        baseAssignValue(result, iteratee(value, key, object), value);
		      });
		      return result;
		    }

		    /**
		     * Creates an object with the same keys as `object` and values generated
		     * by running each own enumerable string keyed property of `object` thru
		     * `iteratee`. The iteratee is invoked with three arguments:
		     * (value, key, object).
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns the new mapped object.
		     * @see _.mapKeys
		     * @example
		     *
		     * var users = {
		     *   'fred':    { 'user': 'fred',    'age': 40 },
		     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
		     * };
		     *
		     * _.mapValues(users, function(o) { return o.age; });
		     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.mapValues(users, 'age');
		     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
		     */
		    function mapValues(object, iteratee) {
		      var result = {};
		      iteratee = getIteratee(iteratee, 3);

		      baseForOwn(object, function(value, key, object) {
		        baseAssignValue(result, key, iteratee(value, key, object));
		      });
		      return result;
		    }

		    /**
		     * This method is like `_.assign` except that it recursively merges own and
		     * inherited enumerable string keyed properties of source objects into the
		     * destination object. Source properties that resolve to `undefined` are
		     * skipped if a destination value exists. Array and plain object properties
		     * are merged recursively. Other objects and value types are overridden by
		     * assignment. Source objects are applied from left to right. Subsequent
		     * sources overwrite property assignments of previous sources.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {
		     *   'a': [{ 'b': 2 }, { 'd': 4 }]
		     * };
		     *
		     * var other = {
		     *   'a': [{ 'c': 3 }, { 'e': 5 }]
		     * };
		     *
		     * _.merge(object, other);
		     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
		     */
		    var merge = createAssigner(function(object, source, srcIndex) {
		      baseMerge(object, source, srcIndex);
		    });

		    /**
		     * This method is like `_.merge` except that it accepts `customizer` which
		     * is invoked to produce the merged values of the destination and source
		     * properties. If `customizer` returns `undefined`, merging is handled by the
		     * method instead. The `customizer` is invoked with six arguments:
		     * (objValue, srcValue, key, object, source, stack).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} customizer The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   if (_.isArray(objValue)) {
		     *     return objValue.concat(srcValue);
		     *   }
		     * }
		     *
		     * var object = { 'a': [1], 'b': [2] };
		     * var other = { 'a': [3], 'b': [4] };
		     *
		     * _.mergeWith(object, other, customizer);
		     * // => { 'a': [1, 3], 'b': [2, 4] }
		     */
		    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
		      baseMerge(object, source, srcIndex, customizer);
		    });

		    /**
		     * The opposite of `_.pick`; this method creates an object composed of the
		     * own and inherited enumerable property paths of `object` that are not omitted.
		     *
		     * **Note:** This method is considerably slower than `_.pick`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {...(string|string[])} [paths] The property paths to omit.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.omit(object, ['a', 'c']);
		     * // => { 'b': '2' }
		     */
		    var omit = flatRest(function(object, paths) {
		      var result = {};
		      if (object == null) {
		        return result;
		      }
		      var isDeep = false;
		      paths = arrayMap(paths, function(path) {
		        path = castPath(path, object);
		        isDeep || (isDeep = path.length > 1);
		        return path;
		      });
		      copyObject(object, getAllKeysIn(object), result);
		      if (isDeep) {
		        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG);
		      }
		      var length = paths.length;
		      while (length--) {
		        baseUnset(result, paths[length]);
		      }
		      return result;
		    });

		    /**
		     * The opposite of `_.pickBy`; this method creates an object composed of
		     * the own and inherited enumerable string keyed properties of `object` that
		     * `predicate` doesn't return truthy for. The predicate is invoked with two
		     * arguments: (value, key).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {Function} [predicate=_.identity] The function invoked per property.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.omitBy(object, _.isNumber);
		     * // => { 'b': '2' }
		     */
		    function omitBy(object, predicate) {
		      return pickBy(object, negate(getIteratee(predicate)));
		    }

		    /**
		     * Creates an object composed of the picked `object` properties.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.pick(object, ['a', 'c']);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    var pick = flatRest(function(object, paths) {
		      return object == null ? {} : basePick(object, paths);
		    });

		    /**
		     * Creates an object composed of the `object` properties `predicate` returns
		     * truthy for. The predicate is invoked with two arguments: (value, key).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {Function} [predicate=_.identity] The function invoked per property.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.pickBy(object, _.isNumber);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    function pickBy(object, predicate) {
		      if (object == null) {
		        return {};
		      }
		      var props = arrayMap(getAllKeysIn(object), function(prop) {
		        return [prop];
		      });
		      predicate = getIteratee(predicate);
		      return basePickBy(object, props, function(value, path) {
		        return predicate(value, path[0]);
		      });
		    }

		    /**
		     * This method is like `_.get` except that if the resolved value is a
		     * function it's invoked with the `this` binding of its parent object and
		     * its result is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to resolve.
		     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
		     *
		     * _.result(object, 'a[0].b.c1');
		     * // => 3
		     *
		     * _.result(object, 'a[0].b.c2');
		     * // => 4
		     *
		     * _.result(object, 'a[0].b.c3', 'default');
		     * // => 'default'
		     *
		     * _.result(object, 'a[0].b.c3', _.constant('default'));
		     * // => 'default'
		     */
		    function result(object, path, defaultValue) {
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length;

		      // Ensure the loop is entered when path is empty.
		      if (!length) {
		        length = 1;
		        object = undefined;
		      }
		      while (++index < length) {
		        var value = object == null ? undefined : object[toKey(path[index])];
		        if (value === undefined) {
		          index = length;
		          value = defaultValue;
		        }
		        object = isFunction(value) ? value.call(object) : value;
		      }
		      return object;
		    }

		    /**
		     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
		     * it's created. Arrays are created for missing index properties while objects
		     * are created for all other missing properties. Use `_.setWith` to customize
		     * `path` creation.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.set(object, 'a[0].b.c', 4);
		     * console.log(object.a[0].b.c);
		     * // => 4
		     *
		     * _.set(object, ['x', '0', 'y', 'z'], 5);
		     * console.log(object.x[0].y.z);
		     * // => 5
		     */
		    function set(object, path, value) {
		      return object == null ? object : baseSet(object, path, value);
		    }

		    /**
		     * This method is like `_.set` except that it accepts `customizer` which is
		     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
		     * path creation is handled by the method instead. The `customizer` is invoked
		     * with three arguments: (nsValue, key, nsObject).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {};
		     *
		     * _.setWith(object, '[0][1]', 'a', Object);
		     * // => { '0': { '1': 'a' } }
		     */
		    function setWith(object, path, value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined;
		      return object == null ? object : baseSet(object, path, value, customizer);
		    }

		    /**
		     * Creates an array of own enumerable string keyed-value pairs for `object`
		     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
		     * entries are returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias entries
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the key-value pairs.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.toPairs(new Foo);
		     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
		     */
		    var toPairs = createToPairs(keys);

		    /**
		     * Creates an array of own and inherited enumerable string keyed-value pairs
		     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
		     * or set, its entries are returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias entriesIn
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the key-value pairs.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.toPairsIn(new Foo);
		     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
		     */
		    var toPairsIn = createToPairs(keysIn);

		    /**
		     * An alternative to `_.reduce`; this method transforms `object` to a new
		     * `accumulator` object which is the result of running each of its own
		     * enumerable string keyed properties thru `iteratee`, with each invocation
		     * potentially mutating the `accumulator` object. If `accumulator` is not
		     * provided, a new object with the same `[[Prototype]]` will be used. The
		     * iteratee is invoked with four arguments: (accumulator, value, key, object).
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The custom accumulator value.
		     * @returns {*} Returns the accumulated value.
		     * @example
		     *
		     * _.transform([2, 3, 4], function(result, n) {
		     *   result.push(n *= n);
		     *   return n % 2 == 0;
		     * }, []);
		     * // => [4, 9]
		     *
		     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
		     *   (result[value] || (result[value] = [])).push(key);
		     * }, {});
		     * // => { '1': ['a', 'c'], '2': ['b'] }
		     */
		    function transform(object, iteratee, accumulator) {
		      var isArr = isArray(object),
		          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

		      iteratee = getIteratee(iteratee, 4);
		      if (accumulator == null) {
		        var Ctor = object && object.constructor;
		        if (isArrLike) {
		          accumulator = isArr ? new Ctor : [];
		        }
		        else if (isObject(object)) {
		          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
		        }
		        else {
		          accumulator = {};
		        }
		      }
		      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
		        return iteratee(accumulator, value, index, object);
		      });
		      return accumulator;
		    }

		    /**
		     * Removes the property at `path` of `object`.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to unset.
		     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
		     * _.unset(object, 'a[0].b.c');
		     * // => true
		     *
		     * console.log(object);
		     * // => { 'a': [{ 'b': {} }] };
		     *
		     * _.unset(object, ['a', '0', 'b', 'c']);
		     * // => true
		     *
		     * console.log(object);
		     * // => { 'a': [{ 'b': {} }] };
		     */
		    function unset(object, path) {
		      return object == null ? true : baseUnset(object, path);
		    }

		    /**
		     * This method is like `_.set` except that accepts `updater` to produce the
		     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
		     * is invoked with one argument: (value).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {Function} updater The function to produce the updated value.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
		     * console.log(object.a[0].b.c);
		     * // => 9
		     *
		     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
		     * console.log(object.x[0].y.z);
		     * // => 0
		     */
		    function update(object, path, updater) {
		      return object == null ? object : baseUpdate(object, path, castFunction(updater));
		    }

		    /**
		     * This method is like `_.update` except that it accepts `customizer` which is
		     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
		     * path creation is handled by the method instead. The `customizer` is invoked
		     * with three arguments: (nsValue, key, nsObject).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {Function} updater The function to produce the updated value.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {};
		     *
		     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
		     * // => { '0': { '1': 'a' } }
		     */
		    function updateWith(object, path, updater, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined;
		      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
		    }

		    /**
		     * Creates an array of the own enumerable string keyed property values of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property values.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.values(new Foo);
		     * // => [1, 2] (iteration order is not guaranteed)
		     *
		     * _.values('hi');
		     * // => ['h', 'i']
		     */
		    function values(object) {
		      return object == null ? [] : baseValues(object, keys(object));
		    }

		    /**
		     * Creates an array of the own and inherited enumerable string keyed property
		     * values of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property values.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.valuesIn(new Foo);
		     * // => [1, 2, 3] (iteration order is not guaranteed)
		     */
		    function valuesIn(object) {
		      return object == null ? [] : baseValues(object, keysIn(object));
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Clamps `number` within the inclusive `lower` and `upper` bounds.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Number
		     * @param {number} number The number to clamp.
		     * @param {number} [lower] The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the clamped number.
		     * @example
		     *
		     * _.clamp(-10, -5, 5);
		     * // => -5
		     *
		     * _.clamp(10, -5, 5);
		     * // => 5
		     */
		    function clamp(number, lower, upper) {
		      if (upper === undefined) {
		        upper = lower;
		        lower = undefined;
		      }
		      if (upper !== undefined) {
		        upper = toNumber(upper);
		        upper = upper === upper ? upper : 0;
		      }
		      if (lower !== undefined) {
		        lower = toNumber(lower);
		        lower = lower === lower ? lower : 0;
		      }
		      return baseClamp(toNumber(number), lower, upper);
		    }

		    /**
		     * Checks if `n` is between `start` and up to, but not including, `end`. If
		     * `end` is not specified, it's set to `start` with `start` then set to `0`.
		     * If `start` is greater than `end` the params are swapped to support
		     * negative ranges.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.3.0
		     * @category Number
		     * @param {number} number The number to check.
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
		     * @see _.range, _.rangeRight
		     * @example
		     *
		     * _.inRange(3, 2, 4);
		     * // => true
		     *
		     * _.inRange(4, 8);
		     * // => true
		     *
		     * _.inRange(4, 2);
		     * // => false
		     *
		     * _.inRange(2, 2);
		     * // => false
		     *
		     * _.inRange(1.2, 2);
		     * // => true
		     *
		     * _.inRange(5.2, 4);
		     * // => false
		     *
		     * _.inRange(-3, -2, -6);
		     * // => true
		     */
		    function inRange(number, start, end) {
		      start = toFinite(start);
		      if (end === undefined) {
		        end = start;
		        start = 0;
		      } else {
		        end = toFinite(end);
		      }
		      number = toNumber(number);
		      return baseInRange(number, start, end);
		    }

		    /**
		     * Produces a random number between the inclusive `lower` and `upper` bounds.
		     * If only one argument is provided a number between `0` and the given number
		     * is returned. If `floating` is `true`, or either `lower` or `upper` are
		     * floats, a floating-point number is returned instead of an integer.
		     *
		     * **Note:** JavaScript follows the IEEE-754 standard for resolving
		     * floating-point values which can produce unexpected results.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.7.0
		     * @category Number
		     * @param {number} [lower=0] The lower bound.
		     * @param {number} [upper=1] The upper bound.
		     * @param {boolean} [floating] Specify returning a floating-point number.
		     * @returns {number} Returns the random number.
		     * @example
		     *
		     * _.random(0, 5);
		     * // => an integer between 0 and 5
		     *
		     * _.random(5);
		     * // => also an integer between 0 and 5
		     *
		     * _.random(5, true);
		     * // => a floating-point number between 0 and 5
		     *
		     * _.random(1.2, 5.2);
		     * // => a floating-point number between 1.2 and 5.2
		     */
		    function random(lower, upper, floating) {
		      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
		        upper = floating = undefined;
		      }
		      if (floating === undefined) {
		        if (typeof upper == 'boolean') {
		          floating = upper;
		          upper = undefined;
		        }
		        else if (typeof lower == 'boolean') {
		          floating = lower;
		          lower = undefined;
		        }
		      }
		      if (lower === undefined && upper === undefined) {
		        lower = 0;
		        upper = 1;
		      }
		      else {
		        lower = toFinite(lower);
		        if (upper === undefined) {
		          upper = lower;
		          lower = 0;
		        } else {
		          upper = toFinite(upper);
		        }
		      }
		      if (lower > upper) {
		        var temp = lower;
		        lower = upper;
		        upper = temp;
		      }
		      if (floating || lower % 1 || upper % 1) {
		        var rand = nativeRandom();
		        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
		      }
		      return baseRandom(lower, upper);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the camel cased string.
		     * @example
		     *
		     * _.camelCase('Foo Bar');
		     * // => 'fooBar'
		     *
		     * _.camelCase('--foo-bar--');
		     * // => 'fooBar'
		     *
		     * _.camelCase('__FOO_BAR__');
		     * // => 'fooBar'
		     */
		    var camelCase = createCompounder(function(result, word, index) {
		      word = word.toLowerCase();
		      return result + (index ? capitalize(word) : word);
		    });

		    /**
		     * Converts the first character of `string` to upper case and the remaining
		     * to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to capitalize.
		     * @returns {string} Returns the capitalized string.
		     * @example
		     *
		     * _.capitalize('FRED');
		     * // => 'Fred'
		     */
		    function capitalize(string) {
		      return upperFirst(toString(string).toLowerCase());
		    }

		    /**
		     * Deburrs `string` by converting
		     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
		     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
		     * letters to basic Latin letters and removing
		     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to deburr.
		     * @returns {string} Returns the deburred string.
		     * @example
		     *
		     * _.deburr('déjà vu');
		     * // => 'deja vu'
		     */
		    function deburr(string) {
		      string = toString(string);
		      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
		    }

		    /**
		     * Checks if `string` ends with the given target string.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {string} [target] The string to search for.
		     * @param {number} [position=string.length] The position to search up to.
		     * @returns {boolean} Returns `true` if `string` ends with `target`,
		     *  else `false`.
		     * @example
		     *
		     * _.endsWith('abc', 'c');
		     * // => true
		     *
		     * _.endsWith('abc', 'b');
		     * // => false
		     *
		     * _.endsWith('abc', 'b', 2);
		     * // => true
		     */
		    function endsWith(string, target, position) {
		      string = toString(string);
		      target = baseToString(target);

		      var length = string.length;
		      position = position === undefined
		        ? length
		        : baseClamp(toInteger(position), 0, length);

		      var end = position;
		      position -= target.length;
		      return position >= 0 && string.slice(position, end) == target;
		    }

		    /**
		     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
		     * corresponding HTML entities.
		     *
		     * **Note:** No other characters are escaped. To escape additional
		     * characters use a third-party library like [_he_](https://mths.be/he).
		     *
		     * Though the ">" character is escaped for symmetry, characters like
		     * ">" and "/" don't need escaping in HTML and have no special meaning
		     * unless they're part of a tag or unquoted attribute value. See
		     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
		     * (under "semi-related fun fact") for more details.
		     *
		     * When working with HTML you should always
		     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
		     * XSS vectors.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category String
		     * @param {string} [string=''] The string to escape.
		     * @returns {string} Returns the escaped string.
		     * @example
		     *
		     * _.escape('fred, barney, & pebbles');
		     * // => 'fred, barney, &amp; pebbles'
		     */
		    function escape(string) {
		      string = toString(string);
		      return (string && reHasUnescapedHtml.test(string))
		        ? string.replace(reUnescapedHtml, escapeHtmlChar)
		        : string;
		    }

		    /**
		     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
		     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to escape.
		     * @returns {string} Returns the escaped string.
		     * @example
		     *
		     * _.escapeRegExp('[lodash](https://lodash.com/)');
		     * // => '\[lodash\]\(https://lodash\.com/\)'
		     */
		    function escapeRegExp(string) {
		      string = toString(string);
		      return (string && reHasRegExpChar.test(string))
		        ? string.replace(reRegExpChar, '\\$&')
		        : string;
		    }

		    /**
		     * Converts `string` to
		     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the kebab cased string.
		     * @example
		     *
		     * _.kebabCase('Foo Bar');
		     * // => 'foo-bar'
		     *
		     * _.kebabCase('fooBar');
		     * // => 'foo-bar'
		     *
		     * _.kebabCase('__FOO_BAR__');
		     * // => 'foo-bar'
		     */
		    var kebabCase = createCompounder(function(result, word, index) {
		      return result + (index ? '-' : '') + word.toLowerCase();
		    });

		    /**
		     * Converts `string`, as space separated words, to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the lower cased string.
		     * @example
		     *
		     * _.lowerCase('--Foo-Bar--');
		     * // => 'foo bar'
		     *
		     * _.lowerCase('fooBar');
		     * // => 'foo bar'
		     *
		     * _.lowerCase('__FOO_BAR__');
		     * // => 'foo bar'
		     */
		    var lowerCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + word.toLowerCase();
		    });

		    /**
		     * Converts the first character of `string` to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.lowerFirst('Fred');
		     * // => 'fred'
		     *
		     * _.lowerFirst('FRED');
		     * // => 'fRED'
		     */
		    var lowerFirst = createCaseFirst('toLowerCase');

		    /**
		     * Pads `string` on the left and right sides if it's shorter than `length`.
		     * Padding characters are truncated if they can't be evenly divided by `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.pad('abc', 8);
		     * // => '  abc   '
		     *
		     * _.pad('abc', 8, '_-');
		     * // => '_-abc_-_'
		     *
		     * _.pad('abc', 3);
		     * // => 'abc'
		     */
		    function pad(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      if (!length || strLength >= length) {
		        return string;
		      }
		      var mid = (length - strLength) / 2;
		      return (
		        createPadding(nativeFloor(mid), chars) +
		        string +
		        createPadding(nativeCeil(mid), chars)
		      );
		    }

		    /**
		     * Pads `string` on the right side if it's shorter than `length`. Padding
		     * characters are truncated if they exceed `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.padEnd('abc', 6);
		     * // => 'abc   '
		     *
		     * _.padEnd('abc', 6, '_-');
		     * // => 'abc_-_'
		     *
		     * _.padEnd('abc', 3);
		     * // => 'abc'
		     */
		    function padEnd(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      return (length && strLength < length)
		        ? (string + createPadding(length - strLength, chars))
		        : string;
		    }

		    /**
		     * Pads `string` on the left side if it's shorter than `length`. Padding
		     * characters are truncated if they exceed `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.padStart('abc', 6);
		     * // => '   abc'
		     *
		     * _.padStart('abc', 6, '_-');
		     * // => '_-_abc'
		     *
		     * _.padStart('abc', 3);
		     * // => 'abc'
		     */
		    function padStart(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      return (length && strLength < length)
		        ? (createPadding(length - strLength, chars) + string)
		        : string;
		    }

		    /**
		     * Converts `string` to an integer of the specified radix. If `radix` is
		     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
		     * hexadecimal, in which case a `radix` of `16` is used.
		     *
		     * **Note:** This method aligns with the
		     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category String
		     * @param {string} string The string to convert.
		     * @param {number} [radix=10] The radix to interpret `value` by.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.parseInt('08');
		     * // => 8
		     *
		     * _.map(['6', '08', '10'], _.parseInt);
		     * // => [6, 8, 10]
		     */
		    function parseInt(string, radix, guard) {
		      if (guard || radix == null) {
		        radix = 0;
		      } else if (radix) {
		        radix = +radix;
		      }
		      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
		    }

		    /**
		     * Repeats the given string `n` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to repeat.
		     * @param {number} [n=1] The number of times to repeat the string.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the repeated string.
		     * @example
		     *
		     * _.repeat('*', 3);
		     * // => '***'
		     *
		     * _.repeat('abc', 2);
		     * // => 'abcabc'
		     *
		     * _.repeat('abc', 0);
		     * // => ''
		     */
		    function repeat(string, n, guard) {
		      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
		        n = 1;
		      } else {
		        n = toInteger(n);
		      }
		      return baseRepeat(toString(string), n);
		    }

		    /**
		     * Replaces matches for `pattern` in `string` with `replacement`.
		     *
		     * **Note:** This method is based on
		     * [`String#replace`](https://mdn.io/String/replace).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to modify.
		     * @param {RegExp|string} pattern The pattern to replace.
		     * @param {Function|string} replacement The match replacement.
		     * @returns {string} Returns the modified string.
		     * @example
		     *
		     * _.replace('Hi Fred', 'Fred', 'Barney');
		     * // => 'Hi Barney'
		     */
		    function replace() {
		      var args = arguments,
		          string = toString(args[0]);

		      return args.length < 3 ? string : string.replace(args[1], args[2]);
		    }

		    /**
		     * Converts `string` to
		     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the snake cased string.
		     * @example
		     *
		     * _.snakeCase('Foo Bar');
		     * // => 'foo_bar'
		     *
		     * _.snakeCase('fooBar');
		     * // => 'foo_bar'
		     *
		     * _.snakeCase('--FOO-BAR--');
		     * // => 'foo_bar'
		     */
		    var snakeCase = createCompounder(function(result, word, index) {
		      return result + (index ? '_' : '') + word.toLowerCase();
		    });

		    /**
		     * Splits `string` by `separator`.
		     *
		     * **Note:** This method is based on
		     * [`String#split`](https://mdn.io/String/split).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to split.
		     * @param {RegExp|string} separator The separator pattern to split by.
		     * @param {number} [limit] The length to truncate results to.
		     * @returns {Array} Returns the string segments.
		     * @example
		     *
		     * _.split('a-b-c', '-', 2);
		     * // => ['a', 'b']
		     */
		    function split(string, separator, limit) {
		      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
		        separator = limit = undefined;
		      }
		      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
		      if (!limit) {
		        return [];
		      }
		      string = toString(string);
		      if (string && (
		            typeof separator == 'string' ||
		            (separator != null && !isRegExp(separator))
		          )) {
		        separator = baseToString(separator);
		        if (!separator && hasUnicode(string)) {
		          return castSlice(stringToArray(string), 0, limit);
		        }
		      }
		      return string.split(separator, limit);
		    }

		    /**
		     * Converts `string` to
		     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.1.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the start cased string.
		     * @example
		     *
		     * _.startCase('--foo-bar--');
		     * // => 'Foo Bar'
		     *
		     * _.startCase('fooBar');
		     * // => 'Foo Bar'
		     *
		     * _.startCase('__FOO_BAR__');
		     * // => 'FOO BAR'
		     */
		    var startCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + upperFirst(word);
		    });

		    /**
		     * Checks if `string` starts with the given target string.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {string} [target] The string to search for.
		     * @param {number} [position=0] The position to search from.
		     * @returns {boolean} Returns `true` if `string` starts with `target`,
		     *  else `false`.
		     * @example
		     *
		     * _.startsWith('abc', 'a');
		     * // => true
		     *
		     * _.startsWith('abc', 'b');
		     * // => false
		     *
		     * _.startsWith('abc', 'b', 1);
		     * // => true
		     */
		    function startsWith(string, target, position) {
		      string = toString(string);
		      position = baseClamp(toInteger(position), 0, string.length);
		      target = baseToString(target);
		      return string.slice(position, position + target.length) == target;
		    }

		    /**
		     * Creates a compiled template function that can interpolate data properties
		     * in "interpolate" delimiters, HTML-escape interpolated data properties in
		     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
		     * properties may be accessed as free variables in the template. If a setting
		     * object is given, it takes precedence over `_.templateSettings` values.
		     *
		     * **Note:** In the development build `_.template` utilizes
		     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
		     * for easier debugging.
		     *
		     * For more information on precompiling templates see
		     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
		     *
		     * For more information on Chrome extension sandboxes see
		     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category String
		     * @param {string} [string=''] The template string.
		     * @param {Object} [options={}] The options object.
		     * @param {RegExp} [options.escape=_.templateSettings.escape]
		     *  The HTML "escape" delimiter.
		     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
		     *  The "evaluate" delimiter.
		     * @param {Object} [options.imports=_.templateSettings.imports]
		     *  An object to import into the template as free variables.
		     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
		     *  The "interpolate" delimiter.
		     * @param {string} [options.sourceURL='lodash.templateSources[n]']
		     *  The sourceURL of the compiled template.
		     * @param {string} [options.variable='obj']
		     *  The data object variable name.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the compiled template function.
		     * @example
		     *
		     * // Use the "interpolate" delimiter to create a compiled template.
		     * var compiled = _.template('hello <%= user %>!');
		     * compiled({ 'user': 'fred' });
		     * // => 'hello fred!'
		     *
		     * // Use the HTML "escape" delimiter to escape data property values.
		     * var compiled = _.template('<b><%- value %></b>');
		     * compiled({ 'value': '<script>' });
		     * // => '<b>&lt;script&gt;</b>'
		     *
		     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
		     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
		     * compiled({ 'users': ['fred', 'barney'] });
		     * // => '<li>fred</li><li>barney</li>'
		     *
		     * // Use the internal `print` function in "evaluate" delimiters.
		     * var compiled = _.template('<% print("hello " + user); %>!');
		     * compiled({ 'user': 'barney' });
		     * // => 'hello barney!'
		     *
		     * // Use the ES template literal delimiter as an "interpolate" delimiter.
		     * // Disable support by replacing the "interpolate" delimiter.
		     * var compiled = _.template('hello ${ user }!');
		     * compiled({ 'user': 'pebbles' });
		     * // => 'hello pebbles!'
		     *
		     * // Use backslashes to treat delimiters as plain text.
		     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
		     * compiled({ 'value': 'ignored' });
		     * // => '<%- value %>'
		     *
		     * // Use the `imports` option to import `jQuery` as `jq`.
		     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
		     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
		     * compiled({ 'users': ['fred', 'barney'] });
		     * // => '<li>fred</li><li>barney</li>'
		     *
		     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
		     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
		     * compiled(data);
		     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
		     *
		     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
		     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
		     * compiled.source;
		     * // => function(data) {
		     * //   var __t, __p = '';
		     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
		     * //   return __p;
		     * // }
		     *
		     * // Use custom template delimiters.
		     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
		     * var compiled = _.template('hello {{ user }}!');
		     * compiled({ 'user': 'mustache' });
		     * // => 'hello mustache!'
		     *
		     * // Use the `source` property to inline compiled templates for meaningful
		     * // line numbers in error messages and stack traces.
		     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
		     *   var JST = {\
		     *     "main": ' + _.template(mainText).source + '\
		     *   };\
		     * ');
		     */
		    function template(string, options, guard) {
		      // Based on John Resig's `tmpl` implementation
		      // (http://ejohn.org/blog/javascript-micro-templating/)
		      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
		      var settings = lodash.templateSettings;

		      if (guard && isIterateeCall(string, options, guard)) {
		        options = undefined;
		      }
		      string = toString(string);
		      options = assignInWith({}, options, settings, assignInDefaults);

		      var imports = assignInWith({}, options.imports, settings.imports, assignInDefaults),
		          importsKeys = keys(imports),
		          importsValues = baseValues(imports, importsKeys);

		      var isEscaping,
		          isEvaluating,
		          index = 0,
		          interpolate = options.interpolate || reNoMatch,
		          source = "__p += '";

		      // Compile the regexp to match each delimiter.
		      var reDelimiters = RegExp(
		        (options.escape || reNoMatch).source + '|' +
		        interpolate.source + '|' +
		        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
		        (options.evaluate || reNoMatch).source + '|$'
		      , 'g');

		      // Use a sourceURL for easier debugging.
		      var sourceURL = '//# sourceURL=' +
		        ('sourceURL' in options
		          ? options.sourceURL
		          : ('lodash.templateSources[' + (++templateCounter) + ']')
		        ) + '\n';

		      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
		        interpolateValue || (interpolateValue = esTemplateValue);

		        // Escape characters that can't be included in string literals.
		        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

		        // Replace delimiters with snippets.
		        if (escapeValue) {
		          isEscaping = true;
		          source += "' +\n__e(" + escapeValue + ") +\n'";
		        }
		        if (evaluateValue) {
		          isEvaluating = true;
		          source += "';\n" + evaluateValue + ";\n__p += '";
		        }
		        if (interpolateValue) {
		          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
		        }
		        index = offset + match.length;

		        // The JS engine embedded in Adobe products needs `match` returned in
		        // order to produce the correct `offset` value.
		        return match;
		      });

		      source += "';\n";

		      // If `variable` is not specified wrap a with-statement around the generated
		      // code to add the data object to the top of the scope chain.
		      var variable = options.variable;
		      if (!variable) {
		        source = 'with (obj) {\n' + source + '\n}\n';
		      }
		      // Cleanup code by stripping empty strings.
		      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
		        .replace(reEmptyStringMiddle, '$1')
		        .replace(reEmptyStringTrailing, '$1;');

		      // Frame code as the function body.
		      source = 'function(' + (variable || 'obj') + ') {\n' +
		        (variable
		          ? ''
		          : 'obj || (obj = {});\n'
		        ) +
		        "var __t, __p = ''" +
		        (isEscaping
		           ? ', __e = _.escape'
		           : ''
		        ) +
		        (isEvaluating
		          ? ', __j = Array.prototype.join;\n' +
		            "function print() { __p += __j.call(arguments, '') }\n"
		          : ';\n'
		        ) +
		        source +
		        'return __p\n}';

		      var result = attempt(function() {
		        return Function(importsKeys, sourceURL + 'return ' + source)
		          .apply(undefined, importsValues);
		      });

		      // Provide the compiled function's source by its `toString` method or
		      // the `source` property as a convenience for inlining compiled templates.
		      result.source = source;
		      if (isError(result)) {
		        throw result;
		      }
		      return result;
		    }

		    /**
		     * Converts `string`, as a whole, to lower case just like
		     * [String#toLowerCase](https://mdn.io/toLowerCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the lower cased string.
		     * @example
		     *
		     * _.toLower('--Foo-Bar--');
		     * // => '--foo-bar--'
		     *
		     * _.toLower('fooBar');
		     * // => 'foobar'
		     *
		     * _.toLower('__FOO_BAR__');
		     * // => '__foo_bar__'
		     */
		    function toLower(value) {
		      return toString(value).toLowerCase();
		    }

		    /**
		     * Converts `string`, as a whole, to upper case just like
		     * [String#toUpperCase](https://mdn.io/toUpperCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the upper cased string.
		     * @example
		     *
		     * _.toUpper('--foo-bar--');
		     * // => '--FOO-BAR--'
		     *
		     * _.toUpper('fooBar');
		     * // => 'FOOBAR'
		     *
		     * _.toUpper('__foo_bar__');
		     * // => '__FOO_BAR__'
		     */
		    function toUpper(value) {
		      return toString(value).toUpperCase();
		    }

		    /**
		     * Removes leading and trailing whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trim('  abc  ');
		     * // => 'abc'
		     *
		     * _.trim('-_-abc-_-', '_-');
		     * // => 'abc'
		     *
		     * _.map(['  foo  ', '  bar  '], _.trim);
		     * // => ['foo', 'bar']
		     */
		    function trim(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined)) {
		        return string.replace(reTrim, '');
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          chrSymbols = stringToArray(chars),
		          start = charsStartIndex(strSymbols, chrSymbols),
		          end = charsEndIndex(strSymbols, chrSymbols) + 1;

		      return castSlice(strSymbols, start, end).join('');
		    }

		    /**
		     * Removes trailing whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trimEnd('  abc  ');
		     * // => '  abc'
		     *
		     * _.trimEnd('-_-abc-_-', '_-');
		     * // => '-_-abc'
		     */
		    function trimEnd(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined)) {
		        return string.replace(reTrimEnd, '');
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

		      return castSlice(strSymbols, 0, end).join('');
		    }

		    /**
		     * Removes leading whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trimStart('  abc  ');
		     * // => 'abc  '
		     *
		     * _.trimStart('-_-abc-_-', '_-');
		     * // => 'abc-_-'
		     */
		    function trimStart(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined)) {
		        return string.replace(reTrimStart, '');
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          start = charsStartIndex(strSymbols, stringToArray(chars));

		      return castSlice(strSymbols, start).join('');
		    }

		    /**
		     * Truncates `string` if it's longer than the given maximum string length.
		     * The last characters of the truncated string are replaced with the omission
		     * string which defaults to "...".
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to truncate.
		     * @param {Object} [options={}] The options object.
		     * @param {number} [options.length=30] The maximum string length.
		     * @param {string} [options.omission='...'] The string to indicate text is omitted.
		     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
		     * @returns {string} Returns the truncated string.
		     * @example
		     *
		     * _.truncate('hi-diddly-ho there, neighborino');
		     * // => 'hi-diddly-ho there, neighbo...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'length': 24,
		     *   'separator': ' '
		     * });
		     * // => 'hi-diddly-ho there,...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'length': 24,
		     *   'separator': /,? +/
		     * });
		     * // => 'hi-diddly-ho there...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'omission': ' [...]'
		     * });
		     * // => 'hi-diddly-ho there, neig [...]'
		     */
		    function truncate(string, options) {
		      var length = DEFAULT_TRUNC_LENGTH,
		          omission = DEFAULT_TRUNC_OMISSION;

		      if (isObject(options)) {
		        var separator = 'separator' in options ? options.separator : separator;
		        length = 'length' in options ? toInteger(options.length) : length;
		        omission = 'omission' in options ? baseToString(options.omission) : omission;
		      }
		      string = toString(string);

		      var strLength = string.length;
		      if (hasUnicode(string)) {
		        var strSymbols = stringToArray(string);
		        strLength = strSymbols.length;
		      }
		      if (length >= strLength) {
		        return string;
		      }
		      var end = length - stringSize(omission);
		      if (end < 1) {
		        return omission;
		      }
		      var result = strSymbols
		        ? castSlice(strSymbols, 0, end).join('')
		        : string.slice(0, end);

		      if (separator === undefined) {
		        return result + omission;
		      }
		      if (strSymbols) {
		        end += (result.length - end);
		      }
		      if (isRegExp(separator)) {
		        if (string.slice(end).search(separator)) {
		          var match,
		              substring = result;

		          if (!separator.global) {
		            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
		          }
		          separator.lastIndex = 0;
		          while ((match = separator.exec(substring))) {
		            var newEnd = match.index;
		          }
		          result = result.slice(0, newEnd === undefined ? end : newEnd);
		        }
		      } else if (string.indexOf(baseToString(separator), end) != end) {
		        var index = result.lastIndexOf(separator);
		        if (index > -1) {
		          result = result.slice(0, index);
		        }
		      }
		      return result + omission;
		    }

		    /**
		     * The inverse of `_.escape`; this method converts the HTML entities
		     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
		     * their corresponding characters.
		     *
		     * **Note:** No other HTML entities are unescaped. To unescape additional
		     * HTML entities use a third-party library like [_he_](https://mths.be/he).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.6.0
		     * @category String
		     * @param {string} [string=''] The string to unescape.
		     * @returns {string} Returns the unescaped string.
		     * @example
		     *
		     * _.unescape('fred, barney, &amp; pebbles');
		     * // => 'fred, barney, & pebbles'
		     */
		    function unescape(string) {
		      string = toString(string);
		      return (string && reHasEscapedHtml.test(string))
		        ? string.replace(reEscapedHtml, unescapeHtmlChar)
		        : string;
		    }

		    /**
		     * Converts `string`, as space separated words, to upper case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the upper cased string.
		     * @example
		     *
		     * _.upperCase('--foo-bar');
		     * // => 'FOO BAR'
		     *
		     * _.upperCase('fooBar');
		     * // => 'FOO BAR'
		     *
		     * _.upperCase('__foo_bar__');
		     * // => 'FOO BAR'
		     */
		    var upperCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + word.toUpperCase();
		    });

		    /**
		     * Converts the first character of `string` to upper case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.upperFirst('fred');
		     * // => 'Fred'
		     *
		     * _.upperFirst('FRED');
		     * // => 'FRED'
		     */
		    var upperFirst = createCaseFirst('toUpperCase');

		    /**
		     * Splits `string` into an array of its words.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {RegExp|string} [pattern] The pattern to match words.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the words of `string`.
		     * @example
		     *
		     * _.words('fred, barney, & pebbles');
		     * // => ['fred', 'barney', 'pebbles']
		     *
		     * _.words('fred, barney, & pebbles', /[^, ]+/g);
		     * // => ['fred', 'barney', '&', 'pebbles']
		     */
		    function words(string, pattern, guard) {
		      string = toString(string);
		      pattern = guard ? undefined : pattern;

		      if (pattern === undefined) {
		        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
		      }
		      return string.match(pattern) || [];
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Attempts to invoke `func`, returning either the result or the caught error
		     * object. Any additional arguments are provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Function} func The function to attempt.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {*} Returns the `func` result or error object.
		     * @example
		     *
		     * // Avoid throwing errors for invalid selectors.
		     * var elements = _.attempt(function(selector) {
		     *   return document.querySelectorAll(selector);
		     * }, '>_>');
		     *
		     * if (_.isError(elements)) {
		     *   elements = [];
		     * }
		     */
		    var attempt = baseRest(function(func, args) {
		      try {
		        return apply(func, undefined, args);
		      } catch (e) {
		        return isError(e) ? e : new Error(e);
		      }
		    });

		    /**
		     * Binds methods of an object to the object itself, overwriting the existing
		     * method.
		     *
		     * **Note:** This method doesn't set the "length" property of bound functions.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {Object} object The object to bind and assign the bound methods to.
		     * @param {...(string|string[])} methodNames The object method names to bind.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var view = {
		     *   'label': 'docs',
		     *   'click': function() {
		     *     console.log('clicked ' + this.label);
		     *   }
		     * };
		     *
		     * _.bindAll(view, ['click']);
		     * jQuery(element).on('click', view.click);
		     * // => Logs 'clicked docs' when clicked.
		     */
		    var bindAll = flatRest(function(object, methodNames) {
		      arrayEach(methodNames, function(key) {
		        key = toKey(key);
		        baseAssignValue(object, key, bind(object[key], object));
		      });
		      return object;
		    });

		    /**
		     * Creates a function that iterates over `pairs` and invokes the corresponding
		     * function of the first predicate to return truthy. The predicate-function
		     * pairs are invoked with the `this` binding and arguments of the created
		     * function.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {Array} pairs The predicate-function pairs.
		     * @returns {Function} Returns the new composite function.
		     * @example
		     *
		     * var func = _.cond([
		     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
		     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
		     *   [_.stubTrue,                      _.constant('no match')]
		     * ]);
		     *
		     * func({ 'a': 1, 'b': 2 });
		     * // => 'matches A'
		     *
		     * func({ 'a': 0, 'b': 1 });
		     * // => 'matches B'
		     *
		     * func({ 'a': '1', 'b': '2' });
		     * // => 'no match'
		     */
		    function cond(pairs) {
		      var length = pairs == null ? 0 : pairs.length,
		          toIteratee = getIteratee();

		      pairs = !length ? [] : arrayMap(pairs, function(pair) {
		        if (typeof pair[1] != 'function') {
		          throw new TypeError(FUNC_ERROR_TEXT);
		        }
		        return [toIteratee(pair[0]), pair[1]];
		      });

		      return baseRest(function(args) {
		        var index = -1;
		        while (++index < length) {
		          var pair = pairs[index];
		          if (apply(pair[0], this, args)) {
		            return apply(pair[1], this, args);
		          }
		        }
		      });
		    }

		    /**
		     * Creates a function that invokes the predicate properties of `source` with
		     * the corresponding property values of a given object, returning `true` if
		     * all predicates return truthy, else `false`.
		     *
		     * **Note:** The created function is equivalent to `_.conformsTo` with
		     * `source` partially applied.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 2, 'b': 1 },
		     *   { 'a': 1, 'b': 2 }
		     * ];
		     *
		     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
		     * // => [{ 'a': 1, 'b': 2 }]
		     */
		    function conforms(source) {
		      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that returns `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Util
		     * @param {*} value The value to return from the new function.
		     * @returns {Function} Returns the new constant function.
		     * @example
		     *
		     * var objects = _.times(2, _.constant({ 'a': 1 }));
		     *
		     * console.log(objects);
		     * // => [{ 'a': 1 }, { 'a': 1 }]
		     *
		     * console.log(objects[0] === objects[1]);
		     * // => true
		     */
		    function constant(value) {
		      return function() {
		        return value;
		      };
		    }

		    /**
		     * Checks `value` to determine whether a default value should be returned in
		     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
		     * or `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.14.0
		     * @category Util
		     * @param {*} value The value to check.
		     * @param {*} defaultValue The default value.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * _.defaultTo(1, 10);
		     * // => 1
		     *
		     * _.defaultTo(undefined, 10);
		     * // => 10
		     */
		    function defaultTo(value, defaultValue) {
		      return (value == null || value !== value) ? defaultValue : value;
		    }

		    /**
		     * Creates a function that returns the result of invoking the given functions
		     * with the `this` binding of the created function, where each successive
		     * invocation is supplied the return value of the previous.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [funcs] The functions to invoke.
		     * @returns {Function} Returns the new composite function.
		     * @see _.flowRight
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var addSquare = _.flow([_.add, square]);
		     * addSquare(1, 2);
		     * // => 9
		     */
		    var flow = createFlow();

		    /**
		     * This method is like `_.flow` except that it creates a function that
		     * invokes the given functions from right to left.
		     *
		     * @static
		     * @since 3.0.0
		     * @memberOf _
		     * @category Util
		     * @param {...(Function|Function[])} [funcs] The functions to invoke.
		     * @returns {Function} Returns the new composite function.
		     * @see _.flow
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var addSquare = _.flowRight([square, _.add]);
		     * addSquare(1, 2);
		     * // => 9
		     */
		    var flowRight = createFlow(true);

		    /**
		     * This method returns the first argument it receives.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {*} value Any value.
		     * @returns {*} Returns `value`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     *
		     * console.log(_.identity(object) === object);
		     * // => true
		     */
		    function identity(value) {
		      return value;
		    }

		    /**
		     * Creates a function that invokes `func` with the arguments of the created
		     * function. If `func` is a property name, the created function returns the
		     * property value for a given element. If `func` is an array or object, the
		     * created function returns `true` for elements that contain the equivalent
		     * source properties, otherwise it returns `false`.
		     *
		     * @static
		     * @since 4.0.0
		     * @memberOf _
		     * @category Util
		     * @param {*} [func=_.identity] The value to convert to a callback.
		     * @returns {Function} Returns the callback.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': true },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
		     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.filter(users, _.iteratee(['user', 'fred']));
		     * // => [{ 'user': 'fred', 'age': 40 }]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.map(users, _.iteratee('user'));
		     * // => ['barney', 'fred']
		     *
		     * // Create custom iteratee shorthands.
		     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
		     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
		     *     return func.test(string);
		     *   };
		     * });
		     *
		     * _.filter(['abc', 'def'], /ef/);
		     * // => ['def']
		     */
		    function iteratee(func) {
		      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that performs a partial deep comparison between a given
		     * object and `source`, returning `true` if the given object has equivalent
		     * property values, else `false`.
		     *
		     * **Note:** The created function is equivalent to `_.isMatch` with `source`
		     * partially applied.
		     *
		     * Partial comparisons will match empty array and empty object `source`
		     * values against any array or object value, respectively. See `_.isEqual`
		     * for a list of supported value comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Object} source The object of property values to match.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 1, 'b': 2, 'c': 3 },
		     *   { 'a': 4, 'b': 5, 'c': 6 }
		     * ];
		     *
		     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
		     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
		     */
		    function matches(source) {
		      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that performs a partial deep comparison between the
		     * value at `path` of a given object to `srcValue`, returning `true` if the
		     * object value is equivalent, else `false`.
		     *
		     * **Note:** Partial comparisons will match empty array and empty object
		     * `srcValue` values against any array or object value, respectively. See
		     * `_.isEqual` for a list of supported value comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Util
		     * @param {Array|string} path The path of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 1, 'b': 2, 'c': 3 },
		     *   { 'a': 4, 'b': 5, 'c': 6 }
		     * ];
		     *
		     * _.find(objects, _.matchesProperty('a', 4));
		     * // => { 'a': 4, 'b': 5, 'c': 6 }
		     */
		    function matchesProperty(path, srcValue) {
		      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that invokes the method at `path` of a given object.
		     * Any additional arguments are provided to the invoked method.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Util
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {Function} Returns the new invoker function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': { 'b': _.constant(2) } },
		     *   { 'a': { 'b': _.constant(1) } }
		     * ];
		     *
		     * _.map(objects, _.method('a.b'));
		     * // => [2, 1]
		     *
		     * _.map(objects, _.method(['a', 'b']));
		     * // => [2, 1]
		     */
		    var method = baseRest(function(path, args) {
		      return function(object) {
		        return baseInvoke(object, path, args);
		      };
		    });

		    /**
		     * The opposite of `_.method`; this method creates a function that invokes
		     * the method at a given path of `object`. Any additional arguments are
		     * provided to the invoked method.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Util
		     * @param {Object} object The object to query.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {Function} Returns the new invoker function.
		     * @example
		     *
		     * var array = _.times(3, _.constant),
		     *     object = { 'a': array, 'b': array, 'c': array };
		     *
		     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
		     * // => [2, 0]
		     *
		     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
		     * // => [2, 0]
		     */
		    var methodOf = baseRest(function(object, args) {
		      return function(path) {
		        return baseInvoke(object, path, args);
		      };
		    });

		    /**
		     * Adds all own enumerable string keyed function properties of a source
		     * object to the destination object. If `object` is a function, then methods
		     * are added to its prototype as well.
		     *
		     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
		     * avoid conflicts caused by modifying the original.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {Function|Object} [object=lodash] The destination object.
		     * @param {Object} source The object of functions to add.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
		     * @returns {Function|Object} Returns `object`.
		     * @example
		     *
		     * function vowels(string) {
		     *   return _.filter(string, function(v) {
		     *     return /[aeiou]/i.test(v);
		     *   });
		     * }
		     *
		     * _.mixin({ 'vowels': vowels });
		     * _.vowels('fred');
		     * // => ['e']
		     *
		     * _('fred').vowels().value();
		     * // => ['e']
		     *
		     * _.mixin({ 'vowels': vowels }, { 'chain': false });
		     * _('fred').vowels();
		     * // => ['e']
		     */
		    function mixin(object, source, options) {
		      var props = keys(source),
		          methodNames = baseFunctions(source, props);

		      if (options == null &&
		          !(isObject(source) && (methodNames.length || !props.length))) {
		        options = source;
		        source = object;
		        object = this;
		        methodNames = baseFunctions(source, keys(source));
		      }
		      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
		          isFunc = isFunction(object);

		      arrayEach(methodNames, function(methodName) {
		        var func = source[methodName];
		        object[methodName] = func;
		        if (isFunc) {
		          object.prototype[methodName] = function() {
		            var chainAll = this.__chain__;
		            if (chain || chainAll) {
		              var result = object(this.__wrapped__),
		                  actions = result.__actions__ = copyArray(this.__actions__);

		              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
		              result.__chain__ = chainAll;
		              return result;
		            }
		            return func.apply(object, arrayPush([this.value()], arguments));
		          };
		        }
		      });

		      return object;
		    }

		    /**
		     * Reverts the `_` variable to its previous value and returns a reference to
		     * the `lodash` function.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @returns {Function} Returns the `lodash` function.
		     * @example
		     *
		     * var lodash = _.noConflict();
		     */
		    function noConflict() {
		      if (root._ === this) {
		        root._ = oldDash;
		      }
		      return this;
		    }

		    /**
		     * This method returns `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.3.0
		     * @category Util
		     * @example
		     *
		     * _.times(2, _.noop);
		     * // => [undefined, undefined]
		     */
		    function noop() {
		      // No operation performed.
		    }

		    /**
		     * Creates a function that gets the argument at index `n`. If `n` is negative,
		     * the nth argument from the end is returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {number} [n=0] The index of the argument to return.
		     * @returns {Function} Returns the new pass-thru function.
		     * @example
		     *
		     * var func = _.nthArg(1);
		     * func('a', 'b', 'c', 'd');
		     * // => 'b'
		     *
		     * var func = _.nthArg(-2);
		     * func('a', 'b', 'c', 'd');
		     * // => 'c'
		     */
		    function nthArg(n) {
		      n = toInteger(n);
		      return baseRest(function(args) {
		        return baseNth(args, n);
		      });
		    }

		    /**
		     * Creates a function that invokes `iteratees` with the arguments it receives
		     * and returns their results.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [iteratees=[_.identity]]
		     *  The iteratees to invoke.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.over([Math.max, Math.min]);
		     *
		     * func(1, 2, 3, 4);
		     * // => [4, 1]
		     */
		    var over = createOver(arrayMap);

		    /**
		     * Creates a function that checks if **all** of the `predicates` return
		     * truthy when invoked with the arguments it receives.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [predicates=[_.identity]]
		     *  The predicates to check.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.overEvery([Boolean, isFinite]);
		     *
		     * func('1');
		     * // => true
		     *
		     * func(null);
		     * // => false
		     *
		     * func(NaN);
		     * // => false
		     */
		    var overEvery = createOver(arrayEvery);

		    /**
		     * Creates a function that checks if **any** of the `predicates` return
		     * truthy when invoked with the arguments it receives.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [predicates=[_.identity]]
		     *  The predicates to check.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.overSome([Boolean, isFinite]);
		     *
		     * func('1');
		     * // => true
		     *
		     * func(null);
		     * // => true
		     *
		     * func(NaN);
		     * // => false
		     */
		    var overSome = createOver(arraySome);

		    /**
		     * Creates a function that returns the value at `path` of a given object.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Util
		     * @param {Array|string} path The path of the property to get.
		     * @returns {Function} Returns the new accessor function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': { 'b': 2 } },
		     *   { 'a': { 'b': 1 } }
		     * ];
		     *
		     * _.map(objects, _.property('a.b'));
		     * // => [2, 1]
		     *
		     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
		     * // => [1, 2]
		     */
		    function property(path) {
		      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
		    }

		    /**
		     * The opposite of `_.property`; this method creates a function that returns
		     * the value at a given path of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Object} object The object to query.
		     * @returns {Function} Returns the new accessor function.
		     * @example
		     *
		     * var array = [0, 1, 2],
		     *     object = { 'a': array, 'b': array, 'c': array };
		     *
		     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
		     * // => [2, 0]
		     *
		     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
		     * // => [2, 0]
		     */
		    function propertyOf(object) {
		      return function(path) {
		        return object == null ? undefined : baseGet(object, path);
		      };
		    }

		    /**
		     * Creates an array of numbers (positive and/or negative) progressing from
		     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
		     * `start` is specified without an `end` or `step`. If `end` is not specified,
		     * it's set to `start` with `start` then set to `0`.
		     *
		     * **Note:** JavaScript follows the IEEE-754 standard for resolving
		     * floating-point values which can produce unexpected results.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} [step=1] The value to increment or decrement by.
		     * @returns {Array} Returns the range of numbers.
		     * @see _.inRange, _.rangeRight
		     * @example
		     *
		     * _.range(4);
		     * // => [0, 1, 2, 3]
		     *
		     * _.range(-4);
		     * // => [0, -1, -2, -3]
		     *
		     * _.range(1, 5);
		     * // => [1, 2, 3, 4]
		     *
		     * _.range(0, 20, 5);
		     * // => [0, 5, 10, 15]
		     *
		     * _.range(0, -4, -1);
		     * // => [0, -1, -2, -3]
		     *
		     * _.range(1, 4, 0);
		     * // => [1, 1, 1]
		     *
		     * _.range(0);
		     * // => []
		     */
		    var range = createRange();

		    /**
		     * This method is like `_.range` except that it populates values in
		     * descending order.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} [step=1] The value to increment or decrement by.
		     * @returns {Array} Returns the range of numbers.
		     * @see _.inRange, _.range
		     * @example
		     *
		     * _.rangeRight(4);
		     * // => [3, 2, 1, 0]
		     *
		     * _.rangeRight(-4);
		     * // => [-3, -2, -1, 0]
		     *
		     * _.rangeRight(1, 5);
		     * // => [4, 3, 2, 1]
		     *
		     * _.rangeRight(0, 20, 5);
		     * // => [15, 10, 5, 0]
		     *
		     * _.rangeRight(0, -4, -1);
		     * // => [-3, -2, -1, 0]
		     *
		     * _.rangeRight(1, 4, 0);
		     * // => [1, 1, 1]
		     *
		     * _.rangeRight(0);
		     * // => []
		     */
		    var rangeRight = createRange(true);

		    /**
		     * This method returns a new empty array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {Array} Returns the new empty array.
		     * @example
		     *
		     * var arrays = _.times(2, _.stubArray);
		     *
		     * console.log(arrays);
		     * // => [[], []]
		     *
		     * console.log(arrays[0] === arrays[1]);
		     * // => false
		     */
		    function stubArray() {
		      return [];
		    }

		    /**
		     * This method returns `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {boolean} Returns `false`.
		     * @example
		     *
		     * _.times(2, _.stubFalse);
		     * // => [false, false]
		     */
		    function stubFalse() {
		      return false;
		    }

		    /**
		     * This method returns a new empty object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {Object} Returns the new empty object.
		     * @example
		     *
		     * var objects = _.times(2, _.stubObject);
		     *
		     * console.log(objects);
		     * // => [{}, {}]
		     *
		     * console.log(objects[0] === objects[1]);
		     * // => false
		     */
		    function stubObject() {
		      return {};
		    }

		    /**
		     * This method returns an empty string.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {string} Returns the empty string.
		     * @example
		     *
		     * _.times(2, _.stubString);
		     * // => ['', '']
		     */
		    function stubString() {
		      return '';
		    }

		    /**
		     * This method returns `true`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {boolean} Returns `true`.
		     * @example
		     *
		     * _.times(2, _.stubTrue);
		     * // => [true, true]
		     */
		    function stubTrue() {
		      return true;
		    }

		    /**
		     * Invokes the iteratee `n` times, returning an array of the results of
		     * each invocation. The iteratee is invoked with one argument; (index).
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {number} n The number of times to invoke `iteratee`.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the array of results.
		     * @example
		     *
		     * _.times(3, String);
		     * // => ['0', '1', '2']
		     *
		     *  _.times(4, _.constant(0));
		     * // => [0, 0, 0, 0]
		     */
		    function times(n, iteratee) {
		      n = toInteger(n);
		      if (n < 1 || n > MAX_SAFE_INTEGER) {
		        return [];
		      }
		      var index = MAX_ARRAY_LENGTH,
		          length = nativeMin(n, MAX_ARRAY_LENGTH);

		      iteratee = getIteratee(iteratee);
		      n -= MAX_ARRAY_LENGTH;

		      var result = baseTimes(length, iteratee);
		      while (++index < n) {
		        iteratee(index);
		      }
		      return result;
		    }

		    /**
		     * Converts `value` to a property path array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {*} value The value to convert.
		     * @returns {Array} Returns the new property path array.
		     * @example
		     *
		     * _.toPath('a.b.c');
		     * // => ['a', 'b', 'c']
		     *
		     * _.toPath('a[0].b.c');
		     * // => ['a', '0', 'b', 'c']
		     */
		    function toPath(value) {
		      if (isArray(value)) {
		        return arrayMap(value, toKey);
		      }
		      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
		    }

		    /**
		     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {string} [prefix=''] The value to prefix the ID with.
		     * @returns {string} Returns the unique ID.
		     * @example
		     *
		     * _.uniqueId('contact_');
		     * // => 'contact_104'
		     *
		     * _.uniqueId();
		     * // => '105'
		     */
		    function uniqueId(prefix) {
		      var id = ++idCounter;
		      return toString(prefix) + id;
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Adds two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.4.0
		     * @category Math
		     * @param {number} augend The first number in an addition.
		     * @param {number} addend The second number in an addition.
		     * @returns {number} Returns the total.
		     * @example
		     *
		     * _.add(6, 4);
		     * // => 10
		     */
		    var add = createMathOperation(function(augend, addend) {
		      return augend + addend;
		    }, 0);

		    /**
		     * Computes `number` rounded up to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round up.
		     * @param {number} [precision=0] The precision to round up to.
		     * @returns {number} Returns the rounded up number.
		     * @example
		     *
		     * _.ceil(4.006);
		     * // => 5
		     *
		     * _.ceil(6.004, 2);
		     * // => 6.01
		     *
		     * _.ceil(6040, -2);
		     * // => 6100
		     */
		    var ceil = createRound('ceil');

		    /**
		     * Divide two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {number} dividend The first number in a division.
		     * @param {number} divisor The second number in a division.
		     * @returns {number} Returns the quotient.
		     * @example
		     *
		     * _.divide(6, 4);
		     * // => 1.5
		     */
		    var divide = createMathOperation(function(dividend, divisor) {
		      return dividend / divisor;
		    }, 1);

		    /**
		     * Computes `number` rounded down to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round down.
		     * @param {number} [precision=0] The precision to round down to.
		     * @returns {number} Returns the rounded down number.
		     * @example
		     *
		     * _.floor(4.006);
		     * // => 4
		     *
		     * _.floor(0.046, 2);
		     * // => 0.04
		     *
		     * _.floor(4060, -2);
		     * // => 4000
		     */
		    var floor = createRound('floor');

		    /**
		     * Computes the maximum value of `array`. If `array` is empty or falsey,
		     * `undefined` is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {*} Returns the maximum value.
		     * @example
		     *
		     * _.max([4, 2, 8, 6]);
		     * // => 8
		     *
		     * _.max([]);
		     * // => undefined
		     */
		    function max(array) {
		      return (array && array.length)
		        ? baseExtremum(array, identity, baseGt)
		        : undefined;
		    }

		    /**
		     * This method is like `_.max` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * the value is ranked. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {*} Returns the maximum value.
		     * @example
		     *
		     * var objects = [{ 'n': 1 }, { 'n': 2 }];
		     *
		     * _.maxBy(objects, function(o) { return o.n; });
		     * // => { 'n': 2 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.maxBy(objects, 'n');
		     * // => { 'n': 2 }
		     */
		    function maxBy(array, iteratee) {
		      return (array && array.length)
		        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
		        : undefined;
		    }

		    /**
		     * Computes the mean of the values in `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {number} Returns the mean.
		     * @example
		     *
		     * _.mean([4, 2, 8, 6]);
		     * // => 5
		     */
		    function mean(array) {
		      return baseMean(array, identity);
		    }

		    /**
		     * This method is like `_.mean` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the value to be averaged.
		     * The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the mean.
		     * @example
		     *
		     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
		     *
		     * _.meanBy(objects, function(o) { return o.n; });
		     * // => 5
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.meanBy(objects, 'n');
		     * // => 5
		     */
		    function meanBy(array, iteratee) {
		      return baseMean(array, getIteratee(iteratee, 2));
		    }

		    /**
		     * Computes the minimum value of `array`. If `array` is empty or falsey,
		     * `undefined` is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {*} Returns the minimum value.
		     * @example
		     *
		     * _.min([4, 2, 8, 6]);
		     * // => 2
		     *
		     * _.min([]);
		     * // => undefined
		     */
		    function min(array) {
		      return (array && array.length)
		        ? baseExtremum(array, identity, baseLt)
		        : undefined;
		    }

		    /**
		     * This method is like `_.min` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * the value is ranked. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {*} Returns the minimum value.
		     * @example
		     *
		     * var objects = [{ 'n': 1 }, { 'n': 2 }];
		     *
		     * _.minBy(objects, function(o) { return o.n; });
		     * // => { 'n': 1 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.minBy(objects, 'n');
		     * // => { 'n': 1 }
		     */
		    function minBy(array, iteratee) {
		      return (array && array.length)
		        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
		        : undefined;
		    }

		    /**
		     * Multiply two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {number} multiplier The first number in a multiplication.
		     * @param {number} multiplicand The second number in a multiplication.
		     * @returns {number} Returns the product.
		     * @example
		     *
		     * _.multiply(6, 4);
		     * // => 24
		     */
		    var multiply = createMathOperation(function(multiplier, multiplicand) {
		      return multiplier * multiplicand;
		    }, 1);

		    /**
		     * Computes `number` rounded to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round.
		     * @param {number} [precision=0] The precision to round to.
		     * @returns {number} Returns the rounded number.
		     * @example
		     *
		     * _.round(4.006);
		     * // => 4
		     *
		     * _.round(4.006, 2);
		     * // => 4.01
		     *
		     * _.round(4060, -2);
		     * // => 4100
		     */
		    var round = createRound('round');

		    /**
		     * Subtract two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {number} minuend The first number in a subtraction.
		     * @param {number} subtrahend The second number in a subtraction.
		     * @returns {number} Returns the difference.
		     * @example
		     *
		     * _.subtract(6, 4);
		     * // => 2
		     */
		    var subtract = createMathOperation(function(minuend, subtrahend) {
		      return minuend - subtrahend;
		    }, 0);

		    /**
		     * Computes the sum of the values in `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.4.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {number} Returns the sum.
		     * @example
		     *
		     * _.sum([4, 2, 8, 6]);
		     * // => 20
		     */
		    function sum(array) {
		      return (array && array.length)
		        ? baseSum(array, identity)
		        : 0;
		    }

		    /**
		     * This method is like `_.sum` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the value to be summed.
		     * The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the sum.
		     * @example
		     *
		     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
		     *
		     * _.sumBy(objects, function(o) { return o.n; });
		     * // => 20
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sumBy(objects, 'n');
		     * // => 20
		     */
		    function sumBy(array, iteratee) {
		      return (array && array.length)
		        ? baseSum(array, getIteratee(iteratee, 2))
		        : 0;
		    }

		    /*------------------------------------------------------------------------*/

		    // Add methods that return wrapped values in chain sequences.
		    lodash.after = after;
		    lodash.ary = ary;
		    lodash.assign = assign;
		    lodash.assignIn = assignIn;
		    lodash.assignInWith = assignInWith;
		    lodash.assignWith = assignWith;
		    lodash.at = at;
		    lodash.before = before;
		    lodash.bind = bind;
		    lodash.bindAll = bindAll;
		    lodash.bindKey = bindKey;
		    lodash.castArray = castArray;
		    lodash.chain = chain;
		    lodash.chunk = chunk;
		    lodash.compact = compact;
		    lodash.concat = concat;
		    lodash.cond = cond;
		    lodash.conforms = conforms;
		    lodash.constant = constant;
		    lodash.countBy = countBy;
		    lodash.create = create;
		    lodash.curry = curry;
		    lodash.curryRight = curryRight;
		    lodash.debounce = debounce;
		    lodash.defaults = defaults;
		    lodash.defaultsDeep = defaultsDeep;
		    lodash.defer = defer;
		    lodash.delay = delay;
		    lodash.difference = difference;
		    lodash.differenceBy = differenceBy;
		    lodash.differenceWith = differenceWith;
		    lodash.drop = drop;
		    lodash.dropRight = dropRight;
		    lodash.dropRightWhile = dropRightWhile;
		    lodash.dropWhile = dropWhile;
		    lodash.fill = fill;
		    lodash.filter = filter;
		    lodash.flatMap = flatMap;
		    lodash.flatMapDeep = flatMapDeep;
		    lodash.flatMapDepth = flatMapDepth;
		    lodash.flatten = flatten;
		    lodash.flattenDeep = flattenDeep;
		    lodash.flattenDepth = flattenDepth;
		    lodash.flip = flip;
		    lodash.flow = flow;
		    lodash.flowRight = flowRight;
		    lodash.fromPairs = fromPairs;
		    lodash.functions = functions;
		    lodash.functionsIn = functionsIn;
		    lodash.groupBy = groupBy;
		    lodash.initial = initial;
		    lodash.intersection = intersection;
		    lodash.intersectionBy = intersectionBy;
		    lodash.intersectionWith = intersectionWith;
		    lodash.invert = invert;
		    lodash.invertBy = invertBy;
		    lodash.invokeMap = invokeMap;
		    lodash.iteratee = iteratee;
		    lodash.keyBy = keyBy;
		    lodash.keys = keys;
		    lodash.keysIn = keysIn;
		    lodash.map = map;
		    lodash.mapKeys = mapKeys;
		    lodash.mapValues = mapValues;
		    lodash.matches = matches;
		    lodash.matchesProperty = matchesProperty;
		    lodash.memoize = memoize;
		    lodash.merge = merge;
		    lodash.mergeWith = mergeWith;
		    lodash.method = method;
		    lodash.methodOf = methodOf;
		    lodash.mixin = mixin;
		    lodash.negate = negate;
		    lodash.nthArg = nthArg;
		    lodash.omit = omit;
		    lodash.omitBy = omitBy;
		    lodash.once = once;
		    lodash.orderBy = orderBy;
		    lodash.over = over;
		    lodash.overArgs = overArgs;
		    lodash.overEvery = overEvery;
		    lodash.overSome = overSome;
		    lodash.partial = partial;
		    lodash.partialRight = partialRight;
		    lodash.partition = partition;
		    lodash.pick = pick;
		    lodash.pickBy = pickBy;
		    lodash.property = property;
		    lodash.propertyOf = propertyOf;
		    lodash.pull = pull;
		    lodash.pullAll = pullAll;
		    lodash.pullAllBy = pullAllBy;
		    lodash.pullAllWith = pullAllWith;
		    lodash.pullAt = pullAt;
		    lodash.range = range;
		    lodash.rangeRight = rangeRight;
		    lodash.rearg = rearg;
		    lodash.reject = reject;
		    lodash.remove = remove;
		    lodash.rest = rest;
		    lodash.reverse = reverse;
		    lodash.sampleSize = sampleSize;
		    lodash.set = set;
		    lodash.setWith = setWith;
		    lodash.shuffle = shuffle;
		    lodash.slice = slice;
		    lodash.sortBy = sortBy;
		    lodash.sortedUniq = sortedUniq;
		    lodash.sortedUniqBy = sortedUniqBy;
		    lodash.split = split;
		    lodash.spread = spread;
		    lodash.tail = tail;
		    lodash.take = take;
		    lodash.takeRight = takeRight;
		    lodash.takeRightWhile = takeRightWhile;
		    lodash.takeWhile = takeWhile;
		    lodash.tap = tap;
		    lodash.throttle = throttle;
		    lodash.thru = thru;
		    lodash.toArray = toArray;
		    lodash.toPairs = toPairs;
		    lodash.toPairsIn = toPairsIn;
		    lodash.toPath = toPath;
		    lodash.toPlainObject = toPlainObject;
		    lodash.transform = transform;
		    lodash.unary = unary;
		    lodash.union = union;
		    lodash.unionBy = unionBy;
		    lodash.unionWith = unionWith;
		    lodash.uniq = uniq;
		    lodash.uniqBy = uniqBy;
		    lodash.uniqWith = uniqWith;
		    lodash.unset = unset;
		    lodash.unzip = unzip;
		    lodash.unzipWith = unzipWith;
		    lodash.update = update;
		    lodash.updateWith = updateWith;
		    lodash.values = values;
		    lodash.valuesIn = valuesIn;
		    lodash.without = without;
		    lodash.words = words;
		    lodash.wrap = wrap;
		    lodash.xor = xor;
		    lodash.xorBy = xorBy;
		    lodash.xorWith = xorWith;
		    lodash.zip = zip;
		    lodash.zipObject = zipObject;
		    lodash.zipObjectDeep = zipObjectDeep;
		    lodash.zipWith = zipWith;

		    // Add aliases.
		    lodash.entries = toPairs;
		    lodash.entriesIn = toPairsIn;
		    lodash.extend = assignIn;
		    lodash.extendWith = assignInWith;

		    // Add methods to `lodash.prototype`.
		    mixin(lodash, lodash);

		    /*------------------------------------------------------------------------*/

		    // Add methods that return unwrapped values in chain sequences.
		    lodash.add = add;
		    lodash.attempt = attempt;
		    lodash.camelCase = camelCase;
		    lodash.capitalize = capitalize;
		    lodash.ceil = ceil;
		    lodash.clamp = clamp;
		    lodash.clone = clone;
		    lodash.cloneDeep = cloneDeep;
		    lodash.cloneDeepWith = cloneDeepWith;
		    lodash.cloneWith = cloneWith;
		    lodash.conformsTo = conformsTo;
		    lodash.deburr = deburr;
		    lodash.defaultTo = defaultTo;
		    lodash.divide = divide;
		    lodash.endsWith = endsWith;
		    lodash.eq = eq;
		    lodash.escape = escape;
		    lodash.escapeRegExp = escapeRegExp;
		    lodash.every = every;
		    lodash.find = find;
		    lodash.findIndex = findIndex;
		    lodash.findKey = findKey;
		    lodash.findLast = findLast;
		    lodash.findLastIndex = findLastIndex;
		    lodash.findLastKey = findLastKey;
		    lodash.floor = floor;
		    lodash.forEach = forEach;
		    lodash.forEachRight = forEachRight;
		    lodash.forIn = forIn;
		    lodash.forInRight = forInRight;
		    lodash.forOwn = forOwn;
		    lodash.forOwnRight = forOwnRight;
		    lodash.get = get;
		    lodash.gt = gt;
		    lodash.gte = gte;
		    lodash.has = has;
		    lodash.hasIn = hasIn;
		    lodash.head = head;
		    lodash.identity = identity;
		    lodash.includes = includes;
		    lodash.indexOf = indexOf;
		    lodash.inRange = inRange;
		    lodash.invoke = invoke;
		    lodash.isArguments = isArguments;
		    lodash.isArray = isArray;
		    lodash.isArrayBuffer = isArrayBuffer;
		    lodash.isArrayLike = isArrayLike;
		    lodash.isArrayLikeObject = isArrayLikeObject;
		    lodash.isBoolean = isBoolean;
		    lodash.isBuffer = isBuffer;
		    lodash.isDate = isDate;
		    lodash.isElement = isElement;
		    lodash.isEmpty = isEmpty;
		    lodash.isEqual = isEqual;
		    lodash.isEqualWith = isEqualWith;
		    lodash.isError = isError;
		    lodash.isFinite = isFinite;
		    lodash.isFunction = isFunction;
		    lodash.isInteger = isInteger;
		    lodash.isLength = isLength;
		    lodash.isMap = isMap;
		    lodash.isMatch = isMatch;
		    lodash.isMatchWith = isMatchWith;
		    lodash.isNaN = isNaN;
		    lodash.isNative = isNative;
		    lodash.isNil = isNil;
		    lodash.isNull = isNull;
		    lodash.isNumber = isNumber;
		    lodash.isObject = isObject;
		    lodash.isObjectLike = isObjectLike;
		    lodash.isPlainObject = isPlainObject;
		    lodash.isRegExp = isRegExp;
		    lodash.isSafeInteger = isSafeInteger;
		    lodash.isSet = isSet;
		    lodash.isString = isString;
		    lodash.isSymbol = isSymbol;
		    lodash.isTypedArray = isTypedArray;
		    lodash.isUndefined = isUndefined;
		    lodash.isWeakMap = isWeakMap;
		    lodash.isWeakSet = isWeakSet;
		    lodash.join = join;
		    lodash.kebabCase = kebabCase;
		    lodash.last = last;
		    lodash.lastIndexOf = lastIndexOf;
		    lodash.lowerCase = lowerCase;
		    lodash.lowerFirst = lowerFirst;
		    lodash.lt = lt;
		    lodash.lte = lte;
		    lodash.max = max;
		    lodash.maxBy = maxBy;
		    lodash.mean = mean;
		    lodash.meanBy = meanBy;
		    lodash.min = min;
		    lodash.minBy = minBy;
		    lodash.stubArray = stubArray;
		    lodash.stubFalse = stubFalse;
		    lodash.stubObject = stubObject;
		    lodash.stubString = stubString;
		    lodash.stubTrue = stubTrue;
		    lodash.multiply = multiply;
		    lodash.nth = nth;
		    lodash.noConflict = noConflict;
		    lodash.noop = noop;
		    lodash.now = now;
		    lodash.pad = pad;
		    lodash.padEnd = padEnd;
		    lodash.padStart = padStart;
		    lodash.parseInt = parseInt;
		    lodash.random = random;
		    lodash.reduce = reduce;
		    lodash.reduceRight = reduceRight;
		    lodash.repeat = repeat;
		    lodash.replace = replace;
		    lodash.result = result;
		    lodash.round = round;
		    lodash.runInContext = runInContext;
		    lodash.sample = sample;
		    lodash.size = size;
		    lodash.snakeCase = snakeCase;
		    lodash.some = some;
		    lodash.sortedIndex = sortedIndex;
		    lodash.sortedIndexBy = sortedIndexBy;
		    lodash.sortedIndexOf = sortedIndexOf;
		    lodash.sortedLastIndex = sortedLastIndex;
		    lodash.sortedLastIndexBy = sortedLastIndexBy;
		    lodash.sortedLastIndexOf = sortedLastIndexOf;
		    lodash.startCase = startCase;
		    lodash.startsWith = startsWith;
		    lodash.subtract = subtract;
		    lodash.sum = sum;
		    lodash.sumBy = sumBy;
		    lodash.template = template;
		    lodash.times = times;
		    lodash.toFinite = toFinite;
		    lodash.toInteger = toInteger;
		    lodash.toLength = toLength;
		    lodash.toLower = toLower;
		    lodash.toNumber = toNumber;
		    lodash.toSafeInteger = toSafeInteger;
		    lodash.toString = toString;
		    lodash.toUpper = toUpper;
		    lodash.trim = trim;
		    lodash.trimEnd = trimEnd;
		    lodash.trimStart = trimStart;
		    lodash.truncate = truncate;
		    lodash.unescape = unescape;
		    lodash.uniqueId = uniqueId;
		    lodash.upperCase = upperCase;
		    lodash.upperFirst = upperFirst;

		    // Add aliases.
		    lodash.each = forEach;
		    lodash.eachRight = forEachRight;
		    lodash.first = head;

		    mixin(lodash, (function() {
		      var source = {};
		      baseForOwn(lodash, function(func, methodName) {
		        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
		          source[methodName] = func;
		        }
		      });
		      return source;
		    }()), { 'chain': false });

		    /*------------------------------------------------------------------------*/

		    /**
		     * The semantic version number.
		     *
		     * @static
		     * @memberOf _
		     * @type {string}
		     */
		    lodash.VERSION = VERSION;

		    // Assign default placeholders.
		    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
		      lodash[methodName].placeholder = lodash;
		    });

		    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
		    arrayEach(['drop', 'take'], function(methodName, index) {
		      LazyWrapper.prototype[methodName] = function(n) {
		        var filtered = this.__filtered__;
		        if (filtered && !index) {
		          return new LazyWrapper(this);
		        }
		        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

		        var result = this.clone();
		        if (filtered) {
		          result.__takeCount__ = nativeMin(n, result.__takeCount__);
		        } else {
		          result.__views__.push({
		            'size': nativeMin(n, MAX_ARRAY_LENGTH),
		            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
		          });
		        }
		        return result;
		      };

		      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
		        return this.reverse()[methodName](n).reverse();
		      };
		    });

		    // Add `LazyWrapper` methods that accept an `iteratee` value.
		    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
		      var type = index + 1,
		          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

		      LazyWrapper.prototype[methodName] = function(iteratee) {
		        var result = this.clone();
		        result.__iteratees__.push({
		          'iteratee': getIteratee(iteratee, 3),
		          'type': type
		        });
		        result.__filtered__ = result.__filtered__ || isFilter;
		        return result;
		      };
		    });

		    // Add `LazyWrapper` methods for `_.head` and `_.last`.
		    arrayEach(['head', 'last'], function(methodName, index) {
		      var takeName = 'take' + (index ? 'Right' : '');

		      LazyWrapper.prototype[methodName] = function() {
		        return this[takeName](1).value()[0];
		      };
		    });

		    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
		    arrayEach(['initial', 'tail'], function(methodName, index) {
		      var dropName = 'drop' + (index ? '' : 'Right');

		      LazyWrapper.prototype[methodName] = function() {
		        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
		      };
		    });

		    LazyWrapper.prototype.compact = function() {
		      return this.filter(identity);
		    };

		    LazyWrapper.prototype.find = function(predicate) {
		      return this.filter(predicate).head();
		    };

		    LazyWrapper.prototype.findLast = function(predicate) {
		      return this.reverse().find(predicate);
		    };

		    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
		      if (typeof path == 'function') {
		        return new LazyWrapper(this);
		      }
		      return this.map(function(value) {
		        return baseInvoke(value, path, args);
		      });
		    });

		    LazyWrapper.prototype.reject = function(predicate) {
		      return this.filter(negate(getIteratee(predicate)));
		    };

		    LazyWrapper.prototype.slice = function(start, end) {
		      start = toInteger(start);

		      var result = this;
		      if (result.__filtered__ && (start > 0 || end < 0)) {
		        return new LazyWrapper(result);
		      }
		      if (start < 0) {
		        result = result.takeRight(-start);
		      } else if (start) {
		        result = result.drop(start);
		      }
		      if (end !== undefined) {
		        end = toInteger(end);
		        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
		      }
		      return result;
		    };

		    LazyWrapper.prototype.takeRightWhile = function(predicate) {
		      return this.reverse().takeWhile(predicate).reverse();
		    };

		    LazyWrapper.prototype.toArray = function() {
		      return this.take(MAX_ARRAY_LENGTH);
		    };

		    // Add `LazyWrapper` methods to `lodash.prototype`.
		    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
		      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
		          isTaker = /^(?:head|last)$/.test(methodName),
		          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
		          retUnwrapped = isTaker || /^find/.test(methodName);

		      if (!lodashFunc) {
		        return;
		      }
		      lodash.prototype[methodName] = function() {
		        var value = this.__wrapped__,
		            args = isTaker ? [1] : arguments,
		            isLazy = value instanceof LazyWrapper,
		            iteratee = args[0],
		            useLazy = isLazy || isArray(value);

		        var interceptor = function(value) {
		          var result = lodashFunc.apply(lodash, arrayPush([value], args));
		          return (isTaker && chainAll) ? result[0] : result;
		        };

		        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
		          // Avoid lazy use if the iteratee has a "length" value other than `1`.
		          isLazy = useLazy = false;
		        }
		        var chainAll = this.__chain__,
		            isHybrid = !!this.__actions__.length,
		            isUnwrapped = retUnwrapped && !chainAll,
		            onlyLazy = isLazy && !isHybrid;

		        if (!retUnwrapped && useLazy) {
		          value = onlyLazy ? value : new LazyWrapper(this);
		          var result = func.apply(value, args);
		          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
		          return new LodashWrapper(result, chainAll);
		        }
		        if (isUnwrapped && onlyLazy) {
		          return func.apply(this, args);
		        }
		        result = this.thru(interceptor);
		        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
		      };
		    });

		    // Add `Array` methods to `lodash.prototype`.
		    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
		      var func = arrayProto[methodName],
		          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
		          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

		      lodash.prototype[methodName] = function() {
		        var args = arguments;
		        if (retUnwrapped && !this.__chain__) {
		          var value = this.value();
		          return func.apply(isArray(value) ? value : [], args);
		        }
		        return this[chainName](function(value) {
		          return func.apply(isArray(value) ? value : [], args);
		        });
		      };
		    });

		    // Map minified method names to their real names.
		    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
		      var lodashFunc = lodash[methodName];
		      if (lodashFunc) {
		        var key = (lodashFunc.name + ''),
		            names = realNames[key] || (realNames[key] = []);

		        names.push({ 'name': methodName, 'func': lodashFunc });
		      }
		    });

		    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
		      'name': 'wrapper',
		      'func': undefined
		    }];

		    // Add methods to `LazyWrapper`.
		    LazyWrapper.prototype.clone = lazyClone;
		    LazyWrapper.prototype.reverse = lazyReverse;
		    LazyWrapper.prototype.value = lazyValue;

		    // Add chain sequence methods to the `lodash` wrapper.
		    lodash.prototype.at = wrapperAt;
		    lodash.prototype.chain = wrapperChain;
		    lodash.prototype.commit = wrapperCommit;
		    lodash.prototype.next = wrapperNext;
		    lodash.prototype.plant = wrapperPlant;
		    lodash.prototype.reverse = wrapperReverse;
		    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

		    // Add lazy aliases.
		    lodash.prototype.first = lodash.prototype.head;

		    if (symIterator) {
		      lodash.prototype[symIterator] = wrapperToIterator;
		    }
		    return lodash;
		  });

		  /*--------------------------------------------------------------------------*/

		  // Export lodash.
		  var _ = runInContext();

		  // Some AMD build optimizers, like r.js, check for condition patterns like:
		  if (true) {
		    // Expose Lodash on the global object to prevent errors when Lodash is
		    // loaded by a script tag in the presence of an AMD loader.
		    // See http://requirejs.org/docs/errors.html#mismatch for more details.
		    // Use `_.noConflict` to remove Lodash from the global object.
		    root._ = _;

		    // Define as an anonymous module so, through path mapping, it can be
		    // referenced as the "underscore" module.
		    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		      return _;
		    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		  }
		  // Check for `exports` after `define` in case a build optimizer adds it.
		  else if (freeModule) {
		    // Export for Node.js.
		    (freeModule.exports = _)._ = _;
		    // Export for CommonJS support.
		    freeExports._ = _;
		  }
		  else {
		    // Export to the global object.
		    root._ = _;
		  }
		}.call(this));

		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(43)(module)))

	/***/ },
	/* 14 */
	/***/ function(module, exports) {

		module.exports = bindActor
		function bindActor () {
		  var args = 
		        Array.prototype.slice.call
		        (arguments) // jswtf.
		    , obj = null
		    , fn
		  if (typeof args[0] === "object") {
		    obj = args.shift()
		    fn = args.shift()
		    if (typeof fn === "string")
		      fn = obj[ fn ]
		  } else fn = args.shift()
		  return function (cb) {
		    fn.apply(obj, args.concat(cb)) }
		}


	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		// a passthrough stream.
		// basically just the most minimal sort of Transform stream.
		// Every written chunk gets output as-is.

		module.exports = PassThrough;

		var Transform = __webpack_require__(8);

		/*<replacement>*/
		var util = __webpack_require__(5);
		util.inherits = __webpack_require__(3);
		/*</replacement>*/

		util.inherits(PassThrough, Transform);

		function PassThrough(options) {
		  if (!(this instanceof PassThrough))
		    return new PassThrough(options);

		  Transform.call(this, options);
		}

		PassThrough.prototype._transform = function(chunk, encoding, cb) {
		  cb(null, chunk);
		};


	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		module.exports = Readable;

		/*<replacement>*/
		var isArray = __webpack_require__(35);
		/*</replacement>*/


		/*<replacement>*/
		var Buffer = __webpack_require__(4).Buffer;
		/*</replacement>*/

		Readable.ReadableState = ReadableState;

		var EE = __webpack_require__(7).EventEmitter;

		/*<replacement>*/
		if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
		  return emitter.listeners(type).length;
		};
		/*</replacement>*/

		var Stream = __webpack_require__(6);

		/*<replacement>*/
		var util = __webpack_require__(5);
		util.inherits = __webpack_require__(3);
		/*</replacement>*/

		var StringDecoder;


		/*<replacement>*/
		var debug = __webpack_require__(47);
		if (debug && debug.debuglog) {
		  debug = debug.debuglog('stream');
		} else {
		  debug = function () {};
		}
		/*</replacement>*/


		util.inherits(Readable, Stream);

		function ReadableState(options, stream) {
		  var Duplex = __webpack_require__(2);

		  options = options || {};

		  // the point at which it stops calling _read() to fill the buffer
		  // Note: 0 is a valid value, means "don't call _read preemptively ever"
		  var hwm = options.highWaterMark;
		  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
		  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

		  // cast to ints.
		  this.highWaterMark = ~~this.highWaterMark;

		  this.buffer = [];
		  this.length = 0;
		  this.pipes = null;
		  this.pipesCount = 0;
		  this.flowing = null;
		  this.ended = false;
		  this.endEmitted = false;
		  this.reading = false;

		  // a flag to be able to tell if the onwrite cb is called immediately,
		  // or on a later tick.  We set this to true at first, because any
		  // actions that shouldn't happen until "later" should generally also
		  // not happen before the first write call.
		  this.sync = true;

		  // whenever we return null, then we set a flag to say
		  // that we're awaiting a 'readable' event emission.
		  this.needReadable = false;
		  this.emittedReadable = false;
		  this.readableListening = false;


		  // object stream flag. Used to make read(n) ignore n and to
		  // make all the buffer merging and length checks go away
		  this.objectMode = !!options.objectMode;

		  if (stream instanceof Duplex)
		    this.objectMode = this.objectMode || !!options.readableObjectMode;

		  // Crypto is kind of old and crusty.  Historically, its default string
		  // encoding is 'binary' so we have to make this configurable.
		  // Everything else in the universe uses 'utf8', though.
		  this.defaultEncoding = options.defaultEncoding || 'utf8';

		  // when piping, we only care about 'readable' events that happen
		  // after read()ing all the bytes and not getting any pushback.
		  this.ranOut = false;

		  // the number of writers that are awaiting a drain event in .pipe()s
		  this.awaitDrain = 0;

		  // if true, a maybeReadMore has been scheduled
		  this.readingMore = false;

		  this.decoder = null;
		  this.encoding = null;
		  if (options.encoding) {
		    if (!StringDecoder)
		      StringDecoder = __webpack_require__(17).StringDecoder;
		    this.decoder = new StringDecoder(options.encoding);
		    this.encoding = options.encoding;
		  }
		}

		function Readable(options) {
		  var Duplex = __webpack_require__(2);

		  if (!(this instanceof Readable))
		    return new Readable(options);

		  this._readableState = new ReadableState(options, this);

		  // legacy
		  this.readable = true;

		  Stream.call(this);
		}

		// Manually shove something into the read() buffer.
		// This returns true if the highWaterMark has not been hit yet,
		// similar to how Writable.write() returns true if you should
		// write() some more.
		Readable.prototype.push = function(chunk, encoding) {
		  var state = this._readableState;

		  if (util.isString(chunk) && !state.objectMode) {
		    encoding = encoding || state.defaultEncoding;
		    if (encoding !== state.encoding) {
		      chunk = new Buffer(chunk, encoding);
		      encoding = '';
		    }
		  }

		  return readableAddChunk(this, state, chunk, encoding, false);
		};

		// Unshift should *always* be something directly out of read()
		Readable.prototype.unshift = function(chunk) {
		  var state = this._readableState;
		  return readableAddChunk(this, state, chunk, '', true);
		};

		function readableAddChunk(stream, state, chunk, encoding, addToFront) {
		  var er = chunkInvalid(state, chunk);
		  if (er) {
		    stream.emit('error', er);
		  } else if (util.isNullOrUndefined(chunk)) {
		    state.reading = false;
		    if (!state.ended)
		      onEofChunk(stream, state);
		  } else if (state.objectMode || chunk && chunk.length > 0) {
		    if (state.ended && !addToFront) {
		      var e = new Error('stream.push() after EOF');
		      stream.emit('error', e);
		    } else if (state.endEmitted && addToFront) {
		      var e = new Error('stream.unshift() after end event');
		      stream.emit('error', e);
		    } else {
		      if (state.decoder && !addToFront && !encoding)
		        chunk = state.decoder.write(chunk);

		      if (!addToFront)
		        state.reading = false;

		      // if we want the data now, just emit it.
		      if (state.flowing && state.length === 0 && !state.sync) {
		        stream.emit('data', chunk);
		        stream.read(0);
		      } else {
		        // update the buffer info.
		        state.length += state.objectMode ? 1 : chunk.length;
		        if (addToFront)
		          state.buffer.unshift(chunk);
		        else
		          state.buffer.push(chunk);

		        if (state.needReadable)
		          emitReadable(stream);
		      }

		      maybeReadMore(stream, state);
		    }
		  } else if (!addToFront) {
		    state.reading = false;
		  }

		  return needMoreData(state);
		}



		// if it's past the high water mark, we can push in some more.
		// Also, if we have no data yet, we can stand some
		// more bytes.  This is to work around cases where hwm=0,
		// such as the repl.  Also, if the push() triggered a
		// readable event, and the user called read(largeNumber) such that
		// needReadable was set, then we ought to push more, so that another
		// 'readable' event will be triggered.
		function needMoreData(state) {
		  return !state.ended &&
		         (state.needReadable ||
		          state.length < state.highWaterMark ||
		          state.length === 0);
		}

		// backwards compatibility.
		Readable.prototype.setEncoding = function(enc) {
		  if (!StringDecoder)
		    StringDecoder = __webpack_require__(17).StringDecoder;
		  this._readableState.decoder = new StringDecoder(enc);
		  this._readableState.encoding = enc;
		  return this;
		};

		// Don't raise the hwm > 128MB
		var MAX_HWM = 0x800000;
		function roundUpToNextPowerOf2(n) {
		  if (n >= MAX_HWM) {
		    n = MAX_HWM;
		  } else {
		    // Get the next highest power of 2
		    n--;
		    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
		    n++;
		  }
		  return n;
		}

		function howMuchToRead(n, state) {
		  if (state.length === 0 && state.ended)
		    return 0;

		  if (state.objectMode)
		    return n === 0 ? 0 : 1;

		  if (isNaN(n) || util.isNull(n)) {
		    // only flow one buffer at a time
		    if (state.flowing && state.buffer.length)
		      return state.buffer[0].length;
		    else
		      return state.length;
		  }

		  if (n <= 0)
		    return 0;

		  // If we're asking for more than the target buffer level,
		  // then raise the water mark.  Bump up to the next highest
		  // power of 2, to prevent increasing it excessively in tiny
		  // amounts.
		  if (n > state.highWaterMark)
		    state.highWaterMark = roundUpToNextPowerOf2(n);

		  // don't have that much.  return null, unless we've ended.
		  if (n > state.length) {
		    if (!state.ended) {
		      state.needReadable = true;
		      return 0;
		    } else
		      return state.length;
		  }

		  return n;
		}

		// you can override either this method, or the async _read(n) below.
		Readable.prototype.read = function(n) {
		  debug('read', n);
		  var state = this._readableState;
		  var nOrig = n;

		  if (!util.isNumber(n) || n > 0)
		    state.emittedReadable = false;

		  // if we're doing read(0) to trigger a readable event, but we
		  // already have a bunch of data in the buffer, then just trigger
		  // the 'readable' event and move on.
		  if (n === 0 &&
		      state.needReadable &&
		      (state.length >= state.highWaterMark || state.ended)) {
		    debug('read: emitReadable', state.length, state.ended);
		    if (state.length === 0 && state.ended)
		      endReadable(this);
		    else
		      emitReadable(this);
		    return null;
		  }

		  n = howMuchToRead(n, state);

		  // if we've ended, and we're now clear, then finish it up.
		  if (n === 0 && state.ended) {
		    if (state.length === 0)
		      endReadable(this);
		    return null;
		  }

		  // All the actual chunk generation logic needs to be
		  // *below* the call to _read.  The reason is that in certain
		  // synthetic stream cases, such as passthrough streams, _read
		  // may be a completely synchronous operation which may change
		  // the state of the read buffer, providing enough data when
		  // before there was *not* enough.
		  //
		  // So, the steps are:
		  // 1. Figure out what the state of things will be after we do
		  // a read from the buffer.
		  //
		  // 2. If that resulting state will trigger a _read, then call _read.
		  // Note that this may be asynchronous, or synchronous.  Yes, it is
		  // deeply ugly to write APIs this way, but that still doesn't mean
		  // that the Readable class should behave improperly, as streams are
		  // designed to be sync/async agnostic.
		  // Take note if the _read call is sync or async (ie, if the read call
		  // has returned yet), so that we know whether or not it's safe to emit
		  // 'readable' etc.
		  //
		  // 3. Actually pull the requested chunks out of the buffer and return.

		  // if we need a readable event, then we need to do some reading.
		  var doRead = state.needReadable;
		  debug('need readable', doRead);

		  // if we currently have less than the highWaterMark, then also read some
		  if (state.length === 0 || state.length - n < state.highWaterMark) {
		    doRead = true;
		    debug('length less than watermark', doRead);
		  }

		  // however, if we've ended, then there's no point, and if we're already
		  // reading, then it's unnecessary.
		  if (state.ended || state.reading) {
		    doRead = false;
		    debug('reading or ended', doRead);
		  }

		  if (doRead) {
		    debug('do read');
		    state.reading = true;
		    state.sync = true;
		    // if the length is currently zero, then we *need* a readable event.
		    if (state.length === 0)
		      state.needReadable = true;
		    // call internal read method
		    this._read(state.highWaterMark);
		    state.sync = false;
		  }

		  // If _read pushed data synchronously, then `reading` will be false,
		  // and we need to re-evaluate how much data we can return to the user.
		  if (doRead && !state.reading)
		    n = howMuchToRead(nOrig, state);

		  var ret;
		  if (n > 0)
		    ret = fromList(n, state);
		  else
		    ret = null;

		  if (util.isNull(ret)) {
		    state.needReadable = true;
		    n = 0;
		  }

		  state.length -= n;

		  // If we have nothing in the buffer, then we want to know
		  // as soon as we *do* get something into the buffer.
		  if (state.length === 0 && !state.ended)
		    state.needReadable = true;

		  // If we tried to read() past the EOF, then emit end on the next tick.
		  if (nOrig !== n && state.ended && state.length === 0)
		    endReadable(this);

		  if (!util.isNull(ret))
		    this.emit('data', ret);

		  return ret;
		};

		function chunkInvalid(state, chunk) {
		  var er = null;
		  if (!util.isBuffer(chunk) &&
		      !util.isString(chunk) &&
		      !util.isNullOrUndefined(chunk) &&
		      !state.objectMode) {
		    er = new TypeError('Invalid non-string/buffer chunk');
		  }
		  return er;
		}


		function onEofChunk(stream, state) {
		  if (state.decoder && !state.ended) {
		    var chunk = state.decoder.end();
		    if (chunk && chunk.length) {
		      state.buffer.push(chunk);
		      state.length += state.objectMode ? 1 : chunk.length;
		    }
		  }
		  state.ended = true;

		  // emit 'readable' now to make sure it gets picked up.
		  emitReadable(stream);
		}

		// Don't emit readable right away in sync mode, because this can trigger
		// another read() call => stack overflow.  This way, it might trigger
		// a nextTick recursion warning, but that's not so bad.
		function emitReadable(stream) {
		  var state = stream._readableState;
		  state.needReadable = false;
		  if (!state.emittedReadable) {
		    debug('emitReadable', state.flowing);
		    state.emittedReadable = true;
		    if (state.sync)
		      process.nextTick(function() {
		        emitReadable_(stream);
		      });
		    else
		      emitReadable_(stream);
		  }
		}

		function emitReadable_(stream) {
		  debug('emit readable');
		  stream.emit('readable');
		  flow(stream);
		}


		// at this point, the user has presumably seen the 'readable' event,
		// and called read() to consume some data.  that may have triggered
		// in turn another _read(n) call, in which case reading = true if
		// it's in progress.
		// However, if we're not ended, or reading, and the length < hwm,
		// then go ahead and try to read some more preemptively.
		function maybeReadMore(stream, state) {
		  if (!state.readingMore) {
		    state.readingMore = true;
		    process.nextTick(function() {
		      maybeReadMore_(stream, state);
		    });
		  }
		}

		function maybeReadMore_(stream, state) {
		  var len = state.length;
		  while (!state.reading && !state.flowing && !state.ended &&
		         state.length < state.highWaterMark) {
		    debug('maybeReadMore read 0');
		    stream.read(0);
		    if (len === state.length)
		      // didn't get any data, stop spinning.
		      break;
		    else
		      len = state.length;
		  }
		  state.readingMore = false;
		}

		// abstract method.  to be overridden in specific implementation classes.
		// call cb(er, data) where data is <= n in length.
		// for virtual (non-string, non-buffer) streams, "length" is somewhat
		// arbitrary, and perhaps not very meaningful.
		Readable.prototype._read = function(n) {
		  this.emit('error', new Error('not implemented'));
		};

		Readable.prototype.pipe = function(dest, pipeOpts) {
		  var src = this;
		  var state = this._readableState;

		  switch (state.pipesCount) {
		    case 0:
		      state.pipes = dest;
		      break;
		    case 1:
		      state.pipes = [state.pipes, dest];
		      break;
		    default:
		      state.pipes.push(dest);
		      break;
		  }
		  state.pipesCount += 1;
		  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

		  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
		              dest !== process.stdout &&
		              dest !== process.stderr;

		  var endFn = doEnd ? onend : cleanup;
		  if (state.endEmitted)
		    process.nextTick(endFn);
		  else
		    src.once('end', endFn);

		  dest.on('unpipe', onunpipe);
		  function onunpipe(readable) {
		    debug('onunpipe');
		    if (readable === src) {
		      cleanup();
		    }
		  }

		  function onend() {
		    debug('onend');
		    dest.end();
		  }

		  // when the dest drains, it reduces the awaitDrain counter
		  // on the source.  This would be more elegant with a .once()
		  // handler in flow(), but adding and removing repeatedly is
		  // too slow.
		  var ondrain = pipeOnDrain(src);
		  dest.on('drain', ondrain);

		  function cleanup() {
		    debug('cleanup');
		    // cleanup event handlers once the pipe is broken
		    dest.removeListener('close', onclose);
		    dest.removeListener('finish', onfinish);
		    dest.removeListener('drain', ondrain);
		    dest.removeListener('error', onerror);
		    dest.removeListener('unpipe', onunpipe);
		    src.removeListener('end', onend);
		    src.removeListener('end', cleanup);
		    src.removeListener('data', ondata);

		    // if the reader is waiting for a drain event from this
		    // specific writer, then it would cause it to never start
		    // flowing again.
		    // So, if this is awaiting a drain, then we just call it now.
		    // If we don't know, then assume that we are waiting for one.
		    if (state.awaitDrain &&
		        (!dest._writableState || dest._writableState.needDrain))
		      ondrain();
		  }

		  src.on('data', ondata);
		  function ondata(chunk) {
		    debug('ondata');
		    var ret = dest.write(chunk);
		    if (false === ret) {
		      debug('false write response, pause',
		            src._readableState.awaitDrain);
		      src._readableState.awaitDrain++;
		      src.pause();
		    }
		  }

		  // if the dest has an error, then stop piping into it.
		  // however, don't suppress the throwing behavior for this.
		  function onerror(er) {
		    debug('onerror', er);
		    unpipe();
		    dest.removeListener('error', onerror);
		    if (EE.listenerCount(dest, 'error') === 0)
		      dest.emit('error', er);
		  }
		  // This is a brutally ugly hack to make sure that our error handler
		  // is attached before any userland ones.  NEVER DO THIS.
		  if (!dest._events || !dest._events.error)
		    dest.on('error', onerror);
		  else if (isArray(dest._events.error))
		    dest._events.error.unshift(onerror);
		  else
		    dest._events.error = [onerror, dest._events.error];



		  // Both close and finish should trigger unpipe, but only once.
		  function onclose() {
		    dest.removeListener('finish', onfinish);
		    unpipe();
		  }
		  dest.once('close', onclose);
		  function onfinish() {
		    debug('onfinish');
		    dest.removeListener('close', onclose);
		    unpipe();
		  }
		  dest.once('finish', onfinish);

		  function unpipe() {
		    debug('unpipe');
		    src.unpipe(dest);
		  }

		  // tell the dest that it's being piped to
		  dest.emit('pipe', src);

		  // start the flow if it hasn't been started already.
		  if (!state.flowing) {
		    debug('pipe resume');
		    src.resume();
		  }

		  return dest;
		};

		function pipeOnDrain(src) {
		  return function() {
		    var state = src._readableState;
		    debug('pipeOnDrain', state.awaitDrain);
		    if (state.awaitDrain)
		      state.awaitDrain--;
		    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
		      state.flowing = true;
		      flow(src);
		    }
		  };
		}


		Readable.prototype.unpipe = function(dest) {
		  var state = this._readableState;

		  // if we're not piping anywhere, then do nothing.
		  if (state.pipesCount === 0)
		    return this;

		  // just one destination.  most common case.
		  if (state.pipesCount === 1) {
		    // passed in one, but it's not the right one.
		    if (dest && dest !== state.pipes)
		      return this;

		    if (!dest)
		      dest = state.pipes;

		    // got a match.
		    state.pipes = null;
		    state.pipesCount = 0;
		    state.flowing = false;
		    if (dest)
		      dest.emit('unpipe', this);
		    return this;
		  }

		  // slow case. multiple pipe destinations.

		  if (!dest) {
		    // remove all.
		    var dests = state.pipes;
		    var len = state.pipesCount;
		    state.pipes = null;
		    state.pipesCount = 0;
		    state.flowing = false;

		    for (var i = 0; i < len; i++)
		      dests[i].emit('unpipe', this);
		    return this;
		  }

		  // try to find the right one.
		  var i = indexOf(state.pipes, dest);
		  if (i === -1)
		    return this;

		  state.pipes.splice(i, 1);
		  state.pipesCount -= 1;
		  if (state.pipesCount === 1)
		    state.pipes = state.pipes[0];

		  dest.emit('unpipe', this);

		  return this;
		};

		// set up data events if they are asked for
		// Ensure readable listeners eventually get something
		Readable.prototype.on = function(ev, fn) {
		  var res = Stream.prototype.on.call(this, ev, fn);

		  // If listening to data, and it has not explicitly been paused,
		  // then call resume to start the flow of data on the next tick.
		  if (ev === 'data' && false !== this._readableState.flowing) {
		    this.resume();
		  }

		  if (ev === 'readable' && this.readable) {
		    var state = this._readableState;
		    if (!state.readableListening) {
		      state.readableListening = true;
		      state.emittedReadable = false;
		      state.needReadable = true;
		      if (!state.reading) {
		        var self = this;
		        process.nextTick(function() {
		          debug('readable nexttick read 0');
		          self.read(0);
		        });
		      } else if (state.length) {
		        emitReadable(this, state);
		      }
		    }
		  }

		  return res;
		};
		Readable.prototype.addListener = Readable.prototype.on;

		// pause() and resume() are remnants of the legacy readable stream API
		// If the user uses them, then switch into old mode.
		Readable.prototype.resume = function() {
		  var state = this._readableState;
		  if (!state.flowing) {
		    debug('resume');
		    state.flowing = true;
		    if (!state.reading) {
		      debug('resume read 0');
		      this.read(0);
		    }
		    resume(this, state);
		  }
		  return this;
		};

		function resume(stream, state) {
		  if (!state.resumeScheduled) {
		    state.resumeScheduled = true;
		    process.nextTick(function() {
		      resume_(stream, state);
		    });
		  }
		}

		function resume_(stream, state) {
		  state.resumeScheduled = false;
		  stream.emit('resume');
		  flow(stream);
		  if (state.flowing && !state.reading)
		    stream.read(0);
		}

		Readable.prototype.pause = function() {
		  debug('call pause flowing=%j', this._readableState.flowing);
		  if (false !== this._readableState.flowing) {
		    debug('pause');
		    this._readableState.flowing = false;
		    this.emit('pause');
		  }
		  return this;
		};

		function flow(stream) {
		  var state = stream._readableState;
		  debug('flow', state.flowing);
		  if (state.flowing) {
		    do {
		      var chunk = stream.read();
		    } while (null !== chunk && state.flowing);
		  }
		}

		// wrap an old-style stream as the async data source.
		// This is *not* part of the readable stream interface.
		// It is an ugly unfortunate mess of history.
		Readable.prototype.wrap = function(stream) {
		  var state = this._readableState;
		  var paused = false;

		  var self = this;
		  stream.on('end', function() {
		    debug('wrapped end');
		    if (state.decoder && !state.ended) {
		      var chunk = state.decoder.end();
		      if (chunk && chunk.length)
		        self.push(chunk);
		    }

		    self.push(null);
		  });

		  stream.on('data', function(chunk) {
		    debug('wrapped data');
		    if (state.decoder)
		      chunk = state.decoder.write(chunk);
		    if (!chunk || !state.objectMode && !chunk.length)
		      return;

		    var ret = self.push(chunk);
		    if (!ret) {
		      paused = true;
		      stream.pause();
		    }
		  });

		  // proxy all the other methods.
		  // important when wrapping filters and duplexes.
		  for (var i in stream) {
		    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
		      this[i] = function(method) { return function() {
		        return stream[method].apply(stream, arguments);
		      }}(i);
		    }
		  }

		  // proxy certain important events.
		  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
		  forEach(events, function(ev) {
		    stream.on(ev, self.emit.bind(self, ev));
		  });

		  // when we try to consume some more bytes, simply unpause the
		  // underlying stream.
		  self._read = function(n) {
		    debug('wrapped _read', n);
		    if (paused) {
		      paused = false;
		      stream.resume();
		    }
		  };

		  return self;
		};



		// exposed for testing purposes only.
		Readable._fromList = fromList;

		// Pluck off n bytes from an array of buffers.
		// Length is the combined lengths of all the buffers in the list.
		function fromList(n, state) {
		  var list = state.buffer;
		  var length = state.length;
		  var stringMode = !!state.decoder;
		  var objectMode = !!state.objectMode;
		  var ret;

		  // nothing in the list, definitely empty.
		  if (list.length === 0)
		    return null;

		  if (length === 0)
		    ret = null;
		  else if (objectMode)
		    ret = list.shift();
		  else if (!n || n >= length) {
		    // read it all, truncate the array.
		    if (stringMode)
		      ret = list.join('');
		    else
		      ret = Buffer.concat(list, length);
		    list.length = 0;
		  } else {
		    // read just some of it.
		    if (n < list[0].length) {
		      // just take a part of the first list item.
		      // slice is the same for buffers and strings.
		      var buf = list[0];
		      ret = buf.slice(0, n);
		      list[0] = buf.slice(n);
		    } else if (n === list[0].length) {
		      // first list is a perfect match
		      ret = list.shift();
		    } else {
		      // complex case.
		      // we have enough to cover it, but it spans past the first buffer.
		      if (stringMode)
		        ret = '';
		      else
		        ret = new Buffer(n);

		      var c = 0;
		      for (var i = 0, l = list.length; i < l && c < n; i++) {
		        var buf = list[0];
		        var cpy = Math.min(n - c, buf.length);

		        if (stringMode)
		          ret += buf.slice(0, cpy);
		        else
		          buf.copy(ret, c, 0, cpy);

		        if (cpy < buf.length)
		          list[0] = buf.slice(cpy);
		        else
		          list.shift();

		        c += cpy;
		      }
		    }
		  }

		  return ret;
		}

		function endReadable(stream) {
		  var state = stream._readableState;

		  // If we get here before consuming all the bytes, then that is a
		  // bug in node.  Should never happen.
		  if (state.length > 0)
		    throw new Error('endReadable called on non-empty stream');

		  if (!state.endEmitted) {
		    state.ended = true;
		    process.nextTick(function() {
		      // Check that we didn't get one last unshift.
		      if (!state.endEmitted && state.length === 0) {
		        state.endEmitted = true;
		        stream.readable = false;
		        stream.emit('end');
		      }
		    });
		  }
		}

		function forEach (xs, f) {
		  for (var i = 0, l = xs.length; i < l; i++) {
		    f(xs[i], i);
		  }
		}

		function indexOf (xs, x) {
		  for (var i = 0, l = xs.length; i < l; i++) {
		    if (xs[i] === x) return i;
		  }
		  return -1;
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {

		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		var Buffer = __webpack_require__(4).Buffer;

		var isBufferEncoding = Buffer.isEncoding
		  || function(encoding) {
		       switch (encoding && encoding.toLowerCase()) {
		         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
		         default: return false;
		       }
		     }


		function assertEncoding(encoding) {
		  if (encoding && !isBufferEncoding(encoding)) {
		    throw new Error('Unknown encoding: ' + encoding);
		  }
		}

		// StringDecoder provides an interface for efficiently splitting a series of
		// buffers into a series of JS strings without breaking apart multi-byte
		// characters. CESU-8 is handled as part of the UTF-8 encoding.
		//
		// @TODO Handling all encodings inside a single object makes it very difficult
		// to reason about this code, so it should be split up in the future.
		// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
		// points as used by CESU-8.
		var StringDecoder = exports.StringDecoder = function(encoding) {
		  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
		  assertEncoding(encoding);
		  switch (this.encoding) {
		    case 'utf8':
		      // CESU-8 represents each of Surrogate Pair by 3-bytes
		      this.surrogateSize = 3;
		      break;
		    case 'ucs2':
		    case 'utf16le':
		      // UTF-16 represents each of Surrogate Pair by 2-bytes
		      this.surrogateSize = 2;
		      this.detectIncompleteChar = utf16DetectIncompleteChar;
		      break;
		    case 'base64':
		      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
		      this.surrogateSize = 3;
		      this.detectIncompleteChar = base64DetectIncompleteChar;
		      break;
		    default:
		      this.write = passThroughWrite;
		      return;
		  }

		  // Enough space to store all bytes of a single character. UTF-8 needs 4
		  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
		  this.charBuffer = new Buffer(6);
		  // Number of bytes received for the current incomplete multi-byte character.
		  this.charReceived = 0;
		  // Number of bytes expected for the current incomplete multi-byte character.
		  this.charLength = 0;
		};


		// write decodes the given buffer and returns it as JS string that is
		// guaranteed to not contain any partial multi-byte characters. Any partial
		// character found at the end of the buffer is buffered up, and will be
		// returned when calling write again with the remaining bytes.
		//
		// Note: Converting a Buffer containing an orphan surrogate to a String
		// currently works, but converting a String to a Buffer (via `new Buffer`, or
		// Buffer#write) will replace incomplete surrogates with the unicode
		// replacement character. See https://codereview.chromium.org/121173009/ .
		StringDecoder.prototype.write = function(buffer) {
		  var charStr = '';
		  // if our last write ended with an incomplete multibyte character
		  while (this.charLength) {
		    // determine how many remaining bytes this buffer has to offer for this char
		    var available = (buffer.length >= this.charLength - this.charReceived) ?
		        this.charLength - this.charReceived :
		        buffer.length;

		    // add the new bytes to the char buffer
		    buffer.copy(this.charBuffer, this.charReceived, 0, available);
		    this.charReceived += available;

		    if (this.charReceived < this.charLength) {
		      // still not enough chars in this buffer? wait for more ...
		      return '';
		    }

		    // remove bytes belonging to the current character from the buffer
		    buffer = buffer.slice(available, buffer.length);

		    // get the character that was split
		    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

		    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
		    var charCode = charStr.charCodeAt(charStr.length - 1);
		    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
		      this.charLength += this.surrogateSize;
		      charStr = '';
		      continue;
		    }
		    this.charReceived = this.charLength = 0;

		    // if there are no more bytes in this buffer, just emit our char
		    if (buffer.length === 0) {
		      return charStr;
		    }
		    break;
		  }

		  // determine and set charLength / charReceived
		  this.detectIncompleteChar(buffer);

		  var end = buffer.length;
		  if (this.charLength) {
		    // buffer the incomplete character bytes we got
		    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
		    end -= this.charReceived;
		  }

		  charStr += buffer.toString(this.encoding, 0, end);

		  var end = charStr.length - 1;
		  var charCode = charStr.charCodeAt(end);
		  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
		  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
		    var size = this.surrogateSize;
		    this.charLength += size;
		    this.charReceived += size;
		    this.charBuffer.copy(this.charBuffer, size, 0, size);
		    buffer.copy(this.charBuffer, 0, 0, size);
		    return charStr.substring(0, end);
		  }

		  // or just emit the charStr
		  return charStr;
		};

		// detectIncompleteChar determines if there is an incomplete UTF-8 character at
		// the end of the given buffer. If so, it sets this.charLength to the byte
		// length that character, and sets this.charReceived to the number of bytes
		// that are available for this character.
		StringDecoder.prototype.detectIncompleteChar = function(buffer) {
		  // determine how many bytes we have to check at the end of this buffer
		  var i = (buffer.length >= 3) ? 3 : buffer.length;

		  // Figure out if one of the last i bytes of our buffer announces an
		  // incomplete char.
		  for (; i > 0; i--) {
		    var c = buffer[buffer.length - i];

		    // See http://en.wikipedia.org/wiki/UTF-8#Description

		    // 110XXXXX
		    if (i == 1 && c >> 5 == 0x06) {
		      this.charLength = 2;
		      break;
		    }

		    // 1110XXXX
		    if (i <= 2 && c >> 4 == 0x0E) {
		      this.charLength = 3;
		      break;
		    }

		    // 11110XXX
		    if (i <= 3 && c >> 3 == 0x1E) {
		      this.charLength = 4;
		      break;
		    }
		  }
		  this.charReceived = i;
		};

		StringDecoder.prototype.end = function(buffer) {
		  var res = '';
		  if (buffer && buffer.length)
		    res = this.write(buffer);

		  if (this.charReceived) {
		    var cr = this.charReceived;
		    var buf = this.charBuffer;
		    var enc = this.encoding;
		    res += buf.slice(0, cr).toString(enc);
		  }

		  return res;
		};

		function passThroughWrite(buffer) {
		  return buffer.toString(this.encoding);
		}

		function utf16DetectIncompleteChar(buffer) {
		  this.charReceived = buffer.length % 2;
		  this.charLength = this.charReceived ? 2 : 0;
		}

		function base64DetectIncompleteChar(buffer) {
		  this.charReceived = buffer.length % 3;
		  this.charLength = this.charReceived ? 3 : 0;
		}


	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(global) {'use strict';

		// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
		// original notice:

		/*!
		 * The buffer module from node.js, for the browser.
		 *
		 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
		 * @license  MIT
		 */
		function compare(a, b) {
		  if (a === b) {
		    return 0;
		  }

		  var x = a.length;
		  var y = b.length;

		  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
		    if (a[i] !== b[i]) {
		      x = a[i];
		      y = b[i];
		      break;
		    }
		  }

		  if (x < y) {
		    return -1;
		  }
		  if (y < x) {
		    return 1;
		  }
		  return 0;
		}
		function isBuffer(b) {
		  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
		    return global.Buffer.isBuffer(b);
		  }
		  return !!(b != null && b._isBuffer);
		}

		// based on node assert, original notice:

		// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
		//
		// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
		//
		// Originally from narwhal.js (http://narwhaljs.org)
		// Copyright (c) 2009 Thomas Robinson <280north.com>
		//
		// Permission is hereby granted, free of charge, to any person obtaining a copy
		// of this software and associated documentation files (the 'Software'), to
		// deal in the Software without restriction, including without limitation the
		// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
		// sell copies of the Software, and to permit persons to whom the Software is
		// furnished to do so, subject to the following conditions:
		//
		// The above copyright notice and this permission notice shall be included in
		// all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
		// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
		// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

		var util = __webpack_require__(10);
		var hasOwn = Object.prototype.hasOwnProperty;
		var pSlice = Array.prototype.slice;
		var functionsHaveNames = (function () {
		  return function foo() {}.name === 'foo';
		}());
		function pToString (obj) {
		  return Object.prototype.toString.call(obj);
		}
		function isView(arrbuf) {
		  if (isBuffer(arrbuf)) {
		    return false;
		  }
		  if (typeof global.ArrayBuffer !== 'function') {
		    return false;
		  }
		  if (typeof ArrayBuffer.isView === 'function') {
		    return ArrayBuffer.isView(arrbuf);
		  }
		  if (!arrbuf) {
		    return false;
		  }
		  if (arrbuf instanceof DataView) {
		    return true;
		  }
		  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
		    return true;
		  }
		  return false;
		}
		// 1. The assert module provides functions that throw
		// AssertionError's when particular conditions are not met. The
		// assert module must conform to the following interface.

		var assert = module.exports = ok;

		// 2. The AssertionError is defined in assert.
		// new assert.AssertionError({ message: message,
		//                             actual: actual,
		//                             expected: expected })

		var regex = /\s*function\s+([^\(\s]*)\s*/;
		// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
		function getName(func) {
		  if (!util.isFunction(func)) {
		    return;
		  }
		  if (functionsHaveNames) {
		    return func.name;
		  }
		  var str = func.toString();
		  var match = str.match(regex);
		  return match && match[1];
		}
		assert.AssertionError = function AssertionError(options) {
		  this.name = 'AssertionError';
		  this.actual = options.actual;
		  this.expected = options.expected;
		  this.operator = options.operator;
		  if (options.message) {
		    this.message = options.message;
		    this.generatedMessage = false;
		  } else {
		    this.message = getMessage(this);
		    this.generatedMessage = true;
		  }
		  var stackStartFunction = options.stackStartFunction || fail;
		  if (Error.captureStackTrace) {
		    Error.captureStackTrace(this, stackStartFunction);
		  } else {
		    // non v8 browsers so we can have a stacktrace
		    var err = new Error();
		    if (err.stack) {
		      var out = err.stack;

		      // try to strip useless frames
		      var fn_name = getName(stackStartFunction);
		      var idx = out.indexOf('\n' + fn_name);
		      if (idx >= 0) {
		        // once we have located the function frame
		        // we need to strip out everything before it (and its line)
		        var next_line = out.indexOf('\n', idx + 1);
		        out = out.substring(next_line + 1);
		      }

		      this.stack = out;
		    }
		  }
		};

		// assert.AssertionError instanceof Error
		util.inherits(assert.AssertionError, Error);

		function truncate(s, n) {
		  if (typeof s === 'string') {
		    return s.length < n ? s : s.slice(0, n);
		  } else {
		    return s;
		  }
		}
		function inspect(something) {
		  if (functionsHaveNames || !util.isFunction(something)) {
		    return util.inspect(something);
		  }
		  var rawname = getName(something);
		  var name = rawname ? ': ' + rawname : '';
		  return '[Function' +  name + ']';
		}
		function getMessage(self) {
		  return truncate(inspect(self.actual), 128) + ' ' +
		         self.operator + ' ' +
		         truncate(inspect(self.expected), 128);
		}

		// At present only the three keys mentioned above are used and
		// understood by the spec. Implementations or sub modules can pass
		// other keys to the AssertionError's constructor - they will be
		// ignored.

		// 3. All of the following functions must throw an AssertionError
		// when a corresponding condition is not met, with a message that
		// may be undefined if not provided.  All assertion methods provide
		// both the actual and expected values to the assertion error for
		// display purposes.

		function fail(actual, expected, message, operator, stackStartFunction) {
		  throw new assert.AssertionError({
		    message: message,
		    actual: actual,
		    expected: expected,
		    operator: operator,
		    stackStartFunction: stackStartFunction
		  });
		}

		// EXTENSION! allows for well behaved errors defined elsewhere.
		assert.fail = fail;

		// 4. Pure assertion tests whether a value is truthy, as determined
		// by !!guard.
		// assert.ok(guard, message_opt);
		// This statement is equivalent to assert.equal(true, !!guard,
		// message_opt);. To test strictly for the value true, use
		// assert.strictEqual(true, guard, message_opt);.

		function ok(value, message) {
		  if (!value) fail(value, true, message, '==', assert.ok);
		}
		assert.ok = ok;

		// 5. The equality assertion tests shallow, coercive equality with
		// ==.
		// assert.equal(actual, expected, message_opt);

		assert.equal = function equal(actual, expected, message) {
		  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
		};

		// 6. The non-equality assertion tests for whether two objects are not equal
		// with != assert.notEqual(actual, expected, message_opt);

		assert.notEqual = function notEqual(actual, expected, message) {
		  if (actual == expected) {
		    fail(actual, expected, message, '!=', assert.notEqual);
		  }
		};

		// 7. The equivalence assertion tests a deep equality relation.
		// assert.deepEqual(actual, expected, message_opt);

		assert.deepEqual = function deepEqual(actual, expected, message) {
		  if (!_deepEqual(actual, expected, false)) {
		    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
		  }
		};

		assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
		  if (!_deepEqual(actual, expected, true)) {
		    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
		  }
		};

		function _deepEqual(actual, expected, strict, memos) {
		  // 7.1. All identical values are equivalent, as determined by ===.
		  if (actual === expected) {
		    return true;
		  } else if (isBuffer(actual) && isBuffer(expected)) {
		    return compare(actual, expected) === 0;

		  // 7.2. If the expected value is a Date object, the actual value is
		  // equivalent if it is also a Date object that refers to the same time.
		  } else if (util.isDate(actual) && util.isDate(expected)) {
		    return actual.getTime() === expected.getTime();

		  // 7.3 If the expected value is a RegExp object, the actual value is
		  // equivalent if it is also a RegExp object with the same source and
		  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
		  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
		    return actual.source === expected.source &&
		           actual.global === expected.global &&
		           actual.multiline === expected.multiline &&
		           actual.lastIndex === expected.lastIndex &&
		           actual.ignoreCase === expected.ignoreCase;

		  // 7.4. Other pairs that do not both pass typeof value == 'object',
		  // equivalence is determined by ==.
		  } else if ((actual === null || typeof actual !== 'object') &&
		             (expected === null || typeof expected !== 'object')) {
		    return strict ? actual === expected : actual == expected;

		  // If both values are instances of typed arrays, wrap their underlying
		  // ArrayBuffers in a Buffer each to increase performance
		  // This optimization requires the arrays to have the same type as checked by
		  // Object.prototype.toString (aka pToString). Never perform binary
		  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
		  // bit patterns are not identical.
		  } else if (isView(actual) && isView(expected) &&
		             pToString(actual) === pToString(expected) &&
		             !(actual instanceof Float32Array ||
		               actual instanceof Float64Array)) {
		    return compare(new Uint8Array(actual.buffer),
		                   new Uint8Array(expected.buffer)) === 0;

		  // 7.5 For all other Object pairs, including Array objects, equivalence is
		  // determined by having the same number of owned properties (as verified
		  // with Object.prototype.hasOwnProperty.call), the same set of keys
		  // (although not necessarily the same order), equivalent values for every
		  // corresponding key, and an identical 'prototype' property. Note: this
		  // accounts for both named and indexed properties on Arrays.
		  } else if (isBuffer(actual) !== isBuffer(expected)) {
		    return false;
		  } else {
		    memos = memos || {actual: [], expected: []};

		    var actualIndex = memos.actual.indexOf(actual);
		    if (actualIndex !== -1) {
		      if (actualIndex === memos.expected.indexOf(expected)) {
		        return true;
		      }
		    }

		    memos.actual.push(actual);
		    memos.expected.push(expected);

		    return objEquiv(actual, expected, strict, memos);
		  }
		}

		function isArguments(object) {
		  return Object.prototype.toString.call(object) == '[object Arguments]';
		}

		function objEquiv(a, b, strict, actualVisitedObjects) {
		  if (a === null || a === undefined || b === null || b === undefined)
		    return false;
		  // if one is a primitive, the other must be same
		  if (util.isPrimitive(a) || util.isPrimitive(b))
		    return a === b;
		  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
		    return false;
		  var aIsArgs = isArguments(a);
		  var bIsArgs = isArguments(b);
		  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
		    return false;
		  if (aIsArgs) {
		    a = pSlice.call(a);
		    b = pSlice.call(b);
		    return _deepEqual(a, b, strict);
		  }
		  var ka = objectKeys(a);
		  var kb = objectKeys(b);
		  var key, i;
		  // having the same number of owned properties (keys incorporates
		  // hasOwnProperty)
		  if (ka.length !== kb.length)
		    return false;
		  //the same set of keys (although not necessarily the same order),
		  ka.sort();
		  kb.sort();
		  //~~~cheap key test
		  for (i = ka.length - 1; i >= 0; i--) {
		    if (ka[i] !== kb[i])
		      return false;
		  }
		  //equivalent values for every corresponding key, and
		  //~~~possibly expensive deep test
		  for (i = ka.length - 1; i >= 0; i--) {
		    key = ka[i];
		    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
		      return false;
		  }
		  return true;
		}

		// 8. The non-equivalence assertion tests for any deep inequality.
		// assert.notDeepEqual(actual, expected, message_opt);

		assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
		  if (_deepEqual(actual, expected, false)) {
		    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
		  }
		};

		assert.notDeepStrictEqual = notDeepStrictEqual;
		function notDeepStrictEqual(actual, expected, message) {
		  if (_deepEqual(actual, expected, true)) {
		    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
		  }
		}


		// 9. The strict equality assertion tests strict equality, as determined by ===.
		// assert.strictEqual(actual, expected, message_opt);

		assert.strictEqual = function strictEqual(actual, expected, message) {
		  if (actual !== expected) {
		    fail(actual, expected, message, '===', assert.strictEqual);
		  }
		};

		// 10. The strict non-equality assertion tests for strict inequality, as
		// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

		assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
		  if (actual === expected) {
		    fail(actual, expected, message, '!==', assert.notStrictEqual);
		  }
		};

		function expectedException(actual, expected) {
		  if (!actual || !expected) {
		    return false;
		  }

		  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
		    return expected.test(actual);
		  }

		  try {
		    if (actual instanceof expected) {
		      return true;
		    }
		  } catch (e) {
		    // Ignore.  The instanceof check doesn't work for arrow functions.
		  }

		  if (Error.isPrototypeOf(expected)) {
		    return false;
		  }

		  return expected.call({}, actual) === true;
		}

		function _tryBlock(block) {
		  var error;
		  try {
		    block();
		  } catch (e) {
		    error = e;
		  }
		  return error;
		}

		function _throws(shouldThrow, block, expected, message) {
		  var actual;

		  if (typeof block !== 'function') {
		    throw new TypeError('"block" argument must be a function');
		  }

		  if (typeof expected === 'string') {
		    message = expected;
		    expected = null;
		  }

		  actual = _tryBlock(block);

		  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
		            (message ? ' ' + message : '.');

		  if (shouldThrow && !actual) {
		    fail(actual, expected, 'Missing expected exception' + message);
		  }

		  var userProvidedMessage = typeof message === 'string';
		  var isUnwantedException = !shouldThrow && util.isError(actual);
		  var isUnexpectedException = !shouldThrow && actual && !expected;

		  if ((isUnwantedException &&
		      userProvidedMessage &&
		      expectedException(actual, expected)) ||
		      isUnexpectedException) {
		    fail(actual, expected, 'Got unwanted exception' + message);
		  }

		  if ((shouldThrow && actual && expected &&
		      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
		    throw actual;
		  }
		}

		// 11. Expected to throw an error:
		// assert.throws(block, Error_opt, message_opt);

		assert.throws = function(block, /*optional*/error, /*optional*/message) {
		  _throws(true, block, error, message);
		};

		// EXTENSION! This is annoying to write outside this module.
		assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
		  _throws(false, block, error, message);
		};

		assert.ifError = function(err) { if (err) throw err; };

		var objectKeys = Object.keys || function (obj) {
		  var keys = [];
		  for (var key in obj) {
		    if (hasOwn.call(obj, key)) keys.push(key);
		  }
		  return keys;
		};

		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {'use strict';

		exports.__esModule = true;
		exports.apiPostFormReq = exports.apiPutFormReq = exports.apiDeleteReq = exports.apiPatchReq = exports.apiPostReq = exports.apiPutReq = exports.apiGetReq = exports.apiRequest = exports.postFormReq = exports.putFormReq = exports.deleteReq = exports.patchReq = exports.postReq = exports.putReq = exports.getReq = exports.request = exports.generateCRUDRequests = exports.generateRequest = undefined;

		var _lodash = __webpack_require__(13);

		var _localStorage = __webpack_require__(11);

		/**
		 * Fetchum - Better Fetch
		 */
		/* global FormData, fetch, Headers, Request, window, File, Blob, self */
		__webpack_require__(21).polyfill();
		__webpack_require__(28);

		if (!(0, _lodash.has)(Object, 'assign')) {
		  Object.assign = _lodash.assign;
		}

		/**
		 * Return the api url base
		 *
		 */
		function _getBase() {
		  var base = '';
		  if (typeof process === 'object' && '' + process === '[object process]') {
		    if (!(0, _lodash.isUndefined)(process.env) && !(0, _lodash.isUndefined)(process.env.API_BASE)) {
		      base = process.env.API_BASE;
		    }
		    return base;
		  }
		  if (!(0, _lodash.isUndefined)(window.API_BASE)) {
		    base = window.API_BASE;
		  }
		  return base;
		}

		/**
		 * Check to see if object is json description of file
		 * @param  {Object} val
		 *
		 */
		function _isFile(val) {
		  return val instanceof File || val instanceof Blob;
		}

		/**
		 * Recursive tranform json to form data
		 * @param  {Object} body
		 * @param  {Object} formData
		 * @param  {String} originalKey
		 *
		 */
		function _transformFormBody(body, formData, originalKey) {
		  var data = formData;
		  (0, _lodash.forEach)(Object.keys(body), function (paramKey) {
		    var obj = body[paramKey];
		    var key = !(0, _lodash.isUndefined)(originalKey) ? originalKey + '[' + paramKey + ']' : paramKey;
		    if ((0, _lodash.isArray)(obj)) {
		      for (var index = 0; index < obj.length; index++) {
		        var val = obj[index];
		        if ((0, _lodash.isObject)(val) && !_isFile(val) || (0, _lodash.isArray)(val)) {
		          data = _transformFormBody(val, data, key + '[' + index + ']');
		        } else {
		          data.append(key + '[' + index + ']', val);
		        }
		      }
		    } else if ((0, _lodash.isObject)(obj) && !_isFile(obj)) {
		      data = _transformFormBody(obj, data, key);
		    } else {
		      data.append(key, obj);
		    }
		  });
		  return data;
		}

		/**
		 * Prep body for request
		 * @param  {Object} body
		 * @param  {Boolean} isFormData
		 *
		 */
		function _transformBody() {
		  var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		  var isFormData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		  if (!isFormData) {
		    if ((0, _lodash.isString)(body)) {
		      return body;
		    }
		    return JSON.stringify(body);
		  }
		  return _transformFormBody(body, new FormData());
		}

		/**
		 * Prep url for request
		 * @param  {Object} params
		 *
		 */
		function _transformUrlParams() {
		  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		  var formatedParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		  var originalKey = arguments[2];

		  var data = formatedParams;
		  for (var _iterator = Object.keys(params), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		    var _ref;

		    if (_isArray) {
		      if (_i >= _iterator.length) break;
		      _ref = _iterator[_i++];
		    } else {
		      _i = _iterator.next();
		      if (_i.done) break;
		      _ref = _i.value;
		    }

		    var paramKey = _ref;

		    var obj = params[paramKey];
		    var key = !(0, _lodash.isUndefined)(originalKey) ? originalKey + '[' + paramKey + ']' : paramKey;
		    if ((0, _lodash.isArray)(obj)) {
		      for (var index = 0; index < obj.length; index++) {
		        var val = obj[index];
		        if ((0, _lodash.isObject)(val) || (0, _lodash.isArray)(val)) {
		          data = _transformUrlParams(val, data, key + '[' + index + ']');
		        } else {
		          data.push(key + '[' + index + ']=' + encodeURIComponent(val));
		        }
		      }
		    } else if ((0, _lodash.isObject)(obj)) {
		      data = _transformUrlParams(obj, data, key);
		    } else {
		      data.push(key + '=' + encodeURIComponent(obj));
		    }
		  }
		  return data;
		}

		/**
		 * Base request call
		 * @param  {Boolean} isFormData
		 * @param  {String} method
		 * @param  {String} url
		 * @param  {Object} body
		 * @param  {Object} headers
		 *
		 */
		function _request(isFormData, method, url) {
		  var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
		  var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
		  var others = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

		  var defaultHeaders = {
		    Accept: 'application/json'
		  };

		  if (!isFormData) {
		    defaultHeaders['Content-Type'] = 'application/json';
		  }

		  var newUrl = (0, _lodash.cloneDeep)(url);

		  var fetchData = {
		    method: (0, _lodash.toLower)(method),
		    headers: new Headers(Object.assign({}, defaultHeaders, headers))
		  };

		  if ((0, _lodash.toLower)(method) !== 'get') {
		    fetchData.body = _transformBody(body, isFormData);
		  } else {
		    var params = _transformUrlParams(body);
		    if (params.length > 0) {
		      newUrl += '?' + params.join('&');
		    }
		  }

		  var reqst = new Request(newUrl, Object.assign({}, others, fetchData));

		  return new Promise(function (resolve, reject) {
		    fetch(reqst).then(function (response) {
		      if (response.ok) {
		        response.text().then(function (data) {
		          var json = null;
		          try {
		            json = JSON.parse(data);
		          } catch (e) {
		            // test parsing json
		          }
		          response.data = json !== null ? json : data;
		          return resolve(response);
		        })['catch'](function () {
		          return reject(response);
		        });
		      } else {
		        reject(response);
		      }
		    })['catch'](function (response) {
		      return reject(response);
		    });
		  });
		}

		/**
		 * Calls the request and prepends route with base
		 * @param  {Boolean} form
		 * @param  {String} method
		 * @param  {String} route
		 * @param  {Object} body
		 * @param  {Object} headers
		 *
		 */
		function _apiRequest(form, method, route, body, headers, others) {
		  var base = _getBase();
		  if (base === '') {
		    return new Promise(function (done, reject) {
		      return reject('No base url set fullpath needed for node side requests.');
		    });
		  }
		  return _request(form, method, '' + base + route, body, headers, others);
		}

		/**
		 * Calls the request and prepends route with base
		 * @param  {Object} options = {method, route, form, external, headers}
		 * @param  {Object} body
		 * @param  {Object} headers
		 *
		 */
		function _callRequest(options, body, _headers) {
		  var method = options.method,
		      route = options.route,
		      form = options.form,
		      external = options.external,
		      others = options.others;

		  var headers = Object.assign({}, options.headers, _headers);
		  if (external) {
		    return _request(form, method, route, body, headers, others);
		  }
		  return _apiRequest(form, method, route, body, headers, others);
		}

		/**
		 * Replace keys in string format :key with value in params
		 * @param  {String} route
		 * @param  {Object} params
		 *
		 */
		function _parameterizeRoute(route, params) {
		  var parameterized = (0, _lodash.cloneDeep)(route);
		  (0, _lodash.forEach)(params, function (val, key) {
		    if ((0, _lodash.isUndefined)(val)) {
		      console.warn('error: parameter ' + key + ' was ' + val);
		    }
		    parameterized = parameterized.replace(':' + key, val);
		  });
		  return parameterized;
		}

		/**
		 * Call a api request without a token header
		 * @param  {Object} options - {method, token, route, external, form, headers}
		 * @param  {Object} params
		 * @param  {Object} body
		 * @param  {Object} headers
		 *
		 */
		function _publicRequest(options, params) {
		  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		  var cloned = (0, _lodash.cloneDeep)(options);
		  if (params) {
		    cloned.route = _parameterizeRoute(cloned.route, params);
		  }
		  return _callRequest(cloned, body, headers);
		}

		/**
		 * Call a api request and set Auth header
		 * @param  {Object} options - {method, token, route, external, form, headers}
		 * @param  {Object} params
		 * @param  {Object} body
		 * @param  {Object} headers
		 * @param  {String} customToken
		 *
		 */
		function _requestWithToken(options, params) {
		  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
		  var customToken = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
		  var tokenType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'Bearer';

		  var cloned = (0, _lodash.cloneDeep)(options);
		  if (params) {
		    cloned.route = _parameterizeRoute(cloned.route, params);
		  }
		  var requestHeaders = Object.assign({}, headers, {
		    Authorization: tokenType + ' ' + (customToken !== null ? customToken : (0, _localStorage.getToken)())
		  });
		  return _callRequest(cloned, body, requestHeaders);
		}

		/**
		 * Generate a api request
		 * @param  {Object} options - {method, token, route, external, form, headers}
		 *
		 */
		var generateRequest = exports.generateRequest = function generateRequest(options) {
		  var clone = (0, _lodash.cloneDeep)(options);
		  clone.token = clone.token || false;
		  clone.form = clone.form || false;
		  clone.external = clone.external || false;
		  clone.headers = clone.headers || {};
		  if (clone.external) {
		    return _publicRequest.bind(undefined, clone);
		  }

		  return clone.token ? _requestWithToken.bind(undefined, clone) : _publicRequest.bind(undefined, clone);
		};

		/**
		 * Generate a crud api requests
		 * @param  {Object} baseUrl
		 * @param  {Object} idVar
		 * @param  {Object} useToken
		 *
		 */
		var generateCRUDRequests = exports.generateCRUDRequests = function generateCRUDRequests() {
		  var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		  var idVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
		  var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		  return {
		    fetchAll: generateRequest({
		      token: token,
		      method: 'GET',
		      route: baseUrl
		    }),
		    create: generateRequest({
		      token: token,
		      method: 'POST',
		      route: baseUrl
		    }),
		    fetchOne: generateRequest({
		      token: token,
		      method: 'GET',
		      route: baseUrl + '/:' + idVar
		    }),
		    update: generateRequest({
		      token: token,
		      method: 'PUT',
		      route: baseUrl + '/:' + idVar
		    }),
		    'delete': generateRequest({
		      token: token,
		      method: 'DELETE',
		      route: baseUrl + '/:' + idVar
		    })
		  };
		};

		var request = exports.request = _request;

		var getReq = exports.getReq = request.bind(null, false, 'get');
		var putReq = exports.putReq = request.bind(null, false, 'put');
		var postReq = exports.postReq = request.bind(null, false, 'post');
		var patchReq = exports.patchReq = request.bind(null, false, 'patch');
		var deleteReq = exports.deleteReq = request.bind(null, false, 'delete');

		var putFormReq = exports.putFormReq = request.bind(null, true, 'put');
		var postFormReq = exports.postFormReq = request.bind(null, true, 'post');

		var apiRequest = exports.apiRequest = _apiRequest;

		var apiGetReq = exports.apiGetReq = apiRequest.bind(null, false, 'get');
		var apiPutReq = exports.apiPutReq = apiRequest.bind(null, false, 'put');
		var apiPostReq = exports.apiPostReq = apiRequest.bind(null, false, 'post');
		var apiPatchReq = exports.apiPatchReq = apiRequest.bind(null, false, 'patch');
		var apiDeleteReq = exports.apiDeleteReq = apiRequest.bind(null, false, 'delete');

		var apiPutFormReq = exports.apiPutFormReq = apiRequest.bind(null, true, 'put');
		var apiPostFormReq = exports.apiPostFormReq = apiRequest.bind(null, true, 'post');
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 20 */
	/***/ function(module, exports) {

		'use strict'

		exports.byteLength = byteLength
		exports.toByteArray = toByteArray
		exports.fromByteArray = fromByteArray

		var lookup = []
		var revLookup = []
		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

		var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
		for (var i = 0, len = code.length; i < len; ++i) {
		  lookup[i] = code[i]
		  revLookup[code.charCodeAt(i)] = i
		}

		revLookup['-'.charCodeAt(0)] = 62
		revLookup['_'.charCodeAt(0)] = 63

		function placeHoldersCount (b64) {
		  var len = b64.length
		  if (len % 4 > 0) {
		    throw new Error('Invalid string. Length must be a multiple of 4')
		  }

		  // the number of equal signs (place holders)
		  // if there are two placeholders, than the two characters before it
		  // represent one byte
		  // if there is only one, then the three characters before it represent 2 bytes
		  // this is just a cheap hack to not do indexOf twice
		  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
		}

		function byteLength (b64) {
		  // base64 is 4/3 + up to two characters of the original data
		  return b64.length * 3 / 4 - placeHoldersCount(b64)
		}

		function toByteArray (b64) {
		  var i, j, l, tmp, placeHolders, arr
		  var len = b64.length
		  placeHolders = placeHoldersCount(b64)

		  arr = new Arr(len * 3 / 4 - placeHolders)

		  // if there are placeholders, only get up to the last complete 4 chars
		  l = placeHolders > 0 ? len - 4 : len

		  var L = 0

		  for (i = 0, j = 0; i < l; i += 4, j += 3) {
		    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
		    arr[L++] = (tmp >> 16) & 0xFF
		    arr[L++] = (tmp >> 8) & 0xFF
		    arr[L++] = tmp & 0xFF
		  }

		  if (placeHolders === 2) {
		    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
		    arr[L++] = tmp & 0xFF
		  } else if (placeHolders === 1) {
		    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
		    arr[L++] = (tmp >> 8) & 0xFF
		    arr[L++] = tmp & 0xFF
		  }

		  return arr
		}

		function tripletToBase64 (num) {
		  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
		}

		function encodeChunk (uint8, start, end) {
		  var tmp
		  var output = []
		  for (var i = start; i < end; i += 3) {
		    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
		    output.push(tripletToBase64(tmp))
		  }
		  return output.join('')
		}

		function fromByteArray (uint8) {
		  var tmp
		  var len = uint8.length
		  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
		  var output = ''
		  var parts = []
		  var maxChunkLength = 16383 // must be multiple of 3

		  // go through the array every three bytes, we'll deal with trailing stuff later
		  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
		    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
		  }

		  // pad the end with zeros, but make sure to not forget the extra bytes
		  if (extraBytes === 1) {
		    tmp = uint8[len - 1]
		    output += lookup[tmp >> 2]
		    output += lookup[(tmp << 4) & 0x3F]
		    output += '=='
		  } else if (extraBytes === 2) {
		    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
		    output += lookup[tmp >> 10]
		    output += lookup[(tmp >> 4) & 0x3F]
		    output += lookup[(tmp << 2) & 0x3F]
		    output += '='
		  }

		  parts.push(output)

		  return parts.join('')
		}


	/***/ },
	/* 21 */
	/***/ function(module, exports, __webpack_require__) {

		var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
		 * @overview es6-promise - a tiny implementation of Promises/A+.
		 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
		 * @license   Licensed under MIT license
		 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
		 * @version   4.0.5
		 */

		(function (global, factory) {
		     true ? module.exports = factory() :
		    typeof define === 'function' && define.amd ? define(factory) :
		    (global.ES6Promise = factory());
		}(this, (function () { 'use strict';

		function objectOrFunction(x) {
		  return typeof x === 'function' || typeof x === 'object' && x !== null;
		}

		function isFunction(x) {
		  return typeof x === 'function';
		}

		var _isArray = undefined;
		if (!Array.isArray) {
		  _isArray = function (x) {
		    return Object.prototype.toString.call(x) === '[object Array]';
		  };
		} else {
		  _isArray = Array.isArray;
		}

		var isArray = _isArray;

		var len = 0;
		var vertxNext = undefined;
		var customSchedulerFn = undefined;

		var asap = function asap(callback, arg) {
		  queue[len] = callback;
		  queue[len + 1] = arg;
		  len += 2;
		  if (len === 2) {
		    // If len is 2, that means that we need to schedule an async flush.
		    // If additional callbacks are queued before the queue is flushed, they
		    // will be processed by this flush that we are scheduling.
		    if (customSchedulerFn) {
		      customSchedulerFn(flush);
		    } else {
		      scheduleFlush();
		    }
		  }
		};

		function setScheduler(scheduleFn) {
		  customSchedulerFn = scheduleFn;
		}

		function setAsap(asapFn) {
		  asap = asapFn;
		}

		var browserWindow = typeof window !== 'undefined' ? window : undefined;
		var browserGlobal = browserWindow || {};
		var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
		var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

		// test for web worker but not in IE10
		var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

		// node
		function useNextTick() {
		  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
		  // see https://github.com/cujojs/when/issues/410 for details
		  return function () {
		    return process.nextTick(flush);
		  };
		}

		// vertx
		function useVertxTimer() {
		  if (typeof vertxNext !== 'undefined') {
		    return function () {
		      vertxNext(flush);
		    };
		  }

		  return useSetTimeout();
		}

		function useMutationObserver() {
		  var iterations = 0;
		  var observer = new BrowserMutationObserver(flush);
		  var node = document.createTextNode('');
		  observer.observe(node, { characterData: true });

		  return function () {
		    node.data = iterations = ++iterations % 2;
		  };
		}

		// web worker
		function useMessageChannel() {
		  var channel = new MessageChannel();
		  channel.port1.onmessage = flush;
		  return function () {
		    return channel.port2.postMessage(0);
		  };
		}

		function useSetTimeout() {
		  // Store setTimeout reference so es6-promise will be unaffected by
		  // other code modifying setTimeout (like sinon.useFakeTimers())
		  var globalSetTimeout = setTimeout;
		  return function () {
		    return globalSetTimeout(flush, 1);
		  };
		}

		var queue = new Array(1000);
		function flush() {
		  for (var i = 0; i < len; i += 2) {
		    var callback = queue[i];
		    var arg = queue[i + 1];

		    callback(arg);

		    queue[i] = undefined;
		    queue[i + 1] = undefined;
		  }

		  len = 0;
		}

		function attemptVertx() {
		  try {
		    var r = require;
		    var vertx = __webpack_require__(46);
		    vertxNext = vertx.runOnLoop || vertx.runOnContext;
		    return useVertxTimer();
		  } catch (e) {
		    return useSetTimeout();
		  }
		}

		var scheduleFlush = undefined;
		// Decide what async method to use to triggering processing of queued callbacks:
		if (isNode) {
		  scheduleFlush = useNextTick();
		} else if (BrowserMutationObserver) {
		  scheduleFlush = useMutationObserver();
		} else if (isWorker) {
		  scheduleFlush = useMessageChannel();
		} else if (browserWindow === undefined && "function" === 'function') {
		  scheduleFlush = attemptVertx();
		} else {
		  scheduleFlush = useSetTimeout();
		}

		function then(onFulfillment, onRejection) {
		  var _arguments = arguments;

		  var parent = this;

		  var child = new this.constructor(noop);

		  if (child[PROMISE_ID] === undefined) {
		    makePromise(child);
		  }

		  var _state = parent._state;

		  if (_state) {
		    (function () {
		      var callback = _arguments[_state - 1];
		      asap(function () {
		        return invokeCallback(_state, child, callback, parent._result);
		      });
		    })();
		  } else {
		    subscribe(parent, child, onFulfillment, onRejection);
		  }

		  return child;
		}

		/**
		  `Promise.resolve` returns a promise that will become resolved with the
		  passed `value`. It is shorthand for the following:

		  ```javascript
		  let promise = new Promise(function(resolve, reject){
		    resolve(1);
		  });

		  promise.then(function(value){
		    // value === 1
		  });
		  ```

		  Instead of writing the above, your code now simply becomes the following:

		  ```javascript
		  let promise = Promise.resolve(1);

		  promise.then(function(value){
		    // value === 1
		  });
		  ```

		  @method resolve
		  @static
		  @param {Any} value value that the returned promise will be resolved with
		  Useful for tooling.
		  @return {Promise} a promise that will become fulfilled with the given
		  `value`
		*/
		function resolve(object) {
		  /*jshint validthis:true */
		  var Constructor = this;

		  if (object && typeof object === 'object' && object.constructor === Constructor) {
		    return object;
		  }

		  var promise = new Constructor(noop);
		  _resolve(promise, object);
		  return promise;
		}

		var PROMISE_ID = Math.random().toString(36).substring(16);

		function noop() {}

		var PENDING = void 0;
		var FULFILLED = 1;
		var REJECTED = 2;

		var GET_THEN_ERROR = new ErrorObject();

		function selfFulfillment() {
		  return new TypeError("You cannot resolve a promise with itself");
		}

		function cannotReturnOwn() {
		  return new TypeError('A promises callback cannot return that same promise.');
		}

		function getThen(promise) {
		  try {
		    return promise.then;
		  } catch (error) {
		    GET_THEN_ERROR.error = error;
		    return GET_THEN_ERROR;
		  }
		}

		function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
		  try {
		    then.call(value, fulfillmentHandler, rejectionHandler);
		  } catch (e) {
		    return e;
		  }
		}

		function handleForeignThenable(promise, thenable, then) {
		  asap(function (promise) {
		    var sealed = false;
		    var error = tryThen(then, thenable, function (value) {
		      if (sealed) {
		        return;
		      }
		      sealed = true;
		      if (thenable !== value) {
		        _resolve(promise, value);
		      } else {
		        fulfill(promise, value);
		      }
		    }, function (reason) {
		      if (sealed) {
		        return;
		      }
		      sealed = true;

		      _reject(promise, reason);
		    }, 'Settle: ' + (promise._label || ' unknown promise'));

		    if (!sealed && error) {
		      sealed = true;
		      _reject(promise, error);
		    }
		  }, promise);
		}

		function handleOwnThenable(promise, thenable) {
		  if (thenable._state === FULFILLED) {
		    fulfill(promise, thenable._result);
		  } else if (thenable._state === REJECTED) {
		    _reject(promise, thenable._result);
		  } else {
		    subscribe(thenable, undefined, function (value) {
		      return _resolve(promise, value);
		    }, function (reason) {
		      return _reject(promise, reason);
		    });
		  }
		}

		function handleMaybeThenable(promise, maybeThenable, then$$) {
		  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
		    handleOwnThenable(promise, maybeThenable);
		  } else {
		    if (then$$ === GET_THEN_ERROR) {
		      _reject(promise, GET_THEN_ERROR.error);
		    } else if (then$$ === undefined) {
		      fulfill(promise, maybeThenable);
		    } else if (isFunction(then$$)) {
		      handleForeignThenable(promise, maybeThenable, then$$);
		    } else {
		      fulfill(promise, maybeThenable);
		    }
		  }
		}

		function _resolve(promise, value) {
		  if (promise === value) {
		    _reject(promise, selfFulfillment());
		  } else if (objectOrFunction(value)) {
		    handleMaybeThenable(promise, value, getThen(value));
		  } else {
		    fulfill(promise, value);
		  }
		}

		function publishRejection(promise) {
		  if (promise._onerror) {
		    promise._onerror(promise._result);
		  }

		  publish(promise);
		}

		function fulfill(promise, value) {
		  if (promise._state !== PENDING) {
		    return;
		  }

		  promise._result = value;
		  promise._state = FULFILLED;

		  if (promise._subscribers.length !== 0) {
		    asap(publish, promise);
		  }
		}

		function _reject(promise, reason) {
		  if (promise._state !== PENDING) {
		    return;
		  }
		  promise._state = REJECTED;
		  promise._result = reason;

		  asap(publishRejection, promise);
		}

		function subscribe(parent, child, onFulfillment, onRejection) {
		  var _subscribers = parent._subscribers;
		  var length = _subscribers.length;

		  parent._onerror = null;

		  _subscribers[length] = child;
		  _subscribers[length + FULFILLED] = onFulfillment;
		  _subscribers[length + REJECTED] = onRejection;

		  if (length === 0 && parent._state) {
		    asap(publish, parent);
		  }
		}

		function publish(promise) {
		  var subscribers = promise._subscribers;
		  var settled = promise._state;

		  if (subscribers.length === 0) {
		    return;
		  }

		  var child = undefined,
		      callback = undefined,
		      detail = promise._result;

		  for (var i = 0; i < subscribers.length; i += 3) {
		    child = subscribers[i];
		    callback = subscribers[i + settled];

		    if (child) {
		      invokeCallback(settled, child, callback, detail);
		    } else {
		      callback(detail);
		    }
		  }

		  promise._subscribers.length = 0;
		}

		function ErrorObject() {
		  this.error = null;
		}

		var TRY_CATCH_ERROR = new ErrorObject();

		function tryCatch(callback, detail) {
		  try {
		    return callback(detail);
		  } catch (e) {
		    TRY_CATCH_ERROR.error = e;
		    return TRY_CATCH_ERROR;
		  }
		}

		function invokeCallback(settled, promise, callback, detail) {
		  var hasCallback = isFunction(callback),
		      value = undefined,
		      error = undefined,
		      succeeded = undefined,
		      failed = undefined;

		  if (hasCallback) {
		    value = tryCatch(callback, detail);

		    if (value === TRY_CATCH_ERROR) {
		      failed = true;
		      error = value.error;
		      value = null;
		    } else {
		      succeeded = true;
		    }

		    if (promise === value) {
		      _reject(promise, cannotReturnOwn());
		      return;
		    }
		  } else {
		    value = detail;
		    succeeded = true;
		  }

		  if (promise._state !== PENDING) {
		    // noop
		  } else if (hasCallback && succeeded) {
		      _resolve(promise, value);
		    } else if (failed) {
		      _reject(promise, error);
		    } else if (settled === FULFILLED) {
		      fulfill(promise, value);
		    } else if (settled === REJECTED) {
		      _reject(promise, value);
		    }
		}

		function initializePromise(promise, resolver) {
		  try {
		    resolver(function resolvePromise(value) {
		      _resolve(promise, value);
		    }, function rejectPromise(reason) {
		      _reject(promise, reason);
		    });
		  } catch (e) {
		    _reject(promise, e);
		  }
		}

		var id = 0;
		function nextId() {
		  return id++;
		}

		function makePromise(promise) {
		  promise[PROMISE_ID] = id++;
		  promise._state = undefined;
		  promise._result = undefined;
		  promise._subscribers = [];
		}

		function Enumerator(Constructor, input) {
		  this._instanceConstructor = Constructor;
		  this.promise = new Constructor(noop);

		  if (!this.promise[PROMISE_ID]) {
		    makePromise(this.promise);
		  }

		  if (isArray(input)) {
		    this._input = input;
		    this.length = input.length;
		    this._remaining = input.length;

		    this._result = new Array(this.length);

		    if (this.length === 0) {
		      fulfill(this.promise, this._result);
		    } else {
		      this.length = this.length || 0;
		      this._enumerate();
		      if (this._remaining === 0) {
		        fulfill(this.promise, this._result);
		      }
		    }
		  } else {
		    _reject(this.promise, validationError());
		  }
		}

		function validationError() {
		  return new Error('Array Methods must be provided an Array');
		};

		Enumerator.prototype._enumerate = function () {
		  var length = this.length;
		  var _input = this._input;

		  for (var i = 0; this._state === PENDING && i < length; i++) {
		    this._eachEntry(_input[i], i);
		  }
		};

		Enumerator.prototype._eachEntry = function (entry, i) {
		  var c = this._instanceConstructor;
		  var resolve$$ = c.resolve;

		  if (resolve$$ === resolve) {
		    var _then = getThen(entry);

		    if (_then === then && entry._state !== PENDING) {
		      this._settledAt(entry._state, i, entry._result);
		    } else if (typeof _then !== 'function') {
		      this._remaining--;
		      this._result[i] = entry;
		    } else if (c === Promise) {
		      var promise = new c(noop);
		      handleMaybeThenable(promise, entry, _then);
		      this._willSettleAt(promise, i);
		    } else {
		      this._willSettleAt(new c(function (resolve$$) {
		        return resolve$$(entry);
		      }), i);
		    }
		  } else {
		    this._willSettleAt(resolve$$(entry), i);
		  }
		};

		Enumerator.prototype._settledAt = function (state, i, value) {
		  var promise = this.promise;

		  if (promise._state === PENDING) {
		    this._remaining--;

		    if (state === REJECTED) {
		      _reject(promise, value);
		    } else {
		      this._result[i] = value;
		    }
		  }

		  if (this._remaining === 0) {
		    fulfill(promise, this._result);
		  }
		};

		Enumerator.prototype._willSettleAt = function (promise, i) {
		  var enumerator = this;

		  subscribe(promise, undefined, function (value) {
		    return enumerator._settledAt(FULFILLED, i, value);
		  }, function (reason) {
		    return enumerator._settledAt(REJECTED, i, reason);
		  });
		};

		/**
		  `Promise.all` accepts an array of promises, and returns a new promise which
		  is fulfilled with an array of fulfillment values for the passed promises, or
		  rejected with the reason of the first passed promise to be rejected. It casts all
		  elements of the passed iterable to promises as it runs this algorithm.

		  Example:

		  ```javascript
		  let promise1 = resolve(1);
		  let promise2 = resolve(2);
		  let promise3 = resolve(3);
		  let promises = [ promise1, promise2, promise3 ];

		  Promise.all(promises).then(function(array){
		    // The array here would be [ 1, 2, 3 ];
		  });
		  ```

		  If any of the `promises` given to `all` are rejected, the first promise
		  that is rejected will be given as an argument to the returned promises's
		  rejection handler. For example:

		  Example:

		  ```javascript
		  let promise1 = resolve(1);
		  let promise2 = reject(new Error("2"));
		  let promise3 = reject(new Error("3"));
		  let promises = [ promise1, promise2, promise3 ];

		  Promise.all(promises).then(function(array){
		    // Code here never runs because there are rejected promises!
		  }, function(error) {
		    // error.message === "2"
		  });
		  ```

		  @method all
		  @static
		  @param {Array} entries array of promises
		  @param {String} label optional string for labeling the promise.
		  Useful for tooling.
		  @return {Promise} promise that is fulfilled when all `promises` have been
		  fulfilled, or rejected if any of them become rejected.
		  @static
		*/
		function all(entries) {
		  return new Enumerator(this, entries).promise;
		}

		/**
		  `Promise.race` returns a new promise which is settled in the same way as the
		  first passed promise to settle.

		  Example:

		  ```javascript
		  let promise1 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 1');
		    }, 200);
		  });

		  let promise2 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 2');
		    }, 100);
		  });

		  Promise.race([promise1, promise2]).then(function(result){
		    // result === 'promise 2' because it was resolved before promise1
		    // was resolved.
		  });
		  ```

		  `Promise.race` is deterministic in that only the state of the first
		  settled promise matters. For example, even if other promises given to the
		  `promises` array argument are resolved, but the first settled promise has
		  become rejected before the other promises became fulfilled, the returned
		  promise will become rejected:

		  ```javascript
		  let promise1 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 1');
		    }, 200);
		  });

		  let promise2 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      reject(new Error('promise 2'));
		    }, 100);
		  });

		  Promise.race([promise1, promise2]).then(function(result){
		    // Code here never runs
		  }, function(reason){
		    // reason.message === 'promise 2' because promise 2 became rejected before
		    // promise 1 became fulfilled
		  });
		  ```

		  An example real-world use case is implementing timeouts:

		  ```javascript
		  Promise.race([ajax('foo.json'), timeout(5000)])
		  ```

		  @method race
		  @static
		  @param {Array} promises array of promises to observe
		  Useful for tooling.
		  @return {Promise} a promise which settles in the same way as the first passed
		  promise to settle.
		*/
		function race(entries) {
		  /*jshint validthis:true */
		  var Constructor = this;

		  if (!isArray(entries)) {
		    return new Constructor(function (_, reject) {
		      return reject(new TypeError('You must pass an array to race.'));
		    });
		  } else {
		    return new Constructor(function (resolve, reject) {
		      var length = entries.length;
		      for (var i = 0; i < length; i++) {
		        Constructor.resolve(entries[i]).then(resolve, reject);
		      }
		    });
		  }
		}

		/**
		  `Promise.reject` returns a promise rejected with the passed `reason`.
		  It is shorthand for the following:

		  ```javascript
		  let promise = new Promise(function(resolve, reject){
		    reject(new Error('WHOOPS'));
		  });

		  promise.then(function(value){
		    // Code here doesn't run because the promise is rejected!
		  }, function(reason){
		    // reason.message === 'WHOOPS'
		  });
		  ```

		  Instead of writing the above, your code now simply becomes the following:

		  ```javascript
		  let promise = Promise.reject(new Error('WHOOPS'));

		  promise.then(function(value){
		    // Code here doesn't run because the promise is rejected!
		  }, function(reason){
		    // reason.message === 'WHOOPS'
		  });
		  ```

		  @method reject
		  @static
		  @param {Any} reason value that the returned promise will be rejected with.
		  Useful for tooling.
		  @return {Promise} a promise rejected with the given `reason`.
		*/
		function reject(reason) {
		  /*jshint validthis:true */
		  var Constructor = this;
		  var promise = new Constructor(noop);
		  _reject(promise, reason);
		  return promise;
		}

		function needsResolver() {
		  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
		}

		function needsNew() {
		  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
		}

		/**
		  Promise objects represent the eventual result of an asynchronous operation. The
		  primary way of interacting with a promise is through its `then` method, which
		  registers callbacks to receive either a promise's eventual value or the reason
		  why the promise cannot be fulfilled.

		  Terminology
		  -----------

		  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
		  - `thenable` is an object or function that defines a `then` method.
		  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
		  - `exception` is a value that is thrown using the throw statement.
		  - `reason` is a value that indicates why a promise was rejected.
		  - `settled` the final resting state of a promise, fulfilled or rejected.

		  A promise can be in one of three states: pending, fulfilled, or rejected.

		  Promises that are fulfilled have a fulfillment value and are in the fulfilled
		  state.  Promises that are rejected have a rejection reason and are in the
		  rejected state.  A fulfillment value is never a thenable.

		  Promises can also be said to *resolve* a value.  If this value is also a
		  promise, then the original promise's settled state will match the value's
		  settled state.  So a promise that *resolves* a promise that rejects will
		  itself reject, and a promise that *resolves* a promise that fulfills will
		  itself fulfill.


		  Basic Usage:
		  ------------

		  ```js
		  let promise = new Promise(function(resolve, reject) {
		    // on success
		    resolve(value);

		    // on failure
		    reject(reason);
		  });

		  promise.then(function(value) {
		    // on fulfillment
		  }, function(reason) {
		    // on rejection
		  });
		  ```

		  Advanced Usage:
		  ---------------

		  Promises shine when abstracting away asynchronous interactions such as
		  `XMLHttpRequest`s.

		  ```js
		  function getJSON(url) {
		    return new Promise(function(resolve, reject){
		      let xhr = new XMLHttpRequest();

		      xhr.open('GET', url);
		      xhr.onreadystatechange = handler;
		      xhr.responseType = 'json';
		      xhr.setRequestHeader('Accept', 'application/json');
		      xhr.send();

		      function handler() {
		        if (this.readyState === this.DONE) {
		          if (this.status === 200) {
		            resolve(this.response);
		          } else {
		            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
		          }
		        }
		      };
		    });
		  }

		  getJSON('/posts.json').then(function(json) {
		    // on fulfillment
		  }, function(reason) {
		    // on rejection
		  });
		  ```

		  Unlike callbacks, promises are great composable primitives.

		  ```js
		  Promise.all([
		    getJSON('/posts'),
		    getJSON('/comments')
		  ]).then(function(values){
		    values[0] // => postsJSON
		    values[1] // => commentsJSON

		    return values;
		  });
		  ```

		  @class Promise
		  @param {function} resolver
		  Useful for tooling.
		  @constructor
		*/
		function Promise(resolver) {
		  this[PROMISE_ID] = nextId();
		  this._result = this._state = undefined;
		  this._subscribers = [];

		  if (noop !== resolver) {
		    typeof resolver !== 'function' && needsResolver();
		    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
		  }
		}

		Promise.all = all;
		Promise.race = race;
		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise._setScheduler = setScheduler;
		Promise._setAsap = setAsap;
		Promise._asap = asap;

		Promise.prototype = {
		  constructor: Promise,

		  /**
		    The primary way of interacting with a promise is through its `then` method,
		    which registers callbacks to receive either a promise's eventual value or the
		    reason why the promise cannot be fulfilled.
		  
		    ```js
		    findUser().then(function(user){
		      // user is available
		    }, function(reason){
		      // user is unavailable, and you are given the reason why
		    });
		    ```
		  
		    Chaining
		    --------
		  
		    The return value of `then` is itself a promise.  This second, 'downstream'
		    promise is resolved with the return value of the first promise's fulfillment
		    or rejection handler, or rejected if the handler throws an exception.
		  
		    ```js
		    findUser().then(function (user) {
		      return user.name;
		    }, function (reason) {
		      return 'default name';
		    }).then(function (userName) {
		      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
		      // will be `'default name'`
		    });
		  
		    findUser().then(function (user) {
		      throw new Error('Found user, but still unhappy');
		    }, function (reason) {
		      throw new Error('`findUser` rejected and we're unhappy');
		    }).then(function (value) {
		      // never reached
		    }, function (reason) {
		      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
		      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
		    });
		    ```
		    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
		  
		    ```js
		    findUser().then(function (user) {
		      throw new PedagogicalException('Upstream error');
		    }).then(function (value) {
		      // never reached
		    }).then(function (value) {
		      // never reached
		    }, function (reason) {
		      // The `PedgagocialException` is propagated all the way down to here
		    });
		    ```
		  
		    Assimilation
		    ------------
		  
		    Sometimes the value you want to propagate to a downstream promise can only be
		    retrieved asynchronously. This can be achieved by returning a promise in the
		    fulfillment or rejection handler. The downstream promise will then be pending
		    until the returned promise is settled. This is called *assimilation*.
		  
		    ```js
		    findUser().then(function (user) {
		      return findCommentsByAuthor(user);
		    }).then(function (comments) {
		      // The user's comments are now available
		    });
		    ```
		  
		    If the assimliated promise rejects, then the downstream promise will also reject.
		  
		    ```js
		    findUser().then(function (user) {
		      return findCommentsByAuthor(user);
		    }).then(function (comments) {
		      // If `findCommentsByAuthor` fulfills, we'll have the value here
		    }, function (reason) {
		      // If `findCommentsByAuthor` rejects, we'll have the reason here
		    });
		    ```
		  
		    Simple Example
		    --------------
		  
		    Synchronous Example
		  
		    ```javascript
		    let result;
		  
		    try {
		      result = findResult();
		      // success
		    } catch(reason) {
		      // failure
		    }
		    ```
		  
		    Errback Example
		  
		    ```js
		    findResult(function(result, err){
		      if (err) {
		        // failure
		      } else {
		        // success
		      }
		    });
		    ```
		  
		    Promise Example;
		  
		    ```javascript
		    findResult().then(function(result){
		      // success
		    }, function(reason){
		      // failure
		    });
		    ```
		  
		    Advanced Example
		    --------------
		  
		    Synchronous Example
		  
		    ```javascript
		    let author, books;
		  
		    try {
		      author = findAuthor();
		      books  = findBooksByAuthor(author);
		      // success
		    } catch(reason) {
		      // failure
		    }
		    ```
		  
		    Errback Example
		  
		    ```js
		  
		    function foundBooks(books) {
		  
		    }
		  
		    function failure(reason) {
		  
		    }
		  
		    findAuthor(function(author, err){
		      if (err) {
		        failure(err);
		        // failure
		      } else {
		        try {
		          findBoooksByAuthor(author, function(books, err) {
		            if (err) {
		              failure(err);
		            } else {
		              try {
		                foundBooks(books);
		              } catch(reason) {
		                failure(reason);
		              }
		            }
		          });
		        } catch(error) {
		          failure(err);
		        }
		        // success
		      }
		    });
		    ```
		  
		    Promise Example;
		  
		    ```javascript
		    findAuthor().
		      then(findBooksByAuthor).
		      then(function(books){
		        // found books
		    }).catch(function(reason){
		      // something went wrong
		    });
		    ```
		  
		    @method then
		    @param {Function} onFulfilled
		    @param {Function} onRejected
		    Useful for tooling.
		    @return {Promise}
		  */
		  then: then,

		  /**
		    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
		    as the catch block of a try/catch statement.
		  
		    ```js
		    function findAuthor(){
		      throw new Error('couldn't find that author');
		    }
		  
		    // synchronous
		    try {
		      findAuthor();
		    } catch(reason) {
		      // something went wrong
		    }
		  
		    // async with promises
		    findAuthor().catch(function(reason){
		      // something went wrong
		    });
		    ```
		  
		    @method catch
		    @param {Function} onRejection
		    Useful for tooling.
		    @return {Promise}
		  */
		  'catch': function _catch(onRejection) {
		    return this.then(null, onRejection);
		  }
		};

		function polyfill() {
		    var local = undefined;

		    if (typeof global !== 'undefined') {
		        local = global;
		    } else if (typeof self !== 'undefined') {
		        local = self;
		    } else {
		        try {
		            local = Function('return this')();
		        } catch (e) {
		            throw new Error('polyfill failed because global object is unavailable in this environment');
		        }
		    }

		    var P = local.Promise;

		    if (P) {
		        var promiseToString = null;
		        try {
		            promiseToString = Object.prototype.toString.call(P.resolve());
		        } catch (e) {
		            // silently ignored
		        }

		        if (promiseToString === '[object Promise]' && !P.cast) {
		            return;
		        }
		    }

		    local.Promise = Promise;
		}

		// Strange compat..
		Promise.polyfill = polyfill;
		Promise.Promise = Promise;

		return Promise;

		})));
		//# sourceMappingURL=es6-promise.map
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), (function() { return this; }())))

	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
		var polyfills = __webpack_require__(24)
		var legacy = __webpack_require__(23)
		var queue = []

		var util = __webpack_require__(10)

		function noop () {}

		var debug = noop
		if (util.debuglog)
		  debug = util.debuglog('gfs4')
		else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
		  debug = function() {
		    var m = util.format.apply(util, arguments)
		    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
		    console.error(m)
		  }

		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
		  process.on('exit', function() {
		    debug(queue)
		    __webpack_require__(18).equal(queue.length, 0)
		  })
		}

		module.exports = patch(__webpack_require__(12))
		if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
		  module.exports = patch(fs)
		}

		// Always patch fs.close/closeSync, because we want to
		// retry() whenever a close happens *anywhere* in the program.
		// This is essential when multiple graceful-fs instances are
		// in play at the same time.
		module.exports.close =
		fs.close = (function (fs$close) { return function (fd, cb) {
		  return fs$close.call(fs, fd, function (err) {
		    if (!err)
		      retry()

		    if (typeof cb === 'function')
		      cb.apply(this, arguments)
		  })
		}})(fs.close)

		module.exports.closeSync =
		fs.closeSync = (function (fs$closeSync) { return function (fd) {
		  // Note that graceful-fs also retries when fs.closeSync() fails.
		  // Looks like a bug to me, although it's probably a harmless one.
		  var rval = fs$closeSync.apply(fs, arguments)
		  retry()
		  return rval
		}})(fs.closeSync)

		function patch (fs) {
		  // Everything that references the open() function needs to be in here
		  polyfills(fs)
		  fs.gracefulify = patch
		  fs.FileReadStream = ReadStream;  // Legacy name.
		  fs.FileWriteStream = WriteStream;  // Legacy name.
		  fs.createReadStream = createReadStream
		  fs.createWriteStream = createWriteStream
		  var fs$readFile = fs.readFile
		  fs.readFile = readFile
		  function readFile (path, options, cb) {
		    if (typeof options === 'function')
		      cb = options, options = null

		    return go$readFile(path, options, cb)

		    function go$readFile (path, options, cb) {
		      return fs$readFile(path, options, function (err) {
		        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
		          enqueue([go$readFile, [path, options, cb]])
		        else {
		          if (typeof cb === 'function')
		            cb.apply(this, arguments)
		          retry()
		        }
		      })
		    }
		  }

		  var fs$writeFile = fs.writeFile
		  fs.writeFile = writeFile
		  function writeFile (path, data, options, cb) {
		    if (typeof options === 'function')
		      cb = options, options = null

		    return go$writeFile(path, data, options, cb)

		    function go$writeFile (path, data, options, cb) {
		      return fs$writeFile(path, data, options, function (err) {
		        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
		          enqueue([go$writeFile, [path, data, options, cb]])
		        else {
		          if (typeof cb === 'function')
		            cb.apply(this, arguments)
		          retry()
		        }
		      })
		    }
		  }

		  var fs$appendFile = fs.appendFile
		  if (fs$appendFile)
		    fs.appendFile = appendFile
		  function appendFile (path, data, options, cb) {
		    if (typeof options === 'function')
		      cb = options, options = null

		    return go$appendFile(path, data, options, cb)

		    function go$appendFile (path, data, options, cb) {
		      return fs$appendFile(path, data, options, function (err) {
		        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
		          enqueue([go$appendFile, [path, data, options, cb]])
		        else {
		          if (typeof cb === 'function')
		            cb.apply(this, arguments)
		          retry()
		        }
		      })
		    }
		  }

		  var fs$readdir = fs.readdir
		  fs.readdir = readdir
		  function readdir (path, options, cb) {
		    var args = [path]
		    if (typeof options !== 'function') {
		      args.push(options)
		    } else {
		      cb = options
		    }
		    args.push(go$readdir$cb)

		    return go$readdir(args)

		    function go$readdir$cb (err, files) {
		      if (files && files.sort)
		        files.sort()

		      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
		        enqueue([go$readdir, [args]])
		      else {
		        if (typeof cb === 'function')
		          cb.apply(this, arguments)
		        retry()
		      }
		    }
		  }

		  function go$readdir (args) {
		    return fs$readdir.apply(fs, args)
		  }

		  if (process.version.substr(0, 4) === 'v0.8') {
		    var legStreams = legacy(fs)
		    ReadStream = legStreams.ReadStream
		    WriteStream = legStreams.WriteStream
		  }

		  var fs$ReadStream = fs.ReadStream
		  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
		  ReadStream.prototype.open = ReadStream$open

		  var fs$WriteStream = fs.WriteStream
		  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
		  WriteStream.prototype.open = WriteStream$open

		  fs.ReadStream = ReadStream
		  fs.WriteStream = WriteStream

		  function ReadStream (path, options) {
		    if (this instanceof ReadStream)
		      return fs$ReadStream.apply(this, arguments), this
		    else
		      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
		  }

		  function ReadStream$open () {
		    var that = this
		    open(that.path, that.flags, that.mode, function (err, fd) {
		      if (err) {
		        if (that.autoClose)
		          that.destroy()

		        that.emit('error', err)
		      } else {
		        that.fd = fd
		        that.emit('open', fd)
		        that.read()
		      }
		    })
		  }

		  function WriteStream (path, options) {
		    if (this instanceof WriteStream)
		      return fs$WriteStream.apply(this, arguments), this
		    else
		      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
		  }

		  function WriteStream$open () {
		    var that = this
		    open(that.path, that.flags, that.mode, function (err, fd) {
		      if (err) {
		        that.destroy()
		        that.emit('error', err)
		      } else {
		        that.fd = fd
		        that.emit('open', fd)
		      }
		    })
		  }

		  function createReadStream (path, options) {
		    return new ReadStream(path, options)
		  }

		  function createWriteStream (path, options) {
		    return new WriteStream(path, options)
		  }

		  var fs$open = fs.open
		  fs.open = open
		  function open (path, flags, mode, cb) {
		    if (typeof mode === 'function')
		      cb = mode, mode = null

		    return go$open(path, flags, mode, cb)

		    function go$open (path, flags, mode, cb) {
		      return fs$open(path, flags, mode, function (err, fd) {
		        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
		          enqueue([go$open, [path, flags, mode, cb]])
		        else {
		          if (typeof cb === 'function')
		            cb.apply(this, arguments)
		          retry()
		        }
		      })
		    }
		  }

		  return fs
		}

		function enqueue (elem) {
		  debug('ENQUEUE', elem[0].name, elem[1])
		  queue.push(elem)
		}

		function retry () {
		  var elem = queue.shift()
		  if (elem) {
		    debug('RETRY', elem[0].name, elem[1])
		    elem[0].apply(null, elem[1])
		  }
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {var Stream = __webpack_require__(6).Stream

		module.exports = legacy

		function legacy (fs) {
		  return {
		    ReadStream: ReadStream,
		    WriteStream: WriteStream
		  }

		  function ReadStream (path, options) {
		    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

		    Stream.call(this);

		    var self = this;

		    this.path = path;
		    this.fd = null;
		    this.readable = true;
		    this.paused = false;

		    this.flags = 'r';
		    this.mode = 438; /*=0666*/
		    this.bufferSize = 64 * 1024;

		    options = options || {};

		    // Mixin options into this
		    var keys = Object.keys(options);
		    for (var index = 0, length = keys.length; index < length; index++) {
		      var key = keys[index];
		      this[key] = options[key];
		    }

		    if (this.encoding) this.setEncoding(this.encoding);

		    if (this.start !== undefined) {
		      if ('number' !== typeof this.start) {
		        throw TypeError('start must be a Number');
		      }
		      if (this.end === undefined) {
		        this.end = Infinity;
		      } else if ('number' !== typeof this.end) {
		        throw TypeError('end must be a Number');
		      }

		      if (this.start > this.end) {
		        throw new Error('start must be <= end');
		      }

		      this.pos = this.start;
		    }

		    if (this.fd !== null) {
		      process.nextTick(function() {
		        self._read();
		      });
		      return;
		    }

		    fs.open(this.path, this.flags, this.mode, function (err, fd) {
		      if (err) {
		        self.emit('error', err);
		        self.readable = false;
		        return;
		      }

		      self.fd = fd;
		      self.emit('open', fd);
		      self._read();
		    })
		  }

		  function WriteStream (path, options) {
		    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

		    Stream.call(this);

		    this.path = path;
		    this.fd = null;
		    this.writable = true;

		    this.flags = 'w';
		    this.encoding = 'binary';
		    this.mode = 438; /*=0666*/
		    this.bytesWritten = 0;

		    options = options || {};

		    // Mixin options into this
		    var keys = Object.keys(options);
		    for (var index = 0, length = keys.length; index < length; index++) {
		      var key = keys[index];
		      this[key] = options[key];
		    }

		    if (this.start !== undefined) {
		      if ('number' !== typeof this.start) {
		        throw TypeError('start must be a Number');
		      }
		      if (this.start < 0) {
		        throw new Error('start must be >= zero');
		      }

		      this.pos = this.start;
		    }

		    this.busy = false;
		    this._queue = [];

		    if (this.fd === null) {
		      this._open = fs.open;
		      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
		      this.flush();
		    }
		  }
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {var fs = __webpack_require__(12)
		var constants = __webpack_require__(29)

		var origCwd = process.cwd
		var cwd = null
		process.cwd = function() {
		  if (!cwd)
		    cwd = origCwd.call(process)
		  return cwd
		}
		try {
		  process.cwd()
		} catch (er) {}

		var chdir = process.chdir
		process.chdir = function(d) {
		  cwd = null
		  chdir.call(process, d)
		}

		module.exports = patch

		function patch (fs) {
		  // (re-)implement some things that are known busted or missing.

		  // lchmod, broken prior to 0.6.2
		  // back-port the fix here.
		  if (constants.hasOwnProperty('O_SYMLINK') &&
		      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
		    patchLchmod(fs)
		  }

		  // lutimes implementation, or no-op
		  if (!fs.lutimes) {
		    patchLutimes(fs)
		  }

		  // https://github.com/isaacs/node-graceful-fs/issues/4
		  // Chown should not fail on einval or eperm if non-root.
		  // It should not fail on enosys ever, as this just indicates
		  // that a fs doesn't support the intended operation.

		  fs.chown = chownFix(fs.chown)
		  fs.fchown = chownFix(fs.fchown)
		  fs.lchown = chownFix(fs.lchown)

		  fs.chmod = chmodFix(fs.chmod)
		  fs.fchmod = chmodFix(fs.fchmod)
		  fs.lchmod = chmodFix(fs.lchmod)

		  fs.chownSync = chownFixSync(fs.chownSync)
		  fs.fchownSync = chownFixSync(fs.fchownSync)
		  fs.lchownSync = chownFixSync(fs.lchownSync)

		  fs.chmodSync = chmodFixSync(fs.chmodSync)
		  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
		  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

		  fs.stat = statFix(fs.stat)
		  fs.fstat = statFix(fs.fstat)
		  fs.lstat = statFix(fs.lstat)

		  fs.statSync = statFixSync(fs.statSync)
		  fs.fstatSync = statFixSync(fs.fstatSync)
		  fs.lstatSync = statFixSync(fs.lstatSync)

		  // if lchmod/lchown do not exist, then make them no-ops
		  if (!fs.lchmod) {
		    fs.lchmod = function (path, mode, cb) {
		      if (cb) process.nextTick(cb)
		    }
		    fs.lchmodSync = function () {}
		  }
		  if (!fs.lchown) {
		    fs.lchown = function (path, uid, gid, cb) {
		      if (cb) process.nextTick(cb)
		    }
		    fs.lchownSync = function () {}
		  }

		  // on Windows, A/V software can lock the directory, causing this
		  // to fail with an EACCES or EPERM if the directory contains newly
		  // created files.  Try again on failure, for up to 1 second.
		  if (process.platform === "win32") {
		    fs.rename = (function (fs$rename) { return function (from, to, cb) {
		      var start = Date.now()
		      fs$rename(from, to, function CB (er) {
		        if (er
		            && (er.code === "EACCES" || er.code === "EPERM")
		            && Date.now() - start < 1000) {
		          return fs$rename(from, to, CB)
		        }
		        if (cb) cb(er)
		      })
		    }})(fs.rename)
		  }

		  // if read() returns EAGAIN, then just try it again.
		  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
		    var callback
		    if (callback_ && typeof callback_ === 'function') {
		      var eagCounter = 0
		      callback = function (er, _, __) {
		        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
		          eagCounter ++
		          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
		        }
		        callback_.apply(this, arguments)
		      }
		    }
		    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
		  }})(fs.read)

		  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
		    var eagCounter = 0
		    while (true) {
		      try {
		        return fs$readSync.call(fs, fd, buffer, offset, length, position)
		      } catch (er) {
		        if (er.code === 'EAGAIN' && eagCounter < 10) {
		          eagCounter ++
		          continue
		        }
		        throw er
		      }
		    }
		  }})(fs.readSync)
		}

		function patchLchmod (fs) {
		  fs.lchmod = function (path, mode, callback) {
		    fs.open( path
		           , constants.O_WRONLY | constants.O_SYMLINK
		           , mode
		           , function (err, fd) {
		      if (err) {
		        if (callback) callback(err)
		        return
		      }
		      // prefer to return the chmod error, if one occurs,
		      // but still try to close, and report closing errors if they occur.
		      fs.fchmod(fd, mode, function (err) {
		        fs.close(fd, function(err2) {
		          if (callback) callback(err || err2)
		        })
		      })
		    })
		  }

		  fs.lchmodSync = function (path, mode) {
		    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

		    // prefer to return the chmod error, if one occurs,
		    // but still try to close, and report closing errors if they occur.
		    var threw = true
		    var ret
		    try {
		      ret = fs.fchmodSync(fd, mode)
		      threw = false
		    } finally {
		      if (threw) {
		        try {
		          fs.closeSync(fd)
		        } catch (er) {}
		      } else {
		        fs.closeSync(fd)
		      }
		    }
		    return ret
		  }
		}

		function patchLutimes (fs) {
		  if (constants.hasOwnProperty("O_SYMLINK")) {
		    fs.lutimes = function (path, at, mt, cb) {
		      fs.open(path, constants.O_SYMLINK, function (er, fd) {
		        if (er) {
		          if (cb) cb(er)
		          return
		        }
		        fs.futimes(fd, at, mt, function (er) {
		          fs.close(fd, function (er2) {
		            if (cb) cb(er || er2)
		          })
		        })
		      })
		    }

		    fs.lutimesSync = function (path, at, mt) {
		      var fd = fs.openSync(path, constants.O_SYMLINK)
		      var ret
		      var threw = true
		      try {
		        ret = fs.futimesSync(fd, at, mt)
		        threw = false
		      } finally {
		        if (threw) {
		          try {
		            fs.closeSync(fd)
		          } catch (er) {}
		        } else {
		          fs.closeSync(fd)
		        }
		      }
		      return ret
		    }

		  } else {
		    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
		    fs.lutimesSync = function () {}
		  }
		}

		function chmodFix (orig) {
		  if (!orig) return orig
		  return function (target, mode, cb) {
		    return orig.call(fs, target, mode, function (er) {
		      if (chownErOk(er)) er = null
		      if (cb) cb.apply(this, arguments)
		    })
		  }
		}

		function chmodFixSync (orig) {
		  if (!orig) return orig
		  return function (target, mode) {
		    try {
		      return orig.call(fs, target, mode)
		    } catch (er) {
		      if (!chownErOk(er)) throw er
		    }
		  }
		}


		function chownFix (orig) {
		  if (!orig) return orig
		  return function (target, uid, gid, cb) {
		    return orig.call(fs, target, uid, gid, function (er) {
		      if (chownErOk(er)) er = null
		      if (cb) cb.apply(this, arguments)
		    })
		  }
		}

		function chownFixSync (orig) {
		  if (!orig) return orig
		  return function (target, uid, gid) {
		    try {
		      return orig.call(fs, target, uid, gid)
		    } catch (er) {
		      if (!chownErOk(er)) throw er
		    }
		  }
		}


		function statFix (orig) {
		  if (!orig) return orig
		  // Older versions of Node erroneously returned signed integers for
		  // uid + gid.
		  return function (target, cb) {
		    return orig.call(fs, target, function (er, stats) {
		      if (!stats) return cb.apply(this, arguments)
		      if (stats.uid < 0) stats.uid += 0x100000000
		      if (stats.gid < 0) stats.gid += 0x100000000
		      if (cb) cb.apply(this, arguments)
		    })
		  }
		}

		function statFixSync (orig) {
		  if (!orig) return orig
		  // Older versions of Node erroneously returned signed integers for
		  // uid + gid.
		  return function (target) {
		    var stats = orig.call(fs, target)
		    if (stats.uid < 0) stats.uid += 0x100000000
		    if (stats.gid < 0) stats.gid += 0x100000000
		    return stats;
		  }
		}

		// ENOSYS means that the fs doesn't support the op. Just ignore
		// that, because it doesn't matter.
		//
		// if there's no getuid, or if getuid() is something other
		// than 0, and the error is EINVAL or EPERM, then just ignore
		// it.
		//
		// This specific case is a silent failure in cp, install, tar,
		// and most other unix tools that manage permissions.
		//
		// When running as root, or if other types of errors are
		// encountered, then it's strict.
		function chownErOk (er) {
		  if (!er)
		    return true

		  if (er.code === "ENOSYS")
		    return true

		  var nonroot = !process.getuid || process.getuid() !== 0
		  if (nonroot) {
		    if (er.code === "EINVAL" || er.code === "EPERM")
		      return true
		  }

		  return false
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 25 */
	/***/ function(module, exports) {

		exports.read = function (buffer, offset, isLE, mLen, nBytes) {
		  var e, m
		  var eLen = nBytes * 8 - mLen - 1
		  var eMax = (1 << eLen) - 1
		  var eBias = eMax >> 1
		  var nBits = -7
		  var i = isLE ? (nBytes - 1) : 0
		  var d = isLE ? -1 : 1
		  var s = buffer[offset + i]

		  i += d

		  e = s & ((1 << (-nBits)) - 1)
		  s >>= (-nBits)
		  nBits += eLen
		  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

		  m = e & ((1 << (-nBits)) - 1)
		  e >>= (-nBits)
		  nBits += mLen
		  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

		  if (e === 0) {
		    e = 1 - eBias
		  } else if (e === eMax) {
		    return m ? NaN : ((s ? -1 : 1) * Infinity)
		  } else {
		    m = m + Math.pow(2, mLen)
		    e = e - eBias
		  }
		  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
		}

		exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
		  var e, m, c
		  var eLen = nBytes * 8 - mLen - 1
		  var eMax = (1 << eLen) - 1
		  var eBias = eMax >> 1
		  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
		  var i = isLE ? 0 : (nBytes - 1)
		  var d = isLE ? 1 : -1
		  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

		  value = Math.abs(value)

		  if (isNaN(value) || value === Infinity) {
		    m = isNaN(value) ? 1 : 0
		    e = eMax
		  } else {
		    e = Math.floor(Math.log(value) / Math.LN2)
		    if (value * (c = Math.pow(2, -e)) < 1) {
		      e--
		      c *= 2
		    }
		    if (e + eBias >= 1) {
		      value += rt / c
		    } else {
		      value += rt * Math.pow(2, 1 - eBias)
		    }
		    if (value * c >= 2) {
		      e++
		      c /= 2
		    }

		    if (e + eBias >= eMax) {
		      m = 0
		      e = eMax
		    } else if (e + eBias >= 1) {
		      m = (value * c - 1) * Math.pow(2, mLen)
		      e = e + eBias
		    } else {
		      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
		      e = 0
		    }
		  }

		  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

		  e = (e << mLen) | m
		  eLen += mLen
		  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

		  buffer[offset + i - d] |= s * 128
		}


	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * @preserve
		 * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
		 *
		 * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
		 * @see http://github.com/homebrewing/brauhaus-diff
		 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
		 * @see http://github.com/garycourt/murmurhash-js
		 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
		 * @see http://sites.google.com/site/murmurhash/
		 */
		(function(){
		    var cache;

		    // Call this function without `new` to use the cached object (good for
		    // single-threaded environments), or with `new` to create a new object.
		    //
		    // @param {string} key A UTF-16 or ASCII string
		    // @param {number} seed An optional positive integer
		    // @return {object} A MurmurHash3 object for incremental hashing
		    function MurmurHash3(key, seed) {
		        var m = this instanceof MurmurHash3 ? this : cache;
		        m.reset(seed)
		        if (typeof key === 'string' && key.length > 0) {
		            m.hash(key);
		        }

		        if (m !== this) {
		            return m;
		        }
		    };

		    // Incrementally add a string to this hash
		    //
		    // @param {string} key A UTF-16 or ASCII string
		    // @return {object} this
		    MurmurHash3.prototype.hash = function(key) {
		        var h1, k1, i, top, len;

		        len = key.length;
		        this.len += len;

		        k1 = this.k1;
		        i = 0;
		        switch (this.rem) {
		            case 0: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) : 0;
		            case 1: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 8 : 0;
		            case 2: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 16 : 0;
		            case 3:
		                k1 ^= len > i ? (key.charCodeAt(i) & 0xff) << 24 : 0;
		                k1 ^= len > i ? (key.charCodeAt(i++) & 0xff00) >> 8 : 0;
		        }

		        this.rem = (len + this.rem) & 3; // & 3 is same as % 4
		        len -= this.rem;
		        if (len > 0) {
		            h1 = this.h1;
		            while (1) {
		                k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
		                k1 = (k1 << 15) | (k1 >>> 17);
		                k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;

		                h1 ^= k1;
		                h1 = (h1 << 13) | (h1 >>> 19);
		                h1 = (h1 * 5 + 0xe6546b64) & 0xffffffff;

		                if (i >= len) {
		                    break;
		                }

		                k1 = ((key.charCodeAt(i++) & 0xffff)) ^
		                     ((key.charCodeAt(i++) & 0xffff) << 8) ^
		                     ((key.charCodeAt(i++) & 0xffff) << 16);
		                top = key.charCodeAt(i++);
		                k1 ^= ((top & 0xff) << 24) ^
		                      ((top & 0xff00) >> 8);
		            }

		            k1 = 0;
		            switch (this.rem) {
		                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xffff) << 16;
		                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xffff) << 8;
		                case 1: k1 ^= (key.charCodeAt(i) & 0xffff);
		            }

		            this.h1 = h1;
		        }

		        this.k1 = k1;
		        return this;
		    };

		    // Get the result of this hash
		    //
		    // @return {number} The 32-bit hash
		    MurmurHash3.prototype.result = function() {
		        var k1, h1;
		        
		        k1 = this.k1;
		        h1 = this.h1;

		        if (k1 > 0) {
		            k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
		            k1 = (k1 << 15) | (k1 >>> 17);
		            k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;
		            h1 ^= k1;
		        }

		        h1 ^= this.len;

		        h1 ^= h1 >>> 16;
		        h1 = (h1 * 0xca6b + (h1 & 0xffff) * 0x85eb0000) & 0xffffffff;
		        h1 ^= h1 >>> 13;
		        h1 = (h1 * 0xae35 + (h1 & 0xffff) * 0xc2b20000) & 0xffffffff;
		        h1 ^= h1 >>> 16;

		        return h1 >>> 0;
		    };

		    // Reset the hash object for reuse
		    //
		    // @param {number} seed An optional positive integer
		    MurmurHash3.prototype.reset = function(seed) {
		        this.h1 = typeof seed === 'number' ? seed : 0;
		        this.rem = this.k1 = this.len = 0;
		        return this;
		    };

		    // A cached object to use. This can be safely used if you're in a single-
		    // threaded environment, otherwise you need to create new hashes to use.
		    cache = new MurmurHash3();

		    if (true) {
		        module.exports = MurmurHash3;
		    } else {
		        this.MurmurHash3 = MurmurHash3;
		    }
		}());


	/***/ },
	/* 27 */
	/***/ function(module, exports) {

		var toString = {}.toString;

		module.exports = Array.isArray || function (arr) {
		  return toString.call(arr) == '[object Array]';
		};


	/***/ },
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {

		// the whatwg-fetch polyfill installs the fetch() function
		// on the global object (window or self)
		//
		// Return that as the export for use in Webpack, Browserify etc.
		__webpack_require__(44);
		module.exports = self.fetch.bind(self);


	/***/ },
	/* 29 */
	/***/ function(module, exports) {

		module.exports = {
			"O_RDONLY": 0,
			"O_WRONLY": 1,
			"O_RDWR": 2,
			"S_IFMT": 61440,
			"S_IFREG": 32768,
			"S_IFDIR": 16384,
			"S_IFCHR": 8192,
			"S_IFBLK": 24576,
			"S_IFIFO": 4096,
			"S_IFLNK": 40960,
			"S_IFSOCK": 49152,
			"O_CREAT": 512,
			"O_EXCL": 2048,
			"O_NOCTTY": 131072,
			"O_TRUNC": 1024,
			"O_APPEND": 8,
			"O_DIRECTORY": 1048576,
			"O_NOFOLLOW": 256,
			"O_SYNC": 128,
			"O_SYMLINK": 2097152,
			"S_IRWXU": 448,
			"S_IRUSR": 256,
			"S_IWUSR": 128,
			"S_IXUSR": 64,
			"S_IRWXG": 56,
			"S_IRGRP": 32,
			"S_IWGRP": 16,
			"S_IXGRP": 8,
			"S_IRWXO": 7,
			"S_IROTH": 4,
			"S_IWOTH": 2,
			"S_IXOTH": 1,
			"E2BIG": 7,
			"EACCES": 13,
			"EADDRINUSE": 48,
			"EADDRNOTAVAIL": 49,
			"EAFNOSUPPORT": 47,
			"EAGAIN": 35,
			"EALREADY": 37,
			"EBADF": 9,
			"EBADMSG": 94,
			"EBUSY": 16,
			"ECANCELED": 89,
			"ECHILD": 10,
			"ECONNABORTED": 53,
			"ECONNREFUSED": 61,
			"ECONNRESET": 54,
			"EDEADLK": 11,
			"EDESTADDRREQ": 39,
			"EDOM": 33,
			"EDQUOT": 69,
			"EEXIST": 17,
			"EFAULT": 14,
			"EFBIG": 27,
			"EHOSTUNREACH": 65,
			"EIDRM": 90,
			"EILSEQ": 92,
			"EINPROGRESS": 36,
			"EINTR": 4,
			"EINVAL": 22,
			"EIO": 5,
			"EISCONN": 56,
			"EISDIR": 21,
			"ELOOP": 62,
			"EMFILE": 24,
			"EMLINK": 31,
			"EMSGSIZE": 40,
			"EMULTIHOP": 95,
			"ENAMETOOLONG": 63,
			"ENETDOWN": 50,
			"ENETRESET": 52,
			"ENETUNREACH": 51,
			"ENFILE": 23,
			"ENOBUFS": 55,
			"ENODATA": 96,
			"ENODEV": 19,
			"ENOENT": 2,
			"ENOEXEC": 8,
			"ENOLCK": 77,
			"ENOLINK": 97,
			"ENOMEM": 12,
			"ENOMSG": 91,
			"ENOPROTOOPT": 42,
			"ENOSPC": 28,
			"ENOSR": 98,
			"ENOSTR": 99,
			"ENOSYS": 78,
			"ENOTCONN": 57,
			"ENOTDIR": 20,
			"ENOTEMPTY": 66,
			"ENOTSOCK": 38,
			"ENOTSUP": 45,
			"ENOTTY": 25,
			"ENXIO": 6,
			"EOPNOTSUPP": 102,
			"EOVERFLOW": 84,
			"EPERM": 1,
			"EPIPE": 32,
			"EPROTO": 100,
			"EPROTONOSUPPORT": 43,
			"EPROTOTYPE": 41,
			"ERANGE": 34,
			"EROFS": 30,
			"ESPIPE": 29,
			"ESRCH": 3,
			"ESTALE": 70,
			"ETIME": 101,
			"ETIMEDOUT": 60,
			"ETXTBSY": 26,
			"EWOULDBLOCK": 35,
			"EXDEV": 18,
			"SIGHUP": 1,
			"SIGINT": 2,
			"SIGQUIT": 3,
			"SIGILL": 4,
			"SIGTRAP": 5,
			"SIGABRT": 6,
			"SIGIOT": 6,
			"SIGBUS": 10,
			"SIGFPE": 8,
			"SIGKILL": 9,
			"SIGUSR1": 30,
			"SIGSEGV": 11,
			"SIGUSR2": 31,
			"SIGPIPE": 13,
			"SIGALRM": 14,
			"SIGTERM": 15,
			"SIGCHLD": 20,
			"SIGCONT": 19,
			"SIGSTOP": 17,
			"SIGTSTP": 18,
			"SIGTTIN": 21,
			"SIGTTOU": 22,
			"SIGURG": 16,
			"SIGXCPU": 24,
			"SIGXFSZ": 25,
			"SIGVTALRM": 26,
			"SIGPROF": 27,
			"SIGWINCH": 28,
			"SIGIO": 23,
			"SIGSYS": 12,
			"SSL_OP_ALL": 2147486719,
			"SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION": 262144,
			"SSL_OP_CIPHER_SERVER_PREFERENCE": 4194304,
			"SSL_OP_CISCO_ANYCONNECT": 32768,
			"SSL_OP_COOKIE_EXCHANGE": 8192,
			"SSL_OP_CRYPTOPRO_TLSEXT_BUG": 2147483648,
			"SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS": 2048,
			"SSL_OP_EPHEMERAL_RSA": 2097152,
			"SSL_OP_LEGACY_SERVER_CONNECT": 4,
			"SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER": 32,
			"SSL_OP_MICROSOFT_SESS_ID_BUG": 1,
			"SSL_OP_MSIE_SSLV2_RSA_PADDING": 64,
			"SSL_OP_NETSCAPE_CA_DN_BUG": 536870912,
			"SSL_OP_NETSCAPE_CHALLENGE_BUG": 2,
			"SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG": 1073741824,
			"SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG": 8,
			"SSL_OP_NO_COMPRESSION": 131072,
			"SSL_OP_NO_QUERY_MTU": 4096,
			"SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION": 65536,
			"SSL_OP_NO_SSLv2": 16777216,
			"SSL_OP_NO_SSLv3": 33554432,
			"SSL_OP_NO_TICKET": 16384,
			"SSL_OP_NO_TLSv1": 67108864,
			"SSL_OP_NO_TLSv1_1": 268435456,
			"SSL_OP_NO_TLSv1_2": 134217728,
			"SSL_OP_PKCS1_CHECK_1": 0,
			"SSL_OP_PKCS1_CHECK_2": 0,
			"SSL_OP_SINGLE_DH_USE": 1048576,
			"SSL_OP_SINGLE_ECDH_USE": 524288,
			"SSL_OP_SSLEAY_080_CLIENT_DH_BUG": 128,
			"SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG": 16,
			"SSL_OP_TLS_BLOCK_PADDING_BUG": 512,
			"SSL_OP_TLS_D5_BUG": 256,
			"SSL_OP_TLS_ROLLBACK_BUG": 8388608,
			"NPN_ENABLED": 1
		};

	/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.10.0
		(function() {
		  var JSONStorage, KEY_FOR_EMPTY_STRING, LocalStorage, MetaKey, QUOTA_EXCEEDED_ERR, StorageEvent, _emptyDirectory, _escapeKey, _rm, createMap, events, fs, path, writeSync,
		    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
		    hasProp = {}.hasOwnProperty;

		  path = __webpack_require__(31);

		  fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

		  events = __webpack_require__(7);

		  writeSync = __webpack_require__(45).sync;

		  KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---';

		  _emptyDirectory = function(target) {
		    var i, len, p, ref, results;
		    ref = fs.readdirSync(target);
		    results = [];
		    for (i = 0, len = ref.length; i < len; i++) {
		      p = ref[i];
		      results.push(_rm(path.join(target, p)));
		    }
		    return results;
		  };

		  _rm = function(target) {
		    if (fs.statSync(target).isDirectory()) {
		      _emptyDirectory(target);
		      return fs.rmdirSync(target);
		    } else {
		      return fs.unlinkSync(target);
		    }
		  };

		  _escapeKey = function(key) {
		    var newKey;
		    if (key === '') {
		      newKey = KEY_FOR_EMPTY_STRING;
		    } else {
		      newKey = key.toString();
		    }
		    return newKey;
		  };

		  QUOTA_EXCEEDED_ERR = (function(superClass) {
		    extend(QUOTA_EXCEEDED_ERR, superClass);

		    function QUOTA_EXCEEDED_ERR(message) {
		      this.message = message != null ? message : 'Unknown error.';
		      if (Error.captureStackTrace != null) {
		        Error.captureStackTrace(this, this.constructor);
		      }
		      this.name = this.constructor.name;
		    }

		    QUOTA_EXCEEDED_ERR.prototype.toString = function() {
		      return this.name + ": " + this.message;
		    };

		    return QUOTA_EXCEEDED_ERR;

		  })(Error);

		  StorageEvent = (function() {
		    function StorageEvent(key1, oldValue1, newValue1, url, storageArea) {
		      this.key = key1;
		      this.oldValue = oldValue1;
		      this.newValue = newValue1;
		      this.url = url;
		      this.storageArea = storageArea != null ? storageArea : 'localStorage';
		    }

		    return StorageEvent;

		  })();

		  MetaKey = (function() {
		    function MetaKey(key1, index1) {
		      this.key = key1;
		      this.index = index1;
		      if (!(this instanceof MetaKey)) {
		        return new MetaKey(this.key, this.index);
		      }
		    }

		    return MetaKey;

		  })();

		  createMap = function() {
		    var Map;
		    Map = function() {};
		    Map.prototype = Object.create(null);
		    return new Map();
		  };

		  LocalStorage = (function(superClass) {
		    var instanceMap;

		    extend(LocalStorage, superClass);

		    instanceMap = {};

		    function LocalStorage(_location, quota) {
		      this._location = _location;
		      this.quota = quota != null ? quota : 5 * 1024 * 1024;
		      if (!(this instanceof LocalStorage)) {
		        return new LocalStorage(this._location, this.quota);
		      }
		      this._location = path.resolve(this._location);
		      if (instanceMap[this._location] != null) {
		        return instanceMap[this._location];
		      }
		      this.length = 0;
		      this._bytesInUse = 0;
		      this._keys = [];
		      this._metaKeyMap = createMap();
		      this._eventUrl = "pid:" + process.pid;
		      this._init();
		      this._QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;
		      instanceMap[this._location] = this;
		      return instanceMap[this._location];
		    }

		    LocalStorage.prototype._init = function() {
		      var _MetaKey, _decodedKey, _keys, error, i, index, k, len, stat;
		      try {
		        stat = fs.statSync(this._location);
		        if ((stat != null) && !stat.isDirectory()) {
		          throw new Error("A file exists at the location '" + this._location + "' when trying to create/open localStorage");
		        }
		        this._bytesInUse = 0;
		        this.length = 0;
		        _keys = fs.readdirSync(this._location);
		        for (index = i = 0, len = _keys.length; i < len; index = ++i) {
		          k = _keys[index];
		          _decodedKey = decodeURIComponent(k);
		          this._keys.push(_decodedKey);
		          _MetaKey = new MetaKey(k, index);
		          this._metaKeyMap[_decodedKey] = _MetaKey;
		          stat = this._getStat(k);
		          if ((stat != null ? stat.size : void 0) != null) {
		            _MetaKey.size = stat.size;
		            this._bytesInUse += stat.size;
		          }
		        }
		        this.length = _keys.length;
		      } catch (error) {
		        fs.mkdirSync(this._location);
		      }
		    };

		    LocalStorage.prototype.setItem = function(key, value) {
		      var encodedKey, evnt, existsBeforeSet, filename, hasListeners, metaKey, oldLength, oldValue, valueString, valueStringLength;
		      hasListeners = events.EventEmitter.listenerCount(this, 'storage');
		      oldValue = null;
		      if (hasListeners) {
		        oldValue = this.getItem(key);
		      }
		      key = _escapeKey(key);
		      encodedKey = encodeURIComponent(key);
		      filename = path.join(this._location, encodedKey);
		      valueString = value.toString();
		      valueStringLength = valueString.length;
		      metaKey = this._metaKeyMap[key];
		      existsBeforeSet = !!metaKey;
		      if (existsBeforeSet) {
		        oldLength = metaKey.size;
		      } else {
		        oldLength = 0;
		      }
		      if (this._bytesInUse - oldLength + valueStringLength > this.quota) {
		        throw new QUOTA_EXCEEDED_ERR();
		      }
		      writeSync(filename, valueString, 'utf8');
		      if (!existsBeforeSet) {
		        metaKey = new MetaKey(encodedKey, (this._keys.push(key)) - 1);
		        metaKey.size = valueStringLength;
		        this._metaKeyMap[key] = metaKey;
		        this.length += 1;
		        this._bytesInUse += valueStringLength;
		      }
		      if (hasListeners) {
		        evnt = new StorageEvent(key, oldValue, value, this._eventUrl);
		        return this.emit('storage', evnt);
		      }
		    };

		    LocalStorage.prototype.getItem = function(key) {
		      var filename, metaKey;
		      key = _escapeKey(key);
		      metaKey = this._metaKeyMap[key];
		      if (!!metaKey) {
		        filename = path.join(this._location, metaKey.key);
		        return fs.readFileSync(filename, 'utf8');
		      } else {
		        return null;
		      }
		    };

		    LocalStorage.prototype._getStat = function(key) {
		      var error, filename;
		      key = _escapeKey(key);
		      filename = path.join(this._location, encodeURIComponent(key));
		      try {
		        return fs.statSync(filename);
		      } catch (error) {
		        return null;
		      }
		    };

		    LocalStorage.prototype.removeItem = function(key) {
		      var evnt, filename, hasListeners, k, meta, metaKey, oldValue, ref, v;
		      key = _escapeKey(key);
		      metaKey = this._metaKeyMap[key];
		      if (!!metaKey) {
		        hasListeners = events.EventEmitter.listenerCount(this, 'storage');
		        oldValue = null;
		        if (hasListeners) {
		          oldValue = this.getItem(key);
		        }
		        delete this._metaKeyMap[key];
		        this.length -= 1;
		        this._bytesInUse -= metaKey.size;
		        filename = path.join(this._location, metaKey.key);
		        this._keys.splice(metaKey.index, 1);
		        ref = this._metaKeyMap;
		        for (k in ref) {
		          v = ref[k];
		          meta = this._metaKeyMap[k];
		          if (meta.index > metaKey.index) {
		            meta.index -= 1;
		          }
		        }
		        _rm(filename);
		        if (hasListeners) {
		          evnt = new StorageEvent(key, oldValue, null, this._eventUrl);
		          return this.emit('storage', evnt);
		        }
		      }
		    };

		    LocalStorage.prototype.key = function(n) {
		      return this._keys[n];
		    };

		    LocalStorage.prototype.clear = function() {
		      var evnt;
		      _emptyDirectory(this._location);
		      this._metaKeyMap = createMap();
		      this._keys = [];
		      this.length = 0;
		      this._bytesInUse = 0;
		      if (events.EventEmitter.listenerCount(this, 'storage')) {
		        evnt = new StorageEvent(null, null, null, this._eventUrl);
		        return this.emit('storage', evnt);
		      }
		    };

		    LocalStorage.prototype._getBytesInUse = function() {
		      return this._bytesInUse;
		    };

		    LocalStorage.prototype._deleteLocation = function() {
		      delete instanceMap[this._location];
		      _rm(this._location);
		      this._metaKeyMap = {};
		      this._keys = [];
		      this.length = 0;
		      return this._bytesInUse = 0;
		    };

		    return LocalStorage;

		  })(events.EventEmitter);

		  JSONStorage = (function(superClass) {
		    extend(JSONStorage, superClass);

		    function JSONStorage() {
		      return JSONStorage.__super__.constructor.apply(this, arguments);
		    }

		    JSONStorage.prototype.setItem = function(key, value) {
		      var newValue;
		      newValue = JSON.stringify(value);
		      return JSONStorage.__super__.setItem.call(this, key, newValue);
		    };

		    JSONStorage.prototype.getItem = function(key) {
		      return JSON.parse(JSONStorage.__super__.getItem.call(this, key));
		    };

		    return JSONStorage;

		  })(LocalStorage);

		  exports.LocalStorage = LocalStorage;

		  exports.JSONStorage = JSONStorage;

		  exports.QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;

		}).call(this);

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.

		// resolves . and .. elements in a path array with directory names there
		// must be no slashes, empty elements, or device names (c:\) in the array
		// (so also no leading and trailing slashes - it does not distinguish
		// relative and absolute paths)
		function normalizeArray(parts, allowAboveRoot) {
		  // if the path tries to go above the root, `up` ends up > 0
		  var up = 0;
		  for (var i = parts.length - 1; i >= 0; i--) {
		    var last = parts[i];
		    if (last === '.') {
		      parts.splice(i, 1);
		    } else if (last === '..') {
		      parts.splice(i, 1);
		      up++;
		    } else if (up) {
		      parts.splice(i, 1);
		      up--;
		    }
		  }

		  // if the path is allowed to go above the root, restore leading ..s
		  if (allowAboveRoot) {
		    for (; up--; up) {
		      parts.unshift('..');
		    }
		  }

		  return parts;
		}

		// Split a filename into [root, dir, basename, ext], unix version
		// 'root' is just a slash, or nothing.
		var splitPathRe =
		    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
		var splitPath = function(filename) {
		  return splitPathRe.exec(filename).slice(1);
		};

		// path.resolve([from ...], to)
		// posix version
		exports.resolve = function() {
		  var resolvedPath = '',
		      resolvedAbsolute = false;

		  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
		    var path = (i >= 0) ? arguments[i] : process.cwd();

		    // Skip empty and invalid entries
		    if (typeof path !== 'string') {
		      throw new TypeError('Arguments to path.resolve must be strings');
		    } else if (!path) {
		      continue;
		    }

		    resolvedPath = path + '/' + resolvedPath;
		    resolvedAbsolute = path.charAt(0) === '/';
		  }

		  // At this point the path should be resolved to a full absolute path, but
		  // handle relative paths to be safe (might happen when process.cwd() fails)

		  // Normalize the path
		  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
		    return !!p;
		  }), !resolvedAbsolute).join('/');

		  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
		};

		// path.normalize(path)
		// posix version
		exports.normalize = function(path) {
		  var isAbsolute = exports.isAbsolute(path),
		      trailingSlash = substr(path, -1) === '/';

		  // Normalize the path
		  path = normalizeArray(filter(path.split('/'), function(p) {
		    return !!p;
		  }), !isAbsolute).join('/');

		  if (!path && !isAbsolute) {
		    path = '.';
		  }
		  if (path && trailingSlash) {
		    path += '/';
		  }

		  return (isAbsolute ? '/' : '') + path;
		};

		// posix version
		exports.isAbsolute = function(path) {
		  return path.charAt(0) === '/';
		};

		// posix version
		exports.join = function() {
		  var paths = Array.prototype.slice.call(arguments, 0);
		  return exports.normalize(filter(paths, function(p, index) {
		    if (typeof p !== 'string') {
		      throw new TypeError('Arguments to path.join must be strings');
		    }
		    return p;
		  }).join('/'));
		};


		// path.relative(from, to)
		// posix version
		exports.relative = function(from, to) {
		  from = exports.resolve(from).substr(1);
		  to = exports.resolve(to).substr(1);

		  function trim(arr) {
		    var start = 0;
		    for (; start < arr.length; start++) {
		      if (arr[start] !== '') break;
		    }

		    var end = arr.length - 1;
		    for (; end >= 0; end--) {
		      if (arr[end] !== '') break;
		    }

		    if (start > end) return [];
		    return arr.slice(start, end - start + 1);
		  }

		  var fromParts = trim(from.split('/'));
		  var toParts = trim(to.split('/'));

		  var length = Math.min(fromParts.length, toParts.length);
		  var samePartsLength = length;
		  for (var i = 0; i < length; i++) {
		    if (fromParts[i] !== toParts[i]) {
		      samePartsLength = i;
		      break;
		    }
		  }

		  var outputParts = [];
		  for (var i = samePartsLength; i < fromParts.length; i++) {
		    outputParts.push('..');
		  }

		  outputParts = outputParts.concat(toParts.slice(samePartsLength));

		  return outputParts.join('/');
		};

		exports.sep = '/';
		exports.delimiter = ':';

		exports.dirname = function(path) {
		  var result = splitPath(path),
		      root = result[0],
		      dir = result[1];

		  if (!root && !dir) {
		    // No dirname whatsoever
		    return '.';
		  }

		  if (dir) {
		    // It has a dirname, strip trailing slash
		    dir = dir.substr(0, dir.length - 1);
		  }

		  return root + dir;
		};


		exports.basename = function(path, ext) {
		  var f = splitPath(path)[2];
		  // TODO: make this comparison case-insensitive on windows?
		  if (ext && f.substr(-1 * ext.length) === ext) {
		    f = f.substr(0, f.length - ext.length);
		  }
		  return f;
		};


		exports.extname = function(path) {
		  return splitPath(path)[3];
		};

		function filter (xs, f) {
		    if (xs.filter) return xs.filter(f);
		    var res = [];
		    for (var i = 0; i < xs.length; i++) {
		        if (f(xs[i], i, xs)) res.push(xs[i]);
		    }
		    return res;
		}

		// String.prototype.substr - negative index don't work in IE8
		var substr = 'ab'.substr(-1) === 'b'
		    ? function (str, start, len) { return str.substr(start, len) }
		    : function (str, start, len) {
		        if (start < 0) start = str.length + start;
		        return str.substr(start, len);
		    }
		;

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {
		/*
		usage:

		// do something to a list of things
		asyncMap(myListOfStuff, function (thing, cb) { doSomething(thing.foo, cb) }, cb)
		// do more than one thing to each item
		asyncMap(list, fooFn, barFn, cb)

		*/

		module.exports = asyncMap

		function asyncMap () {
		  var steps = Array.prototype.slice.call(arguments)
		    , list = steps.shift() || []
		    , cb_ = steps.pop()
		  if (typeof cb_ !== "function") throw new Error(
		    "No callback provided to asyncMap")
		  if (!list) return cb_(null, [])
		  if (!Array.isArray(list)) list = [list]
		  var n = steps.length
		    , data = [] // 2d array
		    , errState = null
		    , l = list.length
		    , a = l * n
		  if (!a) return cb_(null, [])
		  function cb (er) {
		    if (er && !errState) errState = er

		    var argLen = arguments.length
		    for (var i = 1; i < argLen; i ++) if (arguments[i] !== undefined) {
		      data[i - 1] = (data[i - 1] || []).concat(arguments[i])
		    }
		    // see if any new things have been added.
		    if (list.length > l) {
		      var newList = list.slice(l)
		      a += (list.length - l) * n
		      l = list.length
		      process.nextTick(function () {
		        newList.forEach(function (ar) {
		          steps.forEach(function (fn) { fn(ar, cb) })
		        })
		      })
		    }

		    if (--a === 0) cb_.apply(null, [errState].concat(data))
		  }
		  // expect the supplied cb function to be called
		  // "n" times for each thing in the array.
		  list.forEach(function (ar) {
		    steps.forEach(function (fn) { fn(ar, cb) })
		  })
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = chain
		var bindActor = __webpack_require__(14)
		chain.first = {} ; chain.last = {}
		function chain (things, cb) {
		  var res = []
		  ;(function LOOP (i, len) {
		    if (i >= len) return cb(null,res)
		    if (Array.isArray(things[i]))
		      things[i] = bindActor.apply(null,
		        things[i].map(function(i){
		          return (i===chain.first) ? res[0]
		           : (i===chain.last)
		             ? res[res.length - 1] : i }))
		    if (!things[i]) return LOOP(i + 1, len)
		    things[i](function (er, data) {
		      if (er) return cb(er, res)
		      if (data !== undefined) res = res.concat(data)
		      LOOP(i + 1, len)
		    })
		  })(0, things.length) }


	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {

		exports.asyncMap = __webpack_require__(32)
		exports.bindActor = __webpack_require__(14)
		exports.chain = __webpack_require__(33)


	/***/ },
	/* 35 */
	/***/ function(module, exports) {

		module.exports = Array.isArray || function (arr) {
		  return Object.prototype.toString.call(arr) == '[object Array]';
		};


	/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(2)


	/***/ },
	/* 37 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(15)


	/***/ },
	/* 38 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = __webpack_require__(16);
		exports.Stream = __webpack_require__(6);
		exports.Readable = exports;
		exports.Writable = __webpack_require__(9);
		exports.Duplex = __webpack_require__(2);
		exports.Transform = __webpack_require__(8);
		exports.PassThrough = __webpack_require__(15);
		if (!process.browser && process.env.READABLE_STREAM === 'disable') {
		  module.exports = __webpack_require__(6);
		}

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 39 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(8)


	/***/ },
	/* 40 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(9)


	/***/ },
	/* 41 */
	/***/ function(module, exports) {

		if (typeof Object.create === 'function') {
		  // implementation from standard node.js 'util' module
		  module.exports = function inherits(ctor, superCtor) {
		    ctor.super_ = superCtor
		    ctor.prototype = Object.create(superCtor.prototype, {
		      constructor: {
		        value: ctor,
		        enumerable: false,
		        writable: true,
		        configurable: true
		      }
		    });
		  };
		} else {
		  // old school shim for old browsers
		  module.exports = function inherits(ctor, superCtor) {
		    ctor.super_ = superCtor
		    var TempCtor = function () {}
		    TempCtor.prototype = superCtor.prototype
		    ctor.prototype = new TempCtor()
		    ctor.prototype.constructor = ctor
		  }
		}


	/***/ },
	/* 42 */
	/***/ function(module, exports) {

		module.exports = function isBuffer(arg) {
		  return arg && typeof arg === 'object'
		    && typeof arg.copy === 'function'
		    && typeof arg.fill === 'function'
		    && typeof arg.readUInt8 === 'function';
		}

	/***/ },
	/* 43 */
	/***/ function(module, exports) {

		module.exports = function(module) {
			if(!module.webpackPolyfill) {
				module.deprecate = function() {};
				module.paths = [];
				// module.parent = undefined by default
				module.children = [];
				module.webpackPolyfill = 1;
			}
			return module;
		}


	/***/ },
	/* 44 */
	/***/ function(module, exports) {

		(function(self) {
		  'use strict';

		  if (self.fetch) {
		    return
		  }

		  var support = {
		    searchParams: 'URLSearchParams' in self,
		    iterable: 'Symbol' in self && 'iterator' in Symbol,
		    blob: 'FileReader' in self && 'Blob' in self && (function() {
		      try {
		        new Blob()
		        return true
		      } catch(e) {
		        return false
		      }
		    })(),
		    formData: 'FormData' in self,
		    arrayBuffer: 'ArrayBuffer' in self
		  }

		  if (support.arrayBuffer) {
		    var viewClasses = [
		      '[object Int8Array]',
		      '[object Uint8Array]',
		      '[object Uint8ClampedArray]',
		      '[object Int16Array]',
		      '[object Uint16Array]',
		      '[object Int32Array]',
		      '[object Uint32Array]',
		      '[object Float32Array]',
		      '[object Float64Array]'
		    ]

		    var isDataView = function(obj) {
		      return obj && DataView.prototype.isPrototypeOf(obj)
		    }

		    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
		      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
		    }
		  }

		  function normalizeName(name) {
		    if (typeof name !== 'string') {
		      name = String(name)
		    }
		    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
		      throw new TypeError('Invalid character in header field name')
		    }
		    return name.toLowerCase()
		  }

		  function normalizeValue(value) {
		    if (typeof value !== 'string') {
		      value = String(value)
		    }
		    return value
		  }

		  // Build a destructive iterator for the value list
		  function iteratorFor(items) {
		    var iterator = {
		      next: function() {
		        var value = items.shift()
		        return {done: value === undefined, value: value}
		      }
		    }

		    if (support.iterable) {
		      iterator[Symbol.iterator] = function() {
		        return iterator
		      }
		    }

		    return iterator
		  }

		  function Headers(headers) {
		    this.map = {}

		    if (headers instanceof Headers) {
		      headers.forEach(function(value, name) {
		        this.append(name, value)
		      }, this)

		    } else if (headers) {
		      Object.getOwnPropertyNames(headers).forEach(function(name) {
		        this.append(name, headers[name])
		      }, this)
		    }
		  }

		  Headers.prototype.append = function(name, value) {
		    name = normalizeName(name)
		    value = normalizeValue(value)
		    var oldValue = this.map[name]
		    this.map[name] = oldValue ? oldValue+','+value : value
		  }

		  Headers.prototype['delete'] = function(name) {
		    delete this.map[normalizeName(name)]
		  }

		  Headers.prototype.get = function(name) {
		    name = normalizeName(name)
		    return this.has(name) ? this.map[name] : null
		  }

		  Headers.prototype.has = function(name) {
		    return this.map.hasOwnProperty(normalizeName(name))
		  }

		  Headers.prototype.set = function(name, value) {
		    this.map[normalizeName(name)] = normalizeValue(value)
		  }

		  Headers.prototype.forEach = function(callback, thisArg) {
		    for (var name in this.map) {
		      if (this.map.hasOwnProperty(name)) {
		        callback.call(thisArg, this.map[name], name, this)
		      }
		    }
		  }

		  Headers.prototype.keys = function() {
		    var items = []
		    this.forEach(function(value, name) { items.push(name) })
		    return iteratorFor(items)
		  }

		  Headers.prototype.values = function() {
		    var items = []
		    this.forEach(function(value) { items.push(value) })
		    return iteratorFor(items)
		  }

		  Headers.prototype.entries = function() {
		    var items = []
		    this.forEach(function(value, name) { items.push([name, value]) })
		    return iteratorFor(items)
		  }

		  if (support.iterable) {
		    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
		  }

		  function consumed(body) {
		    if (body.bodyUsed) {
		      return Promise.reject(new TypeError('Already read'))
		    }
		    body.bodyUsed = true
		  }

		  function fileReaderReady(reader) {
		    return new Promise(function(resolve, reject) {
		      reader.onload = function() {
		        resolve(reader.result)
		      }
		      reader.onerror = function() {
		        reject(reader.error)
		      }
		    })
		  }

		  function readBlobAsArrayBuffer(blob) {
		    var reader = new FileReader()
		    var promise = fileReaderReady(reader)
		    reader.readAsArrayBuffer(blob)
		    return promise
		  }

		  function readBlobAsText(blob) {
		    var reader = new FileReader()
		    var promise = fileReaderReady(reader)
		    reader.readAsText(blob)
		    return promise
		  }

		  function readArrayBufferAsText(buf) {
		    var view = new Uint8Array(buf)
		    var chars = new Array(view.length)

		    for (var i = 0; i < view.length; i++) {
		      chars[i] = String.fromCharCode(view[i])
		    }
		    return chars.join('')
		  }

		  function bufferClone(buf) {
		    if (buf.slice) {
		      return buf.slice(0)
		    } else {
		      var view = new Uint8Array(buf.byteLength)
		      view.set(new Uint8Array(buf))
		      return view.buffer
		    }
		  }

		  function Body() {
		    this.bodyUsed = false

		    this._initBody = function(body) {
		      this._bodyInit = body
		      if (!body) {
		        this._bodyText = ''
		      } else if (typeof body === 'string') {
		        this._bodyText = body
		      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
		        this._bodyBlob = body
		      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
		        this._bodyFormData = body
		      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
		        this._bodyText = body.toString()
		      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
		        this._bodyArrayBuffer = bufferClone(body.buffer)
		        // IE 10-11 can't handle a DataView body.
		        this._bodyInit = new Blob([this._bodyArrayBuffer])
		      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
		        this._bodyArrayBuffer = bufferClone(body)
		      } else {
		        throw new Error('unsupported BodyInit type')
		      }

		      if (!this.headers.get('content-type')) {
		        if (typeof body === 'string') {
		          this.headers.set('content-type', 'text/plain;charset=UTF-8')
		        } else if (this._bodyBlob && this._bodyBlob.type) {
		          this.headers.set('content-type', this._bodyBlob.type)
		        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
		          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
		        }
		      }
		    }

		    if (support.blob) {
		      this.blob = function() {
		        var rejected = consumed(this)
		        if (rejected) {
		          return rejected
		        }

		        if (this._bodyBlob) {
		          return Promise.resolve(this._bodyBlob)
		        } else if (this._bodyArrayBuffer) {
		          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
		        } else if (this._bodyFormData) {
		          throw new Error('could not read FormData body as blob')
		        } else {
		          return Promise.resolve(new Blob([this._bodyText]))
		        }
		      }

		      this.arrayBuffer = function() {
		        if (this._bodyArrayBuffer) {
		          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
		        } else {
		          return this.blob().then(readBlobAsArrayBuffer)
		        }
		      }
		    }

		    this.text = function() {
		      var rejected = consumed(this)
		      if (rejected) {
		        return rejected
		      }

		      if (this._bodyBlob) {
		        return readBlobAsText(this._bodyBlob)
		      } else if (this._bodyArrayBuffer) {
		        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
		      } else if (this._bodyFormData) {
		        throw new Error('could not read FormData body as text')
		      } else {
		        return Promise.resolve(this._bodyText)
		      }
		    }

		    if (support.formData) {
		      this.formData = function() {
		        return this.text().then(decode)
		      }
		    }

		    this.json = function() {
		      return this.text().then(JSON.parse)
		    }

		    return this
		  }

		  // HTTP methods whose capitalization should be normalized
		  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

		  function normalizeMethod(method) {
		    var upcased = method.toUpperCase()
		    return (methods.indexOf(upcased) > -1) ? upcased : method
		  }

		  function Request(input, options) {
		    options = options || {}
		    var body = options.body

		    if (typeof input === 'string') {
		      this.url = input
		    } else {
		      if (input.bodyUsed) {
		        throw new TypeError('Already read')
		      }
		      this.url = input.url
		      this.credentials = input.credentials
		      if (!options.headers) {
		        this.headers = new Headers(input.headers)
		      }
		      this.method = input.method
		      this.mode = input.mode
		      if (!body && input._bodyInit != null) {
		        body = input._bodyInit
		        input.bodyUsed = true
		      }
		    }

		    this.credentials = options.credentials || this.credentials || 'omit'
		    if (options.headers || !this.headers) {
		      this.headers = new Headers(options.headers)
		    }
		    this.method = normalizeMethod(options.method || this.method || 'GET')
		    this.mode = options.mode || this.mode || null
		    this.referrer = null

		    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
		      throw new TypeError('Body not allowed for GET or HEAD requests')
		    }
		    this._initBody(body)
		  }

		  Request.prototype.clone = function() {
		    return new Request(this, { body: this._bodyInit })
		  }

		  function decode(body) {
		    var form = new FormData()
		    body.trim().split('&').forEach(function(bytes) {
		      if (bytes) {
		        var split = bytes.split('=')
		        var name = split.shift().replace(/\+/g, ' ')
		        var value = split.join('=').replace(/\+/g, ' ')
		        form.append(decodeURIComponent(name), decodeURIComponent(value))
		      }
		    })
		    return form
		  }

		  function parseHeaders(rawHeaders) {
		    var headers = new Headers()
		    rawHeaders.split('\r\n').forEach(function(line) {
		      var parts = line.split(':')
		      var key = parts.shift().trim()
		      if (key) {
		        var value = parts.join(':').trim()
		        headers.append(key, value)
		      }
		    })
		    return headers
		  }

		  Body.call(Request.prototype)

		  function Response(bodyInit, options) {
		    if (!options) {
		      options = {}
		    }

		    this.type = 'default'
		    this.status = 'status' in options ? options.status : 200
		    this.ok = this.status >= 200 && this.status < 300
		    this.statusText = 'statusText' in options ? options.statusText : 'OK'
		    this.headers = new Headers(options.headers)
		    this.url = options.url || ''
		    this._initBody(bodyInit)
		  }

		  Body.call(Response.prototype)

		  Response.prototype.clone = function() {
		    return new Response(this._bodyInit, {
		      status: this.status,
		      statusText: this.statusText,
		      headers: new Headers(this.headers),
		      url: this.url
		    })
		  }

		  Response.error = function() {
		    var response = new Response(null, {status: 0, statusText: ''})
		    response.type = 'error'
		    return response
		  }

		  var redirectStatuses = [301, 302, 303, 307, 308]

		  Response.redirect = function(url, status) {
		    if (redirectStatuses.indexOf(status) === -1) {
		      throw new RangeError('Invalid status code')
		    }

		    return new Response(null, {status: status, headers: {location: url}})
		  }

		  self.Headers = Headers
		  self.Request = Request
		  self.Response = Response

		  self.fetch = function(input, init) {
		    return new Promise(function(resolve, reject) {
		      var request = new Request(input, init)
		      var xhr = new XMLHttpRequest()

		      xhr.onload = function() {
		        var options = {
		          status: xhr.status,
		          statusText: xhr.statusText,
		          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
		        }
		        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
		        var body = 'response' in xhr ? xhr.response : xhr.responseText
		        resolve(new Response(body, options))
		      }

		      xhr.onerror = function() {
		        reject(new TypeError('Network request failed'))
		      }

		      xhr.ontimeout = function() {
		        reject(new TypeError('Network request failed'))
		      }

		      xhr.open(request.method, request.url, true)

		      if (request.credentials === 'include') {
		        xhr.withCredentials = true
		      }

		      if ('responseType' in xhr && support.blob) {
		        xhr.responseType = 'blob'
		      }

		      request.headers.forEach(function(value, name) {
		        xhr.setRequestHeader(name, value)
		      })

		      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
		    })
		  }
		  self.fetch.polyfill = true
		})(typeof self !== 'undefined' ? self : this);


	/***/ },
	/* 45 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(__filename, process) {'use strict'
		var fs = __webpack_require__(22)
		var chain = __webpack_require__(34).chain
		var MurmurHash3 = __webpack_require__(26)
		var extend = Object.assign || __webpack_require__(10)._extend

		function murmurhex () {
		  var hash = new MurmurHash3()
		  for (var ii = 0; ii < arguments.length; ++ii) hash.hash('' + arguments[ii])
		  return hash.result()
		}
		var invocations = 0
		var getTmpname = function (filename) {
		  return filename + '.' + murmurhex(__filename, process.pid, ++invocations)
		}

		module.exports = function writeFile (filename, data, options, callback) {
		  if (options instanceof Function) {
		    callback = options
		    options = null
		  }
		  if (!options) options = {}
		  var tmpfile = getTmpname(filename)

		  if (options.mode && options.chmod) {
		    return thenWriteFile()
		  } else {
		    // Either mode or chown is not explicitly set
		    // Default behavior is to copy it from original file
		    return fs.stat(filename, function (err, stats) {
		      options = extend({}, options)
		      if (!err && stats && !options.mode) {
		        options.mode = stats.mode
		      }
		      if (!err && stats && !options.chown && process.getuid) {
		        options.chown = { uid: stats.uid, gid: stats.gid }
		      }
		      return thenWriteFile()
		    })
		  }

		  function thenWriteFile () {
		    chain([
		      [fs, fs.writeFile, tmpfile, data, options.encoding || 'utf8'],
		      options.mode && [fs, fs.chmod, tmpfile, options.mode],
		      options.chown && [fs, fs.chown, tmpfile, options.chown.uid, options.chown.gid],
		      [fs, fs.rename, tmpfile, filename]
		    ], function (err) {
		      err ? fs.unlink(tmpfile, function () { callback(err) })
		        : callback()
		    })
		  }
		}

		module.exports.sync = function writeFileSync (filename, data, options) {
		  if (!options) options = {}
		  var tmpfile = getTmpname(filename)

		  try {
		    if (!options.mode || !options.chmod) {
		      // Either mode or chown is not explicitly set
		      // Default behavior is to copy it from original file
		      try {
		        var stats = fs.statSync(filename)

		        options = extend({}, options)
		        if (!options.mode) {
		          options.mode = stats.mode
		        }
		        if (!options.chown && process.getuid) {
		          options.chown = { uid: stats.uid, gid: stats.gid }
		        }
		      } catch (ex) {
		        // ignore stat errors
		      }
		    }

		    fs.writeFileSync(tmpfile, data, options.encoding || 'utf8')
		    if (options.chown) fs.chownSync(tmpfile, options.chown.uid, options.chown.gid)
		    if (options.mode) fs.chmodSync(tmpfile, options.mode)
		    fs.renameSync(tmpfile, filename)
		  } catch (err) {
		    try { fs.unlinkSync(tmpfile) } catch (e) {}
		    throw err
		  }
		}

		/* WEBPACK VAR INJECTION */}.call(exports, "/index.js", __webpack_require__(1)))

	/***/ },
	/* 46 */
	/***/ function(module, exports) {

		/* (ignored) */

	/***/ },
	/* 47 */
	/***/ function(module, exports) {

		/* (ignored) */

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object),
	    nativeMax = Math.max;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

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
	  return !!value && (type == 'object' || type == 'function');
	}

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
	  return !!value && typeof value == 'object';
	}

	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = assign;


/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ])
});
;