# A Microfront Architecture

## TLDR; The Microfront API standards

To fulfill this API standard, you'll need the following frontend app structure:

* **A single root app:** a root app that has little-to-no UI presentation, but
simply handles routing, importing, and injecting the appropriate base microfront components.
* **Microfront components:** for any component that needs to coordinate with other components that are not directly related in the DOM tree to follow the Microfront API standard.
* **Other components:** other components can also be utilized that don't follow the Microfront API standard, but they shouldn't be interacting with other components directly other than their parent component. This is typically reserved for simple components, such as buttons, dropdowns, banners, etc.

For every codebase shared in the same root app (including microfront components, the root app, and all other components), it must meet the following requirements:

* Be considerate of CSS namespacing. We recommend wrapping the outermost component in a web component to isolate the CSS by declaring all selectors relative to the `:root` selector of the custom element for the web component.  A lot of frameworks provide this functionality for you already. Alternatively,
prepend your CSS selectors with a namespace of your codebase name or another unique name.
* Be considerate of global event namespacing. For any event that can be listened to globaly, prepend the event with a namespace of your codebase name or another unique name.
* Be considerate of global variable namespacing. Instead of global javascript variables, we recommend using the
ES6 standard of importing/exporting Javascript modules.  Alternatively,
prepend your global variables with a namespace of your codebase name or another unique name.
* The Redux state that is connected to the root app is reserved for this Microfront API standard.
* Ensure shared dependencies share the same version.  For example, if your organization typically uses React, make sure all teams that will share frontend code use the same version of React. If a shared codebase has a different version, it will need to include them in the built code as an isolated
dependency.

The root app must meet the following requirements:

* It must connect to a shared Redux state. We recommend using our `microfront_store` npm package for this.
* It must import and inject other components.
* It must combine the reducers of all injected microfront components on the shared Redux state.

For every microfront component (aka a component that wants utilize this API standard), it must meet the following requirements:

* Encapsulate the component in a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
* This outer web component needs to connect to the shared Redux state via a Javascript module import of the shared Redux state's npm package.  This shared state must conform to the format of:
``` json
state = {
    "<NPM PACKAGE NAME>": {...},
    ...
}
```
where `<NPM PACKAGE NAME>` is a unique key specific to each microfront component.  All state of this microfront should be within its own `<NPM PACKAGE NAME>` object.
* It should export Javascript modules for the Redux Actions that can be applied on its own part of
the shared state.
* For simple interactions directly with its parent element, it should use props/attributes.
* For complex interaction with other microfront components, it should call that component's Redux Actions to update the state, or `getState()` of that component's shared state to retrieve the underlying data.

## Background to Microfronts

You have an frontend web app.  It's big and complex and built by one team at your organization.  Another team has a component that you want to inject in your app.  Trouble is, this team's component
is not written in your app's framework nor according to your apps standards.  

What to do?

You could take a lesson about shared services from backend the backend architectural practice of microservices.

### Lessons learned from Microservices

Microservices have long been a proven solution for backend web systems.  Microservices encourage
maintainable code by factoring code into simple decoupled chunks with strong APIs.  With a common
API protocol, such as REST over HTTP, its easy for teams across a company to integrate services
without worrying about deployment, coupled side effects, and refactoring in an existing monolithic
codebase.

### Difficulties for Frontend Microservices

Unfortunately, the web frontend has not seen the same advantages of microservices as the backend.
This is even more interesting given that all web frontend is written in the common language of 
javascript. Frameworks such as Angular almost enforce that all integrated components follow the
Angular framework, making it very difficult to migrate away once the frameworks become stale (e.g.
AngularJS).

Other practices, such as React, Polymer, and Vue.js have all strived to act more like libraries:
supporting a particular component but not enforcing their standards across the entire web app.
However, since none of these libraries have solved cross-component communication –other than with
components that share the same library– developers tend to stick to a standard (probably React) 
for all components across all teams in an organization.

What missing is an easy, performant, and powerful way for many components, written in entirely 
different standards, to communicate with each other.  

### Existing partial solutions

