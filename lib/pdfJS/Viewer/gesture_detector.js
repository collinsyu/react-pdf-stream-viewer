Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class that listens for touch events and produces events when these
 * touches form gestures (e.g. pinching).
 */
var GestureDetector = function () {
    /**
     * @param {!Element} element The element to monitor for touch gestures.
     */
    function GestureDetector(element) {
        _classCallCheck(this, GestureDetector);

        /** @private {!Element} */
        this.element_ = element;
        this.element_.addEventListener('touchstart',
        /** @type {function(!Event)} */this.onTouchStart_.bind(this), { passive: true });
        var boundOnTouch =
        /** @type {function(!Event)} */this.onTouch_.bind(this);
        this.element_.addEventListener('touchmove', boundOnTouch, { passive: true });
        this.element_.addEventListener('touchend', boundOnTouch, { passive: true });
        this.element_.addEventListener('touchcancel', boundOnTouch, { passive: true });
        // 看看大神！，如何判断是滚动还是放大，用 是否存在 ctrl按键
        this.element_.addEventListener('wheel',
        /** @type {function(!Event)} */this.onWheel_.bind(this), { passive: false });
        this.pinchStartEvent_ = null;
        this.lastTouchTouchesCount_ = 0;
        /** @private {TouchEvent} */
        this.lastEvent_ = null;
        /**
         * The scale relative to the start of the pinch when handling ctrl-wheels.
         * null when there is no ongoing pinch.
         *
         * @private {?number}
         */
        this.accumulatedWheelScale_ = null;
        /**
         * A timeout ID from setTimeout used for sending the pinchend event when
         * handling ctrl-wheels.
         *
         * @private {?number}
         */
        this.wheelEndTimeout_ = null;
        /** @private {!Map<string, !Array<!Function>>} */
        this.listeners_ = new Map([['pinchstart', []], ['pinchupdate', []], ['pinchend', []]]);
    }
    /**
     * Add a |listener| to be notified of |type| events.
     *
     * @param {string} type The event type to be notified for.
     * @param {!Function} listener The callback.
     */


    _createClass(GestureDetector, [{
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            if (this.listeners_.has(type)) {
                this.listeners_.get(type).push(listener);
            }
        }
        /**
         * @return {boolean} True if the last touch start was a two finger touch.
         */

    }, {
        key: 'wasTwoFingerTouch',
        value: function wasTwoFingerTouch() {
            return this.lastTouchTouchesCount_ == 2;
        }
        /**
         * Call the relevant listeners with the given |pinchEvent|.
         *
         * @param {!Object} pinchEvent The event to notify the listeners of.
         * @private
         */

    }, {
        key: 'notify_',
        value: function notify_(pinchEvent) {
            var listeners = this.listeners_.get(pinchEvent.type);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var l = _step.value;

                    l(pinchEvent);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        /**
         * The callback for touchstart events on the element.
         *
         * @param {!TouchEvent} event Touch event on the element.
         * @private
         */

    }, {
        key: 'onTouchStart_',
        value: function onTouchStart_(event) {
            // console.log("touchu",event)
            this.lastTouchTouchesCount_ = event.touches.length;
            if (!this.wasTwoFingerTouch()) {
                return;
            }
            this.pinchStartEvent_ = event;
            this.lastEvent_ = event;
            this.notify_({ type: 'pinchstart', center: GestureDetector.center_(event) });
        }
        /**
         * The callback for touch move, end, and cancel events on the element.
         *
         * @param {!TouchEvent} event Touch event on the element.
         * @private
         */

    }, {
        key: 'onTouch_',
        value: function onTouch_(event) {
            if (!this.pinchStartEvent_) {
                return;
            }
            var lastEvent = /** @type {!TouchEvent} */this.lastEvent_;
            // Check if the pinch ends with the current event.
            if (event.touches.length < 2 || lastEvent.touches.length !== event.touches.length) {
                var _startScaleRatio = GestureDetector.pinchScaleRatio_(lastEvent, this.pinchStartEvent_);
                var _center = GestureDetector.center_(lastEvent);
                var endEvent = {
                    type: 'pinchend',
                    startScaleRatio: _startScaleRatio,
                    center: _center
                };
                this.pinchStartEvent_ = null;
                this.lastEvent_ = null;
                this.notify_(endEvent);
                return;
            }
            var scaleRatio = GestureDetector.pinchScaleRatio_(event, lastEvent);
            var startScaleRatio = GestureDetector.pinchScaleRatio_(event, this.pinchStartEvent_);
            var center = GestureDetector.center_(event);
            this.notify_({
                type: 'pinchupdate',
                scaleRatio: scaleRatio,
                direction: scaleRatio > 1.0 ? 'in' : 'out',
                startScaleRatio: startScaleRatio,
                center: center
            });
            this.lastEvent_ = event;
        }
        /**
         * The callback for wheel events on the element.
         *
         * @param {!WheelEvent} event Wheel event on the element.
         * @private
         */

    }, {
        key: 'onWheel_',
        value: function onWheel_(event) {
            // console.log("控制滚轮",event.ctrlKey)
            // We handle ctrl-wheels to invoke our own pinch zoom. On Mac, synthetic
            // ctrl-wheels are created from trackpad pinches. We handle these ourselves
            // to prevent the browser's native pinch zoom. We also use our pinch
            // zooming mechanism for handling non-synthetic ctrl-wheels. This allows us
            // to anchor the zoom around the mouse position instead of the scroll
            // position.
            if (!event.ctrlKey) {
                return;
            }
            // NOTE: ⚠️这里为什么要阻止默认时间，因为我们要自己控制放大缩小
            event.preventDefault();
            var wheelScale = Math.exp(-event.deltaY / 100);
            // 这里需要固定scale， 用来作为放大缩小的比例
            // Clamp scale changes from the wheel event as they can be
            // quite dramatic for non-synthetic ctrl-wheels.
            var scale = Math.min(1.25, Math.max(0.75, wheelScale));
            var position = { x: event.clientX, y: event.clientY };
            if (this.accumulatedWheelScale_ == null) {
                this.accumulatedWheelScale_ = 1.0;
                this.notify_({ type: 'pinchstart', center: position });
            }
            this.accumulatedWheelScale_ *= scale;
            this.notify_({
                type: 'pinchupdate',
                scaleRatio: scale,
                direction: scale > 1.0 ? 'in' : 'out',
                startScaleRatio: this.accumulatedWheelScale_,
                center: position
            });
            // We don't get any phase information for the ctrl-wheels, so we don't know
            // when the gesture ends. We'll just use a timeout to send the pinch end
            // event a short time after the last ctrl-wheel we see.
            if (this.wheelEndTimeout_ != null) {
                window.clearTimeout(this.wheelEndTimeout_);
                this.wheelEndTimeout_ = null;
            }
            var gestureEndDelayMs = 100;
            var endEvent = {
                type: 'pinchend',
                startScaleRatio: this.accumulatedWheelScale_,
                center: position
            };
            this.wheelEndTimeout_ = window.setTimeout(function (endEvent) {
                this.notify_(endEvent);
                this.wheelEndTimeout_ = null;
                this.accumulatedWheelScale_ = null;
            }.bind(this), gestureEndDelayMs, endEvent);
        }
        /**
         * Computes the change in scale between this touch event
         * and a previous one.
         *
         * @param {!TouchEvent} event Latest touch event on the element.
         * @param {!TouchEvent} prevEvent A previous touch event on the element.
         * @return {?number} The ratio of the scale of this event and the
         *     scale of the previous one.
         * @private
         */

    }], [{
        key: 'pinchScaleRatio_',
        value: function pinchScaleRatio_(event, prevEvent) {
            var distance1 = GestureDetector.distance_(prevEvent);
            var distance2 = GestureDetector.distance_(event);
            return distance1 === 0 ? null : distance2 / distance1;
        }
        /**
         * Computes the distance between fingers.
         *
         * @param {!TouchEvent} event Touch event with at least 2 touch points.
         * @return {number} Distance between touch[0] and touch[1].
         * @private
         */

    }, {
        key: 'distance_',
        value: function distance_(event) {
            var touch1 = event.touches[0];
            var touch2 = event.touches[1];
            var dx = touch1.clientX - touch2.clientX;
            var dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
        /**
         * Computes the midpoint between fingers.
         *
         * @param {!TouchEvent} event Touch event with at least 2 touch points.
         * @return {!Object} Midpoint between touch[0] and touch[1].
         * @private
         */

    }, {
        key: 'center_',
        value: function center_(event) {
            var touch1 = event.touches[0];
            var touch2 = event.touches[1];
            return {
                x: (touch1.clientX + touch2.clientX) / 2,
                y: (touch1.clientY + touch2.clientY) / 2
            };
        }
    }]);

    return GestureDetector;
}();
//# sourceMappingURL=gesture_detector.js.map


exports.default = GestureDetector;
module.exports = exports['default'];