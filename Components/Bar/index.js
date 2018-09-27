import React, { Component } from 'react'
import { Appbar } from 'react-native-paper'
import PropTypes from 'prop-types'

class Bar extends Component {
  render() {
    const menu = this.props.back ? <Appbar.BackAction onPress={this.props.navigation.openDrawer()} />
      : <Appbar.Action icon="menu" />

    return (
      <Appbar.Header>
        { /*menu*/ }
        <Appbar.Content title={this.props.title} subtitle={this.props.subtitle} />
      </Appbar.Header>
    )
  }
}

Bar.defaultProps = {
  back: false
}

Bar.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool,
  subtitle: PropTypes.string.isRequired
}

export default Bar
