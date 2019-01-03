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
    const shadowRoot = this.createShadowRoot();
    shadowRoot.appendChild(mountPoint);
    retargetEvents(shadowRoot);
    const containerId = this.getAttribute('containerId')
    
    ReactDOM.render(
      React.createElement(CompReactApp, { containerId: containerId }),
      mountPoint
      );
  }
}

customElements.define('comp-react', CompReact);