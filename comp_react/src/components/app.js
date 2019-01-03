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
    let { containers, state, containerId } = this.props

    let containerLabel = containers[containerId].label

    let componentList = [
      {
        id: '1',
        component: 'compLitElement',
        updateContainerLabel: 'COMP_LIT_ELEMENT_UPDATE_LABEL'
      },
      {
        id: '2',
        component: 'compLitElement',
        updateContainerLabel: 'COMP_LIT_ELEMENT_UPDATE_LABEL'
      },
      {
        id: '1',
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
          label: 'NA'
        };
      }
      return {
        ...comp,
        label: state[comp.component].containers[comp.id].label
      }
    })

    let componentControls = componentContainers.map(container => {
      let keyValue = container.id + '___' + container.component + '___' + container.updateContainerLabel;
      return [
        React.createElement(
          'label',
          { key: 'label1' },
          `${container.component}.${container.id}.label: `
        ),
        React.createElement(
          'input',
          {
            value: container.label,
            onChange: this.handleInputUpdate.bind(this),
            key: keyValue,
            id: keyValue
          }
        ),
        React.createElement(
          'br',
          { key: 'br1' }
        ),
      ]
    })

    return React.createElement(
      'div',
      null,
      [
        React.createElement(
          'div',
          { className: 'comp-title', key: '1' },
          'REACT COMPONENT'
        ),
        React.createElement(
          'div',
          { className: 'comp-label', key: '2' },
          [
            React.createElement(
              'div',
              { className: 'comp-label-title', key: '1' },
              `compReact.${containerId}.label: `
            ),
            React.createElement(
              'div',
              { className: 'comp-label-value', key: '2' },
              `${containerLabel}`
            )
          ]
        ),
        React.createElement(
          'div',
          { className: 'label-edit-grid', key: '3' },
          componentControls
        )
      ]
    )
  }
}

export default App
