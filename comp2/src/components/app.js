import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../store.js';

import { SharedStyles } from './shared-styles.js';

class CompTwoApp extends connect(store)(LitElement) {
  render() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
      }
    </style>

    <div>${this._container.title} :: ${this._isLockedHtml()}</div>
    ${this._componentContainers.map((compContainer) => { return this._getComponentControls(compContainer)})}   
    `;
  }

  static get properties() {
    return {
      containerId: { type: String },
      componentList: { type: Array },
      _container: { type: Object },
      _componentContainers: { type: Array },
      _isLocked: { type: Boolean }
    }
  }

  _isLockedHtml() {
    return this._isLocked ? html`LOCKED` : html`UNLOCKED`
  }

  _getComponentControls(container) {
    return html`
      <input .value=${container.title} @input=${(e) => this._updateContainerTitle(container, e.currentTarget.value)}>
    `
  }

  stateChanged(state) {
    this._container = state.comp2.containers[this.containerId]
    this._isLocked = state.comp2.locked
    this._setAllComponentContainers(state)
  }

  _setAllComponentContainers(state) {
    this._componentContainers = this.componentList.map((comp) => {
      return {
        ...comp,
        title: state[comp.component].containers[comp.id].title
      }
    })
  }

  _updateContainerTitle(container, newTitle) {
    store.dispatch(container.updateContainerTitle(container.id, newTitle))
  }
}

window.customElements.define('comp-two-app', CompTwoApp);
