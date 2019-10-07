'use strict';

/** Idle time in ms before the UI is hidden. */
const HIDE_TIMEOUT = 2000;
/** Time in ms after force hide before toolbar is shown again. */
const FORCE_HIDE_TIMEOUT = 1000;
/**
 * Velocity required in a mousemove to reveal the UI (pixels/ms). This is
 * intended to be high enough that a fast flick of the mouse is required to
 * reach it.
 */
const SHOW_VELOCITY = 10;
/** Distance from the top of the screen required to reveal the toolbars. */
const TOP_TOOLBAR_REVEAL_DISTANCE = 100;
/** Distance from the bottom-right of the screen required to reveal toolbars. */
const SIDE_TOOLBAR_REVEAL_DISTANCE_RIGHT = 150;
const SIDE_TOOLBAR_REVEAL_DISTANCE_BOTTOM = 250;



function isRTL() {
return document.documentElement.dir == 'rtl';
}
/**
 * @param {!MouseEvent} e Event to test.
 * @return {boolean} True if the mouse is close to the top of the screen.
 */
export function isMouseNearTopToolbar(e) {
  return e.y < TOP_TOOLBAR_REVEAL_DISTANCE;
}

/**
 * @param {!MouseEvent} e Event to test.
 * @param {Window} window Window to test against.
 * @param {boolean} reverse Whether the side toolbar is reversed.
 * @return {boolean} True if the mouse is close to the bottom-right of the
 * screen.
 */
export function isMouseNearSideToolbar(e, window, reverse) {
  // console.log(e.x);
  
  let atSide = e.x > window.innerWidth - SIDE_TOOLBAR_REVEAL_DISTANCE_RIGHT;
  if (isRTL() !== reverse) {
    atSide = e.x < SIDE_TOOLBAR_REVEAL_DISTANCE_RIGHT;
  }
  // const atBottom =
  //     e.y > window.innerHeight - SIDE_TOOLBAR_REVEAL_DISTANCE_BOTTOM;
  const atTop = e.y < SIDE_TOOLBAR_REVEAL_DISTANCE_BOTTOM
  // console.log(atTop,atSide);
  
  return atSide && atTop;
}