import * as appActions from '../actions/app.js'
import App from '../components/app.js'

function mapStateToProps(state) {
  const { containers } = state.compReact

  return {
    containers,
    state
  }
}

const mapDispatchToProps = {
  updateAnyLabel: appActions.updateAnyLabel,
  updateLabel: appActions.updateLabel,
}

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
