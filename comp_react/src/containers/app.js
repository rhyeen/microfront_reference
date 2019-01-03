import * as appActions from '../actions/app.js'
import App from '../components/app.js'

function mapStateToProps(state) {
  const { containers, locked } = state.compReact

  return {
    containers,
    locked,
    state
  }
}

const mapDispatchToProps = {
  updateAnyLabel: appActions.updateAnyLabel,
  updateLabel: appActions.updateLabel,
  lock: appActions.lock,
  unlock: appActions.unlock
}

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
