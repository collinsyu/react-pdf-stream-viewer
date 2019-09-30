Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Embed = require("./Embed");

var _Embed2 = _interopRequireDefault(_Embed);

var _Iframe = require("./Iframe");

var _Iframe2 = _interopRequireDefault(_Iframe);

var _pdfJS = require("./pdfJS");

var _pdfJS2 = _interopRequireDefault(_pdfJS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PDFView = function (_Component) {
    _inherits(PDFView, _Component);

    function PDFView(props) {
        _classCallCheck(this, PDFView);

        return _possibleConstructorReturn(this, (PDFView.__proto__ || Object.getPrototypeOf(PDFView)).call(this, props));
    }

    _createClass(PDFView, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                _props$type = _props.type,
                type = _props$type === undefined ? "stream" : _props$type,
                filePath = _props.filePath,
                headers = _props.headers,
                reset = _objectWithoutProperties(_props, ["type", "filePath", "headers"]);

            if (type === "embed") {
                return _react2.default.createElement(_Embed2.default, Object.assign({ headers: headers, filePath: filePath }, reset));
            }
            if (type === "iframe") {
                return _react2.default.createElement(_Iframe2.default, Object.assign({ headers: headers, filePath: filePath }, reset));
            }
            if (type === "stream") {
                return _react2.default.createElement(_pdfJS2.default, Object.assign({ filePath: filePath }, reset));
            }
        }
    }]);

    return PDFView;
}(_react.Component);
//# sourceMappingURL=index.js.map


exports.default = PDFView;
module.exports = exports["default"];