import React, { Component } from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import PropTypes from 'prop-types'

import styles from './styles'

class QR extends Component {
  render() {
    return (
      <View style={styles.container}>
        { this.props.data ? <QRCode
          value={this.props.data}
          size={responsiveWidth(80)}
          bgColor='black'
          fgColor='white' /> : null }
      </View>
    )
  }
}

QR.propTypes = {
  data: PropTypes.string.isRequired
}

export default QR
