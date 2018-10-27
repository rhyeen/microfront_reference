# A Microfront Architecture

## TLDR;


### Benefits

* The overhead of including Redux is small. The shared store.js is not much larger (<5kb).
* Use whatever ungreedy (aka, not Angular) Javascript framework/library you like for each component
with a common interface between the components.
* Since the interface is a global store, there are no cyclic dependencies on the Redux reducers.
Component A can talk to Component B using the same protocol whether A is a child of B, a parent of
B, a sibling of B, or nowhere near B.
* All the benefits of Redux:
    * Actions (aka API calls) are the only way to mutate the underlying state.  These actions have
    specified parameters and can verify parameters before updating the state.
    * The underlying state history is preserved and can be monitored/reverted using conventional 
    Redux tools.
    * Redux notifies subscribers to the store of changes to the underyling state, meaning the data
    will always be consisent across all components that bind to it.
    * Redux is performant and works with thousands of actions before slowdown.

### What This Isn't

This method requires that all components much agree upon the shared protocols. Of course, 
unsupported components can either be encapsulated to incude support with a wrapper component, 
converted to adhere to the protocol, or just used as they were designed (with properties, 
attributes, events, etc.).  On the other hand, you shouldn't expect the general community to embrace
these standards when you are publishing an npm package for general use.

This is also not a means to manage conflicting dependencies.  If one component utilizes `foo@v1.0.0`
and another `foo@v2.0.0`, nothing here will help you resolve this.

For this reason, it's best to follow this protocol for sharing components within your own 
team/organization where you can uphold the protocol and manage dependencies cross teams.

### Converting Existing Components (React, specifically)

## @TODO

### React Component
Since I've never personally worked with React enough to understand how to wrap it in a web component
using ES6 standards (rather than the ES5 `require` standards), my efforts have been unfruitful...

I'm not concerned though.  From how it seems React works with Redux, it doesn't seem like there will
not be a conflict with the standards we have here.

1. Get [React Component](comp_react) working with ES6 standards
2. Publish [React Component](comp_react)
3. Pull [React Component](comp_react) into [Root App](root_reference) and update `componentList` to contain the [React Component's Reducer](comp_react/src/reducers/app.js).

### Compatible Store Package
I'd like to create an official very small npm package for the shared store, which will simply be
the [shared store.js file](store/src/store.js), but with an included transpiler for older browsers.
