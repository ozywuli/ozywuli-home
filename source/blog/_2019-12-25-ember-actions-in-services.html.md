---
title: "Ember: How to use services to share actions"
slug: ember-services-actions
date: 2019-12-25
excerpt: Ember Action Services
---

Ember by expects actions to be defined either in the controller (when actions are referenced in route templates) or in the component js file (when actions are referenced in the component template). In Ember there are multiple ways to define an action and share it between multiple controllers or components, but this article will show you how to define a service action that's easily accessible in both controllers and components.

```js
let x = 3;
```