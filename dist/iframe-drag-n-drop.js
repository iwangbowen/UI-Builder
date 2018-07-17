require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({147:[function(require,module,exports){
var _dragNDrop = require('./util/drag-n-drop');

var _index = require('../node_modules/interactjs/src/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

self.interact = _index2.default;
self.arrowKeyMove = _dragNDrop.arrowKeyMove;

$(document).ready(function () {
    var enteredDropzone = false;
    var isDropzoneParent = function isDropzoneParent(element) {
        return !!$(element).parents('.dropzone').length;
    };

    // enable draggables to be dropped into this
    (0, _index2.default)('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: 'body *',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.50,
        // listen for drop related events:
        ondropactivate: function ondropactivate(event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active');
        },
        ondragenter: function ondragenter(event) {
            var draggableElement = event.relatedTarget,
                dropzoneElement = event.target;

            // feedback the possibility of a drop
            dropzoneElement.classList.add('drop-target');
            draggableElement.classList.add('can-drop');
        },
        ondragleave: function ondragleave(event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-target');
            event.relatedTarget.classList.remove('can-drop');
            enteredDropzone = false;
        },
        ondrop: function ondrop(event) {
            enteredDropzone = true;
            // offset()函数用于设置或返回当前匹配元素相对于当前文档的偏移，也就是相对于当前文档的坐标
            // 元素可以是任意定位方式的元素
            // 单独设置left或top对于absolute定位的元素来说，是相对于最近的已定位祖先元素或相对于最初的包含块。
            var offset = $(event.relatedTarget).offset();
            $(event.relatedTarget).appendTo($(event.target)).css({
                left: '',
                top: '',
                transform: ''
            }).offset(offset).removeAttr('data-x data-y');
        },
        ondropdeactivate: function ondropdeactivate(event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active');
            event.target.classList.remove('drop-target');
            if (!enteredDropzone && isDropzoneParent(event.relatedTarget)) {
                var offset = $(event.relatedTarget).offset();
                $(event.relatedTarget).appendTo($('body')).offset(offset);
            }
        }
    }).resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
            endOnly: true
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 50 }
        },

        inertia: true
    }).on('resizemove', function (event) {
        var target = event.target,
            x = parseFloat(target.getAttribute('data-x')) || 0,
            y = parseFloat(target.getAttribute('data-y')) || 0;

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    });

    (0, _index2.default)('body *.draggable').draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: document.body,
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: function onmove(event) {
            (0, _dragNDrop.removeAlignmentLines)();
            var target = event.target,

            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            (0, _dragNDrop.drawAlignmentLine)(target);
        },
        // call this function on every dragend event
        onend: _dragNDrop.removeAlignmentLines
    });
});

},{"../node_modules/interactjs/src/index":18,"./util/drag-n-drop":179}],179:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
function isAlign(targetOffset, currentOffset) {
    return {
        isHorizontalAlign: Math.abs(targetOffset.top - currentOffset.top) <= 1,
        isVerticalAlign: Math.abs(targetOffset.left - currentOffset.left) <= 1
    };
}

function removeAlignmentLines() {
    $('.horizontal-line, .vertical-line').remove();
}

function drawAlignmentLine(target) {
    var horizontalLineExists = false;
    var verticalLineExists = false;
    var targetOffset = $(target).offset();

    Array.from($('body *:visible:not(script)')).filter(function (currentValue) {
        return currentValue != target;
    }).some(function (currentValue) {
        var currentOffset = $(currentValue).offset();

        var _isAlign = isAlign(targetOffset, currentOffset),
            isHorizontalAlign = _isAlign.isHorizontalAlign,
            isVerticalAlign = _isAlign.isVerticalAlign;

        if (!horizontalLineExists && isHorizontalAlign) {
            $('<hr />').addClass('horizontal-line').css({
                top: targetOffset.top
            }).appendTo($('body'));
            horizontalLineExists = true;
        }
        if (!verticalLineExists && isVerticalAlign) {
            $('<hr />').addClass('vertical-line').css({
                left: targetOffset.left
            }).appendTo($('body'));
            verticalLineExists = true;
        }
        return horizontalLineExists && verticalLineExists;
    });
}

function arrowKeyMove(key, element) {
    removeAlignmentLines();

    var dx = 0,
        dy = 0;
    switch (key) {
        case 37:
            // left
            dx = -1;
            break;
        case 38:
            // up
            dy = -1;
            break;
        case 39:
            // right
            dx = 1;
            break;
        case 40:
            // down
            dy = 1;
            break;
        default:
            return; // exit this handler for other keys
    }

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(element.attr('data-x')) || 0) + dx,
        y = (parseFloat(element.attr('data-y')) || 0) + dy;

    element.css({
        transform: 'translate(' + x + 'px, ' + y + 'px)'
    });

    // update the position attributes
    element.attr('data-x', x);
    element.attr('data-y', y);

    drawAlignmentLine(element.get(0));
}

exports.removeAlignmentLines = removeAlignmentLines;
exports.arrowKeyMove = arrowKeyMove;
exports.drawAlignmentLine = drawAlignmentLine;

},{}],18:[function(require,module,exports){
/* browser entry point */

// inertia
require('./inertia');

// modifiers
require('./modifiers/snap');
require('./modifiers/restrict');

// pointerEvents
require('./pointerEvents/base');
require('./pointerEvents/holdRepeat');
require('./pointerEvents/interactableTargets');

// autoStart hold
require('./autoStart/hold');

// actions
require('./actions/gesture');
require('./actions/resize');
require('./actions/drag');
require('./actions/drop');

// load these modifiers after resize is loaded
require('./modifiers/snapSize');
require('./modifiers/restrictEdges');
require('./modifiers/restrictSize');

// autoStart actions
require('./autoStart/gesture');
require('./autoStart/resize');
require('./autoStart/drag');

// Interactable preventDefault setting
require('./interactablePreventDefault.js');

// autoScroll
require('./autoScroll');

// export interact
module.exports = require('./interact');

},{"./actions/drag":6,"./actions/drop":7,"./actions/gesture":8,"./actions/resize":9,"./autoScroll":10,"./autoStart/drag":13,"./autoStart/gesture":14,"./autoStart/hold":15,"./autoStart/resize":16,"./inertia":19,"./interact":20,"./interactablePreventDefault.js":21,"./modifiers/restrict":23,"./modifiers/restrictEdges":24,"./modifiers/restrictSize":25,"./modifiers/snap":26,"./modifiers/snapSize":27,"./pointerEvents/base":29,"./pointerEvents/holdRepeat":30,"./pointerEvents/interactableTargets":31}],31:[function(require,module,exports){
const pointerEvents = require('./base');
const Interactable  = require('../Interactable');
const is            = require('../utils/is');
const scope         = require('../scope');
const extend        = require('../utils/extend');
const { merge }     = require('../utils/arr');

pointerEvents.signals.on('collect-targets', function ({ targets, element, type, eventTarget }) {
  scope.interactables.forEachMatch(element, interactable => {
    const eventable = interactable.events;
    const options = eventable.options;

    if (eventable[type]
      && is.element(element)
      && interactable.testIgnoreAllow(options, element, eventTarget)) {

      targets.push({
        element,
        eventable,
        props: { interactable },
      });
    }
  });
});

Interactable.signals.on('new', function ({ interactable }) {
  interactable.events.getRect = function (element) {
    return interactable.getRect(element);
  };
});

Interactable.signals.on('set', function ({ interactable, options }) {
  extend(interactable.events.options, pointerEvents.defaults);
  extend(interactable.events.options, options);
});

merge(Interactable.eventTypes, pointerEvents.types);

Interactable.prototype.pointerEvents = function (options) {
  extend(this.events.options, options);

  return this;
};

const __backCompatOption = Interactable.prototype._backCompatOption;

Interactable.prototype._backCompatOption = function (optionName, newValue) {
  const ret = __backCompatOption.call(this, optionName, newValue);

  if (ret === this) {
    this.events.options[optionName] = newValue;
  }

  return ret;
};

Interactable.settingsMethods.push('pointerEvents');

},{"../Interactable":3,"../scope":32,"../utils/arr":34,"../utils/extend":40,"../utils/is":45,"./base":29}],30:[function(require,module,exports){
const pointerEvents = require('./base');
const Interaction   = require('../Interaction');

pointerEvents.signals.on('new', onNew);
pointerEvents.signals.on('fired', onFired);

for (const signal of ['move', 'up', 'cancel', 'endall']) {
  Interaction.signals.on(signal, endHoldRepeat);
}

function onNew ({ pointerEvent }) {
  if (pointerEvent.type !== 'hold') { return; }

  pointerEvent.count = (pointerEvent.count || 0) + 1;
}

function onFired ({ interaction, pointerEvent, eventTarget, targets }) {
  if (pointerEvent.type !== 'hold' || !targets.length) { return; }

  // get the repeat interval from the first eventable
  const interval = targets[0].eventable.options.holdRepeatInterval;

  // don't repeat if the interval is 0 or less
  if (interval <= 0) { return; }

  // set a timeout to fire the holdrepeat event
  interaction.holdIntervalHandle = setTimeout(function () {
    pointerEvents.fire({
      interaction,
      eventTarget,
      type: 'hold',
      pointer: pointerEvent,
      event: pointerEvent,
    });
  }, interval);
}

function endHoldRepeat ({ interaction }) {
  // set the interaction's holdStopTime property
  // to stop further holdRepeat events
  if (interaction.holdIntervalHandle) {
    clearInterval(interaction.holdIntervalHandle);
    interaction.holdIntervalHandle = null;
  }
}

// don't repeat by default
pointerEvents.defaults.holdRepeatInterval = 0;
pointerEvents.types.push('holdrepeat');

module.exports = {
  onNew,
  onFired,
  endHoldRepeat,
};

},{"../Interaction":4,"./base":29}],29:[function(require,module,exports){
const PointerEvent = require('./PointerEvent');
const Interaction  = require('../Interaction');
const utils        = require('../utils');
const defaults     = require('../defaultOptions');
const signals      = require('../utils/Signals').new();

const simpleSignals = [ 'down', 'up', 'cancel' ];
const simpleEvents  = [ 'down', 'up', 'cancel' ];

const pointerEvents = {
  PointerEvent,
  fire,
  collectEventTargets,
  signals,
  defaults: {
    holdDuration: 600,
    ignoreFrom  : null,
    allowFrom   : null,
    origin      : { x: 0, y: 0 },
  },
  types: [
    'down',
    'move',
    'up',
    'cancel',
    'tap',
    'doubletap',
    'hold',
  ],
};

function fire (arg) {
  const {
    interaction, pointer, event, eventTarget,
    type = arg.pointerEvent.type,
    targets = collectEventTargets(arg),
    pointerEvent = new PointerEvent(type, pointer, event, eventTarget, interaction),
  } = arg;

  const signalArg = {
    interaction,
    pointer,
    event,
    eventTarget,
    targets,
    type,
    pointerEvent,
  };

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];

    for (const prop in target.props || {}) {
      pointerEvent[prop] = target.props[prop];
    }

    const origin = utils.getOriginXY(target.eventable, target.element);

    pointerEvent.subtractOrigin(origin);
    pointerEvent.eventable = target.eventable;
    pointerEvent.currentTarget = target.element;

    target.eventable.fire(pointerEvent);

    pointerEvent.addOrigin(origin);

    if (pointerEvent.immediatePropagationStopped
        || (pointerEvent.propagationStopped
            && (i + 1) < targets.length && targets[i + 1].element !== pointerEvent.currentTarget)) {
      break;
    }
  }

  signals.fire('fired', signalArg);

  if (type === 'tap') {
    // if pointerEvent should make a double tap, create and fire a doubletap
    // PointerEvent and use that as the prevTap
    const prevTap = pointerEvent.double
      ? fire({
        interaction, pointer, event, eventTarget,
        type: 'doubletap',
      })
      : pointerEvent;

    interaction.prevTap = prevTap;
    interaction.tapTime = prevTap.timeStamp;
  }

  return pointerEvent;
}

function collectEventTargets ({ interaction, pointer, event, eventTarget, type }) {
  const pointerIndex = interaction.getPointerIndex(pointer);

  // do not fire a tap event if the pointer was moved before being lifted
  if (type === 'tap' && (interaction.pointerWasMoved
      // or if the pointerup target is different to the pointerdown target
      || !(interaction.downTargets[pointerIndex] && interaction.downTargets[pointerIndex] === eventTarget))) {
    return [];
  }

  const path = utils.getPath(eventTarget);
  const signalArg = {
    interaction,
    pointer,
    event,
    eventTarget,
    type,
    path,
    targets: [],
    element: null,
  };

  for (const element of path) {
    signalArg.element = element;

    signals.fire('collect-targets', signalArg);
  }

  if (type === 'hold') {
    signalArg.targets = signalArg.targets.filter(target =>
      target.eventable.options.holdDuration === interaction.holdTimers[pointerIndex].duration);
  }

  return signalArg.targets;
}

Interaction.signals.on('update-pointer-down', function ({ interaction, pointerIndex }) {
  interaction.holdTimers[pointerIndex] = { duration: Infinity, timeout: null };
});

Interaction.signals.on('remove-pointer', function ({ interaction, pointerIndex }) {
  interaction.holdTimers.splice(pointerIndex, 1);
});

Interaction.signals.on('move', function ({ interaction, pointer, event, eventTarget, duplicateMove }) {
  const pointerIndex = interaction.getPointerIndex(pointer);

  if (!duplicateMove && (!interaction.pointerIsDown || interaction.pointerWasMoved)) {
    if (interaction.pointerIsDown) {
      clearTimeout(interaction.holdTimers[pointerIndex].timeout);
    }

    fire({
      interaction, pointer, event, eventTarget,
      type: 'move',
    });
  }
});

Interaction.signals.on('down', function ({ interaction, pointer, event, eventTarget, pointerIndex }) {
  const timer = interaction.holdTimers[pointerIndex];
  const path = utils.getPath(eventTarget);
  const signalArg = {
    interaction,
    pointer,
    event,
    eventTarget,
    type: 'hold',
    targets: [],
    path,
    element: null,
  };

  for (const element of path) {
    signalArg.element = element;

    signals.fire('collect-targets', signalArg);
  }

  if (!signalArg.targets.length) { return; }

  let minDuration = Infinity;

  for (const target of signalArg.targets) {
    const holdDuration = target.eventable.options.holdDuration;

    if (holdDuration < minDuration) {
      minDuration = holdDuration;
    }
  }

  timer.duration = minDuration;
  timer.timeout = setTimeout(function () {
    fire({
      interaction,
      eventTarget,
      pointer,
      event,
      type: 'hold',
    });
  }, minDuration);
});

Interaction.signals.on('up', ({ interaction, pointer, event, eventTarget }) => {
  if (!interaction.pointerWasMoved) {
    fire({ interaction, eventTarget, pointer, event, type: 'tap' });
  }
});

for (const signalName of ['up', 'cancel']) {
  Interaction.signals.on(signalName, function ({ interaction, pointerIndex }) {
    if (interaction.holdTimers[pointerIndex]) {
      clearTimeout(interaction.holdTimers[pointerIndex].timeout);
    }
  });
}

function createSignalListener (type) {
  return function ({ interaction, pointer, event, eventTarget }) {
    fire({ interaction, eventTarget, pointer, event, type });
  };
}

for (let i = 0; i < simpleSignals.length; i++) {
  Interaction.signals.on(simpleSignals[i], createSignalListener(simpleEvents[i]));
}

Interaction.signals.on('new', function (interaction) {
  interaction.prevTap    = null;  // the most recent tap event on this interaction
  interaction.tapTime    = 0;     // time of the most recent tap event
  interaction.holdTimers = [];    // [{ duration, timeout }]
});

defaults.pointerEvents = pointerEvents.defaults;
module.exports = pointerEvents;

},{"../Interaction":4,"../defaultOptions":17,"../utils":43,"../utils/Signals":33,"./PointerEvent":28}],28:[function(require,module,exports){
const pointerUtils = require('../utils/pointerUtils');

module.exports = class PointerEvent {
  /** */
  constructor (type, pointer, event, eventTarget, interaction) {
    pointerUtils.pointerExtend(this, event);

    if (event !== pointer) {
      pointerUtils.pointerExtend(this, pointer);
    }

    this.interaction = interaction;

    this.timeStamp     = new Date().getTime();
    this.originalEvent = event;
    this.type          = type;
    this.pointerId     = pointerUtils.getPointerId(pointer);
    this.pointerType   = pointerUtils.getPointerType(pointer);
    this.target        = eventTarget;
    this.currentTarget = null;

    if (type === 'tap') {
      const pointerIndex = interaction.getPointerIndex(pointer);
      this.dt = this.timeStamp - interaction.downTimes[pointerIndex];

      const interval = this.timeStamp - interaction.tapTime;

      this.double = !!(interaction.prevTap
        && interaction.prevTap.type !== 'doubletap'
        && interaction.prevTap.target === this.target
        && interval < 500);
    }
    else if (type === 'doubletap') {
      this.dt = pointer.timeStamp - interaction.tapTime;
    }
  }

  subtractOrigin ({ x: originX, y: originY }) {
    this.pageX   -= originX;
    this.pageY   -= originY;
    this.clientX -= originX;
    this.clientY -= originY;

    return this;
  }

  addOrigin ({ x: originX, y: originY }) {
    this.pageX   += originX;
    this.pageY   += originY;
    this.clientX += originX;
    this.clientY += originY;

    return this;
  }

  /** */
  preventDefault () {
    this.originalEvent.preventDefault();
  }

  /** */
  stopPropagation () {
    this.propagationStopped = true;
  }

  /** */
  stopImmediatePropagation () {
    this.immediatePropagationStopped = this.propagationStopped = true;
  }
};

},{"../utils/pointerUtils":48}],27:[function(require,module,exports){
// This module allows snapping of the size of targets during resize
// interactions.

const modifiers      = require('./base');
const snap           = require('./snap');
const defaultOptions = require('../defaultOptions');
const resize         = require('../actions/resize');
const utils          = require('../utils/');

const snapSize = {
  defaults: {
    enabled: false,
    endOnly: false,
    range  : Infinity,
    targets: null,
    offsets: null,
  },

  setOffset: function (arg) {
    const { interaction, options } = arg;
    const edges = interaction.prepared.edges;

    if (!edges) { return; }

    arg.options = {
      relativePoints: [{
        x: edges.left? 0 : 1,
        y: edges.top ? 0 : 1,
      }],
      origin: { x: 0, y: 0 },
      offset: 'self',
      range: options.range,
    };

    const offsets = snap.setOffset(arg);
    arg.options = options;

    return offsets;
  },

  set: function (arg) {
    const { interaction, options, offset, modifiedCoords } = arg;
    const page = utils.extend({}, modifiedCoords);
    const relativeX = page.x - offset[0].x;
    const relativeY = page.y - offset[0].y;

    arg.options = utils.extend({}, options);
    arg.options.targets = [];

    for (const snapTarget of (options.targets || [])) {
      let target;

      if (utils.is.function(snapTarget)) {
        target = snapTarget(relativeX, relativeY, interaction);
      }
      else {
        target = snapTarget;
      }

      if (!target) { continue; }

      if ('width' in target && 'height' in target) {
        target.x = target.width;
        target.y = target.height;
      }

      arg.options.targets.push(target);
    }

    snap.set(arg);
  },

  modifyCoords: function (arg) {
    const { options } = arg;

    arg.options = utils.extend({}, options);
    arg.options.enabled = options.enabled;
    arg.options.relativePoints = [null];

    snap.modifyCoords(arg);
  },
};

modifiers.snapSize = snapSize;
modifiers.names.push('snapSize');

defaultOptions.perAction.snapSize = snapSize.defaults;
resize.defaults.snapSize          = snapSize.defaults;

module.exports = snapSize;

},{"../actions/resize":9,"../defaultOptions":17,"../utils/":43,"./base":22,"./snap":26}],26:[function(require,module,exports){
const modifiers      = require('./base');
const interact       = require('../interact');
const utils          = require('../utils');
const defaultOptions = require('../defaultOptions');

const snap = {
  defaults: {
    enabled: false,
    endOnly: false,
    range  : Infinity,
    targets: null,
    offsets: null,

    relativePoints: null,
  },

  setOffset: function ({ interaction, interactable, element, rect, startOffset, options }) {
    const offsets = [];
    const optionsOrigin = utils.rectToXY(utils.resolveRectLike(options.origin));
    const origin = optionsOrigin || utils.getOriginXY(interactable, element, interaction.prepared.name);
    options = options || interactable.options[interaction.prepared.name].snap || {};

    let snapOffset;

    if (options.offset === 'startCoords') {
      snapOffset = {
        x: interaction.startCoords.page.x - origin.x,
        y: interaction.startCoords.page.y - origin.y,
      };
    }
    else  {
      const offsetRect = utils.resolveRectLike(options.offset, interactable, element, [interaction]);

      snapOffset = utils.rectToXY(offsetRect) || { x: 0, y: 0 };
    }

    if (rect && options.relativePoints && options.relativePoints.length) {
      for (const { x: relativeX, y: relativeY } of options.relativePoints) {
        offsets.push({
          x: startOffset.left - (rect.width  * relativeX) + snapOffset.x,
          y: startOffset.top  - (rect.height * relativeY) + snapOffset.y,
        });
      }
    }
    else {
      offsets.push(snapOffset);
    }

    return offsets;
  },

  set: function ({ interaction, modifiedCoords, status, options, offset: offsets }) {
    const targets = [];
    let target;
    let page;
    let i;

    if (status.useStatusXY) {
      page = { x: status.x, y: status.y };
    }
    else {
      const origin = utils.getOriginXY(interaction.target, interaction.element, interaction.prepared.name);

      page = utils.extend({}, modifiedCoords);

      page.x -= origin.x;
      page.y -= origin.y;
    }

    status.realX = page.x;
    status.realY = page.y;

    let len = options.targets? options.targets.length : 0;

    for (const { x: offsetX, y: offsetY } of offsets) {
      const relativeX = page.x - offsetX;
      const relativeY = page.y - offsetY;

      for (const snapTarget of (options.targets || [])) {
        if (utils.is.function(snapTarget)) {
          target = snapTarget(relativeX, relativeY, interaction);
        }
        else {
          target = snapTarget;
        }

        if (!target) { continue; }

        targets.push({
          x: utils.is.number(target.x) ? (target.x + offsetX) : relativeX,
          y: utils.is.number(target.y) ? (target.y + offsetY) : relativeY,

          range: utils.is.number(target.range)? target.range: options.range,
        });
      }
    }

    const closest = {
      target: null,
      inRange: false,
      distance: 0,
      range: 0,
      dx: 0,
      dy: 0,
    };

    for (i = 0, len = targets.length; i < len; i++) {
      target = targets[i];

      const range = target.range;
      const dx = target.x - page.x;
      const dy = target.y - page.y;
      const distance = utils.hypot(dx, dy);
      let inRange = distance <= range;

      // Infinite targets count as being out of range
      // compared to non infinite ones that are in range
      if (range === Infinity && closest.inRange && closest.range !== Infinity) {
        inRange = false;
      }

      if (!closest.target || (inRange
          // is the closest target in range?
          ? (closest.inRange && range !== Infinity
          // the pointer is relatively deeper in this target
          ? distance / range < closest.distance / closest.range
          // this target has Infinite range and the closest doesn't
          : (range === Infinity && closest.range !== Infinity)
          // OR this target is closer that the previous closest
        || distance < closest.distance)
          // The other is not in range and the pointer is closer to this target
          : (!closest.inRange && distance < closest.distance))) {

        closest.target = target;
        closest.distance = distance;
        closest.range = range;
        closest.inRange = inRange;
        closest.dx = dx;
        closest.dy = dy;

        status.range = range;
      }
    }

    let snapChanged;

    if (closest.target) {
      snapChanged = (status.modifiedX !== closest.target.x || status.modifiedY !== closest.target.y);

      status.modifiedX = closest.target.x;
      status.modifiedY = closest.target.y;
    }
    else {
      snapChanged = true;

      status.modifiedX = NaN;
      status.modifiedY = NaN;
    }

    status.dx = closest.dx;
    status.dy = closest.dy;

    status.changed = (snapChanged || (closest.inRange && !status.locked));
    status.locked = closest.inRange;
  },

  modifyCoords: function ({ page, client, status, phase, options }) {
    const relativePoints = options && options.relativePoints;

    if (options && options.enabled
        && !(phase === 'start' && relativePoints && relativePoints.length)) {

      if (status.locked) {
        page.x += status.dx;
        page.y += status.dy;
        client.x += status.dx;
        client.y += status.dy;
      }

      return {
        range  : status.range,
        locked : status.locked,
        x      : status.modifiedX,
        y      : status.modifiedY,
        realX  : status.realX,
        realY  : status.realY,
        dx     : status.dx,
        dy     : status.dy,
      };
    }
  },
};

interact.createSnapGrid = function (grid) {
  return function (x, y) {
    const limits = grid.limits || {
      left  : -Infinity,
      right :  Infinity,
      top   : -Infinity,
      bottom:  Infinity,
    };
    let offsetX = 0;
    let offsetY = 0;

    if (utils.is.object(grid.offset)) {
      offsetX = grid.offset.x;
      offsetY = grid.offset.y;
    }

    const gridx = Math.round((x - offsetX) / grid.x);
    const gridy = Math.round((y - offsetY) / grid.y);

    const newX = Math.max(limits.left, Math.min(limits.right , gridx * grid.x + offsetX));
    const newY = Math.max(limits.top , Math.min(limits.bottom, gridy * grid.y + offsetY));

    return {
      x: newX,
      y: newY,
      range: grid.range,
    };
  };
};

modifiers.snap = snap;
modifiers.names.push('snap');

defaultOptions.perAction.snap = snap.defaults;

module.exports = snap;

},{"../defaultOptions":17,"../interact":20,"../utils":43,"./base":22}],25:[function(require,module,exports){
// This module adds the options.resize.restrictSize setting which sets min and
// max width and height for the target being resized.
//
// interact(target).resize({
//   edges: { top: true, left: true },
//   restrictSize: {
//     min: { width: -600, height: -600 },
//     max: { width:  600, height:  600 },
//   },
// });

const modifiers      = require('./base');
const restrictEdges  = require('./restrictEdges');
const utils          = require('../utils');
const rectUtils      = require('../utils/rect');
const defaultOptions = require('../defaultOptions');
const resize         = require('../actions/resize');

const noMin = { width: -Infinity, height: -Infinity };
const noMax = { width: +Infinity, height: +Infinity };

const restrictSize = {
  defaults: {
    enabled: false,
    endOnly: false,
    min: null,
    max: null,
  },

  setOffset: function ({ interaction }) {
    return interaction.startOffset;
  },

  set: function (arg) {
    const { interaction, options } = arg;
    const edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

    if (!interaction.interacting() || !edges) {
      return;
    }

    const rect = rectUtils.xywhToTlbr(interaction.resizeRects.inverted);

    const minSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.min, interaction)) || noMin;
    const maxSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.max, interaction)) || noMax;

    arg.options = {
      enabled: options.enabled,
      endOnly: options.endOnly,
      inner: utils.extend({}, restrictEdges.noInner),
      outer: utils.extend({}, restrictEdges.noOuter),
    };

    if (edges.top) {
      arg.options.inner.top = rect.bottom - minSize.height;
      arg.options.outer.top = rect.bottom - maxSize.height;
    }
    else if (edges.bottom) {
      arg.options.inner.bottom = rect.top + minSize.height;
      arg.options.outer.bottom = rect.top + maxSize.height;
    }
    if (edges.left) {
      arg.options.inner.left = rect.right - minSize.width;
      arg.options.outer.left = rect.right - maxSize.width;
    }
    else if (edges.right) {
      arg.options.inner.right = rect.left + minSize.width;
      arg.options.outer.right = rect.left + maxSize.width;
    }

    restrictEdges.set(arg);
  },

  modifyCoords: restrictEdges.modifyCoords,
};

modifiers.restrictSize = restrictSize;
modifiers.names.push('restrictSize');

defaultOptions.perAction.restrictSize = restrictSize.defaults;
resize.defaults.restrictSize          = restrictSize.defaults;

module.exports = restrictSize;

},{"../actions/resize":9,"../defaultOptions":17,"../utils":43,"../utils/rect":50,"./base":22,"./restrictEdges":24}],24:[function(require,module,exports){
// This module adds the options.resize.restrictEdges setting which sets min and
// max for the top, left, bottom and right edges of the target being resized.
//
// interact(target).resize({
//   edges: { top: true, left: true },
//   restrictEdges: {
//     inner: { top: 200, left: 200, right: 400, bottom: 400 },
//     outer: { top:   0, left:   0, right: 600, bottom: 600 },
//   },
// });

const modifiers      = require('./base');
const utils          = require('../utils');
const rectUtils      = require('../utils/rect');
const defaultOptions = require('../defaultOptions');
const resize         = require('../actions/resize');

const { getRestrictionRect } = require('./restrict');

const noInner = { top: +Infinity, left: +Infinity, bottom: -Infinity, right: -Infinity };
const noOuter = { top: -Infinity, left: -Infinity, bottom: +Infinity, right: +Infinity };

const restrictEdges = {
  defaults: {
    enabled: false,
    endOnly: false,
    min: null,
    max: null,
    offset: null,
  },

  setOffset: function ({ interaction, startOffset, options }) {
    if (!options) {
      return utils.extend({}, startOffset);
    }

    const offset = getRestrictionRect(options.offset, interaction, interaction.startCoords.page);

    if (offset) {
      return {
        top:    startOffset.top    + offset.y,
        left:   startOffset.left   + offset.x,
        bottom: startOffset.bottom + offset.y,
        right:  startOffset.right  + offset.x,
      };
    }

    return startOffset;
  },

  set: function ({ modifiedCoords, interaction, status, offset, options }) {
    const edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

    if (!interaction.interacting() || !edges) {
      return;
    }

    const page = status.useStatusXY
      ? { x: status.x, y: status.y }
      : utils.extend({}, modifiedCoords);
    const inner = rectUtils.xywhToTlbr(getRestrictionRect(options.inner, interaction, page)) || noInner;
    const outer = rectUtils.xywhToTlbr(getRestrictionRect(options.outer, interaction, page)) || noOuter;

    let modifiedX = page.x;
    let modifiedY = page.y;

    status.dx = 0;
    status.dy = 0;
    status.locked = false;

    if (edges.top) {
      modifiedY = Math.min(Math.max(outer.top    + offset.top,    page.y), inner.top    + offset.top);
    }
    else if (edges.bottom) {
      modifiedY = Math.max(Math.min(outer.bottom - offset.bottom, page.y), inner.bottom - offset.bottom);
    }
    if (edges.left) {
      modifiedX = Math.min(Math.max(outer.left   + offset.left,   page.x), inner.left   + offset.left);
    }
    else if (edges.right) {
      modifiedX = Math.max(Math.min(outer.right  - offset.right,  page.x), inner.right  - offset.right);
    }

    status.dx = modifiedX - page.x;
    status.dy = modifiedY - page.y;

    status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
    status.locked = !!(status.dx || status.dy);

    status.modifiedX = modifiedX;
    status.modifiedY = modifiedY;
  },

  modifyCoords: function ({ page, client, status, phase, options }) {
    if (options && options.enabled
        && !(phase === 'start' && status.locked)) {

      if (status.locked) {
        page.x += status.dx;
        page.y += status.dy;
        client.x += status.dx;
        client.y += status.dy;

        return {
          dx: status.dx,
          dy: status.dy,
        };
      }
    }
  },

  noInner,
  noOuter,
  getRestrictionRect,
};

modifiers.restrictEdges = restrictEdges;
modifiers.names.push('restrictEdges');

defaultOptions.perAction.restrictEdges = restrictEdges.defaults;
resize.defaults.restrictEdges          = restrictEdges.defaults;

module.exports = restrictEdges;

},{"../actions/resize":9,"../defaultOptions":17,"../utils":43,"../utils/rect":50,"./base":22,"./restrict":23}],23:[function(require,module,exports){
const modifiers      = require('./base');
const utils          = require('../utils');
const defaultOptions = require('../defaultOptions');

const restrict = {
  defaults: {
    enabled    : false,
    endOnly    : false,
    restriction: null,
    elementRect: null,
  },

  setOffset: function ({ rect, startOffset, options }) {
    const elementRect = options && options.elementRect;
    const offset = {};

    if (rect && elementRect) {
      offset.left = startOffset.left - (rect.width  * elementRect.left);
      offset.top  = startOffset.top  - (rect.height * elementRect.top);

      offset.right  = startOffset.right  - (rect.width  * (1 - elementRect.right));
      offset.bottom = startOffset.bottom - (rect.height * (1 - elementRect.bottom));
    }
    else {
      offset.left = offset.top = offset.right = offset.bottom = 0;
    }

    return offset;
  },

  set: function ({ modifiedCoords, interaction, status, options }) {
    if (!options) { return status; }

    const page = status.useStatusXY
      ? { x: status.x, y: status.y }
      : utils.extend({}, modifiedCoords);

    const restriction = getRestrictionRect(options.restriction, interaction, page);

    if (!restriction) { return status; }

    status.dx = 0;
    status.dy = 0;
    status.locked = false;

    const rect = restriction;
    let modifiedX = page.x;
    let modifiedY = page.y;

    const offset = interaction.modifierOffsets.restrict;

    // object is assumed to have
    // x, y, width, height or
    // left, top, right, bottom
    if ('x' in restriction && 'y' in restriction) {
      modifiedX = Math.max(Math.min(rect.x + rect.width  - offset.right , page.x), rect.x + offset.left);
      modifiedY = Math.max(Math.min(rect.y + rect.height - offset.bottom, page.y), rect.y + offset.top );
    }
    else {
      modifiedX = Math.max(Math.min(rect.right  - offset.right , page.x), rect.left + offset.left);
      modifiedY = Math.max(Math.min(rect.bottom - offset.bottom, page.y), rect.top  + offset.top );
    }

    status.dx = modifiedX - page.x;
    status.dy = modifiedY - page.y;

    status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
    status.locked = !!(status.dx || status.dy);

    status.modifiedX = modifiedX;
    status.modifiedY = modifiedY;
  },

  modifyCoords: function ({ page, client, status, phase, options }) {
    const elementRect = options && options.elementRect;

    if (options && options.enabled
        && !(phase === 'start' && elementRect && status.locked)) {

      if (status.locked) {
        page.x += status.dx;
        page.y += status.dy;
        client.x += status.dx;
        client.y += status.dy;

        return {
          dx: status.dx,
          dy: status.dy,
        };
      }
    }
  },

  getRestrictionRect,
};

function getRestrictionRect (value, interaction, page) {
  if (utils.is.function(value)) {
    return utils.resolveRectLike(value, interaction.target, interaction.element, [page.x, page.y, interaction]);
  } else {
    return utils.resolveRectLike(value, interaction.target, interaction.element);
  }
}

modifiers.restrict = restrict;
modifiers.names.push('restrict');

defaultOptions.perAction.restrict = restrict.defaults;

module.exports = restrict;

},{"../defaultOptions":17,"../utils":43,"./base":22}],21:[function(require,module,exports){
const Interactable = require('./Interactable');
const Interaction  = require('./Interaction');
const scope        = require('./scope');
const is           = require('./utils/is');
const events       = require('./utils/events');
const browser      = require('./utils/browser');

const { nodeContains, matchesSelector } = require('./utils/domUtils');

/**
 * Returns or sets whether to prevent the browser's default behaviour in
 * response to pointer events. Can be set to:
 *  - `'always'` to always prevent
 *  - `'never'` to never prevent
 *  - `'auto'` to let interact.js try to determine what would be best
 *
 * @param {string} [newValue] `true`, `false` or `'auto'`
 * @return {string | Interactable} The current setting or this Interactable
 */
Interactable.prototype.preventDefault = function (newValue) {
  if (/^(always|never|auto)$/.test(newValue)) {
    this.options.preventDefault = newValue;
    return this;
  }

  if (is.bool(newValue)) {
    this.options.preventDefault = newValue? 'always' : 'never';
    return this;
  }

  return this.options.preventDefault;
};

Interactable.prototype.checkAndPreventDefault = function (event) {
  const setting = this.options.preventDefault;

  if (setting === 'never') { return; }

  if (setting === 'always') {
    event.preventDefault();
    return;
  }

  // setting === 'auto'

  // don't preventDefault of touch{start,move} events if the browser supports passive
  // events listeners. CSS touch-action and user-selecct should be used instead
  if (events.supportsPassive
    && /^touch(start|move)$/.test(event.type)
    && !browser.isIOS) {
    return;
  }

  // don't preventDefault of pointerdown events
  if (/^(mouse|pointer|touch)*(down|start)/i.test(event.type)) {
    return;
  }

  // don't preventDefault on editable elements
  if (is.element(event.target)
      && matchesSelector(event.target, 'input,select,textarea,[contenteditable=true],[contenteditable=true] *')) {
    return;
  }

  event.preventDefault();
};

function onInteractionEvent ({ interaction, event }) {
  if (interaction.target) {
    interaction.target.checkAndPreventDefault(event);
  }
}

for (const eventSignal of ['down', 'move', 'up', 'cancel']) {
  Interaction.signals.on(eventSignal, onInteractionEvent);
}

// prevent native HTML5 drag on interact.js target elements
Interaction.docEvents.dragstart = function preventNativeDrag (event) {
  for (const interaction of scope.interactions) {

    if (interaction.element
        && (interaction.element === event.target
            || nodeContains(interaction.element, event.target))) {

      interaction.target.checkAndPreventDefault(event);
      return;
    }
  }
};

},{"./Interactable":3,"./Interaction":4,"./scope":32,"./utils/browser":35,"./utils/domUtils":38,"./utils/events":39,"./utils/is":45}],19:[function(require,module,exports){
const InteractEvent  = require('./InteractEvent');
const Interaction    = require('./Interaction');
const modifiers      = require('./modifiers/base');
const utils          = require('./utils');
const animationFrame = require('./utils/raf');

Interaction.signals.on('new', function (interaction) {
  interaction.inertiaStatus = {
    active     : false,
    smoothEnd  : false,
    allowResume: false,

    startEvent: null,
    upCoords  : {},

    xe: 0, ye: 0,
    sx: 0, sy: 0,

    t0: 0,
    vx0: 0, vys: 0,
    duration: 0,

    lambda_v0: 0,
    one_ve_v0: 0,
    i  : null,
  };

  interaction.boundInertiaFrame   = () => inertiaFrame  .apply(interaction);
  interaction.boundSmoothEndFrame = () => smoothEndFrame.apply(interaction);
});

Interaction.signals.on('down', function ({ interaction, event, pointer, eventTarget }) {
  const status = interaction.inertiaStatus;

  // Check if the down event hits the current inertia target
  if (status.active) {
    let element = eventTarget;

    // climb up the DOM tree from the event target
    while (utils.is.element(element)) {

      // if interaction element is the current inertia target element
      if (element === interaction.element) {
        // stop inertia
        animationFrame.cancel(status.i);
        status.active = false;
        interaction.simulation = null;

        // update pointers to the down event's coordinates
        interaction.updatePointer(pointer);
        utils.setCoords(interaction.curCoords, interaction.pointers);

        // fire appropriate signals
        const signalArg = { interaction };
        Interaction.signals.fire('before-action-move', signalArg);
        Interaction.signals.fire('action-resume'     , signalArg);

        // fire a reume event
        const resumeEvent = new InteractEvent(interaction,
                                              event,
                                              interaction.prepared.name,
                                              'inertiaresume',
                                              interaction.element);

        interaction.target.fire(resumeEvent);
        interaction.prevEvent = resumeEvent;
        modifiers.resetStatuses(interaction.modifierStatuses);

        utils.copyCoords(interaction.prevCoords, interaction.curCoords);
        break;
      }

      element = utils.parentNode(element);
    }
  }
});

Interaction.signals.on('up', function ({ interaction, event }) {
  const status = interaction.inertiaStatus;

  if (!interaction.interacting() || status.active) { return; }

  const target = interaction.target;
  const options = target && target.options;
  const inertiaOptions = options && interaction.prepared.name && options[interaction.prepared.name].inertia;

  const now = new Date().getTime();
  const statuses = {};
  const page = utils.extend({}, interaction.curCoords.page);
  const pointerSpeed = interaction.pointerDelta.client.speed;

  let smoothEnd = false;
  let modifierResult;

  // check if inertia should be started
  const inertiaPossible = (inertiaOptions && inertiaOptions.enabled
                     && interaction.prepared.name !== 'gesture'
                     && event !== status.startEvent);

  const inertia = (inertiaPossible
    && (now - interaction.curCoords.timeStamp) < 50
    && pointerSpeed > inertiaOptions.minSpeed
    && pointerSpeed > inertiaOptions.endSpeed);

  const modifierArg = {
    interaction,
    pageCoords: page,
    statuses,
    preEnd: true,
    requireEndOnly: true,
  };

  // smoothEnd
  if (inertiaPossible && !inertia) {
    modifiers.resetStatuses(statuses);

    modifierResult = modifiers.setAll(modifierArg);

    if (modifierResult.shouldMove && modifierResult.locked) {
      smoothEnd = true;
    }
  }

  if (!(inertia || smoothEnd)) { return; }

  utils.copyCoords(status.upCoords, interaction.curCoords);

  interaction.pointers[0] = status.startEvent =
    new InteractEvent(interaction, event, interaction.prepared.name, 'inertiastart', interaction.element);

  status.t0 = now;

  status.active = true;
  status.allowResume = inertiaOptions.allowResume;
  interaction.simulation = status;

  target.fire(status.startEvent);

  if (inertia) {
    status.vx0 = interaction.pointerDelta.client.vx;
    status.vy0 = interaction.pointerDelta.client.vy;
    status.v0 = pointerSpeed;

    calcInertia(interaction, status);

    utils.extend(page, interaction.curCoords.page);

    page.x += status.xe;
    page.y += status.ye;

    modifiers.resetStatuses(statuses);

    modifierResult = modifiers.setAll(modifierArg);

    status.modifiedXe += modifierResult.dx;
    status.modifiedYe += modifierResult.dy;

    status.i = animationFrame.request(interaction.boundInertiaFrame);
  }
  else {
    status.smoothEnd = true;
    status.xe = modifierResult.dx;
    status.ye = modifierResult.dy;

    status.sx = status.sy = 0;

    status.i = animationFrame.request(interaction.boundSmoothEndFrame);
  }
});

Interaction.signals.on('stop-active', function ({ interaction }) {
  const status = interaction.inertiaStatus;

  if (status.active) {
    animationFrame.cancel(status.i);
    status.active = false;
    interaction.simulation = null;
  }
});

function calcInertia (interaction, status) {
  const inertiaOptions = interaction.target.options[interaction.prepared.name].inertia;
  const lambda = inertiaOptions.resistance;
  const inertiaDur = -Math.log(inertiaOptions.endSpeed / status.v0) / lambda;

  status.x0 = interaction.prevEvent.pageX;
  status.y0 = interaction.prevEvent.pageY;
  status.t0 = status.startEvent.timeStamp / 1000;
  status.sx = status.sy = 0;

  status.modifiedXe = status.xe = (status.vx0 - inertiaDur) / lambda;
  status.modifiedYe = status.ye = (status.vy0 - inertiaDur) / lambda;
  status.te = inertiaDur;

  status.lambda_v0 = lambda / status.v0;
  status.one_ve_v0 = 1 - inertiaOptions.endSpeed / status.v0;
}

function inertiaFrame () {
  updateInertiaCoords(this);
  utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);

  const status = this.inertiaStatus;
  const options = this.target.options[this.prepared.name].inertia;
  const lambda = options.resistance;
  const t = new Date().getTime() / 1000 - status.t0;

  if (t < status.te) {

    const progress =  1 - (Math.exp(-lambda * t) - status.lambda_v0) / status.one_ve_v0;

    if (status.modifiedXe === status.xe && status.modifiedYe === status.ye) {
      status.sx = status.xe * progress;
      status.sy = status.ye * progress;
    }
    else {
      const quadPoint = utils.getQuadraticCurvePoint(0, 0,
                                                     status.xe,
                                                     status.ye,
                                                     status.modifiedXe,
                                                     status.modifiedYe,
                                                     progress);

      status.sx = quadPoint.x;
      status.sy = quadPoint.y;
    }

    this.doMove();

    status.i = animationFrame.request(this.boundInertiaFrame);
  }
  else {
    status.sx = status.modifiedXe;
    status.sy = status.modifiedYe;

    this.doMove();
    this.end(status.startEvent);
    status.active = false;
    this.simulation = null;
  }

  utils.copyCoords(this.prevCoords, this.curCoords);
}

function smoothEndFrame () {
  updateInertiaCoords(this);

  const status = this.inertiaStatus;
  const t = new Date().getTime() - status.t0;
  const duration = this.target.options[this.prepared.name].inertia.smoothEndDuration;

  if (t < duration) {
    status.sx = utils.easeOutQuad(t, 0, status.xe, duration);
    status.sy = utils.easeOutQuad(t, 0, status.ye, duration);

    this.pointerMove(status.startEvent, status.startEvent);

    status.i = animationFrame.request(this.boundSmoothEndFrame);
  }
  else {
    status.sx = status.xe;
    status.sy = status.ye;

    this.pointerMove(status.startEvent, status.startEvent);
    this.end(status.startEvent);

    status.smoothEnd =
      status.active = false;
    this.simulation = null;
  }
}

function updateInertiaCoords (interaction) {
  const status = interaction.inertiaStatus;

  // return if inertia isn't running
  if (!status.active) { return; }

  const pageUp   = status.upCoords.page;
  const clientUp = status.upCoords.client;

  utils.setCoords(interaction.curCoords, [ {
    pageX  : pageUp.x   + status.sx,
    pageY  : pageUp.y   + status.sy,
    clientX: clientUp.x + status.sx,
    clientY: clientUp.y + status.sy,
  } ]);
}

},{"./InteractEvent":2,"./Interaction":4,"./modifiers/base":22,"./utils":43,"./utils/raf":49}],22:[function(require,module,exports){
const InteractEvent = require('../InteractEvent');
const Interaction   = require('../Interaction');
const extend        = require('../utils/extend');

const modifiers = {
  names: [],

  setOffsets: function (arg) {
    const { interaction, pageCoords: page } = arg;
    const { target, element, startOffset } = interaction;
    const rect = target.getRect(element);

    if (rect) {
      startOffset.left = page.x - rect.left;
      startOffset.top  = page.y - rect.top;

      startOffset.right  = rect.right  - page.x;
      startOffset.bottom = rect.bottom - page.y;

      if (!('width'  in rect)) { rect.width  = rect.right  - rect.left; }
      if (!('height' in rect)) { rect.height = rect.bottom - rect.top ; }
    }
    else {
      startOffset.left = startOffset.top = startOffset.right = startOffset.bottom = 0;
    }

    arg.rect = rect;
    arg.interactable = target;
    arg.element = element;

    for (const modifierName of modifiers.names) {
      arg.options = target.options[interaction.prepared.name][modifierName];

      if (!arg.options) {
        continue;
      }

      interaction.modifierOffsets[modifierName] = modifiers[modifierName].setOffset(arg);
    }
  },

  setAll: function (arg) {
    const { interaction, statuses, preEnd, requireEndOnly } = arg;
    const result = {
      dx: 0,
      dy: 0,
      changed: false,
      locked: false,
      shouldMove: true,
    };

    arg.modifiedCoords = extend({}, arg.pageCoords);

    for (const modifierName of modifiers.names) {
      const modifier = modifiers[modifierName];
      const options = interaction.target.options[interaction.prepared.name][modifierName];

      if (!shouldDo(options, preEnd, requireEndOnly)) { continue; }

      arg.status = arg.status = statuses[modifierName];
      arg.options = options;
      arg.offset = arg.interaction.modifierOffsets[modifierName];

      modifier.set(arg);

      if (arg.status.locked) {
        arg.modifiedCoords.x += arg.status.dx;
        arg.modifiedCoords.y += arg.status.dy;

        result.dx += arg.status.dx;
        result.dy += arg.status.dy;

        result.locked = true;
      }
    }

    // a move should be fired if:
    //  - there are no modifiers enabled,
    //  - no modifiers are "locked" i.e. have changed the pointer's coordinates, or
    //  - the locked coords have changed since the last pointer move
    result.shouldMove = !arg.status || !result.locked || arg.status.changed;

    return result;
  },

  resetStatuses: function (statuses) {
    for (const modifierName of modifiers.names) {
      const status = statuses[modifierName] || {};

      status.dx = status.dy = 0;
      status.modifiedX = status.modifiedY = NaN;
      status.locked = false;
      status.changed = true;

      statuses[modifierName] = status;
    }

    return statuses;
  },

  start: function ({ interaction }, signalName) {
    const arg = {
      interaction,
      pageCoords: (signalName === 'action-resume' ?
                   interaction.curCoords : interaction.startCoords).page,
      startOffset: interaction.startOffset,
      statuses: interaction.modifierStatuses,
      preEnd: false,
      requireEndOnly: false,
    };

    modifiers.setOffsets(arg);
    modifiers.resetStatuses(arg.statuses);

    arg.pageCoords = extend({}, interaction.startCoords.page);
    interaction.modifierResult = modifiers.setAll(arg);
  },

  beforeMove: function ({ interaction, preEnd, interactingBeforeMove }) {
    const modifierResult = modifiers.setAll({
      interaction,
      preEnd,
      pageCoords: interaction.curCoords.page,
      statuses: interaction.modifierStatuses,
      requireEndOnly: false,
    });

    // don't fire an action move if a modifier would keep the event in the same
    // cordinates as before
    if (!modifierResult.shouldMove && interactingBeforeMove) {
      interaction._dontFireMove = true;
    }

    interaction.modifierResult = modifierResult;
  },

  end: function ({ interaction, event }) {
    for (const modifierName of modifiers.names) {
      const options = interaction.target.options[interaction.prepared.name][modifierName];

      // if the endOnly option is true for any modifier
      if (shouldDo(options, true, true)) {
        // fire a move event at the modified coordinates
        interaction.doMove({ event, preEnd: true });
        break;
      }
    }
  },

  setXY: function (arg) {
    const { iEvent, interaction } = arg;
    const modifierArg = extend({}, arg);

    for (let i = 0; i < modifiers.names.length; i++) {
      const modifierName = modifiers.names[i];
      modifierArg.options = interaction.target.options[interaction.prepared.name][modifierName];

      if (!modifierArg.options) {
        continue;
      }

      const modifier = modifiers[modifierName];

      modifierArg.status = interaction.modifierStatuses[modifierName];

      iEvent[modifierName] = modifier.modifyCoords(modifierArg);
    }
  },
};

Interaction.signals.on('new', function (interaction) {
  interaction.startOffset      = { left: 0, right: 0, top: 0, bottom: 0 };
  interaction.modifierOffsets  = {};
  interaction.modifierStatuses = modifiers.resetStatuses({});
  interaction.modifierResult   = null;
});

Interaction.signals.on('action-start' , modifiers.start);
Interaction.signals.on('action-resume', modifiers.start);
Interaction.signals.on('before-action-move', modifiers.beforeMove);
Interaction.signals.on('action-end', modifiers.end);

InteractEvent.signals.on('set-xy', modifiers.setXY);

function shouldDo (options, preEnd, requireEndOnly) {
  return (options && options.enabled
          && (preEnd || !options.endOnly)
          && (!requireEndOnly || options.endOnly));
}

module.exports = modifiers;

},{"../InteractEvent":2,"../Interaction":4,"../utils/extend":40}],16:[function(require,module,exports){
require('./base').setActionDefaults(require('../actions/resize'));

},{"../actions/resize":9,"./base":12}],15:[function(require,module,exports){
const autoStart   = require('./base');
const Interaction = require('../Interaction');

autoStart.defaults.perAction.hold = 0;
autoStart.defaults.perAction.delay = 0;

Interaction.signals.on('new', function (interaction) {
  interaction.autoStartHoldTimer = null;
});

autoStart.signals.on('prepared', function ({ interaction }) {
  const hold = getHoldDuration(interaction);

  if (hold > 0) {
    interaction.autoStartHoldTimer = setTimeout(() => {
      interaction.start(interaction.prepared, interaction.target, interaction.element);
    }, hold);
  }
});

Interaction.signals.on('move', function ({ interaction, duplicate }) {
  if (interaction.pointerWasMoved && !duplicate) {
    clearTimeout(interaction.autoStartHoldTimer);
  }
});

// prevent regular down->move autoStart
autoStart.signals.on('before-start', function ({ interaction }) {
  const hold = getHoldDuration(interaction);

  if (hold > 0) {
    interaction.prepared.name = null;
  }
});

function getHoldDuration (interaction) {
  const actionName = interaction.prepared && interaction.prepared.name;

  if (!actionName) { return null; }

  const options = interaction.target.options;

  return options[actionName].hold || options[actionName].delay;
}

module.exports = {
  getHoldDuration,
};

},{"../Interaction":4,"./base":12}],14:[function(require,module,exports){
require('./base').setActionDefaults(require('../actions/gesture'));

},{"../actions/gesture":8,"./base":12}],13:[function(require,module,exports){
const autoStart = require('./base');
const scope     = require('../scope');
const is        = require('../utils/is');

const { parentNode } = require('../utils/domUtils');

autoStart.setActionDefaults(require('../actions/drag'));

autoStart.signals.on('before-start',  function ({ interaction, eventTarget, dx, dy }) {
  if (interaction.prepared.name !== 'drag') { return; }

  // check if a drag is in the correct axis
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const targetOptions = interaction.target.options.drag;
  const startAxis = targetOptions.startAxis;
  const currentAxis = (absX > absY ? 'x' : absX < absY ? 'y' : 'xy');

  interaction.prepared.axis = targetOptions.lockAxis === 'start'
    ? currentAxis[0] // always lock to one axis even if currentAxis === 'xy'
    : targetOptions.lockAxis;

  // if the movement isn't in the startAxis of the interactable
  if (currentAxis !== 'xy' && startAxis !== 'xy' && startAxis !== currentAxis) {
    // cancel the prepared action
    interaction.prepared.name = null;

    // then try to get a drag from another ineractable
    let element = eventTarget;

    const getDraggable = function (interactable) {
      if (interactable === interaction.target) { return; }

      const options = interaction.target.options.drag;

      if (!options.manualStart
          && interactable.testIgnoreAllow(options, element, eventTarget)) {

        const action = interactable.getAction(
          interaction.downPointer, interaction.downEvent, interaction, element);

        if (action
            && action.name === 'drag'
            && checkStartAxis(currentAxis, interactable)
            && autoStart.validateAction(action, interactable, element, eventTarget)) {

          return interactable;
        }
      }
    };

    // check all interactables
    while (is.element(element)) {
      const interactable = scope.interactables.forEachMatch(element, getDraggable);

      if (interactable) {
        interaction.prepared.name = 'drag';
        interaction.target = interactable;
        interaction.element = element;
        break;
      }

      element = parentNode(element);
    }
  }
});

function checkStartAxis (startAxis, interactable) {
  if (!interactable) { return false; }

  const thisAxis = interactable.options.drag.startAxis;

  return (startAxis === 'xy' || thisAxis === 'xy' || thisAxis === startAxis);
}

},{"../actions/drag":6,"../scope":32,"../utils/domUtils":38,"../utils/is":45,"./base":12}],12:[function(require,module,exports){
const interact       = require('../interact');
const Interactable   = require('../Interactable');
const Interaction    = require('../Interaction');
const actions        = require('../actions/base');
const defaultOptions = require('../defaultOptions');
const scope          = require('../scope');
const utils          = require('../utils');
const signals        = require('../utils/Signals').new();

require('./InteractableMethods');

const autoStart = {
  signals,
  withinInteractionLimit,
  // Allow this many interactions to happen simultaneously
  maxInteractions: Infinity,
  defaults: {
    perAction: {
      manualStart: false,
      max: Infinity,
      maxPerElement: 1,
      allowFrom:  null,
      ignoreFrom: null,

      // only allow left button by default
      // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
      mouseButtons: 1,
    },
  },
  setActionDefaults: function (action) {
    utils.extend(action.defaults, autoStart.defaults.perAction);
  },
  validateAction,
};

// set cursor style on mousedown
Interaction.signals.on('down', function ({ interaction, pointer, event, eventTarget }) {
  if (interaction.interacting()) { return; }

  const actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
  prepare(interaction, actionInfo);
});

// set cursor style on mousemove
Interaction.signals.on('move', function ({ interaction, pointer, event, eventTarget }) {
  if (interaction.pointerType !== 'mouse'
      || interaction.pointerIsDown
      || interaction.interacting()) { return; }

  const actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
  prepare(interaction, actionInfo);
});

Interaction.signals.on('move', function (arg) {
  const { interaction, event } = arg;

  if (!interaction.pointerIsDown
      || interaction.interacting()
      || !interaction.pointerWasMoved
      || !interaction.prepared.name) {
    return;
  }

  signals.fire('before-start', arg);

  const target = interaction.target;

  if (interaction.prepared.name && target) {
    // check manualStart and interaction limit
    if (target.options[interaction.prepared.name].manualStart
        || !withinInteractionLimit(target, interaction.element, interaction.prepared)) {
      interaction.stop(event);
    }
    else {
      interaction.start(interaction.prepared, target, interaction.element);
    }
  }
});

// Check if the current target supports the action.
// If so, return the validated action. Otherwise, return null
function validateAction (action, interactable, element, eventTarget) {
  if (utils.is.object(action)
      && interactable.testIgnoreAllow(interactable.options[action.name], element, eventTarget)
      && interactable.options[action.name].enabled
      && withinInteractionLimit(interactable, element, action)) {
    return action;
  }

  return null;
}

function validateSelector (interaction, pointer, event, matches, matchElements, eventTarget) {
  for (let i = 0, len = matches.length; i < len; i++) {
    const match = matches[i];
    const matchElement = matchElements[i];
    const action = validateAction(match.getAction(pointer, event, interaction, matchElement),
                                  match,
                                  matchElement,
                                  eventTarget);

    if (action) {
      return {
        action,
        target: match,
        element: matchElement,
      };
    }
  }

  return {};
}

function getActionInfo (interaction, pointer, event, eventTarget) {
  let matches = [];
  let matchElements = [];

  let element = eventTarget;

  function pushMatches (interactable) {
    matches.push(interactable);
    matchElements.push(element);
  }

  while (utils.is.element(element)) {
    matches = [];
    matchElements = [];

    scope.interactables.forEachMatch(element, pushMatches);

    const actionInfo = validateSelector(interaction, pointer, event, matches, matchElements, eventTarget);

    if (actionInfo.action
      && !actionInfo.target.options[actionInfo.action.name].manualStart) {
      return actionInfo;
    }

    element = utils.parentNode(element);
  }

  return {};
}

function prepare (interaction, { action, target, element }) {
  action = action || {};

  if (interaction.target && interaction.target.options.styleCursor) {
    interaction.target._doc.documentElement.style.cursor = '';
  }

  interaction.target = target;
  interaction.element = element;
  utils.copyAction(interaction.prepared, action);

  if (target && target.options.styleCursor) {
    const cursor = action? actions[action.name].getCursor(action) : '';
    interaction.target._doc.documentElement.style.cursor = cursor;
  }

  signals.fire('prepared', { interaction: interaction });
}

Interaction.signals.on('stop', function ({ interaction }) {
  const target = interaction.target;

  if (target && target.options.styleCursor) {
    target._doc.documentElement.style.cursor = '';
  }
});

function withinInteractionLimit (interactable, element, action) {
  const options = interactable.options;
  const maxActions = options[action.name].max;
  const maxPerElement = options[action.name].maxPerElement;
  let activeInteractions = 0;
  let targetCount = 0;
  let targetElementCount = 0;

  // no actions if any of these values == 0
  if (!(maxActions && maxPerElement && autoStart.maxInteractions)) { return; }

  for (const interaction of scope.interactions) {
    const otherAction = interaction.prepared.name;

    if (!interaction.interacting()) { continue; }

    activeInteractions++;

    if (activeInteractions >= autoStart.maxInteractions) {
      return false;
    }

    if (interaction.target !== interactable) { continue; }

    targetCount += (otherAction === action.name)|0;

    if (targetCount >= maxActions) {
      return false;
    }

    if (interaction.element === element) {
      targetElementCount++;

      if (otherAction !== action.name || targetElementCount >= maxPerElement) {
        return false;
      }
    }
  }

  return autoStart.maxInteractions > 0;
}

/**
 * Returns or sets the maximum number of concurrent interactions allowed.  By
 * default only 1 interaction is allowed at a time (for backwards
 * compatibility). To allow multiple interactions on the same Interactables and
 * elements, you need to enable it in the draggable, resizable and gesturable
 * `'max'` and `'maxPerElement'` options.
 *
 * @alias module:interact.maxInteractions
 *
 * @param {number} [newValue] Any number. newValue <= 0 means no interactions.
 */
interact.maxInteractions = function (newValue) {
  if (utils.is.number(newValue)) {
    autoStart.maxInteractions = newValue;

    return interact;
  }

  return autoStart.maxInteractions;
};

Interactable.settingsMethods.push('styleCursor');
Interactable.settingsMethods.push('actionChecker');
Interactable.settingsMethods.push('ignoreFrom');
Interactable.settingsMethods.push('allowFrom');

defaultOptions.base.actionChecker = null;
defaultOptions.base.styleCursor = true;

utils.extend(defaultOptions.perAction, autoStart.defaults.perAction);

module.exports = autoStart;

},{"../Interactable":3,"../Interaction":4,"../actions/base":5,"../defaultOptions":17,"../interact":20,"../scope":32,"../utils":43,"../utils/Signals":33,"./InteractableMethods":11}],11:[function(require,module,exports){
/** @lends Interactable */
const Interactable = require('../Interactable');
const actions      = require('../actions/base');
const is           = require('../utils/is');
const domUtils     = require('../utils/domUtils');

const { warnOnce } = require('../utils');

Interactable.prototype.getAction = function (pointer, event, interaction, element) {
  const action = this.defaultActionChecker(pointer, event, interaction, element);

  if (this.options.actionChecker) {
    return this.options.actionChecker(pointer, event, action, this, element, interaction);
  }

  return action;
};

/**
 * ```js
 * interact(element, { ignoreFrom: document.getElementById('no-action') });
 * // or
 * interact(element).ignoreFrom('input, textarea, a');
 * ```
 * @deprecated
 * If the target of the `mousedown`, `pointerdown` or `touchstart` event or any
 * of it's parents match the given CSS selector or Element, no
 * drag/resize/gesture is started.
 *
 * Don't use this method. Instead set the `ignoreFrom` option for each action
 * or for `pointerEvents`
 *
 * @example
 * interact(targett)
 *   .draggable({
 *     ignoreFrom: 'input, textarea, a[href]'',
 *   })
 *   .pointerEvents({
 *     ignoreFrom: '[no-pointer]',
 *   });
 *
 * @param {string | Element | null} [newValue] a CSS selector string, an
 * Element or `null` to not ignore any elements
 * @return {string | Element | object} The current ignoreFrom value or this
 * Interactable
 */
Interactable.prototype.ignoreFrom = warnOnce(function (newValue) {
  return this._backCompatOption('ignoreFrom', newValue);
}, 'Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).');

/**
 * ```js
 *
 * @deprecated
 * A drag/resize/gesture is started only If the target of the `mousedown`,
 * `pointerdown` or `touchstart` event or any of it's parents match the given
 * CSS selector or Element.
 *
 * Don't use this method. Instead set the `allowFrom` option for each action
 * or for `pointerEvents`
 *
 * @example
 * interact(targett)
 *   .resizable({
 *     allowFrom: '.resize-handle',
 *   .pointerEvents({
 *     allowFrom: '.handle',,
 *   });
 *
 * @param {string | Element | null} [newValue] a CSS selector string, an
 * Element or `null` to allow from any element
 * @return {string | Element | object} The current allowFrom value or this
 * Interactable
 */
Interactable.prototype.allowFrom = warnOnce(function (newValue) {
  return this._backCompatOption('allowFrom', newValue);
}, 'Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).');

Interactable.prototype.testIgnore = function (ignoreFrom, interactableElement, element) {
  if (!ignoreFrom || !is.element(element)) { return false; }

  if (is.string(ignoreFrom)) {
    return domUtils.matchesUpTo(element, ignoreFrom, interactableElement);
  }
  else if (is.element(ignoreFrom)) {
    return domUtils.nodeContains(ignoreFrom, element);
  }

  return false;
};

Interactable.prototype.testAllow = function (allowFrom, interactableElement, element) {
  if (!allowFrom) { return true; }

  if (!is.element(element)) { return false; }

  if (is.string(allowFrom)) {
    return domUtils.matchesUpTo(element, allowFrom, interactableElement);
  }
  else if (is.element(allowFrom)) {
    return domUtils.nodeContains(allowFrom, element);
  }

  return false;
};

Interactable.prototype.testIgnoreAllow = function (options, interactableElement, eventTarget) {
  return (!this.testIgnore(options.ignoreFrom, interactableElement, eventTarget)
    && this.testAllow(options.allowFrom, interactableElement, eventTarget));
};

/**
 * ```js
 * interact('.resize-drag')
 *   .resizable(true)
 *   .draggable(true)
 *   .actionChecker(function (pointer, event, action, interactable, element, interaction) {
 *
 *   if (interact.matchesSelector(event.target, '.drag-handle') {
 *     // force drag with handle target
 *     action.name = drag;
 *   }
 *   else {
 *     // resize from the top and right edges
 *     action.name  = 'resize';
 *     action.edges = { top: true, right: true };
 *   }
 *
 *   return action;
 * });
 * ```
 *
 * Gets or sets the function used to check action to be performed on
 * pointerDown
 *
 * @param {function | null} [checker] A function which takes a pointer event,
 * defaultAction string, interactable, element and interaction as parameters
 * and returns an object with name property 'drag' 'resize' or 'gesture' and
 * optionally an `edges` object with boolean 'top', 'left', 'bottom' and right
 * props.
 * @return {Function | Interactable} The checker function or this Interactable
 */
Interactable.prototype.actionChecker = function (checker) {
  if (is.function(checker)) {
    this.options.actionChecker = checker;

    return this;
  }

  if (checker === null) {
    delete this.options.actionChecker;

    return this;
  }

  return this.options.actionChecker;
};

/**
 * Returns or sets whether the the cursor should be changed depending on the
 * action that would be performed if the mouse were pressed and dragged.
 *
 * @param {boolean} [newValue]
 * @return {boolean | Interactable} The current setting or this Interactable
 */
Interactable.prototype.styleCursor = function (newValue) {
  if (is.bool(newValue)) {
    this.options.styleCursor = newValue;

    return this;
  }

  if (newValue === null) {
    delete this.options.styleCursor;

    return this;
  }

  return this.options.styleCursor;
};

Interactable.prototype.defaultActionChecker = function (pointer, event, interaction, element) {
  const rect = this.getRect(element);
  const buttons = event.buttons || ({
    0: 1,
    1: 4,
    3: 8,
    4: 16,
  })[event.button];
  let action = null;

  for (const actionName of actions.names) {
    // check mouseButton setting if the pointer is down
    if (interaction.pointerIsDown
        && /mouse|pointer/.test(interaction.pointerType)
        && (buttons & this.options[actionName].mouseButtons) === 0) {
      continue;
    }

    action = actions[actionName].checker(pointer, event, this, element, interaction, rect);

    if (action) {
      return action;
    }
  }
};


},{"../Interactable":3,"../actions/base":5,"../utils":43,"../utils/domUtils":38,"../utils/is":45}],10:[function(require,module,exports){
const raf            = require('./utils/raf');
const getWindow      = require('./utils/window').getWindow;
const is             = require('./utils/is');
const domUtils       = require('./utils/domUtils');
const Interaction    = require('./Interaction');
const defaultOptions = require('./defaultOptions');

const autoScroll = {
  defaults: {
    enabled  : false,
    container: null,     // the item that is scrolled (Window or HTMLElement)
    margin   : 60,
    speed    : 300,      // the scroll speed in pixels per second
  },

  interaction: null,
  i: null,    // the handle returned by window.setInterval
  x: 0, y: 0, // Direction each pulse is to scroll in

  isScrolling: false,
  prevTime: 0,

  start: function (interaction) {
    autoScroll.isScrolling = true;
    raf.cancel(autoScroll.i);

    autoScroll.interaction = interaction;
    autoScroll.prevTime = new Date().getTime();
    autoScroll.i = raf.request(autoScroll.scroll);
  },

  stop: function () {
    autoScroll.isScrolling = false;
    raf.cancel(autoScroll.i);
  },

  // scroll the window by the values in scroll.x/y
  scroll: function () {
    const options = autoScroll.interaction.target.options[autoScroll.interaction.prepared.name].autoScroll;
    const container = options.container || getWindow(autoScroll.interaction.element);
    const now = new Date().getTime();
    // change in time in seconds
    const dt = (now - autoScroll.prevTime) / 1000;
    // displacement
    const s = options.speed * dt;

    if (s >= 1) {
      if (is.window(container)) {
        container.scrollBy(autoScroll.x * s, autoScroll.y * s);
      }
      else if (container) {
        container.scrollLeft += autoScroll.x * s;
        container.scrollTop  += autoScroll.y * s;
      }

      autoScroll.prevTime = now;
    }

    if (autoScroll.isScrolling) {
      raf.cancel(autoScroll.i);
      autoScroll.i = raf.request(autoScroll.scroll);
    }
  },
  check: function (interactable, actionName) {
    const options = interactable.options;

    return options[actionName].autoScroll && options[actionName].autoScroll.enabled;
  },
  onInteractionMove: function ({ interaction, pointer }) {
    if (!(interaction.interacting()
          && autoScroll.check(interaction.target, interaction.prepared.name))) {
      return;
    }

    if (interaction.simulation) {
      autoScroll.x = autoScroll.y = 0;
      return;
    }

    let top;
    let right;
    let bottom;
    let left;

    const options = interaction.target.options[interaction.prepared.name].autoScroll;
    const container = options.container || getWindow(interaction.element);

    if (is.window(container)) {
      left   = pointer.clientX < autoScroll.margin;
      top    = pointer.clientY < autoScroll.margin;
      right  = pointer.clientX > container.innerWidth  - autoScroll.margin;
      bottom = pointer.clientY > container.innerHeight - autoScroll.margin;
    }
    else {
      const rect = domUtils.getElementClientRect(container);

      left   = pointer.clientX < rect.left   + autoScroll.margin;
      top    = pointer.clientY < rect.top    + autoScroll.margin;
      right  = pointer.clientX > rect.right  - autoScroll.margin;
      bottom = pointer.clientY > rect.bottom - autoScroll.margin;
    }

    autoScroll.x = (right ? 1: left? -1: 0);
    autoScroll.y = (bottom? 1:  top? -1: 0);

    if (!autoScroll.isScrolling) {
      // set the autoScroll properties to those of the target
      autoScroll.margin = options.margin;
      autoScroll.speed  = options.speed;

      autoScroll.start(interaction);
    }
  },
};

Interaction.signals.on('stop-active', function () {
  autoScroll.stop();
});

Interaction.signals.on('action-move', autoScroll.onInteractionMove);

defaultOptions.perAction.autoScroll = autoScroll.defaults;

module.exports = autoScroll;

},{"./Interaction":4,"./defaultOptions":17,"./utils/domUtils":38,"./utils/is":45,"./utils/raf":49,"./utils/window":51}],49:[function(require,module,exports){
const { window } = require('./window');

const vendors = ['ms', 'moz', 'webkit', 'o'];
let lastTime = 0;
let request;
let cancel;

for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
  request = window[vendors[x] + 'RequestAnimationFrame'];
  cancel = window[vendors[x] +'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!request) {
  request = function (callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(function () { callback(currTime + timeToCall); },
                          timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancel) {
  cancel = function (id) {
    clearTimeout(id);
  };
}

module.exports = {
  request,
  cancel,
};

},{"./window":51}],9:[function(require,module,exports){
const actions        = require('./base');
const utils          = require('../utils');
const browser        = require('../utils/browser');
const InteractEvent  = require('../InteractEvent');
/** @lends Interactable */
const Interactable   = require('../Interactable');
const Interaction    = require('../Interaction');
const defaultOptions = require('../defaultOptions');

// Less Precision with touch input
const defaultMargin = browser.supportsTouch || browser.supportsPointerEvent? 20: 10;

const resize = {
  defaults: {
    enabled     : false,
    mouseButtons: null,

    origin    : null,
    snap      : null,
    restrict  : null,
    inertia   : null,
    autoScroll: null,

    square: false,
    preserveAspectRatio: false,
    axis: 'xy',

    // use default margin
    margin: NaN,

    // object with props left, right, top, bottom which are
    // true/false values to resize when the pointer is over that edge,
    // CSS selectors to match the handles for each direction
    // or the Elements for each handle
    edges: null,

    // a value of 'none' will limit the resize rect to a minimum of 0x0
    // 'negate' will alow the rect to have negative width/height
    // 'reposition' will keep the width/height positive by swapping
    // the top and bottom edges and/or swapping the left and right edges
    invert: 'none',
  },

  checker: function (pointer, event, interactable, element, interaction, rect) {
    if (!rect) { return null; }

    const page = utils.extend({}, interaction.curCoords.page);
    const options = interactable.options;

    if (options.resize.enabled) {
      const resizeOptions = options.resize;
      const resizeEdges = { left: false, right: false, top: false, bottom: false };

      // if using resize.edges
      if (utils.is.object(resizeOptions.edges)) {
        for (const edge in resizeEdges) {
          resizeEdges[edge] = checkResizeEdge(edge,
                                              resizeOptions.edges[edge],
                                              page,
                                              interaction._eventTarget,
                                              element,
                                              rect,
                                              resizeOptions.margin || defaultMargin);
        }

        resizeEdges.left = resizeEdges.left && !resizeEdges.right;
        resizeEdges.top  = resizeEdges.top  && !resizeEdges.bottom;

        if (resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom) {
          return {
            name: 'resize',
            edges: resizeEdges,
          };
        }
      }
      else {
        const right  = options.resize.axis !== 'y' && page.x > (rect.right  - defaultMargin);
        const bottom = options.resize.axis !== 'x' && page.y > (rect.bottom - defaultMargin);

        if (right || bottom) {
          return {
            name: 'resize',
            axes: (right? 'x' : '') + (bottom? 'y' : ''),
          };
        }
      }
    }

    return null;
  },

  cursors: (browser.isIe9 ? {
    x : 'e-resize',
    y : 's-resize',
    xy: 'se-resize',

    top        : 'n-resize',
    left       : 'w-resize',
    bottom     : 's-resize',
    right      : 'e-resize',
    topleft    : 'se-resize',
    bottomright: 'se-resize',
    topright   : 'ne-resize',
    bottomleft : 'ne-resize',
  } : {
    x : 'ew-resize',
    y : 'ns-resize',
    xy: 'nwse-resize',

    top        : 'ns-resize',
    left       : 'ew-resize',
    bottom     : 'ns-resize',
    right      : 'ew-resize',
    topleft    : 'nwse-resize',
    bottomright: 'nwse-resize',
    topright   : 'nesw-resize',
    bottomleft : 'nesw-resize',
  }),

  getCursor: function (action) {
    if (action.axis) {
      return resize.cursors[action.name + action.axis];
    }
    else if (action.edges) {
      let cursorKey = '';
      const edgeNames = ['top', 'bottom', 'left', 'right'];

      for (let i = 0; i < 4; i++) {
        if (action.edges[edgeNames[i]]) {
          cursorKey += edgeNames[i];
        }
      }

      return resize.cursors[cursorKey];
    }
  },
};

// resizestart
InteractEvent.signals.on('new', function ({ iEvent, interaction }) {
  if (iEvent.type !== 'resizestart' || !interaction.prepared.edges) {
    return;
  }

  const startRect = interaction.target.getRect(interaction.element);
  const resizeOptions = interaction.target.options.resize;

  /*
   * When using the `resizable.square` or `resizable.preserveAspectRatio` options, resizing from one edge
   * will affect another. E.g. with `resizable.square`, resizing to make the right edge larger will make
   * the bottom edge larger by the same amount. We call these 'linked' edges. Any linked edges will depend
   * on the active edges and the edge being interacted with.
   */
  if (resizeOptions.square || resizeOptions.preserveAspectRatio) {
    const linkedEdges = utils.extend({}, interaction.prepared.edges);

    linkedEdges.top    = linkedEdges.top    || (linkedEdges.left   && !linkedEdges.bottom);
    linkedEdges.left   = linkedEdges.left   || (linkedEdges.top    && !linkedEdges.right );
    linkedEdges.bottom = linkedEdges.bottom || (linkedEdges.right  && !linkedEdges.top   );
    linkedEdges.right  = linkedEdges.right  || (linkedEdges.bottom && !linkedEdges.left  );

    interaction.prepared._linkedEdges = linkedEdges;
  }
  else {
    interaction.prepared._linkedEdges = null;
  }

  // if using `resizable.preserveAspectRatio` option, record aspect ratio at the start of the resize
  if (resizeOptions.preserveAspectRatio) {
    interaction.resizeStartAspectRatio = startRect.width / startRect.height;
  }

  interaction.resizeRects = {
    start     : startRect,
    current   : utils.extend({}, startRect),
    inverted  : utils.extend({}, startRect),
    previous  : utils.extend({}, startRect),
    delta     : {
      left: 0, right : 0, width : 0,
      top : 0, bottom: 0, height: 0,
    },
  };

  iEvent.rect = interaction.resizeRects.inverted;
  iEvent.deltaRect = interaction.resizeRects.delta;
});

// resizemove
InteractEvent.signals.on('new', function ({ iEvent, phase, interaction }) {
  if (phase !== 'move' || !interaction.prepared.edges) { return; }

  const resizeOptions = interaction.target.options.resize;
  const invert = resizeOptions.invert;
  const invertible = invert === 'reposition' || invert === 'negate';

  let edges = interaction.prepared.edges;

  const start      = interaction.resizeRects.start;
  const current    = interaction.resizeRects.current;
  const inverted   = interaction.resizeRects.inverted;
  const delta      = interaction.resizeRects.delta;
  const previous   = utils.extend(interaction.resizeRects.previous, inverted);
  const originalEdges = edges;

  let dx = iEvent.dx;
  let dy = iEvent.dy;

  if (resizeOptions.preserveAspectRatio || resizeOptions.square) {
    // `resize.preserveAspectRatio` takes precedence over `resize.square`
    const startAspectRatio = resizeOptions.preserveAspectRatio
      ? interaction.resizeStartAspectRatio
      : 1;

    edges = interaction.prepared._linkedEdges;

    if ((originalEdges.left && originalEdges.bottom)
        || (originalEdges.right && originalEdges.top)) {
      dy = -dx / startAspectRatio;
    }
    else if (originalEdges.left || originalEdges.right ) { dy = dx / startAspectRatio; }
    else if (originalEdges.top  || originalEdges.bottom) { dx = dy * startAspectRatio; }
  }

  // update the 'current' rect without modifications
  if (edges.top   ) { current.top    += dy; }
  if (edges.bottom) { current.bottom += dy; }
  if (edges.left  ) { current.left   += dx; }
  if (edges.right ) { current.right  += dx; }

  if (invertible) {
    // if invertible, copy the current rect
    utils.extend(inverted, current);

    if (invert === 'reposition') {
      // swap edge values if necessary to keep width/height positive
      let swap;

      if (inverted.top > inverted.bottom) {
        swap = inverted.top;

        inverted.top = inverted.bottom;
        inverted.bottom = swap;
      }
      if (inverted.left > inverted.right) {
        swap = inverted.left;

        inverted.left = inverted.right;
        inverted.right = swap;
      }
    }
  }
  else {
    // if not invertible, restrict to minimum of 0x0 rect
    inverted.top    = Math.min(current.top, start.bottom);
    inverted.bottom = Math.max(current.bottom, start.top);
    inverted.left   = Math.min(current.left, start.right);
    inverted.right  = Math.max(current.right, start.left);
  }

  inverted.width  = inverted.right  - inverted.left;
  inverted.height = inverted.bottom - inverted.top ;

  for (const edge in inverted) {
    delta[edge] = inverted[edge] - previous[edge];
  }

  iEvent.edges = interaction.prepared.edges;
  iEvent.rect = inverted;
  iEvent.deltaRect = delta;
});

/**
 * ```js
 * interact(element).resizable({
 *   onstart: function (event) {},
 *   onmove : function (event) {},
 *   onend  : function (event) {},
 *
 *   edges: {
 *     top   : true,       // Use pointer coords to check for resize.
 *     left  : false,      // Disable resizing from left edge.
 *     bottom: '.resize-s',// Resize if pointer target matches selector
 *     right : handleEl    // Resize if pointer target is the given Element
 *   },
 *
 *     // Width and height can be adjusted independently. When `true`, width and
 *     // height are adjusted at a 1:1 ratio.
 *     square: false,
 *
 *     // Width and height can be adjusted independently. When `true`, width and
 *     // height maintain the aspect ratio they had when resizing started.
 *     preserveAspectRatio: false,
 *
 *   // a value of 'none' will limit the resize rect to a minimum of 0x0
 *   // 'negate' will allow the rect to have negative width/height
 *   // 'reposition' will keep the width/height positive by swapping
 *   // the top and bottom edges and/or swapping the left and right edges
 *   invert: 'none' || 'negate' || 'reposition'
 *
 *   // limit multiple resizes.
 *   // See the explanation in the {@link Interactable.draggable} example
 *   max: Infinity,
 *   maxPerElement: 1,
 * });
 *
 * var isResizeable = interact(element).resizable();
 * ```
 *
 * Gets or sets whether resize actions can be performed on the target
 *
 * @param {boolean | object} [options] true/false or An object with event
 * listeners to be fired on resize events (object makes the Interactable
 * resizable)
 * @return {boolean | Interactable} A boolean indicating if this can be the
 * target of resize elements, or this Interactable
 */
Interactable.prototype.resizable = function (options) {
  if (utils.is.object(options)) {
    this.options.resize.enabled = options.enabled === false? false: true;
    this.setPerAction('resize', options);
    this.setOnEvents('resize', options);

    if (/^x$|^y$|^xy$/.test(options.axis)) {
      this.options.resize.axis = options.axis;
    }
    else if (options.axis === null) {
      this.options.resize.axis = defaultOptions.resize.axis;
    }

    if (utils.is.bool(options.preserveAspectRatio)) {
      this.options.resize.preserveAspectRatio = options.preserveAspectRatio;
    }
    else if (utils.is.bool(options.square)) {
      this.options.resize.square = options.square;
    }

    return this;
  }
  if (utils.is.bool(options)) {
    this.options.resize.enabled = options;

    if (!options) {
      this.onresizestart = this.onresizestart = this.onresizeend = null;
    }

    return this;
  }
  return this.options.resize;
};

function checkResizeEdge (name, value, page, element, interactableElement, rect, margin) {
  // false, '', undefined, null
  if (!value) { return false; }

  // true value, use pointer coords and element rect
  if (value === true) {
    // if dimensions are negative, "switch" edges
    const width  = utils.is.number(rect.width )? rect.width  : rect.right  - rect.left;
    const height = utils.is.number(rect.height)? rect.height : rect.bottom - rect.top ;

    if (width < 0) {
      if      (name === 'left' ) { name = 'right'; }
      else if (name === 'right') { name = 'left' ; }
    }
    if (height < 0) {
      if      (name === 'top'   ) { name = 'bottom'; }
      else if (name === 'bottom') { name = 'top'   ; }
    }

    if (name === 'left'  ) { return page.x < ((width  >= 0? rect.left: rect.right ) + margin); }
    if (name === 'top'   ) { return page.y < ((height >= 0? rect.top : rect.bottom) + margin); }

    if (name === 'right' ) { return page.x > ((width  >= 0? rect.right : rect.left) - margin); }
    if (name === 'bottom') { return page.y > ((height >= 0? rect.bottom: rect.top ) - margin); }
  }

  // the remaining checks require an element
  if (!utils.is.element(element)) { return false; }

  return utils.is.element(value)
  // the value is an element to use as a resize handle
    ? value === element
    // otherwise check if element matches value as selector
    : utils.matchesUpTo(element, value, interactableElement);
}

Interaction.signals.on('new', function (interaction) {
  interaction.resizeAxes = 'xy';
});

InteractEvent.signals.on('set-delta', function ({ interaction, iEvent, action }) {
  if (action !== 'resize' || !interaction.resizeAxes) { return; }

  const options = interaction.target.options;

  if (options.resize.square) {
    if (interaction.resizeAxes === 'y') {
      iEvent.dx = iEvent.dy;
    }
    else {
      iEvent.dy = iEvent.dx;
    }
    iEvent.axes = 'xy';
  }
  else {
    iEvent.axes = interaction.resizeAxes;

    if (interaction.resizeAxes === 'x') {
      iEvent.dy = 0;
    }
    else if (interaction.resizeAxes === 'y') {
      iEvent.dx = 0;
    }
  }
});

actions.resize = resize;
actions.names.push('resize');
utils.merge(Interactable.eventTypes, [
  'resizestart',
  'resizemove',
  'resizeinertiastart',
  'resizeinertiaresume',
  'resizeend',
]);
actions.methodDict.resize = 'resizable';

defaultOptions.resize = resize.defaults;

module.exports = resize;

},{"../InteractEvent":2,"../Interactable":3,"../Interaction":4,"../defaultOptions":17,"../utils":43,"../utils/browser":35,"./base":5}],8:[function(require,module,exports){
const actions        = require('./base');
const utils          = require('../utils');
const InteractEvent  = require('../InteractEvent');
const Interactable   = require('../Interactable');
const Interaction    = require('../Interaction');
const defaultOptions = require('../defaultOptions');

const gesture = {
  defaults: {
    enabled : false,
    origin  : null,
    restrict: null,
  },

  checker: function (pointer, event, interactable, element, interaction) {
    if (interaction.pointerIds.length >= 2) {
      return { name: 'gesture' };
    }

    return null;
  },

  getCursor: function () {
    return '';
  },
};

InteractEvent.signals.on('new', function ({ iEvent, interaction }) {
  if (iEvent.type !== 'gesturestart') { return; }
  iEvent.ds = 0;

  interaction.gesture.startDistance = interaction.gesture.prevDistance = iEvent.distance;
  interaction.gesture.startAngle = interaction.gesture.prevAngle = iEvent.angle;
  interaction.gesture.scale = 1;
});

InteractEvent.signals.on('new', function ({ iEvent, interaction }) {
  if (iEvent.type !== 'gesturemove') { return; }

  iEvent.ds = iEvent.scale - interaction.gesture.scale;

  interaction.target.fire(iEvent);

  interaction.gesture.prevAngle = iEvent.angle;
  interaction.gesture.prevDistance = iEvent.distance;

  if (iEvent.scale !== Infinity
      && iEvent.scale !== null
      && iEvent.scale !== undefined
      && !isNaN(iEvent.scale)) {

    interaction.gesture.scale = iEvent.scale;
  }
});

/**
 * ```js
 * interact(element).gesturable({
 *     onstart: function (event) {},
 *     onmove : function (event) {},
 *     onend  : function (event) {},
 *
 *     // limit multiple gestures.
 *     // See the explanation in {@link Interactable.draggable} example
 *     max: Infinity,
 *     maxPerElement: 1,
 * });
 *
 * var isGestureable = interact(element).gesturable();
 * ```
 *
 * Gets or sets whether multitouch gestures can be performed on the target
 *
 * @param {boolean | object} [options] true/false or An object with event
 * listeners to be fired on gesture events (makes the Interactable gesturable)
 * @return {boolean | Interactable} A boolean indicating if this can be the
 * target of gesture events, or this Interactable
 */
Interactable.prototype.gesturable = function (options) {
  if (utils.is.object(options)) {
    this.options.gesture.enabled = options.enabled === false? false: true;
    this.setPerAction('gesture', options);
    this.setOnEvents('gesture', options);

    return this;
  }

  if (utils.is.bool(options)) {
    this.options.gesture.enabled = options;

    if (!options) {
      this.ongesturestart = this.ongesturestart = this.ongestureend = null;
    }

    return this;
  }

  return this.options.gesture;
};

InteractEvent.signals.on('set-delta', function ({ interaction, iEvent, action, event, starting, ending, deltaSource }) {
  if (action !== 'gesture') { return; }

  const pointers = interaction.pointers;

  iEvent.touches = [pointers[0], pointers[1]];

  if (starting) {
    iEvent.distance = utils.touchDistance(pointers, deltaSource);
    iEvent.box      = utils.touchBBox(pointers);
    iEvent.scale    = 1;
    iEvent.ds       = 0;
    iEvent.angle    = utils.touchAngle(pointers, undefined, deltaSource);
    iEvent.da       = 0;
  }
  else if (ending || event instanceof InteractEvent) {
    iEvent.distance = interaction.prevEvent.distance;
    iEvent.box      = interaction.prevEvent.box;
    iEvent.scale    = interaction.prevEvent.scale;
    iEvent.ds       = iEvent.scale - 1;
    iEvent.angle    = interaction.prevEvent.angle;
    iEvent.da       = iEvent.angle - interaction.gesture.startAngle;
  }
  else {
    iEvent.distance = utils.touchDistance(pointers, deltaSource);
    iEvent.box      = utils.touchBBox(pointers);
    iEvent.scale    = iEvent.distance / interaction.gesture.startDistance;
    iEvent.angle    = utils.touchAngle(pointers, interaction.gesture.prevAngle, deltaSource);

    iEvent.ds = iEvent.scale - interaction.gesture.prevScale;
    iEvent.da = iEvent.angle - interaction.gesture.prevAngle;
  }
});

Interaction.signals.on('new', function (interaction) {
  interaction.gesture = {
    start: { x: 0, y: 0 },

    startDistance: 0,   // distance between two touches of touchStart
    prevDistance : 0,
    distance     : 0,

    scale: 1,           // gesture.distance / gesture.startDistance

    startAngle: 0,      // angle of line joining two touches
    prevAngle : 0,      // angle of the previous gesture event
  };
});

actions.gesture = gesture;
actions.names.push('gesture');
utils.merge(Interactable.eventTypes, [
  'gesturestart',
  'gesturemove',
  'gestureend',
]);
actions.methodDict.gesture = 'gesturable';

defaultOptions.gesture = gesture.defaults;

module.exports = gesture;

},{"../InteractEvent":2,"../Interactable":3,"../Interaction":4,"../defaultOptions":17,"../utils":43,"./base":5}],7:[function(require,module,exports){
const actions        = require('./base');
const utils          = require('../utils');
const scope          = require('../scope');
/** @lends module:interact */
const interact       = require('../interact');
const InteractEvent  = require('../InteractEvent');
/** @lends Interactable */
const Interactable   = require('../Interactable');
const Interaction    = require('../Interaction');
const defaultOptions = require('../defaultOptions');

const drop = {
  defaults: {
    enabled: false,
    accept : null,
    overlap: 'pointer',
  },
};

let dynamicDrop = false;

Interaction.signals.on('action-start', function ({ interaction, event }) {
  if (interaction.prepared.name !== 'drag') { return; }

  // reset active dropzones
  interaction.activeDrops.dropzones = [];
  interaction.activeDrops.elements  = [];
  interaction.activeDrops.rects     = [];

  interaction.dropEvents = null;

  if (!interaction.dynamicDrop) {
    setActiveDrops(interaction.activeDrops, interaction.element);
  }

  const dragEvent = interaction.prevEvent;
  const dropEvents = getDropEvents(interaction, event, dragEvent);

  if (dropEvents.activate) {
    fireActiveDrops(interaction.activeDrops, dropEvents.activate);
  }
});

InteractEvent.signals.on('new', function ({ interaction, iEvent, event }) {
  if (iEvent.type !== 'dragmove' && iEvent.type !== 'dragend') { return; }

  const draggableElement = interaction.element;
  const dragEvent = iEvent;
  const dropResult = getDrop(dragEvent, event, draggableElement);

  interaction.dropTarget  = dropResult.dropzone;
  interaction.dropElement = dropResult.element;

  interaction.dropEvents = getDropEvents(interaction, event, dragEvent);
});

Interaction.signals.on('action-move', function ({ interaction }) {
  if (interaction.prepared.name !== 'drag') { return; }

  fireDropEvents(interaction, interaction.dropEvents);
});

Interaction.signals.on('action-end', function ({ interaction }) {
  if (interaction.prepared.name === 'drag') {
    fireDropEvents(interaction, interaction.dropEvents);
  }
});

Interaction.signals.on('stop-drag', function ({ interaction }) {
  interaction.activeDrops = {
    dropzones: null,
    elements: null,
    rects: null,
  };

  interaction.dropEvents = null;
});

function collectDrops (activeDrops, element) {
  const drops = [];
  const elements = [];

  // collect all dropzones and their elements which qualify for a drop
  for (const current of scope.interactables) {
    if (!current.options.drop.enabled) { continue; }

    const accept = current.options.drop.accept;

    // test the draggable element against the dropzone's accept setting
    if ((utils.is.element(accept) && accept !== element)
        || (utils.is.string(accept)
        && !utils.matchesSelector(element, accept))) {

      continue;
    }

    // query for new elements if necessary
    const dropElements = utils.is.string(current.target)
      ? current._context.querySelectorAll(current.target)
      : [current.target];

    for (const currentElement of dropElements) {
      if (currentElement !== element) {
        drops.push(current);
        elements.push(currentElement);
      }
    }
  }

  return {
    elements,
    dropzones: drops,
  };
}

function fireActiveDrops (activeDrops, event) {
  let prevElement;

  // loop through all active dropzones and trigger event
  for (let i = 0; i < activeDrops.dropzones.length; i++) {
    const current = activeDrops.dropzones[i];
    const currentElement = activeDrops.elements [i];

    // prevent trigger of duplicate events on same element
    if (currentElement !== prevElement) {
      // set current element as event target
      event.target = currentElement;
      current.fire(event);
    }
    prevElement = currentElement;
  }
}

// Collect a new set of possible drops and save them in activeDrops.
// setActiveDrops should always be called when a drag has just started or a
// drag event happens while dynamicDrop is true
function setActiveDrops (activeDrops, dragElement) {
  // get dropzones and their elements that could receive the draggable
  const possibleDrops = collectDrops(activeDrops, dragElement);

  activeDrops.dropzones = possibleDrops.dropzones;
  activeDrops.elements  = possibleDrops.elements;
  activeDrops.rects     = [];

  for (let i = 0; i < activeDrops.dropzones.length; i++) {
    activeDrops.rects[i] = activeDrops.dropzones[i].getRect(activeDrops.elements[i]);
  }
}

function getDrop (dragEvent, event, dragElement) {
  const interaction = dragEvent.interaction;
  const validDrops = [];

  if (dynamicDrop) {
    setActiveDrops(interaction.activeDrops, dragElement);
  }

  // collect all dropzones and their elements which qualify for a drop
  for (let j = 0; j < interaction.activeDrops.dropzones.length; j++) {
    const current        = interaction.activeDrops.dropzones[j];
    const currentElement = interaction.activeDrops.elements [j];
    const rect           = interaction.activeDrops.rects    [j];

    validDrops.push(current.dropCheck(dragEvent, event, interaction.target, dragElement, currentElement, rect)
      ? currentElement
      : null);
  }

  // get the most appropriate dropzone based on DOM depth and order
  const dropIndex = utils.indexOfDeepestElement(validDrops);

  return {
    dropzone: interaction.activeDrops.dropzones[dropIndex] || null,
    element : interaction.activeDrops.elements [dropIndex] || null,
  };
}

function getDropEvents (interaction, pointerEvent, dragEvent) {
  const dropEvents = {
    enter     : null,
    leave     : null,
    activate  : null,
    deactivate: null,
    move      : null,
    drop      : null,
  };

  const tmpl = {
    dragEvent,
    interaction,
    target       : interaction.dropElement,
    dropzone     : interaction.dropTarget,
    relatedTarget: dragEvent.target,
    draggable    : dragEvent.interactable,
    timeStamp    : dragEvent.timeStamp,
  };

  if (interaction.dropElement !== interaction.prevDropElement) {
    // if there was a prevDropTarget, create a dragleave event
    if (interaction.prevDropTarget) {
      dropEvents.leave = utils.extend({ type: 'dragleave' }, tmpl);

      dragEvent.dragLeave    = dropEvents.leave.target   = interaction.prevDropElement;
      dragEvent.prevDropzone = dropEvents.leave.dropzone = interaction.prevDropTarget;
    }
    // if the dropTarget is not null, create a dragenter event
    if (interaction.dropTarget) {
      dropEvents.enter = {
        dragEvent,
        interaction,
        target       : interaction.dropElement,
        dropzone     : interaction.dropTarget,
        relatedTarget: dragEvent.target,
        draggable    : dragEvent.interactable,
        timeStamp    : dragEvent.timeStamp,
        type         : 'dragenter',
      };

      dragEvent.dragEnter = interaction.dropElement;
      dragEvent.dropzone = interaction.dropTarget;
    }
  }

  if (dragEvent.type === 'dragend' && interaction.dropTarget) {
    dropEvents.drop = utils.extend({ type: 'drop' }, tmpl);

    dragEvent.dropzone = interaction.dropTarget;
    dragEvent.relatedTarget = interaction.dropElement;
  }
  if (dragEvent.type === 'dragstart') {
    dropEvents.activate = utils.extend({ type: 'dropactivate' }, tmpl);

    dropEvents.activate.target   = null;
    dropEvents.activate.dropzone = null;
  }
  if (dragEvent.type === 'dragend') {
    dropEvents.deactivate = utils.extend({ type: 'dropdeactivate' }, tmpl);

    dropEvents.deactivate.target   = null;
    dropEvents.deactivate.dropzone = null;
  }
  if (dragEvent.type === 'dragmove' && interaction.dropTarget) {
    dropEvents.move = utils.extend({
      dragmove     : dragEvent,
      type         : 'dropmove',
    }, tmpl);

    dragEvent.dropzone = interaction.dropTarget;
  }

  return dropEvents;
}

function fireDropEvents (interaction, dropEvents) {
  const {
    activeDrops,
    prevDropTarget,
    dropTarget,
    dropElement,
  } = interaction;

  if (dropEvents.leave) { prevDropTarget.fire(dropEvents.leave); }
  if (dropEvents.move ) {     dropTarget.fire(dropEvents.move ); }
  if (dropEvents.enter) {     dropTarget.fire(dropEvents.enter); }
  if (dropEvents.drop ) {     dropTarget.fire(dropEvents.drop ); }
  if (dropEvents.deactivate) {
    fireActiveDrops(activeDrops, dropEvents.deactivate);
  }

  interaction.prevDropTarget  = dropTarget;
  interaction.prevDropElement = dropElement;
}

/**
 * ```js
 * interact(target)
 * .dropChecker(function(dragEvent,         // related dragmove or dragend event
 *                       event,             // TouchEvent/PointerEvent/MouseEvent
 *                       dropped,           // bool result of the default checker
 *                       dropzone,          // dropzone Interactable
 *                       dropElement,       // dropzone elemnt
 *                       draggable,         // draggable Interactable
 *                       draggableElement) {// draggable element
 *
 *   return dropped && event.target.hasAttribute('allow-drop');
 * }
 * ```
 *
 * ```js
 * interact('.drop').dropzone({
 *   accept: '.can-drop' || document.getElementById('single-drop'),
 *   overlap: 'pointer' || 'center' || zeroToOne
 * }
 * ```
 *
 * Returns or sets whether draggables can be dropped onto this target to
 * trigger drop events
 *
 * Dropzones can receive the following events:
 *  - `dropactivate` and `dropdeactivate` when an acceptable drag starts and ends
 *  - `dragenter` and `dragleave` when a draggable enters and leaves the dropzone
 *  - `dragmove` when a draggable that has entered the dropzone is moved
 *  - `drop` when a draggable is dropped into this dropzone
 *
 * Use the `accept` option to allow only elements that match the given CSS
 * selector or element. The value can be:
 *
 *  - **an Element** - only that element can be dropped into this dropzone.
 *  - **a string**, - the element being dragged must match it as a CSS selector.
 *  - **`null`** - accept options is cleared - it accepts any element.
 *
 * Use the `overlap` option to set how drops are checked for. The allowed
 * values are:
 *
 *   - `'pointer'`, the pointer must be over the dropzone (default)
 *   - `'center'`, the draggable element's center must be over the dropzone
 *   - a number from 0-1 which is the `(intersection area) / (draggable area)`.
 *   e.g. `0.5` for drop to happen when half of the area of the draggable is
 *   over the dropzone
 *
 * Use the `checker` option to specify a function to check if a dragged element
 * is over this Interactable.
 *
 * @param {boolean | object | null} [options] The new options to be set.
 * @return {boolean | Interactable} The current setting or this Interactable
 */
Interactable.prototype.dropzone = function (options) {
  if (utils.is.object(options)) {
    this.options.drop.enabled = options.enabled === false? false: true;

    if (utils.is.function(options.ondrop)          ) { this.events.ondrop           = options.ondrop          ; }
    if (utils.is.function(options.ondropactivate)  ) { this.events.ondropactivate   = options.ondropactivate  ; }
    if (utils.is.function(options.ondropdeactivate)) { this.events.ondropdeactivate = options.ondropdeactivate; }
    if (utils.is.function(options.ondragenter)     ) { this.events.ondragenter      = options.ondragenter     ; }
    if (utils.is.function(options.ondragleave)     ) { this.events.ondragleave      = options.ondragleave     ; }
    if (utils.is.function(options.ondropmove)      ) { this.events.ondropmove       = options.ondropmove      ; }

    if (/^(pointer|center)$/.test(options.overlap)) {
      this.options.drop.overlap = options.overlap;
    }
    else if (utils.is.number(options.overlap)) {
      this.options.drop.overlap = Math.max(Math.min(1, options.overlap), 0);
    }
    if ('accept' in options) {
      this.options.drop.accept = options.accept;
    }
    if ('checker' in options) {
      this.options.drop.checker = options.checker;
    }


    return this;
  }

  if (utils.is.bool(options)) {
    this.options.drop.enabled = options;

    if (!options) {
      this.ondragenter = this.ondragleave = this.ondrop
        = this.ondropactivate = this.ondropdeactivate = null;
    }

    return this;
  }

  return this.options.drop;
};

Interactable.prototype.dropCheck = function (dragEvent, event, draggable, draggableElement, dropElement, rect) {
  let dropped = false;

  // if the dropzone has no rect (eg. display: none)
  // call the custom dropChecker or just return false
  if (!(rect = rect || this.getRect(dropElement))) {
    return (this.options.drop.checker
      ? this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement)
      : false);
  }

  const dropOverlap = this.options.drop.overlap;

  if (dropOverlap === 'pointer') {
    const origin = utils.getOriginXY(draggable, draggableElement, 'drag');
    const page = utils.getPageXY(dragEvent);

    page.x += origin.x;
    page.y += origin.y;

    const horizontal = (page.x > rect.left) && (page.x < rect.right);
    const vertical   = (page.y > rect.top ) && (page.y < rect.bottom);

    dropped = horizontal && vertical;
  }

  const dragRect = draggable.getRect(draggableElement);

  if (dragRect && dropOverlap === 'center') {
    const cx = dragRect.left + dragRect.width  / 2;
    const cy = dragRect.top  + dragRect.height / 2;

    dropped = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
  }

  if (dragRect && utils.is.number(dropOverlap)) {
    const overlapArea  = (Math.max(0, Math.min(rect.right , dragRect.right ) - Math.max(rect.left, dragRect.left))
                          * Math.max(0, Math.min(rect.bottom, dragRect.bottom) - Math.max(rect.top , dragRect.top )));

    const overlapRatio = overlapArea / (dragRect.width * dragRect.height);

    dropped = overlapRatio >= dropOverlap;
  }

  if (this.options.drop.checker) {
    dropped = this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement);
  }

  return dropped;
};

Interactable.signals.on('unset', function ({ interactable }) {
  interactable.dropzone(false);
});

Interactable.settingsMethods.push('dropChecker');

Interaction.signals.on('new', function (interaction) {
  interaction.dropTarget      = null; // the dropzone a drag target might be dropped into
  interaction.dropElement     = null; // the element at the time of checking
  interaction.prevDropTarget  = null; // the dropzone that was recently dragged away from
  interaction.prevDropElement = null; // the element at the time of checking
  interaction.dropEvents      = null; // the dropEvents related to the current drag event

  interaction.activeDrops = {
    dropzones: [],      // the dropzones that are mentioned below
    elements : [],      // elements of dropzones that accept the target draggable
    rects    : [],      // the rects of the elements mentioned above
  };

});

Interaction.signals.on('stop', function ({ interaction }) {
  interaction.dropTarget = interaction.dropElement =
    interaction.prevDropTarget = interaction.prevDropElement = null;
});

/**
 * Returns or sets whether the dimensions of dropzone elements are calculated
 * on every dragmove or only on dragstart for the default dropChecker
 *
 * @param {boolean} [newValue] True to check on each move. False to check only
 * before start
 * @return {boolean | interact} The current setting or interact
 */
interact.dynamicDrop = function (newValue) {
  if (utils.is.bool(newValue)) {
    //if (dragging && dynamicDrop !== newValue && !newValue) {
      //calcRects(dropzones);
    //}

    dynamicDrop = newValue;

    return interact;
  }
  return dynamicDrop;
};

utils.merge(Interactable.eventTypes, [
  'dragenter',
  'dragleave',
  'dropactivate',
  'dropdeactivate',
  'dropmove',
  'drop',
]);
actions.methodDict.drop = 'dropzone';

defaultOptions.drop = drop.defaults;

module.exports = drop;

},{"../InteractEvent":2,"../Interactable":3,"../Interaction":4,"../defaultOptions":17,"../interact":20,"../scope":32,"../utils":43,"./base":5}],20:[function(require,module,exports){
/** @module interact */

const browser      = require('./utils/browser');
const events       = require('./utils/events');
const utils        = require('./utils');
const scope        = require('./scope');
const Interactable = require('./Interactable');
const Interaction  = require('./Interaction');

const globalEvents = {};

/**
 * ```js
 * interact('#draggable').draggable(true);
 *
 * var rectables = interact('rect');
 * rectables
 *   .gesturable(true)
 *   .on('gesturemove', function (event) {
 *       // ...
 *   });
 * ```
 *
 * The methods of this variable can be used to set elements as interactables
 * and also to change various default settings.
 *
 * Calling it as a function and passing an element or a valid CSS selector
 * string returns an Interactable object which has various methods to configure
 * it.
 *
 * @global
 *
 * @param {Element | string} element The HTML or SVG Element to interact with
 * or CSS selector
 * @return {Interactable}
 */
function interact (element, options) {
  let interactable = scope.interactables.get(element, options);

  if (!interactable) {
    interactable = new Interactable(element, options);
    interactable.events.global = globalEvents;
  }

  return interactable;
}

/**
 * Check if an element or selector has been set with the {@link interact}
 * function
 *
 * @alias module:interact.isSet
 *
 * @param {Element} element The Element being searched for
 * @return {boolean} Indicates if the element or CSS selector was previously
 * passed to interact
*/
interact.isSet = function (element, options) {
  return scope.interactables.indexOfElement(element, options && options.context) !== -1;
};

/**
 * Add a global listener for an InteractEvent or adds a DOM event to `document`
 *
 * @alias module:interact.on
 *
 * @param {string | array | object} type The types of events to listen for
 * @param {function} listener The function event (s)
 * @param {object | boolean} [options] object or useCapture flag for
 * addEventListener
 * @return {object} interact
 */
interact.on = function (type, listener, options) {
  if (utils.is.string(type) && type.search(' ') !== -1) {
    type = type.trim().split(/ +/);
  }

  if (utils.is.array(type)) {
    for (const eventType of type) {
      interact.on(eventType, listener, options);
    }

    return interact;
  }

  if (utils.is.object(type)) {
    for (const prop in type) {
      interact.on(prop, type[prop], listener);
    }

    return interact;
  }

  // if it is an InteractEvent type, add listener to globalEvents
  if (utils.contains(Interactable.eventTypes, type)) {
    // if this type of event was never bound
    if (!globalEvents[type]) {
      globalEvents[type] = [listener];
    }
    else {
      globalEvents[type].push(listener);
    }
  }
  // If non InteractEvent type, addEventListener to document
  else {
    events.add(scope.document, type, listener, { options });
  }

  return interact;
};

/**
 * Removes a global InteractEvent listener or DOM event from `document`
 *
 * @alias module:interact.off
 *
 * @param {string | array | object} type The types of events that were listened
 * for
 * @param {function} listener The listener function to be removed
 * @param {object | boolean} options [options] object or useCapture flag for
 * removeEventListener
 * @return {object} interact
 */
interact.off = function (type, listener, options) {
  if (utils.is.string(type) && type.search(' ') !== -1) {
    type = type.trim().split(/ +/);
  }

  if (utils.is.array(type)) {
    for (const eventType of type) {
      interact.off(eventType, listener, options);
    }

    return interact;
  }

  if (utils.is.object(type)) {
    for (const prop in type) {
      interact.off(prop, type[prop], listener);
    }

    return interact;
  }

  if (!utils.contains(Interactable.eventTypes, type)) {
    events.remove(scope.document, type, listener, options);
  }
  else {
    let index;

    if (type in globalEvents
        && (index = globalEvents[type].indexOf(listener)) !== -1) {
      globalEvents[type].splice(index, 1);
    }
  }

  return interact;
};

/**
 * Returns an object which exposes internal data

 * @alias module:interact.debug
 *
 * @return {object} An object with properties that outline the current state
 * and expose internal functions and variables
 */
interact.debug = function () {
  return scope;
};

// expose the functions used to calculate multi-touch properties
interact.getPointerAverage  = utils.pointerAverage;
interact.getTouchBBox       = utils.touchBBox;
interact.getTouchDistance   = utils.touchDistance;
interact.getTouchAngle      = utils.touchAngle;

interact.getElementRect       = utils.getElementRect;
interact.getElementClientRect = utils.getElementClientRect;
interact.matchesSelector      = utils.matchesSelector;
interact.closest              = utils.closest;

/**
 * @alias module:interact.supportsTouch
 *
 * @return {boolean} Whether or not the browser supports touch input
 */
interact.supportsTouch = function () {
  return browser.supportsTouch;
};

/**
 * @alias module:interact.supportsPointerEvent
 *
 * @return {boolean} Whether or not the browser supports PointerEvents
 */
interact.supportsPointerEvent = function () {
  return browser.supportsPointerEvent;
};

/**
 * Cancels all interactions (end events are not fired)
 *
 * @alias module:interact.stop
 *
 * @param {Event} event An event on which to call preventDefault()
 * @return {object} interact
 */
interact.stop = function (event) {
  for (let i = scope.interactions.length - 1; i >= 0; i--) {
    scope.interactions[i].stop(event);
  }

  return interact;
};

/**
 * Returns or sets the distance the pointer must be moved before an action
 * sequence occurs. This also affects tolerance for tap events.
 *
 * @alias module:interact.pointerMoveTolerance
 *
 * @param {number} [newValue] The movement from the start position must be greater than this value
 * @return {interact | number}
 */
interact.pointerMoveTolerance = function (newValue) {
  if (utils.is.number(newValue)) {
    Interaction.pointerMoveTolerance = newValue;

    return interact;
  }

  return Interaction.pointerMoveTolerance;
};

interact.addDocument    = scope.addDocument;
interact.removeDocument = scope.removeDocument;

scope.interact = interact;

module.exports = interact;

},{"./Interactable":3,"./Interaction":4,"./scope":32,"./utils":43,"./utils/browser":35,"./utils/events":39}],6:[function(require,module,exports){
const actions        = require('./base');
const utils          = require('../utils');
const InteractEvent  = require('../InteractEvent');
/** @lends Interactable */
const Interactable   = require('../Interactable');
const Interaction    = require('../Interaction');
const defaultOptions = require('../defaultOptions');

const drag = {
  defaults: {
    enabled     : false,
    mouseButtons: null,

    origin    : null,
    snap      : null,
    restrict  : null,
    inertia   : null,
    autoScroll: null,

    startAxis : 'xy',
    lockAxis  : 'xy',
  },

  checker: function (pointer, event, interactable) {
    const dragOptions = interactable.options.drag;

    return dragOptions.enabled
      ? { name: 'drag', axis: (dragOptions.lockAxis === 'start'
                               ? dragOptions.startAxis
                               : dragOptions.lockAxis)}
      : null;
  },

  getCursor: function () {
    return 'move';
  },
};

Interaction.signals.on('before-action-move', function ({ interaction }) {
  if (interaction.prepared.name !== 'drag') { return; }

  const axis = interaction.prepared.axis;

  if (axis === 'x') {
    interaction.curCoords.page.y   = interaction.startCoords.page.y;
    interaction.curCoords.client.y = interaction.startCoords.client.y;

    interaction.pointerDelta.page.speed   = Math.abs(interaction.pointerDelta.page.vx);
    interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vx);
    interaction.pointerDelta.client.vy = 0;
    interaction.pointerDelta.page.vy   = 0;
  }
  else if (axis === 'y') {
    interaction.curCoords.page.x   = interaction.startCoords.page.x;
    interaction.curCoords.client.x = interaction.startCoords.client.x;

    interaction.pointerDelta.page.speed   = Math.abs(interaction.pointerDelta.page.vy);
    interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vy);
    interaction.pointerDelta.client.vx = 0;
    interaction.pointerDelta.page.vx   = 0;
  }
});

// dragmove
InteractEvent.signals.on('new', function ({ iEvent, interaction }) {
  if (iEvent.type !== 'dragmove') { return; }

  const axis = interaction.prepared.axis;

  if (axis === 'x') {
    iEvent.pageY   = interaction.startCoords.page.y;
    iEvent.clientY = interaction.startCoords.client.y;
    iEvent.dy = 0;
  }
  else if (axis === 'y') {
    iEvent.pageX   = interaction.startCoords.page.x;
    iEvent.clientX = interaction.startCoords.client.x;
    iEvent.dx = 0;
  }
});

/**
 * ```js
 * interact(element).draggable({
 *     onstart: function (event) {},
 *     onmove : function (event) {},
 *     onend  : function (event) {},
 *
 *     // the axis in which the first movement must be
 *     // for the drag sequence to start
 *     // 'xy' by default - any direction
 *     startAxis: 'x' || 'y' || 'xy',
 *
 *     // 'xy' by default - don't restrict to one axis (move in any direction)
 *     // 'x' or 'y' to restrict movement to either axis
 *     // 'start' to restrict movement to the axis the drag started in
 *     lockAxis: 'x' || 'y' || 'xy' || 'start',
 *
 *     // max number of drags that can happen concurrently
 *     // with elements of this Interactable. Infinity by default
 *     max: Infinity,
 *
 *     // max number of drags that can target the same element+Interactable
 *     // 1 by default
 *     maxPerElement: 2
 * });
 *
 * var isDraggable = interact('element').draggable(); // true
 * ```
 *
 * Get or set whether drag actions can be performed on the target
 *
 * @param {boolean | object} [options] true/false or An object with event
 * listeners to be fired on drag events (object makes the Interactable
 * draggable)
 * @return {boolean | Interactable} boolean indicating if this can be the
 * target of drag events, or this Interctable
 */
Interactable.prototype.draggable = function (options) {
  if (utils.is.object(options)) {
    this.options.drag.enabled = options.enabled === false? false: true;
    this.setPerAction('drag', options);
    this.setOnEvents('drag', options);

    if (/^(xy|x|y|start)$/.test(options.lockAxis)) {
      this.options.drag.lockAxis = options.lockAxis;
    }
    if (/^(xy|x|y)$/.test(options.startAxis)) {
      this.options.drag.startAxis = options.startAxis;
    }

    return this;
  }

  if (utils.is.bool(options)) {
    this.options.drag.enabled = options;

    if (!options) {
      this.ondragstart = this.ondragstart = this.ondragend = null;
    }

    return this;
  }

  return this.options.drag;
};

actions.drag = drag;
actions.names.push('drag');
utils.merge(Interactable.eventTypes, [
  'dragstart',
  'dragmove',
  'draginertiastart',
  'draginertiaresume',
  'dragend',
]);
actions.methodDict.drag = 'draggable';

defaultOptions.drag = drag.defaults;

module.exports = drag;

},{"../InteractEvent":2,"../Interactable":3,"../Interaction":4,"../defaultOptions":17,"../utils":43,"./base":5}],3:[function(require,module,exports){
const clone     = require('./utils/clone');
const is        = require('./utils/is');
const events    = require('./utils/events');
const extend    = require('./utils/extend');
const actions   = require('./actions/base');
const scope     = require('./scope');
const Eventable = require('./Eventable');
const defaults  = require('./defaultOptions');
const signals   = require('./utils/Signals').new();

const {
  getElementRect,
  nodeContains,
  trySelector,
  matchesSelector,
}                    = require('./utils/domUtils');
const { getWindow }  = require('./utils/window');
const { contains }   = require('./utils/arr');
const { wheelEvent } = require('./utils/browser');

// all set interactables
scope.interactables = [];

class Interactable {
  /** */
  constructor (target, options) {
    options = options || {};

    this.target   = target;
    this.events   = new Eventable();
    this._context = options.context || scope.document;
    this._win     = getWindow(trySelector(target)? this._context : target);
    this._doc     = this._win.document;

    signals.fire('new', {
      target,
      options,
      interactable: this,
      win: this._win,
    });

    scope.addDocument( this._doc, this._win );

    scope.interactables.push(this);

    this.set(options);
  }

  setOnEvents (action, phases) {
    const onAction = 'on' + action;

    if (is.function(phases.onstart)       ) { this.events[onAction + 'start'        ] = phases.onstart         ; }
    if (is.function(phases.onmove)        ) { this.events[onAction + 'move'         ] = phases.onmove          ; }
    if (is.function(phases.onend)         ) { this.events[onAction + 'end'          ] = phases.onend           ; }
    if (is.function(phases.oninertiastart)) { this.events[onAction + 'inertiastart' ] = phases.oninertiastart  ; }

    return this;
  }

  setPerAction (action, options) {
    // for all the default per-action options
    for (const option in options) {
      // if this option exists for this action
      if (option in defaults[action]) {
        // if the option in the options arg is an object value
        if (is.object(options[option])) {
          // duplicate the object and merge
          this.options[action][option] = clone(this.options[action][option] || {});
          extend(this.options[action][option], options[option]);

          if (is.object(defaults.perAction[option]) && 'enabled' in defaults.perAction[option]) {
            this.options[action][option].enabled = options[option].enabled === false? false : true;
          }
        }
        else if (is.bool(options[option]) && is.object(defaults.perAction[option])) {
          this.options[action][option].enabled = options[option];
        }
        else if (options[option] !== undefined) {
          // or if it's not undefined, do a plain assignment
          this.options[action][option] = options[option];
        }
      }
    }
  }

  /**
   * The default function to get an Interactables bounding rect. Can be
   * overridden using {@link Interactable.rectChecker}.
   *
   * @param {Element} [element] The element to measure.
   * @return {object} The object's bounding rectangle.
   */
  getRect (element) {
    element = element || this.target;

    if (is.string(this.target) && !(is.element(element))) {
      element = this._context.querySelector(this.target);
    }

    return getElementRect(element);
  }

  /**
   * Returns or sets the function used to calculate the interactable's
   * element's rectangle
   *
   * @param {function} [checker] A function which returns this Interactable's
   * bounding rectangle. See {@link Interactable.getRect}
   * @return {function | object} The checker function or this Interactable
   */
  rectChecker (checker) {
    if (is.function(checker)) {
      this.getRect = checker;

      return this;
    }

    if (checker === null) {
      delete this.options.getRect;

      return this;
    }

    return this.getRect;
  }

  _backCompatOption (optionName, newValue) {
    if (trySelector(newValue) || is.object(newValue)) {
      this.options[optionName] = newValue;

      for (const action of actions.names) {
        this.options[action][optionName] = newValue;
      }

      return this;
    }

    return this.options[optionName];
  }

  /**
   * Gets or sets the origin of the Interactable's element.  The x and y
   * of the origin will be subtracted from action event coordinates.
   *
   * @param {Element | object | string} [origin] An HTML or SVG Element whose
   * rect will be used, an object eg. { x: 0, y: 0 } or string 'parent', 'self'
   * or any CSS selector
   *
   * @return {object} The current origin or this Interactable
   */
  origin (newValue) {
    return this._backCompatOption('origin', newValue);
  }

  /**
   * Returns or sets the mouse coordinate types used to calculate the
   * movement of the pointer.
   *
   * @param {string} [newValue] Use 'client' if you will be scrolling while
   * interacting; Use 'page' if you want autoScroll to work
   * @return {string | object} The current deltaSource or this Interactable
   */
  deltaSource (newValue) {
    if (newValue === 'page' || newValue === 'client') {
      this.options.deltaSource = newValue;

      return this;
    }

    return this.options.deltaSource;
  }

  /**
   * Gets the selector context Node of the Interactable. The default is
   * `window.document`.
   *
   * @return {Node} The context Node of this Interactable
   */
  context () {
    return this._context;
  }

  inContext (element) {
    return (this._context === element.ownerDocument
            || nodeContains(this._context, element));
  }

  /**
   * Calls listeners for the given InteractEvent type bound globally
   * and directly to this Interactable
   *
   * @param {InteractEvent} iEvent The InteractEvent object to be fired on this
   * Interactable
   * @return {Interactable} this Interactable
   */
  fire (iEvent) {
    this.events.fire(iEvent);

    return this;
  }

  _onOffMultiple (method, eventType, listener, options) {
    if (is.string(eventType) && eventType.search(' ') !== -1) {
      eventType = eventType.trim().split(/ +/);
    }

    if (is.array(eventType)) {
      for (const type of eventType) {
        this[method](type, listener, options);
      }

      return true;
    }

    if (is.object(eventType)) {
      for (const prop in eventType) {
        this[method](prop, eventType[prop], listener);
      }

      return true;
    }
  }

  /**
   * Binds a listener for an InteractEvent, pointerEvent or DOM event.
   *
   * @param {string | array | object} eventType  The types of events to listen
   * for
   * @param {function} listener   The function event (s)
   * @param {object | boolean} [options]    options object or useCapture flag
   * for addEventListener
   * @return {object} This Interactable
   */
  on (eventType, listener, options) {
    if (this._onOffMultiple('on', eventType, listener, options)) {
      return this;
    }

    if (eventType === 'wheel') { eventType = wheelEvent; }

    if (contains(Interactable.eventTypes, eventType)) {
      this.events.on(eventType, listener);
    }
    // delegated event for selector
    else if (is.string(this.target)) {
      events.addDelegate(this.target, this._context, eventType, listener, options);
    }
    else {
      events.add(this.target, eventType, listener, options);
    }

    return this;
  }

  /**
   * Removes an InteractEvent, pointerEvent or DOM event listener
   *
   * @param {string | array | object} eventType The types of events that were
   * listened for
   * @param {function} listener The listener function to be removed
   * @param {object | boolean} [options] options object or useCapture flag for
   * removeEventListener
   * @return {object} This Interactable
   */
  off (eventType, listener, options) {
    if (this._onOffMultiple('off', eventType, listener, options)) {
      return this;
    }

    if (eventType === 'wheel') { eventType = wheelEvent; }

    // if it is an action event type
    if (contains(Interactable.eventTypes, eventType)) {
      this.events.off(eventType, listener);
    }
    // delegated event
    else if (is.string(this.target)) {
      events.removeDelegate(this.target, this._context, eventType, listener, options);
    }
    // remove listener from this Interatable's element
    else {
      events.remove(this.target, eventType, listener, options);
    }

    return this;
  }

  /**
   * Reset the options of this Interactable
   *
   * @param {object} options The new settings to apply
   * @return {object} This Interactable
   */
  set (options) {
    if (!is.object(options)) {
      options = {};
    }

    this.options = clone(defaults.base);

    const perActions = clone(defaults.perAction);

    for (const actionName in actions.methodDict) {
      const methodName = actions.methodDict[actionName];

      this.options[actionName] = clone(defaults[actionName]);

      this.setPerAction(actionName, perActions);

      this[methodName](options[actionName]);
    }

    for (const setting of Interactable.settingsMethods) {
      this.options[setting] = defaults.base[setting];

      if (setting in options) {
        this[setting](options[setting]);
      }
    }

    signals.fire('set', {
      options,
      interactable: this,
    });

    return this;
  }

  /**
   * Remove this interactable from the list of interactables and remove it's
   * action capabilities and event listeners
   *
   * @return {interact}
   */
  unset () {
    events.remove(this.target, 'all');

    if (is.string(this.target)) {
      // remove delegated events
      for (const type in events.delegatedEvents) {
        const delegated = events.delegatedEvents[type];

        if (delegated.selectors[0] === this.target
            && delegated.contexts[0] === this._context) {

          delegated.selectors.splice(0, 1);
          delegated.contexts .splice(0, 1);
          delegated.listeners.splice(0, 1);

          // remove the arrays if they are empty
          if (!delegated.selectors.length) {
            delegated[type] = null;
          }
        }

        events.remove(this._context, type, events.delegateListener);
        events.remove(this._context, type, events.delegateUseCapture, true);
      }
    }
    else {
      events.remove(this, 'all');
    }

    signals.fire('unset', { interactable: this });

    scope.interactables.splice(scope.interactables.indexOf(this), 1);

    // Stop related interactions when an Interactable is unset
    for (const interaction of scope.interactions || []) {
      if (interaction.target === this && interaction.interacting() && !interaction._ending) {
        interaction.stop();
      }
    }

    return scope.interact;
  }
}

scope.interactables.indexOfElement = function indexOfElement (target, context) {
  context = context || scope.document;

  for (let i = 0; i < this.length; i++) {
    const interactable = this[i];

    if (interactable.target === target && interactable._context === context) {
      return i;
    }
  }
  return -1;
};

scope.interactables.get = function interactableGet (element, options, dontCheckInContext) {
  const ret = this[this.indexOfElement(element, options && options.context)];

  return ret && (is.string(element) || dontCheckInContext || ret.inContext(element))? ret : null;
};

scope.interactables.forEachMatch = function (element, callback) {
  for (const interactable of this) {
    let ret;

    if ((is.string(interactable.target)
        // target is a selector and the element matches
        ? (is.element(element) && matchesSelector(element, interactable.target))
        // target is the element
        : element === interactable.target)
        // the element is in context
      && (interactable.inContext(element))) {
      ret = callback(interactable);
    }

    if (ret !== undefined) {
      return ret;
    }
  }
};

// all interact.js eventTypes
Interactable.eventTypes = scope.eventTypes = [];

Interactable.signals = signals;

Interactable.settingsMethods = [ 'deltaSource', 'origin', 'preventDefault', 'rectChecker' ];

module.exports = Interactable;

},{"./Eventable":1,"./actions/base":5,"./defaultOptions":17,"./scope":32,"./utils/Signals":33,"./utils/arr":34,"./utils/browser":35,"./utils/clone":36,"./utils/domUtils":38,"./utils/events":39,"./utils/extend":40,"./utils/is":45,"./utils/window":51}],36:[function(require,module,exports){
const is = require('./is');

module.exports = function clone (source) {
  const dest = {};
  for (const prop in source) {
    if (is.plainObject(source[prop])) {
      dest[prop] = clone(source[prop]);
    } else {
      dest[prop] = source[prop];
    }
  }
  return dest;
};

},{"./is":45}],5:[function(require,module,exports){
const Interaction   = require('../Interaction');
const InteractEvent = require('../InteractEvent');

const actions = {
  firePrepared,
  names: [],
  methodDict: {},
};

Interaction.signals.on('action-start', function ({ interaction, event }) {
  interaction._interacting = true;
  firePrepared(interaction, event, 'start');
});

Interaction.signals.on('action-move', function ({ interaction, event, preEnd }) {
  firePrepared(interaction, event, 'move', preEnd);

  // if the action was ended in a listener
  if (!interaction.interacting()) { return false; }
});

Interaction.signals.on('action-end', function ({ interaction, event }) {
  firePrepared(interaction, event, 'end');
});

function firePrepared (interaction, event, phase, preEnd) {
  const actionName = interaction.prepared.name;

  const newEvent = new InteractEvent(interaction, event, actionName, phase, interaction.element, null, preEnd);

  interaction.target.fire(newEvent);
  interaction.prevEvent = newEvent;
}

module.exports = actions;

},{"../InteractEvent":2,"../Interaction":4}],4:[function(require,module,exports){
const scope      = require('./scope');
const utils      = require('./utils');
const events     = require('./utils/events');
const browser    = require('./utils/browser');
const domObjects = require('./utils/domObjects');
const finder     = require('./utils/interactionFinder');
const signals    = require('./utils/Signals').new();

const listeners   = {};
const methodNames = [
  'pointerDown', 'pointerMove', 'pointerUp',
  'updatePointer', 'removePointer',
];

// for ignoring browser's simulated mouse events
let prevTouchTime = 0;

// all active and idle interactions
scope.interactions = [];

class Interaction {
  /** */
  constructor ({ pointerType }) {
    this.target        = null; // current interactable being interacted with
    this.element       = null; // the target element of the interactable

    this.prepared      = {     // action that's ready to be fired on next move event
      name : null,
      axis : null,
      edges: null,
    };

    // keep track of added pointers
    this.pointers    = [];
    this.pointerIds  = [];
    this.downTargets = [];
    this.downTimes   = [];

    // Previous native pointer move event coordinates
    this.prevCoords = {
      page     : { x: 0, y: 0 },
      client   : { x: 0, y: 0 },
      timeStamp: 0,
    };
    // current native pointer move event coordinates
    this.curCoords = {
      page     : { x: 0, y: 0 },
      client   : { x: 0, y: 0 },
      timeStamp: 0,
    };

    // Starting InteractEvent pointer coordinates
    this.startCoords = {
      page     : { x: 0, y: 0 },
      client   : { x: 0, y: 0 },
      timeStamp: 0,
    };

    // Change in coordinates and time of the pointer
    this.pointerDelta = {
      page     : { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
      client   : { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
      timeStamp: 0,
    };

    this.downEvent   = null;    // pointerdown/mousedown/touchstart event
    this.downPointer = {};

    this._eventTarget    = null;
    this._curEventTarget = null;

    this.prevEvent = null;      // previous action event

    this.pointerIsDown   = false;
    this.pointerWasMoved = false;
    this._interacting    = false;
    this._ending         = false;

    this.pointerType = pointerType;

    signals.fire('new', this);

    scope.interactions.push(this);
  }

  pointerDown (pointer, event, eventTarget) {
    const pointerIndex = this.updatePointer(pointer, event, true);

    signals.fire('down', {
      pointer,
      event,
      eventTarget,
      pointerIndex,
      interaction: this,
    });
  }

  /**
   * ```js
   * interact(target)
   *   .draggable({
   *     // disable the default drag start by down->move
   *     manualStart: true
   *   })
   *   // start dragging after the user holds the pointer down
   *   .on('hold', function (event) {
   *     var interaction = event.interaction;
   *
   *     if (!interaction.interacting()) {
   *       interaction.start({ name: 'drag' },
   *                         event.interactable,
   *                         event.currentTarget);
   *     }
   * });
   * ```
   *
   * Start an action with the given Interactable and Element as tartgets. The
   * action must be enabled for the target Interactable and an appropriate
   * number of pointers must be held down - 1 for drag/resize, 2 for gesture.
   *
   * Use it with `interactable.<action>able({ manualStart: false })` to always
   * [start actions manually](https://github.com/taye/interact.js/issues/114)
   *
   * @param {object} action   The action to be performed - drag, resize, etc.
   * @param {Interactable} target  The Interactable to target
   * @param {Element} element The DOM Element to target
   * @return {object} interact
   */
  start (action, target, element) {
    if (this.interacting()
        || !this.pointerIsDown
        || this.pointerIds.length < (action.name === 'gesture'? 2 : 1)) {
      return;
    }

    // if this interaction had been removed after stopping
    // add it back
    if (scope.interactions.indexOf(this) === -1) {
      scope.interactions.push(this);
    }

    utils.copyAction(this.prepared, action);
    this.target         = target;
    this.element        = element;

    signals.fire('action-start', {
      interaction: this,
      event: this.downEvent,
    });
  }

  pointerMove (pointer, event, eventTarget) {
    if (!this.simulation) {
      this.updatePointer(pointer);
      utils.setCoords(this.curCoords, this.pointers);
    }

    const duplicateMove = (this.curCoords.page.x === this.prevCoords.page.x
                           && this.curCoords.page.y === this.prevCoords.page.y
                           && this.curCoords.client.x === this.prevCoords.client.x
                           && this.curCoords.client.y === this.prevCoords.client.y);

    let dx;
    let dy;

    // register movement greater than pointerMoveTolerance
    if (this.pointerIsDown && !this.pointerWasMoved) {
      dx = this.curCoords.client.x - this.startCoords.client.x;
      dy = this.curCoords.client.y - this.startCoords.client.y;

      this.pointerWasMoved = utils.hypot(dx, dy) > Interaction.pointerMoveTolerance;
    }

    const signalArg = {
      pointer,
      pointerIndex: this.getPointerIndex(pointer),
      event,
      eventTarget,
      dx,
      dy,
      duplicate: duplicateMove,
      interaction: this,
      interactingBeforeMove: this.interacting(),
    };

    if (!duplicateMove) {
      // set pointer coordinate, time changes and speeds
      utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
    }

    signals.fire('move', signalArg);

    if (!duplicateMove) {
      // if interacting, fire an 'action-move' signal etc
      if (this.interacting()) {
        this.doMove(signalArg);
      }

      if (this.pointerWasMoved) {
        utils.copyCoords(this.prevCoords, this.curCoords);
      }
    }
  }

  /**
   * ```js
   * interact(target)
   *   .draggable(true)
   *   .on('dragmove', function (event) {
   *     if (someCondition) {
   *       // change the snap settings
   *       event.interactable.draggable({ snap: { targets: [] }});
   *       // fire another move event with re-calculated snap
   *       event.interaction.doMove();
   *     }
   *   });
   * ```
   *
   * Force a move of the current action at the same coordinates. Useful if
   * snap/restrict has been changed and you want a movement with the new
   * settings.
   */
  doMove (signalArg) {
    signalArg = utils.extend({
      pointer: this.pointers[0],
      event: this.prevEvent,
      eventTarget: this._eventTarget,
      interaction: this,
    }, signalArg || {});

    signals.fire('before-action-move', signalArg);

    if (!this._dontFireMove) {
      signals.fire('action-move', signalArg);
    }

    this._dontFireMove = false;
  }

  // End interact move events and stop auto-scroll unless simulation is running
  pointerUp (pointer, event, eventTarget, curEventTarget) {
    const pointerIndex = this.getPointerIndex(pointer);

    signals.fire(/cancel$/i.test(event.type)? 'cancel' : 'up', {
      pointer,
      pointerIndex,
      event,
      eventTarget,
      curEventTarget,
      interaction: this,
    });

    if (!this.simulation) {
      this.end(event);
    }

    this.pointerIsDown = false;
    this.removePointer(pointer, event);
  }

  /**
   * ```js
   * interact(target)
   *   .draggable(true)
   *   .on('move', function (event) {
   *     if (event.pageX > 1000) {
   *       // end the current action
   *       event.interaction.end();
   *       // stop all further listeners from being called
   *       event.stopImmediatePropagation();
   *     }
   *   });
   * ```
   *
   * Stop the current action and fire an end event. Inertial movement does
   * not happen.
   *
   * @param {PointerEvent} [event]
   */
  end (event) {
    this._ending = true;

    event = event || this.prevEvent;

    if (this.interacting()) {
      signals.fire('action-end', {
        event,
        interaction: this,
      });
    }

    this.stop();
    this._ending = false;
  }

  currentAction () {
    return this._interacting? this.prepared.name: null;
  }

  interacting () {
    return this._interacting;
  }

  /** */
  stop () {
    signals.fire('stop', { interaction: this });

    if (this._interacting) {
      signals.fire('stop-active', { interaction: this });
      signals.fire('stop-' + this.prepared.name, { interaction: this });
    }

    this.target = this.element = null;

    this._interacting = false;
    this.prepared.name = this.prevEvent = null;
  }

  getPointerIndex (pointer) {
    // mouse and pen interactions may have only one pointer
    if (this.pointerType === 'mouse' || this.pointerType === 'pen') {
      return 0;
    }

    return this.pointerIds.indexOf(utils.getPointerId(pointer));
  }

  updatePointer (pointer, event, down = event && /(down|start)$/i.test(event.type)) {
    const id = utils.getPointerId(pointer);
    let index = this.getPointerIndex(pointer);

    if (index === -1) {
      index = this.pointerIds.length;
      this.pointerIds[index] = id;
    }

    if (down) {
      signals.fire('update-pointer-down', {
        pointer,
        event,
        down,
        pointerId: id,
        pointerIndex: index,
        interaction: this,
      });
    }

    this.pointers[index] = pointer;

    return index;
  }

  removePointer (pointer, event) {
    const index = this.getPointerIndex(pointer);

    if (index === -1) { return; }

    signals.fire('remove-pointer', {
      pointer,
      event,
      pointerIndex: index,
      interaction: this,
    });

    this.pointers   .splice(index, 1);
    this.pointerIds .splice(index, 1);
    this.downTargets.splice(index, 1);
    this.downTimes  .splice(index, 1);
  }

  _updateEventTargets (target, currentTarget) {
    this._eventTarget    = target;
    this._curEventTarget = currentTarget;
  }
}

for (const method of methodNames) {
  listeners[method] = doOnInteractions(method);
}

function doOnInteractions (method) {
  return (function (event) {
    const pointerType = utils.getPointerType(event);
    const [eventTarget, curEventTarget] = utils.getEventTargets(event);
    const matches = []; // [ [pointer, interaction], ...]

    if (browser.supportsTouch && /touch/.test(event.type)) {
      prevTouchTime = new Date().getTime();

      for (const changedTouch of event.changedTouches) {
        const pointer = changedTouch;
        const interaction = finder.search(pointer, event.type, eventTarget);

        matches.push([pointer, interaction || new Interaction({ pointerType })]);
      }
    }
    else {
      let invalidPointer = false;

      if (!browser.supportsPointerEvent && /mouse/.test(event.type)) {
        // ignore mouse events while touch interactions are active
        for (let i = 0; i < scope.interactions.length && !invalidPointer; i++) {
          invalidPointer = scope.interactions[i].pointerType !== 'mouse' && scope.interactions[i].pointerIsDown;
        }

        // try to ignore mouse events that are simulated by the browser
        // after a touch event
        invalidPointer = invalidPointer
          || (new Date().getTime() - prevTouchTime < 500)
          // on iOS and Firefox Mobile, MouseEvent.timeStamp is zero if simulated
          || event.timeStamp === 0;
      }

      if (!invalidPointer) {
        let interaction = finder.search(event, event.type, eventTarget);

        if (!interaction) {
          interaction = new Interaction({ pointerType });
        }

        matches.push([event, interaction]);
      }
    }

    for (const [pointer, interaction] of matches) {
      interaction._updateEventTargets(eventTarget, curEventTarget);
      interaction[method](pointer, event, eventTarget, curEventTarget);
    }
  });
}

function endAll (event) {
  for (const interaction of scope.interactions) {
    interaction.end(event);
    signals.fire('endall', { event, interaction });
  }
}

const docEvents = { /* 'eventType': listenerFunc */ };
const pEventTypes = browser.pEventTypes;

if (domObjects.PointerEvent) {
  docEvents[pEventTypes.down  ] = listeners.pointerDown;
  docEvents[pEventTypes.move  ] = listeners.pointerMove;
  docEvents[pEventTypes.up    ] = listeners.pointerUp;
  docEvents[pEventTypes.cancel] = listeners.pointerUp;
}
else {
  docEvents.mousedown   = listeners.pointerDown;
  docEvents.mousemove   = listeners.pointerMove;
  docEvents.mouseup     = listeners.pointerUp;

  docEvents.touchstart  = listeners.pointerDown;
  docEvents.touchmove   = listeners.pointerMove;
  docEvents.touchend    = listeners.pointerUp;
  docEvents.touchcancel = listeners.pointerUp;
}

docEvents.blur = endAll;

function onDocSignal ({ doc }, signalName) {
  const eventMethod = signalName.indexOf('add') === 0
    ? events.add : events.remove;

  // delegate event listener
  for (const eventType in scope.delegatedEvents) {
    eventMethod(doc, eventType, events.delegateListener);
    eventMethod(doc, eventType, events.delegateUseCapture, true);
  }

  for (const eventType in docEvents) {
    eventMethod(doc, eventType, docEvents[eventType], browser.isIOS ? { passive: false } : undefined);
  }
}

signals.on('update-pointer-down', ({ interaction, pointer, pointerId, pointerIndex, event, eventTarget, down }) => {
  interaction.pointerIds[pointerIndex] = pointerId;
  interaction.pointers[pointerIndex] = pointer;

  if (down) {
    interaction.pointerIsDown = true;
  }

  if (!interaction.interacting()) {
    utils.setCoords(interaction.startCoords, interaction.pointers);

    utils.copyCoords(interaction.curCoords , interaction.startCoords);
    utils.copyCoords(interaction.prevCoords, interaction.startCoords);

    interaction.downEvent                 = event;
    interaction.downTimes[pointerIndex]   = interaction.curCoords.timeStamp;
    interaction.downTargets[pointerIndex] = eventTarget || event && utils.getEventTargets(event)[0];
    interaction.pointerWasMoved           = false;

    utils.pointerExtend(interaction.downPointer, pointer);
  }
});

scope.signals.on('add-document'   , onDocSignal);
scope.signals.on('remove-document', onDocSignal);

Interaction.pointerMoveTolerance = 1;
Interaction.doOnInteractions = doOnInteractions;
Interaction.endAll = endAll;
Interaction.signals = signals;
Interaction.docEvents = docEvents;

scope.endAllInteractions = endAll;

module.exports = Interaction;

},{"./scope":32,"./utils":43,"./utils/Signals":33,"./utils/browser":35,"./utils/domObjects":37,"./utils/events":39,"./utils/interactionFinder":44}],44:[function(require,module,exports){
const scope   = require('../scope');
const utils   = require('./index');

const finder = {
  methodOrder: [ 'simulationResume', 'mouseOrPen', 'hasPointer', 'idle' ],

  search: function (pointer, eventType, eventTarget) {
    const pointerType = utils.getPointerType(pointer);
    const pointerId = utils.getPointerId(pointer);
    const details = { pointer, pointerId, pointerType, eventType, eventTarget };

    for (const method of finder.methodOrder) {
      const interaction = finder[method](details);

      if (interaction) {
        return interaction;
      }
    }
  },

  // try to resume simulation with a new pointer
  simulationResume: function ({ pointerType, eventType, eventTarget }) {
    if (!/down|start/i.test(eventType)) {
      return null;
    }

    for (const interaction of scope.interactions) {
      let element = eventTarget;

      if (interaction.simulation && interaction.simulation.allowResume
          && (interaction.pointerType === pointerType)) {
        while (element) {
          // if the element is the interaction element
          if (element === interaction.element) {
            return interaction;
          }
          element = utils.parentNode(element);
        }
      }
    }

    return null;
  },

  // if it's a mouse or pen interaction
  mouseOrPen: function ({ pointerId, pointerType, eventType }) {
    if (pointerType !== 'mouse' && pointerType !== 'pen') {
      return null;
    }

    let firstNonActive;

    for (const interaction of scope.interactions) {
      if (interaction.pointerType === pointerType) {
        // if it's a down event, skip interactions with running simulations
        if (interaction.simulation && !utils.contains(interaction.pointerIds, pointerId)) { continue; }

        // if the interaction is active, return it immediately
        if (interaction.interacting()) {
          return interaction;
        }
        // otherwise save it and look for another active interaction
        else if (!firstNonActive) {
          firstNonActive = interaction;
        }
      }
    }

    // if no active mouse interaction was found use the first inactive mouse
    // interaction
    if (firstNonActive) {
      return firstNonActive;
    }

    // find any mouse or pen interaction.
    // ignore the interaction if the eventType is a *down, and a simulation
    // is active
    for (const interaction of scope.interactions) {
      if (interaction.pointerType === pointerType && !(/down/i.test(eventType) && interaction.simulation)) {
        return interaction;
      }
    }

    return null;
  },

  // get interaction that has this pointer
  hasPointer: function ({ pointerId }) {
    for (const interaction of scope.interactions) {
      if (utils.contains(interaction.pointerIds, pointerId)) {
        return interaction;
      }
    }
  },

  // get first idle interaction with a matching pointerType
  idle: function ({ pointerType }) {
    for (const interaction of scope.interactions) {
      // if there's already a pointer held down
      if (interaction.pointerIds.length === 1) {
        const target = interaction.target;
        // don't add this pointer if there is a target interactable and it
        // isn't gesturable
        if (target && !target.options.gesture.enabled) {
          continue;
        }
      }
      // maximum of 2 pointers per interaction
      else if (interaction.pointerIds.length >= 2) {
        continue;
      }

      if (!interaction.interacting() && (pointerType === interaction.pointerType)) {
        return interaction;
      }
    }

    return null;
  },
};

module.exports = finder;

},{"../scope":32,"./index":43}],32:[function(require,module,exports){
const utils   = require('./utils');
const events  = require('./utils/events');
const signals = require('./utils/Signals').new();

const { getWindow } = require('./utils/window');

const scope = {
  signals,
  events,
  utils,

  // main document
  document: require('./utils/domObjects').document,
  // all documents being listened to
  documents: [],

  addDocument: function (doc, win) {
    // do nothing if document is already known
    if (utils.contains(scope.documents, doc)) { return false; }

    win = win || getWindow(doc);

    scope.documents.push(doc);
    events.documents.push(doc);

    // don't add an unload event for the main document
    // so that the page may be cached in browser history
    if (doc !== scope.document) {
      events.add(win, 'unload', scope.onWindowUnload);
    }

    signals.fire('add-document', { doc, win });
  },

  removeDocument: function (doc, win) {
    const index = scope.documents.indexOf(doc);

    win = win || getWindow(doc);

    events.remove(win, 'unload', scope.onWindowUnload);

    scope.documents.splice(index, 1);
    events.documents.splice(index, 1);

    signals.fire('remove-document', { win, doc });
  },

  onWindowUnload: function () {
    scope.removeDocument(this.document, this);
  },
};

module.exports = scope;

},{"./utils":43,"./utils/Signals":33,"./utils/domObjects":37,"./utils/events":39,"./utils/window":51}],43:[function(require,module,exports){
const extend = require('./extend');
const win    = require('./window');

const utils = {
  warnOnce: function (method, message) {
    let warned = false;

    return function () {
      if (!warned) {
        win.window.console.warn(message);
        warned = true;
      }

      return method.apply(this, arguments);
    };
  },

  // http://stackoverflow.com/a/5634528/2280888
  _getQBezierValue: function (t, p1, p2, p3) {
    const iT = 1 - t;
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
  },

  getQuadraticCurvePoint: function (startX, startY, cpX, cpY, endX, endY, position) {
    return {
      x:  utils._getQBezierValue(position, startX, cpX, endX),
      y:  utils._getQBezierValue(position, startY, cpY, endY),
    };
  },

  // http://gizma.com/easing/
  easeOutQuad: function (t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + b;
  },

  copyAction: function (dest, src) {
    dest.name  = src.name;
    dest.axis  = src.axis;
    dest.edges = src.edges;

    return dest;
  },

  is         : require('./is'),
  extend     : extend,
  hypot      : require('./hypot'),
  getOriginXY: require('./getOriginXY'),
};

extend(utils, require('./arr'));
extend(utils, require('./domUtils'));
extend(utils, require('./pointerUtils'));
extend(utils, require('./rect'));

module.exports = utils;

},{"./arr":34,"./domUtils":38,"./extend":40,"./getOriginXY":41,"./hypot":42,"./is":45,"./pointerUtils":48,"./rect":50,"./window":51}],39:[function(require,module,exports){
const is           = require('./is');
const domUtils     = require('./domUtils');
const pointerUtils = require('./pointerUtils');
const pExtend      = require('./pointerExtend');

const { window }   = require('./window');
const { contains } = require('./arr');

const elements = [];
const targets  = [];

// {
//   type: {
//     selectors: ['selector', ...],
//     contexts : [document, ...],
//     listeners: [[listener, capture, passive], ...]
//   }
//  }
const delegatedEvents = {};
const documents       = [];

const supportsOptions = (() => {
  let supported = false;

  window.document.createElement('div').addEventListener('test', null, {
    get capture () { supported = true; },
  });

  return supported;
})();

function add (element, type, listener, optionalArg) {
  const options = getOptions(optionalArg);
  let elementIndex = elements.indexOf(element);
  let target = targets[elementIndex];

  if (!target) {
    target = {
      events: {},
      typeCount: 0,
    };

    elementIndex = elements.push(element) - 1;
    targets.push(target);
  }

  if (!target.events[type]) {
    target.events[type] = [];
    target.typeCount++;
  }

  if (!contains(target.events[type], listener)) {
    element.addEventListener(type, listener, supportsOptions? options : !!options.capture);
    target.events[type].push(listener);
  }
}

function remove (element, type, listener, optionalArg) {
  const options = getOptions(optionalArg);
  const elementIndex = elements.indexOf(element);
  const target = targets[elementIndex];

  if (!target || !target.events) {
    return;
  }

  if (type === 'all') {
    for (type in target.events) {
      if (target.events.hasOwnProperty(type)) {
        remove(element, type, 'all');
      }
    }
    return;
  }

  if (target.events[type]) {
    const len = target.events[type].length;

    if (listener === 'all') {
      for (let i = 0; i < len; i++) {
        remove(element, type, target.events[type][i], options);
      }
      return;
    }
    else {
      for (let i = 0; i < len; i++) {
        if (target.events[type][i] === listener) {
          element.removeEventListener(`on${type}`, listener, supportsOptions? options : !!options.capture);
          target.events[type].splice(i, 1);

          break;
        }
      }
    }

    if (target.events[type] && target.events[type].length === 0) {
      target.events[type] = null;
      target.typeCount--;
    }
  }

  if (!target.typeCount) {
    targets.splice(elementIndex, 1);
    elements.splice(elementIndex, 1);
  }
}

function addDelegate (selector, context, type, listener, optionalArg) {
  const options = getOptions(optionalArg);
  if (!delegatedEvents[type]) {
    delegatedEvents[type] = {
      selectors: [],
      contexts : [],
      listeners: [],
    };

    // add delegate listener functions
    for (const doc of documents) {
      add(doc, type, delegateListener);
      add(doc, type, delegateUseCapture, true);
    }
  }

  const delegated = delegatedEvents[type];
  let index;

  for (index = delegated.selectors.length - 1; index >= 0; index--) {
    if (delegated.selectors[index] === selector
        && delegated.contexts[index] === context) {
      break;
    }
  }

  if (index === -1) {
    index = delegated.selectors.length;

    delegated.selectors.push(selector);
    delegated.contexts .push(context);
    delegated.listeners.push([]);
  }

  // keep listener and capture and passive flags
  delegated.listeners[index].push([listener, !!options.capture, options.passive]);
}

function removeDelegate (selector, context, type, listener, optionalArg) {
  const options = getOptions(optionalArg);
  const delegated = delegatedEvents[type];
  let matchFound = false;
  let index;

  if (!delegated) { return; }

  // count from last index of delegated to 0
  for (index = delegated.selectors.length - 1; index >= 0; index--) {
    // look for matching selector and context Node
    if (delegated.selectors[index] === selector
        && delegated.contexts[index] === context) {

      const listeners = delegated.listeners[index];

      // each item of the listeners array is an array: [function, capture, passive]
      for (let i = listeners.length - 1; i >= 0; i--) {
        const [fn, capture, passive] = listeners[i];

        // check if the listener functions and capture and passive flags match
        if (fn === listener && capture === !!options.capture && passive === options.passive) {
          // remove the listener from the array of listeners
          listeners.splice(i, 1);

          // if all listeners for this interactable have been removed
          // remove the interactable from the delegated arrays
          if (!listeners.length) {
            delegated.selectors.splice(index, 1);
            delegated.contexts .splice(index, 1);
            delegated.listeners.splice(index, 1);

            // remove delegate function from context
            remove(context, type, delegateListener);
            remove(context, type, delegateUseCapture, true);

            // remove the arrays if they are empty
            if (!delegated.selectors.length) {
              delegatedEvents[type] = null;
            }
          }

          // only remove one listener
          matchFound = true;
          break;
        }
      }

      if (matchFound) { break; }
    }
  }
}

// bound to the interactable context when a DOM event
// listener is added to a selector interactable
function delegateListener (event, optionalArg) {
  const options = getOptions(optionalArg);
  const fakeEvent = {};
  const delegated = delegatedEvents[event.type];
  const [eventTarget] = (pointerUtils.getEventTargets(event));
  let element = eventTarget;

  // duplicate the event so that currentTarget can be changed
  pExtend(fakeEvent, event);

  fakeEvent.originalEvent = event;
  fakeEvent.preventDefault = preventOriginalDefault;

  // climb up document tree looking for selector matches
  while (is.element(element)) {
    for (let i = 0; i < delegated.selectors.length; i++) {
      const selector = delegated.selectors[i];
      const context = delegated.contexts[i];

      if (domUtils.matchesSelector(element, selector)
          && domUtils.nodeContains(context, eventTarget)
          && domUtils.nodeContains(context, element)) {

        const listeners = delegated.listeners[i];

        fakeEvent.currentTarget = element;

        for (let j = 0; j < listeners.length; j++) {
          const [fn, capture, passive] = listeners[j];

          if (capture === !!options.capture && passive === options.passive) {
            fn(fakeEvent);
          }
        }
      }
    }

    element = domUtils.parentNode(element);
  }
}

function delegateUseCapture (event) {
  return delegateListener.call(this, event, true);
}

function preventOriginalDefault () {
  this.originalEvent.preventDefault();
}

function getOptions (param) {
  return is.object(param)? param : { capture: param };
}

module.exports = {
  add,
  remove,

  addDelegate,
  removeDelegate,

  delegateListener,
  delegateUseCapture,
  delegatedEvents,
  documents,

  supportsOptions,

  _elements: elements,
  _targets: targets,
};

},{"./arr":34,"./domUtils":38,"./is":45,"./pointerExtend":47,"./pointerUtils":48,"./window":51}],48:[function(require,module,exports){
const hypot         = require('./hypot');
const browser       = require('./browser');
const dom           = require('./domObjects');
const domUtils      = require('./domUtils');
const domObjects    = require('./domObjects');
const is            = require('./is');
const pointerExtend = require('./pointerExtend');

const pointerUtils = {
  copyCoords: function (dest, src) {
    dest.page = dest.page || {};
    dest.page.x = src.page.x;
    dest.page.y = src.page.y;

    dest.client = dest.client || {};
    dest.client.x = src.client.x;
    dest.client.y = src.client.y;

    dest.timeStamp = src.timeStamp;
  },

  setCoordDeltas: function (targetObj, prev, cur) {
    targetObj.page.x    = cur.page.x    - prev.page.x;
    targetObj.page.y    = cur.page.y    - prev.page.y;
    targetObj.client.x  = cur.client.x  - prev.client.x;
    targetObj.client.y  = cur.client.y  - prev.client.y;
    targetObj.timeStamp = cur.timeStamp - prev.timeStamp;

    // set pointer velocity
    const dt = Math.max(targetObj.timeStamp / 1000, 0.001);

    targetObj.page.speed   = hypot(targetObj.page.x, targetObj.page.y) / dt;
    targetObj.page.vx      = targetObj.page.x / dt;
    targetObj.page.vy      = targetObj.page.y / dt;

    targetObj.client.speed = hypot(targetObj.client.x, targetObj.page.y) / dt;
    targetObj.client.vx    = targetObj.client.x / dt;
    targetObj.client.vy    = targetObj.client.y / dt;
  },

  isNativePointer: function  (pointer) {
    return (pointer instanceof dom.Event || pointer instanceof dom.Touch);
  },

  // Get specified X/Y coords for mouse or event.touches[0]
  getXY: function (type, pointer, xy) {
    xy = xy || {};
    type = type || 'page';

    xy.x = pointer[type + 'X'];
    xy.y = pointer[type + 'Y'];

    return xy;
  },

  getPageXY: function (pointer, page) {
    page = page || {};

    // Opera Mobile handles the viewport and scrolling oddly
    if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
      pointerUtils.getXY('screen', pointer, page);

      page.x += window.scrollX;
      page.y += window.scrollY;
    }
    else {
      pointerUtils.getXY('page', pointer, page);
    }

    return page;
  },

  getClientXY: function (pointer, client) {
    client = client || {};

    if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
      // Opera Mobile handles the viewport and scrolling oddly
      pointerUtils.getXY('screen', pointer, client);
    }
    else {
      pointerUtils.getXY('client', pointer, client);
    }

    return client;
  },

  getPointerId: function (pointer) {
    return is.number(pointer.pointerId)? pointer.pointerId : pointer.identifier;
  },

  setCoords: function (targetObj, pointers, timeStamp) {
    const pointer = (pointers.length > 1
                     ? pointerUtils.pointerAverage(pointers)
                     : pointers[0]);

    const tmpXY = {};

    pointerUtils.getPageXY(pointer, tmpXY);
    targetObj.page.x = tmpXY.x;
    targetObj.page.y = tmpXY.y;

    pointerUtils.getClientXY(pointer, tmpXY);
    targetObj.client.x = tmpXY.x;
    targetObj.client.y = tmpXY.y;

    targetObj.timeStamp = is.number(timeStamp) ? timeStamp :new Date().getTime();
  },

  pointerExtend: pointerExtend,

  getTouchPair: function (event) {
    const touches = [];

    // array of touches is supplied
    if (is.array(event)) {
      touches[0] = event[0];
      touches[1] = event[1];
    }
    // an event
    else {
      if (event.type === 'touchend') {
        if (event.touches.length === 1) {
          touches[0] = event.touches[0];
          touches[1] = event.changedTouches[0];
        }
        else if (event.touches.length === 0) {
          touches[0] = event.changedTouches[0];
          touches[1] = event.changedTouches[1];
        }
      }
      else {
        touches[0] = event.touches[0];
        touches[1] = event.touches[1];
      }
    }

    return touches;
  },

  pointerAverage: function (pointers) {
    const average = {
      pageX  : 0,
      pageY  : 0,
      clientX: 0,
      clientY: 0,
      screenX: 0,
      screenY: 0,
    };

    for (const pointer of pointers) {
      for (const prop in average) {
        average[prop] += pointer[prop];
      }
    }
    for (const prop in average) {
      average[prop] /= pointers.length;
    }

    return average;
  },

  touchBBox: function (event) {
    if (!event.length && !(event.touches && event.touches.length > 1)) {
      return;
    }

    const touches = pointerUtils.getTouchPair(event);
    const minX = Math.min(touches[0].pageX, touches[1].pageX);
    const minY = Math.min(touches[0].pageY, touches[1].pageY);
    const maxX = Math.max(touches[0].pageX, touches[1].pageX);
    const maxY = Math.max(touches[0].pageY, touches[1].pageY);

    return {
      x: minX,
      y: minY,
      left: minX,
      top: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  },

  touchDistance: function (event, deltaSource) {
    const sourceX = deltaSource + 'X';
    const sourceY = deltaSource + 'Y';
    const touches = pointerUtils.getTouchPair(event);


    const dx = touches[0][sourceX] - touches[1][sourceX];
    const dy = touches[0][sourceY] - touches[1][sourceY];

    return hypot(dx, dy);
  },

  touchAngle: function (event, prevAngle, deltaSource) {
    const sourceX = deltaSource + 'X';
    const sourceY = deltaSource + 'Y';
    const touches = pointerUtils.getTouchPair(event);
    const dx = touches[1][sourceX] - touches[0][sourceX];
    const dy = touches[1][sourceY] - touches[0][sourceY];
    const angle = 180 * Math.atan2(dy , dx) / Math.PI;

    return  angle;
  },

  getPointerType: function (pointer) {
    return is.string(pointer.pointerType)
      ? pointer.pointerType
      : is.number(pointer.pointerType)
        ? [undefined, undefined,'touch', 'pen', 'mouse'][pointer.pointerType]
          // if the PointerEvent API isn't available, then the "pointer" must
          // be either a MouseEvent, TouchEvent, or Touch object
          : /touch/.test(pointer.type) || pointer instanceof domObjects.Touch
            ? 'touch'
            : 'mouse';
  },

  // [ event.target, event.currentTarget ]
  getEventTargets: function (event) {
    const path = is.function(event.composedPath) ? event.composedPath() : event.path;

    return [
      domUtils.getActualElement(path ? path[0] : event.target),
      domUtils.getActualElement(event.currentTarget),
    ];
  },
};

module.exports = pointerUtils;

},{"./browser":35,"./domObjects":37,"./domUtils":38,"./hypot":42,"./is":45,"./pointerExtend":47}],42:[function(require,module,exports){
module.exports = (x, y) =>  Math.sqrt(x * x + y * y);

},{}],47:[function(require,module,exports){
function pointerExtend (dest, source) {
  for (const prop in source) {
    const prefixedPropREs = module.exports.prefixedPropREs;
    let deprecated = false;

    // skip deprecated prefixed properties
    for (const vendor in prefixedPropREs) {
      if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
        deprecated = true;
        break;
      }
    }

    if (!deprecated && typeof source[prop] !== 'function') {
      dest[prop] = source[prop];
    }
  }
  return dest;
}

pointerExtend.prefixedPropREs = {
  webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,
};

module.exports = pointerExtend;

},{}],34:[function(require,module,exports){
function contains (array, target) {
  return array.indexOf(target) !== -1;
}

function merge (target, source) {
  for (const item of source) {
    target.push(item);
  }

  return target;
}

module.exports = {
  contains,
  merge,
};

},{}],2:[function(require,module,exports){
const extend      = require('./utils/extend');
const getOriginXY = require('./utils/getOriginXY');
const defaults    = require('./defaultOptions');
const signals     = require('./utils/Signals').new();

class InteractEvent {
  /** */
  constructor (interaction, event, action, phase, element, related, preEnd = false) {
    const target      = interaction.target;
    const deltaSource = (target && target.options || defaults).deltaSource;
    const origin      = getOriginXY(target, element, action);
    const starting    = phase === 'start';
    const ending      = phase === 'end';
    const coords      = starting? interaction.startCoords : interaction.curCoords;
    const prevEvent   = interaction.prevEvent;

    element = element || interaction.element;

    const page   = extend({}, coords.page);
    const client = extend({}, coords.client);

    page.x -= origin.x;
    page.y -= origin.y;

    client.x -= origin.x;
    client.y -= origin.y;

    this.ctrlKey       = event.ctrlKey;
    this.altKey        = event.altKey;
    this.shiftKey      = event.shiftKey;
    this.metaKey       = event.metaKey;
    this.button        = event.button;
    this.buttons       = event.buttons;
    this.target        = element;
    this.currentTarget = element;
    this.relatedTarget = related || null;
    this.preEnd        = preEnd;
    this.type          = action + (phase || '');
    this.interaction   = interaction;
    this.interactable  = target;

    this.t0 = starting ? interaction.downTimes[interaction.downTimes.length - 1]
                       : prevEvent.t0;

    const signalArg = {
      interaction,
      event,
      action,
      phase,
      element,
      related,
      page,
      client,
      coords,
      starting,
      ending,
      deltaSource,
      iEvent: this,
    };

    signals.fire('set-xy', signalArg);

    if (ending) {
      // use previous coords when ending
      this.pageX = prevEvent.pageX;
      this.pageY = prevEvent.pageY;
      this.clientX = prevEvent.clientX;
      this.clientY = prevEvent.clientY;
    }
    else {
      this.pageX     = page.x;
      this.pageY     = page.y;
      this.clientX   = client.x;
      this.clientY   = client.y;
    }

    this.x0        = interaction.startCoords.page.x - origin.x;
    this.y0        = interaction.startCoords.page.y - origin.y;
    this.clientX0  = interaction.startCoords.client.x - origin.x;
    this.clientY0  = interaction.startCoords.client.y - origin.y;

    signals.fire('set-delta', signalArg);

    this.timeStamp = coords.timeStamp;
    this.dt        = interaction.pointerDelta.timeStamp;
    this.duration  = this.timeStamp - this.t0;

    // speed and velocity in pixels per second
    this.speed = interaction.pointerDelta[deltaSource].speed;
    this.velocityX = interaction.pointerDelta[deltaSource].vx;
    this.velocityY = interaction.pointerDelta[deltaSource].vy;

    this.swipe = (ending || phase === 'inertiastart')? this.getSwipe() : null;

    signals.fire('new', signalArg);
  }

  getSwipe () {
    const interaction = this.interaction;

    if (interaction.prevEvent.speed < 600
        || this.timeStamp - interaction.prevEvent.timeStamp > 150) {
      return null;
    }

    let angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI;
    const overlap = 22.5;

    if (angle < 0) {
      angle += 360;
    }

    const left = 135 - overlap <= angle && angle < 225 + overlap;
    const up   = 225 - overlap <= angle && angle < 315 + overlap;

    const right = !left && (315 - overlap <= angle || angle <  45 + overlap);
    const down  = !up   &&   45 - overlap <= angle && angle < 135 + overlap;

    return {
      up,
      down,
      left,
      right,
      angle,
      speed: interaction.prevEvent.speed,
      velocity: {
        x: interaction.prevEvent.velocityX,
        y: interaction.prevEvent.velocityY,
      },
    };
  }

  preventDefault () {}

  /** */
  stopImmediatePropagation () {
    this.immediatePropagationStopped = this.propagationStopped = true;
  }

  /** */
  stopPropagation () {
    this.propagationStopped = true;
  }
}

signals.on('set-delta', function ({ iEvent, interaction, starting, deltaSource }) {
  const prevEvent = starting? iEvent : interaction.prevEvent;

  if (deltaSource === 'client') {
    iEvent.dx = iEvent.clientX - prevEvent.clientX;
    iEvent.dy = iEvent.clientY - prevEvent.clientY;
  }
  else {
    iEvent.dx = iEvent.pageX - prevEvent.pageX;
    iEvent.dy = iEvent.pageY - prevEvent.pageY;
  }
});

InteractEvent.signals = signals;

module.exports = InteractEvent;

},{"./defaultOptions":17,"./utils/Signals":33,"./utils/extend":40,"./utils/getOriginXY":41}],41:[function(require,module,exports){
const {
  resolveRectLike,
  rectToXY,
} = require('./rect');

module.exports = function (target, element, action) {
  const actionOptions = target.options[action];
  const actionOrigin = actionOptions && actionOptions.origin;
  const origin = actionOrigin || target.options.origin;

  const originRect = resolveRectLike(origin, target, element, [target && element]);

  return rectToXY(originRect) || { x: 0, y: 0 };
};

},{"./rect":50}],50:[function(require,module,exports){
const extend = require('./extend');
const is = require('./is');
const {
  closest,
  parentNode,
  getElementRect,
} = require('./domUtils');

const rectUtils = {
  getStringOptionResult: function (value, interactable, element) {
    if (!is.string(value)) {
      return null;
    }

    if (value === 'parent') {
      value = parentNode(element);
    }
    else if (value === 'self') {
      value = interactable.getRect(element);
    }
    else {
      value = closest(element, value);
    }

    return value;
  },

  resolveRectLike: function (value, interactable, element, functionArgs) {
    value = rectUtils.getStringOptionResult(value, interactable, element) || value;

    if (is.function(value)) {
      value = value.apply(null, functionArgs);
    }

    if (is.element(value)) {
      value = getElementRect(value);
    }

    return value;
  },

  rectToXY: function (rect) {
    return  rect && {
      x: 'x' in rect ? rect.x : rect.left,
      y: 'y' in rect ? rect.y : rect.top,
    };
  },

  xywhToTlbr: function (rect) {
    if (rect && !('left' in rect && 'top' in rect)) {
      rect = extend({}, rect);

      rect.left   = rect.x || 0;
      rect.top    = rect.y || 0;
      rect.right  = rect.right   || (rect.left + rect.width);
      rect.bottom = rect.bottom  || (rect.top + rect.height);
    }

    return rect;
  },

  tlbrToXywh: function (rect) {
    if (rect && !('x' in rect && 'y' in rect)) {
      rect = extend({}, rect);

      rect.x      = rect.left || 0;
      rect.top    = rect.top  || 0;
      rect.width  = rect.width  || (rect.right  - rect.x);
      rect.height = rect.height || (rect.bottom - rect.y);
    }

    return rect;
  },
};

module.exports = rectUtils;

},{"./domUtils":38,"./extend":40,"./is":45}],38:[function(require,module,exports){
const win        = require('./window');
const browser    = require('./browser');
const is         = require('./is');
const domObjects = require('./domObjects');

const domUtils = {
  nodeContains: function (parent, child) {
    while (child) {
      if (child === parent) {
        return true;
      }

      child = child.parentNode;
    }

    return false;
  },

  closest: function (element, selector) {
    while (is.element(element)) {
      if (domUtils.matchesSelector(element, selector)) { return element; }

      element = domUtils.parentNode(element);
    }

    return null;
  },

  parentNode: function (node) {
    let parent = node.parentNode;

    if (is.docFrag(parent)) {
      // skip past #shado-root fragments
      while ((parent = parent.host) && is.docFrag(parent)) {
        continue;
      }

      return parent;
    }

    return parent;
  },

  matchesSelector: function (element, selector) {
    // remove /deep/ from selectors if shadowDOM polyfill is used
    if (win.window !== win.realWindow) {
      selector = selector.replace(/\/deep\//g, ' ');
    }

    return element[browser.prefixedMatchesSelector](selector);
  },

  // Test for the element that's "above" all other qualifiers
  indexOfDeepestElement: function (elements) {
    let deepestZoneParents = [];
    let dropzoneParents = [];
    let dropzone;
    let deepestZone = elements[0];
    let index = deepestZone? 0: -1;
    let parent;
    let child;
    let i;
    let n;

    for (i = 1; i < elements.length; i++) {
      dropzone = elements[i];

      // an element might belong to multiple selector dropzones
      if (!dropzone || dropzone === deepestZone) {
        continue;
      }

      if (!deepestZone) {
        deepestZone = dropzone;
        index = i;
        continue;
      }

      // check if the deepest or current are document.documentElement or document.rootElement
      // - if the current dropzone is, do nothing and continue
      if (dropzone.parentNode === dropzone.ownerDocument) {
        continue;
      }
      // - if deepest is, update with the current dropzone and continue to next
      else if (deepestZone.parentNode === dropzone.ownerDocument) {
        deepestZone = dropzone;
        index = i;
        continue;
      }

      if (!deepestZoneParents.length) {
        parent = deepestZone;
        while (parent.parentNode && parent.parentNode !== parent.ownerDocument) {
          deepestZoneParents.unshift(parent);
          parent = parent.parentNode;
        }
      }

      // if this element is an svg element and the current deepest is
      // an HTMLElement
      if (deepestZone instanceof domObjects.HTMLElement
          && dropzone instanceof domObjects.SVGElement
          && !(dropzone instanceof domObjects.SVGSVGElement)) {

        if (dropzone === deepestZone.parentNode) {
          continue;
        }

        parent = dropzone.ownerSVGElement;
      }
      else {
        parent = dropzone;
      }

      dropzoneParents = [];

      while (parent.parentNode !== parent.ownerDocument) {
        dropzoneParents.unshift(parent);
        parent = parent.parentNode;
      }

      n = 0;

      // get (position of last common ancestor) + 1
      while (dropzoneParents[n] && dropzoneParents[n] === deepestZoneParents[n]) {
        n++;
      }

      const parents = [
        dropzoneParents[n - 1],
        dropzoneParents[n],
        deepestZoneParents[n],
      ];

      child = parents[0].lastChild;

      while (child) {
        if (child === parents[1]) {
          deepestZone = dropzone;
          index = i;
          deepestZoneParents = [];

          break;
        }
        else if (child === parents[2]) {
          break;
        }

        child = child.previousSibling;
      }
    }

    return index;
  },

  matchesUpTo: function (element, selector, limit) {
    while (is.element(element)) {
      if (domUtils.matchesSelector(element, selector)) {
        return true;
      }

      element = domUtils.parentNode(element);

      if (element === limit) {
        return domUtils.matchesSelector(element, selector);
      }
    }

    return false;
  },

  getActualElement: function (element) {
    return (element instanceof domObjects.SVGElementInstance
      ? element.correspondingUseElement
      : element);
  },

  getScrollXY: function (relevantWindow) {
    relevantWindow = relevantWindow || win.window;
    return {
      x: relevantWindow.scrollX || relevantWindow.document.documentElement.scrollLeft,
      y: relevantWindow.scrollY || relevantWindow.document.documentElement.scrollTop,
    };
  },

  getElementClientRect: function (element) {
    const clientRect = (element instanceof domObjects.SVGElement
      ? element.getBoundingClientRect()
      : element.getClientRects()[0]);

    return clientRect && {
      left  : clientRect.left,
      right : clientRect.right,
      top   : clientRect.top,
      bottom: clientRect.bottom,
      width : clientRect.width  || clientRect.right  - clientRect.left,
      height: clientRect.height || clientRect.bottom - clientRect.top,
    };
  },

  getElementRect: function (element) {
    const clientRect = domUtils.getElementClientRect(element);

    if (!browser.isIOS7 && clientRect) {
      const scroll = domUtils.getScrollXY(win.getWindow(element));

      clientRect.left   += scroll.x;
      clientRect.right  += scroll.x;
      clientRect.top    += scroll.y;
      clientRect.bottom += scroll.y;
    }

    return clientRect;
  },

  getPath: function (element) {
    const path = [];

    while (element) {
      path.push(element);
      element = domUtils.parentNode(element);
    }

    return path;
  },

  trySelector: value => {
    if (!is.string(value)) { return false; }

    // an exception will be raised if it is invalid
    domObjects.document.querySelector(value);
    return true;
  },
};

module.exports = domUtils;

},{"./browser":35,"./domObjects":37,"./is":45,"./window":51}],35:[function(require,module,exports){
const { window } = require('./window');
const is     = require('./is');
const domObjects = require('./domObjects');

const Element = domObjects.Element;
const navigator  = window.navigator;

const browser = {
  // Does the browser support touch input?
  supportsTouch: !!(('ontouchstart' in window) || is.function(window.DocumentTouch)
                     && domObjects.document instanceof window.DocumentTouch),

  // Does the browser support PointerEvents
  supportsPointerEvent: !!domObjects.PointerEvent,

  isIOS: (/iP(hone|od|ad)/.test(navigator.platform)),

  // scrolling doesn't change the result of getClientRects on iOS 7
  isIOS7: (/iP(hone|od|ad)/.test(navigator.platform)
           && /OS 7[^\d]/.test(navigator.appVersion)),

  isIe9: /MSIE 9/.test(navigator.userAgent),

  // prefix matchesSelector
  prefixedMatchesSelector: 'matches' in Element.prototype
    ? 'matches': 'webkitMatchesSelector' in Element.prototype
    ? 'webkitMatchesSelector': 'mozMatchesSelector' in Element.prototype
    ? 'mozMatchesSelector': 'oMatchesSelector' in Element.prototype
    ? 'oMatchesSelector': 'msMatchesSelector',

  pEventTypes: (domObjects.PointerEvent
    ? (domObjects.PointerEvent === window.MSPointerEvent
      ? {
        up:     'MSPointerUp',
        down:   'MSPointerDown',
        over:   'mouseover',
        out:    'mouseout',
        move:   'MSPointerMove',
        cancel: 'MSPointerCancel',
      }
      : {
        up:     'pointerup',
        down:   'pointerdown',
        over:   'pointerover',
        out:    'pointerout',
        move:   'pointermove',
        cancel: 'pointercancel',
      })
    : null),

  // because Webkit and Opera still use 'mousewheel' event type
  wheelEvent: 'onmousewheel' in domObjects.document? 'mousewheel': 'wheel',

};

// Opera Mobile must be handled differently
browser.isOperaMobile = (navigator.appName === 'Opera'
  && browser.supportsTouch
  && navigator.userAgent.match('Presto'));

module.exports = browser;

},{"./domObjects":37,"./is":45,"./window":51}],45:[function(require,module,exports){
const win        = require('./window');
const isWindow   = require('./isWindow');

const is = {
  array   : () => {},

  window  : thing => thing === win.window || isWindow(thing),

  docFrag : thing => is.object(thing) && thing.nodeType === 11,

  object  : thing => !!thing && (typeof thing === 'object'),

  function: thing => typeof thing === 'function',

  number  : thing => typeof thing === 'number'  ,

  bool    : thing => typeof thing === 'boolean' ,

  string  : thing => typeof thing === 'string'  ,

  element: thing => {
    if (!thing || (typeof thing !== 'object')) { return false; }

    const _window = win.getWindow(thing) || win.window;

    return (/object|function/.test(typeof _window.Element)
      ? thing instanceof _window.Element //DOM2
      : thing.nodeType === 1 && typeof thing.nodeName === 'string');
  },

  plainObject: thing => is.object(thing) && thing.constructor.name === 'Object',
};

is.array = thing => (is.object(thing)
  && (typeof thing.length !== 'undefined')
  && is.function(thing.splice));

module.exports = is;

},{"./isWindow":46,"./window":51}],37:[function(require,module,exports){
const domObjects = {};
const win = require('./window').window;

function blank () {}

domObjects.document           = win.document;
domObjects.DocumentFragment   = win.DocumentFragment   || blank;
domObjects.SVGElement         = win.SVGElement         || blank;
domObjects.SVGSVGElement      = win.SVGSVGElement      || blank;
domObjects.SVGElementInstance = win.SVGElementInstance || blank;
domObjects.Element            = win.Element            || blank;
domObjects.HTMLElement        = win.HTMLElement        || domObjects.Element;

domObjects.Event        = win.Event;
domObjects.Touch        = win.Touch || blank;
domObjects.PointerEvent = (win.PointerEvent || win.MSPointerEvent);

module.exports = domObjects;

},{"./window":51}],51:[function(require,module,exports){
const win = module.exports;
const isWindow = require('./isWindow');

function init (window) {
  // get wrapped window if using Shadow DOM polyfill

  win.realWindow = window;

  // create a TextNode
  const el = window.document.createTextNode('');

  // check if it's wrapped by a polyfill
  if (el.ownerDocument !== window.document
      && typeof window.wrap === 'function'
    && window.wrap(el) === el) {
    // use wrapped window
    window = window.wrap(window);
  }

  win.window = window;
}

if (typeof window === 'undefined') {
  win.window     = undefined;
  win.realWindow = undefined;
}
else {
  init(window);
}

win.getWindow = function getWindow (node) {
  if (isWindow(node)) {
    return node;
  }

  const rootNode = (node.ownerDocument || node);

  return rootNode.defaultView || rootNode.parentWindow || win.window;
};

win.init = init;

},{"./isWindow":46}],46:[function(require,module,exports){
module.exports = (thing) => !!(thing && thing.Window) && (thing instanceof thing.Window);

},{}],33:[function(require,module,exports){
class Signals {
  constructor () {
    this.listeners = {
      // signalName: [listeners],
    };
  }

  on (name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [listener];
      return;
    }

    this.listeners[name].push(listener);
  }

  off (name, listener) {
    if (!this.listeners[name]) { return; }

    const index = this.listeners[name].indexOf(listener);

    if (index !== -1) {
      this.listeners[name].splice(index, 1);
    }
  }

  fire (name, arg) {
    const targetListeners = this.listeners[name];

    if (!targetListeners) { return; }

    for (const listener of targetListeners) {
      if (listener(arg, name) === false) {
        return;
      }
    }
  }
}

Signals.new = function () {
  return new Signals();
};

module.exports = Signals;

},{}],17:[function(require,module,exports){
module.exports = {
  base: {
    accept        : null,
    preventDefault: 'auto',
    deltaSource   : 'page',
  },

  perAction: {
    origin: { x: 0, y: 0 },

    inertia: {
      enabled          : false,
      resistance       : 10,    // the lambda in exponential decay
      minSpeed         : 100,   // target speed must be above this for inertia to start
      endSpeed         : 10,    // the speed at which inertia is slow enough to stop
      allowResume      : true,  // allow resuming an action in inertia phase
      smoothEndDuration: 300,   // animate to snap/restrict endOnly if there's no inertia
    },
  },
};

},{}],1:[function(require,module,exports){
const extend = require('./utils/extend.js');

function fireUntilImmediateStopped (event, listeners) {
  for (const listener of listeners) {
    if (event.immediatePropagationStopped) { break; }

    listener(event);
  }
}

class Eventable {

  constructor (options) {
    this.options = extend({}, options || {});
  }

  fire (event) {
    let listeners;
    const onEvent = 'on' + event.type;
    const global = this.global;

    // Interactable#on() listeners
    if ((listeners = this[event.type])) {
      fireUntilImmediateStopped(event, listeners);
    }

    // interactable.onevent listener
    if (this[onEvent]) {
      this[onEvent](event);
    }

    // interact.on() listeners
    if (!event.propagationStopped && global && (listeners = global[event.type]))  {
      fireUntilImmediateStopped(event, listeners);
    }
  }

  on (eventType, listener) {
    // if this type of event was never bound
    if (this[eventType]) {
      this[eventType].push(listener);
    }
    else {
      this[eventType] = [listener];
    }
  }

  off (eventType, listener) {
    // if it is an action event type
    const eventList = this[eventType];
    const index     = eventList? eventList.indexOf(listener) : -1;

    if (index !== -1) {
      eventList.splice(index, 1);
    }

    if (eventList && eventList.length === 0 || !listener) {
      this[eventType] = undefined;
    }
  }
}

module.exports = Eventable;

},{"./utils/extend.js":40}],40:[function(require,module,exports){
module.exports = function extend (dest, source) {
  for (const prop in source) {
    dest[prop] = source[prop];
  }
  return dest;
};

},{}]},{},[147])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGlmcmFtZS1kcmFnLW4tZHJvcC5qcyIsInNyY1xcdXRpbFxcZHJhZy1uLWRyb3AuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvcG9pbnRlckV2ZW50cy9pbnRlcmFjdGFibGVUYXJnZXRzLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3BvaW50ZXJFdmVudHMvaG9sZFJlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9wb2ludGVyRXZlbnRzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvcG9pbnRlckV2ZW50cy9Qb2ludGVyRXZlbnQuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3NuYXBTaXplLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL21vZGlmaWVycy9zbmFwLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL21vZGlmaWVycy9yZXN0cmljdFNpemUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3Jlc3RyaWN0RWRnZXMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3Jlc3RyaWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2ludGVyYWN0YWJsZVByZXZlbnREZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2luZXJ0aWEuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYXV0b1N0YXJ0L3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvaG9sZC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvZ2VzdHVyZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvSW50ZXJhY3RhYmxlTWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL3JhZi5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hY3Rpb25zL3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hY3Rpb25zL2dlc3R1cmUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYWN0aW9ucy9kcm9wLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2ludGVyYWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2FjdGlvbnMvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9JbnRlcmFjdGFibGUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvY2xvbmUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYWN0aW9ucy9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL0ludGVyYWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2ludGVyYWN0aW9uRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3Njb3BlLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9wb2ludGVyVXRpbHMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaHlwb3QuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvcG9pbnRlckV4dGVuZC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9hcnIuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvSW50ZXJhY3RFdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9nZXRPcmlnaW5YWS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9yZWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2RvbVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaXMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvZG9tT2JqZWN0cy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy93aW5kb3cuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaXNXaW5kb3cuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvU2lnbmFscy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9kZWZhdWx0T3B0aW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9FdmVudGFibGUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBQ0E7Ozs7OztBQUVBLEtBQUssUUFBTCxHQUFnQixlQUFoQjtBQUNBLEtBQUssWUFBTCxHQUFvQix1QkFBcEI7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFNO0FBQ3BCLFFBQUksa0JBQWtCLEtBQXRCO0FBQ0EsUUFBTSxtQkFBbUIsU0FBbkIsZ0JBQW1CO0FBQUEsZUFBVyxDQUFDLENBQUMsRUFBRSxPQUFGLEVBQVcsT0FBWCxDQUFtQixXQUFuQixFQUFnQyxNQUE3QztBQUFBLEtBQXpCOztBQUVBO0FBQ0EseUJBQVMsV0FBVCxFQUNLLFFBREwsQ0FDYztBQUNOO0FBQ0EsZ0JBQVEsUUFGRjtBQUdOO0FBQ0EsaUJBQVMsSUFKSDtBQUtOO0FBQ0Esd0JBQWdCLHdCQUFVLEtBQVYsRUFBaUI7QUFDN0I7QUFDQSxrQkFBTSxNQUFOLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixhQUEzQjtBQUNILFNBVEs7QUFVTixxQkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCLGdCQUFJLG1CQUFtQixNQUFNLGFBQTdCO0FBQUEsZ0JBQ0ksa0JBQWtCLE1BQU0sTUFENUI7O0FBR0E7QUFDQSw0QkFBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsYUFBOUI7QUFDQSw2QkFBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsVUFBL0I7QUFDSCxTQWpCSztBQWtCTixxQkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCO0FBQ0Esa0JBQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDQSxrQkFBTSxhQUFOLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFVBQXJDO0FBQ0EsOEJBQWtCLEtBQWxCO0FBQ0gsU0F2Qks7QUF3Qk4sZ0JBQVEsdUJBQVM7QUFDYiw4QkFBa0IsSUFBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBTSxTQUFTLEVBQUUsTUFBTSxhQUFSLEVBQXVCLE1BQXZCLEVBQWY7QUFDQSxjQUFFLE1BQU0sYUFBUixFQUNLLFFBREwsQ0FDYyxFQUFFLE1BQU0sTUFBUixDQURkLEVBRUssR0FGTCxDQUVTO0FBQ0Qsc0JBQU0sRUFETDtBQUVELHFCQUFLLEVBRko7QUFHRCwyQkFBVztBQUhWLGFBRlQsRUFPSyxNQVBMLENBT1ksTUFQWixFQVFLLFVBUkwsQ0FRZ0IsZUFSaEI7QUFTSCxTQXZDSztBQXdDTiwwQkFBa0IsMEJBQVUsS0FBVixFQUFpQjtBQUMvQjtBQUNBLGtCQUFNLE1BQU4sQ0FBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLGFBQTlCO0FBQ0Esa0JBQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDQSxnQkFBSSxDQUFDLGVBQUQsSUFBb0IsaUJBQWlCLE1BQU0sYUFBdkIsQ0FBeEIsRUFBK0Q7QUFDM0Qsb0JBQU0sU0FBUyxFQUFFLE1BQU0sYUFBUixFQUF1QixNQUF2QixFQUFmO0FBQ0Esa0JBQUUsTUFBTSxhQUFSLEVBQ0ssUUFETCxDQUNjLEVBQUUsTUFBRixDQURkLEVBRUssTUFGTCxDQUVZLE1BRlo7QUFHSDtBQUNKO0FBbERLLEtBRGQsRUFxREssU0FyREwsQ0FxRGU7QUFDUDtBQUNBLGVBQU8sRUFBRSxNQUFNLElBQVIsRUFBYyxPQUFPLElBQXJCLEVBQTJCLFFBQVEsSUFBbkMsRUFBeUMsS0FBSyxJQUE5QyxFQUZBOztBQUlQO0FBQ0EsdUJBQWU7QUFDWCxtQkFBTyxRQURJO0FBRVgscUJBQVM7QUFGRSxTQUxSOztBQVVQO0FBQ0Esc0JBQWM7QUFDVixpQkFBSyxFQUFFLE9BQU8sR0FBVCxFQUFjLFFBQVEsRUFBdEI7QUFESyxTQVhQOztBQWVQLGlCQUFTO0FBZkYsS0FyRGYsRUFzRUssRUF0RUwsQ0FzRVEsWUF0RVIsRUFzRXNCLFVBQVUsS0FBVixFQUFpQjtBQUMvQixZQUFJLFNBQVMsTUFBTSxNQUFuQjtBQUFBLFlBQ0ksSUFBSyxXQUFXLE9BQU8sWUFBUCxDQUFvQixRQUFwQixDQUFYLEtBQTZDLENBRHREO0FBQUEsWUFFSSxJQUFLLFdBQVcsT0FBTyxZQUFQLENBQW9CLFFBQXBCLENBQVgsS0FBNkMsQ0FGdEQ7O0FBSUE7QUFDQSxlQUFPLEtBQVAsQ0FBYSxLQUFiLEdBQXFCLE1BQU0sSUFBTixDQUFXLEtBQVgsR0FBbUIsSUFBeEM7QUFDQSxlQUFPLEtBQVAsQ0FBYSxNQUFiLEdBQXNCLE1BQU0sSUFBTixDQUFXLE1BQVgsR0FBb0IsSUFBMUM7O0FBRUE7QUFDQSxhQUFLLE1BQU0sU0FBTixDQUFnQixJQUFyQjtBQUNBLGFBQUssTUFBTSxTQUFOLENBQWdCLEdBQXJCOztBQUVBLGVBQU8sS0FBUCxDQUFhLGVBQWIsR0FBK0IsT0FBTyxLQUFQLENBQWEsU0FBYixHQUMzQixlQUFlLENBQWYsR0FBbUIsS0FBbkIsR0FBMkIsQ0FBM0IsR0FBK0IsS0FEbkM7O0FBR0EsZUFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0EsZUFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0gsS0F4Rkw7O0FBMEZBLHlCQUFTLGtCQUFULEVBQ0ssU0FETCxDQUNlO0FBQ1A7QUFDQSxpQkFBUyxJQUZGO0FBR1A7QUFDQSxrQkFBVTtBQUNOLHlCQUFhLFNBQVMsSUFEaEI7QUFFTixxQkFBUyxJQUZIO0FBR04seUJBQWEsRUFBRSxLQUFLLENBQVAsRUFBVSxNQUFNLENBQWhCLEVBQW1CLFFBQVEsQ0FBM0IsRUFBOEIsT0FBTyxDQUFyQztBQUhQLFNBSkg7QUFTUDtBQUNBLG9CQUFZLElBVkw7O0FBWVA7QUFDQSxnQkFBUSx1QkFBUztBQUNiO0FBQ0EsZ0JBQUksU0FBUyxNQUFNLE1BQW5COztBQUNJO0FBQ0EsZ0JBQUksQ0FBQyxXQUFXLE9BQU8sWUFBUCxDQUFvQixRQUFwQixDQUFYLEtBQTZDLENBQTlDLElBQW1ELE1BQU0sRUFGakU7QUFBQSxnQkFHSSxJQUFJLENBQUMsV0FBVyxPQUFPLFlBQVAsQ0FBb0IsUUFBcEIsQ0FBWCxLQUE2QyxDQUE5QyxJQUFtRCxNQUFNLEVBSGpFOztBQUtBO0FBQ0EsbUJBQU8sS0FBUCxDQUFhLGVBQWIsR0FDSSxPQUFPLEtBQVAsQ0FBYSxTQUFiLEdBQ0EsZUFBZSxDQUFmLEdBQW1CLE1BQW5CLEdBQTRCLENBQTVCLEdBQWdDLEtBRnBDOztBQUlBO0FBQ0EsbUJBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixDQUE5QjtBQUNBLG1CQUFPLFlBQVAsQ0FBb0IsUUFBcEIsRUFBOEIsQ0FBOUI7O0FBRUEsOENBQWtCLE1BQWxCO0FBQ0gsU0E5Qk07QUErQlA7QUFDQSxlQUFPO0FBaENBLEtBRGY7QUFtQ0gsQ0FsSUQ7Ozs7OztBQ05BLFNBQVMsT0FBVCxDQUFpQixZQUFqQixFQUErQixhQUEvQixFQUE4QztBQUMxQyxXQUFPO0FBQ0gsMkJBQW1CLEtBQUssR0FBTCxDQUFTLGFBQWEsR0FBYixHQUFtQixjQUFjLEdBQTFDLEtBQWtELENBRGxFO0FBRUgseUJBQWlCLEtBQUssR0FBTCxDQUFTLGFBQWEsSUFBYixHQUFvQixjQUFjLElBQTNDLEtBQW9EO0FBRmxFLEtBQVA7QUFJSDs7QUFFRCxTQUFTLG9CQUFULEdBQWdDO0FBQzVCLE1BQUUsa0NBQUYsRUFBc0MsTUFBdEM7QUFDSDs7QUFFRCxTQUFTLGlCQUFULENBQTJCLE1BQTNCLEVBQW1DO0FBQy9CLFFBQUksdUJBQXVCLEtBQTNCO0FBQ0EsUUFBSSxxQkFBcUIsS0FBekI7QUFDQSxRQUFNLGVBQWUsRUFBRSxNQUFGLEVBQVUsTUFBVixFQUFyQjs7QUFFQSxVQUFNLElBQU4sQ0FBVyxFQUFFLDRCQUFGLENBQVgsRUFDSyxNQURMLENBQ1k7QUFBQSxlQUFnQixnQkFBZ0IsTUFBaEM7QUFBQSxLQURaLEVBRUssSUFGTCxDQUVVLHdCQUFnQjtBQUNsQixZQUFNLGdCQUFnQixFQUFFLFlBQUYsRUFBZ0IsTUFBaEIsRUFBdEI7O0FBRGtCLHVCQUU2QixRQUFRLFlBQVIsRUFBc0IsYUFBdEIsQ0FGN0I7QUFBQSxZQUVWLGlCQUZVLFlBRVYsaUJBRlU7QUFBQSxZQUVTLGVBRlQsWUFFUyxlQUZUOztBQUdsQixZQUFJLENBQUMsb0JBQUQsSUFBeUIsaUJBQTdCLEVBQWdEO0FBQzVDLGNBQUUsUUFBRixFQUNLLFFBREwsQ0FDYyxpQkFEZCxFQUVLLEdBRkwsQ0FFUztBQUNELHFCQUFLLGFBQWE7QUFEakIsYUFGVCxFQUtLLFFBTEwsQ0FLYyxFQUFFLE1BQUYsQ0FMZDtBQU1BLG1DQUF1QixJQUF2QjtBQUNIO0FBQ0QsWUFBSSxDQUFDLGtCQUFELElBQXVCLGVBQTNCLEVBQTRDO0FBQ3hDLGNBQUUsUUFBRixFQUNLLFFBREwsQ0FDYyxlQURkLEVBRUssR0FGTCxDQUVTO0FBQ0Qsc0JBQU0sYUFBYTtBQURsQixhQUZULEVBS0ssUUFMTCxDQUtjLEVBQUUsTUFBRixDQUxkO0FBTUEsaUNBQXFCLElBQXJCO0FBQ0g7QUFDRCxlQUFPLHdCQUF3QixrQkFBL0I7QUFDSCxLQXhCTDtBQXlCSDs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMkIsT0FBM0IsRUFBb0M7QUFDaEM7O0FBRUEsUUFBSSxLQUFLLENBQVQ7QUFBQSxRQUFZLEtBQUssQ0FBakI7QUFDQSxZQUFRLEdBQVI7QUFDSSxhQUFLLEVBQUw7QUFBUztBQUNMLGlCQUFLLENBQUMsQ0FBTjtBQUNBO0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTCxpQkFBSyxDQUFDLENBQU47QUFDQTtBQUNKLGFBQUssRUFBTDtBQUFTO0FBQ0wsaUJBQUssQ0FBTDtBQUNBO0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTCxpQkFBSyxDQUFMO0FBQ0E7QUFDSjtBQUFTLG1CQWJiLENBYXFCO0FBYnJCOztBQWdCQTtBQUNBLFFBQU0sSUFBSSxDQUFDLFdBQVcsUUFBUSxJQUFSLENBQWEsUUFBYixDQUFYLEtBQXNDLENBQXZDLElBQTRDLEVBQXREO0FBQUEsUUFDSSxJQUFJLENBQUMsV0FBVyxRQUFRLElBQVIsQ0FBYSxRQUFiLENBQVgsS0FBc0MsQ0FBdkMsSUFBNEMsRUFEcEQ7O0FBR0EsWUFBUSxHQUFSLENBQVk7QUFDUixrQ0FBd0IsQ0FBeEIsWUFBZ0MsQ0FBaEM7QUFEUSxLQUFaOztBQUlBO0FBQ0EsWUFBUSxJQUFSLENBQWEsUUFBYixFQUF1QixDQUF2QjtBQUNBLFlBQVEsSUFBUixDQUFhLFFBQWIsRUFBdUIsQ0FBdkI7O0FBRUEsc0JBQWtCLFFBQVEsR0FBUixDQUFZLENBQVosQ0FBbEI7QUFDSDs7UUFFUSxvQixHQUFBLG9CO1FBQXNCLFksR0FBQSxZO1FBQWMsaUIsR0FBQSxpQjs7O0FDOUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9kQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyT0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHJlbW92ZUFsaWdubWVudExpbmVzLCBhcnJvd0tleU1vdmUsIGRyYXdBbGlnbm1lbnRMaW5lIH0gZnJvbSAnLi91dGlsL2RyYWctbi1kcm9wJztcclxuaW1wb3J0IGludGVyYWN0IGZyb20gJy4uL25vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9pbmRleCc7XHJcblxyXG5zZWxmLmludGVyYWN0ID0gaW50ZXJhY3Q7XHJcbnNlbGYuYXJyb3dLZXlNb3ZlID0gYXJyb3dLZXlNb3ZlO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG4gICAgbGV0IGVudGVyZWREcm9wem9uZSA9IGZhbHNlO1xyXG4gICAgY29uc3QgaXNEcm9wem9uZVBhcmVudCA9IGVsZW1lbnQgPT4gISEkKGVsZW1lbnQpLnBhcmVudHMoJy5kcm9wem9uZScpLmxlbmd0aDtcclxuXHJcbiAgICAvLyBlbmFibGUgZHJhZ2dhYmxlcyB0byBiZSBkcm9wcGVkIGludG8gdGhpc1xyXG4gICAgaW50ZXJhY3QoJy5kcm9wem9uZScpXHJcbiAgICAgICAgLmRyb3B6b25lKHtcclxuICAgICAgICAgICAgLy8gb25seSBhY2NlcHQgZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBDU1Mgc2VsZWN0b3JcclxuICAgICAgICAgICAgYWNjZXB0OiAnYm9keSAqJyxcclxuICAgICAgICAgICAgLy8gUmVxdWlyZSBhIDc1JSBlbGVtZW50IG92ZXJsYXAgZm9yIGEgZHJvcCB0byBiZSBwb3NzaWJsZVxyXG4gICAgICAgICAgICBvdmVybGFwOiAwLjUwLFxyXG4gICAgICAgICAgICAvLyBsaXN0ZW4gZm9yIGRyb3AgcmVsYXRlZCBldmVudHM6XHJcbiAgICAgICAgICAgIG9uZHJvcGFjdGl2YXRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBhY3RpdmUgZHJvcHpvbmUgZmVlZGJhY2tcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcm9wLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmRyYWdlbnRlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHJhZ2dhYmxlRWxlbWVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmVFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZlZWRiYWNrIHRoZSBwb3NzaWJpbGl0eSBvZiBhIGRyb3BcclxuICAgICAgICAgICAgICAgIGRyb3B6b25lRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcm9wLXRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYW4tZHJvcCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmRyYWdsZWF2ZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGRyb3AgZmVlZGJhY2sgc3R5bGVcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjYW4tZHJvcCcpO1xyXG4gICAgICAgICAgICAgICAgZW50ZXJlZERyb3B6b25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZHJvcDogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZW50ZXJlZERyb3B6b25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIG9mZnNldCgp5Ye95pWw55So5LqO6K6+572u5oiW6L+U5Zue5b2T5YmN5Yy56YWN5YWD57Sg55u45a+55LqO5b2T5YmN5paH5qGj55qE5YGP56e777yM5Lmf5bCx5piv55u45a+55LqO5b2T5YmN5paH5qGj55qE5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICAvLyDlhYPntKDlj6/ku6XmmK/ku7vmhI/lrprkvY3mlrnlvI/nmoTlhYPntKBcclxuICAgICAgICAgICAgICAgIC8vIOWNleeLrOiuvue9rmxlZnTmiJZ0b3Dlr7nkuo5hYnNvbHV0ZeWumuS9jeeahOWFg+e0oOadpeivtO+8jOaYr+ebuOWvueS6juacgOi/keeahOW3suWumuS9jeelluWFiOWFg+e0oOaIluebuOWvueS6juacgOWIneeahOWMheWQq+Wdl+OAglxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KS5vZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgICQoZXZlbnQucmVsYXRlZFRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJChldmVudC50YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vZmZzZXQob2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXggZGF0YS15Jyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZHJvcGRlYWN0aXZhdGU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFjdGl2ZSBkcm9wem9uZSBmZWVkYmFja1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC10YXJnZXQnKTtcclxuICAgICAgICAgICAgICAgIGlmICghZW50ZXJlZERyb3B6b25lICYmIGlzRHJvcHpvbmVQYXJlbnQoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLm9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZXZlbnQucmVsYXRlZFRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoJ2JvZHknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9mZnNldChvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAucmVzaXphYmxlKHtcclxuICAgICAgICAgICAgLy8gcmVzaXplIGZyb20gYWxsIGVkZ2VzIGFuZCBjb3JuZXJzXHJcbiAgICAgICAgICAgIGVkZ2VzOiB7IGxlZnQ6IHRydWUsIHJpZ2h0OiB0cnVlLCBib3R0b206IHRydWUsIHRvcDogdHJ1ZSB9LFxyXG5cclxuICAgICAgICAgICAgLy8ga2VlcCB0aGUgZWRnZXMgaW5zaWRlIHRoZSBwYXJlbnRcclxuICAgICAgICAgICAgcmVzdHJpY3RFZGdlczoge1xyXG4gICAgICAgICAgICAgICAgb3V0ZXI6ICdwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgZW5kT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIG1pbmltdW0gc2l6ZVxyXG4gICAgICAgICAgICByZXN0cmljdFNpemU6IHtcclxuICAgICAgICAgICAgICAgIG1pbjogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDUwIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbmVydGlhOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdyZXNpemVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICB4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZWxlbWVudCdzIHN0eWxlXHJcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS53aWR0aCA9IGV2ZW50LnJlY3Qud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gZXZlbnQucmVjdC5oZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHdoZW4gcmVzaXppbmcgZnJvbSB0b3Agb3IgbGVmdCBlZGdlc1xyXG4gICAgICAgICAgICB4ICs9IGV2ZW50LmRlbHRhUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICB5ICs9IGV2ZW50LmRlbHRhUmVjdC50b3A7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCcgKyB5ICsgJ3B4KSc7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCB4KTtcclxuICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgaW50ZXJhY3QoJ2JvZHkgKi5kcmFnZ2FibGUnKVxyXG4gICAgICAgIC5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAvLyBlbmFibGUgaW5lcnRpYWwgdGhyb3dpbmdcclxuICAgICAgICAgICAgaW5lcnRpYTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8ga2VlcCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGFyZWEgb2YgaXQncyBwYXJlbnRcclxuICAgICAgICAgICAgcmVzdHJpY3Q6IHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uOiBkb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICAgICAgZW5kT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRSZWN0OiB7IHRvcDogMCwgbGVmdDogMCwgYm90dG9tOiAxLCByaWdodDogMSB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSBhdXRvU2Nyb2xsXHJcbiAgICAgICAgICAgIGF1dG9TY3JvbGw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgZHJhZ21vdmUgZXZlbnRcclxuICAgICAgICAgICAgb25tb3ZlOiBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBbGlnbm1lbnRMaW5lcygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBrZWVwIHRoZSBkcmFnZ2VkIHBvc2l0aW9uIGluIHRoZSBkYXRhLXgvZGF0YS15IGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICAgICAgICB4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpIHx8IDApICsgZXZlbnQuZHgsXHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKSB8fCAwKSArIGV2ZW50LmR5O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSB0aGUgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgnICsgeCArICdweCwgJyArIHkgKyAncHgpJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2lpb24gYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkcmF3QWxpZ25tZW50TGluZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgZHJhZ2VuZCBldmVudFxyXG4gICAgICAgICAgICBvbmVuZDogcmVtb3ZlQWxpZ25tZW50TGluZXNcclxuICAgICAgICB9KTtcclxufSk7IiwiZnVuY3Rpb24gaXNBbGlnbih0YXJnZXRPZmZzZXQsIGN1cnJlbnRPZmZzZXQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaXNIb3Jpem9udGFsQWxpZ246IE1hdGguYWJzKHRhcmdldE9mZnNldC50b3AgLSBjdXJyZW50T2Zmc2V0LnRvcCkgPD0gMSxcclxuICAgICAgICBpc1ZlcnRpY2FsQWxpZ246IE1hdGguYWJzKHRhcmdldE9mZnNldC5sZWZ0IC0gY3VycmVudE9mZnNldC5sZWZ0KSA8PSAxXHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVBbGlnbm1lbnRMaW5lcygpIHtcclxuICAgICQoJy5ob3Jpem9udGFsLWxpbmUsIC52ZXJ0aWNhbC1saW5lJykucmVtb3ZlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdBbGlnbm1lbnRMaW5lKHRhcmdldCkge1xyXG4gICAgbGV0IGhvcml6b250YWxMaW5lRXhpc3RzID0gZmFsc2U7XHJcbiAgICBsZXQgdmVydGljYWxMaW5lRXhpc3RzID0gZmFsc2U7XHJcbiAgICBjb25zdCB0YXJnZXRPZmZzZXQgPSAkKHRhcmdldCkub2Zmc2V0KCk7XHJcblxyXG4gICAgQXJyYXkuZnJvbSgkKCdib2R5ICo6dmlzaWJsZTpub3Qoc2NyaXB0KScpKVxyXG4gICAgICAgIC5maWx0ZXIoY3VycmVudFZhbHVlID0+IGN1cnJlbnRWYWx1ZSAhPSB0YXJnZXQpXHJcbiAgICAgICAgLnNvbWUoY3VycmVudFZhbHVlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudE9mZnNldCA9ICQoY3VycmVudFZhbHVlKS5vZmZzZXQoKTtcclxuICAgICAgICAgICAgY29uc3QgeyBpc0hvcml6b250YWxBbGlnbiwgaXNWZXJ0aWNhbEFsaWduIH0gPSBpc0FsaWduKHRhcmdldE9mZnNldCwgY3VycmVudE9mZnNldCk7XHJcbiAgICAgICAgICAgIGlmICghaG9yaXpvbnRhbExpbmVFeGlzdHMgJiYgaXNIb3Jpem9udGFsQWxpZ24pIHtcclxuICAgICAgICAgICAgICAgICQoJzxociAvPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdob3Jpem9udGFsLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldE9mZnNldC50b3BcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbExpbmVFeGlzdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdmVydGljYWxMaW5lRXhpc3RzICYmIGlzVmVydGljYWxBbGlnbikge1xyXG4gICAgICAgICAgICAgICAgJCgnPGhyIC8+JylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3ZlcnRpY2FsLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0YXJnZXRPZmZzZXQubGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbExpbmVFeGlzdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBob3Jpem9udGFsTGluZUV4aXN0cyAmJiB2ZXJ0aWNhbExpbmVFeGlzdHM7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFycm93S2V5TW92ZShrZXksIGVsZW1lbnQpIHtcclxuICAgIHJlbW92ZUFsaWdubWVudExpbmVzKCk7XHJcblxyXG4gICAgbGV0IGR4ID0gMCwgZHkgPSAwO1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIDM3OiAvLyBsZWZ0XHJcbiAgICAgICAgICAgIGR4ID0gLTE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzg6IC8vIHVwXHJcbiAgICAgICAgICAgIGR5ID0gLTE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzk6IC8vIHJpZ2h0XHJcbiAgICAgICAgICAgIGR4ID0gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0MDogLy8gZG93blxyXG4gICAgICAgICAgICBkeSA9IDE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6IHJldHVybjsgLy8gZXhpdCB0aGlzIGhhbmRsZXIgZm9yIG90aGVyIGtleXNcclxuICAgIH1cclxuXHJcbiAgICAvLyBrZWVwIHRoZSBkcmFnZ2VkIHBvc2l0aW9uIGluIHRoZSBkYXRhLXgvZGF0YS15IGF0dHJpYnV0ZXNcclxuICAgIGNvbnN0IHggPSAocGFyc2VGbG9hdChlbGVtZW50LmF0dHIoJ2RhdGEteCcpKSB8fCAwKSArIGR4LFxyXG4gICAgICAgIHkgPSAocGFyc2VGbG9hdChlbGVtZW50LmF0dHIoJ2RhdGEteScpKSB8fCAwKSArIGR5O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzKHtcclxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGVzXHJcbiAgICBlbGVtZW50LmF0dHIoJ2RhdGEteCcsIHgpO1xyXG4gICAgZWxlbWVudC5hdHRyKCdkYXRhLXknLCB5KTtcclxuXHJcbiAgICBkcmF3QWxpZ25tZW50TGluZShlbGVtZW50LmdldCgwKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbW92ZUFsaWdubWVudExpbmVzLCBhcnJvd0tleU1vdmUsIGRyYXdBbGlnbm1lbnRMaW5lIH07IiwiLyogYnJvd3NlciBlbnRyeSBwb2ludCAqL1xuXG4vLyBpbmVydGlhXG5yZXF1aXJlKCcuL2luZXJ0aWEnKTtcblxuLy8gbW9kaWZpZXJzXG5yZXF1aXJlKCcuL21vZGlmaWVycy9zbmFwJyk7XG5yZXF1aXJlKCcuL21vZGlmaWVycy9yZXN0cmljdCcpO1xuXG4vLyBwb2ludGVyRXZlbnRzXG5yZXF1aXJlKCcuL3BvaW50ZXJFdmVudHMvYmFzZScpO1xucmVxdWlyZSgnLi9wb2ludGVyRXZlbnRzL2hvbGRSZXBlYXQnKTtcbnJlcXVpcmUoJy4vcG9pbnRlckV2ZW50cy9pbnRlcmFjdGFibGVUYXJnZXRzJyk7XG5cbi8vIGF1dG9TdGFydCBob2xkXG5yZXF1aXJlKCcuL2F1dG9TdGFydC9ob2xkJyk7XG5cbi8vIGFjdGlvbnNcbnJlcXVpcmUoJy4vYWN0aW9ucy9nZXN0dXJlJyk7XG5yZXF1aXJlKCcuL2FjdGlvbnMvcmVzaXplJyk7XG5yZXF1aXJlKCcuL2FjdGlvbnMvZHJhZycpO1xucmVxdWlyZSgnLi9hY3Rpb25zL2Ryb3AnKTtcblxuLy8gbG9hZCB0aGVzZSBtb2RpZmllcnMgYWZ0ZXIgcmVzaXplIGlzIGxvYWRlZFxucmVxdWlyZSgnLi9tb2RpZmllcnMvc25hcFNpemUnKTtcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3Jlc3RyaWN0RWRnZXMnKTtcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3Jlc3RyaWN0U2l6ZScpO1xuXG4vLyBhdXRvU3RhcnQgYWN0aW9uc1xucmVxdWlyZSgnLi9hdXRvU3RhcnQvZ2VzdHVyZScpO1xucmVxdWlyZSgnLi9hdXRvU3RhcnQvcmVzaXplJyk7XG5yZXF1aXJlKCcuL2F1dG9TdGFydC9kcmFnJyk7XG5cbi8vIEludGVyYWN0YWJsZSBwcmV2ZW50RGVmYXVsdCBzZXR0aW5nXG5yZXF1aXJlKCcuL2ludGVyYWN0YWJsZVByZXZlbnREZWZhdWx0LmpzJyk7XG5cbi8vIGF1dG9TY3JvbGxcbnJlcXVpcmUoJy4vYXV0b1Njcm9sbCcpO1xuXG4vLyBleHBvcnQgaW50ZXJhY3Rcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pbnRlcmFjdCcpO1xuIiwiY29uc3QgcG9pbnRlckV2ZW50cyA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgSW50ZXJhY3RhYmxlICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xuY29uc3QgaXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzJyk7XG5jb25zdCBzY29wZSAgICAgICAgID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbmNvbnN0IGV4dGVuZCAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9leHRlbmQnKTtcbmNvbnN0IHsgbWVyZ2UgfSAgICAgPSByZXF1aXJlKCcuLi91dGlscy9hcnInKTtcblxucG9pbnRlckV2ZW50cy5zaWduYWxzLm9uKCdjb2xsZWN0LXRhcmdldHMnLCBmdW5jdGlvbiAoeyB0YXJnZXRzLCBlbGVtZW50LCB0eXBlLCBldmVudFRhcmdldCB9KSB7XG4gIHNjb3BlLmludGVyYWN0YWJsZXMuZm9yRWFjaE1hdGNoKGVsZW1lbnQsIGludGVyYWN0YWJsZSA9PiB7XG4gICAgY29uc3QgZXZlbnRhYmxlID0gaW50ZXJhY3RhYmxlLmV2ZW50cztcbiAgICBjb25zdCBvcHRpb25zID0gZXZlbnRhYmxlLm9wdGlvbnM7XG5cbiAgICBpZiAoZXZlbnRhYmxlW3R5cGVdXG4gICAgICAmJiBpcy5lbGVtZW50KGVsZW1lbnQpXG4gICAgICAmJiBpbnRlcmFjdGFibGUudGVzdElnbm9yZUFsbG93KG9wdGlvbnMsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSkge1xuXG4gICAgICB0YXJnZXRzLnB1c2goe1xuICAgICAgICBlbGVtZW50LFxuICAgICAgICBldmVudGFibGUsXG4gICAgICAgIHByb3BzOiB7IGludGVyYWN0YWJsZSB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKHsgaW50ZXJhY3RhYmxlIH0pIHtcbiAgaW50ZXJhY3RhYmxlLmV2ZW50cy5nZXRSZWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gaW50ZXJhY3RhYmxlLmdldFJlY3QoZWxlbWVudCk7XG4gIH07XG59KTtcblxuSW50ZXJhY3RhYmxlLnNpZ25hbHMub24oJ3NldCcsIGZ1bmN0aW9uICh7IGludGVyYWN0YWJsZSwgb3B0aW9ucyB9KSB7XG4gIGV4dGVuZChpbnRlcmFjdGFibGUuZXZlbnRzLm9wdGlvbnMsIHBvaW50ZXJFdmVudHMuZGVmYXVsdHMpO1xuICBleHRlbmQoaW50ZXJhY3RhYmxlLmV2ZW50cy5vcHRpb25zLCBvcHRpb25zKTtcbn0pO1xuXG5tZXJnZShJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgcG9pbnRlckV2ZW50cy50eXBlcyk7XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUucG9pbnRlckV2ZW50cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGV4dGVuZCh0aGlzLmV2ZW50cy5vcHRpb25zLCBvcHRpb25zKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IF9fYmFja0NvbXBhdE9wdGlvbiA9IEludGVyYWN0YWJsZS5wcm90b3R5cGUuX2JhY2tDb21wYXRPcHRpb247XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuX2JhY2tDb21wYXRPcHRpb24gPSBmdW5jdGlvbiAob3B0aW9uTmFtZSwgbmV3VmFsdWUpIHtcbiAgY29uc3QgcmV0ID0gX19iYWNrQ29tcGF0T3B0aW9uLmNhbGwodGhpcywgb3B0aW9uTmFtZSwgbmV3VmFsdWUpO1xuXG4gIGlmIChyZXQgPT09IHRoaXMpIHtcbiAgICB0aGlzLmV2ZW50cy5vcHRpb25zW29wdGlvbk5hbWVdID0gbmV3VmFsdWU7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdwb2ludGVyRXZlbnRzJyk7XG4iLCJjb25zdCBwb2ludGVyRXZlbnRzID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcblxucG9pbnRlckV2ZW50cy5zaWduYWxzLm9uKCduZXcnLCBvbk5ldyk7XG5wb2ludGVyRXZlbnRzLnNpZ25hbHMub24oJ2ZpcmVkJywgb25GaXJlZCk7XG5cbmZvciAoY29uc3Qgc2lnbmFsIG9mIFsnbW92ZScsICd1cCcsICdjYW5jZWwnLCAnZW5kYWxsJ10pIHtcbiAgSW50ZXJhY3Rpb24uc2lnbmFscy5vbihzaWduYWwsIGVuZEhvbGRSZXBlYXQpO1xufVxuXG5mdW5jdGlvbiBvbk5ldyAoeyBwb2ludGVyRXZlbnQgfSkge1xuICBpZiAocG9pbnRlckV2ZW50LnR5cGUgIT09ICdob2xkJykgeyByZXR1cm47IH1cblxuICBwb2ludGVyRXZlbnQuY291bnQgPSAocG9pbnRlckV2ZW50LmNvdW50IHx8IDApICsgMTtcbn1cblxuZnVuY3Rpb24gb25GaXJlZCAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlckV2ZW50LCBldmVudFRhcmdldCwgdGFyZ2V0cyB9KSB7XG4gIGlmIChwb2ludGVyRXZlbnQudHlwZSAhPT0gJ2hvbGQnIHx8ICF0YXJnZXRzLmxlbmd0aCkgeyByZXR1cm47IH1cblxuICAvLyBnZXQgdGhlIHJlcGVhdCBpbnRlcnZhbCBmcm9tIHRoZSBmaXJzdCBldmVudGFibGVcbiAgY29uc3QgaW50ZXJ2YWwgPSB0YXJnZXRzWzBdLmV2ZW50YWJsZS5vcHRpb25zLmhvbGRSZXBlYXRJbnRlcnZhbDtcblxuICAvLyBkb24ndCByZXBlYXQgaWYgdGhlIGludGVydmFsIGlzIDAgb3IgbGVzc1xuICBpZiAoaW50ZXJ2YWwgPD0gMCkgeyByZXR1cm47IH1cblxuICAvLyBzZXQgYSB0aW1lb3V0IHRvIGZpcmUgdGhlIGhvbGRyZXBlYXQgZXZlbnRcbiAgaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcG9pbnRlckV2ZW50cy5maXJlKHtcbiAgICAgIGludGVyYWN0aW9uLFxuICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICB0eXBlOiAnaG9sZCcsXG4gICAgICBwb2ludGVyOiBwb2ludGVyRXZlbnQsXG4gICAgICBldmVudDogcG9pbnRlckV2ZW50LFxuICAgIH0pO1xuICB9LCBpbnRlcnZhbCk7XG59XG5cbmZ1bmN0aW9uIGVuZEhvbGRSZXBlYXQgKHsgaW50ZXJhY3Rpb24gfSkge1xuICAvLyBzZXQgdGhlIGludGVyYWN0aW9uJ3MgaG9sZFN0b3BUaW1lIHByb3BlcnR5XG4gIC8vIHRvIHN0b3AgZnVydGhlciBob2xkUmVwZWF0IGV2ZW50c1xuICBpZiAoaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcmFjdGlvbi5ob2xkSW50ZXJ2YWxIYW5kbGUpO1xuICAgIGludGVyYWN0aW9uLmhvbGRJbnRlcnZhbEhhbmRsZSA9IG51bGw7XG4gIH1cbn1cblxuLy8gZG9uJ3QgcmVwZWF0IGJ5IGRlZmF1bHRcbnBvaW50ZXJFdmVudHMuZGVmYXVsdHMuaG9sZFJlcGVhdEludGVydmFsID0gMDtcbnBvaW50ZXJFdmVudHMudHlwZXMucHVzaCgnaG9sZHJlcGVhdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb25OZXcsXG4gIG9uRmlyZWQsXG4gIGVuZEhvbGRSZXBlYXQsXG59O1xuIiwiY29uc3QgUG9pbnRlckV2ZW50ID0gcmVxdWlyZSgnLi9Qb2ludGVyRXZlbnQnKTtcbmNvbnN0IEludGVyYWN0aW9uICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCB1dGlscyAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgZGVmYXVsdHMgICAgID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbmNvbnN0IHNpZ25hbHMgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxuY29uc3Qgc2ltcGxlU2lnbmFscyA9IFsgJ2Rvd24nLCAndXAnLCAnY2FuY2VsJyBdO1xuY29uc3Qgc2ltcGxlRXZlbnRzICA9IFsgJ2Rvd24nLCAndXAnLCAnY2FuY2VsJyBdO1xuXG5jb25zdCBwb2ludGVyRXZlbnRzID0ge1xuICBQb2ludGVyRXZlbnQsXG4gIGZpcmUsXG4gIGNvbGxlY3RFdmVudFRhcmdldHMsXG4gIHNpZ25hbHMsXG4gIGRlZmF1bHRzOiB7XG4gICAgaG9sZER1cmF0aW9uOiA2MDAsXG4gICAgaWdub3JlRnJvbSAgOiBudWxsLFxuICAgIGFsbG93RnJvbSAgIDogbnVsbCxcbiAgICBvcmlnaW4gICAgICA6IHsgeDogMCwgeTogMCB9LFxuICB9LFxuICB0eXBlczogW1xuICAgICdkb3duJyxcbiAgICAnbW92ZScsXG4gICAgJ3VwJyxcbiAgICAnY2FuY2VsJyxcbiAgICAndGFwJyxcbiAgICAnZG91YmxldGFwJyxcbiAgICAnaG9sZCcsXG4gIF0sXG59O1xuXG5mdW5jdGlvbiBmaXJlIChhcmcpIHtcbiAgY29uc3Qge1xuICAgIGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsXG4gICAgdHlwZSA9IGFyZy5wb2ludGVyRXZlbnQudHlwZSxcbiAgICB0YXJnZXRzID0gY29sbGVjdEV2ZW50VGFyZ2V0cyhhcmcpLFxuICAgIHBvaW50ZXJFdmVudCA9IG5ldyBQb2ludGVyRXZlbnQodHlwZSwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBpbnRlcmFjdGlvbiksXG4gIH0gPSBhcmc7XG5cbiAgY29uc3Qgc2lnbmFsQXJnID0ge1xuICAgIGludGVyYWN0aW9uLFxuICAgIHBvaW50ZXIsXG4gICAgZXZlbnQsXG4gICAgZXZlbnRUYXJnZXQsXG4gICAgdGFyZ2V0cyxcbiAgICB0eXBlLFxuICAgIHBvaW50ZXJFdmVudCxcbiAgfTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIGluIHRhcmdldC5wcm9wcyB8fCB7fSkge1xuICAgICAgcG9pbnRlckV2ZW50W3Byb3BdID0gdGFyZ2V0LnByb3BzW3Byb3BdO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbiA9IHV0aWxzLmdldE9yaWdpblhZKHRhcmdldC5ldmVudGFibGUsIHRhcmdldC5lbGVtZW50KTtcblxuICAgIHBvaW50ZXJFdmVudC5zdWJ0cmFjdE9yaWdpbihvcmlnaW4pO1xuICAgIHBvaW50ZXJFdmVudC5ldmVudGFibGUgPSB0YXJnZXQuZXZlbnRhYmxlO1xuICAgIHBvaW50ZXJFdmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0LmVsZW1lbnQ7XG5cbiAgICB0YXJnZXQuZXZlbnRhYmxlLmZpcmUocG9pbnRlckV2ZW50KTtcblxuICAgIHBvaW50ZXJFdmVudC5hZGRPcmlnaW4ob3JpZ2luKTtcblxuICAgIGlmIChwb2ludGVyRXZlbnQuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXG4gICAgICAgIHx8IChwb2ludGVyRXZlbnQucHJvcGFnYXRpb25TdG9wcGVkXG4gICAgICAgICAgICAmJiAoaSArIDEpIDwgdGFyZ2V0cy5sZW5ndGggJiYgdGFyZ2V0c1tpICsgMV0uZWxlbWVudCAhPT0gcG9pbnRlckV2ZW50LmN1cnJlbnRUYXJnZXQpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzaWduYWxzLmZpcmUoJ2ZpcmVkJywgc2lnbmFsQXJnKTtcblxuICBpZiAodHlwZSA9PT0gJ3RhcCcpIHtcbiAgICAvLyBpZiBwb2ludGVyRXZlbnQgc2hvdWxkIG1ha2UgYSBkb3VibGUgdGFwLCBjcmVhdGUgYW5kIGZpcmUgYSBkb3VibGV0YXBcbiAgICAvLyBQb2ludGVyRXZlbnQgYW5kIHVzZSB0aGF0IGFzIHRoZSBwcmV2VGFwXG4gICAgY29uc3QgcHJldlRhcCA9IHBvaW50ZXJFdmVudC5kb3VibGVcbiAgICAgID8gZmlyZSh7XG4gICAgICAgIGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsXG4gICAgICAgIHR5cGU6ICdkb3VibGV0YXAnLFxuICAgICAgfSlcbiAgICAgIDogcG9pbnRlckV2ZW50O1xuXG4gICAgaW50ZXJhY3Rpb24ucHJldlRhcCA9IHByZXZUYXA7XG4gICAgaW50ZXJhY3Rpb24udGFwVGltZSA9IHByZXZUYXAudGltZVN0YW1wO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50ZXJFdmVudDtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEV2ZW50VGFyZ2V0cyAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCB0eXBlIH0pIHtcbiAgY29uc3QgcG9pbnRlckluZGV4ID0gaW50ZXJhY3Rpb24uZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gIC8vIGRvIG5vdCBmaXJlIGEgdGFwIGV2ZW50IGlmIHRoZSBwb2ludGVyIHdhcyBtb3ZlZCBiZWZvcmUgYmVpbmcgbGlmdGVkXG4gIGlmICh0eXBlID09PSAndGFwJyAmJiAoaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkXG4gICAgICAvLyBvciBpZiB0aGUgcG9pbnRlcnVwIHRhcmdldCBpcyBkaWZmZXJlbnQgdG8gdGhlIHBvaW50ZXJkb3duIHRhcmdldFxuICAgICAgfHwgIShpbnRlcmFjdGlvbi5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdICYmIGludGVyYWN0aW9uLmRvd25UYXJnZXRzW3BvaW50ZXJJbmRleF0gPT09IGV2ZW50VGFyZ2V0KSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBwYXRoID0gdXRpbHMuZ2V0UGF0aChldmVudFRhcmdldCk7XG4gIGNvbnN0IHNpZ25hbEFyZyA9IHtcbiAgICBpbnRlcmFjdGlvbixcbiAgICBwb2ludGVyLFxuICAgIGV2ZW50LFxuICAgIGV2ZW50VGFyZ2V0LFxuICAgIHR5cGUsXG4gICAgcGF0aCxcbiAgICB0YXJnZXRzOiBbXSxcbiAgICBlbGVtZW50OiBudWxsLFxuICB9O1xuXG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBwYXRoKSB7XG4gICAgc2lnbmFsQXJnLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgc2lnbmFscy5maXJlKCdjb2xsZWN0LXRhcmdldHMnLCBzaWduYWxBcmcpO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdob2xkJykge1xuICAgIHNpZ25hbEFyZy50YXJnZXRzID0gc2lnbmFsQXJnLnRhcmdldHMuZmlsdGVyKHRhcmdldCA9PlxuICAgICAgdGFyZ2V0LmV2ZW50YWJsZS5vcHRpb25zLmhvbGREdXJhdGlvbiA9PT0gaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdLmR1cmF0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBzaWduYWxBcmcudGFyZ2V0cztcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbigndXBkYXRlLXBvaW50ZXItZG93bicsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVySW5kZXggfSkge1xuICBpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0gPSB7IGR1cmF0aW9uOiBJbmZpbml0eSwgdGltZW91dDogbnVsbCB9O1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3JlbW92ZS1wb2ludGVyJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXJJbmRleCB9KSB7XG4gIGludGVyYWN0aW9uLmhvbGRUaW1lcnMuc3BsaWNlKHBvaW50ZXJJbmRleCwgMSk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbW92ZScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGR1cGxpY2F0ZU1vdmUgfSkge1xuICBjb25zdCBwb2ludGVySW5kZXggPSBpbnRlcmFjdGlvbi5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgaWYgKCFkdXBsaWNhdGVNb3ZlICYmICghaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93biB8fCBpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQpKSB7XG4gICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24pIHtcbiAgICAgIGNsZWFyVGltZW91dChpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0udGltZW91dCk7XG4gICAgfVxuXG4gICAgZmlyZSh7XG4gICAgICBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LFxuICAgICAgdHlwZTogJ21vdmUnLFxuICAgIH0pO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignZG93bicsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIHBvaW50ZXJJbmRleCB9KSB7XG4gIGNvbnN0IHRpbWVyID0gaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdO1xuICBjb25zdCBwYXRoID0gdXRpbHMuZ2V0UGF0aChldmVudFRhcmdldCk7XG4gIGNvbnN0IHNpZ25hbEFyZyA9IHtcbiAgICBpbnRlcmFjdGlvbixcbiAgICBwb2ludGVyLFxuICAgIGV2ZW50LFxuICAgIGV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6ICdob2xkJyxcbiAgICB0YXJnZXRzOiBbXSxcbiAgICBwYXRoLFxuICAgIGVsZW1lbnQ6IG51bGwsXG4gIH07XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBhdGgpIHtcbiAgICBzaWduYWxBcmcuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2NvbGxlY3QtdGFyZ2V0cycsIHNpZ25hbEFyZyk7XG4gIH1cblxuICBpZiAoIXNpZ25hbEFyZy50YXJnZXRzLmxlbmd0aCkgeyByZXR1cm47IH1cblxuICBsZXQgbWluRHVyYXRpb24gPSBJbmZpbml0eTtcblxuICBmb3IgKGNvbnN0IHRhcmdldCBvZiBzaWduYWxBcmcudGFyZ2V0cykge1xuICAgIGNvbnN0IGhvbGREdXJhdGlvbiA9IHRhcmdldC5ldmVudGFibGUub3B0aW9ucy5ob2xkRHVyYXRpb247XG5cbiAgICBpZiAoaG9sZER1cmF0aW9uIDwgbWluRHVyYXRpb24pIHtcbiAgICAgIG1pbkR1cmF0aW9uID0gaG9sZER1cmF0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRpbWVyLmR1cmF0aW9uID0gbWluRHVyYXRpb247XG4gIHRpbWVyLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBmaXJlKHtcbiAgICAgIGludGVyYWN0aW9uLFxuICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICBwb2ludGVyLFxuICAgICAgZXZlbnQsXG4gICAgICB0eXBlOiAnaG9sZCcsXG4gICAgfSk7XG4gIH0sIG1pbkR1cmF0aW9uKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCd1cCcsICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQgfSkgPT4ge1xuICBpZiAoIWludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCkge1xuICAgIGZpcmUoeyBpbnRlcmFjdGlvbiwgZXZlbnRUYXJnZXQsIHBvaW50ZXIsIGV2ZW50LCB0eXBlOiAndGFwJyB9KTtcbiAgfVxufSk7XG5cbmZvciAoY29uc3Qgc2lnbmFsTmFtZSBvZiBbJ3VwJywgJ2NhbmNlbCddKSB7XG4gIEludGVyYWN0aW9uLnNpZ25hbHMub24oc2lnbmFsTmFtZSwgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXJJbmRleCB9KSB7XG4gICAgaWYgKGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XSkge1xuICAgICAgY2xlYXJUaW1lb3V0KGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XS50aW1lb3V0KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaWduYWxMaXN0ZW5lciAodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCB9KSB7XG4gICAgZmlyZSh7IGludGVyYWN0aW9uLCBldmVudFRhcmdldCwgcG9pbnRlciwgZXZlbnQsIHR5cGUgfSk7XG4gIH07XG59XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgc2ltcGxlU2lnbmFscy5sZW5ndGg7IGkrKykge1xuICBJbnRlcmFjdGlvbi5zaWduYWxzLm9uKHNpbXBsZVNpZ25hbHNbaV0sIGNyZWF0ZVNpZ25hbExpc3RlbmVyKHNpbXBsZUV2ZW50c1tpXSkpO1xufVxuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24ucHJldlRhcCAgICA9IG51bGw7ICAvLyB0aGUgbW9zdCByZWNlbnQgdGFwIGV2ZW50IG9uIHRoaXMgaW50ZXJhY3Rpb25cbiAgaW50ZXJhY3Rpb24udGFwVGltZSAgICA9IDA7ICAgICAvLyB0aW1lIG9mIHRoZSBtb3N0IHJlY2VudCB0YXAgZXZlbnRcbiAgaW50ZXJhY3Rpb24uaG9sZFRpbWVycyA9IFtdOyAgICAvLyBbeyBkdXJhdGlvbiwgdGltZW91dCB9XVxufSk7XG5cbmRlZmF1bHRzLnBvaW50ZXJFdmVudHMgPSBwb2ludGVyRXZlbnRzLmRlZmF1bHRzO1xubW9kdWxlLmV4cG9ydHMgPSBwb2ludGVyRXZlbnRzO1xuIiwiY29uc3QgcG9pbnRlclV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvcG9pbnRlclV0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUG9pbnRlckV2ZW50IHtcbiAgLyoqICovXG4gIGNvbnN0cnVjdG9yICh0eXBlLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGludGVyYWN0aW9uKSB7XG4gICAgcG9pbnRlclV0aWxzLnBvaW50ZXJFeHRlbmQodGhpcywgZXZlbnQpO1xuXG4gICAgaWYgKGV2ZW50ICE9PSBwb2ludGVyKSB7XG4gICAgICBwb2ludGVyVXRpbHMucG9pbnRlckV4dGVuZCh0aGlzLCBwb2ludGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XG5cbiAgICB0aGlzLnRpbWVTdGFtcCAgICAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgICB0aGlzLnR5cGUgICAgICAgICAgPSB0eXBlO1xuICAgIHRoaXMucG9pbnRlcklkICAgICA9IHBvaW50ZXJVdGlscy5nZXRQb2ludGVySWQocG9pbnRlcik7XG4gICAgdGhpcy5wb2ludGVyVHlwZSAgID0gcG9pbnRlclV0aWxzLmdldFBvaW50ZXJUeXBlKHBvaW50ZXIpO1xuICAgIHRoaXMudGFyZ2V0ICAgICAgICA9IGV2ZW50VGFyZ2V0O1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3RhcCcpIHtcbiAgICAgIGNvbnN0IHBvaW50ZXJJbmRleCA9IGludGVyYWN0aW9uLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcbiAgICAgIHRoaXMuZHQgPSB0aGlzLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLmRvd25UaW1lc1twb2ludGVySW5kZXhdO1xuXG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24udGFwVGltZTtcblxuICAgICAgdGhpcy5kb3VibGUgPSAhIShpbnRlcmFjdGlvbi5wcmV2VGFwXG4gICAgICAgICYmIGludGVyYWN0aW9uLnByZXZUYXAudHlwZSAhPT0gJ2RvdWJsZXRhcCdcbiAgICAgICAgJiYgaW50ZXJhY3Rpb24ucHJldlRhcC50YXJnZXQgPT09IHRoaXMudGFyZ2V0XG4gICAgICAgICYmIGludGVydmFsIDwgNTAwKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ2RvdWJsZXRhcCcpIHtcbiAgICAgIHRoaXMuZHQgPSBwb2ludGVyLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnRhcFRpbWU7XG4gICAgfVxuICB9XG5cbiAgc3VidHJhY3RPcmlnaW4gKHsgeDogb3JpZ2luWCwgeTogb3JpZ2luWSB9KSB7XG4gICAgdGhpcy5wYWdlWCAgIC09IG9yaWdpblg7XG4gICAgdGhpcy5wYWdlWSAgIC09IG9yaWdpblk7XG4gICAgdGhpcy5jbGllbnRYIC09IG9yaWdpblg7XG4gICAgdGhpcy5jbGllbnRZIC09IG9yaWdpblk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZE9yaWdpbiAoeyB4OiBvcmlnaW5YLCB5OiBvcmlnaW5ZIH0pIHtcbiAgICB0aGlzLnBhZ2VYICAgKz0gb3JpZ2luWDtcbiAgICB0aGlzLnBhZ2VZICAgKz0gb3JpZ2luWTtcbiAgICB0aGlzLmNsaWVudFggKz0gb3JpZ2luWDtcbiAgICB0aGlzLmNsaWVudFkgKz0gb3JpZ2luWTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqICovXG4gIHByZXZlbnREZWZhdWx0ICgpIHtcbiAgICB0aGlzLm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiAqL1xuICBzdG9wUHJvcGFnYXRpb24gKCkge1xuICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiAqL1xuICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKCkge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICB9XG59O1xuIiwiLy8gVGhpcyBtb2R1bGUgYWxsb3dzIHNuYXBwaW5nIG9mIHRoZSBzaXplIG9mIHRhcmdldHMgZHVyaW5nIHJlc2l6ZVxuLy8gaW50ZXJhY3Rpb25zLlxuXG5jb25zdCBtb2RpZmllcnMgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3Qgc25hcCAgICAgICAgICAgPSByZXF1aXJlKCcuL3NuYXAnKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbmNvbnN0IHJlc2l6ZSAgICAgICAgID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9yZXNpemUnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvJyk7XG5cbmNvbnN0IHNuYXBTaXplID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVuZE9ubHk6IGZhbHNlLFxuICAgIHJhbmdlICA6IEluZmluaXR5LFxuICAgIHRhcmdldHM6IG51bGwsXG4gICAgb2Zmc2V0czogbnVsbCxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBjb25zdCB7IGludGVyYWN0aW9uLCBvcHRpb25zIH0gPSBhcmc7XG4gICAgY29uc3QgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcztcblxuICAgIGlmICghZWRnZXMpIHsgcmV0dXJuOyB9XG5cbiAgICBhcmcub3B0aW9ucyA9IHtcbiAgICAgIHJlbGF0aXZlUG9pbnRzOiBbe1xuICAgICAgICB4OiBlZGdlcy5sZWZ0PyAwIDogMSxcbiAgICAgICAgeTogZWRnZXMudG9wID8gMCA6IDEsXG4gICAgICB9XSxcbiAgICAgIG9yaWdpbjogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBvZmZzZXQ6ICdzZWxmJyxcbiAgICAgIHJhbmdlOiBvcHRpb25zLnJhbmdlLFxuICAgIH07XG5cbiAgICBjb25zdCBvZmZzZXRzID0gc25hcC5zZXRPZmZzZXQoYXJnKTtcbiAgICBhcmcub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICByZXR1cm4gb2Zmc2V0cztcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBjb25zdCB7IGludGVyYWN0aW9uLCBvcHRpb25zLCBvZmZzZXQsIG1vZGlmaWVkQ29vcmRzIH0gPSBhcmc7XG4gICAgY29uc3QgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgbW9kaWZpZWRDb29yZHMpO1xuICAgIGNvbnN0IHJlbGF0aXZlWCA9IHBhZ2UueCAtIG9mZnNldFswXS54O1xuICAgIGNvbnN0IHJlbGF0aXZlWSA9IHBhZ2UueSAtIG9mZnNldFswXS55O1xuXG4gICAgYXJnLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgIGFyZy5vcHRpb25zLnRhcmdldHMgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc25hcFRhcmdldCBvZiAob3B0aW9ucy50YXJnZXRzIHx8IFtdKSkge1xuICAgICAgbGV0IHRhcmdldDtcblxuICAgICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKHNuYXBUYXJnZXQpKSB7XG4gICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQocmVsYXRpdmVYLCByZWxhdGl2ZVksIGludGVyYWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0O1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRhcmdldCkgeyBjb250aW51ZTsgfVxuXG4gICAgICBpZiAoJ3dpZHRoJyBpbiB0YXJnZXQgJiYgJ2hlaWdodCcgaW4gdGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC54ID0gdGFyZ2V0LndpZHRoO1xuICAgICAgICB0YXJnZXQueSA9IHRhcmdldC5oZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGFyZy5vcHRpb25zLnRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgIH1cblxuICAgIHNuYXAuc2V0KGFyZyk7XG4gIH0sXG5cbiAgbW9kaWZ5Q29vcmRzOiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSBhcmc7XG5cbiAgICBhcmcub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgYXJnLm9wdGlvbnMuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZDtcbiAgICBhcmcub3B0aW9ucy5yZWxhdGl2ZVBvaW50cyA9IFtudWxsXTtcblxuICAgIHNuYXAubW9kaWZ5Q29vcmRzKGFyZyk7XG4gIH0sXG59O1xuXG5tb2RpZmllcnMuc25hcFNpemUgPSBzbmFwU2l6ZTtcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdzbmFwU2l6ZScpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24uc25hcFNpemUgPSBzbmFwU2l6ZS5kZWZhdWx0cztcbnJlc2l6ZS5kZWZhdWx0cy5zbmFwU2l6ZSAgICAgICAgICA9IHNuYXBTaXplLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNuYXBTaXplO1xuIiwiY29uc3QgbW9kaWZpZXJzICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IGludGVyYWN0ICAgICAgID0gcmVxdWlyZSgnLi4vaW50ZXJhY3QnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxuY29uc3Qgc25hcCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlbmRPbmx5OiBmYWxzZSxcbiAgICByYW5nZSAgOiBJbmZpbml0eSxcbiAgICB0YXJnZXRzOiBudWxsLFxuICAgIG9mZnNldHM6IG51bGwsXG5cbiAgICByZWxhdGl2ZVBvaW50czogbnVsbCxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIHJlY3QsIHN0YXJ0T2Zmc2V0LCBvcHRpb25zIH0pIHtcbiAgICBjb25zdCBvZmZzZXRzID0gW107XG4gICAgY29uc3Qgb3B0aW9uc09yaWdpbiA9IHV0aWxzLnJlY3RUb1hZKHV0aWxzLnJlc29sdmVSZWN0TGlrZShvcHRpb25zLm9yaWdpbikpO1xuICAgIGNvbnN0IG9yaWdpbiA9IG9wdGlvbnNPcmlnaW4gfHwgdXRpbHMuZ2V0T3JpZ2luWFkoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKTtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCBpbnRlcmFjdGFibGUub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5zbmFwIHx8IHt9O1xuXG4gICAgbGV0IHNuYXBPZmZzZXQ7XG5cbiAgICBpZiAob3B0aW9ucy5vZmZzZXQgPT09ICdzdGFydENvb3JkcycpIHtcbiAgICAgIHNuYXBPZmZzZXQgPSB7XG4gICAgICAgIHg6IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueCAtIG9yaWdpbi54LFxuICAgICAgICB5OiBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnkgLSBvcmlnaW4ueSxcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgIHtcbiAgICAgIGNvbnN0IG9mZnNldFJlY3QgPSB1dGlscy5yZXNvbHZlUmVjdExpa2Uob3B0aW9ucy5vZmZzZXQsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgW2ludGVyYWN0aW9uXSk7XG5cbiAgICAgIHNuYXBPZmZzZXQgPSB1dGlscy5yZWN0VG9YWShvZmZzZXRSZWN0KSB8fCB7IHg6IDAsIHk6IDAgfTtcbiAgICB9XG5cbiAgICBpZiAocmVjdCAmJiBvcHRpb25zLnJlbGF0aXZlUG9pbnRzICYmIG9wdGlvbnMucmVsYXRpdmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IHsgeDogcmVsYXRpdmVYLCB5OiByZWxhdGl2ZVkgfSBvZiBvcHRpb25zLnJlbGF0aXZlUG9pbnRzKSB7XG4gICAgICAgIG9mZnNldHMucHVzaCh7XG4gICAgICAgICAgeDogc3RhcnRPZmZzZXQubGVmdCAtIChyZWN0LndpZHRoICAqIHJlbGF0aXZlWCkgKyBzbmFwT2Zmc2V0LngsXG4gICAgICAgICAgeTogc3RhcnRPZmZzZXQudG9wICAtIChyZWN0LmhlaWdodCAqIHJlbGF0aXZlWSkgKyBzbmFwT2Zmc2V0LnksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9mZnNldHMucHVzaChzbmFwT2Zmc2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0cztcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBtb2RpZmllZENvb3Jkcywgc3RhdHVzLCBvcHRpb25zLCBvZmZzZXQ6IG9mZnNldHMgfSkge1xuICAgIGNvbnN0IHRhcmdldHMgPSBbXTtcbiAgICBsZXQgdGFyZ2V0O1xuICAgIGxldCBwYWdlO1xuICAgIGxldCBpO1xuXG4gICAgaWYgKHN0YXR1cy51c2VTdGF0dXNYWSkge1xuICAgICAgcGFnZSA9IHsgeDogc3RhdHVzLngsIHk6IHN0YXR1cy55IH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qgb3JpZ2luID0gdXRpbHMuZ2V0T3JpZ2luWFkoaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKTtcblxuICAgICAgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgbW9kaWZpZWRDb29yZHMpO1xuXG4gICAgICBwYWdlLnggLT0gb3JpZ2luLng7XG4gICAgICBwYWdlLnkgLT0gb3JpZ2luLnk7XG4gICAgfVxuXG4gICAgc3RhdHVzLnJlYWxYID0gcGFnZS54O1xuICAgIHN0YXR1cy5yZWFsWSA9IHBhZ2UueTtcblxuICAgIGxldCBsZW4gPSBvcHRpb25zLnRhcmdldHM/IG9wdGlvbnMudGFyZ2V0cy5sZW5ndGggOiAwO1xuXG4gICAgZm9yIChjb25zdCB7IHg6IG9mZnNldFgsIHk6IG9mZnNldFkgfSBvZiBvZmZzZXRzKSB7XG4gICAgICBjb25zdCByZWxhdGl2ZVggPSBwYWdlLnggLSBvZmZzZXRYO1xuICAgICAgY29uc3QgcmVsYXRpdmVZID0gcGFnZS55IC0gb2Zmc2V0WTtcblxuICAgICAgZm9yIChjb25zdCBzbmFwVGFyZ2V0IG9mIChvcHRpb25zLnRhcmdldHMgfHwgW10pKSB7XG4gICAgICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihzbmFwVGFyZ2V0KSkge1xuICAgICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQocmVsYXRpdmVYLCByZWxhdGl2ZVksIGludGVyYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0YXJnZXQpIHsgY29udGludWU7IH1cblxuICAgICAgICB0YXJnZXRzLnB1c2goe1xuICAgICAgICAgIHg6IHV0aWxzLmlzLm51bWJlcih0YXJnZXQueCkgPyAodGFyZ2V0LnggKyBvZmZzZXRYKSA6IHJlbGF0aXZlWCxcbiAgICAgICAgICB5OiB1dGlscy5pcy5udW1iZXIodGFyZ2V0LnkpID8gKHRhcmdldC55ICsgb2Zmc2V0WSkgOiByZWxhdGl2ZVksXG5cbiAgICAgICAgICByYW5nZTogdXRpbHMuaXMubnVtYmVyKHRhcmdldC5yYW5nZSk/IHRhcmdldC5yYW5nZTogb3B0aW9ucy5yYW5nZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VzdCA9IHtcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIGluUmFuZ2U6IGZhbHNlLFxuICAgICAgZGlzdGFuY2U6IDAsXG4gICAgICByYW5nZTogMCxcbiAgICAgIGR4OiAwLFxuICAgICAgZHk6IDAsXG4gICAgfTtcblxuICAgIGZvciAoaSA9IDAsIGxlbiA9IHRhcmdldHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldHNbaV07XG5cbiAgICAgIGNvbnN0IHJhbmdlID0gdGFyZ2V0LnJhbmdlO1xuICAgICAgY29uc3QgZHggPSB0YXJnZXQueCAtIHBhZ2UueDtcbiAgICAgIGNvbnN0IGR5ID0gdGFyZ2V0LnkgLSBwYWdlLnk7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHV0aWxzLmh5cG90KGR4LCBkeSk7XG4gICAgICBsZXQgaW5SYW5nZSA9IGRpc3RhbmNlIDw9IHJhbmdlO1xuXG4gICAgICAvLyBJbmZpbml0ZSB0YXJnZXRzIGNvdW50IGFzIGJlaW5nIG91dCBvZiByYW5nZVxuICAgICAgLy8gY29tcGFyZWQgdG8gbm9uIGluZmluaXRlIG9uZXMgdGhhdCBhcmUgaW4gcmFuZ2VcbiAgICAgIGlmIChyYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5pblJhbmdlICYmIGNsb3Nlc3QucmFuZ2UgIT09IEluZmluaXR5KSB7XG4gICAgICAgIGluUmFuZ2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjbG9zZXN0LnRhcmdldCB8fCAoaW5SYW5nZVxuICAgICAgICAgIC8vIGlzIHRoZSBjbG9zZXN0IHRhcmdldCBpbiByYW5nZT9cbiAgICAgICAgICA/IChjbG9zZXN0LmluUmFuZ2UgJiYgcmFuZ2UgIT09IEluZmluaXR5XG4gICAgICAgICAgLy8gdGhlIHBvaW50ZXIgaXMgcmVsYXRpdmVseSBkZWVwZXIgaW4gdGhpcyB0YXJnZXRcbiAgICAgICAgICA/IGRpc3RhbmNlIC8gcmFuZ2UgPCBjbG9zZXN0LmRpc3RhbmNlIC8gY2xvc2VzdC5yYW5nZVxuICAgICAgICAgIC8vIHRoaXMgdGFyZ2V0IGhhcyBJbmZpbml0ZSByYW5nZSBhbmQgdGhlIGNsb3Nlc3QgZG9lc24ndFxuICAgICAgICAgIDogKHJhbmdlID09PSBJbmZpbml0eSAmJiBjbG9zZXN0LnJhbmdlICE9PSBJbmZpbml0eSlcbiAgICAgICAgICAvLyBPUiB0aGlzIHRhcmdldCBpcyBjbG9zZXIgdGhhdCB0aGUgcHJldmlvdXMgY2xvc2VzdFxuICAgICAgICB8fCBkaXN0YW5jZSA8IGNsb3Nlc3QuZGlzdGFuY2UpXG4gICAgICAgICAgLy8gVGhlIG90aGVyIGlzIG5vdCBpbiByYW5nZSBhbmQgdGhlIHBvaW50ZXIgaXMgY2xvc2VyIHRvIHRoaXMgdGFyZ2V0XG4gICAgICAgICAgOiAoIWNsb3Nlc3QuaW5SYW5nZSAmJiBkaXN0YW5jZSA8IGNsb3Nlc3QuZGlzdGFuY2UpKSkge1xuXG4gICAgICAgIGNsb3Nlc3QudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBjbG9zZXN0LmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgIGNsb3Nlc3QucmFuZ2UgPSByYW5nZTtcbiAgICAgICAgY2xvc2VzdC5pblJhbmdlID0gaW5SYW5nZTtcbiAgICAgICAgY2xvc2VzdC5keCA9IGR4O1xuICAgICAgICBjbG9zZXN0LmR5ID0gZHk7XG5cbiAgICAgICAgc3RhdHVzLnJhbmdlID0gcmFuZ2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHNuYXBDaGFuZ2VkO1xuXG4gICAgaWYgKGNsb3Nlc3QudGFyZ2V0KSB7XG4gICAgICBzbmFwQ2hhbmdlZCA9IChzdGF0dXMubW9kaWZpZWRYICE9PSBjbG9zZXN0LnRhcmdldC54IHx8IHN0YXR1cy5tb2RpZmllZFkgIT09IGNsb3Nlc3QudGFyZ2V0LnkpO1xuXG4gICAgICBzdGF0dXMubW9kaWZpZWRYID0gY2xvc2VzdC50YXJnZXQueDtcbiAgICAgIHN0YXR1cy5tb2RpZmllZFkgPSBjbG9zZXN0LnRhcmdldC55O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNuYXBDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgc3RhdHVzLm1vZGlmaWVkWCA9IE5hTjtcbiAgICAgIHN0YXR1cy5tb2RpZmllZFkgPSBOYU47XG4gICAgfVxuXG4gICAgc3RhdHVzLmR4ID0gY2xvc2VzdC5keDtcbiAgICBzdGF0dXMuZHkgPSBjbG9zZXN0LmR5O1xuXG4gICAgc3RhdHVzLmNoYW5nZWQgPSAoc25hcENoYW5nZWQgfHwgKGNsb3Nlc3QuaW5SYW5nZSAmJiAhc3RhdHVzLmxvY2tlZCkpO1xuICAgIHN0YXR1cy5sb2NrZWQgPSBjbG9zZXN0LmluUmFuZ2U7XG4gIH0sXG5cbiAgbW9kaWZ5Q29vcmRzOiBmdW5jdGlvbiAoeyBwYWdlLCBjbGllbnQsIHN0YXR1cywgcGhhc2UsIG9wdGlvbnMgfSkge1xuICAgIGNvbnN0IHJlbGF0aXZlUG9pbnRzID0gb3B0aW9ucyAmJiBvcHRpb25zLnJlbGF0aXZlUG9pbnRzO1xuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVkXG4gICAgICAgICYmICEocGhhc2UgPT09ICdzdGFydCcgJiYgcmVsYXRpdmVQb2ludHMgJiYgcmVsYXRpdmVQb2ludHMubGVuZ3RoKSkge1xuXG4gICAgICBpZiAoc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBwYWdlLnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBwYWdlLnkgKz0gc3RhdHVzLmR5O1xuICAgICAgICBjbGllbnQueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIGNsaWVudC55ICs9IHN0YXR1cy5keTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2UgIDogc3RhdHVzLnJhbmdlLFxuICAgICAgICBsb2NrZWQgOiBzdGF0dXMubG9ja2VkLFxuICAgICAgICB4ICAgICAgOiBzdGF0dXMubW9kaWZpZWRYLFxuICAgICAgICB5ICAgICAgOiBzdGF0dXMubW9kaWZpZWRZLFxuICAgICAgICByZWFsWCAgOiBzdGF0dXMucmVhbFgsXG4gICAgICAgIHJlYWxZICA6IHN0YXR1cy5yZWFsWSxcbiAgICAgICAgZHggICAgIDogc3RhdHVzLmR4LFxuICAgICAgICBkeSAgICAgOiBzdGF0dXMuZHksXG4gICAgICB9O1xuICAgIH1cbiAgfSxcbn07XG5cbmludGVyYWN0LmNyZWF0ZVNuYXBHcmlkID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgY29uc3QgbGltaXRzID0gZ3JpZC5saW1pdHMgfHwge1xuICAgICAgbGVmdCAgOiAtSW5maW5pdHksXG4gICAgICByaWdodCA6ICBJbmZpbml0eSxcbiAgICAgIHRvcCAgIDogLUluZmluaXR5LFxuICAgICAgYm90dG9tOiAgSW5maW5pdHksXG4gICAgfTtcbiAgICBsZXQgb2Zmc2V0WCA9IDA7XG4gICAgbGV0IG9mZnNldFkgPSAwO1xuXG4gICAgaWYgKHV0aWxzLmlzLm9iamVjdChncmlkLm9mZnNldCkpIHtcbiAgICAgIG9mZnNldFggPSBncmlkLm9mZnNldC54O1xuICAgICAgb2Zmc2V0WSA9IGdyaWQub2Zmc2V0Lnk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JpZHggPSBNYXRoLnJvdW5kKCh4IC0gb2Zmc2V0WCkgLyBncmlkLngpO1xuICAgIGNvbnN0IGdyaWR5ID0gTWF0aC5yb3VuZCgoeSAtIG9mZnNldFkpIC8gZ3JpZC55KTtcblxuICAgIGNvbnN0IG5ld1ggPSBNYXRoLm1heChsaW1pdHMubGVmdCwgTWF0aC5taW4obGltaXRzLnJpZ2h0ICwgZ3JpZHggKiBncmlkLnggKyBvZmZzZXRYKSk7XG4gICAgY29uc3QgbmV3WSA9IE1hdGgubWF4KGxpbWl0cy50b3AgLCBNYXRoLm1pbihsaW1pdHMuYm90dG9tLCBncmlkeSAqIGdyaWQueSArIG9mZnNldFkpKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBuZXdYLFxuICAgICAgeTogbmV3WSxcbiAgICAgIHJhbmdlOiBncmlkLnJhbmdlLFxuICAgIH07XG4gIH07XG59O1xuXG5tb2RpZmllcnMuc25hcCA9IHNuYXA7XG5tb2RpZmllcnMubmFtZXMucHVzaCgnc25hcCcpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24uc25hcCA9IHNuYXAuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gc25hcDtcbiIsIi8vIFRoaXMgbW9kdWxlIGFkZHMgdGhlIG9wdGlvbnMucmVzaXplLnJlc3RyaWN0U2l6ZSBzZXR0aW5nIHdoaWNoIHNldHMgbWluIGFuZFxuLy8gbWF4IHdpZHRoIGFuZCBoZWlnaHQgZm9yIHRoZSB0YXJnZXQgYmVpbmcgcmVzaXplZC5cbi8vXG4vLyBpbnRlcmFjdCh0YXJnZXQpLnJlc2l6ZSh7XG4vLyAgIGVkZ2VzOiB7IHRvcDogdHJ1ZSwgbGVmdDogdHJ1ZSB9LFxuLy8gICByZXN0cmljdFNpemU6IHtcbi8vICAgICBtaW46IHsgd2lkdGg6IC02MDAsIGhlaWdodDogLTYwMCB9LFxuLy8gICAgIG1heDogeyB3aWR0aDogIDYwMCwgaGVpZ2h0OiAgNjAwIH0sXG4vLyAgIH0sXG4vLyB9KTtcblxuY29uc3QgbW9kaWZpZXJzICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHJlc3RyaWN0RWRnZXMgID0gcmVxdWlyZSgnLi9yZXN0cmljdEVkZ2VzJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCByZWN0VXRpbHMgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL3JlY3QnKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbmNvbnN0IHJlc2l6ZSAgICAgICAgID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9yZXNpemUnKTtcblxuY29uc3Qgbm9NaW4gPSB7IHdpZHRoOiAtSW5maW5pdHksIGhlaWdodDogLUluZmluaXR5IH07XG5jb25zdCBub01heCA9IHsgd2lkdGg6ICtJbmZpbml0eSwgaGVpZ2h0OiArSW5maW5pdHkgfTtcblxuY29uc3QgcmVzdHJpY3RTaXplID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVuZE9ubHk6IGZhbHNlLFxuICAgIG1pbjogbnVsbCxcbiAgICBtYXg6IG51bGwsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gICAgcmV0dXJuIGludGVyYWN0aW9uLnN0YXJ0T2Zmc2V0O1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IHsgaW50ZXJhY3Rpb24sIG9wdGlvbnMgfSA9IGFyZztcbiAgICBjb25zdCBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmxpbmtlZEVkZ2VzIHx8IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpIHx8ICFlZGdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlY3QgPSByZWN0VXRpbHMueHl3aFRvVGxicihpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5pbnZlcnRlZCk7XG5cbiAgICBjb25zdCBtaW5TaXplID0gcmVjdFV0aWxzLnRsYnJUb1h5d2gocmVzdHJpY3RFZGdlcy5nZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5taW4sIGludGVyYWN0aW9uKSkgfHwgbm9NaW47XG4gICAgY29uc3QgbWF4U2l6ZSA9IHJlY3RVdGlscy50bGJyVG9YeXdoKHJlc3RyaWN0RWRnZXMuZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMubWF4LCBpbnRlcmFjdGlvbikpIHx8IG5vTWF4O1xuXG4gICAgYXJnLm9wdGlvbnMgPSB7XG4gICAgICBlbmFibGVkOiBvcHRpb25zLmVuYWJsZWQsXG4gICAgICBlbmRPbmx5OiBvcHRpb25zLmVuZE9ubHksXG4gICAgICBpbm5lcjogdXRpbHMuZXh0ZW5kKHt9LCByZXN0cmljdEVkZ2VzLm5vSW5uZXIpLFxuICAgICAgb3V0ZXI6IHV0aWxzLmV4dGVuZCh7fSwgcmVzdHJpY3RFZGdlcy5ub091dGVyKSxcbiAgICB9O1xuXG4gICAgaWYgKGVkZ2VzLnRvcCkge1xuICAgICAgYXJnLm9wdGlvbnMuaW5uZXIudG9wID0gcmVjdC5ib3R0b20gLSBtaW5TaXplLmhlaWdodDtcbiAgICAgIGFyZy5vcHRpb25zLm91dGVyLnRvcCA9IHJlY3QuYm90dG9tIC0gbWF4U2l6ZS5oZWlnaHQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVkZ2VzLmJvdHRvbSkge1xuICAgICAgYXJnLm9wdGlvbnMuaW5uZXIuYm90dG9tID0gcmVjdC50b3AgKyBtaW5TaXplLmhlaWdodDtcbiAgICAgIGFyZy5vcHRpb25zLm91dGVyLmJvdHRvbSA9IHJlY3QudG9wICsgbWF4U2l6ZS5oZWlnaHQ7XG4gICAgfVxuICAgIGlmIChlZGdlcy5sZWZ0KSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci5sZWZ0ID0gcmVjdC5yaWdodCAtIG1pblNpemUud2lkdGg7XG4gICAgICBhcmcub3B0aW9ucy5vdXRlci5sZWZ0ID0gcmVjdC5yaWdodCAtIG1heFNpemUud2lkdGg7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVkZ2VzLnJpZ2h0KSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci5yaWdodCA9IHJlY3QubGVmdCArIG1pblNpemUud2lkdGg7XG4gICAgICBhcmcub3B0aW9ucy5vdXRlci5yaWdodCA9IHJlY3QubGVmdCArIG1heFNpemUud2lkdGg7XG4gICAgfVxuXG4gICAgcmVzdHJpY3RFZGdlcy5zZXQoYXJnKTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IHJlc3RyaWN0RWRnZXMubW9kaWZ5Q29vcmRzLFxufTtcblxubW9kaWZpZXJzLnJlc3RyaWN0U2l6ZSA9IHJlc3RyaWN0U2l6ZTtcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdyZXN0cmljdFNpemUnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnJlc3RyaWN0U2l6ZSA9IHJlc3RyaWN0U2l6ZS5kZWZhdWx0cztcbnJlc2l6ZS5kZWZhdWx0cy5yZXN0cmljdFNpemUgICAgICAgICAgPSByZXN0cmljdFNpemUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdHJpY3RTaXplO1xuIiwiLy8gVGhpcyBtb2R1bGUgYWRkcyB0aGUgb3B0aW9ucy5yZXNpemUucmVzdHJpY3RFZGdlcyBzZXR0aW5nIHdoaWNoIHNldHMgbWluIGFuZFxuLy8gbWF4IGZvciB0aGUgdG9wLCBsZWZ0LCBib3R0b20gYW5kIHJpZ2h0IGVkZ2VzIG9mIHRoZSB0YXJnZXQgYmVpbmcgcmVzaXplZC5cbi8vXG4vLyBpbnRlcmFjdCh0YXJnZXQpLnJlc2l6ZSh7XG4vLyAgIGVkZ2VzOiB7IHRvcDogdHJ1ZSwgbGVmdDogdHJ1ZSB9LFxuLy8gICByZXN0cmljdEVkZ2VzOiB7XG4vLyAgICAgaW5uZXI6IHsgdG9wOiAyMDAsIGxlZnQ6IDIwMCwgcmlnaHQ6IDQwMCwgYm90dG9tOiA0MDAgfSxcbi8vICAgICBvdXRlcjogeyB0b3A6ICAgMCwgbGVmdDogICAwLCByaWdodDogNjAwLCBib3R0b206IDYwMCB9LFxuLy8gICB9LFxuLy8gfSk7XG5cbmNvbnN0IG1vZGlmaWVycyAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCByZWN0VXRpbHMgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL3JlY3QnKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbmNvbnN0IHJlc2l6ZSAgICAgICAgID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9yZXNpemUnKTtcblxuY29uc3QgeyBnZXRSZXN0cmljdGlvblJlY3QgfSA9IHJlcXVpcmUoJy4vcmVzdHJpY3QnKTtcblxuY29uc3Qgbm9Jbm5lciA9IHsgdG9wOiArSW5maW5pdHksIGxlZnQ6ICtJbmZpbml0eSwgYm90dG9tOiAtSW5maW5pdHksIHJpZ2h0OiAtSW5maW5pdHkgfTtcbmNvbnN0IG5vT3V0ZXIgPSB7IHRvcDogLUluZmluaXR5LCBsZWZ0OiAtSW5maW5pdHksIGJvdHRvbTogK0luZmluaXR5LCByaWdodDogK0luZmluaXR5IH07XG5cbmNvbnN0IHJlc3RyaWN0RWRnZXMgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgbWluOiBudWxsLFxuICAgIG1heDogbnVsbCxcbiAgICBvZmZzZXQ6IG51bGwsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgc3RhcnRPZmZzZXQsIG9wdGlvbnMgfSkge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHV0aWxzLmV4dGVuZCh7fSwgc3RhcnRPZmZzZXQpO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZnNldCA9IGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLm9mZnNldCwgaW50ZXJhY3Rpb24sIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UpO1xuXG4gICAgaWYgKG9mZnNldCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiAgICBzdGFydE9mZnNldC50b3AgICAgKyBvZmZzZXQueSxcbiAgICAgICAgbGVmdDogICBzdGFydE9mZnNldC5sZWZ0ICAgKyBvZmZzZXQueCxcbiAgICAgICAgYm90dG9tOiBzdGFydE9mZnNldC5ib3R0b20gKyBvZmZzZXQueSxcbiAgICAgICAgcmlnaHQ6ICBzdGFydE9mZnNldC5yaWdodCAgKyBvZmZzZXQueCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0T2Zmc2V0O1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKHsgbW9kaWZpZWRDb29yZHMsIGludGVyYWN0aW9uLCBzdGF0dXMsIG9mZnNldCwgb3B0aW9ucyB9KSB7XG4gICAgY29uc3QgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5saW5rZWRFZGdlcyB8fCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcztcblxuICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSB8fCAhZWRnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYWdlID0gc3RhdHVzLnVzZVN0YXR1c1hZXG4gICAgICA/IHsgeDogc3RhdHVzLngsIHk6IHN0YXR1cy55IH1cbiAgICAgIDogdXRpbHMuZXh0ZW5kKHt9LCBtb2RpZmllZENvb3Jkcyk7XG4gICAgY29uc3QgaW5uZXIgPSByZWN0VXRpbHMueHl3aFRvVGxicihnZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5pbm5lciwgaW50ZXJhY3Rpb24sIHBhZ2UpKSB8fCBub0lubmVyO1xuICAgIGNvbnN0IG91dGVyID0gcmVjdFV0aWxzLnh5d2hUb1RsYnIoZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMub3V0ZXIsIGludGVyYWN0aW9uLCBwYWdlKSkgfHwgbm9PdXRlcjtcblxuICAgIGxldCBtb2RpZmllZFggPSBwYWdlLng7XG4gICAgbGV0IG1vZGlmaWVkWSA9IHBhZ2UueTtcblxuICAgIHN0YXR1cy5keCA9IDA7XG4gICAgc3RhdHVzLmR5ID0gMDtcbiAgICBzdGF0dXMubG9ja2VkID0gZmFsc2U7XG5cbiAgICBpZiAoZWRnZXMudG9wKSB7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1pbihNYXRoLm1heChvdXRlci50b3AgICAgKyBvZmZzZXQudG9wLCAgICBwYWdlLnkpLCBpbm5lci50b3AgICAgKyBvZmZzZXQudG9wKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWRnZXMuYm90dG9tKSB7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1heChNYXRoLm1pbihvdXRlci5ib3R0b20gLSBvZmZzZXQuYm90dG9tLCBwYWdlLnkpLCBpbm5lci5ib3R0b20gLSBvZmZzZXQuYm90dG9tKTtcbiAgICB9XG4gICAgaWYgKGVkZ2VzLmxlZnQpIHtcbiAgICAgIG1vZGlmaWVkWCA9IE1hdGgubWluKE1hdGgubWF4KG91dGVyLmxlZnQgICArIG9mZnNldC5sZWZ0LCAgIHBhZ2UueCksIGlubmVyLmxlZnQgICArIG9mZnNldC5sZWZ0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWRnZXMucmlnaHQpIHtcbiAgICAgIG1vZGlmaWVkWCA9IE1hdGgubWF4KE1hdGgubWluKG91dGVyLnJpZ2h0ICAtIG9mZnNldC5yaWdodCwgIHBhZ2UueCksIGlubmVyLnJpZ2h0ICAtIG9mZnNldC5yaWdodCk7XG4gICAgfVxuXG4gICAgc3RhdHVzLmR4ID0gbW9kaWZpZWRYIC0gcGFnZS54O1xuICAgIHN0YXR1cy5keSA9IG1vZGlmaWVkWSAtIHBhZ2UueTtcblxuICAgIHN0YXR1cy5jaGFuZ2VkID0gc3RhdHVzLm1vZGlmaWVkWCAhPT0gbW9kaWZpZWRYIHx8IHN0YXR1cy5tb2RpZmllZFkgIT09IG1vZGlmaWVkWTtcbiAgICBzdGF0dXMubG9ja2VkID0gISEoc3RhdHVzLmR4IHx8IHN0YXR1cy5keSk7XG5cbiAgICBzdGF0dXMubW9kaWZpZWRYID0gbW9kaWZpZWRYO1xuICAgIHN0YXR1cy5tb2RpZmllZFkgPSBtb2RpZmllZFk7XG4gIH0sXG5cbiAgbW9kaWZ5Q29vcmRzOiBmdW5jdGlvbiAoeyBwYWdlLCBjbGllbnQsIHN0YXR1cywgcGhhc2UsIG9wdGlvbnMgfSkge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5hYmxlZFxuICAgICAgICAmJiAhKHBoYXNlID09PSAnc3RhcnQnICYmIHN0YXR1cy5sb2NrZWQpKSB7XG5cbiAgICAgIGlmIChzdGF0dXMubG9ja2VkKSB7XG4gICAgICAgIHBhZ2UueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIHBhZ2UueSArPSBzdGF0dXMuZHk7XG4gICAgICAgIGNsaWVudC54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgY2xpZW50LnkgKz0gc3RhdHVzLmR5O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZHg6IHN0YXR1cy5keCxcbiAgICAgICAgICBkeTogc3RhdHVzLmR5LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBub0lubmVyLFxuICBub091dGVyLFxuICBnZXRSZXN0cmljdGlvblJlY3QsXG59O1xuXG5tb2RpZmllcnMucmVzdHJpY3RFZGdlcyA9IHJlc3RyaWN0RWRnZXM7XG5tb2RpZmllcnMubmFtZXMucHVzaCgncmVzdHJpY3RFZGdlcycpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24ucmVzdHJpY3RFZGdlcyA9IHJlc3RyaWN0RWRnZXMuZGVmYXVsdHM7XG5yZXNpemUuZGVmYXVsdHMucmVzdHJpY3RFZGdlcyAgICAgICAgICA9IHJlc3RyaWN0RWRnZXMuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdHJpY3RFZGdlcztcbiIsImNvbnN0IG1vZGlmaWVycyAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbmNvbnN0IHJlc3RyaWN0ID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQgICAgOiBmYWxzZSxcbiAgICBlbmRPbmx5ICAgIDogZmFsc2UsXG4gICAgcmVzdHJpY3Rpb246IG51bGwsXG4gICAgZWxlbWVudFJlY3Q6IG51bGwsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAoeyByZWN0LCBzdGFydE9mZnNldCwgb3B0aW9ucyB9KSB7XG4gICAgY29uc3QgZWxlbWVudFJlY3QgPSBvcHRpb25zICYmIG9wdGlvbnMuZWxlbWVudFJlY3Q7XG4gICAgY29uc3Qgb2Zmc2V0ID0ge307XG5cbiAgICBpZiAocmVjdCAmJiBlbGVtZW50UmVjdCkge1xuICAgICAgb2Zmc2V0LmxlZnQgPSBzdGFydE9mZnNldC5sZWZ0IC0gKHJlY3Qud2lkdGggICogZWxlbWVudFJlY3QubGVmdCk7XG4gICAgICBvZmZzZXQudG9wICA9IHN0YXJ0T2Zmc2V0LnRvcCAgLSAocmVjdC5oZWlnaHQgKiBlbGVtZW50UmVjdC50b3ApO1xuXG4gICAgICBvZmZzZXQucmlnaHQgID0gc3RhcnRPZmZzZXQucmlnaHQgIC0gKHJlY3Qud2lkdGggICogKDEgLSBlbGVtZW50UmVjdC5yaWdodCkpO1xuICAgICAgb2Zmc2V0LmJvdHRvbSA9IHN0YXJ0T2Zmc2V0LmJvdHRvbSAtIChyZWN0LmhlaWdodCAqICgxIC0gZWxlbWVudFJlY3QuYm90dG9tKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgb2Zmc2V0LmxlZnQgPSBvZmZzZXQudG9wID0gb2Zmc2V0LnJpZ2h0ID0gb2Zmc2V0LmJvdHRvbSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uICh7IG1vZGlmaWVkQ29vcmRzLCBpbnRlcmFjdGlvbiwgc3RhdHVzLCBvcHRpb25zIH0pIHtcbiAgICBpZiAoIW9wdGlvbnMpIHsgcmV0dXJuIHN0YXR1czsgfVxuXG4gICAgY29uc3QgcGFnZSA9IHN0YXR1cy51c2VTdGF0dXNYWVxuICAgICAgPyB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9XG4gICAgICA6IHV0aWxzLmV4dGVuZCh7fSwgbW9kaWZpZWRDb29yZHMpO1xuXG4gICAgY29uc3QgcmVzdHJpY3Rpb24gPSBnZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5yZXN0cmljdGlvbiwgaW50ZXJhY3Rpb24sIHBhZ2UpO1xuXG4gICAgaWYgKCFyZXN0cmljdGlvbikgeyByZXR1cm4gc3RhdHVzOyB9XG5cbiAgICBzdGF0dXMuZHggPSAwO1xuICAgIHN0YXR1cy5keSA9IDA7XG4gICAgc3RhdHVzLmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmVjdCA9IHJlc3RyaWN0aW9uO1xuICAgIGxldCBtb2RpZmllZFggPSBwYWdlLng7XG4gICAgbGV0IG1vZGlmaWVkWSA9IHBhZ2UueTtcblxuICAgIGNvbnN0IG9mZnNldCA9IGludGVyYWN0aW9uLm1vZGlmaWVyT2Zmc2V0cy5yZXN0cmljdDtcblxuICAgIC8vIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmVcbiAgICAvLyB4LCB5LCB3aWR0aCwgaGVpZ2h0IG9yXG4gICAgLy8gbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXG4gICAgaWYgKCd4JyBpbiByZXN0cmljdGlvbiAmJiAneScgaW4gcmVzdHJpY3Rpb24pIHtcbiAgICAgIG1vZGlmaWVkWCA9IE1hdGgubWF4KE1hdGgubWluKHJlY3QueCArIHJlY3Qud2lkdGggIC0gb2Zmc2V0LnJpZ2h0ICwgcGFnZS54KSwgcmVjdC54ICsgb2Zmc2V0LmxlZnQpO1xuICAgICAgbW9kaWZpZWRZID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC55ICsgcmVjdC5oZWlnaHQgLSBvZmZzZXQuYm90dG9tLCBwYWdlLnkpLCByZWN0LnkgKyBvZmZzZXQudG9wICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbW9kaWZpZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC5yaWdodCAgLSBvZmZzZXQucmlnaHQgLCBwYWdlLngpLCByZWN0LmxlZnQgKyBvZmZzZXQubGVmdCk7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LmJvdHRvbSAtIG9mZnNldC5ib3R0b20sIHBhZ2UueSksIHJlY3QudG9wICArIG9mZnNldC50b3AgKTtcbiAgICB9XG5cbiAgICBzdGF0dXMuZHggPSBtb2RpZmllZFggLSBwYWdlLng7XG4gICAgc3RhdHVzLmR5ID0gbW9kaWZpZWRZIC0gcGFnZS55O1xuXG4gICAgc3RhdHVzLmNoYW5nZWQgPSBzdGF0dXMubW9kaWZpZWRYICE9PSBtb2RpZmllZFggfHwgc3RhdHVzLm1vZGlmaWVkWSAhPT0gbW9kaWZpZWRZO1xuICAgIHN0YXR1cy5sb2NrZWQgPSAhIShzdGF0dXMuZHggfHwgc3RhdHVzLmR5KTtcblxuICAgIHN0YXR1cy5tb2RpZmllZFggPSBtb2RpZmllZFg7XG4gICAgc3RhdHVzLm1vZGlmaWVkWSA9IG1vZGlmaWVkWTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IGZ1bmN0aW9uICh7IHBhZ2UsIGNsaWVudCwgc3RhdHVzLCBwaGFzZSwgb3B0aW9ucyB9KSB7XG4gICAgY29uc3QgZWxlbWVudFJlY3QgPSBvcHRpb25zICYmIG9wdGlvbnMuZWxlbWVudFJlY3Q7XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWRcbiAgICAgICAgJiYgIShwaGFzZSA9PT0gJ3N0YXJ0JyAmJiBlbGVtZW50UmVjdCAmJiBzdGF0dXMubG9ja2VkKSkge1xuXG4gICAgICBpZiAoc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBwYWdlLnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBwYWdlLnkgKz0gc3RhdHVzLmR5O1xuICAgICAgICBjbGllbnQueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIGNsaWVudC55ICs9IHN0YXR1cy5keTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGR4OiBzdGF0dXMuZHgsXG4gICAgICAgICAgZHk6IHN0YXR1cy5keSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZ2V0UmVzdHJpY3Rpb25SZWN0LFxufTtcblxuZnVuY3Rpb24gZ2V0UmVzdHJpY3Rpb25SZWN0ICh2YWx1ZSwgaW50ZXJhY3Rpb24sIHBhZ2UpIHtcbiAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiB1dGlscy5yZXNvbHZlUmVjdExpa2UodmFsdWUsIGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCwgW3BhZ2UueCwgcGFnZS55LCBpbnRlcmFjdGlvbl0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1dGlscy5yZXNvbHZlUmVjdExpa2UodmFsdWUsIGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gIH1cbn1cblxubW9kaWZpZXJzLnJlc3RyaWN0ID0gcmVzdHJpY3Q7XG5tb2RpZmllcnMubmFtZXMucHVzaCgncmVzdHJpY3QnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnJlc3RyaWN0ID0gcmVzdHJpY3QuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdHJpY3Q7XG4iLCJjb25zdCBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuL0ludGVyYWN0YWJsZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gID0gcmVxdWlyZSgnLi9JbnRlcmFjdGlvbicpO1xuY29uc3Qgc2NvcGUgICAgICAgID0gcmVxdWlyZSgnLi9zY29wZScpO1xuY29uc3QgaXMgICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9pcycpO1xuY29uc3QgZXZlbnRzICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbmNvbnN0IGJyb3dzZXIgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpO1xuXG5jb25zdCB7IG5vZGVDb250YWlucywgbWF0Y2hlc1NlbGVjdG9yIH0gPSByZXF1aXJlKCcuL3V0aWxzL2RvbVV0aWxzJyk7XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgdG8gcHJldmVudCB0aGUgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3VyIGluXG4gKiByZXNwb25zZSB0byBwb2ludGVyIGV2ZW50cy4gQ2FuIGJlIHNldCB0bzpcbiAqICAtIGAnYWx3YXlzJ2AgdG8gYWx3YXlzIHByZXZlbnRcbiAqICAtIGAnbmV2ZXInYCB0byBuZXZlciBwcmV2ZW50XG4gKiAgLSBgJ2F1dG8nYCB0byBsZXQgaW50ZXJhY3QuanMgdHJ5IHRvIGRldGVybWluZSB3aGF0IHdvdWxkIGJlIGJlc3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW25ld1ZhbHVlXSBgdHJ1ZWAsIGBmYWxzZWAgb3IgYCdhdXRvJ2BcbiAqIEByZXR1cm4ge3N0cmluZyB8IEludGVyYWN0YWJsZX0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmICgvXihhbHdheXN8bmV2ZXJ8YXV0bykkLy50ZXN0KG5ld1ZhbHVlKSkge1xuICAgIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdCA9IG5ld1ZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKGlzLmJvb2wobmV3VmFsdWUpKSB7XG4gICAgdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0ID0gbmV3VmFsdWU/ICdhbHdheXMnIDogJ25ldmVyJztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQ7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmNoZWNrQW5kUHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3Qgc2V0dGluZyA9IHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdDtcblxuICBpZiAoc2V0dGluZyA9PT0gJ25ldmVyJykgeyByZXR1cm47IH1cblxuICBpZiAoc2V0dGluZyA9PT0gJ2Fsd2F5cycpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNldHRpbmcgPT09ICdhdXRvJ1xuXG4gIC8vIGRvbid0IHByZXZlbnREZWZhdWx0IG9mIHRvdWNoe3N0YXJ0LG1vdmV9IGV2ZW50cyBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlXG4gIC8vIGV2ZW50cyBsaXN0ZW5lcnMuIENTUyB0b3VjaC1hY3Rpb24gYW5kIHVzZXItc2VsZWNjdCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkXG4gIGlmIChldmVudHMuc3VwcG9ydHNQYXNzaXZlXG4gICAgJiYgL150b3VjaChzdGFydHxtb3ZlKSQvLnRlc3QoZXZlbnQudHlwZSlcbiAgICAmJiAhYnJvd3Nlci5pc0lPUykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGRvbid0IHByZXZlbnREZWZhdWx0IG9mIHBvaW50ZXJkb3duIGV2ZW50c1xuICBpZiAoL14obW91c2V8cG9pbnRlcnx0b3VjaCkqKGRvd258c3RhcnQpL2kudGVzdChldmVudC50eXBlKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGRvbid0IHByZXZlbnREZWZhdWx0IG9uIGVkaXRhYmxlIGVsZW1lbnRzXG4gIGlmIChpcy5lbGVtZW50KGV2ZW50LnRhcmdldClcbiAgICAgICYmIG1hdGNoZXNTZWxlY3RvcihldmVudC50YXJnZXQsICdpbnB1dCxzZWxlY3QsdGV4dGFyZWEsW2NvbnRlbnRlZGl0YWJsZT10cnVlXSxbY29udGVudGVkaXRhYmxlPXRydWVdIConKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG5mdW5jdGlvbiBvbkludGVyYWN0aW9uRXZlbnQgKHsgaW50ZXJhY3Rpb24sIGV2ZW50IH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnRhcmdldCkge1xuICAgIGludGVyYWN0aW9uLnRhcmdldC5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgfVxufVxuXG5mb3IgKGNvbnN0IGV2ZW50U2lnbmFsIG9mIFsnZG93bicsICdtb3ZlJywgJ3VwJywgJ2NhbmNlbCddKSB7XG4gIEludGVyYWN0aW9uLnNpZ25hbHMub24oZXZlbnRTaWduYWwsIG9uSW50ZXJhY3Rpb25FdmVudCk7XG59XG5cbi8vIHByZXZlbnQgbmF0aXZlIEhUTUw1IGRyYWcgb24gaW50ZXJhY3QuanMgdGFyZ2V0IGVsZW1lbnRzXG5JbnRlcmFjdGlvbi5kb2NFdmVudHMuZHJhZ3N0YXJ0ID0gZnVuY3Rpb24gcHJldmVudE5hdGl2ZURyYWcgKGV2ZW50KSB7XG4gIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24uZWxlbWVudFxuICAgICAgICAmJiAoaW50ZXJhY3Rpb24uZWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICB8fCBub2RlQ29udGFpbnMoaW50ZXJhY3Rpb24uZWxlbWVudCwgZXZlbnQudGFyZ2V0KSkpIHtcblxuICAgICAgaW50ZXJhY3Rpb24udGFyZ2V0LmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufTtcbiIsImNvbnN0IEludGVyYWN0RXZlbnQgID0gcmVxdWlyZSgnLi9JbnRlcmFjdEV2ZW50Jyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgICA9IHJlcXVpcmUoJy4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IG1vZGlmaWVycyAgICAgID0gcmVxdWlyZSgnLi9tb2RpZmllcnMvYmFzZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBhbmltYXRpb25GcmFtZSA9IHJlcXVpcmUoJy4vdXRpbHMvcmFmJyk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5pbmVydGlhU3RhdHVzID0ge1xuICAgIGFjdGl2ZSAgICAgOiBmYWxzZSxcbiAgICBzbW9vdGhFbmQgIDogZmFsc2UsXG4gICAgYWxsb3dSZXN1bWU6IGZhbHNlLFxuXG4gICAgc3RhcnRFdmVudDogbnVsbCxcbiAgICB1cENvb3JkcyAgOiB7fSxcblxuICAgIHhlOiAwLCB5ZTogMCxcbiAgICBzeDogMCwgc3k6IDAsXG5cbiAgICB0MDogMCxcbiAgICB2eDA6IDAsIHZ5czogMCxcbiAgICBkdXJhdGlvbjogMCxcblxuICAgIGxhbWJkYV92MDogMCxcbiAgICBvbmVfdmVfdjA6IDAsXG4gICAgaSAgOiBudWxsLFxuICB9O1xuXG4gIGludGVyYWN0aW9uLmJvdW5kSW5lcnRpYUZyYW1lICAgPSAoKSA9PiBpbmVydGlhRnJhbWUgIC5hcHBseShpbnRlcmFjdGlvbik7XG4gIGludGVyYWN0aW9uLmJvdW5kU21vb3RoRW5kRnJhbWUgPSAoKSA9PiBzbW9vdGhFbmRGcmFtZS5hcHBseShpbnRlcmFjdGlvbik7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignZG93bicsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudCwgcG9pbnRlciwgZXZlbnRUYXJnZXQgfSkge1xuICBjb25zdCBzdGF0dXMgPSBpbnRlcmFjdGlvbi5pbmVydGlhU3RhdHVzO1xuXG4gIC8vIENoZWNrIGlmIHRoZSBkb3duIGV2ZW50IGhpdHMgdGhlIGN1cnJlbnQgaW5lcnRpYSB0YXJnZXRcbiAgaWYgKHN0YXR1cy5hY3RpdmUpIHtcbiAgICBsZXQgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gICAgLy8gY2xpbWIgdXAgdGhlIERPTSB0cmVlIGZyb20gdGhlIGV2ZW50IHRhcmdldFxuICAgIHdoaWxlICh1dGlscy5pcy5lbGVtZW50KGVsZW1lbnQpKSB7XG5cbiAgICAgIC8vIGlmIGludGVyYWN0aW9uIGVsZW1lbnQgaXMgdGhlIGN1cnJlbnQgaW5lcnRpYSB0YXJnZXQgZWxlbWVudFxuICAgICAgaWYgKGVsZW1lbnQgPT09IGludGVyYWN0aW9uLmVsZW1lbnQpIHtcbiAgICAgICAgLy8gc3RvcCBpbmVydGlhXG4gICAgICAgIGFuaW1hdGlvbkZyYW1lLmNhbmNlbChzdGF0dXMuaSk7XG4gICAgICAgIHN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaW50ZXJhY3Rpb24uc2ltdWxhdGlvbiA9IG51bGw7XG5cbiAgICAgICAgLy8gdXBkYXRlIHBvaW50ZXJzIHRvIHRoZSBkb3duIGV2ZW50J3MgY29vcmRpbmF0ZXNcbiAgICAgICAgaW50ZXJhY3Rpb24udXBkYXRlUG9pbnRlcihwb2ludGVyKTtcbiAgICAgICAgdXRpbHMuc2V0Q29vcmRzKGludGVyYWN0aW9uLmN1ckNvb3JkcywgaW50ZXJhY3Rpb24ucG9pbnRlcnMpO1xuXG4gICAgICAgIC8vIGZpcmUgYXBwcm9wcmlhdGUgc2lnbmFsc1xuICAgICAgICBjb25zdCBzaWduYWxBcmcgPSB7IGludGVyYWN0aW9uIH07XG4gICAgICAgIEludGVyYWN0aW9uLnNpZ25hbHMuZmlyZSgnYmVmb3JlLWFjdGlvbi1tb3ZlJywgc2lnbmFsQXJnKTtcbiAgICAgICAgSW50ZXJhY3Rpb24uc2lnbmFscy5maXJlKCdhY3Rpb24tcmVzdW1lJyAgICAgLCBzaWduYWxBcmcpO1xuXG4gICAgICAgIC8vIGZpcmUgYSByZXVtZSBldmVudFxuICAgICAgICBjb25zdCByZXN1bWVFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KGludGVyYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luZXJ0aWFyZXN1bWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuXG4gICAgICAgIGludGVyYWN0aW9uLnRhcmdldC5maXJlKHJlc3VtZUV2ZW50KTtcbiAgICAgICAgaW50ZXJhY3Rpb24ucHJldkV2ZW50ID0gcmVzdW1lRXZlbnQ7XG4gICAgICAgIG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMpO1xuXG4gICAgICAgIHV0aWxzLmNvcHlDb29yZHMoaW50ZXJhY3Rpb24ucHJldkNvb3JkcywgaW50ZXJhY3Rpb24uY3VyQ29vcmRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQgPSB1dGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3VwJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50IH0pIHtcbiAgY29uc3Qgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgfHwgc3RhdHVzLmFjdGl2ZSkgeyByZXR1cm47IH1cblxuICBjb25zdCB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG4gIGNvbnN0IG9wdGlvbnMgPSB0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnM7XG4gIGNvbnN0IGluZXJ0aWFPcHRpb25zID0gb3B0aW9ucyAmJiBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICYmIG9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uaW5lcnRpYTtcblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY29uc3Qgc3RhdHVzZXMgPSB7fTtcbiAgY29uc3QgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UpO1xuICBjb25zdCBwb2ludGVyU3BlZWQgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnNwZWVkO1xuXG4gIGxldCBzbW9vdGhFbmQgPSBmYWxzZTtcbiAgbGV0IG1vZGlmaWVyUmVzdWx0O1xuXG4gIC8vIGNoZWNrIGlmIGluZXJ0aWEgc2hvdWxkIGJlIHN0YXJ0ZWRcbiAgY29uc3QgaW5lcnRpYVBvc3NpYmxlID0gKGluZXJ0aWFPcHRpb25zICYmIGluZXJ0aWFPcHRpb25zLmVuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICYmIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdnZXN0dXJlJ1xuICAgICAgICAgICAgICAgICAgICAgJiYgZXZlbnQgIT09IHN0YXR1cy5zdGFydEV2ZW50KTtcblxuICBjb25zdCBpbmVydGlhID0gKGluZXJ0aWFQb3NzaWJsZVxuICAgICYmIChub3cgLSBpbnRlcmFjdGlvbi5jdXJDb29yZHMudGltZVN0YW1wKSA8IDUwXG4gICAgJiYgcG9pbnRlclNwZWVkID4gaW5lcnRpYU9wdGlvbnMubWluU3BlZWRcbiAgICAmJiBwb2ludGVyU3BlZWQgPiBpbmVydGlhT3B0aW9ucy5lbmRTcGVlZCk7XG5cbiAgY29uc3QgbW9kaWZpZXJBcmcgPSB7XG4gICAgaW50ZXJhY3Rpb24sXG4gICAgcGFnZUNvb3JkczogcGFnZSxcbiAgICBzdGF0dXNlcyxcbiAgICBwcmVFbmQ6IHRydWUsXG4gICAgcmVxdWlyZUVuZE9ubHk6IHRydWUsXG4gIH07XG5cbiAgLy8gc21vb3RoRW5kXG4gIGlmIChpbmVydGlhUG9zc2libGUgJiYgIWluZXJ0aWEpIHtcbiAgICBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyhzdGF0dXNlcyk7XG5cbiAgICBtb2RpZmllclJlc3VsdCA9IG1vZGlmaWVycy5zZXRBbGwobW9kaWZpZXJBcmcpO1xuXG4gICAgaWYgKG1vZGlmaWVyUmVzdWx0LnNob3VsZE1vdmUgJiYgbW9kaWZpZXJSZXN1bHQubG9ja2VkKSB7XG4gICAgICBzbW9vdGhFbmQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghKGluZXJ0aWEgfHwgc21vb3RoRW5kKSkgeyByZXR1cm47IH1cblxuICB1dGlscy5jb3B5Q29vcmRzKHN0YXR1cy51cENvb3JkcywgaW50ZXJhY3Rpb24uY3VyQ29vcmRzKTtcblxuICBpbnRlcmFjdGlvbi5wb2ludGVyc1swXSA9IHN0YXR1cy5zdGFydEV2ZW50ID1cbiAgICBuZXcgSW50ZXJhY3RFdmVudChpbnRlcmFjdGlvbiwgZXZlbnQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUsICdpbmVydGlhc3RhcnQnLCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcblxuICBzdGF0dXMudDAgPSBub3c7XG5cbiAgc3RhdHVzLmFjdGl2ZSA9IHRydWU7XG4gIHN0YXR1cy5hbGxvd1Jlc3VtZSA9IGluZXJ0aWFPcHRpb25zLmFsbG93UmVzdW1lO1xuICBpbnRlcmFjdGlvbi5zaW11bGF0aW9uID0gc3RhdHVzO1xuXG4gIHRhcmdldC5maXJlKHN0YXR1cy5zdGFydEV2ZW50KTtcblxuICBpZiAoaW5lcnRpYSkge1xuICAgIHN0YXR1cy52eDAgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ4O1xuICAgIHN0YXR1cy52eTAgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ5O1xuICAgIHN0YXR1cy52MCA9IHBvaW50ZXJTcGVlZDtcblxuICAgIGNhbGNJbmVydGlhKGludGVyYWN0aW9uLCBzdGF0dXMpO1xuXG4gICAgdXRpbHMuZXh0ZW5kKHBhZ2UsIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlKTtcblxuICAgIHBhZ2UueCArPSBzdGF0dXMueGU7XG4gICAgcGFnZS55ICs9IHN0YXR1cy55ZTtcblxuICAgIG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKHN0YXR1c2VzKTtcblxuICAgIG1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbChtb2RpZmllckFyZyk7XG5cbiAgICBzdGF0dXMubW9kaWZpZWRYZSArPSBtb2RpZmllclJlc3VsdC5keDtcbiAgICBzdGF0dXMubW9kaWZpZWRZZSArPSBtb2RpZmllclJlc3VsdC5keTtcblxuICAgIHN0YXR1cy5pID0gYW5pbWF0aW9uRnJhbWUucmVxdWVzdChpbnRlcmFjdGlvbi5ib3VuZEluZXJ0aWFGcmFtZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgc3RhdHVzLnNtb290aEVuZCA9IHRydWU7XG4gICAgc3RhdHVzLnhlID0gbW9kaWZpZXJSZXN1bHQuZHg7XG4gICAgc3RhdHVzLnllID0gbW9kaWZpZXJSZXN1bHQuZHk7XG5cbiAgICBzdGF0dXMuc3ggPSBzdGF0dXMuc3kgPSAwO1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KGludGVyYWN0aW9uLmJvdW5kU21vb3RoRW5kRnJhbWUpO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcC1hY3RpdmUnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGNvbnN0IHN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgaWYgKHN0YXR1cy5hY3RpdmUpIHtcbiAgICBhbmltYXRpb25GcmFtZS5jYW5jZWwoc3RhdHVzLmkpO1xuICAgIHN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICBpbnRlcmFjdGlvbi5zaW11bGF0aW9uID0gbnVsbDtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNhbGNJbmVydGlhIChpbnRlcmFjdGlvbiwgc3RhdHVzKSB7XG4gIGNvbnN0IGluZXJ0aWFPcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uaW5lcnRpYTtcbiAgY29uc3QgbGFtYmRhID0gaW5lcnRpYU9wdGlvbnMucmVzaXN0YW5jZTtcbiAgY29uc3QgaW5lcnRpYUR1ciA9IC1NYXRoLmxvZyhpbmVydGlhT3B0aW9ucy5lbmRTcGVlZCAvIHN0YXR1cy52MCkgLyBsYW1iZGE7XG5cbiAgc3RhdHVzLngwID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnBhZ2VYO1xuICBzdGF0dXMueTAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQucGFnZVk7XG4gIHN0YXR1cy50MCA9IHN0YXR1cy5zdGFydEV2ZW50LnRpbWVTdGFtcCAvIDEwMDA7XG4gIHN0YXR1cy5zeCA9IHN0YXR1cy5zeSA9IDA7XG5cbiAgc3RhdHVzLm1vZGlmaWVkWGUgPSBzdGF0dXMueGUgPSAoc3RhdHVzLnZ4MCAtIGluZXJ0aWFEdXIpIC8gbGFtYmRhO1xuICBzdGF0dXMubW9kaWZpZWRZZSA9IHN0YXR1cy55ZSA9IChzdGF0dXMudnkwIC0gaW5lcnRpYUR1cikgLyBsYW1iZGE7XG4gIHN0YXR1cy50ZSA9IGluZXJ0aWFEdXI7XG5cbiAgc3RhdHVzLmxhbWJkYV92MCA9IGxhbWJkYSAvIHN0YXR1cy52MDtcbiAgc3RhdHVzLm9uZV92ZV92MCA9IDEgLSBpbmVydGlhT3B0aW9ucy5lbmRTcGVlZCAvIHN0YXR1cy52MDtcbn1cblxuZnVuY3Rpb24gaW5lcnRpYUZyYW1lICgpIHtcbiAgdXBkYXRlSW5lcnRpYUNvb3Jkcyh0aGlzKTtcbiAgdXRpbHMuc2V0Q29vcmREZWx0YXModGhpcy5wb2ludGVyRGVsdGEsIHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuXG4gIGNvbnN0IHN0YXR1cyA9IHRoaXMuaW5lcnRpYVN0YXR1cztcbiAgY29uc3Qgb3B0aW9ucyA9IHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5pbmVydGlhO1xuICBjb25zdCBsYW1iZGEgPSBvcHRpb25zLnJlc2lzdGFuY2U7XG4gIGNvbnN0IHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAgLSBzdGF0dXMudDA7XG5cbiAgaWYgKHQgPCBzdGF0dXMudGUpIHtcblxuICAgIGNvbnN0IHByb2dyZXNzID0gIDEgLSAoTWF0aC5leHAoLWxhbWJkYSAqIHQpIC0gc3RhdHVzLmxhbWJkYV92MCkgLyBzdGF0dXMub25lX3ZlX3YwO1xuXG4gICAgaWYgKHN0YXR1cy5tb2RpZmllZFhlID09PSBzdGF0dXMueGUgJiYgc3RhdHVzLm1vZGlmaWVkWWUgPT09IHN0YXR1cy55ZSkge1xuICAgICAgc3RhdHVzLnN4ID0gc3RhdHVzLnhlICogcHJvZ3Jlc3M7XG4gICAgICBzdGF0dXMuc3kgPSBzdGF0dXMueWUgKiBwcm9ncmVzcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBxdWFkUG9pbnQgPSB1dGlscy5nZXRRdWFkcmF0aWNDdXJ2ZVBvaW50KDAsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy54ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnllLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubW9kaWZpZWRYZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLm1vZGlmaWVkWWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzKTtcblxuICAgICAgc3RhdHVzLnN4ID0gcXVhZFBvaW50Lng7XG4gICAgICBzdGF0dXMuc3kgPSBxdWFkUG9pbnQueTtcbiAgICB9XG5cbiAgICB0aGlzLmRvTW92ZSgpO1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KHRoaXMuYm91bmRJbmVydGlhRnJhbWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIHN0YXR1cy5zeCA9IHN0YXR1cy5tb2RpZmllZFhlO1xuICAgIHN0YXR1cy5zeSA9IHN0YXR1cy5tb2RpZmllZFllO1xuXG4gICAgdGhpcy5kb01vdmUoKTtcbiAgICB0aGlzLmVuZChzdGF0dXMuc3RhcnRFdmVudCk7XG4gICAgc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2ltdWxhdGlvbiA9IG51bGw7XG4gIH1cblxuICB1dGlscy5jb3B5Q29vcmRzKHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xufVxuXG5mdW5jdGlvbiBzbW9vdGhFbmRGcmFtZSAoKSB7XG4gIHVwZGF0ZUluZXJ0aWFDb29yZHModGhpcyk7XG5cbiAgY29uc3Qgc3RhdHVzID0gdGhpcy5pbmVydGlhU3RhdHVzO1xuICBjb25zdCB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGF0dXMudDA7XG4gIGNvbnN0IGR1cmF0aW9uID0gdGhpcy50YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLmluZXJ0aWEuc21vb3RoRW5kRHVyYXRpb247XG5cbiAgaWYgKHQgPCBkdXJhdGlvbikge1xuICAgIHN0YXR1cy5zeCA9IHV0aWxzLmVhc2VPdXRRdWFkKHQsIDAsIHN0YXR1cy54ZSwgZHVyYXRpb24pO1xuICAgIHN0YXR1cy5zeSA9IHV0aWxzLmVhc2VPdXRRdWFkKHQsIDAsIHN0YXR1cy55ZSwgZHVyYXRpb24pO1xuXG4gICAgdGhpcy5wb2ludGVyTW92ZShzdGF0dXMuc3RhcnRFdmVudCwgc3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KHRoaXMuYm91bmRTbW9vdGhFbmRGcmFtZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgc3RhdHVzLnN4ID0gc3RhdHVzLnhlO1xuICAgIHN0YXR1cy5zeSA9IHN0YXR1cy55ZTtcblxuICAgIHRoaXMucG9pbnRlck1vdmUoc3RhdHVzLnN0YXJ0RXZlbnQsIHN0YXR1cy5zdGFydEV2ZW50KTtcbiAgICB0aGlzLmVuZChzdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgICBzdGF0dXMuc21vb3RoRW5kID1cbiAgICAgIHN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNpbXVsYXRpb24gPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluZXJ0aWFDb29yZHMgKGludGVyYWN0aW9uKSB7XG4gIGNvbnN0IHN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgLy8gcmV0dXJuIGlmIGluZXJ0aWEgaXNuJ3QgcnVubmluZ1xuICBpZiAoIXN0YXR1cy5hY3RpdmUpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgcGFnZVVwICAgPSBzdGF0dXMudXBDb29yZHMucGFnZTtcbiAgY29uc3QgY2xpZW50VXAgPSBzdGF0dXMudXBDb29yZHMuY2xpZW50O1xuXG4gIHV0aWxzLnNldENvb3JkcyhpbnRlcmFjdGlvbi5jdXJDb29yZHMsIFsge1xuICAgIHBhZ2VYICA6IHBhZ2VVcC54ICAgKyBzdGF0dXMuc3gsXG4gICAgcGFnZVkgIDogcGFnZVVwLnkgICArIHN0YXR1cy5zeSxcbiAgICBjbGllbnRYOiBjbGllbnRVcC54ICsgc3RhdHVzLnN4LFxuICAgIGNsaWVudFk6IGNsaWVudFVwLnkgKyBzdGF0dXMuc3ksXG4gIH0gXSk7XG59XG4iLCJjb25zdCBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuY29uc3QgSW50ZXJhY3Rpb24gICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCBleHRlbmQgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvZXh0ZW5kJyk7XG5cbmNvbnN0IG1vZGlmaWVycyA9IHtcbiAgbmFtZXM6IFtdLFxuXG4gIHNldE9mZnNldHM6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBjb25zdCB7IGludGVyYWN0aW9uLCBwYWdlQ29vcmRzOiBwYWdlIH0gPSBhcmc7XG4gICAgY29uc3QgeyB0YXJnZXQsIGVsZW1lbnQsIHN0YXJ0T2Zmc2V0IH0gPSBpbnRlcmFjdGlvbjtcbiAgICBjb25zdCByZWN0ID0gdGFyZ2V0LmdldFJlY3QoZWxlbWVudCk7XG5cbiAgICBpZiAocmVjdCkge1xuICAgICAgc3RhcnRPZmZzZXQubGVmdCA9IHBhZ2UueCAtIHJlY3QubGVmdDtcbiAgICAgIHN0YXJ0T2Zmc2V0LnRvcCAgPSBwYWdlLnkgLSByZWN0LnRvcDtcblxuICAgICAgc3RhcnRPZmZzZXQucmlnaHQgID0gcmVjdC5yaWdodCAgLSBwYWdlLng7XG4gICAgICBzdGFydE9mZnNldC5ib3R0b20gPSByZWN0LmJvdHRvbSAtIHBhZ2UueTtcblxuICAgICAgaWYgKCEoJ3dpZHRoJyAgaW4gcmVjdCkpIHsgcmVjdC53aWR0aCAgPSByZWN0LnJpZ2h0ICAtIHJlY3QubGVmdDsgfVxuICAgICAgaWYgKCEoJ2hlaWdodCcgaW4gcmVjdCkpIHsgcmVjdC5oZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wIDsgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHN0YXJ0T2Zmc2V0LmxlZnQgPSBzdGFydE9mZnNldC50b3AgPSBzdGFydE9mZnNldC5yaWdodCA9IHN0YXJ0T2Zmc2V0LmJvdHRvbSA9IDA7XG4gICAgfVxuXG4gICAgYXJnLnJlY3QgPSByZWN0O1xuICAgIGFyZy5pbnRlcmFjdGFibGUgPSB0YXJnZXQ7XG4gICAgYXJnLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgZm9yIChjb25zdCBtb2RpZmllck5hbWUgb2YgbW9kaWZpZXJzLm5hbWVzKSB7XG4gICAgICBhcmcub3B0aW9ucyA9IHRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIGlmICghYXJnLm9wdGlvbnMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGludGVyYWN0aW9uLm1vZGlmaWVyT2Zmc2V0c1ttb2RpZmllck5hbWVdID0gbW9kaWZpZXJzW21vZGlmaWVyTmFtZV0uc2V0T2Zmc2V0KGFyZyk7XG4gICAgfVxuICB9LFxuXG4gIHNldEFsbDogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IHsgaW50ZXJhY3Rpb24sIHN0YXR1c2VzLCBwcmVFbmQsIHJlcXVpcmVFbmRPbmx5IH0gPSBhcmc7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgZHg6IDAsXG4gICAgICBkeTogMCxcbiAgICAgIGNoYW5nZWQ6IGZhbHNlLFxuICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgIHNob3VsZE1vdmU6IHRydWUsXG4gICAgfTtcblxuICAgIGFyZy5tb2RpZmllZENvb3JkcyA9IGV4dGVuZCh7fSwgYXJnLnBhZ2VDb29yZHMpO1xuXG4gICAgZm9yIChjb25zdCBtb2RpZmllck5hbWUgb2YgbW9kaWZpZXJzLm5hbWVzKSB7XG4gICAgICBjb25zdCBtb2RpZmllciA9IG1vZGlmaWVyc1ttb2RpZmllck5hbWVdO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIGlmICghc2hvdWxkRG8ob3B0aW9ucywgcHJlRW5kLCByZXF1aXJlRW5kT25seSkpIHsgY29udGludWU7IH1cblxuICAgICAgYXJnLnN0YXR1cyA9IGFyZy5zdGF0dXMgPSBzdGF0dXNlc1ttb2RpZmllck5hbWVdO1xuICAgICAgYXJnLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgYXJnLm9mZnNldCA9IGFyZy5pbnRlcmFjdGlvbi5tb2RpZmllck9mZnNldHNbbW9kaWZpZXJOYW1lXTtcblxuICAgICAgbW9kaWZpZXIuc2V0KGFyZyk7XG5cbiAgICAgIGlmIChhcmcuc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBhcmcubW9kaWZpZWRDb29yZHMueCArPSBhcmcuc3RhdHVzLmR4O1xuICAgICAgICBhcmcubW9kaWZpZWRDb29yZHMueSArPSBhcmcuc3RhdHVzLmR5O1xuXG4gICAgICAgIHJlc3VsdC5keCArPSBhcmcuc3RhdHVzLmR4O1xuICAgICAgICByZXN1bHQuZHkgKz0gYXJnLnN0YXR1cy5keTtcblxuICAgICAgICByZXN1bHQubG9ja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhIG1vdmUgc2hvdWxkIGJlIGZpcmVkIGlmOlxuICAgIC8vICAtIHRoZXJlIGFyZSBubyBtb2RpZmllcnMgZW5hYmxlZCxcbiAgICAvLyAgLSBubyBtb2RpZmllcnMgYXJlIFwibG9ja2VkXCIgaS5lLiBoYXZlIGNoYW5nZWQgdGhlIHBvaW50ZXIncyBjb29yZGluYXRlcywgb3JcbiAgICAvLyAgLSB0aGUgbG9ja2VkIGNvb3JkcyBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgcG9pbnRlciBtb3ZlXG4gICAgcmVzdWx0LnNob3VsZE1vdmUgPSAhYXJnLnN0YXR1cyB8fCAhcmVzdWx0LmxvY2tlZCB8fCBhcmcuc3RhdHVzLmNoYW5nZWQ7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIHJlc2V0U3RhdHVzZXM6IGZ1bmN0aW9uIChzdGF0dXNlcykge1xuICAgIGZvciAoY29uc3QgbW9kaWZpZXJOYW1lIG9mIG1vZGlmaWVycy5uYW1lcykge1xuICAgICAgY29uc3Qgc3RhdHVzID0gc3RhdHVzZXNbbW9kaWZpZXJOYW1lXSB8fCB7fTtcblxuICAgICAgc3RhdHVzLmR4ID0gc3RhdHVzLmR5ID0gMDtcbiAgICAgIHN0YXR1cy5tb2RpZmllZFggPSBzdGF0dXMubW9kaWZpZWRZID0gTmFOO1xuICAgICAgc3RhdHVzLmxvY2tlZCA9IGZhbHNlO1xuICAgICAgc3RhdHVzLmNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICBzdGF0dXNlc1ttb2RpZmllck5hbWVdID0gc3RhdHVzO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0dXNlcztcbiAgfSxcblxuICBzdGFydDogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSwgc2lnbmFsTmFtZSkge1xuICAgIGNvbnN0IGFyZyA9IHtcbiAgICAgIGludGVyYWN0aW9uLFxuICAgICAgcGFnZUNvb3JkczogKHNpZ25hbE5hbWUgPT09ICdhY3Rpb24tcmVzdW1lJyA/XG4gICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzIDogaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMpLnBhZ2UsXG4gICAgICBzdGFydE9mZnNldDogaW50ZXJhY3Rpb24uc3RhcnRPZmZzZXQsXG4gICAgICBzdGF0dXNlczogaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlcyxcbiAgICAgIHByZUVuZDogZmFsc2UsXG4gICAgICByZXF1aXJlRW5kT25seTogZmFsc2UsXG4gICAgfTtcblxuICAgIG1vZGlmaWVycy5zZXRPZmZzZXRzKGFyZyk7XG4gICAgbW9kaWZpZXJzLnJlc2V0U3RhdHVzZXMoYXJnLnN0YXR1c2VzKTtcblxuICAgIGFyZy5wYWdlQ29vcmRzID0gZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlKTtcbiAgICBpbnRlcmFjdGlvbi5tb2RpZmllclJlc3VsdCA9IG1vZGlmaWVycy5zZXRBbGwoYXJnKTtcbiAgfSxcblxuICBiZWZvcmVNb3ZlOiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcHJlRW5kLCBpbnRlcmFjdGluZ0JlZm9yZU1vdmUgfSkge1xuICAgIGNvbnN0IG1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbCh7XG4gICAgICBpbnRlcmFjdGlvbixcbiAgICAgIHByZUVuZCxcbiAgICAgIHBhZ2VDb29yZHM6IGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlLFxuICAgICAgc3RhdHVzZXM6IGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMsXG4gICAgICByZXF1aXJlRW5kT25seTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICAvLyBkb24ndCBmaXJlIGFuIGFjdGlvbiBtb3ZlIGlmIGEgbW9kaWZpZXIgd291bGQga2VlcCB0aGUgZXZlbnQgaW4gdGhlIHNhbWVcbiAgICAvLyBjb3JkaW5hdGVzIGFzIGJlZm9yZVxuICAgIGlmICghbW9kaWZpZXJSZXN1bHQuc2hvdWxkTW92ZSAmJiBpbnRlcmFjdGluZ0JlZm9yZU1vdmUpIHtcbiAgICAgIGludGVyYWN0aW9uLl9kb250RmlyZU1vdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIGludGVyYWN0aW9uLm1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJSZXN1bHQ7XG4gIH0sXG5cbiAgZW5kOiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnQgfSkge1xuICAgIGZvciAoY29uc3QgbW9kaWZpZXJOYW1lIG9mIG1vZGlmaWVycy5uYW1lcykge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIC8vIGlmIHRoZSBlbmRPbmx5IG9wdGlvbiBpcyB0cnVlIGZvciBhbnkgbW9kaWZpZXJcbiAgICAgIGlmIChzaG91bGREbyhvcHRpb25zLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAvLyBmaXJlIGEgbW92ZSBldmVudCBhdCB0aGUgbW9kaWZpZWQgY29vcmRpbmF0ZXNcbiAgICAgICAgaW50ZXJhY3Rpb24uZG9Nb3ZlKHsgZXZlbnQsIHByZUVuZDogdHJ1ZSB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNldFhZOiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgY29uc3QgeyBpRXZlbnQsIGludGVyYWN0aW9uIH0gPSBhcmc7XG4gICAgY29uc3QgbW9kaWZpZXJBcmcgPSBleHRlbmQoe30sIGFyZyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGlmaWVycy5uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbW9kaWZpZXJOYW1lID0gbW9kaWZpZXJzLm5hbWVzW2ldO1xuICAgICAgbW9kaWZpZXJBcmcub3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIGlmICghbW9kaWZpZXJBcmcub3B0aW9ucykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJOYW1lXTtcblxuICAgICAgbW9kaWZpZXJBcmcuc3RhdHVzID0gaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlc1ttb2RpZmllck5hbWVdO1xuXG4gICAgICBpRXZlbnRbbW9kaWZpZXJOYW1lXSA9IG1vZGlmaWVyLm1vZGlmeUNvb3Jkcyhtb2RpZmllckFyZyk7XG4gICAgfVxuICB9LFxufTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLnN0YXJ0T2Zmc2V0ICAgICAgPSB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCB9O1xuICBpbnRlcmFjdGlvbi5tb2RpZmllck9mZnNldHMgID0ge307XG4gIGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMgPSBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyh7fSk7XG4gIGludGVyYWN0aW9uLm1vZGlmaWVyUmVzdWx0ICAgPSBudWxsO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1zdGFydCcgLCBtb2RpZmllcnMuc3RhcnQpO1xuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLXJlc3VtZScsIG1vZGlmaWVycy5zdGFydCk7XG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdiZWZvcmUtYWN0aW9uLW1vdmUnLCBtb2RpZmllcnMuYmVmb3JlTW92ZSk7XG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tZW5kJywgbW9kaWZpZXJzLmVuZCk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignc2V0LXh5JywgbW9kaWZpZXJzLnNldFhZKTtcblxuZnVuY3Rpb24gc2hvdWxkRG8gKG9wdGlvbnMsIHByZUVuZCwgcmVxdWlyZUVuZE9ubHkpIHtcbiAgcmV0dXJuIChvcHRpb25zICYmIG9wdGlvbnMuZW5hYmxlZFxuICAgICAgICAgICYmIChwcmVFbmQgfHwgIW9wdGlvbnMuZW5kT25seSlcbiAgICAgICAgICAmJiAoIXJlcXVpcmVFbmRPbmx5IHx8IG9wdGlvbnMuZW5kT25seSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGlmaWVycztcbiIsInJlcXVpcmUoJy4vYmFzZScpLnNldEFjdGlvbkRlZmF1bHRzKHJlcXVpcmUoJy4uL2FjdGlvbnMvcmVzaXplJykpO1xuIiwiY29uc3QgYXV0b1N0YXJ0ICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcblxuYXV0b1N0YXJ0LmRlZmF1bHRzLnBlckFjdGlvbi5ob2xkID0gMDtcbmF1dG9TdGFydC5kZWZhdWx0cy5wZXJBY3Rpb24uZGVsYXkgPSAwO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uYXV0b1N0YXJ0SG9sZFRpbWVyID0gbnVsbDtcbn0pO1xuXG5hdXRvU3RhcnQuc2lnbmFscy5vbigncHJlcGFyZWQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGNvbnN0IGhvbGQgPSBnZXRIb2xkRHVyYXRpb24oaW50ZXJhY3Rpb24pO1xuXG4gIGlmIChob2xkID4gMCkge1xuICAgIGludGVyYWN0aW9uLmF1dG9TdGFydEhvbGRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW50ZXJhY3Rpb24uc3RhcnQoaW50ZXJhY3Rpb24ucHJlcGFyZWQsIGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gICAgfSwgaG9sZCk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGR1cGxpY2F0ZSB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQgJiYgIWR1cGxpY2F0ZSkge1xuICAgIGNsZWFyVGltZW91dChpbnRlcmFjdGlvbi5hdXRvU3RhcnRIb2xkVGltZXIpO1xuICB9XG59KTtcblxuLy8gcHJldmVudCByZWd1bGFyIGRvd24tPm1vdmUgYXV0b1N0YXJ0XG5hdXRvU3RhcnQuc2lnbmFscy5vbignYmVmb3JlLXN0YXJ0JywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBjb25zdCBob2xkID0gZ2V0SG9sZER1cmF0aW9uKGludGVyYWN0aW9uKTtcblxuICBpZiAoaG9sZCA+IDApIHtcbiAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lID0gbnVsbDtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGdldEhvbGREdXJhdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgY29uc3QgYWN0aW9uTmFtZSA9IGludGVyYWN0aW9uLnByZXBhcmVkICYmIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWU7XG5cbiAgaWYgKCFhY3Rpb25OYW1lKSB7IHJldHVybiBudWxsOyB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zO1xuXG4gIHJldHVybiBvcHRpb25zW2FjdGlvbk5hbWVdLmhvbGQgfHwgb3B0aW9uc1thY3Rpb25OYW1lXS5kZWxheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldEhvbGREdXJhdGlvbixcbn07XG4iLCJyZXF1aXJlKCcuL2Jhc2UnKS5zZXRBY3Rpb25EZWZhdWx0cyhyZXF1aXJlKCcuLi9hY3Rpb25zL2dlc3R1cmUnKSk7XG4iLCJjb25zdCBhdXRvU3RhcnQgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHNjb3BlICAgICA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG5jb25zdCBpcyAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9pcycpO1xuXG5jb25zdCB7IHBhcmVudE5vZGUgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2RvbVV0aWxzJyk7XG5cbmF1dG9TdGFydC5zZXRBY3Rpb25EZWZhdWx0cyhyZXF1aXJlKCcuLi9hY3Rpb25zL2RyYWcnKSk7XG5cbmF1dG9TdGFydC5zaWduYWxzLm9uKCdiZWZvcmUtc3RhcnQnLCAgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50VGFyZ2V0LCBkeCwgZHkgfSkge1xuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2RyYWcnKSB7IHJldHVybjsgfVxuXG4gIC8vIGNoZWNrIGlmIGEgZHJhZyBpcyBpbiB0aGUgY29ycmVjdCBheGlzXG4gIGNvbnN0IGFic1ggPSBNYXRoLmFicyhkeCk7XG4gIGNvbnN0IGFic1kgPSBNYXRoLmFicyhkeSk7XG4gIGNvbnN0IHRhcmdldE9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5kcmFnO1xuICBjb25zdCBzdGFydEF4aXMgPSB0YXJnZXRPcHRpb25zLnN0YXJ0QXhpcztcbiAgY29uc3QgY3VycmVudEF4aXMgPSAoYWJzWCA+IGFic1kgPyAneCcgOiBhYnNYIDwgYWJzWSA/ICd5JyA6ICd4eScpO1xuXG4gIGludGVyYWN0aW9uLnByZXBhcmVkLmF4aXMgPSB0YXJnZXRPcHRpb25zLmxvY2tBeGlzID09PSAnc3RhcnQnXG4gICAgPyBjdXJyZW50QXhpc1swXSAvLyBhbHdheXMgbG9jayB0byBvbmUgYXhpcyBldmVuIGlmIGN1cnJlbnRBeGlzID09PSAneHknXG4gICAgOiB0YXJnZXRPcHRpb25zLmxvY2tBeGlzO1xuXG4gIC8vIGlmIHRoZSBtb3ZlbWVudCBpc24ndCBpbiB0aGUgc3RhcnRBeGlzIG9mIHRoZSBpbnRlcmFjdGFibGVcbiAgaWYgKGN1cnJlbnRBeGlzICE9PSAneHknICYmIHN0YXJ0QXhpcyAhPT0gJ3h5JyAmJiBzdGFydEF4aXMgIT09IGN1cnJlbnRBeGlzKSB7XG4gICAgLy8gY2FuY2VsIHRoZSBwcmVwYXJlZCBhY3Rpb25cbiAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lID0gbnVsbDtcblxuICAgIC8vIHRoZW4gdHJ5IHRvIGdldCBhIGRyYWcgZnJvbSBhbm90aGVyIGluZXJhY3RhYmxlXG4gICAgbGV0IGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgIGNvbnN0IGdldERyYWdnYWJsZSA9IGZ1bmN0aW9uIChpbnRlcmFjdGFibGUpIHtcbiAgICAgIGlmIChpbnRlcmFjdGFibGUgPT09IGludGVyYWN0aW9uLnRhcmdldCkgeyByZXR1cm47IH1cblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLmRyYWc7XG5cbiAgICAgIGlmICghb3B0aW9ucy5tYW51YWxTdGFydFxuICAgICAgICAgICYmIGludGVyYWN0YWJsZS50ZXN0SWdub3JlQWxsb3cob3B0aW9ucywgZWxlbWVudCwgZXZlbnRUYXJnZXQpKSB7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uID0gaW50ZXJhY3RhYmxlLmdldEFjdGlvbihcbiAgICAgICAgICBpbnRlcmFjdGlvbi5kb3duUG9pbnRlciwgaW50ZXJhY3Rpb24uZG93bkV2ZW50LCBpbnRlcmFjdGlvbiwgZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGFjdGlvblxuICAgICAgICAgICAgJiYgYWN0aW9uLm5hbWUgPT09ICdkcmFnJ1xuICAgICAgICAgICAgJiYgY2hlY2tTdGFydEF4aXMoY3VycmVudEF4aXMsIGludGVyYWN0YWJsZSlcbiAgICAgICAgICAgICYmIGF1dG9TdGFydC52YWxpZGF0ZUFjdGlvbihhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpKSB7XG5cbiAgICAgICAgICByZXR1cm4gaW50ZXJhY3RhYmxlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGNoZWNrIGFsbCBpbnRlcmFjdGFibGVzXG4gICAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IGludGVyYWN0YWJsZSA9IHNjb3BlLmludGVyYWN0YWJsZXMuZm9yRWFjaE1hdGNoKGVsZW1lbnQsIGdldERyYWdnYWJsZSk7XG5cbiAgICAgIGlmIChpbnRlcmFjdGFibGUpIHtcbiAgICAgICAgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSA9ICdkcmFnJztcbiAgICAgICAgaW50ZXJhY3Rpb24udGFyZ2V0ID0gaW50ZXJhY3RhYmxlO1xuICAgICAgICBpbnRlcmFjdGlvbi5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQgPSBwYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNoZWNrU3RhcnRBeGlzIChzdGFydEF4aXMsIGludGVyYWN0YWJsZSkge1xuICBpZiAoIWludGVyYWN0YWJsZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBjb25zdCB0aGlzQXhpcyA9IGludGVyYWN0YWJsZS5vcHRpb25zLmRyYWcuc3RhcnRBeGlzO1xuXG4gIHJldHVybiAoc3RhcnRBeGlzID09PSAneHknIHx8IHRoaXNBeGlzID09PSAneHknIHx8IHRoaXNBeGlzID09PSBzdGFydEF4aXMpO1xufVxuIiwiY29uc3QgaW50ZXJhY3QgICAgICAgPSByZXF1aXJlKCcuLi9pbnRlcmFjdCcpO1xuY29uc3QgSW50ZXJhY3RhYmxlICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IGFjdGlvbnMgICAgICAgID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9iYXNlJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5jb25zdCBzY29wZSAgICAgICAgICA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBzaWduYWxzICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxucmVxdWlyZSgnLi9JbnRlcmFjdGFibGVNZXRob2RzJyk7XG5cbmNvbnN0IGF1dG9TdGFydCA9IHtcbiAgc2lnbmFscyxcbiAgd2l0aGluSW50ZXJhY3Rpb25MaW1pdCxcbiAgLy8gQWxsb3cgdGhpcyBtYW55IGludGVyYWN0aW9ucyB0byBoYXBwZW4gc2ltdWx0YW5lb3VzbHlcbiAgbWF4SW50ZXJhY3Rpb25zOiBJbmZpbml0eSxcbiAgZGVmYXVsdHM6IHtcbiAgICBwZXJBY3Rpb246IHtcbiAgICAgIG1hbnVhbFN0YXJ0OiBmYWxzZSxcbiAgICAgIG1heDogSW5maW5pdHksXG4gICAgICBtYXhQZXJFbGVtZW50OiAxLFxuICAgICAgYWxsb3dGcm9tOiAgbnVsbCxcbiAgICAgIGlnbm9yZUZyb206IG51bGwsXG5cbiAgICAgIC8vIG9ubHkgYWxsb3cgbGVmdCBidXR0b24gYnkgZGVmYXVsdFxuICAgICAgLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2J1dHRvbnMjUmV0dXJuX3ZhbHVlXG4gICAgICBtb3VzZUJ1dHRvbnM6IDEsXG4gICAgfSxcbiAgfSxcbiAgc2V0QWN0aW9uRGVmYXVsdHM6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICB1dGlscy5leHRlbmQoYWN0aW9uLmRlZmF1bHRzLCBhdXRvU3RhcnQuZGVmYXVsdHMucGVyQWN0aW9uKTtcbiAgfSxcbiAgdmFsaWRhdGVBY3Rpb24sXG59O1xuXG4vLyBzZXQgY3Vyc29yIHN0eWxlIG9uIG1vdXNlZG93blxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignZG93bicsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQgfSkge1xuICBpZiAoaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkgeyByZXR1cm47IH1cblxuICBjb25zdCBhY3Rpb25JbmZvID0gZ2V0QWN0aW9uSW5mbyhpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KTtcbiAgcHJlcGFyZShpbnRlcmFjdGlvbiwgYWN0aW9uSW5mbyk7XG59KTtcblxuLy8gc2V0IGN1cnNvciBzdHlsZSBvbiBtb3VzZW1vdmVcbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0IH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnXG4gICAgICB8fCBpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duXG4gICAgICB8fCBpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IGFjdGlvbkluZm8gPSBnZXRBY3Rpb25JbmZvKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpO1xuICBwcmVwYXJlKGludGVyYWN0aW9uLCBhY3Rpb25JbmZvKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKGFyZykge1xuICBjb25zdCB7IGludGVyYWN0aW9uLCBldmVudCB9ID0gYXJnO1xuXG4gIGlmICghaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93blxuICAgICAgfHwgaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKVxuICAgICAgfHwgIWludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZFxuICAgICAgfHwgIWludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzaWduYWxzLmZpcmUoJ2JlZm9yZS1zdGFydCcsIGFyZyk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuXG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICYmIHRhcmdldCkge1xuICAgIC8vIGNoZWNrIG1hbnVhbFN0YXJ0IGFuZCBpbnRlcmFjdGlvbiBsaW1pdFxuICAgIGlmICh0YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5tYW51YWxTdGFydFxuICAgICAgICB8fCAhd2l0aGluSW50ZXJhY3Rpb25MaW1pdCh0YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQsIGludGVyYWN0aW9uLnByZXBhcmVkKSkge1xuICAgICAgaW50ZXJhY3Rpb24uc3RvcChldmVudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW50ZXJhY3Rpb24uc3RhcnQoaW50ZXJhY3Rpb24ucHJlcGFyZWQsIHRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gQ2hlY2sgaWYgdGhlIGN1cnJlbnQgdGFyZ2V0IHN1cHBvcnRzIHRoZSBhY3Rpb24uXG4vLyBJZiBzbywgcmV0dXJuIHRoZSB2YWxpZGF0ZWQgYWN0aW9uLiBPdGhlcndpc2UsIHJldHVybiBudWxsXG5mdW5jdGlvbiB2YWxpZGF0ZUFjdGlvbiAoYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3QoYWN0aW9uKVxuICAgICAgJiYgaW50ZXJhY3RhYmxlLnRlc3RJZ25vcmVBbGxvdyhpbnRlcmFjdGFibGUub3B0aW9uc1thY3Rpb24ubmFtZV0sIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgJiYgaW50ZXJhY3RhYmxlLm9wdGlvbnNbYWN0aW9uLm5hbWVdLmVuYWJsZWRcbiAgICAgICYmIHdpdGhpbkludGVyYWN0aW9uTGltaXQoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBhY3Rpb24pKSB7XG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNlbGVjdG9yIChpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIG1hdGNoZXMsIG1hdGNoRWxlbWVudHMsIGV2ZW50VGFyZ2V0KSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBtYXRjaGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgbWF0Y2ggPSBtYXRjaGVzW2ldO1xuICAgIGNvbnN0IG1hdGNoRWxlbWVudCA9IG1hdGNoRWxlbWVudHNbaV07XG4gICAgY29uc3QgYWN0aW9uID0gdmFsaWRhdGVBY3Rpb24obWF0Y2guZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGlvbiwgbWF0Y2hFbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQpO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICB0YXJnZXQ6IG1hdGNoLFxuICAgICAgICBlbGVtZW50OiBtYXRjaEVsZW1lbnQsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0QWN0aW9uSW5mbyAoaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICBsZXQgbWF0Y2hlcyA9IFtdO1xuICBsZXQgbWF0Y2hFbGVtZW50cyA9IFtdO1xuXG4gIGxldCBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgZnVuY3Rpb24gcHVzaE1hdGNoZXMgKGludGVyYWN0YWJsZSkge1xuICAgIG1hdGNoZXMucHVzaChpbnRlcmFjdGFibGUpO1xuICAgIG1hdGNoRWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgfVxuXG4gIHdoaWxlICh1dGlscy5pcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgbWF0Y2hlcyA9IFtdO1xuICAgIG1hdGNoRWxlbWVudHMgPSBbXTtcblxuICAgIHNjb3BlLmludGVyYWN0YWJsZXMuZm9yRWFjaE1hdGNoKGVsZW1lbnQsIHB1c2hNYXRjaGVzKTtcblxuICAgIGNvbnN0IGFjdGlvbkluZm8gPSB2YWxpZGF0ZVNlbGVjdG9yKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgbWF0Y2hlcywgbWF0Y2hFbGVtZW50cywgZXZlbnRUYXJnZXQpO1xuXG4gICAgaWYgKGFjdGlvbkluZm8uYWN0aW9uXG4gICAgICAmJiAhYWN0aW9uSW5mby50YXJnZXQub3B0aW9uc1thY3Rpb25JbmZvLmFjdGlvbi5uYW1lXS5tYW51YWxTdGFydCkge1xuICAgICAgcmV0dXJuIGFjdGlvbkluZm87XG4gICAgfVxuXG4gICAgZWxlbWVudCA9IHV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHByZXBhcmUgKGludGVyYWN0aW9uLCB7IGFjdGlvbiwgdGFyZ2V0LCBlbGVtZW50IH0pIHtcbiAgYWN0aW9uID0gYWN0aW9uIHx8IHt9O1xuXG4gIGlmIChpbnRlcmFjdGlvbi50YXJnZXQgJiYgaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICBpbnRlcmFjdGlvbi50YXJnZXQuX2RvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gIH1cblxuICBpbnRlcmFjdGlvbi50YXJnZXQgPSB0YXJnZXQ7XG4gIGludGVyYWN0aW9uLmVsZW1lbnQgPSBlbGVtZW50O1xuICB1dGlscy5jb3B5QWN0aW9uKGludGVyYWN0aW9uLnByZXBhcmVkLCBhY3Rpb24pO1xuXG4gIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICBjb25zdCBjdXJzb3IgPSBhY3Rpb24/IGFjdGlvbnNbYWN0aW9uLm5hbWVdLmdldEN1cnNvcihhY3Rpb24pIDogJyc7XG4gICAgaW50ZXJhY3Rpb24udGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9IGN1cnNvcjtcbiAgfVxuXG4gIHNpZ25hbHMuZmlyZSgncHJlcGFyZWQnLCB7IGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbiB9KTtcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgY29uc3QgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuXG4gIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICB0YXJnZXQuX2RvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0IChpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGFjdGlvbikge1xuICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG4gIGNvbnN0IG1heEFjdGlvbnMgPSBvcHRpb25zW2FjdGlvbi5uYW1lXS5tYXg7XG4gIGNvbnN0IG1heFBlckVsZW1lbnQgPSBvcHRpb25zW2FjdGlvbi5uYW1lXS5tYXhQZXJFbGVtZW50O1xuICBsZXQgYWN0aXZlSW50ZXJhY3Rpb25zID0gMDtcbiAgbGV0IHRhcmdldENvdW50ID0gMDtcbiAgbGV0IHRhcmdldEVsZW1lbnRDb3VudCA9IDA7XG5cbiAgLy8gbm8gYWN0aW9ucyBpZiBhbnkgb2YgdGhlc2UgdmFsdWVzID09IDBcbiAgaWYgKCEobWF4QWN0aW9ucyAmJiBtYXhQZXJFbGVtZW50ICYmIGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnMpKSB7IHJldHVybjsgfVxuXG4gIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG4gICAgY29uc3Qgb3RoZXJBY3Rpb24gPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lO1xuXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7IGNvbnRpbnVlOyB9XG5cbiAgICBhY3RpdmVJbnRlcmFjdGlvbnMrKztcblxuICAgIGlmIChhY3RpdmVJbnRlcmFjdGlvbnMgPj0gYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpbnRlcmFjdGlvbi50YXJnZXQgIT09IGludGVyYWN0YWJsZSkgeyBjb250aW51ZTsgfVxuXG4gICAgdGFyZ2V0Q291bnQgKz0gKG90aGVyQWN0aW9uID09PSBhY3Rpb24ubmFtZSl8MDtcblxuICAgIGlmICh0YXJnZXRDb3VudCA+PSBtYXhBY3Rpb25zKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGludGVyYWN0aW9uLmVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIHRhcmdldEVsZW1lbnRDb3VudCsrO1xuXG4gICAgICBpZiAob3RoZXJBY3Rpb24gIT09IGFjdGlvbi5uYW1lIHx8IHRhcmdldEVsZW1lbnRDb3VudCA+PSBtYXhQZXJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucyA+IDA7XG59XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBjb25jdXJyZW50IGludGVyYWN0aW9ucyBhbGxvd2VkLiAgQnlcbiAqIGRlZmF1bHQgb25seSAxIGludGVyYWN0aW9uIGlzIGFsbG93ZWQgYXQgYSB0aW1lIChmb3IgYmFja3dhcmRzXG4gKiBjb21wYXRpYmlsaXR5KS4gVG8gYWxsb3cgbXVsdGlwbGUgaW50ZXJhY3Rpb25zIG9uIHRoZSBzYW1lIEludGVyYWN0YWJsZXMgYW5kXG4gKiBlbGVtZW50cywgeW91IG5lZWQgdG8gZW5hYmxlIGl0IGluIHRoZSBkcmFnZ2FibGUsIHJlc2l6YWJsZSBhbmQgZ2VzdHVyYWJsZVxuICogYCdtYXgnYCBhbmQgYCdtYXhQZXJFbGVtZW50J2Agb3B0aW9ucy5cbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0Lm1heEludGVyYWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbmV3VmFsdWVdIEFueSBudW1iZXIuIG5ld1ZhbHVlIDw9IDAgbWVhbnMgbm8gaW50ZXJhY3Rpb25zLlxuICovXG5pbnRlcmFjdC5tYXhJbnRlcmFjdGlvbnMgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgaWYgKHV0aWxzLmlzLm51bWJlcihuZXdWYWx1ZSkpIHtcbiAgICBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zID0gbmV3VmFsdWU7XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICByZXR1cm4gYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucztcbn07XG5cbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnc3R5bGVDdXJzb3InKTtcbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnYWN0aW9uQ2hlY2tlcicpO1xuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdpZ25vcmVGcm9tJyk7XG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ2FsbG93RnJvbScpO1xuXG5kZWZhdWx0T3B0aW9ucy5iYXNlLmFjdGlvbkNoZWNrZXIgPSBudWxsO1xuZGVmYXVsdE9wdGlvbnMuYmFzZS5zdHlsZUN1cnNvciA9IHRydWU7XG5cbnV0aWxzLmV4dGVuZChkZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24sIGF1dG9TdGFydC5kZWZhdWx0cy5wZXJBY3Rpb24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF1dG9TdGFydDtcbiIsIi8qKiBAbGVuZHMgSW50ZXJhY3RhYmxlICovXG5jb25zdCBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IGFjdGlvbnMgICAgICA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvYmFzZScpO1xuY29uc3QgaXMgICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvaXMnKTtcbmNvbnN0IGRvbVV0aWxzICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2RvbVV0aWxzJyk7XG5cbmNvbnN0IHsgd2Fybk9uY2UgfSA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZ2V0QWN0aW9uID0gZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGlvbiwgZWxlbWVudCkge1xuICBjb25zdCBhY3Rpb24gPSB0aGlzLmRlZmF1bHRBY3Rpb25DaGVja2VyKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGlvbiwgZWxlbWVudCk7XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyKHBvaW50ZXIsIGV2ZW50LCBhY3Rpb24sIHRoaXMsIGVsZW1lbnQsIGludGVyYWN0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBhY3Rpb247XG59O1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdChlbGVtZW50LCB7IGlnbm9yZUZyb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduby1hY3Rpb24nKSB9KTtcbiAqIC8vIG9yXG4gKiBpbnRlcmFjdChlbGVtZW50KS5pZ25vcmVGcm9tKCdpbnB1dCwgdGV4dGFyZWEsIGEnKTtcbiAqIGBgYFxuICogQGRlcHJlY2F0ZWRcbiAqIElmIHRoZSB0YXJnZXQgb2YgdGhlIGBtb3VzZWRvd25gLCBgcG9pbnRlcmRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudCBvciBhbnlcbiAqIG9mIGl0J3MgcGFyZW50cyBtYXRjaCB0aGUgZ2l2ZW4gQ1NTIHNlbGVjdG9yIG9yIEVsZW1lbnQsIG5vXG4gKiBkcmFnL3Jlc2l6ZS9nZXN0dXJlIGlzIHN0YXJ0ZWQuXG4gKlxuICogRG9uJ3QgdXNlIHRoaXMgbWV0aG9kLiBJbnN0ZWFkIHNldCB0aGUgYGlnbm9yZUZyb21gIG9wdGlvbiBmb3IgZWFjaCBhY3Rpb25cbiAqIG9yIGZvciBgcG9pbnRlckV2ZW50c2BcbiAqXG4gKiBAZXhhbXBsZVxuICogaW50ZXJhY3QodGFyZ2V0dClcbiAqICAgLmRyYWdnYWJsZSh7XG4gKiAgICAgaWdub3JlRnJvbTogJ2lucHV0LCB0ZXh0YXJlYSwgYVtocmVmXScnLFxuICogICB9KVxuICogICAucG9pbnRlckV2ZW50cyh7XG4gKiAgICAgaWdub3JlRnJvbTogJ1tuby1wb2ludGVyXScsXG4gKiAgIH0pO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRWxlbWVudCB8IG51bGx9IFtuZXdWYWx1ZV0gYSBDU1Mgc2VsZWN0b3Igc3RyaW5nLCBhblxuICogRWxlbWVudCBvciBgbnVsbGAgdG8gbm90IGlnbm9yZSBhbnkgZWxlbWVudHNcbiAqIEByZXR1cm4ge3N0cmluZyB8IEVsZW1lbnQgfCBvYmplY3R9IFRoZSBjdXJyZW50IGlnbm9yZUZyb20gdmFsdWUgb3IgdGhpc1xuICogSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuaWdub3JlRnJvbSA9IHdhcm5PbmNlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICByZXR1cm4gdGhpcy5fYmFja0NvbXBhdE9wdGlvbignaWdub3JlRnJvbScsIG5ld1ZhbHVlKTtcbn0sICdJbnRlcmFjdGFibGUuaWdub3JlRm9ybSgpIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSBJbnRlcmFjdGJsZS5kcmFnZ2FibGUoe2lnbm9yZUZyb206IG5ld1ZhbHVlfSkuJyk7XG5cbi8qKlxuICogYGBganNcbiAqXG4gKiBAZGVwcmVjYXRlZFxuICogQSBkcmFnL3Jlc2l6ZS9nZXN0dXJlIGlzIHN0YXJ0ZWQgb25seSBJZiB0aGUgdGFyZ2V0IG9mIHRoZSBgbW91c2Vkb3duYCxcbiAqIGBwb2ludGVyZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50IG9yIGFueSBvZiBpdCdzIHBhcmVudHMgbWF0Y2ggdGhlIGdpdmVuXG4gKiBDU1Mgc2VsZWN0b3Igb3IgRWxlbWVudC5cbiAqXG4gKiBEb24ndCB1c2UgdGhpcyBtZXRob2QuIEluc3RlYWQgc2V0IHRoZSBgYWxsb3dGcm9tYCBvcHRpb24gZm9yIGVhY2ggYWN0aW9uXG4gKiBvciBmb3IgYHBvaW50ZXJFdmVudHNgXG4gKlxuICogQGV4YW1wbGVcbiAqIGludGVyYWN0KHRhcmdldHQpXG4gKiAgIC5yZXNpemFibGUoe1xuICogICAgIGFsbG93RnJvbTogJy5yZXNpemUtaGFuZGxlJyxcbiAqICAgLnBvaW50ZXJFdmVudHMoe1xuICogICAgIGFsbG93RnJvbTogJy5oYW5kbGUnLCxcbiAqICAgfSk7XG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBFbGVtZW50IHwgbnVsbH0gW25ld1ZhbHVlXSBhIENTUyBzZWxlY3RvciBzdHJpbmcsIGFuXG4gKiBFbGVtZW50IG9yIGBudWxsYCB0byBhbGxvdyBmcm9tIGFueSBlbGVtZW50XG4gKiBAcmV0dXJuIHtzdHJpbmcgfCBFbGVtZW50IHwgb2JqZWN0fSBUaGUgY3VycmVudCBhbGxvd0Zyb20gdmFsdWUgb3IgdGhpc1xuICogSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuYWxsb3dGcm9tID0gd2Fybk9uY2UoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9iYWNrQ29tcGF0T3B0aW9uKCdhbGxvd0Zyb20nLCBuZXdWYWx1ZSk7XG59LCAnSW50ZXJhY3RhYmxlLmFsbG93Rm9ybSgpIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSBJbnRlcmFjdGJsZS5kcmFnZ2FibGUoe2FsbG93RnJvbTogbmV3VmFsdWV9KS4nKTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS50ZXN0SWdub3JlID0gZnVuY3Rpb24gKGlnbm9yZUZyb20sIGludGVyYWN0YWJsZUVsZW1lbnQsIGVsZW1lbnQpIHtcbiAgaWYgKCFpZ25vcmVGcm9tIHx8ICFpcy5lbGVtZW50KGVsZW1lbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGlmIChpcy5zdHJpbmcoaWdub3JlRnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubWF0Y2hlc1VwVG8oZWxlbWVudCwgaWdub3JlRnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCk7XG4gIH1cbiAgZWxzZSBpZiAoaXMuZWxlbWVudChpZ25vcmVGcm9tKSkge1xuICAgIHJldHVybiBkb21VdGlscy5ub2RlQ29udGFpbnMoaWdub3JlRnJvbSwgZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RBbGxvdyA9IGZ1bmN0aW9uIChhbGxvd0Zyb20sIGludGVyYWN0YWJsZUVsZW1lbnQsIGVsZW1lbnQpIHtcbiAgaWYgKCFhbGxvd0Zyb20pIHsgcmV0dXJuIHRydWU7IH1cblxuICBpZiAoIWlzLmVsZW1lbnQoZWxlbWVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKGlzLnN0cmluZyhhbGxvd0Zyb20pKSB7XG4gICAgcmV0dXJuIGRvbVV0aWxzLm1hdGNoZXNVcFRvKGVsZW1lbnQsIGFsbG93RnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCk7XG4gIH1cbiAgZWxzZSBpZiAoaXMuZWxlbWVudChhbGxvd0Zyb20pKSB7XG4gICAgcmV0dXJuIGRvbVV0aWxzLm5vZGVDb250YWlucyhhbGxvd0Zyb20sIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS50ZXN0SWdub3JlQWxsb3cgPSBmdW5jdGlvbiAob3B0aW9ucywgaW50ZXJhY3RhYmxlRWxlbWVudCwgZXZlbnRUYXJnZXQpIHtcbiAgcmV0dXJuICghdGhpcy50ZXN0SWdub3JlKG9wdGlvbnMuaWdub3JlRnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZXZlbnRUYXJnZXQpXG4gICAgJiYgdGhpcy50ZXN0QWxsb3cob3B0aW9ucy5hbGxvd0Zyb20sIGludGVyYWN0YWJsZUVsZW1lbnQsIGV2ZW50VGFyZ2V0KSk7XG59O1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdCgnLnJlc2l6ZS1kcmFnJylcbiAqICAgLnJlc2l6YWJsZSh0cnVlKVxuICogICAuZHJhZ2dhYmxlKHRydWUpXG4gKiAgIC5hY3Rpb25DaGVja2VyKGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uKSB7XG4gKlxuICogICBpZiAoaW50ZXJhY3QubWF0Y2hlc1NlbGVjdG9yKGV2ZW50LnRhcmdldCwgJy5kcmFnLWhhbmRsZScpIHtcbiAqICAgICAvLyBmb3JjZSBkcmFnIHdpdGggaGFuZGxlIHRhcmdldFxuICogICAgIGFjdGlvbi5uYW1lID0gZHJhZztcbiAqICAgfVxuICogICBlbHNlIHtcbiAqICAgICAvLyByZXNpemUgZnJvbSB0aGUgdG9wIGFuZCByaWdodCBlZGdlc1xuICogICAgIGFjdGlvbi5uYW1lICA9ICdyZXNpemUnO1xuICogICAgIGFjdGlvbi5lZGdlcyA9IHsgdG9wOiB0cnVlLCByaWdodDogdHJ1ZSB9O1xuICogICB9XG4gKlxuICogICByZXR1cm4gYWN0aW9uO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBHZXRzIG9yIHNldHMgdGhlIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCBvblxuICogcG9pbnRlckRvd25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uIHwgbnVsbH0gW2NoZWNrZXJdIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgYSBwb2ludGVyIGV2ZW50LFxuICogZGVmYXVsdEFjdGlvbiBzdHJpbmcsIGludGVyYWN0YWJsZSwgZWxlbWVudCBhbmQgaW50ZXJhY3Rpb24gYXMgcGFyYW1ldGVyc1xuICogYW5kIHJldHVybnMgYW4gb2JqZWN0IHdpdGggbmFtZSBwcm9wZXJ0eSAnZHJhZycgJ3Jlc2l6ZScgb3IgJ2dlc3R1cmUnIGFuZFxuICogb3B0aW9uYWxseSBhbiBgZWRnZXNgIG9iamVjdCB3aXRoIGJvb2xlYW4gJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScgYW5kIHJpZ2h0XG4gKiBwcm9wcy5cbiAqIEByZXR1cm4ge0Z1bmN0aW9uIHwgSW50ZXJhY3RhYmxlfSBUaGUgY2hlY2tlciBmdW5jdGlvbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmFjdGlvbkNoZWNrZXIgPSBmdW5jdGlvbiAoY2hlY2tlcikge1xuICBpZiAoaXMuZnVuY3Rpb24oY2hlY2tlcikpIHtcbiAgICB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlciA9IGNoZWNrZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChjaGVja2VyID09PSBudWxsKSB7XG4gICAgZGVsZXRlIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXI7XG59O1xuXG4vKipcbiAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIHRoZSB0aGUgY3Vyc29yIHNob3VsZCBiZSBjaGFuZ2VkIGRlcGVuZGluZyBvbiB0aGVcbiAqIGFjdGlvbiB0aGF0IHdvdWxkIGJlIHBlcmZvcm1lZCBpZiB0aGUgbW91c2Ugd2VyZSBwcmVzc2VkIGFuZCBkcmFnZ2VkLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25ld1ZhbHVlXVxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnN0eWxlQ3Vyc29yID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmIChpcy5ib29sKG5ld1ZhbHVlKSkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvciA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAobmV3VmFsdWUgPT09IG51bGwpIHtcbiAgICBkZWxldGUgdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yO1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kZWZhdWx0QWN0aW9uQ2hlY2tlciA9IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpIHtcbiAgY29uc3QgcmVjdCA9IHRoaXMuZ2V0UmVjdChlbGVtZW50KTtcbiAgY29uc3QgYnV0dG9ucyA9IGV2ZW50LmJ1dHRvbnMgfHwgKHtcbiAgICAwOiAxLFxuICAgIDE6IDQsXG4gICAgMzogOCxcbiAgICA0OiAxNixcbiAgfSlbZXZlbnQuYnV0dG9uXTtcbiAgbGV0IGFjdGlvbiA9IG51bGw7XG5cbiAgZm9yIChjb25zdCBhY3Rpb25OYW1lIG9mIGFjdGlvbnMubmFtZXMpIHtcbiAgICAvLyBjaGVjayBtb3VzZUJ1dHRvbiBzZXR0aW5nIGlmIHRoZSBwb2ludGVyIGlzIGRvd25cbiAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93blxuICAgICAgICAmJiAvbW91c2V8cG9pbnRlci8udGVzdChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSlcbiAgICAgICAgJiYgKGJ1dHRvbnMgJiB0aGlzLm9wdGlvbnNbYWN0aW9uTmFtZV0ubW91c2VCdXR0b25zKSA9PT0gMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgYWN0aW9uID0gYWN0aW9uc1thY3Rpb25OYW1lXS5jaGVja2VyKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCBlbGVtZW50LCBpbnRlcmFjdGlvbiwgcmVjdCk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbiAgfVxufTtcblxuIiwiY29uc3QgcmFmICAgICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL3JhZicpO1xuY29uc3QgZ2V0V2luZG93ICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL3dpbmRvdycpLmdldFdpbmRvdztcbmNvbnN0IGlzICAgICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9pcycpO1xuY29uc3QgZG9tVXRpbHMgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2RvbVV0aWxzJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgICA9IHJlcXVpcmUoJy4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi9kZWZhdWx0T3B0aW9ucycpO1xuXG5jb25zdCBhdXRvU2Nyb2xsID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQgIDogZmFsc2UsXG4gICAgY29udGFpbmVyOiBudWxsLCAgICAgLy8gdGhlIGl0ZW0gdGhhdCBpcyBzY3JvbGxlZCAoV2luZG93IG9yIEhUTUxFbGVtZW50KVxuICAgIG1hcmdpbiAgIDogNjAsXG4gICAgc3BlZWQgICAgOiAzMDAsICAgICAgLy8gdGhlIHNjcm9sbCBzcGVlZCBpbiBwaXhlbHMgcGVyIHNlY29uZFxuICB9LFxuXG4gIGludGVyYWN0aW9uOiBudWxsLFxuICBpOiBudWxsLCAgICAvLyB0aGUgaGFuZGxlIHJldHVybmVkIGJ5IHdpbmRvdy5zZXRJbnRlcnZhbFxuICB4OiAwLCB5OiAwLCAvLyBEaXJlY3Rpb24gZWFjaCBwdWxzZSBpcyB0byBzY3JvbGwgaW5cblxuICBpc1Njcm9sbGluZzogZmFsc2UsXG4gIHByZXZUaW1lOiAwLFxuXG4gIHN0YXJ0OiBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICBhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICByYWYuY2FuY2VsKGF1dG9TY3JvbGwuaSk7XG5cbiAgICBhdXRvU2Nyb2xsLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XG4gICAgYXV0b1Njcm9sbC5wcmV2VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGF1dG9TY3JvbGwuaSA9IHJhZi5yZXF1ZXN0KGF1dG9TY3JvbGwuc2Nyb2xsKTtcbiAgfSxcblxuICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgYXV0b1Njcm9sbC5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgIHJhZi5jYW5jZWwoYXV0b1Njcm9sbC5pKTtcbiAgfSxcblxuICAvLyBzY3JvbGwgdGhlIHdpbmRvdyBieSB0aGUgdmFsdWVzIGluIHNjcm9sbC54L3lcbiAgc2Nyb2xsOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbYXV0b1Njcm9sbC5pbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5hdXRvU2Nyb2xsO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IGdldFdpbmRvdyhhdXRvU2Nyb2xsLmludGVyYWN0aW9uLmVsZW1lbnQpO1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIC8vIGNoYW5nZSBpbiB0aW1lIGluIHNlY29uZHNcbiAgICBjb25zdCBkdCA9IChub3cgLSBhdXRvU2Nyb2xsLnByZXZUaW1lKSAvIDEwMDA7XG4gICAgLy8gZGlzcGxhY2VtZW50XG4gICAgY29uc3QgcyA9IG9wdGlvbnMuc3BlZWQgKiBkdDtcblxuICAgIGlmIChzID49IDEpIHtcbiAgICAgIGlmIChpcy53aW5kb3coY29udGFpbmVyKSkge1xuICAgICAgICBjb250YWluZXIuc2Nyb2xsQnkoYXV0b1Njcm9sbC54ICogcywgYXV0b1Njcm9sbC55ICogcyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnNjcm9sbExlZnQgKz0gYXV0b1Njcm9sbC54ICogcztcbiAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCAgKz0gYXV0b1Njcm9sbC55ICogcztcbiAgICAgIH1cblxuICAgICAgYXV0b1Njcm9sbC5wcmV2VGltZSA9IG5vdztcbiAgICB9XG5cbiAgICBpZiAoYXV0b1Njcm9sbC5pc1Njcm9sbGluZykge1xuICAgICAgcmFmLmNhbmNlbChhdXRvU2Nyb2xsLmkpO1xuICAgICAgYXV0b1Njcm9sbC5pID0gcmFmLnJlcXVlc3QoYXV0b1Njcm9sbC5zY3JvbGwpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2s6IGZ1bmN0aW9uIChpbnRlcmFjdGFibGUsIGFjdGlvbk5hbWUpIHtcbiAgICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG5cbiAgICByZXR1cm4gb3B0aW9uc1thY3Rpb25OYW1lXS5hdXRvU2Nyb2xsICYmIG9wdGlvbnNbYWN0aW9uTmFtZV0uYXV0b1Njcm9sbC5lbmFibGVkO1xuICB9LFxuICBvbkludGVyYWN0aW9uTW92ZTogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIgfSkge1xuICAgIGlmICghKGludGVyYWN0aW9uLmludGVyYWN0aW5nKClcbiAgICAgICAgICAmJiBhdXRvU2Nyb2xsLmNoZWNrKGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGludGVyYWN0aW9uLnNpbXVsYXRpb24pIHtcbiAgICAgIGF1dG9TY3JvbGwueCA9IGF1dG9TY3JvbGwueSA9IDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHRvcDtcbiAgICBsZXQgcmlnaHQ7XG4gICAgbGV0IGJvdHRvbTtcbiAgICBsZXQgbGVmdDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5hdXRvU2Nyb2xsO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IGdldFdpbmRvdyhpbnRlcmFjdGlvbi5lbGVtZW50KTtcblxuICAgIGlmIChpcy53aW5kb3coY29udGFpbmVyKSkge1xuICAgICAgbGVmdCAgID0gcG9pbnRlci5jbGllbnRYIDwgYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICB0b3AgICAgPSBwb2ludGVyLmNsaWVudFkgPCBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIHJpZ2h0ICA9IHBvaW50ZXIuY2xpZW50WCA+IGNvbnRhaW5lci5pbm5lcldpZHRoICAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgYm90dG9tID0gcG9pbnRlci5jbGllbnRZID4gY29udGFpbmVyLmlubmVySGVpZ2h0IC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcmVjdCA9IGRvbVV0aWxzLmdldEVsZW1lbnRDbGllbnRSZWN0KGNvbnRhaW5lcik7XG5cbiAgICAgIGxlZnQgICA9IHBvaW50ZXIuY2xpZW50WCA8IHJlY3QubGVmdCAgICsgYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICB0b3AgICAgPSBwb2ludGVyLmNsaWVudFkgPCByZWN0LnRvcCAgICArIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgcmlnaHQgID0gcG9pbnRlci5jbGllbnRYID4gcmVjdC5yaWdodCAgLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIGJvdHRvbSA9IHBvaW50ZXIuY2xpZW50WSA+IHJlY3QuYm90dG9tIC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgfVxuXG4gICAgYXV0b1Njcm9sbC54ID0gKHJpZ2h0ID8gMTogbGVmdD8gLTE6IDApO1xuICAgIGF1dG9TY3JvbGwueSA9IChib3R0b20/IDE6ICB0b3A/IC0xOiAwKTtcblxuICAgIGlmICghYXV0b1Njcm9sbC5pc1Njcm9sbGluZykge1xuICAgICAgLy8gc2V0IHRoZSBhdXRvU2Nyb2xsIHByb3BlcnRpZXMgdG8gdGhvc2Ugb2YgdGhlIHRhcmdldFxuICAgICAgYXV0b1Njcm9sbC5tYXJnaW4gPSBvcHRpb25zLm1hcmdpbjtcbiAgICAgIGF1dG9TY3JvbGwuc3BlZWQgID0gb3B0aW9ucy5zcGVlZDtcblxuICAgICAgYXV0b1Njcm9sbC5zdGFydChpbnRlcmFjdGlvbik7XG4gICAgfVxuICB9LFxufTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcC1hY3RpdmUnLCBmdW5jdGlvbiAoKSB7XG4gIGF1dG9TY3JvbGwuc3RvcCgpO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1tb3ZlJywgYXV0b1Njcm9sbC5vbkludGVyYWN0aW9uTW92ZSk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5hdXRvU2Nyb2xsID0gYXV0b1Njcm9sbC5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBhdXRvU2Nyb2xsO1xuIiwiY29uc3QgeyB3aW5kb3cgfSA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG5cbmNvbnN0IHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xubGV0IGxhc3RUaW1lID0gMDtcbmxldCByZXF1ZXN0O1xubGV0IGNhbmNlbDtcblxuZm9yIChsZXQgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgeCsrKSB7XG4gIHJlcXVlc3QgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgY2FuY2VsID0gd2luZG93W3ZlbmRvcnNbeF0gKydDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xufVxuXG5pZiAoIXJlcXVlc3QpIHtcbiAgcmVxdWVzdCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGNvbnN0IGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICBjb25zdCBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lVG9DYWxsKTtcblxuICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgIHJldHVybiBpZDtcbiAgfTtcbn1cblxuaWYgKCFjYW5jZWwpIHtcbiAgY2FuY2VsID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlcXVlc3QsXG4gIGNhbmNlbCxcbn07XG4iLCJjb25zdCBhY3Rpb25zICAgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgYnJvd3NlciAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9icm93c2VyJyk7XG5jb25zdCBJbnRlcmFjdEV2ZW50ICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcbi8qKiBAbGVuZHMgSW50ZXJhY3RhYmxlICovXG5jb25zdCBJbnRlcmFjdGFibGUgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG4vLyBMZXNzIFByZWNpc2lvbiB3aXRoIHRvdWNoIGlucHV0XG5jb25zdCBkZWZhdWx0TWFyZ2luID0gYnJvd3Nlci5zdXBwb3J0c1RvdWNoIHx8IGJyb3dzZXIuc3VwcG9ydHNQb2ludGVyRXZlbnQ/IDIwOiAxMDtcblxuY29uc3QgcmVzaXplID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQgICAgIDogZmFsc2UsXG4gICAgbW91c2VCdXR0b25zOiBudWxsLFxuXG4gICAgb3JpZ2luICAgIDogbnVsbCxcbiAgICBzbmFwICAgICAgOiBudWxsLFxuICAgIHJlc3RyaWN0ICA6IG51bGwsXG4gICAgaW5lcnRpYSAgIDogbnVsbCxcbiAgICBhdXRvU2Nyb2xsOiBudWxsLFxuXG4gICAgc3F1YXJlOiBmYWxzZSxcbiAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICBheGlzOiAneHknLFxuXG4gICAgLy8gdXNlIGRlZmF1bHQgbWFyZ2luXG4gICAgbWFyZ2luOiBOYU4sXG5cbiAgICAvLyBvYmplY3Qgd2l0aCBwcm9wcyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20gd2hpY2ggYXJlXG4gICAgLy8gdHJ1ZS9mYWxzZSB2YWx1ZXMgdG8gcmVzaXplIHdoZW4gdGhlIHBvaW50ZXIgaXMgb3ZlciB0aGF0IGVkZ2UsXG4gICAgLy8gQ1NTIHNlbGVjdG9ycyB0byBtYXRjaCB0aGUgaGFuZGxlcyBmb3IgZWFjaCBkaXJlY3Rpb25cbiAgICAvLyBvciB0aGUgRWxlbWVudHMgZm9yIGVhY2ggaGFuZGxlXG4gICAgZWRnZXM6IG51bGwsXG5cbiAgICAvLyBhIHZhbHVlIG9mICdub25lJyB3aWxsIGxpbWl0IHRoZSByZXNpemUgcmVjdCB0byBhIG1pbmltdW0gb2YgMHgwXG4gICAgLy8gJ25lZ2F0ZScgd2lsbCBhbG93IHRoZSByZWN0IHRvIGhhdmUgbmVnYXRpdmUgd2lkdGgvaGVpZ2h0XG4gICAgLy8gJ3JlcG9zaXRpb24nIHdpbGwga2VlcCB0aGUgd2lkdGgvaGVpZ2h0IHBvc2l0aXZlIGJ5IHN3YXBwaW5nXG4gICAgLy8gdGhlIHRvcCBhbmQgYm90dG9tIGVkZ2VzIGFuZC9vciBzd2FwcGluZyB0aGUgbGVmdCBhbmQgcmlnaHQgZWRnZXNcbiAgICBpbnZlcnQ6ICdub25lJyxcbiAgfSxcblxuICBjaGVja2VyOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgaW50ZXJhY3Rpb24sIHJlY3QpIHtcbiAgICBpZiAoIXJlY3QpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgIGNvbnN0IHBhZ2UgPSB1dGlscy5leHRlbmQoe30sIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlKTtcbiAgICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG5cbiAgICBpZiAob3B0aW9ucy5yZXNpemUuZW5hYmxlZCkge1xuICAgICAgY29uc3QgcmVzaXplT3B0aW9ucyA9IG9wdGlvbnMucmVzaXplO1xuICAgICAgY29uc3QgcmVzaXplRWRnZXMgPSB7IGxlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIHRvcDogZmFsc2UsIGJvdHRvbTogZmFsc2UgfTtcblxuICAgICAgLy8gaWYgdXNpbmcgcmVzaXplLmVkZ2VzXG4gICAgICBpZiAodXRpbHMuaXMub2JqZWN0KHJlc2l6ZU9wdGlvbnMuZWRnZXMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWRnZSBpbiByZXNpemVFZGdlcykge1xuICAgICAgICAgIHJlc2l6ZUVkZ2VzW2VkZ2VdID0gY2hlY2tSZXNpemVFZGdlKGVkZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplT3B0aW9ucy5lZGdlc1tlZGdlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLl9ldmVudFRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplT3B0aW9ucy5tYXJnaW4gfHwgZGVmYXVsdE1hcmdpbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXNpemVFZGdlcy5sZWZ0ID0gcmVzaXplRWRnZXMubGVmdCAmJiAhcmVzaXplRWRnZXMucmlnaHQ7XG4gICAgICAgIHJlc2l6ZUVkZ2VzLnRvcCAgPSByZXNpemVFZGdlcy50b3AgICYmICFyZXNpemVFZGdlcy5ib3R0b207XG5cbiAgICAgICAgaWYgKHJlc2l6ZUVkZ2VzLmxlZnQgfHwgcmVzaXplRWRnZXMucmlnaHQgfHwgcmVzaXplRWRnZXMudG9wIHx8IHJlc2l6ZUVkZ2VzLmJvdHRvbSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiAncmVzaXplJyxcbiAgICAgICAgICAgIGVkZ2VzOiByZXNpemVFZGdlcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgcmlnaHQgID0gb3B0aW9ucy5yZXNpemUuYXhpcyAhPT0gJ3knICYmIHBhZ2UueCA+IChyZWN0LnJpZ2h0ICAtIGRlZmF1bHRNYXJnaW4pO1xuICAgICAgICBjb25zdCBib3R0b20gPSBvcHRpb25zLnJlc2l6ZS5heGlzICE9PSAneCcgJiYgcGFnZS55ID4gKHJlY3QuYm90dG9tIC0gZGVmYXVsdE1hcmdpbik7XG5cbiAgICAgICAgaWYgKHJpZ2h0IHx8IGJvdHRvbSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiAncmVzaXplJyxcbiAgICAgICAgICAgIGF4ZXM6IChyaWdodD8gJ3gnIDogJycpICsgKGJvdHRvbT8gJ3knIDogJycpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBjdXJzb3JzOiAoYnJvd3Nlci5pc0llOSA/IHtcbiAgICB4IDogJ2UtcmVzaXplJyxcbiAgICB5IDogJ3MtcmVzaXplJyxcbiAgICB4eTogJ3NlLXJlc2l6ZScsXG5cbiAgICB0b3AgICAgICAgIDogJ24tcmVzaXplJyxcbiAgICBsZWZ0ICAgICAgIDogJ3ctcmVzaXplJyxcbiAgICBib3R0b20gICAgIDogJ3MtcmVzaXplJyxcbiAgICByaWdodCAgICAgIDogJ2UtcmVzaXplJyxcbiAgICB0b3BsZWZ0ICAgIDogJ3NlLXJlc2l6ZScsXG4gICAgYm90dG9tcmlnaHQ6ICdzZS1yZXNpemUnLFxuICAgIHRvcHJpZ2h0ICAgOiAnbmUtcmVzaXplJyxcbiAgICBib3R0b21sZWZ0IDogJ25lLXJlc2l6ZScsXG4gIH0gOiB7XG4gICAgeCA6ICdldy1yZXNpemUnLFxuICAgIHkgOiAnbnMtcmVzaXplJyxcbiAgICB4eTogJ253c2UtcmVzaXplJyxcblxuICAgIHRvcCAgICAgICAgOiAnbnMtcmVzaXplJyxcbiAgICBsZWZ0ICAgICAgIDogJ2V3LXJlc2l6ZScsXG4gICAgYm90dG9tICAgICA6ICducy1yZXNpemUnLFxuICAgIHJpZ2h0ICAgICAgOiAnZXctcmVzaXplJyxcbiAgICB0b3BsZWZ0ICAgIDogJ253c2UtcmVzaXplJyxcbiAgICBib3R0b21yaWdodDogJ253c2UtcmVzaXplJyxcbiAgICB0b3ByaWdodCAgIDogJ25lc3ctcmVzaXplJyxcbiAgICBib3R0b21sZWZ0IDogJ25lc3ctcmVzaXplJyxcbiAgfSksXG5cbiAgZ2V0Q3Vyc29yOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvbi5heGlzKSB7XG4gICAgICByZXR1cm4gcmVzaXplLmN1cnNvcnNbYWN0aW9uLm5hbWUgKyBhY3Rpb24uYXhpc107XG4gICAgfVxuICAgIGVsc2UgaWYgKGFjdGlvbi5lZGdlcykge1xuICAgICAgbGV0IGN1cnNvcktleSA9ICcnO1xuICAgICAgY29uc3QgZWRnZU5hbWVzID0gWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgaWYgKGFjdGlvbi5lZGdlc1tlZGdlTmFtZXNbaV1dKSB7XG4gICAgICAgICAgY3Vyc29yS2V5ICs9IGVkZ2VOYW1lc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzaXplLmN1cnNvcnNbY3Vyc29yS2V5XTtcbiAgICB9XG4gIH0sXG59O1xuXG4vLyByZXNpemVzdGFydFxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoeyBpRXZlbnQsIGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKGlFdmVudC50eXBlICE9PSAncmVzaXplc3RhcnQnIHx8ICFpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHN0YXJ0UmVjdCA9IGludGVyYWN0aW9uLnRhcmdldC5nZXRSZWN0KGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICBjb25zdCByZXNpemVPcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMucmVzaXplO1xuXG4gIC8qXG4gICAqIFdoZW4gdXNpbmcgdGhlIGByZXNpemFibGUuc3F1YXJlYCBvciBgcmVzaXphYmxlLnByZXNlcnZlQXNwZWN0UmF0aW9gIG9wdGlvbnMsIHJlc2l6aW5nIGZyb20gb25lIGVkZ2VcbiAgICogd2lsbCBhZmZlY3QgYW5vdGhlci4gRS5nLiB3aXRoIGByZXNpemFibGUuc3F1YXJlYCwgcmVzaXppbmcgdG8gbWFrZSB0aGUgcmlnaHQgZWRnZSBsYXJnZXIgd2lsbCBtYWtlXG4gICAqIHRoZSBib3R0b20gZWRnZSBsYXJnZXIgYnkgdGhlIHNhbWUgYW1vdW50LiBXZSBjYWxsIHRoZXNlICdsaW5rZWQnIGVkZ2VzLiBBbnkgbGlua2VkIGVkZ2VzIHdpbGwgZGVwZW5kXG4gICAqIG9uIHRoZSBhY3RpdmUgZWRnZXMgYW5kIHRoZSBlZGdlIGJlaW5nIGludGVyYWN0ZWQgd2l0aC5cbiAgICovXG4gIGlmIChyZXNpemVPcHRpb25zLnNxdWFyZSB8fCByZXNpemVPcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8pIHtcbiAgICBjb25zdCBsaW5rZWRFZGdlcyA9IHV0aWxzLmV4dGVuZCh7fSwgaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXMpO1xuXG4gICAgbGlua2VkRWRnZXMudG9wICAgID0gbGlua2VkRWRnZXMudG9wICAgIHx8IChsaW5rZWRFZGdlcy5sZWZ0ICAgJiYgIWxpbmtlZEVkZ2VzLmJvdHRvbSk7XG4gICAgbGlua2VkRWRnZXMubGVmdCAgID0gbGlua2VkRWRnZXMubGVmdCAgIHx8IChsaW5rZWRFZGdlcy50b3AgICAgJiYgIWxpbmtlZEVkZ2VzLnJpZ2h0ICk7XG4gICAgbGlua2VkRWRnZXMuYm90dG9tID0gbGlua2VkRWRnZXMuYm90dG9tIHx8IChsaW5rZWRFZGdlcy5yaWdodCAgJiYgIWxpbmtlZEVkZ2VzLnRvcCAgICk7XG4gICAgbGlua2VkRWRnZXMucmlnaHQgID0gbGlua2VkRWRnZXMucmlnaHQgIHx8IChsaW5rZWRFZGdlcy5ib3R0b20gJiYgIWxpbmtlZEVkZ2VzLmxlZnQgICk7XG5cbiAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5fbGlua2VkRWRnZXMgPSBsaW5rZWRFZGdlcztcbiAgfVxuICBlbHNlIHtcbiAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5fbGlua2VkRWRnZXMgPSBudWxsO1xuICB9XG5cbiAgLy8gaWYgdXNpbmcgYHJlc2l6YWJsZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCBvcHRpb24sIHJlY29yZCBhc3BlY3QgcmF0aW8gYXQgdGhlIHN0YXJ0IG9mIHRoZSByZXNpemVcbiAgaWYgKHJlc2l6ZU9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbykge1xuICAgIGludGVyYWN0aW9uLnJlc2l6ZVN0YXJ0QXNwZWN0UmF0aW8gPSBzdGFydFJlY3Qud2lkdGggLyBzdGFydFJlY3QuaGVpZ2h0O1xuICB9XG5cbiAgaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMgPSB7XG4gICAgc3RhcnQgICAgIDogc3RhcnRSZWN0LFxuICAgIGN1cnJlbnQgICA6IHV0aWxzLmV4dGVuZCh7fSwgc3RhcnRSZWN0KSxcbiAgICBpbnZlcnRlZCAgOiB1dGlscy5leHRlbmQoe30sIHN0YXJ0UmVjdCksXG4gICAgcHJldmlvdXMgIDogdXRpbHMuZXh0ZW5kKHt9LCBzdGFydFJlY3QpLFxuICAgIGRlbHRhICAgICA6IHtcbiAgICAgIGxlZnQ6IDAsIHJpZ2h0IDogMCwgd2lkdGggOiAwLFxuICAgICAgdG9wIDogMCwgYm90dG9tOiAwLCBoZWlnaHQ6IDAsXG4gICAgfSxcbiAgfTtcblxuICBpRXZlbnQucmVjdCA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmludmVydGVkO1xuICBpRXZlbnQuZGVsdGFSZWN0ID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuZGVsdGE7XG59KTtcblxuLy8gcmVzaXplbW92ZVxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoeyBpRXZlbnQsIHBoYXNlLCBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChwaGFzZSAhPT0gJ21vdmUnIHx8ICFpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcykgeyByZXR1cm47IH1cblxuICBjb25zdCByZXNpemVPcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMucmVzaXplO1xuICBjb25zdCBpbnZlcnQgPSByZXNpemVPcHRpb25zLmludmVydDtcbiAgY29uc3QgaW52ZXJ0aWJsZSA9IGludmVydCA9PT0gJ3JlcG9zaXRpb24nIHx8IGludmVydCA9PT0gJ25lZ2F0ZSc7XG5cbiAgbGV0IGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgY29uc3Qgc3RhcnQgICAgICA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLnN0YXJ0O1xuICBjb25zdCBjdXJyZW50ICAgID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuY3VycmVudDtcbiAgY29uc3QgaW52ZXJ0ZWQgICA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmludmVydGVkO1xuICBjb25zdCBkZWx0YSAgICAgID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuZGVsdGE7XG4gIGNvbnN0IHByZXZpb3VzICAgPSB1dGlscy5leHRlbmQoaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMucHJldmlvdXMsIGludmVydGVkKTtcbiAgY29uc3Qgb3JpZ2luYWxFZGdlcyA9IGVkZ2VzO1xuXG4gIGxldCBkeCA9IGlFdmVudC5keDtcbiAgbGV0IGR5ID0gaUV2ZW50LmR5O1xuXG4gIGlmIChyZXNpemVPcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8gfHwgcmVzaXplT3B0aW9ucy5zcXVhcmUpIHtcbiAgICAvLyBgcmVzaXplLnByZXNlcnZlQXNwZWN0UmF0aW9gIHRha2VzIHByZWNlZGVuY2Ugb3ZlciBgcmVzaXplLnNxdWFyZWBcbiAgICBjb25zdCBzdGFydEFzcGVjdFJhdGlvID0gcmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvXG4gICAgICA/IGludGVyYWN0aW9uLnJlc2l6ZVN0YXJ0QXNwZWN0UmF0aW9cbiAgICAgIDogMTtcblxuICAgIGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuX2xpbmtlZEVkZ2VzO1xuXG4gICAgaWYgKChvcmlnaW5hbEVkZ2VzLmxlZnQgJiYgb3JpZ2luYWxFZGdlcy5ib3R0b20pXG4gICAgICAgIHx8IChvcmlnaW5hbEVkZ2VzLnJpZ2h0ICYmIG9yaWdpbmFsRWRnZXMudG9wKSkge1xuICAgICAgZHkgPSAtZHggLyBzdGFydEFzcGVjdFJhdGlvO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLmxlZnQgfHwgb3JpZ2luYWxFZGdlcy5yaWdodCApIHsgZHkgPSBkeCAvIHN0YXJ0QXNwZWN0UmF0aW87IH1cbiAgICBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLnRvcCAgfHwgb3JpZ2luYWxFZGdlcy5ib3R0b20pIHsgZHggPSBkeSAqIHN0YXJ0QXNwZWN0UmF0aW87IH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgJ2N1cnJlbnQnIHJlY3Qgd2l0aG91dCBtb2RpZmljYXRpb25zXG4gIGlmIChlZGdlcy50b3AgICApIHsgY3VycmVudC50b3AgICAgKz0gZHk7IH1cbiAgaWYgKGVkZ2VzLmJvdHRvbSkgeyBjdXJyZW50LmJvdHRvbSArPSBkeTsgfVxuICBpZiAoZWRnZXMubGVmdCAgKSB7IGN1cnJlbnQubGVmdCAgICs9IGR4OyB9XG4gIGlmIChlZGdlcy5yaWdodCApIHsgY3VycmVudC5yaWdodCAgKz0gZHg7IH1cblxuICBpZiAoaW52ZXJ0aWJsZSkge1xuICAgIC8vIGlmIGludmVydGlibGUsIGNvcHkgdGhlIGN1cnJlbnQgcmVjdFxuICAgIHV0aWxzLmV4dGVuZChpbnZlcnRlZCwgY3VycmVudCk7XG5cbiAgICBpZiAoaW52ZXJ0ID09PSAncmVwb3NpdGlvbicpIHtcbiAgICAgIC8vIHN3YXAgZWRnZSB2YWx1ZXMgaWYgbmVjZXNzYXJ5IHRvIGtlZXAgd2lkdGgvaGVpZ2h0IHBvc2l0aXZlXG4gICAgICBsZXQgc3dhcDtcblxuICAgICAgaWYgKGludmVydGVkLnRvcCA+IGludmVydGVkLmJvdHRvbSkge1xuICAgICAgICBzd2FwID0gaW52ZXJ0ZWQudG9wO1xuXG4gICAgICAgIGludmVydGVkLnRvcCA9IGludmVydGVkLmJvdHRvbTtcbiAgICAgICAgaW52ZXJ0ZWQuYm90dG9tID0gc3dhcDtcbiAgICAgIH1cbiAgICAgIGlmIChpbnZlcnRlZC5sZWZ0ID4gaW52ZXJ0ZWQucmlnaHQpIHtcbiAgICAgICAgc3dhcCA9IGludmVydGVkLmxlZnQ7XG5cbiAgICAgICAgaW52ZXJ0ZWQubGVmdCA9IGludmVydGVkLnJpZ2h0O1xuICAgICAgICBpbnZlcnRlZC5yaWdodCA9IHN3YXA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGlmIG5vdCBpbnZlcnRpYmxlLCByZXN0cmljdCB0byBtaW5pbXVtIG9mIDB4MCByZWN0XG4gICAgaW52ZXJ0ZWQudG9wICAgID0gTWF0aC5taW4oY3VycmVudC50b3AsIHN0YXJ0LmJvdHRvbSk7XG4gICAgaW52ZXJ0ZWQuYm90dG9tID0gTWF0aC5tYXgoY3VycmVudC5ib3R0b20sIHN0YXJ0LnRvcCk7XG4gICAgaW52ZXJ0ZWQubGVmdCAgID0gTWF0aC5taW4oY3VycmVudC5sZWZ0LCBzdGFydC5yaWdodCk7XG4gICAgaW52ZXJ0ZWQucmlnaHQgID0gTWF0aC5tYXgoY3VycmVudC5yaWdodCwgc3RhcnQubGVmdCk7XG4gIH1cblxuICBpbnZlcnRlZC53aWR0aCAgPSBpbnZlcnRlZC5yaWdodCAgLSBpbnZlcnRlZC5sZWZ0O1xuICBpbnZlcnRlZC5oZWlnaHQgPSBpbnZlcnRlZC5ib3R0b20gLSBpbnZlcnRlZC50b3AgO1xuXG4gIGZvciAoY29uc3QgZWRnZSBpbiBpbnZlcnRlZCkge1xuICAgIGRlbHRhW2VkZ2VdID0gaW52ZXJ0ZWRbZWRnZV0gLSBwcmV2aW91c1tlZGdlXTtcbiAgfVxuXG4gIGlFdmVudC5lZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuICBpRXZlbnQucmVjdCA9IGludmVydGVkO1xuICBpRXZlbnQuZGVsdGFSZWN0ID0gZGVsdGE7XG59KTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoZWxlbWVudCkucmVzaXphYmxlKHtcbiAqICAgb25zdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqXG4gKiAgIGVkZ2VzOiB7XG4gKiAgICAgdG9wICAgOiB0cnVlLCAgICAgICAvLyBVc2UgcG9pbnRlciBjb29yZHMgdG8gY2hlY2sgZm9yIHJlc2l6ZS5cbiAqICAgICBsZWZ0ICA6IGZhbHNlLCAgICAgIC8vIERpc2FibGUgcmVzaXppbmcgZnJvbSBsZWZ0IGVkZ2UuXG4gKiAgICAgYm90dG9tOiAnLnJlc2l6ZS1zJywvLyBSZXNpemUgaWYgcG9pbnRlciB0YXJnZXQgbWF0Y2hlcyBzZWxlY3RvclxuICogICAgIHJpZ2h0IDogaGFuZGxlRWwgICAgLy8gUmVzaXplIGlmIHBvaW50ZXIgdGFyZ2V0IGlzIHRoZSBnaXZlbiBFbGVtZW50XG4gKiAgIH0sXG4gKlxuICogICAgIC8vIFdpZHRoIGFuZCBoZWlnaHQgY2FuIGJlIGFkanVzdGVkIGluZGVwZW5kZW50bHkuIFdoZW4gYHRydWVgLCB3aWR0aCBhbmRcbiAqICAgICAvLyBoZWlnaHQgYXJlIGFkanVzdGVkIGF0IGEgMToxIHJhdGlvLlxuICogICAgIHNxdWFyZTogZmFsc2UsXG4gKlxuICogICAgIC8vIFdpZHRoIGFuZCBoZWlnaHQgY2FuIGJlIGFkanVzdGVkIGluZGVwZW5kZW50bHkuIFdoZW4gYHRydWVgLCB3aWR0aCBhbmRcbiAqICAgICAvLyBoZWlnaHQgbWFpbnRhaW4gdGhlIGFzcGVjdCByYXRpbyB0aGV5IGhhZCB3aGVuIHJlc2l6aW5nIHN0YXJ0ZWQuXG4gKiAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogZmFsc2UsXG4gKlxuICogICAvLyBhIHZhbHVlIG9mICdub25lJyB3aWxsIGxpbWl0IHRoZSByZXNpemUgcmVjdCB0byBhIG1pbmltdW0gb2YgMHgwXG4gKiAgIC8vICduZWdhdGUnIHdpbGwgYWxsb3cgdGhlIHJlY3QgdG8gaGF2ZSBuZWdhdGl2ZSB3aWR0aC9oZWlnaHRcbiAqICAgLy8gJ3JlcG9zaXRpb24nIHdpbGwga2VlcCB0aGUgd2lkdGgvaGVpZ2h0IHBvc2l0aXZlIGJ5IHN3YXBwaW5nXG4gKiAgIC8vIHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcyBhbmQvb3Igc3dhcHBpbmcgdGhlIGxlZnQgYW5kIHJpZ2h0IGVkZ2VzXG4gKiAgIGludmVydDogJ25vbmUnIHx8ICduZWdhdGUnIHx8ICdyZXBvc2l0aW9uJ1xuICpcbiAqICAgLy8gbGltaXQgbXVsdGlwbGUgcmVzaXplcy5cbiAqICAgLy8gU2VlIHRoZSBleHBsYW5hdGlvbiBpbiB0aGUge0BsaW5rIEludGVyYWN0YWJsZS5kcmFnZ2FibGV9IGV4YW1wbGVcbiAqICAgbWF4OiBJbmZpbml0eSxcbiAqICAgbWF4UGVyRWxlbWVudDogMSxcbiAqIH0pO1xuICpcbiAqIHZhciBpc1Jlc2l6ZWFibGUgPSBpbnRlcmFjdChlbGVtZW50KS5yZXNpemFibGUoKTtcbiAqIGBgYFxuICpcbiAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHJlc2l6ZSBhY3Rpb25zIGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdH0gW29wdGlvbnNdIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnRcbiAqIGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiByZXNpemUgZXZlbnRzIChvYmplY3QgbWFrZXMgdGhlIEludGVyYWN0YWJsZVxuICogcmVzaXphYmxlKVxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gQSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBjYW4gYmUgdGhlXG4gKiB0YXJnZXQgb2YgcmVzaXplIGVsZW1lbnRzLCBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnJlc2l6YWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVzaXplLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcbiAgICB0aGlzLnNldFBlckFjdGlvbigncmVzaXplJywgb3B0aW9ucyk7XG4gICAgdGhpcy5zZXRPbkV2ZW50cygncmVzaXplJywgb3B0aW9ucyk7XG5cbiAgICBpZiAoL154JHxeeSR8Xnh5JC8udGVzdChvcHRpb25zLmF4aXMpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmVzaXplLmF4aXMgPSBvcHRpb25zLmF4aXM7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9wdGlvbnMuYXhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5heGlzID0gZGVmYXVsdE9wdGlvbnMucmVzaXplLmF4aXM7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvID0gb3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvO1xuICAgIH1cbiAgICBlbHNlIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMuc3F1YXJlKSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5zcXVhcmUgPSBvcHRpb25zLnNxdWFyZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5yZXNpemUuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMub25yZXNpemVzdGFydCA9IHRoaXMub25yZXNpemVzdGFydCA9IHRoaXMub25yZXNpemVlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybiB0aGlzLm9wdGlvbnMucmVzaXplO1xufTtcblxuZnVuY3Rpb24gY2hlY2tSZXNpemVFZGdlIChuYW1lLCB2YWx1ZSwgcGFnZSwgZWxlbWVudCwgaW50ZXJhY3RhYmxlRWxlbWVudCwgcmVjdCwgbWFyZ2luKSB7XG4gIC8vIGZhbHNlLCAnJywgdW5kZWZpbmVkLCBudWxsXG4gIGlmICghdmFsdWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gdHJ1ZSB2YWx1ZSwgdXNlIHBvaW50ZXIgY29vcmRzIGFuZCBlbGVtZW50IHJlY3RcbiAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgLy8gaWYgZGltZW5zaW9ucyBhcmUgbmVnYXRpdmUsIFwic3dpdGNoXCIgZWRnZXNcbiAgICBjb25zdCB3aWR0aCAgPSB1dGlscy5pcy5udW1iZXIocmVjdC53aWR0aCApPyByZWN0LndpZHRoICA6IHJlY3QucmlnaHQgIC0gcmVjdC5sZWZ0O1xuICAgIGNvbnN0IGhlaWdodCA9IHV0aWxzLmlzLm51bWJlcihyZWN0LmhlaWdodCk/IHJlY3QuaGVpZ2h0IDogcmVjdC5ib3R0b20gLSByZWN0LnRvcCA7XG5cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICBpZiAgICAgIChuYW1lID09PSAnbGVmdCcgKSB7IG5hbWUgPSAncmlnaHQnOyB9XG4gICAgICBlbHNlIGlmIChuYW1lID09PSAncmlnaHQnKSB7IG5hbWUgPSAnbGVmdCcgOyB9XG4gICAgfVxuICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICBpZiAgICAgIChuYW1lID09PSAndG9wJyAgICkgeyBuYW1lID0gJ2JvdHRvbSc7IH1cbiAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdib3R0b20nKSB7IG5hbWUgPSAndG9wJyAgIDsgfVxuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnbGVmdCcgICkgeyByZXR1cm4gcGFnZS54IDwgKCh3aWR0aCAgPj0gMD8gcmVjdC5sZWZ0OiByZWN0LnJpZ2h0ICkgKyBtYXJnaW4pOyB9XG4gICAgaWYgKG5hbWUgPT09ICd0b3AnICAgKSB7IHJldHVybiBwYWdlLnkgPCAoKGhlaWdodCA+PSAwPyByZWN0LnRvcCA6IHJlY3QuYm90dG9tKSArIG1hcmdpbik7IH1cblxuICAgIGlmIChuYW1lID09PSAncmlnaHQnICkgeyByZXR1cm4gcGFnZS54ID4gKCh3aWR0aCAgPj0gMD8gcmVjdC5yaWdodCA6IHJlY3QubGVmdCkgLSBtYXJnaW4pOyB9XG4gICAgaWYgKG5hbWUgPT09ICdib3R0b20nKSB7IHJldHVybiBwYWdlLnkgPiAoKGhlaWdodCA+PSAwPyByZWN0LmJvdHRvbTogcmVjdC50b3AgKSAtIG1hcmdpbik7IH1cbiAgfVxuXG4gIC8vIHRoZSByZW1haW5pbmcgY2hlY2tzIHJlcXVpcmUgYW4gZWxlbWVudFxuICBpZiAoIXV0aWxzLmlzLmVsZW1lbnQoZWxlbWVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcmV0dXJuIHV0aWxzLmlzLmVsZW1lbnQodmFsdWUpXG4gIC8vIHRoZSB2YWx1ZSBpcyBhbiBlbGVtZW50IHRvIHVzZSBhcyBhIHJlc2l6ZSBoYW5kbGVcbiAgICA/IHZhbHVlID09PSBlbGVtZW50XG4gICAgLy8gb3RoZXJ3aXNlIGNoZWNrIGlmIGVsZW1lbnQgbWF0Y2hlcyB2YWx1ZSBhcyBzZWxlY3RvclxuICAgIDogdXRpbHMubWF0Y2hlc1VwVG8oZWxlbWVudCwgdmFsdWUsIGludGVyYWN0YWJsZUVsZW1lbnQpO1xufVxuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24ucmVzaXplQXhlcyA9ICd4eSc7XG59KTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCdzZXQtZGVsdGEnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgaUV2ZW50LCBhY3Rpb24gfSkge1xuICBpZiAoYWN0aW9uICE9PSAncmVzaXplJyB8fCAhaW50ZXJhY3Rpb24ucmVzaXplQXhlcykgeyByZXR1cm47IH1cblxuICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMucmVzaXplLnNxdWFyZSkge1xuICAgIGlmIChpbnRlcmFjdGlvbi5yZXNpemVBeGVzID09PSAneScpIHtcbiAgICAgIGlFdmVudC5keCA9IGlFdmVudC5keTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpRXZlbnQuZHkgPSBpRXZlbnQuZHg7XG4gICAgfVxuICAgIGlFdmVudC5heGVzID0gJ3h5JztcbiAgfVxuICBlbHNlIHtcbiAgICBpRXZlbnQuYXhlcyA9IGludGVyYWN0aW9uLnJlc2l6ZUF4ZXM7XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24ucmVzaXplQXhlcyA9PT0gJ3gnKSB7XG4gICAgICBpRXZlbnQuZHkgPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnRlcmFjdGlvbi5yZXNpemVBeGVzID09PSAneScpIHtcbiAgICAgIGlFdmVudC5keCA9IDA7XG4gICAgfVxuICB9XG59KTtcblxuYWN0aW9ucy5yZXNpemUgPSByZXNpemU7XG5hY3Rpb25zLm5hbWVzLnB1c2goJ3Jlc2l6ZScpO1xudXRpbHMubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIFtcbiAgJ3Jlc2l6ZXN0YXJ0JyxcbiAgJ3Jlc2l6ZW1vdmUnLFxuICAncmVzaXplaW5lcnRpYXN0YXJ0JyxcbiAgJ3Jlc2l6ZWluZXJ0aWFyZXN1bWUnLFxuICAncmVzaXplZW5kJyxcbl0pO1xuYWN0aW9ucy5tZXRob2REaWN0LnJlc2l6ZSA9ICdyZXNpemFibGUnO1xuXG5kZWZhdWx0T3B0aW9ucy5yZXNpemUgPSByZXNpemUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzaXplO1xuIiwiY29uc3QgYWN0aW9ucyAgICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IEludGVyYWN0RXZlbnQgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuY29uc3QgSW50ZXJhY3RhYmxlICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxuY29uc3QgZ2VzdHVyZSA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkIDogZmFsc2UsXG4gICAgb3JpZ2luICA6IG51bGwsXG4gICAgcmVzdHJpY3Q6IG51bGwsXG4gIH0sXG5cbiAgY2hlY2tlcjogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uKSB7XG4gICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJZHMubGVuZ3RoID49IDIpIHtcbiAgICAgIHJldHVybiB7IG5hbWU6ICdnZXN0dXJlJyB9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGdldEN1cnNvcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnJztcbiAgfSxcbn07XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKHsgaUV2ZW50LCBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ2dlc3R1cmVzdGFydCcpIHsgcmV0dXJuOyB9XG4gIGlFdmVudC5kcyA9IDA7XG5cbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydERpc3RhbmNlID0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2RGlzdGFuY2UgPSBpRXZlbnQuZGlzdGFuY2U7XG4gIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnRBbmdsZSA9IGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlID0gaUV2ZW50LmFuZ2xlO1xuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnNjYWxlID0gMTtcbn0pO1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uICh7IGlFdmVudCwgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdnZXN0dXJlbW92ZScpIHsgcmV0dXJuOyB9XG5cbiAgaUV2ZW50LmRzID0gaUV2ZW50LnNjYWxlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5zY2FsZTtcblxuICBpbnRlcmFjdGlvbi50YXJnZXQuZmlyZShpRXZlbnQpO1xuXG4gIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlID0gaUV2ZW50LmFuZ2xlO1xuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZEaXN0YW5jZSA9IGlFdmVudC5kaXN0YW5jZTtcblxuICBpZiAoaUV2ZW50LnNjYWxlICE9PSBJbmZpbml0eVxuICAgICAgJiYgaUV2ZW50LnNjYWxlICE9PSBudWxsXG4gICAgICAmJiBpRXZlbnQuc2NhbGUgIT09IHVuZGVmaW5lZFxuICAgICAgJiYgIWlzTmFOKGlFdmVudC5zY2FsZSkpIHtcblxuICAgIGludGVyYWN0aW9uLmdlc3R1cmUuc2NhbGUgPSBpRXZlbnQuc2NhbGU7XG4gIH1cbn0pO1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdChlbGVtZW50KS5nZXN0dXJhYmxlKHtcbiAqICAgICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICAgIG9ubW92ZSA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqXG4gKiAgICAgLy8gbGltaXQgbXVsdGlwbGUgZ2VzdHVyZXMuXG4gKiAgICAgLy8gU2VlIHRoZSBleHBsYW5hdGlvbiBpbiB7QGxpbmsgSW50ZXJhY3RhYmxlLmRyYWdnYWJsZX0gZXhhbXBsZVxuICogICAgIG1heDogSW5maW5pdHksXG4gKiAgICAgbWF4UGVyRWxlbWVudDogMSxcbiAqIH0pO1xuICpcbiAqIHZhciBpc0dlc3R1cmVhYmxlID0gaW50ZXJhY3QoZWxlbWVudCkuZ2VzdHVyYWJsZSgpO1xuICogYGBgXG4gKlxuICogR2V0cyBvciBzZXRzIHdoZXRoZXIgbXVsdGl0b3VjaCBnZXN0dXJlcyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3R9IFtvcHRpb25zXSB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50XG4gKiBsaXN0ZW5lcnMgdG8gYmUgZmlyZWQgb24gZ2VzdHVyZSBldmVudHMgKG1ha2VzIHRoZSBJbnRlcmFjdGFibGUgZ2VzdHVyYWJsZSlcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IEEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoaXMgY2FuIGJlIHRoZVxuICogdGFyZ2V0IG9mIGdlc3R1cmUgZXZlbnRzLCBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmdlc3R1cmFibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlOiB0cnVlO1xuICAgIHRoaXMuc2V0UGVyQWN0aW9uKCdnZXN0dXJlJywgb3B0aW9ucyk7XG4gICAgdGhpcy5zZXRPbkV2ZW50cygnZ2VzdHVyZScsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5nZXN0dXJlLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aGlzLm9uZ2VzdHVyZXN0YXJ0ID0gdGhpcy5vbmdlc3R1cmVzdGFydCA9IHRoaXMub25nZXN0dXJlZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLm9wdGlvbnMuZ2VzdHVyZTtcbn07XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignc2V0LWRlbHRhJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGlFdmVudCwgYWN0aW9uLCBldmVudCwgc3RhcnRpbmcsIGVuZGluZywgZGVsdGFTb3VyY2UgfSkge1xuICBpZiAoYWN0aW9uICE9PSAnZ2VzdHVyZScpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgcG9pbnRlcnMgPSBpbnRlcmFjdGlvbi5wb2ludGVycztcblxuICBpRXZlbnQudG91Y2hlcyA9IFtwb2ludGVyc1swXSwgcG9pbnRlcnNbMV1dO1xuXG4gIGlmIChzdGFydGluZykge1xuICAgIGlFdmVudC5kaXN0YW5jZSA9IHV0aWxzLnRvdWNoRGlzdGFuY2UocG9pbnRlcnMsIGRlbHRhU291cmNlKTtcbiAgICBpRXZlbnQuYm94ICAgICAgPSB1dGlscy50b3VjaEJCb3gocG9pbnRlcnMpO1xuICAgIGlFdmVudC5zY2FsZSAgICA9IDE7XG4gICAgaUV2ZW50LmRzICAgICAgID0gMDtcbiAgICBpRXZlbnQuYW5nbGUgICAgPSB1dGlscy50b3VjaEFuZ2xlKHBvaW50ZXJzLCB1bmRlZmluZWQsIGRlbHRhU291cmNlKTtcbiAgICBpRXZlbnQuZGEgICAgICAgPSAwO1xuICB9XG4gIGVsc2UgaWYgKGVuZGluZyB8fCBldmVudCBpbnN0YW5jZW9mIEludGVyYWN0RXZlbnQpIHtcbiAgICBpRXZlbnQuZGlzdGFuY2UgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuZGlzdGFuY2U7XG4gICAgaUV2ZW50LmJveCAgICAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmJveDtcbiAgICBpRXZlbnQuc2NhbGUgICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc2NhbGU7XG4gICAgaUV2ZW50LmRzICAgICAgID0gaUV2ZW50LnNjYWxlIC0gMTtcbiAgICBpRXZlbnQuYW5nbGUgICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuYW5nbGU7XG4gICAgaUV2ZW50LmRhICAgICAgID0gaUV2ZW50LmFuZ2xlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydEFuZ2xlO1xuICB9XG4gIGVsc2Uge1xuICAgIGlFdmVudC5kaXN0YW5jZSA9IHV0aWxzLnRvdWNoRGlzdGFuY2UocG9pbnRlcnMsIGRlbHRhU291cmNlKTtcbiAgICBpRXZlbnQuYm94ICAgICAgPSB1dGlscy50b3VjaEJCb3gocG9pbnRlcnMpO1xuICAgIGlFdmVudC5zY2FsZSAgICA9IGlFdmVudC5kaXN0YW5jZSAvIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnREaXN0YW5jZTtcbiAgICBpRXZlbnQuYW5nbGUgICAgPSB1dGlscy50b3VjaEFuZ2xlKHBvaW50ZXJzLCBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZSwgZGVsdGFTb3VyY2UpO1xuXG4gICAgaUV2ZW50LmRzID0gaUV2ZW50LnNjYWxlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2U2NhbGU7XG4gICAgaUV2ZW50LmRhID0gaUV2ZW50LmFuZ2xlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGU7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZSA9IHtcbiAgICBzdGFydDogeyB4OiAwLCB5OiAwIH0sXG5cbiAgICBzdGFydERpc3RhbmNlOiAwLCAgIC8vIGRpc3RhbmNlIGJldHdlZW4gdHdvIHRvdWNoZXMgb2YgdG91Y2hTdGFydFxuICAgIHByZXZEaXN0YW5jZSA6IDAsXG4gICAgZGlzdGFuY2UgICAgIDogMCxcblxuICAgIHNjYWxlOiAxLCAgICAgICAgICAgLy8gZ2VzdHVyZS5kaXN0YW5jZSAvIGdlc3R1cmUuc3RhcnREaXN0YW5jZVxuXG4gICAgc3RhcnRBbmdsZTogMCwgICAgICAvLyBhbmdsZSBvZiBsaW5lIGpvaW5pbmcgdHdvIHRvdWNoZXNcbiAgICBwcmV2QW5nbGUgOiAwLCAgICAgIC8vIGFuZ2xlIG9mIHRoZSBwcmV2aW91cyBnZXN0dXJlIGV2ZW50XG4gIH07XG59KTtcblxuYWN0aW9ucy5nZXN0dXJlID0gZ2VzdHVyZTtcbmFjdGlvbnMubmFtZXMucHVzaCgnZ2VzdHVyZScpO1xudXRpbHMubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIFtcbiAgJ2dlc3R1cmVzdGFydCcsXG4gICdnZXN0dXJlbW92ZScsXG4gICdnZXN0dXJlZW5kJyxcbl0pO1xuYWN0aW9ucy5tZXRob2REaWN0Lmdlc3R1cmUgPSAnZ2VzdHVyYWJsZSc7XG5cbmRlZmF1bHRPcHRpb25zLmdlc3R1cmUgPSBnZXN0dXJlLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlc3R1cmU7XG4iLCJjb25zdCBhY3Rpb25zICAgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3Qgc2NvcGUgICAgICAgICAgPSByZXF1aXJlKCcuLi9zY29wZScpO1xuLyoqIEBsZW5kcyBtb2R1bGU6aW50ZXJhY3QgKi9cbmNvbnN0IGludGVyYWN0ICAgICAgID0gcmVxdWlyZSgnLi4vaW50ZXJhY3QnKTtcbmNvbnN0IEludGVyYWN0RXZlbnQgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuLyoqIEBsZW5kcyBJbnRlcmFjdGFibGUgKi9cbmNvbnN0IEludGVyYWN0YWJsZSAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgYWNjZXB0IDogbnVsbCxcbiAgICBvdmVybGFwOiAncG9pbnRlcicsXG4gIH0sXG59O1xuXG5sZXQgZHluYW1pY0Ryb3AgPSBmYWxzZTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLXN0YXJ0JywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50IH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykgeyByZXR1cm47IH1cblxuICAvLyByZXNldCBhY3RpdmUgZHJvcHpvbmVzXG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmRyb3B6b25lcyA9IFtdO1xuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5lbGVtZW50cyAgPSBbXTtcbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMucmVjdHMgICAgID0gW107XG5cbiAgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyA9IG51bGw7XG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5keW5hbWljRHJvcCkge1xuICAgIHNldEFjdGl2ZURyb3BzKGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgfVxuXG4gIGNvbnN0IGRyYWdFdmVudCA9IGludGVyYWN0aW9uLnByZXZFdmVudDtcbiAgY29uc3QgZHJvcEV2ZW50cyA9IGdldERyb3BFdmVudHMoaW50ZXJhY3Rpb24sIGV2ZW50LCBkcmFnRXZlbnQpO1xuXG4gIGlmIChkcm9wRXZlbnRzLmFjdGl2YXRlKSB7XG4gICAgZmlyZUFjdGl2ZURyb3BzKGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLCBkcm9wRXZlbnRzLmFjdGl2YXRlKTtcbiAgfVxufSk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGlFdmVudCwgZXZlbnQgfSkge1xuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdkcmFnbW92ZScgJiYgaUV2ZW50LnR5cGUgIT09ICdkcmFnZW5kJykgeyByZXR1cm47IH1cblxuICBjb25zdCBkcmFnZ2FibGVFbGVtZW50ID0gaW50ZXJhY3Rpb24uZWxlbWVudDtcbiAgY29uc3QgZHJhZ0V2ZW50ID0gaUV2ZW50O1xuICBjb25zdCBkcm9wUmVzdWx0ID0gZ2V0RHJvcChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnZ2FibGVFbGVtZW50KTtcblxuICBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0ICA9IGRyb3BSZXN1bHQuZHJvcHpvbmU7XG4gIGludGVyYWN0aW9uLmRyb3BFbGVtZW50ID0gZHJvcFJlc3VsdC5lbGVtZW50O1xuXG4gIGludGVyYWN0aW9uLmRyb3BFdmVudHMgPSBnZXREcm9wRXZlbnRzKGludGVyYWN0aW9uLCBldmVudCwgZHJhZ0V2ZW50KTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tbW92ZScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykgeyByZXR1cm47IH1cblxuICBmaXJlRHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLWVuZCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPT09ICdkcmFnJykge1xuICAgIGZpcmVEcm9wRXZlbnRzKGludGVyYWN0aW9uLCBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzKTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AtZHJhZycsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMgPSB7XG4gICAgZHJvcHpvbmVzOiBudWxsLFxuICAgIGVsZW1lbnRzOiBudWxsLFxuICAgIHJlY3RzOiBudWxsLFxuICB9O1xuXG4gIGludGVyYWN0aW9uLmRyb3BFdmVudHMgPSBudWxsO1xufSk7XG5cbmZ1bmN0aW9uIGNvbGxlY3REcm9wcyAoYWN0aXZlRHJvcHMsIGVsZW1lbnQpIHtcbiAgY29uc3QgZHJvcHMgPSBbXTtcbiAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICAvLyBjb2xsZWN0IGFsbCBkcm9wem9uZXMgYW5kIHRoZWlyIGVsZW1lbnRzIHdoaWNoIHF1YWxpZnkgZm9yIGEgZHJvcFxuICBmb3IgKGNvbnN0IGN1cnJlbnQgb2Ygc2NvcGUuaW50ZXJhY3RhYmxlcykge1xuICAgIGlmICghY3VycmVudC5vcHRpb25zLmRyb3AuZW5hYmxlZCkgeyBjb250aW51ZTsgfVxuXG4gICAgY29uc3QgYWNjZXB0ID0gY3VycmVudC5vcHRpb25zLmRyb3AuYWNjZXB0O1xuXG4gICAgLy8gdGVzdCB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQgYWdhaW5zdCB0aGUgZHJvcHpvbmUncyBhY2NlcHQgc2V0dGluZ1xuICAgIGlmICgodXRpbHMuaXMuZWxlbWVudChhY2NlcHQpICYmIGFjY2VwdCAhPT0gZWxlbWVudClcbiAgICAgICAgfHwgKHV0aWxzLmlzLnN0cmluZyhhY2NlcHQpXG4gICAgICAgICYmICF1dGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgYWNjZXB0KSkpIHtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gcXVlcnkgZm9yIG5ldyBlbGVtZW50cyBpZiBuZWNlc3NhcnlcbiAgICBjb25zdCBkcm9wRWxlbWVudHMgPSB1dGlscy5pcy5zdHJpbmcoY3VycmVudC50YXJnZXQpXG4gICAgICA/IGN1cnJlbnQuX2NvbnRleHQucXVlcnlTZWxlY3RvckFsbChjdXJyZW50LnRhcmdldClcbiAgICAgIDogW2N1cnJlbnQudGFyZ2V0XTtcblxuICAgIGZvciAoY29uc3QgY3VycmVudEVsZW1lbnQgb2YgZHJvcEVsZW1lbnRzKSB7XG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgZHJvcHMucHVzaChjdXJyZW50KTtcbiAgICAgICAgZWxlbWVudHMucHVzaChjdXJyZW50RWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlbGVtZW50cyxcbiAgICBkcm9wem9uZXM6IGRyb3BzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBmaXJlQWN0aXZlRHJvcHMgKGFjdGl2ZURyb3BzLCBldmVudCkge1xuICBsZXQgcHJldkVsZW1lbnQ7XG5cbiAgLy8gbG9vcCB0aHJvdWdoIGFsbCBhY3RpdmUgZHJvcHpvbmVzIGFuZCB0cmlnZ2VyIGV2ZW50XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGFjdGl2ZURyb3BzLmRyb3B6b25lc1tpXTtcbiAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IGFjdGl2ZURyb3BzLmVsZW1lbnRzIFtpXTtcblxuICAgIC8vIHByZXZlbnQgdHJpZ2dlciBvZiBkdXBsaWNhdGUgZXZlbnRzIG9uIHNhbWUgZWxlbWVudFxuICAgIGlmIChjdXJyZW50RWxlbWVudCAhPT0gcHJldkVsZW1lbnQpIHtcbiAgICAgIC8vIHNldCBjdXJyZW50IGVsZW1lbnQgYXMgZXZlbnQgdGFyZ2V0XG4gICAgICBldmVudC50YXJnZXQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIGN1cnJlbnQuZmlyZShldmVudCk7XG4gICAgfVxuICAgIHByZXZFbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gIH1cbn1cblxuLy8gQ29sbGVjdCBhIG5ldyBzZXQgb2YgcG9zc2libGUgZHJvcHMgYW5kIHNhdmUgdGhlbSBpbiBhY3RpdmVEcm9wcy5cbi8vIHNldEFjdGl2ZURyb3BzIHNob3VsZCBhbHdheXMgYmUgY2FsbGVkIHdoZW4gYSBkcmFnIGhhcyBqdXN0IHN0YXJ0ZWQgb3IgYVxuLy8gZHJhZyBldmVudCBoYXBwZW5zIHdoaWxlIGR5bmFtaWNEcm9wIGlzIHRydWVcbmZ1bmN0aW9uIHNldEFjdGl2ZURyb3BzIChhY3RpdmVEcm9wcywgZHJhZ0VsZW1lbnQpIHtcbiAgLy8gZ2V0IGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgdGhhdCBjb3VsZCByZWNlaXZlIHRoZSBkcmFnZ2FibGVcbiAgY29uc3QgcG9zc2libGVEcm9wcyA9IGNvbGxlY3REcm9wcyhhY3RpdmVEcm9wcywgZHJhZ0VsZW1lbnQpO1xuXG4gIGFjdGl2ZURyb3BzLmRyb3B6b25lcyA9IHBvc3NpYmxlRHJvcHMuZHJvcHpvbmVzO1xuICBhY3RpdmVEcm9wcy5lbGVtZW50cyAgPSBwb3NzaWJsZURyb3BzLmVsZW1lbnRzO1xuICBhY3RpdmVEcm9wcy5yZWN0cyAgICAgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZURyb3BzLmRyb3B6b25lcy5sZW5ndGg7IGkrKykge1xuICAgIGFjdGl2ZURyb3BzLnJlY3RzW2ldID0gYWN0aXZlRHJvcHMuZHJvcHpvbmVzW2ldLmdldFJlY3QoYWN0aXZlRHJvcHMuZWxlbWVudHNbaV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERyb3AgKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdFbGVtZW50KSB7XG4gIGNvbnN0IGludGVyYWN0aW9uID0gZHJhZ0V2ZW50LmludGVyYWN0aW9uO1xuICBjb25zdCB2YWxpZERyb3BzID0gW107XG5cbiAgaWYgKGR5bmFtaWNEcm9wKSB7XG4gICAgc2V0QWN0aXZlRHJvcHMoaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMsIGRyYWdFbGVtZW50KTtcbiAgfVxuXG4gIC8vIGNvbGxlY3QgYWxsIGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgd2hpY2ggcXVhbGlmeSBmb3IgYSBkcm9wXG4gIGZvciAobGV0IGogPSAwOyBqIDwgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaisrKSB7XG4gICAgY29uc3QgY3VycmVudCAgICAgICAgPSBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5kcm9wem9uZXNbal07XG4gICAgY29uc3QgY3VycmVudEVsZW1lbnQgPSBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5lbGVtZW50cyBbal07XG4gICAgY29uc3QgcmVjdCAgICAgICAgICAgPSBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5yZWN0cyAgICBbal07XG5cbiAgICB2YWxpZERyb3BzLnB1c2goY3VycmVudC5kcm9wQ2hlY2soZHJhZ0V2ZW50LCBldmVudCwgaW50ZXJhY3Rpb24udGFyZ2V0LCBkcmFnRWxlbWVudCwgY3VycmVudEVsZW1lbnQsIHJlY3QpXG4gICAgICA/IGN1cnJlbnRFbGVtZW50XG4gICAgICA6IG51bGwpO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBtb3N0IGFwcHJvcHJpYXRlIGRyb3B6b25lIGJhc2VkIG9uIERPTSBkZXB0aCBhbmQgb3JkZXJcbiAgY29uc3QgZHJvcEluZGV4ID0gdXRpbHMuaW5kZXhPZkRlZXBlc3RFbGVtZW50KHZhbGlkRHJvcHMpO1xuXG4gIHJldHVybiB7XG4gICAgZHJvcHpvbmU6IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tkcm9wSW5kZXhdIHx8IG51bGwsXG4gICAgZWxlbWVudCA6IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmVsZW1lbnRzIFtkcm9wSW5kZXhdIHx8IG51bGwsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERyb3BFdmVudHMgKGludGVyYWN0aW9uLCBwb2ludGVyRXZlbnQsIGRyYWdFdmVudCkge1xuICBjb25zdCBkcm9wRXZlbnRzID0ge1xuICAgIGVudGVyICAgICA6IG51bGwsXG4gICAgbGVhdmUgICAgIDogbnVsbCxcbiAgICBhY3RpdmF0ZSAgOiBudWxsLFxuICAgIGRlYWN0aXZhdGU6IG51bGwsXG4gICAgbW92ZSAgICAgIDogbnVsbCxcbiAgICBkcm9wICAgICAgOiBudWxsLFxuICB9O1xuXG4gIGNvbnN0IHRtcGwgPSB7XG4gICAgZHJhZ0V2ZW50LFxuICAgIGludGVyYWN0aW9uLFxuICAgIHRhcmdldCAgICAgICA6IGludGVyYWN0aW9uLmRyb3BFbGVtZW50LFxuICAgIGRyb3B6b25lICAgICA6IGludGVyYWN0aW9uLmRyb3BUYXJnZXQsXG4gICAgcmVsYXRlZFRhcmdldDogZHJhZ0V2ZW50LnRhcmdldCxcbiAgICBkcmFnZ2FibGUgICAgOiBkcmFnRXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgIHRpbWVTdGFtcCAgICA6IGRyYWdFdmVudC50aW1lU3RhbXAsXG4gIH07XG5cbiAgaWYgKGludGVyYWN0aW9uLmRyb3BFbGVtZW50ICE9PSBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQpIHtcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSBwcmV2RHJvcFRhcmdldCwgY3JlYXRlIGEgZHJhZ2xlYXZlIGV2ZW50XG4gICAgaWYgKGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0KSB7XG4gICAgICBkcm9wRXZlbnRzLmxlYXZlID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2RyYWdsZWF2ZScgfSwgdG1wbCk7XG5cbiAgICAgIGRyYWdFdmVudC5kcmFnTGVhdmUgICAgPSBkcm9wRXZlbnRzLmxlYXZlLnRhcmdldCAgID0gaW50ZXJhY3Rpb24ucHJldkRyb3BFbGVtZW50O1xuICAgICAgZHJhZ0V2ZW50LnByZXZEcm9wem9uZSA9IGRyb3BFdmVudHMubGVhdmUuZHJvcHpvbmUgPSBpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldDtcbiAgICB9XG4gICAgLy8gaWYgdGhlIGRyb3BUYXJnZXQgaXMgbm90IG51bGwsIGNyZWF0ZSBhIGRyYWdlbnRlciBldmVudFxuICAgIGlmIChpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0KSB7XG4gICAgICBkcm9wRXZlbnRzLmVudGVyID0ge1xuICAgICAgICBkcmFnRXZlbnQsXG4gICAgICAgIGludGVyYWN0aW9uLFxuICAgICAgICB0YXJnZXQgICAgICAgOiBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCxcbiAgICAgICAgZHJvcHpvbmUgICAgIDogaW50ZXJhY3Rpb24uZHJvcFRhcmdldCxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogZHJhZ0V2ZW50LnRhcmdldCxcbiAgICAgICAgZHJhZ2dhYmxlICAgIDogZHJhZ0V2ZW50LmludGVyYWN0YWJsZSxcbiAgICAgICAgdGltZVN0YW1wICAgIDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgdHlwZSAgICAgICAgIDogJ2RyYWdlbnRlcicsXG4gICAgICB9O1xuXG4gICAgICBkcmFnRXZlbnQuZHJhZ0VudGVyID0gaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQ7XG4gICAgICBkcmFnRXZlbnQuZHJvcHpvbmUgPSBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdlbmQnICYmIGludGVyYWN0aW9uLmRyb3BUYXJnZXQpIHtcbiAgICBkcm9wRXZlbnRzLmRyb3AgPSB1dGlscy5leHRlbmQoeyB0eXBlOiAnZHJvcCcgfSwgdG1wbCk7XG5cbiAgICBkcmFnRXZlbnQuZHJvcHpvbmUgPSBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0O1xuICAgIGRyYWdFdmVudC5yZWxhdGVkVGFyZ2V0ID0gaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQ7XG4gIH1cbiAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ3N0YXJ0Jykge1xuICAgIGRyb3BFdmVudHMuYWN0aXZhdGUgPSB1dGlscy5leHRlbmQoeyB0eXBlOiAnZHJvcGFjdGl2YXRlJyB9LCB0bXBsKTtcblxuICAgIGRyb3BFdmVudHMuYWN0aXZhdGUudGFyZ2V0ICAgPSBudWxsO1xuICAgIGRyb3BFdmVudHMuYWN0aXZhdGUuZHJvcHpvbmUgPSBudWxsO1xuICB9XG4gIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdlbmQnKSB7XG4gICAgZHJvcEV2ZW50cy5kZWFjdGl2YXRlID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2Ryb3BkZWFjdGl2YXRlJyB9LCB0bXBsKTtcblxuICAgIGRyb3BFdmVudHMuZGVhY3RpdmF0ZS50YXJnZXQgICA9IG51bGw7XG4gICAgZHJvcEV2ZW50cy5kZWFjdGl2YXRlLmRyb3B6b25lID0gbnVsbDtcbiAgfVxuICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnbW92ZScgJiYgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCkge1xuICAgIGRyb3BFdmVudHMubW92ZSA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICBkcmFnbW92ZSAgICAgOiBkcmFnRXZlbnQsXG4gICAgICB0eXBlICAgICAgICAgOiAnZHJvcG1vdmUnLFxuICAgIH0sIHRtcGwpO1xuXG4gICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gaW50ZXJhY3Rpb24uZHJvcFRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBkcm9wRXZlbnRzO1xufVxuXG5mdW5jdGlvbiBmaXJlRHJvcEV2ZW50cyAoaW50ZXJhY3Rpb24sIGRyb3BFdmVudHMpIHtcbiAgY29uc3Qge1xuICAgIGFjdGl2ZURyb3BzLFxuICAgIHByZXZEcm9wVGFyZ2V0LFxuICAgIGRyb3BUYXJnZXQsXG4gICAgZHJvcEVsZW1lbnQsXG4gIH0gPSBpbnRlcmFjdGlvbjtcblxuICBpZiAoZHJvcEV2ZW50cy5sZWF2ZSkgeyBwcmV2RHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMubGVhdmUpOyB9XG4gIGlmIChkcm9wRXZlbnRzLm1vdmUgKSB7ICAgICBkcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5tb3ZlICk7IH1cbiAgaWYgKGRyb3BFdmVudHMuZW50ZXIpIHsgICAgIGRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLmVudGVyKTsgfVxuICBpZiAoZHJvcEV2ZW50cy5kcm9wICkgeyAgICAgZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMuZHJvcCApOyB9XG4gIGlmIChkcm9wRXZlbnRzLmRlYWN0aXZhdGUpIHtcbiAgICBmaXJlQWN0aXZlRHJvcHMoYWN0aXZlRHJvcHMsIGRyb3BFdmVudHMuZGVhY3RpdmF0ZSk7XG4gIH1cblxuICBpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldCAgPSBkcm9wVGFyZ2V0O1xuICBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQgPSBkcm9wRWxlbWVudDtcbn1cblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QodGFyZ2V0KVxuICogLmRyb3BDaGVja2VyKGZ1bmN0aW9uKGRyYWdFdmVudCwgICAgICAgICAvLyByZWxhdGVkIGRyYWdtb3ZlIG9yIGRyYWdlbmQgZXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICBldmVudCwgICAgICAgICAgICAgLy8gVG91Y2hFdmVudC9Qb2ludGVyRXZlbnQvTW91c2VFdmVudFxuICogICAgICAgICAgICAgICAgICAgICAgIGRyb3BwZWQsICAgICAgICAgICAvLyBib29sIHJlc3VsdCBvZiB0aGUgZGVmYXVsdCBjaGVja2VyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUsICAgICAgICAgIC8vIGRyb3B6b25lIEludGVyYWN0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgIGRyb3BFbGVtZW50LCAgICAgICAvLyBkcm9wem9uZSBlbGVtbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUsICAgICAgICAgLy8gZHJhZ2dhYmxlIEludGVyYWN0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZUVsZW1lbnQpIHsvLyBkcmFnZ2FibGUgZWxlbWVudFxuICpcbiAqICAgcmV0dXJuIGRyb3BwZWQgJiYgZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnYWxsb3ctZHJvcCcpO1xuICogfVxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGludGVyYWN0KCcuZHJvcCcpLmRyb3B6b25lKHtcbiAqICAgYWNjZXB0OiAnLmNhbi1kcm9wJyB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLWRyb3AnKSxcbiAqICAgb3ZlcmxhcDogJ3BvaW50ZXInIHx8ICdjZW50ZXInIHx8IHplcm9Ub09uZVxuICogfVxuICogYGBgXG4gKlxuICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgZHJhZ2dhYmxlcyBjYW4gYmUgZHJvcHBlZCBvbnRvIHRoaXMgdGFyZ2V0IHRvXG4gKiB0cmlnZ2VyIGRyb3AgZXZlbnRzXG4gKlxuICogRHJvcHpvbmVzIGNhbiByZWNlaXZlIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICogIC0gYGRyb3BhY3RpdmF0ZWAgYW5kIGBkcm9wZGVhY3RpdmF0ZWAgd2hlbiBhbiBhY2NlcHRhYmxlIGRyYWcgc3RhcnRzIGFuZCBlbmRzXG4gKiAgLSBgZHJhZ2VudGVyYCBhbmQgYGRyYWdsZWF2ZWAgd2hlbiBhIGRyYWdnYWJsZSBlbnRlcnMgYW5kIGxlYXZlcyB0aGUgZHJvcHpvbmVcbiAqICAtIGBkcmFnbW92ZWAgd2hlbiBhIGRyYWdnYWJsZSB0aGF0IGhhcyBlbnRlcmVkIHRoZSBkcm9wem9uZSBpcyBtb3ZlZFxuICogIC0gYGRyb3BgIHdoZW4gYSBkcmFnZ2FibGUgaXMgZHJvcHBlZCBpbnRvIHRoaXMgZHJvcHpvbmVcbiAqXG4gKiBVc2UgdGhlIGBhY2NlcHRgIG9wdGlvbiB0byBhbGxvdyBvbmx5IGVsZW1lbnRzIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIENTU1xuICogc2VsZWN0b3Igb3IgZWxlbWVudC4gVGhlIHZhbHVlIGNhbiBiZTpcbiAqXG4gKiAgLSAqKmFuIEVsZW1lbnQqKiAtIG9ubHkgdGhhdCBlbGVtZW50IGNhbiBiZSBkcm9wcGVkIGludG8gdGhpcyBkcm9wem9uZS5cbiAqICAtICoqYSBzdHJpbmcqKiwgLSB0aGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkIG11c3QgbWF0Y2ggaXQgYXMgYSBDU1Mgc2VsZWN0b3IuXG4gKiAgLSAqKmBudWxsYCoqIC0gYWNjZXB0IG9wdGlvbnMgaXMgY2xlYXJlZCAtIGl0IGFjY2VwdHMgYW55IGVsZW1lbnQuXG4gKlxuICogVXNlIHRoZSBgb3ZlcmxhcGAgb3B0aW9uIHRvIHNldCBob3cgZHJvcHMgYXJlIGNoZWNrZWQgZm9yLiBUaGUgYWxsb3dlZFxuICogdmFsdWVzIGFyZTpcbiAqXG4gKiAgIC0gYCdwb2ludGVyJ2AsIHRoZSBwb2ludGVyIG11c3QgYmUgb3ZlciB0aGUgZHJvcHpvbmUgKGRlZmF1bHQpXG4gKiAgIC0gYCdjZW50ZXInYCwgdGhlIGRyYWdnYWJsZSBlbGVtZW50J3MgY2VudGVyIG11c3QgYmUgb3ZlciB0aGUgZHJvcHpvbmVcbiAqICAgLSBhIG51bWJlciBmcm9tIDAtMSB3aGljaCBpcyB0aGUgYChpbnRlcnNlY3Rpb24gYXJlYSkgLyAoZHJhZ2dhYmxlIGFyZWEpYC5cbiAqICAgZS5nLiBgMC41YCBmb3IgZHJvcCB0byBoYXBwZW4gd2hlbiBoYWxmIG9mIHRoZSBhcmVhIG9mIHRoZSBkcmFnZ2FibGUgaXNcbiAqICAgb3ZlciB0aGUgZHJvcHpvbmVcbiAqXG4gKiBVc2UgdGhlIGBjaGVja2VyYCBvcHRpb24gdG8gc3BlY2lmeSBhIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIGEgZHJhZ2dlZCBlbGVtZW50XG4gKiBpcyBvdmVyIHRoaXMgSW50ZXJhY3RhYmxlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdCB8IG51bGx9IFtvcHRpb25zXSBUaGUgbmV3IG9wdGlvbnMgdG8gYmUgc2V0LlxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmRyb3B6b25lID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLm9iamVjdChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5kcm9wLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcblxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJvcCkgICAgICAgICAgKSB7IHRoaXMuZXZlbnRzLm9uZHJvcCAgICAgICAgICAgPSBvcHRpb25zLm9uZHJvcCAgICAgICAgICA7IH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyb3BhY3RpdmF0ZSkgICkgeyB0aGlzLmV2ZW50cy5vbmRyb3BhY3RpdmF0ZSAgID0gb3B0aW9ucy5vbmRyb3BhY3RpdmF0ZSAgOyB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcm9wZGVhY3RpdmF0ZSkpIHsgdGhpcy5ldmVudHMub25kcm9wZGVhY3RpdmF0ZSA9IG9wdGlvbnMub25kcm9wZGVhY3RpdmF0ZTsgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJhZ2VudGVyKSAgICAgKSB7IHRoaXMuZXZlbnRzLm9uZHJhZ2VudGVyICAgICAgPSBvcHRpb25zLm9uZHJhZ2VudGVyICAgICA7IH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyYWdsZWF2ZSkgICAgICkgeyB0aGlzLmV2ZW50cy5vbmRyYWdsZWF2ZSAgICAgID0gb3B0aW9ucy5vbmRyYWdsZWF2ZSAgICAgOyB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcm9wbW92ZSkgICAgICApIHsgdGhpcy5ldmVudHMub25kcm9wbW92ZSAgICAgICA9IG9wdGlvbnMub25kcm9wbW92ZSAgICAgIDsgfVxuXG4gICAgaWYgKC9eKHBvaW50ZXJ8Y2VudGVyKSQvLnRlc3Qob3B0aW9ucy5vdmVybGFwKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcCA9IG9wdGlvbnMub3ZlcmxhcDtcbiAgICB9XG4gICAgZWxzZSBpZiAodXRpbHMuaXMubnVtYmVyKG9wdGlvbnMub3ZlcmxhcCkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcm9wLm92ZXJsYXAgPSBNYXRoLm1heChNYXRoLm1pbigxLCBvcHRpb25zLm92ZXJsYXApLCAwKTtcbiAgICB9XG4gICAgaWYgKCdhY2NlcHQnIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcm9wLmFjY2VwdCA9IG9wdGlvbnMuYWNjZXB0O1xuICAgIH1cbiAgICBpZiAoJ2NoZWNrZXInIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIgPSBvcHRpb25zLmNoZWNrZXI7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmRyb3AuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMub25kcmFnZW50ZXIgPSB0aGlzLm9uZHJhZ2xlYXZlID0gdGhpcy5vbmRyb3BcbiAgICAgICAgPSB0aGlzLm9uZHJvcGFjdGl2YXRlID0gdGhpcy5vbmRyb3BkZWFjdGl2YXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLm9wdGlvbnMuZHJvcDtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZHJvcENoZWNrID0gZnVuY3Rpb24gKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudCwgZHJvcEVsZW1lbnQsIHJlY3QpIHtcbiAgbGV0IGRyb3BwZWQgPSBmYWxzZTtcblxuICAvLyBpZiB0aGUgZHJvcHpvbmUgaGFzIG5vIHJlY3QgKGVnLiBkaXNwbGF5OiBub25lKVxuICAvLyBjYWxsIHRoZSBjdXN0b20gZHJvcENoZWNrZXIgb3IganVzdCByZXR1cm4gZmFsc2VcbiAgaWYgKCEocmVjdCA9IHJlY3QgfHwgdGhpcy5nZXRSZWN0KGRyb3BFbGVtZW50KSkpIHtcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXJcbiAgICAgID8gdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcihkcmFnRXZlbnQsIGV2ZW50LCBkcm9wcGVkLCB0aGlzLCBkcm9wRWxlbWVudCwgZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50KVxuICAgICAgOiBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBkcm9wT3ZlcmxhcCA9IHRoaXMub3B0aW9ucy5kcm9wLm92ZXJsYXA7XG5cbiAgaWYgKGRyb3BPdmVybGFwID09PSAncG9pbnRlcicpIHtcbiAgICBjb25zdCBvcmlnaW4gPSB1dGlscy5nZXRPcmlnaW5YWShkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQsICdkcmFnJyk7XG4gICAgY29uc3QgcGFnZSA9IHV0aWxzLmdldFBhZ2VYWShkcmFnRXZlbnQpO1xuXG4gICAgcGFnZS54ICs9IG9yaWdpbi54O1xuICAgIHBhZ2UueSArPSBvcmlnaW4ueTtcblxuICAgIGNvbnN0IGhvcml6b250YWwgPSAocGFnZS54ID4gcmVjdC5sZWZ0KSAmJiAocGFnZS54IDwgcmVjdC5yaWdodCk7XG4gICAgY29uc3QgdmVydGljYWwgICA9IChwYWdlLnkgPiByZWN0LnRvcCApICYmIChwYWdlLnkgPCByZWN0LmJvdHRvbSk7XG5cbiAgICBkcm9wcGVkID0gaG9yaXpvbnRhbCAmJiB2ZXJ0aWNhbDtcbiAgfVxuXG4gIGNvbnN0IGRyYWdSZWN0ID0gZHJhZ2dhYmxlLmdldFJlY3QoZHJhZ2dhYmxlRWxlbWVudCk7XG5cbiAgaWYgKGRyYWdSZWN0ICYmIGRyb3BPdmVybGFwID09PSAnY2VudGVyJykge1xuICAgIGNvbnN0IGN4ID0gZHJhZ1JlY3QubGVmdCArIGRyYWdSZWN0LndpZHRoICAvIDI7XG4gICAgY29uc3QgY3kgPSBkcmFnUmVjdC50b3AgICsgZHJhZ1JlY3QuaGVpZ2h0IC8gMjtcblxuICAgIGRyb3BwZWQgPSBjeCA+PSByZWN0LmxlZnQgJiYgY3ggPD0gcmVjdC5yaWdodCAmJiBjeSA+PSByZWN0LnRvcCAmJiBjeSA8PSByZWN0LmJvdHRvbTtcbiAgfVxuXG4gIGlmIChkcmFnUmVjdCAmJiB1dGlscy5pcy5udW1iZXIoZHJvcE92ZXJsYXApKSB7XG4gICAgY29uc3Qgb3ZlcmxhcEFyZWEgID0gKE1hdGgubWF4KDAsIE1hdGgubWluKHJlY3QucmlnaHQgLCBkcmFnUmVjdC5yaWdodCApIC0gTWF0aC5tYXgocmVjdC5sZWZ0LCBkcmFnUmVjdC5sZWZ0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKiBNYXRoLm1heCgwLCBNYXRoLm1pbihyZWN0LmJvdHRvbSwgZHJhZ1JlY3QuYm90dG9tKSAtIE1hdGgubWF4KHJlY3QudG9wICwgZHJhZ1JlY3QudG9wICkpKTtcblxuICAgIGNvbnN0IG92ZXJsYXBSYXRpbyA9IG92ZXJsYXBBcmVhIC8gKGRyYWdSZWN0LndpZHRoICogZHJhZ1JlY3QuaGVpZ2h0KTtcblxuICAgIGRyb3BwZWQgPSBvdmVybGFwUmF0aW8gPj0gZHJvcE92ZXJsYXA7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcikge1xuICAgIGRyb3BwZWQgPSB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyKGRyYWdFdmVudCwgZXZlbnQsIGRyb3BwZWQsIHRoaXMsIGRyb3BFbGVtZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGRyb3BwZWQ7XG59O1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscy5vbigndW5zZXQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGFibGUgfSkge1xuICBpbnRlcmFjdGFibGUuZHJvcHpvbmUoZmFsc2UpO1xufSk7XG5cbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnZHJvcENoZWNrZXInKTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmRyb3BUYXJnZXQgICAgICA9IG51bGw7IC8vIHRoZSBkcm9wem9uZSBhIGRyYWcgdGFyZ2V0IG1pZ2h0IGJlIGRyb3BwZWQgaW50b1xuICBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCAgICAgPSBudWxsOyAvLyB0aGUgZWxlbWVudCBhdCB0aGUgdGltZSBvZiBjaGVja2luZ1xuICBpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldCAgPSBudWxsOyAvLyB0aGUgZHJvcHpvbmUgdGhhdCB3YXMgcmVjZW50bHkgZHJhZ2dlZCBhd2F5IGZyb21cbiAgaW50ZXJhY3Rpb24ucHJldkRyb3BFbGVtZW50ID0gbnVsbDsgLy8gdGhlIGVsZW1lbnQgYXQgdGhlIHRpbWUgb2YgY2hlY2tpbmdcbiAgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyAgICAgID0gbnVsbDsgLy8gdGhlIGRyb3BFdmVudHMgcmVsYXRlZCB0byB0aGUgY3VycmVudCBkcmFnIGV2ZW50XG5cbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMgPSB7XG4gICAgZHJvcHpvbmVzOiBbXSwgICAgICAvLyB0aGUgZHJvcHpvbmVzIHRoYXQgYXJlIG1lbnRpb25lZCBiZWxvd1xuICAgIGVsZW1lbnRzIDogW10sICAgICAgLy8gZWxlbWVudHMgb2YgZHJvcHpvbmVzIHRoYXQgYWNjZXB0IHRoZSB0YXJnZXQgZHJhZ2dhYmxlXG4gICAgcmVjdHMgICAgOiBbXSwgICAgICAvLyB0aGUgcmVjdHMgb2YgdGhlIGVsZW1lbnRzIG1lbnRpb25lZCBhYm92ZVxuICB9O1xuXG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCA9IGludGVyYWN0aW9uLmRyb3BFbGVtZW50ID1cbiAgICBpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldCA9IGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudCA9IG51bGw7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0aGUgZGltZW5zaW9ucyBvZiBkcm9wem9uZSBlbGVtZW50cyBhcmUgY2FsY3VsYXRlZFxuICogb24gZXZlcnkgZHJhZ21vdmUgb3Igb25seSBvbiBkcmFnc3RhcnQgZm9yIHRoZSBkZWZhdWx0IGRyb3BDaGVja2VyXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBbbmV3VmFsdWVdIFRydWUgdG8gY2hlY2sgb24gZWFjaCBtb3ZlLiBGYWxzZSB0byBjaGVjayBvbmx5XG4gKiBiZWZvcmUgc3RhcnRcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBpbnRlcmFjdH0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciBpbnRlcmFjdFxuICovXG5pbnRlcmFjdC5keW5hbWljRHJvcCA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAodXRpbHMuaXMuYm9vbChuZXdWYWx1ZSkpIHtcbiAgICAvL2lmIChkcmFnZ2luZyAmJiBkeW5hbWljRHJvcCAhPT0gbmV3VmFsdWUgJiYgIW5ld1ZhbHVlKSB7XG4gICAgICAvL2NhbGNSZWN0cyhkcm9wem9uZXMpO1xuICAgIC8vfVxuXG4gICAgZHluYW1pY0Ryb3AgPSBuZXdWYWx1ZTtcblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuICByZXR1cm4gZHluYW1pY0Ryb3A7XG59O1xuXG51dGlscy5tZXJnZShJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgW1xuICAnZHJhZ2VudGVyJyxcbiAgJ2RyYWdsZWF2ZScsXG4gICdkcm9wYWN0aXZhdGUnLFxuICAnZHJvcGRlYWN0aXZhdGUnLFxuICAnZHJvcG1vdmUnLFxuICAnZHJvcCcsXG5dKTtcbmFjdGlvbnMubWV0aG9kRGljdC5kcm9wID0gJ2Ryb3B6b25lJztcblxuZGVmYXVsdE9wdGlvbnMuZHJvcCA9IGRyb3AuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gZHJvcDtcbiIsIi8qKiBAbW9kdWxlIGludGVyYWN0ICovXG5cbmNvbnN0IGJyb3dzZXIgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpO1xuY29uc3QgZXZlbnRzICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbmNvbnN0IHV0aWxzICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IHNjb3BlICAgICAgICA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbmNvbnN0IEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgPSByZXF1aXJlKCcuL0ludGVyYWN0aW9uJyk7XG5cbmNvbnN0IGdsb2JhbEV2ZW50cyA9IHt9O1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdCgnI2RyYWdnYWJsZScpLmRyYWdnYWJsZSh0cnVlKTtcbiAqXG4gKiB2YXIgcmVjdGFibGVzID0gaW50ZXJhY3QoJ3JlY3QnKTtcbiAqIHJlY3RhYmxlc1xuICogICAuZ2VzdHVyYWJsZSh0cnVlKVxuICogICAub24oJ2dlc3R1cmVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gKiAgICAgICAvLyAuLi5cbiAqICAgfSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgbWV0aG9kcyBvZiB0aGlzIHZhcmlhYmxlIGNhbiBiZSB1c2VkIHRvIHNldCBlbGVtZW50cyBhcyBpbnRlcmFjdGFibGVzXG4gKiBhbmQgYWxzbyB0byBjaGFuZ2UgdmFyaW91cyBkZWZhdWx0IHNldHRpbmdzLlxuICpcbiAqIENhbGxpbmcgaXQgYXMgYSBmdW5jdGlvbiBhbmQgcGFzc2luZyBhbiBlbGVtZW50IG9yIGEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gKiBzdHJpbmcgcmV0dXJucyBhbiBJbnRlcmFjdGFibGUgb2JqZWN0IHdoaWNoIGhhcyB2YXJpb3VzIG1ldGhvZHMgdG8gY29uZmlndXJlXG4gKiBpdC5cbiAqXG4gKiBAZ2xvYmFsXG4gKlxuICogQHBhcmFtIHtFbGVtZW50IHwgc3RyaW5nfSBlbGVtZW50IFRoZSBIVE1MIG9yIFNWRyBFbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIG9yIENTUyBzZWxlY3RvclxuICogQHJldHVybiB7SW50ZXJhY3RhYmxlfVxuICovXG5mdW5jdGlvbiBpbnRlcmFjdCAoZWxlbWVudCwgb3B0aW9ucykge1xuICBsZXQgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5nZXQoZWxlbWVudCwgb3B0aW9ucyk7XG5cbiAgaWYgKCFpbnRlcmFjdGFibGUpIHtcbiAgICBpbnRlcmFjdGFibGUgPSBuZXcgSW50ZXJhY3RhYmxlKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgIGludGVyYWN0YWJsZS5ldmVudHMuZ2xvYmFsID0gZ2xvYmFsRXZlbnRzO1xuICB9XG5cbiAgcmV0dXJuIGludGVyYWN0YWJsZTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhbiBlbGVtZW50IG9yIHNlbGVjdG9yIGhhcyBiZWVuIHNldCB3aXRoIHRoZSB7QGxpbmsgaW50ZXJhY3R9XG4gKiBmdW5jdGlvblxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3QuaXNTZXRcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIEVsZW1lbnQgYmVpbmcgc2VhcmNoZWQgZm9yXG4gKiBAcmV0dXJuIHtib29sZWFufSBJbmRpY2F0ZXMgaWYgdGhlIGVsZW1lbnQgb3IgQ1NTIHNlbGVjdG9yIHdhcyBwcmV2aW91c2x5XG4gKiBwYXNzZWQgdG8gaW50ZXJhY3RcbiovXG5pbnRlcmFjdC5pc1NldCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gIHJldHVybiBzY29wZS5pbnRlcmFjdGFibGVzLmluZGV4T2ZFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0KSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIEFkZCBhIGdsb2JhbCBsaXN0ZW5lciBmb3IgYW4gSW50ZXJhY3RFdmVudCBvciBhZGRzIGEgRE9NIGV2ZW50IHRvIGBkb2N1bWVudGBcbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0Lm9uXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheSB8IG9iamVjdH0gdHlwZSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRvIGxpc3RlbiBmb3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBmdW5jdGlvbiBldmVudCAocylcbiAqIEBwYXJhbSB7b2JqZWN0IHwgYm9vbGVhbn0gW29wdGlvbnNdIG9iamVjdCBvciB1c2VDYXB0dXJlIGZsYWcgZm9yXG4gKiBhZGRFdmVudExpc3RlbmVyXG4gKiBAcmV0dXJuIHtvYmplY3R9IGludGVyYWN0XG4gKi9cbmludGVyYWN0Lm9uID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5zdHJpbmcodHlwZSkgJiYgdHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICB0eXBlID0gdHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYXJyYXkodHlwZSkpIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50VHlwZSBvZiB0eXBlKSB7XG4gICAgICBpbnRlcmFjdC5vbihldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICBpZiAodXRpbHMuaXMub2JqZWN0KHR5cGUpKSB7XG4gICAgZm9yIChjb25zdCBwcm9wIGluIHR5cGUpIHtcbiAgICAgIGludGVyYWN0Lm9uKHByb3AsIHR5cGVbcHJvcF0sIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICAvLyBpZiBpdCBpcyBhbiBJbnRlcmFjdEV2ZW50IHR5cGUsIGFkZCBsaXN0ZW5lciB0byBnbG9iYWxFdmVudHNcbiAgaWYgKHV0aWxzLmNvbnRhaW5zKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCB0eXBlKSkge1xuICAgIC8vIGlmIHRoaXMgdHlwZSBvZiBldmVudCB3YXMgbmV2ZXIgYm91bmRcbiAgICBpZiAoIWdsb2JhbEV2ZW50c1t0eXBlXSkge1xuICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBnbG9iYWxFdmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICB9XG4gIC8vIElmIG5vbiBJbnRlcmFjdEV2ZW50IHR5cGUsIGFkZEV2ZW50TGlzdGVuZXIgdG8gZG9jdW1lbnRcbiAgZWxzZSB7XG4gICAgZXZlbnRzLmFkZChzY29wZS5kb2N1bWVudCwgdHlwZSwgbGlzdGVuZXIsIHsgb3B0aW9ucyB9KTtcbiAgfVxuXG4gIHJldHVybiBpbnRlcmFjdDtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIGdsb2JhbCBJbnRlcmFjdEV2ZW50IGxpc3RlbmVyIG9yIERPTSBldmVudCBmcm9tIGBkb2N1bWVudGBcbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0Lm9mZlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IHR5cGUgVGhlIHR5cGVzIG9mIGV2ZW50cyB0aGF0IHdlcmUgbGlzdGVuZWRcbiAqIGZvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7b2JqZWN0IHwgYm9vbGVhbn0gb3B0aW9ucyBbb3B0aW9uc10gb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZyBmb3JcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAqIEByZXR1cm4ge29iamVjdH0gaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3Qub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5zdHJpbmcodHlwZSkgJiYgdHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICB0eXBlID0gdHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYXJyYXkodHlwZSkpIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50VHlwZSBvZiB0eXBlKSB7XG4gICAgICBpbnRlcmFjdC5vZmYoZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLm9iamVjdCh0eXBlKSkge1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0eXBlKSB7XG4gICAgICBpbnRlcmFjdC5vZmYocHJvcCwgdHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIGlmICghdXRpbHMuY29udGFpbnMoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIHR5cGUpKSB7XG4gICAgZXZlbnRzLnJlbW92ZShzY29wZS5kb2N1bWVudCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICB9XG4gIGVsc2Uge1xuICAgIGxldCBpbmRleDtcblxuICAgIGlmICh0eXBlIGluIGdsb2JhbEV2ZW50c1xuICAgICAgICAmJiAoaW5kZXggPSBnbG9iYWxFdmVudHNbdHlwZV0uaW5kZXhPZihsaXN0ZW5lcikpICE9PSAtMSkge1xuICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGludGVyYWN0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB3aGljaCBleHBvc2VzIGludGVybmFsIGRhdGFcblxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5kZWJ1Z1xuICpcbiAqIEByZXR1cm4ge29iamVjdH0gQW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyB0aGF0IG91dGxpbmUgdGhlIGN1cnJlbnQgc3RhdGVcbiAqIGFuZCBleHBvc2UgaW50ZXJuYWwgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbiAqL1xuaW50ZXJhY3QuZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBzY29wZTtcbn07XG5cbi8vIGV4cG9zZSB0aGUgZnVuY3Rpb25zIHVzZWQgdG8gY2FsY3VsYXRlIG11bHRpLXRvdWNoIHByb3BlcnRpZXNcbmludGVyYWN0LmdldFBvaW50ZXJBdmVyYWdlICA9IHV0aWxzLnBvaW50ZXJBdmVyYWdlO1xuaW50ZXJhY3QuZ2V0VG91Y2hCQm94ICAgICAgID0gdXRpbHMudG91Y2hCQm94O1xuaW50ZXJhY3QuZ2V0VG91Y2hEaXN0YW5jZSAgID0gdXRpbHMudG91Y2hEaXN0YW5jZTtcbmludGVyYWN0LmdldFRvdWNoQW5nbGUgICAgICA9IHV0aWxzLnRvdWNoQW5nbGU7XG5cbmludGVyYWN0LmdldEVsZW1lbnRSZWN0ICAgICAgID0gdXRpbHMuZ2V0RWxlbWVudFJlY3Q7XG5pbnRlcmFjdC5nZXRFbGVtZW50Q2xpZW50UmVjdCA9IHV0aWxzLmdldEVsZW1lbnRDbGllbnRSZWN0O1xuaW50ZXJhY3QubWF0Y2hlc1NlbGVjdG9yICAgICAgPSB1dGlscy5tYXRjaGVzU2VsZWN0b3I7XG5pbnRlcmFjdC5jbG9zZXN0ICAgICAgICAgICAgICA9IHV0aWxzLmNsb3Nlc3Q7XG5cbi8qKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5zdXBwb3J0c1RvdWNoXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdG91Y2ggaW5wdXRcbiAqL1xuaW50ZXJhY3Quc3VwcG9ydHNUb3VjaCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGJyb3dzZXIuc3VwcG9ydHNUb3VjaDtcbn07XG5cbi8qKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5zdXBwb3J0c1BvaW50ZXJFdmVudFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIFBvaW50ZXJFdmVudHNcbiAqL1xuaW50ZXJhY3Quc3VwcG9ydHNQb2ludGVyRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBicm93c2VyLnN1cHBvcnRzUG9pbnRlckV2ZW50O1xufTtcblxuLyoqXG4gKiBDYW5jZWxzIGFsbCBpbnRlcmFjdGlvbnMgKGVuZCBldmVudHMgYXJlIG5vdCBmaXJlZClcbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LnN0b3BcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBBbiBldmVudCBvbiB3aGljaCB0byBjYWxsIHByZXZlbnREZWZhdWx0KClcbiAqIEByZXR1cm4ge29iamVjdH0gaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3Quc3RvcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBmb3IgKGxldCBpID0gc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgc2NvcGUuaW50ZXJhY3Rpb25zW2ldLnN0b3AoZXZlbnQpO1xuICB9XG5cbiAgcmV0dXJuIGludGVyYWN0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgdGhlIGRpc3RhbmNlIHRoZSBwb2ludGVyIG11c3QgYmUgbW92ZWQgYmVmb3JlIGFuIGFjdGlvblxuICogc2VxdWVuY2Ugb2NjdXJzLiBUaGlzIGFsc28gYWZmZWN0cyB0b2xlcmFuY2UgZm9yIHRhcCBldmVudHMuXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5wb2ludGVyTW92ZVRvbGVyYW5jZVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbmV3VmFsdWVdIFRoZSBtb3ZlbWVudCBmcm9tIHRoZSBzdGFydCBwb3NpdGlvbiBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB0aGlzIHZhbHVlXG4gKiBAcmV0dXJuIHtpbnRlcmFjdCB8IG51bWJlcn1cbiAqL1xuaW50ZXJhY3QucG9pbnRlck1vdmVUb2xlcmFuY2UgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgaWYgKHV0aWxzLmlzLm51bWJlcihuZXdWYWx1ZSkpIHtcbiAgICBJbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZSA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgcmV0dXJuIEludGVyYWN0aW9uLnBvaW50ZXJNb3ZlVG9sZXJhbmNlO1xufTtcblxuaW50ZXJhY3QuYWRkRG9jdW1lbnQgICAgPSBzY29wZS5hZGREb2N1bWVudDtcbmludGVyYWN0LnJlbW92ZURvY3VtZW50ID0gc2NvcGUucmVtb3ZlRG9jdW1lbnQ7XG5cbnNjb3BlLmludGVyYWN0ID0gaW50ZXJhY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJhY3Q7XG4iLCJjb25zdCBhY3Rpb25zICAgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgSW50ZXJhY3RFdmVudCAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG4vKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xuY29uc3QgSW50ZXJhY3RhYmxlICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxuY29uc3QgZHJhZyA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkICAgICA6IGZhbHNlLFxuICAgIG1vdXNlQnV0dG9uczogbnVsbCxcblxuICAgIG9yaWdpbiAgICA6IG51bGwsXG4gICAgc25hcCAgICAgIDogbnVsbCxcbiAgICByZXN0cmljdCAgOiBudWxsLFxuICAgIGluZXJ0aWEgICA6IG51bGwsXG4gICAgYXV0b1Njcm9sbDogbnVsbCxcblxuICAgIHN0YXJ0QXhpcyA6ICd4eScsXG4gICAgbG9ja0F4aXMgIDogJ3h5JyxcbiAgfSxcblxuICBjaGVja2VyOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGludGVyYWN0YWJsZSkge1xuICAgIGNvbnN0IGRyYWdPcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnMuZHJhZztcblxuICAgIHJldHVybiBkcmFnT3B0aW9ucy5lbmFibGVkXG4gICAgICA/IHsgbmFtZTogJ2RyYWcnLCBheGlzOiAoZHJhZ09wdGlvbnMubG9ja0F4aXMgPT09ICdzdGFydCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGRyYWdPcHRpb25zLnN0YXJ0QXhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZHJhZ09wdGlvbnMubG9ja0F4aXMpfVxuICAgICAgOiBudWxsO1xuICB9LFxuXG4gIGdldEN1cnNvcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnbW92ZSc7XG4gIH0sXG59O1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdiZWZvcmUtYWN0aW9uLW1vdmUnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICE9PSAnZHJhZycpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgYXhpcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmF4aXM7XG5cbiAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlLnkgICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueTtcbiAgICBpbnRlcmFjdGlvbi5jdXJDb29yZHMuY2xpZW50LnkgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueTtcblxuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnNwZWVkICAgPSBNYXRoLmFicyhpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS52eCk7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC5zcGVlZCA9IE1hdGguYWJzKGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudngpO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudnkgPSAwO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnZ5ICAgPSAwO1xuICB9XG4gIGVsc2UgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlLnggICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueDtcbiAgICBpbnRlcmFjdGlvbi5jdXJDb29yZHMuY2xpZW50LnggPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueDtcblxuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnNwZWVkICAgPSBNYXRoLmFicyhpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS52eSk7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC5zcGVlZCA9IE1hdGguYWJzKGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudnkpO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudnggPSAwO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnZ4ICAgPSAwO1xuICB9XG59KTtcblxuLy8gZHJhZ21vdmVcbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKHsgaUV2ZW50LCBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ2RyYWdtb3ZlJykgeyByZXR1cm47IH1cblxuICBjb25zdCBheGlzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuYXhpcztcblxuICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgaUV2ZW50LnBhZ2VZICAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnk7XG4gICAgaUV2ZW50LmNsaWVudFkgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueTtcbiAgICBpRXZlbnQuZHkgPSAwO1xuICB9XG4gIGVsc2UgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgIGlFdmVudC5wYWdlWCAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS54O1xuICAgIGlFdmVudC5jbGllbnRYID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lng7XG4gICAgaUV2ZW50LmR4ID0gMDtcbiAgfVxufSk7XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KGVsZW1lbnQpLmRyYWdnYWJsZSh7XG4gKiAgICAgb25zdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgICBvbm1vdmUgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICAgIG9uZW5kICA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKlxuICogICAgIC8vIHRoZSBheGlzIGluIHdoaWNoIHRoZSBmaXJzdCBtb3ZlbWVudCBtdXN0IGJlXG4gKiAgICAgLy8gZm9yIHRoZSBkcmFnIHNlcXVlbmNlIHRvIHN0YXJ0XG4gKiAgICAgLy8gJ3h5JyBieSBkZWZhdWx0IC0gYW55IGRpcmVjdGlvblxuICogICAgIHN0YXJ0QXhpczogJ3gnIHx8ICd5JyB8fCAneHknLFxuICpcbiAqICAgICAvLyAneHknIGJ5IGRlZmF1bHQgLSBkb24ndCByZXN0cmljdCB0byBvbmUgYXhpcyAobW92ZSBpbiBhbnkgZGlyZWN0aW9uKVxuICogICAgIC8vICd4JyBvciAneScgdG8gcmVzdHJpY3QgbW92ZW1lbnQgdG8gZWl0aGVyIGF4aXNcbiAqICAgICAvLyAnc3RhcnQnIHRvIHJlc3RyaWN0IG1vdmVtZW50IHRvIHRoZSBheGlzIHRoZSBkcmFnIHN0YXJ0ZWQgaW5cbiAqICAgICBsb2NrQXhpczogJ3gnIHx8ICd5JyB8fCAneHknIHx8ICdzdGFydCcsXG4gKlxuICogICAgIC8vIG1heCBudW1iZXIgb2YgZHJhZ3MgdGhhdCBjYW4gaGFwcGVuIGNvbmN1cnJlbnRseVxuICogICAgIC8vIHdpdGggZWxlbWVudHMgb2YgdGhpcyBJbnRlcmFjdGFibGUuIEluZmluaXR5IGJ5IGRlZmF1bHRcbiAqICAgICBtYXg6IEluZmluaXR5LFxuICpcbiAqICAgICAvLyBtYXggbnVtYmVyIG9mIGRyYWdzIHRoYXQgY2FuIHRhcmdldCB0aGUgc2FtZSBlbGVtZW50K0ludGVyYWN0YWJsZVxuICogICAgIC8vIDEgYnkgZGVmYXVsdFxuICogICAgIG1heFBlckVsZW1lbnQ6IDJcbiAqIH0pO1xuICpcbiAqIHZhciBpc0RyYWdnYWJsZSA9IGludGVyYWN0KCdlbGVtZW50JykuZHJhZ2dhYmxlKCk7IC8vIHRydWVcbiAqIGBgYFxuICpcbiAqIEdldCBvciBzZXQgd2hldGhlciBkcmFnIGFjdGlvbnMgY2FuIGJlIHBlcmZvcm1lZCBvbiB0aGUgdGFyZ2V0XG4gKlxuICogQHBhcmFtIHtib29sZWFuIHwgb2JqZWN0fSBbb3B0aW9uc10gdHJ1ZS9mYWxzZSBvciBBbiBvYmplY3Qgd2l0aCBldmVudFxuICogbGlzdGVuZXJzIHRvIGJlIGZpcmVkIG9uIGRyYWcgZXZlbnRzIChvYmplY3QgbWFrZXMgdGhlIEludGVyYWN0YWJsZVxuICogZHJhZ2dhYmxlKVxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoaXMgY2FuIGJlIHRoZVxuICogdGFyZ2V0IG9mIGRyYWcgZXZlbnRzLCBvciB0aGlzIEludGVyY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZHJhZ2dhYmxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLm9iamVjdChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5kcmFnLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcbiAgICB0aGlzLnNldFBlckFjdGlvbignZHJhZycsIG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0T25FdmVudHMoJ2RyYWcnLCBvcHRpb25zKTtcblxuICAgIGlmICgvXih4eXx4fHl8c3RhcnQpJC8udGVzdChvcHRpb25zLmxvY2tBeGlzKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmRyYWcubG9ja0F4aXMgPSBvcHRpb25zLmxvY2tBeGlzO1xuICAgIH1cbiAgICBpZiAoL14oeHl8eHx5KSQvLnRlc3Qob3B0aW9ucy5zdGFydEF4aXMpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJhZy5zdGFydEF4aXMgPSBvcHRpb25zLnN0YXJ0QXhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmRyYWcuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMub25kcmFnc3RhcnQgPSB0aGlzLm9uZHJhZ3N0YXJ0ID0gdGhpcy5vbmRyYWdlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcmFnO1xufTtcblxuYWN0aW9ucy5kcmFnID0gZHJhZztcbmFjdGlvbnMubmFtZXMucHVzaCgnZHJhZycpO1xudXRpbHMubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIFtcbiAgJ2RyYWdzdGFydCcsXG4gICdkcmFnbW92ZScsXG4gICdkcmFnaW5lcnRpYXN0YXJ0JyxcbiAgJ2RyYWdpbmVydGlhcmVzdW1lJyxcbiAgJ2RyYWdlbmQnLFxuXSk7XG5hY3Rpb25zLm1ldGhvZERpY3QuZHJhZyA9ICdkcmFnZ2FibGUnO1xuXG5kZWZhdWx0T3B0aW9ucy5kcmFnID0gZHJhZy5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBkcmFnO1xuIiwiY29uc3QgY2xvbmUgICAgID0gcmVxdWlyZSgnLi91dGlscy9jbG9uZScpO1xuY29uc3QgaXMgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9pcycpO1xuY29uc3QgZXZlbnRzICAgID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbmNvbnN0IGV4dGVuZCAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyk7XG5jb25zdCBhY3Rpb25zICAgPSByZXF1aXJlKCcuL2FjdGlvbnMvYmFzZScpO1xuY29uc3Qgc2NvcGUgICAgID0gcmVxdWlyZSgnLi9zY29wZScpO1xuY29uc3QgRXZlbnRhYmxlID0gcmVxdWlyZSgnLi9FdmVudGFibGUnKTtcbmNvbnN0IGRlZmF1bHRzICA9IHJlcXVpcmUoJy4vZGVmYXVsdE9wdGlvbnMnKTtcbmNvbnN0IHNpZ25hbHMgICA9IHJlcXVpcmUoJy4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG5jb25zdCB7XG4gIGdldEVsZW1lbnRSZWN0LFxuICBub2RlQ29udGFpbnMsXG4gIHRyeVNlbGVjdG9yLFxuICBtYXRjaGVzU2VsZWN0b3IsXG59ICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZG9tVXRpbHMnKTtcbmNvbnN0IHsgZ2V0V2luZG93IH0gID0gcmVxdWlyZSgnLi91dGlscy93aW5kb3cnKTtcbmNvbnN0IHsgY29udGFpbnMgfSAgID0gcmVxdWlyZSgnLi91dGlscy9hcnInKTtcbmNvbnN0IHsgd2hlZWxFdmVudCB9ID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJyk7XG5cbi8vIGFsbCBzZXQgaW50ZXJhY3RhYmxlc1xuc2NvcGUuaW50ZXJhY3RhYmxlcyA9IFtdO1xuXG5jbGFzcyBJbnRlcmFjdGFibGUge1xuICAvKiogKi9cbiAgY29uc3RydWN0b3IgKHRhcmdldCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdGhpcy50YXJnZXQgICA9IHRhcmdldDtcbiAgICB0aGlzLmV2ZW50cyAgID0gbmV3IEV2ZW50YWJsZSgpO1xuICAgIHRoaXMuX2NvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgc2NvcGUuZG9jdW1lbnQ7XG4gICAgdGhpcy5fd2luICAgICA9IGdldFdpbmRvdyh0cnlTZWxlY3Rvcih0YXJnZXQpPyB0aGlzLl9jb250ZXh0IDogdGFyZ2V0KTtcbiAgICB0aGlzLl9kb2MgICAgID0gdGhpcy5fd2luLmRvY3VtZW50O1xuXG4gICAgc2lnbmFscy5maXJlKCduZXcnLCB7XG4gICAgICB0YXJnZXQsXG4gICAgICBvcHRpb25zLFxuICAgICAgaW50ZXJhY3RhYmxlOiB0aGlzLFxuICAgICAgd2luOiB0aGlzLl93aW4sXG4gICAgfSk7XG5cbiAgICBzY29wZS5hZGREb2N1bWVudCggdGhpcy5fZG9jLCB0aGlzLl93aW4gKTtcblxuICAgIHNjb3BlLmludGVyYWN0YWJsZXMucHVzaCh0aGlzKTtcblxuICAgIHRoaXMuc2V0KG9wdGlvbnMpO1xuICB9XG5cbiAgc2V0T25FdmVudHMgKGFjdGlvbiwgcGhhc2VzKSB7XG4gICAgY29uc3Qgb25BY3Rpb24gPSAnb24nICsgYWN0aW9uO1xuXG4gICAgaWYgKGlzLmZ1bmN0aW9uKHBoYXNlcy5vbnN0YXJ0KSAgICAgICApIHsgdGhpcy5ldmVudHNbb25BY3Rpb24gKyAnc3RhcnQnICAgICAgICBdID0gcGhhc2VzLm9uc3RhcnQgICAgICAgICA7IH1cbiAgICBpZiAoaXMuZnVuY3Rpb24ocGhhc2VzLm9ubW92ZSkgICAgICAgICkgeyB0aGlzLmV2ZW50c1tvbkFjdGlvbiArICdtb3ZlJyAgICAgICAgIF0gPSBwaGFzZXMub25tb3ZlICAgICAgICAgIDsgfVxuICAgIGlmIChpcy5mdW5jdGlvbihwaGFzZXMub25lbmQpICAgICAgICAgKSB7IHRoaXMuZXZlbnRzW29uQWN0aW9uICsgJ2VuZCcgICAgICAgICAgXSA9IHBoYXNlcy5vbmVuZCAgICAgICAgICAgOyB9XG4gICAgaWYgKGlzLmZ1bmN0aW9uKHBoYXNlcy5vbmluZXJ0aWFzdGFydCkpIHsgdGhpcy5ldmVudHNbb25BY3Rpb24gKyAnaW5lcnRpYXN0YXJ0JyBdID0gcGhhc2VzLm9uaW5lcnRpYXN0YXJ0ICA7IH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UGVyQWN0aW9uIChhY3Rpb24sIG9wdGlvbnMpIHtcbiAgICAvLyBmb3IgYWxsIHRoZSBkZWZhdWx0IHBlci1hY3Rpb24gb3B0aW9uc1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICAgIC8vIGlmIHRoaXMgb3B0aW9uIGV4aXN0cyBmb3IgdGhpcyBhY3Rpb25cbiAgICAgIGlmIChvcHRpb24gaW4gZGVmYXVsdHNbYWN0aW9uXSkge1xuICAgICAgICAvLyBpZiB0aGUgb3B0aW9uIGluIHRoZSBvcHRpb25zIGFyZyBpcyBhbiBvYmplY3QgdmFsdWVcbiAgICAgICAgaWYgKGlzLm9iamVjdChvcHRpb25zW29wdGlvbl0pKSB7XG4gICAgICAgICAgLy8gZHVwbGljYXRlIHRoZSBvYmplY3QgYW5kIG1lcmdlXG4gICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSA9IGNsb25lKHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0gfHwge30pO1xuICAgICAgICAgIGV4dGVuZCh0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dLCBvcHRpb25zW29wdGlvbl0pO1xuXG4gICAgICAgICAgaWYgKGlzLm9iamVjdChkZWZhdWx0cy5wZXJBY3Rpb25bb3B0aW9uXSkgJiYgJ2VuYWJsZWQnIGluIGRlZmF1bHRzLnBlckFjdGlvbltvcHRpb25dKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dLmVuYWJsZWQgPSBvcHRpb25zW29wdGlvbl0uZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMuYm9vbChvcHRpb25zW29wdGlvbl0pICYmIGlzLm9iamVjdChkZWZhdWx0cy5wZXJBY3Rpb25bb3B0aW9uXSkpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dLmVuYWJsZWQgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9uc1tvcHRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBvciBpZiBpdCdzIG5vdCB1bmRlZmluZWQsIGRvIGEgcGxhaW4gYXNzaWdubWVudFxuICAgICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgZnVuY3Rpb24gdG8gZ2V0IGFuIEludGVyYWN0YWJsZXMgYm91bmRpbmcgcmVjdC4gQ2FuIGJlXG4gICAqIG92ZXJyaWRkZW4gdXNpbmcge0BsaW5rIEludGVyYWN0YWJsZS5yZWN0Q2hlY2tlcn0uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gW2VsZW1lbnRdIFRoZSBlbGVtZW50IHRvIG1lYXN1cmUuXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG9iamVjdCdzIGJvdW5kaW5nIHJlY3RhbmdsZS5cbiAgICovXG4gIGdldFJlY3QgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldDtcblxuICAgIGlmIChpcy5zdHJpbmcodGhpcy50YXJnZXQpICYmICEoaXMuZWxlbWVudChlbGVtZW50KSkpIHtcbiAgICAgIGVsZW1lbnQgPSB0aGlzLl9jb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRFbGVtZW50UmVjdChlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIGZ1bmN0aW9uIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBpbnRlcmFjdGFibGUnc1xuICAgKiBlbGVtZW50J3MgcmVjdGFuZ2xlXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjaGVja2VyXSBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhpcyBJbnRlcmFjdGFibGUnc1xuICAgKiBib3VuZGluZyByZWN0YW5nbGUuIFNlZSB7QGxpbmsgSW50ZXJhY3RhYmxlLmdldFJlY3R9XG4gICAqIEByZXR1cm4ge2Z1bmN0aW9uIHwgb2JqZWN0fSBUaGUgY2hlY2tlciBmdW5jdGlvbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgcmVjdENoZWNrZXIgKGNoZWNrZXIpIHtcbiAgICBpZiAoaXMuZnVuY3Rpb24oY2hlY2tlcikpIHtcbiAgICAgIHRoaXMuZ2V0UmVjdCA9IGNoZWNrZXI7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmIChjaGVja2VyID09PSBudWxsKSB7XG4gICAgICBkZWxldGUgdGhpcy5vcHRpb25zLmdldFJlY3Q7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldFJlY3Q7XG4gIH1cblxuICBfYmFja0NvbXBhdE9wdGlvbiAob3B0aW9uTmFtZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAodHJ5U2VsZWN0b3IobmV3VmFsdWUpIHx8IGlzLm9iamVjdChuZXdWYWx1ZSkpIHtcbiAgICAgIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXSA9IG5ld1ZhbHVlO1xuXG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zLm5hbWVzKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbk5hbWVdID0gbmV3VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHRoZSBvcmlnaW4gb2YgdGhlIEludGVyYWN0YWJsZSdzIGVsZW1lbnQuICBUaGUgeCBhbmQgeVxuICAgKiBvZiB0aGUgb3JpZ2luIHdpbGwgYmUgc3VidHJhY3RlZCBmcm9tIGFjdGlvbiBldmVudCBjb29yZGluYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50IHwgb2JqZWN0IHwgc3RyaW5nfSBbb3JpZ2luXSBBbiBIVE1MIG9yIFNWRyBFbGVtZW50IHdob3NlXG4gICAqIHJlY3Qgd2lsbCBiZSB1c2VkLCBhbiBvYmplY3QgZWcuIHsgeDogMCwgeTogMCB9IG9yIHN0cmluZyAncGFyZW50JywgJ3NlbGYnXG4gICAqIG9yIGFueSBDU1Mgc2VsZWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgY3VycmVudCBvcmlnaW4gb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIG9yaWdpbiAobmV3VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmFja0NvbXBhdE9wdGlvbignb3JpZ2luJywgbmV3VmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb3Igc2V0cyB0aGUgbW91c2UgY29vcmRpbmF0ZSB0eXBlcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGVcbiAgICogbW92ZW1lbnQgb2YgdGhlIHBvaW50ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbmV3VmFsdWVdIFVzZSAnY2xpZW50JyBpZiB5b3Ugd2lsbCBiZSBzY3JvbGxpbmcgd2hpbGVcbiAgICogaW50ZXJhY3Rpbmc7IFVzZSAncGFnZScgaWYgeW91IHdhbnQgYXV0b1Njcm9sbCB0byB3b3JrXG4gICAqIEByZXR1cm4ge3N0cmluZyB8IG9iamVjdH0gVGhlIGN1cnJlbnQgZGVsdGFTb3VyY2Ugb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIGRlbHRhU291cmNlIChuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJ3BhZ2UnIHx8IG5ld1ZhbHVlID09PSAnY2xpZW50Jykge1xuICAgICAgdGhpcy5vcHRpb25zLmRlbHRhU291cmNlID0gbmV3VmFsdWU7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGVsdGFTb3VyY2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2VsZWN0b3IgY29udGV4dCBOb2RlIG9mIHRoZSBJbnRlcmFjdGFibGUuIFRoZSBkZWZhdWx0IGlzXG4gICAqIGB3aW5kb3cuZG9jdW1lbnRgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGUgY29udGV4dCBOb2RlIG9mIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICBjb250ZXh0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIGluQ29udGV4dCAoZWxlbWVudCkge1xuICAgIHJldHVybiAodGhpcy5fY29udGV4dCA9PT0gZWxlbWVudC5vd25lckRvY3VtZW50XG4gICAgICAgICAgICB8fCBub2RlQ29udGFpbnModGhpcy5fY29udGV4dCwgZWxlbWVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIGxpc3RlbmVycyBmb3IgdGhlIGdpdmVuIEludGVyYWN0RXZlbnQgdHlwZSBib3VuZCBnbG9iYWxseVxuICAgKiBhbmQgZGlyZWN0bHkgdG8gdGhpcyBJbnRlcmFjdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtJbnRlcmFjdEV2ZW50fSBpRXZlbnQgVGhlIEludGVyYWN0RXZlbnQgb2JqZWN0IHRvIGJlIGZpcmVkIG9uIHRoaXNcbiAgICogSW50ZXJhY3RhYmxlXG4gICAqIEByZXR1cm4ge0ludGVyYWN0YWJsZX0gdGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIGZpcmUgKGlFdmVudCkge1xuICAgIHRoaXMuZXZlbnRzLmZpcmUoaUV2ZW50KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX29uT2ZmTXVsdGlwbGUgKG1ldGhvZCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIGlmIChpcy5zdHJpbmcoZXZlbnRUeXBlKSAmJiBldmVudFR5cGUuc2VhcmNoKCcgJykgIT09IC0xKSB7XG4gICAgICBldmVudFR5cGUgPSBldmVudFR5cGUudHJpbSgpLnNwbGl0KC8gKy8pO1xuICAgIH1cblxuICAgIGlmIChpcy5hcnJheShldmVudFR5cGUpKSB7XG4gICAgICBmb3IgKGNvbnN0IHR5cGUgb2YgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXNbbWV0aG9kXSh0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChpcy5vYmplY3QoZXZlbnRUeXBlKSkge1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIGV2ZW50VHlwZSkge1xuICAgICAgICB0aGlzW21ldGhvZF0ocHJvcCwgZXZlbnRUeXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBhIGxpc3RlbmVyIGZvciBhbiBJbnRlcmFjdEV2ZW50LCBwb2ludGVyRXZlbnQgb3IgRE9NIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5IHwgb2JqZWN0fSBldmVudFR5cGUgIFRoZSB0eXBlcyBvZiBldmVudHMgdG8gbGlzdGVuXG4gICAqIGZvclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciAgIFRoZSBmdW5jdGlvbiBldmVudCAocylcbiAgICogQHBhcmFtIHtvYmplY3QgfCBib29sZWFufSBbb3B0aW9uc10gICAgb3B0aW9ucyBvYmplY3Qgb3IgdXNlQ2FwdHVyZSBmbGFnXG4gICAqIGZvciBhZGRFdmVudExpc3RlbmVyXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIG9uIChldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuX29uT2ZmTXVsdGlwbGUoJ29uJywgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmIChldmVudFR5cGUgPT09ICd3aGVlbCcpIHsgZXZlbnRUeXBlID0gd2hlZWxFdmVudDsgfVxuXG4gICAgaWYgKGNvbnRhaW5zKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vbihldmVudFR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgLy8gZGVsZWdhdGVkIGV2ZW50IGZvciBzZWxlY3RvclxuICAgIGVsc2UgaWYgKGlzLnN0cmluZyh0aGlzLnRhcmdldCkpIHtcbiAgICAgIGV2ZW50cy5hZGREZWxlZ2F0ZSh0aGlzLnRhcmdldCwgdGhpcy5fY29udGV4dCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZXZlbnRzLmFkZCh0aGlzLnRhcmdldCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBJbnRlcmFjdEV2ZW50LCBwb2ludGVyRXZlbnQgb3IgRE9NIGV2ZW50IGxpc3RlbmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IGV2ZW50VHlwZSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRoYXQgd2VyZVxuICAgKiBsaXN0ZW5lZCBmb3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWRcbiAgICogQHBhcmFtIHtvYmplY3QgfCBib29sZWFufSBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3Qgb3IgdXNlQ2FwdHVyZSBmbGFnIGZvclxuICAgKiByZW1vdmVFdmVudExpc3RlbmVyXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIG9mZiAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzLl9vbk9mZk11bHRpcGxlKCdvZmYnLCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3doZWVsJykgeyBldmVudFR5cGUgPSB3aGVlbEV2ZW50OyB9XG5cbiAgICAvLyBpZiBpdCBpcyBhbiBhY3Rpb24gZXZlbnQgdHlwZVxuICAgIGlmIChjb250YWlucyhJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5ldmVudHMub2ZmKGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICAvLyBkZWxlZ2F0ZWQgZXZlbnRcbiAgICBlbHNlIGlmIChpcy5zdHJpbmcodGhpcy50YXJnZXQpKSB7XG4gICAgICBldmVudHMucmVtb3ZlRGVsZWdhdGUodGhpcy50YXJnZXQsIHRoaXMuX2NvbnRleHQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyByZW1vdmUgbGlzdGVuZXIgZnJvbSB0aGlzIEludGVyYXRhYmxlJ3MgZWxlbWVudFxuICAgIGVsc2Uge1xuICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLnRhcmdldCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIG9wdGlvbnMgb2YgdGhpcyBJbnRlcmFjdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgVGhlIG5ldyBzZXR0aW5ncyB0byBhcHBseVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICBzZXQgKG9wdGlvbnMpIHtcbiAgICBpZiAoIWlzLm9iamVjdChvcHRpb25zKSkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IGNsb25lKGRlZmF1bHRzLmJhc2UpO1xuXG4gICAgY29uc3QgcGVyQWN0aW9ucyA9IGNsb25lKGRlZmF1bHRzLnBlckFjdGlvbik7XG5cbiAgICBmb3IgKGNvbnN0IGFjdGlvbk5hbWUgaW4gYWN0aW9ucy5tZXRob2REaWN0KSB7XG4gICAgICBjb25zdCBtZXRob2ROYW1lID0gYWN0aW9ucy5tZXRob2REaWN0W2FjdGlvbk5hbWVdO1xuXG4gICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uTmFtZV0gPSBjbG9uZShkZWZhdWx0c1thY3Rpb25OYW1lXSk7XG5cbiAgICAgIHRoaXMuc2V0UGVyQWN0aW9uKGFjdGlvbk5hbWUsIHBlckFjdGlvbnMpO1xuXG4gICAgICB0aGlzW21ldGhvZE5hbWVdKG9wdGlvbnNbYWN0aW9uTmFtZV0pO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBJbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzKSB7XG4gICAgICB0aGlzLm9wdGlvbnNbc2V0dGluZ10gPSBkZWZhdWx0cy5iYXNlW3NldHRpbmddO1xuXG4gICAgICBpZiAoc2V0dGluZyBpbiBvcHRpb25zKSB7XG4gICAgICAgIHRoaXNbc2V0dGluZ10ob3B0aW9uc1tzZXR0aW5nXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCdzZXQnLCB7XG4gICAgICBvcHRpb25zLFxuICAgICAgaW50ZXJhY3RhYmxlOiB0aGlzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoaXMgaW50ZXJhY3RhYmxlIGZyb20gdGhlIGxpc3Qgb2YgaW50ZXJhY3RhYmxlcyBhbmQgcmVtb3ZlIGl0J3NcbiAgICogYWN0aW9uIGNhcGFiaWxpdGllcyBhbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAqXG4gICAqIEByZXR1cm4ge2ludGVyYWN0fVxuICAgKi9cbiAgdW5zZXQgKCkge1xuICAgIGV2ZW50cy5yZW1vdmUodGhpcy50YXJnZXQsICdhbGwnKTtcblxuICAgIGlmIChpcy5zdHJpbmcodGhpcy50YXJnZXQpKSB7XG4gICAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGV2ZW50c1xuICAgICAgZm9yIChjb25zdCB0eXBlIGluIGV2ZW50cy5kZWxlZ2F0ZWRFdmVudHMpIHtcbiAgICAgICAgY29uc3QgZGVsZWdhdGVkID0gZXZlbnRzLmRlbGVnYXRlZEV2ZW50c1t0eXBlXTtcblxuICAgICAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1swXSA9PT0gdGhpcy50YXJnZXRcbiAgICAgICAgICAgICYmIGRlbGVnYXRlZC5jb250ZXh0c1swXSA9PT0gdGhpcy5fY29udGV4dCkge1xuXG4gICAgICAgICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgZGVsZWdhdGVkLmNvbnRleHRzIC5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgZGVsZWdhdGVkLmxpc3RlbmVycy5zcGxpY2UoMCwgMSk7XG5cbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGFycmF5cyBpZiB0aGV5IGFyZSBlbXB0eVxuICAgICAgICAgIGlmICghZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGVnYXRlZFt0eXBlXSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLl9jb250ZXh0LCB0eXBlLCBldmVudHMuZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy5fY29udGV4dCwgdHlwZSwgZXZlbnRzLmRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLCAnYWxsJyk7XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCd1bnNldCcsIHsgaW50ZXJhY3RhYmxlOiB0aGlzIH0pO1xuXG4gICAgc2NvcGUuaW50ZXJhY3RhYmxlcy5zcGxpY2Uoc2NvcGUuaW50ZXJhY3RhYmxlcy5pbmRleE9mKHRoaXMpLCAxKTtcblxuICAgIC8vIFN0b3AgcmVsYXRlZCBpbnRlcmFjdGlvbnMgd2hlbiBhbiBJbnRlcmFjdGFibGUgaXMgdW5zZXRcbiAgICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucyB8fCBbXSkge1xuICAgICAgaWYgKGludGVyYWN0aW9uLnRhcmdldCA9PT0gdGhpcyAmJiBpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpICYmICFpbnRlcmFjdGlvbi5fZW5kaW5nKSB7XG4gICAgICAgIGludGVyYWN0aW9uLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2NvcGUuaW50ZXJhY3Q7XG4gIH1cbn1cblxuc2NvcGUuaW50ZXJhY3RhYmxlcy5pbmRleE9mRWxlbWVudCA9IGZ1bmN0aW9uIGluZGV4T2ZFbGVtZW50ICh0YXJnZXQsIGNvbnRleHQpIHtcbiAgY29udGV4dCA9IGNvbnRleHQgfHwgc2NvcGUuZG9jdW1lbnQ7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaW50ZXJhY3RhYmxlID0gdGhpc1tpXTtcblxuICAgIGlmIChpbnRlcmFjdGFibGUudGFyZ2V0ID09PSB0YXJnZXQgJiYgaW50ZXJhY3RhYmxlLl9jb250ZXh0ID09PSBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuc2NvcGUuaW50ZXJhY3RhYmxlcy5nZXQgPSBmdW5jdGlvbiBpbnRlcmFjdGFibGVHZXQgKGVsZW1lbnQsIG9wdGlvbnMsIGRvbnRDaGVja0luQ29udGV4dCkge1xuICBjb25zdCByZXQgPSB0aGlzW3RoaXMuaW5kZXhPZkVsZW1lbnQoZWxlbWVudCwgb3B0aW9ucyAmJiBvcHRpb25zLmNvbnRleHQpXTtcblxuICByZXR1cm4gcmV0ICYmIChpcy5zdHJpbmcoZWxlbWVudCkgfHwgZG9udENoZWNrSW5Db250ZXh0IHx8IHJldC5pbkNvbnRleHQoZWxlbWVudCkpPyByZXQgOiBudWxsO1xufTtcblxuc2NvcGUuaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2ggPSBmdW5jdGlvbiAoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgZm9yIChjb25zdCBpbnRlcmFjdGFibGUgb2YgdGhpcykge1xuICAgIGxldCByZXQ7XG5cbiAgICBpZiAoKGlzLnN0cmluZyhpbnRlcmFjdGFibGUudGFyZ2V0KVxuICAgICAgICAvLyB0YXJnZXQgaXMgYSBzZWxlY3RvciBhbmQgdGhlIGVsZW1lbnQgbWF0Y2hlc1xuICAgICAgICA/IChpcy5lbGVtZW50KGVsZW1lbnQpICYmIG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBpbnRlcmFjdGFibGUudGFyZ2V0KSlcbiAgICAgICAgLy8gdGFyZ2V0IGlzIHRoZSBlbGVtZW50XG4gICAgICAgIDogZWxlbWVudCA9PT0gaW50ZXJhY3RhYmxlLnRhcmdldClcbiAgICAgICAgLy8gdGhlIGVsZW1lbnQgaXMgaW4gY29udGV4dFxuICAgICAgJiYgKGludGVyYWN0YWJsZS5pbkNvbnRleHQoZWxlbWVudCkpKSB7XG4gICAgICByZXQgPSBjYWxsYmFjayhpbnRlcmFjdGFibGUpO1xuICAgIH1cblxuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGFsbCBpbnRlcmFjdC5qcyBldmVudFR5cGVzXG5JbnRlcmFjdGFibGUuZXZlbnRUeXBlcyA9IHNjb3BlLmV2ZW50VHlwZXMgPSBbXTtcblxuSW50ZXJhY3RhYmxlLnNpZ25hbHMgPSBzaWduYWxzO1xuXG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzID0gWyAnZGVsdGFTb3VyY2UnLCAnb3JpZ2luJywgJ3ByZXZlbnREZWZhdWx0JywgJ3JlY3RDaGVja2VyJyBdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyYWN0YWJsZTtcbiIsImNvbnN0IGlzID0gcmVxdWlyZSgnLi9pcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsb25lIChzb3VyY2UpIHtcbiAgY29uc3QgZGVzdCA9IHt9O1xuICBmb3IgKGNvbnN0IHByb3AgaW4gc291cmNlKSB7XG4gICAgaWYgKGlzLnBsYWluT2JqZWN0KHNvdXJjZVtwcm9wXSkpIHtcbiAgICAgIGRlc3RbcHJvcF0gPSBjbG9uZShzb3VyY2VbcHJvcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdDtcbn07XG4iLCJjb25zdCBJbnRlcmFjdGlvbiAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG5cbmNvbnN0IGFjdGlvbnMgPSB7XG4gIGZpcmVQcmVwYXJlZCxcbiAgbmFtZXM6IFtdLFxuICBtZXRob2REaWN0OiB7fSxcbn07XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1zdGFydCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudCB9KSB7XG4gIGludGVyYWN0aW9uLl9pbnRlcmFjdGluZyA9IHRydWU7XG4gIGZpcmVQcmVwYXJlZChpbnRlcmFjdGlvbiwgZXZlbnQsICdzdGFydCcpO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1tb3ZlJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50LCBwcmVFbmQgfSkge1xuICBmaXJlUHJlcGFyZWQoaW50ZXJhY3Rpb24sIGV2ZW50LCAnbW92ZScsIHByZUVuZCk7XG5cbiAgLy8gaWYgdGhlIGFjdGlvbiB3YXMgZW5kZWQgaW4gYSBsaXN0ZW5lclxuICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHsgcmV0dXJuIGZhbHNlOyB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLWVuZCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudCB9KSB7XG4gIGZpcmVQcmVwYXJlZChpbnRlcmFjdGlvbiwgZXZlbnQsICdlbmQnKTtcbn0pO1xuXG5mdW5jdGlvbiBmaXJlUHJlcGFyZWQgKGludGVyYWN0aW9uLCBldmVudCwgcGhhc2UsIHByZUVuZCkge1xuICBjb25zdCBhY3Rpb25OYW1lID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZTtcblxuICBjb25zdCBuZXdFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KGludGVyYWN0aW9uLCBldmVudCwgYWN0aW9uTmFtZSwgcGhhc2UsIGludGVyYWN0aW9uLmVsZW1lbnQsIG51bGwsIHByZUVuZCk7XG5cbiAgaW50ZXJhY3Rpb24udGFyZ2V0LmZpcmUobmV3RXZlbnQpO1xuICBpbnRlcmFjdGlvbi5wcmV2RXZlbnQgPSBuZXdFdmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY3Rpb25zO1xuIiwiY29uc3Qgc2NvcGUgICAgICA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbmNvbnN0IHV0aWxzICAgICAgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBldmVudHMgICAgID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbmNvbnN0IGJyb3dzZXIgICAgPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXInKTtcbmNvbnN0IGRvbU9iamVjdHMgPSByZXF1aXJlKCcuL3V0aWxzL2RvbU9iamVjdHMnKTtcbmNvbnN0IGZpbmRlciAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2ludGVyYWN0aW9uRmluZGVyJyk7XG5jb25zdCBzaWduYWxzICAgID0gcmVxdWlyZSgnLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbmNvbnN0IGxpc3RlbmVycyAgID0ge307XG5jb25zdCBtZXRob2ROYW1lcyA9IFtcbiAgJ3BvaW50ZXJEb3duJywgJ3BvaW50ZXJNb3ZlJywgJ3BvaW50ZXJVcCcsXG4gICd1cGRhdGVQb2ludGVyJywgJ3JlbW92ZVBvaW50ZXInLFxuXTtcblxuLy8gZm9yIGlnbm9yaW5nIGJyb3dzZXIncyBzaW11bGF0ZWQgbW91c2UgZXZlbnRzXG5sZXQgcHJldlRvdWNoVGltZSA9IDA7XG5cbi8vIGFsbCBhY3RpdmUgYW5kIGlkbGUgaW50ZXJhY3Rpb25zXG5zY29wZS5pbnRlcmFjdGlvbnMgPSBbXTtcblxuY2xhc3MgSW50ZXJhY3Rpb24ge1xuICAvKiogKi9cbiAgY29uc3RydWN0b3IgKHsgcG9pbnRlclR5cGUgfSkge1xuICAgIHRoaXMudGFyZ2V0ICAgICAgICA9IG51bGw7IC8vIGN1cnJlbnQgaW50ZXJhY3RhYmxlIGJlaW5nIGludGVyYWN0ZWQgd2l0aFxuICAgIHRoaXMuZWxlbWVudCAgICAgICA9IG51bGw7IC8vIHRoZSB0YXJnZXQgZWxlbWVudCBvZiB0aGUgaW50ZXJhY3RhYmxlXG5cbiAgICB0aGlzLnByZXBhcmVkICAgICAgPSB7ICAgICAvLyBhY3Rpb24gdGhhdCdzIHJlYWR5IHRvIGJlIGZpcmVkIG9uIG5leHQgbW92ZSBldmVudFxuICAgICAgbmFtZSA6IG51bGwsXG4gICAgICBheGlzIDogbnVsbCxcbiAgICAgIGVkZ2VzOiBudWxsLFxuICAgIH07XG5cbiAgICAvLyBrZWVwIHRyYWNrIG9mIGFkZGVkIHBvaW50ZXJzXG4gICAgdGhpcy5wb2ludGVycyAgICA9IFtdO1xuICAgIHRoaXMucG9pbnRlcklkcyAgPSBbXTtcbiAgICB0aGlzLmRvd25UYXJnZXRzID0gW107XG4gICAgdGhpcy5kb3duVGltZXMgICA9IFtdO1xuXG4gICAgLy8gUHJldmlvdXMgbmF0aXZlIHBvaW50ZXIgbW92ZSBldmVudCBjb29yZGluYXRlc1xuICAgIHRoaXMucHJldkNvb3JkcyA9IHtcbiAgICAgIHBhZ2UgICAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBjbGllbnQgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgdGltZVN0YW1wOiAwLFxuICAgIH07XG4gICAgLy8gY3VycmVudCBuYXRpdmUgcG9pbnRlciBtb3ZlIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgdGhpcy5jdXJDb29yZHMgPSB7XG4gICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMCxcbiAgICB9O1xuXG4gICAgLy8gU3RhcnRpbmcgSW50ZXJhY3RFdmVudCBwb2ludGVyIGNvb3JkaW5hdGVzXG4gICAgdGhpcy5zdGFydENvb3JkcyA9IHtcbiAgICAgIHBhZ2UgICAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBjbGllbnQgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgdGltZVN0YW1wOiAwLFxuICAgIH07XG5cbiAgICAvLyBDaGFuZ2UgaW4gY29vcmRpbmF0ZXMgYW5kIHRpbWUgb2YgdGhlIHBvaW50ZXJcbiAgICB0aGlzLnBvaW50ZXJEZWx0YSA9IHtcbiAgICAgIHBhZ2UgICAgIDogeyB4OiAwLCB5OiAwLCB2eDogMCwgdnk6IDAsIHNwZWVkOiAwIH0sXG4gICAgICBjbGllbnQgICA6IHsgeDogMCwgeTogMCwgdng6IDAsIHZ5OiAwLCBzcGVlZDogMCB9LFxuICAgICAgdGltZVN0YW1wOiAwLFxuICAgIH07XG5cbiAgICB0aGlzLmRvd25FdmVudCAgID0gbnVsbDsgICAgLy8gcG9pbnRlcmRvd24vbW91c2Vkb3duL3RvdWNoc3RhcnQgZXZlbnRcbiAgICB0aGlzLmRvd25Qb2ludGVyID0ge307XG5cbiAgICB0aGlzLl9ldmVudFRhcmdldCAgICA9IG51bGw7XG4gICAgdGhpcy5fY3VyRXZlbnRUYXJnZXQgPSBudWxsO1xuXG4gICAgdGhpcy5wcmV2RXZlbnQgPSBudWxsOyAgICAgIC8vIHByZXZpb3VzIGFjdGlvbiBldmVudFxuXG4gICAgdGhpcy5wb2ludGVySXNEb3duICAgPSBmYWxzZTtcbiAgICB0aGlzLnBvaW50ZXJXYXNNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2ludGVyYWN0aW5nICAgID0gZmFsc2U7XG4gICAgdGhpcy5fZW5kaW5nICAgICAgICAgPSBmYWxzZTtcblxuICAgIHRoaXMucG9pbnRlclR5cGUgPSBwb2ludGVyVHlwZTtcblxuICAgIHNpZ25hbHMuZmlyZSgnbmV3JywgdGhpcyk7XG5cbiAgICBzY29wZS5pbnRlcmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIHBvaW50ZXJEb3duIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpIHtcbiAgICBjb25zdCBwb2ludGVySW5kZXggPSB0aGlzLnVwZGF0ZVBvaW50ZXIocG9pbnRlciwgZXZlbnQsIHRydWUpO1xuXG4gICAgc2lnbmFscy5maXJlKCdkb3duJywge1xuICAgICAgcG9pbnRlcixcbiAgICAgIGV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICBwb2ludGVySW5kZXgsXG4gICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBgYGBqc1xuICAgKiBpbnRlcmFjdCh0YXJnZXQpXG4gICAqICAgLmRyYWdnYWJsZSh7XG4gICAqICAgICAvLyBkaXNhYmxlIHRoZSBkZWZhdWx0IGRyYWcgc3RhcnQgYnkgZG93bi0+bW92ZVxuICAgKiAgICAgbWFudWFsU3RhcnQ6IHRydWVcbiAgICogICB9KVxuICAgKiAgIC8vIHN0YXJ0IGRyYWdnaW5nIGFmdGVyIHRoZSB1c2VyIGhvbGRzIHRoZSBwb2ludGVyIGRvd25cbiAgICogICAub24oJ2hvbGQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICogICAgIHZhciBpbnRlcmFjdGlvbiA9IGV2ZW50LmludGVyYWN0aW9uO1xuICAgKlxuICAgKiAgICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7XG4gICAqICAgICAgIGludGVyYWN0aW9uLnN0YXJ0KHsgbmFtZTogJ2RyYWcnIH0sXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmludGVyYWN0YWJsZSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAqICAgICB9XG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogU3RhcnQgYW4gYWN0aW9uIHdpdGggdGhlIGdpdmVuIEludGVyYWN0YWJsZSBhbmQgRWxlbWVudCBhcyB0YXJ0Z2V0cy4gVGhlXG4gICAqIGFjdGlvbiBtdXN0IGJlIGVuYWJsZWQgZm9yIHRoZSB0YXJnZXQgSW50ZXJhY3RhYmxlIGFuZCBhbiBhcHByb3ByaWF0ZVxuICAgKiBudW1iZXIgb2YgcG9pbnRlcnMgbXVzdCBiZSBoZWxkIGRvd24gLSAxIGZvciBkcmFnL3Jlc2l6ZSwgMiBmb3IgZ2VzdHVyZS5cbiAgICpcbiAgICogVXNlIGl0IHdpdGggYGludGVyYWN0YWJsZS48YWN0aW9uPmFibGUoeyBtYW51YWxTdGFydDogZmFsc2UgfSlgIHRvIGFsd2F5c1xuICAgKiBbc3RhcnQgYWN0aW9ucyBtYW51YWxseV0oaHR0cHM6Ly9naXRodWIuY29tL3RheWUvaW50ZXJhY3QuanMvaXNzdWVzLzExNClcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiAgIFRoZSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIC0gZHJhZywgcmVzaXplLCBldGMuXG4gICAqIEBwYXJhbSB7SW50ZXJhY3RhYmxlfSB0YXJnZXQgIFRoZSBJbnRlcmFjdGFibGUgdG8gdGFyZ2V0XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgRE9NIEVsZW1lbnQgdG8gdGFyZ2V0XG4gICAqIEByZXR1cm4ge29iamVjdH0gaW50ZXJhY3RcbiAgICovXG4gIHN0YXJ0IChhY3Rpb24sIHRhcmdldCwgZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmludGVyYWN0aW5nKClcbiAgICAgICAgfHwgIXRoaXMucG9pbnRlcklzRG93blxuICAgICAgICB8fCB0aGlzLnBvaW50ZXJJZHMubGVuZ3RoIDwgKGFjdGlvbi5uYW1lID09PSAnZ2VzdHVyZSc/IDIgOiAxKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIHRoaXMgaW50ZXJhY3Rpb24gaGFkIGJlZW4gcmVtb3ZlZCBhZnRlciBzdG9wcGluZ1xuICAgIC8vIGFkZCBpdCBiYWNrXG4gICAgaWYgKHNjb3BlLmludGVyYWN0aW9ucy5pbmRleE9mKHRoaXMpID09PSAtMSkge1xuICAgICAgc2NvcGUuaW50ZXJhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgdXRpbHMuY29weUFjdGlvbih0aGlzLnByZXBhcmVkLCBhY3Rpb24pO1xuICAgIHRoaXMudGFyZ2V0ICAgICAgICAgPSB0YXJnZXQ7XG4gICAgdGhpcy5lbGVtZW50ICAgICAgICA9IGVsZW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2FjdGlvbi1zdGFydCcsIHtcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgICAgZXZlbnQ6IHRoaXMuZG93bkV2ZW50LFxuICAgIH0pO1xuICB9XG5cbiAgcG9pbnRlck1vdmUgKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICAgIGlmICghdGhpcy5zaW11bGF0aW9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBvaW50ZXIocG9pbnRlcik7XG4gICAgICB1dGlscy5zZXRDb29yZHModGhpcy5jdXJDb29yZHMsIHRoaXMucG9pbnRlcnMpO1xuICAgIH1cblxuICAgIGNvbnN0IGR1cGxpY2F0ZU1vdmUgPSAodGhpcy5jdXJDb29yZHMucGFnZS54ID09PSB0aGlzLnByZXZDb29yZHMucGFnZS54XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmN1ckNvb3Jkcy5wYWdlLnkgPT09IHRoaXMucHJldkNvb3Jkcy5wYWdlLnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY3VyQ29vcmRzLmNsaWVudC54ID09PSB0aGlzLnByZXZDb29yZHMuY2xpZW50LnhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY3VyQ29vcmRzLmNsaWVudC55ID09PSB0aGlzLnByZXZDb29yZHMuY2xpZW50LnkpO1xuXG4gICAgbGV0IGR4O1xuICAgIGxldCBkeTtcblxuICAgIC8vIHJlZ2lzdGVyIG1vdmVtZW50IGdyZWF0ZXIgdGhhbiBwb2ludGVyTW92ZVRvbGVyYW5jZVxuICAgIGlmICh0aGlzLnBvaW50ZXJJc0Rvd24gJiYgIXRoaXMucG9pbnRlcldhc01vdmVkKSB7XG4gICAgICBkeCA9IHRoaXMuY3VyQ29vcmRzLmNsaWVudC54IC0gdGhpcy5zdGFydENvb3Jkcy5jbGllbnQueDtcbiAgICAgIGR5ID0gdGhpcy5jdXJDb29yZHMuY2xpZW50LnkgLSB0aGlzLnN0YXJ0Q29vcmRzLmNsaWVudC55O1xuXG4gICAgICB0aGlzLnBvaW50ZXJXYXNNb3ZlZCA9IHV0aWxzLmh5cG90KGR4LCBkeSkgPiBJbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZTtcbiAgICB9XG5cbiAgICBjb25zdCBzaWduYWxBcmcgPSB7XG4gICAgICBwb2ludGVyLFxuICAgICAgcG9pbnRlckluZGV4OiB0aGlzLmdldFBvaW50ZXJJbmRleChwb2ludGVyKSxcbiAgICAgIGV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICBkeCxcbiAgICAgIGR5LFxuICAgICAgZHVwbGljYXRlOiBkdXBsaWNhdGVNb3ZlLFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgICBpbnRlcmFjdGluZ0JlZm9yZU1vdmU6IHRoaXMuaW50ZXJhY3RpbmcoKSxcbiAgICB9O1xuXG4gICAgaWYgKCFkdXBsaWNhdGVNb3ZlKSB7XG4gICAgICAvLyBzZXQgcG9pbnRlciBjb29yZGluYXRlLCB0aW1lIGNoYW5nZXMgYW5kIHNwZWVkc1xuICAgICAgdXRpbHMuc2V0Q29vcmREZWx0YXModGhpcy5wb2ludGVyRGVsdGEsIHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuICAgIH1cblxuICAgIHNpZ25hbHMuZmlyZSgnbW92ZScsIHNpZ25hbEFyZyk7XG5cbiAgICBpZiAoIWR1cGxpY2F0ZU1vdmUpIHtcbiAgICAgIC8vIGlmIGludGVyYWN0aW5nLCBmaXJlIGFuICdhY3Rpb24tbW92ZScgc2lnbmFsIGV0Y1xuICAgICAgaWYgKHRoaXMuaW50ZXJhY3RpbmcoKSkge1xuICAgICAgICB0aGlzLmRvTW92ZShzaWduYWxBcmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wb2ludGVyV2FzTW92ZWQpIHtcbiAgICAgICAgdXRpbHMuY29weUNvb3Jkcyh0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYGBganNcbiAgICogaW50ZXJhY3QodGFyZ2V0KVxuICAgKiAgIC5kcmFnZ2FibGUodHJ1ZSlcbiAgICogICAub24oJ2RyYWdtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAqICAgICBpZiAoc29tZUNvbmRpdGlvbikge1xuICAgKiAgICAgICAvLyBjaGFuZ2UgdGhlIHNuYXAgc2V0dGluZ3NcbiAgICogICAgICAgZXZlbnQuaW50ZXJhY3RhYmxlLmRyYWdnYWJsZSh7IHNuYXA6IHsgdGFyZ2V0czogW10gfX0pO1xuICAgKiAgICAgICAvLyBmaXJlIGFub3RoZXIgbW92ZSBldmVudCB3aXRoIHJlLWNhbGN1bGF0ZWQgc25hcFxuICAgKiAgICAgICBldmVudC5pbnRlcmFjdGlvbi5kb01vdmUoKTtcbiAgICogICAgIH1cbiAgICogICB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIEZvcmNlIGEgbW92ZSBvZiB0aGUgY3VycmVudCBhY3Rpb24gYXQgdGhlIHNhbWUgY29vcmRpbmF0ZXMuIFVzZWZ1bCBpZlxuICAgKiBzbmFwL3Jlc3RyaWN0IGhhcyBiZWVuIGNoYW5nZWQgYW5kIHlvdSB3YW50IGEgbW92ZW1lbnQgd2l0aCB0aGUgbmV3XG4gICAqIHNldHRpbmdzLlxuICAgKi9cbiAgZG9Nb3ZlIChzaWduYWxBcmcpIHtcbiAgICBzaWduYWxBcmcgPSB1dGlscy5leHRlbmQoe1xuICAgICAgcG9pbnRlcjogdGhpcy5wb2ludGVyc1swXSxcbiAgICAgIGV2ZW50OiB0aGlzLnByZXZFdmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0OiB0aGlzLl9ldmVudFRhcmdldCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgIH0sIHNpZ25hbEFyZyB8fCB7fSk7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2JlZm9yZS1hY3Rpb24tbW92ZScsIHNpZ25hbEFyZyk7XG5cbiAgICBpZiAoIXRoaXMuX2RvbnRGaXJlTW92ZSkge1xuICAgICAgc2lnbmFscy5maXJlKCdhY3Rpb24tbW92ZScsIHNpZ25hbEFyZyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZG9udEZpcmVNb3ZlID0gZmFsc2U7XG4gIH1cblxuICAvLyBFbmQgaW50ZXJhY3QgbW92ZSBldmVudHMgYW5kIHN0b3AgYXV0by1zY3JvbGwgdW5sZXNzIHNpbXVsYXRpb24gaXMgcnVubmluZ1xuICBwb2ludGVyVXAgKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpIHtcbiAgICBjb25zdCBwb2ludGVySW5kZXggPSB0aGlzLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICAgIHNpZ25hbHMuZmlyZSgvY2FuY2VsJC9pLnRlc3QoZXZlbnQudHlwZSk/ICdjYW5jZWwnIDogJ3VwJywge1xuICAgICAgcG9pbnRlcixcbiAgICAgIHBvaW50ZXJJbmRleCxcbiAgICAgIGV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICBjdXJFdmVudFRhcmdldCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzLnNpbXVsYXRpb24pIHtcbiAgICAgIHRoaXMuZW5kKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvaW50ZXJJc0Rvd24gPSBmYWxzZTtcbiAgICB0aGlzLnJlbW92ZVBvaW50ZXIocG9pbnRlciwgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGBgYGpzXG4gICAqIGludGVyYWN0KHRhcmdldClcbiAgICogICAuZHJhZ2dhYmxlKHRydWUpXG4gICAqICAgLm9uKCdtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAqICAgICBpZiAoZXZlbnQucGFnZVggPiAxMDAwKSB7XG4gICAqICAgICAgIC8vIGVuZCB0aGUgY3VycmVudCBhY3Rpb25cbiAgICogICAgICAgZXZlbnQuaW50ZXJhY3Rpb24uZW5kKCk7XG4gICAqICAgICAgIC8vIHN0b3AgYWxsIGZ1cnRoZXIgbGlzdGVuZXJzIGZyb20gYmVpbmcgY2FsbGVkXG4gICAqICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgKiAgICAgfVxuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogU3RvcCB0aGUgY3VycmVudCBhY3Rpb24gYW5kIGZpcmUgYW4gZW5kIGV2ZW50LiBJbmVydGlhbCBtb3ZlbWVudCBkb2VzXG4gICAqIG5vdCBoYXBwZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7UG9pbnRlckV2ZW50fSBbZXZlbnRdXG4gICAqL1xuICBlbmQgKGV2ZW50KSB7XG4gICAgdGhpcy5fZW5kaW5nID0gdHJ1ZTtcblxuICAgIGV2ZW50ID0gZXZlbnQgfHwgdGhpcy5wcmV2RXZlbnQ7XG5cbiAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICBzaWduYWxzLmZpcmUoJ2FjdGlvbi1lbmQnLCB7XG4gICAgICAgIGV2ZW50LFxuICAgICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuX2VuZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgY3VycmVudEFjdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyYWN0aW5nPyB0aGlzLnByZXBhcmVkLm5hbWU6IG51bGw7XG4gIH1cblxuICBpbnRlcmFjdGluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyYWN0aW5nO1xuICB9XG5cbiAgLyoqICovXG4gIHN0b3AgKCkge1xuICAgIHNpZ25hbHMuZmlyZSgnc3RvcCcsIHsgaW50ZXJhY3Rpb246IHRoaXMgfSk7XG5cbiAgICBpZiAodGhpcy5faW50ZXJhY3RpbmcpIHtcbiAgICAgIHNpZ25hbHMuZmlyZSgnc3RvcC1hY3RpdmUnLCB7IGludGVyYWN0aW9uOiB0aGlzIH0pO1xuICAgICAgc2lnbmFscy5maXJlKCdzdG9wLScgKyB0aGlzLnByZXBhcmVkLm5hbWUsIHsgaW50ZXJhY3Rpb246IHRoaXMgfSk7XG4gICAgfVxuXG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLmVsZW1lbnQgPSBudWxsO1xuXG4gICAgdGhpcy5faW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByZXBhcmVkLm5hbWUgPSB0aGlzLnByZXZFdmVudCA9IG51bGw7XG4gIH1cblxuICBnZXRQb2ludGVySW5kZXggKHBvaW50ZXIpIHtcbiAgICAvLyBtb3VzZSBhbmQgcGVuIGludGVyYWN0aW9ucyBtYXkgaGF2ZSBvbmx5IG9uZSBwb2ludGVyXG4gICAgaWYgKHRoaXMucG9pbnRlclR5cGUgPT09ICdtb3VzZScgfHwgdGhpcy5wb2ludGVyVHlwZSA9PT0gJ3BlbicpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBvaW50ZXJJZHMuaW5kZXhPZih1dGlscy5nZXRQb2ludGVySWQocG9pbnRlcikpO1xuICB9XG5cbiAgdXBkYXRlUG9pbnRlciAocG9pbnRlciwgZXZlbnQsIGRvd24gPSBldmVudCAmJiAvKGRvd258c3RhcnQpJC9pLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICBjb25zdCBpZCA9IHV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKTtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5wb2ludGVySWRzLmxlbmd0aDtcbiAgICAgIHRoaXMucG9pbnRlcklkc1tpbmRleF0gPSBpZDtcbiAgICB9XG5cbiAgICBpZiAoZG93bikge1xuICAgICAgc2lnbmFscy5maXJlKCd1cGRhdGUtcG9pbnRlci1kb3duJywge1xuICAgICAgICBwb2ludGVyLFxuICAgICAgICBldmVudCxcbiAgICAgICAgZG93bixcbiAgICAgICAgcG9pbnRlcklkOiBpZCxcbiAgICAgICAgcG9pbnRlckluZGV4OiBpbmRleCxcbiAgICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvaW50ZXJzW2luZGV4XSA9IHBvaW50ZXI7XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICByZW1vdmVQb2ludGVyIChwb2ludGVyLCBldmVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgc2lnbmFscy5maXJlKCdyZW1vdmUtcG9pbnRlcicsIHtcbiAgICAgIHBvaW50ZXIsXG4gICAgICBldmVudCxcbiAgICAgIHBvaW50ZXJJbmRleDogaW5kZXgsXG4gICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICB9KTtcblxuICAgIHRoaXMucG9pbnRlcnMgICAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnBvaW50ZXJJZHMgLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5kb3duVGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuZG93blRpbWVzICAuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIF91cGRhdGVFdmVudFRhcmdldHMgKHRhcmdldCwgY3VycmVudFRhcmdldCkge1xuICAgIHRoaXMuX2V2ZW50VGFyZ2V0ICAgID0gdGFyZ2V0O1xuICAgIHRoaXMuX2N1ckV2ZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldDtcbiAgfVxufVxuXG5mb3IgKGNvbnN0IG1ldGhvZCBvZiBtZXRob2ROYW1lcykge1xuICBsaXN0ZW5lcnNbbWV0aG9kXSA9IGRvT25JbnRlcmFjdGlvbnMobWV0aG9kKTtcbn1cblxuZnVuY3Rpb24gZG9PbkludGVyYWN0aW9ucyAobWV0aG9kKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgcG9pbnRlclR5cGUgPSB1dGlscy5nZXRQb2ludGVyVHlwZShldmVudCk7XG4gICAgY29uc3QgW2V2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldF0gPSB1dGlscy5nZXRFdmVudFRhcmdldHMoZXZlbnQpO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbXTsgLy8gWyBbcG9pbnRlciwgaW50ZXJhY3Rpb25dLCAuLi5dXG5cbiAgICBpZiAoYnJvd3Nlci5zdXBwb3J0c1RvdWNoICYmIC90b3VjaC8udGVzdChldmVudC50eXBlKSkge1xuICAgICAgcHJldlRvdWNoVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGNoYW5nZWRUb3VjaCBvZiBldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gY2hhbmdlZFRvdWNoO1xuICAgICAgICBjb25zdCBpbnRlcmFjdGlvbiA9IGZpbmRlci5zZWFyY2gocG9pbnRlciwgZXZlbnQudHlwZSwgZXZlbnRUYXJnZXQpO1xuXG4gICAgICAgIG1hdGNoZXMucHVzaChbcG9pbnRlciwgaW50ZXJhY3Rpb24gfHwgbmV3IEludGVyYWN0aW9uKHsgcG9pbnRlclR5cGUgfSldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgaW52YWxpZFBvaW50ZXIgPSBmYWxzZTtcblxuICAgICAgaWYgKCFicm93c2VyLnN1cHBvcnRzUG9pbnRlckV2ZW50ICYmIC9tb3VzZS8udGVzdChldmVudC50eXBlKSkge1xuICAgICAgICAvLyBpZ25vcmUgbW91c2UgZXZlbnRzIHdoaWxlIHRvdWNoIGludGVyYWN0aW9ucyBhcmUgYWN0aXZlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aCAmJiAhaW52YWxpZFBvaW50ZXI7IGkrKykge1xuICAgICAgICAgIGludmFsaWRQb2ludGVyID0gc2NvcGUuaW50ZXJhY3Rpb25zW2ldLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnICYmIHNjb3BlLmludGVyYWN0aW9uc1tpXS5wb2ludGVySXNEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJ5IHRvIGlnbm9yZSBtb3VzZSBldmVudHMgdGhhdCBhcmUgc2ltdWxhdGVkIGJ5IHRoZSBicm93c2VyXG4gICAgICAgIC8vIGFmdGVyIGEgdG91Y2ggZXZlbnRcbiAgICAgICAgaW52YWxpZFBvaW50ZXIgPSBpbnZhbGlkUG9pbnRlclxuICAgICAgICAgIHx8IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHByZXZUb3VjaFRpbWUgPCA1MDApXG4gICAgICAgICAgLy8gb24gaU9TIGFuZCBGaXJlZm94IE1vYmlsZSwgTW91c2VFdmVudC50aW1lU3RhbXAgaXMgemVybyBpZiBzaW11bGF0ZWRcbiAgICAgICAgICB8fCBldmVudC50aW1lU3RhbXAgPT09IDA7XG4gICAgICB9XG5cbiAgICAgIGlmICghaW52YWxpZFBvaW50ZXIpIHtcbiAgICAgICAgbGV0IGludGVyYWN0aW9uID0gZmluZGVyLnNlYXJjaChldmVudCwgZXZlbnQudHlwZSwgZXZlbnRUYXJnZXQpO1xuXG4gICAgICAgIGlmICghaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICBpbnRlcmFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbih7IHBvaW50ZXJUeXBlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWF0Y2hlcy5wdXNoKFtldmVudCwgaW50ZXJhY3Rpb25dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtwb2ludGVyLCBpbnRlcmFjdGlvbl0gb2YgbWF0Y2hlcykge1xuICAgICAgaW50ZXJhY3Rpb24uX3VwZGF0ZUV2ZW50VGFyZ2V0cyhldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuICAgICAgaW50ZXJhY3Rpb25bbWV0aG9kXShwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlbmRBbGwgKGV2ZW50KSB7XG4gIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG4gICAgaW50ZXJhY3Rpb24uZW5kKGV2ZW50KTtcbiAgICBzaWduYWxzLmZpcmUoJ2VuZGFsbCcsIHsgZXZlbnQsIGludGVyYWN0aW9uIH0pO1xuICB9XG59XG5cbmNvbnN0IGRvY0V2ZW50cyA9IHsgLyogJ2V2ZW50VHlwZSc6IGxpc3RlbmVyRnVuYyAqLyB9O1xuY29uc3QgcEV2ZW50VHlwZXMgPSBicm93c2VyLnBFdmVudFR5cGVzO1xuXG5pZiAoZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQpIHtcbiAgZG9jRXZlbnRzW3BFdmVudFR5cGVzLmRvd24gIF0gPSBsaXN0ZW5lcnMucG9pbnRlckRvd247XG4gIGRvY0V2ZW50c1twRXZlbnRUeXBlcy5tb3ZlICBdID0gbGlzdGVuZXJzLnBvaW50ZXJNb3ZlO1xuICBkb2NFdmVudHNbcEV2ZW50VHlwZXMudXAgICAgXSA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG4gIGRvY0V2ZW50c1twRXZlbnRUeXBlcy5jYW5jZWxdID0gbGlzdGVuZXJzLnBvaW50ZXJVcDtcbn1cbmVsc2Uge1xuICBkb2NFdmVudHMubW91c2Vkb3duICAgPSBsaXN0ZW5lcnMucG9pbnRlckRvd247XG4gIGRvY0V2ZW50cy5tb3VzZW1vdmUgICA9IGxpc3RlbmVycy5wb2ludGVyTW92ZTtcbiAgZG9jRXZlbnRzLm1vdXNldXAgICAgID0gbGlzdGVuZXJzLnBvaW50ZXJVcDtcblxuICBkb2NFdmVudHMudG91Y2hzdGFydCAgPSBsaXN0ZW5lcnMucG9pbnRlckRvd247XG4gIGRvY0V2ZW50cy50b3VjaG1vdmUgICA9IGxpc3RlbmVycy5wb2ludGVyTW92ZTtcbiAgZG9jRXZlbnRzLnRvdWNoZW5kICAgID0gbGlzdGVuZXJzLnBvaW50ZXJVcDtcbiAgZG9jRXZlbnRzLnRvdWNoY2FuY2VsID0gbGlzdGVuZXJzLnBvaW50ZXJVcDtcbn1cblxuZG9jRXZlbnRzLmJsdXIgPSBlbmRBbGw7XG5cbmZ1bmN0aW9uIG9uRG9jU2lnbmFsICh7IGRvYyB9LCBzaWduYWxOYW1lKSB7XG4gIGNvbnN0IGV2ZW50TWV0aG9kID0gc2lnbmFsTmFtZS5pbmRleE9mKCdhZGQnKSA9PT0gMFxuICAgID8gZXZlbnRzLmFkZCA6IGV2ZW50cy5yZW1vdmU7XG5cbiAgLy8gZGVsZWdhdGUgZXZlbnQgbGlzdGVuZXJcbiAgZm9yIChjb25zdCBldmVudFR5cGUgaW4gc2NvcGUuZGVsZWdhdGVkRXZlbnRzKSB7XG4gICAgZXZlbnRNZXRob2QoZG9jLCBldmVudFR5cGUsIGV2ZW50cy5kZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICBldmVudE1ldGhvZChkb2MsIGV2ZW50VHlwZSwgZXZlbnRzLmRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGV2ZW50VHlwZSBpbiBkb2NFdmVudHMpIHtcbiAgICBldmVudE1ldGhvZChkb2MsIGV2ZW50VHlwZSwgZG9jRXZlbnRzW2V2ZW50VHlwZV0sIGJyb3dzZXIuaXNJT1MgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiB1bmRlZmluZWQpO1xuICB9XG59XG5cbnNpZ25hbHMub24oJ3VwZGF0ZS1wb2ludGVyLWRvd24nLCAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgcG9pbnRlcklkLCBwb2ludGVySW5kZXgsIGV2ZW50LCBldmVudFRhcmdldCwgZG93biB9KSA9PiB7XG4gIGludGVyYWN0aW9uLnBvaW50ZXJJZHNbcG9pbnRlckluZGV4XSA9IHBvaW50ZXJJZDtcbiAgaW50ZXJhY3Rpb24ucG9pbnRlcnNbcG9pbnRlckluZGV4XSA9IHBvaW50ZXI7XG5cbiAgaWYgKGRvd24pIHtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgIHV0aWxzLnNldENvb3JkcyhpbnRlcmFjdGlvbi5zdGFydENvb3JkcywgaW50ZXJhY3Rpb24ucG9pbnRlcnMpO1xuXG4gICAgdXRpbHMuY29weUNvb3JkcyhpbnRlcmFjdGlvbi5jdXJDb29yZHMgLCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcyk7XG4gICAgdXRpbHMuY29weUNvb3JkcyhpbnRlcmFjdGlvbi5wcmV2Q29vcmRzLCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcyk7XG5cbiAgICBpbnRlcmFjdGlvbi5kb3duRXZlbnQgICAgICAgICAgICAgICAgID0gZXZlbnQ7XG4gICAgaW50ZXJhY3Rpb24uZG93blRpbWVzW3BvaW50ZXJJbmRleF0gICA9IGludGVyYWN0aW9uLmN1ckNvb3Jkcy50aW1lU3RhbXA7XG4gICAgaW50ZXJhY3Rpb24uZG93blRhcmdldHNbcG9pbnRlckluZGV4XSA9IGV2ZW50VGFyZ2V0IHx8IGV2ZW50ICYmIHV0aWxzLmdldEV2ZW50VGFyZ2V0cyhldmVudClbMF07XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkICAgICAgICAgICA9IGZhbHNlO1xuXG4gICAgdXRpbHMucG9pbnRlckV4dGVuZChpbnRlcmFjdGlvbi5kb3duUG9pbnRlciwgcG9pbnRlcik7XG4gIH1cbn0pO1xuXG5zY29wZS5zaWduYWxzLm9uKCdhZGQtZG9jdW1lbnQnICAgLCBvbkRvY1NpZ25hbCk7XG5zY29wZS5zaWduYWxzLm9uKCdyZW1vdmUtZG9jdW1lbnQnLCBvbkRvY1NpZ25hbCk7XG5cbkludGVyYWN0aW9uLnBvaW50ZXJNb3ZlVG9sZXJhbmNlID0gMTtcbkludGVyYWN0aW9uLmRvT25JbnRlcmFjdGlvbnMgPSBkb09uSW50ZXJhY3Rpb25zO1xuSW50ZXJhY3Rpb24uZW5kQWxsID0gZW5kQWxsO1xuSW50ZXJhY3Rpb24uc2lnbmFscyA9IHNpZ25hbHM7XG5JbnRlcmFjdGlvbi5kb2NFdmVudHMgPSBkb2NFdmVudHM7XG5cbnNjb3BlLmVuZEFsbEludGVyYWN0aW9ucyA9IGVuZEFsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmFjdGlvbjtcbiIsImNvbnN0IHNjb3BlICAgPSByZXF1aXJlKCcuLi9zY29wZScpO1xuY29uc3QgdXRpbHMgICA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxuY29uc3QgZmluZGVyID0ge1xuICBtZXRob2RPcmRlcjogWyAnc2ltdWxhdGlvblJlc3VtZScsICdtb3VzZU9yUGVuJywgJ2hhc1BvaW50ZXInLCAnaWRsZScgXSxcblxuICBzZWFyY2g6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudFR5cGUsIGV2ZW50VGFyZ2V0KSB7XG4gICAgY29uc3QgcG9pbnRlclR5cGUgPSB1dGlscy5nZXRQb2ludGVyVHlwZShwb2ludGVyKTtcbiAgICBjb25zdCBwb2ludGVySWQgPSB1dGlscy5nZXRQb2ludGVySWQocG9pbnRlcik7XG4gICAgY29uc3QgZGV0YWlscyA9IHsgcG9pbnRlciwgcG9pbnRlcklkLCBwb2ludGVyVHlwZSwgZXZlbnRUeXBlLCBldmVudFRhcmdldCB9O1xuXG4gICAgZm9yIChjb25zdCBtZXRob2Qgb2YgZmluZGVyLm1ldGhvZE9yZGVyKSB7XG4gICAgICBjb25zdCBpbnRlcmFjdGlvbiA9IGZpbmRlclttZXRob2RdKGRldGFpbHMpO1xuXG4gICAgICBpZiAoaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyB0cnkgdG8gcmVzdW1lIHNpbXVsYXRpb24gd2l0aCBhIG5ldyBwb2ludGVyXG4gIHNpbXVsYXRpb25SZXN1bWU6IGZ1bmN0aW9uICh7IHBvaW50ZXJUeXBlLCBldmVudFR5cGUsIGV2ZW50VGFyZ2V0IH0pIHtcbiAgICBpZiAoIS9kb3dufHN0YXJ0L2kudGVzdChldmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuICAgICAgbGV0IGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgICAgaWYgKGludGVyYWN0aW9uLnNpbXVsYXRpb24gJiYgaW50ZXJhY3Rpb24uc2ltdWxhdGlvbi5hbGxvd1Jlc3VtZVxuICAgICAgICAgICYmIChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSA9PT0gcG9pbnRlclR5cGUpKSB7XG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgaXMgdGhlIGludGVyYWN0aW9uIGVsZW1lbnRcbiAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gaW50ZXJhY3Rpb24uZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gdXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8vIGlmIGl0J3MgYSBtb3VzZSBvciBwZW4gaW50ZXJhY3Rpb25cbiAgbW91c2VPclBlbjogZnVuY3Rpb24gKHsgcG9pbnRlcklkLCBwb2ludGVyVHlwZSwgZXZlbnRUeXBlIH0pIHtcbiAgICBpZiAocG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiYgcG9pbnRlclR5cGUgIT09ICdwZW4nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgZmlyc3ROb25BY3RpdmU7XG5cbiAgICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuICAgICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJUeXBlID09PSBwb2ludGVyVHlwZSkge1xuICAgICAgICAvLyBpZiBpdCdzIGEgZG93biBldmVudCwgc2tpcCBpbnRlcmFjdGlvbnMgd2l0aCBydW5uaW5nIHNpbXVsYXRpb25zXG4gICAgICAgIGlmIChpbnRlcmFjdGlvbi5zaW11bGF0aW9uICYmICF1dGlscy5jb250YWlucyhpbnRlcmFjdGlvbi5wb2ludGVySWRzLCBwb2ludGVySWQpKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGludGVyYWN0aW9uIGlzIGFjdGl2ZSwgcmV0dXJuIGl0IGltbWVkaWF0ZWx5XG4gICAgICAgIGlmIChpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIC8vIG90aGVyd2lzZSBzYXZlIGl0IGFuZCBsb29rIGZvciBhbm90aGVyIGFjdGl2ZSBpbnRlcmFjdGlvblxuICAgICAgICBlbHNlIGlmICghZmlyc3ROb25BY3RpdmUpIHtcbiAgICAgICAgICBmaXJzdE5vbkFjdGl2ZSA9IGludGVyYWN0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gYWN0aXZlIG1vdXNlIGludGVyYWN0aW9uIHdhcyBmb3VuZCB1c2UgdGhlIGZpcnN0IGluYWN0aXZlIG1vdXNlXG4gICAgLy8gaW50ZXJhY3Rpb25cbiAgICBpZiAoZmlyc3ROb25BY3RpdmUpIHtcbiAgICAgIHJldHVybiBmaXJzdE5vbkFjdGl2ZTtcbiAgICB9XG5cbiAgICAvLyBmaW5kIGFueSBtb3VzZSBvciBwZW4gaW50ZXJhY3Rpb24uXG4gICAgLy8gaWdub3JlIHRoZSBpbnRlcmFjdGlvbiBpZiB0aGUgZXZlbnRUeXBlIGlzIGEgKmRvd24sIGFuZCBhIHNpbXVsYXRpb25cbiAgICAvLyBpcyBhY3RpdmVcbiAgICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuICAgICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJUeXBlID09PSBwb2ludGVyVHlwZSAmJiAhKC9kb3duL2kudGVzdChldmVudFR5cGUpICYmIGludGVyYWN0aW9uLnNpbXVsYXRpb24pKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvLyBnZXQgaW50ZXJhY3Rpb24gdGhhdCBoYXMgdGhpcyBwb2ludGVyXG4gIGhhc1BvaW50ZXI6IGZ1bmN0aW9uICh7IHBvaW50ZXJJZCB9KSB7XG4gICAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcbiAgICAgIGlmICh1dGlscy5jb250YWlucyhpbnRlcmFjdGlvbi5wb2ludGVySWRzLCBwb2ludGVySWQpKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gZ2V0IGZpcnN0IGlkbGUgaW50ZXJhY3Rpb24gd2l0aCBhIG1hdGNoaW5nIHBvaW50ZXJUeXBlXG4gIGlkbGU6IGZ1bmN0aW9uICh7IHBvaW50ZXJUeXBlIH0pIHtcbiAgICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuICAgICAgLy8gaWYgdGhlcmUncyBhbHJlYWR5IGEgcG9pbnRlciBoZWxkIGRvd25cbiAgICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVySWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG4gICAgICAgIC8vIGRvbid0IGFkZCB0aGlzIHBvaW50ZXIgaWYgdGhlcmUgaXMgYSB0YXJnZXQgaW50ZXJhY3RhYmxlIGFuZCBpdFxuICAgICAgICAvLyBpc24ndCBnZXN0dXJhYmxlXG4gICAgICAgIGlmICh0YXJnZXQgJiYgIXRhcmdldC5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBtYXhpbXVtIG9mIDIgcG9pbnRlcnMgcGVyIGludGVyYWN0aW9uXG4gICAgICBlbHNlIGlmIChpbnRlcmFjdGlvbi5wb2ludGVySWRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgJiYgKHBvaW50ZXJUeXBlID09PSBpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kZXI7XG4iLCJjb25zdCB1dGlscyAgID0gcmVxdWlyZSgnLi91dGlscycpO1xuY29uc3QgZXZlbnRzICA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG5jb25zdCBzaWduYWxzID0gcmVxdWlyZSgnLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbmNvbnN0IHsgZ2V0V2luZG93IH0gPSByZXF1aXJlKCcuL3V0aWxzL3dpbmRvdycpO1xuXG5jb25zdCBzY29wZSA9IHtcbiAgc2lnbmFscyxcbiAgZXZlbnRzLFxuICB1dGlscyxcblxuICAvLyBtYWluIGRvY3VtZW50XG4gIGRvY3VtZW50OiByZXF1aXJlKCcuL3V0aWxzL2RvbU9iamVjdHMnKS5kb2N1bWVudCxcbiAgLy8gYWxsIGRvY3VtZW50cyBiZWluZyBsaXN0ZW5lZCB0b1xuICBkb2N1bWVudHM6IFtdLFxuXG4gIGFkZERvY3VtZW50OiBmdW5jdGlvbiAoZG9jLCB3aW4pIHtcbiAgICAvLyBkbyBub3RoaW5nIGlmIGRvY3VtZW50IGlzIGFscmVhZHkga25vd25cbiAgICBpZiAodXRpbHMuY29udGFpbnMoc2NvcGUuZG9jdW1lbnRzLCBkb2MpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgd2luID0gd2luIHx8IGdldFdpbmRvdyhkb2MpO1xuXG4gICAgc2NvcGUuZG9jdW1lbnRzLnB1c2goZG9jKTtcbiAgICBldmVudHMuZG9jdW1lbnRzLnB1c2goZG9jKTtcblxuICAgIC8vIGRvbid0IGFkZCBhbiB1bmxvYWQgZXZlbnQgZm9yIHRoZSBtYWluIGRvY3VtZW50XG4gICAgLy8gc28gdGhhdCB0aGUgcGFnZSBtYXkgYmUgY2FjaGVkIGluIGJyb3dzZXIgaGlzdG9yeVxuICAgIGlmIChkb2MgIT09IHNjb3BlLmRvY3VtZW50KSB7XG4gICAgICBldmVudHMuYWRkKHdpbiwgJ3VubG9hZCcsIHNjb3BlLm9uV2luZG93VW5sb2FkKTtcbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ2FkZC1kb2N1bWVudCcsIHsgZG9jLCB3aW4gfSk7XG4gIH0sXG5cbiAgcmVtb3ZlRG9jdW1lbnQ6IGZ1bmN0aW9uIChkb2MsIHdpbikge1xuICAgIGNvbnN0IGluZGV4ID0gc2NvcGUuZG9jdW1lbnRzLmluZGV4T2YoZG9jKTtcblxuICAgIHdpbiA9IHdpbiB8fCBnZXRXaW5kb3coZG9jKTtcblxuICAgIGV2ZW50cy5yZW1vdmUod2luLCAndW5sb2FkJywgc2NvcGUub25XaW5kb3dVbmxvYWQpO1xuXG4gICAgc2NvcGUuZG9jdW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgZXZlbnRzLmRvY3VtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgc2lnbmFscy5maXJlKCdyZW1vdmUtZG9jdW1lbnQnLCB7IHdpbiwgZG9jIH0pO1xuICB9LFxuXG4gIG9uV2luZG93VW5sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgc2NvcGUucmVtb3ZlRG9jdW1lbnQodGhpcy5kb2N1bWVudCwgdGhpcyk7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNjb3BlO1xuIiwiY29uc3QgZXh0ZW5kID0gcmVxdWlyZSgnLi9leHRlbmQnKTtcbmNvbnN0IHdpbiAgICA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG5cbmNvbnN0IHV0aWxzID0ge1xuICB3YXJuT25jZTogZnVuY3Rpb24gKG1ldGhvZCwgbWVzc2FnZSkge1xuICAgIGxldCB3YXJuZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgICB3aW4ud2luZG93LmNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTYzNDUyOC8yMjgwODg4XG4gIF9nZXRRQmV6aWVyVmFsdWU6IGZ1bmN0aW9uICh0LCBwMSwgcDIsIHAzKSB7XG4gICAgY29uc3QgaVQgPSAxIC0gdDtcbiAgICByZXR1cm4gaVQgKiBpVCAqIHAxICsgMiAqIGlUICogdCAqIHAyICsgdCAqIHQgKiBwMztcbiAgfSxcblxuICBnZXRRdWFkcmF0aWNDdXJ2ZVBvaW50OiBmdW5jdGlvbiAoc3RhcnRYLCBzdGFydFksIGNwWCwgY3BZLCBlbmRYLCBlbmRZLCBwb3NpdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICB4OiAgdXRpbHMuX2dldFFCZXppZXJWYWx1ZShwb3NpdGlvbiwgc3RhcnRYLCBjcFgsIGVuZFgpLFxuICAgICAgeTogIHV0aWxzLl9nZXRRQmV6aWVyVmFsdWUocG9zaXRpb24sIHN0YXJ0WSwgY3BZLCBlbmRZKSxcbiAgICB9O1xuICB9LFxuXG4gIC8vIGh0dHA6Ly9naXptYS5jb20vZWFzaW5nL1xuICBlYXNlT3V0UXVhZDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICB0IC89IGQ7XG4gICAgcmV0dXJuIC1jICogdCoodC0yKSArIGI7XG4gIH0sXG5cbiAgY29weUFjdGlvbjogZnVuY3Rpb24gKGRlc3QsIHNyYykge1xuICAgIGRlc3QubmFtZSAgPSBzcmMubmFtZTtcbiAgICBkZXN0LmF4aXMgID0gc3JjLmF4aXM7XG4gICAgZGVzdC5lZGdlcyA9IHNyYy5lZGdlcztcblxuICAgIHJldHVybiBkZXN0O1xuICB9LFxuXG4gIGlzICAgICAgICAgOiByZXF1aXJlKCcuL2lzJyksXG4gIGV4dGVuZCAgICAgOiBleHRlbmQsXG4gIGh5cG90ICAgICAgOiByZXF1aXJlKCcuL2h5cG90JyksXG4gIGdldE9yaWdpblhZOiByZXF1aXJlKCcuL2dldE9yaWdpblhZJyksXG59O1xuXG5leHRlbmQodXRpbHMsIHJlcXVpcmUoJy4vYXJyJykpO1xuZXh0ZW5kKHV0aWxzLCByZXF1aXJlKCcuL2RvbVV0aWxzJykpO1xuZXh0ZW5kKHV0aWxzLCByZXF1aXJlKCcuL3BvaW50ZXJVdGlscycpKTtcbmV4dGVuZCh1dGlscywgcmVxdWlyZSgnLi9yZWN0JykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuIiwiY29uc3QgaXMgICAgICAgICAgID0gcmVxdWlyZSgnLi9pcycpO1xuY29uc3QgZG9tVXRpbHMgICAgID0gcmVxdWlyZSgnLi9kb21VdGlscycpO1xuY29uc3QgcG9pbnRlclV0aWxzID0gcmVxdWlyZSgnLi9wb2ludGVyVXRpbHMnKTtcbmNvbnN0IHBFeHRlbmQgICAgICA9IHJlcXVpcmUoJy4vcG9pbnRlckV4dGVuZCcpO1xuXG5jb25zdCB7IHdpbmRvdyB9ICAgPSByZXF1aXJlKCcuL3dpbmRvdycpO1xuY29uc3QgeyBjb250YWlucyB9ID0gcmVxdWlyZSgnLi9hcnInKTtcblxuY29uc3QgZWxlbWVudHMgPSBbXTtcbmNvbnN0IHRhcmdldHMgID0gW107XG5cbi8vIHtcbi8vICAgdHlwZToge1xuLy8gICAgIHNlbGVjdG9yczogWydzZWxlY3RvcicsIC4uLl0sXG4vLyAgICAgY29udGV4dHMgOiBbZG9jdW1lbnQsIC4uLl0sXG4vLyAgICAgbGlzdGVuZXJzOiBbW2xpc3RlbmVyLCBjYXB0dXJlLCBwYXNzaXZlXSwgLi4uXVxuLy8gICB9XG4vLyAgfVxuY29uc3QgZGVsZWdhdGVkRXZlbnRzID0ge307XG5jb25zdCBkb2N1bWVudHMgICAgICAgPSBbXTtcblxuY29uc3Qgc3VwcG9ydHNPcHRpb25zID0gKCgpID0+IHtcbiAgbGV0IHN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge1xuICAgIGdldCBjYXB0dXJlICgpIHsgc3VwcG9ydGVkID0gdHJ1ZTsgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIHN1cHBvcnRlZDtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFkZCAoZWxlbWVudCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbmFsQXJnKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbmFsQXJnKTtcbiAgbGV0IGVsZW1lbnRJbmRleCA9IGVsZW1lbnRzLmluZGV4T2YoZWxlbWVudCk7XG4gIGxldCB0YXJnZXQgPSB0YXJnZXRzW2VsZW1lbnRJbmRleF07XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSB7XG4gICAgICBldmVudHM6IHt9LFxuICAgICAgdHlwZUNvdW50OiAwLFxuICAgIH07XG5cbiAgICBlbGVtZW50SW5kZXggPSBlbGVtZW50cy5wdXNoKGVsZW1lbnQpIC0gMTtcbiAgICB0YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIGlmICghdGFyZ2V0LmV2ZW50c1t0eXBlXSkge1xuICAgIHRhcmdldC5ldmVudHNbdHlwZV0gPSBbXTtcbiAgICB0YXJnZXQudHlwZUNvdW50Kys7XG4gIH1cblxuICBpZiAoIWNvbnRhaW5zKHRhcmdldC5ldmVudHNbdHlwZV0sIGxpc3RlbmVyKSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgc3VwcG9ydHNPcHRpb25zPyBvcHRpb25zIDogISFvcHRpb25zLmNhcHR1cmUpO1xuICAgIHRhcmdldC5ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChlbGVtZW50LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9uYWxBcmcpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICBjb25zdCBlbGVtZW50SW5kZXggPSBlbGVtZW50cy5pbmRleE9mKGVsZW1lbnQpO1xuICBjb25zdCB0YXJnZXQgPSB0YXJnZXRzW2VsZW1lbnRJbmRleF07XG5cbiAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5ldmVudHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcbiAgICBmb3IgKHR5cGUgaW4gdGFyZ2V0LmV2ZW50cykge1xuICAgICAgaWYgKHRhcmdldC5ldmVudHMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsIHR5cGUsICdhbGwnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRhcmdldC5ldmVudHNbdHlwZV0pIHtcbiAgICBjb25zdCBsZW4gPSB0YXJnZXQuZXZlbnRzW3R5cGVdLmxlbmd0aDtcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gJ2FsbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsIHR5cGUsIHRhcmdldC5ldmVudHNbdHlwZV1baV0sIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHRhcmdldC5ldmVudHNbdHlwZV1baV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGBvbiR7dHlwZX1gLCBsaXN0ZW5lciwgc3VwcG9ydHNPcHRpb25zPyBvcHRpb25zIDogISFvcHRpb25zLmNhcHR1cmUpO1xuICAgICAgICAgIHRhcmdldC5ldmVudHNbdHlwZV0uc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LmV2ZW50c1t0eXBlXSAmJiB0YXJnZXQuZXZlbnRzW3R5cGVdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGFyZ2V0LmV2ZW50c1t0eXBlXSA9IG51bGw7XG4gICAgICB0YXJnZXQudHlwZUNvdW50LS07XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0YXJnZXQudHlwZUNvdW50KSB7XG4gICAgdGFyZ2V0cy5zcGxpY2UoZWxlbWVudEluZGV4LCAxKTtcbiAgICBlbGVtZW50cy5zcGxpY2UoZWxlbWVudEluZGV4LCAxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGREZWxlZ2F0ZSAoc2VsZWN0b3IsIGNvbnRleHQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICBjb25zdCBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIGlmICghZGVsZWdhdGVkRXZlbnRzW3R5cGVdKSB7XG4gICAgZGVsZWdhdGVkRXZlbnRzW3R5cGVdID0ge1xuICAgICAgc2VsZWN0b3JzOiBbXSxcbiAgICAgIGNvbnRleHRzIDogW10sXG4gICAgICBsaXN0ZW5lcnM6IFtdLFxuICAgIH07XG5cbiAgICAvLyBhZGQgZGVsZWdhdGUgbGlzdGVuZXIgZnVuY3Rpb25zXG4gICAgZm9yIChjb25zdCBkb2Mgb2YgZG9jdW1lbnRzKSB7XG4gICAgICBhZGQoZG9jLCB0eXBlLCBkZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgIGFkZChkb2MsIHR5cGUsIGRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVsZWdhdGVkID0gZGVsZWdhdGVkRXZlbnRzW3R5cGVdO1xuICBsZXQgaW5kZXg7XG5cbiAgZm9yIChpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzW2luZGV4XSA9PT0gc2VsZWN0b3JcbiAgICAgICAgJiYgZGVsZWdhdGVkLmNvbnRleHRzW2luZGV4XSA9PT0gY29udGV4dCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgIGluZGV4ID0gZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGg7XG5cbiAgICBkZWxlZ2F0ZWQuc2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuICAgIGRlbGVnYXRlZC5jb250ZXh0cyAucHVzaChjb250ZXh0KTtcbiAgICBkZWxlZ2F0ZWQubGlzdGVuZXJzLnB1c2goW10pO1xuICB9XG5cbiAgLy8ga2VlcCBsaXN0ZW5lciBhbmQgY2FwdHVyZSBhbmQgcGFzc2l2ZSBmbGFnc1xuICBkZWxlZ2F0ZWQubGlzdGVuZXJzW2luZGV4XS5wdXNoKFtsaXN0ZW5lciwgISFvcHRpb25zLmNhcHR1cmUsIG9wdGlvbnMucGFzc2l2ZV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEZWxlZ2F0ZSAoc2VsZWN0b3IsIGNvbnRleHQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICBjb25zdCBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIGNvbnN0IGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1t0eXBlXTtcbiAgbGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcbiAgbGV0IGluZGV4O1xuXG4gIGlmICghZGVsZWdhdGVkKSB7IHJldHVybjsgfVxuXG4gIC8vIGNvdW50IGZyb20gbGFzdCBpbmRleCBvZiBkZWxlZ2F0ZWQgdG8gMFxuICBmb3IgKGluZGV4ID0gZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgLy8gbG9vayBmb3IgbWF0Y2hpbmcgc2VsZWN0b3IgYW5kIGNvbnRleHQgTm9kZVxuICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzW2luZGV4XSA9PT0gc2VsZWN0b3JcbiAgICAgICAgJiYgZGVsZWdhdGVkLmNvbnRleHRzW2luZGV4XSA9PT0gY29udGV4dCkge1xuXG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSBkZWxlZ2F0ZWQubGlzdGVuZXJzW2luZGV4XTtcblxuICAgICAgLy8gZWFjaCBpdGVtIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkgaXMgYW4gYXJyYXk6IFtmdW5jdGlvbiwgY2FwdHVyZSwgcGFzc2l2ZV1cbiAgICAgIGZvciAobGV0IGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgW2ZuLCBjYXB0dXJlLCBwYXNzaXZlXSA9IGxpc3RlbmVyc1tpXTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb25zIGFuZCBjYXB0dXJlIGFuZCBwYXNzaXZlIGZsYWdzIG1hdGNoXG4gICAgICAgIGlmIChmbiA9PT0gbGlzdGVuZXIgJiYgY2FwdHVyZSA9PT0gISFvcHRpb25zLmNhcHR1cmUgJiYgcGFzc2l2ZSA9PT0gb3B0aW9ucy5wYXNzaXZlKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnNcbiAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgLy8gaWYgYWxsIGxpc3RlbmVycyBmb3IgdGhpcyBpbnRlcmFjdGFibGUgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGludGVyYWN0YWJsZSBmcm9tIHRoZSBkZWxlZ2F0ZWQgYXJyYXlzXG4gICAgICAgICAgaWYgKCFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZWQuc2VsZWN0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBkZWxlZ2F0ZWQuY29udGV4dHMgLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBkZWxlZ2F0ZWQubGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkZWxlZ2F0ZSBmdW5jdGlvbiBmcm9tIGNvbnRleHRcbiAgICAgICAgICAgIHJlbW92ZShjb250ZXh0LCB0eXBlLCBkZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJlbW92ZShjb250ZXh0LCB0eXBlLCBkZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGFycmF5cyBpZiB0aGV5IGFyZSBlbXB0eVxuICAgICAgICAgICAgaWYgKCFkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBkZWxlZ2F0ZWRFdmVudHNbdHlwZV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG9ubHkgcmVtb3ZlIG9uZSBsaXN0ZW5lclxuICAgICAgICAgIG1hdGNoRm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXRjaEZvdW5kKSB7IGJyZWFrOyB9XG4gICAgfVxuICB9XG59XG5cbi8vIGJvdW5kIHRvIHRoZSBpbnRlcmFjdGFibGUgY29udGV4dCB3aGVuIGEgRE9NIGV2ZW50XG4vLyBsaXN0ZW5lciBpcyBhZGRlZCB0byBhIHNlbGVjdG9yIGludGVyYWN0YWJsZVxuZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lciAoZXZlbnQsIG9wdGlvbmFsQXJnKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbmFsQXJnKTtcbiAgY29uc3QgZmFrZUV2ZW50ID0ge307XG4gIGNvbnN0IGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1tldmVudC50eXBlXTtcbiAgY29uc3QgW2V2ZW50VGFyZ2V0XSA9IChwb2ludGVyVXRpbHMuZ2V0RXZlbnRUYXJnZXRzKGV2ZW50KSk7XG4gIGxldCBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgLy8gZHVwbGljYXRlIHRoZSBldmVudCBzbyB0aGF0IGN1cnJlbnRUYXJnZXQgY2FuIGJlIGNoYW5nZWRcbiAgcEV4dGVuZChmYWtlRXZlbnQsIGV2ZW50KTtcblxuICBmYWtlRXZlbnQub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICBmYWtlRXZlbnQucHJldmVudERlZmF1bHQgPSBwcmV2ZW50T3JpZ2luYWxEZWZhdWx0O1xuXG4gIC8vIGNsaW1iIHVwIGRvY3VtZW50IHRyZWUgbG9va2luZyBmb3Igc2VsZWN0b3IgbWF0Y2hlc1xuICB3aGlsZSAoaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzW2ldO1xuICAgICAgY29uc3QgY29udGV4dCA9IGRlbGVnYXRlZC5jb250ZXh0c1tpXTtcblxuICAgICAgaWYgKGRvbVV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcilcbiAgICAgICAgICAmJiBkb21VdGlscy5ub2RlQ29udGFpbnMoY29udGV4dCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgJiYgZG9tVXRpbHMubm9kZUNvbnRhaW5zKGNvbnRleHQsIGVsZW1lbnQpKSB7XG5cbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gZGVsZWdhdGVkLmxpc3RlbmVyc1tpXTtcblxuICAgICAgICBmYWtlRXZlbnQuY3VycmVudFRhcmdldCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaXN0ZW5lcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBbZm4sIGNhcHR1cmUsIHBhc3NpdmVdID0gbGlzdGVuZXJzW2pdO1xuXG4gICAgICAgICAgaWYgKGNhcHR1cmUgPT09ICEhb3B0aW9ucy5jYXB0dXJlICYmIHBhc3NpdmUgPT09IG9wdGlvbnMucGFzc2l2ZSkge1xuICAgICAgICAgICAgZm4oZmFrZUV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWxlZ2F0ZVVzZUNhcHR1cmUgKGV2ZW50KSB7XG4gIHJldHVybiBkZWxlZ2F0ZUxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50T3JpZ2luYWxEZWZhdWx0ICgpIHtcbiAgdGhpcy5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGdldE9wdGlvbnMgKHBhcmFtKSB7XG4gIHJldHVybiBpcy5vYmplY3QocGFyYW0pPyBwYXJhbSA6IHsgY2FwdHVyZTogcGFyYW0gfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZCxcbiAgcmVtb3ZlLFxuXG4gIGFkZERlbGVnYXRlLFxuICByZW1vdmVEZWxlZ2F0ZSxcblxuICBkZWxlZ2F0ZUxpc3RlbmVyLFxuICBkZWxlZ2F0ZVVzZUNhcHR1cmUsXG4gIGRlbGVnYXRlZEV2ZW50cyxcbiAgZG9jdW1lbnRzLFxuXG4gIHN1cHBvcnRzT3B0aW9ucyxcblxuICBfZWxlbWVudHM6IGVsZW1lbnRzLFxuICBfdGFyZ2V0czogdGFyZ2V0cyxcbn07XG4iLCJjb25zdCBoeXBvdCAgICAgICAgID0gcmVxdWlyZSgnLi9oeXBvdCcpO1xuY29uc3QgYnJvd3NlciAgICAgICA9IHJlcXVpcmUoJy4vYnJvd3NlcicpO1xuY29uc3QgZG9tICAgICAgICAgICA9IHJlcXVpcmUoJy4vZG9tT2JqZWN0cycpO1xuY29uc3QgZG9tVXRpbHMgICAgICA9IHJlcXVpcmUoJy4vZG9tVXRpbHMnKTtcbmNvbnN0IGRvbU9iamVjdHMgICAgPSByZXF1aXJlKCcuL2RvbU9iamVjdHMnKTtcbmNvbnN0IGlzICAgICAgICAgICAgPSByZXF1aXJlKCcuL2lzJyk7XG5jb25zdCBwb2ludGVyRXh0ZW5kID0gcmVxdWlyZSgnLi9wb2ludGVyRXh0ZW5kJyk7XG5cbmNvbnN0IHBvaW50ZXJVdGlscyA9IHtcbiAgY29weUNvb3JkczogZnVuY3Rpb24gKGRlc3QsIHNyYykge1xuICAgIGRlc3QucGFnZSA9IGRlc3QucGFnZSB8fCB7fTtcbiAgICBkZXN0LnBhZ2UueCA9IHNyYy5wYWdlLng7XG4gICAgZGVzdC5wYWdlLnkgPSBzcmMucGFnZS55O1xuXG4gICAgZGVzdC5jbGllbnQgPSBkZXN0LmNsaWVudCB8fCB7fTtcbiAgICBkZXN0LmNsaWVudC54ID0gc3JjLmNsaWVudC54O1xuICAgIGRlc3QuY2xpZW50LnkgPSBzcmMuY2xpZW50Lnk7XG5cbiAgICBkZXN0LnRpbWVTdGFtcCA9IHNyYy50aW1lU3RhbXA7XG4gIH0sXG5cbiAgc2V0Q29vcmREZWx0YXM6IGZ1bmN0aW9uICh0YXJnZXRPYmosIHByZXYsIGN1cikge1xuICAgIHRhcmdldE9iai5wYWdlLnggICAgPSBjdXIucGFnZS54ICAgIC0gcHJldi5wYWdlLng7XG4gICAgdGFyZ2V0T2JqLnBhZ2UueSAgICA9IGN1ci5wYWdlLnkgICAgLSBwcmV2LnBhZ2UueTtcbiAgICB0YXJnZXRPYmouY2xpZW50LnggID0gY3VyLmNsaWVudC54ICAtIHByZXYuY2xpZW50Lng7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC55ICA9IGN1ci5jbGllbnQueSAgLSBwcmV2LmNsaWVudC55O1xuICAgIHRhcmdldE9iai50aW1lU3RhbXAgPSBjdXIudGltZVN0YW1wIC0gcHJldi50aW1lU3RhbXA7XG5cbiAgICAvLyBzZXQgcG9pbnRlciB2ZWxvY2l0eVxuICAgIGNvbnN0IGR0ID0gTWF0aC5tYXgodGFyZ2V0T2JqLnRpbWVTdGFtcCAvIDEwMDAsIDAuMDAxKTtcblxuICAgIHRhcmdldE9iai5wYWdlLnNwZWVkICAgPSBoeXBvdCh0YXJnZXRPYmoucGFnZS54LCB0YXJnZXRPYmoucGFnZS55KSAvIGR0O1xuICAgIHRhcmdldE9iai5wYWdlLnZ4ICAgICAgPSB0YXJnZXRPYmoucGFnZS54IC8gZHQ7XG4gICAgdGFyZ2V0T2JqLnBhZ2UudnkgICAgICA9IHRhcmdldE9iai5wYWdlLnkgLyBkdDtcblxuICAgIHRhcmdldE9iai5jbGllbnQuc3BlZWQgPSBoeXBvdCh0YXJnZXRPYmouY2xpZW50LngsIHRhcmdldE9iai5wYWdlLnkpIC8gZHQ7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC52eCAgICA9IHRhcmdldE9iai5jbGllbnQueCAvIGR0O1xuICAgIHRhcmdldE9iai5jbGllbnQudnkgICAgPSB0YXJnZXRPYmouY2xpZW50LnkgLyBkdDtcbiAgfSxcblxuICBpc05hdGl2ZVBvaW50ZXI6IGZ1bmN0aW9uICAocG9pbnRlcikge1xuICAgIHJldHVybiAocG9pbnRlciBpbnN0YW5jZW9mIGRvbS5FdmVudCB8fCBwb2ludGVyIGluc3RhbmNlb2YgZG9tLlRvdWNoKTtcbiAgfSxcblxuICAvLyBHZXQgc3BlY2lmaWVkIFgvWSBjb29yZHMgZm9yIG1vdXNlIG9yIGV2ZW50LnRvdWNoZXNbMF1cbiAgZ2V0WFk6IGZ1bmN0aW9uICh0eXBlLCBwb2ludGVyLCB4eSkge1xuICAgIHh5ID0geHkgfHwge307XG4gICAgdHlwZSA9IHR5cGUgfHwgJ3BhZ2UnO1xuXG4gICAgeHkueCA9IHBvaW50ZXJbdHlwZSArICdYJ107XG4gICAgeHkueSA9IHBvaW50ZXJbdHlwZSArICdZJ107XG5cbiAgICByZXR1cm4geHk7XG4gIH0sXG5cbiAgZ2V0UGFnZVhZOiBmdW5jdGlvbiAocG9pbnRlciwgcGFnZSkge1xuICAgIHBhZ2UgPSBwYWdlIHx8IHt9O1xuXG4gICAgLy8gT3BlcmEgTW9iaWxlIGhhbmRsZXMgdGhlIHZpZXdwb3J0IGFuZCBzY3JvbGxpbmcgb2RkbHlcbiAgICBpZiAoYnJvd3Nlci5pc09wZXJhTW9iaWxlICYmIHBvaW50ZXJVdGlscy5pc05hdGl2ZVBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgnc2NyZWVuJywgcG9pbnRlciwgcGFnZSk7XG5cbiAgICAgIHBhZ2UueCArPSB3aW5kb3cuc2Nyb2xsWDtcbiAgICAgIHBhZ2UueSArPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwb2ludGVyVXRpbHMuZ2V0WFkoJ3BhZ2UnLCBwb2ludGVyLCBwYWdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFnZTtcbiAgfSxcblxuICBnZXRDbGllbnRYWTogZnVuY3Rpb24gKHBvaW50ZXIsIGNsaWVudCkge1xuICAgIGNsaWVudCA9IGNsaWVudCB8fCB7fTtcblxuICAgIGlmIChicm93c2VyLmlzT3BlcmFNb2JpbGUgJiYgcG9pbnRlclV0aWxzLmlzTmF0aXZlUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgLy8gT3BlcmEgTW9iaWxlIGhhbmRsZXMgdGhlIHZpZXdwb3J0IGFuZCBzY3JvbGxpbmcgb2RkbHlcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgnc2NyZWVuJywgcG9pbnRlciwgY2xpZW50KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwb2ludGVyVXRpbHMuZ2V0WFkoJ2NsaWVudCcsIHBvaW50ZXIsIGNsaWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfSxcblxuICBnZXRQb2ludGVySWQ6IGZ1bmN0aW9uIChwb2ludGVyKSB7XG4gICAgcmV0dXJuIGlzLm51bWJlcihwb2ludGVyLnBvaW50ZXJJZCk/IHBvaW50ZXIucG9pbnRlcklkIDogcG9pbnRlci5pZGVudGlmaWVyO1xuICB9LFxuXG4gIHNldENvb3JkczogZnVuY3Rpb24gKHRhcmdldE9iaiwgcG9pbnRlcnMsIHRpbWVTdGFtcCkge1xuICAgIGNvbnN0IHBvaW50ZXIgPSAocG9pbnRlcnMubGVuZ3RoID4gMVxuICAgICAgICAgICAgICAgICAgICAgPyBwb2ludGVyVXRpbHMucG9pbnRlckF2ZXJhZ2UocG9pbnRlcnMpXG4gICAgICAgICAgICAgICAgICAgICA6IHBvaW50ZXJzWzBdKTtcblxuICAgIGNvbnN0IHRtcFhZID0ge307XG5cbiAgICBwb2ludGVyVXRpbHMuZ2V0UGFnZVhZKHBvaW50ZXIsIHRtcFhZKTtcbiAgICB0YXJnZXRPYmoucGFnZS54ID0gdG1wWFkueDtcbiAgICB0YXJnZXRPYmoucGFnZS55ID0gdG1wWFkueTtcblxuICAgIHBvaW50ZXJVdGlscy5nZXRDbGllbnRYWShwb2ludGVyLCB0bXBYWSk7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC54ID0gdG1wWFkueDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnkgPSB0bXBYWS55O1xuXG4gICAgdGFyZ2V0T2JqLnRpbWVTdGFtcCA9IGlzLm51bWJlcih0aW1lU3RhbXApID8gdGltZVN0YW1wIDpuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfSxcblxuICBwb2ludGVyRXh0ZW5kOiBwb2ludGVyRXh0ZW5kLFxuXG4gIGdldFRvdWNoUGFpcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgdG91Y2hlcyA9IFtdO1xuXG4gICAgLy8gYXJyYXkgb2YgdG91Y2hlcyBpcyBzdXBwbGllZFxuICAgIGlmIChpcy5hcnJheShldmVudCkpIHtcbiAgICAgIHRvdWNoZXNbMF0gPSBldmVudFswXTtcbiAgICAgIHRvdWNoZXNbMV0gPSBldmVudFsxXTtcbiAgICB9XG4gICAgLy8gYW4gZXZlbnRcbiAgICBlbHNlIHtcbiAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2hlbmQnKSB7XG4gICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICAgIHRvdWNoZXNbMV0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LnRvdWNoZXNbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvdWNoZXM7XG4gIH0sXG5cbiAgcG9pbnRlckF2ZXJhZ2U6IGZ1bmN0aW9uIChwb2ludGVycykge1xuICAgIGNvbnN0IGF2ZXJhZ2UgPSB7XG4gICAgICBwYWdlWCAgOiAwLFxuICAgICAgcGFnZVkgIDogMCxcbiAgICAgIGNsaWVudFg6IDAsXG4gICAgICBjbGllbnRZOiAwLFxuICAgICAgc2NyZWVuWDogMCxcbiAgICAgIHNjcmVlblk6IDAsXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgcG9pbnRlciBvZiBwb2ludGVycykge1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIGF2ZXJhZ2UpIHtcbiAgICAgICAgYXZlcmFnZVtwcm9wXSArPSBwb2ludGVyW3Byb3BdO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gYXZlcmFnZSkge1xuICAgICAgYXZlcmFnZVtwcm9wXSAvPSBwb2ludGVycy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2ZXJhZ2U7XG4gIH0sXG5cbiAgdG91Y2hCQm94OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50Lmxlbmd0aCAmJiAhKGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRvdWNoZXMgPSBwb2ludGVyVXRpbHMuZ2V0VG91Y2hQYWlyKGV2ZW50KTtcbiAgICBjb25zdCBtaW5YID0gTWF0aC5taW4odG91Y2hlc1swXS5wYWdlWCwgdG91Y2hlc1sxXS5wYWdlWCk7XG4gICAgY29uc3QgbWluWSA9IE1hdGgubWluKHRvdWNoZXNbMF0ucGFnZVksIHRvdWNoZXNbMV0ucGFnZVkpO1xuICAgIGNvbnN0IG1heFggPSBNYXRoLm1heCh0b3VjaGVzWzBdLnBhZ2VYLCB0b3VjaGVzWzFdLnBhZ2VYKTtcbiAgICBjb25zdCBtYXhZID0gTWF0aC5tYXgodG91Y2hlc1swXS5wYWdlWSwgdG91Y2hlc1sxXS5wYWdlWSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogbWluWCxcbiAgICAgIHk6IG1pblksXG4gICAgICBsZWZ0OiBtaW5YLFxuICAgICAgdG9wOiBtaW5ZLFxuICAgICAgd2lkdGg6IG1heFggLSBtaW5YLFxuICAgICAgaGVpZ2h0OiBtYXhZIC0gbWluWSxcbiAgICB9O1xuICB9LFxuXG4gIHRvdWNoRGlzdGFuY2U6IGZ1bmN0aW9uIChldmVudCwgZGVsdGFTb3VyY2UpIHtcbiAgICBjb25zdCBzb3VyY2VYID0gZGVsdGFTb3VyY2UgKyAnWCc7XG4gICAgY29uc3Qgc291cmNlWSA9IGRlbHRhU291cmNlICsgJ1knO1xuICAgIGNvbnN0IHRvdWNoZXMgPSBwb2ludGVyVXRpbHMuZ2V0VG91Y2hQYWlyKGV2ZW50KTtcblxuXG4gICAgY29uc3QgZHggPSB0b3VjaGVzWzBdW3NvdXJjZVhdIC0gdG91Y2hlc1sxXVtzb3VyY2VYXTtcbiAgICBjb25zdCBkeSA9IHRvdWNoZXNbMF1bc291cmNlWV0gLSB0b3VjaGVzWzFdW3NvdXJjZVldO1xuXG4gICAgcmV0dXJuIGh5cG90KGR4LCBkeSk7XG4gIH0sXG5cbiAgdG91Y2hBbmdsZTogZnVuY3Rpb24gKGV2ZW50LCBwcmV2QW5nbGUsIGRlbHRhU291cmNlKSB7XG4gICAgY29uc3Qgc291cmNlWCA9IGRlbHRhU291cmNlICsgJ1gnO1xuICAgIGNvbnN0IHNvdXJjZVkgPSBkZWx0YVNvdXJjZSArICdZJztcbiAgICBjb25zdCB0b3VjaGVzID0gcG9pbnRlclV0aWxzLmdldFRvdWNoUGFpcihldmVudCk7XG4gICAgY29uc3QgZHggPSB0b3VjaGVzWzFdW3NvdXJjZVhdIC0gdG91Y2hlc1swXVtzb3VyY2VYXTtcbiAgICBjb25zdCBkeSA9IHRvdWNoZXNbMV1bc291cmNlWV0gLSB0b3VjaGVzWzBdW3NvdXJjZVldO1xuICAgIGNvbnN0IGFuZ2xlID0gMTgwICogTWF0aC5hdGFuMihkeSAsIGR4KSAvIE1hdGguUEk7XG5cbiAgICByZXR1cm4gIGFuZ2xlO1xuICB9LFxuXG4gIGdldFBvaW50ZXJUeXBlOiBmdW5jdGlvbiAocG9pbnRlcikge1xuICAgIHJldHVybiBpcy5zdHJpbmcocG9pbnRlci5wb2ludGVyVHlwZSlcbiAgICAgID8gcG9pbnRlci5wb2ludGVyVHlwZVxuICAgICAgOiBpcy5udW1iZXIocG9pbnRlci5wb2ludGVyVHlwZSlcbiAgICAgICAgPyBbdW5kZWZpbmVkLCB1bmRlZmluZWQsJ3RvdWNoJywgJ3BlbicsICdtb3VzZSddW3BvaW50ZXIucG9pbnRlclR5cGVdXG4gICAgICAgICAgLy8gaWYgdGhlIFBvaW50ZXJFdmVudCBBUEkgaXNuJ3QgYXZhaWxhYmxlLCB0aGVuIHRoZSBcInBvaW50ZXJcIiBtdXN0XG4gICAgICAgICAgLy8gYmUgZWl0aGVyIGEgTW91c2VFdmVudCwgVG91Y2hFdmVudCwgb3IgVG91Y2ggb2JqZWN0XG4gICAgICAgICAgOiAvdG91Y2gvLnRlc3QocG9pbnRlci50eXBlKSB8fCBwb2ludGVyIGluc3RhbmNlb2YgZG9tT2JqZWN0cy5Ub3VjaFxuICAgICAgICAgICAgPyAndG91Y2gnXG4gICAgICAgICAgICA6ICdtb3VzZSc7XG4gIH0sXG5cbiAgLy8gWyBldmVudC50YXJnZXQsIGV2ZW50LmN1cnJlbnRUYXJnZXQgXVxuICBnZXRFdmVudFRhcmdldHM6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHBhdGggPSBpcy5mdW5jdGlvbihldmVudC5jb21wb3NlZFBhdGgpID8gZXZlbnQuY29tcG9zZWRQYXRoKCkgOiBldmVudC5wYXRoO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIGRvbVV0aWxzLmdldEFjdHVhbEVsZW1lbnQocGF0aCA/IHBhdGhbMF0gOiBldmVudC50YXJnZXQpLFxuICAgICAgZG9tVXRpbHMuZ2V0QWN0dWFsRWxlbWVudChldmVudC5jdXJyZW50VGFyZ2V0KSxcbiAgICBdO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb2ludGVyVXRpbHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICh4LCB5KSA9PiAgTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuIiwiZnVuY3Rpb24gcG9pbnRlckV4dGVuZCAoZGVzdCwgc291cmNlKSB7XG4gIGZvciAoY29uc3QgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICBjb25zdCBwcmVmaXhlZFByb3BSRXMgPSBtb2R1bGUuZXhwb3J0cy5wcmVmaXhlZFByb3BSRXM7XG4gICAgbGV0IGRlcHJlY2F0ZWQgPSBmYWxzZTtcblxuICAgIC8vIHNraXAgZGVwcmVjYXRlZCBwcmVmaXhlZCBwcm9wZXJ0aWVzXG4gICAgZm9yIChjb25zdCB2ZW5kb3IgaW4gcHJlZml4ZWRQcm9wUkVzKSB7XG4gICAgICBpZiAocHJvcC5pbmRleE9mKHZlbmRvcikgPT09IDAgJiYgcHJlZml4ZWRQcm9wUkVzW3ZlbmRvcl0udGVzdChwcm9wKSkge1xuICAgICAgICBkZXByZWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkZXByZWNhdGVkICYmIHR5cGVvZiBzb3VyY2VbcHJvcF0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG5wb2ludGVyRXh0ZW5kLnByZWZpeGVkUHJvcFJFcyA9IHtcbiAgd2Via2l0OiAvKE1vdmVtZW50W1hZXXxSYWRpdXNbWFldfFJvdGF0aW9uQW5nbGV8Rm9yY2UpJC8sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvaW50ZXJFeHRlbmQ7XG4iLCJmdW5jdGlvbiBjb250YWlucyAoYXJyYXksIHRhcmdldCkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZih0YXJnZXQpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbWVyZ2UgKHRhcmdldCwgc291cmNlKSB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBzb3VyY2UpIHtcbiAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb250YWlucyxcbiAgbWVyZ2UsXG59O1xuIiwiY29uc3QgZXh0ZW5kICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpO1xuY29uc3QgZ2V0T3JpZ2luWFkgPSByZXF1aXJlKCcuL3V0aWxzL2dldE9yaWdpblhZJyk7XG5jb25zdCBkZWZhdWx0cyAgICA9IHJlcXVpcmUoJy4vZGVmYXVsdE9wdGlvbnMnKTtcbmNvbnN0IHNpZ25hbHMgICAgID0gcmVxdWlyZSgnLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbmNsYXNzIEludGVyYWN0RXZlbnQge1xuICAvKiogKi9cbiAgY29uc3RydWN0b3IgKGludGVyYWN0aW9uLCBldmVudCwgYWN0aW9uLCBwaGFzZSwgZWxlbWVudCwgcmVsYXRlZCwgcHJlRW5kID0gZmFsc2UpIHtcbiAgICBjb25zdCB0YXJnZXQgICAgICA9IGludGVyYWN0aW9uLnRhcmdldDtcbiAgICBjb25zdCBkZWx0YVNvdXJjZSA9ICh0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMgfHwgZGVmYXVsdHMpLmRlbHRhU291cmNlO1xuICAgIGNvbnN0IG9yaWdpbiAgICAgID0gZ2V0T3JpZ2luWFkodGFyZ2V0LCBlbGVtZW50LCBhY3Rpb24pO1xuICAgIGNvbnN0IHN0YXJ0aW5nICAgID0gcGhhc2UgPT09ICdzdGFydCc7XG4gICAgY29uc3QgZW5kaW5nICAgICAgPSBwaGFzZSA9PT0gJ2VuZCc7XG4gICAgY29uc3QgY29vcmRzICAgICAgPSBzdGFydGluZz8gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMgOiBpbnRlcmFjdGlvbi5jdXJDb29yZHM7XG4gICAgY29uc3QgcHJldkV2ZW50ICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQ7XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudCB8fCBpbnRlcmFjdGlvbi5lbGVtZW50O1xuXG4gICAgY29uc3QgcGFnZSAgID0gZXh0ZW5kKHt9LCBjb29yZHMucGFnZSk7XG4gICAgY29uc3QgY2xpZW50ID0gZXh0ZW5kKHt9LCBjb29yZHMuY2xpZW50KTtcblxuICAgIHBhZ2UueCAtPSBvcmlnaW4ueDtcbiAgICBwYWdlLnkgLT0gb3JpZ2luLnk7XG5cbiAgICBjbGllbnQueCAtPSBvcmlnaW4ueDtcbiAgICBjbGllbnQueSAtPSBvcmlnaW4ueTtcblxuICAgIHRoaXMuY3RybEtleSAgICAgICA9IGV2ZW50LmN0cmxLZXk7XG4gICAgdGhpcy5hbHRLZXkgICAgICAgID0gZXZlbnQuYWx0S2V5O1xuICAgIHRoaXMuc2hpZnRLZXkgICAgICA9IGV2ZW50LnNoaWZ0S2V5O1xuICAgIHRoaXMubWV0YUtleSAgICAgICA9IGV2ZW50Lm1ldGFLZXk7XG4gICAgdGhpcy5idXR0b24gICAgICAgID0gZXZlbnQuYnV0dG9uO1xuICAgIHRoaXMuYnV0dG9ucyAgICAgICA9IGV2ZW50LmJ1dHRvbnM7XG4gICAgdGhpcy50YXJnZXQgICAgICAgID0gZWxlbWVudDtcbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBlbGVtZW50O1xuICAgIHRoaXMucmVsYXRlZFRhcmdldCA9IHJlbGF0ZWQgfHwgbnVsbDtcbiAgICB0aGlzLnByZUVuZCAgICAgICAgPSBwcmVFbmQ7XG4gICAgdGhpcy50eXBlICAgICAgICAgID0gYWN0aW9uICsgKHBoYXNlIHx8ICcnKTtcbiAgICB0aGlzLmludGVyYWN0aW9uICAgPSBpbnRlcmFjdGlvbjtcbiAgICB0aGlzLmludGVyYWN0YWJsZSAgPSB0YXJnZXQ7XG5cbiAgICB0aGlzLnQwID0gc3RhcnRpbmcgPyBpbnRlcmFjdGlvbi5kb3duVGltZXNbaW50ZXJhY3Rpb24uZG93blRpbWVzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgICAgICAgIDogcHJldkV2ZW50LnQwO1xuXG4gICAgY29uc3Qgc2lnbmFsQXJnID0ge1xuICAgICAgaW50ZXJhY3Rpb24sXG4gICAgICBldmVudCxcbiAgICAgIGFjdGlvbixcbiAgICAgIHBoYXNlLFxuICAgICAgZWxlbWVudCxcbiAgICAgIHJlbGF0ZWQsXG4gICAgICBwYWdlLFxuICAgICAgY2xpZW50LFxuICAgICAgY29vcmRzLFxuICAgICAgc3RhcnRpbmcsXG4gICAgICBlbmRpbmcsXG4gICAgICBkZWx0YVNvdXJjZSxcbiAgICAgIGlFdmVudDogdGhpcyxcbiAgICB9O1xuXG4gICAgc2lnbmFscy5maXJlKCdzZXQteHknLCBzaWduYWxBcmcpO1xuXG4gICAgaWYgKGVuZGluZykge1xuICAgICAgLy8gdXNlIHByZXZpb3VzIGNvb3JkcyB3aGVuIGVuZGluZ1xuICAgICAgdGhpcy5wYWdlWCA9IHByZXZFdmVudC5wYWdlWDtcbiAgICAgIHRoaXMucGFnZVkgPSBwcmV2RXZlbnQucGFnZVk7XG4gICAgICB0aGlzLmNsaWVudFggPSBwcmV2RXZlbnQuY2xpZW50WDtcbiAgICAgIHRoaXMuY2xpZW50WSA9IHByZXZFdmVudC5jbGllbnRZO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFnZVggICAgID0gcGFnZS54O1xuICAgICAgdGhpcy5wYWdlWSAgICAgPSBwYWdlLnk7XG4gICAgICB0aGlzLmNsaWVudFggICA9IGNsaWVudC54O1xuICAgICAgdGhpcy5jbGllbnRZICAgPSBjbGllbnQueTtcbiAgICB9XG5cbiAgICB0aGlzLngwICAgICAgICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueCAtIG9yaWdpbi54O1xuICAgIHRoaXMueTAgICAgICAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55IC0gb3JpZ2luLnk7XG4gICAgdGhpcy5jbGllbnRYMCAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueCAtIG9yaWdpbi54O1xuICAgIHRoaXMuY2xpZW50WTAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50LnkgLSBvcmlnaW4ueTtcblxuICAgIHNpZ25hbHMuZmlyZSgnc2V0LWRlbHRhJywgc2lnbmFsQXJnKTtcblxuICAgIHRoaXMudGltZVN0YW1wID0gY29vcmRzLnRpbWVTdGFtcDtcbiAgICB0aGlzLmR0ICAgICAgICA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS50aW1lU3RhbXA7XG4gICAgdGhpcy5kdXJhdGlvbiAgPSB0aGlzLnRpbWVTdGFtcCAtIHRoaXMudDA7XG5cbiAgICAvLyBzcGVlZCBhbmQgdmVsb2NpdHkgaW4gcGl4ZWxzIHBlciBzZWNvbmRcbiAgICB0aGlzLnNwZWVkID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhW2RlbHRhU291cmNlXS5zcGVlZDtcbiAgICB0aGlzLnZlbG9jaXR5WCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YVtkZWx0YVNvdXJjZV0udng7XG4gICAgdGhpcy52ZWxvY2l0eVkgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGFbZGVsdGFTb3VyY2VdLnZ5O1xuXG4gICAgdGhpcy5zd2lwZSA9IChlbmRpbmcgfHwgcGhhc2UgPT09ICdpbmVydGlhc3RhcnQnKT8gdGhpcy5nZXRTd2lwZSgpIDogbnVsbDtcblxuICAgIHNpZ25hbHMuZmlyZSgnbmV3Jywgc2lnbmFsQXJnKTtcbiAgfVxuXG4gIGdldFN3aXBlICgpIHtcbiAgICBjb25zdCBpbnRlcmFjdGlvbiA9IHRoaXMuaW50ZXJhY3Rpb247XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24ucHJldkV2ZW50LnNwZWVkIDwgNjAwXG4gICAgICAgIHx8IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnRpbWVTdGFtcCA+IDE1MCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGFuZ2xlID0gMTgwICogTWF0aC5hdGFuMihpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlZLCBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlYKSAvIE1hdGguUEk7XG4gICAgY29uc3Qgb3ZlcmxhcCA9IDIyLjU7XG5cbiAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICBhbmdsZSArPSAzNjA7XG4gICAgfVxuXG4gICAgY29uc3QgbGVmdCA9IDEzNSAtIG92ZXJsYXAgPD0gYW5nbGUgJiYgYW5nbGUgPCAyMjUgKyBvdmVybGFwO1xuICAgIGNvbnN0IHVwICAgPSAyMjUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMzE1ICsgb3ZlcmxhcDtcblxuICAgIGNvbnN0IHJpZ2h0ID0gIWxlZnQgJiYgKDMxNSAtIG92ZXJsYXAgPD0gYW5nbGUgfHwgYW5nbGUgPCAgNDUgKyBvdmVybGFwKTtcbiAgICBjb25zdCBkb3duICA9ICF1cCAgICYmICAgNDUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMTM1ICsgb3ZlcmxhcDtcblxuICAgIHJldHVybiB7XG4gICAgICB1cCxcbiAgICAgIGRvd24sXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHQsXG4gICAgICBhbmdsZSxcbiAgICAgIHNwZWVkOiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc3BlZWQsXG4gICAgICB2ZWxvY2l0eToge1xuICAgICAgICB4OiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlYLFxuICAgICAgICB5OiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlZLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJldmVudERlZmF1bHQgKCkge31cblxuICAvKiogKi9cbiAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uICgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiAqL1xuICBzdG9wUHJvcGFnYXRpb24gKCkge1xuICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5zaWduYWxzLm9uKCdzZXQtZGVsdGEnLCBmdW5jdGlvbiAoeyBpRXZlbnQsIGludGVyYWN0aW9uLCBzdGFydGluZywgZGVsdGFTb3VyY2UgfSkge1xuICBjb25zdCBwcmV2RXZlbnQgPSBzdGFydGluZz8gaUV2ZW50IDogaW50ZXJhY3Rpb24ucHJldkV2ZW50O1xuXG4gIGlmIChkZWx0YVNvdXJjZSA9PT0gJ2NsaWVudCcpIHtcbiAgICBpRXZlbnQuZHggPSBpRXZlbnQuY2xpZW50WCAtIHByZXZFdmVudC5jbGllbnRYO1xuICAgIGlFdmVudC5keSA9IGlFdmVudC5jbGllbnRZIC0gcHJldkV2ZW50LmNsaWVudFk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaUV2ZW50LmR4ID0gaUV2ZW50LnBhZ2VYIC0gcHJldkV2ZW50LnBhZ2VYO1xuICAgIGlFdmVudC5keSA9IGlFdmVudC5wYWdlWSAtIHByZXZFdmVudC5wYWdlWTtcbiAgfVxufSk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscyA9IHNpZ25hbHM7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJhY3RFdmVudDtcbiIsImNvbnN0IHtcbiAgcmVzb2x2ZVJlY3RMaWtlLFxuICByZWN0VG9YWSxcbn0gPSByZXF1aXJlKCcuL3JlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBlbGVtZW50LCBhY3Rpb24pIHtcbiAgY29uc3QgYWN0aW9uT3B0aW9ucyA9IHRhcmdldC5vcHRpb25zW2FjdGlvbl07XG4gIGNvbnN0IGFjdGlvbk9yaWdpbiA9IGFjdGlvbk9wdGlvbnMgJiYgYWN0aW9uT3B0aW9ucy5vcmlnaW47XG4gIGNvbnN0IG9yaWdpbiA9IGFjdGlvbk9yaWdpbiB8fCB0YXJnZXQub3B0aW9ucy5vcmlnaW47XG5cbiAgY29uc3Qgb3JpZ2luUmVjdCA9IHJlc29sdmVSZWN0TGlrZShvcmlnaW4sIHRhcmdldCwgZWxlbWVudCwgW3RhcmdldCAmJiBlbGVtZW50XSk7XG5cbiAgcmV0dXJuIHJlY3RUb1hZKG9yaWdpblJlY3QpIHx8IHsgeDogMCwgeTogMCB9O1xufTtcbiIsImNvbnN0IGV4dGVuZCA9IHJlcXVpcmUoJy4vZXh0ZW5kJyk7XG5jb25zdCBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcbmNvbnN0IHtcbiAgY2xvc2VzdCxcbiAgcGFyZW50Tm9kZSxcbiAgZ2V0RWxlbWVudFJlY3QsXG59ID0gcmVxdWlyZSgnLi9kb21VdGlscycpO1xuXG5jb25zdCByZWN0VXRpbHMgPSB7XG4gIGdldFN0cmluZ09wdGlvblJlc3VsdDogZnVuY3Rpb24gKHZhbHVlLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpIHtcbiAgICBpZiAoIWlzLnN0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gJ3BhcmVudCcpIHtcbiAgICAgIHZhbHVlID0gcGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsdWUgPT09ICdzZWxmJykge1xuICAgICAgdmFsdWUgPSBpbnRlcmFjdGFibGUuZ2V0UmVjdChlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YWx1ZSA9IGNsb3Nlc3QoZWxlbWVudCwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICByZXNvbHZlUmVjdExpa2U6IGZ1bmN0aW9uICh2YWx1ZSwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBmdW5jdGlvbkFyZ3MpIHtcbiAgICB2YWx1ZSA9IHJlY3RVdGlscy5nZXRTdHJpbmdPcHRpb25SZXN1bHQodmFsdWUsIGludGVyYWN0YWJsZSwgZWxlbWVudCkgfHwgdmFsdWU7XG5cbiAgICBpZiAoaXMuZnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KG51bGwsIGZ1bmN0aW9uQXJncyk7XG4gICAgfVxuXG4gICAgaWYgKGlzLmVsZW1lbnQodmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IGdldEVsZW1lbnRSZWN0KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG5cbiAgcmVjdFRvWFk6IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgcmV0dXJuICByZWN0ICYmIHtcbiAgICAgIHg6ICd4JyBpbiByZWN0ID8gcmVjdC54IDogcmVjdC5sZWZ0LFxuICAgICAgeTogJ3knIGluIHJlY3QgPyByZWN0LnkgOiByZWN0LnRvcCxcbiAgICB9O1xuICB9LFxuXG4gIHh5d2hUb1RsYnI6IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgaWYgKHJlY3QgJiYgISgnbGVmdCcgaW4gcmVjdCAmJiAndG9wJyBpbiByZWN0KSkge1xuICAgICAgcmVjdCA9IGV4dGVuZCh7fSwgcmVjdCk7XG5cbiAgICAgIHJlY3QubGVmdCAgID0gcmVjdC54IHx8IDA7XG4gICAgICByZWN0LnRvcCAgICA9IHJlY3QueSB8fCAwO1xuICAgICAgcmVjdC5yaWdodCAgPSByZWN0LnJpZ2h0ICAgfHwgKHJlY3QubGVmdCArIHJlY3Qud2lkdGgpO1xuICAgICAgcmVjdC5ib3R0b20gPSByZWN0LmJvdHRvbSAgfHwgKHJlY3QudG9wICsgcmVjdC5oZWlnaHQpO1xuICAgIH1cblxuICAgIHJldHVybiByZWN0O1xuICB9LFxuXG4gIHRsYnJUb1h5d2g6IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgaWYgKHJlY3QgJiYgISgneCcgaW4gcmVjdCAmJiAneScgaW4gcmVjdCkpIHtcbiAgICAgIHJlY3QgPSBleHRlbmQoe30sIHJlY3QpO1xuXG4gICAgICByZWN0LnggICAgICA9IHJlY3QubGVmdCB8fCAwO1xuICAgICAgcmVjdC50b3AgICAgPSByZWN0LnRvcCAgfHwgMDtcbiAgICAgIHJlY3Qud2lkdGggID0gcmVjdC53aWR0aCAgfHwgKHJlY3QucmlnaHQgIC0gcmVjdC54KTtcbiAgICAgIHJlY3QuaGVpZ2h0ID0gcmVjdC5oZWlnaHQgfHwgKHJlY3QuYm90dG9tIC0gcmVjdC55KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVjdDtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVjdFV0aWxzO1xuIiwiY29uc3Qgd2luICAgICAgICA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG5jb25zdCBicm93c2VyICAgID0gcmVxdWlyZSgnLi9icm93c2VyJyk7XG5jb25zdCBpcyAgICAgICAgID0gcmVxdWlyZSgnLi9pcycpO1xuY29uc3QgZG9tT2JqZWN0cyA9IHJlcXVpcmUoJy4vZG9tT2JqZWN0cycpO1xuXG5jb25zdCBkb21VdGlscyA9IHtcbiAgbm9kZUNvbnRhaW5zOiBmdW5jdGlvbiAocGFyZW50LCBjaGlsZCkge1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgY2xvc2VzdDogZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIGlmIChkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7IHJldHVybiBlbGVtZW50OyB9XG5cbiAgICAgIGVsZW1lbnQgPSBkb21VdGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIHBhcmVudE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcblxuICAgIGlmIChpcy5kb2NGcmFnKHBhcmVudCkpIHtcbiAgICAgIC8vIHNraXAgcGFzdCAjc2hhZG8tcm9vdCBmcmFnbWVudHNcbiAgICAgIHdoaWxlICgocGFyZW50ID0gcGFyZW50Lmhvc3QpICYmIGlzLmRvY0ZyYWcocGFyZW50KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50O1xuICB9LFxuXG4gIG1hdGNoZXNTZWxlY3RvcjogZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgLy8gcmVtb3ZlIC9kZWVwLyBmcm9tIHNlbGVjdG9ycyBpZiBzaGFkb3dET00gcG9seWZpbGwgaXMgdXNlZFxuICAgIGlmICh3aW4ud2luZG93ICE9PSB3aW4ucmVhbFdpbmRvdykge1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKC9cXC9kZWVwXFwvL2csICcgJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRbYnJvd3Nlci5wcmVmaXhlZE1hdGNoZXNTZWxlY3Rvcl0oc2VsZWN0b3IpO1xuICB9LFxuXG4gIC8vIFRlc3QgZm9yIHRoZSBlbGVtZW50IHRoYXQncyBcImFib3ZlXCIgYWxsIG90aGVyIHF1YWxpZmllcnNcbiAgaW5kZXhPZkRlZXBlc3RFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgICBsZXQgZGVlcGVzdFpvbmVQYXJlbnRzID0gW107XG4gICAgbGV0IGRyb3B6b25lUGFyZW50cyA9IFtdO1xuICAgIGxldCBkcm9wem9uZTtcbiAgICBsZXQgZGVlcGVzdFpvbmUgPSBlbGVtZW50c1swXTtcbiAgICBsZXQgaW5kZXggPSBkZWVwZXN0Wm9uZT8gMDogLTE7XG4gICAgbGV0IHBhcmVudDtcbiAgICBsZXQgY2hpbGQ7XG4gICAgbGV0IGk7XG4gICAgbGV0IG47XG5cbiAgICBmb3IgKGkgPSAxOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRyb3B6b25lID0gZWxlbWVudHNbaV07XG5cbiAgICAgIC8vIGFuIGVsZW1lbnQgbWlnaHQgYmVsb25nIHRvIG11bHRpcGxlIHNlbGVjdG9yIGRyb3B6b25lc1xuICAgICAgaWYgKCFkcm9wem9uZSB8fCBkcm9wem9uZSA9PT0gZGVlcGVzdFpvbmUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGVlcGVzdFpvbmUpIHtcbiAgICAgICAgZGVlcGVzdFpvbmUgPSBkcm9wem9uZTtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIGRlZXBlc3Qgb3IgY3VycmVudCBhcmUgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IG9yIGRvY3VtZW50LnJvb3RFbGVtZW50XG4gICAgICAvLyAtIGlmIHRoZSBjdXJyZW50IGRyb3B6b25lIGlzLCBkbyBub3RoaW5nIGFuZCBjb250aW51ZVxuICAgICAgaWYgKGRyb3B6b25lLnBhcmVudE5vZGUgPT09IGRyb3B6b25lLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyAtIGlmIGRlZXBlc3QgaXMsIHVwZGF0ZSB3aXRoIHRoZSBjdXJyZW50IGRyb3B6b25lIGFuZCBjb250aW51ZSB0byBuZXh0XG4gICAgICBlbHNlIGlmIChkZWVwZXN0Wm9uZS5wYXJlbnROb2RlID09PSBkcm9wem9uZS5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRlZXBlc3Rab25lID0gZHJvcHpvbmU7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGVlcGVzdFpvbmVQYXJlbnRzLmxlbmd0aCkge1xuICAgICAgICBwYXJlbnQgPSBkZWVwZXN0Wm9uZTtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnROb2RlICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSBwYXJlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICAgIGRlZXBlc3Rab25lUGFyZW50cy51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBlbGVtZW50IGlzIGFuIHN2ZyBlbGVtZW50IGFuZCB0aGUgY3VycmVudCBkZWVwZXN0IGlzXG4gICAgICAvLyBhbiBIVE1MRWxlbWVudFxuICAgICAgaWYgKGRlZXBlc3Rab25lIGluc3RhbmNlb2YgZG9tT2JqZWN0cy5IVE1MRWxlbWVudFxuICAgICAgICAgICYmIGRyb3B6b25lIGluc3RhbmNlb2YgZG9tT2JqZWN0cy5TVkdFbGVtZW50XG4gICAgICAgICAgJiYgIShkcm9wem9uZSBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHU1ZHRWxlbWVudCkpIHtcblxuICAgICAgICBpZiAoZHJvcHpvbmUgPT09IGRlZXBlc3Rab25lLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudCA9IGRyb3B6b25lLm93bmVyU1ZHRWxlbWVudDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBwYXJlbnQgPSBkcm9wem9uZTtcbiAgICAgIH1cblxuICAgICAgZHJvcHpvbmVQYXJlbnRzID0gW107XG5cbiAgICAgIHdoaWxlIChwYXJlbnQucGFyZW50Tm9kZSAhPT0gcGFyZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZHJvcHpvbmVQYXJlbnRzLnVuc2hpZnQocGFyZW50KTtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICB9XG5cbiAgICAgIG4gPSAwO1xuXG4gICAgICAvLyBnZXQgKHBvc2l0aW9uIG9mIGxhc3QgY29tbW9uIGFuY2VzdG9yKSArIDFcbiAgICAgIHdoaWxlIChkcm9wem9uZVBhcmVudHNbbl0gJiYgZHJvcHpvbmVQYXJlbnRzW25dID09PSBkZWVwZXN0Wm9uZVBhcmVudHNbbl0pIHtcbiAgICAgICAgbisrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJlbnRzID0gW1xuICAgICAgICBkcm9wem9uZVBhcmVudHNbbiAtIDFdLFxuICAgICAgICBkcm9wem9uZVBhcmVudHNbbl0sXG4gICAgICAgIGRlZXBlc3Rab25lUGFyZW50c1tuXSxcbiAgICAgIF07XG5cbiAgICAgIGNoaWxkID0gcGFyZW50c1swXS5sYXN0Q2hpbGQ7XG5cbiAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICBpZiAoY2hpbGQgPT09IHBhcmVudHNbMV0pIHtcbiAgICAgICAgICBkZWVwZXN0Wm9uZSA9IGRyb3B6b25lO1xuICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICBkZWVwZXN0Wm9uZVBhcmVudHMgPSBbXTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoaWxkID09PSBwYXJlbnRzWzJdKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZCA9IGNoaWxkLnByZXZpb3VzU2libGluZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH0sXG5cbiAgbWF0Y2hlc1VwVG86IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3RvciwgbGltaXQpIHtcbiAgICB3aGlsZSAoaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgICAgaWYgKGRvbVV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQgPSBkb21VdGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgICBpZiAoZWxlbWVudCA9PT0gbGltaXQpIHtcbiAgICAgICAgcmV0dXJuIGRvbVV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3Rvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIGdldEFjdHVhbEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIChlbGVtZW50IGluc3RhbmNlb2YgZG9tT2JqZWN0cy5TVkdFbGVtZW50SW5zdGFuY2VcbiAgICAgID8gZWxlbWVudC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudFxuICAgICAgOiBlbGVtZW50KTtcbiAgfSxcblxuICBnZXRTY3JvbGxYWTogZnVuY3Rpb24gKHJlbGV2YW50V2luZG93KSB7XG4gICAgcmVsZXZhbnRXaW5kb3cgPSByZWxldmFudFdpbmRvdyB8fCB3aW4ud2luZG93O1xuICAgIHJldHVybiB7XG4gICAgICB4OiByZWxldmFudFdpbmRvdy5zY3JvbGxYIHx8IHJlbGV2YW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgeTogcmVsZXZhbnRXaW5kb3cuc2Nyb2xsWSB8fCByZWxldmFudFdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RWxlbWVudENsaWVudFJlY3Q6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgY29uc3QgY2xpZW50UmVjdCA9IChlbGVtZW50IGluc3RhbmNlb2YgZG9tT2JqZWN0cy5TVkdFbGVtZW50XG4gICAgICA/IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIDogZWxlbWVudC5nZXRDbGllbnRSZWN0cygpWzBdKTtcblxuICAgIHJldHVybiBjbGllbnRSZWN0ICYmIHtcbiAgICAgIGxlZnQgIDogY2xpZW50UmVjdC5sZWZ0LFxuICAgICAgcmlnaHQgOiBjbGllbnRSZWN0LnJpZ2h0LFxuICAgICAgdG9wICAgOiBjbGllbnRSZWN0LnRvcCxcbiAgICAgIGJvdHRvbTogY2xpZW50UmVjdC5ib3R0b20sXG4gICAgICB3aWR0aCA6IGNsaWVudFJlY3Qud2lkdGggIHx8IGNsaWVudFJlY3QucmlnaHQgIC0gY2xpZW50UmVjdC5sZWZ0LFxuICAgICAgaGVpZ2h0OiBjbGllbnRSZWN0LmhlaWdodCB8fCBjbGllbnRSZWN0LmJvdHRvbSAtIGNsaWVudFJlY3QudG9wLFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RWxlbWVudFJlY3Q6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgY29uc3QgY2xpZW50UmVjdCA9IGRvbVV0aWxzLmdldEVsZW1lbnRDbGllbnRSZWN0KGVsZW1lbnQpO1xuXG4gICAgaWYgKCFicm93c2VyLmlzSU9TNyAmJiBjbGllbnRSZWN0KSB7XG4gICAgICBjb25zdCBzY3JvbGwgPSBkb21VdGlscy5nZXRTY3JvbGxYWSh3aW4uZ2V0V2luZG93KGVsZW1lbnQpKTtcblxuICAgICAgY2xpZW50UmVjdC5sZWZ0ICAgKz0gc2Nyb2xsLng7XG4gICAgICBjbGllbnRSZWN0LnJpZ2h0ICArPSBzY3JvbGwueDtcbiAgICAgIGNsaWVudFJlY3QudG9wICAgICs9IHNjcm9sbC55O1xuICAgICAgY2xpZW50UmVjdC5ib3R0b20gKz0gc2Nyb2xsLnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaWVudFJlY3Q7XG4gIH0sXG5cbiAgZ2V0UGF0aDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXRoID0gW107XG5cbiAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgcGF0aC5wdXNoKGVsZW1lbnQpO1xuICAgICAgZWxlbWVudCA9IGRvbVV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH0sXG5cbiAgdHJ5U2VsZWN0b3I6IHZhbHVlID0+IHtcbiAgICBpZiAoIWlzLnN0cmluZyh2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBhbiBleGNlcHRpb24gd2lsbCBiZSByYWlzZWQgaWYgaXQgaXMgaW52YWxpZFxuICAgIGRvbU9iamVjdHMuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YWx1ZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbVV0aWxzO1xuIiwiY29uc3QgeyB3aW5kb3cgfSA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG5jb25zdCBpcyAgICAgPSByZXF1aXJlKCcuL2lzJyk7XG5jb25zdCBkb21PYmplY3RzID0gcmVxdWlyZSgnLi9kb21PYmplY3RzJyk7XG5cbmNvbnN0IEVsZW1lbnQgPSBkb21PYmplY3RzLkVsZW1lbnQ7XG5jb25zdCBuYXZpZ2F0b3IgID0gd2luZG93Lm5hdmlnYXRvcjtcblxuY29uc3QgYnJvd3NlciA9IHtcbiAgLy8gRG9lcyB0aGUgYnJvd3NlciBzdXBwb3J0IHRvdWNoIGlucHV0P1xuICBzdXBwb3J0c1RvdWNoOiAhISgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCBpcy5mdW5jdGlvbih3aW5kb3cuRG9jdW1lbnRUb3VjaClcbiAgICAgICAgICAgICAgICAgICAgICYmIGRvbU9iamVjdHMuZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCksXG5cbiAgLy8gRG9lcyB0aGUgYnJvd3NlciBzdXBwb3J0IFBvaW50ZXJFdmVudHNcbiAgc3VwcG9ydHNQb2ludGVyRXZlbnQ6ICEhZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQsXG5cbiAgaXNJT1M6ICgvaVAoaG9uZXxvZHxhZCkvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSksXG5cbiAgLy8gc2Nyb2xsaW5nIGRvZXNuJ3QgY2hhbmdlIHRoZSByZXN1bHQgb2YgZ2V0Q2xpZW50UmVjdHMgb24gaU9TIDdcbiAgaXNJT1M3OiAoL2lQKGhvbmV8b2R8YWQpLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSlcbiAgICAgICAgICAgJiYgL09TIDdbXlxcZF0vLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pKSxcblxuICBpc0llOTogL01TSUUgOS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcblxuICAvLyBwcmVmaXggbWF0Y2hlc1NlbGVjdG9yXG4gIHByZWZpeGVkTWF0Y2hlc1NlbGVjdG9yOiAnbWF0Y2hlcycgaW4gRWxlbWVudC5wcm90b3R5cGVcbiAgICA/ICdtYXRjaGVzJzogJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGVcbiAgICA/ICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InOiAnbW96TWF0Y2hlc1NlbGVjdG9yJyBpbiBFbGVtZW50LnByb3RvdHlwZVxuICAgID8gJ21vek1hdGNoZXNTZWxlY3Rvcic6ICdvTWF0Y2hlc1NlbGVjdG9yJyBpbiBFbGVtZW50LnByb3RvdHlwZVxuICAgID8gJ29NYXRjaGVzU2VsZWN0b3InOiAnbXNNYXRjaGVzU2VsZWN0b3InLFxuXG4gIHBFdmVudFR5cGVzOiAoZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnRcbiAgICA/IChkb21PYmplY3RzLlBvaW50ZXJFdmVudCA9PT0gd2luZG93Lk1TUG9pbnRlckV2ZW50XG4gICAgICA/IHtcbiAgICAgICAgdXA6ICAgICAnTVNQb2ludGVyVXAnLFxuICAgICAgICBkb3duOiAgICdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgb3ZlcjogICAnbW91c2VvdmVyJyxcbiAgICAgICAgb3V0OiAgICAnbW91c2VvdXQnLFxuICAgICAgICBtb3ZlOiAgICdNU1BvaW50ZXJNb3ZlJyxcbiAgICAgICAgY2FuY2VsOiAnTVNQb2ludGVyQ2FuY2VsJyxcbiAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICB1cDogICAgICdwb2ludGVydXAnLFxuICAgICAgICBkb3duOiAgICdwb2ludGVyZG93bicsXG4gICAgICAgIG92ZXI6ICAgJ3BvaW50ZXJvdmVyJyxcbiAgICAgICAgb3V0OiAgICAncG9pbnRlcm91dCcsXG4gICAgICAgIG1vdmU6ICAgJ3BvaW50ZXJtb3ZlJyxcbiAgICAgICAgY2FuY2VsOiAncG9pbnRlcmNhbmNlbCcsXG4gICAgICB9KVxuICAgIDogbnVsbCksXG5cbiAgLy8gYmVjYXVzZSBXZWJraXQgYW5kIE9wZXJhIHN0aWxsIHVzZSAnbW91c2V3aGVlbCcgZXZlbnQgdHlwZVxuICB3aGVlbEV2ZW50OiAnb25tb3VzZXdoZWVsJyBpbiBkb21PYmplY3RzLmRvY3VtZW50PyAnbW91c2V3aGVlbCc6ICd3aGVlbCcsXG5cbn07XG5cbi8vIE9wZXJhIE1vYmlsZSBtdXN0IGJlIGhhbmRsZWQgZGlmZmVyZW50bHlcbmJyb3dzZXIuaXNPcGVyYU1vYmlsZSA9IChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ09wZXJhJ1xuICAmJiBicm93c2VyLnN1cHBvcnRzVG91Y2hcbiAgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgnUHJlc3RvJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJyb3dzZXI7XG4iLCJjb25zdCB3aW4gICAgICAgID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcbmNvbnN0IGlzV2luZG93ICAgPSByZXF1aXJlKCcuL2lzV2luZG93Jyk7XG5cbmNvbnN0IGlzID0ge1xuICBhcnJheSAgIDogKCkgPT4ge30sXG5cbiAgd2luZG93ICA6IHRoaW5nID0+IHRoaW5nID09PSB3aW4ud2luZG93IHx8IGlzV2luZG93KHRoaW5nKSxcblxuICBkb2NGcmFnIDogdGhpbmcgPT4gaXMub2JqZWN0KHRoaW5nKSAmJiB0aGluZy5ub2RlVHlwZSA9PT0gMTEsXG5cbiAgb2JqZWN0ICA6IHRoaW5nID0+ICEhdGhpbmcgJiYgKHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCcpLFxuXG4gIGZ1bmN0aW9uOiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbicsXG5cbiAgbnVtYmVyICA6IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gJ251bWJlcicgICxcblxuICBib29sICAgIDogdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSAnYm9vbGVhbicgLFxuXG4gIHN0cmluZyAgOiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09ICdzdHJpbmcnICAsXG5cbiAgZWxlbWVudDogdGhpbmcgPT4ge1xuICAgIGlmICghdGhpbmcgfHwgKHR5cGVvZiB0aGluZyAhPT0gJ29iamVjdCcpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgY29uc3QgX3dpbmRvdyA9IHdpbi5nZXRXaW5kb3codGhpbmcpIHx8IHdpbi53aW5kb3c7XG5cbiAgICByZXR1cm4gKC9vYmplY3R8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIF93aW5kb3cuRWxlbWVudClcbiAgICAgID8gdGhpbmcgaW5zdGFuY2VvZiBfd2luZG93LkVsZW1lbnQgLy9ET00yXG4gICAgICA6IHRoaW5nLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiB0aGluZy5ub2RlTmFtZSA9PT0gJ3N0cmluZycpO1xuICB9LFxuXG4gIHBsYWluT2JqZWN0OiB0aGluZyA9PiBpcy5vYmplY3QodGhpbmcpICYmIHRoaW5nLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdPYmplY3QnLFxufTtcblxuaXMuYXJyYXkgPSB0aGluZyA9PiAoaXMub2JqZWN0KHRoaW5nKVxuICAmJiAodHlwZW9mIHRoaW5nLmxlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpXG4gICYmIGlzLmZ1bmN0aW9uKHRoaW5nLnNwbGljZSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzO1xuIiwiY29uc3QgZG9tT2JqZWN0cyA9IHt9O1xuY29uc3Qgd2luID0gcmVxdWlyZSgnLi93aW5kb3cnKS53aW5kb3c7XG5cbmZ1bmN0aW9uIGJsYW5rICgpIHt9XG5cbmRvbU9iamVjdHMuZG9jdW1lbnQgICAgICAgICAgID0gd2luLmRvY3VtZW50O1xuZG9tT2JqZWN0cy5Eb2N1bWVudEZyYWdtZW50ICAgPSB3aW4uRG9jdW1lbnRGcmFnbWVudCAgIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5TVkdFbGVtZW50ICAgICAgICAgPSB3aW4uU1ZHRWxlbWVudCAgICAgICAgIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5TVkdTVkdFbGVtZW50ICAgICAgPSB3aW4uU1ZHU1ZHRWxlbWVudCAgICAgIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5TVkdFbGVtZW50SW5zdGFuY2UgPSB3aW4uU1ZHRWxlbWVudEluc3RhbmNlIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5FbGVtZW50ICAgICAgICAgICAgPSB3aW4uRWxlbWVudCAgICAgICAgICAgIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5IVE1MRWxlbWVudCAgICAgICAgPSB3aW4uSFRNTEVsZW1lbnQgICAgICAgIHx8IGRvbU9iamVjdHMuRWxlbWVudDtcblxuZG9tT2JqZWN0cy5FdmVudCAgICAgICAgPSB3aW4uRXZlbnQ7XG5kb21PYmplY3RzLlRvdWNoICAgICAgICA9IHdpbi5Ub3VjaCB8fCBibGFuaztcbmRvbU9iamVjdHMuUG9pbnRlckV2ZW50ID0gKHdpbi5Qb2ludGVyRXZlbnQgfHwgd2luLk1TUG9pbnRlckV2ZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb21PYmplY3RzO1xuIiwiY29uc3Qgd2luID0gbW9kdWxlLmV4cG9ydHM7XG5jb25zdCBpc1dpbmRvdyA9IHJlcXVpcmUoJy4vaXNXaW5kb3cnKTtcblxuZnVuY3Rpb24gaW5pdCAod2luZG93KSB7XG4gIC8vIGdldCB3cmFwcGVkIHdpbmRvdyBpZiB1c2luZyBTaGFkb3cgRE9NIHBvbHlmaWxsXG5cbiAgd2luLnJlYWxXaW5kb3cgPSB3aW5kb3c7XG5cbiAgLy8gY3JlYXRlIGEgVGV4dE5vZGVcbiAgY29uc3QgZWwgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuXG4gIC8vIGNoZWNrIGlmIGl0J3Mgd3JhcHBlZCBieSBhIHBvbHlmaWxsXG4gIGlmIChlbC5vd25lckRvY3VtZW50ICE9PSB3aW5kb3cuZG9jdW1lbnRcbiAgICAgICYmIHR5cGVvZiB3aW5kb3cud3JhcCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHdpbmRvdy53cmFwKGVsKSA9PT0gZWwpIHtcbiAgICAvLyB1c2Ugd3JhcHBlZCB3aW5kb3dcbiAgICB3aW5kb3cgPSB3aW5kb3cud3JhcCh3aW5kb3cpO1xuICB9XG5cbiAgd2luLndpbmRvdyA9IHdpbmRvdztcbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbi53aW5kb3cgICAgID0gdW5kZWZpbmVkO1xuICB3aW4ucmVhbFdpbmRvdyA9IHVuZGVmaW5lZDtcbn1cbmVsc2Uge1xuICBpbml0KHdpbmRvdyk7XG59XG5cbndpbi5nZXRXaW5kb3cgPSBmdW5jdGlvbiBnZXRXaW5kb3cgKG5vZGUpIHtcbiAgaWYgKGlzV2luZG93KG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjb25zdCByb290Tm9kZSA9IChub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSk7XG5cbiAgcmV0dXJuIHJvb3ROb2RlLmRlZmF1bHRWaWV3IHx8IHJvb3ROb2RlLnBhcmVudFdpbmRvdyB8fCB3aW4ud2luZG93O1xufTtcblxud2luLmluaXQgPSBpbml0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAodGhpbmcpID0+ICEhKHRoaW5nICYmIHRoaW5nLldpbmRvdykgJiYgKHRoaW5nIGluc3RhbmNlb2YgdGhpbmcuV2luZG93KTtcbiIsImNsYXNzIFNpZ25hbHMge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7XG4gICAgICAvLyBzaWduYWxOYW1lOiBbbGlzdGVuZXJzXSxcbiAgICB9O1xuICB9XG5cbiAgb24gKG5hbWUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0gPSBbbGlzdGVuZXJdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgb2ZmIChuYW1lLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMubGlzdGVuZXJzW25hbWVdLmluZGV4T2YobGlzdGVuZXIpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBmaXJlIChuYW1lLCBhcmcpIHtcbiAgICBjb25zdCB0YXJnZXRMaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tuYW1lXTtcblxuICAgIGlmICghdGFyZ2V0TGlzdGVuZXJzKSB7IHJldHVybjsgfVxuXG4gICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0YXJnZXRMaXN0ZW5lcnMpIHtcbiAgICAgIGlmIChsaXN0ZW5lcihhcmcsIG5hbWUpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblNpZ25hbHMubmV3ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IFNpZ25hbHMoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbmFscztcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBiYXNlOiB7XG4gICAgYWNjZXB0ICAgICAgICA6IG51bGwsXG4gICAgcHJldmVudERlZmF1bHQ6ICdhdXRvJyxcbiAgICBkZWx0YVNvdXJjZSAgIDogJ3BhZ2UnLFxuICB9LFxuXG4gIHBlckFjdGlvbjoge1xuICAgIG9yaWdpbjogeyB4OiAwLCB5OiAwIH0sXG5cbiAgICBpbmVydGlhOiB7XG4gICAgICBlbmFibGVkICAgICAgICAgIDogZmFsc2UsXG4gICAgICByZXNpc3RhbmNlICAgICAgIDogMTAsICAgIC8vIHRoZSBsYW1iZGEgaW4gZXhwb25lbnRpYWwgZGVjYXlcbiAgICAgIG1pblNwZWVkICAgICAgICAgOiAxMDAsICAgLy8gdGFyZ2V0IHNwZWVkIG11c3QgYmUgYWJvdmUgdGhpcyBmb3IgaW5lcnRpYSB0byBzdGFydFxuICAgICAgZW5kU3BlZWQgICAgICAgICA6IDEwLCAgICAvLyB0aGUgc3BlZWQgYXQgd2hpY2ggaW5lcnRpYSBpcyBzbG93IGVub3VnaCB0byBzdG9wXG4gICAgICBhbGxvd1Jlc3VtZSAgICAgIDogdHJ1ZSwgIC8vIGFsbG93IHJlc3VtaW5nIGFuIGFjdGlvbiBpbiBpbmVydGlhIHBoYXNlXG4gICAgICBzbW9vdGhFbmREdXJhdGlvbjogMzAwLCAgIC8vIGFuaW1hdGUgdG8gc25hcC9yZXN0cmljdCBlbmRPbmx5IGlmIHRoZXJlJ3Mgbm8gaW5lcnRpYVxuICAgIH0sXG4gIH0sXG59O1xuIiwiY29uc3QgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQuanMnKTtcblxuZnVuY3Rpb24gZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZCAoZXZlbnQsIGxpc3RlbmVycykge1xuICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgIGlmIChldmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQpIHsgYnJlYWs7IH1cblxuICAgIGxpc3RlbmVyKGV2ZW50KTtcbiAgfVxufVxuXG5jbGFzcyBFdmVudGFibGUge1xuXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zIHx8IHt9KTtcbiAgfVxuXG4gIGZpcmUgKGV2ZW50KSB7XG4gICAgbGV0IGxpc3RlbmVycztcbiAgICBjb25zdCBvbkV2ZW50ID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gICAgY29uc3QgZ2xvYmFsID0gdGhpcy5nbG9iYWw7XG5cbiAgICAvLyBJbnRlcmFjdGFibGUjb24oKSBsaXN0ZW5lcnNcbiAgICBpZiAoKGxpc3RlbmVycyA9IHRoaXNbZXZlbnQudHlwZV0pKSB7XG4gICAgICBmaXJlVW50aWxJbW1lZGlhdGVTdG9wcGVkKGV2ZW50LCBsaXN0ZW5lcnMpO1xuICAgIH1cblxuICAgIC8vIGludGVyYWN0YWJsZS5vbmV2ZW50IGxpc3RlbmVyXG4gICAgaWYgKHRoaXNbb25FdmVudF0pIHtcbiAgICAgIHRoaXNbb25FdmVudF0oZXZlbnQpO1xuICAgIH1cblxuICAgIC8vIGludGVyYWN0Lm9uKCkgbGlzdGVuZXJzXG4gICAgaWYgKCFldmVudC5wcm9wYWdhdGlvblN0b3BwZWQgJiYgZ2xvYmFsICYmIChsaXN0ZW5lcnMgPSBnbG9iYWxbZXZlbnQudHlwZV0pKSAge1xuICAgICAgZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZChldmVudCwgbGlzdGVuZXJzKTtcbiAgICB9XG4gIH1cblxuICBvbiAoZXZlbnRUeXBlLCBsaXN0ZW5lcikge1xuICAgIC8vIGlmIHRoaXMgdHlwZSBvZiBldmVudCB3YXMgbmV2ZXIgYm91bmRcbiAgICBpZiAodGhpc1tldmVudFR5cGVdKSB7XG4gICAgICB0aGlzW2V2ZW50VHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpc1tldmVudFR5cGVdID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICBvZmYgKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcbiAgICAvLyBpZiBpdCBpcyBhbiBhY3Rpb24gZXZlbnQgdHlwZVxuICAgIGNvbnN0IGV2ZW50TGlzdCA9IHRoaXNbZXZlbnRUeXBlXTtcbiAgICBjb25zdCBpbmRleCAgICAgPSBldmVudExpc3Q/IGV2ZW50TGlzdC5pbmRleE9mKGxpc3RlbmVyKSA6IC0xO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgZXZlbnRMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50TGlzdCAmJiBldmVudExpc3QubGVuZ3RoID09PSAwIHx8ICFsaXN0ZW5lcikge1xuICAgICAgdGhpc1tldmVudFR5cGVdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50YWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kIChkZXN0LCBzb3VyY2UpIHtcbiAgZm9yIChjb25zdCBwcm9wIGluIHNvdXJjZSkge1xuICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuIl19
