/**
 * Switchery 0.8.2
 * http://abpetkov.github.io/switchery/
 *
 * Forked to use css classes only by Aaron Klump
 * https://github.com/aklump
 *
 * Original Author Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2013-2015, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * External dependencies.
 */

var fastclick = require('fastclick'),
    events    = require('events');

/**
 * Expose `Switchery`.
 */

module.exports = Switchery;

/**
 * Set Switchery default values.
 *
 * @api public
 */

var defaults = {
  className: 'switchery',
  disabled : false,
  onClick  : null,
};

/**
 * Create Switchery object.
 *
 * @param {Object} element
 * @param {Object} options
 * @api public
 */

function Switchery(element, options) {
  if (!(this instanceof Switchery)) return new Switchery(element, options);

  this.element = element;
  this.options = options || {};

  for (var i in defaults) {
    if (this.options[i] == null) {
      this.options[i] = defaults[i];
    }
  }

  if (this.element != null && this.element.type == 'checkbox') this.init();
  if (this.isDisabled() === true) this.disable();
}

/**
 * Hide the target element.
 *
 * @api private
 */
Switchery.prototype.hide = function () {
  this.element.classList.add(this.options.className + '-processed');
};

/**
 * Show custom switch after the target element.
 *
 * @api private
 */
Switchery.prototype.show = function () {
  var switcher = this.create();
  this.insertAfter(this.element, switcher);
};

/**
 * Create custom switch.
 *
 * @returns {Object} this.switcher
 * @api private
 */
Switchery.prototype.create = function () {
  this.switcher = document.createElement('span');
  this.switcher.className = this.options.className;
  this.events = events(this.switcher, this);

  return this.switcher;
};

/**
 * Insert after element after another element.
 *
 * @param {Object} reference
 * @param {Object} target
 * @api private
 */
Switchery.prototype.insertAfter = function (reference, target) {
  reference.parentNode.insertBefore(target, reference.nextSibling);
};

/**
 * Set switch jack proper position.
 *
 * @param {Boolean} clicked - we need this in order to uncheck the input when the switch is clicked
 * @api private
 */
Switchery.prototype.setPosition = function (clicked) {
  var checked = this.isChecked();

  if (clicked && checked) checked = false;
  else if (clicked && !checked) checked = true;

  if (checked === true) {
    this.element.checked = true;
    this.switcher.classList.add(this.options.className + '-is-on');
  }
  else {
    this.element.checked = false;
    this.switcher.classList.remove(this.options.className + '-is-on');
  }
};

/**
 * Handle the onchange event.
 *
 * @param {Boolean} state
 * @api private
 */
Switchery.prototype.handleOnchange = function (state) {
  if (document.dispatchEvent) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, true);
    this.element.dispatchEvent(event);
  } else {
    this.element.fireEvent('onchange');
  }
};

/**
 * Handle the native input element state change.
 * A `change` event must be fired in order to detect the change.
 *
 * @api private
 */
Switchery.prototype.handleChange = function () {
  var self = this
    , el   = this.element;

  if (el.addEventListener) {
    el.addEventListener('change', function () {
      self.setPosition();
    });
  } else {
    el.attachEvent('onchange', function () {
      self.setPosition();
    });
  }
};

/**
 * Handle the switch click event.
 *
 * @api private
 */
Switchery.prototype.handleClick = function () {
  var switcher = this.switcher;

  fastclick(switcher);
  this.events.bind('click', 'bindClick');
};

/**
 * Attach all methods that need to happen on switcher click.
 *
 * @api private
 */
Switchery.prototype.bindClick = function () {
  var parent      = this.element.parentNode.tagName.toLowerCase()
    , labelParent = (parent === 'label') ? false : true;

  // Give a chance to abort based on callback returning false.
  if (typeof this.options.onClick === 'function' && !this.options.onClick(this.element, this.switcher, this)) {
    return;
  }

  this.setPosition(labelParent);
  this.handleOnchange(this.element.checked);
};

/**
 * Mark an individual switch as already handled.
 *
 * @api private
 */
Switchery.prototype.markAsSwitched = function () {
  this.element.setAttribute('data-switchery', true);
};

/**
 * Check if an individual switch is already handled.
 *
 * @api private
 */
Switchery.prototype.markedAsSwitched = function () {
  return this.element.getAttribute('data-switchery');
};

/**
 * Initialize Switchery.
 *
 * @api private
 */
Switchery.prototype.init = function () {
  this.hide();
  this.show();
  this.setPosition();
  this.markAsSwitched();
  this.handleChange();
  this.handleClick();
};

/**
 * See if input is checked.
 *
 * @returns {Boolean}
 * @api public
 */
Switchery.prototype.isChecked = function () {
  return this.element.checked;
};

/**
 * See if switcher should be disabled.
 *
 * @returns {Boolean}
 * @api public
 */
Switchery.prototype.isDisabled = function () {
  return this.options.disabled || this.element.disabled || this.element.readOnly;
};

/**
 * Destroy all event handlers attached to the switch.
 *
 * @api public
 */
Switchery.prototype.destroy = function () {
  this.events.unbind();
};

/**
 * Enable disabled switch element.
 *
 * @api public
 */
Switchery.prototype.enable = function () {
  if (this.options.disabled) this.options.disabled = false;
  if (this.element.disabled) this.element.disabled = false;
  if (this.element.readOnly) this.element.readOnly = false;
  this.switcher.classList.remove(this.options.className + '-is-disabled');
  this.events.bind('click', 'bindClick');
};

/**
 * Disable switch element.
 *
 * @api public
 */
Switchery.prototype.disable = function () {
  if (!this.options.disabled) this.options.disabled = true;
  if (!this.element.disabled) this.element.disabled = true;
  if (!this.element.readOnly) this.element.readOnly = true;
  this.switcher.classList.add(this.options.className + '-is-disabled');
  this.destroy();
};
