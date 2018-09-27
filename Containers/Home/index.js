import React, { Component } from 'react'
import { Button, List, Headline, TouchableRipple, Colors } from 'react-native-paper'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import Modal from 'react-native-modal'

import { APP_TITLE } from '../../env'
import styles from './styles'
import Bar from '../../Components/Bar'
import Account from '../../Components/Account'
import { I18n } from '../../I18n'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: undefined,
      visible: false
    }
    this.mounted = false
    // this._isConnected = this._isConnected.bind(this)
  }

  static navigationOptions = {
    drawerIcon: () => (
      <List.Item title={I18n.t('home')} left={() => <List.Icon icon="home" />} />
    )
  }

  componentWillMount = () => {
    this.mounted = true
  }

  componentWillUnmount = () => {
    this.mounted = false
  }

  /*
  componentDidMount = async() => {
    await this._isConnected()
    if (!this.state.connected) {
      this._showModal()
    }
  }

  _isConnected = async () => {
    NetInfo.isConnected.fetch().then((connected) => {
      this.setState({ connected })
    })
  }

  _showModal = () => this.setState({ visible: true })

  _hideModal = () => {
    this.state.connected ? this.setState({ visible: false }) : null
  }
  */

  render() {
    return (
      <View testID={'home'} style={{ flex: 1 }}>
        <Bar testID={'home_bar'} title={APP_TITLE} subtitle={I18n.t('home_subtitle')} />
        <Account testId={'account'} />
        <Headline testID={'home_scan_head'} style={{ padding: 8 }}>
          Scan &amp; Send
        </Headline>
        <TouchableRipple
          testID={'home_scan'}
          onPress={() => this.props.navigation.navigate('Send')}
          style={styles.container}
          accessibilityLabel='Tap to scan and send Ether'
          contentDescription='Tap to scan and send Ether'
          rippleColor="rgba(0, 0, 0, .32)">
          <Icon name="crop-free" size={150} color={Colors.red500} />
        </TouchableRipple>
        {/*<Modal isVisible={this.state.visible}style={styles.modal}>
          <View style={{ flex: 1, alignItems: 'center', }}>
            <Text style={{ fontSize: 30, padding: 20, }}>You need an internet connection for this app.</Text>
            <TouchableOpacity onPress={this._hideModal}>
              <Button icon="done" mode="contained" style={{ padding: 20, }}>
                OK
              </Button>
            </TouchableOpacity>
          </View>
        </Modal>*/}
      </View>
    )
  }
}

export default Home
