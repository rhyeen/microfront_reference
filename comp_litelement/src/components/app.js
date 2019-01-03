import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../store.js';

class CompLitElement extends connect(store)(LitElement) {
  render() {
    return html`
    <style>
      :host {
        display: block;
        margin: 8px;
        border: 1px solid #D4D5E3;
        background-color: #E0E1F0;
        border-radius: 4px;
        padding: 8px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
        width: 400px;
      }

      .comp-title {
        font-size: 18px;
        font-weight: 300;
        margin-bottom: 8px;
      }

      .comp-label {
        margin-bottom: 24px;
        font-family: "Courier New", Courier, monospace;
        color: #2E393F;
      }

      .comp-label-title { 
        font-weight: 700;
      }

      .comp-label-value { 
        font-weight: 700;
        color: #737373;
        background-color: white;
        padding: 2px 8px;
        border-radius: 4px;
      }

      .label-edit-grid label {
        font-size: 14px;
      }

      .label-edit-grid input {
        font-size: 14px;
        margin-bottom: 8px;
      }
    </style>
    <div class="comp-title">LIT-ELEMENT COMPONENT</div>
    <div class="comp-label">
      <div class="comp-label-title">compLitElement.${this.containerId}.label: </div>
      <div class="comp-label-value">${this._container.label}</div>
    </div>
    <div class="label-edit-grid">
      ${this._componentContainers.map((compContainer) => { return this._getComponentControls(compContainer)})}
    </div>
    `;
  }

  static get properties() {
    return {
      containerId: { type: String },
      componentList: { type: Array },
      _container: { type: Object },
      _componentContainers: { type: Array },
    }
  }

  _getComponentControls(container) {
    return html`
      <label>${container.component}.${container.id}.label: </label><input .value=${container.label} @input=${(e) => this._updateContainerLabel(container, e.currentTarget.value)}>
      <br>
    `
  }

  stateChanged(state) {
    this._container = state.compLitElement.containers[this.containerId]
    this._setAllComponentContainers(state)
  }

  _setAllComponentContainers(state) {
    this._componentContainers = this.componentList.map((comp) => {
      return {
        ...comp,
        label: state[comp.component].containers[comp.id].label
      }
    })
  }

  _updateContainerLabel(container, newLabel) {
    store.dispatch(container.updateContainerLabel(container.id, newLabel))
  }
}

window.customElements.define('comp-lit-element', CompLitElement);
