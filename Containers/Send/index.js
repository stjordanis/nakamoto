import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit'
import { List } from 'react-native-paper'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

import Results from '../Results'
import { I18n } from '../../I18n'
import { signTx, get, del } from '../../Lib'

class Send extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authorized: undefined,
      hash: undefined,
      error: undefined,
      disabled: false,
      action: undefined
    }
    this._processTx = this._processTx.bind(this)
    this._authorizedStatus = this._authorizedStatus.bind(this)
    this._requestAuthorization = this._requestAuthorization.bind(this)
  }

  static navigationOptions = {
    drawerIcon: () => (
      <List.Item title={I18n.t('send')} left={() => <List.Icon icon="send" />} />
    )
  }

  componentDidMount = async () => {
    if (!this.state.authorized) {
      await this._authorizedStatus()
    }
  }

  _authorizedStatus = async () => {
    const authorized = await CameraKitCamera.checkDeviceCameraAuthorizationStatus()
    this.setState({
      authorized
    })
    if (!authorized) {
      await _requestAuthorization()
    }
  }

  _processTx = async (e) => {
    const qr = e.nativeEvent.codeStringValue || e.nativeEvent.qrcodeStringValue
    if (qr && this.props.web3.length === undefined && !this.state.disabled) {
      const data = JSON.parse(qr)
      await signTx(this.props.web3, data.to, data.gas, this.props.gasPrice, data.value)
      const serialized = await get('tx')

      if (serialized) {
        this.setState({ disabled: true })
        this.props.web3.eth.sendRawTransaction(`0x${serialized}`, async (err, hash) => {
          ReactNativeHapticFeedback.trigger('notificationSuccess', true)
          if (!err) {
            this.setState({
              hash: hash,
              action: Results,
              error: undefined
            })
            await del('tx')
          } else {
            this.setState({
              hash: undefined,
              action: Results,
              error: err
            })
          }
        })
      }
    }
  }

  _requestAuthorization = async () => {
    if (!this.state.authorized) {
      await CameraKitCamera.requestDeviceCameraAuthorization()
    }
  }

  render() {
    if (this.state.action) {
      const Results = this.state.action
      return <Results hash={this.state.hash} error={this.state.error ? this.state.error.message : undefined } />
    }

    return (
      <View>
        <CameraKitCameraScreen
          testID={'camera'}
          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          style={{ flex: 1 }}
          scanBarcode={true}
          laserColor={"blue"}
          surfaceColor={"black"}
          frameColor={"white"}
          onReadCode={(e) => this._processTx(e) }
          onReadQRCode={(e) => this._processTx(e) }
          hideControls={true}
          focusMode='on'
          zoomMode='on' />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    gasPrice: state.gasPrice
  }
}

export default connect(mapStateToProps)(Send)