There are possible solutions.  The [Micro-Frontends website](https://micro-frontends.org/) has 
explored this idea, and has suggested "[Favoring] Native Browser Features over Custom APIs".  This 
means utilizing Javascript events and the parent-child relationship of element attributes and 
properties. This standard works well enough for components that embrace that parent-
child relationship, especially simple-task child components such as a custom button or dropdown
element.  However, this is insignicant for communication across components that are not aware of 
their relationship to other components in the DOM tree (or that don't care about the presentation of 
another component, but rather the data that is possibly associated with other components) or that are 
more complex than what simple property/event bindings would permit.

### Expectations of a full solution

What would be desired is a simple protocol that when followed would allow any component to
call an API that could modify relevant data.  Then any component that presents its state based
on that data could know of the modifications and update its rendering.  Additionally, a component
should not be able to directly alter that data, but rather would need to call appropriate APIs
to do so, thus preventing unexpected side effects when managing its own state.

## Proposal

We propose this may be achieved under some basic assumptions:
1. Components should be encaspulated in a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
2. Redux is centric to the API.  All components that want to utilize the API will need to utilize 
Redux.
3. A shared Redux store across all components utilizing the API will ensure any component may
make any available API call.
4. The state of the Redux store **must** conform to the presented standard.  If a single component
does not conform, the whole system becomes vulnerable.  Fortunately, any component that doesn't
want to conform may still utilize Redux fully as long as they use a separate store.

### Requirement 1: Components should be Web Components

Any component that is considered a Microfront should be encapsulated in a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components#Custom_elements).  If your
component utilizes lit-html, Polymer, or VanillaJS, this should be as simple as following the
web component standards, and may already be part of your componetization process.  If you're using
React, this requires a bit more work since React is generally injected on a root element of the page.

There are two caveats to this requirement.  First, not all components needs to be encapsulated in a custom element.  You may develop a complex React "component" that has many child components and this
outer component is meant to behave like a widget on a page.  Only the outer component needs to be a 
web component so that it can be easily shared with other teams or in other projects that want to 
utilize that component.  Generally, at least each front-end repo of a module should be its own web
 component.

Second, not all web components need to meet these requirments.  We encourage more simple components
simply utilize attributes, properties, and events, as is encouraged for typical web components.
Generally, if a web component has a direct relationship with its parent entity and/or it can be
easily managed through attributes, properties, and events, it doesn't need to follow these practices.
Redux can handle a lot of actions and a complex state very efficiently, but keeping trivial behavior
off of the Redux store will help longterm with very large projects.

### Requirement 2: Redux as the API

We assume you are already aware of the benefits of Redux.  If not, you should familiarize yourself
with this small but powerful library.  Redux can be included in almost any Frontend standard.
If long as the Microfront components include Redux and do not directly control the DOM (looking
at you Angular...), you'll likely be able to use that library/framework/standard.

### Requirement 3: Global Redux Store

Generally, standards like React that utilize Redux already have a single root Redux store.  However,
this is typically because something like React acts like a web app more than a single component on
a page.  Luckily, since most of these standards already treat Redux as a single global store, it
isn't difficult to enforce that even when the scope is limited to a single component.

The easiest way to achieve this is to utilize a very small shared npm package used for generating
and exporting that store.  Since the store is an exported object, whenever a component imports
the store module, it behaves as a singleton and will share the store state for all the Microfront
components that utilize it.

We developed a very small npm package for doing just that.  Feel free to import it into your own
projects.

### Requirement 4: Store state conforms to a standard

This is the part that the most subjective.  Although an agreed upon store state is required since
the store state is shared across all components, what that state format looks like is up for debate.
We've chosen the following practice, and we encourage you do adhere to it or pick one that works
for your own organization.  Whatever you decide, you must be willing to let this standard remain
unchanged for the foreseeable lifecycle of your product.  Our suggested standard for the shared
Redux state looks like this:

``` json
state = {
    "<NPM PACKAGE NAME>": {...},
    ...
}
```

Where `<NPM PACKAGE NAME>` is the unique name of the component that owns that particular part of
the state.  Even if a component is not explicitely an npm package, thinking of it such will ensure
the state key is unique and recognizable.

That is all that is needed on the state to ensure these standards are met.  However, we do suggest
how to compose the inners of this object to make your Microfront component more conveniant to use
and easier to maintain (See **#Advanced Redux State Suggestions** for more details).

## Benefits of this standard

* The overhead of including Redux is small. The shared store.js is not much larger (<5kb).
* Use whatever ungreedy (aka, not Angular) Javascript framework/library you like for each component
with a common interface between the components. We personally recommend one of the following 
standards for your components (you may choose different standards for each component):
    * lit-html + lit-element
    * VanillaJS + Web Components
    * React wrapped in a Web Component
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

## What This Isn't

This method requires that all components much agree upon the shared protocols. Of course, 
unsupported components can either be encapsulated to incude support with a wrapper component, 
converted to adhere to the protocol, or just used as they were designed (with properties, 
attributes, events, etc.).  On the other hand, you shouldn't expect the general community to embrace
these standards when you are publishing an npm package for general use.

This is also not a means to manage conflicting dependencies.  If one component utilizes `foo@v1.0.0`
and another `foo@v2.0.0`, nothing here will help you resolve this.

For this reason, it's best to follow this protocol for sharing components within your own 
team/organization where you can uphold the protocol and manage dependencies cross teams.

## Advanced Redux State Suggestions

### Advanced API standards

If you'd like to ensure your web component can handle many possible cases, such as being utilized
several times within the root app and each instance requires its own state.  We recommend the 
following additions to the API. Note that each Microfront component can choose to follow these
standards or not and does not require all components in the root app to conform.

``` json
state = {
    "<NPM PACKAGE NAME>": {
        "instances": {...},
        "named": {...},
        "all": {...}
    },
    ...
}
```

Where `<NPM PACKAGE NAME>` is the unique name of the component that owns that particular part of
the state.  Even if a component is not explicitely an npm package, thinking of it such will ensure
the state key is unique and recognizable.

#### instances

`instances` is an object that contains unique key/object pairs for each inserted instance of the 
component in the UI.

``` json
...
"<NPM PACKAGE NAME>": {
    "instances": {
        "<CONTAINER KEY>": {...},
        ...
    },
    "named": {...},
    "all": {...}
},
...
```

For example, if the component was a dropdown menu, there may be 4 places in the current DOM that 
utilize this component.  In this case, there would be 4 key/object pairs in `instances`, all with a 
unique `<CONTAINER KEY>` values.

These values can be randomly generated, assigned by a parent component, or assigned from an HTTP 
backend call.  For anything but the latter, we recommend using something like our `keyFactory`
factory that is exposed in our suggested shared Redux store.

#### <CONTAINER KEY>, named, and all

At this point, you can utilize the Redux state as you normally would inside `<CONTAINER KEY>` 
for a set of common reducers.
This should include the data that should update components states that present on it.

We personally recommend following Redux's article on [Normalizing State Shape](https://redux.js.org/recipes/structuringreducers/normalizingstateshape) for this part of the state.

`all` is similar, except state should be kept on here based on data that should impact
all instantiations of the component.

#### named

`named` is reserved for instantiated instances of a component that may be categorized and thus
share part of a state with similar instances:

``` json
...
"named": {
    "<UNIQUE NAME>": {...},
    ...
},
...
```

For example, a custom button component may disable a set of the buttons on the page while an
API request is being handled.  One could iterate over all such buttons and disable their individual
`instances[<CONTAINER KEY>]` state, or just update the `"named": { "lockedOnRequest": { "disabled": true }}` and rely on the components with the appropriate attributes to know to bind to this state.

#### Example

Let's suppose we have two Microfront components: one is a custom button (`customButton`), 
the other is a card for selecting a a particular hotel reservation (`hotelReservationCard`).  
The root app would pull down the list of possible reservations from the back-end, and create N 
`hotelReservationCard` components, calling the `keyFactory` per component and passing the key
as an attribute to each instance.

Each `hotelReservationCard` instance in turn uses its own `customButton`. The `hotelReservationCard`
will use its own key as the shared key for the `customButton`. Alternatively, it could have
generated unique keys using the `keyFactory`.

The resulting state may look something like this:

``` json
state = {
    "customButton": {
        "instances": {
            "123456tfb": {},
            "13e23dsfe": {
                "label": "Best Deal",
            },
            "ry455refx": {}
        },
        "named": {
            "lockedOnRequest": {
                "disabled": false
            }
        },
        "all": {
            "mobileScreen": true,
            "defaultLabel": "Reserve Now"
        }
    },
    "hotelReservationCard": {
        "instances": {
            "123456tfb": {
                "reservationDatetime": "2019-02-01T12:23:45.000Z",
                "hotel": "Marriot",
                "cost": 145.21
            },
            "13e23dsfe": {
                "reservationDatetime": "2019-02-01T00:00:00.000Z",
                "hotel": "Hilton",
                "cost": 129.99
            },
            "ry455refx": {
                "reservationDatetime": "2019-02-01T05:30:00.000Z",
                "hotel": "Marriot",
                "cost": 156.00
            }
        },
        "named": {},
        "all": {}
    }
}
```

#### Final Considerations

Finally, just like any API contract, this is the point of interfacing and coupling. Ensure the state
is well defined and structured.  We close this section with the following two additional
recommendations:

##### Private/Isolated State

Perhaps one of your microfront components is a complex component that has several subcomponents that use Redux to coordinate with eachother but not necessary external components. If a component has internal state that isn't part of its API, the Redux documentation [suggests having each subcomponent (subapp) have its own store](https://redux.js.org/recipes/isolatingsubapps). **For the microfront architecture, this is a bad idea**.

Components cannot easily connect to multiple Redux states, meaning your microfront component would probably need to choose to either connect to the API state or the internal state.  You could build a wrapper component for connecting to the API state, and pass that data as props to the component that 
connects to the internal state, but that's quite messy.

You also lose a lot of benefits of Redux when having multiple states:
* [Redux official FAQ: ​Can or should I create multiple stores](https://redux.js.org/faq/storesetup#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself)
* [Stack Overflow: Redux - multiple stores, why not?](https://stackoverflow.com/a/33633850/6090140)


Instead, when utilizing the state data inside `instances[<CONTAINER KEY>]`, `named[<UNIQUE NAME>]`, and 
`all` and the data is not intended to be retrieved outside of the component, we recommend wrapping 
that data in an object titled `private` (e.g. `"instances": { "1345rdq23": { "private": { "openModal": true }}}`).  The properties of `private` are assumed to be mutated without breaking the API.

##### Parameter validity within Actions

When creating the Redux Actions that will update the state, be mindful of the given Actions and
the validity of its parameters. The Actions are just as part of the API as the Store state.  The
reason we don't dive into recommended practices for Actions is that the standards that Redux already
expresses for Actions is sufficient.

## Converting Existing Components (React, specifically)

@TODO

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

#### Consider migrating away from store away from Redux-Thunk and onto Redux-Saga

Saga seems to be the better way to go, especially for complex apps, which is the whole point of
building out microfronts.