import store from '../store.js';

const compVanilla_template = document.createElement('template');
compVanilla_template.innerHTML = `
  <style>
    :host {
      display: block;
      margin: 8px;
      border: 1px solid #D5E5B8;
      background-color: #E1F2C2;
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
  <div class="comp-title">VANILLAJS COMPONENT</div>
  <div class="comp-label">
    <div class="comp-label-title"><slot name="container-label-title">NO TITLE</slot></div>
    <div class="comp-label-value"><slot name="container-label-value" onchange="test()">NO VALUE</slot></div>
  </div>
  <div class="label-edit-grid">
    <slot name="container-inputs">NO INPUTS</slot>
  </div>
`;

class CompVanilla extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(compVanilla_template.content.cloneNode(true));

    this._containerLabelTitleSlot = this.shadowRoot.querySelector('slot[name=container-label-title]');
    this._containerLabelValueSlot = this.shadowRoot.querySelector('slot[name=container-label-value]');
    this._containerInputsSlot = this.shadowRoot.querySelector('slot[name=container-inputs]');

    this._componentList = [
      {
        id: '1',
        component: 'compLitElement',
        updateContainerLabel: 'COMP_LIT_ELEMENT_UPDATE_LABEL'
      },
      {
        id: '2',
        component: 'compLitElement',
        updateContainerLabel: 'COMP_LIT_ELEMENT_UPDATE_LABEL'
      },
      {
        id: '1',
        component: 'compVanilla',
        updateContainerLabel: 'COMP_VANILLA_UPDATE_LABEL'
      },
      {
        id: 'r1',
        component: 'compReact',
        updateContainerLabel: 'COMP_REACT_UPDATE_LABEL'
      }
    ];

    this._render(store.getState());
    this._toObservable(store, this).subscribe({
      onNext(state, caller) { caller._render(state) }
    });
  }

  /**
   * https://github.com/reduxjs/redux/issues/303#issuecomment-125184409
   */
  _toObservable(store, caller) {
    return {
      subscribe({ onNext }) {
        let dispose = store.subscribe(() => onNext(store.getState(), caller));
        onNext(store.getState(), caller);
        return { dispose };
      }
    }
  }

  _render(state) {
    this._container = state.compVanilla.containers[this.getAttribute('containerId')];
    this._setLabelTitle();
    this._setAllComponentContainers(state);
    this._setSlots();
  }
  
  _setAllComponentContainers(state) {
    this._componentContainers = this._componentList.map((comp) => {
      if (!(comp.component in state)) {
        return {
          ...comp,
          label: 'NA'
        };
      }
      return {
        ...comp,
        label: state[comp.component].containers[comp.id].label
      };
    });
  }

  _setSlots() {
    this._removeInputsFromSlot();
    this._containerLabelValueSlot.innerHTML = this._container.label;
    this._componentContainers.forEach((comp) => {
      let containerLabel = document.createElement('label');
      containerLabel.innerHTML = `${comp.component}.${comp.id}.label: `;
      let containerInput = document.createElement('input');
      containerInput.value = comp.label;
      containerInput.id = comp.id + '___' + comp.component + '___' + comp.updateContainerLabel;
      containerInput.onchange = this._updateLabel;
      containerInput.addEventListener('change', this._updateLabel);
      this._containerInputsSlot.appendChild(containerLabel);
      this._containerInputsSlot.appendChild(containerInput);
      this._containerInputsSlot.appendChild(document.createElement('br'));
    });
  }

  _setLabelTitle() {
    this._containerLabelTitleSlot.innerHTML = `compLitElement.${this.getAttribute('containerId')}.label: `;
  }

  _updateLabel(event) {
    const value = event.target.value;
    const id = event.target.id;
    const splitId = id.split('___');
    const containerId = splitId[0];
    const updateContainerLabel = splitId[2];
    store.dispatch({ type: updateContainerLabel, id: containerId, label: value });
  }

  _removeInputsFromSlot() {
    while (this._containerInputsSlot.firstChild) {
      this._containerInputsSlot.firstChild.removeEventListener('change', this._updateLabel);
      this._containerInputsSlot.removeChild(this._containerInputsSlot.firstChild);
    }
  }

  /**
   * `connectedCallback()` fires when the element is inserted into the DOM.
   * It's a good place to set the initial attributes, internal state,
   * and install event listeners.
   */
  connectedCallback() {
    // Shim Shadow DOM styles. This needs to be run in `connectedCallback()`
    // because if you shim Custom Properties (CSS variables) the element
    // will need access to its parent node.
    // ShadyCSS.styleElement(this);

    // A user may set a property on an _instance_ of an element,
    // before its prototype has been connected to this class.
    // The `_upgradeProperty()` method will check for any instance properties
    // and run them through the proper class setters.
    // See the [lazy properites](/web/fundamentals/architecture/building-components/best-practices#lazy-properties)
    // section for more details.
    this._upgradeProperty('containerId');
    this._upgradeProperty('componentList');
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  /**
   * `disconnectedCallback()` fires when the element is removed from the DOM.
   * It's a good place to do clean up work like releasing references and
   * removing event listeners.
   */
  disconnectedCallback() {
    
  }

  /**
   * Properties and their corresponding attributes should mirror one another.
   * For example, a property setter for `pressed` handles truthy/falsy values and
   * reflects those to the state of the attribute. See the [avoid
   * reentrancy](/web/fundamentals/architecture/building-components/best-practices#avoid-reentrancy)
   * section for more details.
   */
  set containerId(value) {
    const containerId = String(value);
    if (containerId)
      this.setAttribute('containerId', containerId);
    else
      this.removeAttribute('containerId');
  }

  get containerId() {
    return this.hasAttribute('containerId');
  }
}
window.customElements.define('comp-vanilla', CompVanilla);