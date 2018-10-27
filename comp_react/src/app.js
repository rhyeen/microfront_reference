import App from './containers/app.js'
import store from './store.js'

class CompReactApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      'Provider',
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
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    const containerId = this.getAttribute('containerId')

    ReactDOM.render(
      React.createElement(CompReactApp, { containerId: containerId }),
      mountPoint
    );
  }
}

customElements.define('comp-react', CompReact);