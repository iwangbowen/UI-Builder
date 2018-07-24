require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({156:[function(require,module,exports){
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

},{"../node_modules/interactjs/src/index":22,"./util/drag-n-drop":189}],189:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isAlign(targetOffset, currentOffset) {
    return {
        isHorizontalAlign: Math.abs(targetOffset.top - currentOffset.top) <= 0.7,
        isVerticalAlign: Math.abs(targetOffset.left - currentOffset.left) <= 0.7
    };
}

function removeAlignmentLines() {
    $('.horizontal-line, .vertical-line').remove();
}

function drawAlignmentLine(target) {
    var horizontalLineExists = false;
    var verticalLineExists = false;
    var targetOffset = $(target).offset();
    // 排除自身元素和该元素子元素
    [].concat(_toConsumableArray($('body *:visible:not(script)').not(target).not($(target).find('*')))).some(function (currentValue) {
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

},{}],22:[function(require,module,exports){
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

},{"./actions/drag":10,"./actions/drop":11,"./actions/gesture":12,"./actions/resize":13,"./autoScroll":14,"./autoStart/drag":17,"./autoStart/gesture":18,"./autoStart/hold":19,"./autoStart/resize":20,"./inertia":23,"./interact":24,"./interactablePreventDefault.js":25,"./modifiers/restrict":27,"./modifiers/restrictEdges":28,"./modifiers/restrictSize":29,"./modifiers/snap":30,"./modifiers/snapSize":31,"./pointerEvents/base":33,"./pointerEvents/holdRepeat":34,"./pointerEvents/interactableTargets":35}],35:[function(require,module,exports){
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

},{"../Interactable":7,"../scope":36,"../utils/arr":38,"../utils/extend":44,"../utils/is":49,"./base":33}],34:[function(require,module,exports){
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

},{"../Interaction":8,"./base":33}],33:[function(require,module,exports){
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

},{"../Interaction":8,"../defaultOptions":21,"../utils":47,"../utils/Signals":37,"./PointerEvent":32}],32:[function(require,module,exports){
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

},{"../utils/pointerUtils":52}],31:[function(require,module,exports){
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

},{"../actions/resize":13,"../defaultOptions":21,"../utils/":47,"./base":26,"./snap":30}],30:[function(require,module,exports){
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

},{"../defaultOptions":21,"../interact":24,"../utils":47,"./base":26}],29:[function(require,module,exports){
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

},{"../actions/resize":13,"../defaultOptions":21,"../utils":47,"../utils/rect":54,"./base":26,"./restrictEdges":28}],28:[function(require,module,exports){
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

},{"../actions/resize":13,"../defaultOptions":21,"../utils":47,"../utils/rect":54,"./base":26,"./restrict":27}],27:[function(require,module,exports){
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

},{"../defaultOptions":21,"../utils":47,"./base":26}],25:[function(require,module,exports){
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

},{"./Interactable":7,"./Interaction":8,"./scope":36,"./utils/browser":39,"./utils/domUtils":42,"./utils/events":43,"./utils/is":49}],23:[function(require,module,exports){
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

},{"./InteractEvent":6,"./Interaction":8,"./modifiers/base":26,"./utils":47,"./utils/raf":53}],26:[function(require,module,exports){
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

},{"../InteractEvent":6,"../Interaction":8,"../utils/extend":44}],20:[function(require,module,exports){
require('./base').setActionDefaults(require('../actions/resize'));

},{"../actions/resize":13,"./base":16}],19:[function(require,module,exports){
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

},{"../Interaction":8,"./base":16}],18:[function(require,module,exports){
require('./base').setActionDefaults(require('../actions/gesture'));

},{"../actions/gesture":12,"./base":16}],17:[function(require,module,exports){
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

},{"../actions/drag":10,"../scope":36,"../utils/domUtils":42,"../utils/is":49,"./base":16}],16:[function(require,module,exports){
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

},{"../Interactable":7,"../Interaction":8,"../actions/base":9,"../defaultOptions":21,"../interact":24,"../scope":36,"../utils":47,"../utils/Signals":37,"./InteractableMethods":15}],15:[function(require,module,exports){
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


},{"../Interactable":7,"../actions/base":9,"../utils":47,"../utils/domUtils":42,"../utils/is":49}],14:[function(require,module,exports){
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

},{"./Interaction":8,"./defaultOptions":21,"./utils/domUtils":42,"./utils/is":49,"./utils/raf":53,"./utils/window":55}],53:[function(require,module,exports){
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

},{"./window":55}],13:[function(require,module,exports){
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

},{"../InteractEvent":6,"../Interactable":7,"../Interaction":8,"../defaultOptions":21,"../utils":47,"../utils/browser":39,"./base":9}],12:[function(require,module,exports){
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

},{"../InteractEvent":6,"../Interactable":7,"../Interaction":8,"../defaultOptions":21,"../utils":47,"./base":9}],11:[function(require,module,exports){
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

},{"../InteractEvent":6,"../Interactable":7,"../Interaction":8,"../defaultOptions":21,"../interact":24,"../scope":36,"../utils":47,"./base":9}],24:[function(require,module,exports){
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

},{"./Interactable":7,"./Interaction":8,"./scope":36,"./utils":47,"./utils/browser":39,"./utils/events":43}],10:[function(require,module,exports){
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

},{"../InteractEvent":6,"../Interactable":7,"../Interaction":8,"../defaultOptions":21,"../utils":47,"./base":9}],7:[function(require,module,exports){
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

},{"./Eventable":5,"./actions/base":9,"./defaultOptions":21,"./scope":36,"./utils/Signals":37,"./utils/arr":38,"./utils/browser":39,"./utils/clone":40,"./utils/domUtils":42,"./utils/events":43,"./utils/extend":44,"./utils/is":49,"./utils/window":55}],40:[function(require,module,exports){
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

},{"./is":49}],9:[function(require,module,exports){
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

},{"../InteractEvent":6,"../Interaction":8}],8:[function(require,module,exports){
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

},{"./scope":36,"./utils":47,"./utils/Signals":37,"./utils/browser":39,"./utils/domObjects":41,"./utils/events":43,"./utils/interactionFinder":48}],48:[function(require,module,exports){
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

},{"../scope":36,"./index":47}],36:[function(require,module,exports){
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

},{"./utils":47,"./utils/Signals":37,"./utils/domObjects":41,"./utils/events":43,"./utils/window":55}],47:[function(require,module,exports){
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

},{"./arr":38,"./domUtils":42,"./extend":44,"./getOriginXY":45,"./hypot":46,"./is":49,"./pointerUtils":52,"./rect":54,"./window":55}],43:[function(require,module,exports){
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

},{"./arr":38,"./domUtils":42,"./is":49,"./pointerExtend":51,"./pointerUtils":52,"./window":55}],52:[function(require,module,exports){
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

},{"./browser":39,"./domObjects":41,"./domUtils":42,"./hypot":46,"./is":49,"./pointerExtend":51}],46:[function(require,module,exports){
module.exports = (x, y) =>  Math.sqrt(x * x + y * y);

},{}],51:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./defaultOptions":21,"./utils/Signals":37,"./utils/extend":44,"./utils/getOriginXY":45}],45:[function(require,module,exports){
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

},{"./rect":54}],54:[function(require,module,exports){
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

},{"./domUtils":42,"./extend":44,"./is":49}],42:[function(require,module,exports){
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

},{"./browser":39,"./domObjects":41,"./is":49,"./window":55}],39:[function(require,module,exports){
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

},{"./domObjects":41,"./is":49,"./window":55}],49:[function(require,module,exports){
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

},{"./isWindow":50,"./window":55}],41:[function(require,module,exports){
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

},{"./window":55}],55:[function(require,module,exports){
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

},{"./isWindow":50}],50:[function(require,module,exports){
module.exports = (thing) => !!(thing && thing.Window) && (thing instanceof thing.Window);

},{}],37:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./utils/extend.js":44}],44:[function(require,module,exports){
module.exports = function extend (dest, source) {
  for (const prop in source) {
    dest[prop] = source[prop];
  }
  return dest;
};

},{}]},{},[156])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGlmcmFtZS1kcmFnLW4tZHJvcC5qcyIsInNyY1xcdXRpbFxcZHJhZy1uLWRyb3AuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvcG9pbnRlckV2ZW50cy9pbnRlcmFjdGFibGVUYXJnZXRzLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3BvaW50ZXJFdmVudHMvaG9sZFJlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9wb2ludGVyRXZlbnRzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvcG9pbnRlckV2ZW50cy9Qb2ludGVyRXZlbnQuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3NuYXBTaXplLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL21vZGlmaWVycy9zbmFwLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL21vZGlmaWVycy9yZXN0cmljdFNpemUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3Jlc3RyaWN0RWRnZXMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL3Jlc3RyaWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2ludGVyYWN0YWJsZVByZXZlbnREZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2luZXJ0aWEuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvbW9kaWZpZXJzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYXV0b1N0YXJ0L3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvaG9sZC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvZ2VzdHVyZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU3RhcnQvSW50ZXJhY3RhYmxlTWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hdXRvU2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL3JhZi5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hY3Rpb25zL3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9hY3Rpb25zL2dlc3R1cmUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYWN0aW9ucy9kcm9wLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2ludGVyYWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL2FjdGlvbnMvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9JbnRlcmFjdGFibGUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvY2xvbmUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvYWN0aW9ucy9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL0ludGVyYWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2ludGVyYWN0aW9uRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3Njb3BlLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9wb2ludGVyVXRpbHMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaHlwb3QuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvcG9pbnRlckV4dGVuZC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9hcnIuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvSW50ZXJhY3RFdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9nZXRPcmlnaW5YWS5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy9yZWN0LmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2RvbVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvc3JjL3V0aWxzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaXMuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvZG9tT2JqZWN0cy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy91dGlscy93aW5kb3cuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvaXNXaW5kb3cuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvU2lnbmFscy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9kZWZhdWx0T3B0aW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9FdmVudGFibGUuanMiLCJub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBQ0E7Ozs7OztBQUVBLEtBQUssUUFBTCxHQUFnQixlQUFoQjtBQUNBLEtBQUssWUFBTCxHQUFvQix1QkFBcEI7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFNO0FBQ3BCLFFBQUksa0JBQWtCLEtBQXRCO0FBQ0EsUUFBTSxtQkFBbUIsU0FBbkIsZ0JBQW1CO0FBQUEsZUFBVyxDQUFDLENBQUMsRUFBRSxPQUFGLEVBQVcsT0FBWCxDQUFtQixXQUFuQixFQUFnQyxNQUE3QztBQUFBLEtBQXpCOztBQUVBO0FBQ0EseUJBQVMsV0FBVCxFQUNLLFFBREwsQ0FDYztBQUNOO0FBQ0EsZ0JBQVEsUUFGRjtBQUdOO0FBQ0EsaUJBQVMsSUFKSDtBQUtOO0FBQ0Esd0JBQWdCLHdCQUFVLEtBQVYsRUFBaUI7QUFDN0I7QUFDQSxrQkFBTSxNQUFOLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixhQUEzQjtBQUNILFNBVEs7QUFVTixxQkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCLGdCQUFJLG1CQUFtQixNQUFNLGFBQTdCO0FBQUEsZ0JBQ0ksa0JBQWtCLE1BQU0sTUFENUI7O0FBR0E7QUFDQSw0QkFBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsYUFBOUI7QUFDQSw2QkFBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsVUFBL0I7QUFDSCxTQWpCSztBQWtCTixxQkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCO0FBQ0Esa0JBQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDQSxrQkFBTSxhQUFOLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFVBQXJDO0FBQ0EsOEJBQWtCLEtBQWxCO0FBQ0gsU0F2Qks7QUF3Qk4sZ0JBQVEsdUJBQVM7QUFDYiw4QkFBa0IsSUFBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBTSxTQUFTLEVBQUUsTUFBTSxhQUFSLEVBQXVCLE1BQXZCLEVBQWY7QUFDQSxjQUFFLE1BQU0sYUFBUixFQUNLLFFBREwsQ0FDYyxFQUFFLE1BQU0sTUFBUixDQURkLEVBRUssR0FGTCxDQUVTO0FBQ0Qsc0JBQU0sRUFETDtBQUVELHFCQUFLLEVBRko7QUFHRCwyQkFBVztBQUhWLGFBRlQsRUFPSyxNQVBMLENBT1ksTUFQWixFQVFLLFVBUkwsQ0FRZ0IsZUFSaEI7QUFTSCxTQXZDSztBQXdDTiwwQkFBa0IsMEJBQVUsS0FBVixFQUFpQjtBQUMvQjtBQUNBLGtCQUFNLE1BQU4sQ0FBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLGFBQTlCO0FBQ0Esa0JBQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDQSxnQkFBSSxDQUFDLGVBQUQsSUFBb0IsaUJBQWlCLE1BQU0sYUFBdkIsQ0FBeEIsRUFBK0Q7QUFDM0Qsb0JBQU0sU0FBUyxFQUFFLE1BQU0sYUFBUixFQUF1QixNQUF2QixFQUFmO0FBQ0Esa0JBQUUsTUFBTSxhQUFSLEVBQ0ssUUFETCxDQUNjLEVBQUUsTUFBRixDQURkLEVBRUssTUFGTCxDQUVZLE1BRlo7QUFHSDtBQUNKO0FBbERLLEtBRGQsRUFxREssU0FyREwsQ0FxRGU7QUFDUDtBQUNBLGVBQU8sRUFBRSxNQUFNLElBQVIsRUFBYyxPQUFPLElBQXJCLEVBQTJCLFFBQVEsSUFBbkMsRUFBeUMsS0FBSyxJQUE5QyxFQUZBOztBQUlQO0FBQ0EsdUJBQWU7QUFDWCxtQkFBTyxRQURJO0FBRVgscUJBQVM7QUFGRSxTQUxSOztBQVVQO0FBQ0Esc0JBQWM7QUFDVixpQkFBSyxFQUFFLE9BQU8sR0FBVCxFQUFjLFFBQVEsRUFBdEI7QUFESyxTQVhQOztBQWVQLGlCQUFTO0FBZkYsS0FyRGYsRUFzRUssRUF0RUwsQ0FzRVEsWUF0RVIsRUFzRXNCLFVBQVUsS0FBVixFQUFpQjtBQUMvQixZQUFJLFNBQVMsTUFBTSxNQUFuQjtBQUFBLFlBQ0ksSUFBSyxXQUFXLE9BQU8sWUFBUCxDQUFvQixRQUFwQixDQUFYLEtBQTZDLENBRHREO0FBQUEsWUFFSSxJQUFLLFdBQVcsT0FBTyxZQUFQLENBQW9CLFFBQXBCLENBQVgsS0FBNkMsQ0FGdEQ7O0FBSUE7QUFDQSxlQUFPLEtBQVAsQ0FBYSxLQUFiLEdBQXFCLE1BQU0sSUFBTixDQUFXLEtBQVgsR0FBbUIsSUFBeEM7QUFDQSxlQUFPLEtBQVAsQ0FBYSxNQUFiLEdBQXNCLE1BQU0sSUFBTixDQUFXLE1BQVgsR0FBb0IsSUFBMUM7O0FBRUE7QUFDQSxhQUFLLE1BQU0sU0FBTixDQUFnQixJQUFyQjtBQUNBLGFBQUssTUFBTSxTQUFOLENBQWdCLEdBQXJCOztBQUVBLGVBQU8sS0FBUCxDQUFhLGVBQWIsR0FBK0IsT0FBTyxLQUFQLENBQWEsU0FBYixHQUMzQixlQUFlLENBQWYsR0FBbUIsS0FBbkIsR0FBMkIsQ0FBM0IsR0FBK0IsS0FEbkM7O0FBR0EsZUFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0EsZUFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0gsS0F4Rkw7O0FBMEZBLHlCQUFTLGtCQUFULEVBQ0ssU0FETCxDQUNlO0FBQ1A7QUFDQSxpQkFBUyxJQUZGO0FBR1A7QUFDQSxrQkFBVTtBQUNOLHlCQUFhLFNBQVMsSUFEaEI7QUFFTixxQkFBUyxJQUZIO0FBR04seUJBQWEsRUFBRSxLQUFLLENBQVAsRUFBVSxNQUFNLENBQWhCLEVBQW1CLFFBQVEsQ0FBM0IsRUFBOEIsT0FBTyxDQUFyQztBQUhQLFNBSkg7QUFTUDtBQUNBLG9CQUFZLElBVkw7O0FBWVA7QUFDQSxnQkFBUSx1QkFBUztBQUNiO0FBQ0EsZ0JBQUksU0FBUyxNQUFNLE1BQW5COztBQUNJO0FBQ0EsZ0JBQUksQ0FBQyxXQUFXLE9BQU8sWUFBUCxDQUFvQixRQUFwQixDQUFYLEtBQTZDLENBQTlDLElBQW1ELE1BQU0sRUFGakU7QUFBQSxnQkFHSSxJQUFJLENBQUMsV0FBVyxPQUFPLFlBQVAsQ0FBb0IsUUFBcEIsQ0FBWCxLQUE2QyxDQUE5QyxJQUFtRCxNQUFNLEVBSGpFO0FBSUE7QUFDQSxtQkFBTyxLQUFQLENBQWEsZUFBYixHQUNJLE9BQU8sS0FBUCxDQUFhLFNBQWIsR0FDQSxlQUFlLENBQWYsR0FBbUIsTUFBbkIsR0FBNEIsQ0FBNUIsR0FBZ0MsS0FGcEM7O0FBSUE7QUFDQSxtQkFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0EsbUJBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixDQUE5Qjs7QUFFQSw4Q0FBa0IsTUFBbEI7QUFDSCxTQTdCTTtBQThCUDtBQUNBLGVBQU87QUEvQkEsS0FEZjtBQWtDSCxDQWpJRDs7Ozs7Ozs7O0FDTkEsU0FBUyxPQUFULENBQWlCLFlBQWpCLEVBQStCLGFBQS9CLEVBQThDO0FBQzFDLFdBQU87QUFDSCwyQkFBbUIsS0FBSyxHQUFMLENBQVMsYUFBYSxHQUFiLEdBQW1CLGNBQWMsR0FBMUMsS0FBa0QsR0FEbEU7QUFFSCx5QkFBaUIsS0FBSyxHQUFMLENBQVMsYUFBYSxJQUFiLEdBQW9CLGNBQWMsSUFBM0MsS0FBb0Q7QUFGbEUsS0FBUDtBQUlIOztBQUVELFNBQVMsb0JBQVQsR0FBZ0M7QUFDNUIsTUFBRSxrQ0FBRixFQUFzQyxNQUF0QztBQUNIOztBQUVELFNBQVMsaUJBQVQsQ0FBMkIsTUFBM0IsRUFBbUM7QUFDL0IsUUFBSSx1QkFBdUIsS0FBM0I7QUFDQSxRQUFJLHFCQUFxQixLQUF6QjtBQUNBLFFBQU0sZUFBZSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQXJCO0FBQ0E7QUFDQSxpQ0FBSSxFQUFFLDRCQUFGLEVBQ0MsR0FERCxDQUNLLE1BREwsRUFFQyxHQUZELENBRUssRUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLEdBQWYsQ0FGTCxDQUFKLEdBR0ssSUFITCxDQUdVLHdCQUFnQjtBQUNsQixZQUFNLGdCQUFnQixFQUFFLFlBQUYsRUFBZ0IsTUFBaEIsRUFBdEI7O0FBRGtCLHVCQUU2QixRQUFRLFlBQVIsRUFBc0IsYUFBdEIsQ0FGN0I7QUFBQSxZQUVWLGlCQUZVLFlBRVYsaUJBRlU7QUFBQSxZQUVTLGVBRlQsWUFFUyxlQUZUOztBQUdsQixZQUFJLENBQUMsb0JBQUQsSUFBeUIsaUJBQTdCLEVBQWdEO0FBQzVDLGNBQUUsUUFBRixFQUNLLFFBREwsQ0FDYyxpQkFEZCxFQUVLLEdBRkwsQ0FFUztBQUNELHFCQUFLLGFBQWE7QUFEakIsYUFGVCxFQUtLLFFBTEwsQ0FLYyxFQUFFLE1BQUYsQ0FMZDtBQU1BLG1DQUF1QixJQUF2QjtBQUNIO0FBQ0QsWUFBSSxDQUFDLGtCQUFELElBQXVCLGVBQTNCLEVBQTRDO0FBQ3hDLGNBQUUsUUFBRixFQUNLLFFBREwsQ0FDYyxlQURkLEVBRUssR0FGTCxDQUVTO0FBQ0Qsc0JBQU0sYUFBYTtBQURsQixhQUZULEVBS0ssUUFMTCxDQUtjLEVBQUUsTUFBRixDQUxkO0FBTUEsaUNBQXFCLElBQXJCO0FBQ0g7QUFDRCxlQUFPLHdCQUF3QixrQkFBL0I7QUFDSCxLQXpCTDtBQTBCSDs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMkIsT0FBM0IsRUFBb0M7QUFDaEM7O0FBRUEsUUFBSSxLQUFLLENBQVQ7QUFBQSxRQUFZLEtBQUssQ0FBakI7QUFDQSxZQUFRLEdBQVI7QUFDSSxhQUFLLEVBQUw7QUFBUztBQUNMLGlCQUFLLENBQUMsQ0FBTjtBQUNBO0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTCxpQkFBSyxDQUFDLENBQU47QUFDQTtBQUNKLGFBQUssRUFBTDtBQUFTO0FBQ0wsaUJBQUssQ0FBTDtBQUNBO0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTCxpQkFBSyxDQUFMO0FBQ0E7QUFDSjtBQUFTLG1CQWJiLENBYXFCO0FBYnJCOztBQWdCQTtBQUNBLFFBQU0sSUFBSSxDQUFDLFdBQVcsUUFBUSxJQUFSLENBQWEsUUFBYixDQUFYLEtBQXNDLENBQXZDLElBQTRDLEVBQXREO0FBQUEsUUFDSSxJQUFJLENBQUMsV0FBVyxRQUFRLElBQVIsQ0FBYSxRQUFiLENBQVgsS0FBc0MsQ0FBdkMsSUFBNEMsRUFEcEQ7O0FBR0EsWUFBUSxHQUFSLENBQVk7QUFDUixrQ0FBd0IsQ0FBeEIsWUFBZ0MsQ0FBaEM7QUFEUSxLQUFaOztBQUlBO0FBQ0EsWUFBUSxJQUFSLENBQWEsUUFBYixFQUF1QixDQUF2QjtBQUNBLFlBQVEsSUFBUixDQUFhLFFBQWIsRUFBdUIsQ0FBdkI7O0FBRUEsc0JBQWtCLFFBQVEsR0FBUixDQUFZLENBQVosQ0FBbEI7QUFDSDs7UUFFUSxvQixHQUFBLG9CO1FBQXNCLFksR0FBQSxZO1FBQWMsaUIsR0FBQSxpQjs7O0FDL0U3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9kQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyT0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHJlbW92ZUFsaWdubWVudExpbmVzLCBhcnJvd0tleU1vdmUsIGRyYXdBbGlnbm1lbnRMaW5lIH0gZnJvbSAnLi91dGlsL2RyYWctbi1kcm9wJztcclxuaW1wb3J0IGludGVyYWN0IGZyb20gJy4uL25vZGVfbW9kdWxlcy9pbnRlcmFjdGpzL3NyYy9pbmRleCc7XHJcblxyXG5zZWxmLmludGVyYWN0ID0gaW50ZXJhY3Q7XHJcbnNlbGYuYXJyb3dLZXlNb3ZlID0gYXJyb3dLZXlNb3ZlO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG4gICAgbGV0IGVudGVyZWREcm9wem9uZSA9IGZhbHNlO1xyXG4gICAgY29uc3QgaXNEcm9wem9uZVBhcmVudCA9IGVsZW1lbnQgPT4gISEkKGVsZW1lbnQpLnBhcmVudHMoJy5kcm9wem9uZScpLmxlbmd0aDtcclxuXHJcbiAgICAvLyBlbmFibGUgZHJhZ2dhYmxlcyB0byBiZSBkcm9wcGVkIGludG8gdGhpc1xyXG4gICAgaW50ZXJhY3QoJy5kcm9wem9uZScpXHJcbiAgICAgICAgLmRyb3B6b25lKHtcclxuICAgICAgICAgICAgLy8gb25seSBhY2NlcHQgZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBDU1Mgc2VsZWN0b3JcclxuICAgICAgICAgICAgYWNjZXB0OiAnYm9keSAqJyxcclxuICAgICAgICAgICAgLy8gUmVxdWlyZSBhIDc1JSBlbGVtZW50IG92ZXJsYXAgZm9yIGEgZHJvcCB0byBiZSBwb3NzaWJsZVxyXG4gICAgICAgICAgICBvdmVybGFwOiAwLjUwLFxyXG4gICAgICAgICAgICAvLyBsaXN0ZW4gZm9yIGRyb3AgcmVsYXRlZCBldmVudHM6XHJcbiAgICAgICAgICAgIG9uZHJvcGFjdGl2YXRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBhY3RpdmUgZHJvcHpvbmUgZmVlZGJhY2tcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcm9wLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmRyYWdlbnRlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHJhZ2dhYmxlRWxlbWVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmVFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZlZWRiYWNrIHRoZSBwb3NzaWJpbGl0eSBvZiBhIGRyb3BcclxuICAgICAgICAgICAgICAgIGRyb3B6b25lRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcm9wLXRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYW4tZHJvcCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmRyYWdsZWF2ZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGRyb3AgZmVlZGJhY2sgc3R5bGVcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjYW4tZHJvcCcpO1xyXG4gICAgICAgICAgICAgICAgZW50ZXJlZERyb3B6b25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZHJvcDogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZW50ZXJlZERyb3B6b25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIG9mZnNldCgp5Ye95pWw55So5LqO6K6+572u5oiW6L+U5Zue5b2T5YmN5Yy56YWN5YWD57Sg55u45a+55LqO5b2T5YmN5paH5qGj55qE5YGP56e777yM5Lmf5bCx5piv55u45a+55LqO5b2T5YmN5paH5qGj55qE5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICAvLyDlhYPntKDlj6/ku6XmmK/ku7vmhI/lrprkvY3mlrnlvI/nmoTlhYPntKBcclxuICAgICAgICAgICAgICAgIC8vIOWNleeLrOiuvue9rmxlZnTmiJZ0b3Dlr7nkuo5hYnNvbHV0ZeWumuS9jeeahOWFg+e0oOadpeivtO+8jOaYr+ebuOWvueS6juacgOi/keeahOW3suWumuS9jeelluWFiOWFg+e0oOaIluebuOWvueS6juacgOWIneeahOWMheWQq+Wdl+OAglxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KS5vZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgICQoZXZlbnQucmVsYXRlZFRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJChldmVudC50YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vZmZzZXQob2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXggZGF0YS15Jyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZHJvcGRlYWN0aXZhdGU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFjdGl2ZSBkcm9wem9uZSBmZWVkYmFja1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC10YXJnZXQnKTtcclxuICAgICAgICAgICAgICAgIGlmICghZW50ZXJlZERyb3B6b25lICYmIGlzRHJvcHpvbmVQYXJlbnQoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLm9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZXZlbnQucmVsYXRlZFRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoJ2JvZHknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9mZnNldChvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAucmVzaXphYmxlKHtcclxuICAgICAgICAgICAgLy8gcmVzaXplIGZyb20gYWxsIGVkZ2VzIGFuZCBjb3JuZXJzXHJcbiAgICAgICAgICAgIGVkZ2VzOiB7IGxlZnQ6IHRydWUsIHJpZ2h0OiB0cnVlLCBib3R0b206IHRydWUsIHRvcDogdHJ1ZSB9LFxyXG5cclxuICAgICAgICAgICAgLy8ga2VlcCB0aGUgZWRnZXMgaW5zaWRlIHRoZSBwYXJlbnRcclxuICAgICAgICAgICAgcmVzdHJpY3RFZGdlczoge1xyXG4gICAgICAgICAgICAgICAgb3V0ZXI6ICdwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgZW5kT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIG1pbmltdW0gc2l6ZVxyXG4gICAgICAgICAgICByZXN0cmljdFNpemU6IHtcclxuICAgICAgICAgICAgICAgIG1pbjogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDUwIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbmVydGlhOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdyZXNpemVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICB4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZWxlbWVudCdzIHN0eWxlXHJcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS53aWR0aCA9IGV2ZW50LnJlY3Qud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gZXZlbnQucmVjdC5oZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHdoZW4gcmVzaXppbmcgZnJvbSB0b3Agb3IgbGVmdCBlZGdlc1xyXG4gICAgICAgICAgICB4ICs9IGV2ZW50LmRlbHRhUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICB5ICs9IGV2ZW50LmRlbHRhUmVjdC50b3A7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCcgKyB5ICsgJ3B4KSc7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCB4KTtcclxuICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgaW50ZXJhY3QoJ2JvZHkgKi5kcmFnZ2FibGUnKVxyXG4gICAgICAgIC5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAvLyBlbmFibGUgaW5lcnRpYWwgdGhyb3dpbmdcclxuICAgICAgICAgICAgaW5lcnRpYTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8ga2VlcCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGFyZWEgb2YgaXQncyBwYXJlbnRcclxuICAgICAgICAgICAgcmVzdHJpY3Q6IHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uOiBkb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICAgICAgZW5kT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRSZWN0OiB7IHRvcDogMCwgbGVmdDogMCwgYm90dG9tOiAxLCByaWdodDogMSB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSBhdXRvU2Nyb2xsXHJcbiAgICAgICAgICAgIGF1dG9TY3JvbGw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgZHJhZ21vdmUgZXZlbnRcclxuICAgICAgICAgICAgb25tb3ZlOiBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBbGlnbm1lbnRMaW5lcygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBrZWVwIHRoZSBkcmFnZ2VkIHBvc2l0aW9uIGluIHRoZSBkYXRhLXgvZGF0YS15IGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICAgICAgICB4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpIHx8IDApICsgZXZlbnQuZHgsXHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKSB8fCAwKSArIGV2ZW50LmR5O1xyXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUud2Via2l0VHJhbnNmb3JtID1cclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID1cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCknO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaWlvbiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCB4KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRyYXdBbGlnbm1lbnRMaW5lKHRhcmdldCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiBvbiBldmVyeSBkcmFnZW5kIGV2ZW50XHJcbiAgICAgICAgICAgIG9uZW5kOiByZW1vdmVBbGlnbm1lbnRMaW5lc1xyXG4gICAgICAgIH0pO1xyXG59KTsiLCJmdW5jdGlvbiBpc0FsaWduKHRhcmdldE9mZnNldCwgY3VycmVudE9mZnNldCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpc0hvcml6b250YWxBbGlnbjogTWF0aC5hYnModGFyZ2V0T2Zmc2V0LnRvcCAtIGN1cnJlbnRPZmZzZXQudG9wKSA8PSAwLjcsXHJcbiAgICAgICAgaXNWZXJ0aWNhbEFsaWduOiBNYXRoLmFicyh0YXJnZXRPZmZzZXQubGVmdCAtIGN1cnJlbnRPZmZzZXQubGVmdCkgPD0gMC43XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVBbGlnbm1lbnRMaW5lcygpIHtcclxuICAgICQoJy5ob3Jpem9udGFsLWxpbmUsIC52ZXJ0aWNhbC1saW5lJykucmVtb3ZlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdBbGlnbm1lbnRMaW5lKHRhcmdldCkge1xyXG4gICAgbGV0IGhvcml6b250YWxMaW5lRXhpc3RzID0gZmFsc2U7XHJcbiAgICBsZXQgdmVydGljYWxMaW5lRXhpc3RzID0gZmFsc2U7XHJcbiAgICBjb25zdCB0YXJnZXRPZmZzZXQgPSAkKHRhcmdldCkub2Zmc2V0KCk7XHJcbiAgICAvLyDmjpLpmaToh6rouqvlhYPntKDlkozor6XlhYPntKDlrZDlhYPntKBcclxuICAgIFsuLi4kKCdib2R5ICo6dmlzaWJsZTpub3Qoc2NyaXB0KScpXHJcbiAgICAgICAgLm5vdCh0YXJnZXQpXHJcbiAgICAgICAgLm5vdCgkKHRhcmdldCkuZmluZCgnKicpKV1cclxuICAgICAgICAuc29tZShjdXJyZW50VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50T2Zmc2V0ID0gJChjdXJyZW50VmFsdWUpLm9mZnNldCgpO1xyXG4gICAgICAgICAgICBjb25zdCB7IGlzSG9yaXpvbnRhbEFsaWduLCBpc1ZlcnRpY2FsQWxpZ24gfSA9IGlzQWxpZ24odGFyZ2V0T2Zmc2V0LCBjdXJyZW50T2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKCFob3Jpem9udGFsTGluZUV4aXN0cyAmJiBpc0hvcml6b250YWxBbGlnbikge1xyXG4gICAgICAgICAgICAgICAgJCgnPGhyIC8+JylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0T2Zmc2V0LnRvcFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsTGluZUV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF2ZXJ0aWNhbExpbmVFeGlzdHMgJiYgaXNWZXJ0aWNhbEFsaWduKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8aHIgLz4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygndmVydGljYWwtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldE9mZnNldC5sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsTGluZUV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhvcml6b250YWxMaW5lRXhpc3RzICYmIHZlcnRpY2FsTGluZUV4aXN0cztcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJyb3dLZXlNb3ZlKGtleSwgZWxlbWVudCkge1xyXG4gICAgcmVtb3ZlQWxpZ25tZW50TGluZXMoKTtcclxuXHJcbiAgICBsZXQgZHggPSAwLCBkeSA9IDA7XHJcbiAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgIGNhc2UgMzc6IC8vIGxlZnRcclxuICAgICAgICAgICAgZHggPSAtMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzODogLy8gdXBcclxuICAgICAgICAgICAgZHkgPSAtMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOTogLy8gcmlnaHRcclxuICAgICAgICAgICAgZHggPSAxO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQwOiAvLyBkb3duXHJcbiAgICAgICAgICAgIGR5ID0gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuOyAvLyBleGl0IHRoaXMgaGFuZGxlciBmb3Igb3RoZXIga2V5c1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGtlZXAgdGhlIGRyYWdnZWQgcG9zaXRpb24gaW4gdGhlIGRhdGEteC9kYXRhLXkgYXR0cmlidXRlc1xyXG4gICAgY29uc3QgeCA9IChwYXJzZUZsb2F0KGVsZW1lbnQuYXR0cignZGF0YS14JykpIHx8IDApICsgZHgsXHJcbiAgICAgICAgeSA9IChwYXJzZUZsb2F0KGVsZW1lbnQuYXR0cignZGF0YS15JykpIHx8IDApICsgZHk7XHJcblxyXG4gICAgZWxlbWVudC5jc3Moe1xyXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZXNcclxuICAgIGVsZW1lbnQuYXR0cignZGF0YS14JywgeCk7XHJcbiAgICBlbGVtZW50LmF0dHIoJ2RhdGEteScsIHkpO1xyXG5cclxuICAgIGRyYXdBbGlnbm1lbnRMaW5lKGVsZW1lbnQuZ2V0KDApKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVtb3ZlQWxpZ25tZW50TGluZXMsIGFycm93S2V5TW92ZSwgZHJhd0FsaWdubWVudExpbmUgfTsiLCIvKiBicm93c2VyIGVudHJ5IHBvaW50ICovXG5cbi8vIGluZXJ0aWFcbnJlcXVpcmUoJy4vaW5lcnRpYScpO1xuXG4vLyBtb2RpZmllcnNcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3NuYXAnKTtcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3Jlc3RyaWN0Jyk7XG5cbi8vIHBvaW50ZXJFdmVudHNcbnJlcXVpcmUoJy4vcG9pbnRlckV2ZW50cy9iYXNlJyk7XG5yZXF1aXJlKCcuL3BvaW50ZXJFdmVudHMvaG9sZFJlcGVhdCcpO1xucmVxdWlyZSgnLi9wb2ludGVyRXZlbnRzL2ludGVyYWN0YWJsZVRhcmdldHMnKTtcblxuLy8gYXV0b1N0YXJ0IGhvbGRcbnJlcXVpcmUoJy4vYXV0b1N0YXJ0L2hvbGQnKTtcblxuLy8gYWN0aW9uc1xucmVxdWlyZSgnLi9hY3Rpb25zL2dlc3R1cmUnKTtcbnJlcXVpcmUoJy4vYWN0aW9ucy9yZXNpemUnKTtcbnJlcXVpcmUoJy4vYWN0aW9ucy9kcmFnJyk7XG5yZXF1aXJlKCcuL2FjdGlvbnMvZHJvcCcpO1xuXG4vLyBsb2FkIHRoZXNlIG1vZGlmaWVycyBhZnRlciByZXNpemUgaXMgbG9hZGVkXG5yZXF1aXJlKCcuL21vZGlmaWVycy9zbmFwU2l6ZScpO1xucmVxdWlyZSgnLi9tb2RpZmllcnMvcmVzdHJpY3RFZGdlcycpO1xucmVxdWlyZSgnLi9tb2RpZmllcnMvcmVzdHJpY3RTaXplJyk7XG5cbi8vIGF1dG9TdGFydCBhY3Rpb25zXG5yZXF1aXJlKCcuL2F1dG9TdGFydC9nZXN0dXJlJyk7XG5yZXF1aXJlKCcuL2F1dG9TdGFydC9yZXNpemUnKTtcbnJlcXVpcmUoJy4vYXV0b1N0YXJ0L2RyYWcnKTtcblxuLy8gSW50ZXJhY3RhYmxlIHByZXZlbnREZWZhdWx0IHNldHRpbmdcbnJlcXVpcmUoJy4vaW50ZXJhY3RhYmxlUHJldmVudERlZmF1bHQuanMnKTtcblxuLy8gYXV0b1Njcm9sbFxucmVxdWlyZSgnLi9hdXRvU2Nyb2xsJyk7XG5cbi8vIGV4cG9ydCBpbnRlcmFjdFxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ludGVyYWN0Jyk7XG4iLCJjb25zdCBwb2ludGVyRXZlbnRzID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCBJbnRlcmFjdGFibGUgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBpcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvaXMnKTtcbmNvbnN0IHNjb3BlICAgICAgICAgPSByZXF1aXJlKCcuLi9zY29wZScpO1xuY29uc3QgZXh0ZW5kICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2V4dGVuZCcpO1xuY29uc3QgeyBtZXJnZSB9ICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2FycicpO1xuXG5wb2ludGVyRXZlbnRzLnNpZ25hbHMub24oJ2NvbGxlY3QtdGFyZ2V0cycsIGZ1bmN0aW9uICh7IHRhcmdldHMsIGVsZW1lbnQsIHR5cGUsIGV2ZW50VGFyZ2V0IH0pIHtcbiAgc2NvcGUuaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2goZWxlbWVudCwgaW50ZXJhY3RhYmxlID0+IHtcbiAgICBjb25zdCBldmVudGFibGUgPSBpbnRlcmFjdGFibGUuZXZlbnRzO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBldmVudGFibGUub3B0aW9ucztcblxuICAgIGlmIChldmVudGFibGVbdHlwZV1cbiAgICAgICYmIGlzLmVsZW1lbnQoZWxlbWVudClcbiAgICAgICYmIGludGVyYWN0YWJsZS50ZXN0SWdub3JlQWxsb3cob3B0aW9ucywgZWxlbWVudCwgZXZlbnRUYXJnZXQpKSB7XG5cbiAgICAgIHRhcmdldHMucHVzaCh7XG4gICAgICAgIGVsZW1lbnQsXG4gICAgICAgIGV2ZW50YWJsZSxcbiAgICAgICAgcHJvcHM6IHsgaW50ZXJhY3RhYmxlIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbkludGVyYWN0YWJsZS5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGFibGUgfSkge1xuICBpbnRlcmFjdGFibGUuZXZlbnRzLmdldFJlY3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiBpbnRlcmFjdGFibGUuZ2V0UmVjdChlbGVtZW50KTtcbiAgfTtcbn0pO1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscy5vbignc2V0JywgZnVuY3Rpb24gKHsgaW50ZXJhY3RhYmxlLCBvcHRpb25zIH0pIHtcbiAgZXh0ZW5kKGludGVyYWN0YWJsZS5ldmVudHMub3B0aW9ucywgcG9pbnRlckV2ZW50cy5kZWZhdWx0cyk7XG4gIGV4dGVuZChpbnRlcmFjdGFibGUuZXZlbnRzLm9wdGlvbnMsIG9wdGlvbnMpO1xufSk7XG5cbm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBwb2ludGVyRXZlbnRzLnR5cGVzKTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5wb2ludGVyRXZlbnRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgZXh0ZW5kKHRoaXMuZXZlbnRzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgX19iYWNrQ29tcGF0T3B0aW9uID0gSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5fYmFja0NvbXBhdE9wdGlvbjtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5fYmFja0NvbXBhdE9wdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25OYW1lLCBuZXdWYWx1ZSkge1xuICBjb25zdCByZXQgPSBfX2JhY2tDb21wYXRPcHRpb24uY2FsbCh0aGlzLCBvcHRpb25OYW1lLCBuZXdWYWx1ZSk7XG5cbiAgaWYgKHJldCA9PT0gdGhpcykge1xuICAgIHRoaXMuZXZlbnRzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ3BvaW50ZXJFdmVudHMnKTtcbiIsImNvbnN0IHBvaW50ZXJFdmVudHMgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuXG5wb2ludGVyRXZlbnRzLnNpZ25hbHMub24oJ25ldycsIG9uTmV3KTtcbnBvaW50ZXJFdmVudHMuc2lnbmFscy5vbignZmlyZWQnLCBvbkZpcmVkKTtcblxuZm9yIChjb25zdCBzaWduYWwgb2YgWydtb3ZlJywgJ3VwJywgJ2NhbmNlbCcsICdlbmRhbGwnXSkge1xuICBJbnRlcmFjdGlvbi5zaWduYWxzLm9uKHNpZ25hbCwgZW5kSG9sZFJlcGVhdCk7XG59XG5cbmZ1bmN0aW9uIG9uTmV3ICh7IHBvaW50ZXJFdmVudCB9KSB7XG4gIGlmIChwb2ludGVyRXZlbnQudHlwZSAhPT0gJ2hvbGQnKSB7IHJldHVybjsgfVxuXG4gIHBvaW50ZXJFdmVudC5jb3VudCA9IChwb2ludGVyRXZlbnQuY291bnQgfHwgMCkgKyAxO1xufVxuXG5mdW5jdGlvbiBvbkZpcmVkICh7IGludGVyYWN0aW9uLCBwb2ludGVyRXZlbnQsIGV2ZW50VGFyZ2V0LCB0YXJnZXRzIH0pIHtcbiAgaWYgKHBvaW50ZXJFdmVudC50eXBlICE9PSAnaG9sZCcgfHwgIXRhcmdldHMubGVuZ3RoKSB7IHJldHVybjsgfVxuXG4gIC8vIGdldCB0aGUgcmVwZWF0IGludGVydmFsIGZyb20gdGhlIGZpcnN0IGV2ZW50YWJsZVxuICBjb25zdCBpbnRlcnZhbCA9IHRhcmdldHNbMF0uZXZlbnRhYmxlLm9wdGlvbnMuaG9sZFJlcGVhdEludGVydmFsO1xuXG4gIC8vIGRvbid0IHJlcGVhdCBpZiB0aGUgaW50ZXJ2YWwgaXMgMCBvciBsZXNzXG4gIGlmIChpbnRlcnZhbCA8PSAwKSB7IHJldHVybjsgfVxuXG4gIC8vIHNldCBhIHRpbWVvdXQgdG8gZmlyZSB0aGUgaG9sZHJlcGVhdCBldmVudFxuICBpbnRlcmFjdGlvbi5ob2xkSW50ZXJ2YWxIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBwb2ludGVyRXZlbnRzLmZpcmUoe1xuICAgICAgaW50ZXJhY3Rpb24sXG4gICAgICBldmVudFRhcmdldCxcbiAgICAgIHR5cGU6ICdob2xkJyxcbiAgICAgIHBvaW50ZXI6IHBvaW50ZXJFdmVudCxcbiAgICAgIGV2ZW50OiBwb2ludGVyRXZlbnQsXG4gICAgfSk7XG4gIH0sIGludGVydmFsKTtcbn1cblxuZnVuY3Rpb24gZW5kSG9sZFJlcGVhdCAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIC8vIHNldCB0aGUgaW50ZXJhY3Rpb24ncyBob2xkU3RvcFRpbWUgcHJvcGVydHlcbiAgLy8gdG8gc3RvcCBmdXJ0aGVyIGhvbGRSZXBlYXQgZXZlbnRzXG4gIGlmIChpbnRlcmFjdGlvbi5ob2xkSW50ZXJ2YWxIYW5kbGUpIHtcbiAgICBjbGVhckludGVydmFsKGludGVyYWN0aW9uLmhvbGRJbnRlcnZhbEhhbmRsZSk7XG4gICAgaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlID0gbnVsbDtcbiAgfVxufVxuXG4vLyBkb24ndCByZXBlYXQgYnkgZGVmYXVsdFxucG9pbnRlckV2ZW50cy5kZWZhdWx0cy5ob2xkUmVwZWF0SW50ZXJ2YWwgPSAwO1xucG9pbnRlckV2ZW50cy50eXBlcy5wdXNoKCdob2xkcmVwZWF0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbk5ldyxcbiAgb25GaXJlZCxcbiAgZW5kSG9sZFJlcGVhdCxcbn07XG4iLCJjb25zdCBQb2ludGVyRXZlbnQgPSByZXF1aXJlKCcuL1BvaW50ZXJFdmVudCcpO1xuY29uc3QgSW50ZXJhY3Rpb24gID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IHV0aWxzICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBkZWZhdWx0cyAgICAgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuY29uc3Qgc2lnbmFscyAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG5jb25zdCBzaW1wbGVTaWduYWxzID0gWyAnZG93bicsICd1cCcsICdjYW5jZWwnIF07XG5jb25zdCBzaW1wbGVFdmVudHMgID0gWyAnZG93bicsICd1cCcsICdjYW5jZWwnIF07XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSB7XG4gIFBvaW50ZXJFdmVudCxcbiAgZmlyZSxcbiAgY29sbGVjdEV2ZW50VGFyZ2V0cyxcbiAgc2lnbmFscyxcbiAgZGVmYXVsdHM6IHtcbiAgICBob2xkRHVyYXRpb246IDYwMCxcbiAgICBpZ25vcmVGcm9tICA6IG51bGwsXG4gICAgYWxsb3dGcm9tICAgOiBudWxsLFxuICAgIG9yaWdpbiAgICAgIDogeyB4OiAwLCB5OiAwIH0sXG4gIH0sXG4gIHR5cGVzOiBbXG4gICAgJ2Rvd24nLFxuICAgICdtb3ZlJyxcbiAgICAndXAnLFxuICAgICdjYW5jZWwnLFxuICAgICd0YXAnLFxuICAgICdkb3VibGV0YXAnLFxuICAgICdob2xkJyxcbiAgXSxcbn07XG5cbmZ1bmN0aW9uIGZpcmUgKGFyZykge1xuICBjb25zdCB7XG4gICAgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCxcbiAgICB0eXBlID0gYXJnLnBvaW50ZXJFdmVudC50eXBlLFxuICAgIHRhcmdldHMgPSBjb2xsZWN0RXZlbnRUYXJnZXRzKGFyZyksXG4gICAgcG9pbnRlckV2ZW50ID0gbmV3IFBvaW50ZXJFdmVudCh0eXBlLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGludGVyYWN0aW9uKSxcbiAgfSA9IGFyZztcblxuICBjb25zdCBzaWduYWxBcmcgPSB7XG4gICAgaW50ZXJhY3Rpb24sXG4gICAgcG9pbnRlcixcbiAgICBldmVudCxcbiAgICBldmVudFRhcmdldCxcbiAgICB0YXJnZXRzLFxuICAgIHR5cGUsXG4gICAgcG9pbnRlckV2ZW50LFxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldHNbaV07XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGFyZ2V0LnByb3BzIHx8IHt9KSB7XG4gICAgICBwb2ludGVyRXZlbnRbcHJvcF0gPSB0YXJnZXQucHJvcHNbcHJvcF07XG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luID0gdXRpbHMuZ2V0T3JpZ2luWFkodGFyZ2V0LmV2ZW50YWJsZSwgdGFyZ2V0LmVsZW1lbnQpO1xuXG4gICAgcG9pbnRlckV2ZW50LnN1YnRyYWN0T3JpZ2luKG9yaWdpbik7XG4gICAgcG9pbnRlckV2ZW50LmV2ZW50YWJsZSA9IHRhcmdldC5ldmVudGFibGU7XG4gICAgcG9pbnRlckV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQuZWxlbWVudDtcblxuICAgIHRhcmdldC5ldmVudGFibGUuZmlyZShwb2ludGVyRXZlbnQpO1xuXG4gICAgcG9pbnRlckV2ZW50LmFkZE9yaWdpbihvcmlnaW4pO1xuXG4gICAgaWYgKHBvaW50ZXJFdmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgICAgfHwgKHBvaW50ZXJFdmVudC5wcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgICAgICAgICYmIChpICsgMSkgPCB0YXJnZXRzLmxlbmd0aCAmJiB0YXJnZXRzW2kgKyAxXS5lbGVtZW50ICE9PSBwb2ludGVyRXZlbnQuY3VycmVudFRhcmdldCkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNpZ25hbHMuZmlyZSgnZmlyZWQnLCBzaWduYWxBcmcpO1xuXG4gIGlmICh0eXBlID09PSAndGFwJykge1xuICAgIC8vIGlmIHBvaW50ZXJFdmVudCBzaG91bGQgbWFrZSBhIGRvdWJsZSB0YXAsIGNyZWF0ZSBhbmQgZmlyZSBhIGRvdWJsZXRhcFxuICAgIC8vIFBvaW50ZXJFdmVudCBhbmQgdXNlIHRoYXQgYXMgdGhlIHByZXZUYXBcbiAgICBjb25zdCBwcmV2VGFwID0gcG9pbnRlckV2ZW50LmRvdWJsZVxuICAgICAgPyBmaXJlKHtcbiAgICAgICAgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCxcbiAgICAgICAgdHlwZTogJ2RvdWJsZXRhcCcsXG4gICAgICB9KVxuICAgICAgOiBwb2ludGVyRXZlbnQ7XG5cbiAgICBpbnRlcmFjdGlvbi5wcmV2VGFwID0gcHJldlRhcDtcbiAgICBpbnRlcmFjdGlvbi50YXBUaW1lID0gcHJldlRhcC50aW1lU3RhbXA7XG4gIH1cblxuICByZXR1cm4gcG9pbnRlckV2ZW50O1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0RXZlbnRUYXJnZXRzICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIHR5cGUgfSkge1xuICBjb25zdCBwb2ludGVySW5kZXggPSBpbnRlcmFjdGlvbi5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgLy8gZG8gbm90IGZpcmUgYSB0YXAgZXZlbnQgaWYgdGhlIHBvaW50ZXIgd2FzIG1vdmVkIGJlZm9yZSBiZWluZyBsaWZ0ZWRcbiAgaWYgKHR5cGUgPT09ICd0YXAnICYmIChpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWRcbiAgICAgIC8vIG9yIGlmIHRoZSBwb2ludGVydXAgdGFyZ2V0IGlzIGRpZmZlcmVudCB0byB0aGUgcG9pbnRlcmRvd24gdGFyZ2V0XG4gICAgICB8fCAhKGludGVyYWN0aW9uLmRvd25UYXJnZXRzW3BvaW50ZXJJbmRleF0gJiYgaW50ZXJhY3Rpb24uZG93blRhcmdldHNbcG9pbnRlckluZGV4XSA9PT0gZXZlbnRUYXJnZXQpKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSB1dGlscy5nZXRQYXRoKGV2ZW50VGFyZ2V0KTtcbiAgY29uc3Qgc2lnbmFsQXJnID0ge1xuICAgIGludGVyYWN0aW9uLFxuICAgIHBvaW50ZXIsXG4gICAgZXZlbnQsXG4gICAgZXZlbnRUYXJnZXQsXG4gICAgdHlwZSxcbiAgICBwYXRoLFxuICAgIHRhcmdldHM6IFtdLFxuICAgIGVsZW1lbnQ6IG51bGwsXG4gIH07XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBhdGgpIHtcbiAgICBzaWduYWxBcmcuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2NvbGxlY3QtdGFyZ2V0cycsIHNpZ25hbEFyZyk7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ2hvbGQnKSB7XG4gICAgc2lnbmFsQXJnLnRhcmdldHMgPSBzaWduYWxBcmcudGFyZ2V0cy5maWx0ZXIodGFyZ2V0ID0+XG4gICAgICB0YXJnZXQuZXZlbnRhYmxlLm9wdGlvbnMuaG9sZER1cmF0aW9uID09PSBpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0uZHVyYXRpb24pO1xuICB9XG5cbiAgcmV0dXJuIHNpZ25hbEFyZy50YXJnZXRzO1xufVxuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCd1cGRhdGUtcG9pbnRlci1kb3duJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXJJbmRleCB9KSB7XG4gIGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XSA9IHsgZHVyYXRpb246IEluZmluaXR5LCB0aW1lb3V0OiBudWxsIH07XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbigncmVtb3ZlLXBvaW50ZXInLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlckluZGV4IH0pIHtcbiAgaW50ZXJhY3Rpb24uaG9sZFRpbWVycy5zcGxpY2UocG9pbnRlckluZGV4LCAxKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgZHVwbGljYXRlTW92ZSB9KSB7XG4gIGNvbnN0IHBvaW50ZXJJbmRleCA9IGludGVyYWN0aW9uLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICBpZiAoIWR1cGxpY2F0ZU1vdmUgJiYgKCFpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duIHx8IGludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCkpIHtcbiAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93bikge1xuICAgICAgY2xlYXJUaW1lb3V0KGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XS50aW1lb3V0KTtcbiAgICB9XG5cbiAgICBmaXJlKHtcbiAgICAgIGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsXG4gICAgICB0eXBlOiAnbW92ZScsXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdkb3duJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgcG9pbnRlckluZGV4IH0pIHtcbiAgY29uc3QgdGltZXIgPSBpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF07XG4gIGNvbnN0IHBhdGggPSB1dGlscy5nZXRQYXRoKGV2ZW50VGFyZ2V0KTtcbiAgY29uc3Qgc2lnbmFsQXJnID0ge1xuICAgIGludGVyYWN0aW9uLFxuICAgIHBvaW50ZXIsXG4gICAgZXZlbnQsXG4gICAgZXZlbnRUYXJnZXQsXG4gICAgdHlwZTogJ2hvbGQnLFxuICAgIHRhcmdldHM6IFtdLFxuICAgIHBhdGgsXG4gICAgZWxlbWVudDogbnVsbCxcbiAgfTtcblxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcGF0aCkge1xuICAgIHNpZ25hbEFyZy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIHNpZ25hbHMuZmlyZSgnY29sbGVjdC10YXJnZXRzJywgc2lnbmFsQXJnKTtcbiAgfVxuXG4gIGlmICghc2lnbmFsQXJnLnRhcmdldHMubGVuZ3RoKSB7IHJldHVybjsgfVxuXG4gIGxldCBtaW5EdXJhdGlvbiA9IEluZmluaXR5O1xuXG4gIGZvciAoY29uc3QgdGFyZ2V0IG9mIHNpZ25hbEFyZy50YXJnZXRzKSB7XG4gICAgY29uc3QgaG9sZER1cmF0aW9uID0gdGFyZ2V0LmV2ZW50YWJsZS5vcHRpb25zLmhvbGREdXJhdGlvbjtcblxuICAgIGlmIChob2xkRHVyYXRpb24gPCBtaW5EdXJhdGlvbikge1xuICAgICAgbWluRHVyYXRpb24gPSBob2xkRHVyYXRpb247XG4gICAgfVxuICB9XG5cbiAgdGltZXIuZHVyYXRpb24gPSBtaW5EdXJhdGlvbjtcbiAgdGltZXIudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGZpcmUoe1xuICAgICAgaW50ZXJhY3Rpb24sXG4gICAgICBldmVudFRhcmdldCxcbiAgICAgIHBvaW50ZXIsXG4gICAgICBldmVudCxcbiAgICAgIHR5cGU6ICdob2xkJyxcbiAgICB9KTtcbiAgfSwgbWluRHVyYXRpb24pO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3VwJywgKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCB9KSA9PiB7XG4gIGlmICghaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkKSB7XG4gICAgZmlyZSh7IGludGVyYWN0aW9uLCBldmVudFRhcmdldCwgcG9pbnRlciwgZXZlbnQsIHR5cGU6ICd0YXAnIH0pO1xuICB9XG59KTtcblxuZm9yIChjb25zdCBzaWduYWxOYW1lIG9mIFsndXAnLCAnY2FuY2VsJ10pIHtcbiAgSW50ZXJhY3Rpb24uc2lnbmFscy5vbihzaWduYWxOYW1lLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlckluZGV4IH0pIHtcbiAgICBpZiAoaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdKSB7XG4gICAgICBjbGVhclRpbWVvdXQoaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdLnRpbWVvdXQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNpZ25hbExpc3RlbmVyICh0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0IH0pIHtcbiAgICBmaXJlKHsgaW50ZXJhY3Rpb24sIGV2ZW50VGFyZ2V0LCBwb2ludGVyLCBldmVudCwgdHlwZSB9KTtcbiAgfTtcbn1cblxuZm9yIChsZXQgaSA9IDA7IGkgPCBzaW1wbGVTaWduYWxzLmxlbmd0aDsgaSsrKSB7XG4gIEludGVyYWN0aW9uLnNpZ25hbHMub24oc2ltcGxlU2lnbmFsc1tpXSwgY3JlYXRlU2lnbmFsTGlzdGVuZXIoc2ltcGxlRXZlbnRzW2ldKSk7XG59XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5wcmV2VGFwICAgID0gbnVsbDsgIC8vIHRoZSBtb3N0IHJlY2VudCB0YXAgZXZlbnQgb24gdGhpcyBpbnRlcmFjdGlvblxuICBpbnRlcmFjdGlvbi50YXBUaW1lICAgID0gMDsgICAgIC8vIHRpbWUgb2YgdGhlIG1vc3QgcmVjZW50IHRhcCBldmVudFxuICBpbnRlcmFjdGlvbi5ob2xkVGltZXJzID0gW107ICAgIC8vIFt7IGR1cmF0aW9uLCB0aW1lb3V0IH1dXG59KTtcblxuZGVmYXVsdHMucG9pbnRlckV2ZW50cyA9IHBvaW50ZXJFdmVudHMuZGVmYXVsdHM7XG5tb2R1bGUuZXhwb3J0cyA9IHBvaW50ZXJFdmVudHM7XG4iLCJjb25zdCBwb2ludGVyVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9wb2ludGVyVXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQb2ludGVyRXZlbnQge1xuICAvKiogKi9cbiAgY29uc3RydWN0b3IgKHR5cGUsIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgaW50ZXJhY3Rpb24pIHtcbiAgICBwb2ludGVyVXRpbHMucG9pbnRlckV4dGVuZCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoZXZlbnQgIT09IHBvaW50ZXIpIHtcbiAgICAgIHBvaW50ZXJVdGlscy5wb2ludGVyRXh0ZW5kKHRoaXMsIHBvaW50ZXIpO1xuICAgIH1cblxuICAgIHRoaXMuaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcblxuICAgIHRoaXMudGltZVN0YW1wICAgICA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICAgIHRoaXMudHlwZSAgICAgICAgICA9IHR5cGU7XG4gICAgdGhpcy5wb2ludGVySWQgICAgID0gcG9pbnRlclV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKTtcbiAgICB0aGlzLnBvaW50ZXJUeXBlICAgPSBwb2ludGVyVXRpbHMuZ2V0UG9pbnRlclR5cGUocG9pbnRlcik7XG4gICAgdGhpcy50YXJnZXQgICAgICAgID0gZXZlbnRUYXJnZXQ7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcblxuICAgIGlmICh0eXBlID09PSAndGFwJykge1xuICAgICAgY29uc3QgcG9pbnRlckluZGV4ID0gaW50ZXJhY3Rpb24uZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuICAgICAgdGhpcy5kdCA9IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24uZG93blRpbWVzW3BvaW50ZXJJbmRleF07XG5cbiAgICAgIGNvbnN0IGludGVydmFsID0gdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi50YXBUaW1lO1xuXG4gICAgICB0aGlzLmRvdWJsZSA9ICEhKGludGVyYWN0aW9uLnByZXZUYXBcbiAgICAgICAgJiYgaW50ZXJhY3Rpb24ucHJldlRhcC50eXBlICE9PSAnZG91YmxldGFwJ1xuICAgICAgICAmJiBpbnRlcmFjdGlvbi5wcmV2VGFwLnRhcmdldCA9PT0gdGhpcy50YXJnZXRcbiAgICAgICAgJiYgaW50ZXJ2YWwgPCA1MDApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnZG91YmxldGFwJykge1xuICAgICAgdGhpcy5kdCA9IHBvaW50ZXIudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24udGFwVGltZTtcbiAgICB9XG4gIH1cblxuICBzdWJ0cmFjdE9yaWdpbiAoeyB4OiBvcmlnaW5YLCB5OiBvcmlnaW5ZIH0pIHtcbiAgICB0aGlzLnBhZ2VYICAgLT0gb3JpZ2luWDtcbiAgICB0aGlzLnBhZ2VZICAgLT0gb3JpZ2luWTtcbiAgICB0aGlzLmNsaWVudFggLT0gb3JpZ2luWDtcbiAgICB0aGlzLmNsaWVudFkgLT0gb3JpZ2luWTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkT3JpZ2luICh7IHg6IG9yaWdpblgsIHk6IG9yaWdpblkgfSkge1xuICAgIHRoaXMucGFnZVggICArPSBvcmlnaW5YO1xuICAgIHRoaXMucGFnZVkgICArPSBvcmlnaW5ZO1xuICAgIHRoaXMuY2xpZW50WCArPSBvcmlnaW5YO1xuICAgIHRoaXMuY2xpZW50WSArPSBvcmlnaW5ZO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogKi9cbiAgcHJldmVudERlZmF1bHQgKCkge1xuICAgIHRoaXMub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqICovXG4gIHN0b3BQcm9wYWdhdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqICovXG4gIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH1cbn07XG4iLCIvLyBUaGlzIG1vZHVsZSBhbGxvd3Mgc25hcHBpbmcgb2YgdGhlIHNpemUgb2YgdGFyZ2V0cyBkdXJpbmcgcmVzaXplXG4vLyBpbnRlcmFjdGlvbnMuXG5cbmNvbnN0IG1vZGlmaWVycyAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCBzbmFwICAgICAgICAgICA9IHJlcXVpcmUoJy4vc25hcCcpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuY29uc3QgcmVzaXplICAgICAgICAgPSByZXF1aXJlKCcuLi9hY3Rpb25zL3Jlc2l6ZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy8nKTtcblxuY29uc3Qgc25hcFNpemUgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgcmFuZ2UgIDogSW5maW5pdHksXG4gICAgdGFyZ2V0czogbnVsbCxcbiAgICBvZmZzZXRzOiBudWxsLFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IHsgaW50ZXJhY3Rpb24sIG9wdGlvbnMgfSA9IGFyZztcbiAgICBjb25zdCBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuXG4gICAgaWYgKCFlZGdlcykgeyByZXR1cm47IH1cblxuICAgIGFyZy5vcHRpb25zID0ge1xuICAgICAgcmVsYXRpdmVQb2ludHM6IFt7XG4gICAgICAgIHg6IGVkZ2VzLmxlZnQ/IDAgOiAxLFxuICAgICAgICB5OiBlZGdlcy50b3AgPyAwIDogMSxcbiAgICAgIH1dLFxuICAgICAgb3JpZ2luOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG9mZnNldDogJ3NlbGYnLFxuICAgICAgcmFuZ2U6IG9wdGlvbnMucmFuZ2UsXG4gICAgfTtcblxuICAgIGNvbnN0IG9mZnNldHMgPSBzbmFwLnNldE9mZnNldChhcmcpO1xuICAgIGFyZy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHJldHVybiBvZmZzZXRzO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IHsgaW50ZXJhY3Rpb24sIG9wdGlvbnMsIG9mZnNldCwgbW9kaWZpZWRDb29yZHMgfSA9IGFyZztcbiAgICBjb25zdCBwYWdlID0gdXRpbHMuZXh0ZW5kKHt9LCBtb2RpZmllZENvb3Jkcyk7XG4gICAgY29uc3QgcmVsYXRpdmVYID0gcGFnZS54IC0gb2Zmc2V0WzBdLng7XG4gICAgY29uc3QgcmVsYXRpdmVZID0gcGFnZS55IC0gb2Zmc2V0WzBdLnk7XG5cbiAgICBhcmcub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgYXJnLm9wdGlvbnMudGFyZ2V0cyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBzbmFwVGFyZ2V0IG9mIChvcHRpb25zLnRhcmdldHMgfHwgW10pKSB7XG4gICAgICBsZXQgdGFyZ2V0O1xuXG4gICAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24oc25hcFRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldChyZWxhdGl2ZVgsIHJlbGF0aXZlWSwgaW50ZXJhY3Rpb24pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGFyZ2V0KSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmICgnd2lkdGgnIGluIHRhcmdldCAmJiAnaGVpZ2h0JyBpbiB0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0LnggPSB0YXJnZXQud2lkdGg7XG4gICAgICAgIHRhcmdldC55ID0gdGFyZ2V0LmhlaWdodDtcbiAgICAgIH1cblxuICAgICAgYXJnLm9wdGlvbnMudGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgfVxuXG4gICAgc25hcC5zZXQoYXJnKTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IGFyZztcblxuICAgIGFyZy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICBhcmcub3B0aW9ucy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkO1xuICAgIGFyZy5vcHRpb25zLnJlbGF0aXZlUG9pbnRzID0gW251bGxdO1xuXG4gICAgc25hcC5tb2RpZnlDb29yZHMoYXJnKTtcbiAgfSxcbn07XG5cbm1vZGlmaWVycy5zbmFwU2l6ZSA9IHNuYXBTaXplO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3NuYXBTaXplJyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5zbmFwU2l6ZSA9IHNuYXBTaXplLmRlZmF1bHRzO1xucmVzaXplLmRlZmF1bHRzLnNuYXBTaXplICAgICAgICAgID0gc25hcFNpemUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gc25hcFNpemU7XG4iLCJjb25zdCBtb2RpZmllcnMgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgaW50ZXJhY3QgICAgICAgPSByZXF1aXJlKCcuLi9pbnRlcmFjdCcpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG5jb25zdCBzbmFwID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVuZE9ubHk6IGZhbHNlLFxuICAgIHJhbmdlICA6IEluZmluaXR5LFxuICAgIHRhcmdldHM6IG51bGwsXG4gICAgb2Zmc2V0czogbnVsbCxcblxuICAgIHJlbGF0aXZlUG9pbnRzOiBudWxsLFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCwgcmVjdCwgc3RhcnRPZmZzZXQsIG9wdGlvbnMgfSkge1xuICAgIGNvbnN0IG9mZnNldHMgPSBbXTtcbiAgICBjb25zdCBvcHRpb25zT3JpZ2luID0gdXRpbHMucmVjdFRvWFkodXRpbHMucmVzb2x2ZVJlY3RMaWtlKG9wdGlvbnMub3JpZ2luKSk7XG4gICAgY29uc3Qgb3JpZ2luID0gb3B0aW9uc09yaWdpbiB8fCB1dGlscy5nZXRPcmlnaW5YWShpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IGludGVyYWN0YWJsZS5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLnNuYXAgfHwge307XG5cbiAgICBsZXQgc25hcE9mZnNldDtcblxuICAgIGlmIChvcHRpb25zLm9mZnNldCA9PT0gJ3N0YXJ0Q29vcmRzJykge1xuICAgICAgc25hcE9mZnNldCA9IHtcbiAgICAgICAgeDogaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS54IC0gb3JpZ2luLngsXG4gICAgICAgIHk6IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueSAtIG9yaWdpbi55LFxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSAge1xuICAgICAgY29uc3Qgb2Zmc2V0UmVjdCA9IHV0aWxzLnJlc29sdmVSZWN0TGlrZShvcHRpb25zLm9mZnNldCwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBbaW50ZXJhY3Rpb25dKTtcblxuICAgICAgc25hcE9mZnNldCA9IHV0aWxzLnJlY3RUb1hZKG9mZnNldFJlY3QpIHx8IHsgeDogMCwgeTogMCB9O1xuICAgIH1cblxuICAgIGlmIChyZWN0ICYmIG9wdGlvbnMucmVsYXRpdmVQb2ludHMgJiYgb3B0aW9ucy5yZWxhdGl2ZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgeyB4OiByZWxhdGl2ZVgsIHk6IHJlbGF0aXZlWSB9IG9mIG9wdGlvbnMucmVsYXRpdmVQb2ludHMpIHtcbiAgICAgICAgb2Zmc2V0cy5wdXNoKHtcbiAgICAgICAgICB4OiBzdGFydE9mZnNldC5sZWZ0IC0gKHJlY3Qud2lkdGggICogcmVsYXRpdmVYKSArIHNuYXBPZmZzZXQueCxcbiAgICAgICAgICB5OiBzdGFydE9mZnNldC50b3AgIC0gKHJlY3QuaGVpZ2h0ICogcmVsYXRpdmVZKSArIHNuYXBPZmZzZXQueSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgb2Zmc2V0cy5wdXNoKHNuYXBPZmZzZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRzO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIG1vZGlmaWVkQ29vcmRzLCBzdGF0dXMsIG9wdGlvbnMsIG9mZnNldDogb2Zmc2V0cyB9KSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICAgIGxldCB0YXJnZXQ7XG4gICAgbGV0IHBhZ2U7XG4gICAgbGV0IGk7XG5cbiAgICBpZiAoc3RhdHVzLnVzZVN0YXR1c1hZKSB7XG4gICAgICBwYWdlID0geyB4OiBzdGF0dXMueCwgeTogc3RhdHVzLnkgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBvcmlnaW4gPSB1dGlscy5nZXRPcmlnaW5YWShpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpO1xuXG4gICAgICBwYWdlID0gdXRpbHMuZXh0ZW5kKHt9LCBtb2RpZmllZENvb3Jkcyk7XG5cbiAgICAgIHBhZ2UueCAtPSBvcmlnaW4ueDtcbiAgICAgIHBhZ2UueSAtPSBvcmlnaW4ueTtcbiAgICB9XG5cbiAgICBzdGF0dXMucmVhbFggPSBwYWdlLng7XG4gICAgc3RhdHVzLnJlYWxZID0gcGFnZS55O1xuXG4gICAgbGV0IGxlbiA9IG9wdGlvbnMudGFyZ2V0cz8gb3B0aW9ucy50YXJnZXRzLmxlbmd0aCA6IDA7XG5cbiAgICBmb3IgKGNvbnN0IHsgeDogb2Zmc2V0WCwgeTogb2Zmc2V0WSB9IG9mIG9mZnNldHMpIHtcbiAgICAgIGNvbnN0IHJlbGF0aXZlWCA9IHBhZ2UueCAtIG9mZnNldFg7XG4gICAgICBjb25zdCByZWxhdGl2ZVkgPSBwYWdlLnkgLSBvZmZzZXRZO1xuXG4gICAgICBmb3IgKGNvbnN0IHNuYXBUYXJnZXQgb2YgKG9wdGlvbnMudGFyZ2V0cyB8fCBbXSkpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKHNuYXBUYXJnZXQpKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldChyZWxhdGl2ZVgsIHJlbGF0aXZlWSwgaW50ZXJhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRhcmdldCkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgIHRhcmdldHMucHVzaCh7XG4gICAgICAgICAgeDogdXRpbHMuaXMubnVtYmVyKHRhcmdldC54KSA/ICh0YXJnZXQueCArIG9mZnNldFgpIDogcmVsYXRpdmVYLFxuICAgICAgICAgIHk6IHV0aWxzLmlzLm51bWJlcih0YXJnZXQueSkgPyAodGFyZ2V0LnkgKyBvZmZzZXRZKSA6IHJlbGF0aXZlWSxcblxuICAgICAgICAgIHJhbmdlOiB1dGlscy5pcy5udW1iZXIodGFyZ2V0LnJhbmdlKT8gdGFyZ2V0LnJhbmdlOiBvcHRpb25zLnJhbmdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZXN0ID0ge1xuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgaW5SYW5nZTogZmFsc2UsXG4gICAgICBkaXN0YW5jZTogMCxcbiAgICAgIHJhbmdlOiAwLFxuICAgICAgZHg6IDAsXG4gICAgICBkeTogMCxcbiAgICB9O1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gdGFyZ2V0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcblxuICAgICAgY29uc3QgcmFuZ2UgPSB0YXJnZXQucmFuZ2U7XG4gICAgICBjb25zdCBkeCA9IHRhcmdldC54IC0gcGFnZS54O1xuICAgICAgY29uc3QgZHkgPSB0YXJnZXQueSAtIHBhZ2UueTtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdXRpbHMuaHlwb3QoZHgsIGR5KTtcbiAgICAgIGxldCBpblJhbmdlID0gZGlzdGFuY2UgPD0gcmFuZ2U7XG5cbiAgICAgIC8vIEluZmluaXRlIHRhcmdldHMgY291bnQgYXMgYmVpbmcgb3V0IG9mIHJhbmdlXG4gICAgICAvLyBjb21wYXJlZCB0byBub24gaW5maW5pdGUgb25lcyB0aGF0IGFyZSBpbiByYW5nZVxuICAgICAgaWYgKHJhbmdlID09PSBJbmZpbml0eSAmJiBjbG9zZXN0LmluUmFuZ2UgJiYgY2xvc2VzdC5yYW5nZSAhPT0gSW5maW5pdHkpIHtcbiAgICAgICAgaW5SYW5nZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNsb3Nlc3QudGFyZ2V0IHx8IChpblJhbmdlXG4gICAgICAgICAgLy8gaXMgdGhlIGNsb3Nlc3QgdGFyZ2V0IGluIHJhbmdlP1xuICAgICAgICAgID8gKGNsb3Nlc3QuaW5SYW5nZSAmJiByYW5nZSAhPT0gSW5maW5pdHlcbiAgICAgICAgICAvLyB0aGUgcG9pbnRlciBpcyByZWxhdGl2ZWx5IGRlZXBlciBpbiB0aGlzIHRhcmdldFxuICAgICAgICAgID8gZGlzdGFuY2UgLyByYW5nZSA8IGNsb3Nlc3QuZGlzdGFuY2UgLyBjbG9zZXN0LnJhbmdlXG4gICAgICAgICAgLy8gdGhpcyB0YXJnZXQgaGFzIEluZmluaXRlIHJhbmdlIGFuZCB0aGUgY2xvc2VzdCBkb2Vzbid0XG4gICAgICAgICAgOiAocmFuZ2UgPT09IEluZmluaXR5ICYmIGNsb3Nlc3QucmFuZ2UgIT09IEluZmluaXR5KVxuICAgICAgICAgIC8vIE9SIHRoaXMgdGFyZ2V0IGlzIGNsb3NlciB0aGF0IHRoZSBwcmV2aW91cyBjbG9zZXN0XG4gICAgICAgIHx8IGRpc3RhbmNlIDwgY2xvc2VzdC5kaXN0YW5jZSlcbiAgICAgICAgICAvLyBUaGUgb3RoZXIgaXMgbm90IGluIHJhbmdlIGFuZCB0aGUgcG9pbnRlciBpcyBjbG9zZXIgdG8gdGhpcyB0YXJnZXRcbiAgICAgICAgICA6ICghY2xvc2VzdC5pblJhbmdlICYmIGRpc3RhbmNlIDwgY2xvc2VzdC5kaXN0YW5jZSkpKSB7XG5cbiAgICAgICAgY2xvc2VzdC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIGNsb3Nlc3QuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgY2xvc2VzdC5yYW5nZSA9IHJhbmdlO1xuICAgICAgICBjbG9zZXN0LmluUmFuZ2UgPSBpblJhbmdlO1xuICAgICAgICBjbG9zZXN0LmR4ID0gZHg7XG4gICAgICAgIGNsb3Nlc3QuZHkgPSBkeTtcblxuICAgICAgICBzdGF0dXMucmFuZ2UgPSByYW5nZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc25hcENoYW5nZWQ7XG5cbiAgICBpZiAoY2xvc2VzdC50YXJnZXQpIHtcbiAgICAgIHNuYXBDaGFuZ2VkID0gKHN0YXR1cy5tb2RpZmllZFggIT09IGNsb3Nlc3QudGFyZ2V0LnggfHwgc3RhdHVzLm1vZGlmaWVkWSAhPT0gY2xvc2VzdC50YXJnZXQueSk7XG5cbiAgICAgIHN0YXR1cy5tb2RpZmllZFggPSBjbG9zZXN0LnRhcmdldC54O1xuICAgICAgc3RhdHVzLm1vZGlmaWVkWSA9IGNsb3Nlc3QudGFyZ2V0Lnk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc25hcENoYW5nZWQgPSB0cnVlO1xuXG4gICAgICBzdGF0dXMubW9kaWZpZWRYID0gTmFOO1xuICAgICAgc3RhdHVzLm1vZGlmaWVkWSA9IE5hTjtcbiAgICB9XG5cbiAgICBzdGF0dXMuZHggPSBjbG9zZXN0LmR4O1xuICAgIHN0YXR1cy5keSA9IGNsb3Nlc3QuZHk7XG5cbiAgICBzdGF0dXMuY2hhbmdlZCA9IChzbmFwQ2hhbmdlZCB8fCAoY2xvc2VzdC5pblJhbmdlICYmICFzdGF0dXMubG9ja2VkKSk7XG4gICAgc3RhdHVzLmxvY2tlZCA9IGNsb3Nlc3QuaW5SYW5nZTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IGZ1bmN0aW9uICh7IHBhZ2UsIGNsaWVudCwgc3RhdHVzLCBwaGFzZSwgb3B0aW9ucyB9KSB7XG4gICAgY29uc3QgcmVsYXRpdmVQb2ludHMgPSBvcHRpb25zICYmIG9wdGlvbnMucmVsYXRpdmVQb2ludHM7XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWRcbiAgICAgICAgJiYgIShwaGFzZSA9PT0gJ3N0YXJ0JyAmJiByZWxhdGl2ZVBvaW50cyAmJiByZWxhdGl2ZVBvaW50cy5sZW5ndGgpKSB7XG5cbiAgICAgIGlmIChzdGF0dXMubG9ja2VkKSB7XG4gICAgICAgIHBhZ2UueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIHBhZ2UueSArPSBzdGF0dXMuZHk7XG4gICAgICAgIGNsaWVudC54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgY2xpZW50LnkgKz0gc3RhdHVzLmR5O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByYW5nZSAgOiBzdGF0dXMucmFuZ2UsXG4gICAgICAgIGxvY2tlZCA6IHN0YXR1cy5sb2NrZWQsXG4gICAgICAgIHggICAgICA6IHN0YXR1cy5tb2RpZmllZFgsXG4gICAgICAgIHkgICAgICA6IHN0YXR1cy5tb2RpZmllZFksXG4gICAgICAgIHJlYWxYICA6IHN0YXR1cy5yZWFsWCxcbiAgICAgICAgcmVhbFkgIDogc3RhdHVzLnJlYWxZLFxuICAgICAgICBkeCAgICAgOiBzdGF0dXMuZHgsXG4gICAgICAgIGR5ICAgICA6IHN0YXR1cy5keSxcbiAgICAgIH07XG4gICAgfVxuICB9LFxufTtcblxuaW50ZXJhY3QuY3JlYXRlU25hcEdyaWQgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICBjb25zdCBsaW1pdHMgPSBncmlkLmxpbWl0cyB8fCB7XG4gICAgICBsZWZ0ICA6IC1JbmZpbml0eSxcbiAgICAgIHJpZ2h0IDogIEluZmluaXR5LFxuICAgICAgdG9wICAgOiAtSW5maW5pdHksXG4gICAgICBib3R0b206ICBJbmZpbml0eSxcbiAgICB9O1xuICAgIGxldCBvZmZzZXRYID0gMDtcbiAgICBsZXQgb2Zmc2V0WSA9IDA7XG5cbiAgICBpZiAodXRpbHMuaXMub2JqZWN0KGdyaWQub2Zmc2V0KSkge1xuICAgICAgb2Zmc2V0WCA9IGdyaWQub2Zmc2V0Lng7XG4gICAgICBvZmZzZXRZID0gZ3JpZC5vZmZzZXQueTtcbiAgICB9XG5cbiAgICBjb25zdCBncmlkeCA9IE1hdGgucm91bmQoKHggLSBvZmZzZXRYKSAvIGdyaWQueCk7XG4gICAgY29uc3QgZ3JpZHkgPSBNYXRoLnJvdW5kKCh5IC0gb2Zmc2V0WSkgLyBncmlkLnkpO1xuXG4gICAgY29uc3QgbmV3WCA9IE1hdGgubWF4KGxpbWl0cy5sZWZ0LCBNYXRoLm1pbihsaW1pdHMucmlnaHQgLCBncmlkeCAqIGdyaWQueCArIG9mZnNldFgpKTtcbiAgICBjb25zdCBuZXdZID0gTWF0aC5tYXgobGltaXRzLnRvcCAsIE1hdGgubWluKGxpbWl0cy5ib3R0b20sIGdyaWR5ICogZ3JpZC55ICsgb2Zmc2V0WSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IG5ld1gsXG4gICAgICB5OiBuZXdZLFxuICAgICAgcmFuZ2U6IGdyaWQucmFuZ2UsXG4gICAgfTtcbiAgfTtcbn07XG5cbm1vZGlmaWVycy5zbmFwID0gc25hcDtcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdzbmFwJyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5zbmFwID0gc25hcC5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBzbmFwO1xuIiwiLy8gVGhpcyBtb2R1bGUgYWRkcyB0aGUgb3B0aW9ucy5yZXNpemUucmVzdHJpY3RTaXplIHNldHRpbmcgd2hpY2ggc2V0cyBtaW4gYW5kXG4vLyBtYXggd2lkdGggYW5kIGhlaWdodCBmb3IgdGhlIHRhcmdldCBiZWluZyByZXNpemVkLlxuLy9cbi8vIGludGVyYWN0KHRhcmdldCkucmVzaXplKHtcbi8vICAgZWRnZXM6IHsgdG9wOiB0cnVlLCBsZWZ0OiB0cnVlIH0sXG4vLyAgIHJlc3RyaWN0U2l6ZToge1xuLy8gICAgIG1pbjogeyB3aWR0aDogLTYwMCwgaGVpZ2h0OiAtNjAwIH0sXG4vLyAgICAgbWF4OiB7IHdpZHRoOiAgNjAwLCBoZWlnaHQ6ICA2MDAgfSxcbi8vICAgfSxcbi8vIH0pO1xuXG5jb25zdCBtb2RpZmllcnMgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgcmVzdHJpY3RFZGdlcyAgPSByZXF1aXJlKCcuL3Jlc3RyaWN0RWRnZXMnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IHJlY3RVdGlscyAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvcmVjdCcpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuY29uc3QgcmVzaXplICAgICAgICAgPSByZXF1aXJlKCcuLi9hY3Rpb25zL3Jlc2l6ZScpO1xuXG5jb25zdCBub01pbiA9IHsgd2lkdGg6IC1JbmZpbml0eSwgaGVpZ2h0OiAtSW5maW5pdHkgfTtcbmNvbnN0IG5vTWF4ID0geyB3aWR0aDogK0luZmluaXR5LCBoZWlnaHQ6ICtJbmZpbml0eSB9O1xuXG5jb25zdCByZXN0cmljdFNpemUgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgbWluOiBudWxsLFxuICAgIG1heDogbnVsbCxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgICByZXR1cm4gaW50ZXJhY3Rpb24uc3RhcnRPZmZzZXQ7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgY29uc3QgeyBpbnRlcmFjdGlvbiwgb3B0aW9ucyB9ID0gYXJnO1xuICAgIGNvbnN0IGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubGlua2VkRWRnZXMgfHwgaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgfHwgIWVkZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVjdCA9IHJlY3RVdGlscy54eXdoVG9UbGJyKGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmludmVydGVkKTtcblxuICAgIGNvbnN0IG1pblNpemUgPSByZWN0VXRpbHMudGxiclRvWHl3aChyZXN0cmljdEVkZ2VzLmdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLm1pbiwgaW50ZXJhY3Rpb24pKSB8fCBub01pbjtcbiAgICBjb25zdCBtYXhTaXplID0gcmVjdFV0aWxzLnRsYnJUb1h5d2gocmVzdHJpY3RFZGdlcy5nZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5tYXgsIGludGVyYWN0aW9uKSkgfHwgbm9NYXg7XG5cbiAgICBhcmcub3B0aW9ucyA9IHtcbiAgICAgIGVuYWJsZWQ6IG9wdGlvbnMuZW5hYmxlZCxcbiAgICAgIGVuZE9ubHk6IG9wdGlvbnMuZW5kT25seSxcbiAgICAgIGlubmVyOiB1dGlscy5leHRlbmQoe30sIHJlc3RyaWN0RWRnZXMubm9Jbm5lciksXG4gICAgICBvdXRlcjogdXRpbHMuZXh0ZW5kKHt9LCByZXN0cmljdEVkZ2VzLm5vT3V0ZXIpLFxuICAgIH07XG5cbiAgICBpZiAoZWRnZXMudG9wKSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci50b3AgPSByZWN0LmJvdHRvbSAtIG1pblNpemUuaGVpZ2h0O1xuICAgICAgYXJnLm9wdGlvbnMub3V0ZXIudG9wID0gcmVjdC5ib3R0b20gLSBtYXhTaXplLmhlaWdodDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWRnZXMuYm90dG9tKSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci5ib3R0b20gPSByZWN0LnRvcCArIG1pblNpemUuaGVpZ2h0O1xuICAgICAgYXJnLm9wdGlvbnMub3V0ZXIuYm90dG9tID0gcmVjdC50b3AgKyBtYXhTaXplLmhlaWdodDtcbiAgICB9XG4gICAgaWYgKGVkZ2VzLmxlZnQpIHtcbiAgICAgIGFyZy5vcHRpb25zLmlubmVyLmxlZnQgPSByZWN0LnJpZ2h0IC0gbWluU2l6ZS53aWR0aDtcbiAgICAgIGFyZy5vcHRpb25zLm91dGVyLmxlZnQgPSByZWN0LnJpZ2h0IC0gbWF4U2l6ZS53aWR0aDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWRnZXMucmlnaHQpIHtcbiAgICAgIGFyZy5vcHRpb25zLmlubmVyLnJpZ2h0ID0gcmVjdC5sZWZ0ICsgbWluU2l6ZS53aWR0aDtcbiAgICAgIGFyZy5vcHRpb25zLm91dGVyLnJpZ2h0ID0gcmVjdC5sZWZ0ICsgbWF4U2l6ZS53aWR0aDtcbiAgICB9XG5cbiAgICByZXN0cmljdEVkZ2VzLnNldChhcmcpO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogcmVzdHJpY3RFZGdlcy5tb2RpZnlDb29yZHMsXG59O1xuXG5tb2RpZmllcnMucmVzdHJpY3RTaXplID0gcmVzdHJpY3RTaXplO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3Jlc3RyaWN0U2l6ZScpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24ucmVzdHJpY3RTaXplID0gcmVzdHJpY3RTaXplLmRlZmF1bHRzO1xucmVzaXplLmRlZmF1bHRzLnJlc3RyaWN0U2l6ZSAgICAgICAgICA9IHJlc3RyaWN0U2l6ZS5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSByZXN0cmljdFNpemU7XG4iLCIvLyBUaGlzIG1vZHVsZSBhZGRzIHRoZSBvcHRpb25zLnJlc2l6ZS5yZXN0cmljdEVkZ2VzIHNldHRpbmcgd2hpY2ggc2V0cyBtaW4gYW5kXG4vLyBtYXggZm9yIHRoZSB0b3AsIGxlZnQsIGJvdHRvbSBhbmQgcmlnaHQgZWRnZXMgb2YgdGhlIHRhcmdldCBiZWluZyByZXNpemVkLlxuLy9cbi8vIGludGVyYWN0KHRhcmdldCkucmVzaXplKHtcbi8vICAgZWRnZXM6IHsgdG9wOiB0cnVlLCBsZWZ0OiB0cnVlIH0sXG4vLyAgIHJlc3RyaWN0RWRnZXM6IHtcbi8vICAgICBpbm5lcjogeyB0b3A6IDIwMCwgbGVmdDogMjAwLCByaWdodDogNDAwLCBib3R0b206IDQwMCB9LFxuLy8gICAgIG91dGVyOiB7IHRvcDogICAwLCBsZWZ0OiAgIDAsIHJpZ2h0OiA2MDAsIGJvdHRvbTogNjAwIH0sXG4vLyAgIH0sXG4vLyB9KTtcblxuY29uc3QgbW9kaWZpZXJzICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IHJlY3RVdGlscyAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvcmVjdCcpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuY29uc3QgcmVzaXplICAgICAgICAgPSByZXF1aXJlKCcuLi9hY3Rpb25zL3Jlc2l6ZScpO1xuXG5jb25zdCB7IGdldFJlc3RyaWN0aW9uUmVjdCB9ID0gcmVxdWlyZSgnLi9yZXN0cmljdCcpO1xuXG5jb25zdCBub0lubmVyID0geyB0b3A6ICtJbmZpbml0eSwgbGVmdDogK0luZmluaXR5LCBib3R0b206IC1JbmZpbml0eSwgcmlnaHQ6IC1JbmZpbml0eSB9O1xuY29uc3Qgbm9PdXRlciA9IHsgdG9wOiAtSW5maW5pdHksIGxlZnQ6IC1JbmZpbml0eSwgYm90dG9tOiArSW5maW5pdHksIHJpZ2h0OiArSW5maW5pdHkgfTtcblxuY29uc3QgcmVzdHJpY3RFZGdlcyA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlbmRPbmx5OiBmYWxzZSxcbiAgICBtaW46IG51bGwsXG4gICAgbWF4OiBudWxsLFxuICAgIG9mZnNldDogbnVsbCxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBzdGFydE9mZnNldCwgb3B0aW9ucyB9KSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdXRpbHMuZXh0ZW5kKHt9LCBzdGFydE9mZnNldCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb2Zmc2V0ID0gZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMub2Zmc2V0LCBpbnRlcmFjdGlvbiwgaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZSk7XG5cbiAgICBpZiAob2Zmc2V0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6ICAgIHN0YXJ0T2Zmc2V0LnRvcCAgICArIG9mZnNldC55LFxuICAgICAgICBsZWZ0OiAgIHN0YXJ0T2Zmc2V0LmxlZnQgICArIG9mZnNldC54LFxuICAgICAgICBib3R0b206IHN0YXJ0T2Zmc2V0LmJvdHRvbSArIG9mZnNldC55LFxuICAgICAgICByaWdodDogIHN0YXJ0T2Zmc2V0LnJpZ2h0ICArIG9mZnNldC54LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRPZmZzZXQ7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiAoeyBtb2RpZmllZENvb3JkcywgaW50ZXJhY3Rpb24sIHN0YXR1cywgb2Zmc2V0LCBvcHRpb25zIH0pIHtcbiAgICBjb25zdCBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmxpbmtlZEVkZ2VzIHx8IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpIHx8ICFlZGdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhZ2UgPSBzdGF0dXMudXNlU3RhdHVzWFlcbiAgICAgID8geyB4OiBzdGF0dXMueCwgeTogc3RhdHVzLnkgfVxuICAgICAgOiB1dGlscy5leHRlbmQoe30sIG1vZGlmaWVkQ29vcmRzKTtcbiAgICBjb25zdCBpbm5lciA9IHJlY3RVdGlscy54eXdoVG9UbGJyKGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLmlubmVyLCBpbnRlcmFjdGlvbiwgcGFnZSkpIHx8IG5vSW5uZXI7XG4gICAgY29uc3Qgb3V0ZXIgPSByZWN0VXRpbHMueHl3aFRvVGxicihnZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5vdXRlciwgaW50ZXJhY3Rpb24sIHBhZ2UpKSB8fCBub091dGVyO1xuXG4gICAgbGV0IG1vZGlmaWVkWCA9IHBhZ2UueDtcbiAgICBsZXQgbW9kaWZpZWRZID0gcGFnZS55O1xuXG4gICAgc3RhdHVzLmR4ID0gMDtcbiAgICBzdGF0dXMuZHkgPSAwO1xuICAgIHN0YXR1cy5sb2NrZWQgPSBmYWxzZTtcblxuICAgIGlmIChlZGdlcy50b3ApIHtcbiAgICAgIG1vZGlmaWVkWSA9IE1hdGgubWluKE1hdGgubWF4KG91dGVyLnRvcCAgICArIG9mZnNldC50b3AsICAgIHBhZ2UueSksIGlubmVyLnRvcCAgICArIG9mZnNldC50b3ApO1xuICAgIH1cbiAgICBlbHNlIGlmIChlZGdlcy5ib3R0b20pIHtcbiAgICAgIG1vZGlmaWVkWSA9IE1hdGgubWF4KE1hdGgubWluKG91dGVyLmJvdHRvbSAtIG9mZnNldC5ib3R0b20sIHBhZ2UueSksIGlubmVyLmJvdHRvbSAtIG9mZnNldC5ib3R0b20pO1xuICAgIH1cbiAgICBpZiAoZWRnZXMubGVmdCkge1xuICAgICAgbW9kaWZpZWRYID0gTWF0aC5taW4oTWF0aC5tYXgob3V0ZXIubGVmdCAgICsgb2Zmc2V0LmxlZnQsICAgcGFnZS54KSwgaW5uZXIubGVmdCAgICsgb2Zmc2V0LmxlZnQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlZGdlcy5yaWdodCkge1xuICAgICAgbW9kaWZpZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ob3V0ZXIucmlnaHQgIC0gb2Zmc2V0LnJpZ2h0LCAgcGFnZS54KSwgaW5uZXIucmlnaHQgIC0gb2Zmc2V0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICBzdGF0dXMuZHggPSBtb2RpZmllZFggLSBwYWdlLng7XG4gICAgc3RhdHVzLmR5ID0gbW9kaWZpZWRZIC0gcGFnZS55O1xuXG4gICAgc3RhdHVzLmNoYW5nZWQgPSBzdGF0dXMubW9kaWZpZWRYICE9PSBtb2RpZmllZFggfHwgc3RhdHVzLm1vZGlmaWVkWSAhPT0gbW9kaWZpZWRZO1xuICAgIHN0YXR1cy5sb2NrZWQgPSAhIShzdGF0dXMuZHggfHwgc3RhdHVzLmR5KTtcblxuICAgIHN0YXR1cy5tb2RpZmllZFggPSBtb2RpZmllZFg7XG4gICAgc3RhdHVzLm1vZGlmaWVkWSA9IG1vZGlmaWVkWTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IGZ1bmN0aW9uICh7IHBhZ2UsIGNsaWVudCwgc3RhdHVzLCBwaGFzZSwgb3B0aW9ucyB9KSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVkXG4gICAgICAgICYmICEocGhhc2UgPT09ICdzdGFydCcgJiYgc3RhdHVzLmxvY2tlZCkpIHtcblxuICAgICAgaWYgKHN0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgcGFnZS54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgcGFnZS55ICs9IHN0YXR1cy5keTtcbiAgICAgICAgY2xpZW50LnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBjbGllbnQueSArPSBzdGF0dXMuZHk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkeDogc3RhdHVzLmR4LFxuICAgICAgICAgIGR5OiBzdGF0dXMuZHksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG5vSW5uZXIsXG4gIG5vT3V0ZXIsXG4gIGdldFJlc3RyaWN0aW9uUmVjdCxcbn07XG5cbm1vZGlmaWVycy5yZXN0cmljdEVkZ2VzID0gcmVzdHJpY3RFZGdlcztcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdyZXN0cmljdEVkZ2VzJyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5yZXN0cmljdEVkZ2VzID0gcmVzdHJpY3RFZGdlcy5kZWZhdWx0cztcbnJlc2l6ZS5kZWZhdWx0cy5yZXN0cmljdEVkZ2VzICAgICAgICAgID0gcmVzdHJpY3RFZGdlcy5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSByZXN0cmljdEVkZ2VzO1xuIiwiY29uc3QgbW9kaWZpZXJzICAgICAgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxuY29uc3QgcmVzdHJpY3QgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZCAgICA6IGZhbHNlLFxuICAgIGVuZE9ubHkgICAgOiBmYWxzZSxcbiAgICByZXN0cmljdGlvbjogbnVsbCxcbiAgICBlbGVtZW50UmVjdDogbnVsbCxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uICh7IHJlY3QsIHN0YXJ0T2Zmc2V0LCBvcHRpb25zIH0pIHtcbiAgICBjb25zdCBlbGVtZW50UmVjdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbGVtZW50UmVjdDtcbiAgICBjb25zdCBvZmZzZXQgPSB7fTtcblxuICAgIGlmIChyZWN0ICYmIGVsZW1lbnRSZWN0KSB7XG4gICAgICBvZmZzZXQubGVmdCA9IHN0YXJ0T2Zmc2V0LmxlZnQgLSAocmVjdC53aWR0aCAgKiBlbGVtZW50UmVjdC5sZWZ0KTtcbiAgICAgIG9mZnNldC50b3AgID0gc3RhcnRPZmZzZXQudG9wICAtIChyZWN0LmhlaWdodCAqIGVsZW1lbnRSZWN0LnRvcCk7XG5cbiAgICAgIG9mZnNldC5yaWdodCAgPSBzdGFydE9mZnNldC5yaWdodCAgLSAocmVjdC53aWR0aCAgKiAoMSAtIGVsZW1lbnRSZWN0LnJpZ2h0KSk7XG4gICAgICBvZmZzZXQuYm90dG9tID0gc3RhcnRPZmZzZXQuYm90dG9tIC0gKHJlY3QuaGVpZ2h0ICogKDEgLSBlbGVtZW50UmVjdC5ib3R0b20pKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvZmZzZXQubGVmdCA9IG9mZnNldC50b3AgPSBvZmZzZXQucmlnaHQgPSBvZmZzZXQuYm90dG9tID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKHsgbW9kaWZpZWRDb29yZHMsIGludGVyYWN0aW9uLCBzdGF0dXMsIG9wdGlvbnMgfSkge1xuICAgIGlmICghb3B0aW9ucykgeyByZXR1cm4gc3RhdHVzOyB9XG5cbiAgICBjb25zdCBwYWdlID0gc3RhdHVzLnVzZVN0YXR1c1hZXG4gICAgICA/IHsgeDogc3RhdHVzLngsIHk6IHN0YXR1cy55IH1cbiAgICAgIDogdXRpbHMuZXh0ZW5kKHt9LCBtb2RpZmllZENvb3Jkcyk7XG5cbiAgICBjb25zdCByZXN0cmljdGlvbiA9IGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLnJlc3RyaWN0aW9uLCBpbnRlcmFjdGlvbiwgcGFnZSk7XG5cbiAgICBpZiAoIXJlc3RyaWN0aW9uKSB7IHJldHVybiBzdGF0dXM7IH1cblxuICAgIHN0YXR1cy5keCA9IDA7XG4gICAgc3RhdHVzLmR5ID0gMDtcbiAgICBzdGF0dXMubG9ja2VkID0gZmFsc2U7XG5cbiAgICBjb25zdCByZWN0ID0gcmVzdHJpY3Rpb247XG4gICAgbGV0IG1vZGlmaWVkWCA9IHBhZ2UueDtcbiAgICBsZXQgbW9kaWZpZWRZID0gcGFnZS55O1xuXG4gICAgY29uc3Qgb2Zmc2V0ID0gaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzLnJlc3RyaWN0O1xuXG4gICAgLy8gb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZVxuICAgIC8vIHgsIHksIHdpZHRoLCBoZWlnaHQgb3JcbiAgICAvLyBsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b21cbiAgICBpZiAoJ3gnIGluIHJlc3RyaWN0aW9uICYmICd5JyBpbiByZXN0cmljdGlvbikge1xuICAgICAgbW9kaWZpZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC54ICsgcmVjdC53aWR0aCAgLSBvZmZzZXQucmlnaHQgLCBwYWdlLngpLCByZWN0LnggKyBvZmZzZXQubGVmdCk7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnkgKyByZWN0LmhlaWdodCAtIG9mZnNldC5ib3R0b20sIHBhZ2UueSksIHJlY3QueSArIG9mZnNldC50b3AgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnJpZ2h0ICAtIG9mZnNldC5yaWdodCAsIHBhZ2UueCksIHJlY3QubGVmdCArIG9mZnNldC5sZWZ0KTtcbiAgICAgIG1vZGlmaWVkWSA9IE1hdGgubWF4KE1hdGgubWluKHJlY3QuYm90dG9tIC0gb2Zmc2V0LmJvdHRvbSwgcGFnZS55KSwgcmVjdC50b3AgICsgb2Zmc2V0LnRvcCApO1xuICAgIH1cblxuICAgIHN0YXR1cy5keCA9IG1vZGlmaWVkWCAtIHBhZ2UueDtcbiAgICBzdGF0dXMuZHkgPSBtb2RpZmllZFkgLSBwYWdlLnk7XG5cbiAgICBzdGF0dXMuY2hhbmdlZCA9IHN0YXR1cy5tb2RpZmllZFggIT09IG1vZGlmaWVkWCB8fCBzdGF0dXMubW9kaWZpZWRZICE9PSBtb2RpZmllZFk7XG4gICAgc3RhdHVzLmxvY2tlZCA9ICEhKHN0YXR1cy5keCB8fCBzdGF0dXMuZHkpO1xuXG4gICAgc3RhdHVzLm1vZGlmaWVkWCA9IG1vZGlmaWVkWDtcbiAgICBzdGF0dXMubW9kaWZpZWRZID0gbW9kaWZpZWRZO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gKHsgcGFnZSwgY2xpZW50LCBzdGF0dXMsIHBoYXNlLCBvcHRpb25zIH0pIHtcbiAgICBjb25zdCBlbGVtZW50UmVjdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbGVtZW50UmVjdDtcblxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5hYmxlZFxuICAgICAgICAmJiAhKHBoYXNlID09PSAnc3RhcnQnICYmIGVsZW1lbnRSZWN0ICYmIHN0YXR1cy5sb2NrZWQpKSB7XG5cbiAgICAgIGlmIChzdGF0dXMubG9ja2VkKSB7XG4gICAgICAgIHBhZ2UueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIHBhZ2UueSArPSBzdGF0dXMuZHk7XG4gICAgICAgIGNsaWVudC54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgY2xpZW50LnkgKz0gc3RhdHVzLmR5O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZHg6IHN0YXR1cy5keCxcbiAgICAgICAgICBkeTogc3RhdHVzLmR5LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBnZXRSZXN0cmljdGlvblJlY3QsXG59O1xuXG5mdW5jdGlvbiBnZXRSZXN0cmljdGlvblJlY3QgKHZhbHVlLCBpbnRlcmFjdGlvbiwgcGFnZSkge1xuICBpZiAodXRpbHMuaXMuZnVuY3Rpb24odmFsdWUpKSB7XG4gICAgcmV0dXJuIHV0aWxzLnJlc29sdmVSZWN0TGlrZSh2YWx1ZSwgaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50LCBbcGFnZS54LCBwYWdlLnksIGludGVyYWN0aW9uXSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHV0aWxzLnJlc29sdmVSZWN0TGlrZSh2YWx1ZSwgaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgfVxufVxuXG5tb2RpZmllcnMucmVzdHJpY3QgPSByZXN0cmljdDtcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdyZXN0cmljdCcpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24ucmVzdHJpY3QgPSByZXN0cmljdC5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSByZXN0cmljdDtcbiIsImNvbnN0IEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgPSByZXF1aXJlKCcuL0ludGVyYWN0aW9uJyk7XG5jb25zdCBzY29wZSAgICAgICAgPSByZXF1aXJlKCcuL3Njb3BlJyk7XG5jb25zdCBpcyAgICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2lzJyk7XG5jb25zdCBldmVudHMgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpO1xuY29uc3QgYnJvd3NlciAgICAgID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJyk7XG5cbmNvbnN0IHsgbm9kZUNvbnRhaW5zLCBtYXRjaGVzU2VsZWN0b3IgfSA9IHJlcXVpcmUoJy4vdXRpbHMvZG9tVXRpbHMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0byBwcmV2ZW50IHRoZSBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvdXIgaW5cbiAqIHJlc3BvbnNlIHRvIHBvaW50ZXIgZXZlbnRzLiBDYW4gYmUgc2V0IHRvOlxuICogIC0gYCdhbHdheXMnYCB0byBhbHdheXMgcHJldmVudFxuICogIC0gYCduZXZlcidgIHRvIG5ldmVyIHByZXZlbnRcbiAqICAtIGAnYXV0bydgIHRvIGxldCBpbnRlcmFjdC5qcyB0cnkgdG8gZGV0ZXJtaW5lIHdoYXQgd291bGQgYmUgYmVzdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmV3VmFsdWVdIGB0cnVlYCwgYGZhbHNlYCBvciBgJ2F1dG8nYFxuICogQHJldHVybiB7c3RyaW5nIHwgSW50ZXJhY3RhYmxlfSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgaWYgKC9eKGFsd2F5c3xuZXZlcnxhdXRvKSQvLnRlc3QobmV3VmFsdWUpKSB7XG4gICAgdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0ID0gbmV3VmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoaXMuYm9vbChuZXdWYWx1ZSkpIHtcbiAgICB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQgPSBuZXdWYWx1ZT8gJ2Fsd2F5cycgOiAnbmV2ZXInO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdDtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCBzZXR0aW5nID0gdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0O1xuXG4gIGlmIChzZXR0aW5nID09PSAnbmV2ZXInKSB7IHJldHVybjsgfVxuXG4gIGlmIChzZXR0aW5nID09PSAnYWx3YXlzJykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2V0dGluZyA9PT0gJ2F1dG8nXG5cbiAgLy8gZG9uJ3QgcHJldmVudERlZmF1bHQgb2YgdG91Y2h7c3RhcnQsbW92ZX0gZXZlbnRzIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmVcbiAgLy8gZXZlbnRzIGxpc3RlbmVycy4gQ1NTIHRvdWNoLWFjdGlvbiBhbmQgdXNlci1zZWxlY2N0IHNob3VsZCBiZSB1c2VkIGluc3RlYWRcbiAgaWYgKGV2ZW50cy5zdXBwb3J0c1Bhc3NpdmVcbiAgICAmJiAvXnRvdWNoKHN0YXJ0fG1vdmUpJC8udGVzdChldmVudC50eXBlKVxuICAgICYmICFicm93c2VyLmlzSU9TKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZG9uJ3QgcHJldmVudERlZmF1bHQgb2YgcG9pbnRlcmRvd24gZXZlbnRzXG4gIGlmICgvXihtb3VzZXxwb2ludGVyfHRvdWNoKSooZG93bnxzdGFydCkvaS50ZXN0KGV2ZW50LnR5cGUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZG9uJ3QgcHJldmVudERlZmF1bHQgb24gZWRpdGFibGUgZWxlbWVudHNcbiAgaWYgKGlzLmVsZW1lbnQoZXZlbnQudGFyZ2V0KVxuICAgICAgJiYgbWF0Y2hlc1NlbGVjdG9yKGV2ZW50LnRhcmdldCwgJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYSxbY29udGVudGVkaXRhYmxlPXRydWVdLFtjb250ZW50ZWRpdGFibGU9dHJ1ZV0gKicpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbmZ1bmN0aW9uIG9uSW50ZXJhY3Rpb25FdmVudCAoeyBpbnRlcmFjdGlvbiwgZXZlbnQgfSkge1xuICBpZiAoaW50ZXJhY3Rpb24udGFyZ2V0KSB7XG4gICAgaW50ZXJhY3Rpb24udGFyZ2V0LmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQpO1xuICB9XG59XG5cbmZvciAoY29uc3QgZXZlbnRTaWduYWwgb2YgWydkb3duJywgJ21vdmUnLCAndXAnLCAnY2FuY2VsJ10pIHtcbiAgSW50ZXJhY3Rpb24uc2lnbmFscy5vbihldmVudFNpZ25hbCwgb25JbnRlcmFjdGlvbkV2ZW50KTtcbn1cblxuLy8gcHJldmVudCBuYXRpdmUgSFRNTDUgZHJhZyBvbiBpbnRlcmFjdC5qcyB0YXJnZXQgZWxlbWVudHNcbkludGVyYWN0aW9uLmRvY0V2ZW50cy5kcmFnc3RhcnQgPSBmdW5jdGlvbiBwcmV2ZW50TmF0aXZlRHJhZyAoZXZlbnQpIHtcbiAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcblxuICAgIGlmIChpbnRlcmFjdGlvbi5lbGVtZW50XG4gICAgICAgICYmIChpbnRlcmFjdGlvbi5lbGVtZW50ID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgIHx8IG5vZGVDb250YWlucyhpbnRlcmFjdGlvbi5lbGVtZW50LCBldmVudC50YXJnZXQpKSkge1xuXG4gICAgICBpbnRlcmFjdGlvbi50YXJnZXQuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgSW50ZXJhY3RFdmVudCAgPSByZXF1aXJlKCcuL0ludGVyYWN0RXZlbnQnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgID0gcmVxdWlyZSgnLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgbW9kaWZpZXJzICAgICAgPSByZXF1aXJlKCcuL21vZGlmaWVycy9iYXNlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IGFuaW1hdGlvbkZyYW1lID0gcmVxdWlyZSgnLi91dGlscy9yYWYnKTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXMgPSB7XG4gICAgYWN0aXZlICAgICA6IGZhbHNlLFxuICAgIHNtb290aEVuZCAgOiBmYWxzZSxcbiAgICBhbGxvd1Jlc3VtZTogZmFsc2UsXG5cbiAgICBzdGFydEV2ZW50OiBudWxsLFxuICAgIHVwQ29vcmRzICA6IHt9LFxuXG4gICAgeGU6IDAsIHllOiAwLFxuICAgIHN4OiAwLCBzeTogMCxcblxuICAgIHQwOiAwLFxuICAgIHZ4MDogMCwgdnlzOiAwLFxuICAgIGR1cmF0aW9uOiAwLFxuXG4gICAgbGFtYmRhX3YwOiAwLFxuICAgIG9uZV92ZV92MDogMCxcbiAgICBpICA6IG51bGwsXG4gIH07XG5cbiAgaW50ZXJhY3Rpb24uYm91bmRJbmVydGlhRnJhbWUgICA9ICgpID0+IGluZXJ0aWFGcmFtZSAgLmFwcGx5KGludGVyYWN0aW9uKTtcbiAgaW50ZXJhY3Rpb24uYm91bmRTbW9vdGhFbmRGcmFtZSA9ICgpID0+IHNtb290aEVuZEZyYW1lLmFwcGx5KGludGVyYWN0aW9uKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdkb3duJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50LCBwb2ludGVyLCBldmVudFRhcmdldCB9KSB7XG4gIGNvbnN0IHN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGRvd24gZXZlbnQgaGl0cyB0aGUgY3VycmVudCBpbmVydGlhIHRhcmdldFxuICBpZiAoc3RhdHVzLmFjdGl2ZSkge1xuICAgIGxldCBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAvLyBjbGltYiB1cCB0aGUgRE9NIHRyZWUgZnJvbSB0aGUgZXZlbnQgdGFyZ2V0XG4gICAgd2hpbGUgKHV0aWxzLmlzLmVsZW1lbnQoZWxlbWVudCkpIHtcblxuICAgICAgLy8gaWYgaW50ZXJhY3Rpb24gZWxlbWVudCBpcyB0aGUgY3VycmVudCBpbmVydGlhIHRhcmdldCBlbGVtZW50XG4gICAgICBpZiAoZWxlbWVudCA9PT0gaW50ZXJhY3Rpb24uZWxlbWVudCkge1xuICAgICAgICAvLyBzdG9wIGluZXJ0aWFcbiAgICAgICAgYW5pbWF0aW9uRnJhbWUuY2FuY2VsKHN0YXR1cy5pKTtcbiAgICAgICAgc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpbnRlcmFjdGlvbi5zaW11bGF0aW9uID0gbnVsbDtcblxuICAgICAgICAvLyB1cGRhdGUgcG9pbnRlcnMgdG8gdGhlIGRvd24gZXZlbnQncyBjb29yZGluYXRlc1xuICAgICAgICBpbnRlcmFjdGlvbi51cGRhdGVQb2ludGVyKHBvaW50ZXIpO1xuICAgICAgICB1dGlscy5zZXRDb29yZHMoaW50ZXJhY3Rpb24uY3VyQ29vcmRzLCBpbnRlcmFjdGlvbi5wb2ludGVycyk7XG5cbiAgICAgICAgLy8gZmlyZSBhcHByb3ByaWF0ZSBzaWduYWxzXG4gICAgICAgIGNvbnN0IHNpZ25hbEFyZyA9IHsgaW50ZXJhY3Rpb24gfTtcbiAgICAgICAgSW50ZXJhY3Rpb24uc2lnbmFscy5maXJlKCdiZWZvcmUtYWN0aW9uLW1vdmUnLCBzaWduYWxBcmcpO1xuICAgICAgICBJbnRlcmFjdGlvbi5zaWduYWxzLmZpcmUoJ2FjdGlvbi1yZXN1bWUnICAgICAsIHNpZ25hbEFyZyk7XG5cbiAgICAgICAgLy8gZmlyZSBhIHJldW1lIGV2ZW50XG4gICAgICAgIGNvbnN0IHJlc3VtZUV2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQoaW50ZXJhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5lcnRpYXJlc3VtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG5cbiAgICAgICAgaW50ZXJhY3Rpb24udGFyZ2V0LmZpcmUocmVzdW1lRXZlbnQpO1xuICAgICAgICBpbnRlcmFjdGlvbi5wcmV2RXZlbnQgPSByZXN1bWVFdmVudDtcbiAgICAgICAgbW9kaWZpZXJzLnJlc2V0U3RhdHVzZXMoaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlcyk7XG5cbiAgICAgICAgdXRpbHMuY29weUNvb3JkcyhpbnRlcmFjdGlvbi5wcmV2Q29vcmRzLCBpbnRlcmFjdGlvbi5jdXJDb29yZHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9IHV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbigndXAnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnQgfSkge1xuICBjb25zdCBzdGF0dXMgPSBpbnRlcmFjdGlvbi5pbmVydGlhU3RhdHVzO1xuXG4gIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSB8fCBzdGF0dXMuYWN0aXZlKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldDtcbiAgY29uc3Qgb3B0aW9ucyA9IHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucztcbiAgY29uc3QgaW5lcnRpYU9wdGlvbnMgPSBvcHRpb25zICYmIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgJiYgb3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5pbmVydGlhO1xuXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjb25zdCBzdGF0dXNlcyA9IHt9O1xuICBjb25zdCBwYWdlID0gdXRpbHMuZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZSk7XG4gIGNvbnN0IHBvaW50ZXJTcGVlZCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQuc3BlZWQ7XG5cbiAgbGV0IHNtb290aEVuZCA9IGZhbHNlO1xuICBsZXQgbW9kaWZpZXJSZXN1bHQ7XG5cbiAgLy8gY2hlY2sgaWYgaW5lcnRpYSBzaG91bGQgYmUgc3RhcnRlZFxuICBjb25zdCBpbmVydGlhUG9zc2libGUgPSAoaW5lcnRpYU9wdGlvbnMgJiYgaW5lcnRpYU9wdGlvbnMuZW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICAgJiYgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2dlc3R1cmUnXG4gICAgICAgICAgICAgICAgICAgICAmJiBldmVudCAhPT0gc3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gIGNvbnN0IGluZXJ0aWEgPSAoaW5lcnRpYVBvc3NpYmxlXG4gICAgJiYgKG5vdyAtIGludGVyYWN0aW9uLmN1ckNvb3Jkcy50aW1lU3RhbXApIDwgNTBcbiAgICAmJiBwb2ludGVyU3BlZWQgPiBpbmVydGlhT3B0aW9ucy5taW5TcGVlZFxuICAgICYmIHBvaW50ZXJTcGVlZCA+IGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkKTtcblxuICBjb25zdCBtb2RpZmllckFyZyA9IHtcbiAgICBpbnRlcmFjdGlvbixcbiAgICBwYWdlQ29vcmRzOiBwYWdlLFxuICAgIHN0YXR1c2VzLFxuICAgIHByZUVuZDogdHJ1ZSxcbiAgICByZXF1aXJlRW5kT25seTogdHJ1ZSxcbiAgfTtcblxuICAvLyBzbW9vdGhFbmRcbiAgaWYgKGluZXJ0aWFQb3NzaWJsZSAmJiAhaW5lcnRpYSkge1xuICAgIG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKHN0YXR1c2VzKTtcblxuICAgIG1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbChtb2RpZmllckFyZyk7XG5cbiAgICBpZiAobW9kaWZpZXJSZXN1bHQuc2hvdWxkTW92ZSAmJiBtb2RpZmllclJlc3VsdC5sb2NrZWQpIHtcbiAgICAgIHNtb290aEVuZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCEoaW5lcnRpYSB8fCBzbW9vdGhFbmQpKSB7IHJldHVybjsgfVxuXG4gIHV0aWxzLmNvcHlDb29yZHMoc3RhdHVzLnVwQ29vcmRzLCBpbnRlcmFjdGlvbi5jdXJDb29yZHMpO1xuXG4gIGludGVyYWN0aW9uLnBvaW50ZXJzWzBdID0gc3RhdHVzLnN0YXJ0RXZlbnQgPVxuICAgIG5ldyBJbnRlcmFjdEV2ZW50KGludGVyYWN0aW9uLCBldmVudCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSwgJ2luZXJ0aWFzdGFydCcsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuXG4gIHN0YXR1cy50MCA9IG5vdztcblxuICBzdGF0dXMuYWN0aXZlID0gdHJ1ZTtcbiAgc3RhdHVzLmFsbG93UmVzdW1lID0gaW5lcnRpYU9wdGlvbnMuYWxsb3dSZXN1bWU7XG4gIGludGVyYWN0aW9uLnNpbXVsYXRpb24gPSBzdGF0dXM7XG5cbiAgdGFyZ2V0LmZpcmUoc3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gIGlmIChpbmVydGlhKSB7XG4gICAgc3RhdHVzLnZ4MCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudng7XG4gICAgc3RhdHVzLnZ5MCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudnk7XG4gICAgc3RhdHVzLnYwID0gcG9pbnRlclNwZWVkO1xuXG4gICAgY2FsY0luZXJ0aWEoaW50ZXJhY3Rpb24sIHN0YXR1cyk7XG5cbiAgICB1dGlscy5leHRlbmQocGFnZSwgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UpO1xuXG4gICAgcGFnZS54ICs9IHN0YXR1cy54ZTtcbiAgICBwYWdlLnkgKz0gc3RhdHVzLnllO1xuXG4gICAgbW9kaWZpZXJzLnJlc2V0U3RhdHVzZXMoc3RhdHVzZXMpO1xuXG4gICAgbW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllcnMuc2V0QWxsKG1vZGlmaWVyQXJnKTtcblxuICAgIHN0YXR1cy5tb2RpZmllZFhlICs9IG1vZGlmaWVyUmVzdWx0LmR4O1xuICAgIHN0YXR1cy5tb2RpZmllZFllICs9IG1vZGlmaWVyUmVzdWx0LmR5O1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KGludGVyYWN0aW9uLmJvdW5kSW5lcnRpYUZyYW1lKTtcbiAgfVxuICBlbHNlIHtcbiAgICBzdGF0dXMuc21vb3RoRW5kID0gdHJ1ZTtcbiAgICBzdGF0dXMueGUgPSBtb2RpZmllclJlc3VsdC5keDtcbiAgICBzdGF0dXMueWUgPSBtb2RpZmllclJlc3VsdC5keTtcblxuICAgIHN0YXR1cy5zeCA9IHN0YXR1cy5zeSA9IDA7XG5cbiAgICBzdGF0dXMuaSA9IGFuaW1hdGlvbkZyYW1lLnJlcXVlc3QoaW50ZXJhY3Rpb24uYm91bmRTbW9vdGhFbmRGcmFtZSk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wLWFjdGl2ZScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgY29uc3Qgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICBpZiAoc3RhdHVzLmFjdGl2ZSkge1xuICAgIGFuaW1hdGlvbkZyYW1lLmNhbmNlbChzdGF0dXMuaSk7XG4gICAgc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIGludGVyYWN0aW9uLnNpbXVsYXRpb24gPSBudWxsO1xuICB9XG59KTtcblxuZnVuY3Rpb24gY2FsY0luZXJ0aWEgKGludGVyYWN0aW9uLCBzdGF0dXMpIHtcbiAgY29uc3QgaW5lcnRpYU9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5pbmVydGlhO1xuICBjb25zdCBsYW1iZGEgPSBpbmVydGlhT3B0aW9ucy5yZXNpc3RhbmNlO1xuICBjb25zdCBpbmVydGlhRHVyID0gLU1hdGgubG9nKGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkIC8gc3RhdHVzLnYwKSAvIGxhbWJkYTtcblxuICBzdGF0dXMueDAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQucGFnZVg7XG4gIHN0YXR1cy55MCA9IGludGVyYWN0aW9uLnByZXZFdmVudC5wYWdlWTtcbiAgc3RhdHVzLnQwID0gc3RhdHVzLnN0YXJ0RXZlbnQudGltZVN0YW1wIC8gMTAwMDtcbiAgc3RhdHVzLnN4ID0gc3RhdHVzLnN5ID0gMDtcblxuICBzdGF0dXMubW9kaWZpZWRYZSA9IHN0YXR1cy54ZSA9IChzdGF0dXMudngwIC0gaW5lcnRpYUR1cikgLyBsYW1iZGE7XG4gIHN0YXR1cy5tb2RpZmllZFllID0gc3RhdHVzLnllID0gKHN0YXR1cy52eTAgLSBpbmVydGlhRHVyKSAvIGxhbWJkYTtcbiAgc3RhdHVzLnRlID0gaW5lcnRpYUR1cjtcblxuICBzdGF0dXMubGFtYmRhX3YwID0gbGFtYmRhIC8gc3RhdHVzLnYwO1xuICBzdGF0dXMub25lX3ZlX3YwID0gMSAtIGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkIC8gc3RhdHVzLnYwO1xufVxuXG5mdW5jdGlvbiBpbmVydGlhRnJhbWUgKCkge1xuICB1cGRhdGVJbmVydGlhQ29vcmRzKHRoaXMpO1xuICB1dGlscy5zZXRDb29yZERlbHRhcyh0aGlzLnBvaW50ZXJEZWx0YSwgdGhpcy5wcmV2Q29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG5cbiAgY29uc3Qgc3RhdHVzID0gdGhpcy5pbmVydGlhU3RhdHVzO1xuICBjb25zdCBvcHRpb25zID0gdGhpcy50YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLmluZXJ0aWE7XG4gIGNvbnN0IGxhbWJkYSA9IG9wdGlvbnMucmVzaXN0YW5jZTtcbiAgY29uc3QgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCAtIHN0YXR1cy50MDtcblxuICBpZiAodCA8IHN0YXR1cy50ZSkge1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSAgMSAtIChNYXRoLmV4cCgtbGFtYmRhICogdCkgLSBzdGF0dXMubGFtYmRhX3YwKSAvIHN0YXR1cy5vbmVfdmVfdjA7XG5cbiAgICBpZiAoc3RhdHVzLm1vZGlmaWVkWGUgPT09IHN0YXR1cy54ZSAmJiBzdGF0dXMubW9kaWZpZWRZZSA9PT0gc3RhdHVzLnllKSB7XG4gICAgICBzdGF0dXMuc3ggPSBzdGF0dXMueGUgKiBwcm9ncmVzcztcbiAgICAgIHN0YXR1cy5zeSA9IHN0YXR1cy55ZSAqIHByb2dyZXNzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHF1YWRQb2ludCA9IHV0aWxzLmdldFF1YWRyYXRpY0N1cnZlUG9pbnQoMCwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnhlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMueWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5tb2RpZmllZFhlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubW9kaWZpZWRZZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MpO1xuXG4gICAgICBzdGF0dXMuc3ggPSBxdWFkUG9pbnQueDtcbiAgICAgIHN0YXR1cy5zeSA9IHF1YWRQb2ludC55O1xuICAgIH1cblxuICAgIHRoaXMuZG9Nb3ZlKCk7XG5cbiAgICBzdGF0dXMuaSA9IGFuaW1hdGlvbkZyYW1lLnJlcXVlc3QodGhpcy5ib3VuZEluZXJ0aWFGcmFtZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgc3RhdHVzLnN4ID0gc3RhdHVzLm1vZGlmaWVkWGU7XG4gICAgc3RhdHVzLnN5ID0gc3RhdHVzLm1vZGlmaWVkWWU7XG5cbiAgICB0aGlzLmRvTW92ZSgpO1xuICAgIHRoaXMuZW5kKHN0YXR1cy5zdGFydEV2ZW50KTtcbiAgICBzdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5zaW11bGF0aW9uID0gbnVsbDtcbiAgfVxuXG4gIHV0aWxzLmNvcHlDb29yZHModGhpcy5wcmV2Q29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG59XG5cbmZ1bmN0aW9uIHNtb290aEVuZEZyYW1lICgpIHtcbiAgdXBkYXRlSW5lcnRpYUNvb3Jkcyh0aGlzKTtcblxuICBjb25zdCBzdGF0dXMgPSB0aGlzLmluZXJ0aWFTdGF0dXM7XG4gIGNvbnN0IHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXR1cy50MDtcbiAgY29uc3QgZHVyYXRpb24gPSB0aGlzLnRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uaW5lcnRpYS5zbW9vdGhFbmREdXJhdGlvbjtcblxuICBpZiAodCA8IGR1cmF0aW9uKSB7XG4gICAgc3RhdHVzLnN4ID0gdXRpbHMuZWFzZU91dFF1YWQodCwgMCwgc3RhdHVzLnhlLCBkdXJhdGlvbik7XG4gICAgc3RhdHVzLnN5ID0gdXRpbHMuZWFzZU91dFF1YWQodCwgMCwgc3RhdHVzLnllLCBkdXJhdGlvbik7XG5cbiAgICB0aGlzLnBvaW50ZXJNb3ZlKHN0YXR1cy5zdGFydEV2ZW50LCBzdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgICBzdGF0dXMuaSA9IGFuaW1hdGlvbkZyYW1lLnJlcXVlc3QodGhpcy5ib3VuZFNtb290aEVuZEZyYW1lKTtcbiAgfVxuICBlbHNlIHtcbiAgICBzdGF0dXMuc3ggPSBzdGF0dXMueGU7XG4gICAgc3RhdHVzLnN5ID0gc3RhdHVzLnllO1xuXG4gICAgdGhpcy5wb2ludGVyTW92ZShzdGF0dXMuc3RhcnRFdmVudCwgc3RhdHVzLnN0YXJ0RXZlbnQpO1xuICAgIHRoaXMuZW5kKHN0YXR1cy5zdGFydEV2ZW50KTtcblxuICAgIHN0YXR1cy5zbW9vdGhFbmQgPVxuICAgICAgc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2ltdWxhdGlvbiA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5lcnRpYUNvb3JkcyAoaW50ZXJhY3Rpb24pIHtcbiAgY29uc3Qgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICAvLyByZXR1cm4gaWYgaW5lcnRpYSBpc24ndCBydW5uaW5nXG4gIGlmICghc3RhdHVzLmFjdGl2ZSkgeyByZXR1cm47IH1cblxuICBjb25zdCBwYWdlVXAgICA9IHN0YXR1cy51cENvb3Jkcy5wYWdlO1xuICBjb25zdCBjbGllbnRVcCA9IHN0YXR1cy51cENvb3Jkcy5jbGllbnQ7XG5cbiAgdXRpbHMuc2V0Q29vcmRzKGludGVyYWN0aW9uLmN1ckNvb3JkcywgWyB7XG4gICAgcGFnZVggIDogcGFnZVVwLnggICArIHN0YXR1cy5zeCxcbiAgICBwYWdlWSAgOiBwYWdlVXAueSAgICsgc3RhdHVzLnN5LFxuICAgIGNsaWVudFg6IGNsaWVudFVwLnggKyBzdGF0dXMuc3gsXG4gICAgY2xpZW50WTogY2xpZW50VXAueSArIHN0YXR1cy5zeSxcbiAgfSBdKTtcbn1cbiIsImNvbnN0IEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IGV4dGVuZCAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9leHRlbmQnKTtcblxuY29uc3QgbW9kaWZpZXJzID0ge1xuICBuYW1lczogW10sXG5cbiAgc2V0T2Zmc2V0czogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IHsgaW50ZXJhY3Rpb24sIHBhZ2VDb29yZHM6IHBhZ2UgfSA9IGFyZztcbiAgICBjb25zdCB7IHRhcmdldCwgZWxlbWVudCwgc3RhcnRPZmZzZXQgfSA9IGludGVyYWN0aW9uO1xuICAgIGNvbnN0IHJlY3QgPSB0YXJnZXQuZ2V0UmVjdChlbGVtZW50KTtcblxuICAgIGlmIChyZWN0KSB7XG4gICAgICBzdGFydE9mZnNldC5sZWZ0ID0gcGFnZS54IC0gcmVjdC5sZWZ0O1xuICAgICAgc3RhcnRPZmZzZXQudG9wICA9IHBhZ2UueSAtIHJlY3QudG9wO1xuXG4gICAgICBzdGFydE9mZnNldC5yaWdodCAgPSByZWN0LnJpZ2h0ICAtIHBhZ2UueDtcbiAgICAgIHN0YXJ0T2Zmc2V0LmJvdHRvbSA9IHJlY3QuYm90dG9tIC0gcGFnZS55O1xuXG4gICAgICBpZiAoISgnd2lkdGgnICBpbiByZWN0KSkgeyByZWN0LndpZHRoICA9IHJlY3QucmlnaHQgIC0gcmVjdC5sZWZ0OyB9XG4gICAgICBpZiAoISgnaGVpZ2h0JyBpbiByZWN0KSkgeyByZWN0LmhlaWdodCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3AgOyB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhcnRPZmZzZXQubGVmdCA9IHN0YXJ0T2Zmc2V0LnRvcCA9IHN0YXJ0T2Zmc2V0LnJpZ2h0ID0gc3RhcnRPZmZzZXQuYm90dG9tID0gMDtcbiAgICB9XG5cbiAgICBhcmcucmVjdCA9IHJlY3Q7XG4gICAgYXJnLmludGVyYWN0YWJsZSA9IHRhcmdldDtcbiAgICBhcmcuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBmb3IgKGNvbnN0IG1vZGlmaWVyTmFtZSBvZiBtb2RpZmllcnMubmFtZXMpIHtcbiAgICAgIGFyZy5vcHRpb25zID0gdGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV1bbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaWYgKCFhcmcub3B0aW9ucykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzW21vZGlmaWVyTmFtZV0gPSBtb2RpZmllcnNbbW9kaWZpZXJOYW1lXS5zZXRPZmZzZXQoYXJnKTtcbiAgICB9XG4gIH0sXG5cbiAgc2V0QWxsOiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgY29uc3QgeyBpbnRlcmFjdGlvbiwgc3RhdHVzZXMsIHByZUVuZCwgcmVxdWlyZUVuZE9ubHkgfSA9IGFyZztcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBkeDogMCxcbiAgICAgIGR5OiAwLFxuICAgICAgY2hhbmdlZDogZmFsc2UsXG4gICAgICBsb2NrZWQ6IGZhbHNlLFxuICAgICAgc2hvdWxkTW92ZTogdHJ1ZSxcbiAgICB9O1xuXG4gICAgYXJnLm1vZGlmaWVkQ29vcmRzID0gZXh0ZW5kKHt9LCBhcmcucGFnZUNvb3Jkcyk7XG5cbiAgICBmb3IgKGNvbnN0IG1vZGlmaWVyTmFtZSBvZiBtb2RpZmllcnMubmFtZXMpIHtcbiAgICAgIGNvbnN0IG1vZGlmaWVyID0gbW9kaWZpZXJzW21vZGlmaWVyTmFtZV07XG4gICAgICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV1bbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaWYgKCFzaG91bGREbyhvcHRpb25zLCBwcmVFbmQsIHJlcXVpcmVFbmRPbmx5KSkgeyBjb250aW51ZTsgfVxuXG4gICAgICBhcmcuc3RhdHVzID0gYXJnLnN0YXR1cyA9IHN0YXR1c2VzW21vZGlmaWVyTmFtZV07XG4gICAgICBhcmcub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICBhcmcub2Zmc2V0ID0gYXJnLmludGVyYWN0aW9uLm1vZGlmaWVyT2Zmc2V0c1ttb2RpZmllck5hbWVdO1xuXG4gICAgICBtb2RpZmllci5zZXQoYXJnKTtcblxuICAgICAgaWYgKGFyZy5zdGF0dXMubG9ja2VkKSB7XG4gICAgICAgIGFyZy5tb2RpZmllZENvb3Jkcy54ICs9IGFyZy5zdGF0dXMuZHg7XG4gICAgICAgIGFyZy5tb2RpZmllZENvb3Jkcy55ICs9IGFyZy5zdGF0dXMuZHk7XG5cbiAgICAgICAgcmVzdWx0LmR4ICs9IGFyZy5zdGF0dXMuZHg7XG4gICAgICAgIHJlc3VsdC5keSArPSBhcmcuc3RhdHVzLmR5O1xuXG4gICAgICAgIHJlc3VsdC5sb2NrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGEgbW92ZSBzaG91bGQgYmUgZmlyZWQgaWY6XG4gICAgLy8gIC0gdGhlcmUgYXJlIG5vIG1vZGlmaWVycyBlbmFibGVkLFxuICAgIC8vICAtIG5vIG1vZGlmaWVycyBhcmUgXCJsb2NrZWRcIiBpLmUuIGhhdmUgY2hhbmdlZCB0aGUgcG9pbnRlcidzIGNvb3JkaW5hdGVzLCBvclxuICAgIC8vICAtIHRoZSBsb2NrZWQgY29vcmRzIGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBwb2ludGVyIG1vdmVcbiAgICByZXN1bHQuc2hvdWxkTW92ZSA9ICFhcmcuc3RhdHVzIHx8ICFyZXN1bHQubG9ja2VkIHx8IGFyZy5zdGF0dXMuY2hhbmdlZDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgcmVzZXRTdGF0dXNlczogZnVuY3Rpb24gKHN0YXR1c2VzKSB7XG4gICAgZm9yIChjb25zdCBtb2RpZmllck5hbWUgb2YgbW9kaWZpZXJzLm5hbWVzKSB7XG4gICAgICBjb25zdCBzdGF0dXMgPSBzdGF0dXNlc1ttb2RpZmllck5hbWVdIHx8IHt9O1xuXG4gICAgICBzdGF0dXMuZHggPSBzdGF0dXMuZHkgPSAwO1xuICAgICAgc3RhdHVzLm1vZGlmaWVkWCA9IHN0YXR1cy5tb2RpZmllZFkgPSBOYU47XG4gICAgICBzdGF0dXMubG9ja2VkID0gZmFsc2U7XG4gICAgICBzdGF0dXMuY2hhbmdlZCA9IHRydWU7XG5cbiAgICAgIHN0YXR1c2VzW21vZGlmaWVyTmFtZV0gPSBzdGF0dXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXR1c2VzO1xuICB9LFxuXG4gIHN0YXJ0OiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9LCBzaWduYWxOYW1lKSB7XG4gICAgY29uc3QgYXJnID0ge1xuICAgICAgaW50ZXJhY3Rpb24sXG4gICAgICBwYWdlQ29vcmRzOiAoc2lnbmFsTmFtZSA9PT0gJ2FjdGlvbi1yZXN1bWUnID9cbiAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5jdXJDb29yZHMgOiBpbnRlcmFjdGlvbi5zdGFydENvb3JkcykucGFnZSxcbiAgICAgIHN0YXJ0T2Zmc2V0OiBpbnRlcmFjdGlvbi5zdGFydE9mZnNldCxcbiAgICAgIHN0YXR1c2VzOiBpbnRlcmFjdGlvbi5tb2RpZmllclN0YXR1c2VzLFxuICAgICAgcHJlRW5kOiBmYWxzZSxcbiAgICAgIHJlcXVpcmVFbmRPbmx5OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgbW9kaWZpZXJzLnNldE9mZnNldHMoYXJnKTtcbiAgICBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyhhcmcuc3RhdHVzZXMpO1xuXG4gICAgYXJnLnBhZ2VDb29yZHMgPSBleHRlbmQoe30sIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UpO1xuICAgIGludGVyYWN0aW9uLm1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbChhcmcpO1xuICB9LFxuXG4gIGJlZm9yZU1vdmU6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwcmVFbmQsIGludGVyYWN0aW5nQmVmb3JlTW92ZSB9KSB7XG4gICAgY29uc3QgbW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllcnMuc2V0QWxsKHtcbiAgICAgIGludGVyYWN0aW9uLFxuICAgICAgcHJlRW5kLFxuICAgICAgcGFnZUNvb3JkczogaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UsXG4gICAgICBzdGF0dXNlczogaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlcyxcbiAgICAgIHJlcXVpcmVFbmRPbmx5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIC8vIGRvbid0IGZpcmUgYW4gYWN0aW9uIG1vdmUgaWYgYSBtb2RpZmllciB3b3VsZCBrZWVwIHRoZSBldmVudCBpbiB0aGUgc2FtZVxuICAgIC8vIGNvcmRpbmF0ZXMgYXMgYmVmb3JlXG4gICAgaWYgKCFtb2RpZmllclJlc3VsdC5zaG91bGRNb3ZlICYmIGludGVyYWN0aW5nQmVmb3JlTW92ZSkge1xuICAgICAgaW50ZXJhY3Rpb24uX2RvbnRGaXJlTW92ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaW50ZXJhY3Rpb24ubW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllclJlc3VsdDtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBldmVudCB9KSB7XG4gICAgZm9yIChjb25zdCBtb2RpZmllck5hbWUgb2YgbW9kaWZpZXJzLm5hbWVzKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV1bbW9kaWZpZXJOYW1lXTtcblxuICAgICAgLy8gaWYgdGhlIGVuZE9ubHkgb3B0aW9uIGlzIHRydWUgZm9yIGFueSBtb2RpZmllclxuICAgICAgaWYgKHNob3VsZERvKG9wdGlvbnMsIHRydWUsIHRydWUpKSB7XG4gICAgICAgIC8vIGZpcmUgYSBtb3ZlIGV2ZW50IGF0IHRoZSBtb2RpZmllZCBjb29yZGluYXRlc1xuICAgICAgICBpbnRlcmFjdGlvbi5kb01vdmUoeyBldmVudCwgcHJlRW5kOiB0cnVlIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2V0WFk6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBjb25zdCB7IGlFdmVudCwgaW50ZXJhY3Rpb24gfSA9IGFyZztcbiAgICBjb25zdCBtb2RpZmllckFyZyA9IGV4dGVuZCh7fSwgYXJnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kaWZpZXJzLm5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtb2RpZmllck5hbWUgPSBtb2RpZmllcnMubmFtZXNbaV07XG4gICAgICBtb2RpZmllckFyZy5vcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV1bbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaWYgKCFtb2RpZmllckFyZy5vcHRpb25zKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtb2RpZmllciA9IG1vZGlmaWVyc1ttb2RpZmllck5hbWVdO1xuXG4gICAgICBtb2RpZmllckFyZy5zdGF0dXMgPSBpbnRlcmFjdGlvbi5tb2RpZmllclN0YXR1c2VzW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIGlFdmVudFttb2RpZmllck5hbWVdID0gbW9kaWZpZXIubW9kaWZ5Q29vcmRzKG1vZGlmaWVyQXJnKTtcbiAgICB9XG4gIH0sXG59O1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uc3RhcnRPZmZzZXQgICAgICA9IHsgbGVmdDogMCwgcmlnaHQ6IDAsIHRvcDogMCwgYm90dG9tOiAwIH07XG4gIGludGVyYWN0aW9uLm1vZGlmaWVyT2Zmc2V0cyAgPSB7fTtcbiAgaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlcyA9IG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKHt9KTtcbiAgaW50ZXJhY3Rpb24ubW9kaWZpZXJSZXN1bHQgICA9IG51bGw7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLXN0YXJ0JyAsIG1vZGlmaWVycy5zdGFydCk7XG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tcmVzdW1lJywgbW9kaWZpZXJzLnN0YXJ0KTtcbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2JlZm9yZS1hY3Rpb24tbW92ZScsIG1vZGlmaWVycy5iZWZvcmVNb3ZlKTtcbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1lbmQnLCBtb2RpZmllcnMuZW5kKTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCdzZXQteHknLCBtb2RpZmllcnMuc2V0WFkpO1xuXG5mdW5jdGlvbiBzaG91bGREbyAob3B0aW9ucywgcHJlRW5kLCByZXF1aXJlRW5kT25seSkge1xuICByZXR1cm4gKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVkXG4gICAgICAgICAgJiYgKHByZUVuZCB8fCAhb3B0aW9ucy5lbmRPbmx5KVxuICAgICAgICAgICYmICghcmVxdWlyZUVuZE9ubHkgfHwgb3B0aW9ucy5lbmRPbmx5KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kaWZpZXJzO1xuIiwicmVxdWlyZSgnLi9iYXNlJykuc2V0QWN0aW9uRGVmYXVsdHMocmVxdWlyZSgnLi4vYWN0aW9ucy9yZXNpemUnKSk7XG4iLCJjb25zdCBhdXRvU3RhcnQgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuXG5hdXRvU3RhcnQuZGVmYXVsdHMucGVyQWN0aW9uLmhvbGQgPSAwO1xuYXV0b1N0YXJ0LmRlZmF1bHRzLnBlckFjdGlvbi5kZWxheSA9IDA7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5hdXRvU3RhcnRIb2xkVGltZXIgPSBudWxsO1xufSk7XG5cbmF1dG9TdGFydC5zaWduYWxzLm9uKCdwcmVwYXJlZCcsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgY29uc3QgaG9sZCA9IGdldEhvbGREdXJhdGlvbihpbnRlcmFjdGlvbik7XG5cbiAgaWYgKGhvbGQgPiAwKSB7XG4gICAgaW50ZXJhY3Rpb24uYXV0b1N0YXJ0SG9sZFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbnRlcmFjdGlvbi5zdGFydChpbnRlcmFjdGlvbi5wcmVwYXJlZCwgaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgICB9LCBob2xkKTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZHVwbGljYXRlIH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCAmJiAhZHVwbGljYXRlKSB7XG4gICAgY2xlYXJUaW1lb3V0KGludGVyYWN0aW9uLmF1dG9TdGFydEhvbGRUaW1lcik7XG4gIH1cbn0pO1xuXG4vLyBwcmV2ZW50IHJlZ3VsYXIgZG93bi0+bW92ZSBhdXRvU3RhcnRcbmF1dG9TdGFydC5zaWduYWxzLm9uKCdiZWZvcmUtc3RhcnQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiB9KSB7XG4gIGNvbnN0IGhvbGQgPSBnZXRIb2xkRHVyYXRpb24oaW50ZXJhY3Rpb24pO1xuXG4gIGlmIChob2xkID4gMCkge1xuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPSBudWxsO1xuICB9XG59KTtcblxuZnVuY3Rpb24gZ2V0SG9sZER1cmF0aW9uIChpbnRlcmFjdGlvbikge1xuICBjb25zdCBhY3Rpb25OYW1lID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQgJiYgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZTtcblxuICBpZiAoIWFjdGlvbk5hbWUpIHsgcmV0dXJuIG51bGw7IH1cblxuICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnM7XG5cbiAgcmV0dXJuIG9wdGlvbnNbYWN0aW9uTmFtZV0uaG9sZCB8fCBvcHRpb25zW2FjdGlvbk5hbWVdLmRlbGF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SG9sZER1cmF0aW9uLFxufTtcbiIsInJlcXVpcmUoJy4vYmFzZScpLnNldEFjdGlvbkRlZmF1bHRzKHJlcXVpcmUoJy4uL2FjdGlvbnMvZ2VzdHVyZScpKTtcbiIsImNvbnN0IGF1dG9TdGFydCA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3Qgc2NvcGUgICAgID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbmNvbnN0IGlzICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzJyk7XG5cbmNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvZG9tVXRpbHMnKTtcblxuYXV0b1N0YXJ0LnNldEFjdGlvbkRlZmF1bHRzKHJlcXVpcmUoJy4uL2FjdGlvbnMvZHJhZycpKTtcblxuYXV0b1N0YXJ0LnNpZ25hbHMub24oJ2JlZm9yZS1zdGFydCcsICBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnRUYXJnZXQsIGR4LCBkeSB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICE9PSAnZHJhZycpIHsgcmV0dXJuOyB9XG5cbiAgLy8gY2hlY2sgaWYgYSBkcmFnIGlzIGluIHRoZSBjb3JyZWN0IGF4aXNcbiAgY29uc3QgYWJzWCA9IE1hdGguYWJzKGR4KTtcbiAgY29uc3QgYWJzWSA9IE1hdGguYWJzKGR5KTtcbiAgY29uc3QgdGFyZ2V0T3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLmRyYWc7XG4gIGNvbnN0IHN0YXJ0QXhpcyA9IHRhcmdldE9wdGlvbnMuc3RhcnRBeGlzO1xuICBjb25zdCBjdXJyZW50QXhpcyA9IChhYnNYID4gYWJzWSA/ICd4JyA6IGFic1ggPCBhYnNZID8gJ3knIDogJ3h5Jyk7XG5cbiAgaW50ZXJhY3Rpb24ucHJlcGFyZWQuYXhpcyA9IHRhcmdldE9wdGlvbnMubG9ja0F4aXMgPT09ICdzdGFydCdcbiAgICA/IGN1cnJlbnRBeGlzWzBdIC8vIGFsd2F5cyBsb2NrIHRvIG9uZSBheGlzIGV2ZW4gaWYgY3VycmVudEF4aXMgPT09ICd4eSdcbiAgICA6IHRhcmdldE9wdGlvbnMubG9ja0F4aXM7XG5cbiAgLy8gaWYgdGhlIG1vdmVtZW50IGlzbid0IGluIHRoZSBzdGFydEF4aXMgb2YgdGhlIGludGVyYWN0YWJsZVxuICBpZiAoY3VycmVudEF4aXMgIT09ICd4eScgJiYgc3RhcnRBeGlzICE9PSAneHknICYmIHN0YXJ0QXhpcyAhPT0gY3VycmVudEF4aXMpIHtcbiAgICAvLyBjYW5jZWwgdGhlIHByZXBhcmVkIGFjdGlvblxuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPSBudWxsO1xuXG4gICAgLy8gdGhlbiB0cnkgdG8gZ2V0IGEgZHJhZyBmcm9tIGFub3RoZXIgaW5lcmFjdGFibGVcbiAgICBsZXQgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gICAgY29uc3QgZ2V0RHJhZ2dhYmxlID0gZnVuY3Rpb24gKGludGVyYWN0YWJsZSkge1xuICAgICAgaWYgKGludGVyYWN0YWJsZSA9PT0gaW50ZXJhY3Rpb24udGFyZ2V0KSB7IHJldHVybjsgfVxuXG4gICAgICBjb25zdCBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMuZHJhZztcblxuICAgICAgaWYgKCFvcHRpb25zLm1hbnVhbFN0YXJ0XG4gICAgICAgICAgJiYgaW50ZXJhY3RhYmxlLnRlc3RJZ25vcmVBbGxvdyhvcHRpb25zLCBlbGVtZW50LCBldmVudFRhcmdldCkpIHtcblxuICAgICAgICBjb25zdCBhY3Rpb24gPSBpbnRlcmFjdGFibGUuZ2V0QWN0aW9uKFxuICAgICAgICAgIGludGVyYWN0aW9uLmRvd25Qb2ludGVyLCBpbnRlcmFjdGlvbi5kb3duRXZlbnQsIGludGVyYWN0aW9uLCBlbGVtZW50KTtcblxuICAgICAgICBpZiAoYWN0aW9uXG4gICAgICAgICAgICAmJiBhY3Rpb24ubmFtZSA9PT0gJ2RyYWcnXG4gICAgICAgICAgICAmJiBjaGVja1N0YXJ0QXhpcyhjdXJyZW50QXhpcywgaW50ZXJhY3RhYmxlKVxuICAgICAgICAgICAgJiYgYXV0b1N0YXJ0LnZhbGlkYXRlQWN0aW9uKGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBldmVudFRhcmdldCkpIHtcblxuICAgICAgICAgIHJldHVybiBpbnRlcmFjdGFibGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gY2hlY2sgYWxsIGludGVyYWN0YWJsZXNcbiAgICB3aGlsZSAoaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgICAgY29uc3QgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2goZWxlbWVudCwgZ2V0RHJhZ2dhYmxlKTtcblxuICAgICAgaWYgKGludGVyYWN0YWJsZSkge1xuICAgICAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lID0gJ2RyYWcnO1xuICAgICAgICBpbnRlcmFjdGlvbi50YXJnZXQgPSBpbnRlcmFjdGFibGU7XG4gICAgICAgIGludGVyYWN0aW9uLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9IHBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gY2hlY2tTdGFydEF4aXMgKHN0YXJ0QXhpcywgaW50ZXJhY3RhYmxlKSB7XG4gIGlmICghaW50ZXJhY3RhYmxlKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IHRoaXNBeGlzID0gaW50ZXJhY3RhYmxlLm9wdGlvbnMuZHJhZy5zdGFydEF4aXM7XG5cbiAgcmV0dXJuIChzdGFydEF4aXMgPT09ICd4eScgfHwgdGhpc0F4aXMgPT09ICd4eScgfHwgdGhpc0F4aXMgPT09IHN0YXJ0QXhpcyk7XG59XG4iLCJjb25zdCBpbnRlcmFjdCAgICAgICA9IHJlcXVpcmUoJy4uL2ludGVyYWN0Jyk7XG5jb25zdCBJbnRlcmFjdGFibGUgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgYWN0aW9ucyAgICAgICAgPSByZXF1aXJlKCcuLi9hY3Rpb25zL2Jhc2UnKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbmNvbnN0IHNjb3BlICAgICAgICAgID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbmNvbnN0IHV0aWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IHNpZ25hbHMgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG5yZXF1aXJlKCcuL0ludGVyYWN0YWJsZU1ldGhvZHMnKTtcblxuY29uc3QgYXV0b1N0YXJ0ID0ge1xuICBzaWduYWxzLFxuICB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0LFxuICAvLyBBbGxvdyB0aGlzIG1hbnkgaW50ZXJhY3Rpb25zIHRvIGhhcHBlbiBzaW11bHRhbmVvdXNseVxuICBtYXhJbnRlcmFjdGlvbnM6IEluZmluaXR5LFxuICBkZWZhdWx0czoge1xuICAgIHBlckFjdGlvbjoge1xuICAgICAgbWFudWFsU3RhcnQ6IGZhbHNlLFxuICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgIG1heFBlckVsZW1lbnQ6IDEsXG4gICAgICBhbGxvd0Zyb206ICBudWxsLFxuICAgICAgaWdub3JlRnJvbTogbnVsbCxcblxuICAgICAgLy8gb25seSBhbGxvdyBsZWZ0IGJ1dHRvbiBieSBkZWZhdWx0XG4gICAgICAvLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvYnV0dG9ucyNSZXR1cm5fdmFsdWVcbiAgICAgIG1vdXNlQnV0dG9uczogMSxcbiAgICB9LFxuICB9LFxuICBzZXRBY3Rpb25EZWZhdWx0czogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgIHV0aWxzLmV4dGVuZChhY3Rpb24uZGVmYXVsdHMsIGF1dG9TdGFydC5kZWZhdWx0cy5wZXJBY3Rpb24pO1xuICB9LFxuICB2YWxpZGF0ZUFjdGlvbixcbn07XG5cbi8vIHNldCBjdXJzb3Igc3R5bGUgb24gbW91c2Vkb3duXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdkb3duJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCB9KSB7XG4gIGlmIChpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IGFjdGlvbkluZm8gPSBnZXRBY3Rpb25JbmZvKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpO1xuICBwcmVwYXJlKGludGVyYWN0aW9uLCBhY3Rpb25JbmZvKTtcbn0pO1xuXG4vLyBzZXQgY3Vyc29yIHN0eWxlIG9uIG1vdXNlbW92ZVxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbW92ZScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQgfSkge1xuICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUgIT09ICdtb3VzZSdcbiAgICAgIHx8IGludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd25cbiAgICAgIHx8IGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgYWN0aW9uSW5mbyA9IGdldEFjdGlvbkluZm8oaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCk7XG4gIHByZXBhcmUoaW50ZXJhY3Rpb24sIGFjdGlvbkluZm8pO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoYXJnKSB7XG4gIGNvbnN0IHsgaW50ZXJhY3Rpb24sIGV2ZW50IH0gPSBhcmc7XG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duXG4gICAgICB8fCBpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpXG4gICAgICB8fCAhaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkXG4gICAgICB8fCAhaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNpZ25hbHMuZmlyZSgnYmVmb3JlLXN0YXJ0JywgYXJnKTtcblxuICBjb25zdCB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG5cbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgJiYgdGFyZ2V0KSB7XG4gICAgLy8gY2hlY2sgbWFudWFsU3RhcnQgYW5kIGludGVyYWN0aW9uIGxpbWl0XG4gICAgaWYgKHRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLm1hbnVhbFN0YXJ0XG4gICAgICAgIHx8ICF3aXRoaW5JbnRlcmFjdGlvbkxpbWl0KHRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQpKSB7XG4gICAgICBpbnRlcmFjdGlvbi5zdG9wKGV2ZW50KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpbnRlcmFjdGlvbi5zdGFydChpbnRlcmFjdGlvbi5wcmVwYXJlZCwgdGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBDaGVjayBpZiB0aGUgY3VycmVudCB0YXJnZXQgc3VwcG9ydHMgdGhlIGFjdGlvbi5cbi8vIElmIHNvLCByZXR1cm4gdGhlIHZhbGlkYXRlZCBhY3Rpb24uIE90aGVyd2lzZSwgcmV0dXJuIG51bGxcbmZ1bmN0aW9uIHZhbGlkYXRlQWN0aW9uIChhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpIHtcbiAgaWYgKHV0aWxzLmlzLm9iamVjdChhY3Rpb24pXG4gICAgICAmJiBpbnRlcmFjdGFibGUudGVzdElnbm9yZUFsbG93KGludGVyYWN0YWJsZS5vcHRpb25zW2FjdGlvbi5uYW1lXSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpXG4gICAgICAmJiBpbnRlcmFjdGFibGUub3B0aW9uc1thY3Rpb24ubmFtZV0uZW5hYmxlZFxuICAgICAgJiYgd2l0aGluSW50ZXJhY3Rpb25MaW1pdChpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGFjdGlvbikpIHtcbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlU2VsZWN0b3IgKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgbWF0Y2hlcywgbWF0Y2hFbGVtZW50cywgZXZlbnRUYXJnZXQpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG1hdGNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBtYXRjaCA9IG1hdGNoZXNbaV07XG4gICAgY29uc3QgbWF0Y2hFbGVtZW50ID0gbWF0Y2hFbGVtZW50c1tpXTtcbiAgICBjb25zdCBhY3Rpb24gPSB2YWxpZGF0ZUFjdGlvbihtYXRjaC5nZXRBY3Rpb24ocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBtYXRjaEVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRhcmdldCk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY3Rpb24sXG4gICAgICAgIHRhcmdldDogbWF0Y2gsXG4gICAgICAgIGVsZW1lbnQ6IG1hdGNoRWxlbWVudCxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBnZXRBY3Rpb25JbmZvIChpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gIGxldCBtYXRjaGVzID0gW107XG4gIGxldCBtYXRjaEVsZW1lbnRzID0gW107XG5cbiAgbGV0IGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICBmdW5jdGlvbiBwdXNoTWF0Y2hlcyAoaW50ZXJhY3RhYmxlKSB7XG4gICAgbWF0Y2hlcy5wdXNoKGludGVyYWN0YWJsZSk7XG4gICAgbWF0Y2hFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICB9XG5cbiAgd2hpbGUgKHV0aWxzLmlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBtYXRjaGVzID0gW107XG4gICAgbWF0Y2hFbGVtZW50cyA9IFtdO1xuXG4gICAgc2NvcGUuaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2goZWxlbWVudCwgcHVzaE1hdGNoZXMpO1xuXG4gICAgY29uc3QgYWN0aW9uSW5mbyA9IHZhbGlkYXRlU2VsZWN0b3IoaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBtYXRjaGVzLCBtYXRjaEVsZW1lbnRzLCBldmVudFRhcmdldCk7XG5cbiAgICBpZiAoYWN0aW9uSW5mby5hY3Rpb25cbiAgICAgICYmICFhY3Rpb25JbmZvLnRhcmdldC5vcHRpb25zW2FjdGlvbkluZm8uYWN0aW9uLm5hbWVdLm1hbnVhbFN0YXJ0KSB7XG4gICAgICByZXR1cm4gYWN0aW9uSW5mbztcbiAgICB9XG5cbiAgICBlbGVtZW50ID0gdXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZSAoaW50ZXJhY3Rpb24sIHsgYWN0aW9uLCB0YXJnZXQsIGVsZW1lbnQgfSkge1xuICBhY3Rpb24gPSBhY3Rpb24gfHwge307XG5cbiAgaWYgKGludGVyYWN0aW9uLnRhcmdldCAmJiBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgIGludGVyYWN0aW9uLnRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgfVxuXG4gIGludGVyYWN0aW9uLnRhcmdldCA9IHRhcmdldDtcbiAgaW50ZXJhY3Rpb24uZWxlbWVudCA9IGVsZW1lbnQ7XG4gIHV0aWxzLmNvcHlBY3Rpb24oaW50ZXJhY3Rpb24ucHJlcGFyZWQsIGFjdGlvbik7XG5cbiAgaWYgKHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgIGNvbnN0IGN1cnNvciA9IGFjdGlvbj8gYWN0aW9uc1thY3Rpb24ubmFtZV0uZ2V0Q3Vyc29yKGFjdGlvbikgOiAnJztcbiAgICBpbnRlcmFjdGlvbi50YXJnZXQuX2RvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gY3Vyc29yO1xuICB9XG5cbiAgc2lnbmFscy5maXJlKCdwcmVwYXJlZCcsIHsgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uIH0pO1xufVxuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBjb25zdCB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG5cbiAgaWYgKHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgIHRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHdpdGhpbkludGVyYWN0aW9uTGltaXQgKGludGVyYWN0YWJsZSwgZWxlbWVudCwgYWN0aW9uKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcbiAgY29uc3QgbWF4QWN0aW9ucyA9IG9wdGlvbnNbYWN0aW9uLm5hbWVdLm1heDtcbiAgY29uc3QgbWF4UGVyRWxlbWVudCA9IG9wdGlvbnNbYWN0aW9uLm5hbWVdLm1heFBlckVsZW1lbnQ7XG4gIGxldCBhY3RpdmVJbnRlcmFjdGlvbnMgPSAwO1xuICBsZXQgdGFyZ2V0Q291bnQgPSAwO1xuICBsZXQgdGFyZ2V0RWxlbWVudENvdW50ID0gMDtcblxuICAvLyBubyBhY3Rpb25zIGlmIGFueSBvZiB0aGVzZSB2YWx1ZXMgPT0gMFxuICBpZiAoIShtYXhBY3Rpb25zICYmIG1heFBlckVsZW1lbnQgJiYgYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucykpIHsgcmV0dXJuOyB9XG5cbiAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcbiAgICBjb25zdCBvdGhlckFjdGlvbiA9IGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWU7XG5cbiAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHsgY29udGludWU7IH1cblxuICAgIGFjdGl2ZUludGVyYWN0aW9ucysrO1xuXG4gICAgaWYgKGFjdGl2ZUludGVyYWN0aW9ucyA+PSBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGludGVyYWN0aW9uLnRhcmdldCAhPT0gaW50ZXJhY3RhYmxlKSB7IGNvbnRpbnVlOyB9XG5cbiAgICB0YXJnZXRDb3VudCArPSAob3RoZXJBY3Rpb24gPT09IGFjdGlvbi5uYW1lKXwwO1xuXG4gICAgaWYgKHRhcmdldENvdW50ID49IG1heEFjdGlvbnMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24uZWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgdGFyZ2V0RWxlbWVudENvdW50Kys7XG5cbiAgICAgIGlmIChvdGhlckFjdGlvbiAhPT0gYWN0aW9uLm5hbWUgfHwgdGFyZ2V0RWxlbWVudENvdW50ID49IG1heFBlckVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zID4gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGNvbmN1cnJlbnQgaW50ZXJhY3Rpb25zIGFsbG93ZWQuICBCeVxuICogZGVmYXVsdCBvbmx5IDEgaW50ZXJhY3Rpb24gaXMgYWxsb3dlZCBhdCBhIHRpbWUgKGZvciBiYWNrd2FyZHNcbiAqIGNvbXBhdGliaWxpdHkpLiBUbyBhbGxvdyBtdWx0aXBsZSBpbnRlcmFjdGlvbnMgb24gdGhlIHNhbWUgSW50ZXJhY3RhYmxlcyBhbmRcbiAqIGVsZW1lbnRzLCB5b3UgbmVlZCB0byBlbmFibGUgaXQgaW4gdGhlIGRyYWdnYWJsZSwgcmVzaXphYmxlIGFuZCBnZXN0dXJhYmxlXG4gKiBgJ21heCdgIGFuZCBgJ21heFBlckVsZW1lbnQnYCBvcHRpb25zLlxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtuZXdWYWx1ZV0gQW55IG51bWJlci4gbmV3VmFsdWUgPD0gMCBtZWFucyBubyBpbnRlcmFjdGlvbnMuXG4gKi9cbmludGVyYWN0Lm1heEludGVyYWN0aW9ucyA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAodXRpbHMuaXMubnVtYmVyKG5ld1ZhbHVlKSkge1xuICAgIGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnMgPSBuZXdWYWx1ZTtcblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIHJldHVybiBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zO1xufTtcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdzdHlsZUN1cnNvcicpO1xuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdhY3Rpb25DaGVja2VyJyk7XG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ2lnbm9yZUZyb20nKTtcbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnYWxsb3dGcm9tJyk7XG5cbmRlZmF1bHRPcHRpb25zLmJhc2UuYWN0aW9uQ2hlY2tlciA9IG51bGw7XG5kZWZhdWx0T3B0aW9ucy5iYXNlLnN0eWxlQ3Vyc29yID0gdHJ1ZTtcblxudXRpbHMuZXh0ZW5kKGRlZmF1bHRPcHRpb25zLnBlckFjdGlvbiwgYXV0b1N0YXJ0LmRlZmF1bHRzLnBlckFjdGlvbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXV0b1N0YXJ0O1xuIiwiLyoqIEBsZW5kcyBJbnRlcmFjdGFibGUgKi9cbmNvbnN0IEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xuY29uc3QgYWN0aW9ucyAgICAgID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9iYXNlJyk7XG5jb25zdCBpcyAgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9pcycpO1xuY29uc3QgZG9tVXRpbHMgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvZG9tVXRpbHMnKTtcblxuY29uc3QgeyB3YXJuT25jZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5nZXRBY3Rpb24gPSBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBlbGVtZW50KSB7XG4gIGNvbnN0IGFjdGlvbiA9IHRoaXMuZGVmYXVsdEFjdGlvbkNoZWNrZXIocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBlbGVtZW50KTtcblxuICBpZiAodGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIocG9pbnRlciwgZXZlbnQsIGFjdGlvbiwgdGhpcywgZWxlbWVudCwgaW50ZXJhY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGFjdGlvbjtcbn07XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KGVsZW1lbnQsIHsgaWdub3JlRnJvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vLWFjdGlvbicpIH0pO1xuICogLy8gb3JcbiAqIGludGVyYWN0KGVsZW1lbnQpLmlnbm9yZUZyb20oJ2lucHV0LCB0ZXh0YXJlYSwgYScpO1xuICogYGBgXG4gKiBAZGVwcmVjYXRlZFxuICogSWYgdGhlIHRhcmdldCBvZiB0aGUgYG1vdXNlZG93bmAsIGBwb2ludGVyZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50IG9yIGFueVxuICogb2YgaXQncyBwYXJlbnRzIG1hdGNoIHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3Igb3IgRWxlbWVudCwgbm9cbiAqIGRyYWcvcmVzaXplL2dlc3R1cmUgaXMgc3RhcnRlZC5cbiAqXG4gKiBEb24ndCB1c2UgdGhpcyBtZXRob2QuIEluc3RlYWQgc2V0IHRoZSBgaWdub3JlRnJvbWAgb3B0aW9uIGZvciBlYWNoIGFjdGlvblxuICogb3IgZm9yIGBwb2ludGVyRXZlbnRzYFxuICpcbiAqIEBleGFtcGxlXG4gKiBpbnRlcmFjdCh0YXJnZXR0KVxuICogICAuZHJhZ2dhYmxlKHtcbiAqICAgICBpZ25vcmVGcm9tOiAnaW5wdXQsIHRleHRhcmVhLCBhW2hyZWZdJycsXG4gKiAgIH0pXG4gKiAgIC5wb2ludGVyRXZlbnRzKHtcbiAqICAgICBpZ25vcmVGcm9tOiAnW25vLXBvaW50ZXJdJyxcbiAqICAgfSk7XG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBFbGVtZW50IHwgbnVsbH0gW25ld1ZhbHVlXSBhIENTUyBzZWxlY3RvciBzdHJpbmcsIGFuXG4gKiBFbGVtZW50IG9yIGBudWxsYCB0byBub3QgaWdub3JlIGFueSBlbGVtZW50c1xuICogQHJldHVybiB7c3RyaW5nIHwgRWxlbWVudCB8IG9iamVjdH0gVGhlIGN1cnJlbnQgaWdub3JlRnJvbSB2YWx1ZSBvciB0aGlzXG4gKiBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5pZ25vcmVGcm9tID0gd2Fybk9uY2UoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9iYWNrQ29tcGF0T3B0aW9uKCdpZ25vcmVGcm9tJywgbmV3VmFsdWUpO1xufSwgJ0ludGVyYWN0YWJsZS5pZ25vcmVGb3JtKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIEludGVyYWN0YmxlLmRyYWdnYWJsZSh7aWdub3JlRnJvbTogbmV3VmFsdWV9KS4nKTtcblxuLyoqXG4gKiBgYGBqc1xuICpcbiAqIEBkZXByZWNhdGVkXG4gKiBBIGRyYWcvcmVzaXplL2dlc3R1cmUgaXMgc3RhcnRlZCBvbmx5IElmIHRoZSB0YXJnZXQgb2YgdGhlIGBtb3VzZWRvd25gLFxuICogYHBvaW50ZXJkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQgb3IgYW55IG9mIGl0J3MgcGFyZW50cyBtYXRjaCB0aGUgZ2l2ZW5cbiAqIENTUyBzZWxlY3RvciBvciBFbGVtZW50LlxuICpcbiAqIERvbid0IHVzZSB0aGlzIG1ldGhvZC4gSW5zdGVhZCBzZXQgdGhlIGBhbGxvd0Zyb21gIG9wdGlvbiBmb3IgZWFjaCBhY3Rpb25cbiAqIG9yIGZvciBgcG9pbnRlckV2ZW50c2BcbiAqXG4gKiBAZXhhbXBsZVxuICogaW50ZXJhY3QodGFyZ2V0dClcbiAqICAgLnJlc2l6YWJsZSh7XG4gKiAgICAgYWxsb3dGcm9tOiAnLnJlc2l6ZS1oYW5kbGUnLFxuICogICAucG9pbnRlckV2ZW50cyh7XG4gKiAgICAgYWxsb3dGcm9tOiAnLmhhbmRsZScsLFxuICogICB9KTtcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IEVsZW1lbnQgfCBudWxsfSBbbmV3VmFsdWVdIGEgQ1NTIHNlbGVjdG9yIHN0cmluZywgYW5cbiAqIEVsZW1lbnQgb3IgYG51bGxgIHRvIGFsbG93IGZyb20gYW55IGVsZW1lbnRcbiAqIEByZXR1cm4ge3N0cmluZyB8IEVsZW1lbnQgfCBvYmplY3R9IFRoZSBjdXJyZW50IGFsbG93RnJvbSB2YWx1ZSBvciB0aGlzXG4gKiBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5hbGxvd0Zyb20gPSB3YXJuT25jZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX2JhY2tDb21wYXRPcHRpb24oJ2FsbG93RnJvbScsIG5ld1ZhbHVlKTtcbn0sICdJbnRlcmFjdGFibGUuYWxsb3dGb3JtKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIEludGVyYWN0YmxlLmRyYWdnYWJsZSh7YWxsb3dGcm9tOiBuZXdWYWx1ZX0pLicpO1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RJZ25vcmUgPSBmdW5jdGlvbiAoaWdub3JlRnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZWxlbWVudCkge1xuICBpZiAoIWlnbm9yZUZyb20gfHwgIWlzLmVsZW1lbnQoZWxlbWVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKGlzLnN0cmluZyhpZ25vcmVGcm9tKSkge1xuICAgIHJldHVybiBkb21VdGlscy5tYXRjaGVzVXBUbyhlbGVtZW50LCBpZ25vcmVGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50KTtcbiAgfVxuICBlbHNlIGlmIChpcy5lbGVtZW50KGlnbm9yZUZyb20pKSB7XG4gICAgcmV0dXJuIGRvbVV0aWxzLm5vZGVDb250YWlucyhpZ25vcmVGcm9tLCBlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUudGVzdEFsbG93ID0gZnVuY3Rpb24gKGFsbG93RnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZWxlbWVudCkge1xuICBpZiAoIWFsbG93RnJvbSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGlmICghaXMuZWxlbWVudChlbGVtZW50KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBpZiAoaXMuc3RyaW5nKGFsbG93RnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubWF0Y2hlc1VwVG8oZWxlbWVudCwgYWxsb3dGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50KTtcbiAgfVxuICBlbHNlIGlmIChpcy5lbGVtZW50KGFsbG93RnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubm9kZUNvbnRhaW5zKGFsbG93RnJvbSwgZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RJZ25vcmVBbGxvdyA9IGZ1bmN0aW9uIChvcHRpb25zLCBpbnRlcmFjdGFibGVFbGVtZW50LCBldmVudFRhcmdldCkge1xuICByZXR1cm4gKCF0aGlzLnRlc3RJZ25vcmUob3B0aW9ucy5pZ25vcmVGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50LCBldmVudFRhcmdldClcbiAgICAmJiB0aGlzLnRlc3RBbGxvdyhvcHRpb25zLmFsbG93RnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZXZlbnRUYXJnZXQpKTtcbn07XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KCcucmVzaXplLWRyYWcnKVxuICogICAucmVzaXphYmxlKHRydWUpXG4gKiAgIC5kcmFnZ2FibGUodHJ1ZSlcbiAqICAgLmFjdGlvbkNoZWNrZXIoZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCwgaW50ZXJhY3Rpb24pIHtcbiAqXG4gKiAgIGlmIChpbnRlcmFjdC5tYXRjaGVzU2VsZWN0b3IoZXZlbnQudGFyZ2V0LCAnLmRyYWctaGFuZGxlJykge1xuICogICAgIC8vIGZvcmNlIGRyYWcgd2l0aCBoYW5kbGUgdGFyZ2V0XG4gKiAgICAgYWN0aW9uLm5hbWUgPSBkcmFnO1xuICogICB9XG4gKiAgIGVsc2Uge1xuICogICAgIC8vIHJlc2l6ZSBmcm9tIHRoZSB0b3AgYW5kIHJpZ2h0IGVkZ2VzXG4gKiAgICAgYWN0aW9uLm5hbWUgID0gJ3Jlc2l6ZSc7XG4gKiAgICAgYWN0aW9uLmVkZ2VzID0geyB0b3A6IHRydWUsIHJpZ2h0OiB0cnVlIH07XG4gKiAgIH1cbiAqXG4gKiAgIHJldHVybiBhY3Rpb247XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEdldHMgb3Igc2V0cyB0aGUgZnVuY3Rpb24gdXNlZCB0byBjaGVjayBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIG9uXG4gKiBwb2ludGVyRG93blxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24gfCBudWxsfSBbY2hlY2tlcl0gQSBmdW5jdGlvbiB3aGljaCB0YWtlcyBhIHBvaW50ZXIgZXZlbnQsXG4gKiBkZWZhdWx0QWN0aW9uIHN0cmluZywgaW50ZXJhY3RhYmxlLCBlbGVtZW50IGFuZCBpbnRlcmFjdGlvbiBhcyBwYXJhbWV0ZXJzXG4gKiBhbmQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBuYW1lIHByb3BlcnR5ICdkcmFnJyAncmVzaXplJyBvciAnZ2VzdHVyZScgYW5kXG4gKiBvcHRpb25hbGx5IGFuIGBlZGdlc2Agb2JqZWN0IHdpdGggYm9vbGVhbiAndG9wJywgJ2xlZnQnLCAnYm90dG9tJyBhbmQgcmlnaHRcbiAqIHByb3BzLlxuICogQHJldHVybiB7RnVuY3Rpb24gfCBJbnRlcmFjdGFibGV9IFRoZSBjaGVja2VyIGZ1bmN0aW9uIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuYWN0aW9uQ2hlY2tlciA9IGZ1bmN0aW9uIChjaGVja2VyKSB7XG4gIGlmIChpcy5mdW5jdGlvbihjaGVja2VyKSkge1xuICAgIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyID0gY2hlY2tlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKGNoZWNrZXIgPT09IG51bGwpIHtcbiAgICBkZWxldGUgdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcjtcbn07XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgdGhlIHRoZSBjdXJzb3Igc2hvdWxkIGJlIGNoYW5nZWQgZGVwZW5kaW5nIG9uIHRoZVxuICogYWN0aW9uIHRoYXQgd291bGQgYmUgcGVyZm9ybWVkIGlmIHRoZSBtb3VzZSB3ZXJlIHByZXNzZWQgYW5kIGRyYWdnZWQuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBbbmV3VmFsdWVdXG4gKiBAcmV0dXJuIHtib29sZWFuIHwgSW50ZXJhY3RhYmxlfSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuc3R5bGVDdXJzb3IgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgaWYgKGlzLmJvb2wobmV3VmFsdWUpKSB7XG4gICAgdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yID0gbmV3VmFsdWU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChuZXdWYWx1ZSA9PT0gbnVsbCkge1xuICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuc3R5bGVDdXJzb3I7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLm9wdGlvbnMuc3R5bGVDdXJzb3I7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmRlZmF1bHRBY3Rpb25DaGVja2VyID0gZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGlvbiwgZWxlbWVudCkge1xuICBjb25zdCByZWN0ID0gdGhpcy5nZXRSZWN0KGVsZW1lbnQpO1xuICBjb25zdCBidXR0b25zID0gZXZlbnQuYnV0dG9ucyB8fCAoe1xuICAgIDA6IDEsXG4gICAgMTogNCxcbiAgICAzOiA4LFxuICAgIDQ6IDE2LFxuICB9KVtldmVudC5idXR0b25dO1xuICBsZXQgYWN0aW9uID0gbnVsbDtcblxuICBmb3IgKGNvbnN0IGFjdGlvbk5hbWUgb2YgYWN0aW9ucy5uYW1lcykge1xuICAgIC8vIGNoZWNrIG1vdXNlQnV0dG9uIHNldHRpbmcgaWYgdGhlIHBvaW50ZXIgaXMgZG93blxuICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duXG4gICAgICAgICYmIC9tb3VzZXxwb2ludGVyLy50ZXN0KGludGVyYWN0aW9uLnBvaW50ZXJUeXBlKVxuICAgICAgICAmJiAoYnV0dG9ucyAmIHRoaXMub3B0aW9uc1thY3Rpb25OYW1lXS5tb3VzZUJ1dHRvbnMpID09PSAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBhY3Rpb24gPSBhY3Rpb25zW2FjdGlvbk5hbWVdLmNoZWNrZXIocG9pbnRlciwgZXZlbnQsIHRoaXMsIGVsZW1lbnQsIGludGVyYWN0aW9uLCByZWN0KTtcblxuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuICB9XG59O1xuXG4iLCJjb25zdCByYWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvcmFmJyk7XG5jb25zdCBnZXRXaW5kb3cgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvd2luZG93JykuZ2V0V2luZG93O1xuY29uc3QgaXMgICAgICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2lzJyk7XG5jb25zdCBkb21VdGlscyAgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZG9tVXRpbHMnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgID0gcmVxdWlyZSgnLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuL2RlZmF1bHRPcHRpb25zJyk7XG5cbmNvbnN0IGF1dG9TY3JvbGwgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZCAgOiBmYWxzZSxcbiAgICBjb250YWluZXI6IG51bGwsICAgICAvLyB0aGUgaXRlbSB0aGF0IGlzIHNjcm9sbGVkIChXaW5kb3cgb3IgSFRNTEVsZW1lbnQpXG4gICAgbWFyZ2luICAgOiA2MCxcbiAgICBzcGVlZCAgICA6IDMwMCwgICAgICAvLyB0aGUgc2Nyb2xsIHNwZWVkIGluIHBpeGVscyBwZXIgc2Vjb25kXG4gIH0sXG5cbiAgaW50ZXJhY3Rpb246IG51bGwsXG4gIGk6IG51bGwsICAgIC8vIHRoZSBoYW5kbGUgcmV0dXJuZWQgYnkgd2luZG93LnNldEludGVydmFsXG4gIHg6IDAsIHk6IDAsIC8vIERpcmVjdGlvbiBlYWNoIHB1bHNlIGlzIHRvIHNjcm9sbCBpblxuXG4gIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgcHJldlRpbWU6IDAsXG5cbiAgc3RhcnQ6IGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICAgIGF1dG9TY3JvbGwuaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgIHJhZi5jYW5jZWwoYXV0b1Njcm9sbC5pKTtcblxuICAgIGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcbiAgICBhdXRvU2Nyb2xsLnByZXZUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgYXV0b1Njcm9sbC5pID0gcmFmLnJlcXVlc3QoYXV0b1Njcm9sbC5zY3JvbGwpO1xuICB9LFxuXG4gIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICBhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgcmFmLmNhbmNlbChhdXRvU2Nyb2xsLmkpO1xuICB9LFxuXG4gIC8vIHNjcm9sbCB0aGUgd2luZG93IGJ5IHRoZSB2YWx1ZXMgaW4gc2Nyb2xsLngveVxuICBzY3JvbGw6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBvcHRpb25zID0gYXV0b1Njcm9sbC5pbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1thdXRvU2Nyb2xsLmludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLmF1dG9TY3JvbGw7XG4gICAgY29uc3QgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZ2V0V2luZG93KGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgLy8gY2hhbmdlIGluIHRpbWUgaW4gc2Vjb25kc1xuICAgIGNvbnN0IGR0ID0gKG5vdyAtIGF1dG9TY3JvbGwucHJldlRpbWUpIC8gMTAwMDtcbiAgICAvLyBkaXNwbGFjZW1lbnRcbiAgICBjb25zdCBzID0gb3B0aW9ucy5zcGVlZCAqIGR0O1xuXG4gICAgaWYgKHMgPj0gMSkge1xuICAgICAgaWYgKGlzLndpbmRvdyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnRhaW5lci5zY3JvbGxCeShhdXRvU2Nyb2xsLnggKiBzLCBhdXRvU2Nyb2xsLnkgKiBzKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIuc2Nyb2xsTGVmdCArPSBhdXRvU2Nyb2xsLnggKiBzO1xuICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wICArPSBhdXRvU2Nyb2xsLnkgKiBzO1xuICAgICAgfVxuXG4gICAgICBhdXRvU2Nyb2xsLnByZXZUaW1lID0gbm93O1xuICAgIH1cblxuICAgIGlmIChhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nKSB7XG4gICAgICByYWYuY2FuY2VsKGF1dG9TY3JvbGwuaSk7XG4gICAgICBhdXRvU2Nyb2xsLmkgPSByYWYucmVxdWVzdChhdXRvU2Nyb2xsLnNjcm9sbCk7XG4gICAgfVxuICB9LFxuICBjaGVjazogZnVuY3Rpb24gKGludGVyYWN0YWJsZSwgYWN0aW9uTmFtZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcblxuICAgIHJldHVybiBvcHRpb25zW2FjdGlvbk5hbWVdLmF1dG9TY3JvbGwgJiYgb3B0aW9uc1thY3Rpb25OYW1lXS5hdXRvU2Nyb2xsLmVuYWJsZWQ7XG4gIH0sXG4gIG9uSW50ZXJhY3Rpb25Nb3ZlOiBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgcG9pbnRlciB9KSB7XG4gICAgaWYgKCEoaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKVxuICAgICAgICAgICYmIGF1dG9TY3JvbGwuY2hlY2soaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24uc2ltdWxhdGlvbikge1xuICAgICAgYXV0b1Njcm9sbC54ID0gYXV0b1Njcm9sbC55ID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdG9wO1xuICAgIGxldCByaWdodDtcbiAgICBsZXQgYm90dG9tO1xuICAgIGxldCBsZWZ0O1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLmF1dG9TY3JvbGw7XG4gICAgY29uc3QgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZ2V0V2luZG93KGludGVyYWN0aW9uLmVsZW1lbnQpO1xuXG4gICAgaWYgKGlzLndpbmRvdyhjb250YWluZXIpKSB7XG4gICAgICBsZWZ0ICAgPSBwb2ludGVyLmNsaWVudFggPCBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIHRvcCAgICA9IHBvaW50ZXIuY2xpZW50WSA8IGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgcmlnaHQgID0gcG9pbnRlci5jbGllbnRYID4gY29udGFpbmVyLmlubmVyV2lkdGggIC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICBib3R0b20gPSBwb2ludGVyLmNsaWVudFkgPiBjb250YWluZXIuaW5uZXJIZWlnaHQgLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCByZWN0ID0gZG9tVXRpbHMuZ2V0RWxlbWVudENsaWVudFJlY3QoY29udGFpbmVyKTtcblxuICAgICAgbGVmdCAgID0gcG9pbnRlci5jbGllbnRYIDwgcmVjdC5sZWZ0ICAgKyBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIHRvcCAgICA9IHBvaW50ZXIuY2xpZW50WSA8IHJlY3QudG9wICAgICsgYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICByaWdodCAgPSBwb2ludGVyLmNsaWVudFggPiByZWN0LnJpZ2h0ICAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgYm90dG9tID0gcG9pbnRlci5jbGllbnRZID4gcmVjdC5ib3R0b20gLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICB9XG5cbiAgICBhdXRvU2Nyb2xsLnggPSAocmlnaHQgPyAxOiBsZWZ0PyAtMTogMCk7XG4gICAgYXV0b1Njcm9sbC55ID0gKGJvdHRvbT8gMTogIHRvcD8gLTE6IDApO1xuXG4gICAgaWYgKCFhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAvLyBzZXQgdGhlIGF1dG9TY3JvbGwgcHJvcGVydGllcyB0byB0aG9zZSBvZiB0aGUgdGFyZ2V0XG4gICAgICBhdXRvU2Nyb2xsLm1hcmdpbiA9IG9wdGlvbnMubWFyZ2luO1xuICAgICAgYXV0b1Njcm9sbC5zcGVlZCAgPSBvcHRpb25zLnNwZWVkO1xuXG4gICAgICBhdXRvU2Nyb2xsLnN0YXJ0KGludGVyYWN0aW9uKTtcbiAgICB9XG4gIH0sXG59O1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wLWFjdGl2ZScsIGZ1bmN0aW9uICgpIHtcbiAgYXV0b1Njcm9sbC5zdG9wKCk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLW1vdmUnLCBhdXRvU2Nyb2xsLm9uSW50ZXJhY3Rpb25Nb3ZlKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLmF1dG9TY3JvbGwgPSBhdXRvU2Nyb2xsLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF1dG9TY3JvbGw7XG4iLCJjb25zdCB7IHdpbmRvdyB9ID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcblxuY29uc3QgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG5sZXQgbGFzdFRpbWUgPSAwO1xubGV0IHJlcXVlc3Q7XG5sZXQgY2FuY2VsO1xuXG5mb3IgKGxldCB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyB4KyspIHtcbiAgcmVxdWVzdCA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICBjYW5jZWwgPSB3aW5kb3dbdmVuZG9yc1t4XSArJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG59XG5cbmlmICghcmVxdWVzdCkge1xuICByZXF1ZXN0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgIGNvbnN0IGlkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVUb0NhbGwpO1xuXG4gICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xufVxuXG5pZiAoIWNhbmNlbCkge1xuICBjYW5jZWwgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICBjbGVhclRpbWVvdXQoaWQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVxdWVzdCxcbiAgY2FuY2VsLFxufTtcbiIsImNvbnN0IGFjdGlvbnMgICAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBicm93c2VyICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2Jyb3dzZXInKTtcbmNvbnN0IEludGVyYWN0RXZlbnQgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuLyoqIEBsZW5kcyBJbnRlcmFjdGFibGUgKi9cbmNvbnN0IEludGVyYWN0YWJsZSAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG5jb25zdCBJbnRlcmFjdGlvbiAgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbi8vIExlc3MgUHJlY2lzaW9uIHdpdGggdG91Y2ggaW5wdXRcbmNvbnN0IGRlZmF1bHRNYXJnaW4gPSBicm93c2VyLnN1cHBvcnRzVG91Y2ggfHwgYnJvd3Nlci5zdXBwb3J0c1BvaW50ZXJFdmVudD8gMjA6IDEwO1xuXG5jb25zdCByZXNpemUgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZCAgICAgOiBmYWxzZSxcbiAgICBtb3VzZUJ1dHRvbnM6IG51bGwsXG5cbiAgICBvcmlnaW4gICAgOiBudWxsLFxuICAgIHNuYXAgICAgICA6IG51bGwsXG4gICAgcmVzdHJpY3QgIDogbnVsbCxcbiAgICBpbmVydGlhICAgOiBudWxsLFxuICAgIGF1dG9TY3JvbGw6IG51bGwsXG5cbiAgICBzcXVhcmU6IGZhbHNlLFxuICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgIGF4aXM6ICd4eScsXG5cbiAgICAvLyB1c2UgZGVmYXVsdCBtYXJnaW5cbiAgICBtYXJnaW46IE5hTixcblxuICAgIC8vIG9iamVjdCB3aXRoIHByb3BzIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSB3aGljaCBhcmVcbiAgICAvLyB0cnVlL2ZhbHNlIHZhbHVlcyB0byByZXNpemUgd2hlbiB0aGUgcG9pbnRlciBpcyBvdmVyIHRoYXQgZWRnZSxcbiAgICAvLyBDU1Mgc2VsZWN0b3JzIHRvIG1hdGNoIHRoZSBoYW5kbGVzIGZvciBlYWNoIGRpcmVjdGlvblxuICAgIC8vIG9yIHRoZSBFbGVtZW50cyBmb3IgZWFjaCBoYW5kbGVcbiAgICBlZGdlczogbnVsbCxcblxuICAgIC8vIGEgdmFsdWUgb2YgJ25vbmUnIHdpbGwgbGltaXQgdGhlIHJlc2l6ZSByZWN0IHRvIGEgbWluaW11bSBvZiAweDBcbiAgICAvLyAnbmVnYXRlJyB3aWxsIGFsb3cgdGhlIHJlY3QgdG8gaGF2ZSBuZWdhdGl2ZSB3aWR0aC9oZWlnaHRcbiAgICAvLyAncmVwb3NpdGlvbicgd2lsbCBrZWVwIHRoZSB3aWR0aC9oZWlnaHQgcG9zaXRpdmUgYnkgc3dhcHBpbmdcbiAgICAvLyB0aGUgdG9wIGFuZCBib3R0b20gZWRnZXMgYW5kL29yIHN3YXBwaW5nIHRoZSBsZWZ0IGFuZCByaWdodCBlZGdlc1xuICAgIGludmVydDogJ25vbmUnLFxuICB9LFxuXG4gIGNoZWNrZXI6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbiwgcmVjdCkge1xuICAgIGlmICghcmVjdCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgY29uc3QgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcblxuICAgIGlmIChvcHRpb25zLnJlc2l6ZS5lbmFibGVkKSB7XG4gICAgICBjb25zdCByZXNpemVPcHRpb25zID0gb3B0aW9ucy5yZXNpemU7XG4gICAgICBjb25zdCByZXNpemVFZGdlcyA9IHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgdG9wOiBmYWxzZSwgYm90dG9tOiBmYWxzZSB9O1xuXG4gICAgICAvLyBpZiB1c2luZyByZXNpemUuZWRnZXNcbiAgICAgIGlmICh1dGlscy5pcy5vYmplY3QocmVzaXplT3B0aW9ucy5lZGdlcykpIHtcbiAgICAgICAgZm9yIChjb25zdCBlZGdlIGluIHJlc2l6ZUVkZ2VzKSB7XG4gICAgICAgICAgcmVzaXplRWRnZXNbZWRnZV0gPSBjaGVja1Jlc2l6ZUVkZ2UoZWRnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVPcHRpb25zLmVkZ2VzW2VkZ2VdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24uX2V2ZW50VGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVPcHRpb25zLm1hcmdpbiB8fCBkZWZhdWx0TWFyZ2luKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc2l6ZUVkZ2VzLmxlZnQgPSByZXNpemVFZGdlcy5sZWZ0ICYmICFyZXNpemVFZGdlcy5yaWdodDtcbiAgICAgICAgcmVzaXplRWRnZXMudG9wICA9IHJlc2l6ZUVkZ2VzLnRvcCAgJiYgIXJlc2l6ZUVkZ2VzLmJvdHRvbTtcblxuICAgICAgICBpZiAocmVzaXplRWRnZXMubGVmdCB8fCByZXNpemVFZGdlcy5yaWdodCB8fCByZXNpemVFZGdlcy50b3AgfHwgcmVzaXplRWRnZXMuYm90dG9tKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6ICdyZXNpemUnLFxuICAgICAgICAgICAgZWRnZXM6IHJlc2l6ZUVkZ2VzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCByaWdodCAgPSBvcHRpb25zLnJlc2l6ZS5heGlzICE9PSAneScgJiYgcGFnZS54ID4gKHJlY3QucmlnaHQgIC0gZGVmYXVsdE1hcmdpbik7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IG9wdGlvbnMucmVzaXplLmF4aXMgIT09ICd4JyAmJiBwYWdlLnkgPiAocmVjdC5ib3R0b20gLSBkZWZhdWx0TWFyZ2luKTtcblxuICAgICAgICBpZiAocmlnaHQgfHwgYm90dG9tKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6ICdyZXNpemUnLFxuICAgICAgICAgICAgYXhlczogKHJpZ2h0PyAneCcgOiAnJykgKyAoYm90dG9tPyAneScgOiAnJyksXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGN1cnNvcnM6IChicm93c2VyLmlzSWU5ID8ge1xuICAgIHggOiAnZS1yZXNpemUnLFxuICAgIHkgOiAncy1yZXNpemUnLFxuICAgIHh5OiAnc2UtcmVzaXplJyxcblxuICAgIHRvcCAgICAgICAgOiAnbi1yZXNpemUnLFxuICAgIGxlZnQgICAgICAgOiAndy1yZXNpemUnLFxuICAgIGJvdHRvbSAgICAgOiAncy1yZXNpemUnLFxuICAgIHJpZ2h0ICAgICAgOiAnZS1yZXNpemUnLFxuICAgIHRvcGxlZnQgICAgOiAnc2UtcmVzaXplJyxcbiAgICBib3R0b21yaWdodDogJ3NlLXJlc2l6ZScsXG4gICAgdG9wcmlnaHQgICA6ICduZS1yZXNpemUnLFxuICAgIGJvdHRvbWxlZnQgOiAnbmUtcmVzaXplJyxcbiAgfSA6IHtcbiAgICB4IDogJ2V3LXJlc2l6ZScsXG4gICAgeSA6ICducy1yZXNpemUnLFxuICAgIHh5OiAnbndzZS1yZXNpemUnLFxuXG4gICAgdG9wICAgICAgICA6ICducy1yZXNpemUnLFxuICAgIGxlZnQgICAgICAgOiAnZXctcmVzaXplJyxcbiAgICBib3R0b20gICAgIDogJ25zLXJlc2l6ZScsXG4gICAgcmlnaHQgICAgICA6ICdldy1yZXNpemUnLFxuICAgIHRvcGxlZnQgICAgOiAnbndzZS1yZXNpemUnLFxuICAgIGJvdHRvbXJpZ2h0OiAnbndzZS1yZXNpemUnLFxuICAgIHRvcHJpZ2h0ICAgOiAnbmVzdy1yZXNpemUnLFxuICAgIGJvdHRvbWxlZnQgOiAnbmVzdy1yZXNpemUnLFxuICB9KSxcblxuICBnZXRDdXJzb3I6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICBpZiAoYWN0aW9uLmF4aXMpIHtcbiAgICAgIHJldHVybiByZXNpemUuY3Vyc29yc1thY3Rpb24ubmFtZSArIGFjdGlvbi5heGlzXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYWN0aW9uLmVkZ2VzKSB7XG4gICAgICBsZXQgY3Vyc29yS2V5ID0gJyc7XG4gICAgICBjb25zdCBlZGdlTmFtZXMgPSBbJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCddO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBpZiAoYWN0aW9uLmVkZ2VzW2VkZ2VOYW1lc1tpXV0pIHtcbiAgICAgICAgICBjdXJzb3JLZXkgKz0gZWRnZU5hbWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNpemUuY3Vyc29yc1tjdXJzb3JLZXldO1xuICAgIH1cbiAgfSxcbn07XG5cbi8vIHJlc2l6ZXN0YXJ0XG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uICh7IGlFdmVudCwgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdyZXNpemVzdGFydCcgfHwgIWludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc3RhcnRSZWN0ID0gaW50ZXJhY3Rpb24udGFyZ2V0LmdldFJlY3QoaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gIGNvbnN0IHJlc2l6ZU9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5yZXNpemU7XG5cbiAgLypcbiAgICogV2hlbiB1c2luZyB0aGUgYHJlc2l6YWJsZS5zcXVhcmVgIG9yIGByZXNpemFibGUucHJlc2VydmVBc3BlY3RSYXRpb2Agb3B0aW9ucywgcmVzaXppbmcgZnJvbSBvbmUgZWRnZVxuICAgKiB3aWxsIGFmZmVjdCBhbm90aGVyLiBFLmcuIHdpdGggYHJlc2l6YWJsZS5zcXVhcmVgLCByZXNpemluZyB0byBtYWtlIHRoZSByaWdodCBlZGdlIGxhcmdlciB3aWxsIG1ha2VcbiAgICogdGhlIGJvdHRvbSBlZGdlIGxhcmdlciBieSB0aGUgc2FtZSBhbW91bnQuIFdlIGNhbGwgdGhlc2UgJ2xpbmtlZCcgZWRnZXMuIEFueSBsaW5rZWQgZWRnZXMgd2lsbCBkZXBlbmRcbiAgICogb24gdGhlIGFjdGl2ZSBlZGdlcyBhbmQgdGhlIGVkZ2UgYmVpbmcgaW50ZXJhY3RlZCB3aXRoLlxuICAgKi9cbiAgaWYgKHJlc2l6ZU9wdGlvbnMuc3F1YXJlIHx8IHJlc2l6ZU9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbykge1xuICAgIGNvbnN0IGxpbmtlZEVkZ2VzID0gdXRpbHMuZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcyk7XG5cbiAgICBsaW5rZWRFZGdlcy50b3AgICAgPSBsaW5rZWRFZGdlcy50b3AgICAgfHwgKGxpbmtlZEVkZ2VzLmxlZnQgICAmJiAhbGlua2VkRWRnZXMuYm90dG9tKTtcbiAgICBsaW5rZWRFZGdlcy5sZWZ0ICAgPSBsaW5rZWRFZGdlcy5sZWZ0ICAgfHwgKGxpbmtlZEVkZ2VzLnRvcCAgICAmJiAhbGlua2VkRWRnZXMucmlnaHQgKTtcbiAgICBsaW5rZWRFZGdlcy5ib3R0b20gPSBsaW5rZWRFZGdlcy5ib3R0b20gfHwgKGxpbmtlZEVkZ2VzLnJpZ2h0ICAmJiAhbGlua2VkRWRnZXMudG9wICAgKTtcbiAgICBsaW5rZWRFZGdlcy5yaWdodCAgPSBsaW5rZWRFZGdlcy5yaWdodCAgfHwgKGxpbmtlZEVkZ2VzLmJvdHRvbSAmJiAhbGlua2VkRWRnZXMubGVmdCAgKTtcblxuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLl9saW5rZWRFZGdlcyA9IGxpbmtlZEVkZ2VzO1xuICB9XG4gIGVsc2Uge1xuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLl9saW5rZWRFZGdlcyA9IG51bGw7XG4gIH1cblxuICAvLyBpZiB1c2luZyBgcmVzaXphYmxlLnByZXNlcnZlQXNwZWN0UmF0aW9gIG9wdGlvbiwgcmVjb3JkIGFzcGVjdCByYXRpbyBhdCB0aGUgc3RhcnQgb2YgdGhlIHJlc2l6ZVxuICBpZiAocmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSB7XG4gICAgaW50ZXJhY3Rpb24ucmVzaXplU3RhcnRBc3BlY3RSYXRpbyA9IHN0YXJ0UmVjdC53aWR0aCAvIHN0YXJ0UmVjdC5oZWlnaHQ7XG4gIH1cblxuICBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cyA9IHtcbiAgICBzdGFydCAgICAgOiBzdGFydFJlY3QsXG4gICAgY3VycmVudCAgIDogdXRpbHMuZXh0ZW5kKHt9LCBzdGFydFJlY3QpLFxuICAgIGludmVydGVkICA6IHV0aWxzLmV4dGVuZCh7fSwgc3RhcnRSZWN0KSxcbiAgICBwcmV2aW91cyAgOiB1dGlscy5leHRlbmQoe30sIHN0YXJ0UmVjdCksXG4gICAgZGVsdGEgICAgIDoge1xuICAgICAgbGVmdDogMCwgcmlnaHQgOiAwLCB3aWR0aCA6IDAsXG4gICAgICB0b3AgOiAwLCBib3R0b206IDAsIGhlaWdodDogMCxcbiAgICB9LFxuICB9O1xuXG4gIGlFdmVudC5yZWN0ID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuaW52ZXJ0ZWQ7XG4gIGlFdmVudC5kZWx0YVJlY3QgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5kZWx0YTtcbn0pO1xuXG4vLyByZXNpemVtb3ZlXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uICh7IGlFdmVudCwgcGhhc2UsIGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKHBoYXNlICE9PSAnbW92ZScgfHwgIWludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IHJlc2l6ZU9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5yZXNpemU7XG4gIGNvbnN0IGludmVydCA9IHJlc2l6ZU9wdGlvbnMuaW52ZXJ0O1xuICBjb25zdCBpbnZlcnRpYmxlID0gaW52ZXJ0ID09PSAncmVwb3NpdGlvbicgfHwgaW52ZXJ0ID09PSAnbmVnYXRlJztcblxuICBsZXQgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcztcblxuICBjb25zdCBzdGFydCAgICAgID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuc3RhcnQ7XG4gIGNvbnN0IGN1cnJlbnQgICAgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5jdXJyZW50O1xuICBjb25zdCBpbnZlcnRlZCAgID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuaW52ZXJ0ZWQ7XG4gIGNvbnN0IGRlbHRhICAgICAgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5kZWx0YTtcbiAgY29uc3QgcHJldmlvdXMgICA9IHV0aWxzLmV4dGVuZChpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5wcmV2aW91cywgaW52ZXJ0ZWQpO1xuICBjb25zdCBvcmlnaW5hbEVkZ2VzID0gZWRnZXM7XG5cbiAgbGV0IGR4ID0gaUV2ZW50LmR4O1xuICBsZXQgZHkgPSBpRXZlbnQuZHk7XG5cbiAgaWYgKHJlc2l6ZU9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbyB8fCByZXNpemVPcHRpb25zLnNxdWFyZSkge1xuICAgIC8vIGByZXNpemUucHJlc2VydmVBc3BlY3RSYXRpb2AgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGByZXNpemUuc3F1YXJlYFxuICAgIGNvbnN0IHN0YXJ0QXNwZWN0UmF0aW8gPSByZXNpemVPcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW9cbiAgICAgID8gaW50ZXJhY3Rpb24ucmVzaXplU3RhcnRBc3BlY3RSYXRpb1xuICAgICAgOiAxO1xuXG4gICAgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5fbGlua2VkRWRnZXM7XG5cbiAgICBpZiAoKG9yaWdpbmFsRWRnZXMubGVmdCAmJiBvcmlnaW5hbEVkZ2VzLmJvdHRvbSlcbiAgICAgICAgfHwgKG9yaWdpbmFsRWRnZXMucmlnaHQgJiYgb3JpZ2luYWxFZGdlcy50b3ApKSB7XG4gICAgICBkeSA9IC1keCAvIHN0YXJ0QXNwZWN0UmF0aW87XG4gICAgfVxuICAgIGVsc2UgaWYgKG9yaWdpbmFsRWRnZXMubGVmdCB8fCBvcmlnaW5hbEVkZ2VzLnJpZ2h0ICkgeyBkeSA9IGR4IC8gc3RhcnRBc3BlY3RSYXRpbzsgfVxuICAgIGVsc2UgaWYgKG9yaWdpbmFsRWRnZXMudG9wICB8fCBvcmlnaW5hbEVkZ2VzLmJvdHRvbSkgeyBkeCA9IGR5ICogc3RhcnRBc3BlY3RSYXRpbzsgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSAnY3VycmVudCcgcmVjdCB3aXRob3V0IG1vZGlmaWNhdGlvbnNcbiAgaWYgKGVkZ2VzLnRvcCAgICkgeyBjdXJyZW50LnRvcCAgICArPSBkeTsgfVxuICBpZiAoZWRnZXMuYm90dG9tKSB7IGN1cnJlbnQuYm90dG9tICs9IGR5OyB9XG4gIGlmIChlZGdlcy5sZWZ0ICApIHsgY3VycmVudC5sZWZ0ICAgKz0gZHg7IH1cbiAgaWYgKGVkZ2VzLnJpZ2h0ICkgeyBjdXJyZW50LnJpZ2h0ICArPSBkeDsgfVxuXG4gIGlmIChpbnZlcnRpYmxlKSB7XG4gICAgLy8gaWYgaW52ZXJ0aWJsZSwgY29weSB0aGUgY3VycmVudCByZWN0XG4gICAgdXRpbHMuZXh0ZW5kKGludmVydGVkLCBjdXJyZW50KTtcblxuICAgIGlmIChpbnZlcnQgPT09ICdyZXBvc2l0aW9uJykge1xuICAgICAgLy8gc3dhcCBlZGdlIHZhbHVlcyBpZiBuZWNlc3NhcnkgdG8ga2VlcCB3aWR0aC9oZWlnaHQgcG9zaXRpdmVcbiAgICAgIGxldCBzd2FwO1xuXG4gICAgICBpZiAoaW52ZXJ0ZWQudG9wID4gaW52ZXJ0ZWQuYm90dG9tKSB7XG4gICAgICAgIHN3YXAgPSBpbnZlcnRlZC50b3A7XG5cbiAgICAgICAgaW52ZXJ0ZWQudG9wID0gaW52ZXJ0ZWQuYm90dG9tO1xuICAgICAgICBpbnZlcnRlZC5ib3R0b20gPSBzd2FwO1xuICAgICAgfVxuICAgICAgaWYgKGludmVydGVkLmxlZnQgPiBpbnZlcnRlZC5yaWdodCkge1xuICAgICAgICBzd2FwID0gaW52ZXJ0ZWQubGVmdDtcblxuICAgICAgICBpbnZlcnRlZC5sZWZ0ID0gaW52ZXJ0ZWQucmlnaHQ7XG4gICAgICAgIGludmVydGVkLnJpZ2h0ID0gc3dhcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gaWYgbm90IGludmVydGlibGUsIHJlc3RyaWN0IHRvIG1pbmltdW0gb2YgMHgwIHJlY3RcbiAgICBpbnZlcnRlZC50b3AgICAgPSBNYXRoLm1pbihjdXJyZW50LnRvcCwgc3RhcnQuYm90dG9tKTtcbiAgICBpbnZlcnRlZC5ib3R0b20gPSBNYXRoLm1heChjdXJyZW50LmJvdHRvbSwgc3RhcnQudG9wKTtcbiAgICBpbnZlcnRlZC5sZWZ0ICAgPSBNYXRoLm1pbihjdXJyZW50LmxlZnQsIHN0YXJ0LnJpZ2h0KTtcbiAgICBpbnZlcnRlZC5yaWdodCAgPSBNYXRoLm1heChjdXJyZW50LnJpZ2h0LCBzdGFydC5sZWZ0KTtcbiAgfVxuXG4gIGludmVydGVkLndpZHRoICA9IGludmVydGVkLnJpZ2h0ICAtIGludmVydGVkLmxlZnQ7XG4gIGludmVydGVkLmhlaWdodCA9IGludmVydGVkLmJvdHRvbSAtIGludmVydGVkLnRvcCA7XG5cbiAgZm9yIChjb25zdCBlZGdlIGluIGludmVydGVkKSB7XG4gICAgZGVsdGFbZWRnZV0gPSBpbnZlcnRlZFtlZGdlXSAtIHByZXZpb3VzW2VkZ2VdO1xuICB9XG5cbiAgaUV2ZW50LmVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG4gIGlFdmVudC5yZWN0ID0gaW52ZXJ0ZWQ7XG4gIGlFdmVudC5kZWx0YVJlY3QgPSBkZWx0YTtcbn0pO1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdChlbGVtZW50KS5yZXNpemFibGUoe1xuICogICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICBvbm1vdmUgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICpcbiAqICAgZWRnZXM6IHtcbiAqICAgICB0b3AgICA6IHRydWUsICAgICAgIC8vIFVzZSBwb2ludGVyIGNvb3JkcyB0byBjaGVjayBmb3IgcmVzaXplLlxuICogICAgIGxlZnQgIDogZmFsc2UsICAgICAgLy8gRGlzYWJsZSByZXNpemluZyBmcm9tIGxlZnQgZWRnZS5cbiAqICAgICBib3R0b206ICcucmVzaXplLXMnLC8vIFJlc2l6ZSBpZiBwb2ludGVyIHRhcmdldCBtYXRjaGVzIHNlbGVjdG9yXG4gKiAgICAgcmlnaHQgOiBoYW5kbGVFbCAgICAvLyBSZXNpemUgaWYgcG9pbnRlciB0YXJnZXQgaXMgdGhlIGdpdmVuIEVsZW1lbnRcbiAqICAgfSxcbiAqXG4gKiAgICAgLy8gV2lkdGggYW5kIGhlaWdodCBjYW4gYmUgYWRqdXN0ZWQgaW5kZXBlbmRlbnRseS4gV2hlbiBgdHJ1ZWAsIHdpZHRoIGFuZFxuICogICAgIC8vIGhlaWdodCBhcmUgYWRqdXN0ZWQgYXQgYSAxOjEgcmF0aW8uXG4gKiAgICAgc3F1YXJlOiBmYWxzZSxcbiAqXG4gKiAgICAgLy8gV2lkdGggYW5kIGhlaWdodCBjYW4gYmUgYWRqdXN0ZWQgaW5kZXBlbmRlbnRseS4gV2hlbiBgdHJ1ZWAsIHdpZHRoIGFuZFxuICogICAgIC8vIGhlaWdodCBtYWludGFpbiB0aGUgYXNwZWN0IHJhdGlvIHRoZXkgaGFkIHdoZW4gcmVzaXppbmcgc3RhcnRlZC5cbiAqICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBmYWxzZSxcbiAqXG4gKiAgIC8vIGEgdmFsdWUgb2YgJ25vbmUnIHdpbGwgbGltaXQgdGhlIHJlc2l6ZSByZWN0IHRvIGEgbWluaW11bSBvZiAweDBcbiAqICAgLy8gJ25lZ2F0ZScgd2lsbCBhbGxvdyB0aGUgcmVjdCB0byBoYXZlIG5lZ2F0aXZlIHdpZHRoL2hlaWdodFxuICogICAvLyAncmVwb3NpdGlvbicgd2lsbCBrZWVwIHRoZSB3aWR0aC9oZWlnaHQgcG9zaXRpdmUgYnkgc3dhcHBpbmdcbiAqICAgLy8gdGhlIHRvcCBhbmQgYm90dG9tIGVkZ2VzIGFuZC9vciBzd2FwcGluZyB0aGUgbGVmdCBhbmQgcmlnaHQgZWRnZXNcbiAqICAgaW52ZXJ0OiAnbm9uZScgfHwgJ25lZ2F0ZScgfHwgJ3JlcG9zaXRpb24nXG4gKlxuICogICAvLyBsaW1pdCBtdWx0aXBsZSByZXNpemVzLlxuICogICAvLyBTZWUgdGhlIGV4cGxhbmF0aW9uIGluIHRoZSB7QGxpbmsgSW50ZXJhY3RhYmxlLmRyYWdnYWJsZX0gZXhhbXBsZVxuICogICBtYXg6IEluZmluaXR5LFxuICogICBtYXhQZXJFbGVtZW50OiAxLFxuICogfSk7XG4gKlxuICogdmFyIGlzUmVzaXplYWJsZSA9IGludGVyYWN0KGVsZW1lbnQpLnJlc2l6YWJsZSgpO1xuICogYGBgXG4gKlxuICogR2V0cyBvciBzZXRzIHdoZXRoZXIgcmVzaXplIGFjdGlvbnMgY2FuIGJlIHBlcmZvcm1lZCBvbiB0aGUgdGFyZ2V0XG4gKlxuICogQHBhcmFtIHtib29sZWFuIHwgb2JqZWN0fSBbb3B0aW9uc10gdHJ1ZS9mYWxzZSBvciBBbiBvYmplY3Qgd2l0aCBldmVudFxuICogbGlzdGVuZXJzIHRvIGJlIGZpcmVkIG9uIHJlc2l6ZSBldmVudHMgKG9iamVjdCBtYWtlcyB0aGUgSW50ZXJhY3RhYmxlXG4gKiByZXNpemFibGUpXG4gKiBAcmV0dXJuIHtib29sZWFuIHwgSW50ZXJhY3RhYmxlfSBBIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGlzIGNhbiBiZSB0aGVcbiAqIHRhcmdldCBvZiByZXNpemUgZWxlbWVudHMsIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUucmVzaXphYmxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLm9iamVjdChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5yZXNpemUuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlOiB0cnVlO1xuICAgIHRoaXMuc2V0UGVyQWN0aW9uKCdyZXNpemUnLCBvcHRpb25zKTtcbiAgICB0aGlzLnNldE9uRXZlbnRzKCdyZXNpemUnLCBvcHRpb25zKTtcblxuICAgIGlmICgvXngkfF55JHxeeHkkLy50ZXN0KG9wdGlvbnMuYXhpcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuYXhpcyA9IG9wdGlvbnMuYXhpcztcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0aW9ucy5heGlzID09PSBudWxsKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmVzaXplLmF4aXMgPSBkZWZhdWx0T3B0aW9ucy5yZXNpemUuYXhpcztcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8pKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmVzaXplLnByZXNlcnZlQXNwZWN0UmF0aW8gPSBvcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW87XG4gICAgfVxuICAgIGVsc2UgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucy5zcXVhcmUpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmVzaXplLnNxdWFyZSA9IG9wdGlvbnMuc3F1YXJlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5lbmFibGVkID0gb3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhpcy5vbnJlc2l6ZXN0YXJ0ID0gdGhpcy5vbnJlc2l6ZXN0YXJ0ID0gdGhpcy5vbnJlc2l6ZWVuZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXNpemU7XG59O1xuXG5mdW5jdGlvbiBjaGVja1Jlc2l6ZUVkZ2UgKG5hbWUsIHZhbHVlLCBwYWdlLCBlbGVtZW50LCBpbnRlcmFjdGFibGVFbGVtZW50LCByZWN0LCBtYXJnaW4pIHtcbiAgLy8gZmFsc2UsICcnLCB1bmRlZmluZWQsIG51bGxcbiAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB0cnVlIHZhbHVlLCB1c2UgcG9pbnRlciBjb29yZHMgYW5kIGVsZW1lbnQgcmVjdFxuICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAvLyBpZiBkaW1lbnNpb25zIGFyZSBuZWdhdGl2ZSwgXCJzd2l0Y2hcIiBlZGdlc1xuICAgIGNvbnN0IHdpZHRoICA9IHV0aWxzLmlzLm51bWJlcihyZWN0LndpZHRoICk/IHJlY3Qud2lkdGggIDogcmVjdC5yaWdodCAgLSByZWN0LmxlZnQ7XG4gICAgY29uc3QgaGVpZ2h0ID0gdXRpbHMuaXMubnVtYmVyKHJlY3QuaGVpZ2h0KT8gcmVjdC5oZWlnaHQgOiByZWN0LmJvdHRvbSAtIHJlY3QudG9wIDtcblxuICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgIGlmICAgICAgKG5hbWUgPT09ICdsZWZ0JyApIHsgbmFtZSA9ICdyaWdodCc7IH1cbiAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdyaWdodCcpIHsgbmFtZSA9ICdsZWZ0JyA7IH1cbiAgICB9XG4gICAgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgIGlmICAgICAgKG5hbWUgPT09ICd0b3AnICAgKSB7IG5hbWUgPSAnYm90dG9tJzsgfVxuICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2JvdHRvbScpIHsgbmFtZSA9ICd0b3AnICAgOyB9XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09ICdsZWZ0JyAgKSB7IHJldHVybiBwYWdlLnggPCAoKHdpZHRoICA+PSAwPyByZWN0LmxlZnQ6IHJlY3QucmlnaHQgKSArIG1hcmdpbik7IH1cbiAgICBpZiAobmFtZSA9PT0gJ3RvcCcgICApIHsgcmV0dXJuIHBhZ2UueSA8ICgoaGVpZ2h0ID49IDA/IHJlY3QudG9wIDogcmVjdC5ib3R0b20pICsgbWFyZ2luKTsgfVxuXG4gICAgaWYgKG5hbWUgPT09ICdyaWdodCcgKSB7IHJldHVybiBwYWdlLnggPiAoKHdpZHRoICA+PSAwPyByZWN0LnJpZ2h0IDogcmVjdC5sZWZ0KSAtIG1hcmdpbik7IH1cbiAgICBpZiAobmFtZSA9PT0gJ2JvdHRvbScpIHsgcmV0dXJuIHBhZ2UueSA+ICgoaGVpZ2h0ID49IDA/IHJlY3QuYm90dG9tOiByZWN0LnRvcCApIC0gbWFyZ2luKTsgfVxuICB9XG5cbiAgLy8gdGhlIHJlbWFpbmluZyBjaGVja3MgcmVxdWlyZSBhbiBlbGVtZW50XG4gIGlmICghdXRpbHMuaXMuZWxlbWVudChlbGVtZW50KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICByZXR1cm4gdXRpbHMuaXMuZWxlbWVudCh2YWx1ZSlcbiAgLy8gdGhlIHZhbHVlIGlzIGFuIGVsZW1lbnQgdG8gdXNlIGFzIGEgcmVzaXplIGhhbmRsZVxuICAgID8gdmFsdWUgPT09IGVsZW1lbnRcbiAgICAvLyBvdGhlcndpc2UgY2hlY2sgaWYgZWxlbWVudCBtYXRjaGVzIHZhbHVlIGFzIHNlbGVjdG9yXG4gICAgOiB1dGlscy5tYXRjaGVzVXBUbyhlbGVtZW50LCB2YWx1ZSwgaW50ZXJhY3RhYmxlRWxlbWVudCk7XG59XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5yZXNpemVBeGVzID0gJ3h5Jztcbn0pO1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ3NldC1kZWx0YScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uLCBpRXZlbnQsIGFjdGlvbiB9KSB7XG4gIGlmIChhY3Rpb24gIT09ICdyZXNpemUnIHx8ICFpbnRlcmFjdGlvbi5yZXNpemVBeGVzKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucztcblxuICBpZiAob3B0aW9ucy5yZXNpemUuc3F1YXJlKSB7XG4gICAgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd5Jykge1xuICAgICAgaUV2ZW50LmR4ID0gaUV2ZW50LmR5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlFdmVudC5keSA9IGlFdmVudC5keDtcbiAgICB9XG4gICAgaUV2ZW50LmF4ZXMgPSAneHknO1xuICB9XG4gIGVsc2Uge1xuICAgIGlFdmVudC5heGVzID0gaW50ZXJhY3Rpb24ucmVzaXplQXhlcztcblxuICAgIGlmIChpbnRlcmFjdGlvbi5yZXNpemVBeGVzID09PSAneCcpIHtcbiAgICAgIGlFdmVudC5keSA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd5Jykge1xuICAgICAgaUV2ZW50LmR4ID0gMDtcbiAgICB9XG4gIH1cbn0pO1xuXG5hY3Rpb25zLnJlc2l6ZSA9IHJlc2l6ZTtcbmFjdGlvbnMubmFtZXMucHVzaCgncmVzaXplJyk7XG51dGlscy5tZXJnZShJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgW1xuICAncmVzaXplc3RhcnQnLFxuICAncmVzaXplbW92ZScsXG4gICdyZXNpemVpbmVydGlhc3RhcnQnLFxuICAncmVzaXplaW5lcnRpYXJlc3VtZScsXG4gICdyZXNpemVlbmQnLFxuXSk7XG5hY3Rpb25zLm1ldGhvZERpY3QucmVzaXplID0gJ3Jlc2l6YWJsZSc7XG5cbmRlZmF1bHRPcHRpb25zLnJlc2l6ZSA9IHJlc2l6ZS5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSByZXNpemU7XG4iLCJjb25zdCBhY3Rpb25zICAgICAgICA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY29uc3QgdXRpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscycpO1xuY29uc3QgSW50ZXJhY3RFdmVudCAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG5jb25zdCBJbnRlcmFjdGFibGUgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG5jb25zdCBnZXN0dXJlID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQgOiBmYWxzZSxcbiAgICBvcmlnaW4gIDogbnVsbCxcbiAgICByZXN0cmljdDogbnVsbCxcbiAgfSxcblxuICBjaGVja2VyOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgaW50ZXJhY3Rpb24pIHtcbiAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklkcy5sZW5ndGggPj0gMikge1xuICAgICAgcmV0dXJuIHsgbmFtZTogJ2dlc3R1cmUnIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgZ2V0Q3Vyc29yOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9LFxufTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoeyBpRXZlbnQsIGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKGlFdmVudC50eXBlICE9PSAnZ2VzdHVyZXN0YXJ0JykgeyByZXR1cm47IH1cbiAgaUV2ZW50LmRzID0gMDtcblxuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0RGlzdGFuY2UgPSBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZEaXN0YW5jZSA9IGlFdmVudC5kaXN0YW5jZTtcbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydEFuZ2xlID0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGUgPSBpRXZlbnQuYW5nbGU7XG4gIGludGVyYWN0aW9uLmdlc3R1cmUuc2NhbGUgPSAxO1xufSk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKHsgaUV2ZW50LCBpbnRlcmFjdGlvbiB9KSB7XG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ2dlc3R1cmVtb3ZlJykgeyByZXR1cm47IH1cblxuICBpRXZlbnQuZHMgPSBpRXZlbnQuc2NhbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnNjYWxlO1xuXG4gIGludGVyYWN0aW9uLnRhcmdldC5maXJlKGlFdmVudCk7XG5cbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGUgPSBpRXZlbnQuYW5nbGU7XG4gIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkRpc3RhbmNlID0gaUV2ZW50LmRpc3RhbmNlO1xuXG4gIGlmIChpRXZlbnQuc2NhbGUgIT09IEluZmluaXR5XG4gICAgICAmJiBpRXZlbnQuc2NhbGUgIT09IG51bGxcbiAgICAgICYmIGlFdmVudC5zY2FsZSAhPT0gdW5kZWZpbmVkXG4gICAgICAmJiAhaXNOYU4oaUV2ZW50LnNjYWxlKSkge1xuXG4gICAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5zY2FsZSA9IGlFdmVudC5zY2FsZTtcbiAgfVxufSk7XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KGVsZW1lbnQpLmdlc3R1cmFibGUoe1xuICogICAgIG9uc3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICpcbiAqICAgICAvLyBsaW1pdCBtdWx0aXBsZSBnZXN0dXJlcy5cbiAqICAgICAvLyBTZWUgdGhlIGV4cGxhbmF0aW9uIGluIHtAbGluayBJbnRlcmFjdGFibGUuZHJhZ2dhYmxlfSBleGFtcGxlXG4gKiAgICAgbWF4OiBJbmZpbml0eSxcbiAqICAgICBtYXhQZXJFbGVtZW50OiAxLFxuICogfSk7XG4gKlxuICogdmFyIGlzR2VzdHVyZWFibGUgPSBpbnRlcmFjdChlbGVtZW50KS5nZXN0dXJhYmxlKCk7XG4gKiBgYGBcbiAqXG4gKiBHZXRzIG9yIHNldHMgd2hldGhlciBtdWx0aXRvdWNoIGdlc3R1cmVzIGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdH0gW29wdGlvbnNdIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnRcbiAqIGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiBnZXN0dXJlIGV2ZW50cyAobWFrZXMgdGhlIEludGVyYWN0YWJsZSBnZXN0dXJhYmxlKVxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gQSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBjYW4gYmUgdGhlXG4gKiB0YXJnZXQgb2YgZ2VzdHVyZSBldmVudHMsIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZ2VzdHVyYWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZT8gZmFsc2U6IHRydWU7XG4gICAgdGhpcy5zZXRQZXJBY3Rpb24oJ2dlc3R1cmUnLCBvcHRpb25zKTtcbiAgICB0aGlzLnNldE9uRXZlbnRzKCdnZXN0dXJlJywgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMub25nZXN0dXJlc3RhcnQgPSB0aGlzLm9uZ2VzdHVyZXN0YXJ0ID0gdGhpcy5vbmdlc3R1cmVlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXN0dXJlO1xufTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCdzZXQtZGVsdGEnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgaUV2ZW50LCBhY3Rpb24sIGV2ZW50LCBzdGFydGluZywgZW5kaW5nLCBkZWx0YVNvdXJjZSB9KSB7XG4gIGlmIChhY3Rpb24gIT09ICdnZXN0dXJlJykgeyByZXR1cm47IH1cblxuICBjb25zdCBwb2ludGVycyA9IGludGVyYWN0aW9uLnBvaW50ZXJzO1xuXG4gIGlFdmVudC50b3VjaGVzID0gW3BvaW50ZXJzWzBdLCBwb2ludGVyc1sxXV07XG5cbiAgaWYgKHN0YXJ0aW5nKSB7XG4gICAgaUV2ZW50LmRpc3RhbmNlID0gdXRpbHMudG91Y2hEaXN0YW5jZShwb2ludGVycywgZGVsdGFTb3VyY2UpO1xuICAgIGlFdmVudC5ib3ggICAgICA9IHV0aWxzLnRvdWNoQkJveChwb2ludGVycyk7XG4gICAgaUV2ZW50LnNjYWxlICAgID0gMTtcbiAgICBpRXZlbnQuZHMgICAgICAgPSAwO1xuICAgIGlFdmVudC5hbmdsZSAgICA9IHV0aWxzLnRvdWNoQW5nbGUocG9pbnRlcnMsIHVuZGVmaW5lZCwgZGVsdGFTb3VyY2UpO1xuICAgIGlFdmVudC5kYSAgICAgICA9IDA7XG4gIH1cbiAgZWxzZSBpZiAoZW5kaW5nIHx8IGV2ZW50IGluc3RhbmNlb2YgSW50ZXJhY3RFdmVudCkge1xuICAgIGlFdmVudC5kaXN0YW5jZSA9IGludGVyYWN0aW9uLnByZXZFdmVudC5kaXN0YW5jZTtcbiAgICBpRXZlbnQuYm94ICAgICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuYm94O1xuICAgIGlFdmVudC5zY2FsZSAgICA9IGludGVyYWN0aW9uLnByZXZFdmVudC5zY2FsZTtcbiAgICBpRXZlbnQuZHMgICAgICAgPSBpRXZlbnQuc2NhbGUgLSAxO1xuICAgIGlFdmVudC5hbmdsZSAgICA9IGludGVyYWN0aW9uLnByZXZFdmVudC5hbmdsZTtcbiAgICBpRXZlbnQuZGEgICAgICAgPSBpRXZlbnQuYW5nbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0QW5nbGU7XG4gIH1cbiAgZWxzZSB7XG4gICAgaUV2ZW50LmRpc3RhbmNlID0gdXRpbHMudG91Y2hEaXN0YW5jZShwb2ludGVycywgZGVsdGFTb3VyY2UpO1xuICAgIGlFdmVudC5ib3ggICAgICA9IHV0aWxzLnRvdWNoQkJveChwb2ludGVycyk7XG4gICAgaUV2ZW50LnNjYWxlICAgID0gaUV2ZW50LmRpc3RhbmNlIC8gaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydERpc3RhbmNlO1xuICAgIGlFdmVudC5hbmdsZSAgICA9IHV0aWxzLnRvdWNoQW5nbGUocG9pbnRlcnMsIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlLCBkZWx0YVNvdXJjZSk7XG5cbiAgICBpRXZlbnQuZHMgPSBpRXZlbnQuc2NhbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZTY2FsZTtcbiAgICBpRXZlbnQuZGEgPSBpRXZlbnQuYW5nbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5nZXN0dXJlID0ge1xuICAgIHN0YXJ0OiB7IHg6IDAsIHk6IDAgfSxcblxuICAgIHN0YXJ0RGlzdGFuY2U6IDAsICAgLy8gZGlzdGFuY2UgYmV0d2VlbiB0d28gdG91Y2hlcyBvZiB0b3VjaFN0YXJ0XG4gICAgcHJldkRpc3RhbmNlIDogMCxcbiAgICBkaXN0YW5jZSAgICAgOiAwLFxuXG4gICAgc2NhbGU6IDEsICAgICAgICAgICAvLyBnZXN0dXJlLmRpc3RhbmNlIC8gZ2VzdHVyZS5zdGFydERpc3RhbmNlXG5cbiAgICBzdGFydEFuZ2xlOiAwLCAgICAgIC8vIGFuZ2xlIG9mIGxpbmUgam9pbmluZyB0d28gdG91Y2hlc1xuICAgIHByZXZBbmdsZSA6IDAsICAgICAgLy8gYW5nbGUgb2YgdGhlIHByZXZpb3VzIGdlc3R1cmUgZXZlbnRcbiAgfTtcbn0pO1xuXG5hY3Rpb25zLmdlc3R1cmUgPSBnZXN0dXJlO1xuYWN0aW9ucy5uYW1lcy5wdXNoKCdnZXN0dXJlJyk7XG51dGlscy5tZXJnZShJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgW1xuICAnZ2VzdHVyZXN0YXJ0JyxcbiAgJ2dlc3R1cmVtb3ZlJyxcbiAgJ2dlc3R1cmVlbmQnLFxuXSk7XG5hY3Rpb25zLm1ldGhvZERpY3QuZ2VzdHVyZSA9ICdnZXN0dXJhYmxlJztcblxuZGVmYXVsdE9wdGlvbnMuZ2VzdHVyZSA9IGdlc3R1cmUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VzdHVyZTtcbiIsImNvbnN0IGFjdGlvbnMgICAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBzY29wZSAgICAgICAgICA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG4vKiogQGxlbmRzIG1vZHVsZTppbnRlcmFjdCAqL1xuY29uc3QgaW50ZXJhY3QgICAgICAgPSByZXF1aXJlKCcuLi9pbnRlcmFjdCcpO1xuY29uc3QgSW50ZXJhY3RFdmVudCAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG4vKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xuY29uc3QgSW50ZXJhY3RhYmxlICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IEludGVyYWN0aW9uICAgID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxuY29uc3QgZHJvcCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBhY2NlcHQgOiBudWxsLFxuICAgIG92ZXJsYXA6ICdwb2ludGVyJyxcbiAgfSxcbn07XG5cbmxldCBkeW5hbWljRHJvcCA9IGZhbHNlO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tc3RhcnQnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnQgfSkge1xuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2RyYWcnKSB7IHJldHVybjsgfVxuXG4gIC8vIHJlc2V0IGFjdGl2ZSBkcm9wem9uZXNcbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZHJvcHpvbmVzID0gW107XG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmVsZW1lbnRzICA9IFtdO1xuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5yZWN0cyAgICAgPSBbXTtcblxuICBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzID0gbnVsbDtcblxuICBpZiAoIWludGVyYWN0aW9uLmR5bmFtaWNEcm9wKSB7XG4gICAgc2V0QWN0aXZlRHJvcHMoaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICB9XG5cbiAgY29uc3QgZHJhZ0V2ZW50ID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50O1xuICBjb25zdCBkcm9wRXZlbnRzID0gZ2V0RHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgZXZlbnQsIGRyYWdFdmVudCk7XG5cbiAgaWYgKGRyb3BFdmVudHMuYWN0aXZhdGUpIHtcbiAgICBmaXJlQWN0aXZlRHJvcHMoaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMsIGRyb3BFdmVudHMuYWN0aXZhdGUpO1xuICB9XG59KTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgaUV2ZW50LCBldmVudCB9KSB7XG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ2RyYWdtb3ZlJyAmJiBpRXZlbnQudHlwZSAhPT0gJ2RyYWdlbmQnKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IGRyYWdnYWJsZUVsZW1lbnQgPSBpbnRlcmFjdGlvbi5lbGVtZW50O1xuICBjb25zdCBkcmFnRXZlbnQgPSBpRXZlbnQ7XG4gIGNvbnN0IGRyb3BSZXN1bHQgPSBnZXREcm9wKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdnYWJsZUVsZW1lbnQpO1xuXG4gIGludGVyYWN0aW9uLmRyb3BUYXJnZXQgID0gZHJvcFJlc3VsdC5kcm9wem9uZTtcbiAgaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQgPSBkcm9wUmVzdWx0LmVsZW1lbnQ7XG5cbiAgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyA9IGdldERyb3BFdmVudHMoaW50ZXJhY3Rpb24sIGV2ZW50LCBkcmFnRXZlbnQpO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1tb3ZlJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2RyYWcnKSB7IHJldHVybjsgfVxuXG4gIGZpcmVEcm9wRXZlbnRzKGludGVyYWN0aW9uLCBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tZW5kJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSA9PT0gJ2RyYWcnKSB7XG4gICAgZmlyZURyb3BFdmVudHMoaW50ZXJhY3Rpb24sIGludGVyYWN0aW9uLmRyb3BFdmVudHMpO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcC1kcmFnJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcyA9IHtcbiAgICBkcm9wem9uZXM6IG51bGwsXG4gICAgZWxlbWVudHM6IG51bGwsXG4gICAgcmVjdHM6IG51bGwsXG4gIH07XG5cbiAgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyA9IG51bGw7XG59KTtcblxuZnVuY3Rpb24gY29sbGVjdERyb3BzIChhY3RpdmVEcm9wcywgZWxlbWVudCkge1xuICBjb25zdCBkcm9wcyA9IFtdO1xuICBjb25zdCBlbGVtZW50cyA9IFtdO1xuXG4gIC8vIGNvbGxlY3QgYWxsIGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgd2hpY2ggcXVhbGlmeSBmb3IgYSBkcm9wXG4gIGZvciAoY29uc3QgY3VycmVudCBvZiBzY29wZS5pbnRlcmFjdGFibGVzKSB7XG4gICAgaWYgKCFjdXJyZW50Lm9wdGlvbnMuZHJvcC5lbmFibGVkKSB7IGNvbnRpbnVlOyB9XG5cbiAgICBjb25zdCBhY2NlcHQgPSBjdXJyZW50Lm9wdGlvbnMuZHJvcC5hY2NlcHQ7XG5cbiAgICAvLyB0ZXN0IHRoZSBkcmFnZ2FibGUgZWxlbWVudCBhZ2FpbnN0IHRoZSBkcm9wem9uZSdzIGFjY2VwdCBzZXR0aW5nXG4gICAgaWYgKCh1dGlscy5pcy5lbGVtZW50KGFjY2VwdCkgJiYgYWNjZXB0ICE9PSBlbGVtZW50KVxuICAgICAgICB8fCAodXRpbHMuaXMuc3RyaW5nKGFjY2VwdClcbiAgICAgICAgJiYgIXV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBhY2NlcHQpKSkge1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBxdWVyeSBmb3IgbmV3IGVsZW1lbnRzIGlmIG5lY2Vzc2FyeVxuICAgIGNvbnN0IGRyb3BFbGVtZW50cyA9IHV0aWxzLmlzLnN0cmluZyhjdXJyZW50LnRhcmdldClcbiAgICAgID8gY3VycmVudC5fY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKGN1cnJlbnQudGFyZ2V0KVxuICAgICAgOiBbY3VycmVudC50YXJnZXRdO1xuXG4gICAgZm9yIChjb25zdCBjdXJyZW50RWxlbWVudCBvZiBkcm9wRWxlbWVudHMpIHtcbiAgICAgIGlmIChjdXJyZW50RWxlbWVudCAhPT0gZWxlbWVudCkge1xuICAgICAgICBkcm9wcy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICBlbGVtZW50cy5wdXNoKGN1cnJlbnRFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVsZW1lbnRzLFxuICAgIGRyb3B6b25lczogZHJvcHMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpcmVBY3RpdmVEcm9wcyAoYWN0aXZlRHJvcHMsIGV2ZW50KSB7XG4gIGxldCBwcmV2RWxlbWVudDtcblxuICAvLyBsb29wIHRocm91Z2ggYWxsIGFjdGl2ZSBkcm9wem9uZXMgYW5kIHRyaWdnZXIgZXZlbnRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RpdmVEcm9wcy5kcm9wem9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50ID0gYWN0aXZlRHJvcHMuZHJvcHpvbmVzW2ldO1xuICAgIGNvbnN0IGN1cnJlbnRFbGVtZW50ID0gYWN0aXZlRHJvcHMuZWxlbWVudHMgW2ldO1xuXG4gICAgLy8gcHJldmVudCB0cmlnZ2VyIG9mIGR1cGxpY2F0ZSBldmVudHMgb24gc2FtZSBlbGVtZW50XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ICE9PSBwcmV2RWxlbWVudCkge1xuICAgICAgLy8gc2V0IGN1cnJlbnQgZWxlbWVudCBhcyBldmVudCB0YXJnZXRcbiAgICAgIGV2ZW50LnRhcmdldCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgY3VycmVudC5maXJlKGV2ZW50KTtcbiAgICB9XG4gICAgcHJldkVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgfVxufVxuXG4vLyBDb2xsZWN0IGEgbmV3IHNldCBvZiBwb3NzaWJsZSBkcm9wcyBhbmQgc2F2ZSB0aGVtIGluIGFjdGl2ZURyb3BzLlxuLy8gc2V0QWN0aXZlRHJvcHMgc2hvdWxkIGFsd2F5cyBiZSBjYWxsZWQgd2hlbiBhIGRyYWcgaGFzIGp1c3Qgc3RhcnRlZCBvciBhXG4vLyBkcmFnIGV2ZW50IGhhcHBlbnMgd2hpbGUgZHluYW1pY0Ryb3AgaXMgdHJ1ZVxuZnVuY3Rpb24gc2V0QWN0aXZlRHJvcHMgKGFjdGl2ZURyb3BzLCBkcmFnRWxlbWVudCkge1xuICAvLyBnZXQgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB0aGF0IGNvdWxkIHJlY2VpdmUgdGhlIGRyYWdnYWJsZVxuICBjb25zdCBwb3NzaWJsZURyb3BzID0gY29sbGVjdERyb3BzKGFjdGl2ZURyb3BzLCBkcmFnRWxlbWVudCk7XG5cbiAgYWN0aXZlRHJvcHMuZHJvcHpvbmVzID0gcG9zc2libGVEcm9wcy5kcm9wem9uZXM7XG4gIGFjdGl2ZURyb3BzLmVsZW1lbnRzICA9IHBvc3NpYmxlRHJvcHMuZWxlbWVudHM7XG4gIGFjdGl2ZURyb3BzLnJlY3RzICAgICA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgYWN0aXZlRHJvcHMucmVjdHNbaV0gPSBhY3RpdmVEcm9wcy5kcm9wem9uZXNbaV0uZ2V0UmVjdChhY3RpdmVEcm9wcy5lbGVtZW50c1tpXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RHJvcCAoZHJhZ0V2ZW50LCBldmVudCwgZHJhZ0VsZW1lbnQpIHtcbiAgY29uc3QgaW50ZXJhY3Rpb24gPSBkcmFnRXZlbnQuaW50ZXJhY3Rpb247XG4gIGNvbnN0IHZhbGlkRHJvcHMgPSBbXTtcblxuICBpZiAoZHluYW1pY0Ryb3ApIHtcbiAgICBzZXRBY3RpdmVEcm9wcyhpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcywgZHJhZ0VsZW1lbnQpO1xuICB9XG5cbiAgLy8gY29sbGVjdCBhbGwgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB3aGljaCBxdWFsaWZ5IGZvciBhIGRyb3BcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5kcm9wem9uZXMubGVuZ3RoOyBqKyspIHtcbiAgICBjb25zdCBjdXJyZW50ICAgICAgICA9IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tqXTtcbiAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmVsZW1lbnRzIFtqXTtcbiAgICBjb25zdCByZWN0ICAgICAgICAgICA9IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLnJlY3RzICAgIFtqXTtcblxuICAgIHZhbGlkRHJvcHMucHVzaChjdXJyZW50LmRyb3BDaGVjayhkcmFnRXZlbnQsIGV2ZW50LCBpbnRlcmFjdGlvbi50YXJnZXQsIGRyYWdFbGVtZW50LCBjdXJyZW50RWxlbWVudCwgcmVjdClcbiAgICAgID8gY3VycmVudEVsZW1lbnRcbiAgICAgIDogbnVsbCk7XG4gIH1cblxuICAvLyBnZXQgdGhlIG1vc3QgYXBwcm9wcmlhdGUgZHJvcHpvbmUgYmFzZWQgb24gRE9NIGRlcHRoIGFuZCBvcmRlclxuICBjb25zdCBkcm9wSW5kZXggPSB1dGlscy5pbmRleE9mRGVlcGVzdEVsZW1lbnQodmFsaWREcm9wcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBkcm9wem9uZTogaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZHJvcHpvbmVzW2Ryb3BJbmRleF0gfHwgbnVsbCxcbiAgICBlbGVtZW50IDogaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZWxlbWVudHMgW2Ryb3BJbmRleF0gfHwgbnVsbCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RHJvcEV2ZW50cyAoaW50ZXJhY3Rpb24sIHBvaW50ZXJFdmVudCwgZHJhZ0V2ZW50KSB7XG4gIGNvbnN0IGRyb3BFdmVudHMgPSB7XG4gICAgZW50ZXIgICAgIDogbnVsbCxcbiAgICBsZWF2ZSAgICAgOiBudWxsLFxuICAgIGFjdGl2YXRlICA6IG51bGwsXG4gICAgZGVhY3RpdmF0ZTogbnVsbCxcbiAgICBtb3ZlICAgICAgOiBudWxsLFxuICAgIGRyb3AgICAgICA6IG51bGwsXG4gIH07XG5cbiAgY29uc3QgdG1wbCA9IHtcbiAgICBkcmFnRXZlbnQsXG4gICAgaW50ZXJhY3Rpb24sXG4gICAgdGFyZ2V0ICAgICAgIDogaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQsXG4gICAgZHJvcHpvbmUgICAgIDogaW50ZXJhY3Rpb24uZHJvcFRhcmdldCxcbiAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgIGRyYWdnYWJsZSAgICA6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgdGltZVN0YW1wICAgIDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgfTtcblxuICBpZiAoaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQgIT09IGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudCkge1xuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHByZXZEcm9wVGFyZ2V0LCBjcmVhdGUgYSBkcmFnbGVhdmUgZXZlbnRcbiAgICBpZiAoaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQpIHtcbiAgICAgIGRyb3BFdmVudHMubGVhdmUgPSB1dGlscy5leHRlbmQoeyB0eXBlOiAnZHJhZ2xlYXZlJyB9LCB0bXBsKTtcblxuICAgICAgZHJhZ0V2ZW50LmRyYWdMZWF2ZSAgICA9IGRyb3BFdmVudHMubGVhdmUudGFyZ2V0ICAgPSBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQ7XG4gICAgICBkcmFnRXZlbnQucHJldkRyb3B6b25lID0gZHJvcEV2ZW50cy5sZWF2ZS5kcm9wem9uZSA9IGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0O1xuICAgIH1cbiAgICAvLyBpZiB0aGUgZHJvcFRhcmdldCBpcyBub3QgbnVsbCwgY3JlYXRlIGEgZHJhZ2VudGVyIGV2ZW50XG4gICAgaWYgKGludGVyYWN0aW9uLmRyb3BUYXJnZXQpIHtcbiAgICAgIGRyb3BFdmVudHMuZW50ZXIgPSB7XG4gICAgICAgIGRyYWdFdmVudCxcbiAgICAgICAgaW50ZXJhY3Rpb24sXG4gICAgICAgIHRhcmdldCAgICAgICA6IGludGVyYWN0aW9uLmRyb3BFbGVtZW50LFxuICAgICAgICBkcm9wem9uZSAgICAgOiBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0LFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgICAgICBkcmFnZ2FibGUgICAgOiBkcmFnRXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgICAgICB0aW1lU3RhbXAgICAgOiBkcmFnRXZlbnQudGltZVN0YW1wLFxuICAgICAgICB0eXBlICAgICAgICAgOiAnZHJhZ2VudGVyJyxcbiAgICAgIH07XG5cbiAgICAgIGRyYWdFdmVudC5kcmFnRW50ZXIgPSBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudDtcbiAgICAgIGRyYWdFdmVudC5kcm9wem9uZSA9IGludGVyYWN0aW9uLmRyb3BUYXJnZXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ2VuZCcgJiYgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCkge1xuICAgIGRyb3BFdmVudHMuZHJvcCA9IHV0aWxzLmV4dGVuZCh7IHR5cGU6ICdkcm9wJyB9LCB0bXBsKTtcblxuICAgIGRyYWdFdmVudC5kcm9wem9uZSA9IGludGVyYWN0aW9uLmRyb3BUYXJnZXQ7XG4gICAgZHJhZ0V2ZW50LnJlbGF0ZWRUYXJnZXQgPSBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudDtcbiAgfVxuICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnc3RhcnQnKSB7XG4gICAgZHJvcEV2ZW50cy5hY3RpdmF0ZSA9IHV0aWxzLmV4dGVuZCh7IHR5cGU6ICdkcm9wYWN0aXZhdGUnIH0sIHRtcGwpO1xuXG4gICAgZHJvcEV2ZW50cy5hY3RpdmF0ZS50YXJnZXQgICA9IG51bGw7XG4gICAgZHJvcEV2ZW50cy5hY3RpdmF0ZS5kcm9wem9uZSA9IG51bGw7XG4gIH1cbiAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ2VuZCcpIHtcbiAgICBkcm9wRXZlbnRzLmRlYWN0aXZhdGUgPSB1dGlscy5leHRlbmQoeyB0eXBlOiAnZHJvcGRlYWN0aXZhdGUnIH0sIHRtcGwpO1xuXG4gICAgZHJvcEV2ZW50cy5kZWFjdGl2YXRlLnRhcmdldCAgID0gbnVsbDtcbiAgICBkcm9wRXZlbnRzLmRlYWN0aXZhdGUuZHJvcHpvbmUgPSBudWxsO1xuICB9XG4gIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdtb3ZlJyAmJiBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0KSB7XG4gICAgZHJvcEV2ZW50cy5tb3ZlID0gdXRpbHMuZXh0ZW5kKHtcbiAgICAgIGRyYWdtb3ZlICAgICA6IGRyYWdFdmVudCxcbiAgICAgIHR5cGUgICAgICAgICA6ICdkcm9wbW92ZScsXG4gICAgfSwgdG1wbCk7XG5cbiAgICBkcmFnRXZlbnQuZHJvcHpvbmUgPSBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIGRyb3BFdmVudHM7XG59XG5cbmZ1bmN0aW9uIGZpcmVEcm9wRXZlbnRzIChpbnRlcmFjdGlvbiwgZHJvcEV2ZW50cykge1xuICBjb25zdCB7XG4gICAgYWN0aXZlRHJvcHMsXG4gICAgcHJldkRyb3BUYXJnZXQsXG4gICAgZHJvcFRhcmdldCxcbiAgICBkcm9wRWxlbWVudCxcbiAgfSA9IGludGVyYWN0aW9uO1xuXG4gIGlmIChkcm9wRXZlbnRzLmxlYXZlKSB7IHByZXZEcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5sZWF2ZSk7IH1cbiAgaWYgKGRyb3BFdmVudHMubW92ZSApIHsgICAgIGRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLm1vdmUgKTsgfVxuICBpZiAoZHJvcEV2ZW50cy5lbnRlcikgeyAgICAgZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMuZW50ZXIpOyB9XG4gIGlmIChkcm9wRXZlbnRzLmRyb3AgKSB7ICAgICBkcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5kcm9wICk7IH1cbiAgaWYgKGRyb3BFdmVudHMuZGVhY3RpdmF0ZSkge1xuICAgIGZpcmVBY3RpdmVEcm9wcyhhY3RpdmVEcm9wcywgZHJvcEV2ZW50cy5kZWFjdGl2YXRlKTtcbiAgfVxuXG4gIGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0ICA9IGRyb3BUYXJnZXQ7XG4gIGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudCA9IGRyb3BFbGVtZW50O1xufVxuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdCh0YXJnZXQpXG4gKiAuZHJvcENoZWNrZXIoZnVuY3Rpb24oZHJhZ0V2ZW50LCAgICAgICAgIC8vIHJlbGF0ZWQgZHJhZ21vdmUgb3IgZHJhZ2VuZCBldmVudFxuICogICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LCAgICAgICAgICAgICAvLyBUb3VjaEV2ZW50L1BvaW50ZXJFdmVudC9Nb3VzZUV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgZHJvcHBlZCwgICAgICAgICAgIC8vIGJvb2wgcmVzdWx0IG9mIHRoZSBkZWZhdWx0IGNoZWNrZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSwgICAgICAgICAgLy8gZHJvcHpvbmUgSW50ZXJhY3RhYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZHJvcEVsZW1lbnQsICAgICAgIC8vIGRyb3B6b25lIGVsZW1udFxuICogICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSwgICAgICAgICAvLyBkcmFnZ2FibGUgSW50ZXJhY3RhYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlRWxlbWVudCkgey8vIGRyYWdnYWJsZSBlbGVtZW50XG4gKlxuICogICByZXR1cm4gZHJvcHBlZCAmJiBldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKCdhbGxvdy1kcm9wJyk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoJy5kcm9wJykuZHJvcHpvbmUoe1xuICogICBhY2NlcHQ6ICcuY2FuLWRyb3AnIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGUtZHJvcCcpLFxuICogICBvdmVybGFwOiAncG9pbnRlcicgfHwgJ2NlbnRlcicgfHwgemVyb1RvT25lXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciBkcmFnZ2FibGVzIGNhbiBiZSBkcm9wcGVkIG9udG8gdGhpcyB0YXJnZXQgdG9cbiAqIHRyaWdnZXIgZHJvcCBldmVudHNcbiAqXG4gKiBEcm9wem9uZXMgY2FuIHJlY2VpdmUgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gKiAgLSBgZHJvcGFjdGl2YXRlYCBhbmQgYGRyb3BkZWFjdGl2YXRlYCB3aGVuIGFuIGFjY2VwdGFibGUgZHJhZyBzdGFydHMgYW5kIGVuZHNcbiAqICAtIGBkcmFnZW50ZXJgIGFuZCBgZHJhZ2xlYXZlYCB3aGVuIGEgZHJhZ2dhYmxlIGVudGVycyBhbmQgbGVhdmVzIHRoZSBkcm9wem9uZVxuICogIC0gYGRyYWdtb3ZlYCB3aGVuIGEgZHJhZ2dhYmxlIHRoYXQgaGFzIGVudGVyZWQgdGhlIGRyb3B6b25lIGlzIG1vdmVkXG4gKiAgLSBgZHJvcGAgd2hlbiBhIGRyYWdnYWJsZSBpcyBkcm9wcGVkIGludG8gdGhpcyBkcm9wem9uZVxuICpcbiAqIFVzZSB0aGUgYGFjY2VwdGAgb3B0aW9uIHRvIGFsbG93IG9ubHkgZWxlbWVudHMgdGhhdCBtYXRjaCB0aGUgZ2l2ZW4gQ1NTXG4gKiBzZWxlY3RvciBvciBlbGVtZW50LiBUaGUgdmFsdWUgY2FuIGJlOlxuICpcbiAqICAtICoqYW4gRWxlbWVudCoqIC0gb25seSB0aGF0IGVsZW1lbnQgY2FuIGJlIGRyb3BwZWQgaW50byB0aGlzIGRyb3B6b25lLlxuICogIC0gKiphIHN0cmluZyoqLCAtIHRoZSBlbGVtZW50IGJlaW5nIGRyYWdnZWQgbXVzdCBtYXRjaCBpdCBhcyBhIENTUyBzZWxlY3Rvci5cbiAqICAtICoqYG51bGxgKiogLSBhY2NlcHQgb3B0aW9ucyBpcyBjbGVhcmVkIC0gaXQgYWNjZXB0cyBhbnkgZWxlbWVudC5cbiAqXG4gKiBVc2UgdGhlIGBvdmVybGFwYCBvcHRpb24gdG8gc2V0IGhvdyBkcm9wcyBhcmUgY2hlY2tlZCBmb3IuIFRoZSBhbGxvd2VkXG4gKiB2YWx1ZXMgYXJlOlxuICpcbiAqICAgLSBgJ3BvaW50ZXInYCwgdGhlIHBvaW50ZXIgbXVzdCBiZSBvdmVyIHRoZSBkcm9wem9uZSAoZGVmYXVsdClcbiAqICAgLSBgJ2NlbnRlcidgLCB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQncyBjZW50ZXIgbXVzdCBiZSBvdmVyIHRoZSBkcm9wem9uZVxuICogICAtIGEgbnVtYmVyIGZyb20gMC0xIHdoaWNoIGlzIHRoZSBgKGludGVyc2VjdGlvbiBhcmVhKSAvIChkcmFnZ2FibGUgYXJlYSlgLlxuICogICBlLmcuIGAwLjVgIGZvciBkcm9wIHRvIGhhcHBlbiB3aGVuIGhhbGYgb2YgdGhlIGFyZWEgb2YgdGhlIGRyYWdnYWJsZSBpc1xuICogICBvdmVyIHRoZSBkcm9wem9uZVxuICpcbiAqIFVzZSB0aGUgYGNoZWNrZXJgIG9wdGlvbiB0byBzcGVjaWZ5IGEgZnVuY3Rpb24gdG8gY2hlY2sgaWYgYSBkcmFnZ2VkIGVsZW1lbnRcbiAqIGlzIG92ZXIgdGhpcyBJbnRlcmFjdGFibGUuXG4gKlxuICogQHBhcmFtIHtib29sZWFuIHwgb2JqZWN0IHwgbnVsbH0gW29wdGlvbnNdIFRoZSBuZXcgb3B0aW9ucyB0byBiZSBzZXQuXG4gKiBAcmV0dXJuIHtib29sZWFuIHwgSW50ZXJhY3RhYmxlfSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZHJvcHpvbmUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmRyb3AuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlOiB0cnVlO1xuXG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcm9wKSAgICAgICAgICApIHsgdGhpcy5ldmVudHMub25kcm9wICAgICAgICAgICA9IG9wdGlvbnMub25kcm9wICAgICAgICAgIDsgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJvcGFjdGl2YXRlKSAgKSB7IHRoaXMuZXZlbnRzLm9uZHJvcGFjdGl2YXRlICAgPSBvcHRpb25zLm9uZHJvcGFjdGl2YXRlICA7IH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyb3BkZWFjdGl2YXRlKSkgeyB0aGlzLmV2ZW50cy5vbmRyb3BkZWFjdGl2YXRlID0gb3B0aW9ucy5vbmRyb3BkZWFjdGl2YXRlOyB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcmFnZW50ZXIpICAgICApIHsgdGhpcy5ldmVudHMub25kcmFnZW50ZXIgICAgICA9IG9wdGlvbnMub25kcmFnZW50ZXIgICAgIDsgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJhZ2xlYXZlKSAgICAgKSB7IHRoaXMuZXZlbnRzLm9uZHJhZ2xlYXZlICAgICAgPSBvcHRpb25zLm9uZHJhZ2xlYXZlICAgICA7IH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyb3Btb3ZlKSAgICAgICkgeyB0aGlzLmV2ZW50cy5vbmRyb3Btb3ZlICAgICAgID0gb3B0aW9ucy5vbmRyb3Btb3ZlICAgICAgOyB9XG5cbiAgICBpZiAoL14ocG9pbnRlcnxjZW50ZXIpJC8udGVzdChvcHRpb25zLm92ZXJsYXApKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5vdmVybGFwID0gb3B0aW9ucy5vdmVybGFwO1xuICAgIH1cbiAgICBlbHNlIGlmICh1dGlscy5pcy5udW1iZXIob3B0aW9ucy5vdmVybGFwKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcCA9IE1hdGgubWF4KE1hdGgubWluKDEsIG9wdGlvbnMub3ZlcmxhcCksIDApO1xuICAgIH1cbiAgICBpZiAoJ2FjY2VwdCcgaW4gb3B0aW9ucykge1xuICAgICAgdGhpcy5vcHRpb25zLmRyb3AuYWNjZXB0ID0gb3B0aW9ucy5hY2NlcHQ7XG4gICAgfVxuICAgIGlmICgnY2hlY2tlcicgaW4gb3B0aW9ucykge1xuICAgICAgdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlciA9IG9wdGlvbnMuY2hlY2tlcjtcbiAgICB9XG5cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHJvcC5lbmFibGVkID0gb3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhpcy5vbmRyYWdlbnRlciA9IHRoaXMub25kcmFnbGVhdmUgPSB0aGlzLm9uZHJvcFxuICAgICAgICA9IHRoaXMub25kcm9wYWN0aXZhdGUgPSB0aGlzLm9uZHJvcGRlYWN0aXZhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcm9wO1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kcm9wQ2hlY2sgPSBmdW5jdGlvbiAoZHJhZ0V2ZW50LCBldmVudCwgZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50LCBkcm9wRWxlbWVudCwgcmVjdCkge1xuICBsZXQgZHJvcHBlZCA9IGZhbHNlO1xuXG4gIC8vIGlmIHRoZSBkcm9wem9uZSBoYXMgbm8gcmVjdCAoZWcuIGRpc3BsYXk6IG5vbmUpXG4gIC8vIGNhbGwgdGhlIGN1c3RvbSBkcm9wQ2hlY2tlciBvciBqdXN0IHJldHVybiBmYWxzZVxuICBpZiAoIShyZWN0ID0gcmVjdCB8fCB0aGlzLmdldFJlY3QoZHJvcEVsZW1lbnQpKSkge1xuICAgIHJldHVybiAodGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlclxuICAgICAgPyB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyKGRyYWdFdmVudCwgZXZlbnQsIGRyb3BwZWQsIHRoaXMsIGRyb3BFbGVtZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQpXG4gICAgICA6IGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGRyb3BPdmVybGFwID0gdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcDtcblxuICBpZiAoZHJvcE92ZXJsYXAgPT09ICdwb2ludGVyJykge1xuICAgIGNvbnN0IG9yaWdpbiA9IHV0aWxzLmdldE9yaWdpblhZKGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudCwgJ2RyYWcnKTtcbiAgICBjb25zdCBwYWdlID0gdXRpbHMuZ2V0UGFnZVhZKGRyYWdFdmVudCk7XG5cbiAgICBwYWdlLnggKz0gb3JpZ2luLng7XG4gICAgcGFnZS55ICs9IG9yaWdpbi55O1xuXG4gICAgY29uc3QgaG9yaXpvbnRhbCA9IChwYWdlLnggPiByZWN0LmxlZnQpICYmIChwYWdlLnggPCByZWN0LnJpZ2h0KTtcbiAgICBjb25zdCB2ZXJ0aWNhbCAgID0gKHBhZ2UueSA+IHJlY3QudG9wICkgJiYgKHBhZ2UueSA8IHJlY3QuYm90dG9tKTtcblxuICAgIGRyb3BwZWQgPSBob3Jpem9udGFsICYmIHZlcnRpY2FsO1xuICB9XG5cbiAgY29uc3QgZHJhZ1JlY3QgPSBkcmFnZ2FibGUuZ2V0UmVjdChkcmFnZ2FibGVFbGVtZW50KTtcblxuICBpZiAoZHJhZ1JlY3QgJiYgZHJvcE92ZXJsYXAgPT09ICdjZW50ZXInKSB7XG4gICAgY29uc3QgY3ggPSBkcmFnUmVjdC5sZWZ0ICsgZHJhZ1JlY3Qud2lkdGggIC8gMjtcbiAgICBjb25zdCBjeSA9IGRyYWdSZWN0LnRvcCAgKyBkcmFnUmVjdC5oZWlnaHQgLyAyO1xuXG4gICAgZHJvcHBlZCA9IGN4ID49IHJlY3QubGVmdCAmJiBjeCA8PSByZWN0LnJpZ2h0ICYmIGN5ID49IHJlY3QudG9wICYmIGN5IDw9IHJlY3QuYm90dG9tO1xuICB9XG5cbiAgaWYgKGRyYWdSZWN0ICYmIHV0aWxzLmlzLm51bWJlcihkcm9wT3ZlcmxhcCkpIHtcbiAgICBjb25zdCBvdmVybGFwQXJlYSAgPSAoTWF0aC5tYXgoMCwgTWF0aC5taW4ocmVjdC5yaWdodCAsIGRyYWdSZWN0LnJpZ2h0ICkgLSBNYXRoLm1heChyZWN0LmxlZnQsIGRyYWdSZWN0LmxlZnQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAqIE1hdGgubWF4KDAsIE1hdGgubWluKHJlY3QuYm90dG9tLCBkcmFnUmVjdC5ib3R0b20pIC0gTWF0aC5tYXgocmVjdC50b3AgLCBkcmFnUmVjdC50b3AgKSkpO1xuXG4gICAgY29uc3Qgb3ZlcmxhcFJhdGlvID0gb3ZlcmxhcEFyZWEgLyAoZHJhZ1JlY3Qud2lkdGggKiBkcmFnUmVjdC5oZWlnaHQpO1xuXG4gICAgZHJvcHBlZCA9IG92ZXJsYXBSYXRpbyA+PSBkcm9wT3ZlcmxhcDtcbiAgfVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyKSB7XG4gICAgZHJvcHBlZCA9IHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIoZHJhZ0V2ZW50LCBldmVudCwgZHJvcHBlZCwgdGhpcywgZHJvcEVsZW1lbnQsIGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZHJvcHBlZDtcbn07XG5cbkludGVyYWN0YWJsZS5zaWduYWxzLm9uKCd1bnNldCcsIGZ1bmN0aW9uICh7IGludGVyYWN0YWJsZSB9KSB7XG4gIGludGVyYWN0YWJsZS5kcm9wem9uZShmYWxzZSk7XG59KTtcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdkcm9wQ2hlY2tlcicpO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCAgICAgID0gbnVsbDsgLy8gdGhlIGRyb3B6b25lIGEgZHJhZyB0YXJnZXQgbWlnaHQgYmUgZHJvcHBlZCBpbnRvXG4gIGludGVyYWN0aW9uLmRyb3BFbGVtZW50ICAgICA9IG51bGw7IC8vIHRoZSBlbGVtZW50IGF0IHRoZSB0aW1lIG9mIGNoZWNraW5nXG4gIGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0ICA9IG51bGw7IC8vIHRoZSBkcm9wem9uZSB0aGF0IHdhcyByZWNlbnRseSBkcmFnZ2VkIGF3YXkgZnJvbVxuICBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQgPSBudWxsOyAvLyB0aGUgZWxlbWVudCBhdCB0aGUgdGltZSBvZiBjaGVja2luZ1xuICBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzICAgICAgPSBudWxsOyAvLyB0aGUgZHJvcEV2ZW50cyByZWxhdGVkIHRvIHRoZSBjdXJyZW50IGRyYWcgZXZlbnRcblxuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcyA9IHtcbiAgICBkcm9wem9uZXM6IFtdLCAgICAgIC8vIHRoZSBkcm9wem9uZXMgdGhhdCBhcmUgbWVudGlvbmVkIGJlbG93XG4gICAgZWxlbWVudHMgOiBbXSwgICAgICAvLyBlbGVtZW50cyBvZiBkcm9wem9uZXMgdGhhdCBhY2NlcHQgdGhlIHRhcmdldCBkcmFnZ2FibGVcbiAgICByZWN0cyAgICA6IFtdLCAgICAgIC8vIHRoZSByZWN0cyBvZiB0aGUgZWxlbWVudHMgbWVudGlvbmVkIGFib3ZlXG4gIH07XG5cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24gfSkge1xuICBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0ID0gaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQgPVxuICAgIGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0ID0gaW50ZXJhY3Rpb24ucHJldkRyb3BFbGVtZW50ID0gbnVsbDtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIHRoZSBkaW1lbnNpb25zIG9mIGRyb3B6b25lIGVsZW1lbnRzIGFyZSBjYWxjdWxhdGVkXG4gKiBvbiBldmVyeSBkcmFnbW92ZSBvciBvbmx5IG9uIGRyYWdzdGFydCBmb3IgdGhlIGRlZmF1bHQgZHJvcENoZWNrZXJcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtuZXdWYWx1ZV0gVHJ1ZSB0byBjaGVjayBvbiBlYWNoIG1vdmUuIEZhbHNlIHRvIGNoZWNrIG9ubHlcbiAqIGJlZm9yZSBzdGFydFxuICogQHJldHVybiB7Ym9vbGVhbiB8IGludGVyYWN0fSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIGludGVyYWN0XG4gKi9cbmludGVyYWN0LmR5bmFtaWNEcm9wID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmICh1dGlscy5pcy5ib29sKG5ld1ZhbHVlKSkge1xuICAgIC8vaWYgKGRyYWdnaW5nICYmIGR5bmFtaWNEcm9wICE9PSBuZXdWYWx1ZSAmJiAhbmV3VmFsdWUpIHtcbiAgICAgIC8vY2FsY1JlY3RzKGRyb3B6b25lcyk7XG4gICAgLy99XG5cbiAgICBkeW5hbWljRHJvcCA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG4gIHJldHVybiBkeW5hbWljRHJvcDtcbn07XG5cbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbXG4gICdkcmFnZW50ZXInLFxuICAnZHJhZ2xlYXZlJyxcbiAgJ2Ryb3BhY3RpdmF0ZScsXG4gICdkcm9wZGVhY3RpdmF0ZScsXG4gICdkcm9wbW92ZScsXG4gICdkcm9wJyxcbl0pO1xuYWN0aW9ucy5tZXRob2REaWN0LmRyb3AgPSAnZHJvcHpvbmUnO1xuXG5kZWZhdWx0T3B0aW9ucy5kcm9wID0gZHJvcC5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBkcm9wO1xuIiwiLyoqIEBtb2R1bGUgaW50ZXJhY3QgKi9cblxuY29uc3QgYnJvd3NlciAgICAgID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJyk7XG5jb25zdCBldmVudHMgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpO1xuY29uc3QgdXRpbHMgICAgICAgID0gcmVxdWlyZSgnLi91dGlscycpO1xuY29uc3Qgc2NvcGUgICAgICAgID0gcmVxdWlyZSgnLi9zY29wZScpO1xuY29uc3QgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi9JbnRlcmFjdGFibGUnKTtcbmNvbnN0IEludGVyYWN0aW9uICA9IHJlcXVpcmUoJy4vSW50ZXJhY3Rpb24nKTtcblxuY29uc3QgZ2xvYmFsRXZlbnRzID0ge307XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KCcjZHJhZ2dhYmxlJykuZHJhZ2dhYmxlKHRydWUpO1xuICpcbiAqIHZhciByZWN0YWJsZXMgPSBpbnRlcmFjdCgncmVjdCcpO1xuICogcmVjdGFibGVzXG4gKiAgIC5nZXN0dXJhYmxlKHRydWUpXG4gKiAgIC5vbignZ2VzdHVyZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAqICAgICAgIC8vIC4uLlxuICogICB9KTtcbiAqIGBgYFxuICpcbiAqIFRoZSBtZXRob2RzIG9mIHRoaXMgdmFyaWFibGUgY2FuIGJlIHVzZWQgdG8gc2V0IGVsZW1lbnRzIGFzIGludGVyYWN0YWJsZXNcbiAqIGFuZCBhbHNvIHRvIGNoYW5nZSB2YXJpb3VzIGRlZmF1bHQgc2V0dGluZ3MuXG4gKlxuICogQ2FsbGluZyBpdCBhcyBhIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGFuIGVsZW1lbnQgb3IgYSB2YWxpZCBDU1Mgc2VsZWN0b3JcbiAqIHN0cmluZyByZXR1cm5zIGFuIEludGVyYWN0YWJsZSBvYmplY3Qgd2hpY2ggaGFzIHZhcmlvdXMgbWV0aG9kcyB0byBjb25maWd1cmVcbiAqIGl0LlxuICpcbiAqIEBnbG9iYWxcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBzdHJpbmd9IGVsZW1lbnQgVGhlIEhUTUwgb3IgU1ZHIEVsZW1lbnQgdG8gaW50ZXJhY3Qgd2l0aFxuICogb3IgQ1NTIHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtJbnRlcmFjdGFibGV9XG4gKi9cbmZ1bmN0aW9uIGludGVyYWN0IChlbGVtZW50LCBvcHRpb25zKSB7XG4gIGxldCBpbnRlcmFjdGFibGUgPSBzY29wZS5pbnRlcmFjdGFibGVzLmdldChlbGVtZW50LCBvcHRpb25zKTtcblxuICBpZiAoIWludGVyYWN0YWJsZSkge1xuICAgIGludGVyYWN0YWJsZSA9IG5ldyBJbnRlcmFjdGFibGUoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgaW50ZXJhY3RhYmxlLmV2ZW50cy5nbG9iYWwgPSBnbG9iYWxFdmVudHM7XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3RhYmxlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVsZW1lbnQgb3Igc2VsZWN0b3IgaGFzIGJlZW4gc2V0IHdpdGggdGhlIHtAbGluayBpbnRlcmFjdH1cbiAqIGZ1bmN0aW9uXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5pc1NldFxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgRWxlbWVudCBiZWluZyBzZWFyY2hlZCBmb3JcbiAqIEByZXR1cm4ge2Jvb2xlYW59IEluZGljYXRlcyBpZiB0aGUgZWxlbWVudCBvciBDU1Mgc2VsZWN0b3Igd2FzIHByZXZpb3VzbHlcbiAqIHBhc3NlZCB0byBpbnRlcmFjdFxuKi9cbmludGVyYWN0LmlzU2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHNjb3BlLmludGVyYWN0YWJsZXMuaW5kZXhPZkVsZW1lbnQoZWxlbWVudCwgb3B0aW9ucyAmJiBvcHRpb25zLmNvbnRleHQpICE9PSAtMTtcbn07XG5cbi8qKlxuICogQWRkIGEgZ2xvYmFsIGxpc3RlbmVyIGZvciBhbiBJbnRlcmFjdEV2ZW50IG9yIGFkZHMgYSBET00gZXZlbnQgdG8gYGRvY3VtZW50YFxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Qub25cbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5IHwgb2JqZWN0fSB0eXBlIFRoZSB0eXBlcyBvZiBldmVudHMgdG8gbGlzdGVuIGZvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGZ1bmN0aW9uIGV2ZW50IChzKVxuICogQHBhcmFtIHtvYmplY3QgfCBib29sZWFufSBbb3B0aW9uc10gb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZyBmb3JcbiAqIGFkZEV2ZW50TGlzdGVuZXJcbiAqIEByZXR1cm4ge29iamVjdH0gaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3Qub24gPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLnN0cmluZyh0eXBlKSAmJiB0eXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgIHR5cGUgPSB0eXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5hcnJheSh0eXBlKSkge1xuICAgIGZvciAoY29uc3QgZXZlbnRUeXBlIG9mIHR5cGUpIHtcbiAgICAgIGludGVyYWN0Lm9uKGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5vYmplY3QodHlwZSkpIHtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdHlwZSkge1xuICAgICAgaW50ZXJhY3Qub24ocHJvcCwgdHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIC8vIGlmIGl0IGlzIGFuIEludGVyYWN0RXZlbnQgdHlwZSwgYWRkIGxpc3RlbmVyIHRvIGdsb2JhbEV2ZW50c1xuICBpZiAodXRpbHMuY29udGFpbnMoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIHR5cGUpKSB7XG4gICAgLy8gaWYgdGhpcyB0eXBlIG9mIGV2ZW50IHdhcyBuZXZlciBib3VuZFxuICAgIGlmICghZ2xvYmFsRXZlbnRzW3R5cGVdKSB7XG4gICAgICBnbG9iYWxFdmVudHNbdHlwZV0gPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGdsb2JhbEV2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gIH1cbiAgLy8gSWYgbm9uIEludGVyYWN0RXZlbnQgdHlwZSwgYWRkRXZlbnRMaXN0ZW5lciB0byBkb2N1bWVudFxuICBlbHNlIHtcbiAgICBldmVudHMuYWRkKHNjb3BlLmRvY3VtZW50LCB0eXBlLCBsaXN0ZW5lciwgeyBvcHRpb25zIH0pO1xuICB9XG5cbiAgcmV0dXJuIGludGVyYWN0O1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgZ2xvYmFsIEludGVyYWN0RXZlbnQgbGlzdGVuZXIgb3IgRE9NIGV2ZW50IGZyb20gYGRvY3VtZW50YFxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Qub2ZmXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheSB8IG9iamVjdH0gdHlwZSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRoYXQgd2VyZSBsaXN0ZW5lZFxuICogZm9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICogQHBhcmFtIHtvYmplY3QgfCBib29sZWFufSBvcHRpb25zIFtvcHRpb25zXSBvYmplY3Qgb3IgdXNlQ2FwdHVyZSBmbGFnIGZvclxuICogcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICogQHJldHVybiB7b2JqZWN0fSBpbnRlcmFjdFxuICovXG5pbnRlcmFjdC5vZmYgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLnN0cmluZyh0eXBlKSAmJiB0eXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgIHR5cGUgPSB0eXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5hcnJheSh0eXBlKSkge1xuICAgIGZvciAoY29uc3QgZXZlbnRUeXBlIG9mIHR5cGUpIHtcbiAgICAgIGludGVyYWN0Lm9mZihldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICBpZiAodXRpbHMuaXMub2JqZWN0KHR5cGUpKSB7XG4gICAgZm9yIChjb25zdCBwcm9wIGluIHR5cGUpIHtcbiAgICAgIGludGVyYWN0Lm9mZihwcm9wLCB0eXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgaWYgKCF1dGlscy5jb250YWlucyhJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgdHlwZSkpIHtcbiAgICBldmVudHMucmVtb3ZlKHNjb3BlLmRvY3VtZW50LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgbGV0IGluZGV4O1xuXG4gICAgaWYgKHR5cGUgaW4gZ2xvYmFsRXZlbnRzXG4gICAgICAgICYmIChpbmRleCA9IGdsb2JhbEV2ZW50c1t0eXBlXS5pbmRleE9mKGxpc3RlbmVyKSkgIT09IC0xKSB7XG4gICAgICBnbG9iYWxFdmVudHNbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3Q7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHdoaWNoIGV4cG9zZXMgaW50ZXJuYWwgZGF0YVxuXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LmRlYnVnXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHRoYXQgb3V0bGluZSB0aGUgY3VycmVudCBzdGF0ZVxuICogYW5kIGV4cG9zZSBpbnRlcm5hbCBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuICovXG5pbnRlcmFjdC5kZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHNjb3BlO1xufTtcblxuLy8gZXhwb3NlIHRoZSBmdW5jdGlvbnMgdXNlZCB0byBjYWxjdWxhdGUgbXVsdGktdG91Y2ggcHJvcGVydGllc1xuaW50ZXJhY3QuZ2V0UG9pbnRlckF2ZXJhZ2UgID0gdXRpbHMucG9pbnRlckF2ZXJhZ2U7XG5pbnRlcmFjdC5nZXRUb3VjaEJCb3ggICAgICAgPSB1dGlscy50b3VjaEJCb3g7XG5pbnRlcmFjdC5nZXRUb3VjaERpc3RhbmNlICAgPSB1dGlscy50b3VjaERpc3RhbmNlO1xuaW50ZXJhY3QuZ2V0VG91Y2hBbmdsZSAgICAgID0gdXRpbHMudG91Y2hBbmdsZTtcblxuaW50ZXJhY3QuZ2V0RWxlbWVudFJlY3QgICAgICAgPSB1dGlscy5nZXRFbGVtZW50UmVjdDtcbmludGVyYWN0LmdldEVsZW1lbnRDbGllbnRSZWN0ID0gdXRpbHMuZ2V0RWxlbWVudENsaWVudFJlY3Q7XG5pbnRlcmFjdC5tYXRjaGVzU2VsZWN0b3IgICAgICA9IHV0aWxzLm1hdGNoZXNTZWxlY3RvcjtcbmludGVyYWN0LmNsb3Nlc3QgICAgICAgICAgICAgID0gdXRpbHMuY2xvc2VzdDtcblxuLyoqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LnN1cHBvcnRzVG91Y2hcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgYnJvd3NlciBzdXBwb3J0cyB0b3VjaCBpbnB1dFxuICovXG5pbnRlcmFjdC5zdXBwb3J0c1RvdWNoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYnJvd3Nlci5zdXBwb3J0c1RvdWNoO1xufTtcblxuLyoqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LnN1cHBvcnRzUG9pbnRlckV2ZW50XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGJyb3dzZXIgc3VwcG9ydHMgUG9pbnRlckV2ZW50c1xuICovXG5pbnRlcmFjdC5zdXBwb3J0c1BvaW50ZXJFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGJyb3dzZXIuc3VwcG9ydHNQb2ludGVyRXZlbnQ7XG59O1xuXG4vKipcbiAqIENhbmNlbHMgYWxsIGludGVyYWN0aW9ucyAoZW5kIGV2ZW50cyBhcmUgbm90IGZpcmVkKVxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Quc3RvcFxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEFuIGV2ZW50IG9uIHdoaWNoIHRvIGNhbGwgcHJldmVudERlZmF1bHQoKVxuICogQHJldHVybiB7b2JqZWN0fSBpbnRlcmFjdFxuICovXG5pbnRlcmFjdC5zdG9wID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGZvciAobGV0IGkgPSBzY29wZS5pbnRlcmFjdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBzY29wZS5pbnRlcmFjdGlvbnNbaV0uc3RvcChldmVudCk7XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3Q7XG59O1xuXG4vKipcbiAqIFJldHVybnMgb3Igc2V0cyB0aGUgZGlzdGFuY2UgdGhlIHBvaW50ZXIgbXVzdCBiZSBtb3ZlZCBiZWZvcmUgYW4gYWN0aW9uXG4gKiBzZXF1ZW5jZSBvY2N1cnMuIFRoaXMgYWxzbyBhZmZlY3RzIHRvbGVyYW5jZSBmb3IgdGFwIGV2ZW50cy5cbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LnBvaW50ZXJNb3ZlVG9sZXJhbmNlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtuZXdWYWx1ZV0gVGhlIG1vdmVtZW50IGZyb20gdGhlIHN0YXJ0IHBvc2l0aW9uIG11c3QgYmUgZ3JlYXRlciB0aGFuIHRoaXMgdmFsdWVcbiAqIEByZXR1cm4ge2ludGVyYWN0IHwgbnVtYmVyfVxuICovXG5pbnRlcmFjdC5wb2ludGVyTW92ZVRvbGVyYW5jZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAodXRpbHMuaXMubnVtYmVyKG5ld1ZhbHVlKSkge1xuICAgIEludGVyYWN0aW9uLnBvaW50ZXJNb3ZlVG9sZXJhbmNlID0gbmV3VmFsdWU7XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICByZXR1cm4gSW50ZXJhY3Rpb24ucG9pbnRlck1vdmVUb2xlcmFuY2U7XG59O1xuXG5pbnRlcmFjdC5hZGREb2N1bWVudCAgICA9IHNjb3BlLmFkZERvY3VtZW50O1xuaW50ZXJhY3QucmVtb3ZlRG9jdW1lbnQgPSBzY29wZS5yZW1vdmVEb2N1bWVudDtcblxuc2NvcGUuaW50ZXJhY3QgPSBpbnRlcmFjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcmFjdDtcbiIsImNvbnN0IGFjdGlvbnMgICAgICAgID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5jb25zdCB1dGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5jb25zdCBJbnRlcmFjdEV2ZW50ICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcbi8qKiBAbGVuZHMgSW50ZXJhY3RhYmxlICovXG5jb25zdCBJbnRlcmFjdGFibGUgICA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xuY29uc3QgSW50ZXJhY3Rpb24gICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG5jb25zdCBkcmFnID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQgICAgIDogZmFsc2UsXG4gICAgbW91c2VCdXR0b25zOiBudWxsLFxuXG4gICAgb3JpZ2luICAgIDogbnVsbCxcbiAgICBzbmFwICAgICAgOiBudWxsLFxuICAgIHJlc3RyaWN0ICA6IG51bGwsXG4gICAgaW5lcnRpYSAgIDogbnVsbCxcbiAgICBhdXRvU2Nyb2xsOiBudWxsLFxuXG4gICAgc3RhcnRBeGlzIDogJ3h5JyxcbiAgICBsb2NrQXhpcyAgOiAneHknLFxuICB9LFxuXG4gIGNoZWNrZXI6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3RhYmxlKSB7XG4gICAgY29uc3QgZHJhZ09wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucy5kcmFnO1xuXG4gICAgcmV0dXJuIGRyYWdPcHRpb25zLmVuYWJsZWRcbiAgICAgID8geyBuYW1lOiAnZHJhZycsIGF4aXM6IChkcmFnT3B0aW9ucy5sb2NrQXhpcyA9PT0gJ3N0YXJ0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZHJhZ09wdGlvbnMuc3RhcnRBeGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkcmFnT3B0aW9ucy5sb2NrQXhpcyl9XG4gICAgICA6IG51bGw7XG4gIH0sXG5cbiAgZ2V0Q3Vyc29yOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICdtb3ZlJztcbiAgfSxcbn07XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2JlZm9yZS1hY3Rpb24tbW92ZScsIGZ1bmN0aW9uICh7IGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykgeyByZXR1cm47IH1cblxuICBjb25zdCBheGlzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuYXhpcztcblxuICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UueSAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55O1xuICAgIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5jbGllbnQueSA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC55O1xuXG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2Uuc3BlZWQgICA9IE1hdGguYWJzKGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnZ4KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnNwZWVkID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eCk7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eSA9IDA7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudnkgICA9IDA7XG4gIH1cbiAgZWxzZSBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UueCAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS54O1xuICAgIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5jbGllbnQueCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC54O1xuXG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2Uuc3BlZWQgICA9IE1hdGguYWJzKGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnZ5KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnNwZWVkID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eSk7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eCA9IDA7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudnggICA9IDA7XG4gIH1cbn0pO1xuXG4vLyBkcmFnbW92ZVxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoeyBpRXZlbnQsIGludGVyYWN0aW9uIH0pIHtcbiAgaWYgKGlFdmVudC50eXBlICE9PSAnZHJhZ21vdmUnKSB7IHJldHVybjsgfVxuXG4gIGNvbnN0IGF4aXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5heGlzO1xuXG4gIGlmIChheGlzID09PSAneCcpIHtcbiAgICBpRXZlbnQucGFnZVkgICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueTtcbiAgICBpRXZlbnQuY2xpZW50WSA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC55O1xuICAgIGlFdmVudC5keSA9IDA7XG4gIH1cbiAgZWxzZSBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgaUV2ZW50LnBhZ2VYICAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLng7XG4gICAgaUV2ZW50LmNsaWVudFggPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueDtcbiAgICBpRXZlbnQuZHggPSAwO1xuICB9XG59KTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoZWxlbWVudCkuZHJhZ2dhYmxlKHtcbiAqICAgICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICAgIG9ubW92ZSA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqXG4gKiAgICAgLy8gdGhlIGF4aXMgaW4gd2hpY2ggdGhlIGZpcnN0IG1vdmVtZW50IG11c3QgYmVcbiAqICAgICAvLyBmb3IgdGhlIGRyYWcgc2VxdWVuY2UgdG8gc3RhcnRcbiAqICAgICAvLyAneHknIGJ5IGRlZmF1bHQgLSBhbnkgZGlyZWN0aW9uXG4gKiAgICAgc3RhcnRBeGlzOiAneCcgfHwgJ3knIHx8ICd4eScsXG4gKlxuICogICAgIC8vICd4eScgYnkgZGVmYXVsdCAtIGRvbid0IHJlc3RyaWN0IHRvIG9uZSBheGlzIChtb3ZlIGluIGFueSBkaXJlY3Rpb24pXG4gKiAgICAgLy8gJ3gnIG9yICd5JyB0byByZXN0cmljdCBtb3ZlbWVudCB0byBlaXRoZXIgYXhpc1xuICogICAgIC8vICdzdGFydCcgdG8gcmVzdHJpY3QgbW92ZW1lbnQgdG8gdGhlIGF4aXMgdGhlIGRyYWcgc3RhcnRlZCBpblxuICogICAgIGxvY2tBeGlzOiAneCcgfHwgJ3knIHx8ICd4eScgfHwgJ3N0YXJ0JyxcbiAqXG4gKiAgICAgLy8gbWF4IG51bWJlciBvZiBkcmFncyB0aGF0IGNhbiBoYXBwZW4gY29uY3VycmVudGx5XG4gKiAgICAgLy8gd2l0aCBlbGVtZW50cyBvZiB0aGlzIEludGVyYWN0YWJsZS4gSW5maW5pdHkgYnkgZGVmYXVsdFxuICogICAgIG1heDogSW5maW5pdHksXG4gKlxuICogICAgIC8vIG1heCBudW1iZXIgb2YgZHJhZ3MgdGhhdCBjYW4gdGFyZ2V0IHRoZSBzYW1lIGVsZW1lbnQrSW50ZXJhY3RhYmxlXG4gKiAgICAgLy8gMSBieSBkZWZhdWx0XG4gKiAgICAgbWF4UGVyRWxlbWVudDogMlxuICogfSk7XG4gKlxuICogdmFyIGlzRHJhZ2dhYmxlID0gaW50ZXJhY3QoJ2VsZW1lbnQnKS5kcmFnZ2FibGUoKTsgLy8gdHJ1ZVxuICogYGBgXG4gKlxuICogR2V0IG9yIHNldCB3aGV0aGVyIGRyYWcgYWN0aW9ucyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3R9IFtvcHRpb25zXSB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50XG4gKiBsaXN0ZW5lcnMgdG8gYmUgZmlyZWQgb24gZHJhZyBldmVudHMgKG9iamVjdCBtYWtlcyB0aGUgSW50ZXJhY3RhYmxlXG4gKiBkcmFnZ2FibGUpXG4gKiBAcmV0dXJuIHtib29sZWFuIHwgSW50ZXJhY3RhYmxlfSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBjYW4gYmUgdGhlXG4gKiB0YXJnZXQgb2YgZHJhZyBldmVudHMsIG9yIHRoaXMgSW50ZXJjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kcmFnZ2FibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmRyYWcuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlOiB0cnVlO1xuICAgIHRoaXMuc2V0UGVyQWN0aW9uKCdkcmFnJywgb3B0aW9ucyk7XG4gICAgdGhpcy5zZXRPbkV2ZW50cygnZHJhZycsIG9wdGlvbnMpO1xuXG4gICAgaWYgKC9eKHh5fHh8eXxzdGFydCkkLy50ZXN0KG9wdGlvbnMubG9ja0F4aXMpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJhZy5sb2NrQXhpcyA9IG9wdGlvbnMubG9ja0F4aXM7XG4gICAgfVxuICAgIGlmICgvXih4eXx4fHkpJC8udGVzdChvcHRpb25zLnN0YXJ0QXhpcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcmFnLnN0YXJ0QXhpcyA9IG9wdGlvbnMuc3RhcnRBeGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHJhZy5lbmFibGVkID0gb3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhpcy5vbmRyYWdzdGFydCA9IHRoaXMub25kcmFnc3RhcnQgPSB0aGlzLm9uZHJhZ2VuZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLmRyYWc7XG59O1xuXG5hY3Rpb25zLmRyYWcgPSBkcmFnO1xuYWN0aW9ucy5uYW1lcy5wdXNoKCdkcmFnJyk7XG51dGlscy5tZXJnZShJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgW1xuICAnZHJhZ3N0YXJ0JyxcbiAgJ2RyYWdtb3ZlJyxcbiAgJ2RyYWdpbmVydGlhc3RhcnQnLFxuICAnZHJhZ2luZXJ0aWFyZXN1bWUnLFxuICAnZHJhZ2VuZCcsXG5dKTtcbmFjdGlvbnMubWV0aG9kRGljdC5kcmFnID0gJ2RyYWdnYWJsZSc7XG5cbmRlZmF1bHRPcHRpb25zLmRyYWcgPSBkcmFnLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRyYWc7XG4iLCJjb25zdCBjbG9uZSAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2Nsb25lJyk7XG5jb25zdCBpcyAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2lzJyk7XG5jb25zdCBldmVudHMgICAgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpO1xuY29uc3QgZXh0ZW5kICAgID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKTtcbmNvbnN0IGFjdGlvbnMgICA9IHJlcXVpcmUoJy4vYWN0aW9ucy9iYXNlJyk7XG5jb25zdCBzY29wZSAgICAgPSByZXF1aXJlKCcuL3Njb3BlJyk7XG5jb25zdCBFdmVudGFibGUgPSByZXF1aXJlKCcuL0V2ZW50YWJsZScpO1xuY29uc3QgZGVmYXVsdHMgID0gcmVxdWlyZSgnLi9kZWZhdWx0T3B0aW9ucycpO1xuY29uc3Qgc2lnbmFscyAgID0gcmVxdWlyZSgnLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbmNvbnN0IHtcbiAgZ2V0RWxlbWVudFJlY3QsXG4gIG5vZGVDb250YWlucyxcbiAgdHJ5U2VsZWN0b3IsXG4gIG1hdGNoZXNTZWxlY3Rvcixcbn0gICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9kb21VdGlscycpO1xuY29uc3QgeyBnZXRXaW5kb3cgfSAgPSByZXF1aXJlKCcuL3V0aWxzL3dpbmRvdycpO1xuY29uc3QgeyBjb250YWlucyB9ICAgPSByZXF1aXJlKCcuL3V0aWxzL2FycicpO1xuY29uc3QgeyB3aGVlbEV2ZW50IH0gPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXInKTtcblxuLy8gYWxsIHNldCBpbnRlcmFjdGFibGVzXG5zY29wZS5pbnRlcmFjdGFibGVzID0gW107XG5cbmNsYXNzIEludGVyYWN0YWJsZSB7XG4gIC8qKiAqL1xuICBjb25zdHJ1Y3RvciAodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLnRhcmdldCAgID0gdGFyZ2V0O1xuICAgIHRoaXMuZXZlbnRzICAgPSBuZXcgRXZlbnRhYmxlKCk7XG4gICAgdGhpcy5fY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCBzY29wZS5kb2N1bWVudDtcbiAgICB0aGlzLl93aW4gICAgID0gZ2V0V2luZG93KHRyeVNlbGVjdG9yKHRhcmdldCk/IHRoaXMuX2NvbnRleHQgOiB0YXJnZXQpO1xuICAgIHRoaXMuX2RvYyAgICAgPSB0aGlzLl93aW4uZG9jdW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ25ldycsIHtcbiAgICAgIHRhcmdldCxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBpbnRlcmFjdGFibGU6IHRoaXMsXG4gICAgICB3aW46IHRoaXMuX3dpbixcbiAgICB9KTtcblxuICAgIHNjb3BlLmFkZERvY3VtZW50KCB0aGlzLl9kb2MsIHRoaXMuX3dpbiApO1xuXG4gICAgc2NvcGUuaW50ZXJhY3RhYmxlcy5wdXNoKHRoaXMpO1xuXG4gICAgdGhpcy5zZXQob3B0aW9ucyk7XG4gIH1cblxuICBzZXRPbkV2ZW50cyAoYWN0aW9uLCBwaGFzZXMpIHtcbiAgICBjb25zdCBvbkFjdGlvbiA9ICdvbicgKyBhY3Rpb247XG5cbiAgICBpZiAoaXMuZnVuY3Rpb24ocGhhc2VzLm9uc3RhcnQpICAgICAgICkgeyB0aGlzLmV2ZW50c1tvbkFjdGlvbiArICdzdGFydCcgICAgICAgIF0gPSBwaGFzZXMub25zdGFydCAgICAgICAgIDsgfVxuICAgIGlmIChpcy5mdW5jdGlvbihwaGFzZXMub25tb3ZlKSAgICAgICAgKSB7IHRoaXMuZXZlbnRzW29uQWN0aW9uICsgJ21vdmUnICAgICAgICAgXSA9IHBoYXNlcy5vbm1vdmUgICAgICAgICAgOyB9XG4gICAgaWYgKGlzLmZ1bmN0aW9uKHBoYXNlcy5vbmVuZCkgICAgICAgICApIHsgdGhpcy5ldmVudHNbb25BY3Rpb24gKyAnZW5kJyAgICAgICAgICBdID0gcGhhc2VzLm9uZW5kICAgICAgICAgICA7IH1cbiAgICBpZiAoaXMuZnVuY3Rpb24ocGhhc2VzLm9uaW5lcnRpYXN0YXJ0KSkgeyB0aGlzLmV2ZW50c1tvbkFjdGlvbiArICdpbmVydGlhc3RhcnQnIF0gPSBwaGFzZXMub25pbmVydGlhc3RhcnQgIDsgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRQZXJBY3Rpb24gKGFjdGlvbiwgb3B0aW9ucykge1xuICAgIC8vIGZvciBhbGwgdGhlIGRlZmF1bHQgcGVyLWFjdGlvbiBvcHRpb25zXG4gICAgZm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgICAgLy8gaWYgdGhpcyBvcHRpb24gZXhpc3RzIGZvciB0aGlzIGFjdGlvblxuICAgICAgaWYgKG9wdGlvbiBpbiBkZWZhdWx0c1thY3Rpb25dKSB7XG4gICAgICAgIC8vIGlmIHRoZSBvcHRpb24gaW4gdGhlIG9wdGlvbnMgYXJnIGlzIGFuIG9iamVjdCB2YWx1ZVxuICAgICAgICBpZiAoaXMub2JqZWN0KG9wdGlvbnNbb3B0aW9uXSkpIHtcbiAgICAgICAgICAvLyBkdXBsaWNhdGUgdGhlIG9iamVjdCBhbmQgbWVyZ2VcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dID0gY2xvbmUodGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSB8fCB7fSk7XG4gICAgICAgICAgZXh0ZW5kKHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0sIG9wdGlvbnNbb3B0aW9uXSk7XG5cbiAgICAgICAgICBpZiAoaXMub2JqZWN0KGRlZmF1bHRzLnBlckFjdGlvbltvcHRpb25dKSAmJiAnZW5hYmxlZCcgaW4gZGVmYXVsdHMucGVyQWN0aW9uW29wdGlvbl0pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0uZW5hYmxlZCA9IG9wdGlvbnNbb3B0aW9uXS5lbmFibGVkID09PSBmYWxzZT8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5ib29sKG9wdGlvbnNbb3B0aW9uXSkgJiYgaXMub2JqZWN0KGRlZmF1bHRzLnBlckFjdGlvbltvcHRpb25dKSkge1xuICAgICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0uZW5hYmxlZCA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zW29wdGlvbl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIG9yIGlmIGl0J3Mgbm90IHVuZGVmaW5lZCwgZG8gYSBwbGFpbiBhc3NpZ25tZW50XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBmdW5jdGlvbiB0byBnZXQgYW4gSW50ZXJhY3RhYmxlcyBib3VuZGluZyByZWN0LiBDYW4gYmVcbiAgICogb3ZlcnJpZGRlbiB1c2luZyB7QGxpbmsgSW50ZXJhY3RhYmxlLnJlY3RDaGVja2VyfS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBbZWxlbWVudF0gVGhlIGVsZW1lbnQgdG8gbWVhc3VyZS5cbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgb2JqZWN0J3MgYm91bmRpbmcgcmVjdGFuZ2xlLlxuICAgKi9cbiAgZ2V0UmVjdCAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMudGFyZ2V0O1xuXG4gICAgaWYgKGlzLnN0cmluZyh0aGlzLnRhcmdldCkgJiYgIShpcy5lbGVtZW50KGVsZW1lbnQpKSkge1xuICAgICAgZWxlbWVudCA9IHRoaXMuX2NvbnRleHQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldEVsZW1lbnRSZWN0KGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb3Igc2V0cyB0aGUgZnVuY3Rpb24gdXNlZCB0byBjYWxjdWxhdGUgdGhlIGludGVyYWN0YWJsZSdzXG4gICAqIGVsZW1lbnQncyByZWN0YW5nbGVcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NoZWNrZXJdIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGlzIEludGVyYWN0YWJsZSdzXG4gICAqIGJvdW5kaW5nIHJlY3RhbmdsZS4gU2VlIHtAbGluayBJbnRlcmFjdGFibGUuZ2V0UmVjdH1cbiAgICogQHJldHVybiB7ZnVuY3Rpb24gfCBvYmplY3R9IFRoZSBjaGVja2VyIGZ1bmN0aW9uIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuICByZWN0Q2hlY2tlciAoY2hlY2tlcikge1xuICAgIGlmIChpcy5mdW5jdGlvbihjaGVja2VyKSkge1xuICAgICAgdGhpcy5nZXRSZWN0ID0gY2hlY2tlcjtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrZXIgPT09IG51bGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuZ2V0UmVjdDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVjdDtcbiAgfVxuXG4gIF9iYWNrQ29tcGF0T3B0aW9uIChvcHRpb25OYW1lLCBuZXdWYWx1ZSkge1xuICAgIGlmICh0cnlTZWxlY3RvcihuZXdWYWx1ZSkgfHwgaXMub2JqZWN0KG5ld1ZhbHVlKSkge1xuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gbmV3VmFsdWU7XG5cbiAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMubmFtZXMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uTmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIG9yaWdpbiBvZiB0aGUgSW50ZXJhY3RhYmxlJ3MgZWxlbWVudC4gIFRoZSB4IGFuZCB5XG4gICAqIG9mIHRoZSBvcmlnaW4gd2lsbCBiZSBzdWJ0cmFjdGVkIGZyb20gYWN0aW9uIGV2ZW50IGNvb3JkaW5hdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnQgfCBvYmplY3QgfCBzdHJpbmd9IFtvcmlnaW5dIEFuIEhUTUwgb3IgU1ZHIEVsZW1lbnQgd2hvc2VcbiAgICogcmVjdCB3aWxsIGJlIHVzZWQsIGFuIG9iamVjdCBlZy4geyB4OiAwLCB5OiAwIH0gb3Igc3RyaW5nICdwYXJlbnQnLCAnc2VsZidcbiAgICogb3IgYW55IENTUyBzZWxlY3RvclxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBjdXJyZW50IG9yaWdpbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgb3JpZ2luIChuZXdWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9iYWNrQ29tcGF0T3B0aW9uKCdvcmlnaW4nLCBuZXdWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBvciBzZXRzIHRoZSBtb3VzZSBjb29yZGluYXRlIHR5cGVzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZVxuICAgKiBtb3ZlbWVudCBvZiB0aGUgcG9pbnRlci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuZXdWYWx1ZV0gVXNlICdjbGllbnQnIGlmIHlvdSB3aWxsIGJlIHNjcm9sbGluZyB3aGlsZVxuICAgKiBpbnRlcmFjdGluZzsgVXNlICdwYWdlJyBpZiB5b3Ugd2FudCBhdXRvU2Nyb2xsIHRvIHdvcmtcbiAgICogQHJldHVybiB7c3RyaW5nIHwgb2JqZWN0fSBUaGUgY3VycmVudCBkZWx0YVNvdXJjZSBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgZGVsdGFTb3VyY2UgKG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlID09PSAncGFnZScgfHwgbmV3VmFsdWUgPT09ICdjbGllbnQnKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVsdGFTb3VyY2UgPSBuZXdWYWx1ZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kZWx0YVNvdXJjZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzZWxlY3RvciBjb250ZXh0IE5vZGUgb2YgdGhlIEludGVyYWN0YWJsZS4gVGhlIGRlZmF1bHQgaXNcbiAgICogYHdpbmRvdy5kb2N1bWVudGAuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IFRoZSBjb250ZXh0IE5vZGUgb2YgdGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIGNvbnRleHQgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICB9XG5cbiAgaW5Db250ZXh0IChlbGVtZW50KSB7XG4gICAgcmV0dXJuICh0aGlzLl9jb250ZXh0ID09PSBlbGVtZW50Lm93bmVyRG9jdW1lbnRcbiAgICAgICAgICAgIHx8IG5vZGVDb250YWlucyh0aGlzLl9jb250ZXh0LCBlbGVtZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgbGlzdGVuZXJzIGZvciB0aGUgZ2l2ZW4gSW50ZXJhY3RFdmVudCB0eXBlIGJvdW5kIGdsb2JhbGx5XG4gICAqIGFuZCBkaXJlY3RseSB0byB0aGlzIEludGVyYWN0YWJsZVxuICAgKlxuICAgKiBAcGFyYW0ge0ludGVyYWN0RXZlbnR9IGlFdmVudCBUaGUgSW50ZXJhY3RFdmVudCBvYmplY3QgdG8gYmUgZmlyZWQgb24gdGhpc1xuICAgKiBJbnRlcmFjdGFibGVcbiAgICogQHJldHVybiB7SW50ZXJhY3RhYmxlfSB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgZmlyZSAoaUV2ZW50KSB7XG4gICAgdGhpcy5ldmVudHMuZmlyZShpRXZlbnQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfb25PZmZNdWx0aXBsZSAobWV0aG9kLCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzLnN0cmluZyhldmVudFR5cGUpICYmIGV2ZW50VHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICAgIGV2ZW50VHlwZSA9IGV2ZW50VHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gICAgfVxuXG4gICAgaWYgKGlzLmFycmF5KGV2ZW50VHlwZSkpIHtcbiAgICAgIGZvciAoY29uc3QgdHlwZSBvZiBldmVudFR5cGUpIHtcbiAgICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlzLm9iamVjdChldmVudFR5cGUpKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXNbbWV0aG9kXShwcm9wLCBldmVudFR5cGVbcHJvcF0sIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGEgbGlzdGVuZXIgZm9yIGFuIEludGVyYWN0RXZlbnQsIHBvaW50ZXJFdmVudCBvciBET00gZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IGV2ZW50VHlwZSAgVGhlIHR5cGVzIG9mIGV2ZW50cyB0byBsaXN0ZW5cbiAgICogZm9yXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyICAgVGhlIGZ1bmN0aW9uIGV2ZW50IChzKVxuICAgKiBAcGFyYW0ge29iamVjdCB8IGJvb2xlYW59IFtvcHRpb25zXSAgICBvcHRpb25zIG9iamVjdCBvciB1c2VDYXB0dXJlIGZsYWdcbiAgICogZm9yIGFkZEV2ZW50TGlzdGVuZXJcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgb24gKGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5fb25PZmZNdWx0aXBsZSgnb24nLCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3doZWVsJykgeyBldmVudFR5cGUgPSB3aGVlbEV2ZW50OyB9XG5cbiAgICBpZiAoY29udGFpbnMoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICAvLyBkZWxlZ2F0ZWQgZXZlbnQgZm9yIHNlbGVjdG9yXG4gICAgZWxzZSBpZiAoaXMuc3RyaW5nKHRoaXMudGFyZ2V0KSkge1xuICAgICAgZXZlbnRzLmFkZERlbGVnYXRlKHRoaXMudGFyZ2V0LCB0aGlzLl9jb250ZXh0LCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBldmVudHMuYWRkKHRoaXMudGFyZ2V0LCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIEludGVyYWN0RXZlbnQsIHBvaW50ZXJFdmVudCBvciBET00gZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheSB8IG9iamVjdH0gZXZlbnRUeXBlIFRoZSB0eXBlcyBvZiBldmVudHMgdGhhdCB3ZXJlXG4gICAqIGxpc3RlbmVkIGZvclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICAgKiBAcGFyYW0ge29iamVjdCB8IGJvb2xlYW59IFtvcHRpb25zXSBvcHRpb25zIG9iamVjdCBvciB1c2VDYXB0dXJlIGZsYWcgZm9yXG4gICAqIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGlzIEludGVyYWN0YWJsZVxuICAgKi9cbiAgb2ZmIChldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuX29uT2ZmTXVsdGlwbGUoJ29mZicsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoZXZlbnRUeXBlID09PSAnd2hlZWwnKSB7IGV2ZW50VHlwZSA9IHdoZWVsRXZlbnQ7IH1cblxuICAgIC8vIGlmIGl0IGlzIGFuIGFjdGlvbiBldmVudCB0eXBlXG4gICAgaWYgKGNvbnRhaW5zKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vZmYoZXZlbnRUeXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIC8vIGRlbGVnYXRlZCBldmVudFxuICAgIGVsc2UgaWYgKGlzLnN0cmluZyh0aGlzLnRhcmdldCkpIHtcbiAgICAgIGV2ZW50cy5yZW1vdmVEZWxlZ2F0ZSh0aGlzLnRhcmdldCwgdGhpcy5fY29udGV4dCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBmcm9tIHRoaXMgSW50ZXJhdGFibGUncyBlbGVtZW50XG4gICAgZWxzZSB7XG4gICAgICBldmVudHMucmVtb3ZlKHRoaXMudGFyZ2V0LCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgb3B0aW9ucyBvZiB0aGlzIEludGVyYWN0YWJsZVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBUaGUgbmV3IHNldHRpbmdzIHRvIGFwcGx5XG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG4gIHNldCAob3B0aW9ucykge1xuICAgIGlmICghaXMub2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gY2xvbmUoZGVmYXVsdHMuYmFzZSk7XG5cbiAgICBjb25zdCBwZXJBY3Rpb25zID0gY2xvbmUoZGVmYXVsdHMucGVyQWN0aW9uKTtcblxuICAgIGZvciAoY29uc3QgYWN0aW9uTmFtZSBpbiBhY3Rpb25zLm1ldGhvZERpY3QpIHtcbiAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBhY3Rpb25zLm1ldGhvZERpY3RbYWN0aW9uTmFtZV07XG5cbiAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25OYW1lXSA9IGNsb25lKGRlZmF1bHRzW2FjdGlvbk5hbWVdKTtcblxuICAgICAgdGhpcy5zZXRQZXJBY3Rpb24oYWN0aW9uTmFtZSwgcGVyQWN0aW9ucyk7XG5cbiAgICAgIHRoaXNbbWV0aG9kTmFtZV0ob3B0aW9uc1thY3Rpb25OYW1lXSk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIEludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMpIHtcbiAgICAgIHRoaXMub3B0aW9uc1tzZXR0aW5nXSA9IGRlZmF1bHRzLmJhc2Vbc2V0dGluZ107XG5cbiAgICAgIGlmIChzZXR0aW5nIGluIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpc1tzZXR0aW5nXShvcHRpb25zW3NldHRpbmddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ3NldCcsIHtcbiAgICAgIG9wdGlvbnMsXG4gICAgICBpbnRlcmFjdGFibGU6IHRoaXMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhpcyBpbnRlcmFjdGFibGUgZnJvbSB0aGUgbGlzdCBvZiBpbnRlcmFjdGFibGVzIGFuZCByZW1vdmUgaXQnc1xuICAgKiBhY3Rpb24gY2FwYWJpbGl0aWVzIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICpcbiAgICogQHJldHVybiB7aW50ZXJhY3R9XG4gICAqL1xuICB1bnNldCAoKSB7XG4gICAgZXZlbnRzLnJlbW92ZSh0aGlzLnRhcmdldCwgJ2FsbCcpO1xuXG4gICAgaWYgKGlzLnN0cmluZyh0aGlzLnRhcmdldCkpIHtcbiAgICAgIC8vIHJlbW92ZSBkZWxlZ2F0ZWQgZXZlbnRzXG4gICAgICBmb3IgKGNvbnN0IHR5cGUgaW4gZXZlbnRzLmRlbGVnYXRlZEV2ZW50cykge1xuICAgICAgICBjb25zdCBkZWxlZ2F0ZWQgPSBldmVudHMuZGVsZWdhdGVkRXZlbnRzW3R5cGVdO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzWzBdID09PSB0aGlzLnRhcmdldFxuICAgICAgICAgICAgJiYgZGVsZWdhdGVkLmNvbnRleHRzWzBdID09PSB0aGlzLl9jb250ZXh0KSB7XG5cbiAgICAgICAgICBkZWxlZ2F0ZWQuc2VsZWN0b3JzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICBkZWxlZ2F0ZWQuY29udGV4dHMgLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICBkZWxlZ2F0ZWQubGlzdGVuZXJzLnNwbGljZSgwLCAxKTtcblxuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYXJyYXlzIGlmIHRoZXkgYXJlIGVtcHR5XG4gICAgICAgICAgaWYgKCFkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZWdhdGVkW3R5cGVdID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2NvbnRleHQsIHR5cGUsIGV2ZW50cy5kZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLl9jb250ZXh0LCB0eXBlLCBldmVudHMuZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBldmVudHMucmVtb3ZlKHRoaXMsICdhbGwnKTtcbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ3Vuc2V0JywgeyBpbnRlcmFjdGFibGU6IHRoaXMgfSk7XG5cbiAgICBzY29wZS5pbnRlcmFjdGFibGVzLnNwbGljZShzY29wZS5pbnRlcmFjdGFibGVzLmluZGV4T2YodGhpcyksIDEpO1xuXG4gICAgLy8gU3RvcCByZWxhdGVkIGludGVyYWN0aW9ucyB3aGVuIGFuIEludGVyYWN0YWJsZSBpcyB1bnNldFxuICAgIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zIHx8IFtdKSB7XG4gICAgICBpZiAoaW50ZXJhY3Rpb24udGFyZ2V0ID09PSB0aGlzICYmIGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgJiYgIWludGVyYWN0aW9uLl9lbmRpbmcpIHtcbiAgICAgICAgaW50ZXJhY3Rpb24uc3RvcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzY29wZS5pbnRlcmFjdDtcbiAgfVxufVxuXG5zY29wZS5pbnRlcmFjdGFibGVzLmluZGV4T2ZFbGVtZW50ID0gZnVuY3Rpb24gaW5kZXhPZkVsZW1lbnQgKHRhcmdldCwgY29udGV4dCkge1xuICBjb250ZXh0ID0gY29udGV4dCB8fCBzY29wZS5kb2N1bWVudDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpbnRlcmFjdGFibGUgPSB0aGlzW2ldO1xuXG4gICAgaWYgKGludGVyYWN0YWJsZS50YXJnZXQgPT09IHRhcmdldCAmJiBpbnRlcmFjdGFibGUuX2NvbnRleHQgPT09IGNvbnRleHQpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5zY29wZS5pbnRlcmFjdGFibGVzLmdldCA9IGZ1bmN0aW9uIGludGVyYWN0YWJsZUdldCAoZWxlbWVudCwgb3B0aW9ucywgZG9udENoZWNrSW5Db250ZXh0KSB7XG4gIGNvbnN0IHJldCA9IHRoaXNbdGhpcy5pbmRleE9mRWxlbWVudChlbGVtZW50LCBvcHRpb25zICYmIG9wdGlvbnMuY29udGV4dCldO1xuXG4gIHJldHVybiByZXQgJiYgKGlzLnN0cmluZyhlbGVtZW50KSB8fCBkb250Q2hlY2tJbkNvbnRleHQgfHwgcmV0LmluQ29udGV4dChlbGVtZW50KSk/IHJldCA6IG51bGw7XG59O1xuXG5zY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjYWxsYmFjaykge1xuICBmb3IgKGNvbnN0IGludGVyYWN0YWJsZSBvZiB0aGlzKSB7XG4gICAgbGV0IHJldDtcblxuICAgIGlmICgoaXMuc3RyaW5nKGludGVyYWN0YWJsZS50YXJnZXQpXG4gICAgICAgIC8vIHRhcmdldCBpcyBhIHNlbGVjdG9yIGFuZCB0aGUgZWxlbWVudCBtYXRjaGVzXG4gICAgICAgID8gKGlzLmVsZW1lbnQoZWxlbWVudCkgJiYgbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIGludGVyYWN0YWJsZS50YXJnZXQpKVxuICAgICAgICAvLyB0YXJnZXQgaXMgdGhlIGVsZW1lbnRcbiAgICAgICAgOiBlbGVtZW50ID09PSBpbnRlcmFjdGFibGUudGFyZ2V0KVxuICAgICAgICAvLyB0aGUgZWxlbWVudCBpcyBpbiBjb250ZXh0XG4gICAgICAmJiAoaW50ZXJhY3RhYmxlLmluQ29udGV4dChlbGVtZW50KSkpIHtcbiAgICAgIHJldCA9IGNhbGxiYWNrKGludGVyYWN0YWJsZSk7XG4gICAgfVxuXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxufTtcblxuLy8gYWxsIGludGVyYWN0LmpzIGV2ZW50VHlwZXNcbkludGVyYWN0YWJsZS5ldmVudFR5cGVzID0gc2NvcGUuZXZlbnRUeXBlcyA9IFtdO1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscyA9IHNpZ25hbHM7XG5cbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMgPSBbICdkZWx0YVNvdXJjZScsICdvcmlnaW4nLCAncHJldmVudERlZmF1bHQnLCAncmVjdENoZWNrZXInIF07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJhY3RhYmxlO1xuIiwiY29uc3QgaXMgPSByZXF1aXJlKCcuL2lzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2xvbmUgKHNvdXJjZSkge1xuICBjb25zdCBkZXN0ID0ge307XG4gIGZvciAoY29uc3QgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICBpZiAoaXMucGxhaW5PYmplY3Qoc291cmNlW3Byb3BdKSkge1xuICAgICAgZGVzdFtwcm9wXSA9IGNsb25lKHNvdXJjZVtwcm9wXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufTtcbiIsImNvbnN0IEludGVyYWN0aW9uICAgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuY29uc3QgSW50ZXJhY3RFdmVudCA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcblxuY29uc3QgYWN0aW9ucyA9IHtcbiAgZmlyZVByZXBhcmVkLFxuICBuYW1lczogW10sXG4gIG1ldGhvZERpY3Q6IHt9LFxufTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLXN0YXJ0JywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50IH0pIHtcbiAgaW50ZXJhY3Rpb24uX2ludGVyYWN0aW5nID0gdHJ1ZTtcbiAgZmlyZVByZXBhcmVkKGludGVyYWN0aW9uLCBldmVudCwgJ3N0YXJ0Jyk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLW1vdmUnLCBmdW5jdGlvbiAoeyBpbnRlcmFjdGlvbiwgZXZlbnQsIHByZUVuZCB9KSB7XG4gIGZpcmVQcmVwYXJlZChpbnRlcmFjdGlvbiwgZXZlbnQsICdtb3ZlJywgcHJlRW5kKTtcblxuICAvLyBpZiB0aGUgYWN0aW9uIHdhcyBlbmRlZCBpbiBhIGxpc3RlbmVyXG4gIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkgeyByZXR1cm4gZmFsc2U7IH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tZW5kJywgZnVuY3Rpb24gKHsgaW50ZXJhY3Rpb24sIGV2ZW50IH0pIHtcbiAgZmlyZVByZXBhcmVkKGludGVyYWN0aW9uLCBldmVudCwgJ2VuZCcpO1xufSk7XG5cbmZ1bmN0aW9uIGZpcmVQcmVwYXJlZCAoaW50ZXJhY3Rpb24sIGV2ZW50LCBwaGFzZSwgcHJlRW5kKSB7XG4gIGNvbnN0IGFjdGlvbk5hbWUgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lO1xuXG4gIGNvbnN0IG5ld0V2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQoaW50ZXJhY3Rpb24sIGV2ZW50LCBhY3Rpb25OYW1lLCBwaGFzZSwgaW50ZXJhY3Rpb24uZWxlbWVudCwgbnVsbCwgcHJlRW5kKTtcblxuICBpbnRlcmFjdGlvbi50YXJnZXQuZmlyZShuZXdFdmVudCk7XG4gIGludGVyYWN0aW9uLnByZXZFdmVudCA9IG5ld0V2ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFjdGlvbnM7XG4iLCJjb25zdCBzY29wZSAgICAgID0gcmVxdWlyZSgnLi9zY29wZScpO1xuY29uc3QgdXRpbHMgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IGV2ZW50cyAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpO1xuY29uc3QgYnJvd3NlciAgICA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpO1xuY29uc3QgZG9tT2JqZWN0cyA9IHJlcXVpcmUoJy4vdXRpbHMvZG9tT2JqZWN0cycpO1xuY29uc3QgZmluZGVyICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvaW50ZXJhY3Rpb25GaW5kZXInKTtcbmNvbnN0IHNpZ25hbHMgICAgPSByZXF1aXJlKCcuL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxuY29uc3QgbGlzdGVuZXJzICAgPSB7fTtcbmNvbnN0IG1ldGhvZE5hbWVzID0gW1xuICAncG9pbnRlckRvd24nLCAncG9pbnRlck1vdmUnLCAncG9pbnRlclVwJyxcbiAgJ3VwZGF0ZVBvaW50ZXInLCAncmVtb3ZlUG9pbnRlcicsXG5dO1xuXG4vLyBmb3IgaWdub3JpbmcgYnJvd3NlcidzIHNpbXVsYXRlZCBtb3VzZSBldmVudHNcbmxldCBwcmV2VG91Y2hUaW1lID0gMDtcblxuLy8gYWxsIGFjdGl2ZSBhbmQgaWRsZSBpbnRlcmFjdGlvbnNcbnNjb3BlLmludGVyYWN0aW9ucyA9IFtdO1xuXG5jbGFzcyBJbnRlcmFjdGlvbiB7XG4gIC8qKiAqL1xuICBjb25zdHJ1Y3RvciAoeyBwb2ludGVyVHlwZSB9KSB7XG4gICAgdGhpcy50YXJnZXQgICAgICAgID0gbnVsbDsgLy8gY3VycmVudCBpbnRlcmFjdGFibGUgYmVpbmcgaW50ZXJhY3RlZCB3aXRoXG4gICAgdGhpcy5lbGVtZW50ICAgICAgID0gbnVsbDsgLy8gdGhlIHRhcmdldCBlbGVtZW50IG9mIHRoZSBpbnRlcmFjdGFibGVcblxuICAgIHRoaXMucHJlcGFyZWQgICAgICA9IHsgICAgIC8vIGFjdGlvbiB0aGF0J3MgcmVhZHkgdG8gYmUgZmlyZWQgb24gbmV4dCBtb3ZlIGV2ZW50XG4gICAgICBuYW1lIDogbnVsbCxcbiAgICAgIGF4aXMgOiBudWxsLFxuICAgICAgZWRnZXM6IG51bGwsXG4gICAgfTtcblxuICAgIC8vIGtlZXAgdHJhY2sgb2YgYWRkZWQgcG9pbnRlcnNcbiAgICB0aGlzLnBvaW50ZXJzICAgID0gW107XG4gICAgdGhpcy5wb2ludGVySWRzICA9IFtdO1xuICAgIHRoaXMuZG93blRhcmdldHMgPSBbXTtcbiAgICB0aGlzLmRvd25UaW1lcyAgID0gW107XG5cbiAgICAvLyBQcmV2aW91cyBuYXRpdmUgcG9pbnRlciBtb3ZlIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgdGhpcy5wcmV2Q29vcmRzID0ge1xuICAgICAgcGFnZSAgICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGNsaWVudCAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICB0aW1lU3RhbXA6IDAsXG4gICAgfTtcbiAgICAvLyBjdXJyZW50IG5hdGl2ZSBwb2ludGVyIG1vdmUgZXZlbnQgY29vcmRpbmF0ZXNcbiAgICB0aGlzLmN1ckNvb3JkcyA9IHtcbiAgICAgIHBhZ2UgICAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBjbGllbnQgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgdGltZVN0YW1wOiAwLFxuICAgIH07XG5cbiAgICAvLyBTdGFydGluZyBJbnRlcmFjdEV2ZW50IHBvaW50ZXIgY29vcmRpbmF0ZXNcbiAgICB0aGlzLnN0YXJ0Q29vcmRzID0ge1xuICAgICAgcGFnZSAgICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGNsaWVudCAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICB0aW1lU3RhbXA6IDAsXG4gICAgfTtcblxuICAgIC8vIENoYW5nZSBpbiBjb29yZGluYXRlcyBhbmQgdGltZSBvZiB0aGUgcG9pbnRlclxuICAgIHRoaXMucG9pbnRlckRlbHRhID0ge1xuICAgICAgcGFnZSAgICAgOiB7IHg6IDAsIHk6IDAsIHZ4OiAwLCB2eTogMCwgc3BlZWQ6IDAgfSxcbiAgICAgIGNsaWVudCAgIDogeyB4OiAwLCB5OiAwLCB2eDogMCwgdnk6IDAsIHNwZWVkOiAwIH0sXG4gICAgICB0aW1lU3RhbXA6IDAsXG4gICAgfTtcblxuICAgIHRoaXMuZG93bkV2ZW50ICAgPSBudWxsOyAgICAvLyBwb2ludGVyZG93bi9tb3VzZWRvd24vdG91Y2hzdGFydCBldmVudFxuICAgIHRoaXMuZG93blBvaW50ZXIgPSB7fTtcblxuICAgIHRoaXMuX2V2ZW50VGFyZ2V0ICAgID0gbnVsbDtcbiAgICB0aGlzLl9jdXJFdmVudFRhcmdldCA9IG51bGw7XG5cbiAgICB0aGlzLnByZXZFdmVudCA9IG51bGw7ICAgICAgLy8gcHJldmlvdXMgYWN0aW9uIGV2ZW50XG5cbiAgICB0aGlzLnBvaW50ZXJJc0Rvd24gICA9IGZhbHNlO1xuICAgIHRoaXMucG9pbnRlcldhc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5faW50ZXJhY3RpbmcgICAgPSBmYWxzZTtcbiAgICB0aGlzLl9lbmRpbmcgICAgICAgICA9IGZhbHNlO1xuXG4gICAgdGhpcy5wb2ludGVyVHlwZSA9IHBvaW50ZXJUeXBlO1xuXG4gICAgc2lnbmFscy5maXJlKCduZXcnLCB0aGlzKTtcblxuICAgIHNjb3BlLmludGVyYWN0aW9ucy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgcG9pbnRlckRvd24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICAgIGNvbnN0IHBvaW50ZXJJbmRleCA9IHRoaXMudXBkYXRlUG9pbnRlcihwb2ludGVyLCBldmVudCwgdHJ1ZSk7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2Rvd24nLCB7XG4gICAgICBwb2ludGVyLFxuICAgICAgZXZlbnQsXG4gICAgICBldmVudFRhcmdldCxcbiAgICAgIHBvaW50ZXJJbmRleCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGBgYGpzXG4gICAqIGludGVyYWN0KHRhcmdldClcbiAgICogICAuZHJhZ2dhYmxlKHtcbiAgICogICAgIC8vIGRpc2FibGUgdGhlIGRlZmF1bHQgZHJhZyBzdGFydCBieSBkb3duLT5tb3ZlXG4gICAqICAgICBtYW51YWxTdGFydDogdHJ1ZVxuICAgKiAgIH0pXG4gICAqICAgLy8gc3RhcnQgZHJhZ2dpbmcgYWZ0ZXIgdGhlIHVzZXIgaG9sZHMgdGhlIHBvaW50ZXIgZG93blxuICAgKiAgIC5vbignaG9sZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgKiAgICAgdmFyIGludGVyYWN0aW9uID0gZXZlbnQuaW50ZXJhY3Rpb247XG4gICAqXG4gICAqICAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICogICAgICAgaW50ZXJhY3Rpb24uc3RhcnQoeyBuYW1lOiAnZHJhZycgfSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICogICAgIH1cbiAgICogfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBTdGFydCBhbiBhY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gSW50ZXJhY3RhYmxlIGFuZCBFbGVtZW50IGFzIHRhcnRnZXRzLiBUaGVcbiAgICogYWN0aW9uIG11c3QgYmUgZW5hYmxlZCBmb3IgdGhlIHRhcmdldCBJbnRlcmFjdGFibGUgYW5kIGFuIGFwcHJvcHJpYXRlXG4gICAqIG51bWJlciBvZiBwb2ludGVycyBtdXN0IGJlIGhlbGQgZG93biAtIDEgZm9yIGRyYWcvcmVzaXplLCAyIGZvciBnZXN0dXJlLlxuICAgKlxuICAgKiBVc2UgaXQgd2l0aCBgaW50ZXJhY3RhYmxlLjxhY3Rpb24+YWJsZSh7IG1hbnVhbFN0YXJ0OiBmYWxzZSB9KWAgdG8gYWx3YXlzXG4gICAqIFtzdGFydCBhY3Rpb25zIG1hbnVhbGx5XShodHRwczovL2dpdGh1Yi5jb20vdGF5ZS9pbnRlcmFjdC5qcy9pc3N1ZXMvMTE0KVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uICAgVGhlIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQgLSBkcmFnLCByZXNpemUsIGV0Yy5cbiAgICogQHBhcmFtIHtJbnRlcmFjdGFibGV9IHRhcmdldCAgVGhlIEludGVyYWN0YWJsZSB0byB0YXJnZXRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBET00gRWxlbWVudCB0byB0YXJnZXRcbiAgICogQHJldHVybiB7b2JqZWN0fSBpbnRlcmFjdFxuICAgKi9cbiAgc3RhcnQgKGFjdGlvbiwgdGFyZ2V0LCBlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuaW50ZXJhY3RpbmcoKVxuICAgICAgICB8fCAhdGhpcy5wb2ludGVySXNEb3duXG4gICAgICAgIHx8IHRoaXMucG9pbnRlcklkcy5sZW5ndGggPCAoYWN0aW9uLm5hbWUgPT09ICdnZXN0dXJlJz8gMiA6IDEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgdGhpcyBpbnRlcmFjdGlvbiBoYWQgYmVlbiByZW1vdmVkIGFmdGVyIHN0b3BwaW5nXG4gICAgLy8gYWRkIGl0IGJhY2tcbiAgICBpZiAoc2NvcGUuaW50ZXJhY3Rpb25zLmluZGV4T2YodGhpcykgPT09IC0xKSB7XG4gICAgICBzY29wZS5pbnRlcmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICB1dGlscy5jb3B5QWN0aW9uKHRoaXMucHJlcGFyZWQsIGFjdGlvbik7XG4gICAgdGhpcy50YXJnZXQgICAgICAgICA9IHRhcmdldDtcbiAgICB0aGlzLmVsZW1lbnQgICAgICAgID0gZWxlbWVudDtcblxuICAgIHNpZ25hbHMuZmlyZSgnYWN0aW9uLXN0YXJ0Jywge1xuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgICBldmVudDogdGhpcy5kb3duRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICBwb2ludGVyTW92ZSAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKCF0aGlzLnNpbXVsYXRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlUG9pbnRlcihwb2ludGVyKTtcbiAgICAgIHV0aWxzLnNldENvb3Jkcyh0aGlzLmN1ckNvb3JkcywgdGhpcy5wb2ludGVycyk7XG4gICAgfVxuXG4gICAgY29uc3QgZHVwbGljYXRlTW92ZSA9ICh0aGlzLmN1ckNvb3Jkcy5wYWdlLnggPT09IHRoaXMucHJldkNvb3Jkcy5wYWdlLnhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY3VyQ29vcmRzLnBhZ2UueSA9PT0gdGhpcy5wcmV2Q29vcmRzLnBhZ2UueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJDb29yZHMuY2xpZW50LnggPT09IHRoaXMucHJldkNvb3Jkcy5jbGllbnQueFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJDb29yZHMuY2xpZW50LnkgPT09IHRoaXMucHJldkNvb3Jkcy5jbGllbnQueSk7XG5cbiAgICBsZXQgZHg7XG4gICAgbGV0IGR5O1xuXG4gICAgLy8gcmVnaXN0ZXIgbW92ZW1lbnQgZ3JlYXRlciB0aGFuIHBvaW50ZXJNb3ZlVG9sZXJhbmNlXG4gICAgaWYgKHRoaXMucG9pbnRlcklzRG93biAmJiAhdGhpcy5wb2ludGVyV2FzTW92ZWQpIHtcbiAgICAgIGR4ID0gdGhpcy5jdXJDb29yZHMuY2xpZW50LnggLSB0aGlzLnN0YXJ0Q29vcmRzLmNsaWVudC54O1xuICAgICAgZHkgPSB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueSAtIHRoaXMuc3RhcnRDb29yZHMuY2xpZW50Lnk7XG5cbiAgICAgIHRoaXMucG9pbnRlcldhc01vdmVkID0gdXRpbHMuaHlwb3QoZHgsIGR5KSA+IEludGVyYWN0aW9uLnBvaW50ZXJNb3ZlVG9sZXJhbmNlO1xuICAgIH1cblxuICAgIGNvbnN0IHNpZ25hbEFyZyA9IHtcbiAgICAgIHBvaW50ZXIsXG4gICAgICBwb2ludGVySW5kZXg6IHRoaXMuZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpLFxuICAgICAgZXZlbnQsXG4gICAgICBldmVudFRhcmdldCxcbiAgICAgIGR4LFxuICAgICAgZHksXG4gICAgICBkdXBsaWNhdGU6IGR1cGxpY2F0ZU1vdmUsXG4gICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICAgIGludGVyYWN0aW5nQmVmb3JlTW92ZTogdGhpcy5pbnRlcmFjdGluZygpLFxuICAgIH07XG5cbiAgICBpZiAoIWR1cGxpY2F0ZU1vdmUpIHtcbiAgICAgIC8vIHNldCBwb2ludGVyIGNvb3JkaW5hdGUsIHRpbWUgY2hhbmdlcyBhbmQgc3BlZWRzXG4gICAgICB1dGlscy5zZXRDb29yZERlbHRhcyh0aGlzLnBvaW50ZXJEZWx0YSwgdGhpcy5wcmV2Q29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCdtb3ZlJywgc2lnbmFsQXJnKTtcblxuICAgIGlmICghZHVwbGljYXRlTW92ZSkge1xuICAgICAgLy8gaWYgaW50ZXJhY3RpbmcsIGZpcmUgYW4gJ2FjdGlvbi1tb3ZlJyBzaWduYWwgZXRjXG4gICAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgIHRoaXMuZG9Nb3ZlKHNpZ25hbEFyZyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBvaW50ZXJXYXNNb3ZlZCkge1xuICAgICAgICB1dGlscy5jb3B5Q29vcmRzKHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBgYGBqc1xuICAgKiBpbnRlcmFjdCh0YXJnZXQpXG4gICAqICAgLmRyYWdnYWJsZSh0cnVlKVxuICAgKiAgIC5vbignZHJhZ21vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICogICAgIGlmIChzb21lQ29uZGl0aW9uKSB7XG4gICAqICAgICAgIC8vIGNoYW5nZSB0aGUgc25hcCBzZXR0aW5nc1xuICAgKiAgICAgICBldmVudC5pbnRlcmFjdGFibGUuZHJhZ2dhYmxlKHsgc25hcDogeyB0YXJnZXRzOiBbXSB9fSk7XG4gICAqICAgICAgIC8vIGZpcmUgYW5vdGhlciBtb3ZlIGV2ZW50IHdpdGggcmUtY2FsY3VsYXRlZCBzbmFwXG4gICAqICAgICAgIGV2ZW50LmludGVyYWN0aW9uLmRvTW92ZSgpO1xuICAgKiAgICAgfVxuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogRm9yY2UgYSBtb3ZlIG9mIHRoZSBjdXJyZW50IGFjdGlvbiBhdCB0aGUgc2FtZSBjb29yZGluYXRlcy4gVXNlZnVsIGlmXG4gICAqIHNuYXAvcmVzdHJpY3QgaGFzIGJlZW4gY2hhbmdlZCBhbmQgeW91IHdhbnQgYSBtb3ZlbWVudCB3aXRoIHRoZSBuZXdcbiAgICogc2V0dGluZ3MuXG4gICAqL1xuICBkb01vdmUgKHNpZ25hbEFyZykge1xuICAgIHNpZ25hbEFyZyA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICBwb2ludGVyOiB0aGlzLnBvaW50ZXJzWzBdLFxuICAgICAgZXZlbnQ6IHRoaXMucHJldkV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQ6IHRoaXMuX2V2ZW50VGFyZ2V0LFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgfSwgc2lnbmFsQXJnIHx8IHt9KTtcblxuICAgIHNpZ25hbHMuZmlyZSgnYmVmb3JlLWFjdGlvbi1tb3ZlJywgc2lnbmFsQXJnKTtcblxuICAgIGlmICghdGhpcy5fZG9udEZpcmVNb3ZlKSB7XG4gICAgICBzaWduYWxzLmZpcmUoJ2FjdGlvbi1tb3ZlJywgc2lnbmFsQXJnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kb250RmlyZU1vdmUgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEVuZCBpbnRlcmFjdCBtb3ZlIGV2ZW50cyBhbmQgc3RvcCBhdXRvLXNjcm9sbCB1bmxlc3Mgc2ltdWxhdGlvbiBpcyBydW5uaW5nXG4gIHBvaW50ZXJVcCAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCkge1xuICAgIGNvbnN0IHBvaW50ZXJJbmRleCA9IHRoaXMuZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gICAgc2lnbmFscy5maXJlKC9jYW5jZWwkL2kudGVzdChldmVudC50eXBlKT8gJ2NhbmNlbCcgOiAndXAnLCB7XG4gICAgICBwb2ludGVyLFxuICAgICAgcG9pbnRlckluZGV4LFxuICAgICAgZXZlbnQsXG4gICAgICBldmVudFRhcmdldCxcbiAgICAgIGN1ckV2ZW50VGFyZ2V0LFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuc2ltdWxhdGlvbikge1xuICAgICAgdGhpcy5lbmQoZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMucG9pbnRlcklzRG93biA9IGZhbHNlO1xuICAgIHRoaXMucmVtb3ZlUG9pbnRlcihwb2ludGVyLCBldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogYGBganNcbiAgICogaW50ZXJhY3QodGFyZ2V0KVxuICAgKiAgIC5kcmFnZ2FibGUodHJ1ZSlcbiAgICogICAub24oJ21vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICogICAgIGlmIChldmVudC5wYWdlWCA+IDEwMDApIHtcbiAgICogICAgICAgLy8gZW5kIHRoZSBjdXJyZW50IGFjdGlvblxuICAgKiAgICAgICBldmVudC5pbnRlcmFjdGlvbi5lbmQoKTtcbiAgICogICAgICAgLy8gc3RvcCBhbGwgZnVydGhlciBsaXN0ZW5lcnMgZnJvbSBiZWluZyBjYWxsZWRcbiAgICogICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAqICAgICB9XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBTdG9wIHRoZSBjdXJyZW50IGFjdGlvbiBhbmQgZmlyZSBhbiBlbmQgZXZlbnQuIEluZXJ0aWFsIG1vdmVtZW50IGRvZXNcbiAgICogbm90IGhhcHBlbi5cbiAgICpcbiAgICogQHBhcmFtIHtQb2ludGVyRXZlbnR9IFtldmVudF1cbiAgICovXG4gIGVuZCAoZXZlbnQpIHtcbiAgICB0aGlzLl9lbmRpbmcgPSB0cnVlO1xuXG4gICAgZXZlbnQgPSBldmVudCB8fCB0aGlzLnByZXZFdmVudDtcblxuICAgIGlmICh0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgIHNpZ25hbHMuZmlyZSgnYWN0aW9uLWVuZCcsIHtcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdG9wKCk7XG4gICAgdGhpcy5fZW5kaW5nID0gZmFsc2U7XG4gIH1cblxuICBjdXJyZW50QWN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJhY3Rpbmc/IHRoaXMucHJlcGFyZWQubmFtZTogbnVsbDtcbiAgfVxuXG4gIGludGVyYWN0aW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJhY3Rpbmc7XG4gIH1cblxuICAvKiogKi9cbiAgc3RvcCAoKSB7XG4gICAgc2lnbmFscy5maXJlKCdzdG9wJywgeyBpbnRlcmFjdGlvbjogdGhpcyB9KTtcblxuICAgIGlmICh0aGlzLl9pbnRlcmFjdGluZykge1xuICAgICAgc2lnbmFscy5maXJlKCdzdG9wLWFjdGl2ZScsIHsgaW50ZXJhY3Rpb246IHRoaXMgfSk7XG4gICAgICBzaWduYWxzLmZpcmUoJ3N0b3AtJyArIHRoaXMucHJlcGFyZWQubmFtZSwgeyBpbnRlcmFjdGlvbjogdGhpcyB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnRhcmdldCA9IHRoaXMuZWxlbWVudCA9IG51bGw7XG5cbiAgICB0aGlzLl9pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJlcGFyZWQubmFtZSA9IHRoaXMucHJldkV2ZW50ID0gbnVsbDtcbiAgfVxuXG4gIGdldFBvaW50ZXJJbmRleCAocG9pbnRlcikge1xuICAgIC8vIG1vdXNlIGFuZCBwZW4gaW50ZXJhY3Rpb25zIG1heSBoYXZlIG9ubHkgb25lIHBvaW50ZXJcbiAgICBpZiAodGhpcy5wb2ludGVyVHlwZSA9PT0gJ21vdXNlJyB8fCB0aGlzLnBvaW50ZXJUeXBlID09PSAncGVuJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucG9pbnRlcklkcy5pbmRleE9mKHV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKSk7XG4gIH1cblxuICB1cGRhdGVQb2ludGVyIChwb2ludGVyLCBldmVudCwgZG93biA9IGV2ZW50ICYmIC8oZG93bnxzdGFydCkkL2kudGVzdChldmVudC50eXBlKSkge1xuICAgIGNvbnN0IGlkID0gdXRpbHMuZ2V0UG9pbnRlcklkKHBvaW50ZXIpO1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgaW5kZXggPSB0aGlzLnBvaW50ZXJJZHMubGVuZ3RoO1xuICAgICAgdGhpcy5wb2ludGVySWRzW2luZGV4XSA9IGlkO1xuICAgIH1cblxuICAgIGlmIChkb3duKSB7XG4gICAgICBzaWduYWxzLmZpcmUoJ3VwZGF0ZS1wb2ludGVyLWRvd24nLCB7XG4gICAgICAgIHBvaW50ZXIsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBkb3duLFxuICAgICAgICBwb2ludGVySWQ6IGlkLFxuICAgICAgICBwb2ludGVySW5kZXg6IGluZGV4LFxuICAgICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucG9pbnRlcnNbaW5kZXhdID0gcG9pbnRlcjtcblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHJlbW92ZVBvaW50ZXIgKHBvaW50ZXIsIGV2ZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgcmV0dXJuOyB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ3JlbW92ZS1wb2ludGVyJywge1xuICAgICAgcG9pbnRlcixcbiAgICAgIGV2ZW50LFxuICAgICAgcG9pbnRlckluZGV4OiBpbmRleCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wb2ludGVycyAgIC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucG9pbnRlcklkcyAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmRvd25UYXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5kb3duVGltZXMgIC5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgX3VwZGF0ZUV2ZW50VGFyZ2V0cyAodGFyZ2V0LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgdGhpcy5fZXZlbnRUYXJnZXQgICAgPSB0YXJnZXQ7XG4gICAgdGhpcy5fY3VyRXZlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICB9XG59XG5cbmZvciAoY29uc3QgbWV0aG9kIG9mIG1ldGhvZE5hbWVzKSB7XG4gIGxpc3RlbmVyc1ttZXRob2RdID0gZG9PbkludGVyYWN0aW9ucyhtZXRob2QpO1xufVxuXG5mdW5jdGlvbiBkb09uSW50ZXJhY3Rpb25zIChtZXRob2QpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBwb2ludGVyVHlwZSA9IHV0aWxzLmdldFBvaW50ZXJUeXBlKGV2ZW50KTtcbiAgICBjb25zdCBbZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0XSA9IHV0aWxzLmdldEV2ZW50VGFyZ2V0cyhldmVudCk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IFtdOyAvLyBbIFtwb2ludGVyLCBpbnRlcmFjdGlvbl0sIC4uLl1cblxuICAgIGlmIChicm93c2VyLnN1cHBvcnRzVG91Y2ggJiYgL3RvdWNoLy50ZXN0KGV2ZW50LnR5cGUpKSB7XG4gICAgICBwcmV2VG91Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIGZvciAoY29uc3QgY2hhbmdlZFRvdWNoIG9mIGV2ZW50LmNoYW5nZWRUb3VjaGVzKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSBjaGFuZ2VkVG91Y2g7XG4gICAgICAgIGNvbnN0IGludGVyYWN0aW9uID0gZmluZGVyLnNlYXJjaChwb2ludGVyLCBldmVudC50eXBlLCBldmVudFRhcmdldCk7XG5cbiAgICAgICAgbWF0Y2hlcy5wdXNoKFtwb2ludGVyLCBpbnRlcmFjdGlvbiB8fCBuZXcgSW50ZXJhY3Rpb24oeyBwb2ludGVyVHlwZSB9KV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBpbnZhbGlkUG9pbnRlciA9IGZhbHNlO1xuXG4gICAgICBpZiAoIWJyb3dzZXIuc3VwcG9ydHNQb2ludGVyRXZlbnQgJiYgL21vdXNlLy50ZXN0KGV2ZW50LnR5cGUpKSB7XG4gICAgICAgIC8vIGlnbm9yZSBtb3VzZSBldmVudHMgd2hpbGUgdG91Y2ggaW50ZXJhY3Rpb25zIGFyZSBhY3RpdmVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZS5pbnRlcmFjdGlvbnMubGVuZ3RoICYmICFpbnZhbGlkUG9pbnRlcjsgaSsrKSB7XG4gICAgICAgICAgaW52YWxpZFBvaW50ZXIgPSBzY29wZS5pbnRlcmFjdGlvbnNbaV0ucG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiYgc2NvcGUuaW50ZXJhY3Rpb25zW2ldLnBvaW50ZXJJc0Rvd247XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cnkgdG8gaWdub3JlIG1vdXNlIGV2ZW50cyB0aGF0IGFyZSBzaW11bGF0ZWQgYnkgdGhlIGJyb3dzZXJcbiAgICAgICAgLy8gYWZ0ZXIgYSB0b3VjaCBldmVudFxuICAgICAgICBpbnZhbGlkUG9pbnRlciA9IGludmFsaWRQb2ludGVyXG4gICAgICAgICAgfHwgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gcHJldlRvdWNoVGltZSA8IDUwMClcbiAgICAgICAgICAvLyBvbiBpT1MgYW5kIEZpcmVmb3ggTW9iaWxlLCBNb3VzZUV2ZW50LnRpbWVTdGFtcCBpcyB6ZXJvIGlmIHNpbXVsYXRlZFxuICAgICAgICAgIHx8IGV2ZW50LnRpbWVTdGFtcCA9PT0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpbnZhbGlkUG9pbnRlcikge1xuICAgICAgICBsZXQgaW50ZXJhY3Rpb24gPSBmaW5kZXIuc2VhcmNoKGV2ZW50LCBldmVudC50eXBlLCBldmVudFRhcmdldCk7XG5cbiAgICAgICAgaWYgKCFpbnRlcmFjdGlvbikge1xuICAgICAgICAgIGludGVyYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKHsgcG9pbnRlclR5cGUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXRjaGVzLnB1c2goW2V2ZW50LCBpbnRlcmFjdGlvbl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW3BvaW50ZXIsIGludGVyYWN0aW9uXSBvZiBtYXRjaGVzKSB7XG4gICAgICBpbnRlcmFjdGlvbi5fdXBkYXRlRXZlbnRUYXJnZXRzKGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG4gICAgICBpbnRlcmFjdGlvblttZXRob2RdKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuZEFsbCAoZXZlbnQpIHtcbiAgZm9yIChjb25zdCBpbnRlcmFjdGlvbiBvZiBzY29wZS5pbnRlcmFjdGlvbnMpIHtcbiAgICBpbnRlcmFjdGlvbi5lbmQoZXZlbnQpO1xuICAgIHNpZ25hbHMuZmlyZSgnZW5kYWxsJywgeyBldmVudCwgaW50ZXJhY3Rpb24gfSk7XG4gIH1cbn1cblxuY29uc3QgZG9jRXZlbnRzID0geyAvKiAnZXZlbnRUeXBlJzogbGlzdGVuZXJGdW5jICovIH07XG5jb25zdCBwRXZlbnRUeXBlcyA9IGJyb3dzZXIucEV2ZW50VHlwZXM7XG5cbmlmIChkb21PYmplY3RzLlBvaW50ZXJFdmVudCkge1xuICBkb2NFdmVudHNbcEV2ZW50VHlwZXMuZG93biAgXSA9IGxpc3RlbmVycy5wb2ludGVyRG93bjtcbiAgZG9jRXZlbnRzW3BFdmVudFR5cGVzLm1vdmUgIF0gPSBsaXN0ZW5lcnMucG9pbnRlck1vdmU7XG4gIGRvY0V2ZW50c1twRXZlbnRUeXBlcy51cCAgICBdID0gbGlzdGVuZXJzLnBvaW50ZXJVcDtcbiAgZG9jRXZlbnRzW3BFdmVudFR5cGVzLmNhbmNlbF0gPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xufVxuZWxzZSB7XG4gIGRvY0V2ZW50cy5tb3VzZWRvd24gICA9IGxpc3RlbmVycy5wb2ludGVyRG93bjtcbiAgZG9jRXZlbnRzLm1vdXNlbW92ZSAgID0gbGlzdGVuZXJzLnBvaW50ZXJNb3ZlO1xuICBkb2NFdmVudHMubW91c2V1cCAgICAgPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xuXG4gIGRvY0V2ZW50cy50b3VjaHN0YXJ0ICA9IGxpc3RlbmVycy5wb2ludGVyRG93bjtcbiAgZG9jRXZlbnRzLnRvdWNobW92ZSAgID0gbGlzdGVuZXJzLnBvaW50ZXJNb3ZlO1xuICBkb2NFdmVudHMudG91Y2hlbmQgICAgPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xuICBkb2NFdmVudHMudG91Y2hjYW5jZWwgPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xufVxuXG5kb2NFdmVudHMuYmx1ciA9IGVuZEFsbDtcblxuZnVuY3Rpb24gb25Eb2NTaWduYWwgKHsgZG9jIH0sIHNpZ25hbE5hbWUpIHtcbiAgY29uc3QgZXZlbnRNZXRob2QgPSBzaWduYWxOYW1lLmluZGV4T2YoJ2FkZCcpID09PSAwXG4gICAgPyBldmVudHMuYWRkIDogZXZlbnRzLnJlbW92ZTtcblxuICAvLyBkZWxlZ2F0ZSBldmVudCBsaXN0ZW5lclxuICBmb3IgKGNvbnN0IGV2ZW50VHlwZSBpbiBzY29wZS5kZWxlZ2F0ZWRFdmVudHMpIHtcbiAgICBldmVudE1ldGhvZChkb2MsIGV2ZW50VHlwZSwgZXZlbnRzLmRlbGVnYXRlTGlzdGVuZXIpO1xuICAgIGV2ZW50TWV0aG9kKGRvYywgZXZlbnRUeXBlLCBldmVudHMuZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgZXZlbnRUeXBlIGluIGRvY0V2ZW50cykge1xuICAgIGV2ZW50TWV0aG9kKGRvYywgZXZlbnRUeXBlLCBkb2NFdmVudHNbZXZlbnRUeXBlXSwgYnJvd3Nlci5pc0lPUyA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IHVuZGVmaW5lZCk7XG4gIH1cbn1cblxuc2lnbmFscy5vbigndXBkYXRlLXBvaW50ZXItZG93bicsICh7IGludGVyYWN0aW9uLCBwb2ludGVyLCBwb2ludGVySWQsIHBvaW50ZXJJbmRleCwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBkb3duIH0pID0+IHtcbiAgaW50ZXJhY3Rpb24ucG9pbnRlcklkc1twb2ludGVySW5kZXhdID0gcG9pbnRlcklkO1xuICBpbnRlcmFjdGlvbi5wb2ludGVyc1twb2ludGVySW5kZXhdID0gcG9pbnRlcjtcblxuICBpZiAoZG93bikge1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24gPSB0cnVlO1xuICB9XG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7XG4gICAgdXRpbHMuc2V0Q29vcmRzKGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLCBpbnRlcmFjdGlvbi5wb2ludGVycyk7XG5cbiAgICB1dGlscy5jb3B5Q29vcmRzKGludGVyYWN0aW9uLmN1ckNvb3JkcyAsIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzKTtcbiAgICB1dGlscy5jb3B5Q29vcmRzKGludGVyYWN0aW9uLnByZXZDb29yZHMsIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzKTtcblxuICAgIGludGVyYWN0aW9uLmRvd25FdmVudCAgICAgICAgICAgICAgICAgPSBldmVudDtcbiAgICBpbnRlcmFjdGlvbi5kb3duVGltZXNbcG9pbnRlckluZGV4XSAgID0gaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnRpbWVTdGFtcDtcbiAgICBpbnRlcmFjdGlvbi5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdID0gZXZlbnRUYXJnZXQgfHwgZXZlbnQgJiYgdXRpbHMuZ2V0RXZlbnRUYXJnZXRzKGV2ZW50KVswXTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQgICAgICAgICAgID0gZmFsc2U7XG5cbiAgICB1dGlscy5wb2ludGVyRXh0ZW5kKGludGVyYWN0aW9uLmRvd25Qb2ludGVyLCBwb2ludGVyKTtcbiAgfVxufSk7XG5cbnNjb3BlLnNpZ25hbHMub24oJ2FkZC1kb2N1bWVudCcgICAsIG9uRG9jU2lnbmFsKTtcbnNjb3BlLnNpZ25hbHMub24oJ3JlbW92ZS1kb2N1bWVudCcsIG9uRG9jU2lnbmFsKTtcblxuSW50ZXJhY3Rpb24ucG9pbnRlck1vdmVUb2xlcmFuY2UgPSAxO1xuSW50ZXJhY3Rpb24uZG9PbkludGVyYWN0aW9ucyA9IGRvT25JbnRlcmFjdGlvbnM7XG5JbnRlcmFjdGlvbi5lbmRBbGwgPSBlbmRBbGw7XG5JbnRlcmFjdGlvbi5zaWduYWxzID0gc2lnbmFscztcbkludGVyYWN0aW9uLmRvY0V2ZW50cyA9IGRvY0V2ZW50cztcblxuc2NvcGUuZW5kQWxsSW50ZXJhY3Rpb25zID0gZW5kQWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyYWN0aW9uO1xuIiwiY29uc3Qgc2NvcGUgICA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG5jb25zdCB1dGlscyAgID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5jb25zdCBmaW5kZXIgPSB7XG4gIG1ldGhvZE9yZGVyOiBbICdzaW11bGF0aW9uUmVzdW1lJywgJ21vdXNlT3JQZW4nLCAnaGFzUG9pbnRlcicsICdpZGxlJyBdLFxuXG4gIHNlYXJjaDogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50VHlwZSwgZXZlbnRUYXJnZXQpIHtcbiAgICBjb25zdCBwb2ludGVyVHlwZSA9IHV0aWxzLmdldFBvaW50ZXJUeXBlKHBvaW50ZXIpO1xuICAgIGNvbnN0IHBvaW50ZXJJZCA9IHV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKTtcbiAgICBjb25zdCBkZXRhaWxzID0geyBwb2ludGVyLCBwb2ludGVySWQsIHBvaW50ZXJUeXBlLCBldmVudFR5cGUsIGV2ZW50VGFyZ2V0IH07XG5cbiAgICBmb3IgKGNvbnN0IG1ldGhvZCBvZiBmaW5kZXIubWV0aG9kT3JkZXIpIHtcbiAgICAgIGNvbnN0IGludGVyYWN0aW9uID0gZmluZGVyW21ldGhvZF0oZGV0YWlscyk7XG5cbiAgICAgIGlmIChpbnRlcmFjdGlvbikge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIHRyeSB0byByZXN1bWUgc2ltdWxhdGlvbiB3aXRoIGEgbmV3IHBvaW50ZXJcbiAgc2ltdWxhdGlvblJlc3VtZTogZnVuY3Rpb24gKHsgcG9pbnRlclR5cGUsIGV2ZW50VHlwZSwgZXZlbnRUYXJnZXQgfSkge1xuICAgIGlmICghL2Rvd258c3RhcnQvaS50ZXN0KGV2ZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gICAgICBpZiAoaW50ZXJhY3Rpb24uc2ltdWxhdGlvbiAmJiBpbnRlcmFjdGlvbi5zaW11bGF0aW9uLmFsbG93UmVzdW1lXG4gICAgICAgICAgJiYgKGludGVyYWN0aW9uLnBvaW50ZXJUeXBlID09PSBwb2ludGVyVHlwZSkpIHtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyB0aGUgaW50ZXJhY3Rpb24gZWxlbWVudFxuICAgICAgICAgIGlmIChlbGVtZW50ID09PSBpbnRlcmFjdGlvbi5lbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSB1dGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLy8gaWYgaXQncyBhIG1vdXNlIG9yIHBlbiBpbnRlcmFjdGlvblxuICBtb3VzZU9yUGVuOiBmdW5jdGlvbiAoeyBwb2ludGVySWQsIHBvaW50ZXJUeXBlLCBldmVudFR5cGUgfSkge1xuICAgIGlmIChwb2ludGVyVHlwZSAhPT0gJ21vdXNlJyAmJiBwb2ludGVyVHlwZSAhPT0gJ3BlbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBmaXJzdE5vbkFjdGl2ZTtcblxuICAgIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG4gICAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUgPT09IHBvaW50ZXJUeXBlKSB7XG4gICAgICAgIC8vIGlmIGl0J3MgYSBkb3duIGV2ZW50LCBza2lwIGludGVyYWN0aW9ucyB3aXRoIHJ1bm5pbmcgc2ltdWxhdGlvbnNcbiAgICAgICAgaWYgKGludGVyYWN0aW9uLnNpbXVsYXRpb24gJiYgIXV0aWxzLmNvbnRhaW5zKGludGVyYWN0aW9uLnBvaW50ZXJJZHMsIHBvaW50ZXJJZCkpIHsgY29udGludWU7IH1cblxuICAgICAgICAvLyBpZiB0aGUgaW50ZXJhY3Rpb24gaXMgYWN0aXZlLCByZXR1cm4gaXQgaW1tZWRpYXRlbHlcbiAgICAgICAgaWYgKGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHNhdmUgaXQgYW5kIGxvb2sgZm9yIGFub3RoZXIgYWN0aXZlIGludGVyYWN0aW9uXG4gICAgICAgIGVsc2UgaWYgKCFmaXJzdE5vbkFjdGl2ZSkge1xuICAgICAgICAgIGZpcnN0Tm9uQWN0aXZlID0gaW50ZXJhY3Rpb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBubyBhY3RpdmUgbW91c2UgaW50ZXJhY3Rpb24gd2FzIGZvdW5kIHVzZSB0aGUgZmlyc3QgaW5hY3RpdmUgbW91c2VcbiAgICAvLyBpbnRlcmFjdGlvblxuICAgIGlmIChmaXJzdE5vbkFjdGl2ZSkge1xuICAgICAgcmV0dXJuIGZpcnN0Tm9uQWN0aXZlO1xuICAgIH1cblxuICAgIC8vIGZpbmQgYW55IG1vdXNlIG9yIHBlbiBpbnRlcmFjdGlvbi5cbiAgICAvLyBpZ25vcmUgdGhlIGludGVyYWN0aW9uIGlmIHRoZSBldmVudFR5cGUgaXMgYSAqZG93biwgYW5kIGEgc2ltdWxhdGlvblxuICAgIC8vIGlzIGFjdGl2ZVxuICAgIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG4gICAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUgPT09IHBvaW50ZXJUeXBlICYmICEoL2Rvd24vaS50ZXN0KGV2ZW50VHlwZSkgJiYgaW50ZXJhY3Rpb24uc2ltdWxhdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8vIGdldCBpbnRlcmFjdGlvbiB0aGF0IGhhcyB0aGlzIHBvaW50ZXJcbiAgaGFzUG9pbnRlcjogZnVuY3Rpb24gKHsgcG9pbnRlcklkIH0pIHtcbiAgICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucykge1xuICAgICAgaWYgKHV0aWxzLmNvbnRhaW5zKGludGVyYWN0aW9uLnBvaW50ZXJJZHMsIHBvaW50ZXJJZCkpIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBnZXQgZmlyc3QgaWRsZSBpbnRlcmFjdGlvbiB3aXRoIGEgbWF0Y2hpbmcgcG9pbnRlclR5cGVcbiAgaWRsZTogZnVuY3Rpb24gKHsgcG9pbnRlclR5cGUgfSkge1xuICAgIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2Ygc2NvcGUuaW50ZXJhY3Rpb25zKSB7XG4gICAgICAvLyBpZiB0aGVyZSdzIGFscmVhZHkgYSBwb2ludGVyIGhlbGQgZG93blxuICAgICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldDtcbiAgICAgICAgLy8gZG9uJ3QgYWRkIHRoaXMgcG9pbnRlciBpZiB0aGVyZSBpcyBhIHRhcmdldCBpbnRlcmFjdGFibGUgYW5kIGl0XG4gICAgICAgIC8vIGlzbid0IGdlc3R1cmFibGVcbiAgICAgICAgaWYgKHRhcmdldCAmJiAhdGFyZ2V0Lm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIG1heGltdW0gb2YgMiBwb2ludGVycyBwZXIgaW50ZXJhY3Rpb25cbiAgICAgIGVsc2UgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJZHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSAmJiAocG9pbnRlclR5cGUgPT09IGludGVyYWN0aW9uLnBvaW50ZXJUeXBlKSkge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRlcjtcbiIsImNvbnN0IHV0aWxzICAgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBldmVudHMgID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbmNvbnN0IHNpZ25hbHMgPSByZXF1aXJlKCcuL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxuY29uc3QgeyBnZXRXaW5kb3cgfSA9IHJlcXVpcmUoJy4vdXRpbHMvd2luZG93Jyk7XG5cbmNvbnN0IHNjb3BlID0ge1xuICBzaWduYWxzLFxuICBldmVudHMsXG4gIHV0aWxzLFxuXG4gIC8vIG1haW4gZG9jdW1lbnRcbiAgZG9jdW1lbnQ6IHJlcXVpcmUoJy4vdXRpbHMvZG9tT2JqZWN0cycpLmRvY3VtZW50LFxuICAvLyBhbGwgZG9jdW1lbnRzIGJlaW5nIGxpc3RlbmVkIHRvXG4gIGRvY3VtZW50czogW10sXG5cbiAgYWRkRG9jdW1lbnQ6IGZ1bmN0aW9uIChkb2MsIHdpbikge1xuICAgIC8vIGRvIG5vdGhpbmcgaWYgZG9jdW1lbnQgaXMgYWxyZWFkeSBrbm93blxuICAgIGlmICh1dGlscy5jb250YWlucyhzY29wZS5kb2N1bWVudHMsIGRvYykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICB3aW4gPSB3aW4gfHwgZ2V0V2luZG93KGRvYyk7XG5cbiAgICBzY29wZS5kb2N1bWVudHMucHVzaChkb2MpO1xuICAgIGV2ZW50cy5kb2N1bWVudHMucHVzaChkb2MpO1xuXG4gICAgLy8gZG9uJ3QgYWRkIGFuIHVubG9hZCBldmVudCBmb3IgdGhlIG1haW4gZG9jdW1lbnRcbiAgICAvLyBzbyB0aGF0IHRoZSBwYWdlIG1heSBiZSBjYWNoZWQgaW4gYnJvd3NlciBoaXN0b3J5XG4gICAgaWYgKGRvYyAhPT0gc2NvcGUuZG9jdW1lbnQpIHtcbiAgICAgIGV2ZW50cy5hZGQod2luLCAndW5sb2FkJywgc2NvcGUub25XaW5kb3dVbmxvYWQpO1xuICAgIH1cblxuICAgIHNpZ25hbHMuZmlyZSgnYWRkLWRvY3VtZW50JywgeyBkb2MsIHdpbiB9KTtcbiAgfSxcblxuICByZW1vdmVEb2N1bWVudDogZnVuY3Rpb24gKGRvYywgd2luKSB7XG4gICAgY29uc3QgaW5kZXggPSBzY29wZS5kb2N1bWVudHMuaW5kZXhPZihkb2MpO1xuXG4gICAgd2luID0gd2luIHx8IGdldFdpbmRvdyhkb2MpO1xuXG4gICAgZXZlbnRzLnJlbW92ZSh3aW4sICd1bmxvYWQnLCBzY29wZS5vbldpbmRvd1VubG9hZCk7XG5cbiAgICBzY29wZS5kb2N1bWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBldmVudHMuZG9jdW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBzaWduYWxzLmZpcmUoJ3JlbW92ZS1kb2N1bWVudCcsIHsgd2luLCBkb2MgfSk7XG4gIH0sXG5cbiAgb25XaW5kb3dVbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBzY29wZS5yZW1vdmVEb2N1bWVudCh0aGlzLmRvY3VtZW50LCB0aGlzKTtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2NvcGU7XG4iLCJjb25zdCBleHRlbmQgPSByZXF1aXJlKCcuL2V4dGVuZCcpO1xuY29uc3Qgd2luICAgID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcblxuY29uc3QgdXRpbHMgPSB7XG4gIHdhcm5PbmNlOiBmdW5jdGlvbiAobWV0aG9kLCBtZXNzYWdlKSB7XG4gICAgbGV0IHdhcm5lZCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghd2FybmVkKSB7XG4gICAgICAgIHdpbi53aW5kb3cuY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgICB3YXJuZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjM0NTI4LzIyODA4ODhcbiAgX2dldFFCZXppZXJWYWx1ZTogZnVuY3Rpb24gKHQsIHAxLCBwMiwgcDMpIHtcbiAgICBjb25zdCBpVCA9IDEgLSB0O1xuICAgIHJldHVybiBpVCAqIGlUICogcDEgKyAyICogaVQgKiB0ICogcDIgKyB0ICogdCAqIHAzO1xuICB9LFxuXG4gIGdldFF1YWRyYXRpY0N1cnZlUG9pbnQ6IGZ1bmN0aW9uIChzdGFydFgsIHN0YXJ0WSwgY3BYLCBjcFksIGVuZFgsIGVuZFksIHBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6ICB1dGlscy5fZ2V0UUJlemllclZhbHVlKHBvc2l0aW9uLCBzdGFydFgsIGNwWCwgZW5kWCksXG4gICAgICB5OiAgdXRpbHMuX2dldFFCZXppZXJWYWx1ZShwb3NpdGlvbiwgc3RhcnRZLCBjcFksIGVuZFkpLFxuICAgIH07XG4gIH0sXG5cbiAgLy8gaHR0cDovL2dpem1hLmNvbS9lYXNpbmcvXG4gIGVhc2VPdXRRdWFkOiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgIHQgLz0gZDtcbiAgICByZXR1cm4gLWMgKiB0Kih0LTIpICsgYjtcbiAgfSxcblxuICBjb3B5QWN0aW9uOiBmdW5jdGlvbiAoZGVzdCwgc3JjKSB7XG4gICAgZGVzdC5uYW1lICA9IHNyYy5uYW1lO1xuICAgIGRlc3QuYXhpcyAgPSBzcmMuYXhpcztcbiAgICBkZXN0LmVkZ2VzID0gc3JjLmVkZ2VzO1xuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH0sXG5cbiAgaXMgICAgICAgICA6IHJlcXVpcmUoJy4vaXMnKSxcbiAgZXh0ZW5kICAgICA6IGV4dGVuZCxcbiAgaHlwb3QgICAgICA6IHJlcXVpcmUoJy4vaHlwb3QnKSxcbiAgZ2V0T3JpZ2luWFk6IHJlcXVpcmUoJy4vZ2V0T3JpZ2luWFknKSxcbn07XG5cbmV4dGVuZCh1dGlscywgcmVxdWlyZSgnLi9hcnInKSk7XG5leHRlbmQodXRpbHMsIHJlcXVpcmUoJy4vZG9tVXRpbHMnKSk7XG5leHRlbmQodXRpbHMsIHJlcXVpcmUoJy4vcG9pbnRlclV0aWxzJykpO1xuZXh0ZW5kKHV0aWxzLCByZXF1aXJlKCcuL3JlY3QnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHM7XG4iLCJjb25zdCBpcyAgICAgICAgICAgPSByZXF1aXJlKCcuL2lzJyk7XG5jb25zdCBkb21VdGlscyAgICAgPSByZXF1aXJlKCcuL2RvbVV0aWxzJyk7XG5jb25zdCBwb2ludGVyVXRpbHMgPSByZXF1aXJlKCcuL3BvaW50ZXJVdGlscycpO1xuY29uc3QgcEV4dGVuZCAgICAgID0gcmVxdWlyZSgnLi9wb2ludGVyRXh0ZW5kJyk7XG5cbmNvbnN0IHsgd2luZG93IH0gICA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG5jb25zdCB7IGNvbnRhaW5zIH0gPSByZXF1aXJlKCcuL2FycicpO1xuXG5jb25zdCBlbGVtZW50cyA9IFtdO1xuY29uc3QgdGFyZ2V0cyAgPSBbXTtcblxuLy8ge1xuLy8gICB0eXBlOiB7XG4vLyAgICAgc2VsZWN0b3JzOiBbJ3NlbGVjdG9yJywgLi4uXSxcbi8vICAgICBjb250ZXh0cyA6IFtkb2N1bWVudCwgLi4uXSxcbi8vICAgICBsaXN0ZW5lcnM6IFtbbGlzdGVuZXIsIGNhcHR1cmUsIHBhc3NpdmVdLCAuLi5dXG4vLyAgIH1cbi8vICB9XG5jb25zdCBkZWxlZ2F0ZWRFdmVudHMgPSB7fTtcbmNvbnN0IGRvY3VtZW50cyAgICAgICA9IFtdO1xuXG5jb25zdCBzdXBwb3J0c09wdGlvbnMgPSAoKCkgPT4ge1xuICBsZXQgc3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7XG4gICAgZ2V0IGNhcHR1cmUgKCkgeyBzdXBwb3J0ZWQgPSB0cnVlOyB9LFxuICB9KTtcblxuICByZXR1cm4gc3VwcG9ydGVkO1xufSkoKTtcblxuZnVuY3Rpb24gYWRkIChlbGVtZW50LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9uYWxBcmcpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICBsZXQgZWxlbWVudEluZGV4ID0gZWxlbWVudHMuaW5kZXhPZihlbGVtZW50KTtcbiAgbGV0IHRhcmdldCA9IHRhcmdldHNbZWxlbWVudEluZGV4XTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRhcmdldCA9IHtcbiAgICAgIGV2ZW50czoge30sXG4gICAgICB0eXBlQ291bnQ6IDAsXG4gICAgfTtcblxuICAgIGVsZW1lbnRJbmRleCA9IGVsZW1lbnRzLnB1c2goZWxlbWVudCkgLSAxO1xuICAgIHRhcmdldHMucHVzaCh0YXJnZXQpO1xuICB9XG5cbiAgaWYgKCF0YXJnZXQuZXZlbnRzW3R5cGVdKSB7XG4gICAgdGFyZ2V0LmV2ZW50c1t0eXBlXSA9IFtdO1xuICAgIHRhcmdldC50eXBlQ291bnQrKztcbiAgfVxuXG4gIGlmICghY29udGFpbnModGFyZ2V0LmV2ZW50c1t0eXBlXSwgbGlzdGVuZXIpKSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBzdXBwb3J0c09wdGlvbnM/IG9wdGlvbnMgOiAhIW9wdGlvbnMuY2FwdHVyZSk7XG4gICAgdGFyZ2V0LmV2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUgKGVsZW1lbnQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICBjb25zdCBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIGNvbnN0IGVsZW1lbnRJbmRleCA9IGVsZW1lbnRzLmluZGV4T2YoZWxlbWVudCk7XG4gIGNvbnN0IHRhcmdldCA9IHRhcmdldHNbZWxlbWVudEluZGV4XTtcblxuICBpZiAoIXRhcmdldCB8fCAhdGFyZ2V0LmV2ZW50cykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgIGZvciAodHlwZSBpbiB0YXJnZXQuZXZlbnRzKSB7XG4gICAgICBpZiAodGFyZ2V0LmV2ZW50cy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgdHlwZSwgJ2FsbCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGFyZ2V0LmV2ZW50c1t0eXBlXSkge1xuICAgIGNvbnN0IGxlbiA9IHRhcmdldC5ldmVudHNbdHlwZV0ubGVuZ3RoO1xuXG4gICAgaWYgKGxpc3RlbmVyID09PSAnYWxsJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgdHlwZSwgdGFyZ2V0LmV2ZW50c1t0eXBlXVtpXSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGFyZ2V0LmV2ZW50c1t0eXBlXVtpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYG9uJHt0eXBlfWAsIGxpc3RlbmVyLCBzdXBwb3J0c09wdGlvbnM/IG9wdGlvbnMgOiAhIW9wdGlvbnMuY2FwdHVyZSk7XG4gICAgICAgICAgdGFyZ2V0LmV2ZW50c1t0eXBlXS5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdICYmIHRhcmdldC5ldmVudHNbdHlwZV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICB0YXJnZXQuZXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgICAgIHRhcmdldC50eXBlQ291bnQtLTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXRhcmdldC50eXBlQ291bnQpIHtcbiAgICB0YXJnZXRzLnNwbGljZShlbGVtZW50SW5kZXgsIDEpO1xuICAgIGVsZW1lbnRzLnNwbGljZShlbGVtZW50SW5kZXgsIDEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZERlbGVnYXRlIChzZWxlY3RvciwgY29udGV4dCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbmFsQXJnKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbmFsQXJnKTtcbiAgaWYgKCFkZWxlZ2F0ZWRFdmVudHNbdHlwZV0pIHtcbiAgICBkZWxlZ2F0ZWRFdmVudHNbdHlwZV0gPSB7XG4gICAgICBzZWxlY3RvcnM6IFtdLFxuICAgICAgY29udGV4dHMgOiBbXSxcbiAgICAgIGxpc3RlbmVyczogW10sXG4gICAgfTtcblxuICAgIC8vIGFkZCBkZWxlZ2F0ZSBsaXN0ZW5lciBmdW5jdGlvbnNcbiAgICBmb3IgKGNvbnN0IGRvYyBvZiBkb2N1bWVudHMpIHtcbiAgICAgIGFkZChkb2MsIHR5cGUsIGRlbGVnYXRlTGlzdGVuZXIpO1xuICAgICAgYWRkKGRvYywgdHlwZSwgZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbdHlwZV07XG4gIGxldCBpbmRleDtcblxuICBmb3IgKGluZGV4ID0gZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaWYgKGRlbGVnYXRlZC5zZWxlY3RvcnNbaW5kZXhdID09PSBzZWxlY3RvclxuICAgICAgICAmJiBkZWxlZ2F0ZWQuY29udGV4dHNbaW5kZXhdID09PSBjb250ZXh0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgaW5kZXggPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aDtcblxuICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgZGVsZWdhdGVkLmNvbnRleHRzIC5wdXNoKGNvbnRleHQpO1xuICAgIGRlbGVnYXRlZC5saXN0ZW5lcnMucHVzaChbXSk7XG4gIH1cblxuICAvLyBrZWVwIGxpc3RlbmVyIGFuZCBjYXB0dXJlIGFuZCBwYXNzaXZlIGZsYWdzXG4gIGRlbGVnYXRlZC5saXN0ZW5lcnNbaW5kZXhdLnB1c2goW2xpc3RlbmVyLCAhIW9wdGlvbnMuY2FwdHVyZSwgb3B0aW9ucy5wYXNzaXZlXSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZURlbGVnYXRlIChzZWxlY3RvciwgY29udGV4dCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbmFsQXJnKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbmFsQXJnKTtcbiAgY29uc3QgZGVsZWdhdGVkID0gZGVsZWdhdGVkRXZlbnRzW3R5cGVdO1xuICBsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuICBsZXQgaW5kZXg7XG5cbiAgaWYgKCFkZWxlZ2F0ZWQpIHsgcmV0dXJuOyB9XG5cbiAgLy8gY291bnQgZnJvbSBsYXN0IGluZGV4IG9mIGRlbGVnYXRlZCB0byAwXG4gIGZvciAoaW5kZXggPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAvLyBsb29rIGZvciBtYXRjaGluZyBzZWxlY3RvciBhbmQgY29udGV4dCBOb2RlXG4gICAgaWYgKGRlbGVnYXRlZC5zZWxlY3RvcnNbaW5kZXhdID09PSBzZWxlY3RvclxuICAgICAgICAmJiBkZWxlZ2F0ZWQuY29udGV4dHNbaW5kZXhdID09PSBjb250ZXh0KSB7XG5cbiAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGRlbGVnYXRlZC5saXN0ZW5lcnNbaW5kZXhdO1xuXG4gICAgICAvLyBlYWNoIGl0ZW0gb2YgdGhlIGxpc3RlbmVycyBhcnJheSBpcyBhbiBhcnJheTogW2Z1bmN0aW9uLCBjYXB0dXJlLCBwYXNzaXZlXVxuICAgICAgZm9yIChsZXQgaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCBbZm4sIGNhcHR1cmUsIHBhc3NpdmVdID0gbGlzdGVuZXJzW2ldO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMgYW5kIGNhcHR1cmUgYW5kIHBhc3NpdmUgZmxhZ3MgbWF0Y2hcbiAgICAgICAgaWYgKGZuID09PSBsaXN0ZW5lciAmJiBjYXB0dXJlID09PSAhIW9wdGlvbnMuY2FwdHVyZSAmJiBwYXNzaXZlID09PSBvcHRpb25zLnBhc3NpdmUpIHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20gdGhlIGFycmF5IG9mIGxpc3RlbmVyc1xuICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAvLyBpZiBhbGwgbGlzdGVuZXJzIGZvciB0aGlzIGludGVyYWN0YWJsZSBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgaW50ZXJhY3RhYmxlIGZyb20gdGhlIGRlbGVnYXRlZCBhcnJheXNcbiAgICAgICAgICBpZiAoIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGRlbGVnYXRlZC5jb250ZXh0cyAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGRlbGVnYXRlZC5saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRlbGVnYXRlIGZ1bmN0aW9uIGZyb20gY29udGV4dFxuICAgICAgICAgICAgcmVtb3ZlKGNvbnRleHQsIHR5cGUsIGRlbGVnYXRlTGlzdGVuZXIpO1xuICAgICAgICAgICAgcmVtb3ZlKGNvbnRleHQsIHR5cGUsIGRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYXJyYXlzIGlmIHRoZXkgYXJlIGVtcHR5XG4gICAgICAgICAgICBpZiAoIWRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGRlbGVnYXRlZEV2ZW50c1t0eXBlXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb25seSByZW1vdmUgb25lIGxpc3RlbmVyXG4gICAgICAgICAgbWF0Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1hdGNoRm91bmQpIHsgYnJlYWs7IH1cbiAgICB9XG4gIH1cbn1cblxuLy8gYm91bmQgdG8gdGhlIGludGVyYWN0YWJsZSBjb250ZXh0IHdoZW4gYSBET00gZXZlbnRcbi8vIGxpc3RlbmVyIGlzIGFkZGVkIHRvIGEgc2VsZWN0b3IgaW50ZXJhY3RhYmxlXG5mdW5jdGlvbiBkZWxlZ2F0ZUxpc3RlbmVyIChldmVudCwgb3B0aW9uYWxBcmcpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICBjb25zdCBmYWtlRXZlbnQgPSB7fTtcbiAgY29uc3QgZGVsZWdhdGVkID0gZGVsZWdhdGVkRXZlbnRzW2V2ZW50LnR5cGVdO1xuICBjb25zdCBbZXZlbnRUYXJnZXRdID0gKHBvaW50ZXJVdGlscy5nZXRFdmVudFRhcmdldHMoZXZlbnQpKTtcbiAgbGV0IGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAvLyBkdXBsaWNhdGUgdGhlIGV2ZW50IHNvIHRoYXQgY3VycmVudFRhcmdldCBjYW4gYmUgY2hhbmdlZFxuICBwRXh0ZW5kKGZha2VFdmVudCwgZXZlbnQpO1xuXG4gIGZha2VFdmVudC5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gIGZha2VFdmVudC5wcmV2ZW50RGVmYXVsdCA9IHByZXZlbnRPcmlnaW5hbERlZmF1bHQ7XG5cbiAgLy8gY2xpbWIgdXAgZG9jdW1lbnQgdHJlZSBsb29raW5nIGZvciBzZWxlY3RvciBtYXRjaGVzXG4gIHdoaWxlIChpcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IGRlbGVnYXRlZC5zZWxlY3RvcnNbaV07XG4gICAgICBjb25zdCBjb250ZXh0ID0gZGVsZWdhdGVkLmNvbnRleHRzW2ldO1xuXG4gICAgICBpZiAoZG9tVXRpbHMubWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgICAgICAgICYmIGRvbVV0aWxzLm5vZGVDb250YWlucyhjb250ZXh0LCBldmVudFRhcmdldClcbiAgICAgICAgICAmJiBkb21VdGlscy5ub2RlQ29udGFpbnMoY29udGV4dCwgZWxlbWVudCkpIHtcblxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSBkZWxlZ2F0ZWQubGlzdGVuZXJzW2ldO1xuXG4gICAgICAgIGZha2VFdmVudC5jdXJyZW50VGFyZ2V0ID0gZWxlbWVudDtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpc3RlbmVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IFtmbiwgY2FwdHVyZSwgcGFzc2l2ZV0gPSBsaXN0ZW5lcnNbal07XG5cbiAgICAgICAgICBpZiAoY2FwdHVyZSA9PT0gISFvcHRpb25zLmNhcHR1cmUgJiYgcGFzc2l2ZSA9PT0gb3B0aW9ucy5wYXNzaXZlKSB7XG4gICAgICAgICAgICBmbihmYWtlRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQgPSBkb21VdGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlbGVnYXRlVXNlQ2FwdHVyZSAoZXZlbnQpIHtcbiAgcmV0dXJuIGRlbGVnYXRlTGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRPcmlnaW5hbERlZmF1bHQgKCkge1xuICB0aGlzLm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3B0aW9ucyAocGFyYW0pIHtcbiAgcmV0dXJuIGlzLm9iamVjdChwYXJhbSk/IHBhcmFtIDogeyBjYXB0dXJlOiBwYXJhbSB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkLFxuICByZW1vdmUsXG5cbiAgYWRkRGVsZWdhdGUsXG4gIHJlbW92ZURlbGVnYXRlLFxuXG4gIGRlbGVnYXRlTGlzdGVuZXIsXG4gIGRlbGVnYXRlVXNlQ2FwdHVyZSxcbiAgZGVsZWdhdGVkRXZlbnRzLFxuICBkb2N1bWVudHMsXG5cbiAgc3VwcG9ydHNPcHRpb25zLFxuXG4gIF9lbGVtZW50czogZWxlbWVudHMsXG4gIF90YXJnZXRzOiB0YXJnZXRzLFxufTtcbiIsImNvbnN0IGh5cG90ICAgICAgICAgPSByZXF1aXJlKCcuL2h5cG90Jyk7XG5jb25zdCBicm93c2VyICAgICAgID0gcmVxdWlyZSgnLi9icm93c2VyJyk7XG5jb25zdCBkb20gICAgICAgICAgID0gcmVxdWlyZSgnLi9kb21PYmplY3RzJyk7XG5jb25zdCBkb21VdGlscyAgICAgID0gcmVxdWlyZSgnLi9kb21VdGlscycpO1xuY29uc3QgZG9tT2JqZWN0cyAgICA9IHJlcXVpcmUoJy4vZG9tT2JqZWN0cycpO1xuY29uc3QgaXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vaXMnKTtcbmNvbnN0IHBvaW50ZXJFeHRlbmQgPSByZXF1aXJlKCcuL3BvaW50ZXJFeHRlbmQnKTtcblxuY29uc3QgcG9pbnRlclV0aWxzID0ge1xuICBjb3B5Q29vcmRzOiBmdW5jdGlvbiAoZGVzdCwgc3JjKSB7XG4gICAgZGVzdC5wYWdlID0gZGVzdC5wYWdlIHx8IHt9O1xuICAgIGRlc3QucGFnZS54ID0gc3JjLnBhZ2UueDtcbiAgICBkZXN0LnBhZ2UueSA9IHNyYy5wYWdlLnk7XG5cbiAgICBkZXN0LmNsaWVudCA9IGRlc3QuY2xpZW50IHx8IHt9O1xuICAgIGRlc3QuY2xpZW50LnggPSBzcmMuY2xpZW50Lng7XG4gICAgZGVzdC5jbGllbnQueSA9IHNyYy5jbGllbnQueTtcblxuICAgIGRlc3QudGltZVN0YW1wID0gc3JjLnRpbWVTdGFtcDtcbiAgfSxcblxuICBzZXRDb29yZERlbHRhczogZnVuY3Rpb24gKHRhcmdldE9iaiwgcHJldiwgY3VyKSB7XG4gICAgdGFyZ2V0T2JqLnBhZ2UueCAgICA9IGN1ci5wYWdlLnggICAgLSBwcmV2LnBhZ2UueDtcbiAgICB0YXJnZXRPYmoucGFnZS55ICAgID0gY3VyLnBhZ2UueSAgICAtIHByZXYucGFnZS55O1xuICAgIHRhcmdldE9iai5jbGllbnQueCAgPSBjdXIuY2xpZW50LnggIC0gcHJldi5jbGllbnQueDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnkgID0gY3VyLmNsaWVudC55ICAtIHByZXYuY2xpZW50Lnk7XG4gICAgdGFyZ2V0T2JqLnRpbWVTdGFtcCA9IGN1ci50aW1lU3RhbXAgLSBwcmV2LnRpbWVTdGFtcDtcblxuICAgIC8vIHNldCBwb2ludGVyIHZlbG9jaXR5XG4gICAgY29uc3QgZHQgPSBNYXRoLm1heCh0YXJnZXRPYmoudGltZVN0YW1wIC8gMTAwMCwgMC4wMDEpO1xuXG4gICAgdGFyZ2V0T2JqLnBhZ2Uuc3BlZWQgICA9IGh5cG90KHRhcmdldE9iai5wYWdlLngsIHRhcmdldE9iai5wYWdlLnkpIC8gZHQ7XG4gICAgdGFyZ2V0T2JqLnBhZ2UudnggICAgICA9IHRhcmdldE9iai5wYWdlLnggLyBkdDtcbiAgICB0YXJnZXRPYmoucGFnZS52eSAgICAgID0gdGFyZ2V0T2JqLnBhZ2UueSAvIGR0O1xuXG4gICAgdGFyZ2V0T2JqLmNsaWVudC5zcGVlZCA9IGh5cG90KHRhcmdldE9iai5jbGllbnQueCwgdGFyZ2V0T2JqLnBhZ2UueSkgLyBkdDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnZ4ICAgID0gdGFyZ2V0T2JqLmNsaWVudC54IC8gZHQ7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC52eSAgICA9IHRhcmdldE9iai5jbGllbnQueSAvIGR0O1xuICB9LFxuXG4gIGlzTmF0aXZlUG9pbnRlcjogZnVuY3Rpb24gIChwb2ludGVyKSB7XG4gICAgcmV0dXJuIChwb2ludGVyIGluc3RhbmNlb2YgZG9tLkV2ZW50IHx8IHBvaW50ZXIgaW5zdGFuY2VvZiBkb20uVG91Y2gpO1xuICB9LFxuXG4gIC8vIEdldCBzcGVjaWZpZWQgWC9ZIGNvb3JkcyBmb3IgbW91c2Ugb3IgZXZlbnQudG91Y2hlc1swXVxuICBnZXRYWTogZnVuY3Rpb24gKHR5cGUsIHBvaW50ZXIsIHh5KSB7XG4gICAgeHkgPSB4eSB8fCB7fTtcbiAgICB0eXBlID0gdHlwZSB8fCAncGFnZSc7XG5cbiAgICB4eS54ID0gcG9pbnRlclt0eXBlICsgJ1gnXTtcbiAgICB4eS55ID0gcG9pbnRlclt0eXBlICsgJ1knXTtcblxuICAgIHJldHVybiB4eTtcbiAgfSxcblxuICBnZXRQYWdlWFk6IGZ1bmN0aW9uIChwb2ludGVyLCBwYWdlKSB7XG4gICAgcGFnZSA9IHBhZ2UgfHwge307XG5cbiAgICAvLyBPcGVyYSBNb2JpbGUgaGFuZGxlcyB0aGUgdmlld3BvcnQgYW5kIHNjcm9sbGluZyBvZGRseVxuICAgIGlmIChicm93c2VyLmlzT3BlcmFNb2JpbGUgJiYgcG9pbnRlclV0aWxzLmlzTmF0aXZlUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgcG9pbnRlclV0aWxzLmdldFhZKCdzY3JlZW4nLCBwb2ludGVyLCBwYWdlKTtcblxuICAgICAgcGFnZS54ICs9IHdpbmRvdy5zY3JvbGxYO1xuICAgICAgcGFnZS55ICs9IHdpbmRvdy5zY3JvbGxZO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgncGFnZScsIHBvaW50ZXIsIHBhZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiBwYWdlO1xuICB9LFxuXG4gIGdldENsaWVudFhZOiBmdW5jdGlvbiAocG9pbnRlciwgY2xpZW50KSB7XG4gICAgY2xpZW50ID0gY2xpZW50IHx8IHt9O1xuXG4gICAgaWYgKGJyb3dzZXIuaXNPcGVyYU1vYmlsZSAmJiBwb2ludGVyVXRpbHMuaXNOYXRpdmVQb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICAvLyBPcGVyYSBNb2JpbGUgaGFuZGxlcyB0aGUgdmlld3BvcnQgYW5kIHNjcm9sbGluZyBvZGRseVxuICAgICAgcG9pbnRlclV0aWxzLmdldFhZKCdzY3JlZW4nLCBwb2ludGVyLCBjbGllbnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgnY2xpZW50JywgcG9pbnRlciwgY2xpZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9LFxuXG4gIGdldFBvaW50ZXJJZDogZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgICByZXR1cm4gaXMubnVtYmVyKHBvaW50ZXIucG9pbnRlcklkKT8gcG9pbnRlci5wb2ludGVySWQgOiBwb2ludGVyLmlkZW50aWZpZXI7XG4gIH0sXG5cbiAgc2V0Q29vcmRzOiBmdW5jdGlvbiAodGFyZ2V0T2JqLCBwb2ludGVycywgdGltZVN0YW1wKSB7XG4gICAgY29uc3QgcG9pbnRlciA9IChwb2ludGVycy5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgICA/IHBvaW50ZXJVdGlscy5wb2ludGVyQXZlcmFnZShwb2ludGVycylcbiAgICAgICAgICAgICAgICAgICAgIDogcG9pbnRlcnNbMF0pO1xuXG4gICAgY29uc3QgdG1wWFkgPSB7fTtcblxuICAgIHBvaW50ZXJVdGlscy5nZXRQYWdlWFkocG9pbnRlciwgdG1wWFkpO1xuICAgIHRhcmdldE9iai5wYWdlLnggPSB0bXBYWS54O1xuICAgIHRhcmdldE9iai5wYWdlLnkgPSB0bXBYWS55O1xuXG4gICAgcG9pbnRlclV0aWxzLmdldENsaWVudFhZKHBvaW50ZXIsIHRtcFhZKTtcbiAgICB0YXJnZXRPYmouY2xpZW50LnggPSB0bXBYWS54O1xuICAgIHRhcmdldE9iai5jbGllbnQueSA9IHRtcFhZLnk7XG5cbiAgICB0YXJnZXRPYmoudGltZVN0YW1wID0gaXMubnVtYmVyKHRpbWVTdGFtcCkgPyB0aW1lU3RhbXAgOm5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9LFxuXG4gIHBvaW50ZXJFeHRlbmQ6IHBvaW50ZXJFeHRlbmQsXG5cbiAgZ2V0VG91Y2hQYWlyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCB0b3VjaGVzID0gW107XG5cbiAgICAvLyBhcnJheSBvZiB0b3VjaGVzIGlzIHN1cHBsaWVkXG4gICAgaWYgKGlzLmFycmF5KGV2ZW50KSkge1xuICAgICAgdG91Y2hlc1swXSA9IGV2ZW50WzBdO1xuICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50WzFdO1xuICAgIH1cbiAgICAvLyBhbiBldmVudFxuICAgIGVsc2Uge1xuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaGVuZCcpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdG91Y2hlc1swXSA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdG91Y2hlc1swXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgIHRvdWNoZXNbMV0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1sxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnQudG91Y2hlc1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG91Y2hlcztcbiAgfSxcblxuICBwb2ludGVyQXZlcmFnZTogZnVuY3Rpb24gKHBvaW50ZXJzKSB7XG4gICAgY29uc3QgYXZlcmFnZSA9IHtcbiAgICAgIHBhZ2VYICA6IDAsXG4gICAgICBwYWdlWSAgOiAwLFxuICAgICAgY2xpZW50WDogMCxcbiAgICAgIGNsaWVudFk6IDAsXG4gICAgICBzY3JlZW5YOiAwLFxuICAgICAgc2NyZWVuWTogMCxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBwb2ludGVyIG9mIHBvaW50ZXJzKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gYXZlcmFnZSkge1xuICAgICAgICBhdmVyYWdlW3Byb3BdICs9IHBvaW50ZXJbcHJvcF07XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBhdmVyYWdlKSB7XG4gICAgICBhdmVyYWdlW3Byb3BdIC89IHBvaW50ZXJzLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXZlcmFnZTtcbiAgfSxcblxuICB0b3VjaEJCb3g6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghZXZlbnQubGVuZ3RoICYmICEoZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdG91Y2hlcyA9IHBvaW50ZXJVdGlscy5nZXRUb3VjaFBhaXIoZXZlbnQpO1xuICAgIGNvbnN0IG1pblggPSBNYXRoLm1pbih0b3VjaGVzWzBdLnBhZ2VYLCB0b3VjaGVzWzFdLnBhZ2VYKTtcbiAgICBjb25zdCBtaW5ZID0gTWF0aC5taW4odG91Y2hlc1swXS5wYWdlWSwgdG91Y2hlc1sxXS5wYWdlWSk7XG4gICAgY29uc3QgbWF4WCA9IE1hdGgubWF4KHRvdWNoZXNbMF0ucGFnZVgsIHRvdWNoZXNbMV0ucGFnZVgpO1xuICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCh0b3VjaGVzWzBdLnBhZ2VZLCB0b3VjaGVzWzFdLnBhZ2VZKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBtaW5YLFxuICAgICAgeTogbWluWSxcbiAgICAgIGxlZnQ6IG1pblgsXG4gICAgICB0b3A6IG1pblksXG4gICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZLFxuICAgIH07XG4gIH0sXG5cbiAgdG91Y2hEaXN0YW5jZTogZnVuY3Rpb24gKGV2ZW50LCBkZWx0YVNvdXJjZSkge1xuICAgIGNvbnN0IHNvdXJjZVggPSBkZWx0YVNvdXJjZSArICdYJztcbiAgICBjb25zdCBzb3VyY2VZID0gZGVsdGFTb3VyY2UgKyAnWSc7XG4gICAgY29uc3QgdG91Y2hlcyA9IHBvaW50ZXJVdGlscy5nZXRUb3VjaFBhaXIoZXZlbnQpO1xuXG5cbiAgICBjb25zdCBkeCA9IHRvdWNoZXNbMF1bc291cmNlWF0gLSB0b3VjaGVzWzFdW3NvdXJjZVhdO1xuICAgIGNvbnN0IGR5ID0gdG91Y2hlc1swXVtzb3VyY2VZXSAtIHRvdWNoZXNbMV1bc291cmNlWV07XG5cbiAgICByZXR1cm4gaHlwb3QoZHgsIGR5KTtcbiAgfSxcblxuICB0b3VjaEFuZ2xlOiBmdW5jdGlvbiAoZXZlbnQsIHByZXZBbmdsZSwgZGVsdGFTb3VyY2UpIHtcbiAgICBjb25zdCBzb3VyY2VYID0gZGVsdGFTb3VyY2UgKyAnWCc7XG4gICAgY29uc3Qgc291cmNlWSA9IGRlbHRhU291cmNlICsgJ1knO1xuICAgIGNvbnN0IHRvdWNoZXMgPSBwb2ludGVyVXRpbHMuZ2V0VG91Y2hQYWlyKGV2ZW50KTtcbiAgICBjb25zdCBkeCA9IHRvdWNoZXNbMV1bc291cmNlWF0gLSB0b3VjaGVzWzBdW3NvdXJjZVhdO1xuICAgIGNvbnN0IGR5ID0gdG91Y2hlc1sxXVtzb3VyY2VZXSAtIHRvdWNoZXNbMF1bc291cmNlWV07XG4gICAgY29uc3QgYW5nbGUgPSAxODAgKiBNYXRoLmF0YW4yKGR5ICwgZHgpIC8gTWF0aC5QSTtcblxuICAgIHJldHVybiAgYW5nbGU7XG4gIH0sXG5cbiAgZ2V0UG9pbnRlclR5cGU6IGZ1bmN0aW9uIChwb2ludGVyKSB7XG4gICAgcmV0dXJuIGlzLnN0cmluZyhwb2ludGVyLnBvaW50ZXJUeXBlKVxuICAgICAgPyBwb2ludGVyLnBvaW50ZXJUeXBlXG4gICAgICA6IGlzLm51bWJlcihwb2ludGVyLnBvaW50ZXJUeXBlKVxuICAgICAgICA/IFt1bmRlZmluZWQsIHVuZGVmaW5lZCwndG91Y2gnLCAncGVuJywgJ21vdXNlJ11bcG9pbnRlci5wb2ludGVyVHlwZV1cbiAgICAgICAgICAvLyBpZiB0aGUgUG9pbnRlckV2ZW50IEFQSSBpc24ndCBhdmFpbGFibGUsIHRoZW4gdGhlIFwicG9pbnRlclwiIG11c3RcbiAgICAgICAgICAvLyBiZSBlaXRoZXIgYSBNb3VzZUV2ZW50LCBUb3VjaEV2ZW50LCBvciBUb3VjaCBvYmplY3RcbiAgICAgICAgICA6IC90b3VjaC8udGVzdChwb2ludGVyLnR5cGUpIHx8IHBvaW50ZXIgaW5zdGFuY2VvZiBkb21PYmplY3RzLlRvdWNoXG4gICAgICAgICAgICA/ICd0b3VjaCdcbiAgICAgICAgICAgIDogJ21vdXNlJztcbiAgfSxcblxuICAvLyBbIGV2ZW50LnRhcmdldCwgZXZlbnQuY3VycmVudFRhcmdldCBdXG4gIGdldEV2ZW50VGFyZ2V0czogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgcGF0aCA9IGlzLmZ1bmN0aW9uKGV2ZW50LmNvbXBvc2VkUGF0aCkgPyBldmVudC5jb21wb3NlZFBhdGgoKSA6IGV2ZW50LnBhdGg7XG5cbiAgICByZXR1cm4gW1xuICAgICAgZG9tVXRpbHMuZ2V0QWN0dWFsRWxlbWVudChwYXRoID8gcGF0aFswXSA6IGV2ZW50LnRhcmdldCksXG4gICAgICBkb21VdGlscy5nZXRBY3R1YWxFbGVtZW50KGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgIF07XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvaW50ZXJVdGlscztcbiIsIm1vZHVsZS5leHBvcnRzID0gKHgsIHkpID0+ICBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4iLCJmdW5jdGlvbiBwb2ludGVyRXh0ZW5kIChkZXN0LCBzb3VyY2UpIHtcbiAgZm9yIChjb25zdCBwcm9wIGluIHNvdXJjZSkge1xuICAgIGNvbnN0IHByZWZpeGVkUHJvcFJFcyA9IG1vZHVsZS5leHBvcnRzLnByZWZpeGVkUHJvcFJFcztcbiAgICBsZXQgZGVwcmVjYXRlZCA9IGZhbHNlO1xuXG4gICAgLy8gc2tpcCBkZXByZWNhdGVkIHByZWZpeGVkIHByb3BlcnRpZXNcbiAgICBmb3IgKGNvbnN0IHZlbmRvciBpbiBwcmVmaXhlZFByb3BSRXMpIHtcbiAgICAgIGlmIChwcm9wLmluZGV4T2YodmVuZG9yKSA9PT0gMCAmJiBwcmVmaXhlZFByb3BSRXNbdmVuZG9yXS50ZXN0KHByb3ApKSB7XG4gICAgICAgIGRlcHJlY2F0ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWRlcHJlY2F0ZWQgJiYgdHlwZW9mIHNvdXJjZVtwcm9wXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZGVzdFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59XG5cbnBvaW50ZXJFeHRlbmQucHJlZml4ZWRQcm9wUkVzID0ge1xuICB3ZWJraXQ6IC8oTW92ZW1lbnRbWFldfFJhZGl1c1tYWV18Um90YXRpb25BbmdsZXxGb3JjZSkkLyxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcG9pbnRlckV4dGVuZDtcbiIsImZ1bmN0aW9uIGNvbnRhaW5zIChhcnJheSwgdGFyZ2V0KSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKHRhcmdldCkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBtZXJnZSAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgZm9yIChjb25zdCBpdGVtIG9mIHNvdXJjZSkge1xuICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbnRhaW5zLFxuICBtZXJnZSxcbn07XG4iLCJjb25zdCBleHRlbmQgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyk7XG5jb25zdCBnZXRPcmlnaW5YWSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0T3JpZ2luWFknKTtcbmNvbnN0IGRlZmF1bHRzICAgID0gcmVxdWlyZSgnLi9kZWZhdWx0T3B0aW9ucycpO1xuY29uc3Qgc2lnbmFscyAgICAgPSByZXF1aXJlKCcuL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxuY2xhc3MgSW50ZXJhY3RFdmVudCB7XG4gIC8qKiAqL1xuICBjb25zdHJ1Y3RvciAoaW50ZXJhY3Rpb24sIGV2ZW50LCBhY3Rpb24sIHBoYXNlLCBlbGVtZW50LCByZWxhdGVkLCBwcmVFbmQgPSBmYWxzZSkge1xuICAgIGNvbnN0IHRhcmdldCAgICAgID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuICAgIGNvbnN0IGRlbHRhU291cmNlID0gKHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucyB8fCBkZWZhdWx0cykuZGVsdGFTb3VyY2U7XG4gICAgY29uc3Qgb3JpZ2luICAgICAgPSBnZXRPcmlnaW5YWSh0YXJnZXQsIGVsZW1lbnQsIGFjdGlvbik7XG4gICAgY29uc3Qgc3RhcnRpbmcgICAgPSBwaGFzZSA9PT0gJ3N0YXJ0JztcbiAgICBjb25zdCBlbmRpbmcgICAgICA9IHBoYXNlID09PSAnZW5kJztcbiAgICBjb25zdCBjb29yZHMgICAgICA9IHN0YXJ0aW5nPyBpbnRlcmFjdGlvbi5zdGFydENvb3JkcyA6IGludGVyYWN0aW9uLmN1ckNvb3JkcztcbiAgICBjb25zdCBwcmV2RXZlbnQgICA9IGludGVyYWN0aW9uLnByZXZFdmVudDtcblxuICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGludGVyYWN0aW9uLmVsZW1lbnQ7XG5cbiAgICBjb25zdCBwYWdlICAgPSBleHRlbmQoe30sIGNvb3Jkcy5wYWdlKTtcbiAgICBjb25zdCBjbGllbnQgPSBleHRlbmQoe30sIGNvb3Jkcy5jbGllbnQpO1xuXG4gICAgcGFnZS54IC09IG9yaWdpbi54O1xuICAgIHBhZ2UueSAtPSBvcmlnaW4ueTtcblxuICAgIGNsaWVudC54IC09IG9yaWdpbi54O1xuICAgIGNsaWVudC55IC09IG9yaWdpbi55O1xuXG4gICAgdGhpcy5jdHJsS2V5ICAgICAgID0gZXZlbnQuY3RybEtleTtcbiAgICB0aGlzLmFsdEtleSAgICAgICAgPSBldmVudC5hbHRLZXk7XG4gICAgdGhpcy5zaGlmdEtleSAgICAgID0gZXZlbnQuc2hpZnRLZXk7XG4gICAgdGhpcy5tZXRhS2V5ICAgICAgID0gZXZlbnQubWV0YUtleTtcbiAgICB0aGlzLmJ1dHRvbiAgICAgICAgPSBldmVudC5idXR0b247XG4gICAgdGhpcy5idXR0b25zICAgICAgID0gZXZlbnQuYnV0dG9ucztcbiAgICB0aGlzLnRhcmdldCAgICAgICAgPSBlbGVtZW50O1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5yZWxhdGVkVGFyZ2V0ID0gcmVsYXRlZCB8fCBudWxsO1xuICAgIHRoaXMucHJlRW5kICAgICAgICA9IHByZUVuZDtcbiAgICB0aGlzLnR5cGUgICAgICAgICAgPSBhY3Rpb24gKyAocGhhc2UgfHwgJycpO1xuICAgIHRoaXMuaW50ZXJhY3Rpb24gICA9IGludGVyYWN0aW9uO1xuICAgIHRoaXMuaW50ZXJhY3RhYmxlICA9IHRhcmdldDtcblxuICAgIHRoaXMudDAgPSBzdGFydGluZyA/IGludGVyYWN0aW9uLmRvd25UaW1lc1tpbnRlcmFjdGlvbi5kb3duVGltZXMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgICAgOiBwcmV2RXZlbnQudDA7XG5cbiAgICBjb25zdCBzaWduYWxBcmcgPSB7XG4gICAgICBpbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50LFxuICAgICAgYWN0aW9uLFxuICAgICAgcGhhc2UsXG4gICAgICBlbGVtZW50LFxuICAgICAgcmVsYXRlZCxcbiAgICAgIHBhZ2UsXG4gICAgICBjbGllbnQsXG4gICAgICBjb29yZHMsXG4gICAgICBzdGFydGluZyxcbiAgICAgIGVuZGluZyxcbiAgICAgIGRlbHRhU291cmNlLFxuICAgICAgaUV2ZW50OiB0aGlzLFxuICAgIH07XG5cbiAgICBzaWduYWxzLmZpcmUoJ3NldC14eScsIHNpZ25hbEFyZyk7XG5cbiAgICBpZiAoZW5kaW5nKSB7XG4gICAgICAvLyB1c2UgcHJldmlvdXMgY29vcmRzIHdoZW4gZW5kaW5nXG4gICAgICB0aGlzLnBhZ2VYID0gcHJldkV2ZW50LnBhZ2VYO1xuICAgICAgdGhpcy5wYWdlWSA9IHByZXZFdmVudC5wYWdlWTtcbiAgICAgIHRoaXMuY2xpZW50WCA9IHByZXZFdmVudC5jbGllbnRYO1xuICAgICAgdGhpcy5jbGllbnRZID0gcHJldkV2ZW50LmNsaWVudFk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wYWdlWCAgICAgPSBwYWdlLng7XG4gICAgICB0aGlzLnBhZ2VZICAgICA9IHBhZ2UueTtcbiAgICAgIHRoaXMuY2xpZW50WCAgID0gY2xpZW50Lng7XG4gICAgICB0aGlzLmNsaWVudFkgICA9IGNsaWVudC55O1xuICAgIH1cblxuICAgIHRoaXMueDAgICAgICAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS54IC0gb3JpZ2luLng7XG4gICAgdGhpcy55MCAgICAgICAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnkgLSBvcmlnaW4ueTtcbiAgICB0aGlzLmNsaWVudFgwICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC54IC0gb3JpZ2luLng7XG4gICAgdGhpcy5jbGllbnRZMCAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueSAtIG9yaWdpbi55O1xuXG4gICAgc2lnbmFscy5maXJlKCdzZXQtZGVsdGEnLCBzaWduYWxBcmcpO1xuXG4gICAgdGhpcy50aW1lU3RhbXAgPSBjb29yZHMudGltZVN0YW1wO1xuICAgIHRoaXMuZHQgICAgICAgID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnRpbWVTdGFtcDtcbiAgICB0aGlzLmR1cmF0aW9uICA9IHRoaXMudGltZVN0YW1wIC0gdGhpcy50MDtcblxuICAgIC8vIHNwZWVkIGFuZCB2ZWxvY2l0eSBpbiBwaXhlbHMgcGVyIHNlY29uZFxuICAgIHRoaXMuc3BlZWQgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGFbZGVsdGFTb3VyY2VdLnNwZWVkO1xuICAgIHRoaXMudmVsb2NpdHlYID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhW2RlbHRhU291cmNlXS52eDtcbiAgICB0aGlzLnZlbG9jaXR5WSA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YVtkZWx0YVNvdXJjZV0udnk7XG5cbiAgICB0aGlzLnN3aXBlID0gKGVuZGluZyB8fCBwaGFzZSA9PT0gJ2luZXJ0aWFzdGFydCcpPyB0aGlzLmdldFN3aXBlKCkgOiBudWxsO1xuXG4gICAgc2lnbmFscy5maXJlKCduZXcnLCBzaWduYWxBcmcpO1xuICB9XG5cbiAgZ2V0U3dpcGUgKCkge1xuICAgIGNvbnN0IGludGVyYWN0aW9uID0gdGhpcy5pbnRlcmFjdGlvbjtcblxuICAgIGlmIChpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc3BlZWQgPCA2MDBcbiAgICAgICAgfHwgdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudGltZVN0YW1wID4gMTUwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgYW5nbGUgPSAxODAgKiBNYXRoLmF0YW4yKGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVksIGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVgpIC8gTWF0aC5QSTtcbiAgICBjb25zdCBvdmVybGFwID0gMjIuNTtcblxuICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgIGFuZ2xlICs9IDM2MDtcbiAgICB9XG5cbiAgICBjb25zdCBsZWZ0ID0gMTM1IC0gb3ZlcmxhcCA8PSBhbmdsZSAmJiBhbmdsZSA8IDIyNSArIG92ZXJsYXA7XG4gICAgY29uc3QgdXAgICA9IDIyNSAtIG92ZXJsYXAgPD0gYW5nbGUgJiYgYW5nbGUgPCAzMTUgKyBvdmVybGFwO1xuXG4gICAgY29uc3QgcmlnaHQgPSAhbGVmdCAmJiAoMzE1IC0gb3ZlcmxhcCA8PSBhbmdsZSB8fCBhbmdsZSA8ICA0NSArIG92ZXJsYXApO1xuICAgIGNvbnN0IGRvd24gID0gIXVwICAgJiYgICA0NSAtIG92ZXJsYXAgPD0gYW5nbGUgJiYgYW5nbGUgPCAxMzUgKyBvdmVybGFwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVwLFxuICAgICAgZG93bixcbiAgICAgIGxlZnQsXG4gICAgICByaWdodCxcbiAgICAgIGFuZ2xlLFxuICAgICAgc3BlZWQ6IGludGVyYWN0aW9uLnByZXZFdmVudC5zcGVlZCxcbiAgICAgIHZlbG9jaXR5OiB7XG4gICAgICAgIHg6IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVgsXG4gICAgICAgIHk6IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVksXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcmV2ZW50RGVmYXVsdCAoKSB7fVxuXG4gIC8qKiAqL1xuICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKCkge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqICovXG4gIHN0b3BQcm9wYWdhdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICB9XG59XG5cbnNpZ25hbHMub24oJ3NldC1kZWx0YScsIGZ1bmN0aW9uICh7IGlFdmVudCwgaW50ZXJhY3Rpb24sIHN0YXJ0aW5nLCBkZWx0YVNvdXJjZSB9KSB7XG4gIGNvbnN0IHByZXZFdmVudCA9IHN0YXJ0aW5nPyBpRXZlbnQgOiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQ7XG5cbiAgaWYgKGRlbHRhU291cmNlID09PSAnY2xpZW50Jykge1xuICAgIGlFdmVudC5keCA9IGlFdmVudC5jbGllbnRYIC0gcHJldkV2ZW50LmNsaWVudFg7XG4gICAgaUV2ZW50LmR5ID0gaUV2ZW50LmNsaWVudFkgLSBwcmV2RXZlbnQuY2xpZW50WTtcbiAgfVxuICBlbHNlIHtcbiAgICBpRXZlbnQuZHggPSBpRXZlbnQucGFnZVggLSBwcmV2RXZlbnQucGFnZVg7XG4gICAgaUV2ZW50LmR5ID0gaUV2ZW50LnBhZ2VZIC0gcHJldkV2ZW50LnBhZ2VZO1xuICB9XG59KTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzID0gc2lnbmFscztcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmFjdEV2ZW50O1xuIiwiY29uc3Qge1xuICByZXNvbHZlUmVjdExpa2UsXG4gIHJlY3RUb1hZLFxufSA9IHJlcXVpcmUoJy4vcmVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIGVsZW1lbnQsIGFjdGlvbikge1xuICBjb25zdCBhY3Rpb25PcHRpb25zID0gdGFyZ2V0Lm9wdGlvbnNbYWN0aW9uXTtcbiAgY29uc3QgYWN0aW9uT3JpZ2luID0gYWN0aW9uT3B0aW9ucyAmJiBhY3Rpb25PcHRpb25zLm9yaWdpbjtcbiAgY29uc3Qgb3JpZ2luID0gYWN0aW9uT3JpZ2luIHx8IHRhcmdldC5vcHRpb25zLm9yaWdpbjtcblxuICBjb25zdCBvcmlnaW5SZWN0ID0gcmVzb2x2ZVJlY3RMaWtlKG9yaWdpbiwgdGFyZ2V0LCBlbGVtZW50LCBbdGFyZ2V0ICYmIGVsZW1lbnRdKTtcblxuICByZXR1cm4gcmVjdFRvWFkob3JpZ2luUmVjdCkgfHwgeyB4OiAwLCB5OiAwIH07XG59O1xuIiwiY29uc3QgZXh0ZW5kID0gcmVxdWlyZSgnLi9leHRlbmQnKTtcbmNvbnN0IGlzID0gcmVxdWlyZSgnLi9pcycpO1xuY29uc3Qge1xuICBjbG9zZXN0LFxuICBwYXJlbnROb2RlLFxuICBnZXRFbGVtZW50UmVjdCxcbn0gPSByZXF1aXJlKCcuL2RvbVV0aWxzJyk7XG5cbmNvbnN0IHJlY3RVdGlscyA9IHtcbiAgZ2V0U3RyaW5nT3B0aW9uUmVzdWx0OiBmdW5jdGlvbiAodmFsdWUsIGludGVyYWN0YWJsZSwgZWxlbWVudCkge1xuICAgIGlmICghaXMuc3RyaW5nKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAncGFyZW50Jykge1xuICAgICAgdmFsdWUgPSBwYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWx1ZSA9PT0gJ3NlbGYnKSB7XG4gICAgICB2YWx1ZSA9IGludGVyYWN0YWJsZS5nZXRSZWN0KGVsZW1lbnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhbHVlID0gY2xvc2VzdChlbGVtZW50LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIHJlc29sdmVSZWN0TGlrZTogZnVuY3Rpb24gKHZhbHVlLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGZ1bmN0aW9uQXJncykge1xuICAgIHZhbHVlID0gcmVjdFV0aWxzLmdldFN0cmluZ09wdGlvblJlc3VsdCh2YWx1ZSwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KSB8fCB2YWx1ZTtcblxuICAgIGlmIChpcy5mdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkobnVsbCwgZnVuY3Rpb25BcmdzKTtcbiAgICB9XG5cbiAgICBpZiAoaXMuZWxlbWVudCh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gZ2V0RWxlbWVudFJlY3QodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICByZWN0VG9YWTogZnVuY3Rpb24gKHJlY3QpIHtcbiAgICByZXR1cm4gIHJlY3QgJiYge1xuICAgICAgeDogJ3gnIGluIHJlY3QgPyByZWN0LnggOiByZWN0LmxlZnQsXG4gICAgICB5OiAneScgaW4gcmVjdCA/IHJlY3QueSA6IHJlY3QudG9wLFxuICAgIH07XG4gIH0sXG5cbiAgeHl3aFRvVGxicjogZnVuY3Rpb24gKHJlY3QpIHtcbiAgICBpZiAocmVjdCAmJiAhKCdsZWZ0JyBpbiByZWN0ICYmICd0b3AnIGluIHJlY3QpKSB7XG4gICAgICByZWN0ID0gZXh0ZW5kKHt9LCByZWN0KTtcblxuICAgICAgcmVjdC5sZWZ0ICAgPSByZWN0LnggfHwgMDtcbiAgICAgIHJlY3QudG9wICAgID0gcmVjdC55IHx8IDA7XG4gICAgICByZWN0LnJpZ2h0ICA9IHJlY3QucmlnaHQgICB8fCAocmVjdC5sZWZ0ICsgcmVjdC53aWR0aCk7XG4gICAgICByZWN0LmJvdHRvbSA9IHJlY3QuYm90dG9tICB8fCAocmVjdC50b3AgKyByZWN0LmhlaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlY3Q7XG4gIH0sXG5cbiAgdGxiclRvWHl3aDogZnVuY3Rpb24gKHJlY3QpIHtcbiAgICBpZiAocmVjdCAmJiAhKCd4JyBpbiByZWN0ICYmICd5JyBpbiByZWN0KSkge1xuICAgICAgcmVjdCA9IGV4dGVuZCh7fSwgcmVjdCk7XG5cbiAgICAgIHJlY3QueCAgICAgID0gcmVjdC5sZWZ0IHx8IDA7XG4gICAgICByZWN0LnRvcCAgICA9IHJlY3QudG9wICB8fCAwO1xuICAgICAgcmVjdC53aWR0aCAgPSByZWN0LndpZHRoICB8fCAocmVjdC5yaWdodCAgLSByZWN0LngpO1xuICAgICAgcmVjdC5oZWlnaHQgPSByZWN0LmhlaWdodCB8fCAocmVjdC5ib3R0b20gLSByZWN0LnkpO1xuICAgIH1cblxuICAgIHJldHVybiByZWN0O1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZWN0VXRpbHM7XG4iLCJjb25zdCB3aW4gICAgICAgID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcbmNvbnN0IGJyb3dzZXIgICAgPSByZXF1aXJlKCcuL2Jyb3dzZXInKTtcbmNvbnN0IGlzICAgICAgICAgPSByZXF1aXJlKCcuL2lzJyk7XG5jb25zdCBkb21PYmplY3RzID0gcmVxdWlyZSgnLi9kb21PYmplY3RzJyk7XG5cbmNvbnN0IGRvbVV0aWxzID0ge1xuICBub2RlQ29udGFpbnM6IGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkKSB7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQgPT09IHBhcmVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBjbG9zZXN0OiBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICB3aGlsZSAoaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgICAgaWYgKGRvbVV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHsgcmV0dXJuIGVsZW1lbnQ7IH1cblxuICAgICAgZWxlbWVudCA9IGRvbVV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgcGFyZW50Tm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuXG4gICAgaWYgKGlzLmRvY0ZyYWcocGFyZW50KSkge1xuICAgICAgLy8gc2tpcCBwYXN0ICNzaGFkby1yb290IGZyYWdtZW50c1xuICAgICAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQuaG9zdCkgJiYgaXMuZG9jRnJhZyhwYXJlbnQpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQ7XG4gIH0sXG5cbiAgbWF0Y2hlc1NlbGVjdG9yOiBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAvLyByZW1vdmUgL2RlZXAvIGZyb20gc2VsZWN0b3JzIGlmIHNoYWRvd0RPTSBwb2x5ZmlsbCBpcyB1c2VkXG4gICAgaWYgKHdpbi53aW5kb3cgIT09IHdpbi5yZWFsV2luZG93KSB7XG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoL1xcL2RlZXBcXC8vZywgJyAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudFticm93c2VyLnByZWZpeGVkTWF0Y2hlc1NlbGVjdG9yXShzZWxlY3Rvcik7XG4gIH0sXG5cbiAgLy8gVGVzdCBmb3IgdGhlIGVsZW1lbnQgdGhhdCdzIFwiYWJvdmVcIiBhbGwgb3RoZXIgcXVhbGlmaWVyc1xuICBpbmRleE9mRGVlcGVzdEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50cykge1xuICAgIGxldCBkZWVwZXN0Wm9uZVBhcmVudHMgPSBbXTtcbiAgICBsZXQgZHJvcHpvbmVQYXJlbnRzID0gW107XG4gICAgbGV0IGRyb3B6b25lO1xuICAgIGxldCBkZWVwZXN0Wm9uZSA9IGVsZW1lbnRzWzBdO1xuICAgIGxldCBpbmRleCA9IGRlZXBlc3Rab25lPyAwOiAtMTtcbiAgICBsZXQgcGFyZW50O1xuICAgIGxldCBjaGlsZDtcbiAgICBsZXQgaTtcbiAgICBsZXQgbjtcblxuICAgIGZvciAoaSA9IDE7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZHJvcHpvbmUgPSBlbGVtZW50c1tpXTtcblxuICAgICAgLy8gYW4gZWxlbWVudCBtaWdodCBiZWxvbmcgdG8gbXVsdGlwbGUgc2VsZWN0b3IgZHJvcHpvbmVzXG4gICAgICBpZiAoIWRyb3B6b25lIHx8IGRyb3B6b25lID09PSBkZWVwZXN0Wm9uZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkZWVwZXN0Wm9uZSkge1xuICAgICAgICBkZWVwZXN0Wm9uZSA9IGRyb3B6b25lO1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgZGVlcGVzdCBvciBjdXJyZW50IGFyZSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgb3IgZG9jdW1lbnQucm9vdEVsZW1lbnRcbiAgICAgIC8vIC0gaWYgdGhlIGN1cnJlbnQgZHJvcHpvbmUgaXMsIGRvIG5vdGhpbmcgYW5kIGNvbnRpbnVlXG4gICAgICBpZiAoZHJvcHpvbmUucGFyZW50Tm9kZSA9PT0gZHJvcHpvbmUub3duZXJEb2N1bWVudCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIC8vIC0gaWYgZGVlcGVzdCBpcywgdXBkYXRlIHdpdGggdGhlIGN1cnJlbnQgZHJvcHpvbmUgYW5kIGNvbnRpbnVlIHRvIG5leHRcbiAgICAgIGVsc2UgaWYgKGRlZXBlc3Rab25lLnBhcmVudE5vZGUgPT09IGRyb3B6b25lLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZGVlcGVzdFpvbmUgPSBkcm9wem9uZTtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkZWVwZXN0Wm9uZVBhcmVudHMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmVudCA9IGRlZXBlc3Rab25lO1xuICAgICAgICB3aGlsZSAocGFyZW50LnBhcmVudE5vZGUgJiYgcGFyZW50LnBhcmVudE5vZGUgIT09IHBhcmVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzLnVuc2hpZnQocGFyZW50KTtcbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGlzIGVsZW1lbnQgaXMgYW4gc3ZnIGVsZW1lbnQgYW5kIHRoZSBjdXJyZW50IGRlZXBlc3QgaXNcbiAgICAgIC8vIGFuIEhUTUxFbGVtZW50XG4gICAgICBpZiAoZGVlcGVzdFpvbmUgaW5zdGFuY2VvZiBkb21PYmplY3RzLkhUTUxFbGVtZW50XG4gICAgICAgICAgJiYgZHJvcHpvbmUgaW5zdGFuY2VvZiBkb21PYmplY3RzLlNWR0VsZW1lbnRcbiAgICAgICAgICAmJiAhKGRyb3B6b25lIGluc3RhbmNlb2YgZG9tT2JqZWN0cy5TVkdTVkdFbGVtZW50KSkge1xuXG4gICAgICAgIGlmIChkcm9wem9uZSA9PT0gZGVlcGVzdFpvbmUucGFyZW50Tm9kZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50ID0gZHJvcHpvbmUub3duZXJTVkdFbGVtZW50O1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHBhcmVudCA9IGRyb3B6b25lO1xuICAgICAgfVxuXG4gICAgICBkcm9wem9uZVBhcmVudHMgPSBbXTtcblxuICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnROb2RlICE9PSBwYXJlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICBkcm9wem9uZVBhcmVudHMudW5zaGlmdChwYXJlbnQpO1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cblxuICAgICAgbiA9IDA7XG5cbiAgICAgIC8vIGdldCAocG9zaXRpb24gb2YgbGFzdCBjb21tb24gYW5jZXN0b3IpICsgMVxuICAgICAgd2hpbGUgKGRyb3B6b25lUGFyZW50c1tuXSAmJiBkcm9wem9uZVBhcmVudHNbbl0gPT09IGRlZXBlc3Rab25lUGFyZW50c1tuXSkge1xuICAgICAgICBuKys7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmVudHMgPSBbXG4gICAgICAgIGRyb3B6b25lUGFyZW50c1tuIC0gMV0sXG4gICAgICAgIGRyb3B6b25lUGFyZW50c1tuXSxcbiAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzW25dLFxuICAgICAgXTtcblxuICAgICAgY2hpbGQgPSBwYXJlbnRzWzBdLmxhc3RDaGlsZDtcblxuICAgICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gcGFyZW50c1sxXSkge1xuICAgICAgICAgIGRlZXBlc3Rab25lID0gZHJvcHpvbmU7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGRlZXBlc3Rab25lUGFyZW50cyA9IFtdO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hpbGQgPT09IHBhcmVudHNbMl0pIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfSxcblxuICBtYXRjaGVzVXBUbzogZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yLCBsaW1pdCkge1xuICAgIHdoaWxlIChpcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICBpZiAoZG9tVXRpbHMubWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9IGRvbVV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgICAgIGlmIChlbGVtZW50ID09PSBsaW1pdCkge1xuICAgICAgICByZXR1cm4gZG9tVXRpbHMubWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgZ2V0QWN0dWFsRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gKGVsZW1lbnQgaW5zdGFuY2VvZiBkb21PYmplY3RzLlNWR0VsZW1lbnRJbnN0YW5jZVxuICAgICAgPyBlbGVtZW50LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50XG4gICAgICA6IGVsZW1lbnQpO1xuICB9LFxuXG4gIGdldFNjcm9sbFhZOiBmdW5jdGlvbiAocmVsZXZhbnRXaW5kb3cpIHtcbiAgICByZWxldmFudFdpbmRvdyA9IHJlbGV2YW50V2luZG93IHx8IHdpbi53aW5kb3c7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHJlbGV2YW50V2luZG93LnNjcm9sbFggfHwgcmVsZXZhbnRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICB5OiByZWxldmFudFdpbmRvdy5zY3JvbGxZIHx8IHJlbGV2YW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgfTtcbiAgfSxcblxuICBnZXRFbGVtZW50Q2xpZW50UmVjdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjbGllbnRSZWN0ID0gKGVsZW1lbnQgaW5zdGFuY2VvZiBkb21PYmplY3RzLlNWR0VsZW1lbnRcbiAgICAgID8gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgOiBlbGVtZW50LmdldENsaWVudFJlY3RzKClbMF0pO1xuXG4gICAgcmV0dXJuIGNsaWVudFJlY3QgJiYge1xuICAgICAgbGVmdCAgOiBjbGllbnRSZWN0LmxlZnQsXG4gICAgICByaWdodCA6IGNsaWVudFJlY3QucmlnaHQsXG4gICAgICB0b3AgICA6IGNsaWVudFJlY3QudG9wLFxuICAgICAgYm90dG9tOiBjbGllbnRSZWN0LmJvdHRvbSxcbiAgICAgIHdpZHRoIDogY2xpZW50UmVjdC53aWR0aCAgfHwgY2xpZW50UmVjdC5yaWdodCAgLSBjbGllbnRSZWN0LmxlZnQsXG4gICAgICBoZWlnaHQ6IGNsaWVudFJlY3QuaGVpZ2h0IHx8IGNsaWVudFJlY3QuYm90dG9tIC0gY2xpZW50UmVjdC50b3AsXG4gICAgfTtcbiAgfSxcblxuICBnZXRFbGVtZW50UmVjdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjbGllbnRSZWN0ID0gZG9tVXRpbHMuZ2V0RWxlbWVudENsaWVudFJlY3QoZWxlbWVudCk7XG5cbiAgICBpZiAoIWJyb3dzZXIuaXNJT1M3ICYmIGNsaWVudFJlY3QpIHtcbiAgICAgIGNvbnN0IHNjcm9sbCA9IGRvbVV0aWxzLmdldFNjcm9sbFhZKHdpbi5nZXRXaW5kb3coZWxlbWVudCkpO1xuXG4gICAgICBjbGllbnRSZWN0LmxlZnQgICArPSBzY3JvbGwueDtcbiAgICAgIGNsaWVudFJlY3QucmlnaHQgICs9IHNjcm9sbC54O1xuICAgICAgY2xpZW50UmVjdC50b3AgICAgKz0gc2Nyb2xsLnk7XG4gICAgICBjbGllbnRSZWN0LmJvdHRvbSArPSBzY3JvbGwueTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xpZW50UmVjdDtcbiAgfSxcblxuICBnZXRQYXRoOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGNvbnN0IHBhdGggPSBbXTtcblxuICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICBwYXRoLnB1c2goZWxlbWVudCk7XG4gICAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfSxcblxuICB0cnlTZWxlY3RvcjogdmFsdWUgPT4ge1xuICAgIGlmICghaXMuc3RyaW5nKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHJhaXNlZCBpZiBpdCBpcyBpbnZhbGlkXG4gICAgZG9tT2JqZWN0cy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tVXRpbHM7XG4iLCJjb25zdCB7IHdpbmRvdyB9ID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcbmNvbnN0IGlzICAgICA9IHJlcXVpcmUoJy4vaXMnKTtcbmNvbnN0IGRvbU9iamVjdHMgPSByZXF1aXJlKCcuL2RvbU9iamVjdHMnKTtcblxuY29uc3QgRWxlbWVudCA9IGRvbU9iamVjdHMuRWxlbWVudDtcbmNvbnN0IG5hdmlnYXRvciAgPSB3aW5kb3cubmF2aWdhdG9yO1xuXG5jb25zdCBicm93c2VyID0ge1xuICAvLyBEb2VzIHRoZSBicm93c2VyIHN1cHBvcnQgdG91Y2ggaW5wdXQ/XG4gIHN1cHBvcnRzVG91Y2g6ICEhKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IGlzLmZ1bmN0aW9uKHdpbmRvdy5Eb2N1bWVudFRvdWNoKVxuICAgICAgICAgICAgICAgICAgICAgJiYgZG9tT2JqZWN0cy5kb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSxcblxuICAvLyBEb2VzIHRoZSBicm93c2VyIHN1cHBvcnQgUG9pbnRlckV2ZW50c1xuICBzdXBwb3J0c1BvaW50ZXJFdmVudDogISFkb21PYmplY3RzLlBvaW50ZXJFdmVudCxcblxuICBpc0lPUzogKC9pUChob25lfG9kfGFkKS8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pKSxcblxuICAvLyBzY3JvbGxpbmcgZG9lc24ndCBjaGFuZ2UgdGhlIHJlc3VsdCBvZiBnZXRDbGllbnRSZWN0cyBvbiBpT1MgN1xuICBpc0lPUzc6ICgvaVAoaG9uZXxvZHxhZCkvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKVxuICAgICAgICAgICAmJiAvT1MgN1teXFxkXS8udGVzdChuYXZpZ2F0b3IuYXBwVmVyc2lvbikpLFxuXG4gIGlzSWU5OiAvTVNJRSA5Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxuXG4gIC8vIHByZWZpeCBtYXRjaGVzU2VsZWN0b3JcbiAgcHJlZml4ZWRNYXRjaGVzU2VsZWN0b3I6ICdtYXRjaGVzJyBpbiBFbGVtZW50LnByb3RvdHlwZVxuICAgID8gJ21hdGNoZXMnOiAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJyBpbiBFbGVtZW50LnByb3RvdHlwZVxuICAgID8gJ3dlYmtpdE1hdGNoZXNTZWxlY3Rvcic6ICdtb3pNYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlXG4gICAgPyAnbW96TWF0Y2hlc1NlbGVjdG9yJzogJ29NYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlXG4gICAgPyAnb01hdGNoZXNTZWxlY3Rvcic6ICdtc01hdGNoZXNTZWxlY3RvcicsXG5cbiAgcEV2ZW50VHlwZXM6IChkb21PYmplY3RzLlBvaW50ZXJFdmVudFxuICAgID8gKGRvbU9iamVjdHMuUG9pbnRlckV2ZW50ID09PSB3aW5kb3cuTVNQb2ludGVyRXZlbnRcbiAgICAgID8ge1xuICAgICAgICB1cDogICAgICdNU1BvaW50ZXJVcCcsXG4gICAgICAgIGRvd246ICAgJ01TUG9pbnRlckRvd24nLFxuICAgICAgICBvdmVyOiAgICdtb3VzZW92ZXInLFxuICAgICAgICBvdXQ6ICAgICdtb3VzZW91dCcsXG4gICAgICAgIG1vdmU6ICAgJ01TUG9pbnRlck1vdmUnLFxuICAgICAgICBjYW5jZWw6ICdNU1BvaW50ZXJDYW5jZWwnLFxuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIHVwOiAgICAgJ3BvaW50ZXJ1cCcsXG4gICAgICAgIGRvd246ICAgJ3BvaW50ZXJkb3duJyxcbiAgICAgICAgb3ZlcjogICAncG9pbnRlcm92ZXInLFxuICAgICAgICBvdXQ6ICAgICdwb2ludGVyb3V0JyxcbiAgICAgICAgbW92ZTogICAncG9pbnRlcm1vdmUnLFxuICAgICAgICBjYW5jZWw6ICdwb2ludGVyY2FuY2VsJyxcbiAgICAgIH0pXG4gICAgOiBudWxsKSxcblxuICAvLyBiZWNhdXNlIFdlYmtpdCBhbmQgT3BlcmEgc3RpbGwgdXNlICdtb3VzZXdoZWVsJyBldmVudCB0eXBlXG4gIHdoZWVsRXZlbnQ6ICdvbm1vdXNld2hlZWwnIGluIGRvbU9iamVjdHMuZG9jdW1lbnQ/ICdtb3VzZXdoZWVsJzogJ3doZWVsJyxcblxufTtcblxuLy8gT3BlcmEgTW9iaWxlIG11c3QgYmUgaGFuZGxlZCBkaWZmZXJlbnRseVxuYnJvd3Nlci5pc09wZXJhTW9iaWxlID0gKG5hdmlnYXRvci5hcHBOYW1lID09PSAnT3BlcmEnXG4gICYmIGJyb3dzZXIuc3VwcG9ydHNUb3VjaFxuICAmJiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKCdQcmVzdG8nKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYnJvd3NlcjtcbiIsImNvbnN0IHdpbiAgICAgICAgPSByZXF1aXJlKCcuL3dpbmRvdycpO1xuY29uc3QgaXNXaW5kb3cgICA9IHJlcXVpcmUoJy4vaXNXaW5kb3cnKTtcblxuY29uc3QgaXMgPSB7XG4gIGFycmF5ICAgOiAoKSA9PiB7fSxcblxuICB3aW5kb3cgIDogdGhpbmcgPT4gdGhpbmcgPT09IHdpbi53aW5kb3cgfHwgaXNXaW5kb3codGhpbmcpLFxuXG4gIGRvY0ZyYWcgOiB0aGluZyA9PiBpcy5vYmplY3QodGhpbmcpICYmIHRoaW5nLm5vZGVUeXBlID09PSAxMSxcblxuICBvYmplY3QgIDogdGhpbmcgPT4gISF0aGluZyAmJiAodHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JyksXG5cbiAgZnVuY3Rpb246IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJyxcblxuICBudW1iZXIgIDogdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSAnbnVtYmVyJyAgLFxuXG4gIGJvb2wgICAgOiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09ICdib29sZWFuJyAsXG5cbiAgc3RyaW5nICA6IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gJ3N0cmluZycgICxcblxuICBlbGVtZW50OiB0aGluZyA9PiB7XG4gICAgaWYgKCF0aGluZyB8fCAodHlwZW9mIHRoaW5nICE9PSAnb2JqZWN0JykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBjb25zdCBfd2luZG93ID0gd2luLmdldFdpbmRvdyh0aGluZykgfHwgd2luLndpbmRvdztcblxuICAgIHJldHVybiAoL29iamVjdHxmdW5jdGlvbi8udGVzdCh0eXBlb2YgX3dpbmRvdy5FbGVtZW50KVxuICAgICAgPyB0aGluZyBpbnN0YW5jZW9mIF93aW5kb3cuRWxlbWVudCAvL0RPTTJcbiAgICAgIDogdGhpbmcubm9kZVR5cGUgPT09IDEgJiYgdHlwZW9mIHRoaW5nLm5vZGVOYW1lID09PSAnc3RyaW5nJyk7XG4gIH0sXG5cbiAgcGxhaW5PYmplY3Q6IHRoaW5nID0+IGlzLm9iamVjdCh0aGluZykgJiYgdGhpbmcuY29uc3RydWN0b3IubmFtZSA9PT0gJ09iamVjdCcsXG59O1xuXG5pcy5hcnJheSA9IHRoaW5nID0+IChpcy5vYmplY3QodGhpbmcpXG4gICYmICh0eXBlb2YgdGhpbmcubGVuZ3RoICE9PSAndW5kZWZpbmVkJylcbiAgJiYgaXMuZnVuY3Rpb24odGhpbmcuc3BsaWNlKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXM7XG4iLCJjb25zdCBkb21PYmplY3RzID0ge307XG5jb25zdCB3aW4gPSByZXF1aXJlKCcuL3dpbmRvdycpLndpbmRvdztcblxuZnVuY3Rpb24gYmxhbmsgKCkge31cblxuZG9tT2JqZWN0cy5kb2N1bWVudCAgICAgICAgICAgPSB3aW4uZG9jdW1lbnQ7XG5kb21PYmplY3RzLkRvY3VtZW50RnJhZ21lbnQgICA9IHdpbi5Eb2N1bWVudEZyYWdtZW50ICAgfHwgYmxhbms7XG5kb21PYmplY3RzLlNWR0VsZW1lbnQgICAgICAgICA9IHdpbi5TVkdFbGVtZW50ICAgICAgICAgfHwgYmxhbms7XG5kb21PYmplY3RzLlNWR1NWR0VsZW1lbnQgICAgICA9IHdpbi5TVkdTVkdFbGVtZW50ICAgICAgfHwgYmxhbms7XG5kb21PYmplY3RzLlNWR0VsZW1lbnRJbnN0YW5jZSA9IHdpbi5TVkdFbGVtZW50SW5zdGFuY2UgfHwgYmxhbms7XG5kb21PYmplY3RzLkVsZW1lbnQgICAgICAgICAgICA9IHdpbi5FbGVtZW50ICAgICAgICAgICAgfHwgYmxhbms7XG5kb21PYmplY3RzLkhUTUxFbGVtZW50ICAgICAgICA9IHdpbi5IVE1MRWxlbWVudCAgICAgICAgfHwgZG9tT2JqZWN0cy5FbGVtZW50O1xuXG5kb21PYmplY3RzLkV2ZW50ICAgICAgICA9IHdpbi5FdmVudDtcbmRvbU9iamVjdHMuVG91Y2ggICAgICAgID0gd2luLlRvdWNoIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQgPSAod2luLlBvaW50ZXJFdmVudCB8fCB3aW4uTVNQb2ludGVyRXZlbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbU9iamVjdHM7XG4iLCJjb25zdCB3aW4gPSBtb2R1bGUuZXhwb3J0cztcbmNvbnN0IGlzV2luZG93ID0gcmVxdWlyZSgnLi9pc1dpbmRvdycpO1xuXG5mdW5jdGlvbiBpbml0ICh3aW5kb3cpIHtcbiAgLy8gZ2V0IHdyYXBwZWQgd2luZG93IGlmIHVzaW5nIFNoYWRvdyBET00gcG9seWZpbGxcblxuICB3aW4ucmVhbFdpbmRvdyA9IHdpbmRvdztcblxuICAvLyBjcmVhdGUgYSBUZXh0Tm9kZVxuICBjb25zdCBlbCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG5cbiAgLy8gY2hlY2sgaWYgaXQncyB3cmFwcGVkIGJ5IGEgcG9seWZpbGxcbiAgaWYgKGVsLm93bmVyRG9jdW1lbnQgIT09IHdpbmRvdy5kb2N1bWVudFxuICAgICAgJiYgdHlwZW9mIHdpbmRvdy53cmFwID09PSAnZnVuY3Rpb24nXG4gICAgJiYgd2luZG93LndyYXAoZWwpID09PSBlbCkge1xuICAgIC8vIHVzZSB3cmFwcGVkIHdpbmRvd1xuICAgIHdpbmRvdyA9IHdpbmRvdy53cmFwKHdpbmRvdyk7XG4gIH1cblxuICB3aW4ud2luZG93ID0gd2luZG93O1xufVxuXG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luLndpbmRvdyAgICAgPSB1bmRlZmluZWQ7XG4gIHdpbi5yZWFsV2luZG93ID0gdW5kZWZpbmVkO1xufVxuZWxzZSB7XG4gIGluaXQod2luZG93KTtcbn1cblxud2luLmdldFdpbmRvdyA9IGZ1bmN0aW9uIGdldFdpbmRvdyAobm9kZSkge1xuICBpZiAoaXNXaW5kb3cobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNvbnN0IHJvb3ROb2RlID0gKG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlKTtcblxuICByZXR1cm4gcm9vdE5vZGUuZGVmYXVsdFZpZXcgfHwgcm9vdE5vZGUucGFyZW50V2luZG93IHx8IHdpbi53aW5kb3c7XG59O1xuXG53aW4uaW5pdCA9IGluaXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICh0aGluZykgPT4gISEodGhpbmcgJiYgdGhpbmcuV2luZG93KSAmJiAodGhpbmcgaW5zdGFuY2VvZiB0aGluZy5XaW5kb3cpO1xuIiwiY2xhc3MgU2lnbmFscyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHtcbiAgICAgIC8vIHNpZ25hbE5hbWU6IFtsaXN0ZW5lcnNdLFxuICAgIH07XG4gIH1cblxuICBvbiAobmFtZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXSA9IFtsaXN0ZW5lcl07XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0ucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICBvZmYgKG5hbWUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0ZW5lcnNbbmFtZV0uaW5kZXhPZihsaXN0ZW5lcik7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGZpcmUgKG5hbWUsIGFyZykge1xuICAgIGNvbnN0IHRhcmdldExpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW25hbWVdO1xuXG4gICAgaWYgKCF0YXJnZXRMaXN0ZW5lcnMpIHsgcmV0dXJuOyB9XG5cbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRhcmdldExpc3RlbmVycykge1xuICAgICAgaWYgKGxpc3RlbmVyKGFyZywgbmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuU2lnbmFscy5uZXcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuZXcgU2lnbmFscygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWduYWxzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJhc2U6IHtcbiAgICBhY2NlcHQgICAgICAgIDogbnVsbCxcbiAgICBwcmV2ZW50RGVmYXVsdDogJ2F1dG8nLFxuICAgIGRlbHRhU291cmNlICAgOiAncGFnZScsXG4gIH0sXG5cbiAgcGVyQWN0aW9uOiB7XG4gICAgb3JpZ2luOiB7IHg6IDAsIHk6IDAgfSxcblxuICAgIGluZXJ0aWE6IHtcbiAgICAgIGVuYWJsZWQgICAgICAgICAgOiBmYWxzZSxcbiAgICAgIHJlc2lzdGFuY2UgICAgICAgOiAxMCwgICAgLy8gdGhlIGxhbWJkYSBpbiBleHBvbmVudGlhbCBkZWNheVxuICAgICAgbWluU3BlZWQgICAgICAgICA6IDEwMCwgICAvLyB0YXJnZXQgc3BlZWQgbXVzdCBiZSBhYm92ZSB0aGlzIGZvciBpbmVydGlhIHRvIHN0YXJ0XG4gICAgICBlbmRTcGVlZCAgICAgICAgIDogMTAsICAgIC8vIHRoZSBzcGVlZCBhdCB3aGljaCBpbmVydGlhIGlzIHNsb3cgZW5vdWdoIHRvIHN0b3BcbiAgICAgIGFsbG93UmVzdW1lICAgICAgOiB0cnVlLCAgLy8gYWxsb3cgcmVzdW1pbmcgYW4gYWN0aW9uIGluIGluZXJ0aWEgcGhhc2VcbiAgICAgIHNtb290aEVuZER1cmF0aW9uOiAzMDAsICAgLy8gYW5pbWF0ZSB0byBzbmFwL3Jlc3RyaWN0IGVuZE9ubHkgaWYgdGhlcmUncyBubyBpbmVydGlhXG4gICAgfSxcbiAgfSxcbn07XG4iLCJjb25zdCBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZC5qcycpO1xuXG5mdW5jdGlvbiBmaXJlVW50aWxJbW1lZGlhdGVTdG9wcGVkIChldmVudCwgbGlzdGVuZXJzKSB7XG4gIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgaWYgKGV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCkgeyBicmVhazsgfVxuXG4gICAgbGlzdGVuZXIoZXZlbnQpO1xuICB9XG59XG5cbmNsYXNzIEV2ZW50YWJsZSB7XG5cbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMgfHwge30pO1xuICB9XG5cbiAgZmlyZSAoZXZlbnQpIHtcbiAgICBsZXQgbGlzdGVuZXJzO1xuICAgIGNvbnN0IG9uRXZlbnQgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgICBjb25zdCBnbG9iYWwgPSB0aGlzLmdsb2JhbDtcblxuICAgIC8vIEludGVyYWN0YWJsZSNvbigpIGxpc3RlbmVyc1xuICAgIGlmICgobGlzdGVuZXJzID0gdGhpc1tldmVudC50eXBlXSkpIHtcbiAgICAgIGZpcmVVbnRpbEltbWVkaWF0ZVN0b3BwZWQoZXZlbnQsIGxpc3RlbmVycyk7XG4gICAgfVxuXG4gICAgLy8gaW50ZXJhY3RhYmxlLm9uZXZlbnQgbGlzdGVuZXJcbiAgICBpZiAodGhpc1tvbkV2ZW50XSkge1xuICAgICAgdGhpc1tvbkV2ZW50XShldmVudCk7XG4gICAgfVxuXG4gICAgLy8gaW50ZXJhY3Qub24oKSBsaXN0ZW5lcnNcbiAgICBpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCAmJiBnbG9iYWwgJiYgKGxpc3RlbmVycyA9IGdsb2JhbFtldmVudC50eXBlXSkpICB7XG4gICAgICBmaXJlVW50aWxJbW1lZGlhdGVTdG9wcGVkKGV2ZW50LCBsaXN0ZW5lcnMpO1xuICAgIH1cbiAgfVxuXG4gIG9uIChldmVudFR5cGUsIGxpc3RlbmVyKSB7XG4gICAgLy8gaWYgdGhpcyB0eXBlIG9mIGV2ZW50IHdhcyBuZXZlciBib3VuZFxuICAgIGlmICh0aGlzW2V2ZW50VHlwZV0pIHtcbiAgICAgIHRoaXNbZXZlbnRUeXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzW2V2ZW50VHlwZV0gPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIG9mZiAoZXZlbnRUeXBlLCBsaXN0ZW5lcikge1xuICAgIC8vIGlmIGl0IGlzIGFuIGFjdGlvbiBldmVudCB0eXBlXG4gICAgY29uc3QgZXZlbnRMaXN0ID0gdGhpc1tldmVudFR5cGVdO1xuICAgIGNvbnN0IGluZGV4ICAgICA9IGV2ZW50TGlzdD8gZXZlbnRMaXN0LmluZGV4T2YobGlzdGVuZXIpIDogLTE7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBldmVudExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnRMaXN0ICYmIGV2ZW50TGlzdC5sZW5ndGggPT09IDAgfHwgIWxpc3RlbmVyKSB7XG4gICAgICB0aGlzW2V2ZW50VHlwZV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQgKGRlc3QsIHNvdXJjZSkge1xuICBmb3IgKGNvbnN0IHByb3AgaW4gc291cmNlKSB7XG4gICAgZGVzdFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgfVxuICByZXR1cm4gZGVzdDtcbn07XG4iXX0=
