// import React, { Component } from 'react'

class App extends React.Component {
  handleInputUpdate(event) {
    const value = event.currentTarget.value
    const id = event.currentTarget.id
    const splitId = id.split('___')
    const containerId = splitId[0]
    const updateContainerTitle = splitId[2]
    this.props.updateAnyTitle(updateContainerTitle, containerId, value)
  }

  render() {
    let { containers, locked, state, containerId } = this.props

    let isLockedString = locked ? 'LOCKED' : 'UNLOCKED'

    let containerTitle = containers[containerId].title

    let componentList = [
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
      },
      {
        id: 'r1',
        component: 'compReact',
        updateContainerTitle: 'COMP_REACT_UPDATE_TITLE'
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
      let keyValue = container.id + '___' + container.component + '___' + container.updateContainerTitle;
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
        `${containerTitle} :: ${isLockedString}`
      ),
      componentControls
    )
  }
}

export default App
