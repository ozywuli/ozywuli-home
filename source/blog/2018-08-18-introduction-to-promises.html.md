---
title: Introduction to Javascript promises
slug: introduction-to-javascript-promises
date: 2018-08-18
excerpt: A brief introduction to Javascript promises
---

First of all, what are [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)? In Javascript, a `Promise` is an object that returns the value of an asynchronous operation. So you might wonder what's an asynchronous operation. They are code that runs without blocking the execution of other code. This means different parts of your script can run at the same time without being blocked.

But you can't understand async operations without first understanding synchronous operations. In Javascript, code is normally run synchronously or in sequence, meaning code is executed line by line from top to bottom. In the example below, the immediately invoked function blocks the subsequent `document.write()` from executing until it finishes its own execution and so on.

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="ePNBYM" data-default-tab="js,result" data-user="ozywuli" data-pen-title="INTRODUCTION TO JAVASCRIPT PROMISES I" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/ePNBYM/">INTRODUCTION TO JAVASCRIPT PROMISES I</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

This is all fine and dandy until you beed a function that queries a database or returns a payload from an API, both of which might take a considerable amount of time. Instead of waiting for the resource requests to be finished, you might want other code to be executing. You can do this by using the `Promise` object.

To better understand why promises are useful, let's use a metaphor. Imagine your JS script is a house. Inside the house is a family with each family member representing a block of code. The mom tells her son to go to the grocery store to buy milk so that she could bake cookies. While the son is out on the errand, the mom doesn't just wait around and do nothing, that is of course if she's a good mom or an asynchronous operation. Rather than just sit in silence until her son gets back, she might be prepping the kitchen for cookie baking or doing other tasks like cleaning the house. Her son running an errand shouldn't block her from doing anything else in the house. And this is the power that asynchronous operations give to Javascript code.

Below is an example of a promise that waits for an async operation to complete before resolving. While that is happening, other can still run.

<p>
<p data-height="265" data-theme-id="0" data-slug-hash="jePVbL" data-default-tab="js,result" data-user="ozywuli" data-pen-title="INTRODUCTION TO JAVASCRIPT PROMISES II" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/jePVbL/">INTRODUCTION TO JAVASCRIPT PROMISES II</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>