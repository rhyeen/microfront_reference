import store from '../store.js';

const compVanilla_template = document.createElement('template');
compVanilla_template.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>
  <div><slot name="container-title" onchange="test()">NO TITLE</slot></div>
  <slot name="container-inputs">NO INPUTS</slot>
`;

class CompVanilla extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(compVanilla_template.content.cloneNode(true));

    this._containerTitleSlot = this.shadowRoot.querySelector('slot[name=container-title]');
    this._containerInputsSlot = this.shadowRoot.querySelector('slot[name=container-inputs]');

    this._componentList = [
      {
        id: '1',
        component: 'comp1',
        updateContainerTitle: 'COMP_1_UPDATE_TITLE'
      },
      {
        id: '2',
        component: 'comp1',
        updateContainerTitle: 'COMP_1_UPDATE_TITLE'
      },
      {
        id: '1',
        component: 'comp2',
        updateContainerTitle: 'COMP_2_UPDATE_TITLE'
      },
      {
        id: '5',
        component: 'compVanilla',
        updateContainerTitle: 'COMP_VANILLA_UPDATE_TITLE'
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
    this._isLocked = state.compVanilla.locked;
    this._setAllComponentContainers(state);
    this._setSlots();
  }
  
  _setAllComponentContainers(state) {
    this._componentContainers = this._componentList.map((comp) => {
      if (!(comp.component in state)) {
        return {
          ...comp,
          title: 'NA'
        };
      }
      return {
        ...comp,
        title: state[comp.component].containers[comp.id].title
      };
    });
  }

  _setSlots() {
    this._removeInputsFromSlot();
    this._containerTitleSlot.innerHTML = this._container.title;
    this._componentContainers.forEach((comp) => {
      let containerInput = document.createElement('input');
      containerInput.value = comp.title;
      containerInput.id = comp.id + '___' + comp.component + '___' + comp.updateContainerTitle;
      containerInput.onchange = this._updateTitle;
      containerInput.addEventListener('change', this._updateTitle);
      this._containerInputsSlot.appendChild(containerInput);
    });
  }

  _updateTitle(event) {
    const value = event.target.value;
    const id = event.target.id;
    const splitId = id.split('___');
    const containerId = splitId[0];
    const updateContainerTitle = splitId[2];
    store.dispatch({ type: updateContainerTitle, id: containerId, title: value });
  }

  _removeInputsFromSlot() {
    while (this._containerInputsSlot.firstChild) {
      this._containerInputsSlot.firstChild.removeEventListener('change', this._updateTitle);
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