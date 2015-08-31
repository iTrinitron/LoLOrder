(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var alt = require('../alt');

var HomeActions = (function () {
  function HomeActions() {
    _classCallCheck(this, HomeActions);

    this.generateActions('getBuildListSuccess'); //Creates a default this.dispatch() version
    this.generateActions('getItemListSuccess');
    this.generateActions('getChampionListSuccess');
    this.generateActions('selectItemSuccess');
    this.generateActions('setChampIdSuccess');
    this.generateActions('delItemSuccess');
    this.generateActions('setVersionSuccess');
  }

  _createClass(HomeActions, [{
    key: 'selectItem',
    value: function selectItem(item_id, i) {
      var data = {
        "itemId": item_id,
        "i": i
      };
      this.actions.selectItemSuccess(data);
    }
  }, {
    key: 'setChampId',
    value: function setChampId(champId) {
      this.actions.setChampIdSuccess(champId);
    }
  }, {
    key: 'delItem',
    value: function delItem(itemIndex) {
      this.actions.delItemSuccess(itemIndex);
    }
  }, {
    key: 'setVersion',
    value: function setVersion(version) {
      this.actions.setVersionSuccess(version);
    }
  }, {
    key: 'getBuildList',
    value: function getBuildList(version, champId, itemHash) {
      var _this = this;

      version = version.replace(/\./g, "-");
      console.log('/api/' + version + "/" + champId + "/" + itemHash);
      $.ajax({
        type: 'GET',
        url: '/api/' + version + "/" + champId + "/" + itemHash
      }).done(function (data) {
        _this.actions.getBuildListSuccess(data);
      }).fail(function (jqXhr) {
        //
      });
    }
  }, {
    key: 'getItemList',
    value: function getItemList() {
      var _this2 = this;

      $.ajax({
        type: 'GET',
        url: '/api/items'
      }).done(function (data) {
        _this2.actions.getItemListSuccess(data);
      }).fail(function (jqXhr) {
        //
      });
    }
  }, {
    key: 'getChampionList',
    value: function getChampionList() {
      var _this3 = this;

      $.ajax({
        type: 'GET',
        url: '/api/champs'
      }).done(function (data) {
        _this3.actions.getChampionListSuccess(data);
      }).fail(function (jqXhr) {
        //
      });
    }
  }]);

  return HomeActions;
})();

module.exports = alt.createActions(HomeActions);

},{"../alt":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

exports['default'] = new _alt2['default']();
module.exports = exports['default'];

},{"alt":"alt"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_reactRouter.RouteHandler, null)
      );
    }
  }]);

  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];

},{"react":"react","react-router":"react-router"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var _altUtilsConnectToStores = require('alt/utils/connectToStores');

var _altUtilsConnectToStores2 = _interopRequireDefault(_altUtilsConnectToStores);

var _storesHomeStore = require('../stores/HomeStore');

var _storesHomeStore2 = _interopRequireDefault(_storesHomeStore);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var BuildStatRow = (function (_React$Component) {
	_inherits(BuildStatRow, _React$Component);

	function BuildStatRow() {
		_classCallCheck(this, BuildStatRow);

		_get(Object.getPrototypeOf(BuildStatRow.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(BuildStatRow, [{
		key: 'render',
		value: function render() {
			console.log(this.props.build);
			return _react2['default'].createElement(
				'div',
				{ className: 'buildStatRow' },
				this.props.build.kills
			);
		}
	}]);

	return BuildStatRow;
})(_react2['default'].Component);

var BuildStatList = (function (_React$Component2) {
	_inherits(BuildStatList, _React$Component2);

	function BuildStatList() {
		_classCallCheck(this, BuildStatList);

		_get(Object.getPrototypeOf(BuildStatList.prototype), 'constructor', this).apply(this, arguments);
	}

	/*
  * ITEM BUILD AT TOP
  */

	_createClass(BuildStatList, [{
		key: 'render',
		value: function render() {
			console.log(this.props.buildList);

			return _react2['default'].createElement('div', { className: 'buildStatList' });
		}
	}]);

	return BuildStatList;
})(_react2['default'].Component);

var Item = (function (_React$Component3) {
	_inherits(Item, _React$Component3);

	function Item(props) {
		_classCallCheck(this, Item);

		_get(Object.getPrototypeOf(Item.prototype), 'constructor', this).call(this, props);
		this.handleClick = this.handleClick.bind(this);
	}

	_createClass(Item, [{
		key: 'handleClick',
		value: function handleClick(itemIndex) {
			if (this.props.itemNum >= itemIndex) {
				this.props.delItem(itemIndex);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var imgSrc = "img/EmptyIcon.png";
			if (this.props.itemId > 0) {
				imgSrc = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/" + this.props.itemId + ".png";
			}
			return _react2['default'].createElement(
				'div',
				{ className: 'item' },
				_react2['default'].createElement(
					'div',
					{ className: 'item-label' },
					'Item ',
					this.props.i + 1
				),
				_react2['default'].createElement('img', { className: 'img', onClick: this.handleClick.bind(this, this.props.i), src: imgSrc })
			);
		}
	}]);

	return Item;
})(_react2['default'].Component);

var ItemBuild = (function (_React$Component4) {
	_inherits(ItemBuild, _React$Component4);

	function ItemBuild() {
		_classCallCheck(this, ItemBuild);

		_get(Object.getPrototypeOf(ItemBuild.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ItemBuild, [{
		key: 'render',
		value: function render() {
			var _this = this;

			return _react2['default'].createElement(
				'div',
				{ className: 'item-build-list' },
				this.props.userBuild.map(function (itemId, i) {
					return _react2['default'].createElement(Item, { itemNum: _this.props.itemNum, itemId: itemId, delItem: _this.props.delItem, i: i });
				}),
				_react2['default'].createElement('div', { className: 'clear' })
			);
		}
	}]);

	return ItemBuild;
})(_react2['default'].Component);

var ChampSelect = (function (_React$Component5) {
	_inherits(ChampSelect, _React$Component5);

	function ChampSelect(props) {
		_classCallCheck(this, ChampSelect);

		_get(Object.getPrototypeOf(ChampSelect.prototype), 'constructor', this).call(this, props);
		this.handleClick = this.handleClick.bind(this);
	}

	_createClass(ChampSelect, [{
		key: 'handleClick',
		value: function handleClick(champId) {
			this.props.setChamp(champId);
			this.props.toggleSelect();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var classes = (0, _classnames2['default'])({
				'champSelect': true,
				'hidden': this.props.vis
			});
			return _react2['default'].createElement(
				'div',
				{ className: classes },
				this.props.champList.map(function (champName, i) {
					var imgSrc = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/champion/" + champName + ".png";
					return _react2['default'].createElement(
						'div',
						null,
						_react2['default'].createElement('img', { onClick: _this2.handleClick.bind(_this2, i), src: imgSrc })
					);
				})
			);
		}
	}]);

	return ChampSelect;
})(_react2['default'].Component);

var Champion = (function (_React$Component6) {
	_inherits(Champion, _React$Component6);

	function Champion(props) {
		_classCallCheck(this, Champion);

		_get(Object.getPrototypeOf(Champion.prototype), 'constructor', this).call(this, props);
		this.toggleSelect = this.toggleSelect.bind(this);
		this.state = { champSelectVis: true };
	}

	_createClass(Champion, [{
		key: 'toggleSelect',
		value: function toggleSelect() {
			this.setState({ champSelectVis: !this.state.champSelectVis });
		}
	}, {
		key: 'render',
		value: function render() {
			var champImg = "img/ChampionSquare.png";
			if (this.props.champId > 0) {
				var champName = this.props.champList[this.props.champId];
				champImg = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/champion/" + champName + ".png";
			}
			return _react2['default'].createElement(
				'div',
				{ className: 'item' },
				_react2['default'].createElement(
					'div',
					{ className: 'item-label' },
					'Champion'
				),
				_react2['default'].createElement('img', { className: 'img', onClick: this.toggleSelect.bind(this), src: champImg }),
				_react2['default'].createElement(ChampSelect, { toggleSelect: this.toggleSelect, vis: this.state.champSelectVis, setChamp: this.props.setChamp, champList: this.props.champList })
			);
		}
	}]);

	return Champion;
})(_react2['default'].Component);

var UserData = (function (_React$Component7) {
	_inherits(UserData, _React$Component7);

	function UserData() {
		_classCallCheck(this, UserData);

		_get(Object.getPrototypeOf(UserData.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(UserData, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'item-build' },
				_react2['default'].createElement(Champion, { setChamp: this.props.setChamp, champId: this.props.champId, champList: this.props.champList }),
				_react2['default'].createElement(ItemBuild, { itemNum: this.props.itemNum, delItem: this.props.delItem, userBuild: this.props.userBuild })
			);
		}
	}]);

	return UserData;
})(_react2['default'].Component);

var UserStats = (function (_React$Component8) {
	_inherits(UserStats, _React$Component8);

	function UserStats() {
		_classCallCheck(this, UserStats);

		_get(Object.getPrototypeOf(UserStats.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(UserStats, [{
		key: 'render',
		value: function render() {
			console.log(this.props);
			return _react2['default'].createElement(
				'div',
				{ className: 'userStats' },
				_react2['default'].createElement(
					'div',
					{ className: 'head' },
					_react2['default'].createElement('div', { className: 'name' }),
					_react2['default'].createElement(
						'div',
						null,
						'Gold'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Kills'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Deaths'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Assists'
					),
					_react2['default'].createElement(
						'div',
						null,
						'CS'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Win %'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Game'
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'row' },
					_react2['default'].createElement(
						'div',
						{ className: 'name' },
						'Current Stats Per Min'
					),
					_react2['default'].createElement(
						'div',
						null,
						this.props.userStats[this.props.itemNum].gold.toFixed(2)
					),
					_react2['default'].createElement(
						'div',
						null,
						this.props.userStats[this.props.itemNum].kills.toFixed(2)
					),
					_react2['default'].createElement(
						'div',
						null,
						this.props.userStats[this.props.itemNum].deaths.toFixed(2)
					),
					_react2['default'].createElement(
						'div',
						null,
						this.props.userStats[this.props.itemNum].assists.toFixed(2)
					),
					_react2['default'].createElement(
						'div',
						null,
						this.props.userStats[this.props.itemNum].cs.toFixed(2)
					),
					_react2['default'].createElement(
						'div',
						null,
						Math.round(this.props.userStats[this.props.itemNum].win * 100),
						'%'
					),
					_react2['default'].createElement(
						'div',
						null,
						Math.floor(this.props.userStats[this.props.itemNum].time / 60),
						' min'
					),
					_react2['default'].createElement('div', { className: 'clear' })
				)
			);
		}
	}]);

	return UserStats;
})(_react2['default'].Component);

var Header = (function (_React$Component9) {
	_inherits(Header, _React$Component9);

	function Header(props) {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this, props);
		this.handleClick = this.handleClick.bind(this);
		this.state = { version: true };
	}

	_createClass(Header, [{
		key: 'handleClick',
		value: function handleClick(itemId) {
			this.setState({ version: !this.state.version });
			this.props.setVersion(this.state.version ? "5.14" : "5.11");
		}
	}, {
		key: 'render',
		value: function render() {
			var one = (0, _classnames2['default'])({
				'unset': !this.state.version
			});
			var two = (0, _classnames2['default'])({
				'unset': this.state.version
			});
			return _react2['default'].createElement(
				'div',
				{ className: 'header' },
				_react2['default'].createElement(
					'div',
					{ className: 'container' },
					_react2['default'].createElement(
						'div',
						{ className: 'title' },
						_react2['default'].createElement(
							'span',
							{ className: 'color-white' },
							'LoL'
						),
						'Order'
					),
					_react2['default'].createElement(
						'div',
						{ className: 'version', onClick: this.handleClick },
						_react2['default'].createElement(
							'span',
							{ className: one },
							'5.11'
						),
						' - ',
						_react2['default'].createElement(
							'span',
							{ className: two },
							'5.14'
						)
					),
					_react2['default'].createElement(UserData, { itemNum: this.props.itemNum, setChamp: this.props.setChamp, delItem: this.props.delItem, userBuild: this.props.userBuild, champList: this.props.champList, champId: this.props.champId }),
					_react2['default'].createElement(UserStats, { itemNum: this.props.itemNum, userStats: this.props.userStats })
				)
			);
		}
	}]);

	return Header;
})(_react2['default'].Component);

var ItemListNode = (function (_React$Component10) {
	_inherits(ItemListNode, _React$Component10);

	function ItemListNode(props) {
		_classCallCheck(this, ItemListNode);

		_get(Object.getPrototypeOf(ItemListNode.prototype), 'constructor', this).call(this, props);
		this.handleClick = this.handleClick.bind(this);
	}

	_createClass(ItemListNode, [{
		key: 'handleClick',
		value: function handleClick(itemId, i) {
			this.props.addItem(itemId, i);
		}
	}, {
		key: 'getNumber',
		value: function getNumber(theNumber) {
			if (theNumber > 0) {
				return "+" + theNumber.toFixed(2);
			} else {
				return theNumber.toFixed(2);
			}
		}
	}, {
		key: 'getNumberH',
		value: function getNumberH(theNumber) {
			if (theNumber > 0) {
				return "+" + theNumber;
			} else {
				return theNumber;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var classes = (0, _classnames2['default'])({
				'item': true,
				'alt': this.props.i % 2 == 0
			});
			var diff = {
				'gold': this.props.itemData.gold - this.props.userStats[this.props.itemNum].gold,
				'kills': this.props.itemData.kills - this.props.userStats[this.props.itemNum].kills,
				'deaths': this.props.itemData.deaths - this.props.userStats[this.props.itemNum].deaths,
				'assists': this.props.itemData.assists - this.props.userStats[this.props.itemNum].assists,
				'cs': this.props.itemData.cs - this.props.userStats[this.props.itemNum].cs,
				'win': Math.round((this.props.itemData.won_game - this.props.userStats[this.props.itemNum].win) * 100),
				'time': Math.floor((this.props.itemData.end_game_time - this.props.userStats[this.props.itemNum].time) / 60)
			};

			var diffClasses = {
				'gold': (0, _classnames2['default'])({
					'color-green': diff.gold > 0,
					'color-red': diff.gold < 0
				}),
				'kills': (0, _classnames2['default'])({
					'color-green': diff.kills > 0,
					'color-red': diff.kills < 0
				}),
				'deaths': (0, _classnames2['default'])({
					'color-green': diff.deaths > 0,
					'color-red': diff.deaths < 0
				}),
				'assists': (0, _classnames2['default'])({
					'color-green': diff.assists > 0,
					'color-red': diff.assists < 0
				}),
				'cs': (0, _classnames2['default'])({
					'color-green': diff.cs > 0,
					'color-red': diff.cs < 0
				}),
				'win': (0, _classnames2['default'])({
					'color-green': diff.win > 0,
					'color-red': diff.win < 0
				}),
				'time': (0, _classnames2['default'])({
					'color-green': diff.time > 0,
					'color-red': diff.time < 0
				})
			};

			var imgSrc = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/" + this.props.itemData.item_id + ".png";
			return _react2['default'].createElement(
				'div',
				{ className: classes, onClick: this.handleClick.bind(this, this.props.itemData.item_id, this.props.i) },
				_react2['default'].createElement(
					'div',
					{ className: 'item-icon' },
					_react2['default'].createElement('img', { className: 'img', src: imgSrc })
				),
				_react2['default'].createElement(
					'div',
					{ className: 'name' },
					this.props.itemList[this.props.itemData.item_id]
				),
				_react2['default'].createElement(
					'div',
					{ className: diffClasses.gold },
					this.getNumber(diff.gold)
				),
				_react2['default'].createElement(
					'div',
					{ className: diffClasses.kills },
					this.getNumber(diff.kills)
				),
				_react2['default'].createElement(
					'div',
					{ className: diffClasses.deaths },
					this.getNumber(diff.deaths)
				),
				_react2['default'].createElement(
					'div',
					{ className: diffClasses.assists },
					this.getNumber(diff.assists)
				),
				_react2['default'].createElement(
					'div',
					{ className: diffClasses.cs },
					this.getNumber(diff.cs)
				),
				_react2['default'].createElement(
					'div',
					{ className: diffClasses.win },
					this.getNumberH(diff.win),
					'%'
				),
				_react2['default'].createElement(
					'div',
					{ className: diffClasses.time },
					this.getNumberH(diff.time),
					' min'
				)
			);
		}
	}]);

	return ItemListNode;
})(_react2['default'].Component);

var ItemList = (function (_React$Component11) {
	_inherits(ItemList, _React$Component11);

	function ItemList() {
		_classCallCheck(this, ItemList);

		_get(Object.getPrototypeOf(ItemList.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ItemList, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			if (this.props.buildList.length > 0) {
				return _react2['default'].createElement(
					'div',
					{ className: 'item-list' },
					this.props.buildList.map(function (itemObj, i) {
						var itemName = _this3.props.itemList[itemObj.item_id];
						return _react2['default'].createElement(ItemListNode, _extends({ itemNum: _this3.props.itemNum, userStats: _this3.props.userStats }, _this3.props, { addItem: _this3.props.addItem, itemData: itemObj, i: i }));
					})
				);
			} else {
				return _react2['default'].createElement(
					'div',
					null,
					'Whoops! No further data available for this build.'
				);
			}
		}
	}]);

	return ItemList;
})(_react2['default'].Component);

var ItemBuildList = (function (_React$Component12) {
	_inherits(ItemBuildList, _React$Component12);

	function ItemBuildList() {
		_classCallCheck(this, ItemBuildList);

		_get(Object.getPrototypeOf(ItemBuildList.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ItemBuildList, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'item-build-list' },
				_react2['default'].createElement(
					'div',
					{ className: 'headers' },
					_react2['default'].createElement('div', { className: 'item-icon' }),
					_react2['default'].createElement(
						'div',
						{ className: 'name' },
						'Name'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Gold'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Kills'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Deaths'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Assists'
					),
					_react2['default'].createElement(
						'div',
						null,
						'CS'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Win %'
					),
					_react2['default'].createElement(
						'div',
						null,
						'Duration'
					)
				),
				_react2['default'].createElement(ItemList, { itemNum: this.props.itemNum, userStats: this.props.userStats, buildList: this.props.buildList, itemList: this.props.itemList, addItem: this.props.addItem })
			);
		}
	}]);

	return ItemBuildList;
})(_react2['default'].Component);

var Content = (function (_React$Component13) {
	_inherits(Content, _React$Component13);

	function Content() {
		_classCallCheck(this, Content);

		_get(Object.getPrototypeOf(Content.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Content, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'content' },
				_react2['default'].createElement(ItemBuildList, { itemNum: this.props.itemNum, userStats: this.props.userStats, buildList: this.props.buildList, itemList: this.props.itemList, addItem: this.props.addItem }),
				_react2['default'].createElement(Footer, null)
			);
		}
	}]);

	return Content;
})(_react2['default'].Component);

var Footer = (function (_React$Component14) {
	_inherits(Footer, _React$Component14);

	function Footer() {
		_classCallCheck(this, Footer);

		_get(Object.getPrototypeOf(Footer.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Footer, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'footer' },
				_react2['default'].createElement(
					'div',
					{ className: 'container' },
					_react2['default'].createElement(
						'div',
						{ className: 'tag' },
						_react2['default'].createElement(
							'span',
							{ className: 'color-white' },
							'Riot API Contest 2.0 Submission'
						)
					),
					_react2['default'].createElement(
						'div',
						{ className: 'name' },
						_react2['default'].createElement(
							'span',
							{ className: 'color-white' },
							'Michael C'
						)
					)
				)
			);
		}
	}]);

	return Footer;
})(_react2['default'].Component);

