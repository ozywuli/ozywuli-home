---
title: Intro to Ember Computed Properties
slug: intro-to-ember-computed-properties
date: 2020-02-16
excerpt: Learn about Ember's computed properties
---

A computed property is a function declared as a property on an Ember object. When you pass in one or more properties as its arguments, the computed property will transforms those properties into a new value.

```
import { computed } from '@ember/object';

weightInPounds: 170,
weightInKilograms: computed('weightInPounds', function() {
	return this.get('weightInPounds') / 2.205;
}),
```

Computed properties should be "pure", that is, whenever you pass in the same arguments, the computed function should return the same result with no side effects.

```js
import { computed } from '@ember/object';

// The `archivedPosts` computed property triggers a side-effect by making a network request and returning a promise. Once the promise is fulfilled, it'll populate the `posts` property array with the expected or unexpected values. But this is considered a "side-effect" and not idempotent and "pure".
archivedPosts: computed('posts', function() {
	return this.get('posts').then(posts => posts.filterBy('archived'));
}),
```

## Octane and Ember 3.15+

Beginning with the introduction of Octane in Ember 3.15, you should avoid using computed properties. Instead use `@tracked` and getters.

The Octane equivalent using `@tracked` and getters of the weight conversion example would be this:
```js
import { tracked } from '@glimmer/tracking';

@tracked weightInPounds = 170;
get weightInKilograms() {
	return this.weightInPounds / 2.205;
}
```

There is a computed decorator if you miss the computed keyword, but this is not the recommended solution.

```js
import { computed } from '@ember/object';
weightInPounds = 170;

@computed('weightInPounds')
get weightInKilograms() {
	return this.weightInPounds / 2.205;
}
```

## References

- [https://guides.emberjs.com/v3.3.0/object-model/computed-properties/](https://guides.emberjs.com/v3.3.0/object-model/computed-properties/)
- [https://ember-learn.github.io/ember-octane-vs-classic-cheat-sheet/](https://ember-learn.github.io/ember-octane-vs-classic-cheat-sheet/)
- [https://spin.atomicobject.com/2017/04/26/ember-pure-computed-properties/](https://spin.atomicobject.com/2017/04/26/ember-pure-computed-properties/)
- [https://emberigniter.com/guide-promises-computed-properties/](https://emberigniter.com/guide-promises-computed-properties/)