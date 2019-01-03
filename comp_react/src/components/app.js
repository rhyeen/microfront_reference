// import React, { Component } from 'react'

class App extends React.Component {
  handleInputUpdate(event) {
    const value = event.target.value
    const id = event.target.id
    const splitId = id.split('___')
    const containerId = splitId[0]
    const updateContainerLabel = splitId[2]
    this.props.updateAnyLabel(updateContainerLabel, containerId, value)
  }

  render() {
    let { containers, locked, state, containerId } = this.props

    let isLockedString = locked ? 'LOCKED' : 'UNLOCKED'

    let containerLabel = containers[containerId].title

    let componentList = [
      {
        id: '1',
        component: 'comp1',
        updateContainerLabel: 'COMP_1_UPDATE_LABEL'
      },
      {
        id: '2',
        component: 'comp1',
        updateContainerLabel: 'COMP_1_UPDATE_LABEL'
      },
      {
        id: '1',
        component: 'comp2',
        updateContainerLabel: 'COMP_2_UPDATE_LABEL'
      },
      {
        id: '5',
        component: 'compVanilla',
        updateContainerLabel: 'COMP_VANILLA_UPDATE_LABEL'
      },
      {
        id: 'r1',
        component: 'compReact',
        updateContainerLabel: 'COMP_REACT_UPDATE_LABEL'
      }
    ];

    let componentContainers = componentList.map(comp => {
      if (!(comp.component in state)) {
        return {
          ...comp,
          title: 'NA'
        };
      }
      return {
        ...comp,
        title: state[comp.component].containers[comp.id].title
      }
    })

    let componentControls = componentContainers.map(container => {
      let keyValue = container.id + '___' + container.component + '___' + container.updateContainerLabel;
      return React.createElement(
        'input',
        {
          value: container.title,
          onChange: this.handleInputUpdate.bind(this),
          key: keyValue,
          id: keyValue
        }
      )
    })

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        null,
        `${containerLabel} :: ${isLockedString}`
      ),
      componentControls
    )
  }
}

export default App
