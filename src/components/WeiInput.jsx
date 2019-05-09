import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import { ethers } from 'ethers'

import { KEYS } from '~/constants'

export const WeiInput = ReactTimeout(class _WeiInput extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.any.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleStartEditing: PropTypes.func.isRequired
  }

  getDefaultValue () {
    return ethers.utils.formatEther(this.props.value.toString())
  }

  state = {
    value: this.getDefaultValue(),
    previousValue: this.getDefaultValue()
  }

  componentDidUpdate = () => {
    this.props.setTimeout(ReactTooltip.rebuild)
  }

  handleCancel = () => {
    this.setState({
      value: this.state.previousValue
    })
  }

  handleChange = (e) => {
    let value = e.target.value

    value = value.replace(/[^\d.]*/g, '')

    value = value.split('').reverse().join('')
    value = value.replace(/(?:[.](?=.*[.])|[^\d.])+/g, '')
    value = value.split('').reverse().join('')

    this.setState({
      value
    })
  }

  setNewPreviousValue = () => {
    this.setState({
      previousValue: this.state.value
    })
  } 

  handleBlur = (e) => {
    e.preventDefault()

    const valueAsWei = this.validate(this.state.value)

    if (
      valueAsWei !== ''
      && (valueAsWei !== this.state.previousValue)
    ) {
      this.setNewPreviousValue()
      this.props.handleSubmit(valueAsWei.toString())
    }
  }

  // Convert the entered ether value in to wei for DB storage
  validate = (value) => {
    try {
      return ethers.utils.parseEther(value)
    } catch (error) {
      console.warn(error)
      return ''
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.handleCancel()
    } else if (e.keyCode === KEYS.enter) {
      this.refs.inputRef.blur()
    }
  }

  handleClick = () => {
    this.props.handleStartEditing()
  }
  
  hintText = () => {
    if (this.state.value === '') {
      return ``
    }

    // when hover but not focus/click
    // NOT IMPLEMENTED! We will need to render a different tooltip component
    // for this when the mouse is hovering (ie not in input focus() edit mode)
    // return this.state.value.length > 9 ? this.state.value : ''

    // when focused/click
    let wei = '?'
    let gwei = '?'

    try {
      const weiBn = ethers.utils.parseEther(this.state.value)
      wei = ethers.utils.commify(weiBn)

      gwei = ethers.utils.commify(ethers.utils.formatUnits(weiBn, 'gwei'))
    } catch (error) {
      console.warn(error)
    }

    return `${this.state.value} ether<br /><br />(${gwei} gwei)<br /><br />(${wei} wei)`
  }

  render () {
    const tooltipId = `uint-input-hint-${this.props.index}`
    return (
      <>
        <input
          data-tip
          data-for={tooltipId}
          data-iscapture='true'
          data-scroll-hide='false'
          data-event='click focus'
          data-event-off='blur'
          data-multiline={true}
          data-html={true}
          type='text'
          className={classnames(
            'input',
            'is-truncated',
            {
              'has-border-danger': this.validate(this.state.value).length === 0
            }
          )}
          ref='inputRef'
          placeholder='0'
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyUp={this.handleKeyUp}
          onClick={this.handleClick}
          style={{
            width: ((this.state.value.length + 1) * 16)
          }}
        />

        <ReactTooltip
          id={tooltipId}
          place='top'
          effect='solid'
          getContent={[this.hintText, 1000]}
        />
      </>
    )
  }
})