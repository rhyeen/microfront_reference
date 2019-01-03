import App from './containers/app.js'
import store from './store.js'
import retargetEvents from './retarget-events-fix';

class CompReactApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      ReactRedux.Provider,
      { store: store },
      React.createElement(
        App, { containerId: this.props.containerId }
      )
    );
  }
}


class CompReact extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    const hostStyling = document.createElement('style');
    hostStyling.innerHTML = `
      :host {
        display: block;
        margin: 8px;
        border: 1px solid #C8E0DF;
        background-color: #D3EDEB;
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
    `;
    const shadowRoot = this.createShadowRoot();
    shadowRoot.appendChild(mountPoint);
    shadowRoot.appendChild(hostStyling);
    retargetEvents(shadowRoot);
    const containerId = this.getAttribute('containerId')
    
    ReactDOM.render(
      React.createElement(CompReactApp, { containerId: containerId }),
      mountPoint
      );
  }
}

customElements.define('comp-react', CompReact);