var Home = (function (_React$Component15) {
	_inherits(Home, _React$Component15);

	function Home(props) {
		_classCallCheck(this, _Home);

		_get(Object.getPrototypeOf(_Home.prototype), 'constructor', this).call(this, props);
		this.addItem = this.addItem.bind(this);
		this.delItem = this.delItem.bind(this);
	}

	_createClass(Home, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			_actionsHomeActions2['default'].getBuildList(this.props.gameV, this.props.champId, this.props.itemHash);
			_actionsHomeActions2['default'].getItemList();
			_actionsHomeActions2['default'].getChampionList();
		}
	}, {
		key: 'delItem',
		value: function delItem(itemIndex) {
			_actionsHomeActions2['default'].delItem(itemIndex);
		}
	}, {
		key: 'addItem',
		value: function addItem(itemId, i) {
			console.log(itemId, i);
			_actionsHomeActions2['default'].selectItem(itemId, i);
		}
	}, {
		key: 'setChamp',
		value: function setChamp(champId) {
			_actionsHomeActions2['default'].setChampId(champId);
		}
	}, {
		key: 'setVersion',
		value: function setVersion(version) {
			_actionsHomeActions2['default'].setVersion(version);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'Home' },
				_react2['default'].createElement(Header, { itemNum: this.props.itemNum, userStats: this.props.userStats, setVersion: this.setVersion, setChamp: this.setChamp, delItem: this.delItem, userBuild: this.props.userBuild, champList: this.props.champList, champId: this.props.champId }),
				_react2['default'].createElement(Content, { itemNum: this.props.itemNum, userStats: this.props.userStats, addItem: this.addItem, itemList: this.props.itemList, buildList: this.props.buildList })
			);
		}
	}], [{
		key: 'getStores',
		value: function getStores() {
			return [_storesHomeStore2['default']];
		}
	}, {
		key: 'getPropsFromStores',
		value: function getPropsFromStores() {
			return _storesHomeStore2['default'].getState();
		}
	}]);

	var _Home = Home;
	Home = (0, _altUtilsConnectToStores2['default'])(Home) || Home;
	return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];

},{"../actions/HomeActions":1,"../stores/HomeStore":7,"alt/utils/connectToStores":8,"classnames":"classnames","react":"react"}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Handler) {
  _react2['default'].render(_react2['default'].createElement(Handler, null), document.getElementById('app'));
});

},{"./routes":6,"react":"react","react-router":"react-router"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsHome = require('./components/Home');

var _componentsHome2 = _interopRequireDefault(_componentsHome);

exports['default'] = _react2['default'].createElement(
  _reactRouter.Route,
  { handler: _componentsApp2['default'] },
  _react2['default'].createElement(_reactRouter.Route, { path: '/', handler: _componentsHome2['default'] })
);
module.exports = exports['default'];

},{"./components/App":3,"./components/Home":4,"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var alt = require('../alt');

var HomeActions = require('../actions/HomeActions');

var HomeStore = (function () {
  function HomeStore() {
    _classCallCheck(this, HomeStore);

    this.buildList = [];
    this.itemList = [];
    this.champId = 131;
    this.gameV = "5.11";

    this.itemStr = "";
    this.itemHash = "";

    this.userStats = [];
    this.userStats[0] = {
      'gold': 0,
      'kills': 0,
      'deaths': 0,
      'assists': 0,
      'cs': 0,
      'win': 0,
      'time': 0
    };

    this.champList = [];

    this.userBuild = [-1, -1, -1, -1, -1];

    this.itemNum = 0; //what item are we looking at

    this.bindListeners({
      getBuildList: HomeActions.GET_BUILD_LIST_SUCCESS,
      getItemList: HomeActions.GET_ITEM_LIST_SUCCESS,
      getChampionList: HomeActions.GET_CHAMPION_LIST_SUCCESS,
      setChampId: HomeActions.SET_CHAMP_ID_SUCCESS,
      selectItem: HomeActions.SELECT_ITEM_SUCCESS,
      delItem: HomeActions.DEL_ITEM_SUCCESS,
      setVersion: HomeActions.SET_VERSION_SUCCESS
    });
  }

  _createClass(HomeStore, [{
    key: 'setVersion',
    value: function setVersion(version) {
      this.gameV = version;

      this.delItemHelper(0);
      HomeActions.getBuildList(this.gameV, this.champId, this.itemHash);
    }
  }, {
    key: 'delItemHelper',
    value: function delItemHelper(itemIndex) {
      var itemStrArr = this.itemStr.split(".");
      for (var i = itemIndex; i < this.userBuild.length; ++i) {
        if (this.userBuild[i] != -1) {
          itemStrArr.pop();
        }
        this.userBuild[i] = -1;
      }
      this.itemStr = itemStrArr.join(".");
      this.itemHash = btoa(this.itemStr);
      this.itemNum = itemIndex;
    }
  }, {
    key: 'delItem',
    value: function delItem(itemIndex) {
      this.delItemHelper(itemIndex);
      HomeActions.getBuildList(this.gameV, this.champId, this.itemHash);
    }
  }, {
    key: 'selectItem',
    value: function selectItem(data) {
      var itemId = data.itemId;
      var i = data.i;
      this.itemStr = this.itemStr + "." + itemId;
      this.itemHash = btoa(this.itemStr);
      this.userBuild[this.itemNum] = itemId;
      this.itemNum++;

      //Add the new stats to the current stats
      this.userStats[this.itemNum] = {
        'gold': this.buildList[i].gold,
        'kills': this.buildList[i].kills,
        'deaths': this.buildList[i].deaths,
        'assists': this.buildList[i].assists,
        'cs': this.buildList[i].cs,
        'win': this.buildList[i].won_game,
        'time': this.buildList[i].end_game_time
      };

      HomeActions.getBuildList(this.gameV, this.champId, this.itemHash); //is this bad?
    }
  }, {
    key: 'setChampId',
    value: function setChampId(champId) {
      this.champId = champId;

      this.delItemHelper(0); //reset the item build
      HomeActions.getBuildList(this.gameV, this.champId, this.itemHash);
    }
  }, {
    key: 'initSuccess',
    value: function initSuccess(data) {}
  }, {
    key: 'getItemList',
    value: function getItemList(itemList) {
      var len = itemList.length;
      var iList = [];
      console.log(len);
      for (var i = 0; i < len; ++i) {
        iList[itemList[i].item_id] = itemList[i].item_name;
      }
      this.itemList = iList;
    }
  }, {
    key: 'getChampionList',
    value: function getChampionList(itemList) {
      var len = itemList.length;
      var iList = [];
      for (var i = 0; i < len; ++i) {
        iList[itemList[i].champ_id] = itemList[i].champ_name;
      }
      this.champList = iList;
    }
  }, {
    key: 'getBuildList',
    value: function getBuildList(buildList) {
      this.buildList = buildList;
    }
  }]);

  return HomeStore;
})();

module.exports = alt.createStore(HomeStore, 'HomeStore');

},{"../actions/HomeActions":1,"../alt":2}],8:[function(require,module,exports){
/**
 * 'Higher Order Component' that controls the props of a wrapped
 * component via stores.
 *
 * Expects the Component to have two static methods:
 *   - getStores(): Should return an array of stores.
 *   - getPropsFromStores(props): Should return the props from the stores.
 *
 * Example using old React.createClass() style:
 *
 *    const MyComponent = React.createClass({
 *      statics: {
 *        getStores(props) {
 *          return [myStore]
 *        },
 *        getPropsFromStores(props) {
 *          return myStore.getState()
 *        }
 *      },
 *      render() {
 *        // Use this.props like normal ...
 *      }
 *    })
 *    MyComponent = connectToStores(MyComponent)
 *
 *
 * Example using ES6 Class:
 *
 *    class MyComponent extends React.Component {
 *      static getStores(props) {
 *        return [myStore]
 *      }
 *      static getPropsFromStores(props) {
 *        return myStore.getState()
 *      }
 *      render() {
 *        // Use this.props like normal ...
 *      }
 *    }
 *    MyComponent = connectToStores(MyComponent)
 *
 * A great explanation of the merits of higher order components can be found at
 * http://bit.ly/1abPkrP
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _functions = require('./functions');

function connectToStores(Spec) {
  var Component = arguments[1] === undefined ? Spec : arguments[1];
  return (function () {
    // Check for required static methods.
    if (!(0, _functions.isFunction)(Spec.getStores)) {
      throw new Error('connectToStores() expects the wrapped component to have a static getStores() method');
    }
    if (!(0, _functions.isFunction)(Spec.getPropsFromStores)) {
      throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method');
    }

    var StoreConnection = _react2['default'].createClass({
      displayName: 'StoreConnection',

      getInitialState: function getInitialState() {
        return Spec.getPropsFromStores(this.props, this.context);
      },

      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState(Spec.getPropsFromStores(nextProps, this.context));
      },

      componentDidMount: function componentDidMount() {
        var _this = this;

        var stores = Spec.getStores(this.props, this.context);
        this.storeListeners = stores.map(function (store) {
          return store.listen(_this.onChange);
        });
        if (Spec.componentDidConnect) {
          Spec.componentDidConnect(this.props, this.context);
        }
      },

      componentWillUnmount: function componentWillUnmount() {
        this.storeListeners.forEach(function (unlisten) {
          return unlisten();
        });
      },

      onChange: function onChange() {
        this.setState(Spec.getPropsFromStores(this.props, this.context));
      },

      render: function render() {
        return _react2['default'].createElement(Component, (0, _functions.assign)({}, this.props, this.state));
      }
    });

    return StoreConnection;
  })();
}

exports['default'] = connectToStores;
module.exports = exports['default'];
},{"./functions":9,"react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isPromise = isPromise;
exports.eachObject = eachObject;
exports.assign = assign;
var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

exports.isFunction = isFunction;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function eachObject(f, o) {
  o.forEach(function (from) {
    Object.keys(Object(from)).forEach(function (key) {
      f(key, from[key]);
    });
  });
}

function assign(target) {
  for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    source[_key - 1] = arguments[_key];
  }

  eachObject(function (key, value) {
    return target[key] = value;
  }, source);
  return target;
}
},{}]},{},[5]);
