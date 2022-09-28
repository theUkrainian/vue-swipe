import { reactive } from "vue";
import { SwipeDirectionEnum } from "./type.enum";
import type { DirectiveBinding } from "vue";
import type { EventData, SwipeConfigs, SwipeState } from "./props";

const SWIPE_THRESHOLD_DEFAULT = 100;
const SWIPE_TIMEOUT_DEFAULT = 500;
const DEFAULT_STATE = {
  clientX: null,
  clientY: null,
  xDiff: null,
  yDiff: null,
  startEl: null,
  timeDown: 0,
};

/**
 * isScrolling method helps to distinguish "scroll" and "swipe" events.
 * In other words, if the container is too large for the screen, so it is obvious that it can scroll your content.
 * Therefore, we assume that scrolling is our priority.
 * In this method, we check whether the user has scrolled to the very beginning (swipe type = 'down')
 * or to the very end (swipe type = 'up') same logic with the horizontal scroll.
 *
 * @param {SwipeDirectionEnum} swipeType
 * @param {Element} element
 *
 * @returns {boolean}
 */
const isScrolling = (
  swipeType: SwipeConfigs["type"],
  element: HTMLElement
): boolean => {
  // TODO: add support of multiple events
  switch (swipeType) {
    case SwipeDirectionEnum.DOWN:
      return element.scrollTop > 0;
    case SwipeDirectionEnum.UP:
      return element.scrollTop + element.clientHeight < element.scrollHeight;
    case SwipeDirectionEnum.RIGHT:
      return element.scrollLeft > 0;
    case SwipeDirectionEnum.LEFT:
      return element.scrollLeft + element.clientWidth < element.scrollWidth;
    default:
      return true;
  }
};

/**
 * handleTouchStart is running when the touch event starts. In fact, we write down the initial swipe parameters.
 *
 * @param {TouchEvent} event
 * @param {SwipeConfigs} config
 * @param {SwipeState} state
 *
 * @returns {void}
 */
const handleTouchStart = (
  event: TouchEvent,
  config?: SwipeConfigs,
  state?: SwipeState
) => {
  if (
    !state ||
    !config ||
    isScrolling(config.type, event.currentTarget as HTMLElement)
  ) {
    return;
  }

  state.timeDown = Date.now();
  // @ts-ignore
  state.startEl = (event as Event).currentTarget;
  state.clientX = event.touches[0].clientX;
  state.clientY = event.touches[0].clientY;
  state.xDiff = 0;
  state.yDiff = 0;
};

/**
 * handleTouchMove is running when one or more touch points are moved along the touch surface.
 * We calculate the difference between the initial and intermediate parameters.
 *
 * @param {TouchEvent} event
 * @param {SwipeConfigs} config
 * @param {SwipeState} state
 *
 * @returns {void}
 */
const handleTouchMove = (
  event: TouchEvent,
  config?: SwipeConfigs,
  state?: SwipeState
) => {
  if (
    !config ||
    !state ||
    !state.clientX ||
    !state.clientY ||
    isScrolling(config.type, event.currentTarget as HTMLElement)
  ) {
    return;
  }

  const clientX = event.touches[0].clientX;
  const clientY = event.touches[0].clientY;

  state.xDiff = state.clientX - clientX;
  state.yDiff = state.clientY - clientY;
};

/**
 * handleTouchEnd is running when the user has completed his movement
 * Based on the obtained coordinates, determine the type of swipe
 * Checking whether this movement complies with all the rules that have been set.
 *
 * @param {TouchEvent} event
 * @param {SwipeConfigs} config
 * @param {SwipeState} state
 *
 * @returns {void}
 */

const handleTouchEnd = (
  event: Record<string, Event>,
  config?: SwipeConfigs,
  state?: SwipeState
) => {
  if (
    !config ||
    !state ||
    state.startEl !== event.currentTarget ||
    // @ts-ignore
    isScrolling(config.type, event.currentTarget as HTMLElement)
  ) {
    return;
  }

  let eventType: any = "";

  const swipeThreshold = config.threshold || SWIPE_THRESHOLD_DEFAULT;
  const swipeTimeout = config.timeout || SWIPE_TIMEOUT_DEFAULT;
  const changedTouches = event.changedTouches || event.touches || [];

  const xDiff = Math.abs(Number(state.xDiff));
  const yDiff = Math.abs(Number(state.yDiff));
  const isHorizontalSwipe = xDiff > yDiff;
  const isDelayCompleted = Date.now() - state.timeDown < swipeTimeout;

  /* Determine the direction of the swipe */
  if (isHorizontalSwipe && xDiff > swipeThreshold && isDelayCompleted) {
    eventType =
      Number(state.xDiff) > 0
        ? SwipeDirectionEnum.LEFT
        : SwipeDirectionEnum.RIGHT;
  } else if (yDiff > swipeThreshold && isDelayCompleted) {
    eventType =
      Number(state.yDiff) > 0 ? SwipeDirectionEnum.UP : SwipeDirectionEnum.DOWN;
  }

  /* If the rules are met, call the сallback method for the swipe action */
  if (eventType) {
    // @ts-ignore
    const changedTouche = changedTouches[0] || {};
    const eventData: EventData = {
      dir: eventType,
      xStart: state.clientX || -1,
      xEnd: parseInt(changedTouche.clientX || -1, 10),
      yStart: state.clientY || -1,
      yEnd: parseInt(changedTouche.clientY || -1, 10),
    };
    // TODO: add support of multiple events
    if (config.type === eventType) {
      config.onSwipe(eventData);
    }
  }

  /* Reset to initial values */
  state.clientX = null;
  state.clientY = null;
  state.timeDown = 0;
};

const vSwipe = {
  created: (el: HTMLElement, binding: DirectiveBinding<SwipeConfigs>) => {
    const config = binding.value;

    if (config.ignore) return;

    const state = reactive({
      ...DEFAULT_STATE,
    });

    el.addEventListener(
      "touchstart",
      (e) => {
        // @ts-ignore
        handleTouchStart(e, config, state);
      },
      false
    );
    el.addEventListener(
      "touchmove",
      (e) => {
        // @ts-ignore
        handleTouchMove(e, config, state);
      },
      false
    );
    el.addEventListener(
      "touchend",
      (e) => {
        // @ts-ignore
        handleTouchEnd(e, config, state);
      },
      false
    );
  },
  beforeUnmount: (el: HTMLElement) => {
    el.removeEventListener("touchstart", handleTouchStart, false);
    el.removeEventListener("touchmove", handleTouchMove, false);
    // @ts-ignore
    el.removeEventListener("touchend", handleTouchEnd, false);
  },
};

export default vSwipe;
