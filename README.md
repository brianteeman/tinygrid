# Grid TinyMCE 5 Plugin [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/tinymce-plugin-codeblock.svg
[npm-url]: https://npmjs.org/package/tinymce-plugin-codeblock

This plugin allows you to use grid system in editor.

This is a fork from https://github.com/root913/tinymce-plugin-grid
This fork version support TinyMCE 5 only.

Supported css frameworks:
* Bootstrap 5

## Demo

<a href="https://root913.github.io/tinymce-plugin-grid/demo/index.html">Demo</a>

## Installation

Just copy the contents of the  "dist" directory to plugins directory of your tinyMCE instalation.

## Use

````
tinymce.init({
    selector: 'textarea',
    plugins: [
        'grid'
    ],
    toolbar: 'grid_insert',
    grid_preset: 'Bootstrap5'
});
````