---
title: Learn about JavaScript closures
slug: learn-about-javascript-closures
date: 2018-07-24
excerpt: Learn about JavaScript closures and how they can help you write better code
---

## Preface

Closures sound scary. In fact they really are scary if you're new to JavaScript or even programming in general. Closures certainly scared me when I first learned about them. But after reading and fiddling with them a bunch, I eventually got the hang out of understanding closures. It also helps that closures are not some obscure concept. You'll run into them often in the wild. Eventually, closures become not such a scary thing anymore. They become a familiar concept that's actually not too difficult to understand. 

I'm writing this article because to further solidify my own understanding of closures. The saying goes that if you can't explain something in your own words, then you don't actually understand it yourself. I also hope that this article will serve as a reference for myself in the future in case I forget what the heck closures are. Because though they aren't the most complicated concept in the world, closures are definitely not intuitive (at least for me).

If anyone ends up reading this article and finds some value in it, that'd be awesome as well.

---

## Introduction

In short, a closure is an inner function that has access to the scope of the outer function. This sounds simple or like gibberish depending on your exposure to JavaScript. Either way, let's break it down for newbies or at least for the sake of my future, dumber self.

What do we mean by "scope"? Scope refers to the accessibility of variables in your code. In JavaScript, there are two scopes: global and local.

Example of global scope:

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="NOqbbg" data-default-tab="js,result" data-user="ozywuli" data-pen-title="LEARN ABOUT JAVASCRIPT CLOSURES (global scope)" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/NOqbbg/">LEARN ABOUT JAVASCRIPT CLOSURES (global scope)</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

Example of local scope:

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="RePoKW" data-default-tab="js,result" data-user="ozywuli" data-pen-title="LEARN ABOUT JAVASCRIPT CLOSURES (local scope)" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/RePoKW/">LEARN ABOUT JAVASCRIPT CLOSURES (local scope)</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

In effect, anytime a function is executed, any local variables will be deleted and will no longer accessible. But there's an exception... closures!

---

## Closure Snapshot

Let's examine this statement again: "a closure is an inner function that has access to the scope of the outer function". When a function executes, it creates a local scope that's inaccessible to code outside of the function. But any inner functions that execute within that parent function has the same access to that parent function's local scope. Let's look at an example for further clarification:

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="JmdbWq" data-default-tab="js,result" data-user="ozywuli" data-pen-title="LEARN ABOUT JAVASCRIPT CLOSURES (outer and inner function)" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/JmdbWq/">LEARN ABOUT JAVASCRIPT CLOSURES (outer and inner function)</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

What happened in the above example? The closure created a snapshot of the outer function's scope when the outer function executed. So when the outer function did execute, its local scope closed over (hence the name closure) the local scope of the inner function, giving the inner function access to the outer function's scope.

---

## Closures in the wild

Let's look at some examples of closures you may encounter in real-world production code.

**Prevent alias conflicts between multiple JS libraries**

If you're using JS libraries that share an alias, such as $ in jQuery and mooTools, you can use an immediately-invoked function expression (IIFE) to create a new scope for an alias without fear of conflicts from other JS libraries.

```
(function($) {
    // $ now refers to jQuery inside the scope created by the IIFE
})(jQuery)
```

**Store local variables in jQuery click events**

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="mzJOqE" data-default-tab="js,result" data-user="ozywuli" data-pen-title="LEARN ABOUT JAVASCRIPT CLOSURES (store local variables in events)" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/mzJOqE/">LEARN ABOUT JAVASCRIPT CLOSURES (store local variables in events)</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

**Create private methods**

You would want to create private methods to restrict access to code. For example, you would make certain variables or methods private to prevent users of your plugin or library from intentionally or accidentally accessing them. But at the same time, those private variables or methods should be accessible from within the code.

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="aROBYr" data-default-tab="js,result" data-user="ozywuli" data-pen-title="LEARN ABOUT JAVASCRIPT CLOSURES (private methods)" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/aROBYr/">LEARN ABOUT JAVASCRIPT CLOSURES (private methods)</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>
---

## Conclusion

If you have any feedback for how to improve this article, I'd be glad to know them.

---

## References

- [Understand JavaScript Closures With Ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)
- [MDN Closures](https://developer.mozill.org/en-US/docs/Web/JavaScript/Closures)