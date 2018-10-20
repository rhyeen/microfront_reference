const compVanilla_template = document.createElement('template');
compVanilla_template.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>
  <div><slot name="container-title">NO TITLE</slot></div>
  <slot name="container-inputs">NO INPUTS</slot>
`;

// ShadyCSS will rename classes as needed to ensure style scoping.
// ShadyCSS.prepareTemplate(compVanilla_template, 'comp-vanilla');

class CompVanilla extends HTMLElement {
  constructor() {
    super();
    this._onSlotChange = this._onSlotChange.bind(this);

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(compVanilla_template.content.cloneNode(true));

    this._containerTitleSlot = this.shadowRoot.querySelector('slot[name=container-title]');
    this._containerInputsSlot = this.shadowRoot.querySelector('slot[name=container-inputs]');

    this._containerTitleSlot.addEventListener('slotchange', this._onSlotChange);
    this._containerInputsSlot.addEventListener('slotchange', this._onSlotChange);
  }

  /**
   * `_onSlotChange()` is called whenever an element is added or removed from
   * one of the shadow DOM slots.
   */
  _onSlotChange() {
    // this._linkPanels();
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

  /**
   * `attributeChangedCallback()` is called when any of the attributes in the
   * `observedAttributes` array are changed. It's a good place to handle
   * side effects, like setting internal attributes.
   */
  attributeChangedCallback(name, oldValue, newValue) {

  }
}
window.customElements.define('comp-vanilla', CompVanilla);