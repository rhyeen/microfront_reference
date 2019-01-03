import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../store.js';

import { SharedStyles } from './shared-styles.js';

import 'microfront_reference_comp1/src/components/app.js';
import 'microfront_reference_comp2/src/components/app.js';
import 'microfront_reference_comp_vanilla/src/components/app.js';
import 'microfront_reference_comp_react/src/app.js';
import { comp1_updateTitle } from 'microfront_reference_comp1/src/actions/app.js';
import { comp2_updateTitle } from 'microfront_reference_comp2/src/actions/app.js';
import { compVanilla_updateTitle } from 'microfront_reference_comp_vanilla/src/actions/app.js';
import { compReact_updateTitle } from 'microfront_reference_comp_react/src/actions/app.js';

class RootApp extends connect(store)(LitElement) {
  render() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
      }
    </style>

    <div>THIS IS A TEST</div>
    <comp-one-app containerId="1" .componentList="${this._componentList}"></comp-one-app>
    <comp-one-app containerId="2" .componentList="${this._componentList}"></comp-one-app>
    <comp-two-app containerId="1" .componentList="${this._componentList}"></comp-two-app>
    <comp-react containerId="r1"></comp-react>
    <comp-vanilla containerId="5"></comp-vanilla>
    `;
  }

  static get properties() {
    return {
      _componentList: { type: Array }
    }
  }

  constructor() {
    super();
    this._componentList = [
      {
        id: '1',
        component: 'comp1',
        updateContainerTitle: comp1_updateTitle
      },
      {
        id: '2',
        component: 'comp1',
        updateContainerTitle: comp1_updateTitle
      },
      {
        id: '1',
        component: 'comp2',
        updateContainerTitle: comp2_updateTitle
      },
      {
        id: '5',
        component: 'compVanilla',
        updateContainerTitle: compVanilla_updateTitle
      },
      {
        id: 'r1',
        component: 'compReact',
        updateContainerTitle: compReact_updateTitle
      }
    ];
  }

  stateChanged(state) {
    
  }
}

window.customElements.define('root-app', RootApp);
