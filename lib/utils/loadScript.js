Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadScript;
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (typeof callback !== 'undefined') {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}
//# sourceMappingURL=loadScript.js.map

module.exports = exports['default'];