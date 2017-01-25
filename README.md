jQuery indicator
==========

Easy jQuery plugin to show visual feedback when loading data or any action that would take time. Also can disable form elements and put an overlay an specified area or whole page.

__Installation__

2 options:

**use Bower**
```bash
bower install llama-jquery-indicator
```

**use NPM**
```bash
npm install llama-jquery-indicator --save-dev
```

__Quick start__

Basic use:

Set default options
```javascript
$.indicator.setDefaults({
    'appendTo': "body", 
    'html': '#indicator'
});
```

Start
```javascript
$( "selector" ).indicator("show");
```

Stop:
```javascript
$( "selector" ).indicator( "hide" );
```

Default options:

```javascript
defaults = {
    'appendTo': "body",        // Place for element indicator will be append
    'html': null               // Element indicator code
};
```
