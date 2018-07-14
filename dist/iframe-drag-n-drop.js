require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({140:[function(require,module,exports){
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

    (0, _index2.default)('body *').draggable({
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

},{"../node_modules/interactjs/src/index":18,"./util/drag-n-drop":168}],168:[function(require,module,exports){
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

},{}]},{},[140])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGlmcmFtZS1kcmFnLW4tZHJvcC5qcyIsInNyY1xcdXRpbFxcZHJhZy1uLWRyb3AuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvcG9pbnRlckV2ZW50cy9pbnRlcmFjdGFibGVUYXJnZXRzLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3BvaW50ZXJFdmVudHMvaG9sZFJlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9wb2ludGVyRXZlbnRzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvcG9pbnRlckV2ZW50cy9Qb2ludGVyRXZlbnQuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3NuYXBTaXplLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL21vZGlmaWVycy9zbmFwLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL21vZGlmaWVycy9yZXN0cmljdFNpemUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3Jlc3RyaWN0RWRnZXMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3Jlc3RyaWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2ludGVyYWN0YWJsZVByZXZlbnREZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2luZXJ0aWEuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYXV0b1N0YXJ0L3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvaG9sZC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvZ2VzdHVyZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvSW50ZXJhY3RhYmxlTWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL3JhZi5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hY3Rpb25zL3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hY3Rpb25zL2dlc3R1cmUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYWN0aW9ucy9kcm9wLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2ludGVyYWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2FjdGlvbnMvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9JbnRlcmFjdGFibGUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvY2xvbmUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYWN0aW9ucy9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL0ludGVyYWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2ludGVyYWN0aW9uRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3Njb3BlLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9wb2ludGVyVXRpbHMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaHlwb3QuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvcG9pbnRlckV4dGVuZC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9hcnIuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvSW50ZXJhY3RFdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9nZXRPcmlnaW5YWS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9yZWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2RvbVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaXMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvZG9tT2JqZWN0cy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy93aW5kb3cuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaXNXaW5kb3cuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvU2lnbmFscy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9kZWZhdWx0T3B0aW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9FdmVudGFibGUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBQ0E7Ozs7OztBQUVBLEtBQUssUUFBTCxHQUFnQixlQUFoQjtBQUNBLEtBQUssWUFBTCxHQUFvQix1QkFBcEI7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFNO0FBQ3BCLFFBQUksa0JBQWtCLEtBQXRCO0FBQ0EsUUFBTSxtQkFBbUIsU0FBbkIsZ0JBQW1CO0FBQUEsZUFBVyxDQUFDLENBQUMsRUFBRSxPQUFGLEVBQVcsT0FBWCxDQUFtQixXQUFuQixFQUFnQyxNQUE3QztBQUFBLEtBQXpCOztBQUVBO0FBQ0EseUJBQVMsV0FBVCxFQUNLLFFBREwsQ0FDYztBQUNOO0FBQ0EsZ0JBQVEsUUFGRjtBQUdOO0FBQ0EsaUJBQVMsSUFKSDtBQUtOO0FBQ0Esd0JBQWdCLHdCQUFVLEtBQVYsRUFBaUI7QUFDN0I7QUFDQSxrQkFBTSxNQUFOLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixhQUEzQjtBQUNILFNBVEs7QUFVTixxQkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCLGdCQUFJLG1CQUFtQixNQUFNLGFBQTdCO0FBQUEsZ0JBQ0ksa0JBQWtCLE1BQU0sTUFENUI7O0FBR0E7QUFDQSw0QkFBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsYUFBOUI7QUFDQSw2QkFBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsVUFBL0I7QUFDSCxTQWpCSztBQWtCTixxQkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCO0FBQ0Esa0JBQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDQSxrQkFBTSxhQUFOLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFVBQXJDO0FBQ0EsOEJBQWtCLEtBQWxCO0FBQ0gsU0F2Qks7QUF3Qk4sZ0JBQVEsdUJBQVM7QUFDYiw4QkFBa0IsSUFBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBTSxTQUFTLEVBQUUsTUFBTSxhQUFSLEVBQXVCLE1BQXZCLEVBQWY7QUFDQSxjQUFFLE1BQU0sYUFBUixFQUNLLFFBREwsQ0FDYyxFQUFFLE1BQU0sTUFBUixDQURkLEVBRUssR0FGTCxDQUVTO0FBQ0Qsc0JBQU0sRUFETDtBQUVELHFCQUFLLEVBRko7QUFHRCwyQkFBVztBQUhWLGFBRlQsRUFPSyxNQVBMLENBT1ksTUFQWixFQVFLLFVBUkwsQ0FRZ0IsZUFSaEI7QUFTSCxTQXZDSztBQXdDTiwwQkFBa0IsMEJBQVUsS0FBVixFQUFpQjtBQUMvQjtBQUNBLGtCQUFNLE1BQU4sQ0FBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLGFBQTlCO0FBQ0Esa0JBQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDQSxnQkFBSSxDQUFDLGVBQUQsSUFBb0IsaUJBQWlCLE1BQU0sYUFBdkIsQ0FBeEIsRUFBK0Q7QUFDM0Qsb0JBQU0sU0FBUyxFQUFFLE1BQU0sYUFBUixFQUF1QixNQUF2QixFQUFmO0FBQ0Esa0JBQUUsTUFBTSxhQUFSLEVBQ0ssUUFETCxDQUNjLEVBQUUsTUFBRixDQURkLEVBRUssTUFGTCxDQUVZLE1BRlo7QUFHSDtBQUNKO0FBbERLLEtBRGQsRUFxREssU0FyREwsQ0FxRGU7QUFDUDtBQUNBLGVBQU8sRUFBRSxNQUFNLElBQVIsRUFBYyxPQUFPLElBQXJCLEVBQTJCLFFBQVEsSUFBbkMsRUFBeUMsS0FBSyxJQUE5QyxFQUZBOztBQUlQO0FBQ0EsdUJBQWU7QUFDWCxtQkFBTyxRQURJO0FBRVgscUJBQVM7QUFGRSxTQUxSOztBQVVQO0FBQ0Esc0JBQWM7QUFDVixpQkFBSyxFQUFFLE9BQU8sR0FBVCxFQUFjLFFBQVEsRUFBdEI7QUFESyxTQVhQOztBQWVQLGlCQUFTO0FBZkYsS0FyRGYsRUFzRUssRUF0RUwsQ0FzRVEsWUF0RVIsRUFzRXNCLFVBQVUsS0FBVixFQUFpQjtBQUMvQixZQUFJLFNBQVMsTUFBTSxNQUFuQjtBQUFBLFlBQ0ksSUFBSyxXQUFXLE9BQU8sWUFBUCxDQUFvQixRQUFwQixDQUFYLEtBQTZDLENBRHREO0FBQUEsWUFFSSxJQUFLLFdBQVcsT0FBTyxZQUFQLENBQW9CLFFBQXBCLENBQVgsS0FBNkMsQ0FGdEQ7O0FBSUE7QUFDQSxlQUFPLEtBQVAsQ0FBYSxLQUFiLEdBQXFCLE1BQU0sSUFBTixDQUFXLEtBQVgsR0FBbUIsSUFBeEM7QUFDQSxlQUFPLEtBQVAsQ0FBYSxNQUFiLEdBQXNCLE1BQU0sSUFBTixDQUFXLE1BQVgsR0FBb0IsSUFBMUM7O0FBRUE7QUFDQSxhQUFLLE1BQU0sU0FBTixDQUFnQixJQUFyQjtBQUNBLGFBQUssTUFBTSxTQUFOLENBQWdCLEdBQXJCOztBQUVBLGVBQU8sS0FBUCxDQUFhLGVBQWIsR0FBK0IsT0FBTyxLQUFQLENBQWEsU0FBYixHQUMzQixlQUFlLENBQWYsR0FBbUIsS0FBbkIsR0FBMkIsQ0FBM0IsR0FBK0IsS0FEbkM7O0FBR0EsZUFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0EsZUFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0gsS0F4Rkw7O0FBMEZBLHlCQUFTLFFBQVQsRUFDSyxTQURMLENBQ2U7QUFDUDtBQUNBLGlCQUFTLElBRkY7QUFHUDtBQUNBLGtCQUFVO0FBQ04seUJBQWEsU0FBUyxJQURoQjtBQUVOLHFCQUFTLElBRkg7QUFHTix5QkFBYSxFQUFFLEtBQUssQ0FBUCxFQUFVLE1BQU0sQ0FBaEIsRUFBbUIsUUFBUSxDQUEzQixFQUE4QixPQUFPLENBQXJDO0FBSFAsU0FKSDtBQVNQO0FBQ0Esb0JBQVksSUFWTDs7QUFZUDtBQUNBLGdCQUFRLHVCQUFTO0FBQ2I7QUFDQSxnQkFBSSxTQUFTLE1BQU0sTUFBbkI7O0FBQ0k7QUFDQSxnQkFBSSxDQUFDLFdBQVcsT0FBTyxZQUFQLENBQW9CLFFBQXBCLENBQVgsS0FBNkMsQ0FBOUMsSUFBbUQsTUFBTSxFQUZqRTtBQUFBLGdCQUdJLElBQUksQ0FBQyxXQUFXLE9BQU8sWUFBUCxDQUFvQixRQUFwQixDQUFYLEtBQTZDLENBQTlDLElBQW1ELE1BQU0sRUFIakU7O0FBS0E7QUFDQSxtQkFBTyxLQUFQLENBQWEsZUFBYixHQUNJLE9BQU8sS0FBUCxDQUFhLFNBQWIsR0FDQSxlQUFlLENBQWYsR0FBbUIsTUFBbkIsR0FBNEIsQ0FBNUIsR0FBZ0MsS0FGcEM7O0FBSUE7QUFDQSxtQkFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0EsbUJBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixDQUE5Qjs7QUFFQSw4Q0FBa0IsTUFBbEI7QUFDSCxTQTlCTTtBQStCUDtBQUNBLGVBQU87QUFoQ0EsS0FEZjtBQW1DSCxDQWxJRDs7Ozs7O0FDTkEsU0FBUyxPQUFULENBQWlCLFlBQWpCLEVBQStCLGFBQS9CLEVBQThDO0FBQzFDLFdBQU87QUFDSCwyQkFBbUIsS0FBSyxHQUFMLENBQVMsYUFBYSxHQUFiLEdBQW1CLGNBQWMsR0FBMUMsS0FBa0QsQ0FEbEU7QUFFSCx5QkFBaUIsS0FBSyxHQUFMLENBQVMsYUFBYSxJQUFiLEdBQW9CLGNBQWMsSUFBM0MsS0FBb0Q7QUFGbEUsS0FBUDtBQUlIOztBQUVELFNBQVMsb0JBQVQsR0FBZ0M7QUFDNUIsTUFBRSxrQ0FBRixFQUFzQyxNQUF0QztBQUNIOztBQUVELFNBQVMsaUJBQVQsQ0FBMkIsTUFBM0IsRUFBbUM7QUFDL0IsUUFBSSx1QkFBdUIsS0FBM0I7QUFDQSxRQUFJLHFCQUFxQixLQUF6QjtBQUNBLFFBQU0sZUFBZSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQXJCOztBQUVBLFVBQU0sSUFBTixDQUFXLEVBQUUsNEJBQUYsQ0FBWCxFQUNLLE1BREwsQ0FDWTtBQUFBLGVBQWdCLGdCQUFnQixNQUFoQztBQUFBLEtBRFosRUFFSyxJQUZMLENBRVUsd0JBQWdCO0FBQ2xCLFlBQU0sZ0JBQWdCLEVBQUUsWUFBRixFQUFnQixNQUFoQixFQUF0Qjs7QUFEa0IsdUJBRTZCLFFBQVEsWUFBUixFQUFzQixhQUF0QixDQUY3QjtBQUFBLFlBRVYsaUJBRlUsWUFFVixpQkFGVTtBQUFBLFlBRVMsZUFGVCxZQUVTLGVBRlQ7O0FBR2xCLFlBQUksQ0FBQyxvQkFBRCxJQUF5QixpQkFBN0IsRUFBZ0Q7QUFDNUMsY0FBRSxRQUFGLEVBQ0ssUUFETCxDQUNjLGlCQURkLEVBRUssR0FGTCxDQUVTO0FBQ0QscUJBQUssYUFBYTtBQURqQixhQUZULEVBS0ssUUFMTCxDQUtjLEVBQUUsTUFBRixDQUxkO0FBTUEsbUNBQXVCLElBQXZCO0FBQ0g7QUFDRCxZQUFJLENBQUMsa0JBQUQsSUFBdUIsZUFBM0IsRUFBNEM7QUFDeEMsY0FBRSxRQUFGLEVBQ0ssUUFETCxDQUNjLGVBRGQsRUFFSyxHQUZMLENBRVM7QUFDRCxzQkFBTSxhQUFhO0FBRGxCLGFBRlQsRUFLSyxRQUxMLENBS2MsRUFBRSxNQUFGLENBTGQ7QUFNQSxpQ0FBcUIsSUFBckI7QUFDSDtBQUNELGVBQU8sd0JBQXdCLGtCQUEvQjtBQUNILEtBeEJMO0FBeUJIOztBQUVELFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQixPQUEzQixFQUFvQztBQUNoQzs7QUFFQSxRQUFJLEtBQUssQ0FBVDtBQUFBLFFBQVksS0FBSyxDQUFqQjtBQUNBLFlBQVEsR0FBUjtBQUNJLGFBQUssRUFBTDtBQUFTO0FBQ0wsaUJBQUssQ0FBQyxDQUFOO0FBQ0E7QUFDSixhQUFLLEVBQUw7QUFBUztBQUNMLGlCQUFLLENBQUMsQ0FBTjtBQUNBO0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTCxpQkFBSyxDQUFMO0FBQ0E7QUFDSixhQUFLLEVBQUw7QUFBUztBQUNMLGlCQUFLLENBQUw7QUFDQTtBQUNKO0FBQVMsbUJBYmIsQ0FhcUI7QUFickI7O0FBZ0JBO0FBQ0EsUUFBTSxJQUFJLENBQUMsV0FBVyxRQUFRLElBQVIsQ0FBYSxRQUFiLENBQVgsS0FBc0MsQ0FBdkMsSUFBNEMsRUFBdEQ7QUFBQSxRQUNJLElBQUksQ0FBQyxXQUFXLFFBQVEsSUFBUixDQUFhLFFBQWIsQ0FBWCxLQUFzQyxDQUF2QyxJQUE0QyxFQURwRDs7QUFHQSxZQUFRLEdBQVIsQ0FBWTtBQUNSLGtDQUF3QixDQUF4QixZQUFnQyxDQUFoQztBQURRLEtBQVo7O0FBSUE7QUFDQSxZQUFRLElBQVIsQ0FBYSxRQUFiLEVBQXVCLENBQXZCO0FBQ0EsWUFBUSxJQUFSLENBQWEsUUFBYixFQUF1QixDQUF2Qjs7QUFFQSxzQkFBa0IsUUFBUSxHQUFSLENBQVksQ0FBWixDQUFsQjtBQUNIOztRQUVRLG9CLEdBQUEsb0I7UUFBc0IsWSxHQUFBLFk7UUFBYyxpQixHQUFBLGlCOzs7QUM5RTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3phQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JPQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgcmVtb3ZlQWxpZ25tZW50TGluZXMsIGFycm93S2V5TW92ZSwgZHJhd0FsaWdubWVudExpbmUgfSBmcm9tICcuL3V0aWwvZHJhZy1uLWRyb3AnO1xyXG5pbXBvcnQgaW50ZXJhY3QgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2luZGV4JztcclxuXHJcbnNlbGYuaW50ZXJhY3QgPSBpbnRlcmFjdDtcclxuc2VsZi5hcnJvd0tleU1vdmUgPSBhcnJvd0tleU1vdmU7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcbiAgICBsZXQgZW50ZXJlZERyb3B6b25lID0gZmFsc2U7XHJcbiAgICBjb25zdCBpc0Ryb3B6b25lUGFyZW50ID0gZWxlbWVudCA9PiAhISQoZWxlbWVudCkucGFyZW50cygnLmRyb3B6b25lJykubGVuZ3RoO1xyXG5cclxuICAgIC8vIGVuYWJsZSBkcmFnZ2FibGVzIHRvIGJlIGRyb3BwZWQgaW50byB0aGlzXHJcbiAgICBpbnRlcmFjdCgnLmRyb3B6b25lJylcclxuICAgICAgICAuZHJvcHpvbmUoe1xyXG4gICAgICAgICAgICAvLyBvbmx5IGFjY2VwdCBlbGVtZW50cyBtYXRjaGluZyB0aGlzIENTUyBzZWxlY3RvclxyXG4gICAgICAgICAgICBhY2NlcHQ6ICdib2R5IConLFxyXG4gICAgICAgICAgICAvLyBSZXF1aXJlIGEgNzUlIGVsZW1lbnQgb3ZlcmxhcCBmb3IgYSBkcm9wIHRvIGJlIHBvc3NpYmxlXHJcbiAgICAgICAgICAgIG92ZXJsYXA6IDAuNTAsXHJcbiAgICAgICAgICAgIC8vIGxpc3RlbiBmb3IgZHJvcCByZWxhdGVkIGV2ZW50czpcclxuICAgICAgICAgICAgb25kcm9wYWN0aXZhdGU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGFjdGl2ZSBkcm9wem9uZSBmZWVkYmFja1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2Ryb3AtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZHJhZ2VudGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkcmFnZ2FibGVFbGVtZW50ID0gZXZlbnQucmVsYXRlZFRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZUVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZmVlZGJhY2sgdGhlIHBvc3NpYmlsaXR5IG9mIGEgZHJvcFxyXG4gICAgICAgICAgICAgICAgZHJvcHpvbmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3AtdGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Nhbi1kcm9wJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZHJhZ2xlYXZlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZHJvcCBmZWVkYmFjayBzdHlsZVxyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtdGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5yZWxhdGVkVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Nhbi1kcm9wJyk7XHJcbiAgICAgICAgICAgICAgICBlbnRlcmVkRHJvcHpvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25kcm9wOiBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbnRlcmVkRHJvcHpvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gb2Zmc2V0KCnlh73mlbDnlKjkuo7orr7nva7miJbov5Tlm57lvZPliY3ljLnphY3lhYPntKDnm7jlr7nkuo7lvZPliY3mlofmoaPnmoTlgY/np7vvvIzkuZ/lsLHmmK/nm7jlr7nkuo7lvZPliY3mlofmoaPnmoTlnZDmoIdcclxuICAgICAgICAgICAgICAgIC8vIOWFg+e0oOWPr+S7peaYr+S7u+aEj+WumuS9jeaWueW8j+eahOWFg+e0oFxyXG4gICAgICAgICAgICAgICAgLy8g5Y2V54us6K6+572ubGVmdOaIlnRvcOWvueS6jmFic29sdXRl5a6a5L2N55qE5YWD57Sg5p2l6K+077yM5piv55u45a+55LqO5pyA6L+R55qE5bey5a6a5L2N56WW5YWI5YWD57Sg5oiW55u45a+55LqO5pyA5Yid55qE5YyF5ZCr5Z2X44CCXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLm9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgJChldmVudC5yZWxhdGVkVGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKGV2ZW50LnRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9mZnNldChvZmZzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEteCBkYXRhLXknKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25kcm9wZGVhY3RpdmF0ZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGRyb3B6b25lIGZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbnRlcmVkRHJvcHpvbmUgJiYgaXNEcm9wem9uZVBhcmVudChldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9ICQoZXZlbnQucmVsYXRlZFRhcmdldCkub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChldmVudC5yZWxhdGVkVGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnYm9keScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub2Zmc2V0KG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAvLyByZXNpemUgZnJvbSBhbGwgZWRnZXMgYW5kIGNvcm5lcnNcclxuICAgICAgICAgICAgZWRnZXM6IHsgbGVmdDogdHJ1ZSwgcmlnaHQ6IHRydWUsIGJvdHRvbTogdHJ1ZSwgdG9wOiB0cnVlIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBrZWVwIHRoZSBlZGdlcyBpbnNpZGUgdGhlIHBhcmVudFxyXG4gICAgICAgICAgICByZXN0cmljdEVkZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICBvdXRlcjogJ3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICBlbmRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gbWluaW11bSBzaXplXHJcbiAgICAgICAgICAgIHJlc3RyaWN0U2l6ZToge1xyXG4gICAgICAgICAgICAgICAgbWluOiB7IHdpZHRoOiAxMDAsIGhlaWdodDogNTAgfSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGluZXJ0aWE6IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ3Jlc2l6ZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCxcclxuICAgICAgICAgICAgICAgIHggPSAocGFyc2VGbG9hdCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSkgfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS15JykpIHx8IDApO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBlbGVtZW50J3Mgc3R5bGVcclxuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gZXZlbnQucmVjdC53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBldmVudC5yZWN0LmhlaWdodCArICdweCc7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgd2hlbiByZXNpemluZyBmcm9tIHRvcCBvciBsZWZ0IGVkZ2VzXHJcbiAgICAgICAgICAgIHggKz0gZXZlbnQuZGVsdGFSZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgIHkgKz0gZXZlbnQuZGVsdGFSZWN0LnRvcDtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID1cclxuICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIHggKyAncHgsJyArIHkgKyAncHgpJztcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHgpO1xyXG4gICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBpbnRlcmFjdCgnYm9keSAqJylcclxuICAgICAgICAuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgLy8gZW5hYmxlIGluZXJ0aWFsIHRocm93aW5nXHJcbiAgICAgICAgICAgIGluZXJ0aWE6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIGtlZXAgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBhcmVhIG9mIGl0J3MgcGFyZW50XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdGlvbjogZG9jdW1lbnQuYm9keSxcclxuICAgICAgICAgICAgICAgIGVuZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50UmVjdDogeyB0b3A6IDAsIGxlZnQ6IDAsIGJvdHRvbTogMSwgcmlnaHQ6IDEgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBlbmFibGUgYXV0b1Njcm9sbFxyXG4gICAgICAgICAgICBhdXRvU2Nyb2xsOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIG9uIGV2ZXJ5IGRyYWdtb3ZlIGV2ZW50XHJcbiAgICAgICAgICAgIG9ubW92ZTogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWxpZ25tZW50TGluZXMoKTtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCB0aGUgZHJhZ2dlZCBwb3NpdGlvbiBpbiB0aGUgZGF0YS14L2RhdGEteSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpKSB8fCAwKSArIGV2ZW50LmR4LFxyXG4gICAgICAgICAgICAgICAgICAgIHkgPSAocGFyc2VGbG9hdCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSkgfHwgMCkgKyBldmVudC5keTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2xhdGUgdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPVxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPVxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3NpaW9uIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHgpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZHJhd0FsaWdubWVudExpbmUodGFyZ2V0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIG9uIGV2ZXJ5IGRyYWdlbmQgZXZlbnRcclxuICAgICAgICAgICAgb25lbmQ6IHJlbW92ZUFsaWdubWVudExpbmVzXHJcbiAgICAgICAgfSk7XHJcbn0pOyIsImZ1bmN0aW9uIGlzQWxpZ24odGFyZ2V0T2Zmc2V0LCBjdXJyZW50T2Zmc2V0KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGlzSG9yaXpvbnRhbEFsaWduOiBNYXRoLmFicyh0YXJnZXRPZmZzZXQudG9wIC0gY3VycmVudE9mZnNldC50b3ApIDw9IDEsXHJcbiAgICAgICAgaXNWZXJ0aWNhbEFsaWduOiBNYXRoLmFicyh0YXJnZXRPZmZzZXQubGVmdCAtIGN1cnJlbnRPZmZzZXQubGVmdCkgPD0gMVxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxpZ25tZW50TGluZXMoKSB7XHJcbiAgICAkKCcuaG9yaXpvbnRhbC1saW5lLCAudmVydGljYWwtbGluZScpLnJlbW92ZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3QWxpZ25tZW50TGluZSh0YXJnZXQpIHtcclxuICAgIGxldCBob3Jpem9udGFsTGluZUV4aXN0cyA9IGZhbHNlO1xyXG4gICAgbGV0IHZlcnRpY2FsTGluZUV4aXN0cyA9IGZhbHNlO1xyXG4gICAgY29uc3QgdGFyZ2V0T2Zmc2V0ID0gJCh0YXJnZXQpLm9mZnNldCgpO1xyXG5cclxuICAgIEFycmF5LmZyb20oJCgnYm9keSAqOnZpc2libGU6bm90KHNjcmlwdCknKSlcclxuICAgICAgICAuZmlsdGVyKGN1cnJlbnRWYWx1ZSA9PiBjdXJyZW50VmFsdWUgIT0gdGFyZ2V0KVxyXG4gICAgICAgIC5zb21lKGN1cnJlbnRWYWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRPZmZzZXQgPSAkKGN1cnJlbnRWYWx1ZSkub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaXNIb3Jpem9udGFsQWxpZ24sIGlzVmVydGljYWxBbGlnbiB9ID0gaXNBbGlnbih0YXJnZXRPZmZzZXQsIGN1cnJlbnRPZmZzZXQpO1xyXG4gICAgICAgICAgICBpZiAoIWhvcml6b250YWxMaW5lRXhpc3RzICYmIGlzSG9yaXpvbnRhbEFsaWduKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8aHIgLz4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaG9yaXpvbnRhbC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRPZmZzZXQudG9wXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgICAgICAgICAgICAgIGhvcml6b250YWxMaW5lRXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXZlcnRpY2FsTGluZUV4aXN0cyAmJiBpc1ZlcnRpY2FsQWxpZ24pIHtcclxuICAgICAgICAgICAgICAgICQoJzxociAvPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd2ZXJ0aWNhbC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0T2Zmc2V0LmxlZnRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgICAgICAgICAgICAgdmVydGljYWxMaW5lRXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaG9yaXpvbnRhbExpbmVFeGlzdHMgJiYgdmVydGljYWxMaW5lRXhpc3RzO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcnJvd0tleU1vdmUoa2V5LCBlbGVtZW50KSB7XHJcbiAgICByZW1vdmVBbGlnbm1lbnRMaW5lcygpO1xyXG5cclxuICAgIGxldCBkeCA9IDAsIGR5ID0gMDtcclxuICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgY2FzZSAzNzogLy8gbGVmdFxyXG4gICAgICAgICAgICBkeCA9IC0xO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM4OiAvLyB1cFxyXG4gICAgICAgICAgICBkeSA9IC0xO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM5OiAvLyByaWdodFxyXG4gICAgICAgICAgICBkeCA9IDE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDA6IC8vIGRvd25cclxuICAgICAgICAgICAgZHkgPSAxO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiByZXR1cm47IC8vIGV4aXQgdGhpcyBoYW5kbGVyIGZvciBvdGhlciBrZXlzXHJcbiAgICB9XHJcblxyXG4gICAgLy8ga2VlcCB0aGUgZHJhZ2dlZCBwb3NpdGlvbiBpbiB0aGUgZGF0YS14L2RhdGEteSBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCB4ID0gKHBhcnNlRmxvYXQoZWxlbWVudC5hdHRyKCdkYXRhLXgnKSkgfHwgMCkgKyBkeCxcclxuICAgICAgICB5ID0gKHBhcnNlRmxvYXQoZWxlbWVudC5hdHRyKCdkYXRhLXknKSkgfHwgMCkgKyBkeTtcclxuXHJcbiAgICBlbGVtZW50LmNzcyh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWBcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gYXR0cmlidXRlc1xyXG4gICAgZWxlbWVudC5hdHRyKCdkYXRhLXgnLCB4KTtcclxuICAgIGVsZW1lbnQuYXR0cignZGF0YS15JywgeSk7XHJcblxyXG4gICAgZHJhd0FsaWdubWVudExpbmUoZWxlbWVudC5nZXQoMCkpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW1vdmVBbGlnbm1lbnRMaW5lcywgYXJyb3dLZXlNb3ZlLCBkcmF3QWxpZ25tZW50TGluZSB9OyIsIi8qIGJyb3dzZXIgZW50cnkgcG9pbnQgKi9cblxuLy8gaW5lcnRpYVxucmVxdWlyZSgnLi9pbmVydGlhJyk7XG5cbi8vIG1vZGlmaWVyc1xucmVxdWlyZSgnLi9tb2RpZmllcnMvc25hcCcpO1xucmVxdWlyZSgnLi9tb2RpZmllcnMvcmVzdHJpY3QnKTtcblxuLy8gcG9pbnRlckV2ZW50c1xucmVxdWlyZSgnLi9wb2ludGVyRXZlbnRzL2Jhc2UnKTtcbnJlcXVpcmUoJy4vcG9pbnRlckV2ZW50cy9ob2xkUmVwZWF0Jyk7XG5yZXF1aXJlKCcuL3BvaW50ZXJFdmVudHMvaW50ZXJhY3RhYmxlVGFyZ2V0cycpO1xuXG4vLyBhdXRvU3RhcnQgaG9sZFxucmVxdWlyZSgnLi9hdXRvU3RhcnQvaG9sZCcpO1xuXG4vLyBhY3Rpb25zXG5yZXF1aXJlKCcuL2FjdGlvbnMvZ2VzdHVyZScpO1xucmVxdWlyZSgnLi9hY3Rpb25zL3Jlc2l6ZScpO1xucmVxdWlyZSgnLi9hY3Rpb25zL2RyYWcnKTtcbnJlcXVpcmUoJy4vYWN0aW9ucy9kcm9wJyk7XG5cbi8vIGxvYWQgdGhlc2UgbW9kaWZpZXJzIGFmdGVyIHJlc2l6ZSBpcyBsb2FkZWRcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3NuYXBTaXplJyk7XG5yZXF1aXJlKCcuL21vZGlmaWVycy9yZXN0cmljdEVkZ2VzJyk7XG5yZXF1aXJlKCcuL21vZGlmaWVycy9yZXN0cmljdFNpemUnKTtcblxuLy8gYXV0b1N0YXJ0IGFjdGlvbnNcbnJlcXVpcmUoJy4vYXV0b1N0YXJ0L2dlc3R1cmUnKTtcbnJlcXVpcmUoJy4vYXV0b1N0YXJ0L3Jlc2l6ZScpO1xucmVxdWlyZSgnLi9hdXRvU3RhcnQvZHJhZycpO1xuXG4vLyBJbnRlcmFjdGFibGUgcHJldmVudERlZmF1bHQgc2V0dGluZ1xucmVxdWlyZSgnLi9pbnRlcmFjdGFibGVQcmV2ZW50RGVmYXVsdC5qcycpO1xuXG4vLyBhdXRvU2Nyb2xsXG5yZXF1aXJlKCcuL2F1dG9TY3JvbGwnKTtcblxuLy8gZXhwb3J0IGludGVyYWN0XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW50ZXJhY3QnKTtcbiIsImNvbnN0IHBvaW50ZXJFdmVudHMgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IEludGVyYWN0YWJsZSAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IGlzICAgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9pcycpO1xuY29uc3Qgc2NvcGUgICAgICAgICA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG5jb25zdCBleHRlbmQgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvZXh0ZW5kJyk7XG5jb25zdCB7IG1lcmdlIH0gICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvYXJyJyk7XG5cbnBvaW50ZXJFdmVudHMuc2lnbmFscy5vbignY29sbGVjdC10YXJnZXRzJywgZnVuY3Rpb24gKHsgdGFyZ2V0cywgZWxlbWVudCwgdHlwZSwgZXZlbnRUYXJnZXQgfSkge1xuICBzY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChlbGVtZW50LCBpbnRlcmFjdGFibGUgPT4ge1xuICAgIGNvbnN0IGV2ZW50YWJsZSA9IGludGVyYWN0YWJsZS5ldmVudHM7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGV2ZW50YWJsZS5vcHRpb25zO1xuXG4gICAgaWYgKGV2ZW50YWJsZVt0eXBlXVxuICAgICAgJiYgaXMuZWxlbWVudChlbGVtZW50KVxuICAgICAgJiYgaW50ZXJhY3RhYmxlLnRlc3RJZ25vcmVBbGxvdyhvcHRpb25zLCBlbGVtZW50LCBldmVudFRhcmdldCkpIHtcblxuICAgICAgdGFyZ2V0cy5wdXNoKHtcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgZXZlbnRhYmxlLFxuICAgICAgICBwcm9wczogeyBpbnRlcmFjdGFibGUgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuSW50ZXJhY3RhYmxlLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uICh7IGludGVyYWN0YWJsZSB9KSB7XG4gIGludGVyYWN0YWJsZS5ldmVudHMuZ2V0UmVjdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGludGVyYWN0YWJsZS5nZXRSZWN0KGVsZW1lbnQpO1xuICB9O1xufSk7XG5cbkludGVyYWN0YWJsZS5zaWduYWxzLm9uKCdzZXQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGFibGUsIG9wdGlvbnMgfSkge1xuICBleHRlbmQoaW50ZXJhY3RhYmxlLmV2ZW50cy5vcHRpb25zLCBwb2ludGVyRXZlbnRzLmRlZmF1bHRzKTtcbiAgZXh0ZW5kKGludGVyYWN0YWJsZS5ldmVudHMub3B0aW9ucywgb3B0aW9ucyk7XG59KTtcblxubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIHBvaW50ZXJFdmVudHMudHlwZXMpO1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnBvaW50ZXJFdmVudHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBleHRlbmQodGhpcy5ldmVudHMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBfX2JhY2tDb21wYXRPcHRpb24gPSBJbnRlcmFjdGFibGUucHJvdG90eXBlLl9iYWNrQ29tcGF0T3B0aW9uO1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLl9iYWNrQ29tcGF0T3B0aW9uID0gZnVuY3Rpb24gKG9wdGlvbk5hbWUsIG5ld1ZhbHVlKSB7XG4gIGNvbnN0IHJldCA9IF9fYmFja0NvbXBhdE9wdGlvbi5jYWxsKHRoaXMsIG9wdGlvbk5hbWUsIG5ld1ZhbHVlKTtcblxuICBpZiAocmV0ID09PSB0aGlzKSB7XG4gICAgdGhpcy5ldmVudHMub3B0aW9uc1tvcHRpb25OYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgncG9pbnRlckV2ZW50cycpO1xuIiwiY29uc3QgcG9pbnRlckV2ZW50cyA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5cbnBvaW50ZXJFdmVudHMuc2lnbmFscy5vbignbmV3Jywgb25OZXcpO1xucG9pbnRlckV2ZW50cy5zaWduYWxzLm9uKCdmaXJlZCcsIG9uRmlyZWQpO1xuXG5mb3IgKGNvbnN0IHNpZ25hbCBvZiBbJ21vdmUnLCAndXAnLCAnY2FuY2VsJywgJ2VuZGFsbCddKSB7XG4gIEludGVyYWN0aW9uLnNpZ25hbHMub24oc2lnbmFsLCBlbmRIb2xkUmVwZWF0KTtcbn1cblxuZnVuY3Rpb24gb25OZXcgKHsgcG9pbnRlckV2ZW50IH0pIHtcbiAgaWYgKHBvaW50ZXJFdmVudC50eXBlICE9PSAnaG9sZCcpIHsgcmV0dXJuOyB9XG5cbiAgcG9pbnRlckV2ZW50LmNvdW50ID0gKHBvaW50ZXJFdmVudC5jb3VudCB8fCAwKSArIDE7XG59XG5cbmZ1bmN0aW9uIG9uRmlyZWQgKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXJFdmVudCwgZXZlbnRUYXJnZXQsIHRhcmdldHMgfSkge1xuICBpZiAocG9pbnRlckV2ZW50LnR5cGUgIT09ICdob2xkJyB8fCAhdGFyZ2V0cy5sZW5ndGgpIHsgcmV0dXJuOyB9XG5cbiAgLy8gZ2V0IHRoZSByZXBlYXQgaW50ZXJ2YWwgZnJvbSB0aGUgZmlyc3QgZXZlbnRhYmxlXG4gIGNvbnN0IGludGVydmFsID0gdGFyZ2V0c1swXS5ldmVudGFibGUub3B0aW9ucy5ob2xkUmVwZWF0SW50ZXJ2YWw7XG5cbiAgLy8gZG9uJ3QgcmVwZWF0IGlmIHRoZSBpbnRlcnZhbCBpcyAwIG9yIGxlc3NcbiAgaWYgKGludGVydmFsIDw9IDApIHsgcmV0dXJuOyB9XG5cbiAgLy8gc2V0IGEgdGltZW91dCB0byBmaXJlIHRoZSBob2xkcmVwZWF0IGV2ZW50XG4gIGludGVyYWN0aW9uLmhvbGRJbnRlcnZhbEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHBvaW50ZXJFdmVudHMuZmlyZSh7XG4gICAgICBpbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50VGFyZ2V0LFxuICAgICAgdHlwZTogJ2hvbGQnLFxuICAgICAgcG9pbnRlcjogcG9pbnRlckV2ZW50LFxuICAgICAgZXZlbnQ6IHBvaW50ZXJFdmVudCxcbiAgICB9KTtcbiAgfSwgaW50ZXJ2YWwpO1xufVxuXG5mdW5jdGlvbiBlbmRIb2xkUmVwZWF0ICh7IGludGVyYWN0aW9uIH0pIHtcbiAgLy8gc2V0IHRoZSBpbnRlcmFjdGlvbidzIGhvbGRTdG9wVGltZSBwcm9wZXJ0eVxuICAvLyB0byBzdG9wIGZ1cnRoZXIgaG9sZFJlcGVhdCBldmVudHNcbiAgaWYgKGludGVyYWN0aW9uLmhvbGRJbnRlcnZhbEhhbmRsZSkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlKTtcbiAgICBpbnRlcmFjdGlvbi5ob2xkSW50ZXJ2YWxIYW5kbGUgPSBudWxsO1xuICB9XG59XG5cbi8vIGRvbid0IHJlcGVhdCBieSBkZWZhdWx0XG5wb2ludGVyRXZlbnRzLmRlZmF1bHRzLmhvbGRSZXBlYXRJbnRlcnZhbCA9IDA7XG5wb2ludGVyRXZlbnRzLnR5cGVzLnB1c2goJ2hvbGRyZXBlYXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uTmV3LFxuICBvbkZpcmVkLFxuICBlbmRIb2xkUmVwZWF0LFxufTtcbiIsImNvbnN0IFBvaW50ZXJFdmVudCA9IHJlcXVpcmUoJy4vUG9pbnRlckV2ZW50Jyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgdXRpbHMgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IGRlZmF1bHRzICAgICA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5jb25zdCBzaWduYWxzICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbmNvbnN0IHNpbXBsZVNpZ25hbHMgPSBbICdkb3duJywgJ3VwJywgJ2NhbmNlbCcgXTtcbmNvbnN0IHNpbXBsZUV2ZW50cyAgPSBbICdkb3duJywgJ3VwJywgJ2NhbmNlbCcgXTtcblxuY29uc3QgcG9pbnRlckV2ZW50cyA9IHtcbiAgUG9pbnRlckV2ZW50LFxuICBmaXJlLFxuICBjb2xsZWN0RXZlbnRUYXJnZXRzLFxuICBzaWduYWxzLFxuICBkZWZhdWx0czoge1xuICAgIGhvbGREdXJhdGlvbjogNjAwLFxuICAgIGlnbm9yZUZyb20gIDogbnVsbCxcbiAgICBhbGxvd0Zyb20gICA6IG51bGwsXG4gICAgb3JpZ2luICAgICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgfSxcbiAgdHlwZXM6IFtcbiAgICAnZG93bicsXG4gICAgJ21vdmUnLFxuICAgICd1cCcsXG4gICAgJ2NhbmNlbCcsXG4gICAgJ3RhcCcsXG4gICAgJ2RvdWJsZXRhcCcsXG4gICAgJ2hvbGQnLFxuICBdLFxufTtcblxuZnVuY3Rpb24gZmlyZSAoYXJnKSB7XG4gIGNvbnN0IHtcbiAgICBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LFxuICAgIHR5cGUgPSBhcmcucG9pbnRlckV2ZW50LnR5cGUsXG4gICAgdGFyZ2V0cyA9IGNvbGxlY3RFdmVudFRhcmdldHMoYXJnKSxcbiAgICBwb2ludGVyRXZlbnQgPSBuZXcgUG9pbnRlckV2ZW50KHR5cGUsIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgaW50ZXJhY3Rpb24pLFxuICB9ID0gYXJnO1xuXG4gIGNvbnN0IHNpZ25hbEFyZyA9IHtcbiAgICBpbnRlcmFjdGlvbixcbiAgICBwb2ludGVyLFxuICAgIGV2ZW50LFxuICAgIGV2ZW50VGFyZ2V0LFxuICAgIHRhcmdldHMsXG4gICAgdHlwZSxcbiAgICBwb2ludGVyRXZlbnQsXG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0YXJnZXQucHJvcHMgfHwge30pIHtcbiAgICAgIHBvaW50ZXJFdmVudFtwcm9wXSA9IHRhcmdldC5wcm9wc1twcm9wXTtcbiAgICB9XG5cbiAgICBjb25zdCBvcmlnaW4gPSB1dGlscy5nZXRPcmlnaW5YWSh0YXJnZXQuZXZlbnRhYmxlLCB0YXJnZXQuZWxlbWVudCk7XG5cbiAgICBwb2ludGVyRXZlbnQuc3VidHJhY3RPcmlnaW4ob3JpZ2luKTtcbiAgICBwb2ludGVyRXZlbnQuZXZlbnRhYmxlID0gdGFyZ2V0LmV2ZW50YWJsZTtcbiAgICBwb2ludGVyRXZlbnQuY3VycmVudFRhcmdldCA9IHRhcmdldC5lbGVtZW50O1xuXG4gICAgdGFyZ2V0LmV2ZW50YWJsZS5maXJlKHBvaW50ZXJFdmVudCk7XG5cbiAgICBwb2ludGVyRXZlbnQuYWRkT3JpZ2luKG9yaWdpbik7XG5cbiAgICBpZiAocG9pbnRlckV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFxuICAgICAgICB8fCAocG9pbnRlckV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZFxuICAgICAgICAgICAgJiYgKGkgKyAxKSA8IHRhcmdldHMubGVuZ3RoICYmIHRhcmdldHNbaSArIDFdLmVsZW1lbnQgIT09IHBvaW50ZXJFdmVudC5jdXJyZW50VGFyZ2V0KSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2lnbmFscy5maXJlKCdmaXJlZCcsIHNpZ25hbEFyZyk7XG5cbiAgaWYgKHR5cGUgPT09ICd0YXAnKSB7XG4gICAgLy8gaWYgcG9pbnRlckV2ZW50IHNob3VsZCBtYWtlIGEgZG91YmxlIHRhcCwgY3JlYXRlIGFuZCBmaXJlIGEgZG91YmxldGFwXG4gICAgLy8gUG9pbnRlckV2ZW50IGFuZCB1c2UgdGhhdCBhcyB0aGUgcHJldlRhcFxuICAgIGNvbnN0IHByZXZUYXAgPSBwb2ludGVyRXZlbnQuZG91YmxlXG4gICAgICA/IGZpcmUoe1xuICAgICAgICBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LFxuICAgICAgICB0eXBlOiAnZG91YmxldGFwJyxcbiAgICAgIH0pXG4gICAgICA6IHBvaW50ZXJFdmVudDtcblxuICAgIGludGVyYWN0aW9uLnByZXZUYXAgPSBwcmV2VGFwO1xuICAgIGludGVyYWN0aW9uLnRhcFRpbWUgPSBwcmV2VGFwLnRpbWVTdGFtcDtcbiAgfVxuXG4gIHJldHVybiBwb2ludGVyRXZlbnQ7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RFdmVudFRhcmdldHMgKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgdHlwZSB9KSB7XG4gIGNvbnN0IHBvaW50ZXJJbmRleCA9IGludGVyYWN0aW9uLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICAvLyBkbyBub3QgZmlyZSBhIHRhcCBldmVudCBpZiB0aGUgcG9pbnRlciB3YXMgbW92ZWQgYmVmb3JlIGJlaW5nIGxpZnRlZFxuICBpZiAodHlwZSA9PT0gJ3RhcCcgJiYgKGludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZFxuICAgICAgLy8gb3IgaWYgdGhlIHBvaW50ZXJ1cCB0YXJnZXQgaXMgZGlmZmVyZW50IHRvIHRoZSBwb2ludGVyZG93biB0YXJnZXRcbiAgICAgIHx8ICEoaW50ZXJhY3Rpb24uZG93blRhcmdldHNbcG9pbnRlckluZGV4XSAmJiBpbnRlcmFjdGlvbi5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdID09PSBldmVudFRhcmdldCkpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcGF0aCA9IHV0aWxzLmdldFBhdGgoZXZlbnRUYXJnZXQpO1xuICBjb25zdCBzaWduYWxBcmcgPSB7XG4gICAgaW50ZXJhY3Rpb24sXG4gICAgcG9pbnRlcixcbiAgICBldmVudCxcbiAgICBldmVudFRhcmdldCxcbiAgICB0eXBlLFxuICAgIHBhdGgsXG4gICAgdGFyZ2V0czogW10sXG4gICAgZWxlbWVudDogbnVsbCxcbiAgfTtcblxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcGF0aCkge1xuICAgIHNpZ25hbEFyZy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIHNpZ25hbHMuZmlyZSgnY29sbGVjdC10YXJnZXRzJywgc2lnbmFsQXJnKTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnaG9sZCcpIHtcbiAgICBzaWduYWxBcmcudGFyZ2V0cyA9IHNpZ25hbEFyZy50YXJnZXRzLmZpbHRlcih0YXJnZXQgPT5cbiAgICAgIHRhcmdldC5ldmVudGFibGUub3B0aW9ucy5ob2xkRHVyYXRpb24gPT09IGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XS5kdXJhdGlvbik7XG4gIH1cblxuICByZXR1cm4gc2lnbmFsQXJnLnRhcmdldHM7XG59XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3VwZGF0ZS1wb2ludGVyLWRvd24nLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlckluZGV4IH0pIHtcbiAgaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdID0geyBkdXJhdGlvbjogSW5maW5pdHksIHRpbWVvdXQ6IG51bGwgfTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdyZW1vdmUtcG9pbnRlcicsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVySW5kZXggfSkge1xuICBpbnRlcmFjdGlvbi5ob2xkVGltZXJzLnNwbGljZShwb2ludGVySW5kZXgsIDEpO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBkdXBsaWNhdGVNb3ZlIH0pIHtcbiAgY29uc3QgcG9pbnRlckluZGV4ID0gaW50ZXJhY3Rpb24uZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gIGlmICghZHVwbGljYXRlTW92ZSAmJiAoIWludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24gfHwgaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkKSkge1xuICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duKSB7XG4gICAgICBjbGVhclRpbWVvdXQoaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdLnRpbWVvdXQpO1xuICAgIH1cblxuICAgIGZpcmUoe1xuICAgICAgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCxcbiAgICAgIHR5cGU6ICdtb3ZlJyxcbiAgICB9KTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2Rvd24nLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBwb2ludGVySW5kZXggfSkge1xuICBjb25zdCB0aW1lciA9IGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XTtcbiAgY29uc3QgcGF0aCA9IHV0aWxzLmdldFBhdGgoZXZlbnRUYXJnZXQpO1xuICBjb25zdCBzaWduYWxBcmcgPSB7XG4gICAgaW50ZXJhY3Rpb24sXG4gICAgcG9pbnRlcixcbiAgICBldmVudCxcbiAgICBldmVudFRhcmdldCxcbiAgICB0eXBlOiAnaG9sZCcsXG4gICAgdGFyZ2V0czogW10sXG4gICAgcGF0aCxcbiAgICBlbGVtZW50OiBudWxsLFxuICB9O1xuXG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBwYXRoKSB7XG4gICAgc2lnbmFsQXJnLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgc2lnbmFscy5maXJlKCdjb2xsZWN0LXRhcmdldHMnLCBzaWduYWxBcmcpO1xuICB9XG5cbiAgaWYgKCFzaWduYWxBcmcudGFyZ2V0cy5sZW5ndGgpIHsgcmV0dXJuOyB9XG5cbiAgbGV0IG1pbkR1cmF0aW9uID0gSW5maW5pdHk7XG5cbiAgZm9yIChjb25zdCB0YXJnZXQgb2Ygc2lnbmFsQXJnLnRhcmdldHMpIHtcbiAgICBjb25zdCBob2xkRHVyYXRpb24gPSB0YXJnZXQuZXZlbnRhYmxlLm9wdGlvbnMuaG9sZER1cmF0aW9uO1xuXG4gICAgaWYgKGhvbGREdXJhdGlvbiA8IG1pbkR1cmF0aW9uKSB7XG4gICAgICBtaW5EdXJhdGlvbiA9IGhvbGREdXJhdGlvbjtcbiAgICB9XG4gIH1cblxuICB0aW1lci5kdXJhdGlvbiA9IG1pbkR1cmF0aW9uO1xuICB0aW1lci50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgZmlyZSh7XG4gICAgICBpbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50VGFyZ2V0LFxuICAgICAgcG9pbnRlcixcbiAgICAgIGV2ZW50LFxuICAgICAgdHlwZTogJ2hvbGQnLFxuICAgIH0pO1xuICB9LCBtaW5EdXJhdGlvbik7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbigndXAnLCAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0IH0pID0+IHtcbiAgaWYgKCFpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQpIHtcbiAgICBmaXJlKHsgaW50ZXJhY3Rpb24sIGV2ZW50VGFyZ2V0LCBwb2ludGVyLCBldmVudCwgdHlwZTogJ3RhcCcgfSk7XG4gIH1cbn0pO1xuXG5mb3IgKGNvbnN0IHNpZ25hbE5hbWUgb2YgWyd1cCcsICdjYW5jZWwnXSkge1xuICBJbnRlcmFjdGlvbi5zaWduYWxzLm9uKHNpZ25hbE5hbWUsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVySW5kZXggfSkge1xuICAgIGlmIChpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0pIHtcbiAgICAgIGNsZWFyVGltZW91dChpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0udGltZW91dCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2lnbmFsTGlzdGVuZXIgKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQgfSkge1xuICAgIGZpcmUoeyBpbnRlcmFjdGlvbiwgZXZlbnRUYXJnZXQsIHBvaW50ZXIsIGV2ZW50LCB0eXBlIH0pO1xuICB9O1xufVxuXG5mb3IgKGxldCBpID0gMDsgaSA8IHNpbXBsZVNpZ25hbHMubGVuZ3RoOyBpKyspIHtcbiAgSW50ZXJhY3Rpb24uc2lnbmFscy5vbihzaW1wbGVTaWduYWxzW2ldLCBjcmVhdGVTaWduYWxMaXN0ZW5lcihzaW1wbGVFdmVudHNbaV0pKTtcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLnByZXZUYXAgICAgPSBudWxsOyAgLy8gdGhlIG1vc3QgcmVjZW50IHRhcCBldmVudCBvbiB0aGlzIGludGVyYWN0aW9uXG4gIGludGVyYWN0aW9uLnRhcFRpbWUgICAgPSAwOyAgICAgLy8gdGltZSBvZiB0aGUgbW9zdCByZWNlbnQgdGFwIGV2ZW50XG4gIGludGVyYWN0aW9uLmhvbGRUaW1lcnMgPSBbXTsgICAgLy8gW3sgZHVyYXRpb24sIHRpbWVvdXQgfV1cbn0pO1xuXG5kZWZhdWx0cy5wb2ludGVyRXZlbnRzID0gcG9pbnRlckV2ZW50cy5kZWZhdWx0cztcbm1vZHVsZS5leHBvcnRzID0gcG9pbnRlckV2ZW50cztcbiIsImNvbnN0IHBvaW50ZXJVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3BvaW50ZXJVdGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFBvaW50ZXJFdmVudCB7XG4gIC8qKiAqL1xuICBjb25zdHJ1Y3RvciAodHlwZSwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBpbnRlcmFjdGlvbikge1xuICAgIHBvaW50ZXJVdGlscy5wb2ludGVyRXh0ZW5kKHRoaXMsIGV2ZW50KTtcblxuICAgIGlmIChldmVudCAhPT0gcG9pbnRlcikge1xuICAgICAgcG9pbnRlclV0aWxzLnBvaW50ZXJFeHRlbmQodGhpcywgcG9pbnRlcik7XG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuXG4gICAgdGhpcy50aW1lU3RhbXAgICAgID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy50eXBlICAgICAgICAgID0gdHlwZTtcbiAgICB0aGlzLnBvaW50ZXJJZCAgICAgPSBwb2ludGVyVXRpbHMuZ2V0UG9pbnRlcklkKHBvaW50ZXIpO1xuICAgIHRoaXMucG9pbnRlclR5cGUgICA9IHBvaW50ZXJVdGlscy5nZXRQb2ludGVyVHlwZShwb2ludGVyKTtcbiAgICB0aGlzLnRhcmdldCAgICAgICAgPSBldmVudFRhcmdldDtcbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBudWxsO1xuXG4gICAgaWYgKHR5cGUgPT09ICd0YXAnKSB7XG4gICAgICBjb25zdCBwb2ludGVySW5kZXggPSBpbnRlcmFjdGlvbi5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG4gICAgICB0aGlzLmR0ID0gdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi5kb3duVGltZXNbcG9pbnRlckluZGV4XTtcblxuICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnRhcFRpbWU7XG5cbiAgICAgIHRoaXMuZG91YmxlID0gISEoaW50ZXJhY3Rpb24ucHJldlRhcFxuICAgICAgICAmJiBpbnRlcmFjdGlvbi5wcmV2VGFwLnR5cGUgIT09ICdkb3VibGV0YXAnXG4gICAgICAgICYmIGludGVyYWN0aW9uLnByZXZUYXAudGFyZ2V0ID09PSB0aGlzLnRhcmdldFxuICAgICAgICAmJiBpbnRlcnZhbCA8IDUwMCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkb3VibGV0YXAnKSB7XG4gICAgICB0aGlzLmR0ID0gcG9pbnRlci50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi50YXBUaW1lO1xuICAgIH1cbiAgfVxuXG4gIHN1YnRyYWN0T3JpZ2luICh7IHg6IG9yaWdpblgsIHk6IG9yaWdpblkgfSkge1xuICAgIHRoaXMucGFnZVggICAtPSBvcmlnaW5YO1xuICAgIHRoaXMucGFnZVkgICAtPSBvcmlnaW5ZO1xuICAgIHRoaXMuY2xpZW50WCAtPSBvcmlnaW5YO1xuICAgIHRoaXMuY2xpZW50WSAtPSBvcmlnaW5ZO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRPcmlnaW4gKHsgeDogb3JpZ2luWCwgeTogb3JpZ2luWSB9KSB7XG4gICAgdGhpcy5wYWdlWCAgICs9IG9yaWdpblg7XG4gICAgdGhpcy5wYWdlWSAgICs9IG9yaWdpblk7XG4gICAgdGhpcy5jbGllbnRYICs9IG9yaWdpblg7XG4gICAgdGhpcy5jbGllbnRZICs9IG9yaWdpblk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiAqL1xuICBwcmV2ZW50RGVmYXVsdCAoKSB7XG4gICAgdGhpcy5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKiogKi9cbiAgc3RvcFByb3BhZ2F0aW9uICgpIHtcbiAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH1cblxuICAvKiogKi9cbiAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uICgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgfVxufTtcbiIsIi8vIFRoaXMgbW9kdWxlIGFsbG93cyBzbmFwcGluZyBvZiB0aGUgc2l6ZSBvZiB0YXJnZXRzIGR1cmluZyByZXNpemVcbi8vIGludGVyYWN0aW9ucy5cblxuY29uc3QgbW9kaWZpZXJzICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHNuYXAgICAgICAgICAgID0gcmVxdWlyZSgnLi9zbmFwJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5jb25zdCByZXNpemUgICAgICAgICA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvcmVzaXplJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzLycpO1xuXG5jb25zdCBzbmFwU2l6ZSA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlbmRPbmx5OiBmYWxzZSxcbiAgICByYW5nZSAgOiBJbmZpbml0eSxcbiAgICB0YXJnZXRzOiBudWxsLFxuICAgIG9mZnNldHM6IG51bGwsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgY29uc3QgeyBpbnRlcmFjdGlvbiwgb3B0aW9ucyB9ID0gYXJnO1xuICAgIGNvbnN0IGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgICBpZiAoIWVkZ2VzKSB7IHJldHVybjsgfVxuXG4gICAgYXJnLm9wdGlvbnMgPSB7XG4gICAgICByZWxhdGl2ZVBvaW50czogW3tcbiAgICAgICAgeDogZWRnZXMubGVmdD8gMCA6IDEsXG4gICAgICAgIHk6IGVkZ2VzLnRvcCA/IDAgOiAxLFxuICAgICAgfV0sXG4gICAgICBvcmlnaW46IHsgeDogMCwgeTogMCB9LFxuICAgICAgb2Zmc2V0OiAnc2VsZicsXG4gICAgICByYW5nZTogb3B0aW9ucy5yYW5nZSxcbiAgICB9O1xuXG4gICAgY29uc3Qgb2Zmc2V0cyA9IHNuYXAuc2V0T2Zmc2V0KGFyZyk7XG4gICAgYXJnLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgcmV0dXJuIG9mZnNldHM7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgY29uc3QgeyBpbnRlcmFjdGlvbiwgb3B0aW9ucywgb2Zmc2V0LCBtb2RpZmllZENvb3JkcyB9ID0gYXJnO1xuICAgIGNvbnN0IHBhZ2UgPSB1dGlscy5leHRlbmQoe30sIG1vZGlmaWVkQ29vcmRzKTtcbiAgICBjb25zdCByZWxhdGl2ZVggPSBwYWdlLnggLSBvZmZzZXRbMF0ueDtcbiAgICBjb25zdCByZWxhdGl2ZVkgPSBwYWdlLnkgLSBvZmZzZXRbMF0ueTtcblxuICAgIGFyZy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICBhcmcub3B0aW9ucy50YXJnZXRzID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHNuYXBUYXJnZXQgb2YgKG9wdGlvbnMudGFyZ2V0cyB8fCBbXSkpIHtcbiAgICAgIGxldCB0YXJnZXQ7XG5cbiAgICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihzbmFwVGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0KHJlbGF0aXZlWCwgcmVsYXRpdmVZLCBpbnRlcmFjdGlvbik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldDtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0YXJnZXQpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKCd3aWR0aCcgaW4gdGFyZ2V0ICYmICdoZWlnaHQnIGluIHRhcmdldCkge1xuICAgICAgICB0YXJnZXQueCA9IHRhcmdldC53aWR0aDtcbiAgICAgICAgdGFyZ2V0LnkgPSB0YXJnZXQuaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBhcmcub3B0aW9ucy50YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICB9XG5cbiAgICBzbmFwLnNldChhcmcpO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gYXJnO1xuXG4gICAgYXJnLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgIGFyZy5vcHRpb25zLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQ7XG4gICAgYXJnLm9wdGlvbnMucmVsYXRpdmVQb2ludHMgPSBbbnVsbF07XG5cbiAgICBzbmFwLm1vZGlmeUNvb3JkcyhhcmcpO1xuICB9LFxufTtcblxubW9kaWZpZXJzLnNuYXBTaXplID0gc25hcFNpemU7XG5tb2RpZmllcnMubmFtZXMucHVzaCgnc25hcFNpemUnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnNuYXBTaXplID0gc25hcFNpemUuZGVmYXVsdHM7XG5yZXNpemUuZGVmYXVsdHMuc25hcFNpemUgICAgICAgICAgPSBzbmFwU2l6ZS5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBzbmFwU2l6ZTtcbiIsImNvbnN0IG1vZGlmaWVycyAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCBpbnRlcmFjdCAgICAgICA9IHJlcXVpcmUoJy4uL2ludGVyYWN0Jyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbmNvbnN0IHNuYXAgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgcmFuZ2UgIDogSW5maW5pdHksXG4gICAgdGFyZ2V0czogbnVsbCxcbiAgICBvZmZzZXRzOiBudWxsLFxuXG4gICAgcmVsYXRpdmVQb2ludHM6IG51bGwsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCByZWN0LCBzdGFydE9mZnNldCwgb3B0aW9ucyB9KSB7XG4gICAgY29uc3Qgb2Zmc2V0cyA9IFtdO1xuICAgIGNvbnN0IG9wdGlvbnNPcmlnaW4gPSB1dGlscy5yZWN0VG9YWSh1dGlscy5yZXNvbHZlUmVjdExpa2Uob3B0aW9ucy5vcmlnaW4pKTtcbiAgICBjb25zdCBvcmlnaW4gPSBvcHRpb25zT3JpZ2luIHx8IHV0aWxzLmdldE9yaWdpblhZKGludGVyYWN0YWJsZSwgZWxlbWVudCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgaW50ZXJhY3RhYmxlLm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uc25hcCB8fCB7fTtcblxuICAgIGxldCBzbmFwT2Zmc2V0O1xuXG4gICAgaWYgKG9wdGlvbnMub2Zmc2V0ID09PSAnc3RhcnRDb29yZHMnKSB7XG4gICAgICBzbmFwT2Zmc2V0ID0ge1xuICAgICAgICB4OiBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnggLSBvcmlnaW4ueCxcbiAgICAgICAgeTogaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55IC0gb3JpZ2luLnksXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlICB7XG4gICAgICBjb25zdCBvZmZzZXRSZWN0ID0gdXRpbHMucmVzb2x2ZVJlY3RMaWtlKG9wdGlvbnMub2Zmc2V0LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIFtpbnRlcmFjdGlvbl0pO1xuXG4gICAgICBzbmFwT2Zmc2V0ID0gdXRpbHMucmVjdFRvWFkob2Zmc2V0UmVjdCkgfHwgeyB4OiAwLCB5OiAwIH07XG4gICAgfVxuXG4gICAgaWYgKHJlY3QgJiYgb3B0aW9ucy5yZWxhdGl2ZVBvaW50cyAmJiBvcHRpb25zLnJlbGF0aXZlUG9pbnRzLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCB7IHg6IHJlbGF0aXZlWCwgeTogcmVsYXRpdmVZIH0gb2Ygb3B0aW9ucy5yZWxhdGl2ZVBvaW50cykge1xuICAgICAgICBvZmZzZXRzLnB1c2goe1xuICAgICAgICAgIHg6IHN0YXJ0T2Zmc2V0LmxlZnQgLSAocmVjdC53aWR0aCAgKiByZWxhdGl2ZVgpICsgc25hcE9mZnNldC54LFxuICAgICAgICAgIHk6IHN0YXJ0T2Zmc2V0LnRvcCAgLSAocmVjdC5oZWlnaHQgKiByZWxhdGl2ZVkpICsgc25hcE9mZnNldC55LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvZmZzZXRzLnB1c2goc25hcE9mZnNldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldHM7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgbW9kaWZpZWRDb29yZHMsIHN0YXR1cywgb3B0aW9ucywgb2Zmc2V0OiBvZmZzZXRzIH0pIHtcbiAgICBjb25zdCB0YXJnZXRzID0gW107XG4gICAgbGV0IHRhcmdldDtcbiAgICBsZXQgcGFnZTtcbiAgICBsZXQgaTtcblxuICAgIGlmIChzdGF0dXMudXNlU3RhdHVzWFkpIHtcbiAgICAgIHBhZ2UgPSB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IG9yaWdpbiA9IHV0aWxzLmdldE9yaWdpblhZKGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSk7XG5cbiAgICAgIHBhZ2UgPSB1dGlscy5leHRlbmQoe30sIG1vZGlmaWVkQ29vcmRzKTtcblxuICAgICAgcGFnZS54IC09IG9yaWdpbi54O1xuICAgICAgcGFnZS55IC09IG9yaWdpbi55O1xuICAgIH1cblxuICAgIHN0YXR1cy5yZWFsWCA9IHBhZ2UueDtcbiAgICBzdGF0dXMucmVhbFkgPSBwYWdlLnk7XG5cbiAgICBsZXQgbGVuID0gb3B0aW9ucy50YXJnZXRzPyBvcHRpb25zLnRhcmdldHMubGVuZ3RoIDogMDtcblxuICAgIGZvciAoY29uc3QgeyB4OiBvZmZzZXRYLCB5OiBvZmZzZXRZIH0gb2Ygb2Zmc2V0cykge1xuICAgICAgY29uc3QgcmVsYXRpdmVYID0gcGFnZS54IC0gb2Zmc2V0WDtcbiAgICAgIGNvbnN0IHJlbGF0aXZlWSA9IHBhZ2UueSAtIG9mZnNldFk7XG5cbiAgICAgIGZvciAoY29uc3Qgc25hcFRhcmdldCBvZiAob3B0aW9ucy50YXJnZXRzIHx8IFtdKSkge1xuICAgICAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24oc25hcFRhcmdldCkpIHtcbiAgICAgICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0KHJlbGF0aXZlWCwgcmVsYXRpdmVZLCBpbnRlcmFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGFyZ2V0KSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgdGFyZ2V0cy5wdXNoKHtcbiAgICAgICAgICB4OiB1dGlscy5pcy5udW1iZXIodGFyZ2V0LngpID8gKHRhcmdldC54ICsgb2Zmc2V0WCkgOiByZWxhdGl2ZVgsXG4gICAgICAgICAgeTogdXRpbHMuaXMubnVtYmVyKHRhcmdldC55KSA/ICh0YXJnZXQueSArIG9mZnNldFkpIDogcmVsYXRpdmVZLFxuXG4gICAgICAgICAgcmFuZ2U6IHV0aWxzLmlzLm51bWJlcih0YXJnZXQucmFuZ2UpPyB0YXJnZXQucmFuZ2U6IG9wdGlvbnMucmFuZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3Nlc3QgPSB7XG4gICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICBpblJhbmdlOiBmYWxzZSxcbiAgICAgIGRpc3RhbmNlOiAwLFxuICAgICAgcmFuZ2U6IDAsXG4gICAgICBkeDogMCxcbiAgICAgIGR5OiAwLFxuICAgIH07XG5cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSB0YXJnZXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuXG4gICAgICBjb25zdCByYW5nZSA9IHRhcmdldC5yYW5nZTtcbiAgICAgIGNvbnN0IGR4ID0gdGFyZ2V0LnggLSBwYWdlLng7XG4gICAgICBjb25zdCBkeSA9IHRhcmdldC55IC0gcGFnZS55O1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB1dGlscy5oeXBvdChkeCwgZHkpO1xuICAgICAgbGV0IGluUmFuZ2UgPSBkaXN0YW5jZSA8PSByYW5nZTtcblxuICAgICAgLy8gSW5maW5pdGUgdGFyZ2V0cyBjb3VudCBhcyBiZWluZyBvdXQgb2YgcmFuZ2VcbiAgICAgIC8vIGNvbXBhcmVkIHRvIG5vbiBpbmZpbml0ZSBvbmVzIHRoYXQgYXJlIGluIHJhbmdlXG4gICAgICBpZiAocmFuZ2UgPT09IEluZmluaXR5ICYmIGNsb3Nlc3QuaW5SYW5nZSAmJiBjbG9zZXN0LnJhbmdlICE9PSBJbmZpbml0eSkge1xuICAgICAgICBpblJhbmdlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2xvc2VzdC50YXJnZXQgfHwgKGluUmFuZ2VcbiAgICAgICAgICAvLyBpcyB0aGUgY2xvc2VzdCB0YXJnZXQgaW4gcmFuZ2U/XG4gICAgICAgICAgPyAoY2xvc2VzdC5pblJhbmdlICYmIHJhbmdlICE9PSBJbmZpbml0eVxuICAgICAgICAgIC8vIHRoZSBwb2ludGVyIGlzIHJlbGF0aXZlbHkgZGVlcGVyIGluIHRoaXMgdGFyZ2V0XG4gICAgICAgICAgPyBkaXN0YW5jZSAvIHJhbmdlIDwgY2xvc2VzdC5kaXN0YW5jZSAvIGNsb3Nlc3QucmFuZ2VcbiAgICAgICAgICAvLyB0aGlzIHRhcmdldCBoYXMgSW5maW5pdGUgcmFuZ2UgYW5kIHRoZSBjbG9zZXN0IGRvZXNuJ3RcbiAgICAgICAgICA6IChyYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5yYW5nZSAhPT0gSW5maW5pdHkpXG4gICAgICAgICAgLy8gT1IgdGhpcyB0YXJnZXQgaXMgY2xvc2VyIHRoYXQgdGhlIHByZXZpb3VzIGNsb3Nlc3RcbiAgICAgICAgfHwgZGlzdGFuY2UgPCBjbG9zZXN0LmRpc3RhbmNlKVxuICAgICAgICAgIC8vIFRoZSBvdGhlciBpcyBub3QgaW4gcmFuZ2UgYW5kIHRoZSBwb2ludGVyIGlzIGNsb3NlciB0byB0aGlzIHRhcmdldFxuICAgICAgICAgIDogKCFjbG9zZXN0LmluUmFuZ2UgJiYgZGlzdGFuY2UgPCBjbG9zZXN0LmRpc3RhbmNlKSkpIHtcblxuICAgICAgICBjbG9zZXN0LnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgY2xvc2VzdC5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICBjbG9zZXN0LnJhbmdlID0gcmFuZ2U7XG4gICAgICAgIGNsb3Nlc3QuaW5SYW5nZSA9IGluUmFuZ2U7XG4gICAgICAgIGNsb3Nlc3QuZHggPSBkeDtcbiAgICAgICAgY2xvc2VzdC5keSA9IGR5O1xuXG4gICAgICAgIHN0YXR1cy5yYW5nZSA9IHJhbmdlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzbmFwQ2hhbmdlZDtcblxuICAgIGlmIChjbG9zZXN0LnRhcmdldCkge1xuICAgICAgc25hcENoYW5nZWQgPSAoc3RhdHVzLm1vZGlmaWVkWCAhPT0gY2xvc2VzdC50YXJnZXQueCB8fCBzdGF0dXMubW9kaWZpZWRZICE9PSBjbG9zZXN0LnRhcmdldC55KTtcblxuICAgICAgc3RhdHVzLm1vZGlmaWVkWCA9IGNsb3Nlc3QudGFyZ2V0Lng7XG4gICAgICBzdGF0dXMubW9kaWZpZWRZID0gY2xvc2VzdC50YXJnZXQueTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzbmFwQ2hhbmdlZCA9IHRydWU7XG5cbiAgICAgIHN0YXR1cy5tb2RpZmllZFggPSBOYU47XG4gICAgICBzdGF0dXMubW9kaWZpZWRZID0gTmFOO1xuICAgIH1cblxuICAgIHN0YXR1cy5keCA9IGNsb3Nlc3QuZHg7XG4gICAgc3RhdHVzLmR5ID0gY2xvc2VzdC5keTtcblxuICAgIHN0YXR1cy5jaGFuZ2VkID0gKHNuYXBDaGFuZ2VkIHx8IChjbG9zZXN0LmluUmFuZ2UgJiYgIXN0YXR1cy5sb2NrZWQpKTtcbiAgICBzdGF0dXMubG9ja2VkID0gY2xvc2VzdC5pblJhbmdlO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gKHsgcGFnZSwgY2xpZW50LCBzdGF0dXMsIHBoYXNlLCBvcHRpb25zIH0pIHtcbiAgICBjb25zdCByZWxhdGl2ZVBvaW50cyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yZWxhdGl2ZVBvaW50cztcblxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5hYmxlZFxuICAgICAgICAmJiAhKHBoYXNlID09PSAnc3RhcnQnICYmIHJlbGF0aXZlUG9pbnRzICYmIHJlbGF0aXZlUG9pbnRzLmxlbmd0aCkpIHtcblxuICAgICAgaWYgKHN0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgcGFnZS54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgcGFnZS55ICs9IHN0YXR1cy5keTtcbiAgICAgICAgY2xpZW50LnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBjbGllbnQueSArPSBzdGF0dXMuZHk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlICA6IHN0YXR1cy5yYW5nZSxcbiAgICAgICAgbG9ja2VkIDogc3RhdHVzLmxvY2tlZCxcbiAgICAgICAgeCAgICAgIDogc3RhdHVzLm1vZGlmaWVkWCxcbiAgICAgICAgeSAgICAgIDogc3RhdHVzLm1vZGlmaWVkWSxcbiAgICAgICAgcmVhbFggIDogc3RhdHVzLnJlYWxYLFxuICAgICAgICByZWFsWSAgOiBzdGF0dXMucmVhbFksXG4gICAgICAgIGR4ICAgICA6IHN0YXR1cy5keCxcbiAgICAgICAgZHkgICAgIDogc3RhdHVzLmR5LFxuICAgICAgfTtcbiAgICB9XG4gIH0sXG59O1xuXG5pbnRlcmFjdC5jcmVhdGVTbmFwR3JpZCA9IGZ1bmN0aW9uIChncmlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoeCwgeSkge1xuICAgIGNvbnN0IGxpbWl0cyA9IGdyaWQubGltaXRzIHx8IHtcbiAgICAgIGxlZnQgIDogLUluZmluaXR5LFxuICAgICAgcmlnaHQgOiAgSW5maW5pdHksXG4gICAgICB0b3AgICA6IC1JbmZpbml0eSxcbiAgICAgIGJvdHRvbTogIEluZmluaXR5LFxuICAgIH07XG4gICAgbGV0IG9mZnNldFggPSAwO1xuICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgIGlmICh1dGlscy5pcy5vYmplY3QoZ3JpZC5vZmZzZXQpKSB7XG4gICAgICBvZmZzZXRYID0gZ3JpZC5vZmZzZXQueDtcbiAgICAgIG9mZnNldFkgPSBncmlkLm9mZnNldC55O1xuICAgIH1cblxuICAgIGNvbnN0IGdyaWR4ID0gTWF0aC5yb3VuZCgoeCAtIG9mZnNldFgpIC8gZ3JpZC54KTtcbiAgICBjb25zdCBncmlkeSA9IE1hdGgucm91bmQoKHkgLSBvZmZzZXRZKSAvIGdyaWQueSk7XG5cbiAgICBjb25zdCBuZXdYID0gTWF0aC5tYXgobGltaXRzLmxlZnQsIE1hdGgubWluKGxpbWl0cy5yaWdodCAsIGdyaWR4ICogZ3JpZC54ICsgb2Zmc2V0WCkpO1xuICAgIGNvbnN0IG5ld1kgPSBNYXRoLm1heChsaW1pdHMudG9wICwgTWF0aC5taW4obGltaXRzLmJvdHRvbSwgZ3JpZHkgKiBncmlkLnkgKyBvZmZzZXRZKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogbmV3WCxcbiAgICAgIHk6IG5ld1ksXG4gICAgICByYW5nZTogZ3JpZC5yYW5nZSxcbiAgICB9O1xuICB9O1xufTtcblxubW9kaWZpZXJzLnNuYXAgPSBzbmFwO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3NuYXAnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnNuYXAgPSBzbmFwLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNuYXA7XG4iLCIvLyBUaGlzIG1vZHVsZSBhZGRzIHRoZSBvcHRpb25zLnJlc2l6ZS5yZXN0cmljdFNpemUgc2V0dGluZyB3aGljaCBzZXRzIG1pbiBhbmRcbi8vIG1heCB3aWR0aCBhbmQgaGVpZ2h0IGZvciB0aGUgdGFyZ2V0IGJlaW5nIHJlc2l6ZWQuXG4vL1xuLy8gaW50ZXJhY3QodGFyZ2V0KS5yZXNpemUoe1xuLy8gICBlZGdlczogeyB0b3A6IHRydWUsIGxlZnQ6IHRydWUgfSxcbi8vICAgcmVzdHJpY3RTaXplOiB7XG4vLyAgICAgbWluOiB7IHdpZHRoOiAtNjAwLCBoZWlnaHQ6IC02MDAgfSxcbi8vICAgICBtYXg6IHsgd2lkdGg6ICA2MDAsIGhlaWdodDogIDYwMCB9LFxuLy8gICB9LFxuLy8gfSk7XG5cbmNvbnN0IG1vZGlmaWVycyAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCByZXN0cmljdEVkZ2VzICA9IHJlcXVpcmUoJy4vcmVzdHJpY3RFZGdlcycpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgcmVjdFV0aWxzICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9yZWN0Jyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5jb25zdCByZXNpemUgICAgICAgICA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvcmVzaXplJyk7XG5cbmNvbnN0IG5vTWluID0geyB3aWR0aDogLUluZmluaXR5LCBoZWlnaHQ6IC1JbmZpbml0eSB9O1xuY29uc3Qgbm9NYXggPSB7IHdpZHRoOiArSW5maW5pdHksIGhlaWdodDogK0luZmluaXR5IH07XG5cbmNvbnN0IHJlc3RyaWN0U2l6ZSA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlbmRPbmx5OiBmYWxzZSxcbiAgICBtaW46IG51bGwsXG4gICAgbWF4OiBudWxsLFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICAgIHJldHVybiBpbnRlcmFjdGlvbi5zdGFydE9mZnNldDtcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBjb25zdCB7IGludGVyYWN0aW9uLCBvcHRpb25zIH0gPSBhcmc7XG4gICAgY29uc3QgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5saW5rZWRFZGdlcyB8fCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcztcblxuICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSB8fCAhZWRnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZWN0ID0gcmVjdFV0aWxzLnh5d2hUb1RsYnIoaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuaW52ZXJ0ZWQpO1xuXG4gICAgY29uc3QgbWluU2l6ZSA9IHJlY3RVdGlscy50bGJyVG9YeXdoKHJlc3RyaWN0RWRnZXMuZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMubWluLCBpbnRlcmFjdGlvbikpIHx8IG5vTWluO1xuICAgIGNvbnN0IG1heFNpemUgPSByZWN0VXRpbHMudGxiclRvWHl3aChyZXN0cmljdEVkZ2VzLmdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLm1heCwgaW50ZXJhY3Rpb24pKSB8fCBub01heDtcblxuICAgIGFyZy5vcHRpb25zID0ge1xuICAgICAgZW5hYmxlZDogb3B0aW9ucy5lbmFibGVkLFxuICAgICAgZW5kT25seTogb3B0aW9ucy5lbmRPbmx5LFxuICAgICAgaW5uZXI6IHV0aWxzLmV4dGVuZCh7fSwgcmVzdHJpY3RFZGdlcy5ub0lubmVyKSxcbiAgICAgIG91dGVyOiB1dGlscy5leHRlbmQoe30sIHJlc3RyaWN0RWRnZXMubm9PdXRlciksXG4gICAgfTtcblxuICAgIGlmIChlZGdlcy50b3ApIHtcbiAgICAgIGFyZy5vcHRpb25zLmlubmVyLnRvcCA9IHJlY3QuYm90dG9tIC0gbWluU2l6ZS5oZWlnaHQ7XG4gICAgICBhcmcub3B0aW9ucy5vdXRlci50b3AgPSByZWN0LmJvdHRvbSAtIG1heFNpemUuaGVpZ2h0O1xuICAgIH1cbiAgICBlbHNlIGlmIChlZGdlcy5ib3R0b20pIHtcbiAgICAgIGFyZy5vcHRpb25zLmlubmVyLmJvdHRvbSA9IHJlY3QudG9wICsgbWluU2l6ZS5oZWlnaHQ7XG4gICAgICBhcmcub3B0aW9ucy5vdXRlci5ib3R0b20gPSByZWN0LnRvcCArIG1heFNpemUuaGVpZ2h0O1xuICAgIH1cbiAgICBpZiAoZWRnZXMubGVmdCkge1xuICAgICAgYXJnLm9wdGlvbnMuaW5uZXIubGVmdCA9IHJlY3QucmlnaHQgLSBtaW5TaXplLndpZHRoO1xuICAgICAgYXJnLm9wdGlvbnMub3V0ZXIubGVmdCA9IHJlY3QucmlnaHQgLSBtYXhTaXplLndpZHRoO1xuICAgIH1cbiAgICBlbHNlIGlmIChlZGdlcy5yaWdodCkge1xuICAgICAgYXJnLm9wdGlvbnMuaW5uZXIucmlnaHQgPSByZWN0LmxlZnQgKyBtaW5TaXplLndpZHRoO1xuICAgICAgYXJnLm9wdGlvbnMub3V0ZXIucmlnaHQgPSByZWN0LmxlZnQgKyBtYXhTaXplLndpZHRoO1xuICAgIH1cblxuICAgIHJlc3RyaWN0RWRnZXMuc2V0KGFyZyk7XG4gIH0sXG5cbiAgbW9kaWZ5Q29vcmRzOiByZXN0cmljdEVkZ2VzLm1vZGlmeUNvb3Jkcyxcbn07XG5cbm1vZGlmaWVycy5yZXN0cmljdFNpemUgPSByZXN0cmljdFNpemU7XG5tb2RpZmllcnMubmFtZXMucHVzaCgncmVzdHJpY3RTaXplJyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5yZXN0cmljdFNpemUgPSByZXN0cmljdFNpemUuZGVmYXVsdHM7XG5yZXNpemUuZGVmYXVsdHMucmVzdHJpY3RTaXplICAgICAgICAgID0gcmVzdHJpY3RTaXplLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RyaWN0U2l6ZTtcbiIsIi8vIFRoaXMgbW9kdWxlIGFkZHMgdGhlIG9wdGlvbnMucmVzaXplLnJlc3RyaWN0RWRnZXMgc2V0dGluZyB3aGljaCBzZXRzIG1pbiBhbmRcbi8vIG1heCBmb3IgdGhlIHRvcCwgbGVmdCwgYm90dG9tIGFuZCByaWdodCBlZGdlcyBvZiB0aGUgdGFyZ2V0IGJlaW5nIHJlc2l6ZWQuXG4vL1xuLy8gaW50ZXJhY3QodGFyZ2V0KS5yZXNpemUoe1xuLy8gICBlZGdlczogeyB0b3A6IHRydWUsIGxlZnQ6IHRydWUgfSxcbi8vICAgcmVzdHJpY3RFZGdlczoge1xuLy8gICAgIGlubmVyOiB7IHRvcDogMjAwLCBsZWZ0OiAyMDAsIHJpZ2h0OiA0MDAsIGJvdHRvbTogNDAwIH0sXG4vLyAgICAgb3V0ZXI6IHsgdG9wOiAgIDAsIGxlZnQ6ICAgMCwgcmlnaHQ6IDYwMCwgYm90dG9tOiA2MDAgfSxcbi8vICAgfSxcbi8vIH0pO1xuXG5jb25zdCBtb2RpZmllcnMgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgcmVjdFV0aWxzICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9yZWN0Jyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5jb25zdCByZXNpemUgICAgICAgICA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvcmVzaXplJyk7XG5cbmNvbnN0IHsgZ2V0UmVzdHJpY3Rpb25SZWN0IH0gPSByZXF1aXJlKCcuL3Jlc3RyaWN0Jyk7XG5cbmNvbnN0IG5vSW5uZXIgPSB7IHRvcDogK0luZmluaXR5LCBsZWZ0OiArSW5maW5pdHksIGJvdHRvbTogLUluZmluaXR5LCByaWdodDogLUluZmluaXR5IH07XG5jb25zdCBub091dGVyID0geyB0b3A6IC1JbmZpbml0eSwgbGVmdDogLUluZmluaXR5LCBib3R0b206ICtJbmZpbml0eSwgcmlnaHQ6ICtJbmZpbml0eSB9O1xuXG5jb25zdCByZXN0cmljdEVkZ2VzID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVuZE9ubHk6IGZhbHNlLFxuICAgIG1pbjogbnVsbCxcbiAgICBtYXg6IG51bGwsXG4gICAgb2Zmc2V0OiBudWxsLFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHN0YXJ0T2Zmc2V0LCBvcHRpb25zIH0pIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB1dGlscy5leHRlbmQoe30sIHN0YXJ0T2Zmc2V0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZzZXQgPSBnZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5vZmZzZXQsIGludGVyYWN0aW9uLCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlKTtcblxuICAgIGlmIChvZmZzZXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogICAgc3RhcnRPZmZzZXQudG9wICAgICsgb2Zmc2V0LnksXG4gICAgICAgIGxlZnQ6ICAgc3RhcnRPZmZzZXQubGVmdCAgICsgb2Zmc2V0LngsXG4gICAgICAgIGJvdHRvbTogc3RhcnRPZmZzZXQuYm90dG9tICsgb2Zmc2V0LnksXG4gICAgICAgIHJpZ2h0OiAgc3RhcnRPZmZzZXQucmlnaHQgICsgb2Zmc2V0LngsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydE9mZnNldDtcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uICh7IG1vZGlmaWVkQ29vcmRzLCBpbnRlcmFjdGlvbiwgc3RhdHVzLCBvZmZzZXQsIG9wdGlvbnMgfSkge1xuICAgIGNvbnN0IGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubGlua2VkRWRnZXMgfHwgaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgfHwgIWVkZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFnZSA9IHN0YXR1cy51c2VTdGF0dXNYWVxuICAgICAgPyB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9XG4gICAgICA6IHV0aWxzLmV4dGVuZCh7fSwgbW9kaWZpZWRDb29yZHMpO1xuICAgIGNvbnN0IGlubmVyID0gcmVjdFV0aWxzLnh5d2hUb1RsYnIoZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMuaW5uZXIsIGludGVyYWN0aW9uLCBwYWdlKSkgfHwgbm9Jbm5lcjtcbiAgICBjb25zdCBvdXRlciA9IHJlY3RVdGlscy54eXdoVG9UbGJyKGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLm91dGVyLCBpbnRlcmFjdGlvbiwgcGFnZSkpIHx8IG5vT3V0ZXI7XG5cbiAgICBsZXQgbW9kaWZpZWRYID0gcGFnZS54O1xuICAgIGxldCBtb2RpZmllZFkgPSBwYWdlLnk7XG5cbiAgICBzdGF0dXMuZHggPSAwO1xuICAgIHN0YXR1cy5keSA9IDA7XG4gICAgc3RhdHVzLmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgaWYgKGVkZ2VzLnRvcCkge1xuICAgICAgbW9kaWZpZWRZID0gTWF0aC5taW4oTWF0aC5tYXgob3V0ZXIudG9wICAgICsgb2Zmc2V0LnRvcCwgICAgcGFnZS55KSwgaW5uZXIudG9wICAgICsgb2Zmc2V0LnRvcCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVkZ2VzLmJvdHRvbSkge1xuICAgICAgbW9kaWZpZWRZID0gTWF0aC5tYXgoTWF0aC5taW4ob3V0ZXIuYm90dG9tIC0gb2Zmc2V0LmJvdHRvbSwgcGFnZS55KSwgaW5uZXIuYm90dG9tIC0gb2Zmc2V0LmJvdHRvbSk7XG4gICAgfVxuICAgIGlmIChlZGdlcy5sZWZ0KSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1pbihNYXRoLm1heChvdXRlci5sZWZ0ICAgKyBvZmZzZXQubGVmdCwgICBwYWdlLngpLCBpbm5lci5sZWZ0ICAgKyBvZmZzZXQubGVmdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVkZ2VzLnJpZ2h0KSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1heChNYXRoLm1pbihvdXRlci5yaWdodCAgLSBvZmZzZXQucmlnaHQsICBwYWdlLngpLCBpbm5lci5yaWdodCAgLSBvZmZzZXQucmlnaHQpO1xuICAgIH1cblxuICAgIHN0YXR1cy5keCA9IG1vZGlmaWVkWCAtIHBhZ2UueDtcbiAgICBzdGF0dXMuZHkgPSBtb2RpZmllZFkgLSBwYWdlLnk7XG5cbiAgICBzdGF0dXMuY2hhbmdlZCA9IHN0YXR1cy5tb2RpZmllZFggIT09IG1vZGlmaWVkWCB8fCBzdGF0dXMubW9kaWZpZWRZICE9PSBtb2RpZmllZFk7XG4gICAgc3RhdHVzLmxvY2tlZCA9ICEhKHN0YXR1cy5keCB8fCBzdGF0dXMuZHkpO1xuXG4gICAgc3RhdHVzLm1vZGlmaWVkWCA9IG1vZGlmaWVkWDtcbiAgICBzdGF0dXMubW9kaWZpZWRZID0gbW9kaWZpZWRZO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gKHsgcGFnZSwgY2xpZW50LCBzdGF0dXMsIHBoYXNlLCBvcHRpb25zIH0pIHtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWRcbiAgICAgICAgJiYgIShwaGFzZSA9PT0gJ3N0YXJ0JyAmJiBzdGF0dXMubG9ja2VkKSkge1xuXG4gICAgICBpZiAoc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBwYWdlLnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBwYWdlLnkgKz0gc3RhdHVzLmR5O1xuICAgICAgICBjbGllbnQueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIGNsaWVudC55ICs9IHN0YXR1cy5keTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGR4OiBzdGF0dXMuZHgsXG4gICAgICAgICAgZHk6IHN0YXR1cy5keSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbm9Jbm5lcixcbiAgbm9PdXRlcixcbiAgZ2V0UmVzdHJpY3Rpb25SZWN0LFxufTtcblxubW9kaWZpZXJzLnJlc3RyaWN0RWRnZXMgPSByZXN0cmljdEVkZ2VzO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3Jlc3RyaWN0RWRnZXMnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnJlc3RyaWN0RWRnZXMgPSByZXN0cmljdEVkZ2VzLmRlZmF1bHRzO1xucmVzaXplLmRlZmF1bHRzLnJlc3RyaWN0RWRnZXMgICAgICAgICAgPSByZXN0cmljdEVkZ2VzLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RyaWN0RWRnZXM7XG4iLCJjb25zdCBtb2RpZmllcnMgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG5jb25zdCByZXN0cmljdCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkICAgIDogZmFsc2UsXG4gICAgZW5kT25seSAgICA6IGZhbHNlLFxuICAgIHJlc3RyaWN0aW9uOiBudWxsLFxuICAgIGVsZW1lbnRSZWN0OiBudWxsLFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gKHsgcmVjdCwgc3RhcnRPZmZzZXQsIG9wdGlvbnMgfSkge1xuICAgIGNvbnN0IGVsZW1lbnRSZWN0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmVsZW1lbnRSZWN0O1xuICAgIGNvbnN0IG9mZnNldCA9IHt9O1xuXG4gICAgaWYgKHJlY3QgJiYgZWxlbWVudFJlY3QpIHtcbiAgICAgIG9mZnNldC5sZWZ0ID0gc3RhcnRPZmZzZXQubGVmdCAtIChyZWN0LndpZHRoICAqIGVsZW1lbnRSZWN0LmxlZnQpO1xuICAgICAgb2Zmc2V0LnRvcCAgPSBzdGFydE9mZnNldC50b3AgIC0gKHJlY3QuaGVpZ2h0ICogZWxlbWVudFJlY3QudG9wKTtcblxuICAgICAgb2Zmc2V0LnJpZ2h0ICA9IHN0YXJ0T2Zmc2V0LnJpZ2h0ICAtIChyZWN0LndpZHRoICAqICgxIC0gZWxlbWVudFJlY3QucmlnaHQpKTtcbiAgICAgIG9mZnNldC5ib3R0b20gPSBzdGFydE9mZnNldC5ib3R0b20gLSAocmVjdC5oZWlnaHQgKiAoMSAtIGVsZW1lbnRSZWN0LmJvdHRvbSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9mZnNldC5sZWZ0ID0gb2Zmc2V0LnRvcCA9IG9mZnNldC5yaWdodCA9IG9mZnNldC5ib3R0b20gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiAoeyBtb2RpZmllZENvb3JkcywgaW50ZXJhY3Rpb24sIHN0YXR1cywgb3B0aW9ucyB9KSB7XG4gICAgaWYgKCFvcHRpb25zKSB7IHJldHVybiBzdGF0dXM7IH1cblxuICAgIGNvbnN0IHBhZ2UgPSBzdGF0dXMudXNlU3RhdHVzWFlcbiAgICAgID8geyB4OiBzdGF0dXMueCwgeTogc3RhdHVzLnkgfVxuICAgICAgOiB1dGlscy5leHRlbmQoe30sIG1vZGlmaWVkQ29vcmRzKTtcblxuICAgIGNvbnN0IHJlc3RyaWN0aW9uID0gZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMucmVzdHJpY3Rpb24sIGludGVyYWN0aW9uLCBwYWdlKTtcblxuICAgIGlmICghcmVzdHJpY3Rpb24pIHsgcmV0dXJuIHN0YXR1czsgfVxuXG4gICAgc3RhdHVzLmR4ID0gMDtcbiAgICBzdGF0dXMuZHkgPSAwO1xuICAgIHN0YXR1cy5sb2NrZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJlY3QgPSByZXN0cmljdGlvbjtcbiAgICBsZXQgbW9kaWZpZWRYID0gcGFnZS54O1xuICAgIGxldCBtb2RpZmllZFkgPSBwYWdlLnk7XG5cbiAgICBjb25zdCBvZmZzZXQgPSBpbnRlcmFjdGlvbi5tb2RpZmllck9mZnNldHMucmVzdHJpY3Q7XG5cbiAgICAvLyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlXG4gICAgLy8geCwgeSwgd2lkdGgsIGhlaWdodCBvclxuICAgIC8vIGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbVxuICAgIGlmICgneCcgaW4gcmVzdHJpY3Rpb24gJiYgJ3knIGluIHJlc3RyaWN0aW9uKSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnggKyByZWN0LndpZHRoICAtIG9mZnNldC5yaWdodCAsIHBhZ2UueCksIHJlY3QueCArIG9mZnNldC5sZWZ0KTtcbiAgICAgIG1vZGlmaWVkWSA9IE1hdGgubWF4KE1hdGgubWluKHJlY3QueSArIHJlY3QuaGVpZ2h0IC0gb2Zmc2V0LmJvdHRvbSwgcGFnZS55KSwgcmVjdC55ICsgb2Zmc2V0LnRvcCApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1vZGlmaWVkWCA9IE1hdGgubWF4KE1hdGgubWluKHJlY3QucmlnaHQgIC0gb2Zmc2V0LnJpZ2h0ICwgcGFnZS54KSwgcmVjdC5sZWZ0ICsgb2Zmc2V0LmxlZnQpO1xuICAgICAgbW9kaWZpZWRZID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC5ib3R0b20gLSBvZmZzZXQuYm90dG9tLCBwYWdlLnkpLCByZWN0LnRvcCAgKyBvZmZzZXQudG9wICk7XG4gICAgfVxuXG4gICAgc3RhdHVzLmR4ID0gbW9kaWZpZWRYIC0gcGFnZS54O1xuICAgIHN0YXR1cy5keSA9IG1vZGlmaWVkWSAtIHBhZ2UueTtcblxuICAgIHN0YXR1cy5jaGFuZ2VkID0gc3RhdHVzLm1vZGlmaWVkWCAhPT0gbW9kaWZpZWRYIHx8IHN0YXR1cy5tb2RpZmllZFkgIT09IG1vZGlmaWVkWTtcbiAgICBzdGF0dXMubG9ja2VkID0gISEoc3RhdHVzLmR4IHx8IHN0YXR1cy5keSk7XG5cbiAgICBzdGF0dXMubW9kaWZpZWRYID0gbW9kaWZpZWRYO1xuICAgIHN0YXR1cy5tb2RpZmllZFkgPSBtb2RpZmllZFk7XG4gIH0sXG5cbiAgbW9kaWZ5Q29vcmRzOiBmdW5jdGlvbiAoeyBwYWdlLCBjbGllbnQsIHN0YXR1cywgcGhhc2UsIG9wdGlvbnMgfSkge1xuICAgIGNvbnN0IGVsZW1lbnRSZWN0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmVsZW1lbnRSZWN0O1xuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVkXG4gICAgICAgICYmICEocGhhc2UgPT09ICdzdGFydCcgJiYgZWxlbWVudFJlY3QgJiYgc3RhdHVzLmxvY2tlZCkpIHtcblxuICAgICAgaWYgKHN0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgcGFnZS54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgcGFnZS55ICs9IHN0YXR1cy5keTtcbiAgICAgICAgY2xpZW50LnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBjbGllbnQueSArPSBzdGF0dXMuZHk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkeDogc3RhdHVzLmR4LFxuICAgICAgICAgIGR5OiBzdGF0dXMuZHksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGdldFJlc3RyaWN0aW9uUmVjdCxcbn07XG5cbmZ1bmN0aW9uIGdldFJlc3RyaWN0aW9uUmVjdCAodmFsdWUsIGludGVyYWN0aW9uLCBwYWdlKSB7XG4gIGlmICh1dGlscy5pcy5mdW5jdGlvbih2YWx1ZSkpIHtcbiAgICByZXR1cm4gdXRpbHMucmVzb2x2ZVJlY3RMaWtlKHZhbHVlLCBpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQsIFtwYWdlLngsIHBhZ2UueSwgaW50ZXJhY3Rpb25dKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdXRpbHMucmVzb2x2ZVJlY3RMaWtlKHZhbHVlLCBpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICB9XG59XG5cbm1vZGlmaWVycy5yZXN0cmljdCA9IHJlc3RyaWN0O1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3Jlc3RyaWN0Jyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5yZXN0cmljdCA9IHJlc3RyaWN0LmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RyaWN0O1xuIiwiY29uc3QgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IEludGVyYWN0aW9uICA9IHJlcXVpcmUoJy4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IHNjb3BlICAgICAgICA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbmNvbnN0IGlzICAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvaXMnKTtcbmNvbnN0IGV2ZW50cyAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG5jb25zdCBicm93c2VyICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXInKTtcblxuY29uc3QgeyBub2RlQ29udGFpbnMsIG1hdGNoZXNTZWxlY3RvciB9ID0gcmVxdWlyZSgnLi91dGlscy9kb21VdGlscycpO1xuXG4vKipcbiAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIHRvIHByZXZlbnQgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW91ciBpblxuICogcmVzcG9uc2UgdG8gcG9pbnRlciBldmVudHMuIENhbiBiZSBzZXQgdG86XG4gKiAgLSBgJ2Fsd2F5cydgIHRvIGFsd2F5cyBwcmV2ZW50XG4gKiAgLSBgJ25ldmVyJ2AgdG8gbmV2ZXIgcHJldmVudFxuICogIC0gYCdhdXRvJ2AgdG8gbGV0IGludGVyYWN0LmpzIHRyeSB0byBkZXRlcm1pbmUgd2hhdCB3b3VsZCBiZSBiZXN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtuZXdWYWx1ZV0gYHRydWVgLCBgZmFsc2VgIG9yIGAnYXV0bydgXG4gKiBAcmV0dXJuIHtzdHJpbmcgfCBJbnRlcmFjdGFibGV9IFRoZSBjdXJyZW50IHNldHRpbmcgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAoL14oYWx3YXlzfG5ldmVyfGF1dG8pJC8udGVzdChuZXdWYWx1ZSkpIHtcbiAgICB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQgPSBuZXdWYWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChpcy5ib29sKG5ld1ZhbHVlKSkge1xuICAgIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdCA9IG5ld1ZhbHVlPyAnYWx3YXlzJyA6ICduZXZlcic7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0O1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5jaGVja0FuZFByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGNvbnN0IHNldHRpbmcgPSB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQ7XG5cbiAgaWYgKHNldHRpbmcgPT09ICduZXZlcicpIHsgcmV0dXJuOyB9XG5cbiAgaWYgKHNldHRpbmcgPT09ICdhbHdheXMnKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXR0aW5nID09PSAnYXV0bydcblxuICAvLyBkb24ndCBwcmV2ZW50RGVmYXVsdCBvZiB0b3VjaHtzdGFydCxtb3ZlfSBldmVudHMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZVxuICAvLyBldmVudHMgbGlzdGVuZXJzLiBDU1MgdG91Y2gtYWN0aW9uIGFuZCB1c2VyLXNlbGVjY3Qgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZFxuICBpZiAoZXZlbnRzLnN1cHBvcnRzUGFzc2l2ZVxuICAgICYmIC9edG91Y2goc3RhcnR8bW92ZSkkLy50ZXN0KGV2ZW50LnR5cGUpXG4gICAgJiYgIWJyb3dzZXIuaXNJT1MpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBkb24ndCBwcmV2ZW50RGVmYXVsdCBvZiBwb2ludGVyZG93biBldmVudHNcbiAgaWYgKC9eKG1vdXNlfHBvaW50ZXJ8dG91Y2gpKihkb3dufHN0YXJ0KS9pLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBkb24ndCBwcmV2ZW50RGVmYXVsdCBvbiBlZGl0YWJsZSBlbGVtZW50c1xuICBpZiAoaXMuZWxlbWVudChldmVudC50YXJnZXQpXG4gICAgICAmJiBtYXRjaGVzU2VsZWN0b3IoZXZlbnQudGFyZ2V0LCAnaW5wdXQsc2VsZWN0LHRleHRhcmVhLFtjb250ZW50ZWRpdGFibGU9dHJ1ZV0sW2NvbnRlbnRlZGl0YWJsZT10cnVlXSAqJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuZnVuY3Rpb24gb25JbnRlcmFjdGlvbkV2ZW50ICh7IGludGVyYWN0aW9uLCBldmVudCB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi50YXJnZXQpIHtcbiAgICBpbnRlcmFjdGlvbi50YXJnZXQuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XG4gIH1cbn1cblxuZm9yIChjb25zdCBldmVudFNpZ25hbCBvZiBbJ2Rvd24nLCAnbW92ZScsICd1cCcsICdjYW5jZWwnXSkge1xuICBJbnRlcmFjdGlvbi5zaWduYWxzLm9uKGV2ZW50U2lnbmFsLCBvbkludGVyYWN0aW9uRXZlbnQpO1xufVxuXG4vLyBwcmV2ZW50IG5hdGl2ZSBIVE1MNSBkcmFnIG9uIGludGVyYWN0LmpzIHRhcmdldCBlbGVtZW50c1xuSW50ZXJhY3Rpb24uZG9jRXZlbnRzLmRyYWdzdGFydCA9IGZ1bmN0aW9uIHByZXZlbnROYXRpdmVEcmFnIChldmVudCkge1xuICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuXG4gICAgaWYgKGludGVyYWN0aW9uLmVsZW1lbnRcbiAgICAgICAgJiYgKGludGVyYWN0aW9uLmVsZW1lbnQgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgfHwgbm9kZUNvbnRhaW5zKGludGVyYWN0aW9uLmVsZW1lbnQsIGV2ZW50LnRhcmdldCkpKSB7XG5cbiAgICAgIGludGVyYWN0aW9uLnRhcmdldC5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBJbnRlcmFjdEV2ZW50ICA9IHJlcXVpcmUoJy4vSW50ZXJhY3RFdmVudCcpO1xuY29uc3QgSW50ZXJhY3Rpb24gICAgPSByZXF1aXJlKCcuL0ludGVyYWN0aW9uJyk7XG5jb25zdCBtb2RpZmllcnMgICAgICA9IHJlcXVpcmUoJy4vbW9kaWZpZXJzL2Jhc2UnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlscycpO1xuY29uc3QgYW5pbWF0aW9uRnJhbWUgPSByZXF1aXJlKCcuL3V0aWxzL3JhZicpO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cyA9IHtcbiAgICBhY3RpdmUgICAgIDogZmFsc2UsXG4gICAgc21vb3RoRW5kICA6IGZhbHNlLFxuICAgIGFsbG93UmVzdW1lOiBmYWxzZSxcblxuICAgIHN0YXJ0RXZlbnQ6IG51bGwsXG4gICAgdXBDb29yZHMgIDoge30sXG5cbiAgICB4ZTogMCwgeWU6IDAsXG4gICAgc3g6IDAsIHN5OiAwLFxuXG4gICAgdDA6IDAsXG4gICAgdngwOiAwLCB2eXM6IDAsXG4gICAgZHVyYXRpb246IDAsXG5cbiAgICBsYW1iZGFfdjA6IDAsXG4gICAgb25lX3ZlX3YwOiAwLFxuICAgIGkgIDogbnVsbCxcbiAgfTtcblxuICBpbnRlcmFjdGlvbi5ib3VuZEluZXJ0aWFGcmFtZSAgID0gKCkgPT4gaW5lcnRpYUZyYW1lICAuYXBwbHkoaW50ZXJhY3Rpb24pO1xuICBpbnRlcmFjdGlvbi5ib3VuZFNtb290aEVuZEZyYW1lID0gKCkgPT4gc21vb3RoRW5kRnJhbWUuYXBwbHkoaW50ZXJhY3Rpb24pO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2Rvd24nLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnQsIHBvaW50ZXIsIGV2ZW50VGFyZ2V0IH0pIHtcbiAgY29uc3Qgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICAvLyBDaGVjayBpZiB0aGUgZG93biBldmVudCBoaXRzIHRoZSBjdXJyZW50IGluZXJ0aWEgdGFyZ2V0XG4gIGlmIChzdGF0dXMuYWN0aXZlKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgIC8vIGNsaW1iIHVwIHRoZSBET00gdHJlZSBmcm9tIHRoZSBldmVudCB0YXJnZXRcbiAgICB3aGlsZSAodXRpbHMuaXMuZWxlbWVudChlbGVtZW50KSkge1xuXG4gICAgICAvLyBpZiBpbnRlcmFjdGlvbiBlbGVtZW50IGlzIHRoZSBjdXJyZW50IGluZXJ0aWEgdGFyZ2V0IGVsZW1lbnRcbiAgICAgIGlmIChlbGVtZW50ID09PSBpbnRlcmFjdGlvbi5lbGVtZW50KSB7XG4gICAgICAgIC8vIHN0b3AgaW5lcnRpYVxuICAgICAgICBhbmltYXRpb25GcmFtZS5jYW5jZWwoc3RhdHVzLmkpO1xuICAgICAgICBzdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGludGVyYWN0aW9uLnNpbXVsYXRpb24gPSBudWxsO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwb2ludGVycyB0byB0aGUgZG93biBldmVudCdzIGNvb3JkaW5hdGVzXG4gICAgICAgIGludGVyYWN0aW9uLnVwZGF0ZVBvaW50ZXIocG9pbnRlcik7XG4gICAgICAgIHV0aWxzLnNldENvb3JkcyhpbnRlcmFjdGlvbi5jdXJDb29yZHMsIGludGVyYWN0aW9uLnBvaW50ZXJzKTtcblxuICAgICAgICAvLyBmaXJlIGFwcHJvcHJpYXRlIHNpZ25hbHNcbiAgICAgICAgY29uc3Qgc2lnbmFsQXJnID0geyBpbnRlcmFjdGlvbiB9O1xuICAgICAgICBJbnRlcmFjdGlvbi5zaWduYWxzLmZpcmUoJ2JlZm9yZS1hY3Rpb24tbW92ZScsIHNpZ25hbEFyZyk7XG4gICAgICAgIEludGVyYWN0aW9uLnNpZ25hbHMuZmlyZSgnYWN0aW9uLXJlc3VtZScgICAgICwgc2lnbmFsQXJnKTtcblxuICAgICAgICAvLyBmaXJlIGEgcmV1bWUgZXZlbnRcbiAgICAgICAgY29uc3QgcmVzdW1lRXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudChpbnRlcmFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpbmVydGlhcmVzdW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5lbGVtZW50KTtcblxuICAgICAgICBpbnRlcmFjdGlvbi50YXJnZXQuZmlyZShyZXN1bWVFdmVudCk7XG4gICAgICAgIGludGVyYWN0aW9uLnByZXZFdmVudCA9IHJlc3VtZUV2ZW50O1xuICAgICAgICBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyhpbnRlcmFjdGlvbi5tb2RpZmllclN0YXR1c2VzKTtcblxuICAgICAgICB1dGlscy5jb3B5Q29vcmRzKGludGVyYWN0aW9uLnByZXZDb29yZHMsIGludGVyYWN0aW9uLmN1ckNvb3Jkcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gdXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCd1cCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudCB9KSB7XG4gIGNvbnN0IHN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpIHx8IHN0YXR1cy5hY3RpdmUpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuICBjb25zdCBvcHRpb25zID0gdGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zO1xuICBjb25zdCBpbmVydGlhT3B0aW9ucyA9IG9wdGlvbnMgJiYgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAmJiBvcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLmluZXJ0aWE7XG5cbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGNvbnN0IHN0YXR1c2VzID0ge307XG4gIGNvbnN0IHBhZ2UgPSB1dGlscy5leHRlbmQoe30sIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlKTtcbiAgY29uc3QgcG9pbnRlclNwZWVkID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC5zcGVlZDtcblxuICBsZXQgc21vb3RoRW5kID0gZmFsc2U7XG4gIGxldCBtb2RpZmllclJlc3VsdDtcblxuICAvLyBjaGVjayBpZiBpbmVydGlhIHNob3VsZCBiZSBzdGFydGVkXG4gIGNvbnN0IGluZXJ0aWFQb3NzaWJsZSA9IChpbmVydGlhT3B0aW9ucyAmJiBpbmVydGlhT3B0aW9ucy5lbmFibGVkXG4gICAgICAgICAgICAgICAgICAgICAmJiBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICE9PSAnZ2VzdHVyZSdcbiAgICAgICAgICAgICAgICAgICAgICYmIGV2ZW50ICE9PSBzdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgY29uc3QgaW5lcnRpYSA9IChpbmVydGlhUG9zc2libGVcbiAgICAmJiAobm93IC0gaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnRpbWVTdGFtcCkgPCA1MFxuICAgICYmIHBvaW50ZXJTcGVlZCA+IGluZXJ0aWFPcHRpb25zLm1pblNwZWVkXG4gICAgJiYgcG9pbnRlclNwZWVkID4gaW5lcnRpYU9wdGlvbnMuZW5kU3BlZWQpO1xuXG4gIGNvbnN0IG1vZGlmaWVyQXJnID0ge1xuICAgIGludGVyYWN0aW9uLFxuICAgIHBhZ2VDb29yZHM6IHBhZ2UsXG4gICAgc3RhdHVzZXMsXG4gICAgcHJlRW5kOiB0cnVlLFxuICAgIHJlcXVpcmVFbmRPbmx5OiB0cnVlLFxuICB9O1xuXG4gIC8vIHNtb290aEVuZFxuICBpZiAoaW5lcnRpYVBvc3NpYmxlICYmICFpbmVydGlhKSB7XG4gICAgbW9kaWZpZXJzLnJlc2V0U3RhdHVzZXMoc3RhdHVzZXMpO1xuXG4gICAgbW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllcnMuc2V0QWxsKG1vZGlmaWVyQXJnKTtcblxuICAgIGlmIChtb2RpZmllclJlc3VsdC5zaG91bGRNb3ZlICYmIG1vZGlmaWVyUmVzdWx0LmxvY2tlZCkge1xuICAgICAgc21vb3RoRW5kID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIShpbmVydGlhIHx8IHNtb290aEVuZCkpIHsgcmV0dXJuOyB9XG5cbiAgdXRpbHMuY29weUNvb3JkcyhzdGF0dXMudXBDb29yZHMsIGludGVyYWN0aW9uLmN1ckNvb3Jkcyk7XG5cbiAgaW50ZXJhY3Rpb24ucG9pbnRlcnNbMF0gPSBzdGF0dXMuc3RhcnRFdmVudCA9XG4gICAgbmV3IEludGVyYWN0RXZlbnQoaW50ZXJhY3Rpb24sIGV2ZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lLCAnaW5lcnRpYXN0YXJ0JywgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG5cbiAgc3RhdHVzLnQwID0gbm93O1xuXG4gIHN0YXR1cy5hY3RpdmUgPSB0cnVlO1xuICBzdGF0dXMuYWxsb3dSZXN1bWUgPSBpbmVydGlhT3B0aW9ucy5hbGxvd1Jlc3VtZTtcbiAgaW50ZXJhY3Rpb24uc2ltdWxhdGlvbiA9IHN0YXR1cztcblxuICB0YXJnZXQuZmlyZShzdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgaWYgKGluZXJ0aWEpIHtcbiAgICBzdGF0dXMudngwID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eDtcbiAgICBzdGF0dXMudnkwID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eTtcbiAgICBzdGF0dXMudjAgPSBwb2ludGVyU3BlZWQ7XG5cbiAgICBjYWxjSW5lcnRpYShpbnRlcmFjdGlvbiwgc3RhdHVzKTtcblxuICAgIHV0aWxzLmV4dGVuZChwYWdlLCBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZSk7XG5cbiAgICBwYWdlLnggKz0gc3RhdHVzLnhlO1xuICAgIHBhZ2UueSArPSBzdGF0dXMueWU7XG5cbiAgICBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyhzdGF0dXNlcyk7XG5cbiAgICBtb2RpZmllclJlc3VsdCA9IG1vZGlmaWVycy5zZXRBbGwobW9kaWZpZXJBcmcpO1xuXG4gICAgc3RhdHVzLm1vZGlmaWVkWGUgKz0gbW9kaWZpZXJSZXN1bHQuZHg7XG4gICAgc3RhdHVzLm1vZGlmaWVkWWUgKz0gbW9kaWZpZXJSZXN1bHQuZHk7XG5cbiAgICBzdGF0dXMuaSA9IGFuaW1hdGlvbkZyYW1lLnJlcXVlc3QoaW50ZXJhY3Rpb24uYm91bmRJbmVydGlhRnJhbWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIHN0YXR1cy5zbW9vdGhFbmQgPSB0cnVlO1xuICAgIHN0YXR1cy54ZSA9IG1vZGlmaWVyUmVzdWx0LmR4O1xuICAgIHN0YXR1cy55ZSA9IG1vZGlmaWVyUmVzdWx0LmR5O1xuXG4gICAgc3RhdHVzLnN4ID0gc3RhdHVzLnN5ID0gMDtcblxuICAgIHN0YXR1cy5pID0gYW5pbWF0aW9uRnJhbWUucmVxdWVzdChpbnRlcmFjdGlvbi5ib3VuZFNtb290aEVuZEZyYW1lKTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AtYWN0aXZlJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBjb25zdCBzdGF0dXMgPSBpbnRlcmFjdGlvbi5pbmVydGlhU3RhdHVzO1xuXG4gIGlmIChzdGF0dXMuYWN0aXZlKSB7XG4gICAgYW5pbWF0aW9uRnJhbWUuY2FuY2VsKHN0YXR1cy5pKTtcbiAgICBzdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgaW50ZXJhY3Rpb24uc2ltdWxhdGlvbiA9IG51bGw7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBjYWxjSW5lcnRpYSAoaW50ZXJhY3Rpb24sIHN0YXR1cykge1xuICBjb25zdCBpbmVydGlhT3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLmluZXJ0aWE7XG4gIGNvbnN0IGxhbWJkYSA9IGluZXJ0aWFPcHRpb25zLnJlc2lzdGFuY2U7XG4gIGNvbnN0IGluZXJ0aWFEdXIgPSAtTWF0aC5sb2coaW5lcnRpYU9wdGlvbnMuZW5kU3BlZWQgLyBzdGF0dXMudjApIC8gbGFtYmRhO1xuXG4gIHN0YXR1cy54MCA9IGludGVyYWN0aW9uLnByZXZFdmVudC5wYWdlWDtcbiAgc3RhdHVzLnkwID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnBhZ2VZO1xuICBzdGF0dXMudDAgPSBzdGF0dXMuc3RhcnRFdmVudC50aW1lU3RhbXAgLyAxMDAwO1xuICBzdGF0dXMuc3ggPSBzdGF0dXMuc3kgPSAwO1xuXG4gIHN0YXR1cy5tb2RpZmllZFhlID0gc3RhdHVzLnhlID0gKHN0YXR1cy52eDAgLSBpbmVydGlhRHVyKSAvIGxhbWJkYTtcbiAgc3RhdHVzLm1vZGlmaWVkWWUgPSBzdGF0dXMueWUgPSAoc3RhdHVzLnZ5MCAtIGluZXJ0aWFEdXIpIC8gbGFtYmRhO1xuICBzdGF0dXMudGUgPSBpbmVydGlhRHVyO1xuXG4gIHN0YXR1cy5sYW1iZGFfdjAgPSBsYW1iZGEgLyBzdGF0dXMudjA7XG4gIHN0YXR1cy5vbmVfdmVfdjAgPSAxIC0gaW5lcnRpYU9wdGlvbnMuZW5kU3BlZWQgLyBzdGF0dXMudjA7XG59XG5cbmZ1bmN0aW9uIGluZXJ0aWFGcmFtZSAoKSB7XG4gIHVwZGF0ZUluZXJ0aWFDb29yZHModGhpcyk7XG4gIHV0aWxzLnNldENvb3JkRGVsdGFzKHRoaXMucG9pbnRlckRlbHRhLCB0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcblxuICBjb25zdCBzdGF0dXMgPSB0aGlzLmluZXJ0aWFTdGF0dXM7XG4gIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uaW5lcnRpYTtcbiAgY29uc3QgbGFtYmRhID0gb3B0aW9ucy5yZXNpc3RhbmNlO1xuICBjb25zdCB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwIC0gc3RhdHVzLnQwO1xuXG4gIGlmICh0IDwgc3RhdHVzLnRlKSB7XG5cbiAgICBjb25zdCBwcm9ncmVzcyA9ICAxIC0gKE1hdGguZXhwKC1sYW1iZGEgKiB0KSAtIHN0YXR1cy5sYW1iZGFfdjApIC8gc3RhdHVzLm9uZV92ZV92MDtcblxuICAgIGlmIChzdGF0dXMubW9kaWZpZWRYZSA9PT0gc3RhdHVzLnhlICYmIHN0YXR1cy5tb2RpZmllZFllID09PSBzdGF0dXMueWUpIHtcbiAgICAgIHN0YXR1cy5zeCA9IHN0YXR1cy54ZSAqIHByb2dyZXNzO1xuICAgICAgc3RhdHVzLnN5ID0gc3RhdHVzLnllICogcHJvZ3Jlc3M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcXVhZFBvaW50ID0gdXRpbHMuZ2V0UXVhZHJhdGljQ3VydmVQb2ludCgwLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMueGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy55ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLm1vZGlmaWVkWGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5tb2RpZmllZFllLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyk7XG5cbiAgICAgIHN0YXR1cy5zeCA9IHF1YWRQb2ludC54O1xuICAgICAgc3RhdHVzLnN5ID0gcXVhZFBvaW50Lnk7XG4gICAgfVxuXG4gICAgdGhpcy5kb01vdmUoKTtcblxuICAgIHN0YXR1cy5pID0gYW5pbWF0aW9uRnJhbWUucmVxdWVzdCh0aGlzLmJvdW5kSW5lcnRpYUZyYW1lKTtcbiAgfVxuICBlbHNlIHtcbiAgICBzdGF0dXMuc3ggPSBzdGF0dXMubW9kaWZpZWRYZTtcbiAgICBzdGF0dXMuc3kgPSBzdGF0dXMubW9kaWZpZWRZZTtcblxuICAgIHRoaXMuZG9Nb3ZlKCk7XG4gICAgdGhpcy5lbmQoc3RhdHVzLnN0YXJ0RXZlbnQpO1xuICAgIHN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNpbXVsYXRpb24gPSBudWxsO1xuICB9XG5cbiAgdXRpbHMuY29weUNvb3Jkcyh0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcbn1cblxuZnVuY3Rpb24gc21vb3RoRW5kRnJhbWUgKCkge1xuICB1cGRhdGVJbmVydGlhQ29vcmRzKHRoaXMpO1xuXG4gIGNvbnN0IHN0YXR1cyA9IHRoaXMuaW5lcnRpYVN0YXR1cztcbiAgY29uc3QgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhdHVzLnQwO1xuICBjb25zdCBkdXJhdGlvbiA9IHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5pbmVydGlhLnNtb290aEVuZER1cmF0aW9uO1xuXG4gIGlmICh0IDwgZHVyYXRpb24pIHtcbiAgICBzdGF0dXMuc3ggPSB1dGlscy5lYXNlT3V0UXVhZCh0LCAwLCBzdGF0dXMueGUsIGR1cmF0aW9uKTtcbiAgICBzdGF0dXMuc3kgPSB1dGlscy5lYXNlT3V0UXVhZCh0LCAwLCBzdGF0dXMueWUsIGR1cmF0aW9uKTtcblxuICAgIHRoaXMucG9pbnRlck1vdmUoc3RhdHVzLnN0YXJ0RXZlbnQsIHN0YXR1cy5zdGFydEV2ZW50KTtcblxuICAgIHN0YXR1cy5pID0gYW5pbWF0aW9uRnJhbWUucmVxdWVzdCh0aGlzLmJvdW5kU21vb3RoRW5kRnJhbWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIHN0YXR1cy5zeCA9IHN0YXR1cy54ZTtcbiAgICBzdGF0dXMuc3kgPSBzdGF0dXMueWU7XG5cbiAgICB0aGlzLnBvaW50ZXJNb3ZlKHN0YXR1cy5zdGFydEV2ZW50LCBzdGF0dXMuc3RhcnRFdmVudCk7XG4gICAgdGhpcy5lbmQoc3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgc3RhdHVzLnNtb290aEVuZCA9XG4gICAgICBzdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5zaW11bGF0aW9uID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmVydGlhQ29vcmRzIChpbnRlcmFjdGlvbikge1xuICBjb25zdCBzdGF0dXMgPSBpbnRlcmFjdGlvbi5pbmVydGlhU3RhdHVzO1xuXG4gIC8vIHJldHVybiBpZiBpbmVydGlhIGlzbid0IHJ1bm5pbmdcbiAgaWYgKCFzdGF0dXMuYWN0aXZlKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IHBhZ2VVcCAgID0gc3RhdHVzLnVwQ29vcmRzLnBhZ2U7XG4gIGNvbnN0IGNsaWVudFVwID0gc3RhdHVzLnVwQ29vcmRzLmNsaWVudDtcblxuICB1dGlscy5zZXRDb29yZHMoaW50ZXJhY3Rpb24uY3VyQ29vcmRzLCBbIHtcbiAgICBwYWdlWCAgOiBwYWdlVXAueCAgICsgc3RhdHVzLnN4LFxuICAgIHBhZ2VZICA6IHBhZ2VVcC55ICAgKyBzdGF0dXMuc3ksXG4gICAgY2xpZW50WDogY2xpZW50VXAueCArIHN0YXR1cy5zeCxcbiAgICBjbGllbnRZOiBjbGllbnRVcC55ICsgc3RhdHVzLnN5LFxuICB9IF0pO1xufVxuIiwiY29uc3QgSW50ZXJhY3RFdmVudCA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgZXh0ZW5kICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2V4dGVuZCcpO1xuXG5jb25zdCBtb2RpZmllcnMgPSB7XG4gIG5hbWVzOiBbXSxcblxuICBzZXRPZmZzZXRzOiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgY29uc3QgeyBpbnRlcmFjdGlvbiwgcGFnZUNvb3JkczogcGFnZSB9ID0gYXJnO1xuICAgIGNvbnN0IHsgdGFyZ2V0LCBlbGVtZW50LCBzdGFydE9mZnNldCB9ID0gaW50ZXJhY3Rpb247XG4gICAgY29uc3QgcmVjdCA9IHRhcmdldC5nZXRSZWN0KGVsZW1lbnQpO1xuXG4gICAgaWYgKHJlY3QpIHtcbiAgICAgIHN0YXJ0T2Zmc2V0LmxlZnQgPSBwYWdlLnggLSByZWN0LmxlZnQ7XG4gICAgICBzdGFydE9mZnNldC50b3AgID0gcGFnZS55IC0gcmVjdC50b3A7XG5cbiAgICAgIHN0YXJ0T2Zmc2V0LnJpZ2h0ICA9IHJlY3QucmlnaHQgIC0gcGFnZS54O1xuICAgICAgc3RhcnRPZmZzZXQuYm90dG9tID0gcmVjdC5ib3R0b20gLSBwYWdlLnk7XG5cbiAgICAgIGlmICghKCd3aWR0aCcgIGluIHJlY3QpKSB7IHJlY3Qud2lkdGggID0gcmVjdC5yaWdodCAgLSByZWN0LmxlZnQ7IH1cbiAgICAgIGlmICghKCdoZWlnaHQnIGluIHJlY3QpKSB7IHJlY3QuaGVpZ2h0ID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcCA7IH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzdGFydE9mZnNldC5sZWZ0ID0gc3RhcnRPZmZzZXQudG9wID0gc3RhcnRPZmZzZXQucmlnaHQgPSBzdGFydE9mZnNldC5ib3R0b20gPSAwO1xuICAgIH1cblxuICAgIGFyZy5yZWN0ID0gcmVjdDtcbiAgICBhcmcuaW50ZXJhY3RhYmxlID0gdGFyZ2V0O1xuICAgIGFyZy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIGZvciAoY29uc3QgbW9kaWZpZXJOYW1lIG9mIG1vZGlmaWVycy5uYW1lcykge1xuICAgICAgYXJnLm9wdGlvbnMgPSB0YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXVttb2RpZmllck5hbWVdO1xuXG4gICAgICBpZiAoIWFyZy5vcHRpb25zKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpbnRlcmFjdGlvbi5tb2RpZmllck9mZnNldHNbbW9kaWZpZXJOYW1lXSA9IG1vZGlmaWVyc1ttb2RpZmllck5hbWVdLnNldE9mZnNldChhcmcpO1xuICAgIH1cbiAgfSxcblxuICBzZXRBbGw6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBjb25zdCB7IGludGVyYWN0aW9uLCBzdGF0dXNlcywgcHJlRW5kLCByZXF1aXJlRW5kT25seSB9ID0gYXJnO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGR4OiAwLFxuICAgICAgZHk6IDAsXG4gICAgICBjaGFuZ2VkOiBmYWxzZSxcbiAgICAgIGxvY2tlZDogZmFsc2UsXG4gICAgICBzaG91bGRNb3ZlOiB0cnVlLFxuICAgIH07XG5cbiAgICBhcmcubW9kaWZpZWRDb29yZHMgPSBleHRlbmQoe30sIGFyZy5wYWdlQ29vcmRzKTtcblxuICAgIGZvciAoY29uc3QgbW9kaWZpZXJOYW1lIG9mIG1vZGlmaWVycy5uYW1lcykge1xuICAgICAgY29uc3QgbW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJOYW1lXTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXVttb2RpZmllck5hbWVdO1xuXG4gICAgICBpZiAoIXNob3VsZERvKG9wdGlvbnMsIHByZUVuZCwgcmVxdWlyZUVuZE9ubHkpKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGFyZy5zdGF0dXMgPSBhcmcuc3RhdHVzID0gc3RhdHVzZXNbbW9kaWZpZXJOYW1lXTtcbiAgICAgIGFyZy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgIGFyZy5vZmZzZXQgPSBhcmcuaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIG1vZGlmaWVyLnNldChhcmcpO1xuXG4gICAgICBpZiAoYXJnLnN0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgYXJnLm1vZGlmaWVkQ29vcmRzLnggKz0gYXJnLnN0YXR1cy5keDtcbiAgICAgICAgYXJnLm1vZGlmaWVkQ29vcmRzLnkgKz0gYXJnLnN0YXR1cy5keTtcblxuICAgICAgICByZXN1bHQuZHggKz0gYXJnLnN0YXR1cy5keDtcbiAgICAgICAgcmVzdWx0LmR5ICs9IGFyZy5zdGF0dXMuZHk7XG5cbiAgICAgICAgcmVzdWx0LmxvY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYSBtb3ZlIHNob3VsZCBiZSBmaXJlZCBpZjpcbiAgICAvLyAgLSB0aGVyZSBhcmUgbm8gbW9kaWZpZXJzIGVuYWJsZWQsXG4gICAgLy8gIC0gbm8gbW9kaWZpZXJzIGFyZSBcImxvY2tlZFwiIGkuZS4gaGF2ZSBjaGFuZ2VkIHRoZSBwb2ludGVyJ3MgY29vcmRpbmF0ZXMsIG9yXG4gICAgLy8gIC0gdGhlIGxvY2tlZCBjb29yZHMgaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IHBvaW50ZXIgbW92ZVxuICAgIHJlc3VsdC5zaG91bGRNb3ZlID0gIWFyZy5zdGF0dXMgfHwgIXJlc3VsdC5sb2NrZWQgfHwgYXJnLnN0YXR1cy5jaGFuZ2VkO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICByZXNldFN0YXR1c2VzOiBmdW5jdGlvbiAoc3RhdHVzZXMpIHtcbiAgICBmb3IgKGNvbnN0IG1vZGlmaWVyTmFtZSBvZiBtb2RpZmllcnMubmFtZXMpIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IHN0YXR1c2VzW21vZGlmaWVyTmFtZV0gfHwge307XG5cbiAgICAgIHN0YXR1cy5keCA9IHN0YXR1cy5keSA9IDA7XG4gICAgICBzdGF0dXMubW9kaWZpZWRYID0gc3RhdHVzLm1vZGlmaWVkWSA9IE5hTjtcbiAgICAgIHN0YXR1cy5sb2NrZWQgPSBmYWxzZTtcbiAgICAgIHN0YXR1cy5jaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgc3RhdHVzZXNbbW9kaWZpZXJOYW1lXSA9IHN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdHVzZXM7XG4gIH0sXG5cbiAgc3RhcnQ6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0sIHNpZ25hbE5hbWUpIHtcbiAgICBjb25zdCBhcmcgPSB7XG4gICAgICBpbnRlcmFjdGlvbixcbiAgICAgIHBhZ2VDb29yZHM6IChzaWduYWxOYW1lID09PSAnYWN0aW9uLXJlc3VtZScgP1xuICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLmN1ckNvb3JkcyA6IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzKS5wYWdlLFxuICAgICAgc3RhcnRPZmZzZXQ6IGludGVyYWN0aW9uLnN0YXJ0T2Zmc2V0LFxuICAgICAgc3RhdHVzZXM6IGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMsXG4gICAgICBwcmVFbmQ6IGZhbHNlLFxuICAgICAgcmVxdWlyZUVuZE9ubHk6IGZhbHNlLFxuICAgIH07XG5cbiAgICBtb2RpZmllcnMuc2V0T2Zmc2V0cyhhcmcpO1xuICAgIG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKGFyZy5zdGF0dXNlcyk7XG5cbiAgICBhcmcucGFnZUNvb3JkcyA9IGV4dGVuZCh7fSwgaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZSk7XG4gICAgaW50ZXJhY3Rpb24ubW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllcnMuc2V0QWxsKGFyZyk7XG4gIH0sXG5cbiAgYmVmb3JlTW92ZTogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHByZUVuZCwgaW50ZXJhY3RpbmdCZWZvcmVNb3ZlIH0pIHtcbiAgICBjb25zdCBtb2RpZmllclJlc3VsdCA9IG1vZGlmaWVycy5zZXRBbGwoe1xuICAgICAgaW50ZXJhY3Rpb24sXG4gICAgICBwcmVFbmQsXG4gICAgICBwYWdlQ29vcmRzOiBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZSxcbiAgICAgIHN0YXR1c2VzOiBpbnRlcmFjdGlvbi5tb2RpZmllclN0YXR1c2VzLFxuICAgICAgcmVxdWlyZUVuZE9ubHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgLy8gZG9uJ3QgZmlyZSBhbiBhY3Rpb24gbW92ZSBpZiBhIG1vZGlmaWVyIHdvdWxkIGtlZXAgdGhlIGV2ZW50IGluIHRoZSBzYW1lXG4gICAgLy8gY29yZGluYXRlcyBhcyBiZWZvcmVcbiAgICBpZiAoIW1vZGlmaWVyUmVzdWx0LnNob3VsZE1vdmUgJiYgaW50ZXJhY3RpbmdCZWZvcmVNb3ZlKSB7XG4gICAgICBpbnRlcmFjdGlvbi5fZG9udEZpcmVNb3ZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbnRlcmFjdGlvbi5tb2RpZmllclJlc3VsdCA9IG1vZGlmaWVyUmVzdWx0O1xuICB9LFxuXG4gIGVuZDogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50IH0pIHtcbiAgICBmb3IgKGNvbnN0IG1vZGlmaWVyTmFtZSBvZiBtb2RpZmllcnMubmFtZXMpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXVttb2RpZmllck5hbWVdO1xuXG4gICAgICAvLyBpZiB0aGUgZW5kT25seSBvcHRpb24gaXMgdHJ1ZSBmb3IgYW55IG1vZGlmaWVyXG4gICAgICBpZiAoc2hvdWxkRG8ob3B0aW9ucywgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgLy8gZmlyZSBhIG1vdmUgZXZlbnQgYXQgdGhlIG1vZGlmaWVkIGNvb3JkaW5hdGVzXG4gICAgICAgIGludGVyYWN0aW9uLmRvTW92ZSh7IGV2ZW50LCBwcmVFbmQ6IHRydWUgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzZXRYWTogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IHsgaUV2ZW50LCBpbnRlcmFjdGlvbiB9ID0gYXJnO1xuICAgIGNvbnN0IG1vZGlmaWVyQXJnID0gZXh0ZW5kKHt9LCBhcmcpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RpZmllcnMubmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vZGlmaWVyTmFtZSA9IG1vZGlmaWVycy5uYW1lc1tpXTtcbiAgICAgIG1vZGlmaWVyQXJnLm9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXVttb2RpZmllck5hbWVdO1xuXG4gICAgICBpZiAoIW1vZGlmaWVyQXJnLm9wdGlvbnMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vZGlmaWVyID0gbW9kaWZpZXJzW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIG1vZGlmaWVyQXJnLnN0YXR1cyA9IGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXNbbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaUV2ZW50W21vZGlmaWVyTmFtZV0gPSBtb2RpZmllci5tb2RpZnlDb29yZHMobW9kaWZpZXJBcmcpO1xuICAgIH1cbiAgfSxcbn07XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5zdGFydE9mZnNldCAgICAgID0geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiAwLCBib3R0b206IDAgfTtcbiAgaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzICA9IHt9O1xuICBpbnRlcmFjdGlvbi5tb2RpZmllclN0YXR1c2VzID0gbW9kaWZpZXJzLnJlc2V0U3RhdHVzZXMoe30pO1xuICBpbnRlcmFjdGlvbi5tb2RpZmllclJlc3VsdCAgID0gbnVsbDtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tc3RhcnQnICwgbW9kaWZpZXJzLnN0YXJ0KTtcbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1yZXN1bWUnLCBtb2RpZmllcnMuc3RhcnQpO1xuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYmVmb3JlLWFjdGlvbi1tb3ZlJywgbW9kaWZpZXJzLmJlZm9yZU1vdmUpO1xuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLWVuZCcsIG1vZGlmaWVycy5lbmQpO1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ3NldC14eScsIG1vZGlmaWVycy5zZXRYWSk7XG5cbmZ1bmN0aW9uIHNob3VsZERvIChvcHRpb25zLCBwcmVFbmQsIHJlcXVpcmVFbmRPbmx5KSB7XG4gIHJldHVybiAob3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWRcbiAgICAgICAgICAmJiAocHJlRW5kIHx8ICFvcHRpb25zLmVuZE9ubHkpXG4gICAgICAgICAgJiYgKCFyZXF1aXJlRW5kT25seSB8fCBvcHRpb25zLmVuZE9ubHkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2RpZmllcnM7XG4iLCJyZXF1aXJlKCcuL2Jhc2UnKS5zZXRBY3Rpb25EZWZhdWx0cyhyZXF1aXJlKCcuLi9hY3Rpb25zL3Jlc2l6ZScpKTtcbiIsImNvbnN0IGF1dG9TdGFydCAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5cbmF1dG9TdGFydC5kZWZhdWx0cy5wZXJBY3Rpb24uaG9sZCA9IDA7XG5hdXRvU3RhcnQuZGVmYXVsdHMucGVyQWN0aW9uLmRlbGF5ID0gMDtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmF1dG9TdGFydEhvbGRUaW1lciA9IG51bGw7XG59KTtcblxuYXV0b1N0YXJ0LnNpZ25hbHMub24oJ3ByZXBhcmVkJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBjb25zdCBob2xkID0gZ2V0SG9sZER1cmF0aW9uKGludGVyYWN0aW9uKTtcblxuICBpZiAoaG9sZCA+IDApIHtcbiAgICBpbnRlcmFjdGlvbi5hdXRvU3RhcnRIb2xkVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGludGVyYWN0aW9uLnN0YXJ0KGludGVyYWN0aW9uLnByZXBhcmVkLCBpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICAgIH0sIGhvbGQpO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbW92ZScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBkdXBsaWNhdGUgfSkge1xuICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkICYmICFkdXBsaWNhdGUpIHtcbiAgICBjbGVhclRpbWVvdXQoaW50ZXJhY3Rpb24uYXV0b1N0YXJ0SG9sZFRpbWVyKTtcbiAgfVxufSk7XG5cbi8vIHByZXZlbnQgcmVndWxhciBkb3duLT5tb3ZlIGF1dG9TdGFydFxuYXV0b1N0YXJ0LnNpZ25hbHMub24oJ2JlZm9yZS1zdGFydCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgY29uc3QgaG9sZCA9IGdldEhvbGREdXJhdGlvbihpbnRlcmFjdGlvbik7XG5cbiAgaWYgKGhvbGQgPiAwKSB7XG4gICAgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSA9IG51bGw7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBnZXRIb2xkRHVyYXRpb24gKGludGVyYWN0aW9uKSB7XG4gIGNvbnN0IGFjdGlvbk5hbWUgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZCAmJiBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lO1xuXG4gIGlmICghYWN0aW9uTmFtZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucztcblxuICByZXR1cm4gb3B0aW9uc1thY3Rpb25OYW1lXS5ob2xkIHx8IG9wdGlvbnNbYWN0aW9uTmFtZV0uZGVsYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRIb2xkRHVyYXRpb24sXG59O1xuIiwicmVxdWlyZSgnLi9iYXNlJykuc2V0QWN0aW9uRGVmYXVsdHMocmVxdWlyZSgnLi4vYWN0aW9ucy9nZXN0dXJlJykpO1xuIiwiY29uc3QgYXV0b1N0YXJ0ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCBzY29wZSAgICAgPSByZXF1aXJlKCcuLi9zY29wZScpO1xuY29uc3QgaXMgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvaXMnKTtcblxuY29uc3QgeyBwYXJlbnROb2RlIH0gPSByZXF1aXJlKCcuLi91dGlscy9kb21VdGlscycpO1xuXG5hdXRvU3RhcnQuc2V0QWN0aW9uRGVmYXVsdHMocmVxdWlyZSgnLi4vYWN0aW9ucy9kcmFnJykpO1xuXG5hdXRvU3RhcnQuc2lnbmFscy5vbignYmVmb3JlLXN0YXJ0JywgIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudFRhcmdldCwgZHgsIGR5IH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykgeyByZXR1cm47IH1cblxuICAvLyBjaGVjayBpZiBhIGRyYWcgaXMgaW4gdGhlIGNvcnJlY3QgYXhpc1xuICBjb25zdCBhYnNYID0gTWF0aC5hYnMoZHgpO1xuICBjb25zdCBhYnNZID0gTWF0aC5hYnMoZHkpO1xuICBjb25zdCB0YXJnZXRPcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMuZHJhZztcbiAgY29uc3Qgc3RhcnRBeGlzID0gdGFyZ2V0T3B0aW9ucy5zdGFydEF4aXM7XG4gIGNvbnN0IGN1cnJlbnRBeGlzID0gKGFic1ggPiBhYnNZID8gJ3gnIDogYWJzWCA8IGFic1kgPyAneScgOiAneHknKTtcblxuICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5heGlzID0gdGFyZ2V0T3B0aW9ucy5sb2NrQXhpcyA9PT0gJ3N0YXJ0J1xuICAgID8gY3VycmVudEF4aXNbMF0gLy8gYWx3YXlzIGxvY2sgdG8gb25lIGF4aXMgZXZlbiBpZiBjdXJyZW50QXhpcyA9PT0gJ3h5J1xuICAgIDogdGFyZ2V0T3B0aW9ucy5sb2NrQXhpcztcblxuICAvLyBpZiB0aGUgbW92ZW1lbnQgaXNuJ3QgaW4gdGhlIHN0YXJ0QXhpcyBvZiB0aGUgaW50ZXJhY3RhYmxlXG4gIGlmIChjdXJyZW50QXhpcyAhPT0gJ3h5JyAmJiBzdGFydEF4aXMgIT09ICd4eScgJiYgc3RhcnRBeGlzICE9PSBjdXJyZW50QXhpcykge1xuICAgIC8vIGNhbmNlbCB0aGUgcHJlcGFyZWQgYWN0aW9uXG4gICAgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSA9IG51bGw7XG5cbiAgICAvLyB0aGVuIHRyeSB0byBnZXQgYSBkcmFnIGZyb20gYW5vdGhlciBpbmVyYWN0YWJsZVxuICAgIGxldCBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICBjb25zdCBnZXREcmFnZ2FibGUgPSBmdW5jdGlvbiAoaW50ZXJhY3RhYmxlKSB7XG4gICAgICBpZiAoaW50ZXJhY3RhYmxlID09PSBpbnRlcmFjdGlvbi50YXJnZXQpIHsgcmV0dXJuOyB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5kcmFnO1xuXG4gICAgICBpZiAoIW9wdGlvbnMubWFudWFsU3RhcnRcbiAgICAgICAgICAmJiBpbnRlcmFjdGFibGUudGVzdElnbm9yZUFsbG93KG9wdGlvbnMsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSkge1xuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGludGVyYWN0YWJsZS5nZXRBY3Rpb24oXG4gICAgICAgICAgaW50ZXJhY3Rpb24uZG93blBvaW50ZXIsIGludGVyYWN0aW9uLmRvd25FdmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChhY3Rpb25cbiAgICAgICAgICAgICYmIGFjdGlvbi5uYW1lID09PSAnZHJhZydcbiAgICAgICAgICAgICYmIGNoZWNrU3RhcnRBeGlzKGN1cnJlbnRBeGlzLCBpbnRlcmFjdGFibGUpXG4gICAgICAgICAgICAmJiBhdXRvU3RhcnQudmFsaWRhdGVBY3Rpb24oYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSkge1xuXG4gICAgICAgICAgcmV0dXJuIGludGVyYWN0YWJsZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBjaGVjayBhbGwgaW50ZXJhY3RhYmxlc1xuICAgIHdoaWxlIChpcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBpbnRlcmFjdGFibGUgPSBzY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChlbGVtZW50LCBnZXREcmFnZ2FibGUpO1xuXG4gICAgICBpZiAoaW50ZXJhY3RhYmxlKSB7XG4gICAgICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPSAnZHJhZyc7XG4gICAgICAgIGludGVyYWN0aW9uLnRhcmdldCA9IGludGVyYWN0YWJsZTtcbiAgICAgICAgaW50ZXJhY3Rpb24uZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gcGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBjaGVja1N0YXJ0QXhpcyAoc3RhcnRBeGlzLCBpbnRlcmFjdGFibGUpIHtcbiAgaWYgKCFpbnRlcmFjdGFibGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY29uc3QgdGhpc0F4aXMgPSBpbnRlcmFjdGFibGUub3B0aW9ucy5kcmFnLnN0YXJ0QXhpcztcblxuICByZXR1cm4gKHN0YXJ0QXhpcyA9PT0gJ3h5JyB8fCB0aGlzQXhpcyA9PT0gJ3h5JyB8fCB0aGlzQXhpcyA9PT0gc3RhcnRBeGlzKTtcbn1cbiIsImNvbnN0IGludGVyYWN0ICAgICAgID0gcmVxdWlyZSgnLi4vaW50ZXJhY3QnKTtcbmNvbnN0IEludGVyYWN0YWJsZSAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCBhY3Rpb25zICAgICAgICA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvYmFzZScpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuY29uc3Qgc2NvcGUgICAgICAgICAgPSByZXF1aXJlKCcuLi9zY29wZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3Qgc2lnbmFscyAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbnJlcXVpcmUoJy4vSW50ZXJhY3RhYmxlTWV0aG9kcycpO1xuXG5jb25zdCBhdXRvU3RhcnQgPSB7XG4gIHNpZ25hbHMsXG4gIHdpdGhpbkludGVyYWN0aW9uTGltaXQsXG4gIC8vIEFsbG93IHRoaXMgbWFueSBpbnRlcmFjdGlvbnMgdG8gaGFwcGVuIHNpbXVsdGFuZW91c2x5XG4gIG1heEludGVyYWN0aW9uczogSW5maW5pdHksXG4gIGRlZmF1bHRzOiB7XG4gICAgcGVyQWN0aW9uOiB7XG4gICAgICBtYW51YWxTdGFydDogZmFsc2UsXG4gICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgbWF4UGVyRWxlbWVudDogMSxcbiAgICAgIGFsbG93RnJvbTogIG51bGwsXG4gICAgICBpZ25vcmVGcm9tOiBudWxsLFxuXG4gICAgICAvLyBvbmx5IGFsbG93IGxlZnQgYnV0dG9uIGJ5IGRlZmF1bHRcbiAgICAgIC8vIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9idXR0b25zI1JldHVybl92YWx1ZVxuICAgICAgbW91c2VCdXR0b25zOiAxLFxuICAgIH0sXG4gIH0sXG4gIHNldEFjdGlvbkRlZmF1bHRzOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgdXRpbHMuZXh0ZW5kKGFjdGlvbi5kZWZhdWx0cywgYXV0b1N0YXJ0LmRlZmF1bHRzLnBlckFjdGlvbik7XG4gIH0sXG4gIHZhbGlkYXRlQWN0aW9uLFxufTtcblxuLy8gc2V0IGN1cnNvciBzdHlsZSBvbiBtb3VzZWRvd25cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2Rvd24nLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0IH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgYWN0aW9uSW5mbyA9IGdldEFjdGlvbkluZm8oaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCk7XG4gIHByZXBhcmUoaW50ZXJhY3Rpb24sIGFjdGlvbkluZm8pO1xufSk7XG5cbi8vIHNldCBjdXJzb3Igc3R5bGUgb24gbW91c2Vtb3ZlXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJ1xuICAgICAgfHwgaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93blxuICAgICAgfHwgaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkgeyByZXR1cm47IH1cblxuICBjb25zdCBhY3Rpb25JbmZvID0gZ2V0QWN0aW9uSW5mbyhpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KTtcbiAgcHJlcGFyZShpbnRlcmFjdGlvbiwgYWN0aW9uSW5mbyk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbW92ZScsIGZ1bmN0aW9uIChhcmcpIHtcbiAgY29uc3QgeyBpbnRlcmFjdGlvbiwgZXZlbnQgfSA9IGFyZztcblxuICBpZiAoIWludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd25cbiAgICAgIHx8IGludGVyYWN0aW9uLmludGVyYWN0aW5nKClcbiAgICAgIHx8ICFpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWRcbiAgICAgIHx8ICFpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc2lnbmFscy5maXJlKCdiZWZvcmUtc3RhcnQnLCBhcmcpO1xuXG4gIGNvbnN0IHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldDtcblxuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAmJiB0YXJnZXQpIHtcbiAgICAvLyBjaGVjayBtYW51YWxTdGFydCBhbmQgaW50ZXJhY3Rpb24gbGltaXRcbiAgICBpZiAodGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0ubWFudWFsU3RhcnRcbiAgICAgICAgfHwgIXdpdGhpbkludGVyYWN0aW9uTGltaXQodGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZCkpIHtcbiAgICAgIGludGVyYWN0aW9uLnN0b3AoZXZlbnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGludGVyYWN0aW9uLnN0YXJ0KGludGVyYWN0aW9uLnByZXBhcmVkLCB0YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIENoZWNrIGlmIHRoZSBjdXJyZW50IHRhcmdldCBzdXBwb3J0cyB0aGUgYWN0aW9uLlxuLy8gSWYgc28sIHJldHVybiB0aGUgdmFsaWRhdGVkIGFjdGlvbi4gT3RoZXJ3aXNlLCByZXR1cm4gbnVsbFxuZnVuY3Rpb24gdmFsaWRhdGVBY3Rpb24gKGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBldmVudFRhcmdldCkge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KGFjdGlvbilcbiAgICAgICYmIGludGVyYWN0YWJsZS50ZXN0SWdub3JlQWxsb3coaW50ZXJhY3RhYmxlLm9wdGlvbnNbYWN0aW9uLm5hbWVdLCBlbGVtZW50LCBldmVudFRhcmdldClcbiAgICAgICYmIGludGVyYWN0YWJsZS5vcHRpb25zW2FjdGlvbi5uYW1lXS5lbmFibGVkXG4gICAgICAmJiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0KGludGVyYWN0YWJsZSwgZWxlbWVudCwgYWN0aW9uKSkge1xuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVTZWxlY3RvciAoaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBtYXRjaGVzLCBtYXRjaEVsZW1lbnRzLCBldmVudFRhcmdldCkge1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gbWF0Y2hlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hlc1tpXTtcbiAgICBjb25zdCBtYXRjaEVsZW1lbnQgPSBtYXRjaEVsZW1lbnRzW2ldO1xuICAgIGNvbnN0IGFjdGlvbiA9IHZhbGlkYXRlQWN0aW9uKG1hdGNoLmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIG1hdGNoRWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0KTtcblxuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgdGFyZ2V0OiBtYXRjaCxcbiAgICAgICAgZWxlbWVudDogbWF0Y2hFbGVtZW50LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIGdldEFjdGlvbkluZm8gKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpIHtcbiAgbGV0IG1hdGNoZXMgPSBbXTtcbiAgbGV0IG1hdGNoRWxlbWVudHMgPSBbXTtcblxuICBsZXQgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gIGZ1bmN0aW9uIHB1c2hNYXRjaGVzIChpbnRlcmFjdGFibGUpIHtcbiAgICBtYXRjaGVzLnB1c2goaW50ZXJhY3RhYmxlKTtcbiAgICBtYXRjaEVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gIH1cblxuICB3aGlsZSAodXRpbHMuaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgIG1hdGNoZXMgPSBbXTtcbiAgICBtYXRjaEVsZW1lbnRzID0gW107XG5cbiAgICBzY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChlbGVtZW50LCBwdXNoTWF0Y2hlcyk7XG5cbiAgICBjb25zdCBhY3Rpb25JbmZvID0gdmFsaWRhdGVTZWxlY3RvcihpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIG1hdGNoZXMsIG1hdGNoRWxlbWVudHMsIGV2ZW50VGFyZ2V0KTtcblxuICAgIGlmIChhY3Rpb25JbmZvLmFjdGlvblxuICAgICAgJiYgIWFjdGlvbkluZm8udGFyZ2V0Lm9wdGlvbnNbYWN0aW9uSW5mby5hY3Rpb24ubmFtZV0ubWFudWFsU3RhcnQpIHtcbiAgICAgIHJldHVybiBhY3Rpb25JbmZvO1xuICAgIH1cblxuICAgIGVsZW1lbnQgPSB1dGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlIChpbnRlcmFjdGlvbiwgeyBhY3Rpb24sIHRhcmdldCwgZWxlbWVudCB9KSB7XG4gIGFjdGlvbiA9IGFjdGlvbiB8fCB7fTtcblxuICBpZiAoaW50ZXJhY3Rpb24udGFyZ2V0ICYmIGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgaW50ZXJhY3Rpb24udGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICB9XG5cbiAgaW50ZXJhY3Rpb24udGFyZ2V0ID0gdGFyZ2V0O1xuICBpbnRlcmFjdGlvbi5lbGVtZW50ID0gZWxlbWVudDtcbiAgdXRpbHMuY29weUFjdGlvbihpbnRlcmFjdGlvbi5wcmVwYXJlZCwgYWN0aW9uKTtcblxuICBpZiAodGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgY29uc3QgY3Vyc29yID0gYWN0aW9uPyBhY3Rpb25zW2FjdGlvbi5uYW1lXS5nZXRDdXJzb3IoYWN0aW9uKSA6ICcnO1xuICAgIGludGVyYWN0aW9uLnRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7XG4gIH1cblxuICBzaWduYWxzLmZpcmUoJ3ByZXBhcmVkJywgeyBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24gfSk7XG59XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGNvbnN0IHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldDtcblxuICBpZiAodGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgdGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICB9XG59KTtcblxuZnVuY3Rpb24gd2l0aGluSW50ZXJhY3Rpb25MaW1pdCAoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBhY3Rpb24pIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zO1xuICBjb25zdCBtYXhBY3Rpb25zID0gb3B0aW9uc1thY3Rpb24ubmFtZV0ubWF4O1xuICBjb25zdCBtYXhQZXJFbGVtZW50ID0gb3B0aW9uc1thY3Rpb24ubmFtZV0ubWF4UGVyRWxlbWVudDtcbiAgbGV0IGFjdGl2ZUludGVyYWN0aW9ucyA9IDA7XG4gIGxldCB0YXJnZXRDb3VudCA9IDA7XG4gIGxldCB0YXJnZXRFbGVtZW50Q291bnQgPSAwO1xuXG4gIC8vIG5vIGFjdGlvbnMgaWYgYW55IG9mIHRoZXNlIHZhbHVlcyA9PSAwXG4gIGlmICghKG1heEFjdGlvbnMgJiYgbWF4UGVyRWxlbWVudCAmJiBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zKSkgeyByZXR1cm47IH1cblxuICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuICAgIGNvbnN0IG90aGVyQWN0aW9uID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZTtcblxuICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkgeyBjb250aW51ZTsgfVxuXG4gICAgYWN0aXZlSW50ZXJhY3Rpb25zKys7XG5cbiAgICBpZiAoYWN0aXZlSW50ZXJhY3Rpb25zID49IGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24udGFyZ2V0ICE9PSBpbnRlcmFjdGFibGUpIHsgY29udGludWU7IH1cblxuICAgIHRhcmdldENvdW50ICs9IChvdGhlckFjdGlvbiA9PT0gYWN0aW9uLm5hbWUpfDA7XG5cbiAgICBpZiAodGFyZ2V0Q291bnQgPj0gbWF4QWN0aW9ucykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpbnRlcmFjdGlvbi5lbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICB0YXJnZXRFbGVtZW50Q291bnQrKztcblxuICAgICAgaWYgKG90aGVyQWN0aW9uICE9PSBhY3Rpb24ubmFtZSB8fCB0YXJnZXRFbGVtZW50Q291bnQgPj0gbWF4UGVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnMgPiAwO1xufVxuXG4vKipcbiAqIFJldHVybnMgb3Igc2V0cyB0aGUgbWF4aW11bSBudW1iZXIgb2YgY29uY3VycmVudCBpbnRlcmFjdGlvbnMgYWxsb3dlZC4gIEJ5XG4gKiBkZWZhdWx0IG9ubHkgMSBpbnRlcmFjdGlvbiBpcyBhbGxvd2VkIGF0IGEgdGltZSAoZm9yIGJhY2t3YXJkc1xuICogY29tcGF0aWJpbGl0eSkuIFRvIGFsbG93IG11bHRpcGxlIGludGVyYWN0aW9ucyBvbiB0aGUgc2FtZSBJbnRlcmFjdGFibGVzIGFuZFxuICogZWxlbWVudHMsIHlvdSBuZWVkIHRvIGVuYWJsZSBpdCBpbiB0aGUgZHJhZ2dhYmxlLCByZXNpemFibGUgYW5kIGdlc3R1cmFibGVcbiAqIGAnbWF4J2AgYW5kIGAnbWF4UGVyRWxlbWVudCdgIG9wdGlvbnMuXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5tYXhJbnRlcmFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW25ld1ZhbHVlXSBBbnkgbnVtYmVyLiBuZXdWYWx1ZSA8PSAwIG1lYW5zIG5vIGludGVyYWN0aW9ucy5cbiAqL1xuaW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmICh1dGlscy5pcy5udW1iZXIobmV3VmFsdWUpKSB7XG4gICAgYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucyA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgcmV0dXJuIGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnM7XG59O1xuXG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ3N0eWxlQ3Vyc29yJyk7XG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ2FjdGlvbkNoZWNrZXInKTtcbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnaWdub3JlRnJvbScpO1xuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdhbGxvd0Zyb20nKTtcblxuZGVmYXVsdE9wdGlvbnMuYmFzZS5hY3Rpb25DaGVja2VyID0gbnVsbDtcbmRlZmF1bHRPcHRpb25zLmJhc2Uuc3R5bGVDdXJzb3IgPSB0cnVlO1xuXG51dGlscy5leHRlbmQoZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLCBhdXRvU3RhcnQuZGVmYXVsdHMucGVyQWN0aW9uKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdXRvU3RhcnQ7XG4iLCIvKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xuY29uc3QgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBhY3Rpb25zICAgICAgPSByZXF1aXJlKCcuLi9hY3Rpb25zL2Jhc2UnKTtcbmNvbnN0IGlzICAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzJyk7XG5jb25zdCBkb21VdGlscyAgICAgPSByZXF1aXJlKCcuLi91dGlscy9kb21VdGlscycpO1xuXG5jb25zdCB7IHdhcm5PbmNlIH0gPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmdldEFjdGlvbiA9IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpIHtcbiAgY29uc3QgYWN0aW9uID0gdGhpcy5kZWZhdWx0QWN0aW9uQ2hlY2tlcihwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcikge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcihwb2ludGVyLCBldmVudCwgYWN0aW9uLCB0aGlzLCBlbGVtZW50LCBpbnRlcmFjdGlvbik7XG4gIH1cblxuICByZXR1cm4gYWN0aW9uO1xufTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoZWxlbWVudCwgeyBpZ25vcmVGcm9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm8tYWN0aW9uJykgfSk7XG4gKiAvLyBvclxuICogaW50ZXJhY3QoZWxlbWVudCkuaWdub3JlRnJvbSgnaW5wdXQsIHRleHRhcmVhLCBhJyk7XG4gKiBgYGBcbiAqIEBkZXByZWNhdGVkXG4gKiBJZiB0aGUgdGFyZ2V0IG9mIHRoZSBgbW91c2Vkb3duYCwgYHBvaW50ZXJkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQgb3IgYW55XG4gKiBvZiBpdCdzIHBhcmVudHMgbWF0Y2ggdGhlIGdpdmVuIENTUyBzZWxlY3RvciBvciBFbGVtZW50LCBub1xuICogZHJhZy9yZXNpemUvZ2VzdHVyZSBpcyBzdGFydGVkLlxuICpcbiAqIERvbid0IHVzZSB0aGlzIG1ldGhvZC4gSW5zdGVhZCBzZXQgdGhlIGBpZ25vcmVGcm9tYCBvcHRpb24gZm9yIGVhY2ggYWN0aW9uXG4gKiBvciBmb3IgYHBvaW50ZXJFdmVudHNgXG4gKlxuICogQGV4YW1wbGVcbiAqIGludGVyYWN0KHRhcmdldHQpXG4gKiAgIC5kcmFnZ2FibGUoe1xuICogICAgIGlnbm9yZUZyb206ICdpbnB1dCwgdGV4dGFyZWEsIGFbaHJlZl0nJyxcbiAqICAgfSlcbiAqICAgLnBvaW50ZXJFdmVudHMoe1xuICogICAgIGlnbm9yZUZyb206ICdbbm8tcG9pbnRlcl0nLFxuICogICB9KTtcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IEVsZW1lbnQgfCBudWxsfSBbbmV3VmFsdWVdIGEgQ1NTIHNlbGVjdG9yIHN0cmluZywgYW5cbiAqIEVsZW1lbnQgb3IgYG51bGxgIHRvIG5vdCBpZ25vcmUgYW55IGVsZW1lbnRzXG4gKiBAcmV0dXJuIHtzdHJpbmcgfCBFbGVtZW50IHwgb2JqZWN0fSBUaGUgY3VycmVudCBpZ25vcmVGcm9tIHZhbHVlIG9yIHRoaXNcbiAqIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmlnbm9yZUZyb20gPSB3YXJuT25jZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX2JhY2tDb21wYXRPcHRpb24oJ2lnbm9yZUZyb20nLCBuZXdWYWx1ZSk7XG59LCAnSW50ZXJhY3RhYmxlLmlnbm9yZUZvcm0oKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgSW50ZXJhY3RibGUuZHJhZ2dhYmxlKHtpZ25vcmVGcm9tOiBuZXdWYWx1ZX0pLicpO1xuXG4vKipcbiAqIGBgYGpzXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIEEgZHJhZy9yZXNpemUvZ2VzdHVyZSBpcyBzdGFydGVkIG9ubHkgSWYgdGhlIHRhcmdldCBvZiB0aGUgYG1vdXNlZG93bmAsXG4gKiBgcG9pbnRlcmRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudCBvciBhbnkgb2YgaXQncyBwYXJlbnRzIG1hdGNoIHRoZSBnaXZlblxuICogQ1NTIHNlbGVjdG9yIG9yIEVsZW1lbnQuXG4gKlxuICogRG9uJ3QgdXNlIHRoaXMgbWV0aG9kLiBJbnN0ZWFkIHNldCB0aGUgYGFsbG93RnJvbWAgb3B0aW9uIGZvciBlYWNoIGFjdGlvblxuICogb3IgZm9yIGBwb2ludGVyRXZlbnRzYFxuICpcbiAqIEBleGFtcGxlXG4gKiBpbnRlcmFjdCh0YXJnZXR0KVxuICogICAucmVzaXphYmxlKHtcbiAqICAgICBhbGxvd0Zyb206ICcucmVzaXplLWhhbmRsZScsXG4gKiAgIC5wb2ludGVyRXZlbnRzKHtcbiAqICAgICBhbGxvd0Zyb206ICcuaGFuZGxlJywsXG4gKiAgIH0pO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRWxlbWVudCB8IG51bGx9IFtuZXdWYWx1ZV0gYSBDU1Mgc2VsZWN0b3Igc3RyaW5nLCBhblxuICogRWxlbWVudCBvciBgbnVsbGAgdG8gYWxsb3cgZnJvbSBhbnkgZWxlbWVudFxuICogQHJldHVybiB7c3RyaW5nIHwgRWxlbWVudCB8IG9iamVjdH0gVGhlIGN1cnJlbnQgYWxsb3dGcm9tIHZhbHVlIG9yIHRoaXNcbiAqIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmFsbG93RnJvbSA9IHdhcm5PbmNlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICByZXR1cm4gdGhpcy5fYmFja0NvbXBhdE9wdGlvbignYWxsb3dGcm9tJywgbmV3VmFsdWUpO1xufSwgJ0ludGVyYWN0YWJsZS5hbGxvd0Zvcm0oKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgSW50ZXJhY3RibGUuZHJhZ2dhYmxlKHthbGxvd0Zyb206IG5ld1ZhbHVlfSkuJyk7XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUudGVzdElnbm9yZSA9IGZ1bmN0aW9uIChpZ25vcmVGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50LCBlbGVtZW50KSB7XG4gIGlmICghaWdub3JlRnJvbSB8fCAhaXMuZWxlbWVudChlbGVtZW50KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBpZiAoaXMuc3RyaW5nKGlnbm9yZUZyb20pKSB7XG4gICAgcmV0dXJuIGRvbVV0aWxzLm1hdGNoZXNVcFRvKGVsZW1lbnQsIGlnbm9yZUZyb20sIGludGVyYWN0YWJsZUVsZW1lbnQpO1xuICB9XG4gIGVsc2UgaWYgKGlzLmVsZW1lbnQoaWdub3JlRnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubm9kZUNvbnRhaW5zKGlnbm9yZUZyb20sIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS50ZXN0QWxsb3cgPSBmdW5jdGlvbiAoYWxsb3dGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50LCBlbGVtZW50KSB7XG4gIGlmICghYWxsb3dGcm9tKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgaWYgKCFpcy5lbGVtZW50KGVsZW1lbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGlmIChpcy5zdHJpbmcoYWxsb3dGcm9tKSkge1xuICAgIHJldHVybiBkb21VdGlscy5tYXRjaGVzVXBUbyhlbGVtZW50LCBhbGxvd0Zyb20sIGludGVyYWN0YWJsZUVsZW1lbnQpO1xuICB9XG4gIGVsc2UgaWYgKGlzLmVsZW1lbnQoYWxsb3dGcm9tKSkge1xuICAgIHJldHVybiBkb21VdGlscy5ub2RlQ29udGFpbnMoYWxsb3dGcm9tLCBlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUudGVzdElnbm9yZUFsbG93ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGludGVyYWN0YWJsZUVsZW1lbnQsIGV2ZW50VGFyZ2V0KSB7XG4gIHJldHVybiAoIXRoaXMudGVzdElnbm9yZShvcHRpb25zLmlnbm9yZUZyb20sIGludGVyYWN0YWJsZUVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICYmIHRoaXMudGVzdEFsbG93KG9wdGlvbnMuYWxsb3dGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50LCBldmVudFRhcmdldCkpO1xufTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoJy5yZXNpemUtZHJhZycpXG4gKiAgIC5yZXNpemFibGUodHJ1ZSlcbiAqICAgLmRyYWdnYWJsZSh0cnVlKVxuICogICAuYWN0aW9uQ2hlY2tlcihmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbikge1xuICpcbiAqICAgaWYgKGludGVyYWN0Lm1hdGNoZXNTZWxlY3RvcihldmVudC50YXJnZXQsICcuZHJhZy1oYW5kbGUnKSB7XG4gKiAgICAgLy8gZm9yY2UgZHJhZyB3aXRoIGhhbmRsZSB0YXJnZXRcbiAqICAgICBhY3Rpb24ubmFtZSA9IGRyYWc7XG4gKiAgIH1cbiAqICAgZWxzZSB7XG4gKiAgICAgLy8gcmVzaXplIGZyb20gdGhlIHRvcCBhbmQgcmlnaHQgZWRnZXNcbiAqICAgICBhY3Rpb24ubmFtZSAgPSAncmVzaXplJztcbiAqICAgICBhY3Rpb24uZWRnZXMgPSB7IHRvcDogdHJ1ZSwgcmlnaHQ6IHRydWUgfTtcbiAqICAgfVxuICpcbiAqICAgcmV0dXJuIGFjdGlvbjtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogR2V0cyBvciBzZXRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQgb25cbiAqIHBvaW50ZXJEb3duXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbiB8IG51bGx9IFtjaGVja2VyXSBBIGZ1bmN0aW9uIHdoaWNoIHRha2VzIGEgcG9pbnRlciBldmVudCxcbiAqIGRlZmF1bHRBY3Rpb24gc3RyaW5nLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQgYW5kIGludGVyYWN0aW9uIGFzIHBhcmFtZXRlcnNcbiAqIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIG5hbWUgcHJvcGVydHkgJ2RyYWcnICdyZXNpemUnIG9yICdnZXN0dXJlJyBhbmRcbiAqIG9wdGlvbmFsbHkgYW4gYGVkZ2VzYCBvYmplY3Qgd2l0aCBib29sZWFuICd0b3AnLCAnbGVmdCcsICdib3R0b20nIGFuZCByaWdodFxuICogcHJvcHMuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbiB8IEludGVyYWN0YWJsZX0gVGhlIGNoZWNrZXIgZnVuY3Rpb24gb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5hY3Rpb25DaGVja2VyID0gZnVuY3Rpb24gKGNoZWNrZXIpIHtcbiAgaWYgKGlzLmZ1bmN0aW9uKGNoZWNrZXIpKSB7XG4gICAgdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIgPSBjaGVja2VyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoY2hlY2tlciA9PT0gbnVsbCkge1xuICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0aGUgdGhlIGN1cnNvciBzaG91bGQgYmUgY2hhbmdlZCBkZXBlbmRpbmcgb24gdGhlXG4gKiBhY3Rpb24gdGhhdCB3b3VsZCBiZSBwZXJmb3JtZWQgaWYgdGhlIG1vdXNlIHdlcmUgcHJlc3NlZCBhbmQgZHJhZ2dlZC5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtuZXdWYWx1ZV1cbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IFRoZSBjdXJyZW50IHNldHRpbmcgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5zdHlsZUN1cnNvciA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAoaXMuYm9vbChuZXdWYWx1ZSkpIHtcbiAgICB0aGlzLm9wdGlvbnMuc3R5bGVDdXJzb3IgPSBuZXdWYWx1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKG5ld1ZhbHVlID09PSBudWxsKSB7XG4gICAgZGVsZXRlIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcjtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZGVmYXVsdEFjdGlvbkNoZWNrZXIgPSBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBlbGVtZW50KSB7XG4gIGNvbnN0IHJlY3QgPSB0aGlzLmdldFJlY3QoZWxlbWVudCk7XG4gIGNvbnN0IGJ1dHRvbnMgPSBldmVudC5idXR0b25zIHx8ICh7XG4gICAgMDogMSxcbiAgICAxOiA0LFxuICAgIDM6IDgsXG4gICAgNDogMTYsXG4gIH0pW2V2ZW50LmJ1dHRvbl07XG4gIGxldCBhY3Rpb24gPSBudWxsO1xuXG4gIGZvciAoY29uc3QgYWN0aW9uTmFtZSBvZiBhY3Rpb25zLm5hbWVzKSB7XG4gICAgLy8gY2hlY2sgbW91c2VCdXR0b24gc2V0dGluZyBpZiB0aGUgcG9pbnRlciBpcyBkb3duXG4gICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd25cbiAgICAgICAgJiYgL21vdXNlfHBvaW50ZXIvLnRlc3QoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUpXG4gICAgICAgICYmIChidXR0b25zICYgdGhpcy5vcHRpb25zW2FjdGlvbk5hbWVdLm1vdXNlQnV0dG9ucykgPT09IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGFjdGlvbiA9IGFjdGlvbnNbYWN0aW9uTmFtZV0uY2hlY2tlcihwb2ludGVyLCBldmVudCwgdGhpcywgZWxlbWVudCwgaW50ZXJhY3Rpb24sIHJlY3QpO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG4gIH1cbn07XG5cbiIsImNvbnN0IHJhZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9yYWYnKTtcbmNvbnN0IGdldFdpbmRvdyAgICAgID0gcmVxdWlyZSgnLi91dGlscy93aW5kb3cnKS5nZXRXaW5kb3c7XG5jb25zdCBpcyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvaXMnKTtcbmNvbnN0IGRvbVV0aWxzICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9kb21VdGlscycpO1xuY29uc3QgSW50ZXJhY3Rpb24gICAgPSByZXF1aXJlKCcuL0ludGVyYWN0aW9uJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4vZGVmYXVsdE9wdGlvbnMnKTtcblxuY29uc3QgYXV0b1Njcm9sbCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkICA6IGZhbHNlLFxuICAgIGNvbnRhaW5lcjogbnVsbCwgICAgIC8vIHRoZSBpdGVtIHRoYXQgaXMgc2Nyb2xsZWQgKFdpbmRvdyBvciBIVE1MRWxlbWVudClcbiAgICBtYXJnaW4gICA6IDYwLFxuICAgIHNwZWVkICAgIDogMzAwLCAgICAgIC8vIHRoZSBzY3JvbGwgc3BlZWQgaW4gcGl4ZWxzIHBlciBzZWNvbmRcbiAgfSxcblxuICBpbnRlcmFjdGlvbjogbnVsbCxcbiAgaTogbnVsbCwgICAgLy8gdGhlIGhhbmRsZSByZXR1cm5lZCBieSB3aW5kb3cuc2V0SW50ZXJ2YWxcbiAgeDogMCwgeTogMCwgLy8gRGlyZWN0aW9uIGVhY2ggcHVsc2UgaXMgdG8gc2Nyb2xsIGluXG5cbiAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICBwcmV2VGltZTogMCxcblxuICBzdGFydDogZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gICAgYXV0b1Njcm9sbC5pc1Njcm9sbGluZyA9IHRydWU7XG4gICAgcmFmLmNhbmNlbChhdXRvU2Nyb2xsLmkpO1xuXG4gICAgYXV0b1Njcm9sbC5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuICAgIGF1dG9TY3JvbGwucHJldlRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBhdXRvU2Nyb2xsLmkgPSByYWYucmVxdWVzdChhdXRvU2Nyb2xsLnNjcm9sbCk7XG4gIH0sXG5cbiAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgIGF1dG9TY3JvbGwuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICByYWYuY2FuY2VsKGF1dG9TY3JvbGwuaSk7XG4gIH0sXG5cbiAgLy8gc2Nyb2xsIHRoZSB3aW5kb3cgYnkgdGhlIHZhbHVlcyBpbiBzY3JvbGwueC95XG4gIHNjcm9sbDogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhdXRvU2Nyb2xsLmludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2F1dG9TY3JvbGwuaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uYXV0b1Njcm9sbDtcbiAgICBjb25zdCBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBnZXRXaW5kb3coYXV0b1Njcm9sbC5pbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAvLyBjaGFuZ2UgaW4gdGltZSBpbiBzZWNvbmRzXG4gICAgY29uc3QgZHQgPSAobm93IC0gYXV0b1Njcm9sbC5wcmV2VGltZSkgLyAxMDAwO1xuICAgIC8vIGRpc3BsYWNlbWVudFxuICAgIGNvbnN0IHMgPSBvcHRpb25zLnNwZWVkICogZHQ7XG5cbiAgICBpZiAocyA+PSAxKSB7XG4gICAgICBpZiAoaXMud2luZG93KGNvbnRhaW5lcikpIHtcbiAgICAgICAgY29udGFpbmVyLnNjcm9sbEJ5KGF1dG9TY3JvbGwueCAqIHMsIGF1dG9TY3JvbGwueSAqIHMpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5zY3JvbGxMZWZ0ICs9IGF1dG9TY3JvbGwueCAqIHM7XG4gICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgICs9IGF1dG9TY3JvbGwueSAqIHM7XG4gICAgICB9XG5cbiAgICAgIGF1dG9TY3JvbGwucHJldlRpbWUgPSBub3c7XG4gICAgfVxuXG4gICAgaWYgKGF1dG9TY3JvbGwuaXNTY3JvbGxpbmcpIHtcbiAgICAgIHJhZi5jYW5jZWwoYXV0b1Njcm9sbC5pKTtcbiAgICAgIGF1dG9TY3JvbGwuaSA9IHJhZi5yZXF1ZXN0KGF1dG9TY3JvbGwuc2Nyb2xsKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrOiBmdW5jdGlvbiAoaW50ZXJhY3RhYmxlLCBhY3Rpb25OYW1lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zO1xuXG4gICAgcmV0dXJuIG9wdGlvbnNbYWN0aW9uTmFtZV0uYXV0b1Njcm9sbCAmJiBvcHRpb25zW2FjdGlvbk5hbWVdLmF1dG9TY3JvbGwuZW5hYmxlZDtcbiAgfSxcbiAgb25JbnRlcmFjdGlvbk1vdmU6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVyIH0pIHtcbiAgICBpZiAoIShpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpXG4gICAgICAgICAgJiYgYXV0b1Njcm9sbC5jaGVjayhpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpbnRlcmFjdGlvbi5zaW11bGF0aW9uKSB7XG4gICAgICBhdXRvU2Nyb2xsLnggPSBhdXRvU2Nyb2xsLnkgPSAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB0b3A7XG4gICAgbGV0IHJpZ2h0O1xuICAgIGxldCBib3R0b207XG4gICAgbGV0IGxlZnQ7XG5cbiAgICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uYXV0b1Njcm9sbDtcbiAgICBjb25zdCBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBnZXRXaW5kb3coaW50ZXJhY3Rpb24uZWxlbWVudCk7XG5cbiAgICBpZiAoaXMud2luZG93KGNvbnRhaW5lcikpIHtcbiAgICAgIGxlZnQgICA9IHBvaW50ZXIuY2xpZW50WCA8IGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgdG9wICAgID0gcG9pbnRlci5jbGllbnRZIDwgYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICByaWdodCAgPSBwb2ludGVyLmNsaWVudFggPiBjb250YWluZXIuaW5uZXJXaWR0aCAgLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIGJvdHRvbSA9IHBvaW50ZXIuY2xpZW50WSA+IGNvbnRhaW5lci5pbm5lckhlaWdodCAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHJlY3QgPSBkb21VdGlscy5nZXRFbGVtZW50Q2xpZW50UmVjdChjb250YWluZXIpO1xuXG4gICAgICBsZWZ0ICAgPSBwb2ludGVyLmNsaWVudFggPCByZWN0LmxlZnQgICArIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgdG9wICAgID0gcG9pbnRlci5jbGllbnRZIDwgcmVjdC50b3AgICAgKyBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIHJpZ2h0ICA9IHBvaW50ZXIuY2xpZW50WCA+IHJlY3QucmlnaHQgIC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICBib3R0b20gPSBwb2ludGVyLmNsaWVudFkgPiByZWN0LmJvdHRvbSAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgIH1cblxuICAgIGF1dG9TY3JvbGwueCA9IChyaWdodCA/IDE6IGxlZnQ/IC0xOiAwKTtcbiAgICBhdXRvU2Nyb2xsLnkgPSAoYm90dG9tPyAxOiAgdG9wPyAtMTogMCk7XG5cbiAgICBpZiAoIWF1dG9TY3JvbGwuaXNTY3JvbGxpbmcpIHtcbiAgICAgIC8vIHNldCB0aGUgYXV0b1Njcm9sbCBwcm9wZXJ0aWVzIHRvIHRob3NlIG9mIHRoZSB0YXJnZXRcbiAgICAgIGF1dG9TY3JvbGwubWFyZ2luID0gb3B0aW9ucy5tYXJnaW47XG4gICAgICBhdXRvU2Nyb2xsLnNwZWVkICA9IG9wdGlvbnMuc3BlZWQ7XG5cbiAgICAgIGF1dG9TY3JvbGwuc3RhcnQoaW50ZXJhY3Rpb24pO1xuICAgIH1cbiAgfSxcbn07XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AtYWN0aXZlJywgZnVuY3Rpb24gKCkge1xuICBhdXRvU2Nyb2xsLnN0b3AoKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tbW92ZScsIGF1dG9TY3JvbGwub25JbnRlcmFjdGlvbk1vdmUpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24uYXV0b1Njcm9sbCA9IGF1dG9TY3JvbGwuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gYXV0b1Njcm9sbDtcbiIsImNvbnN0IHsgd2luZG93IH0gPSByZXF1aXJlKCcuL3dpbmRvdycpO1xuXG5jb25zdCB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcbmxldCBsYXN0VGltZSA9IDA7XG5sZXQgcmVxdWVzdDtcbmxldCBjYW5jZWw7XG5cbmZvciAobGV0IHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IHgrKykge1xuICByZXF1ZXN0ID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gIGNhbmNlbCA9IHdpbmRvd1t2ZW5kb3JzW3hdICsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbn1cblxuaWYgKCFyZXF1ZXN0KSB7XG4gIHJlcXVlc3QgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBjb25zdCBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgY29uc3QgaWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVRvQ2FsbCk7XG5cbiAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICByZXR1cm4gaWQ7XG4gIH07XG59XG5cbmlmICghY2FuY2VsKSB7XG4gIGNhbmNlbCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIGNsZWFyVGltZW91dChpZCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXF1ZXN0LFxuICBjYW5jZWwsXG59O1xuIiwiY29uc3QgYWN0aW9ucyAgICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IGJyb3dzZXIgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvYnJvd3NlcicpO1xuY29uc3QgSW50ZXJhY3RFdmVudCAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG4vKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xuY29uc3QgSW50ZXJhY3RhYmxlICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxuLy8gTGVzcyBQcmVjaXNpb24gd2l0aCB0b3VjaCBpbnB1dFxuY29uc3QgZGVmYXVsdE1hcmdpbiA9IGJyb3dzZXIuc3VwcG9ydHNUb3VjaCB8fCBicm93c2VyLnN1cHBvcnRzUG9pbnRlckV2ZW50PyAyMDogMTA7XG5cbmNvbnN0IHJlc2l6ZSA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkICAgICA6IGZhbHNlLFxuICAgIG1vdXNlQnV0dG9uczogbnVsbCxcblxuICAgIG9yaWdpbiAgICA6IG51bGwsXG4gICAgc25hcCAgICAgIDogbnVsbCxcbiAgICByZXN0cmljdCAgOiBudWxsLFxuICAgIGluZXJ0aWEgICA6IG51bGwsXG4gICAgYXV0b1Njcm9sbDogbnVsbCxcblxuICAgIHNxdWFyZTogZmFsc2UsXG4gICAgcHJlc2VydmVBc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgYXhpczogJ3h5JyxcblxuICAgIC8vIHVzZSBkZWZhdWx0IG1hcmdpblxuICAgIG1hcmdpbjogTmFOLFxuXG4gICAgLy8gb2JqZWN0IHdpdGggcHJvcHMgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tIHdoaWNoIGFyZVxuICAgIC8vIHRydWUvZmFsc2UgdmFsdWVzIHRvIHJlc2l6ZSB3aGVuIHRoZSBwb2ludGVyIGlzIG92ZXIgdGhhdCBlZGdlLFxuICAgIC8vIENTUyBzZWxlY3RvcnMgdG8gbWF0Y2ggdGhlIGhhbmRsZXMgZm9yIGVhY2ggZGlyZWN0aW9uXG4gICAgLy8gb3IgdGhlIEVsZW1lbnRzIGZvciBlYWNoIGhhbmRsZVxuICAgIGVkZ2VzOiBudWxsLFxuXG4gICAgLy8gYSB2YWx1ZSBvZiAnbm9uZScgd2lsbCBsaW1pdCB0aGUgcmVzaXplIHJlY3QgdG8gYSBtaW5pbXVtIG9mIDB4MFxuICAgIC8vICduZWdhdGUnIHdpbGwgYWxvdyB0aGUgcmVjdCB0byBoYXZlIG5lZ2F0aXZlIHdpZHRoL2hlaWdodFxuICAgIC8vICdyZXBvc2l0aW9uJyB3aWxsIGtlZXAgdGhlIHdpZHRoL2hlaWdodCBwb3NpdGl2ZSBieSBzd2FwcGluZ1xuICAgIC8vIHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcyBhbmQvb3Igc3dhcHBpbmcgdGhlIGxlZnQgYW5kIHJpZ2h0IGVkZ2VzXG4gICAgaW52ZXJ0OiAnbm9uZScsXG4gIH0sXG5cbiAgY2hlY2tlcjogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uLCByZWN0KSB7XG4gICAgaWYgKCFyZWN0KSB7IHJldHVybiBudWxsOyB9XG5cbiAgICBjb25zdCBwYWdlID0gdXRpbHMuZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zO1xuXG4gICAgaWYgKG9wdGlvbnMucmVzaXplLmVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IHJlc2l6ZU9wdGlvbnMgPSBvcHRpb25zLnJlc2l6ZTtcbiAgICAgIGNvbnN0IHJlc2l6ZUVkZ2VzID0geyBsZWZ0OiBmYWxzZSwgcmlnaHQ6IGZhbHNlLCB0b3A6IGZhbHNlLCBib3R0b206IGZhbHNlIH07XG5cbiAgICAgIC8vIGlmIHVzaW5nIHJlc2l6ZS5lZGdlc1xuICAgICAgaWYgKHV0aWxzLmlzLm9iamVjdChyZXNpemVPcHRpb25zLmVkZ2VzKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGVkZ2UgaW4gcmVzaXplRWRnZXMpIHtcbiAgICAgICAgICByZXNpemVFZGdlc1tlZGdlXSA9IGNoZWNrUmVzaXplRWRnZShlZGdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZU9wdGlvbnMuZWRnZXNbZWRnZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5fZXZlbnRUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZU9wdGlvbnMubWFyZ2luIHx8IGRlZmF1bHRNYXJnaW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzaXplRWRnZXMubGVmdCA9IHJlc2l6ZUVkZ2VzLmxlZnQgJiYgIXJlc2l6ZUVkZ2VzLnJpZ2h0O1xuICAgICAgICByZXNpemVFZGdlcy50b3AgID0gcmVzaXplRWRnZXMudG9wICAmJiAhcmVzaXplRWRnZXMuYm90dG9tO1xuXG4gICAgICAgIGlmIChyZXNpemVFZGdlcy5sZWZ0IHx8IHJlc2l6ZUVkZ2VzLnJpZ2h0IHx8IHJlc2l6ZUVkZ2VzLnRvcCB8fCByZXNpemVFZGdlcy5ib3R0b20pIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogJ3Jlc2l6ZScsXG4gICAgICAgICAgICBlZGdlczogcmVzaXplRWRnZXMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHJpZ2h0ICA9IG9wdGlvbnMucmVzaXplLmF4aXMgIT09ICd5JyAmJiBwYWdlLnggPiAocmVjdC5yaWdodCAgLSBkZWZhdWx0TWFyZ2luKTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gb3B0aW9ucy5yZXNpemUuYXhpcyAhPT0gJ3gnICYmIHBhZ2UueSA+IChyZWN0LmJvdHRvbSAtIGRlZmF1bHRNYXJnaW4pO1xuXG4gICAgICAgIGlmIChyaWdodCB8fCBib3R0b20pIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogJ3Jlc2l6ZScsXG4gICAgICAgICAgICBheGVzOiAocmlnaHQ/ICd4JyA6ICcnKSArIChib3R0b20/ICd5JyA6ICcnKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgY3Vyc29yczogKGJyb3dzZXIuaXNJZTkgPyB7XG4gICAgeCA6ICdlLXJlc2l6ZScsXG4gICAgeSA6ICdzLXJlc2l6ZScsXG4gICAgeHk6ICdzZS1yZXNpemUnLFxuXG4gICAgdG9wICAgICAgICA6ICduLXJlc2l6ZScsXG4gICAgbGVmdCAgICAgICA6ICd3LXJlc2l6ZScsXG4gICAgYm90dG9tICAgICA6ICdzLXJlc2l6ZScsXG4gICAgcmlnaHQgICAgICA6ICdlLXJlc2l6ZScsXG4gICAgdG9wbGVmdCAgICA6ICdzZS1yZXNpemUnLFxuICAgIGJvdHRvbXJpZ2h0OiAnc2UtcmVzaXplJyxcbiAgICB0b3ByaWdodCAgIDogJ25lLXJlc2l6ZScsXG4gICAgYm90dG9tbGVmdCA6ICduZS1yZXNpemUnLFxuICB9IDoge1xuICAgIHggOiAnZXctcmVzaXplJyxcbiAgICB5IDogJ25zLXJlc2l6ZScsXG4gICAgeHk6ICdud3NlLXJlc2l6ZScsXG5cbiAgICB0b3AgICAgICAgIDogJ25zLXJlc2l6ZScsXG4gICAgbGVmdCAgICAgICA6ICdldy1yZXNpemUnLFxuICAgIGJvdHRvbSAgICAgOiAnbnMtcmVzaXplJyxcbiAgICByaWdodCAgICAgIDogJ2V3LXJlc2l6ZScsXG4gICAgdG9wbGVmdCAgICA6ICdud3NlLXJlc2l6ZScsXG4gICAgYm90dG9tcmlnaHQ6ICdud3NlLXJlc2l6ZScsXG4gICAgdG9wcmlnaHQgICA6ICduZXN3LXJlc2l6ZScsXG4gICAgYm90dG9tbGVmdCA6ICduZXN3LXJlc2l6ZScsXG4gIH0pLFxuXG4gIGdldEN1cnNvcjogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgIGlmIChhY3Rpb24uYXhpcykge1xuICAgICAgcmV0dXJuIHJlc2l6ZS5jdXJzb3JzW2FjdGlvbi5uYW1lICsgYWN0aW9uLmF4aXNdO1xuICAgIH1cbiAgICBlbHNlIGlmIChhY3Rpb24uZWRnZXMpIHtcbiAgICAgIGxldCBjdXJzb3JLZXkgPSAnJztcbiAgICAgIGNvbnN0IGVkZ2VOYW1lcyA9IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0J107XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGlmIChhY3Rpb24uZWRnZXNbZWRnZU5hbWVzW2ldXSkge1xuICAgICAgICAgIGN1cnNvcktleSArPSBlZGdlTmFtZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc2l6ZS5jdXJzb3JzW2N1cnNvcktleV07XG4gICAgfVxuICB9LFxufTtcblxuLy8gcmVzaXplc3RhcnRcbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKHsgaUV2ZW50LCBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ3Jlc2l6ZXN0YXJ0JyB8fCAhaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdGFydFJlY3QgPSBpbnRlcmFjdGlvbi50YXJnZXQuZ2V0UmVjdChpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgY29uc3QgcmVzaXplT3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLnJlc2l6ZTtcblxuICAvKlxuICAgKiBXaGVuIHVzaW5nIHRoZSBgcmVzaXphYmxlLnNxdWFyZWAgb3IgYHJlc2l6YWJsZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCBvcHRpb25zLCByZXNpemluZyBmcm9tIG9uZSBlZGdlXG4gICAqIHdpbGwgYWZmZWN0IGFub3RoZXIuIEUuZy4gd2l0aCBgcmVzaXphYmxlLnNxdWFyZWAsIHJlc2l6aW5nIHRvIG1ha2UgdGhlIHJpZ2h0IGVkZ2UgbGFyZ2VyIHdpbGwgbWFrZVxuICAgKiB0aGUgYm90dG9tIGVkZ2UgbGFyZ2VyIGJ5IHRoZSBzYW1lIGFtb3VudC4gV2UgY2FsbCB0aGVzZSAnbGlua2VkJyBlZGdlcy4gQW55IGxpbmtlZCBlZGdlcyB3aWxsIGRlcGVuZFxuICAgKiBvbiB0aGUgYWN0aXZlIGVkZ2VzIGFuZCB0aGUgZWRnZSBiZWluZyBpbnRlcmFjdGVkIHdpdGguXG4gICAqL1xuICBpZiAocmVzaXplT3B0aW9ucy5zcXVhcmUgfHwgcmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSB7XG4gICAgY29uc3QgbGlua2VkRWRnZXMgPSB1dGlscy5leHRlbmQoe30sIGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzKTtcblxuICAgIGxpbmtlZEVkZ2VzLnRvcCAgICA9IGxpbmtlZEVkZ2VzLnRvcCAgICB8fCAobGlua2VkRWRnZXMubGVmdCAgICYmICFsaW5rZWRFZGdlcy5ib3R0b20pO1xuICAgIGxpbmtlZEVkZ2VzLmxlZnQgICA9IGxpbmtlZEVkZ2VzLmxlZnQgICB8fCAobGlua2VkRWRnZXMudG9wICAgICYmICFsaW5rZWRFZGdlcy5yaWdodCApO1xuICAgIGxpbmtlZEVkZ2VzLmJvdHRvbSA9IGxpbmtlZEVkZ2VzLmJvdHRvbSB8fCAobGlua2VkRWRnZXMucmlnaHQgICYmICFsaW5rZWRFZGdlcy50b3AgICApO1xuICAgIGxpbmtlZEVkZ2VzLnJpZ2h0ICA9IGxpbmtlZEVkZ2VzLnJpZ2h0ICB8fCAobGlua2VkRWRnZXMuYm90dG9tICYmICFsaW5rZWRFZGdlcy5sZWZ0ICApO1xuXG4gICAgaW50ZXJhY3Rpb24ucHJlcGFyZWQuX2xpbmtlZEVkZ2VzID0gbGlua2VkRWRnZXM7XG4gIH1cbiAgZWxzZSB7XG4gICAgaW50ZXJhY3Rpb24ucHJlcGFyZWQuX2xpbmtlZEVkZ2VzID0gbnVsbDtcbiAgfVxuXG4gIC8vIGlmIHVzaW5nIGByZXNpemFibGUucHJlc2VydmVBc3BlY3RSYXRpb2Agb3B0aW9uLCByZWNvcmQgYXNwZWN0IHJhdGlvIGF0IHRoZSBzdGFydCBvZiB0aGUgcmVzaXplXG4gIGlmIChyZXNpemVPcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8pIHtcbiAgICBpbnRlcmFjdGlvbi5yZXNpemVTdGFydEFzcGVjdFJhdGlvID0gc3RhcnRSZWN0LndpZHRoIC8gc3RhcnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzID0ge1xuICAgIHN0YXJ0ICAgICA6IHN0YXJ0UmVjdCxcbiAgICBjdXJyZW50ICAgOiB1dGlscy5leHRlbmQoe30sIHN0YXJ0UmVjdCksXG4gICAgaW52ZXJ0ZWQgIDogdXRpbHMuZXh0ZW5kKHt9LCBzdGFydFJlY3QpLFxuICAgIHByZXZpb3VzICA6IHV0aWxzLmV4dGVuZCh7fSwgc3RhcnRSZWN0KSxcbiAgICBkZWx0YSAgICAgOiB7XG4gICAgICBsZWZ0OiAwLCByaWdodCA6IDAsIHdpZHRoIDogMCxcbiAgICAgIHRvcCA6IDAsIGJvdHRvbTogMCwgaGVpZ2h0OiAwLFxuICAgIH0sXG4gIH07XG5cbiAgaUV2ZW50LnJlY3QgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5pbnZlcnRlZDtcbiAgaUV2ZW50LmRlbHRhUmVjdCA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmRlbHRhO1xufSk7XG5cbi8vIHJlc2l6ZW1vdmVcbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKHsgaUV2ZW50LCBwaGFzZSwgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAocGhhc2UgIT09ICdtb3ZlJyB8fCAhaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXMpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgcmVzaXplT3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLnJlc2l6ZTtcbiAgY29uc3QgaW52ZXJ0ID0gcmVzaXplT3B0aW9ucy5pbnZlcnQ7XG4gIGNvbnN0IGludmVydGlibGUgPSBpbnZlcnQgPT09ICdyZXBvc2l0aW9uJyB8fCBpbnZlcnQgPT09ICduZWdhdGUnO1xuXG4gIGxldCBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuXG4gIGNvbnN0IHN0YXJ0ICAgICAgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5zdGFydDtcbiAgY29uc3QgY3VycmVudCAgICA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmN1cnJlbnQ7XG4gIGNvbnN0IGludmVydGVkICAgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5pbnZlcnRlZDtcbiAgY29uc3QgZGVsdGEgICAgICA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmRlbHRhO1xuICBjb25zdCBwcmV2aW91cyAgID0gdXRpbHMuZXh0ZW5kKGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLnByZXZpb3VzLCBpbnZlcnRlZCk7XG4gIGNvbnN0IG9yaWdpbmFsRWRnZXMgPSBlZGdlcztcblxuICBsZXQgZHggPSBpRXZlbnQuZHg7XG4gIGxldCBkeSA9IGlFdmVudC5keTtcblxuICBpZiAocmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvIHx8IHJlc2l6ZU9wdGlvbnMuc3F1YXJlKSB7XG4gICAgLy8gYHJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYHJlc2l6ZS5zcXVhcmVgXG4gICAgY29uc3Qgc3RhcnRBc3BlY3RSYXRpbyA9IHJlc2l6ZU9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpb1xuICAgICAgPyBpbnRlcmFjdGlvbi5yZXNpemVTdGFydEFzcGVjdFJhdGlvXG4gICAgICA6IDE7XG5cbiAgICBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLl9saW5rZWRFZGdlcztcblxuICAgIGlmICgob3JpZ2luYWxFZGdlcy5sZWZ0ICYmIG9yaWdpbmFsRWRnZXMuYm90dG9tKVxuICAgICAgICB8fCAob3JpZ2luYWxFZGdlcy5yaWdodCAmJiBvcmlnaW5hbEVkZ2VzLnRvcCkpIHtcbiAgICAgIGR5ID0gLWR4IC8gc3RhcnRBc3BlY3RSYXRpbztcbiAgICB9XG4gICAgZWxzZSBpZiAob3JpZ2luYWxFZGdlcy5sZWZ0IHx8IG9yaWdpbmFsRWRnZXMucmlnaHQgKSB7IGR5ID0gZHggLyBzdGFydEFzcGVjdFJhdGlvOyB9XG4gICAgZWxzZSBpZiAob3JpZ2luYWxFZGdlcy50b3AgIHx8IG9yaWdpbmFsRWRnZXMuYm90dG9tKSB7IGR4ID0gZHkgKiBzdGFydEFzcGVjdFJhdGlvOyB9XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlICdjdXJyZW50JyByZWN0IHdpdGhvdXQgbW9kaWZpY2F0aW9uc1xuICBpZiAoZWRnZXMudG9wICAgKSB7IGN1cnJlbnQudG9wICAgICs9IGR5OyB9XG4gIGlmIChlZGdlcy5ib3R0b20pIHsgY3VycmVudC5ib3R0b20gKz0gZHk7IH1cbiAgaWYgKGVkZ2VzLmxlZnQgICkgeyBjdXJyZW50LmxlZnQgICArPSBkeDsgfVxuICBpZiAoZWRnZXMucmlnaHQgKSB7IGN1cnJlbnQucmlnaHQgICs9IGR4OyB9XG5cbiAgaWYgKGludmVydGlibGUpIHtcbiAgICAvLyBpZiBpbnZlcnRpYmxlLCBjb3B5IHRoZSBjdXJyZW50IHJlY3RcbiAgICB1dGlscy5leHRlbmQoaW52ZXJ0ZWQsIGN1cnJlbnQpO1xuXG4gICAgaWYgKGludmVydCA9PT0gJ3JlcG9zaXRpb24nKSB7XG4gICAgICAvLyBzd2FwIGVkZ2UgdmFsdWVzIGlmIG5lY2Vzc2FyeSB0byBrZWVwIHdpZHRoL2hlaWdodCBwb3NpdGl2ZVxuICAgICAgbGV0IHN3YXA7XG5cbiAgICAgIGlmIChpbnZlcnRlZC50b3AgPiBpbnZlcnRlZC5ib3R0b20pIHtcbiAgICAgICAgc3dhcCA9IGludmVydGVkLnRvcDtcblxuICAgICAgICBpbnZlcnRlZC50b3AgPSBpbnZlcnRlZC5ib3R0b207XG4gICAgICAgIGludmVydGVkLmJvdHRvbSA9IHN3YXA7XG4gICAgICB9XG4gICAgICBpZiAoaW52ZXJ0ZWQubGVmdCA+IGludmVydGVkLnJpZ2h0KSB7XG4gICAgICAgIHN3YXAgPSBpbnZlcnRlZC5sZWZ0O1xuXG4gICAgICAgIGludmVydGVkLmxlZnQgPSBpbnZlcnRlZC5yaWdodDtcbiAgICAgICAgaW52ZXJ0ZWQucmlnaHQgPSBzd2FwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBpZiBub3QgaW52ZXJ0aWJsZSwgcmVzdHJpY3QgdG8gbWluaW11bSBvZiAweDAgcmVjdFxuICAgIGludmVydGVkLnRvcCAgICA9IE1hdGgubWluKGN1cnJlbnQudG9wLCBzdGFydC5ib3R0b20pO1xuICAgIGludmVydGVkLmJvdHRvbSA9IE1hdGgubWF4KGN1cnJlbnQuYm90dG9tLCBzdGFydC50b3ApO1xuICAgIGludmVydGVkLmxlZnQgICA9IE1hdGgubWluKGN1cnJlbnQubGVmdCwgc3RhcnQucmlnaHQpO1xuICAgIGludmVydGVkLnJpZ2h0ICA9IE1hdGgubWF4KGN1cnJlbnQucmlnaHQsIHN0YXJ0LmxlZnQpO1xuICB9XG5cbiAgaW52ZXJ0ZWQud2lkdGggID0gaW52ZXJ0ZWQucmlnaHQgIC0gaW52ZXJ0ZWQubGVmdDtcbiAgaW52ZXJ0ZWQuaGVpZ2h0ID0gaW52ZXJ0ZWQuYm90dG9tIC0gaW52ZXJ0ZWQudG9wIDtcblxuICBmb3IgKGNvbnN0IGVkZ2UgaW4gaW52ZXJ0ZWQpIHtcbiAgICBkZWx0YVtlZGdlXSA9IGludmVydGVkW2VkZ2VdIC0gcHJldmlvdXNbZWRnZV07XG4gIH1cblxuICBpRXZlbnQuZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcztcbiAgaUV2ZW50LnJlY3QgPSBpbnZlcnRlZDtcbiAgaUV2ZW50LmRlbHRhUmVjdCA9IGRlbHRhO1xufSk7XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KGVsZW1lbnQpLnJlc2l6YWJsZSh7XG4gKiAgIG9uc3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgIG9ubW92ZSA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgIG9uZW5kICA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKlxuICogICBlZGdlczoge1xuICogICAgIHRvcCAgIDogdHJ1ZSwgICAgICAgLy8gVXNlIHBvaW50ZXIgY29vcmRzIHRvIGNoZWNrIGZvciByZXNpemUuXG4gKiAgICAgbGVmdCAgOiBmYWxzZSwgICAgICAvLyBEaXNhYmxlIHJlc2l6aW5nIGZyb20gbGVmdCBlZGdlLlxuICogICAgIGJvdHRvbTogJy5yZXNpemUtcycsLy8gUmVzaXplIGlmIHBvaW50ZXIgdGFyZ2V0IG1hdGNoZXMgc2VsZWN0b3JcbiAqICAgICByaWdodCA6IGhhbmRsZUVsICAgIC8vIFJlc2l6ZSBpZiBwb2ludGVyIHRhcmdldCBpcyB0aGUgZ2l2ZW4gRWxlbWVudFxuICogICB9LFxuICpcbiAqICAgICAvLyBXaWR0aCBhbmQgaGVpZ2h0IGNhbiBiZSBhZGp1c3RlZCBpbmRlcGVuZGVudGx5LiBXaGVuIGB0cnVlYCwgd2lkdGggYW5kXG4gKiAgICAgLy8gaGVpZ2h0IGFyZSBhZGp1c3RlZCBhdCBhIDE6MSByYXRpby5cbiAqICAgICBzcXVhcmU6IGZhbHNlLFxuICpcbiAqICAgICAvLyBXaWR0aCBhbmQgaGVpZ2h0IGNhbiBiZSBhZGp1c3RlZCBpbmRlcGVuZGVudGx5LiBXaGVuIGB0cnVlYCwgd2lkdGggYW5kXG4gKiAgICAgLy8gaGVpZ2h0IG1haW50YWluIHRoZSBhc3BlY3QgcmF0aW8gdGhleSBoYWQgd2hlbiByZXNpemluZyBzdGFydGVkLlxuICogICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IGZhbHNlLFxuICpcbiAqICAgLy8gYSB2YWx1ZSBvZiAnbm9uZScgd2lsbCBsaW1pdCB0aGUgcmVzaXplIHJlY3QgdG8gYSBtaW5pbXVtIG9mIDB4MFxuICogICAvLyAnbmVnYXRlJyB3aWxsIGFsbG93IHRoZSByZWN0IHRvIGhhdmUgbmVnYXRpdmUgd2lkdGgvaGVpZ2h0XG4gKiAgIC8vICdyZXBvc2l0aW9uJyB3aWxsIGtlZXAgdGhlIHdpZHRoL2hlaWdodCBwb3NpdGl2ZSBieSBzd2FwcGluZ1xuICogICAvLyB0aGUgdG9wIGFuZCBib3R0b20gZWRnZXMgYW5kL29yIHN3YXBwaW5nIHRoZSBsZWZ0IGFuZCByaWdodCBlZGdlc1xuICogICBpbnZlcnQ6ICdub25lJyB8fCAnbmVnYXRlJyB8fCAncmVwb3NpdGlvbidcbiAqXG4gKiAgIC8vIGxpbWl0IG11bHRpcGxlIHJlc2l6ZXMuXG4gKiAgIC8vIFNlZSB0aGUgZXhwbGFuYXRpb24gaW4gdGhlIHtAbGluayBJbnRlcmFjdGFibGUuZHJhZ2dhYmxlfSBleGFtcGxlXG4gKiAgIG1heDogSW5maW5pdHksXG4gKiAgIG1heFBlckVsZW1lbnQ6IDEsXG4gKiB9KTtcbiAqXG4gKiB2YXIgaXNSZXNpemVhYmxlID0gaW50ZXJhY3QoZWxlbWVudCkucmVzaXphYmxlKCk7XG4gKiBgYGBcbiAqXG4gKiBHZXRzIG9yIHNldHMgd2hldGhlciByZXNpemUgYWN0aW9ucyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3R9IFtvcHRpb25zXSB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50XG4gKiBsaXN0ZW5lcnMgdG8gYmUgZmlyZWQgb24gcmVzaXplIGV2ZW50cyAob2JqZWN0IG1ha2VzIHRoZSBJbnRlcmFjdGFibGVcbiAqIHJlc2l6YWJsZSlcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IEEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoaXMgY2FuIGJlIHRoZVxuICogdGFyZ2V0IG9mIHJlc2l6ZSBlbGVtZW50cywgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5yZXNpemFibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZT8gZmFsc2U6IHRydWU7XG4gICAgdGhpcy5zZXRQZXJBY3Rpb24oJ3Jlc2l6ZScsIG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0T25FdmVudHMoJ3Jlc2l6ZScsIG9wdGlvbnMpO1xuXG4gICAgaWYgKC9eeCR8XnkkfF54eSQvLnRlc3Qob3B0aW9ucy5heGlzKSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5heGlzID0gb3B0aW9ucy5heGlzO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcHRpb25zLmF4aXMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuYXhpcyA9IGRlZmF1bHRPcHRpb25zLnJlc2l6ZS5heGlzO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUucHJlc2VydmVBc3BlY3RSYXRpbyA9IG9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbztcbiAgICB9XG4gICAgZWxzZSBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zLnNxdWFyZSkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuc3F1YXJlID0gb3B0aW9ucy5zcXVhcmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVzaXplLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aGlzLm9ucmVzaXplc3RhcnQgPSB0aGlzLm9ucmVzaXplc3RhcnQgPSB0aGlzLm9ucmVzaXplZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gdGhpcy5vcHRpb25zLnJlc2l6ZTtcbn07XG5cbmZ1bmN0aW9uIGNoZWNrUmVzaXplRWRnZSAobmFtZSwgdmFsdWUsIHBhZ2UsIGVsZW1lbnQsIGludGVyYWN0YWJsZUVsZW1lbnQsIHJlY3QsIG1hcmdpbikge1xuICAvLyBmYWxzZSwgJycsIHVuZGVmaW5lZCwgbnVsbFxuICBpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIHRydWUgdmFsdWUsIHVzZSBwb2ludGVyIGNvb3JkcyBhbmQgZWxlbWVudCByZWN0XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIC8vIGlmIGRpbWVuc2lvbnMgYXJlIG5lZ2F0aXZlLCBcInN3aXRjaFwiIGVkZ2VzXG4gICAgY29uc3Qgd2lkdGggID0gdXRpbHMuaXMubnVtYmVyKHJlY3Qud2lkdGggKT8gcmVjdC53aWR0aCAgOiByZWN0LnJpZ2h0ICAtIHJlY3QubGVmdDtcbiAgICBjb25zdCBoZWlnaHQgPSB1dGlscy5pcy5udW1iZXIocmVjdC5oZWlnaHQpPyByZWN0LmhlaWdodCA6IHJlY3QuYm90dG9tIC0gcmVjdC50b3AgO1xuXG4gICAgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgaWYgICAgICAobmFtZSA9PT0gJ2xlZnQnICkgeyBuYW1lID0gJ3JpZ2h0JzsgfVxuICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ3JpZ2h0JykgeyBuYW1lID0gJ2xlZnQnIDsgfVxuICAgIH1cbiAgICBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgaWYgICAgICAobmFtZSA9PT0gJ3RvcCcgICApIHsgbmFtZSA9ICdib3R0b20nOyB9XG4gICAgICBlbHNlIGlmIChuYW1lID09PSAnYm90dG9tJykgeyBuYW1lID0gJ3RvcCcgICA7IH1cbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gJ2xlZnQnICApIHsgcmV0dXJuIHBhZ2UueCA8ICgod2lkdGggID49IDA/IHJlY3QubGVmdDogcmVjdC5yaWdodCApICsgbWFyZ2luKTsgfVxuICAgIGlmIChuYW1lID09PSAndG9wJyAgICkgeyByZXR1cm4gcGFnZS55IDwgKChoZWlnaHQgPj0gMD8gcmVjdC50b3AgOiByZWN0LmJvdHRvbSkgKyBtYXJnaW4pOyB9XG5cbiAgICBpZiAobmFtZSA9PT0gJ3JpZ2h0JyApIHsgcmV0dXJuIHBhZ2UueCA+ICgod2lkdGggID49IDA/IHJlY3QucmlnaHQgOiByZWN0LmxlZnQpIC0gbWFyZ2luKTsgfVxuICAgIGlmIChuYW1lID09PSAnYm90dG9tJykgeyByZXR1cm4gcGFnZS55ID4gKChoZWlnaHQgPj0gMD8gcmVjdC5ib3R0b206IHJlY3QudG9wICkgLSBtYXJnaW4pOyB9XG4gIH1cblxuICAvLyB0aGUgcmVtYWluaW5nIGNoZWNrcyByZXF1aXJlIGFuIGVsZW1lbnRcbiAgaWYgKCF1dGlscy5pcy5lbGVtZW50KGVsZW1lbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHJldHVybiB1dGlscy5pcy5lbGVtZW50KHZhbHVlKVxuICAvLyB0aGUgdmFsdWUgaXMgYW4gZWxlbWVudCB0byB1c2UgYXMgYSByZXNpemUgaGFuZGxlXG4gICAgPyB2YWx1ZSA9PT0gZWxlbWVudFxuICAgIC8vIG90aGVyd2lzZSBjaGVjayBpZiBlbGVtZW50IG1hdGNoZXMgdmFsdWUgYXMgc2VsZWN0b3JcbiAgICA6IHV0aWxzLm1hdGNoZXNVcFRvKGVsZW1lbnQsIHZhbHVlLCBpbnRlcmFjdGFibGVFbGVtZW50KTtcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPSAneHknO1xufSk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignc2V0LWRlbHRhJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGlFdmVudCwgYWN0aW9uIH0pIHtcbiAgaWYgKGFjdGlvbiAhPT0gJ3Jlc2l6ZScgfHwgIWludGVyYWN0aW9uLnJlc2l6ZUF4ZXMpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLnJlc2l6ZS5zcXVhcmUpIHtcbiAgICBpZiAoaW50ZXJhY3Rpb24ucmVzaXplQXhlcyA9PT0gJ3knKSB7XG4gICAgICBpRXZlbnQuZHggPSBpRXZlbnQuZHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaUV2ZW50LmR5ID0gaUV2ZW50LmR4O1xuICAgIH1cbiAgICBpRXZlbnQuYXhlcyA9ICd4eSc7XG4gIH1cbiAgZWxzZSB7XG4gICAgaUV2ZW50LmF4ZXMgPSBpbnRlcmFjdGlvbi5yZXNpemVBeGVzO1xuXG4gICAgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd4Jykge1xuICAgICAgaUV2ZW50LmR5ID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaW50ZXJhY3Rpb24ucmVzaXplQXhlcyA9PT0gJ3knKSB7XG4gICAgICBpRXZlbnQuZHggPSAwO1xuICAgIH1cbiAgfVxufSk7XG5cbmFjdGlvbnMucmVzaXplID0gcmVzaXplO1xuYWN0aW9ucy5uYW1lcy5wdXNoKCdyZXNpemUnKTtcbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbXG4gICdyZXNpemVzdGFydCcsXG4gICdyZXNpemVtb3ZlJyxcbiAgJ3Jlc2l6ZWluZXJ0aWFzdGFydCcsXG4gICdyZXNpemVpbmVydGlhcmVzdW1lJyxcbiAgJ3Jlc2l6ZWVuZCcsXG5dKTtcbmFjdGlvbnMubWV0aG9kRGljdC5yZXNpemUgPSAncmVzaXphYmxlJztcblxuZGVmYXVsdE9wdGlvbnMucmVzaXplID0gcmVzaXplLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc2l6ZTtcbiIsImNvbnN0IGFjdGlvbnMgICAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBJbnRlcmFjdEV2ZW50ICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcbmNvbnN0IEludGVyYWN0YWJsZSAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbmNvbnN0IGdlc3R1cmUgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZCA6IGZhbHNlLFxuICAgIG9yaWdpbiAgOiBudWxsLFxuICAgIHJlc3RyaWN0OiBudWxsLFxuICB9LFxuXG4gIGNoZWNrZXI6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbikge1xuICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVySWRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICByZXR1cm4geyBuYW1lOiAnZ2VzdHVyZScgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBnZXRDdXJzb3I6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJyc7XG4gIH0sXG59O1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uICh7IGlFdmVudCwgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdnZXN0dXJlc3RhcnQnKSB7IHJldHVybjsgfVxuICBpRXZlbnQuZHMgPSAwO1xuXG4gIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnREaXN0YW5jZSA9IGludGVyYWN0aW9uLmdlc3R1cmUucHJldkRpc3RhbmNlID0gaUV2ZW50LmRpc3RhbmNlO1xuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0QW5nbGUgPSBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZSA9IGlFdmVudC5hbmdsZTtcbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5zY2FsZSA9IDE7XG59KTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoeyBpRXZlbnQsIGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKGlFdmVudC50eXBlICE9PSAnZ2VzdHVyZW1vdmUnKSB7IHJldHVybjsgfVxuXG4gIGlFdmVudC5kcyA9IGlFdmVudC5zY2FsZSAtIGludGVyYWN0aW9uLmdlc3R1cmUuc2NhbGU7XG5cbiAgaW50ZXJhY3Rpb24udGFyZ2V0LmZpcmUoaUV2ZW50KTtcblxuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZSA9IGlFdmVudC5hbmdsZTtcbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2RGlzdGFuY2UgPSBpRXZlbnQuZGlzdGFuY2U7XG5cbiAgaWYgKGlFdmVudC5zY2FsZSAhPT0gSW5maW5pdHlcbiAgICAgICYmIGlFdmVudC5zY2FsZSAhPT0gbnVsbFxuICAgICAgJiYgaUV2ZW50LnNjYWxlICE9PSB1bmRlZmluZWRcbiAgICAgICYmICFpc05hTihpRXZlbnQuc2NhbGUpKSB7XG5cbiAgICBpbnRlcmFjdGlvbi5nZXN0dXJlLnNjYWxlID0gaUV2ZW50LnNjYWxlO1xuICB9XG59KTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoZWxlbWVudCkuZ2VzdHVyYWJsZSh7XG4gKiAgICAgb25zdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgICBvbm1vdmUgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICAgIG9uZW5kICA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKlxuICogICAgIC8vIGxpbWl0IG11bHRpcGxlIGdlc3R1cmVzLlxuICogICAgIC8vIFNlZSB0aGUgZXhwbGFuYXRpb24gaW4ge0BsaW5rIEludGVyYWN0YWJsZS5kcmFnZ2FibGV9IGV4YW1wbGVcbiAqICAgICBtYXg6IEluZmluaXR5LFxuICogICAgIG1heFBlckVsZW1lbnQ6IDEsXG4gKiB9KTtcbiAqXG4gKiB2YXIgaXNHZXN0dXJlYWJsZSA9IGludGVyYWN0KGVsZW1lbnQpLmdlc3R1cmFibGUoKTtcbiAqIGBgYFxuICpcbiAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIG11bHRpdG91Y2ggZ2VzdHVyZXMgY2FuIGJlIHBlcmZvcm1lZCBvbiB0aGUgdGFyZ2V0XG4gKlxuICogQHBhcmFtIHtib29sZWFuIHwgb2JqZWN0fSBbb3B0aW9uc10gdHJ1ZS9mYWxzZSBvciBBbiBvYmplY3Qgd2l0aCBldmVudFxuICogbGlzdGVuZXJzIHRvIGJlIGZpcmVkIG9uIGdlc3R1cmUgZXZlbnRzIChtYWtlcyB0aGUgSW50ZXJhY3RhYmxlIGdlc3R1cmFibGUpXG4gKiBAcmV0dXJuIHtib29sZWFuIHwgSW50ZXJhY3RhYmxlfSBBIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGlzIGNhbiBiZSB0aGVcbiAqIHRhcmdldCBvZiBnZXN0dXJlIGV2ZW50cywgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5nZXN0dXJhYmxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLm9iamVjdChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5nZXN0dXJlLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcbiAgICB0aGlzLnNldFBlckFjdGlvbignZ2VzdHVyZScsIG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0T25FdmVudHMoJ2dlc3R1cmUnLCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkID0gb3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhpcy5vbmdlc3R1cmVzdGFydCA9IHRoaXMub25nZXN0dXJlc3RhcnQgPSB0aGlzLm9uZ2VzdHVyZWVuZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLmdlc3R1cmU7XG59O1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ3NldC1kZWx0YScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBpRXZlbnQsIGFjdGlvbiwgZXZlbnQsIHN0YXJ0aW5nLCBlbmRpbmcsIGRlbHRhU291cmNlIH0pIHtcbiAgaWYgKGFjdGlvbiAhPT0gJ2dlc3R1cmUnKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IHBvaW50ZXJzID0gaW50ZXJhY3Rpb24ucG9pbnRlcnM7XG5cbiAgaUV2ZW50LnRvdWNoZXMgPSBbcG9pbnRlcnNbMF0sIHBvaW50ZXJzWzFdXTtcblxuICBpZiAoc3RhcnRpbmcpIHtcbiAgICBpRXZlbnQuZGlzdGFuY2UgPSB1dGlscy50b3VjaERpc3RhbmNlKHBvaW50ZXJzLCBkZWx0YVNvdXJjZSk7XG4gICAgaUV2ZW50LmJveCAgICAgID0gdXRpbHMudG91Y2hCQm94KHBvaW50ZXJzKTtcbiAgICBpRXZlbnQuc2NhbGUgICAgPSAxO1xuICAgIGlFdmVudC5kcyAgICAgICA9IDA7XG4gICAgaUV2ZW50LmFuZ2xlICAgID0gdXRpbHMudG91Y2hBbmdsZShwb2ludGVycywgdW5kZWZpbmVkLCBkZWx0YVNvdXJjZSk7XG4gICAgaUV2ZW50LmRhICAgICAgID0gMDtcbiAgfVxuICBlbHNlIGlmIChlbmRpbmcgfHwgZXZlbnQgaW5zdGFuY2VvZiBJbnRlcmFjdEV2ZW50KSB7XG4gICAgaUV2ZW50LmRpc3RhbmNlID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmRpc3RhbmNlO1xuICAgIGlFdmVudC5ib3ggICAgICA9IGludGVyYWN0aW9uLnByZXZFdmVudC5ib3g7XG4gICAgaUV2ZW50LnNjYWxlICAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnNjYWxlO1xuICAgIGlFdmVudC5kcyAgICAgICA9IGlFdmVudC5zY2FsZSAtIDE7XG4gICAgaUV2ZW50LmFuZ2xlICAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmFuZ2xlO1xuICAgIGlFdmVudC5kYSAgICAgICA9IGlFdmVudC5hbmdsZSAtIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnRBbmdsZTtcbiAgfVxuICBlbHNlIHtcbiAgICBpRXZlbnQuZGlzdGFuY2UgPSB1dGlscy50b3VjaERpc3RhbmNlKHBvaW50ZXJzLCBkZWx0YVNvdXJjZSk7XG4gICAgaUV2ZW50LmJveCAgICAgID0gdXRpbHMudG91Y2hCQm94KHBvaW50ZXJzKTtcbiAgICBpRXZlbnQuc2NhbGUgICAgPSBpRXZlbnQuZGlzdGFuY2UgLyBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0RGlzdGFuY2U7XG4gICAgaUV2ZW50LmFuZ2xlICAgID0gdXRpbHMudG91Y2hBbmdsZShwb2ludGVycywgaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGUsIGRlbHRhU291cmNlKTtcblxuICAgIGlFdmVudC5kcyA9IGlFdmVudC5zY2FsZSAtIGludGVyYWN0aW9uLmdlc3R1cmUucHJldlNjYWxlO1xuICAgIGlFdmVudC5kYSA9IGlFdmVudC5hbmdsZSAtIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmdlc3R1cmUgPSB7XG4gICAgc3RhcnQ6IHsgeDogMCwgeTogMCB9LFxuXG4gICAgc3RhcnREaXN0YW5jZTogMCwgICAvLyBkaXN0YW5jZSBiZXR3ZWVuIHR3byB0b3VjaGVzIG9mIHRvdWNoU3RhcnRcbiAgICBwcmV2RGlzdGFuY2UgOiAwLFxuICAgIGRpc3RhbmNlICAgICA6IDAsXG5cbiAgICBzY2FsZTogMSwgICAgICAgICAgIC8vIGdlc3R1cmUuZGlzdGFuY2UgLyBnZXN0dXJlLnN0YXJ0RGlzdGFuY2VcblxuICAgIHN0YXJ0QW5nbGU6IDAsICAgICAgLy8gYW5nbGUgb2YgbGluZSBqb2luaW5nIHR3byB0b3VjaGVzXG4gICAgcHJldkFuZ2xlIDogMCwgICAgICAvLyBhbmdsZSBvZiB0aGUgcHJldmlvdXMgZ2VzdHVyZSBldmVudFxuICB9O1xufSk7XG5cbmFjdGlvbnMuZ2VzdHVyZSA9IGdlc3R1cmU7XG5hY3Rpb25zLm5hbWVzLnB1c2goJ2dlc3R1cmUnKTtcbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbXG4gICdnZXN0dXJlc3RhcnQnLFxuICAnZ2VzdHVyZW1vdmUnLFxuICAnZ2VzdHVyZWVuZCcsXG5dKTtcbmFjdGlvbnMubWV0aG9kRGljdC5nZXN0dXJlID0gJ2dlc3R1cmFibGUnO1xuXG5kZWZhdWx0T3B0aW9ucy5nZXN0dXJlID0gZ2VzdHVyZS5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBnZXN0dXJlO1xuIiwiY29uc3QgYWN0aW9ucyAgICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IHNjb3BlICAgICAgICAgID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbi8qKiBAbGVuZHMgbW9kdWxlOmludGVyYWN0ICovXG5jb25zdCBpbnRlcmFjdCAgICAgICA9IHJlcXVpcmUoJy4uL2ludGVyYWN0Jyk7XG5jb25zdCBJbnRlcmFjdEV2ZW50ICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcbi8qKiBAbGVuZHMgSW50ZXJhY3RhYmxlICovXG5jb25zdCBJbnRlcmFjdGFibGUgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG5jb25zdCBkcm9wID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGFjY2VwdCA6IG51bGwsXG4gICAgb3ZlcmxhcDogJ3BvaW50ZXInLFxuICB9LFxufTtcblxubGV0IGR5bmFtaWNEcm9wID0gZmFsc2U7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1zdGFydCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudCB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICE9PSAnZHJhZycpIHsgcmV0dXJuOyB9XG5cbiAgLy8gcmVzZXQgYWN0aXZlIGRyb3B6b25lc1xuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5kcm9wem9uZXMgPSBbXTtcbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZWxlbWVudHMgID0gW107XG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLnJlY3RzICAgICA9IFtdO1xuXG4gIGludGVyYWN0aW9uLmRyb3BFdmVudHMgPSBudWxsO1xuXG4gIGlmICghaW50ZXJhY3Rpb24uZHluYW1pY0Ryb3ApIHtcbiAgICBzZXRBY3RpdmVEcm9wcyhpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcywgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gIH1cblxuICBjb25zdCBkcmFnRXZlbnQgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQ7XG4gIGNvbnN0IGRyb3BFdmVudHMgPSBnZXREcm9wRXZlbnRzKGludGVyYWN0aW9uLCBldmVudCwgZHJhZ0V2ZW50KTtcblxuICBpZiAoZHJvcEV2ZW50cy5hY3RpdmF0ZSkge1xuICAgIGZpcmVBY3RpdmVEcm9wcyhpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcywgZHJvcEV2ZW50cy5hY3RpdmF0ZSk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBpRXZlbnQsIGV2ZW50IH0pIHtcbiAgaWYgKGlFdmVudC50eXBlICE9PSAnZHJhZ21vdmUnICYmIGlFdmVudC50eXBlICE9PSAnZHJhZ2VuZCcpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgZHJhZ2dhYmxlRWxlbWVudCA9IGludGVyYWN0aW9uLmVsZW1lbnQ7XG4gIGNvbnN0IGRyYWdFdmVudCA9IGlFdmVudDtcbiAgY29uc3QgZHJvcFJlc3VsdCA9IGdldERyb3AoZHJhZ0V2ZW50LCBldmVudCwgZHJhZ2dhYmxlRWxlbWVudCk7XG5cbiAgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCAgPSBkcm9wUmVzdWx0LmRyb3B6b25lO1xuICBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCA9IGRyb3BSZXN1bHQuZWxlbWVudDtcblxuICBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzID0gZ2V0RHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgZXZlbnQsIGRyYWdFdmVudCk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLW1vdmUnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICE9PSAnZHJhZycpIHsgcmV0dXJuOyB9XG5cbiAgZmlyZURyb3BFdmVudHMoaW50ZXJhY3Rpb24sIGludGVyYWN0aW9uLmRyb3BFdmVudHMpO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1lbmQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lID09PSAnZHJhZycpIHtcbiAgICBmaXJlRHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wLWRyYWcnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzID0ge1xuICAgIGRyb3B6b25lczogbnVsbCxcbiAgICBlbGVtZW50czogbnVsbCxcbiAgICByZWN0czogbnVsbCxcbiAgfTtcblxuICBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzID0gbnVsbDtcbn0pO1xuXG5mdW5jdGlvbiBjb2xsZWN0RHJvcHMgKGFjdGl2ZURyb3BzLCBlbGVtZW50KSB7XG4gIGNvbnN0IGRyb3BzID0gW107XG4gIGNvbnN0IGVsZW1lbnRzID0gW107XG5cbiAgLy8gY29sbGVjdCBhbGwgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB3aGljaCBxdWFsaWZ5IGZvciBhIGRyb3BcbiAgZm9yIChjb25zdCBjdXJyZW50IG9mIHNjb3BlLmludGVyYWN0YWJsZXMpIHtcbiAgICBpZiAoIWN1cnJlbnQub3B0aW9ucy5kcm9wLmVuYWJsZWQpIHsgY29udGludWU7IH1cblxuICAgIGNvbnN0IGFjY2VwdCA9IGN1cnJlbnQub3B0aW9ucy5kcm9wLmFjY2VwdDtcblxuICAgIC8vIHRlc3QgdGhlIGRyYWdnYWJsZSBlbGVtZW50IGFnYWluc3QgdGhlIGRyb3B6b25lJ3MgYWNjZXB0IHNldHRpbmdcbiAgICBpZiAoKHV0aWxzLmlzLmVsZW1lbnQoYWNjZXB0KSAmJiBhY2NlcHQgIT09IGVsZW1lbnQpXG4gICAgICAgIHx8ICh1dGlscy5pcy5zdHJpbmcoYWNjZXB0KVxuICAgICAgICAmJiAhdXRpbHMubWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIGFjY2VwdCkpKSB7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHF1ZXJ5IGZvciBuZXcgZWxlbWVudHMgaWYgbmVjZXNzYXJ5XG4gICAgY29uc3QgZHJvcEVsZW1lbnRzID0gdXRpbHMuaXMuc3RyaW5nKGN1cnJlbnQudGFyZ2V0KVxuICAgICAgPyBjdXJyZW50Ll9jb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoY3VycmVudC50YXJnZXQpXG4gICAgICA6IFtjdXJyZW50LnRhcmdldF07XG5cbiAgICBmb3IgKGNvbnN0IGN1cnJlbnRFbGVtZW50IG9mIGRyb3BFbGVtZW50cykge1xuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50ICE9PSBlbGVtZW50KSB7XG4gICAgICAgIGRyb3BzLnB1c2goY3VycmVudCk7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goY3VycmVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZWxlbWVudHMsXG4gICAgZHJvcHpvbmVzOiBkcm9wcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmlyZUFjdGl2ZURyb3BzIChhY3RpdmVEcm9wcywgZXZlbnQpIHtcbiAgbGV0IHByZXZFbGVtZW50O1xuXG4gIC8vIGxvb3AgdGhyb3VnaCBhbGwgYWN0aXZlIGRyb3B6b25lcyBhbmQgdHJpZ2dlciBldmVudFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZURyb3BzLmRyb3B6b25lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBhY3RpdmVEcm9wcy5kcm9wem9uZXNbaV07XG4gICAgY29uc3QgY3VycmVudEVsZW1lbnQgPSBhY3RpdmVEcm9wcy5lbGVtZW50cyBbaV07XG5cbiAgICAvLyBwcmV2ZW50IHRyaWdnZXIgb2YgZHVwbGljYXRlIGV2ZW50cyBvbiBzYW1lIGVsZW1lbnRcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgIT09IHByZXZFbGVtZW50KSB7XG4gICAgICAvLyBzZXQgY3VycmVudCBlbGVtZW50IGFzIGV2ZW50IHRhcmdldFxuICAgICAgZXZlbnQudGFyZ2V0ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBjdXJyZW50LmZpcmUoZXZlbnQpO1xuICAgIH1cbiAgICBwcmV2RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICB9XG59XG5cbi8vIENvbGxlY3QgYSBuZXcgc2V0IG9mIHBvc3NpYmxlIGRyb3BzIGFuZCBzYXZlIHRoZW0gaW4gYWN0aXZlRHJvcHMuXG4vLyBzZXRBY3RpdmVEcm9wcyBzaG91bGQgYWx3YXlzIGJlIGNhbGxlZCB3aGVuIGEgZHJhZyBoYXMganVzdCBzdGFydGVkIG9yIGFcbi8vIGRyYWcgZXZlbnQgaGFwcGVucyB3aGlsZSBkeW5hbWljRHJvcCBpcyB0cnVlXG5mdW5jdGlvbiBzZXRBY3RpdmVEcm9wcyAoYWN0aXZlRHJvcHMsIGRyYWdFbGVtZW50KSB7XG4gIC8vIGdldCBkcm9wem9uZXMgYW5kIHRoZWlyIGVsZW1lbnRzIHRoYXQgY291bGQgcmVjZWl2ZSB0aGUgZHJhZ2dhYmxlXG4gIGNvbnN0IHBvc3NpYmxlRHJvcHMgPSBjb2xsZWN0RHJvcHMoYWN0aXZlRHJvcHMsIGRyYWdFbGVtZW50KTtcblxuICBhY3RpdmVEcm9wcy5kcm9wem9uZXMgPSBwb3NzaWJsZURyb3BzLmRyb3B6b25lcztcbiAgYWN0aXZlRHJvcHMuZWxlbWVudHMgID0gcG9zc2libGVEcm9wcy5lbGVtZW50cztcbiAgYWN0aXZlRHJvcHMucmVjdHMgICAgID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RpdmVEcm9wcy5kcm9wem9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICBhY3RpdmVEcm9wcy5yZWN0c1tpXSA9IGFjdGl2ZURyb3BzLmRyb3B6b25lc1tpXS5nZXRSZWN0KGFjdGl2ZURyb3BzLmVsZW1lbnRzW2ldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREcm9wIChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnRWxlbWVudCkge1xuICBjb25zdCBpbnRlcmFjdGlvbiA9IGRyYWdFdmVudC5pbnRlcmFjdGlvbjtcbiAgY29uc3QgdmFsaWREcm9wcyA9IFtdO1xuXG4gIGlmIChkeW5hbWljRHJvcCkge1xuICAgIHNldEFjdGl2ZURyb3BzKGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLCBkcmFnRWxlbWVudCk7XG4gIH1cblxuICAvLyBjb2xsZWN0IGFsbCBkcm9wem9uZXMgYW5kIHRoZWlyIGVsZW1lbnRzIHdoaWNoIHF1YWxpZnkgZm9yIGEgZHJvcFxuICBmb3IgKGxldCBqID0gMDsgaiA8IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmRyb3B6b25lcy5sZW5ndGg7IGorKykge1xuICAgIGNvbnN0IGN1cnJlbnQgICAgICAgID0gaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZHJvcHpvbmVzW2pdO1xuICAgIGNvbnN0IGN1cnJlbnRFbGVtZW50ID0gaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZWxlbWVudHMgW2pdO1xuICAgIGNvbnN0IHJlY3QgICAgICAgICAgID0gaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMucmVjdHMgICAgW2pdO1xuXG4gICAgdmFsaWREcm9wcy5wdXNoKGN1cnJlbnQuZHJvcENoZWNrKGRyYWdFdmVudCwgZXZlbnQsIGludGVyYWN0aW9uLnRhcmdldCwgZHJhZ0VsZW1lbnQsIGN1cnJlbnRFbGVtZW50LCByZWN0KVxuICAgICAgPyBjdXJyZW50RWxlbWVudFxuICAgICAgOiBudWxsKTtcbiAgfVxuXG4gIC8vIGdldCB0aGUgbW9zdCBhcHByb3ByaWF0ZSBkcm9wem9uZSBiYXNlZCBvbiBET00gZGVwdGggYW5kIG9yZGVyXG4gIGNvbnN0IGRyb3BJbmRleCA9IHV0aWxzLmluZGV4T2ZEZWVwZXN0RWxlbWVudCh2YWxpZERyb3BzKTtcblxuICByZXR1cm4ge1xuICAgIGRyb3B6b25lOiBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5kcm9wem9uZXNbZHJvcEluZGV4XSB8fCBudWxsLFxuICAgIGVsZW1lbnQgOiBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5lbGVtZW50cyBbZHJvcEluZGV4XSB8fCBudWxsLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREcm9wRXZlbnRzIChpbnRlcmFjdGlvbiwgcG9pbnRlckV2ZW50LCBkcmFnRXZlbnQpIHtcbiAgY29uc3QgZHJvcEV2ZW50cyA9IHtcbiAgICBlbnRlciAgICAgOiBudWxsLFxuICAgIGxlYXZlICAgICA6IG51bGwsXG4gICAgYWN0aXZhdGUgIDogbnVsbCxcbiAgICBkZWFjdGl2YXRlOiBudWxsLFxuICAgIG1vdmUgICAgICA6IG51bGwsXG4gICAgZHJvcCAgICAgIDogbnVsbCxcbiAgfTtcblxuICBjb25zdCB0bXBsID0ge1xuICAgIGRyYWdFdmVudCxcbiAgICBpbnRlcmFjdGlvbixcbiAgICB0YXJnZXQgICAgICAgOiBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCxcbiAgICBkcm9wem9uZSAgICAgOiBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0LFxuICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgZHJhZ2dhYmxlICAgIDogZHJhZ0V2ZW50LmludGVyYWN0YWJsZSxcbiAgICB0aW1lU3RhbXAgICAgOiBkcmFnRXZlbnQudGltZVN0YW1wLFxuICB9O1xuXG4gIGlmIChpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCAhPT0gaW50ZXJhY3Rpb24ucHJldkRyb3BFbGVtZW50KSB7XG4gICAgLy8gaWYgdGhlcmUgd2FzIGEgcHJldkRyb3BUYXJnZXQsIGNyZWF0ZSBhIGRyYWdsZWF2ZSBldmVudFxuICAgIGlmIChpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldCkge1xuICAgICAgZHJvcEV2ZW50cy5sZWF2ZSA9IHV0aWxzLmV4dGVuZCh7IHR5cGU6ICdkcmFnbGVhdmUnIH0sIHRtcGwpO1xuXG4gICAgICBkcmFnRXZlbnQuZHJhZ0xlYXZlICAgID0gZHJvcEV2ZW50cy5sZWF2ZS50YXJnZXQgICA9IGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudDtcbiAgICAgIGRyYWdFdmVudC5wcmV2RHJvcHpvbmUgPSBkcm9wRXZlbnRzLmxlYXZlLmRyb3B6b25lID0gaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQ7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBkcm9wVGFyZ2V0IGlzIG5vdCBudWxsLCBjcmVhdGUgYSBkcmFnZW50ZXIgZXZlbnRcbiAgICBpZiAoaW50ZXJhY3Rpb24uZHJvcFRhcmdldCkge1xuICAgICAgZHJvcEV2ZW50cy5lbnRlciA9IHtcbiAgICAgICAgZHJhZ0V2ZW50LFxuICAgICAgICBpbnRlcmFjdGlvbixcbiAgICAgICAgdGFyZ2V0ICAgICAgIDogaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQsXG4gICAgICAgIGRyb3B6b25lICAgICA6IGludGVyYWN0aW9uLmRyb3BUYXJnZXQsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgICAgIGRyYWdnYWJsZSAgICA6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgIHRpbWVTdGFtcCAgICA6IGRyYWdFdmVudC50aW1lU3RhbXAsXG4gICAgICAgIHR5cGUgICAgICAgICA6ICdkcmFnZW50ZXInLFxuICAgICAgfTtcblxuICAgICAgZHJhZ0V2ZW50LmRyYWdFbnRlciA9IGludGVyYWN0aW9uLmRyb3BFbGVtZW50O1xuICAgICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gaW50ZXJhY3Rpb24uZHJvcFRhcmdldDtcbiAgICB9XG4gIH1cblxuICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnZW5kJyAmJiBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0KSB7XG4gICAgZHJvcEV2ZW50cy5kcm9wID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2Ryb3AnIH0sIHRtcGwpO1xuXG4gICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gaW50ZXJhY3Rpb24uZHJvcFRhcmdldDtcbiAgICBkcmFnRXZlbnQucmVsYXRlZFRhcmdldCA9IGludGVyYWN0aW9uLmRyb3BFbGVtZW50O1xuICB9XG4gIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdzdGFydCcpIHtcbiAgICBkcm9wRXZlbnRzLmFjdGl2YXRlID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2Ryb3BhY3RpdmF0ZScgfSwgdG1wbCk7XG5cbiAgICBkcm9wRXZlbnRzLmFjdGl2YXRlLnRhcmdldCAgID0gbnVsbDtcbiAgICBkcm9wRXZlbnRzLmFjdGl2YXRlLmRyb3B6b25lID0gbnVsbDtcbiAgfVxuICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnZW5kJykge1xuICAgIGRyb3BFdmVudHMuZGVhY3RpdmF0ZSA9IHV0aWxzLmV4dGVuZCh7IHR5cGU6ICdkcm9wZGVhY3RpdmF0ZScgfSwgdG1wbCk7XG5cbiAgICBkcm9wRXZlbnRzLmRlYWN0aXZhdGUudGFyZ2V0ICAgPSBudWxsO1xuICAgIGRyb3BFdmVudHMuZGVhY3RpdmF0ZS5kcm9wem9uZSA9IG51bGw7XG4gIH1cbiAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ21vdmUnICYmIGludGVyYWN0aW9uLmRyb3BUYXJnZXQpIHtcbiAgICBkcm9wRXZlbnRzLm1vdmUgPSB1dGlscy5leHRlbmQoe1xuICAgICAgZHJhZ21vdmUgICAgIDogZHJhZ0V2ZW50LFxuICAgICAgdHlwZSAgICAgICAgIDogJ2Ryb3Btb3ZlJyxcbiAgICB9LCB0bXBsKTtcblxuICAgIGRyYWdFdmVudC5kcm9wem9uZSA9IGludGVyYWN0aW9uLmRyb3BUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gZHJvcEV2ZW50cztcbn1cblxuZnVuY3Rpb24gZmlyZURyb3BFdmVudHMgKGludGVyYWN0aW9uLCBkcm9wRXZlbnRzKSB7XG4gIGNvbnN0IHtcbiAgICBhY3RpdmVEcm9wcyxcbiAgICBwcmV2RHJvcFRhcmdldCxcbiAgICBkcm9wVGFyZ2V0LFxuICAgIGRyb3BFbGVtZW50LFxuICB9ID0gaW50ZXJhY3Rpb247XG5cbiAgaWYgKGRyb3BFdmVudHMubGVhdmUpIHsgcHJldkRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLmxlYXZlKTsgfVxuICBpZiAoZHJvcEV2ZW50cy5tb3ZlICkgeyAgICAgZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMubW92ZSApOyB9XG4gIGlmIChkcm9wRXZlbnRzLmVudGVyKSB7ICAgICBkcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5lbnRlcik7IH1cbiAgaWYgKGRyb3BFdmVudHMuZHJvcCApIHsgICAgIGRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLmRyb3AgKTsgfVxuICBpZiAoZHJvcEV2ZW50cy5kZWFjdGl2YXRlKSB7XG4gICAgZmlyZUFjdGl2ZURyb3BzKGFjdGl2ZURyb3BzLCBkcm9wRXZlbnRzLmRlYWN0aXZhdGUpO1xuICB9XG5cbiAgaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQgID0gZHJvcFRhcmdldDtcbiAgaW50ZXJhY3Rpb24ucHJldkRyb3BFbGVtZW50ID0gZHJvcEVsZW1lbnQ7XG59XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KHRhcmdldClcbiAqIC5kcm9wQ2hlY2tlcihmdW5jdGlvbihkcmFnRXZlbnQsICAgICAgICAgLy8gcmVsYXRlZCBkcmFnbW92ZSBvciBkcmFnZW5kIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsICAgICAgICAgICAgIC8vIFRvdWNoRXZlbnQvUG9pbnRlckV2ZW50L01vdXNlRXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcm9wcGVkLCAgICAgICAgICAgLy8gYm9vbCByZXN1bHQgb2YgdGhlIGRlZmF1bHQgY2hlY2tlclxuICogICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLCAgICAgICAgICAvLyBkcm9wem9uZSBJbnRlcmFjdGFibGVcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcm9wRWxlbWVudCwgICAgICAgLy8gZHJvcHpvbmUgZWxlbW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLCAgICAgICAgIC8vIGRyYWdnYWJsZSBJbnRlcmFjdGFibGVcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGVFbGVtZW50KSB7Ly8gZHJhZ2dhYmxlIGVsZW1lbnRcbiAqXG4gKiAgIHJldHVybiBkcm9wcGVkICYmIGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2FsbG93LWRyb3AnKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdCgnLmRyb3AnKS5kcm9wem9uZSh7XG4gKiAgIGFjY2VwdDogJy5jYW4tZHJvcCcgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbmdsZS1kcm9wJyksXG4gKiAgIG92ZXJsYXA6ICdwb2ludGVyJyB8fCAnY2VudGVyJyB8fCB6ZXJvVG9PbmVcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIGRyYWdnYWJsZXMgY2FuIGJlIGRyb3BwZWQgb250byB0aGlzIHRhcmdldCB0b1xuICogdHJpZ2dlciBkcm9wIGV2ZW50c1xuICpcbiAqIERyb3B6b25lcyBjYW4gcmVjZWl2ZSB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAqICAtIGBkcm9wYWN0aXZhdGVgIGFuZCBgZHJvcGRlYWN0aXZhdGVgIHdoZW4gYW4gYWNjZXB0YWJsZSBkcmFnIHN0YXJ0cyBhbmQgZW5kc1xuICogIC0gYGRyYWdlbnRlcmAgYW5kIGBkcmFnbGVhdmVgIHdoZW4gYSBkcmFnZ2FibGUgZW50ZXJzIGFuZCBsZWF2ZXMgdGhlIGRyb3B6b25lXG4gKiAgLSBgZHJhZ21vdmVgIHdoZW4gYSBkcmFnZ2FibGUgdGhhdCBoYXMgZW50ZXJlZCB0aGUgZHJvcHpvbmUgaXMgbW92ZWRcbiAqICAtIGBkcm9wYCB3aGVuIGEgZHJhZ2dhYmxlIGlzIGRyb3BwZWQgaW50byB0aGlzIGRyb3B6b25lXG4gKlxuICogVXNlIHRoZSBgYWNjZXB0YCBvcHRpb24gdG8gYWxsb3cgb25seSBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBnaXZlbiBDU1NcbiAqIHNlbGVjdG9yIG9yIGVsZW1lbnQuIFRoZSB2YWx1ZSBjYW4gYmU6XG4gKlxuICogIC0gKiphbiBFbGVtZW50KiogLSBvbmx5IHRoYXQgZWxlbWVudCBjYW4gYmUgZHJvcHBlZCBpbnRvIHRoaXMgZHJvcHpvbmUuXG4gKiAgLSAqKmEgc3RyaW5nKiosIC0gdGhlIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZCBtdXN0IG1hdGNoIGl0IGFzIGEgQ1NTIHNlbGVjdG9yLlxuICogIC0gKipgbnVsbGAqKiAtIGFjY2VwdCBvcHRpb25zIGlzIGNsZWFyZWQgLSBpdCBhY2NlcHRzIGFueSBlbGVtZW50LlxuICpcbiAqIFVzZSB0aGUgYG92ZXJsYXBgIG9wdGlvbiB0byBzZXQgaG93IGRyb3BzIGFyZSBjaGVja2VkIGZvci4gVGhlIGFsbG93ZWRcbiAqIHZhbHVlcyBhcmU6XG4gKlxuICogICAtIGAncG9pbnRlcidgLCB0aGUgcG9pbnRlciBtdXN0IGJlIG92ZXIgdGhlIGRyb3B6b25lIChkZWZhdWx0KVxuICogICAtIGAnY2VudGVyJ2AsIHRoZSBkcmFnZ2FibGUgZWxlbWVudCdzIGNlbnRlciBtdXN0IGJlIG92ZXIgdGhlIGRyb3B6b25lXG4gKiAgIC0gYSBudW1iZXIgZnJvbSAwLTEgd2hpY2ggaXMgdGhlIGAoaW50ZXJzZWN0aW9uIGFyZWEpIC8gKGRyYWdnYWJsZSBhcmVhKWAuXG4gKiAgIGUuZy4gYDAuNWAgZm9yIGRyb3AgdG8gaGFwcGVuIHdoZW4gaGFsZiBvZiB0aGUgYXJlYSBvZiB0aGUgZHJhZ2dhYmxlIGlzXG4gKiAgIG92ZXIgdGhlIGRyb3B6b25lXG4gKlxuICogVXNlIHRoZSBgY2hlY2tlcmAgb3B0aW9uIHRvIHNwZWNpZnkgYSBmdW5jdGlvbiB0byBjaGVjayBpZiBhIGRyYWdnZWQgZWxlbWVudFxuICogaXMgb3ZlciB0aGlzIEludGVyYWN0YWJsZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3QgfCBudWxsfSBbb3B0aW9uc10gVGhlIG5ldyBvcHRpb25zIHRvIGJlIHNldC5cbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IFRoZSBjdXJyZW50IHNldHRpbmcgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kcm9wem9uZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHJvcC5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZT8gZmFsc2U6IHRydWU7XG5cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyb3ApICAgICAgICAgICkgeyB0aGlzLmV2ZW50cy5vbmRyb3AgICAgICAgICAgID0gb3B0aW9ucy5vbmRyb3AgICAgICAgICAgOyB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcm9wYWN0aXZhdGUpICApIHsgdGhpcy5ldmVudHMub25kcm9wYWN0aXZhdGUgICA9IG9wdGlvbnMub25kcm9wYWN0aXZhdGUgIDsgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJvcGRlYWN0aXZhdGUpKSB7IHRoaXMuZXZlbnRzLm9uZHJvcGRlYWN0aXZhdGUgPSBvcHRpb25zLm9uZHJvcGRlYWN0aXZhdGU7IH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyYWdlbnRlcikgICAgICkgeyB0aGlzLmV2ZW50cy5vbmRyYWdlbnRlciAgICAgID0gb3B0aW9ucy5vbmRyYWdlbnRlciAgICAgOyB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcmFnbGVhdmUpICAgICApIHsgdGhpcy5ldmVudHMub25kcmFnbGVhdmUgICAgICA9IG9wdGlvbnMub25kcmFnbGVhdmUgICAgIDsgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJvcG1vdmUpICAgICAgKSB7IHRoaXMuZXZlbnRzLm9uZHJvcG1vdmUgICAgICAgPSBvcHRpb25zLm9uZHJvcG1vdmUgICAgICA7IH1cblxuICAgIGlmICgvXihwb2ludGVyfGNlbnRlcikkLy50ZXN0KG9wdGlvbnMub3ZlcmxhcCkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcm9wLm92ZXJsYXAgPSBvcHRpb25zLm92ZXJsYXA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHV0aWxzLmlzLm51bWJlcihvcHRpb25zLm92ZXJsYXApKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5vdmVybGFwID0gTWF0aC5tYXgoTWF0aC5taW4oMSwgb3B0aW9ucy5vdmVybGFwKSwgMCk7XG4gICAgfVxuICAgIGlmICgnYWNjZXB0JyBpbiBvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5hY2NlcHQgPSBvcHRpb25zLmFjY2VwdDtcbiAgICB9XG4gICAgaWYgKCdjaGVja2VyJyBpbiBvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyID0gb3B0aW9ucy5jaGVja2VyO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5kcm9wLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aGlzLm9uZHJhZ2VudGVyID0gdGhpcy5vbmRyYWdsZWF2ZSA9IHRoaXMub25kcm9wXG4gICAgICAgID0gdGhpcy5vbmRyb3BhY3RpdmF0ZSA9IHRoaXMub25kcm9wZGVhY3RpdmF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLmRyb3A7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmRyb3BDaGVjayA9IGZ1bmN0aW9uIChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQsIGRyb3BFbGVtZW50LCByZWN0KSB7XG4gIGxldCBkcm9wcGVkID0gZmFsc2U7XG5cbiAgLy8gaWYgdGhlIGRyb3B6b25lIGhhcyBubyByZWN0IChlZy4gZGlzcGxheTogbm9uZSlcbiAgLy8gY2FsbCB0aGUgY3VzdG9tIGRyb3BDaGVja2VyIG9yIGp1c3QgcmV0dXJuIGZhbHNlXG4gIGlmICghKHJlY3QgPSByZWN0IHx8IHRoaXMuZ2V0UmVjdChkcm9wRWxlbWVudCkpKSB7XG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyXG4gICAgICA/IHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIoZHJhZ0V2ZW50LCBldmVudCwgZHJvcHBlZCwgdGhpcywgZHJvcEVsZW1lbnQsIGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudClcbiAgICAgIDogZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgZHJvcE92ZXJsYXAgPSB0aGlzLm9wdGlvbnMuZHJvcC5vdmVybGFwO1xuXG4gIGlmIChkcm9wT3ZlcmxhcCA9PT0gJ3BvaW50ZXInKSB7XG4gICAgY29uc3Qgb3JpZ2luID0gdXRpbHMuZ2V0T3JpZ2luWFkoZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50LCAnZHJhZycpO1xuICAgIGNvbnN0IHBhZ2UgPSB1dGlscy5nZXRQYWdlWFkoZHJhZ0V2ZW50KTtcblxuICAgIHBhZ2UueCArPSBvcmlnaW4ueDtcbiAgICBwYWdlLnkgKz0gb3JpZ2luLnk7XG5cbiAgICBjb25zdCBob3Jpem9udGFsID0gKHBhZ2UueCA+IHJlY3QubGVmdCkgJiYgKHBhZ2UueCA8IHJlY3QucmlnaHQpO1xuICAgIGNvbnN0IHZlcnRpY2FsICAgPSAocGFnZS55ID4gcmVjdC50b3AgKSAmJiAocGFnZS55IDwgcmVjdC5ib3R0b20pO1xuXG4gICAgZHJvcHBlZCA9IGhvcml6b250YWwgJiYgdmVydGljYWw7XG4gIH1cblxuICBjb25zdCBkcmFnUmVjdCA9IGRyYWdnYWJsZS5nZXRSZWN0KGRyYWdnYWJsZUVsZW1lbnQpO1xuXG4gIGlmIChkcmFnUmVjdCAmJiBkcm9wT3ZlcmxhcCA9PT0gJ2NlbnRlcicpIHtcbiAgICBjb25zdCBjeCA9IGRyYWdSZWN0LmxlZnQgKyBkcmFnUmVjdC53aWR0aCAgLyAyO1xuICAgIGNvbnN0IGN5ID0gZHJhZ1JlY3QudG9wICArIGRyYWdSZWN0LmhlaWdodCAvIDI7XG5cbiAgICBkcm9wcGVkID0gY3ggPj0gcmVjdC5sZWZ0ICYmIGN4IDw9IHJlY3QucmlnaHQgJiYgY3kgPj0gcmVjdC50b3AgJiYgY3kgPD0gcmVjdC5ib3R0b207XG4gIH1cblxuICBpZiAoZHJhZ1JlY3QgJiYgdXRpbHMuaXMubnVtYmVyKGRyb3BPdmVybGFwKSkge1xuICAgIGNvbnN0IG92ZXJsYXBBcmVhICA9IChNYXRoLm1heCgwLCBNYXRoLm1pbihyZWN0LnJpZ2h0ICwgZHJhZ1JlY3QucmlnaHQgKSAtIE1hdGgubWF4KHJlY3QubGVmdCwgZHJhZ1JlY3QubGVmdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICogTWF0aC5tYXgoMCwgTWF0aC5taW4ocmVjdC5ib3R0b20sIGRyYWdSZWN0LmJvdHRvbSkgLSBNYXRoLm1heChyZWN0LnRvcCAsIGRyYWdSZWN0LnRvcCApKSk7XG5cbiAgICBjb25zdCBvdmVybGFwUmF0aW8gPSBvdmVybGFwQXJlYSAvIChkcmFnUmVjdC53aWR0aCAqIGRyYWdSZWN0LmhlaWdodCk7XG5cbiAgICBkcm9wcGVkID0gb3ZlcmxhcFJhdGlvID49IGRyb3BPdmVybGFwO1xuICB9XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIpIHtcbiAgICBkcm9wcGVkID0gdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcihkcmFnRXZlbnQsIGV2ZW50LCBkcm9wcGVkLCB0aGlzLCBkcm9wRWxlbWVudCwgZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBkcm9wcGVkO1xufTtcblxuSW50ZXJhY3RhYmxlLnNpZ25hbHMub24oJ3Vuc2V0JywgZnVuY3Rpb24gKHsgaW50ZXJhY3RhYmxlIH0pIHtcbiAgaW50ZXJhY3RhYmxlLmRyb3B6b25lKGZhbHNlKTtcbn0pO1xuXG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ2Ryb3BDaGVja2VyJyk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0ICAgICAgPSBudWxsOyAvLyB0aGUgZHJvcHpvbmUgYSBkcmFnIHRhcmdldCBtaWdodCBiZSBkcm9wcGVkIGludG9cbiAgaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQgICAgID0gbnVsbDsgLy8gdGhlIGVsZW1lbnQgYXQgdGhlIHRpbWUgb2YgY2hlY2tpbmdcbiAgaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQgID0gbnVsbDsgLy8gdGhlIGRyb3B6b25lIHRoYXQgd2FzIHJlY2VudGx5IGRyYWdnZWQgYXdheSBmcm9tXG4gIGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudCA9IG51bGw7IC8vIHRoZSBlbGVtZW50IGF0IHRoZSB0aW1lIG9mIGNoZWNraW5nXG4gIGludGVyYWN0aW9uLmRyb3BFdmVudHMgICAgICA9IG51bGw7IC8vIHRoZSBkcm9wRXZlbnRzIHJlbGF0ZWQgdG8gdGhlIGN1cnJlbnQgZHJhZyBldmVudFxuXG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzID0ge1xuICAgIGRyb3B6b25lczogW10sICAgICAgLy8gdGhlIGRyb3B6b25lcyB0aGF0IGFyZSBtZW50aW9uZWQgYmVsb3dcbiAgICBlbGVtZW50cyA6IFtdLCAgICAgIC8vIGVsZW1lbnRzIG9mIGRyb3B6b25lcyB0aGF0IGFjY2VwdCB0aGUgdGFyZ2V0IGRyYWdnYWJsZVxuICAgIHJlY3RzICAgIDogW10sICAgICAgLy8gdGhlIHJlY3RzIG9mIHRoZSBlbGVtZW50cyBtZW50aW9uZWQgYWJvdmVcbiAgfTtcblxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGludGVyYWN0aW9uLmRyb3BUYXJnZXQgPSBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCA9XG4gICAgaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQgPSBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQgPSBudWxsO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgdGhlIGRpbWVuc2lvbnMgb2YgZHJvcHpvbmUgZWxlbWVudHMgYXJlIGNhbGN1bGF0ZWRcbiAqIG9uIGV2ZXJ5IGRyYWdtb3ZlIG9yIG9ubHkgb24gZHJhZ3N0YXJ0IGZvciB0aGUgZGVmYXVsdCBkcm9wQ2hlY2tlclxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25ld1ZhbHVlXSBUcnVlIHRvIGNoZWNrIG9uIGVhY2ggbW92ZS4gRmFsc2UgdG8gY2hlY2sgb25seVxuICogYmVmb3JlIHN0YXJ0XG4gKiBAcmV0dXJuIHtib29sZWFuIHwgaW50ZXJhY3R9IFRoZSBjdXJyZW50IHNldHRpbmcgb3IgaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3QuZHluYW1pY0Ryb3AgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgaWYgKHV0aWxzLmlzLmJvb2wobmV3VmFsdWUpKSB7XG4gICAgLy9pZiAoZHJhZ2dpbmcgJiYgZHluYW1pY0Ryb3AgIT09IG5ld1ZhbHVlICYmICFuZXdWYWx1ZSkge1xuICAgICAgLy9jYWxjUmVjdHMoZHJvcHpvbmVzKTtcbiAgICAvL31cblxuICAgIGR5bmFtaWNEcm9wID0gbmV3VmFsdWU7XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cbiAgcmV0dXJuIGR5bmFtaWNEcm9wO1xufTtcblxudXRpbHMubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIFtcbiAgJ2RyYWdlbnRlcicsXG4gICdkcmFnbGVhdmUnLFxuICAnZHJvcGFjdGl2YXRlJyxcbiAgJ2Ryb3BkZWFjdGl2YXRlJyxcbiAgJ2Ryb3Btb3ZlJyxcbiAgJ2Ryb3AnLFxuXSk7XG5hY3Rpb25zLm1ldGhvZERpY3QuZHJvcCA9ICdkcm9wem9uZSc7XG5cbmRlZmF1bHRPcHRpb25zLmRyb3AgPSBkcm9wLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRyb3A7XG4iLCIvKiogQG1vZHVsZSBpbnRlcmFjdCAqL1xuXG5jb25zdCBicm93c2VyICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXInKTtcbmNvbnN0IGV2ZW50cyAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG5jb25zdCB1dGlscyAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBzY29wZSAgICAgICAgPSByZXF1aXJlKCcuL3Njb3BlJyk7XG5jb25zdCBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuL0ludGVyYWN0YWJsZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gID0gcmVxdWlyZSgnLi9JbnRlcmFjdGlvbicpO1xuXG5jb25zdCBnbG9iYWxFdmVudHMgPSB7fTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoJyNkcmFnZ2FibGUnKS5kcmFnZ2FibGUodHJ1ZSk7XG4gKlxuICogdmFyIHJlY3RhYmxlcyA9IGludGVyYWN0KCdyZWN0Jyk7XG4gKiByZWN0YWJsZXNcbiAqICAgLmdlc3R1cmFibGUodHJ1ZSlcbiAqICAgLm9uKCdnZXN0dXJlbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICogICAgICAgLy8gLi4uXG4gKiAgIH0pO1xuICogYGBgXG4gKlxuICogVGhlIG1ldGhvZHMgb2YgdGhpcyB2YXJpYWJsZSBjYW4gYmUgdXNlZCB0byBzZXQgZWxlbWVudHMgYXMgaW50ZXJhY3RhYmxlc1xuICogYW5kIGFsc28gdG8gY2hhbmdlIHZhcmlvdXMgZGVmYXVsdCBzZXR0aW5ncy5cbiAqXG4gKiBDYWxsaW5nIGl0IGFzIGEgZnVuY3Rpb24gYW5kIHBhc3NpbmcgYW4gZWxlbWVudCBvciBhIHZhbGlkIENTUyBzZWxlY3RvclxuICogc3RyaW5nIHJldHVybnMgYW4gSW50ZXJhY3RhYmxlIG9iamVjdCB3aGljaCBoYXMgdmFyaW91cyBtZXRob2RzIHRvIGNvbmZpZ3VyZVxuICogaXQuXG4gKlxuICogQGdsb2JhbFxuICpcbiAqIEBwYXJhbSB7RWxlbWVudCB8IHN0cmluZ30gZWxlbWVudCBUaGUgSFRNTCBvciBTVkcgRWxlbWVudCB0byBpbnRlcmFjdCB3aXRoXG4gKiBvciBDU1Mgc2VsZWN0b3JcbiAqIEByZXR1cm4ge0ludGVyYWN0YWJsZX1cbiAqL1xuZnVuY3Rpb24gaW50ZXJhY3QgKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgbGV0IGludGVyYWN0YWJsZSA9IHNjb3BlLmludGVyYWN0YWJsZXMuZ2V0KGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gIGlmICghaW50ZXJhY3RhYmxlKSB7XG4gICAgaW50ZXJhY3RhYmxlID0gbmV3IEludGVyYWN0YWJsZShlbGVtZW50LCBvcHRpb25zKTtcbiAgICBpbnRlcmFjdGFibGUuZXZlbnRzLmdsb2JhbCA9IGdsb2JhbEV2ZW50cztcbiAgfVxuXG4gIHJldHVybiBpbnRlcmFjdGFibGU7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gZWxlbWVudCBvciBzZWxlY3RvciBoYXMgYmVlbiBzZXQgd2l0aCB0aGUge0BsaW5rIGludGVyYWN0fVxuICogZnVuY3Rpb25cbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LmlzU2V0XG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBFbGVtZW50IGJlaW5nIHNlYXJjaGVkIGZvclxuICogQHJldHVybiB7Ym9vbGVhbn0gSW5kaWNhdGVzIGlmIHRoZSBlbGVtZW50IG9yIENTUyBzZWxlY3RvciB3YXMgcHJldmlvdXNseVxuICogcGFzc2VkIHRvIGludGVyYWN0XG4qL1xuaW50ZXJhY3QuaXNTZXQgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICByZXR1cm4gc2NvcGUuaW50ZXJhY3RhYmxlcy5pbmRleE9mRWxlbWVudChlbGVtZW50LCBvcHRpb25zICYmIG9wdGlvbnMuY29udGV4dCkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBBZGQgYSBnbG9iYWwgbGlzdGVuZXIgZm9yIGFuIEludGVyYWN0RXZlbnQgb3IgYWRkcyBhIERPTSBldmVudCB0byBgZG9jdW1lbnRgXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5vblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IHR5cGUgVGhlIHR5cGVzIG9mIGV2ZW50cyB0byBsaXN0ZW4gZm9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgZnVuY3Rpb24gZXZlbnQgKHMpXG4gKiBAcGFyYW0ge29iamVjdCB8IGJvb2xlYW59IFtvcHRpb25zXSBvYmplY3Qgb3IgdXNlQ2FwdHVyZSBmbGFnIGZvclxuICogYWRkRXZlbnRMaXN0ZW5lclxuICogQHJldHVybiB7b2JqZWN0fSBpbnRlcmFjdFxuICovXG5pbnRlcmFjdC5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMuc3RyaW5nKHR5cGUpICYmIHR5cGUuc2VhcmNoKCcgJykgIT09IC0xKSB7XG4gICAgdHlwZSA9IHR5cGUudHJpbSgpLnNwbGl0KC8gKy8pO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmFycmF5KHR5cGUpKSB7XG4gICAgZm9yIChjb25zdCBldmVudFR5cGUgb2YgdHlwZSkge1xuICAgICAgaW50ZXJhY3Qub24oZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLm9iamVjdCh0eXBlKSkge1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0eXBlKSB7XG4gICAgICBpbnRlcmFjdC5vbihwcm9wLCB0eXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgLy8gaWYgaXQgaXMgYW4gSW50ZXJhY3RFdmVudCB0eXBlLCBhZGQgbGlzdGVuZXIgdG8gZ2xvYmFsRXZlbnRzXG4gIGlmICh1dGlscy5jb250YWlucyhJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgdHlwZSkpIHtcbiAgICAvLyBpZiB0aGlzIHR5cGUgb2YgZXZlbnQgd2FzIG5ldmVyIGJvdW5kXG4gICAgaWYgKCFnbG9iYWxFdmVudHNbdHlwZV0pIHtcbiAgICAgIGdsb2JhbEV2ZW50c1t0eXBlXSA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuICAvLyBJZiBub24gSW50ZXJhY3RFdmVudCB0eXBlLCBhZGRFdmVudExpc3RlbmVyIHRvIGRvY3VtZW50XG4gIGVsc2Uge1xuICAgIGV2ZW50cy5hZGQoc2NvcGUuZG9jdW1lbnQsIHR5cGUsIGxpc3RlbmVyLCB7IG9wdGlvbnMgfSk7XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3Q7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYSBnbG9iYWwgSW50ZXJhY3RFdmVudCBsaXN0ZW5lciBvciBET00gZXZlbnQgZnJvbSBgZG9jdW1lbnRgXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5vZmZcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5IHwgb2JqZWN0fSB0eXBlIFRoZSB0eXBlcyBvZiBldmVudHMgdGhhdCB3ZXJlIGxpc3RlbmVkXG4gKiBmb3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0byBiZSByZW1vdmVkXG4gKiBAcGFyYW0ge29iamVjdCB8IGJvb2xlYW59IG9wdGlvbnMgW29wdGlvbnNdIG9iamVjdCBvciB1c2VDYXB0dXJlIGZsYWcgZm9yXG4gKiByZW1vdmVFdmVudExpc3RlbmVyXG4gKiBAcmV0dXJuIHtvYmplY3R9IGludGVyYWN0XG4gKi9cbmludGVyYWN0Lm9mZiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMuc3RyaW5nKHR5cGUpICYmIHR5cGUuc2VhcmNoKCcgJykgIT09IC0xKSB7XG4gICAgdHlwZSA9IHR5cGUudHJpbSgpLnNwbGl0KC8gKy8pO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmFycmF5KHR5cGUpKSB7XG4gICAgZm9yIChjb25zdCBldmVudFR5cGUgb2YgdHlwZSkge1xuICAgICAgaW50ZXJhY3Qub2ZmKGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5vYmplY3QodHlwZSkpIHtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdHlwZSkge1xuICAgICAgaW50ZXJhY3Qub2ZmKHByb3AsIHR5cGVbcHJvcF0sIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICBpZiAoIXV0aWxzLmNvbnRhaW5zKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCB0eXBlKSkge1xuICAgIGV2ZW50cy5yZW1vdmUoc2NvcGUuZG9jdW1lbnQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgfVxuICBlbHNlIHtcbiAgICBsZXQgaW5kZXg7XG5cbiAgICBpZiAodHlwZSBpbiBnbG9iYWxFdmVudHNcbiAgICAgICAgJiYgKGluZGV4ID0gZ2xvYmFsRXZlbnRzW3R5cGVdLmluZGV4T2YobGlzdGVuZXIpKSAhPT0gLTEpIHtcbiAgICAgIGdsb2JhbEV2ZW50c1t0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbnRlcmFjdDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgd2hpY2ggZXhwb3NlcyBpbnRlcm5hbCBkYXRhXG5cbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3QuZGVidWdcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgdGhhdCBvdXRsaW5lIHRoZSBjdXJyZW50IHN0YXRlXG4gKiBhbmQgZXhwb3NlIGludGVybmFsIGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzXG4gKi9cbmludGVyYWN0LmRlYnVnID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gc2NvcGU7XG59O1xuXG4vLyBleHBvc2UgdGhlIGZ1bmN0aW9ucyB1c2VkIHRvIGNhbGN1bGF0ZSBtdWx0aS10b3VjaCBwcm9wZXJ0aWVzXG5pbnRlcmFjdC5nZXRQb2ludGVyQXZlcmFnZSAgPSB1dGlscy5wb2ludGVyQXZlcmFnZTtcbmludGVyYWN0LmdldFRvdWNoQkJveCAgICAgICA9IHV0aWxzLnRvdWNoQkJveDtcbmludGVyYWN0LmdldFRvdWNoRGlzdGFuY2UgICA9IHV0aWxzLnRvdWNoRGlzdGFuY2U7XG5pbnRlcmFjdC5nZXRUb3VjaEFuZ2xlICAgICAgPSB1dGlscy50b3VjaEFuZ2xlO1xuXG5pbnRlcmFjdC5nZXRFbGVtZW50UmVjdCAgICAgICA9IHV0aWxzLmdldEVsZW1lbnRSZWN0O1xuaW50ZXJhY3QuZ2V0RWxlbWVudENsaWVudFJlY3QgPSB1dGlscy5nZXRFbGVtZW50Q2xpZW50UmVjdDtcbmludGVyYWN0Lm1hdGNoZXNTZWxlY3RvciAgICAgID0gdXRpbHMubWF0Y2hlc1NlbGVjdG9yO1xuaW50ZXJhY3QuY2xvc2VzdCAgICAgICAgICAgICAgPSB1dGlscy5jbG9zZXN0O1xuXG4vKipcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Quc3VwcG9ydHNUb3VjaFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIHRvdWNoIGlucHV0XG4gKi9cbmludGVyYWN0LnN1cHBvcnRzVG91Y2ggPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBicm93c2VyLnN1cHBvcnRzVG91Y2g7XG59O1xuXG4vKipcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Quc3VwcG9ydHNQb2ludGVyRXZlbnRcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgYnJvd3NlciBzdXBwb3J0cyBQb2ludGVyRXZlbnRzXG4gKi9cbmludGVyYWN0LnN1cHBvcnRzUG9pbnRlckV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYnJvd3Nlci5zdXBwb3J0c1BvaW50ZXJFdmVudDtcbn07XG5cbi8qKlxuICogQ2FuY2VscyBhbGwgaW50ZXJhY3Rpb25zIChlbmQgZXZlbnRzIGFyZSBub3QgZmlyZWQpXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5zdG9wXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgQW4gZXZlbnQgb24gd2hpY2ggdG8gY2FsbCBwcmV2ZW50RGVmYXVsdCgpXG4gKiBAcmV0dXJuIHtvYmplY3R9IGludGVyYWN0XG4gKi9cbmludGVyYWN0LnN0b3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZm9yIChsZXQgaSA9IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHNjb3BlLmludGVyYWN0aW9uc1tpXS5zdG9wKGV2ZW50KTtcbiAgfVxuXG4gIHJldHVybiBpbnRlcmFjdDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHRoZSBkaXN0YW5jZSB0aGUgcG9pbnRlciBtdXN0IGJlIG1vdmVkIGJlZm9yZSBhbiBhY3Rpb25cbiAqIHNlcXVlbmNlIG9jY3Vycy4gVGhpcyBhbHNvIGFmZmVjdHMgdG9sZXJhbmNlIGZvciB0YXAgZXZlbnRzLlxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3QucG9pbnRlck1vdmVUb2xlcmFuY2VcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW25ld1ZhbHVlXSBUaGUgbW92ZW1lbnQgZnJvbSB0aGUgc3RhcnQgcG9zaXRpb24gbXVzdCBiZSBncmVhdGVyIHRoYW4gdGhpcyB2YWx1ZVxuICogQHJldHVybiB7aW50ZXJhY3QgfCBudW1iZXJ9XG4gKi9cbmludGVyYWN0LnBvaW50ZXJNb3ZlVG9sZXJhbmNlID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmICh1dGlscy5pcy5udW1iZXIobmV3VmFsdWUpKSB7XG4gICAgSW50ZXJhY3Rpb24ucG9pbnRlck1vdmVUb2xlcmFuY2UgPSBuZXdWYWx1ZTtcblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIHJldHVybiBJbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZTtcbn07XG5cbmludGVyYWN0LmFkZERvY3VtZW50ICAgID0gc2NvcGUuYWRkRG9jdW1lbnQ7XG5pbnRlcmFjdC5yZW1vdmVEb2N1bWVudCA9IHNjb3BlLnJlbW92ZURvY3VtZW50O1xuXG5zY29wZS5pbnRlcmFjdCA9IGludGVyYWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludGVyYWN0O1xuIiwiY29uc3QgYWN0aW9ucyAgICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IEludGVyYWN0RXZlbnQgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuLyoqIEBsZW5kcyBJbnRlcmFjdGFibGUgKi9cbmNvbnN0IEludGVyYWN0YWJsZSAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbmNvbnN0IGRyYWcgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZCAgICAgOiBmYWxzZSxcbiAgICBtb3VzZUJ1dHRvbnM6IG51bGwsXG5cbiAgICBvcmlnaW4gICAgOiBudWxsLFxuICAgIHNuYXAgICAgICA6IG51bGwsXG4gICAgcmVzdHJpY3QgIDogbnVsbCxcbiAgICBpbmVydGlhICAgOiBudWxsLFxuICAgIGF1dG9TY3JvbGw6IG51bGwsXG5cbiAgICBzdGFydEF4aXMgOiAneHknLFxuICAgIGxvY2tBeGlzICA6ICd4eScsXG4gIH0sXG5cbiAgY2hlY2tlcjogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGFibGUpIHtcbiAgICBjb25zdCBkcmFnT3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zLmRyYWc7XG5cbiAgICByZXR1cm4gZHJhZ09wdGlvbnMuZW5hYmxlZFxuICAgICAgPyB7IG5hbWU6ICdkcmFnJywgYXhpczogKGRyYWdPcHRpb25zLmxvY2tBeGlzID09PSAnc3RhcnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBkcmFnT3B0aW9ucy5zdGFydEF4aXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRyYWdPcHRpb25zLmxvY2tBeGlzKX1cbiAgICAgIDogbnVsbDtcbiAgfSxcblxuICBnZXRDdXJzb3I6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJ21vdmUnO1xuICB9LFxufTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYmVmb3JlLWFjdGlvbi1tb3ZlJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2RyYWcnKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IGF4aXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5heGlzO1xuXG4gIGlmIChheGlzID09PSAneCcpIHtcbiAgICBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZS55ICAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnk7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLmNsaWVudC55ID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lnk7XG5cbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS5zcGVlZCAgID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudngpO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQuc3BlZWQgPSBNYXRoLmFicyhpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ4KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ5ID0gMDtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS52eSAgID0gMDtcbiAgfVxuICBlbHNlIGlmIChheGlzID09PSAneScpIHtcbiAgICBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZS54ICAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLng7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLmNsaWVudC54ID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lng7XG5cbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS5zcGVlZCAgID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudnkpO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQuc3BlZWQgPSBNYXRoLmFicyhpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ5KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ4ID0gMDtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS52eCAgID0gMDtcbiAgfVxufSk7XG5cbi8vIGRyYWdtb3ZlXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uICh7IGlFdmVudCwgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdkcmFnbW92ZScpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgYXhpcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmF4aXM7XG5cbiAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgIGlFdmVudC5wYWdlWSAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55O1xuICAgIGlFdmVudC5jbGllbnRZID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lnk7XG4gICAgaUV2ZW50LmR5ID0gMDtcbiAgfVxuICBlbHNlIGlmIChheGlzID09PSAneScpIHtcbiAgICBpRXZlbnQucGFnZVggICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueDtcbiAgICBpRXZlbnQuY2xpZW50WCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC54O1xuICAgIGlFdmVudC5keCA9IDA7XG4gIH1cbn0pO1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdChlbGVtZW50KS5kcmFnZ2FibGUoe1xuICogICAgIG9uc3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICpcbiAqICAgICAvLyB0aGUgYXhpcyBpbiB3aGljaCB0aGUgZmlyc3QgbW92ZW1lbnQgbXVzdCBiZVxuICogICAgIC8vIGZvciB0aGUgZHJhZyBzZXF1ZW5jZSB0byBzdGFydFxuICogICAgIC8vICd4eScgYnkgZGVmYXVsdCAtIGFueSBkaXJlY3Rpb25cbiAqICAgICBzdGFydEF4aXM6ICd4JyB8fCAneScgfHwgJ3h5JyxcbiAqXG4gKiAgICAgLy8gJ3h5JyBieSBkZWZhdWx0IC0gZG9uJ3QgcmVzdHJpY3QgdG8gb25lIGF4aXMgKG1vdmUgaW4gYW55IGRpcmVjdGlvbilcbiAqICAgICAvLyAneCcgb3IgJ3knIHRvIHJlc3RyaWN0IG1vdmVtZW50IHRvIGVpdGhlciBheGlzXG4gKiAgICAgLy8gJ3N0YXJ0JyB0byByZXN0cmljdCBtb3ZlbWVudCB0byB0aGUgYXhpcyB0aGUgZHJhZyBzdGFydGVkIGluXG4gKiAgICAgbG9ja0F4aXM6ICd4JyB8fCAneScgfHwgJ3h5JyB8fCAnc3RhcnQnLFxuICpcbiAqICAgICAvLyBtYXggbnVtYmVyIG9mIGRyYWdzIHRoYXQgY2FuIGhhcHBlbiBjb25jdXJyZW50bHlcbiAqICAgICAvLyB3aXRoIGVsZW1lbnRzIG9mIHRoaXMgSW50ZXJhY3RhYmxlLiBJbmZpbml0eSBieSBkZWZhdWx0XG4gKiAgICAgbWF4OiBJbmZpbml0eSxcbiAqXG4gKiAgICAgLy8gbWF4IG51bWJlciBvZiBkcmFncyB0aGF0IGNhbiB0YXJnZXQgdGhlIHNhbWUgZWxlbWVudCtJbnRlcmFjdGFibGVcbiAqICAgICAvLyAxIGJ5IGRlZmF1bHRcbiAqICAgICBtYXhQZXJFbGVtZW50OiAyXG4gKiB9KTtcbiAqXG4gKiB2YXIgaXNEcmFnZ2FibGUgPSBpbnRlcmFjdCgnZWxlbWVudCcpLmRyYWdnYWJsZSgpOyAvLyB0cnVlXG4gKiBgYGBcbiAqXG4gKiBHZXQgb3Igc2V0IHdoZXRoZXIgZHJhZyBhY3Rpb25zIGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdH0gW29wdGlvbnNdIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnRcbiAqIGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiBkcmFnIGV2ZW50cyAob2JqZWN0IG1ha2VzIHRoZSBJbnRlcmFjdGFibGVcbiAqIGRyYWdnYWJsZSlcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGlzIGNhbiBiZSB0aGVcbiAqIHRhcmdldCBvZiBkcmFnIGV2ZW50cywgb3IgdGhpcyBJbnRlcmN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmRyYWdnYWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHJhZy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZT8gZmFsc2U6IHRydWU7XG4gICAgdGhpcy5zZXRQZXJBY3Rpb24oJ2RyYWcnLCBvcHRpb25zKTtcbiAgICB0aGlzLnNldE9uRXZlbnRzKCdkcmFnJywgb3B0aW9ucyk7XG5cbiAgICBpZiAoL14oeHl8eHx5fHN0YXJ0KSQvLnRlc3Qob3B0aW9ucy5sb2NrQXhpcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcmFnLmxvY2tBeGlzID0gb3B0aW9ucy5sb2NrQXhpcztcbiAgICB9XG4gICAgaWYgKC9eKHh5fHh8eSkkLy50ZXN0KG9wdGlvbnMuc3RhcnRBeGlzKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmRyYWcuc3RhcnRBeGlzID0gb3B0aW9ucy5zdGFydEF4aXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5kcmFnLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aGlzLm9uZHJhZ3N0YXJ0ID0gdGhpcy5vbmRyYWdzdGFydCA9IHRoaXMub25kcmFnZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLm9wdGlvbnMuZHJhZztcbn07XG5cbmFjdGlvbnMuZHJhZyA9IGRyYWc7XG5hY3Rpb25zLm5hbWVzLnB1c2goJ2RyYWcnKTtcbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbXG4gICdkcmFnc3RhcnQnLFxuICAnZHJhZ21vdmUnLFxuICAnZHJhZ2luZXJ0aWFzdGFydCcsXG4gICdkcmFnaW5lcnRpYXJlc3VtZScsXG4gICdkcmFnZW5kJyxcbl0pO1xuYWN0aW9ucy5tZXRob2REaWN0LmRyYWcgPSAnZHJhZ2dhYmxlJztcblxuZGVmYXVsdE9wdGlvbnMuZHJhZyA9IGRyYWcuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZztcbiIsImNvbnN0IGNsb25lICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvY2xvbmUnKTtcbmNvbnN0IGlzICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvaXMnKTtcbmNvbnN0IGV2ZW50cyAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG5jb25zdCBleHRlbmQgICAgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpO1xuY29uc3QgYWN0aW9ucyAgID0gcmVxdWlyZSgnLi9hY3Rpb25zL2Jhc2UnKTtcbmNvbnN0IHNjb3BlICAgICA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbmNvbnN0IEV2ZW50YWJsZSA9IHJlcXVpcmUoJy4vRXZlbnRhYmxlJyk7XG5jb25zdCBkZWZhdWx0cyAgPSByZXF1aXJlKCcuL2RlZmF1bHRPcHRpb25zJyk7XG5jb25zdCBzaWduYWxzICAgPSByZXF1aXJlKCcuL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxuY29uc3Qge1xuICBnZXRFbGVtZW50UmVjdCxcbiAgbm9kZUNvbnRhaW5zLFxuICB0cnlTZWxlY3RvcixcbiAgbWF0Y2hlc1NlbGVjdG9yLFxufSAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2RvbVV0aWxzJyk7XG5jb25zdCB7IGdldFdpbmRvdyB9ICA9IHJlcXVpcmUoJy4vdXRpbHMvd2luZG93Jyk7XG5jb25zdCB7IGNvbnRhaW5zIH0gICA9IHJlcXVpcmUoJy4vdXRpbHMvYXJyJyk7XG5jb25zdCB7IHdoZWVsRXZlbnQgfSA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpO1xuXG4vLyBhbGwgc2V0IGludGVyYWN0YWJsZXNcbnNjb3BlLmludGVyYWN0YWJsZXMgPSBbXTtcblxuY2xhc3MgSW50ZXJhY3RhYmxlIHtcbiAgLyoqICovXG4gIGNvbnN0cnVjdG9yICh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMudGFyZ2V0ICAgPSB0YXJnZXQ7XG4gICAgdGhpcy5ldmVudHMgICA9IG5ldyBFdmVudGFibGUoKTtcbiAgICB0aGlzLl9jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8IHNjb3BlLmRvY3VtZW50O1xuICAgIHRoaXMuX3dpbiAgICAgPSBnZXRXaW5kb3codHJ5U2VsZWN0b3IodGFyZ2V0KT8gdGhpcy5fY29udGV4dCA6IHRhcmdldCk7XG4gICAgdGhpcy5fZG9jICAgICA9IHRoaXMuX3dpbi5kb2N1bWVudDtcblxuICAgIHNpZ25hbHMuZmlyZSgnbmV3Jywge1xuICAgICAgdGFyZ2V0LFxuICAgICAgb3B0aW9ucyxcbiAgICAgIGludGVyYWN0YWJsZTogdGhpcyxcbiAgICAgIHdpbjogdGhpcy5fd2luLFxuICAgIH0pO1xuXG4gICAgc2NvcGUuYWRkRG9jdW1lbnQoIHRoaXMuX2RvYywgdGhpcy5fd2luICk7XG5cbiAgICBzY29wZS5pbnRlcmFjdGFibGVzLnB1c2godGhpcyk7XG5cbiAgICB0aGlzLnNldChvcHRpb25zKTtcbiAgfVxuXG4gIHNldE9uRXZlbnRzIChhY3Rpb24sIHBoYXNlcykge1xuICAgIGNvbnN0IG9uQWN0aW9uID0gJ29uJyArIGFjdGlvbjtcblxuICAgIGlmIChpcy5mdW5jdGlvbihwaGFzZXMub25zdGFydCkgICAgICAgKSB7IHRoaXMuZXZlbnRzW29uQWN0aW9uICsgJ3N0YXJ0JyAgICAgICAgXSA9IHBoYXNlcy5vbnN0YXJ0ICAgICAgICAgOyB9XG4gICAgaWYgKGlzLmZ1bmN0aW9uKHBoYXNlcy5vbm1vdmUpICAgICAgICApIHsgdGhpcy5ldmVudHNbb25BY3Rpb24gKyAnbW92ZScgICAgICAgICBdID0gcGhhc2VzLm9ubW92ZSAgICAgICAgICA7IH1cbiAgICBpZiAoaXMuZnVuY3Rpb24ocGhhc2VzLm9uZW5kKSAgICAgICAgICkgeyB0aGlzLmV2ZW50c1tvbkFjdGlvbiArICdlbmQnICAgICAgICAgIF0gPSBwaGFzZXMub25lbmQgICAgICAgICAgIDsgfVxuICAgIGlmIChpcy5mdW5jdGlvbihwaGFzZXMub25pbmVydGlhc3RhcnQpKSB7IHRoaXMuZXZlbnRzW29uQWN0aW9uICsgJ2luZXJ0aWFzdGFydCcgXSA9IHBoYXNlcy5vbmluZXJ0aWFzdGFydCAgOyB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFBlckFjdGlvbiAoYWN0aW9uLCBvcHRpb25zKSB7XG4gICAgLy8gZm9yIGFsbCB0aGUgZGVmYXVsdCBwZXItYWN0aW9uIG9wdGlvbnNcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICAvLyBpZiB0aGlzIG9wdGlvbiBleGlzdHMgZm9yIHRoaXMgYWN0aW9uXG4gICAgICBpZiAob3B0aW9uIGluIGRlZmF1bHRzW2FjdGlvbl0pIHtcbiAgICAgICAgLy8gaWYgdGhlIG9wdGlvbiBpbiB0aGUgb3B0aW9ucyBhcmcgaXMgYW4gb2JqZWN0IHZhbHVlXG4gICAgICAgIGlmIChpcy5vYmplY3Qob3B0aW9uc1tvcHRpb25dKSkge1xuICAgICAgICAgIC8vIGR1cGxpY2F0ZSB0aGUgb2JqZWN0IGFuZCBtZXJnZVxuICAgICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0gPSBjbG9uZSh0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dIHx8IHt9KTtcbiAgICAgICAgICBleHRlbmQodGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSwgb3B0aW9uc1tvcHRpb25dKTtcblxuICAgICAgICAgIGlmIChpcy5vYmplY3QoZGVmYXVsdHMucGVyQWN0aW9uW29wdGlvbl0pICYmICdlbmFibGVkJyBpbiBkZWZhdWx0cy5wZXJBY3Rpb25bb3B0aW9uXSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXS5lbmFibGVkID0gb3B0aW9uc1tvcHRpb25dLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLmJvb2wob3B0aW9uc1tvcHRpb25dKSAmJiBpcy5vYmplY3QoZGVmYXVsdHMucGVyQWN0aW9uW29wdGlvbl0pKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXS5lbmFibGVkID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnNbb3B0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gb3IgaWYgaXQncyBub3QgdW5kZWZpbmVkLCBkbyBhIHBsYWluIGFzc2lnbm1lbnRcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGZ1bmN0aW9uIHRvIGdldCBhbiBJbnRlcmFjdGFibGVzIGJvdW5kaW5nIHJlY3QuIENhbiBiZVxuICAgKiBvdmVycmlkZGVuIHVzaW5nIHtAbGluayBJbnRlcmFjdGFibGUucmVjdENoZWNrZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IFtlbGVtZW50XSBUaGUgZWxlbWVudCB0byBtZWFzdXJlLlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBvYmplY3QncyBib3VuZGluZyByZWN0YW5nbGUuXG4gICAqL1xuICBnZXRSZWN0IChlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy50YXJnZXQ7XG5cbiAgICBpZiAoaXMuc3RyaW5nKHRoaXMudGFyZ2V0KSAmJiAhKGlzLmVsZW1lbnQoZWxlbWVudCkpKSB7XG4gICAgICBlbGVtZW50ID0gdGhpcy5fY29udGV4dC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0RWxlbWVudFJlY3QoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBvciBzZXRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgaW50ZXJhY3RhYmxlJ3NcbiAgICogZWxlbWVudCdzIHJlY3RhbmdsZVxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2hlY2tlcl0gQSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoaXMgSW50ZXJhY3RhYmxlJ3NcbiAgICogYm91bmRpbmcgcmVjdGFuZ2xlLiBTZWUge0BsaW5rIEludGVyYWN0YWJsZS5nZXRSZWN0fVxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbiB8IG9iamVjdH0gVGhlIGNoZWNrZXIgZnVuY3Rpb24gb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIHJlY3RDaGVja2VyIChjaGVja2VyKSB7XG4gICAgaWYgKGlzLmZ1bmN0aW9uKGNoZWNrZXIpKSB7XG4gICAgICB0aGlzLmdldFJlY3QgPSBjaGVja2VyO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tlciA9PT0gbnVsbCkge1xuICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5nZXRSZWN0O1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSZWN0O1xuICB9XG5cbiAgX2JhY2tDb21wYXRPcHRpb24gKG9wdGlvbk5hbWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKHRyeVNlbGVjdG9yKG5ld1ZhbHVlKSB8fCBpcy5vYmplY3QobmV3VmFsdWUpKSB7XG4gICAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSBuZXdWYWx1ZTtcblxuICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucy5uYW1lcykge1xuICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25OYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgb3JpZ2luIG9mIHRoZSBJbnRlcmFjdGFibGUncyBlbGVtZW50LiAgVGhlIHggYW5kIHlcbiAgICogb2YgdGhlIG9yaWdpbiB3aWxsIGJlIHN1YnRyYWN0ZWQgZnJvbSBhY3Rpb24gZXZlbnQgY29vcmRpbmF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudCB8IG9iamVjdCB8IHN0cmluZ30gW29yaWdpbl0gQW4gSFRNTCBvciBTVkcgRWxlbWVudCB3aG9zZVxuICAgKiByZWN0IHdpbGwgYmUgdXNlZCwgYW4gb2JqZWN0IGVnLiB7IHg6IDAsIHk6IDAgfSBvciBzdHJpbmcgJ3BhcmVudCcsICdzZWxmJ1xuICAgKiBvciBhbnkgQ1NTIHNlbGVjdG9yXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIGN1cnJlbnQgb3JpZ2luIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICBvcmlnaW4gKG5ld1ZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JhY2tDb21wYXRPcHRpb24oJ29yaWdpbicsIG5ld1ZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1vdXNlIGNvb3JkaW5hdGUgdHlwZXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlXG4gICAqIG1vdmVtZW50IG9mIHRoZSBwb2ludGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25ld1ZhbHVlXSBVc2UgJ2NsaWVudCcgaWYgeW91IHdpbGwgYmUgc2Nyb2xsaW5nIHdoaWxlXG4gICAqIGludGVyYWN0aW5nOyBVc2UgJ3BhZ2UnIGlmIHlvdSB3YW50IGF1dG9TY3JvbGwgdG8gd29ya1xuICAgKiBAcmV0dXJuIHtzdHJpbmcgfCBvYmplY3R9IFRoZSBjdXJyZW50IGRlbHRhU291cmNlIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICBkZWx0YVNvdXJjZSAobmV3VmFsdWUpIHtcbiAgICBpZiAobmV3VmFsdWUgPT09ICdwYWdlJyB8fCBuZXdWYWx1ZSA9PT0gJ2NsaWVudCcpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kZWx0YVNvdXJjZSA9IG5ld1ZhbHVlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRlbHRhU291cmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNlbGVjdG9yIGNvbnRleHQgTm9kZSBvZiB0aGUgSW50ZXJhY3RhYmxlLiBUaGUgZGVmYXVsdCBpc1xuICAgKiBgd2luZG93LmRvY3VtZW50YC5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhlIGNvbnRleHQgTm9kZSBvZiB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgY29udGV4dCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gIH1cblxuICBpbkNvbnRleHQgKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gKHRoaXMuX2NvbnRleHQgPT09IGVsZW1lbnQub3duZXJEb2N1bWVudFxuICAgICAgICAgICAgfHwgbm9kZUNvbnRhaW5zKHRoaXMuX2NvbnRleHQsIGVsZW1lbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBsaXN0ZW5lcnMgZm9yIHRoZSBnaXZlbiBJbnRlcmFjdEV2ZW50IHR5cGUgYm91bmQgZ2xvYmFsbHlcbiAgICogYW5kIGRpcmVjdGx5IHRvIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7SW50ZXJhY3RFdmVudH0gaUV2ZW50IFRoZSBJbnRlcmFjdEV2ZW50IG9iamVjdCB0byBiZSBmaXJlZCBvbiB0aGlzXG4gICAqIEludGVyYWN0YWJsZVxuICAgKiBAcmV0dXJuIHtJbnRlcmFjdGFibGV9IHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICBmaXJlIChpRXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50cy5maXJlKGlFdmVudCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9vbk9mZk11bHRpcGxlIChtZXRob2QsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXMuc3RyaW5nKGV2ZW50VHlwZSkgJiYgZXZlbnRUeXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgICAgZXZlbnRUeXBlID0gZXZlbnRUeXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgICB9XG5cbiAgICBpZiAoaXMuYXJyYXkoZXZlbnRUeXBlKSkge1xuICAgICAgZm9yIChjb25zdCB0eXBlIG9mIGV2ZW50VHlwZSkge1xuICAgICAgICB0aGlzW21ldGhvZF0odHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXMub2JqZWN0KGV2ZW50VHlwZSkpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBldmVudFR5cGUpIHtcbiAgICAgICAgdGhpc1ttZXRob2RdKHByb3AsIGV2ZW50VHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgYSBsaXN0ZW5lciBmb3IgYW4gSW50ZXJhY3RFdmVudCwgcG9pbnRlckV2ZW50IG9yIERPTSBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheSB8IG9iamVjdH0gZXZlbnRUeXBlICBUaGUgdHlwZXMgb2YgZXZlbnRzIHRvIGxpc3RlblxuICAgKiBmb3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgICBUaGUgZnVuY3Rpb24gZXZlbnQgKHMpXG4gICAqIEBwYXJhbSB7b2JqZWN0IHwgYm9vbGVhbn0gW29wdGlvbnNdICAgIG9wdGlvbnMgb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZ1xuICAgKiBmb3IgYWRkRXZlbnRMaXN0ZW5lclxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICBvbiAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzLl9vbk9mZk11bHRpcGxlKCdvbicsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoZXZlbnRUeXBlID09PSAnd2hlZWwnKSB7IGV2ZW50VHlwZSA9IHdoZWVsRXZlbnQ7IH1cblxuICAgIGlmIChjb250YWlucyhJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5ldmVudHMub24oZXZlbnRUeXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIC8vIGRlbGVnYXRlZCBldmVudCBmb3Igc2VsZWN0b3JcbiAgICBlbHNlIGlmIChpcy5zdHJpbmcodGhpcy50YXJnZXQpKSB7XG4gICAgICBldmVudHMuYWRkRGVsZWdhdGUodGhpcy50YXJnZXQsIHRoaXMuX2NvbnRleHQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGV2ZW50cy5hZGQodGhpcy50YXJnZXQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gSW50ZXJhY3RFdmVudCwgcG9pbnRlckV2ZW50IG9yIERPTSBldmVudCBsaXN0ZW5lclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5IHwgb2JqZWN0fSBldmVudFR5cGUgVGhlIHR5cGVzIG9mIGV2ZW50cyB0aGF0IHdlcmVcbiAgICogbGlzdGVuZWQgZm9yXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0byBiZSByZW1vdmVkXG4gICAqIEBwYXJhbSB7b2JqZWN0IHwgYm9vbGVhbn0gW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZyBmb3JcbiAgICogcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICBvZmYgKGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5fb25PZmZNdWx0aXBsZSgnb2ZmJywgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmIChldmVudFR5cGUgPT09ICd3aGVlbCcpIHsgZXZlbnRUeXBlID0gd2hlZWxFdmVudDsgfVxuXG4gICAgLy8gaWYgaXQgaXMgYW4gYWN0aW9uIGV2ZW50IHR5cGVcbiAgICBpZiAoY29udGFpbnMoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9mZihldmVudFR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgLy8gZGVsZWdhdGVkIGV2ZW50XG4gICAgZWxzZSBpZiAoaXMuc3RyaW5nKHRoaXMudGFyZ2V0KSkge1xuICAgICAgZXZlbnRzLnJlbW92ZURlbGVnYXRlKHRoaXMudGFyZ2V0LCB0aGlzLl9jb250ZXh0LCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGZyb20gdGhpcyBJbnRlcmF0YWJsZSdzIGVsZW1lbnRcbiAgICBlbHNlIHtcbiAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy50YXJnZXQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBvcHRpb25zIG9mIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFRoZSBuZXcgc2V0dGluZ3MgdG8gYXBwbHlcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgc2V0IChvcHRpb25zKSB7XG4gICAgaWYgKCFpcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBjbG9uZShkZWZhdWx0cy5iYXNlKTtcblxuICAgIGNvbnN0IHBlckFjdGlvbnMgPSBjbG9uZShkZWZhdWx0cy5wZXJBY3Rpb24pO1xuXG4gICAgZm9yIChjb25zdCBhY3Rpb25OYW1lIGluIGFjdGlvbnMubWV0aG9kRGljdCkge1xuICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGFjdGlvbnMubWV0aG9kRGljdFthY3Rpb25OYW1lXTtcblxuICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbk5hbWVdID0gY2xvbmUoZGVmYXVsdHNbYWN0aW9uTmFtZV0pO1xuXG4gICAgICB0aGlzLnNldFBlckFjdGlvbihhY3Rpb25OYW1lLCBwZXJBY3Rpb25zKTtcblxuICAgICAgdGhpc1ttZXRob2ROYW1lXShvcHRpb25zW2FjdGlvbk5hbWVdKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcykge1xuICAgICAgdGhpcy5vcHRpb25zW3NldHRpbmddID0gZGVmYXVsdHMuYmFzZVtzZXR0aW5nXTtcblxuICAgICAgaWYgKHNldHRpbmcgaW4gb3B0aW9ucykge1xuICAgICAgICB0aGlzW3NldHRpbmddKG9wdGlvbnNbc2V0dGluZ10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNpZ25hbHMuZmlyZSgnc2V0Jywge1xuICAgICAgb3B0aW9ucyxcbiAgICAgIGludGVyYWN0YWJsZTogdGhpcyxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGlzIGludGVyYWN0YWJsZSBmcm9tIHRoZSBsaXN0IG9mIGludGVyYWN0YWJsZXMgYW5kIHJlbW92ZSBpdCdzXG4gICAqIGFjdGlvbiBjYXBhYmlsaXRpZXMgYW5kIGV2ZW50IGxpc3RlbmVyc1xuICAgKlxuICAgKiBAcmV0dXJuIHtpbnRlcmFjdH1cbiAgICovXG4gIHVuc2V0ICgpIHtcbiAgICBldmVudHMucmVtb3ZlKHRoaXMudGFyZ2V0LCAnYWxsJyk7XG5cbiAgICBpZiAoaXMuc3RyaW5nKHRoaXMudGFyZ2V0KSkge1xuICAgICAgLy8gcmVtb3ZlIGRlbGVnYXRlZCBldmVudHNcbiAgICAgIGZvciAoY29uc3QgdHlwZSBpbiBldmVudHMuZGVsZWdhdGVkRXZlbnRzKSB7XG4gICAgICAgIGNvbnN0IGRlbGVnYXRlZCA9IGV2ZW50cy5kZWxlZ2F0ZWRFdmVudHNbdHlwZV07XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlZC5zZWxlY3RvcnNbMF0gPT09IHRoaXMudGFyZ2V0XG4gICAgICAgICAgICAmJiBkZWxlZ2F0ZWQuY29udGV4dHNbMF0gPT09IHRoaXMuX2NvbnRleHQpIHtcblxuICAgICAgICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgIGRlbGVnYXRlZC5jb250ZXh0cyAuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgIGRlbGVnYXRlZC5saXN0ZW5lcnMuc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBhcnJheXMgaWYgdGhleSBhcmUgZW1wdHlcbiAgICAgICAgICBpZiAoIWRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZWRbdHlwZV0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy5fY29udGV4dCwgdHlwZSwgZXZlbnRzLmRlbGVnYXRlTGlzdGVuZXIpO1xuICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2NvbnRleHQsIHR5cGUsIGV2ZW50cy5kZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGV2ZW50cy5yZW1vdmUodGhpcywgJ2FsbCcpO1xuICAgIH1cblxuICAgIHNpZ25hbHMuZmlyZSgndW5zZXQnLCB7IGludGVyYWN0YWJsZTogdGhpcyB9KTtcblxuICAgIHNjb3BlLmludGVyYWN0YWJsZXMuc3BsaWNlKHNjb3BlLmludGVyYWN0YWJsZXMuaW5kZXhPZih0aGlzKSwgMSk7XG5cbiAgICAvLyBTdG9wIHJlbGF0ZWQgaW50ZXJhY3Rpb25zIHdoZW4gYW4gSW50ZXJhY3RhYmxlIGlzIHVuc2V0XG4gICAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMgfHwgW10pIHtcbiAgICAgIGlmIChpbnRlcmFjdGlvbi50YXJnZXQgPT09IHRoaXMgJiYgaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSAmJiAhaW50ZXJhY3Rpb24uX2VuZGluZykge1xuICAgICAgICBpbnRlcmFjdGlvbi5zdG9wKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjb3BlLmludGVyYWN0O1xuICB9XG59XG5cbnNjb3BlLmludGVyYWN0YWJsZXMuaW5kZXhPZkVsZW1lbnQgPSBmdW5jdGlvbiBpbmRleE9mRWxlbWVudCAodGFyZ2V0LCBjb250ZXh0KSB7XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IHNjb3BlLmRvY3VtZW50O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGludGVyYWN0YWJsZSA9IHRoaXNbaV07XG5cbiAgICBpZiAoaW50ZXJhY3RhYmxlLnRhcmdldCA9PT0gdGFyZ2V0ICYmIGludGVyYWN0YWJsZS5fY29udGV4dCA9PT0gY29udGV4dCkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbnNjb3BlLmludGVyYWN0YWJsZXMuZ2V0ID0gZnVuY3Rpb24gaW50ZXJhY3RhYmxlR2V0IChlbGVtZW50LCBvcHRpb25zLCBkb250Q2hlY2tJbkNvbnRleHQpIHtcbiAgY29uc3QgcmV0ID0gdGhpc1t0aGlzLmluZGV4T2ZFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0KV07XG5cbiAgcmV0dXJuIHJldCAmJiAoaXMuc3RyaW5nKGVsZW1lbnQpIHx8IGRvbnRDaGVja0luQ29udGV4dCB8fCByZXQuaW5Db250ZXh0KGVsZW1lbnQpKT8gcmV0IDogbnVsbDtcbn07XG5cbnNjb3BlLmludGVyYWN0YWJsZXMuZm9yRWFjaE1hdGNoID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gIGZvciAoY29uc3QgaW50ZXJhY3RhYmxlIG9mIHRoaXMpIHtcbiAgICBsZXQgcmV0O1xuXG4gICAgaWYgKChpcy5zdHJpbmcoaW50ZXJhY3RhYmxlLnRhcmdldClcbiAgICAgICAgLy8gdGFyZ2V0IGlzIGEgc2VsZWN0b3IgYW5kIHRoZSBlbGVtZW50IG1hdGNoZXNcbiAgICAgICAgPyAoaXMuZWxlbWVudChlbGVtZW50KSAmJiBtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgaW50ZXJhY3RhYmxlLnRhcmdldCkpXG4gICAgICAgIC8vIHRhcmdldCBpcyB0aGUgZWxlbWVudFxuICAgICAgICA6IGVsZW1lbnQgPT09IGludGVyYWN0YWJsZS50YXJnZXQpXG4gICAgICAgIC8vIHRoZSBlbGVtZW50IGlzIGluIGNvbnRleHRcbiAgICAgICYmIChpbnRlcmFjdGFibGUuaW5Db250ZXh0KGVsZW1lbnQpKSkge1xuICAgICAgcmV0ID0gY2FsbGJhY2soaW50ZXJhY3RhYmxlKTtcbiAgICB9XG5cbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XG59O1xuXG4vLyBhbGwgaW50ZXJhY3QuanMgZXZlbnRUeXBlc1xuSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMgPSBzY29wZS5ldmVudFR5cGVzID0gW107XG5cbkludGVyYWN0YWJsZS5zaWduYWxzID0gc2lnbmFscztcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcyA9IFsgJ2RlbHRhU291cmNlJywgJ29yaWdpbicsICdwcmV2ZW50RGVmYXVsdCcsICdyZWN0Q2hlY2tlcicgXTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmFjdGFibGU7XG4iLCJjb25zdCBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbG9uZSAoc291cmNlKSB7XG4gIGNvbnN0IGRlc3QgPSB7fTtcbiAgZm9yIChjb25zdCBwcm9wIGluIHNvdXJjZSkge1xuICAgIGlmIChpcy5wbGFpbk9iamVjdChzb3VyY2VbcHJvcF0pKSB7XG4gICAgICBkZXN0W3Byb3BdID0gY2xvbmUoc291cmNlW3Byb3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuIiwiY29uc3QgSW50ZXJhY3Rpb24gICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuXG5jb25zdCBhY3Rpb25zID0ge1xuICBmaXJlUHJlcGFyZWQsXG4gIG5hbWVzOiBbXSxcbiAgbWV0aG9kRGljdDoge30sXG59O1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tc3RhcnQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnQgfSkge1xuICBpbnRlcmFjdGlvbi5faW50ZXJhY3RpbmcgPSB0cnVlO1xuICBmaXJlUHJlcGFyZWQoaW50ZXJhY3Rpb24sIGV2ZW50LCAnc3RhcnQnKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tbW92ZScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudCwgcHJlRW5kIH0pIHtcbiAgZmlyZVByZXBhcmVkKGludGVyYWN0aW9uLCBldmVudCwgJ21vdmUnLCBwcmVFbmQpO1xuXG4gIC8vIGlmIHRoZSBhY3Rpb24gd2FzIGVuZGVkIGluIGEgbGlzdGVuZXJcbiAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7IHJldHVybiBmYWxzZTsgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1lbmQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnQgfSkge1xuICBmaXJlUHJlcGFyZWQoaW50ZXJhY3Rpb24sIGV2ZW50LCAnZW5kJyk7XG59KTtcblxuZnVuY3Rpb24gZmlyZVByZXBhcmVkIChpbnRlcmFjdGlvbiwgZXZlbnQsIHBoYXNlLCBwcmVFbmQpIHtcbiAgY29uc3QgYWN0aW9uTmFtZSA9IGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWU7XG5cbiAgY29uc3QgbmV3RXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudChpbnRlcmFjdGlvbiwgZXZlbnQsIGFjdGlvbk5hbWUsIHBoYXNlLCBpbnRlcmFjdGlvbi5lbGVtZW50LCBudWxsLCBwcmVFbmQpO1xuXG4gIGludGVyYWN0aW9uLnRhcmdldC5maXJlKG5ld0V2ZW50KTtcbiAgaW50ZXJhY3Rpb24ucHJldkV2ZW50ID0gbmV3RXZlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWN0aW9ucztcbiIsImNvbnN0IHNjb3BlICAgICAgPSByZXF1aXJlKCcuL3Njb3BlJyk7XG5jb25zdCB1dGlscyAgICAgID0gcmVxdWlyZSgnLi91dGlscycpO1xuY29uc3QgZXZlbnRzICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG5jb25zdCBicm93c2VyICAgID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJyk7XG5jb25zdCBkb21PYmplY3RzID0gcmVxdWlyZSgnLi91dGlscy9kb21PYmplY3RzJyk7XG5jb25zdCBmaW5kZXIgICAgID0gcmVxdWlyZSgnLi91dGlscy9pbnRlcmFjdGlvbkZpbmRlcicpO1xuY29uc3Qgc2lnbmFscyAgICA9IHJlcXVpcmUoJy4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG5jb25zdCBsaXN0ZW5lcnMgICA9IHt9O1xuY29uc3QgbWV0aG9kTmFtZXMgPSBbXG4gICdwb2ludGVyRG93bicsICdwb2ludGVyTW92ZScsICdwb2ludGVyVXAnLFxuICAndXBkYXRlUG9pbnRlcicsICdyZW1vdmVQb2ludGVyJyxcbl07XG5cbi8vIGZvciBpZ25vcmluZyBicm93c2VyJ3Mgc2ltdWxhdGVkIG1vdXNlIGV2ZW50c1xubGV0IHByZXZUb3VjaFRpbWUgPSAwO1xuXG4vLyBhbGwgYWN0aXZlIGFuZCBpZGxlIGludGVyYWN0aW9uc1xuc2NvcGUuaW50ZXJhY3Rpb25zID0gW107XG5cbmNsYXNzIEludGVyYWN0aW9uIHtcbiAgLyoqICovXG4gIGNvbnN0cnVjdG9yICh7IHBvaW50ZXJUeXBlIH0pIHtcbiAgICB0aGlzLnRhcmdldCAgICAgICAgPSBudWxsOyAvLyBjdXJyZW50IGludGVyYWN0YWJsZSBiZWluZyBpbnRlcmFjdGVkIHdpdGhcbiAgICB0aGlzLmVsZW1lbnQgICAgICAgPSBudWxsOyAvLyB0aGUgdGFyZ2V0IGVsZW1lbnQgb2YgdGhlIGludGVyYWN0YWJsZVxuXG4gICAgdGhpcy5wcmVwYXJlZCAgICAgID0geyAgICAgLy8gYWN0aW9uIHRoYXQncyByZWFkeSB0byBiZSBmaXJlZCBvbiBuZXh0IG1vdmUgZXZlbnRcbiAgICAgIG5hbWUgOiBudWxsLFxuICAgICAgYXhpcyA6IG51bGwsXG4gICAgICBlZGdlczogbnVsbCxcbiAgICB9O1xuXG4gICAgLy8ga2VlcCB0cmFjayBvZiBhZGRlZCBwb2ludGVyc1xuICAgIHRoaXMucG9pbnRlcnMgICAgPSBbXTtcbiAgICB0aGlzLnBvaW50ZXJJZHMgID0gW107XG4gICAgdGhpcy5kb3duVGFyZ2V0cyA9IFtdO1xuICAgIHRoaXMuZG93blRpbWVzICAgPSBbXTtcblxuICAgIC8vIFByZXZpb3VzIG5hdGl2ZSBwb2ludGVyIG1vdmUgZXZlbnQgY29vcmRpbmF0ZXNcbiAgICB0aGlzLnByZXZDb29yZHMgPSB7XG4gICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMCxcbiAgICB9O1xuICAgIC8vIGN1cnJlbnQgbmF0aXZlIHBvaW50ZXIgbW92ZSBldmVudCBjb29yZGluYXRlc1xuICAgIHRoaXMuY3VyQ29vcmRzID0ge1xuICAgICAgcGFnZSAgICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGNsaWVudCAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICB0aW1lU3RhbXA6IDAsXG4gICAgfTtcblxuICAgIC8vIFN0YXJ0aW5nIEludGVyYWN0RXZlbnQgcG9pbnRlciBjb29yZGluYXRlc1xuICAgIHRoaXMuc3RhcnRDb29yZHMgPSB7XG4gICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMCxcbiAgICB9O1xuXG4gICAgLy8gQ2hhbmdlIGluIGNvb3JkaW5hdGVzIGFuZCB0aW1lIG9mIHRoZSBwb2ludGVyXG4gICAgdGhpcy5wb2ludGVyRGVsdGEgPSB7XG4gICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCwgdng6IDAsIHZ5OiAwLCBzcGVlZDogMCB9LFxuICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAsIHZ4OiAwLCB2eTogMCwgc3BlZWQ6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMCxcbiAgICB9O1xuXG4gICAgdGhpcy5kb3duRXZlbnQgICA9IG51bGw7ICAgIC8vIHBvaW50ZXJkb3duL21vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50XG4gICAgdGhpcy5kb3duUG9pbnRlciA9IHt9O1xuXG4gICAgdGhpcy5fZXZlbnRUYXJnZXQgICAgPSBudWxsO1xuICAgIHRoaXMuX2N1ckV2ZW50VGFyZ2V0ID0gbnVsbDtcblxuICAgIHRoaXMucHJldkV2ZW50ID0gbnVsbDsgICAgICAvLyBwcmV2aW91cyBhY3Rpb24gZXZlbnRcblxuICAgIHRoaXMucG9pbnRlcklzRG93biAgID0gZmFsc2U7XG4gICAgdGhpcy5wb2ludGVyV2FzTW92ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9pbnRlcmFjdGluZyAgICA9IGZhbHNlO1xuICAgIHRoaXMuX2VuZGluZyAgICAgICAgID0gZmFsc2U7XG5cbiAgICB0aGlzLnBvaW50ZXJUeXBlID0gcG9pbnRlclR5cGU7XG5cbiAgICBzaWduYWxzLmZpcmUoJ25ldycsIHRoaXMpO1xuXG4gICAgc2NvcGUuaW50ZXJhY3Rpb25zLnB1c2godGhpcyk7XG4gIH1cblxuICBwb2ludGVyRG93biAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gICAgY29uc3QgcG9pbnRlckluZGV4ID0gdGhpcy51cGRhdGVQb2ludGVyKHBvaW50ZXIsIGV2ZW50LCB0cnVlKTtcblxuICAgIHNpZ25hbHMuZmlyZSgnZG93bicsIHtcbiAgICAgIHBvaW50ZXIsXG4gICAgICBldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0LFxuICAgICAgcG9pbnRlckluZGV4LFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogYGBganNcbiAgICogaW50ZXJhY3QodGFyZ2V0KVxuICAgKiAgIC5kcmFnZ2FibGUoe1xuICAgKiAgICAgLy8gZGlzYWJsZSB0aGUgZGVmYXVsdCBkcmFnIHN0YXJ0IGJ5IGRvd24tPm1vdmVcbiAgICogICAgIG1hbnVhbFN0YXJ0OiB0cnVlXG4gICAqICAgfSlcbiAgICogICAvLyBzdGFydCBkcmFnZ2luZyBhZnRlciB0aGUgdXNlciBob2xkcyB0aGUgcG9pbnRlciBkb3duXG4gICAqICAgLm9uKCdob2xkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAqICAgICB2YXIgaW50ZXJhY3Rpb24gPSBldmVudC5pbnRlcmFjdGlvbjtcbiAgICpcbiAgICogICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgKiAgICAgICBpbnRlcmFjdGlvbi5zdGFydCh7IG5hbWU6ICdkcmFnJyB9LFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pbnRlcmFjdGFibGUsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgKiAgICAgfVxuICAgKiB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIFN0YXJ0IGFuIGFjdGlvbiB3aXRoIHRoZSBnaXZlbiBJbnRlcmFjdGFibGUgYW5kIEVsZW1lbnQgYXMgdGFydGdldHMuIFRoZVxuICAgKiBhY3Rpb24gbXVzdCBiZSBlbmFibGVkIGZvciB0aGUgdGFyZ2V0IEludGVyYWN0YWJsZSBhbmQgYW4gYXBwcm9wcmlhdGVcbiAgICogbnVtYmVyIG9mIHBvaW50ZXJzIG11c3QgYmUgaGVsZCBkb3duIC0gMSBmb3IgZHJhZy9yZXNpemUsIDIgZm9yIGdlc3R1cmUuXG4gICAqXG4gICAqIFVzZSBpdCB3aXRoIGBpbnRlcmFjdGFibGUuPGFjdGlvbj5hYmxlKHsgbWFudWFsU3RhcnQ6IGZhbHNlIH0pYCB0byBhbHdheXNcbiAgICogW3N0YXJ0IGFjdGlvbnMgbWFudWFsbHldKGh0dHBzOi8vZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL2lzc3Vlcy8xMTQpXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gICBUaGUgYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCAtIGRyYWcsIHJlc2l6ZSwgZXRjLlxuICAgKiBAcGFyYW0ge0ludGVyYWN0YWJsZX0gdGFyZ2V0ICBUaGUgSW50ZXJhY3RhYmxlIHRvIHRhcmdldFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIERPTSBFbGVtZW50IHRvIHRhcmdldFxuICAgKiBAcmV0dXJuIHtvYmplY3R9IGludGVyYWN0XG4gICAqL1xuICBzdGFydCAoYWN0aW9uLCB0YXJnZXQsIGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpXG4gICAgICAgIHx8ICF0aGlzLnBvaW50ZXJJc0Rvd25cbiAgICAgICAgfHwgdGhpcy5wb2ludGVySWRzLmxlbmd0aCA8IChhY3Rpb24ubmFtZSA9PT0gJ2dlc3R1cmUnPyAyIDogMSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGlzIGludGVyYWN0aW9uIGhhZCBiZWVuIHJlbW92ZWQgYWZ0ZXIgc3RvcHBpbmdcbiAgICAvLyBhZGQgaXQgYmFja1xuICAgIGlmIChzY29wZS5pbnRlcmFjdGlvbnMuaW5kZXhPZih0aGlzKSA9PT0gLTEpIHtcbiAgICAgIHNjb3BlLmludGVyYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIHV0aWxzLmNvcHlBY3Rpb24odGhpcy5wcmVwYXJlZCwgYWN0aW9uKTtcbiAgICB0aGlzLnRhcmdldCAgICAgICAgID0gdGFyZ2V0O1xuICAgIHRoaXMuZWxlbWVudCAgICAgICAgPSBlbGVtZW50O1xuXG4gICAgc2lnbmFscy5maXJlKCdhY3Rpb24tc3RhcnQnLCB7XG4gICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICAgIGV2ZW50OiB0aGlzLmRvd25FdmVudCxcbiAgICB9KTtcbiAgfVxuXG4gIHBvaW50ZXJNb3ZlIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpIHtcbiAgICBpZiAoIXRoaXMuc2ltdWxhdGlvbikge1xuICAgICAgdGhpcy51cGRhdGVQb2ludGVyKHBvaW50ZXIpO1xuICAgICAgdXRpbHMuc2V0Q29vcmRzKHRoaXMuY3VyQ29vcmRzLCB0aGlzLnBvaW50ZXJzKTtcbiAgICB9XG5cbiAgICBjb25zdCBkdXBsaWNhdGVNb3ZlID0gKHRoaXMuY3VyQ29vcmRzLnBhZ2UueCA9PT0gdGhpcy5wcmV2Q29vcmRzLnBhZ2UueFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJDb29yZHMucGFnZS55ID09PSB0aGlzLnByZXZDb29yZHMucGFnZS55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueCA9PT0gdGhpcy5wcmV2Q29vcmRzLmNsaWVudC54XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueSA9PT0gdGhpcy5wcmV2Q29vcmRzLmNsaWVudC55KTtcblxuICAgIGxldCBkeDtcbiAgICBsZXQgZHk7XG5cbiAgICAvLyByZWdpc3RlciBtb3ZlbWVudCBncmVhdGVyIHRoYW4gcG9pbnRlck1vdmVUb2xlcmFuY2VcbiAgICBpZiAodGhpcy5wb2ludGVySXNEb3duICYmICF0aGlzLnBvaW50ZXJXYXNNb3ZlZCkge1xuICAgICAgZHggPSB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueCAtIHRoaXMuc3RhcnRDb29yZHMuY2xpZW50Lng7XG4gICAgICBkeSA9IHRoaXMuY3VyQ29vcmRzLmNsaWVudC55IC0gdGhpcy5zdGFydENvb3Jkcy5jbGllbnQueTtcblxuICAgICAgdGhpcy5wb2ludGVyV2FzTW92ZWQgPSB1dGlscy5oeXBvdChkeCwgZHkpID4gSW50ZXJhY3Rpb24ucG9pbnRlck1vdmVUb2xlcmFuY2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc2lnbmFsQXJnID0ge1xuICAgICAgcG9pbnRlcixcbiAgICAgIHBvaW50ZXJJbmRleDogdGhpcy5nZXRQb2ludGVySW5kZXgocG9pbnRlciksXG4gICAgICBldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0LFxuICAgICAgZHgsXG4gICAgICBkeSxcbiAgICAgIGR1cGxpY2F0ZTogZHVwbGljYXRlTW92ZSxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgICAgaW50ZXJhY3RpbmdCZWZvcmVNb3ZlOiB0aGlzLmludGVyYWN0aW5nKCksXG4gICAgfTtcblxuICAgIGlmICghZHVwbGljYXRlTW92ZSkge1xuICAgICAgLy8gc2V0IHBvaW50ZXIgY29vcmRpbmF0ZSwgdGltZSBjaGFuZ2VzIGFuZCBzcGVlZHNcbiAgICAgIHV0aWxzLnNldENvb3JkRGVsdGFzKHRoaXMucG9pbnRlckRlbHRhLCB0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ21vdmUnLCBzaWduYWxBcmcpO1xuXG4gICAgaWYgKCFkdXBsaWNhdGVNb3ZlKSB7XG4gICAgICAvLyBpZiBpbnRlcmFjdGluZywgZmlyZSBhbiAnYWN0aW9uLW1vdmUnIHNpZ25hbCBldGNcbiAgICAgIGlmICh0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgdGhpcy5kb01vdmUoc2lnbmFsQXJnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucG9pbnRlcldhc01vdmVkKSB7XG4gICAgICAgIHV0aWxzLmNvcHlDb29yZHModGhpcy5wcmV2Q29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGBgYGpzXG4gICAqIGludGVyYWN0KHRhcmdldClcbiAgICogICAuZHJhZ2dhYmxlKHRydWUpXG4gICAqICAgLm9uKCdkcmFnbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgKiAgICAgaWYgKHNvbWVDb25kaXRpb24pIHtcbiAgICogICAgICAgLy8gY2hhbmdlIHRoZSBzbmFwIHNldHRpbmdzXG4gICAqICAgICAgIGV2ZW50LmludGVyYWN0YWJsZS5kcmFnZ2FibGUoeyBzbmFwOiB7IHRhcmdldHM6IFtdIH19KTtcbiAgICogICAgICAgLy8gZmlyZSBhbm90aGVyIG1vdmUgZXZlbnQgd2l0aCByZS1jYWxjdWxhdGVkIHNuYXBcbiAgICogICAgICAgZXZlbnQuaW50ZXJhY3Rpb24uZG9Nb3ZlKCk7XG4gICAqICAgICB9XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBGb3JjZSBhIG1vdmUgb2YgdGhlIGN1cnJlbnQgYWN0aW9uIGF0IHRoZSBzYW1lIGNvb3JkaW5hdGVzLiBVc2VmdWwgaWZcbiAgICogc25hcC9yZXN0cmljdCBoYXMgYmVlbiBjaGFuZ2VkIGFuZCB5b3Ugd2FudCBhIG1vdmVtZW50IHdpdGggdGhlIG5ld1xuICAgKiBzZXR0aW5ncy5cbiAgICovXG4gIGRvTW92ZSAoc2lnbmFsQXJnKSB7XG4gICAgc2lnbmFsQXJnID0gdXRpbHMuZXh0ZW5kKHtcbiAgICAgIHBvaW50ZXI6IHRoaXMucG9pbnRlcnNbMF0sXG4gICAgICBldmVudDogdGhpcy5wcmV2RXZlbnQsXG4gICAgICBldmVudFRhcmdldDogdGhpcy5fZXZlbnRUYXJnZXQsXG4gICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICB9LCBzaWduYWxBcmcgfHwge30pO1xuXG4gICAgc2lnbmFscy5maXJlKCdiZWZvcmUtYWN0aW9uLW1vdmUnLCBzaWduYWxBcmcpO1xuXG4gICAgaWYgKCF0aGlzLl9kb250RmlyZU1vdmUpIHtcbiAgICAgIHNpZ25hbHMuZmlyZSgnYWN0aW9uLW1vdmUnLCBzaWduYWxBcmcpO1xuICAgIH1cblxuICAgIHRoaXMuX2RvbnRGaXJlTW92ZSA9IGZhbHNlO1xuICB9XG5cbiAgLy8gRW5kIGludGVyYWN0IG1vdmUgZXZlbnRzIGFuZCBzdG9wIGF1dG8tc2Nyb2xsIHVubGVzcyBzaW11bGF0aW9uIGlzIHJ1bm5pbmdcbiAgcG9pbnRlclVwIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KSB7XG4gICAgY29uc3QgcG9pbnRlckluZGV4ID0gdGhpcy5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgICBzaWduYWxzLmZpcmUoL2NhbmNlbCQvaS50ZXN0KGV2ZW50LnR5cGUpPyAnY2FuY2VsJyA6ICd1cCcsIHtcbiAgICAgIHBvaW50ZXIsXG4gICAgICBwb2ludGVySW5kZXgsXG4gICAgICBldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0LFxuICAgICAgY3VyRXZlbnRUYXJnZXQsXG4gICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICB9KTtcblxuICAgIGlmICghdGhpcy5zaW11bGF0aW9uKSB7XG4gICAgICB0aGlzLmVuZChldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb2ludGVySXNEb3duID0gZmFsc2U7XG4gICAgdGhpcy5yZW1vdmVQb2ludGVyKHBvaW50ZXIsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBgYGBqc1xuICAgKiBpbnRlcmFjdCh0YXJnZXQpXG4gICAqICAgLmRyYWdnYWJsZSh0cnVlKVxuICAgKiAgIC5vbignbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgKiAgICAgaWYgKGV2ZW50LnBhZ2VYID4gMTAwMCkge1xuICAgKiAgICAgICAvLyBlbmQgdGhlIGN1cnJlbnQgYWN0aW9uXG4gICAqICAgICAgIGV2ZW50LmludGVyYWN0aW9uLmVuZCgpO1xuICAgKiAgICAgICAvLyBzdG9wIGFsbCBmdXJ0aGVyIGxpc3RlbmVycyBmcm9tIGJlaW5nIGNhbGxlZFxuICAgKiAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICogICAgIH1cbiAgICogICB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIFN0b3AgdGhlIGN1cnJlbnQgYWN0aW9uIGFuZCBmaXJlIGFuIGVuZCBldmVudC4gSW5lcnRpYWwgbW92ZW1lbnQgZG9lc1xuICAgKiBub3QgaGFwcGVuLlxuICAgKlxuICAgKiBAcGFyYW0ge1BvaW50ZXJFdmVudH0gW2V2ZW50XVxuICAgKi9cbiAgZW5kIChldmVudCkge1xuICAgIHRoaXMuX2VuZGluZyA9IHRydWU7XG5cbiAgICBldmVudCA9IGV2ZW50IHx8IHRoaXMucHJldkV2ZW50O1xuXG4gICAgaWYgKHRoaXMuaW50ZXJhY3RpbmcoKSkge1xuICAgICAgc2lnbmFscy5maXJlKCdhY3Rpb24tZW5kJywge1xuICAgICAgICBldmVudCxcbiAgICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLl9lbmRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGN1cnJlbnRBY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcmFjdGluZz8gdGhpcy5wcmVwYXJlZC5uYW1lOiBudWxsO1xuICB9XG5cbiAgaW50ZXJhY3RpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcmFjdGluZztcbiAgfVxuXG4gIC8qKiAqL1xuICBzdG9wICgpIHtcbiAgICBzaWduYWxzLmZpcmUoJ3N0b3AnLCB7IGludGVyYWN0aW9uOiB0aGlzIH0pO1xuXG4gICAgaWYgKHRoaXMuX2ludGVyYWN0aW5nKSB7XG4gICAgICBzaWduYWxzLmZpcmUoJ3N0b3AtYWN0aXZlJywgeyBpbnRlcmFjdGlvbjogdGhpcyB9KTtcbiAgICAgIHNpZ25hbHMuZmlyZSgnc3RvcC0nICsgdGhpcy5wcmVwYXJlZC5uYW1lLCB7IGludGVyYWN0aW9uOiB0aGlzIH0pO1xuICAgIH1cblxuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5lbGVtZW50ID0gbnVsbDtcblxuICAgIHRoaXMuX2ludGVyYWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcmVwYXJlZC5uYW1lID0gdGhpcy5wcmV2RXZlbnQgPSBudWxsO1xuICB9XG5cbiAgZ2V0UG9pbnRlckluZGV4IChwb2ludGVyKSB7XG4gICAgLy8gbW91c2UgYW5kIHBlbiBpbnRlcmFjdGlvbnMgbWF5IGhhdmUgb25seSBvbmUgcG9pbnRlclxuICAgIGlmICh0aGlzLnBvaW50ZXJUeXBlID09PSAnbW91c2UnIHx8IHRoaXMucG9pbnRlclR5cGUgPT09ICdwZW4nKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wb2ludGVySWRzLmluZGV4T2YodXRpbHMuZ2V0UG9pbnRlcklkKHBvaW50ZXIpKTtcbiAgfVxuXG4gIHVwZGF0ZVBvaW50ZXIgKHBvaW50ZXIsIGV2ZW50LCBkb3duID0gZXZlbnQgJiYgLyhkb3dufHN0YXJ0KSQvaS50ZXN0KGV2ZW50LnR5cGUpKSB7XG4gICAgY29uc3QgaWQgPSB1dGlscy5nZXRQb2ludGVySWQocG9pbnRlcik7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBpbmRleCA9IHRoaXMucG9pbnRlcklkcy5sZW5ndGg7XG4gICAgICB0aGlzLnBvaW50ZXJJZHNbaW5kZXhdID0gaWQ7XG4gICAgfVxuXG4gICAgaWYgKGRvd24pIHtcbiAgICAgIHNpZ25hbHMuZmlyZSgndXBkYXRlLXBvaW50ZXItZG93bicsIHtcbiAgICAgICAgcG9pbnRlcixcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGRvd24sXG4gICAgICAgIHBvaW50ZXJJZDogaWQsXG4gICAgICAgIHBvaW50ZXJJbmRleDogaW5kZXgsXG4gICAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wb2ludGVyc1tpbmRleF0gPSBwb2ludGVyO1xuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgcmVtb3ZlUG9pbnRlciAocG9pbnRlciwgZXZlbnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyByZXR1cm47IH1cblxuICAgIHNpZ25hbHMuZmlyZSgncmVtb3ZlLXBvaW50ZXInLCB7XG4gICAgICBwb2ludGVyLFxuICAgICAgZXZlbnQsXG4gICAgICBwb2ludGVySW5kZXg6IGluZGV4LFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgfSk7XG5cbiAgICB0aGlzLnBvaW50ZXJzICAgLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5wb2ludGVySWRzIC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuZG93blRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmRvd25UaW1lcyAgLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBfdXBkYXRlRXZlbnRUYXJnZXRzICh0YXJnZXQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICB0aGlzLl9ldmVudFRhcmdldCAgICA9IHRhcmdldDtcbiAgICB0aGlzLl9jdXJFdmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQ7XG4gIH1cbn1cblxuZm9yIChjb25zdCBtZXRob2Qgb2YgbWV0aG9kTmFtZXMpIHtcbiAgbGlzdGVuZXJzW21ldGhvZF0gPSBkb09uSW50ZXJhY3Rpb25zKG1ldGhvZCk7XG59XG5cbmZ1bmN0aW9uIGRvT25JbnRlcmFjdGlvbnMgKG1ldGhvZCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHBvaW50ZXJUeXBlID0gdXRpbHMuZ2V0UG9pbnRlclR5cGUoZXZlbnQpO1xuICAgIGNvbnN0IFtldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXRdID0gdXRpbHMuZ2V0RXZlbnRUYXJnZXRzKGV2ZW50KTtcbiAgICBjb25zdCBtYXRjaGVzID0gW107IC8vIFsgW3BvaW50ZXIsIGludGVyYWN0aW9uXSwgLi4uXVxuXG4gICAgaWYgKGJyb3dzZXIuc3VwcG9ydHNUb3VjaCAmJiAvdG91Y2gvLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICAgIHByZXZUb3VjaFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgZm9yIChjb25zdCBjaGFuZ2VkVG91Y2ggb2YgZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IGNoYW5nZWRUb3VjaDtcbiAgICAgICAgY29uc3QgaW50ZXJhY3Rpb24gPSBmaW5kZXIuc2VhcmNoKHBvaW50ZXIsIGV2ZW50LnR5cGUsIGV2ZW50VGFyZ2V0KTtcblxuICAgICAgICBtYXRjaGVzLnB1c2goW3BvaW50ZXIsIGludGVyYWN0aW9uIHx8IG5ldyBJbnRlcmFjdGlvbih7IHBvaW50ZXJUeXBlIH0pXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IGludmFsaWRQb2ludGVyID0gZmFsc2U7XG5cbiAgICAgIGlmICghYnJvd3Nlci5zdXBwb3J0c1BvaW50ZXJFdmVudCAmJiAvbW91c2UvLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICAgICAgLy8gaWdub3JlIG1vdXNlIGV2ZW50cyB3aGlsZSB0b3VjaCBpbnRlcmFjdGlvbnMgYXJlIGFjdGl2ZVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGggJiYgIWludmFsaWRQb2ludGVyOyBpKyspIHtcbiAgICAgICAgICBpbnZhbGlkUG9pbnRlciA9IHNjb3BlLmludGVyYWN0aW9uc1tpXS5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJyAmJiBzY29wZS5pbnRlcmFjdGlvbnNbaV0ucG9pbnRlcklzRG93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyeSB0byBpZ25vcmUgbW91c2UgZXZlbnRzIHRoYXQgYXJlIHNpbXVsYXRlZCBieSB0aGUgYnJvd3NlclxuICAgICAgICAvLyBhZnRlciBhIHRvdWNoIGV2ZW50XG4gICAgICAgIGludmFsaWRQb2ludGVyID0gaW52YWxpZFBvaW50ZXJcbiAgICAgICAgICB8fCAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBwcmV2VG91Y2hUaW1lIDwgNTAwKVxuICAgICAgICAgIC8vIG9uIGlPUyBhbmQgRmlyZWZveCBNb2JpbGUsIE1vdXNlRXZlbnQudGltZVN0YW1wIGlzIHplcm8gaWYgc2ltdWxhdGVkXG4gICAgICAgICAgfHwgZXZlbnQudGltZVN0YW1wID09PSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWludmFsaWRQb2ludGVyKSB7XG4gICAgICAgIGxldCBpbnRlcmFjdGlvbiA9IGZpbmRlci5zZWFyY2goZXZlbnQsIGV2ZW50LnR5cGUsIGV2ZW50VGFyZ2V0KTtcblxuICAgICAgICBpZiAoIWludGVyYWN0aW9uKSB7XG4gICAgICAgICAgaW50ZXJhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oeyBwb2ludGVyVHlwZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hdGNoZXMucHVzaChbZXZlbnQsIGludGVyYWN0aW9uXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBbcG9pbnRlciwgaW50ZXJhY3Rpb25dIG9mIG1hdGNoZXMpIHtcbiAgICAgIGludGVyYWN0aW9uLl91cGRhdGVFdmVudFRhcmdldHMoZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcbiAgICAgIGludGVyYWN0aW9uW21ldGhvZF0ocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZW5kQWxsIChldmVudCkge1xuICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuICAgIGludGVyYWN0aW9uLmVuZChldmVudCk7XG4gICAgc2lnbmFscy5maXJlKCdlbmRhbGwnLCB7IGV2ZW50LCBpbnRlcmFjdGlvbiB9KTtcbiAgfVxufVxuXG5jb25zdCBkb2NFdmVudHMgPSB7IC8qICdldmVudFR5cGUnOiBsaXN0ZW5lckZ1bmMgKi8gfTtcbmNvbnN0IHBFdmVudFR5cGVzID0gYnJvd3Nlci5wRXZlbnRUeXBlcztcblxuaWYgKGRvbU9iamVjdHMuUG9pbnRlckV2ZW50KSB7XG4gIGRvY0V2ZW50c1twRXZlbnRUeXBlcy5kb3duICBdID0gbGlzdGVuZXJzLnBvaW50ZXJEb3duO1xuICBkb2NFdmVudHNbcEV2ZW50VHlwZXMubW92ZSAgXSA9IGxpc3RlbmVycy5wb2ludGVyTW92ZTtcbiAgZG9jRXZlbnRzW3BFdmVudFR5cGVzLnVwICAgIF0gPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xuICBkb2NFdmVudHNbcEV2ZW50VHlwZXMuY2FuY2VsXSA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG59XG5lbHNlIHtcbiAgZG9jRXZlbnRzLm1vdXNlZG93biAgID0gbGlzdGVuZXJzLnBvaW50ZXJEb3duO1xuICBkb2NFdmVudHMubW91c2Vtb3ZlICAgPSBsaXN0ZW5lcnMucG9pbnRlck1vdmU7XG4gIGRvY0V2ZW50cy5tb3VzZXVwICAgICA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG5cbiAgZG9jRXZlbnRzLnRvdWNoc3RhcnQgID0gbGlzdGVuZXJzLnBvaW50ZXJEb3duO1xuICBkb2NFdmVudHMudG91Y2htb3ZlICAgPSBsaXN0ZW5lcnMucG9pbnRlck1vdmU7XG4gIGRvY0V2ZW50cy50b3VjaGVuZCAgICA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG4gIGRvY0V2ZW50cy50b3VjaGNhbmNlbCA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG59XG5cbmRvY0V2ZW50cy5ibHVyID0gZW5kQWxsO1xuXG5mdW5jdGlvbiBvbkRvY1NpZ25hbCAoeyBkb2MgfSwgc2lnbmFsTmFtZSkge1xuICBjb25zdCBldmVudE1ldGhvZCA9IHNpZ25hbE5hbWUuaW5kZXhPZignYWRkJykgPT09IDBcbiAgICA/IGV2ZW50cy5hZGQgOiBldmVudHMucmVtb3ZlO1xuXG4gIC8vIGRlbGVnYXRlIGV2ZW50IGxpc3RlbmVyXG4gIGZvciAoY29uc3QgZXZlbnRUeXBlIGluIHNjb3BlLmRlbGVnYXRlZEV2ZW50cykge1xuICAgIGV2ZW50TWV0aG9kKGRvYywgZXZlbnRUeXBlLCBldmVudHMuZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgZXZlbnRNZXRob2QoZG9jLCBldmVudFR5cGUsIGV2ZW50cy5kZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuICB9XG5cbiAgZm9yIChjb25zdCBldmVudFR5cGUgaW4gZG9jRXZlbnRzKSB7XG4gICAgZXZlbnRNZXRob2QoZG9jLCBldmVudFR5cGUsIGRvY0V2ZW50c1tldmVudFR5cGVdLCBicm93c2VyLmlzSU9TID8geyBwYXNzaXZlOiBmYWxzZSB9IDogdW5kZWZpbmVkKTtcbiAgfVxufVxuXG5zaWduYWxzLm9uKCd1cGRhdGUtcG9pbnRlci1kb3duJywgKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIHBvaW50ZXJJZCwgcG9pbnRlckluZGV4LCBldmVudCwgZXZlbnRUYXJnZXQsIGRvd24gfSkgPT4ge1xuICBpbnRlcmFjdGlvbi5wb2ludGVySWRzW3BvaW50ZXJJbmRleF0gPSBwb2ludGVySWQ7XG4gIGludGVyYWN0aW9uLnBvaW50ZXJzW3BvaW50ZXJJbmRleF0gPSBwb2ludGVyO1xuXG4gIGlmIChkb3duKSB7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93biA9IHRydWU7XG4gIH1cblxuICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICB1dGlscy5zZXRDb29yZHMoaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMsIGludGVyYWN0aW9uLnBvaW50ZXJzKTtcblxuICAgIHV0aWxzLmNvcHlDb29yZHMoaW50ZXJhY3Rpb24uY3VyQ29vcmRzICwgaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMpO1xuICAgIHV0aWxzLmNvcHlDb29yZHMoaW50ZXJhY3Rpb24ucHJldkNvb3JkcywgaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMpO1xuXG4gICAgaW50ZXJhY3Rpb24uZG93bkV2ZW50ICAgICAgICAgICAgICAgICA9IGV2ZW50O1xuICAgIGludGVyYWN0aW9uLmRvd25UaW1lc1twb2ludGVySW5kZXhdICAgPSBpbnRlcmFjdGlvbi5jdXJDb29yZHMudGltZVN0YW1wO1xuICAgIGludGVyYWN0aW9uLmRvd25UYXJnZXRzW3BvaW50ZXJJbmRleF0gPSBldmVudFRhcmdldCB8fCBldmVudCAmJiB1dGlscy5nZXRFdmVudFRhcmdldHMoZXZlbnQpWzBdO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCAgICAgICAgICAgPSBmYWxzZTtcblxuICAgIHV0aWxzLnBvaW50ZXJFeHRlbmQoaW50ZXJhY3Rpb24uZG93blBvaW50ZXIsIHBvaW50ZXIpO1xuICB9XG59KTtcblxuc2NvcGUuc2lnbmFscy5vbignYWRkLWRvY3VtZW50JyAgICwgb25Eb2NTaWduYWwpO1xuc2NvcGUuc2lnbmFscy5vbigncmVtb3ZlLWRvY3VtZW50Jywgb25Eb2NTaWduYWwpO1xuXG5JbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZSA9IDE7XG5JbnRlcmFjdGlvbi5kb09uSW50ZXJhY3Rpb25zID0gZG9PbkludGVyYWN0aW9ucztcbkludGVyYWN0aW9uLmVuZEFsbCA9IGVuZEFsbDtcbkludGVyYWN0aW9uLnNpZ25hbHMgPSBzaWduYWxzO1xuSW50ZXJhY3Rpb24uZG9jRXZlbnRzID0gZG9jRXZlbnRzO1xuXG5zY29wZS5lbmRBbGxJbnRlcmFjdGlvbnMgPSBlbmRBbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJhY3Rpb247XG4iLCJjb25zdCBzY29wZSAgID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbmNvbnN0IHV0aWxzICAgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbmNvbnN0IGZpbmRlciA9IHtcbiAgbWV0aG9kT3JkZXI6IFsgJ3NpbXVsYXRpb25SZXN1bWUnLCAnbW91c2VPclBlbicsICdoYXNQb2ludGVyJywgJ2lkbGUnIF0sXG5cbiAgc2VhcmNoOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnRUeXBlLCBldmVudFRhcmdldCkge1xuICAgIGNvbnN0IHBvaW50ZXJUeXBlID0gdXRpbHMuZ2V0UG9pbnRlclR5cGUocG9pbnRlcik7XG4gICAgY29uc3QgcG9pbnRlcklkID0gdXRpbHMuZ2V0UG9pbnRlcklkKHBvaW50ZXIpO1xuICAgIGNvbnN0IGRldGFpbHMgPSB7IHBvaW50ZXIsIHBvaW50ZXJJZCwgcG9pbnRlclR5cGUsIGV2ZW50VHlwZSwgZXZlbnRUYXJnZXQgfTtcblxuICAgIGZvciAoY29uc3QgbWV0aG9kIG9mIGZpbmRlci5tZXRob2RPcmRlcikge1xuICAgICAgY29uc3QgaW50ZXJhY3Rpb24gPSBmaW5kZXJbbWV0aG9kXShkZXRhaWxzKTtcblxuICAgICAgaWYgKGludGVyYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gdHJ5IHRvIHJlc3VtZSBzaW11bGF0aW9uIHdpdGggYSBuZXcgcG9pbnRlclxuICBzaW11bGF0aW9uUmVzdW1lOiBmdW5jdGlvbiAoeyBwb2ludGVyVHlwZSwgZXZlbnRUeXBlLCBldmVudFRhcmdldCB9KSB7XG4gICAgaWYgKCEvZG93bnxzdGFydC9pLnRlc3QoZXZlbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcbiAgICAgIGxldCBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAgIGlmIChpbnRlcmFjdGlvbi5zaW11bGF0aW9uICYmIGludGVyYWN0aW9uLnNpbXVsYXRpb24uYWxsb3dSZXN1bWVcbiAgICAgICAgICAmJiAoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUgPT09IHBvaW50ZXJUeXBlKSkge1xuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIHRoZSBpbnRlcmFjdGlvbiBlbGVtZW50XG4gICAgICAgICAgaWYgKGVsZW1lbnQgPT09IGludGVyYWN0aW9uLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IHV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvLyBpZiBpdCdzIGEgbW91c2Ugb3IgcGVuIGludGVyYWN0aW9uXG4gIG1vdXNlT3JQZW46IGZ1bmN0aW9uICh7IHBvaW50ZXJJZCwgcG9pbnRlclR5cGUsIGV2ZW50VHlwZSB9KSB7XG4gICAgaWYgKHBvaW50ZXJUeXBlICE9PSAnbW91c2UnICYmIHBvaW50ZXJUeXBlICE9PSAncGVuJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGZpcnN0Tm9uQWN0aXZlO1xuXG4gICAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcbiAgICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSA9PT0gcG9pbnRlclR5cGUpIHtcbiAgICAgICAgLy8gaWYgaXQncyBhIGRvd24gZXZlbnQsIHNraXAgaW50ZXJhY3Rpb25zIHdpdGggcnVubmluZyBzaW11bGF0aW9uc1xuICAgICAgICBpZiAoaW50ZXJhY3Rpb24uc2ltdWxhdGlvbiAmJiAhdXRpbHMuY29udGFpbnMoaW50ZXJhY3Rpb24ucG9pbnRlcklkcywgcG9pbnRlcklkKSkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBpbnRlcmFjdGlvbiBpcyBhY3RpdmUsIHJldHVybiBpdCBpbW1lZGlhdGVseVxuICAgICAgICBpZiAoaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2Ugc2F2ZSBpdCBhbmQgbG9vayBmb3IgYW5vdGhlciBhY3RpdmUgaW50ZXJhY3Rpb25cbiAgICAgICAgZWxzZSBpZiAoIWZpcnN0Tm9uQWN0aXZlKSB7XG4gICAgICAgICAgZmlyc3ROb25BY3RpdmUgPSBpbnRlcmFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGFjdGl2ZSBtb3VzZSBpbnRlcmFjdGlvbiB3YXMgZm91bmQgdXNlIHRoZSBmaXJzdCBpbmFjdGl2ZSBtb3VzZVxuICAgIC8vIGludGVyYWN0aW9uXG4gICAgaWYgKGZpcnN0Tm9uQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZmlyc3ROb25BY3RpdmU7XG4gICAgfVxuXG4gICAgLy8gZmluZCBhbnkgbW91c2Ugb3IgcGVuIGludGVyYWN0aW9uLlxuICAgIC8vIGlnbm9yZSB0aGUgaW50ZXJhY3Rpb24gaWYgdGhlIGV2ZW50VHlwZSBpcyBhICpkb3duLCBhbmQgYSBzaW11bGF0aW9uXG4gICAgLy8gaXMgYWN0aXZlXG4gICAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcbiAgICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSA9PT0gcG9pbnRlclR5cGUgJiYgISgvZG93bi9pLnRlc3QoZXZlbnRUeXBlKSAmJiBpbnRlcmFjdGlvbi5zaW11bGF0aW9uKSkge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLy8gZ2V0IGludGVyYWN0aW9uIHRoYXQgaGFzIHRoaXMgcG9pbnRlclxuICBoYXNQb2ludGVyOiBmdW5jdGlvbiAoeyBwb2ludGVySWQgfSkge1xuICAgIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG4gICAgICBpZiAodXRpbHMuY29udGFpbnMoaW50ZXJhY3Rpb24ucG9pbnRlcklkcywgcG9pbnRlcklkKSkge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIGdldCBmaXJzdCBpZGxlIGludGVyYWN0aW9uIHdpdGggYSBtYXRjaGluZyBwb2ludGVyVHlwZVxuICBpZGxlOiBmdW5jdGlvbiAoeyBwb2ludGVyVHlwZSB9KSB7XG4gICAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcbiAgICAgIC8vIGlmIHRoZXJlJ3MgYWxyZWFkeSBhIHBvaW50ZXIgaGVsZCBkb3duXG4gICAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuICAgICAgICAvLyBkb24ndCBhZGQgdGhpcyBwb2ludGVyIGlmIHRoZXJlIGlzIGEgdGFyZ2V0IGludGVyYWN0YWJsZSBhbmQgaXRcbiAgICAgICAgLy8gaXNuJ3QgZ2VzdHVyYWJsZVxuICAgICAgICBpZiAodGFyZ2V0ICYmICF0YXJnZXQub3B0aW9ucy5nZXN0dXJlLmVuYWJsZWQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gbWF4aW11bSBvZiAyIHBvaW50ZXJzIHBlciBpbnRlcmFjdGlvblxuICAgICAgZWxzZSBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklkcy5sZW5ndGggPj0gMikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpICYmIChwb2ludGVyVHlwZSA9PT0gaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUpKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZGVyO1xuIiwiY29uc3QgdXRpbHMgICA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IGV2ZW50cyAgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpO1xuY29uc3Qgc2lnbmFscyA9IHJlcXVpcmUoJy4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG5jb25zdCB7IGdldFdpbmRvdyB9ID0gcmVxdWlyZSgnLi91dGlscy93aW5kb3cnKTtcblxuY29uc3Qgc2NvcGUgPSB7XG4gIHNpZ25hbHMsXG4gIGV2ZW50cyxcbiAgdXRpbHMsXG5cbiAgLy8gbWFpbiBkb2N1bWVudFxuICBkb2N1bWVudDogcmVxdWlyZSgnLi91dGlscy9kb21PYmplY3RzJykuZG9jdW1lbnQsXG4gIC8vIGFsbCBkb2N1bWVudHMgYmVpbmcgbGlzdGVuZWQgdG9cbiAgZG9jdW1lbnRzOiBbXSxcblxuICBhZGREb2N1bWVudDogZnVuY3Rpb24gKGRvYywgd2luKSB7XG4gICAgLy8gZG8gbm90aGluZyBpZiBkb2N1bWVudCBpcyBhbHJlYWR5IGtub3duXG4gICAgaWYgKHV0aWxzLmNvbnRhaW5zKHNjb3BlLmRvY3VtZW50cywgZG9jKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHdpbiA9IHdpbiB8fCBnZXRXaW5kb3coZG9jKTtcblxuICAgIHNjb3BlLmRvY3VtZW50cy5wdXNoKGRvYyk7XG4gICAgZXZlbnRzLmRvY3VtZW50cy5wdXNoKGRvYyk7XG5cbiAgICAvLyBkb24ndCBhZGQgYW4gdW5sb2FkIGV2ZW50IGZvciB0aGUgbWFpbiBkb2N1bWVudFxuICAgIC8vIHNvIHRoYXQgdGhlIHBhZ2UgbWF5IGJlIGNhY2hlZCBpbiBicm93c2VyIGhpc3RvcnlcbiAgICBpZiAoZG9jICE9PSBzY29wZS5kb2N1bWVudCkge1xuICAgICAgZXZlbnRzLmFkZCh3aW4sICd1bmxvYWQnLCBzY29wZS5vbldpbmRvd1VubG9hZCk7XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCdhZGQtZG9jdW1lbnQnLCB7IGRvYywgd2luIH0pO1xuICB9LFxuXG4gIHJlbW92ZURvY3VtZW50OiBmdW5jdGlvbiAoZG9jLCB3aW4pIHtcbiAgICBjb25zdCBpbmRleCA9IHNjb3BlLmRvY3VtZW50cy5pbmRleE9mKGRvYyk7XG5cbiAgICB3aW4gPSB3aW4gfHwgZ2V0V2luZG93KGRvYyk7XG5cbiAgICBldmVudHMucmVtb3ZlKHdpbiwgJ3VubG9hZCcsIHNjb3BlLm9uV2luZG93VW5sb2FkKTtcblxuICAgIHNjb3BlLmRvY3VtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGV2ZW50cy5kb2N1bWVudHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIHNpZ25hbHMuZmlyZSgncmVtb3ZlLWRvY3VtZW50JywgeyB3aW4sIGRvYyB9KTtcbiAgfSxcblxuICBvbldpbmRvd1VubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHNjb3BlLnJlbW92ZURvY3VtZW50KHRoaXMuZG9jdW1lbnQsIHRoaXMpO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzY29wZTtcbiIsImNvbnN0IGV4dGVuZCA9IHJlcXVpcmUoJy4vZXh0ZW5kJyk7XG5jb25zdCB3aW4gICAgPSByZXF1aXJlKCcuL3dpbmRvdycpO1xuXG5jb25zdCB1dGlscyA9IHtcbiAgd2Fybk9uY2U6IGZ1bmN0aW9uIChtZXRob2QsIG1lc3NhZ2UpIHtcbiAgICBsZXQgd2FybmVkID0gZmFsc2U7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgICAgd2luLndpbmRvdy5jb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2MzQ1MjgvMjI4MDg4OFxuICBfZ2V0UUJlemllclZhbHVlOiBmdW5jdGlvbiAodCwgcDEsIHAyLCBwMykge1xuICAgIGNvbnN0IGlUID0gMSAtIHQ7XG4gICAgcmV0dXJuIGlUICogaVQgKiBwMSArIDIgKiBpVCAqIHQgKiBwMiArIHQgKiB0ICogcDM7XG4gIH0sXG5cbiAgZ2V0UXVhZHJhdGljQ3VydmVQb2ludDogZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBjcFgsIGNwWSwgZW5kWCwgZW5kWSwgcG9zaXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogIHV0aWxzLl9nZXRRQmV6aWVyVmFsdWUocG9zaXRpb24sIHN0YXJ0WCwgY3BYLCBlbmRYKSxcbiAgICAgIHk6ICB1dGlscy5fZ2V0UUJlemllclZhbHVlKHBvc2l0aW9uLCBzdGFydFksIGNwWSwgZW5kWSksXG4gICAgfTtcbiAgfSxcblxuICAvLyBodHRwOi8vZ2l6bWEuY29tL2Vhc2luZy9cbiAgZWFzZU91dFF1YWQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgdCAvPSBkO1xuICAgIHJldHVybiAtYyAqIHQqKHQtMikgKyBiO1xuICB9LFxuXG4gIGNvcHlBY3Rpb246IGZ1bmN0aW9uIChkZXN0LCBzcmMpIHtcbiAgICBkZXN0Lm5hbWUgID0gc3JjLm5hbWU7XG4gICAgZGVzdC5heGlzICA9IHNyYy5heGlzO1xuICAgIGRlc3QuZWRnZXMgPSBzcmMuZWRnZXM7XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfSxcblxuICBpcyAgICAgICAgIDogcmVxdWlyZSgnLi9pcycpLFxuICBleHRlbmQgICAgIDogZXh0ZW5kLFxuICBoeXBvdCAgICAgIDogcmVxdWlyZSgnLi9oeXBvdCcpLFxuICBnZXRPcmlnaW5YWTogcmVxdWlyZSgnLi9nZXRPcmlnaW5YWScpLFxufTtcblxuZXh0ZW5kKHV0aWxzLCByZXF1aXJlKCcuL2FycicpKTtcbmV4dGVuZCh1dGlscywgcmVxdWlyZSgnLi9kb21VdGlscycpKTtcbmV4dGVuZCh1dGlscywgcmVxdWlyZSgnLi9wb2ludGVyVXRpbHMnKSk7XG5leHRlbmQodXRpbHMsIHJlcXVpcmUoJy4vcmVjdCcpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcbiIsImNvbnN0IGlzICAgICAgICAgICA9IHJlcXVpcmUoJy4vaXMnKTtcbmNvbnN0IGRvbVV0aWxzICAgICA9IHJlcXVpcmUoJy4vZG9tVXRpbHMnKTtcbmNvbnN0IHBvaW50ZXJVdGlscyA9IHJlcXVpcmUoJy4vcG9pbnRlclV0aWxzJyk7XG5jb25zdCBwRXh0ZW5kICAgICAgPSByZXF1aXJlKCcuL3BvaW50ZXJFeHRlbmQnKTtcblxuY29uc3QgeyB3aW5kb3cgfSAgID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcbmNvbnN0IHsgY29udGFpbnMgfSA9IHJlcXVpcmUoJy4vYXJyJyk7XG5cbmNvbnN0IGVsZW1lbnRzID0gW107XG5jb25zdCB0YXJnZXRzICA9IFtdO1xuXG4vLyB7XG4vLyAgIHR5cGU6IHtcbi8vICAgICBzZWxlY3RvcnM6IFsnc2VsZWN0b3InLCAuLi5dLFxuLy8gICAgIGNvbnRleHRzIDogW2RvY3VtZW50LCAuLi5dLFxuLy8gICAgIGxpc3RlbmVyczogW1tsaXN0ZW5lciwgY2FwdHVyZSwgcGFzc2l2ZV0sIC4uLl1cbi8vICAgfVxuLy8gIH1cbmNvbnN0IGRlbGVnYXRlZEV2ZW50cyA9IHt9O1xuY29uc3QgZG9jdW1lbnRzICAgICAgID0gW107XG5cbmNvbnN0IHN1cHBvcnRzT3B0aW9ucyA9ICgoKSA9PiB7XG4gIGxldCBzdXBwb3J0ZWQgPSBmYWxzZTtcblxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtcbiAgICBnZXQgY2FwdHVyZSAoKSB7IHN1cHBvcnRlZCA9IHRydWU7IH0sXG4gIH0pO1xuXG4gIHJldHVybiBzdXBwb3J0ZWQ7XG59KSgpO1xuXG5mdW5jdGlvbiBhZGQgKGVsZW1lbnQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICBjb25zdCBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIGxldCBlbGVtZW50SW5kZXggPSBlbGVtZW50cy5pbmRleE9mKGVsZW1lbnQpO1xuICBsZXQgdGFyZ2V0ID0gdGFyZ2V0c1tlbGVtZW50SW5kZXhdO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGFyZ2V0ID0ge1xuICAgICAgZXZlbnRzOiB7fSxcbiAgICAgIHR5cGVDb3VudDogMCxcbiAgICB9O1xuXG4gICAgZWxlbWVudEluZGV4ID0gZWxlbWVudHMucHVzaChlbGVtZW50KSAtIDE7XG4gICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gIH1cblxuICBpZiAoIXRhcmdldC5ldmVudHNbdHlwZV0pIHtcbiAgICB0YXJnZXQuZXZlbnRzW3R5cGVdID0gW107XG4gICAgdGFyZ2V0LnR5cGVDb3VudCsrO1xuICB9XG5cbiAgaWYgKCFjb250YWlucyh0YXJnZXQuZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcikpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHN1cHBvcnRzT3B0aW9ucz8gb3B0aW9ucyA6ICEhb3B0aW9ucy5jYXB0dXJlKTtcbiAgICB0YXJnZXQuZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoZWxlbWVudCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbmFsQXJnKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbmFsQXJnKTtcbiAgY29uc3QgZWxlbWVudEluZGV4ID0gZWxlbWVudHMuaW5kZXhPZihlbGVtZW50KTtcbiAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0c1tlbGVtZW50SW5kZXhdO1xuXG4gIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuZXZlbnRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XG4gICAgZm9yICh0eXBlIGluIHRhcmdldC5ldmVudHMpIHtcbiAgICAgIGlmICh0YXJnZXQuZXZlbnRzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCB0eXBlLCAnYWxsJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdKSB7XG4gICAgY29uc3QgbGVuID0gdGFyZ2V0LmV2ZW50c1t0eXBlXS5sZW5ndGg7XG5cbiAgICBpZiAobGlzdGVuZXIgPT09ICdhbGwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCB0eXBlLCB0YXJnZXQuZXZlbnRzW3R5cGVdW2ldLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdW2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihgb24ke3R5cGV9YCwgbGlzdGVuZXIsIHN1cHBvcnRzT3B0aW9ucz8gb3B0aW9ucyA6ICEhb3B0aW9ucy5jYXB0dXJlKTtcbiAgICAgICAgICB0YXJnZXQuZXZlbnRzW3R5cGVdLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5ldmVudHNbdHlwZV0gJiYgdGFyZ2V0LmV2ZW50c1t0eXBlXS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRhcmdldC5ldmVudHNbdHlwZV0gPSBudWxsO1xuICAgICAgdGFyZ2V0LnR5cGVDb3VudC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICghdGFyZ2V0LnR5cGVDb3VudCkge1xuICAgIHRhcmdldHMuc3BsaWNlKGVsZW1lbnRJbmRleCwgMSk7XG4gICAgZWxlbWVudHMuc3BsaWNlKGVsZW1lbnRJbmRleCwgMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkRGVsZWdhdGUgKHNlbGVjdG9yLCBjb250ZXh0LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9uYWxBcmcpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICBpZiAoIWRlbGVnYXRlZEV2ZW50c1t0eXBlXSkge1xuICAgIGRlbGVnYXRlZEV2ZW50c1t0eXBlXSA9IHtcbiAgICAgIHNlbGVjdG9yczogW10sXG4gICAgICBjb250ZXh0cyA6IFtdLFxuICAgICAgbGlzdGVuZXJzOiBbXSxcbiAgICB9O1xuXG4gICAgLy8gYWRkIGRlbGVnYXRlIGxpc3RlbmVyIGZ1bmN0aW9uc1xuICAgIGZvciAoY29uc3QgZG9jIG9mIGRvY3VtZW50cykge1xuICAgICAgYWRkKGRvYywgdHlwZSwgZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICBhZGQoZG9jLCB0eXBlLCBkZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1t0eXBlXTtcbiAgbGV0IGluZGV4O1xuXG4gIGZvciAoaW5kZXggPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1tpbmRleF0gPT09IHNlbGVjdG9yXG4gICAgICAgICYmIGRlbGVnYXRlZC5jb250ZXh0c1tpbmRleF0gPT09IGNvbnRleHQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICBpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoO1xuXG4gICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcbiAgICBkZWxlZ2F0ZWQuY29udGV4dHMgLnB1c2goY29udGV4dCk7XG4gICAgZGVsZWdhdGVkLmxpc3RlbmVycy5wdXNoKFtdKTtcbiAgfVxuXG4gIC8vIGtlZXAgbGlzdGVuZXIgYW5kIGNhcHR1cmUgYW5kIHBhc3NpdmUgZmxhZ3NcbiAgZGVsZWdhdGVkLmxpc3RlbmVyc1tpbmRleF0ucHVzaChbbGlzdGVuZXIsICEhb3B0aW9ucy5jYXB0dXJlLCBvcHRpb25zLnBhc3NpdmVdKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRGVsZWdhdGUgKHNlbGVjdG9yLCBjb250ZXh0LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9uYWxBcmcpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICBjb25zdCBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbdHlwZV07XG4gIGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG4gIGxldCBpbmRleDtcblxuICBpZiAoIWRlbGVnYXRlZCkgeyByZXR1cm47IH1cblxuICAvLyBjb3VudCBmcm9tIGxhc3QgaW5kZXggb2YgZGVsZWdhdGVkIHRvIDBcbiAgZm9yIChpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIC8vIGxvb2sgZm9yIG1hdGNoaW5nIHNlbGVjdG9yIGFuZCBjb250ZXh0IE5vZGVcbiAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1tpbmRleF0gPT09IHNlbGVjdG9yXG4gICAgICAgICYmIGRlbGVnYXRlZC5jb250ZXh0c1tpbmRleF0gPT09IGNvbnRleHQpIHtcblxuICAgICAgY29uc3QgbGlzdGVuZXJzID0gZGVsZWdhdGVkLmxpc3RlbmVyc1tpbmRleF07XG5cbiAgICAgIC8vIGVhY2ggaXRlbSBvZiB0aGUgbGlzdGVuZXJzIGFycmF5IGlzIGFuIGFycmF5OiBbZnVuY3Rpb24sIGNhcHR1cmUsIHBhc3NpdmVdXG4gICAgICBmb3IgKGxldCBpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IFtmbiwgY2FwdHVyZSwgcGFzc2l2ZV0gPSBsaXN0ZW5lcnNbaV07XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9ucyBhbmQgY2FwdHVyZSBhbmQgcGFzc2l2ZSBmbGFncyBtYXRjaFxuICAgICAgICBpZiAoZm4gPT09IGxpc3RlbmVyICYmIGNhcHR1cmUgPT09ICEhb3B0aW9ucy5jYXB0dXJlICYmIHBhc3NpdmUgPT09IG9wdGlvbnMucGFzc2l2ZSkge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbSB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgIC8vIGlmIGFsbCBsaXN0ZW5lcnMgZm9yIHRoaXMgaW50ZXJhY3RhYmxlIGhhdmUgYmVlbiByZW1vdmVkXG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBpbnRlcmFjdGFibGUgZnJvbSB0aGUgZGVsZWdhdGVkIGFycmF5c1xuICAgICAgICAgIGlmICghbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVsZWdhdGVkLmNvbnRleHRzIC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVsZWdhdGVkLmxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZGVsZWdhdGUgZnVuY3Rpb24gZnJvbSBjb250ZXh0XG4gICAgICAgICAgICByZW1vdmUoY29udGV4dCwgdHlwZSwgZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICAgICAgICByZW1vdmUoY29udGV4dCwgdHlwZSwgZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBhcnJheXMgaWYgdGhleSBhcmUgZW1wdHlcbiAgICAgICAgICAgIGlmICghZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBvbmx5IHJlbW92ZSBvbmUgbGlzdGVuZXJcbiAgICAgICAgICBtYXRjaEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWF0Y2hGb3VuZCkgeyBicmVhazsgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBib3VuZCB0byB0aGUgaW50ZXJhY3RhYmxlIGNvbnRleHQgd2hlbiBhIERPTSBldmVudFxuLy8gbGlzdGVuZXIgaXMgYWRkZWQgdG8gYSBzZWxlY3RvciBpbnRlcmFjdGFibGVcbmZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIgKGV2ZW50LCBvcHRpb25hbEFyZykge1xuICBjb25zdCBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIGNvbnN0IGZha2VFdmVudCA9IHt9O1xuICBjb25zdCBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbZXZlbnQudHlwZV07XG4gIGNvbnN0IFtldmVudFRhcmdldF0gPSAocG9pbnRlclV0aWxzLmdldEV2ZW50VGFyZ2V0cyhldmVudCkpO1xuICBsZXQgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gIC8vIGR1cGxpY2F0ZSB0aGUgZXZlbnQgc28gdGhhdCBjdXJyZW50VGFyZ2V0IGNhbiBiZSBjaGFuZ2VkXG4gIHBFeHRlbmQoZmFrZUV2ZW50LCBldmVudCk7XG5cbiAgZmFrZUV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgZmFrZUV2ZW50LnByZXZlbnREZWZhdWx0ID0gcHJldmVudE9yaWdpbmFsRGVmYXVsdDtcblxuICAvLyBjbGltYiB1cCBkb2N1bWVudCB0cmVlIGxvb2tpbmcgZm9yIHNlbGVjdG9yIG1hdGNoZXNcbiAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZGVsZWdhdGVkLnNlbGVjdG9yc1tpXTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBkZWxlZ2F0ZWQuY29udGV4dHNbaV07XG5cbiAgICAgIGlmIChkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpXG4gICAgICAgICAgJiYgZG9tVXRpbHMubm9kZUNvbnRhaW5zKGNvbnRleHQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICYmIGRvbVV0aWxzLm5vZGVDb250YWlucyhjb250ZXh0LCBlbGVtZW50KSkge1xuXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGRlbGVnYXRlZC5saXN0ZW5lcnNbaV07XG5cbiAgICAgICAgZmFrZUV2ZW50LmN1cnJlbnRUYXJnZXQgPSBlbGVtZW50O1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGlzdGVuZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgW2ZuLCBjYXB0dXJlLCBwYXNzaXZlXSA9IGxpc3RlbmVyc1tqXTtcblxuICAgICAgICAgIGlmIChjYXB0dXJlID09PSAhIW9wdGlvbnMuY2FwdHVyZSAmJiBwYXNzaXZlID09PSBvcHRpb25zLnBhc3NpdmUpIHtcbiAgICAgICAgICAgIGZuKGZha2VFdmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbWVudCA9IGRvbVV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVsZWdhdGVVc2VDYXB0dXJlIChldmVudCkge1xuICByZXR1cm4gZGVsZWdhdGVMaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50LCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gcHJldmVudE9yaWdpbmFsRGVmYXVsdCAoKSB7XG4gIHRoaXMub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBnZXRPcHRpb25zIChwYXJhbSkge1xuICByZXR1cm4gaXMub2JqZWN0KHBhcmFtKT8gcGFyYW0gOiB7IGNhcHR1cmU6IHBhcmFtIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQsXG4gIHJlbW92ZSxcblxuICBhZGREZWxlZ2F0ZSxcbiAgcmVtb3ZlRGVsZWdhdGUsXG5cbiAgZGVsZWdhdGVMaXN0ZW5lcixcbiAgZGVsZWdhdGVVc2VDYXB0dXJlLFxuICBkZWxlZ2F0ZWRFdmVudHMsXG4gIGRvY3VtZW50cyxcblxuICBzdXBwb3J0c09wdGlvbnMsXG5cbiAgX2VsZW1lbnRzOiBlbGVtZW50cyxcbiAgX3RhcmdldHM6IHRhcmdldHMsXG59O1xuIiwiY29uc3QgaHlwb3QgICAgICAgICA9IHJlcXVpcmUoJy4vaHlwb3QnKTtcbmNvbnN0IGJyb3dzZXIgICAgICAgPSByZXF1aXJlKCcuL2Jyb3dzZXInKTtcbmNvbnN0IGRvbSAgICAgICAgICAgPSByZXF1aXJlKCcuL2RvbU9iamVjdHMnKTtcbmNvbnN0IGRvbVV0aWxzICAgICAgPSByZXF1aXJlKCcuL2RvbVV0aWxzJyk7XG5jb25zdCBkb21PYmplY3RzICAgID0gcmVxdWlyZSgnLi9kb21PYmplY3RzJyk7XG5jb25zdCBpcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9pcycpO1xuY29uc3QgcG9pbnRlckV4dGVuZCA9IHJlcXVpcmUoJy4vcG9pbnRlckV4dGVuZCcpO1xuXG5jb25zdCBwb2ludGVyVXRpbHMgPSB7XG4gIGNvcHlDb29yZHM6IGZ1bmN0aW9uIChkZXN0LCBzcmMpIHtcbiAgICBkZXN0LnBhZ2UgPSBkZXN0LnBhZ2UgfHwge307XG4gICAgZGVzdC5wYWdlLnggPSBzcmMucGFnZS54O1xuICAgIGRlc3QucGFnZS55ID0gc3JjLnBhZ2UueTtcblxuICAgIGRlc3QuY2xpZW50ID0gZGVzdC5jbGllbnQgfHwge307XG4gICAgZGVzdC5jbGllbnQueCA9IHNyYy5jbGllbnQueDtcbiAgICBkZXN0LmNsaWVudC55ID0gc3JjLmNsaWVudC55O1xuXG4gICAgZGVzdC50aW1lU3RhbXAgPSBzcmMudGltZVN0YW1wO1xuICB9LFxuXG4gIHNldENvb3JkRGVsdGFzOiBmdW5jdGlvbiAodGFyZ2V0T2JqLCBwcmV2LCBjdXIpIHtcbiAgICB0YXJnZXRPYmoucGFnZS54ICAgID0gY3VyLnBhZ2UueCAgICAtIHByZXYucGFnZS54O1xuICAgIHRhcmdldE9iai5wYWdlLnkgICAgPSBjdXIucGFnZS55ICAgIC0gcHJldi5wYWdlLnk7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC54ICA9IGN1ci5jbGllbnQueCAgLSBwcmV2LmNsaWVudC54O1xuICAgIHRhcmdldE9iai5jbGllbnQueSAgPSBjdXIuY2xpZW50LnkgIC0gcHJldi5jbGllbnQueTtcbiAgICB0YXJnZXRPYmoudGltZVN0YW1wID0gY3VyLnRpbWVTdGFtcCAtIHByZXYudGltZVN0YW1wO1xuXG4gICAgLy8gc2V0IHBvaW50ZXIgdmVsb2NpdHlcbiAgICBjb25zdCBkdCA9IE1hdGgubWF4KHRhcmdldE9iai50aW1lU3RhbXAgLyAxMDAwLCAwLjAwMSk7XG5cbiAgICB0YXJnZXRPYmoucGFnZS5zcGVlZCAgID0gaHlwb3QodGFyZ2V0T2JqLnBhZ2UueCwgdGFyZ2V0T2JqLnBhZ2UueSkgLyBkdDtcbiAgICB0YXJnZXRPYmoucGFnZS52eCAgICAgID0gdGFyZ2V0T2JqLnBhZ2UueCAvIGR0O1xuICAgIHRhcmdldE9iai5wYWdlLnZ5ICAgICAgPSB0YXJnZXRPYmoucGFnZS55IC8gZHQ7XG5cbiAgICB0YXJnZXRPYmouY2xpZW50LnNwZWVkID0gaHlwb3QodGFyZ2V0T2JqLmNsaWVudC54LCB0YXJnZXRPYmoucGFnZS55KSAvIGR0O1xuICAgIHRhcmdldE9iai5jbGllbnQudnggICAgPSB0YXJnZXRPYmouY2xpZW50LnggLyBkdDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnZ5ICAgID0gdGFyZ2V0T2JqLmNsaWVudC55IC8gZHQ7XG4gIH0sXG5cbiAgaXNOYXRpdmVQb2ludGVyOiBmdW5jdGlvbiAgKHBvaW50ZXIpIHtcbiAgICByZXR1cm4gKHBvaW50ZXIgaW5zdGFuY2VvZiBkb20uRXZlbnQgfHwgcG9pbnRlciBpbnN0YW5jZW9mIGRvbS5Ub3VjaCk7XG4gIH0sXG5cbiAgLy8gR2V0IHNwZWNpZmllZCBYL1kgY29vcmRzIGZvciBtb3VzZSBvciBldmVudC50b3VjaGVzWzBdXG4gIGdldFhZOiBmdW5jdGlvbiAodHlwZSwgcG9pbnRlciwgeHkpIHtcbiAgICB4eSA9IHh5IHx8IHt9O1xuICAgIHR5cGUgPSB0eXBlIHx8ICdwYWdlJztcblxuICAgIHh5LnggPSBwb2ludGVyW3R5cGUgKyAnWCddO1xuICAgIHh5LnkgPSBwb2ludGVyW3R5cGUgKyAnWSddO1xuXG4gICAgcmV0dXJuIHh5O1xuICB9LFxuXG4gIGdldFBhZ2VYWTogZnVuY3Rpb24gKHBvaW50ZXIsIHBhZ2UpIHtcbiAgICBwYWdlID0gcGFnZSB8fCB7fTtcblxuICAgIC8vIE9wZXJhIE1vYmlsZSBoYW5kbGVzIHRoZSB2aWV3cG9ydCBhbmQgc2Nyb2xsaW5nIG9kZGx5XG4gICAgaWYgKGJyb3dzZXIuaXNPcGVyYU1vYmlsZSAmJiBwb2ludGVyVXRpbHMuaXNOYXRpdmVQb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICBwb2ludGVyVXRpbHMuZ2V0WFkoJ3NjcmVlbicsIHBvaW50ZXIsIHBhZ2UpO1xuXG4gICAgICBwYWdlLnggKz0gd2luZG93LnNjcm9sbFg7XG4gICAgICBwYWdlLnkgKz0gd2luZG93LnNjcm9sbFk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcG9pbnRlclV0aWxzLmdldFhZKCdwYWdlJywgcG9pbnRlciwgcGFnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2U7XG4gIH0sXG5cbiAgZ2V0Q2xpZW50WFk6IGZ1bmN0aW9uIChwb2ludGVyLCBjbGllbnQpIHtcbiAgICBjbGllbnQgPSBjbGllbnQgfHwge307XG5cbiAgICBpZiAoYnJvd3Nlci5pc09wZXJhTW9iaWxlICYmIHBvaW50ZXJVdGlscy5pc05hdGl2ZVBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIC8vIE9wZXJhIE1vYmlsZSBoYW5kbGVzIHRoZSB2aWV3cG9ydCBhbmQgc2Nyb2xsaW5nIG9kZGx5XG4gICAgICBwb2ludGVyVXRpbHMuZ2V0WFkoJ3NjcmVlbicsIHBvaW50ZXIsIGNsaWVudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcG9pbnRlclV0aWxzLmdldFhZKCdjbGllbnQnLCBwb2ludGVyLCBjbGllbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH0sXG5cbiAgZ2V0UG9pbnRlcklkOiBmdW5jdGlvbiAocG9pbnRlcikge1xuICAgIHJldHVybiBpcy5udW1iZXIocG9pbnRlci5wb2ludGVySWQpPyBwb2ludGVyLnBvaW50ZXJJZCA6IHBvaW50ZXIuaWRlbnRpZmllcjtcbiAgfSxcblxuICBzZXRDb29yZHM6IGZ1bmN0aW9uICh0YXJnZXRPYmosIHBvaW50ZXJzLCB0aW1lU3RhbXApIHtcbiAgICBjb25zdCBwb2ludGVyID0gKHBvaW50ZXJzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICAgICAgID8gcG9pbnRlclV0aWxzLnBvaW50ZXJBdmVyYWdlKHBvaW50ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgOiBwb2ludGVyc1swXSk7XG5cbiAgICBjb25zdCB0bXBYWSA9IHt9O1xuXG4gICAgcG9pbnRlclV0aWxzLmdldFBhZ2VYWShwb2ludGVyLCB0bXBYWSk7XG4gICAgdGFyZ2V0T2JqLnBhZ2UueCA9IHRtcFhZLng7XG4gICAgdGFyZ2V0T2JqLnBhZ2UueSA9IHRtcFhZLnk7XG5cbiAgICBwb2ludGVyVXRpbHMuZ2V0Q2xpZW50WFkocG9pbnRlciwgdG1wWFkpO1xuICAgIHRhcmdldE9iai5jbGllbnQueCA9IHRtcFhZLng7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC55ID0gdG1wWFkueTtcblxuICAgIHRhcmdldE9iai50aW1lU3RhbXAgPSBpcy5udW1iZXIodGltZVN0YW1wKSA/IHRpbWVTdGFtcCA6bmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH0sXG5cbiAgcG9pbnRlckV4dGVuZDogcG9pbnRlckV4dGVuZCxcblxuICBnZXRUb3VjaFBhaXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHRvdWNoZXMgPSBbXTtcblxuICAgIC8vIGFycmF5IG9mIHRvdWNoZXMgaXMgc3VwcGxpZWRcbiAgICBpZiAoaXMuYXJyYXkoZXZlbnQpKSB7XG4gICAgICB0b3VjaGVzWzBdID0gZXZlbnRbMF07XG4gICAgICB0b3VjaGVzWzFdID0gZXZlbnRbMV07XG4gICAgfVxuICAgIC8vIGFuIGV2ZW50XG4gICAgZWxzZSB7XG4gICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoZW5kJykge1xuICAgICAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdG91Y2hlc1swXSA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIHRvdWNoZXNbMV0gPSBldmVudC50b3VjaGVzWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b3VjaGVzO1xuICB9LFxuXG4gIHBvaW50ZXJBdmVyYWdlOiBmdW5jdGlvbiAocG9pbnRlcnMpIHtcbiAgICBjb25zdCBhdmVyYWdlID0ge1xuICAgICAgcGFnZVggIDogMCxcbiAgICAgIHBhZ2VZICA6IDAsXG4gICAgICBjbGllbnRYOiAwLFxuICAgICAgY2xpZW50WTogMCxcbiAgICAgIHNjcmVlblg6IDAsXG4gICAgICBzY3JlZW5ZOiAwLFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IHBvaW50ZXIgb2YgcG9pbnRlcnMpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBhdmVyYWdlKSB7XG4gICAgICAgIGF2ZXJhZ2VbcHJvcF0gKz0gcG9pbnRlcltwcm9wXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBwcm9wIGluIGF2ZXJhZ2UpIHtcbiAgICAgIGF2ZXJhZ2VbcHJvcF0gLz0gcG9pbnRlcnMubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiBhdmVyYWdlO1xuICB9LFxuXG4gIHRvdWNoQkJveDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5sZW5ndGggJiYgIShldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0b3VjaGVzID0gcG9pbnRlclV0aWxzLmdldFRvdWNoUGFpcihldmVudCk7XG4gICAgY29uc3QgbWluWCA9IE1hdGgubWluKHRvdWNoZXNbMF0ucGFnZVgsIHRvdWNoZXNbMV0ucGFnZVgpO1xuICAgIGNvbnN0IG1pblkgPSBNYXRoLm1pbih0b3VjaGVzWzBdLnBhZ2VZLCB0b3VjaGVzWzFdLnBhZ2VZKTtcbiAgICBjb25zdCBtYXhYID0gTWF0aC5tYXgodG91Y2hlc1swXS5wYWdlWCwgdG91Y2hlc1sxXS5wYWdlWCk7XG4gICAgY29uc3QgbWF4WSA9IE1hdGgubWF4KHRvdWNoZXNbMF0ucGFnZVksIHRvdWNoZXNbMV0ucGFnZVkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IG1pblgsXG4gICAgICB5OiBtaW5ZLFxuICAgICAgbGVmdDogbWluWCxcbiAgICAgIHRvcDogbWluWSxcbiAgICAgIHdpZHRoOiBtYXhYIC0gbWluWCxcbiAgICAgIGhlaWdodDogbWF4WSAtIG1pblksXG4gICAgfTtcbiAgfSxcblxuICB0b3VjaERpc3RhbmNlOiBmdW5jdGlvbiAoZXZlbnQsIGRlbHRhU291cmNlKSB7XG4gICAgY29uc3Qgc291cmNlWCA9IGRlbHRhU291cmNlICsgJ1gnO1xuICAgIGNvbnN0IHNvdXJjZVkgPSBkZWx0YVNvdXJjZSArICdZJztcbiAgICBjb25zdCB0b3VjaGVzID0gcG9pbnRlclV0aWxzLmdldFRvdWNoUGFpcihldmVudCk7XG5cblxuICAgIGNvbnN0IGR4ID0gdG91Y2hlc1swXVtzb3VyY2VYXSAtIHRvdWNoZXNbMV1bc291cmNlWF07XG4gICAgY29uc3QgZHkgPSB0b3VjaGVzWzBdW3NvdXJjZVldIC0gdG91Y2hlc1sxXVtzb3VyY2VZXTtcblxuICAgIHJldHVybiBoeXBvdChkeCwgZHkpO1xuICB9LFxuXG4gIHRvdWNoQW5nbGU6IGZ1bmN0aW9uIChldmVudCwgcHJldkFuZ2xlLCBkZWx0YVNvdXJjZSkge1xuICAgIGNvbnN0IHNvdXJjZVggPSBkZWx0YVNvdXJjZSArICdYJztcbiAgICBjb25zdCBzb3VyY2VZID0gZGVsdGFTb3VyY2UgKyAnWSc7XG4gICAgY29uc3QgdG91Y2hlcyA9IHBvaW50ZXJVdGlscy5nZXRUb3VjaFBhaXIoZXZlbnQpO1xuICAgIGNvbnN0IGR4ID0gdG91Y2hlc1sxXVtzb3VyY2VYXSAtIHRvdWNoZXNbMF1bc291cmNlWF07XG4gICAgY29uc3QgZHkgPSB0b3VjaGVzWzFdW3NvdXJjZVldIC0gdG91Y2hlc1swXVtzb3VyY2VZXTtcbiAgICBjb25zdCBhbmdsZSA9IDE4MCAqIE1hdGguYXRhbjIoZHkgLCBkeCkgLyBNYXRoLlBJO1xuXG4gICAgcmV0dXJuICBhbmdsZTtcbiAgfSxcblxuICBnZXRQb2ludGVyVHlwZTogZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgICByZXR1cm4gaXMuc3RyaW5nKHBvaW50ZXIucG9pbnRlclR5cGUpXG4gICAgICA/IHBvaW50ZXIucG9pbnRlclR5cGVcbiAgICAgIDogaXMubnVtYmVyKHBvaW50ZXIucG9pbnRlclR5cGUpXG4gICAgICAgID8gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCd0b3VjaCcsICdwZW4nLCAnbW91c2UnXVtwb2ludGVyLnBvaW50ZXJUeXBlXVxuICAgICAgICAgIC8vIGlmIHRoZSBQb2ludGVyRXZlbnQgQVBJIGlzbid0IGF2YWlsYWJsZSwgdGhlbiB0aGUgXCJwb2ludGVyXCIgbXVzdFxuICAgICAgICAgIC8vIGJlIGVpdGhlciBhIE1vdXNlRXZlbnQsIFRvdWNoRXZlbnQsIG9yIFRvdWNoIG9iamVjdFxuICAgICAgICAgIDogL3RvdWNoLy50ZXN0KHBvaW50ZXIudHlwZSkgfHwgcG9pbnRlciBpbnN0YW5jZW9mIGRvbU9iamVjdHMuVG91Y2hcbiAgICAgICAgICAgID8gJ3RvdWNoJ1xuICAgICAgICAgICAgOiAnbW91c2UnO1xuICB9LFxuXG4gIC8vIFsgZXZlbnQudGFyZ2V0LCBldmVudC5jdXJyZW50VGFyZ2V0IF1cbiAgZ2V0RXZlbnRUYXJnZXRzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBwYXRoID0gaXMuZnVuY3Rpb24oZXZlbnQuY29tcG9zZWRQYXRoKSA/IGV2ZW50LmNvbXBvc2VkUGF0aCgpIDogZXZlbnQucGF0aDtcblxuICAgIHJldHVybiBbXG4gICAgICBkb21VdGlscy5nZXRBY3R1YWxFbGVtZW50KHBhdGggPyBwYXRoWzBdIDogZXZlbnQudGFyZ2V0KSxcbiAgICAgIGRvbVV0aWxzLmdldEFjdHVhbEVsZW1lbnQoZXZlbnQuY3VycmVudFRhcmdldCksXG4gICAgXTtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcG9pbnRlclV0aWxzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoeCwgeSkgPT4gIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiIsImZ1bmN0aW9uIHBvaW50ZXJFeHRlbmQgKGRlc3QsIHNvdXJjZSkge1xuICBmb3IgKGNvbnN0IHByb3AgaW4gc291cmNlKSB7XG4gICAgY29uc3QgcHJlZml4ZWRQcm9wUkVzID0gbW9kdWxlLmV4cG9ydHMucHJlZml4ZWRQcm9wUkVzO1xuICAgIGxldCBkZXByZWNhdGVkID0gZmFsc2U7XG5cbiAgICAvLyBza2lwIGRlcHJlY2F0ZWQgcHJlZml4ZWQgcHJvcGVydGllc1xuICAgIGZvciAoY29uc3QgdmVuZG9yIGluIHByZWZpeGVkUHJvcFJFcykge1xuICAgICAgaWYgKHByb3AuaW5kZXhPZih2ZW5kb3IpID09PSAwICYmIHByZWZpeGVkUHJvcFJFc1t2ZW5kb3JdLnRlc3QocHJvcCkpIHtcbiAgICAgICAgZGVwcmVjYXRlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZGVwcmVjYXRlZCAmJiB0eXBlb2Ygc291cmNlW3Byb3BdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdDtcbn1cblxucG9pbnRlckV4dGVuZC5wcmVmaXhlZFByb3BSRXMgPSB7XG4gIHdlYmtpdDogLyhNb3ZlbWVudFtYWV18UmFkaXVzW1hZXXxSb3RhdGlvbkFuZ2xlfEZvcmNlKSQvLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb2ludGVyRXh0ZW5kO1xuIiwiZnVuY3Rpb24gY29udGFpbnMgKGFycmF5LCB0YXJnZXQpIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YodGFyZ2V0KSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIG1lcmdlICh0YXJnZXQsIHNvdXJjZSkge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc291cmNlKSB7XG4gICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29udGFpbnMsXG4gIG1lcmdlLFxufTtcbiIsImNvbnN0IGV4dGVuZCAgICAgID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKTtcbmNvbnN0IGdldE9yaWdpblhZID0gcmVxdWlyZSgnLi91dGlscy9nZXRPcmlnaW5YWScpO1xuY29uc3QgZGVmYXVsdHMgICAgPSByZXF1aXJlKCcuL2RlZmF1bHRPcHRpb25zJyk7XG5jb25zdCBzaWduYWxzICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG5jbGFzcyBJbnRlcmFjdEV2ZW50IHtcbiAgLyoqICovXG4gIGNvbnN0cnVjdG9yIChpbnRlcmFjdGlvbiwgZXZlbnQsIGFjdGlvbiwgcGhhc2UsIGVsZW1lbnQsIHJlbGF0ZWQsIHByZUVuZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgdGFyZ2V0ICAgICAgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG4gICAgY29uc3QgZGVsdGFTb3VyY2UgPSAodGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zIHx8IGRlZmF1bHRzKS5kZWx0YVNvdXJjZTtcbiAgICBjb25zdCBvcmlnaW4gICAgICA9IGdldE9yaWdpblhZKHRhcmdldCwgZWxlbWVudCwgYWN0aW9uKTtcbiAgICBjb25zdCBzdGFydGluZyAgICA9IHBoYXNlID09PSAnc3RhcnQnO1xuICAgIGNvbnN0IGVuZGluZyAgICAgID0gcGhhc2UgPT09ICdlbmQnO1xuICAgIGNvbnN0IGNvb3JkcyAgICAgID0gc3RhcnRpbmc/IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzIDogaW50ZXJhY3Rpb24uY3VyQ29vcmRzO1xuICAgIGNvbnN0IHByZXZFdmVudCAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50O1xuXG4gICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgaW50ZXJhY3Rpb24uZWxlbWVudDtcblxuICAgIGNvbnN0IHBhZ2UgICA9IGV4dGVuZCh7fSwgY29vcmRzLnBhZ2UpO1xuICAgIGNvbnN0IGNsaWVudCA9IGV4dGVuZCh7fSwgY29vcmRzLmNsaWVudCk7XG5cbiAgICBwYWdlLnggLT0gb3JpZ2luLng7XG4gICAgcGFnZS55IC09IG9yaWdpbi55O1xuXG4gICAgY2xpZW50LnggLT0gb3JpZ2luLng7XG4gICAgY2xpZW50LnkgLT0gb3JpZ2luLnk7XG5cbiAgICB0aGlzLmN0cmxLZXkgICAgICAgPSBldmVudC5jdHJsS2V5O1xuICAgIHRoaXMuYWx0S2V5ICAgICAgICA9IGV2ZW50LmFsdEtleTtcbiAgICB0aGlzLnNoaWZ0S2V5ICAgICAgPSBldmVudC5zaGlmdEtleTtcbiAgICB0aGlzLm1ldGFLZXkgICAgICAgPSBldmVudC5tZXRhS2V5O1xuICAgIHRoaXMuYnV0dG9uICAgICAgICA9IGV2ZW50LmJ1dHRvbjtcbiAgICB0aGlzLmJ1dHRvbnMgICAgICAgPSBldmVudC5idXR0b25zO1xuICAgIHRoaXMudGFyZ2V0ICAgICAgICA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gZWxlbWVudDtcbiAgICB0aGlzLnJlbGF0ZWRUYXJnZXQgPSByZWxhdGVkIHx8IG51bGw7XG4gICAgdGhpcy5wcmVFbmQgICAgICAgID0gcHJlRW5kO1xuICAgIHRoaXMudHlwZSAgICAgICAgICA9IGFjdGlvbiArIChwaGFzZSB8fCAnJyk7XG4gICAgdGhpcy5pbnRlcmFjdGlvbiAgID0gaW50ZXJhY3Rpb247XG4gICAgdGhpcy5pbnRlcmFjdGFibGUgID0gdGFyZ2V0O1xuXG4gICAgdGhpcy50MCA9IHN0YXJ0aW5nID8gaW50ZXJhY3Rpb24uZG93blRpbWVzW2ludGVyYWN0aW9uLmRvd25UaW1lcy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgICAgICAgICA6IHByZXZFdmVudC50MDtcblxuICAgIGNvbnN0IHNpZ25hbEFyZyA9IHtcbiAgICAgIGludGVyYWN0aW9uLFxuICAgICAgZXZlbnQsXG4gICAgICBhY3Rpb24sXG4gICAgICBwaGFzZSxcbiAgICAgIGVsZW1lbnQsXG4gICAgICByZWxhdGVkLFxuICAgICAgcGFnZSxcbiAgICAgIGNsaWVudCxcbiAgICAgIGNvb3JkcyxcbiAgICAgIHN0YXJ0aW5nLFxuICAgICAgZW5kaW5nLFxuICAgICAgZGVsdGFTb3VyY2UsXG4gICAgICBpRXZlbnQ6IHRoaXMsXG4gICAgfTtcblxuICAgIHNpZ25hbHMuZmlyZSgnc2V0LXh5Jywgc2lnbmFsQXJnKTtcblxuICAgIGlmIChlbmRpbmcpIHtcbiAgICAgIC8vIHVzZSBwcmV2aW91cyBjb29yZHMgd2hlbiBlbmRpbmdcbiAgICAgIHRoaXMucGFnZVggPSBwcmV2RXZlbnQucGFnZVg7XG4gICAgICB0aGlzLnBhZ2VZID0gcHJldkV2ZW50LnBhZ2VZO1xuICAgICAgdGhpcy5jbGllbnRYID0gcHJldkV2ZW50LmNsaWVudFg7XG4gICAgICB0aGlzLmNsaWVudFkgPSBwcmV2RXZlbnQuY2xpZW50WTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnBhZ2VYICAgICA9IHBhZ2UueDtcbiAgICAgIHRoaXMucGFnZVkgICAgID0gcGFnZS55O1xuICAgICAgdGhpcy5jbGllbnRYICAgPSBjbGllbnQueDtcbiAgICAgIHRoaXMuY2xpZW50WSAgID0gY2xpZW50Lnk7XG4gICAgfVxuXG4gICAgdGhpcy54MCAgICAgICAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnggLSBvcmlnaW4ueDtcbiAgICB0aGlzLnkwICAgICAgICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueSAtIG9yaWdpbi55O1xuICAgIHRoaXMuY2xpZW50WDAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50LnggLSBvcmlnaW4ueDtcbiAgICB0aGlzLmNsaWVudFkwICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC55IC0gb3JpZ2luLnk7XG5cbiAgICBzaWduYWxzLmZpcmUoJ3NldC1kZWx0YScsIHNpZ25hbEFyZyk7XG5cbiAgICB0aGlzLnRpbWVTdGFtcCA9IGNvb3Jkcy50aW1lU3RhbXA7XG4gICAgdGhpcy5kdCAgICAgICAgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEudGltZVN0YW1wO1xuICAgIHRoaXMuZHVyYXRpb24gID0gdGhpcy50aW1lU3RhbXAgLSB0aGlzLnQwO1xuXG4gICAgLy8gc3BlZWQgYW5kIHZlbG9jaXR5IGluIHBpeGVscyBwZXIgc2Vjb25kXG4gICAgdGhpcy5zcGVlZCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YVtkZWx0YVNvdXJjZV0uc3BlZWQ7XG4gICAgdGhpcy52ZWxvY2l0eVggPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGFbZGVsdGFTb3VyY2VdLnZ4O1xuICAgIHRoaXMudmVsb2NpdHlZID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhW2RlbHRhU291cmNlXS52eTtcblxuICAgIHRoaXMuc3dpcGUgPSAoZW5kaW5nIHx8IHBoYXNlID09PSAnaW5lcnRpYXN0YXJ0Jyk/IHRoaXMuZ2V0U3dpcGUoKSA6IG51bGw7XG5cbiAgICBzaWduYWxzLmZpcmUoJ25ldycsIHNpZ25hbEFyZyk7XG4gIH1cblxuICBnZXRTd2lwZSAoKSB7XG4gICAgY29uc3QgaW50ZXJhY3Rpb24gPSB0aGlzLmludGVyYWN0aW9uO1xuXG4gICAgaWYgKGludGVyYWN0aW9uLnByZXZFdmVudC5zcGVlZCA8IDYwMFxuICAgICAgICB8fCB0aGlzLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnByZXZFdmVudC50aW1lU3RhbXAgPiAxNTApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBhbmdsZSA9IDE4MCAqIE1hdGguYXRhbjIoaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WSwgaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WCkgLyBNYXRoLlBJO1xuICAgIGNvbnN0IG92ZXJsYXAgPSAyMi41O1xuXG4gICAgaWYgKGFuZ2xlIDwgMCkge1xuICAgICAgYW5nbGUgKz0gMzYwO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZnQgPSAxMzUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMjI1ICsgb3ZlcmxhcDtcbiAgICBjb25zdCB1cCAgID0gMjI1IC0gb3ZlcmxhcCA8PSBhbmdsZSAmJiBhbmdsZSA8IDMxNSArIG92ZXJsYXA7XG5cbiAgICBjb25zdCByaWdodCA9ICFsZWZ0ICYmICgzMTUgLSBvdmVybGFwIDw9IGFuZ2xlIHx8IGFuZ2xlIDwgIDQ1ICsgb3ZlcmxhcCk7XG4gICAgY29uc3QgZG93biAgPSAhdXAgICAmJiAgIDQ1IC0gb3ZlcmxhcCA8PSBhbmdsZSAmJiBhbmdsZSA8IDEzNSArIG92ZXJsYXA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0LFxuICAgICAgYW5nbGUsXG4gICAgICBzcGVlZDogaW50ZXJhY3Rpb24ucHJldkV2ZW50LnNwZWVkLFxuICAgICAgdmVsb2NpdHk6IHtcbiAgICAgICAgeDogaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WCxcbiAgICAgICAgeTogaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHByZXZlbnREZWZhdWx0ICgpIHt9XG5cbiAgLyoqICovXG4gIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH1cblxuICAvKiogKi9cbiAgc3RvcFByb3BhZ2F0aW9uICgpIHtcbiAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH1cbn1cblxuc2lnbmFscy5vbignc2V0LWRlbHRhJywgZnVuY3Rpb24gKHsgaUV2ZW50LCBpbnRlcmFjdGlvbiwgc3RhcnRpbmcsIGRlbHRhU291cmNlIH0pIHtcbiAgY29uc3QgcHJldkV2ZW50ID0gc3RhcnRpbmc/IGlFdmVudCA6IGludGVyYWN0aW9uLnByZXZFdmVudDtcblxuICBpZiAoZGVsdGFTb3VyY2UgPT09ICdjbGllbnQnKSB7XG4gICAgaUV2ZW50LmR4ID0gaUV2ZW50LmNsaWVudFggLSBwcmV2RXZlbnQuY2xpZW50WDtcbiAgICBpRXZlbnQuZHkgPSBpRXZlbnQuY2xpZW50WSAtIHByZXZFdmVudC5jbGllbnRZO1xuICB9XG4gIGVsc2Uge1xuICAgIGlFdmVudC5keCA9IGlFdmVudC5wYWdlWCAtIHByZXZFdmVudC5wYWdlWDtcbiAgICBpRXZlbnQuZHkgPSBpRXZlbnQucGFnZVkgLSBwcmV2RXZlbnQucGFnZVk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMgPSBzaWduYWxzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyYWN0RXZlbnQ7XG4iLCJjb25zdCB7XG4gIHJlc29sdmVSZWN0TGlrZSxcbiAgcmVjdFRvWFksXG59ID0gcmVxdWlyZSgnLi9yZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgZWxlbWVudCwgYWN0aW9uKSB7XG4gIGNvbnN0IGFjdGlvbk9wdGlvbnMgPSB0YXJnZXQub3B0aW9uc1thY3Rpb25dO1xuICBjb25zdCBhY3Rpb25PcmlnaW4gPSBhY3Rpb25PcHRpb25zICYmIGFjdGlvbk9wdGlvbnMub3JpZ2luO1xuICBjb25zdCBvcmlnaW4gPSBhY3Rpb25PcmlnaW4gfHwgdGFyZ2V0Lm9wdGlvbnMub3JpZ2luO1xuXG4gIGNvbnN0IG9yaWdpblJlY3QgPSByZXNvbHZlUmVjdExpa2Uob3JpZ2luLCB0YXJnZXQsIGVsZW1lbnQsIFt0YXJnZXQgJiYgZWxlbWVudF0pO1xuXG4gIHJldHVybiByZWN0VG9YWShvcmlnaW5SZWN0KSB8fCB7IHg6IDAsIHk6IDAgfTtcbn07XG4iLCJjb25zdCBleHRlbmQgPSByZXF1aXJlKCcuL2V4dGVuZCcpO1xuY29uc3QgaXMgPSByZXF1aXJlKCcuL2lzJyk7XG5jb25zdCB7XG4gIGNsb3Nlc3QsXG4gIHBhcmVudE5vZGUsXG4gIGdldEVsZW1lbnRSZWN0LFxufSA9IHJlcXVpcmUoJy4vZG9tVXRpbHMnKTtcblxuY29uc3QgcmVjdFV0aWxzID0ge1xuICBnZXRTdHJpbmdPcHRpb25SZXN1bHQ6IGZ1bmN0aW9uICh2YWx1ZSwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KSB7XG4gICAgaWYgKCFpcy5zdHJpbmcodmFsdWUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICdwYXJlbnQnKSB7XG4gICAgICB2YWx1ZSA9IHBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbHVlID09PSAnc2VsZicpIHtcbiAgICAgIHZhbHVlID0gaW50ZXJhY3RhYmxlLmdldFJlY3QoZWxlbWVudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFsdWUgPSBjbG9zZXN0KGVsZW1lbnQsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG5cbiAgcmVzb2x2ZVJlY3RMaWtlOiBmdW5jdGlvbiAodmFsdWUsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgZnVuY3Rpb25BcmdzKSB7XG4gICAgdmFsdWUgPSByZWN0VXRpbHMuZ2V0U3RyaW5nT3B0aW9uUmVzdWx0KHZhbHVlLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpIHx8IHZhbHVlO1xuXG4gICAgaWYgKGlzLmZ1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseShudWxsLCBmdW5jdGlvbkFyZ3MpO1xuICAgIH1cblxuICAgIGlmIChpcy5lbGVtZW50KHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSBnZXRFbGVtZW50UmVjdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIHJlY3RUb1hZOiBmdW5jdGlvbiAocmVjdCkge1xuICAgIHJldHVybiAgcmVjdCAmJiB7XG4gICAgICB4OiAneCcgaW4gcmVjdCA/IHJlY3QueCA6IHJlY3QubGVmdCxcbiAgICAgIHk6ICd5JyBpbiByZWN0ID8gcmVjdC55IDogcmVjdC50b3AsXG4gICAgfTtcbiAgfSxcblxuICB4eXdoVG9UbGJyOiBmdW5jdGlvbiAocmVjdCkge1xuICAgIGlmIChyZWN0ICYmICEoJ2xlZnQnIGluIHJlY3QgJiYgJ3RvcCcgaW4gcmVjdCkpIHtcbiAgICAgIHJlY3QgPSBleHRlbmQoe30sIHJlY3QpO1xuXG4gICAgICByZWN0LmxlZnQgICA9IHJlY3QueCB8fCAwO1xuICAgICAgcmVjdC50b3AgICAgPSByZWN0LnkgfHwgMDtcbiAgICAgIHJlY3QucmlnaHQgID0gcmVjdC5yaWdodCAgIHx8IChyZWN0LmxlZnQgKyByZWN0LndpZHRoKTtcbiAgICAgIHJlY3QuYm90dG9tID0gcmVjdC5ib3R0b20gIHx8IChyZWN0LnRvcCArIHJlY3QuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVjdDtcbiAgfSxcblxuICB0bGJyVG9YeXdoOiBmdW5jdGlvbiAocmVjdCkge1xuICAgIGlmIChyZWN0ICYmICEoJ3gnIGluIHJlY3QgJiYgJ3knIGluIHJlY3QpKSB7XG4gICAgICByZWN0ID0gZXh0ZW5kKHt9LCByZWN0KTtcblxuICAgICAgcmVjdC54ICAgICAgPSByZWN0LmxlZnQgfHwgMDtcbiAgICAgIHJlY3QudG9wICAgID0gcmVjdC50b3AgIHx8IDA7XG4gICAgICByZWN0LndpZHRoICA9IHJlY3Qud2lkdGggIHx8IChyZWN0LnJpZ2h0ICAtIHJlY3QueCk7XG4gICAgICByZWN0LmhlaWdodCA9IHJlY3QuaGVpZ2h0IHx8IChyZWN0LmJvdHRvbSAtIHJlY3QueSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlY3Q7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlY3RVdGlscztcbiIsImNvbnN0IHdpbiAgICAgICAgPSByZXF1aXJlKCcuL3dpbmRvdycpO1xuY29uc3QgYnJvd3NlciAgICA9IHJlcXVpcmUoJy4vYnJvd3NlcicpO1xuY29uc3QgaXMgICAgICAgICA9IHJlcXVpcmUoJy4vaXMnKTtcbmNvbnN0IGRvbU9iamVjdHMgPSByZXF1aXJlKCcuL2RvbU9iamVjdHMnKTtcblxuY29uc3QgZG9tVXRpbHMgPSB7XG4gIG5vZGVDb250YWluczogZnVuY3Rpb24gKHBhcmVudCwgY2hpbGQpIHtcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZCA9PT0gcGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIGNsb3Nlc3Q6IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHdoaWxlIChpcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICBpZiAoZG9tVXRpbHMubWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSkgeyByZXR1cm4gZWxlbWVudDsgfVxuXG4gICAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBwYXJlbnROb2RlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG5cbiAgICBpZiAoaXMuZG9jRnJhZyhwYXJlbnQpKSB7XG4gICAgICAvLyBza2lwIHBhc3QgI3NoYWRvLXJvb3QgZnJhZ21lbnRzXG4gICAgICB3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5ob3N0KSAmJiBpcy5kb2NGcmFnKHBhcmVudCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudDtcbiAgfSxcblxuICBtYXRjaGVzU2VsZWN0b3I6IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIC8vIHJlbW92ZSAvZGVlcC8gZnJvbSBzZWxlY3RvcnMgaWYgc2hhZG93RE9NIHBvbHlmaWxsIGlzIHVzZWRcbiAgICBpZiAod2luLndpbmRvdyAhPT0gd2luLnJlYWxXaW5kb3cpIHtcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZSgvXFwvZGVlcFxcLy9nLCAnICcpO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50W2Jyb3dzZXIucHJlZml4ZWRNYXRjaGVzU2VsZWN0b3JdKHNlbGVjdG9yKTtcbiAgfSxcblxuICAvLyBUZXN0IGZvciB0aGUgZWxlbWVudCB0aGF0J3MgXCJhYm92ZVwiIGFsbCBvdGhlciBxdWFsaWZpZXJzXG4gIGluZGV4T2ZEZWVwZXN0RWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gICAgbGV0IGRlZXBlc3Rab25lUGFyZW50cyA9IFtdO1xuICAgIGxldCBkcm9wem9uZVBhcmVudHMgPSBbXTtcbiAgICBsZXQgZHJvcHpvbmU7XG4gICAgbGV0IGRlZXBlc3Rab25lID0gZWxlbWVudHNbMF07XG4gICAgbGV0IGluZGV4ID0gZGVlcGVzdFpvbmU/IDA6IC0xO1xuICAgIGxldCBwYXJlbnQ7XG4gICAgbGV0IGNoaWxkO1xuICAgIGxldCBpO1xuICAgIGxldCBuO1xuXG4gICAgZm9yIChpID0gMTsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkcm9wem9uZSA9IGVsZW1lbnRzW2ldO1xuXG4gICAgICAvLyBhbiBlbGVtZW50IG1pZ2h0IGJlbG9uZyB0byBtdWx0aXBsZSBzZWxlY3RvciBkcm9wem9uZXNcbiAgICAgIGlmICghZHJvcHpvbmUgfHwgZHJvcHpvbmUgPT09IGRlZXBlc3Rab25lKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRlZXBlc3Rab25lKSB7XG4gICAgICAgIGRlZXBlc3Rab25lID0gZHJvcHpvbmU7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBkZWVwZXN0IG9yIGN1cnJlbnQgYXJlIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBvciBkb2N1bWVudC5yb290RWxlbWVudFxuICAgICAgLy8gLSBpZiB0aGUgY3VycmVudCBkcm9wem9uZSBpcywgZG8gbm90aGluZyBhbmQgY29udGludWVcbiAgICAgIGlmIChkcm9wem9uZS5wYXJlbnROb2RlID09PSBkcm9wem9uZS5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgLy8gLSBpZiBkZWVwZXN0IGlzLCB1cGRhdGUgd2l0aCB0aGUgY3VycmVudCBkcm9wem9uZSBhbmQgY29udGludWUgdG8gbmV4dFxuICAgICAgZWxzZSBpZiAoZGVlcGVzdFpvbmUucGFyZW50Tm9kZSA9PT0gZHJvcHpvbmUub3duZXJEb2N1bWVudCkge1xuICAgICAgICBkZWVwZXN0Wm9uZSA9IGRyb3B6b25lO1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRlZXBlc3Rab25lUGFyZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcGFyZW50ID0gZGVlcGVzdFpvbmU7XG4gICAgICAgIHdoaWxlIChwYXJlbnQucGFyZW50Tm9kZSAmJiBwYXJlbnQucGFyZW50Tm9kZSAhPT0gcGFyZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICBkZWVwZXN0Wm9uZVBhcmVudHMudW5zaGlmdChwYXJlbnQpO1xuICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoaXMgZWxlbWVudCBpcyBhbiBzdmcgZWxlbWVudCBhbmQgdGhlIGN1cnJlbnQgZGVlcGVzdCBpc1xuICAgICAgLy8gYW4gSFRNTEVsZW1lbnRcbiAgICAgIGlmIChkZWVwZXN0Wm9uZSBpbnN0YW5jZW9mIGRvbU9iamVjdHMuSFRNTEVsZW1lbnRcbiAgICAgICAgICAmJiBkcm9wem9uZSBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHRWxlbWVudFxuICAgICAgICAgICYmICEoZHJvcHpvbmUgaW5zdGFuY2VvZiBkb21PYmplY3RzLlNWR1NWR0VsZW1lbnQpKSB7XG5cbiAgICAgICAgaWYgKGRyb3B6b25lID09PSBkZWVwZXN0Wm9uZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJlbnQgPSBkcm9wem9uZS5vd25lclNWR0VsZW1lbnQ7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcGFyZW50ID0gZHJvcHpvbmU7XG4gICAgICB9XG5cbiAgICAgIGRyb3B6b25lUGFyZW50cyA9IFtdO1xuXG4gICAgICB3aGlsZSAocGFyZW50LnBhcmVudE5vZGUgIT09IHBhcmVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRyb3B6b25lUGFyZW50cy51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICBuID0gMDtcblxuICAgICAgLy8gZ2V0IChwb3NpdGlvbiBvZiBsYXN0IGNvbW1vbiBhbmNlc3RvcikgKyAxXG4gICAgICB3aGlsZSAoZHJvcHpvbmVQYXJlbnRzW25dICYmIGRyb3B6b25lUGFyZW50c1tuXSA9PT0gZGVlcGVzdFpvbmVQYXJlbnRzW25dKSB7XG4gICAgICAgIG4rKztcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyZW50cyA9IFtcbiAgICAgICAgZHJvcHpvbmVQYXJlbnRzW24gLSAxXSxcbiAgICAgICAgZHJvcHpvbmVQYXJlbnRzW25dLFxuICAgICAgICBkZWVwZXN0Wm9uZVBhcmVudHNbbl0sXG4gICAgICBdO1xuXG4gICAgICBjaGlsZCA9IHBhcmVudHNbMF0ubGFzdENoaWxkO1xuXG4gICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnRzWzFdKSB7XG4gICAgICAgICAgZGVlcGVzdFpvbmUgPSBkcm9wem9uZTtcbiAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzID0gW107XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGlsZCA9PT0gcGFyZW50c1syXSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9LFxuXG4gIG1hdGNoZXNVcFRvOiBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IsIGxpbWl0KSB7XG4gICAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIGlmIChkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcblxuICAgICAgaWYgKGVsZW1lbnQgPT09IGxpbWl0KSB7XG4gICAgICAgIHJldHVybiBkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBnZXRBY3R1YWxFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiAoZWxlbWVudCBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHRWxlbWVudEluc3RhbmNlXG4gICAgICA/IGVsZW1lbnQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnRcbiAgICAgIDogZWxlbWVudCk7XG4gIH0sXG5cbiAgZ2V0U2Nyb2xsWFk6IGZ1bmN0aW9uIChyZWxldmFudFdpbmRvdykge1xuICAgIHJlbGV2YW50V2luZG93ID0gcmVsZXZhbnRXaW5kb3cgfHwgd2luLndpbmRvdztcbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVsZXZhbnRXaW5kb3cuc2Nyb2xsWCB8fCByZWxldmFudFdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgIHk6IHJlbGV2YW50V2luZG93LnNjcm9sbFkgfHwgcmVsZXZhbnRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICB9O1xuICB9LFxuXG4gIGdldEVsZW1lbnRDbGllbnRSZWN0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGNvbnN0IGNsaWVudFJlY3QgPSAoZWxlbWVudCBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHRWxlbWVudFxuICAgICAgPyBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICA6IGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXSk7XG5cbiAgICByZXR1cm4gY2xpZW50UmVjdCAmJiB7XG4gICAgICBsZWZ0ICA6IGNsaWVudFJlY3QubGVmdCxcbiAgICAgIHJpZ2h0IDogY2xpZW50UmVjdC5yaWdodCxcbiAgICAgIHRvcCAgIDogY2xpZW50UmVjdC50b3AsXG4gICAgICBib3R0b206IGNsaWVudFJlY3QuYm90dG9tLFxuICAgICAgd2lkdGggOiBjbGllbnRSZWN0LndpZHRoICB8fCBjbGllbnRSZWN0LnJpZ2h0ICAtIGNsaWVudFJlY3QubGVmdCxcbiAgICAgIGhlaWdodDogY2xpZW50UmVjdC5oZWlnaHQgfHwgY2xpZW50UmVjdC5ib3R0b20gLSBjbGllbnRSZWN0LnRvcCxcbiAgICB9O1xuICB9LFxuXG4gIGdldEVsZW1lbnRSZWN0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGNvbnN0IGNsaWVudFJlY3QgPSBkb21VdGlscy5nZXRFbGVtZW50Q2xpZW50UmVjdChlbGVtZW50KTtcblxuICAgIGlmICghYnJvd3Nlci5pc0lPUzcgJiYgY2xpZW50UmVjdCkge1xuICAgICAgY29uc3Qgc2Nyb2xsID0gZG9tVXRpbHMuZ2V0U2Nyb2xsWFkod2luLmdldFdpbmRvdyhlbGVtZW50KSk7XG5cbiAgICAgIGNsaWVudFJlY3QubGVmdCAgICs9IHNjcm9sbC54O1xuICAgICAgY2xpZW50UmVjdC5yaWdodCAgKz0gc2Nyb2xsLng7XG4gICAgICBjbGllbnRSZWN0LnRvcCAgICArPSBzY3JvbGwueTtcbiAgICAgIGNsaWVudFJlY3QuYm90dG9tICs9IHNjcm9sbC55O1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnRSZWN0O1xuICB9LFxuXG4gIGdldFBhdGg6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgY29uc3QgcGF0aCA9IFtdO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgIHBhdGgucHVzaChlbGVtZW50KTtcbiAgICAgIGVsZW1lbnQgPSBkb21VdGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoO1xuICB9LFxuXG4gIHRyeVNlbGVjdG9yOiB2YWx1ZSA9PiB7XG4gICAgaWYgKCFpcy5zdHJpbmcodmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgLy8gYW4gZXhjZXB0aW9uIHdpbGwgYmUgcmFpc2VkIGlmIGl0IGlzIGludmFsaWRcbiAgICBkb21PYmplY3RzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb21VdGlscztcbiIsImNvbnN0IHsgd2luZG93IH0gPSByZXF1aXJlKCcuL3dpbmRvdycpO1xuY29uc3QgaXMgICAgID0gcmVxdWlyZSgnLi9pcycpO1xuY29uc3QgZG9tT2JqZWN0cyA9IHJlcXVpcmUoJy4vZG9tT2JqZWN0cycpO1xuXG5jb25zdCBFbGVtZW50ID0gZG9tT2JqZWN0cy5FbGVtZW50O1xuY29uc3QgbmF2aWdhdG9yICA9IHdpbmRvdy5uYXZpZ2F0b3I7XG5cbmNvbnN0IGJyb3dzZXIgPSB7XG4gIC8vIERvZXMgdGhlIGJyb3dzZXIgc3VwcG9ydCB0b3VjaCBpbnB1dD9cbiAgc3VwcG9ydHNUb3VjaDogISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgaXMuZnVuY3Rpb24od2luZG93LkRvY3VtZW50VG91Y2gpXG4gICAgICAgICAgICAgICAgICAgICAmJiBkb21PYmplY3RzLmRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpLFxuXG4gIC8vIERvZXMgdGhlIGJyb3dzZXIgc3VwcG9ydCBQb2ludGVyRXZlbnRzXG4gIHN1cHBvcnRzUG9pbnRlckV2ZW50OiAhIWRvbU9iamVjdHMuUG9pbnRlckV2ZW50LFxuXG4gIGlzSU9TOiAoL2lQKGhvbmV8b2R8YWQpLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkpLFxuXG4gIC8vIHNjcm9sbGluZyBkb2Vzbid0IGNoYW5nZSB0aGUgcmVzdWx0IG9mIGdldENsaWVudFJlY3RzIG9uIGlPUyA3XG4gIGlzSU9TNzogKC9pUChob25lfG9kfGFkKS8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pXG4gICAgICAgICAgICYmIC9PUyA3W15cXGRdLy50ZXN0KG5hdmlnYXRvci5hcHBWZXJzaW9uKSksXG5cbiAgaXNJZTk6IC9NU0lFIDkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksXG5cbiAgLy8gcHJlZml4IG1hdGNoZXNTZWxlY3RvclxuICBwcmVmaXhlZE1hdGNoZXNTZWxlY3RvcjogJ21hdGNoZXMnIGluIEVsZW1lbnQucHJvdG90eXBlXG4gICAgPyAnbWF0Y2hlcyc6ICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlXG4gICAgPyAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJzogJ21vek1hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGVcbiAgICA/ICdtb3pNYXRjaGVzU2VsZWN0b3InOiAnb01hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGVcbiAgICA/ICdvTWF0Y2hlc1NlbGVjdG9yJzogJ21zTWF0Y2hlc1NlbGVjdG9yJyxcblxuICBwRXZlbnRUeXBlczogKGRvbU9iamVjdHMuUG9pbnRlckV2ZW50XG4gICAgPyAoZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQgPT09IHdpbmRvdy5NU1BvaW50ZXJFdmVudFxuICAgICAgPyB7XG4gICAgICAgIHVwOiAgICAgJ01TUG9pbnRlclVwJyxcbiAgICAgICAgZG93bjogICAnTVNQb2ludGVyRG93bicsXG4gICAgICAgIG92ZXI6ICAgJ21vdXNlb3ZlcicsXG4gICAgICAgIG91dDogICAgJ21vdXNlb3V0JyxcbiAgICAgICAgbW92ZTogICAnTVNQb2ludGVyTW92ZScsXG4gICAgICAgIGNhbmNlbDogJ01TUG9pbnRlckNhbmNlbCcsXG4gICAgICB9XG4gICAgICA6IHtcbiAgICAgICAgdXA6ICAgICAncG9pbnRlcnVwJyxcbiAgICAgICAgZG93bjogICAncG9pbnRlcmRvd24nLFxuICAgICAgICBvdmVyOiAgICdwb2ludGVyb3ZlcicsXG4gICAgICAgIG91dDogICAgJ3BvaW50ZXJvdXQnLFxuICAgICAgICBtb3ZlOiAgICdwb2ludGVybW92ZScsXG4gICAgICAgIGNhbmNlbDogJ3BvaW50ZXJjYW5jZWwnLFxuICAgICAgfSlcbiAgICA6IG51bGwpLFxuXG4gIC8vIGJlY2F1c2UgV2Via2l0IGFuZCBPcGVyYSBzdGlsbCB1c2UgJ21vdXNld2hlZWwnIGV2ZW50IHR5cGVcbiAgd2hlZWxFdmVudDogJ29ubW91c2V3aGVlbCcgaW4gZG9tT2JqZWN0cy5kb2N1bWVudD8gJ21vdXNld2hlZWwnOiAnd2hlZWwnLFxuXG59O1xuXG4vLyBPcGVyYSBNb2JpbGUgbXVzdCBiZSBoYW5kbGVkIGRpZmZlcmVudGx5XG5icm93c2VyLmlzT3BlcmFNb2JpbGUgPSAobmF2aWdhdG9yLmFwcE5hbWUgPT09ICdPcGVyYSdcbiAgJiYgYnJvd3Nlci5zdXBwb3J0c1RvdWNoXG4gICYmIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goJ1ByZXN0bycpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBicm93c2VyO1xuIiwiY29uc3Qgd2luICAgICAgICA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG5jb25zdCBpc1dpbmRvdyAgID0gcmVxdWlyZSgnLi9pc1dpbmRvdycpO1xuXG5jb25zdCBpcyA9IHtcbiAgYXJyYXkgICA6ICgpID0+IHt9LFxuXG4gIHdpbmRvdyAgOiB0aGluZyA9PiB0aGluZyA9PT0gd2luLndpbmRvdyB8fCBpc1dpbmRvdyh0aGluZyksXG5cbiAgZG9jRnJhZyA6IHRoaW5nID0+IGlzLm9iamVjdCh0aGluZykgJiYgdGhpbmcubm9kZVR5cGUgPT09IDExLFxuXG4gIG9iamVjdCAgOiB0aGluZyA9PiAhIXRoaW5nICYmICh0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnKSxcblxuICBmdW5jdGlvbjogdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nLFxuXG4gIG51bWJlciAgOiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09ICdudW1iZXInICAsXG5cbiAgYm9vbCAgICA6IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gJ2Jvb2xlYW4nICxcblxuICBzdHJpbmcgIDogdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSAnc3RyaW5nJyAgLFxuXG4gIGVsZW1lbnQ6IHRoaW5nID0+IHtcbiAgICBpZiAoIXRoaW5nIHx8ICh0eXBlb2YgdGhpbmcgIT09ICdvYmplY3QnKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGNvbnN0IF93aW5kb3cgPSB3aW4uZ2V0V2luZG93KHRoaW5nKSB8fCB3aW4ud2luZG93O1xuXG4gICAgcmV0dXJuICgvb2JqZWN0fGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBfd2luZG93LkVsZW1lbnQpXG4gICAgICA/IHRoaW5nIGluc3RhbmNlb2YgX3dpbmRvdy5FbGVtZW50IC8vRE9NMlxuICAgICAgOiB0aGluZy5ub2RlVHlwZSA9PT0gMSAmJiB0eXBlb2YgdGhpbmcubm9kZU5hbWUgPT09ICdzdHJpbmcnKTtcbiAgfSxcblxuICBwbGFpbk9iamVjdDogdGhpbmcgPT4gaXMub2JqZWN0KHRoaW5nKSAmJiB0aGluZy5jb25zdHJ1Y3Rvci5uYW1lID09PSAnT2JqZWN0Jyxcbn07XG5cbmlzLmFycmF5ID0gdGhpbmcgPT4gKGlzLm9iamVjdCh0aGluZylcbiAgJiYgKHR5cGVvZiB0aGluZy5sZW5ndGggIT09ICd1bmRlZmluZWQnKVxuICAmJiBpcy5mdW5jdGlvbih0aGluZy5zcGxpY2UpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpcztcbiIsImNvbnN0IGRvbU9iamVjdHMgPSB7fTtcbmNvbnN0IHdpbiA9IHJlcXVpcmUoJy4vd2luZG93Jykud2luZG93O1xuXG5mdW5jdGlvbiBibGFuayAoKSB7fVxuXG5kb21PYmplY3RzLmRvY3VtZW50ICAgICAgICAgICA9IHdpbi5kb2N1bWVudDtcbmRvbU9iamVjdHMuRG9jdW1lbnRGcmFnbWVudCAgID0gd2luLkRvY3VtZW50RnJhZ21lbnQgICB8fCBibGFuaztcbmRvbU9iamVjdHMuU1ZHRWxlbWVudCAgICAgICAgID0gd2luLlNWR0VsZW1lbnQgICAgICAgICB8fCBibGFuaztcbmRvbU9iamVjdHMuU1ZHU1ZHRWxlbWVudCAgICAgID0gd2luLlNWR1NWR0VsZW1lbnQgICAgICB8fCBibGFuaztcbmRvbU9iamVjdHMuU1ZHRWxlbWVudEluc3RhbmNlID0gd2luLlNWR0VsZW1lbnRJbnN0YW5jZSB8fCBibGFuaztcbmRvbU9iamVjdHMuRWxlbWVudCAgICAgICAgICAgID0gd2luLkVsZW1lbnQgICAgICAgICAgICB8fCBibGFuaztcbmRvbU9iamVjdHMuSFRNTEVsZW1lbnQgICAgICAgID0gd2luLkhUTUxFbGVtZW50ICAgICAgICB8fCBkb21PYmplY3RzLkVsZW1lbnQ7XG5cbmRvbU9iamVjdHMuRXZlbnQgICAgICAgID0gd2luLkV2ZW50O1xuZG9tT2JqZWN0cy5Ub3VjaCAgICAgICAgPSB3aW4uVG91Y2ggfHwgYmxhbms7XG5kb21PYmplY3RzLlBvaW50ZXJFdmVudCA9ICh3aW4uUG9pbnRlckV2ZW50IHx8IHdpbi5NU1BvaW50ZXJFdmVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tT2JqZWN0cztcbiIsImNvbnN0IHdpbiA9IG1vZHVsZS5leHBvcnRzO1xuY29uc3QgaXNXaW5kb3cgPSByZXF1aXJlKCcuL2lzV2luZG93Jyk7XG5cbmZ1bmN0aW9uIGluaXQgKHdpbmRvdykge1xuICAvLyBnZXQgd3JhcHBlZCB3aW5kb3cgaWYgdXNpbmcgU2hhZG93IERPTSBwb2x5ZmlsbFxuXG4gIHdpbi5yZWFsV2luZG93ID0gd2luZG93O1xuXG4gIC8vIGNyZWF0ZSBhIFRleHROb2RlXG4gIGNvbnN0IGVsID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcblxuICAvLyBjaGVjayBpZiBpdCdzIHdyYXBwZWQgYnkgYSBwb2x5ZmlsbFxuICBpZiAoZWwub3duZXJEb2N1bWVudCAhPT0gd2luZG93LmRvY3VtZW50XG4gICAgICAmJiB0eXBlb2Ygd2luZG93LndyYXAgPT09ICdmdW5jdGlvbidcbiAgICAmJiB3aW5kb3cud3JhcChlbCkgPT09IGVsKSB7XG4gICAgLy8gdXNlIHdyYXBwZWQgd2luZG93XG4gICAgd2luZG93ID0gd2luZG93LndyYXAod2luZG93KTtcbiAgfVxuXG4gIHdpbi53aW5kb3cgPSB3aW5kb3c7XG59XG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICB3aW4ud2luZG93ICAgICA9IHVuZGVmaW5lZDtcbiAgd2luLnJlYWxXaW5kb3cgPSB1bmRlZmluZWQ7XG59XG5lbHNlIHtcbiAgaW5pdCh3aW5kb3cpO1xufVxuXG53aW4uZ2V0V2luZG93ID0gZnVuY3Rpb24gZ2V0V2luZG93IChub2RlKSB7XG4gIGlmIChpc1dpbmRvdyhub2RlKSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY29uc3Qgcm9vdE5vZGUgPSAobm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUpO1xuXG4gIHJldHVybiByb290Tm9kZS5kZWZhdWx0VmlldyB8fCByb290Tm9kZS5wYXJlbnRXaW5kb3cgfHwgd2luLndpbmRvdztcbn07XG5cbndpbi5pbml0ID0gaW5pdDtcbiIsIm1vZHVsZS5leHBvcnRzID0gKHRoaW5nKSA9PiAhISh0aGluZyAmJiB0aGluZy5XaW5kb3cpICYmICh0aGluZyBpbnN0YW5jZW9mIHRoaW5nLldpbmRvdyk7XG4iLCJjbGFzcyBTaWduYWxzIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge1xuICAgICAgLy8gc2lnbmFsTmFtZTogW2xpc3RlbmVyc10sXG4gICAgfTtcbiAgfVxuXG4gIG9uIChuYW1lLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdID0gW2xpc3RlbmVyXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIG9mZiAobmFtZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1tuYW1lXS5pbmRleE9mKGxpc3RlbmVyKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZmlyZSAobmFtZSwgYXJnKSB7XG4gICAgY29uc3QgdGFyZ2V0TGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbmFtZV07XG5cbiAgICBpZiAoIXRhcmdldExpc3RlbmVycykgeyByZXR1cm47IH1cblxuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGFyZ2V0TGlzdGVuZXJzKSB7XG4gICAgICBpZiAobGlzdGVuZXIoYXJnLCBuYW1lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5TaWduYWxzLm5ldyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBTaWduYWxzKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hbHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYmFzZToge1xuICAgIGFjY2VwdCAgICAgICAgOiBudWxsLFxuICAgIHByZXZlbnREZWZhdWx0OiAnYXV0bycsXG4gICAgZGVsdGFTb3VyY2UgICA6ICdwYWdlJyxcbiAgfSxcblxuICBwZXJBY3Rpb246IHtcbiAgICBvcmlnaW46IHsgeDogMCwgeTogMCB9LFxuXG4gICAgaW5lcnRpYToge1xuICAgICAgZW5hYmxlZCAgICAgICAgICA6IGZhbHNlLFxuICAgICAgcmVzaXN0YW5jZSAgICAgICA6IDEwLCAgICAvLyB0aGUgbGFtYmRhIGluIGV4cG9uZW50aWFsIGRlY2F5XG4gICAgICBtaW5TcGVlZCAgICAgICAgIDogMTAwLCAgIC8vIHRhcmdldCBzcGVlZCBtdXN0IGJlIGFib3ZlIHRoaXMgZm9yIGluZXJ0aWEgdG8gc3RhcnRcbiAgICAgIGVuZFNwZWVkICAgICAgICAgOiAxMCwgICAgLy8gdGhlIHNwZWVkIGF0IHdoaWNoIGluZXJ0aWEgaXMgc2xvdyBlbm91Z2ggdG8gc3RvcFxuICAgICAgYWxsb3dSZXN1bWUgICAgICA6IHRydWUsICAvLyBhbGxvdyByZXN1bWluZyBhbiBhY3Rpb24gaW4gaW5lcnRpYSBwaGFzZVxuICAgICAgc21vb3RoRW5kRHVyYXRpb246IDMwMCwgICAvLyBhbmltYXRlIHRvIHNuYXAvcmVzdHJpY3QgZW5kT25seSBpZiB0aGVyZSdzIG5vIGluZXJ0aWFcbiAgICB9LFxuICB9LFxufTtcbiIsImNvbnN0IGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kLmpzJyk7XG5cbmZ1bmN0aW9uIGZpcmVVbnRpbEltbWVkaWF0ZVN0b3BwZWQgKGV2ZW50LCBsaXN0ZW5lcnMpIHtcbiAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICBpZiAoZXZlbnQuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKSB7IGJyZWFrOyB9XG5cbiAgICBsaXN0ZW5lcihldmVudCk7XG4gIH1cbn1cblxuY2xhc3MgRXZlbnRhYmxlIHtcblxuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyB8fCB7fSk7XG4gIH1cblxuICBmaXJlIChldmVudCkge1xuICAgIGxldCBsaXN0ZW5lcnM7XG4gICAgY29uc3Qgb25FdmVudCA9ICdvbicgKyBldmVudC50eXBlO1xuICAgIGNvbnN0IGdsb2JhbCA9IHRoaXMuZ2xvYmFsO1xuXG4gICAgLy8gSW50ZXJhY3RhYmxlI29uKCkgbGlzdGVuZXJzXG4gICAgaWYgKChsaXN0ZW5lcnMgPSB0aGlzW2V2ZW50LnR5cGVdKSkge1xuICAgICAgZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZChldmVudCwgbGlzdGVuZXJzKTtcbiAgICB9XG5cbiAgICAvLyBpbnRlcmFjdGFibGUub25ldmVudCBsaXN0ZW5lclxuICAgIGlmICh0aGlzW29uRXZlbnRdKSB7XG4gICAgICB0aGlzW29uRXZlbnRdKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvLyBpbnRlcmFjdC5vbigpIGxpc3RlbmVyc1xuICAgIGlmICghZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkICYmIGdsb2JhbCAmJiAobGlzdGVuZXJzID0gZ2xvYmFsW2V2ZW50LnR5cGVdKSkgIHtcbiAgICAgIGZpcmVVbnRpbEltbWVkaWF0ZVN0b3BwZWQoZXZlbnQsIGxpc3RlbmVycyk7XG4gICAgfVxuICB9XG5cbiAgb24gKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcbiAgICAvLyBpZiB0aGlzIHR5cGUgb2YgZXZlbnQgd2FzIG5ldmVyIGJvdW5kXG4gICAgaWYgKHRoaXNbZXZlbnRUeXBlXSkge1xuICAgICAgdGhpc1tldmVudFR5cGVdLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXNbZXZlbnRUeXBlXSA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgb2ZmIChldmVudFR5cGUsIGxpc3RlbmVyKSB7XG4gICAgLy8gaWYgaXQgaXMgYW4gYWN0aW9uIGV2ZW50IHR5cGVcbiAgICBjb25zdCBldmVudExpc3QgPSB0aGlzW2V2ZW50VHlwZV07XG4gICAgY29uc3QgaW5kZXggICAgID0gZXZlbnRMaXN0PyBldmVudExpc3QuaW5kZXhPZihsaXN0ZW5lcikgOiAtMTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGV2ZW50TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIGlmIChldmVudExpc3QgJiYgZXZlbnRMaXN0Lmxlbmd0aCA9PT0gMCB8fCAhbGlzdGVuZXIpIHtcbiAgICAgIHRoaXNbZXZlbnRUeXBlXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudGFibGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCAoZGVzdCwgc291cmNlKSB7XG4gIGZvciAoY29uc3QgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICB9XG4gIHJldHVybiBkZXN0O1xufTtcbiJdfQ==
