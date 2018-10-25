import { connect } from 'react-redux'
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
  updateAnyTitle: appActions.updateAnyTitle,
  updateTitle: appActions.updateTitle,
  lock: appActions.lock,
  unlock: appActions.unlock
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
