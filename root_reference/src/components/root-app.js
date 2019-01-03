import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../store.js';

import 'microfront_reference_comp_litelement/src/components/app.js';
import 'microfront_reference_comp_vanilla/src/components/app.js';
import 'microfront_reference_comp_react/src/app.js';
import { compReact_updateLabel } from 'microfront_reference_comp_react/src/actions/app.js';
import { compLitElement_updateLabel } from 'microfront_reference_comp_litelement/src/actions/app.js';
import { compVanilla_updateLabel } from 'microfront_reference_comp_vanilla/src/actions/app.js';
// import '../comp_litelement/src/components/app.js';
// import { compLitElement_updateLabel } from '../comp_litelement/src/actions/app.js';

class RootApp extends connect(store)(LitElement) {
  render() {
    return html`
    <style>
      :host {
        display: block;
        margin: 20px;
        border: 1px solid #D7D7D7;
        background-color: #F9F9F9;
        border-radius: 4px;
        padding: 8px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
      }

      .root-title {
        font-size: 18px;
        font-weight: 300;
        margin-bottom: 8px;
      }

      .root-description {
        font-size: 14px;
        margin-bottom: 8px;
      }

      .root-description,
      .root-code {
        display: ${this._showDetails ? 'block' : 'none'};
      }

      .component-grid {
        display: flex;
        flex-wrap: wrap;
      }

      .root-code {
        background-color: #E8E8E8;
        font-family: "Courier New", Courier, monospace;
        margin-bottom: 24px;
        padding: 10px;
      }
    </style>
    <div class="root-title">ROOT APP</div>
    <button style="margin-bottom: 8px;" @click="${() => this._showDetails = !this._showDetails}">${this._showDetails ? 'Hide Details' : 'Show Details'}</button>
    <div class="root-description">
    <span>This app can be any js app/framework, as long as it:</span>
    <ol>
    <li>imports the shared intrastore</li>
    <li>adds the microfront web components' Redux reducers</li>
    <li>uses the microfront web components</li>
    </ol>
    <span>Here is an example how what that would look like:</span>
    </div>
    <div class="root-code">
    <div class="root-code-line">import { store } from 'intrastore/src/store.js';</div>
    <div class="root-code-line">import { microfrontCompAReducer } from 'microfront_comp_a/reducer.js';</div>
    <div class="root-code-line">import { microfrontCompBReducer } from 'microfront_comp_b/reducer.js';</div>
    <div class="root-code-line">store.addReducers({ microfrontCompAReducer });</div>
    <div class="root-code-line">store.addReducers({ microfrontCompBReducer });</div>
    <div class="root-code-line">...</div>
    <div class="root-code-line">&lt;microfront-comp-a&gt;&lt;/microfront-comp-a&gt;</div>
    <div class="root-code-line">&lt;microfront-comp-b&gt;&lt;/microfront-comp-b&gt;</div>
    <div class="root-code-line">...</div>
    </div>
    <div class="root-description">
    <div>Here are 4 example microfront components. Note that none of the components are aware of the other components on the page.</div>
    <div>Rather, they only know the API (Redux Action function) of the components to update their labels.</div>
    <div>The components are written in the following frameworks (from left to right):</div>
    <ol>
    <li>lit-element</li>
    <li>lit-element (exact same component as first, but showcasing isolated data)</li>
    <li>VanillaJS</li>
    <li>React</li>
    </ol>
    </div>
    <div class="component-grid">
    <comp-lit-element containerId="1" .componentList="${this._componentList}"></comp-lit-element>
    <comp-lit-element containerId="2" .componentList="${this._componentList}"></comp-lit-element>
    <comp-vanilla containerId="1"></comp-vanilla>
    <comp-react containerId="r1"></comp-react>
    </div>
    `;
  }

  static get properties() {
    return {
      _componentList: { type: Array },
      _showDetails: { type: Boolean }
    }
  }

  constructor() {
    super();
    this._componentList = [
      {
        id: '1',
        component: 'compLitElement',
        updateContainerLabel: compLitElement_updateLabel
      },
      {
        id: '2',
        component: 'compLitElement',
        updateContainerLabel: compLitElement_updateLabel
      },
      {
        id: '1',
        component: 'compVanilla',
        updateContainerLabel: compVanilla_updateLabel
      },
      {
        id: 'r1',
        component: 'compReact',
        updateContainerLabel: compReact_updateLabel
      }
    ];
  }

  stateChanged(state) {}
}

window.customElements.define('root-app', RootApp);
