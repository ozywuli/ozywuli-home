---
title: How to animate SVG with clip-path
slug: how-to-animate-svg-with-clip-path
date: 2018-05-03
excerpt: How to animate SVG with clip-path
---

SVG stands for scalable vector graphics. It's a 2D vector image format based on XML, a markup language similar to HTML. That means when you open a SVG file in an editor, you'll notice that the content inside vaguely resembles HTML. Like HTML, SVG elements rendered in the browser are represented by opening and closing tags, that is, words in between brackets like `<svg></svg>` or `<path></path>`. This characteristic makes SVG incredibly flexible as it opens up several possibilities:

1. You can directly embed a SVG image into an HTML file by copy+pasting and the image will render in the browser. This is useful because the browser then doesn't have to make extra HTTP requests. Other image formats like JPEG and PNG cannot be directly embedded in HTML files so they must be fetched via costly HTTP requests.
2. It's relatively simple to make on-the-fly changes to SVG images in your text editor.
3. You can manipulate SVG markup and attributes with CSS and JS. This means you can animate SVG elements in ways you can't with JPEG or PNG. For example, you can change the color of a SVG shape with directly with CSS.

This last possibility is what interests us in this article because SVG allows you to make simple but neat line animations. Unfortunately, only basic SVG strokes can be animated. So vector shapes that look like brushes, for example, cannot be animated. 

Well, that's not entirely true, which is the purpose of this article. You can hack it by using the `<clipPath>` element and the `clip-path` property. Essentially, the visibility any element placed inside the `<clipPath>` element will be bound the designated clipping path. You assign the clipping path by adding `clip-path` property an element with a value that's the same as the id assigned to the `<clipPath>` element. For example:

```html
<clipPath id="clipPath">
    <!-- The visibility of any element placed in here is bound by the designed clipping path -->
    <circle cx="40" cy="35" r="35" />
</clipPath>

<!-- The following element is the designed clipping path. Any element inside `<clipPath>` will be restricted to the bounds of this element. -->
<path clip-path="url(#clipPath)" d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z" />
```

What we can do then is place more complicated vector shapes that can't be animated inside of the `<clipPath>` element. Then we cover that element using the clipping path element that is a simpler shape that can be animated. That way, we can animate the simpler shape and reveal the underlying elements inside `<clipPath>`, that is, the more complicated vector shapes. See the below example: 

<p data-height="265" data-theme-id="0" data-slug-hash="vrLXjd" data-default-tab="result" data-user="ozywuli" data-embed-version="2" data-pen-title="Animate SVG using clip paths" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/vrLXjd/">Animate SVG using clip paths</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

The above example uses a couple libraries to help animate the SVG clipping path. One is JQuery, an ancient tool but still useful for DOM manipulation. The other is Greensock, the premiere DOM animation library that gives you fine-grain control over how elements animate. In our case, the animation is simple enough that Greensock isn't actually necessary, but I decided to use it anyway to introduce Greensock to anyone not familiar with it.

## References

- [https://medium.com/@gordonnl/stylised-line-animations-ded23320ffe5](https://medium.com/@gordonnl/stylised-line-animations-ded23320ffe5)
- [https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath)

