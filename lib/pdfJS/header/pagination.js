Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pagination = require("./pagination.less");

var _pagination2 = _interopRequireDefault(_pagination);

var _arrowLeft = require("../Icons/arrow-left");

var _arrowLeft2 = _interopRequireDefault(_arrowLeft);

var _arrowRight = require("../Icons/arrow-right");

var _arrowRight2 = _interopRequireDefault(_arrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.componentDidMount = function () {};
        _this.componentWillUnmount = function () {};
        _this.onchange = function (e) {
            var val = e.target.value;
            val = val.replace(/[^\d]/, '');
            _this.setState({ value: val });
            _this.value = val;
        };
        _this.onblur = function (e) {
            var value = Number.parseInt(_this.value);
            _this.go(value);
        };
        _this.onkeydown = function (e) {
            if (e.keyCode == "13") {
                var value = Number.parseInt(_this.value);
                _this.go(value);
            }
        };
        _this.go = function (page) {
            var _this$props$total = _this.props.total,
                total = _this$props$total === undefined ? 0 : _this$props$total;

            if (page > total) {
                page = total;
            }
            if (page < 1) {
                page = 1;
            }
            _this.value = page;
            _this.setState({ value: page });
            _this.props.renderPDfByPage({ current: page });
        };
        _this.onarraw = function (go) {
            var nextpage = _this.state.value;
            if (go) {
                nextpage = nextpage + 1;
            } else {
                nextpage = nextpage - 1;
            }
            _this.go(nextpage);
        };
        _this.state = {
            value: 1
        };
        _this.value = 1;
        return _this;
    }

    _createClass(Container, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextprops) {
            if (nextprops.current != this.value) {
                this.value = nextprops.current;
                this.setState({ value: nextprops.current });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props$total = this.props.total,
                total = _props$total === undefined ? 0 : _props$total;
            var value = this.state.value;

            var x = total.toString().length;
            console.log("total", total);
            if (!total) {
                return null;
            }
            return _react2.default.createElement("div", { className: _pagination2.default.pagination }, _react2.default.createElement("div", { className: _pagination2.default.pageselector }, _react2.default.createElement("span", { onClick: function onClick() {
                    _this2.onarraw(false);
                }, style: { width: 20, cursor: value == 1 ? "not-allowed" : "pointer" } }, _react2.default.createElement(_arrowLeft2.default, null)), _react2.default.createElement("div", { className: _pagination2.default.pageselector_container, style: { width: "calc(" + x + "ch)" } }, _react2.default.createElement("div", { className: _pagination2.default.row_container }, _react2.default.createElement("div", { className: _pagination2.default.input_container }, _react2.default.createElement("div", { className: _pagination2.default.inner_input_container }, _react2.default.createElement("input", { onKeyDown: this.onkeydown, value: value, onChange: this.onchange, "aria-label": "\u9875\u7801", onBlur: this.onblur })), _react2.default.createElement("div", { className: _pagination2.default.underline })))), _react2.default.createElement("span", null, "/"), _react2.default.createElement("span", { className: _pagination2.default.total }, total), _react2.default.createElement("span", { onClick: function onClick() {
                    _this2.onarraw(true);
                }, style: { width: 20, cursor: value == total ? "not-allowed" : "pointer" } }, _react2.default.createElement(_arrowRight2.default, null))));
        }
    }]);

    return Container;
}(_react.PureComponent);
//# sourceMappingURL=pagination.js.map


exports.default = Container;
module.exports = exports["default"];