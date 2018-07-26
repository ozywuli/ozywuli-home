---
title: Learn about JavaScript closures
slug: learn-about-javascript-closures
date: 2018-07-24
excerpt: Learn about JavaScript closures and how they can help you write better code
---

## Preface

Closures sound scary. In fact they really are scary if you're new to JavaScript or even programming in general. Closures certainly scared me when I first learned about them. But after reading and fiddling with them a bunch, I eventually got the hang out of understanding closures. It also helps that closures are not some obscure concept. You'll run into them often in the wild. Eventually, closures become not such a scary thing anymore. They become a familiar concept that's actually not too difficult to understand. 

I'm writing this article because to further solidify my own understanding of closures. An old goes that if you can't explain something in your own words, then you don't actually understand it yourself. I also hope that this article will serve as a reference for myself in the future in case I forget what the heck closures are. Because though they aren't the most complicated concept in the world, closures are definitely not intuitive (at least for me).

If anyone ends up reading this article and finds some value in it, that'd be awesome as well.

---

## Introduction

In short, a closure is an inner function that has access to the scope of the outer function. This sounds simple or like gibberish depending on your exposure to JavaScript. Either way, let's break it down for newbies or at least for the sake of my future, dumber self.

What do we mean by "scope"? Scope refers to the accessibility of variables in your code. In JavaScript, there are two scopes: global and local.

Example of global scope:

```
// the variable `animal` is global and accessible to any code or function
var animal = 'dog';
// declaring a variable without the `var` keyword also makes the variable become global
animal2 = 'cat';

function sayAnimalType() {
    console.log(animal); // logs 'dog'
    console.log(animal2) // logs 'cat'
}

sayAnimalType();
```

Check it below:

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="LBjpKQ" data-default-tab="js,result" data-user="ozywuli" data-pen-title="closures global" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/LBjpKQ/">closures global</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

Example of local scope:

```
function sayAnimalType() {
    // declaring a variable inside a function, however, is the same as saying that the variable should be local or not accessible to any code outside of the function
    var animal = 'dog';
    // should log `dog` still because the `console.log` method and `animal` variable share the same local scope
    console.log(animal); // logs 'dog'

    // But what if you want to a variable declared inside a function to be global? It's as simple as omitting the `var`, `let`, and `const` keywords. This automatically makes any variable become global after the function executes. If the function doesn't execute, however, `animal2` will be lost to the void
    animal2 = 'cat';

    // this should still log 'cat' because global variables are accessible in any scope
    console.log(animal2) // logs 'cat'
}

sayAnimalType();

function sayAnimalType2() {
    // declare a local variable
    var animal3 = 'tyrannosarusrex';
    
    // logs 'cat' because `animal2` was declared without a variable keyword, which transform that variable into a global one, accessible anywhere
    console.log(animal2);

    console.log(animal3); // logs 'tyrannosarusrex'

    // throws an error because `animal` is undefined. It was declared inside `sayAnimalType` and is local to that function's scope
    console.log(animal);
}

sayAnimalType2();
```
Check it out below:

<p>
    <p data-height="355" data-theme-id="0" data-slug-hash="yqoYre" data-default-tab="js,result" data-user="ozywuli" data-pen-title="closures local" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/yqoYre/">closures local</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

In effect, anytime a function is executed, any local variables will be deleted and will no longer accessible. But there's an exception... closures!

Let's examine this statement again: "a closure is an inner function that has access to the scope of the outer function". When a function executes, it creates a local scope that's inaccessible to code outside of the function. But any inner functions that execute within that parent function has the same access to that parent function's local scope. Let's look at an example for further clarification:

```
function outerFunction(a, b) {
    var c = 3;

    function innerFunction() {
        // the inner function has access not only to local variables within the outer function but also to the variables passed in as arguments in the parameters
        console.log(`${a}, ${b}, ${c}`) // logs '1, 2, 3'
    }

    return innerFunction();
}

outerFunction(1, 2)
```
<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="vaJKQr" data-default-tab="js,result" data-user="ozywuli" data-pen-title="closures outer and inner functions" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/vaJKQr/">closures outer and inner functions</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

What happened in the above example? The closure created a snapshot of the outer functions scope when the outer function executed. So when the outer function did execute, its local scope closed over (hence the name closure) the local scope of the inner function, giving the inner function access to the outer function's scope.

---

## Closure Snapshot

After the outer function has returned, the variables in the scope of the outer function are still accessible in a closure. When a closure is created, what happens is that your code takes a snapshot of the outer function's scope, and this snapshot can be referenced in future code executions. For example: 

```
function registerCar(brand) {
    // outer function's local variable
    var outro = 'has been registered';

    // inner function
    function registerCarMessage(model) {
        // return the value of the inner function
        return `Your ${brand} ${model} ${outro}`;
    }

    // return the value of the outer function
    return registerCarMessage;
}

// the outer function `registerCar` has returned at this juncture
var hondas = registerCar('Honda'); // returns the inner function
// executes the return value of the outer function, which in turn executes the inner function and returns its value
var myCar = hondas('Civic'); // returns 'Your Honda Civic has been registered'

console.log(myCar);
```

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="gjxwYE" data-default-tab="js,result" data-user="ozywuli" data-pen-title="closure snapshot" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/gjxwYE/">closure snapshot</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

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
    <p data-height="265" data-theme-id="0" data-slug-hash="RBZGLm" data-default-tab="js,result" data-user="ozywuli" data-pen-title="closures in jquery" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/RBZGLm/">closures in jquery</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

**Create private methods**

You would want to create private methods to restrict access to code like preventing users of your plugin or library from accidentally executing code that's not meant to be public.

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="bjrBNq" data-default-tab="js,result" data-user="ozywuli" data-pen-title="closure private methods" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/bjrBNq/">closure private methods</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>
---

## Conclusion

If you have any feedback for how to improve this article, I'd be glad to know them.

---

## References

- [Understand JavaScript Closures With Ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)
- [MDN Closures](https://developer.mozill.org/en-US/docs/Web/JavaScript/Closures)