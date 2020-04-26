---
title: PostCSS vs Sass
slug: postcss-vs-sass
date: 2020-03-21
excerpt: Pros and Cons of PostCSS and Sass
---

PostCSS and Sass are both open source tools used to achieve the same goals, which are to make it easier to write and manage CSS. So what's the difference then between the two?

PostCSS is a **postprocessor**. PostCSS extends plain CSS you've already written. For example, with the autoprefixer plugin, you don't have to write any vendor prefixes yourself. Your build tool will automatically add vendor prefixes to any CSS properties that need them.

Sass is a **preprocessor**. You write styles in a CSS-like language called Sass that provides useful non-native CSS features (at least for now) like mixins, loops, and nested definitions. During the build step, Sass is compiled down into plain CSS.

In practice though, there's really not much difference between postprocessing and preprocessing as it pertains to using PostCSS and Sass. In fact, PostCSS has plugins that lets you write plain CSS that looks and functions like Sass, or you can just use Sass and combine it with useful PostCSS plugins like autoprefixer and CSSNano (a CSS minifier).

So why use one or the other? I list the pros and cons below:

## PostCSS

Pros
- Modular and customizable
- Write plugins for features you need
- Large ecosystem of plugins
- Use both the latest and in-development CSS features
- Name sounds cooler

Cons
- You have to assemble the features you need (more work?)
- Plugins can be hit or miss. Risk of becoming unmaintained

## Sass

Pros
- All in one package. No need to piece together or write plugins to get the features you need.

Cons
- Unfamiliar DSL that has diverged from mainline CSS syntax
- Name doesn't sound as cool

## References

[https://www.hongkiat.com/blog/css-post-processors-tips-resources/](https://www.hongkiat.com/blog/css-post-processors-tips-resources/)