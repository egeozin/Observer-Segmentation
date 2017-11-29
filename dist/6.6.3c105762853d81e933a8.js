webpackJsonp([6],{

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(315);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
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

/***/ },

/***/ 535:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _reactRedux = __webpack_require__(360);
	
	var _zen = __webpack_require__(536);
	
	var _Zen = __webpack_require__(537);
	
	var _Zen2 = _interopRequireDefault(_Zen);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapActionCreators = {
		fetchZen: _zen.fetchZen,
		saveCurrentZen: _zen.saveCurrentZen
	};
	
	var mapStateToProps = function mapStateToProps(state) {
		return {
			zen: state.zen.zens.find(function (zen) {
				return zen.id === state.zen.current;
			}),
			saved: state.zen.zens.filter(function (zen) {
				return state.zen.saved.indexOf(zen.id) !== -1;
			})
		};
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapActionCreators)(_Zen2.default);

/***/ },

/***/ 536:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.actions = exports.fetchZen = exports.SAVE_CURRENT_ZEN = exports.RECEIVE_ZEN = exports.REQUEST_ZEN = undefined;
	
	var _defineProperty2 = __webpack_require__(408);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends2 = __webpack_require__(284);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _ZEN_ACTION_HANDLERS;
	
	exports.requestZen = requestZen;
	exports.receiveZen = receiveZen;
	exports.saveCurrentZen = saveCurrentZen;
	exports.default = zenReducer;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Constants
	
	var REQUEST_ZEN = exports.REQUEST_ZEN = 'REQUEST_ZEN';
	var RECEIVE_ZEN = exports.RECEIVE_ZEN = 'RECEIVE_ZEN';
	var SAVE_CURRENT_ZEN = exports.SAVE_CURRENT_ZEN = 'SAVE_CURRENT_ZEN';
	
	// Actions
	
	function requestZen() {
		return {
			type: REQUEST_ZEN
		};
	}
	
	var availableId = 0;
	function receiveZen(value) {
		return {
			type: RECEIVE_ZEN,
			payload: {
				value: value,
				id: availableId++
			}
		};
	}
	
	function saveCurrentZen() {
		return {
			type: SAVE_CURRENT_ZEN
		};
	}
	
	var fetchZen = exports.fetchZen = function fetchZen() {
		return function (dispatch) {
			dispatch(requestZen());
	
			return fetch('https://api.github.com/zen').then(function (data) {
				return data.text();
			}).then(function (text) {
				return dispatch(receiveZen(text));
			});
		};
	};
	
	var actions = exports.actions = {
		requestZen: requestZen,
		receiveZen: receiveZen,
		fetchZen: fetchZen,
		saveCurrentZen: saveCurrentZen
	};
	
	// ACTION HANDLERS
	
	var ZEN_ACTION_HANDLERS = (_ZEN_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ZEN_ACTION_HANDLERS, REQUEST_ZEN, function (state) {
		return (0, _extends3.default)({}, state, { fetching: true });
	}), (0, _defineProperty3.default)(_ZEN_ACTION_HANDLERS, RECEIVE_ZEN, function (state, action) {
		return (0, _extends3.default)({}, state, { zens: state.zens.concat(action.payload), current: action.payload.id, fetching: false });
	}), (0, _defineProperty3.default)(_ZEN_ACTION_HANDLERS, SAVE_CURRENT_ZEN, function (state) {
		return state.current != null ? (0, _extends3.default)({}, state, { saved: state.saved.concat(state.current) }) : state;
	}), _ZEN_ACTION_HANDLERS);
	
	// Reducer
	
	var initialState = { fetching: false, current: null, zens: [], saved: [] };
	function zenReducer() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];
	
		var handler = ZEN_ACTION_HANDLERS[action.type];
	
		return handler ? handler(state, action) : state;
	}

/***/ },

/***/ 537:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Zen = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(538);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Zen = exports.Zen = function Zen(props) {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					{ className: 'ZenHeader' },
					props.zen ? props.zen.value : ''
				),
				_react2.default.createElement(
					'button',
					{ className: 'btn btn-default', onClick: props.fetchZen },
					'Fetch a wisdom'
				),
				' ',
				_react2.default.createElement(
					'button',
					{ className: 'btn btn-default', onClick: props.saveCurrentZen },
					'Save'
				)
			),
			props.saved.length ? _react2.default.createElement(
				'div',
				{ className: 'savedWisdoms' },
				_react2.default.createElement(
					'h3',
					null,
					'Saved wisdoms'
				),
				_react2.default.createElement(
					'ul',
					null,
					props.saved.map(function (zen) {
						return _react2.default.createElement(
							'li',
							{ key: zen.id },
							zen.value
						);
					})
				)
			) : null
		);
	};
	
	Zen.propTypes = {
		zen: _react2.default.PropTypes.object,
		saved: _react2.default.PropTypes.array.isRequired,
		fetchZen: _react2.default.PropTypes.func.isRequired,
		saveCurrentZen: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = Zen;

/***/ },

/***/ 538:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(539);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(383)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(539, function() {
				var newContent = __webpack_require__(539);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 539:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(382)();
	// imports
	
	
	// module
	exports.push([module.id, ".savedWisdoms{margin-top:4rem;color:red}.savedWisdoms>ul{padding:0;list-style:none;font-style:italic;color:green}", "", {"version":3,"sources":["/./src/routes/Zen/components/src/routes/Zen/components/Zen.scss"],"names":[],"mappings":"AAAA,cACC,gBAAgB,SACP,CAFV,iBAKE,UAAU,gBACK,kBACE,WAElB,CAAE","file":"Zen.scss","sourcesContent":[".savedWisdoms {\n\tmargin-top: 4rem;\n\tcolor:red;\n\n\t> ul {\n\t\tpadding: 0;\n\t\tlist-style:none;\n\t\tfont-style:italic;\n\t\tcolor:green\n\t}\n}"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }

});
//# sourceMappingURL=6.6.3c105762853d81e933a8.js.map