/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(
  state => state,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk))
);

export const keyFactory = {
  containerIds: {},
  storePreexistingKeys: (containerId, container) => {
    _storeKeys(containerId, Object.keys(container))
  },
  getUniqueKey: (containerId) => {
    this._initializeContainer(containerId)
    let key = null
    while (!this._isUnique(key)) {
      key = '_' + Math.random().toString(36).substr(2, 9);
    }
    this._storeKey(containerId, key)
    return key
  },
  removeKey: (containerId, key) => {
    this._initializeContainer(containerId)
    this.containerIds[containerId].remove(key)
  },
  clear: (containerId) => {
    this._initializeContainer(containerId)
    this.containerIds[containerId].clear()
  },
  _storeKeys: (containerId, keys) => {
    this._initializeContainer(containerId)
    for (key of keys) {
      this._storeKey(containerId, key)
    }
  },
  _storeKey: (containerId, key) => {
    this.containerIds[containerId].add(key)
  },
  _isUnique: (containerId, key) => {
    return !!key && this.containerIds[containerId].has(key)
  },
  _initializeContainer: (containerId) => {
    if (!this.containerIds[containerId]) {
      this.containerIds[containerId] = new Set()
    }
  }
};