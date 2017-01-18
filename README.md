![Switchery](http://i.imgur.com/xJAM3Jq.png)

## Forked
This fork removes all the js manipulation of the DOM styles and instead applies classes to represent states.  The markup is also taken from [this article](http://www.designcouch.com/home/why/2013/09/19/ios7-style-pure-css-toggle/).  Most of the settings are removed and callbacks have been added to implement this with the Drupal 7 ajax API. A SASS file has been added which you can copy in it's entirety into your project and avoid using the supplied css file.

## Description

Switchery is a simple component that helps you turn your default HTML checkbox inputs into beautiful iOS 7 style switches in just few simple steps. You can easily customize switches, so that they match your design perfectly.

Supported by all modern browsers: Chrome, Firefox, Opera, Safari, IE8+

![Preview](http://i.imgur.com/0PcuTbO.jpg)

[Live Preview](http://abpetkov.github.io/switchery/)

## Installation

##### Standalone:

```html
<link rel="stylesheet" href="dist/switchery.css" />
<script src="dist/switchery.js"></script>
```

## Usage

```js
var elem = document.querySelector('.js-switch');
var init = new Switchery(elem);
```

Use the above for the standalone version.

## Settings and Defaults

```js
defaults = {
  , className         : 'switchery'
  , disabled          : false
};
```

- `className` : class name for the switch element (by default styled in switchery.css)
- `disabled` : enable or disable click events and changing the state of the switch (boolean value)

## Drupal

    $('.is-ios-switch-ready')
    .removeClass('is-ios-switch-ready')
    .each(function () {
        new Switchery(this, {
          onClick : function (el, toggle, obj) {
            // if Drupal is ajaxing, then do not let the click happen.
            return !el.classList.contains('progress-disabled');
          }
        });
    });

## API

##### .destroy()

Unbinding all event handlers attached to the switch element to prepare the object for garbage collection.

##### .enable()

Enable disabled switch by re-adding event handlers and changing the opacity to 1.

##### .disable()

Disable switch by unbinding attached events and changing opacity to `disabledOpacity` value.

##### .isDisabled()

Check if switch is currently disabled by checking the `readonly` and `disabled` attributes on the checkbox and the `disabled` option set via JS. If any of those are present, the returned value is `true`.

## Examples

##### Checked

Only thing you need is to add a `checked` attribute to your checkbox input. Simple as that.

```html
<input type="checkbox" class="js-switch" checked />
```

##### Multiple switches

You can add as many switches as you like, as long as their corresponding checkboxes have the same class. Select them and make new instance of the Switchery class for every of them.

```js
var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

elems.forEach(function(html) {
  var switchery = new Switchery(html);
});
```

![Multiple](http://i.imgur.com/Ip4xy4s.jpg)

##### Multiple calls

You can filter out existing elements that have already been called by looking for `data-switchery="true"`.

##### Disabled

Use the `disabled` option to make your switch active or inactive.

```js
var switchery = new Switchery(elem, { disabled: true });
```

Customize the default opacity of the disabled switch, using the `disabledOpacity` option.

```js
var switchery = new Switchery(elem, { disabled: true, disabledOpacity: 0.75 });
```

Adding `disabled` or `readonly` attribute to the native input element will result in the switch being disabled as well.

##### Checking state

In many cases, you'll need to have the current state of the checkbox, checked or not. I'll demostrate how to do this in the two most common situations - getting the state on click and on change.

On click:

```js
var clickCheckbox = document.querySelector('.js-check-click')
  , clickButton = document.querySelector('.js-check-click-button');

clickButton.addEventListener('click', function() {
  alert(clickCheckbox.checked);
});
```

On change:

```js
var changeCheckbox = document.querySelector('.js-check-change');

changeCheckbox.onchange = function() {
  alert(changeCheckbox.checked);
};
```

##### Legacy browsers

If you are an adventurer and like to support legacy browsers, like IE8 and IE7, apply your favourite fix for rounded corners and box shadows and try a slightly different approach.

```js
var elems = document.querySelectorAll('.js-switch');

for (var i = 0; i < elems.length; i++) {
  var switchery = new Switchery(elems[i]);
}
```

Personally I recommend using [CSS3 PIE](http://css3pie.com/). For working example you can check out the demo page.

## Development

If you've decided to go in development mode and tweak all of this a bit, there are few things you should do.

After you clone the repository, do this in your terminal ([NPM](http://npmjs.org/) required):

```shell
$ npm install
```

Add the following code before the rest:

```js
var Switchery = require('switchery');
```

Make sure you're using the `build/build.js` and `build/build.css` files and you're ready.

There are some useful commands you can use.

`$ make install` - will install Node.js modules, components etc.

`$ make build` - will create a build file

`$ make standalone` - will create a standalone and minified files

## Credits

Big thanks to:

- [Veselin Todorov](https://github.com/vesln)

## Contact

If you like this component, share your appreciation by following me in [Twitter](https://twitter.com/abpetkov), [GitHub](https://github.com/abpetkov) or [Dribbble](http://dribbble.com/apetkov).

## License

The MIT License (MIT)

Copyright (c) 2013-2015 Alexander Petkov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
