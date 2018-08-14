---
title: Sync media query values between CSS and JS
slug: sync-media-query-values-between-css-and-js
date: 2018-07-25
excerpt: Learn how to access CSS media query values in your JavaScript code
---

Sometimes you want some JS code to execute at certain screen widths, that is, you want different code behavior depending on the viewport width. You also happen to have CSS media queries that modifies the appearance of your website depending on the viewport width.

For example, at viewport widths below 500px, when a user clicks on a button, you want that button to console log a message. But when the viewport width goes above 500px, you want the that same button to alert a message. Why? I don't know, I can't think of a better example at the moment.

Sure you can probably hard code '500px' in your JavaScript code. Store that in a config object somewhere and reference that as a conditional. But what if you have '500px' also stored as a media query value in your CSS? Instead of maintaing both, you can instead just reference that CSS media query value in your JS. But how? Here's one method that I found to work well: using CSS variables

## The Method

CSS variables are custom properties that can take in any value that you can then reference in the rest of your CSS, for example:

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="WKEoBK" data-default-tab="css,result" data-user="ozywuli" data-pen-title="CSS variables" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/WKEoBK/">CSS variables</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

The trick here is to store every one of your media query values or just the one you want as CSS variables. For the sake of thoroughness, I'll do the former.

With the help of SCSS, you can store your media query values in a map that you can then loop to store every key/value pair on your document body.

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="JByEoX" data-default-tab="css,result" data-user="ozywuli" data-pen-title="Media query values as CSS variables" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/JByEoX/">Media query values as CSS variables</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>

Next, you need to grab the value of the media query you want using the `getComputedStyle` method in conjunction with `getPropertyValue`. Once you have that value, you can then run code that depends on the size of the viewport width.

In the example below, if the viewport width is below 500px and the user clicks on the click link, then a copy called "mobile" appears. If the viewport width is above 500px and the user clicks on the anchor, "desktop" will appear.

<p>
    <p data-height="265" data-theme-id="0" data-slug-hash="MBvJwM" data-default-tab="js,result" data-user="ozywuli" data-pen-title="Reference CSS variables in your JS" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/MBvJwM/">Reference CSS variables in your JS</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>


---

## References

- [https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries)
- [https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)