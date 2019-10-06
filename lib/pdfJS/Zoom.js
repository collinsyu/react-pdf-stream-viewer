Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./zoom.less');

var _icon = require('./Icons/icon2');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));
    }

    _createClass(Container, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                show = _props.show,
                screenType = _props.screenType,
                fullscreen = _props.fullscreen,
                handleZoom = _props.handleZoom,
                step = _props.step;

            var boxstyle = {};
            boxstyle["zoom-buttons"] = true;
            boxstyle["hidden"] = !show;
            return _react2.default.createElement("div", { className: "zoomContainer" }, _react2.default.createElement("div", { className: (0, _classnames2.default)(boxstyle) }, screenType === "width" ? _react2.default.createElement("div", { className: "wrapper", style: { transitionDelay: "100ms" } }, _react2.default.createElement(_icon2.default, { type: "screen", color: "#636363", onClick: function onClick() {
                    fullscreen(screenType);
                } })) : _react2.default.createElement("div", { className: "wrapper", style: { transitionDelay: "100ms" } }, _react2.default.createElement(_icon2.default, { type: "screen-shrik", color: "#636363", onClick: function onClick() {
                    return fullscreen(screenType);
                } })), _react2.default.createElement("div", { className: "wrapper", style: { transitionDelay: "50ms" } }, _react2.default.createElement(_icon2.default, { type: "plus", color: "#636363", onClick: function onClick() {
                    return handleZoom("add");
                } })), _react2.default.createElement("div", { className: "wrapper", style: { transitionDelay: "0ms" } }, _react2.default.createElement(_icon2.default, { type: "minus", color: "#636363", onClick: function onClick() {
                    return handleZoom("minus");
                } }))));
        }
    }]);

    return Container;
}(_react.PureComponent);
//# sourceMappingURL=Zoom.js.map


exports.default = Container;
module.exports = exports['default'];