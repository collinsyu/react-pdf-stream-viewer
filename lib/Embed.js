Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmbedBox = function EmbedBox(props) {
  return _react2.default.createElement("embed", { type: "application/pdf", src: props.filePath, headers: props.headers, style: { width: "100%", height: "100%" }, javascript: "allow", "full-frame": "" });
}; /**
    * 使用 {{ type }} 为embed
    * 交给浏览器，自己不做控制了，和iframe一致
    * 这种格式只能用于 静态地址文件，不能用于流文件，开发者应该清楚自己的请求属于哪种
    */
exports.default = EmbedBox;
//# sourceMappingURL=Embed.js.map

module.exports = exports["default"];