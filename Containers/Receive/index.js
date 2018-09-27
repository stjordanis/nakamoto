import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextInput, HelperText, List } from 'react-native-paper'
import { View } from 'react-native'
import web3utils from 'web3-utils'

import { get } from '../..//Lib'
import { I18n } from '../../I18n'
import { APP_TITLE } from '../../env'
import Bar from '../../Components/Bar'
import QR from '../../Components/QR'
import { isNumber } from '../../Lib'

class Receive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: undefined,
      amount: 0,
      disabled: false
    }
    this._genCode = this._genCode.bind(this)
    this.estimateGas = this.estimateGas.bind(this)
  }

  static navigationOptions = {
    drawerIcon: () => (
      <List.Item title={I18n.t('receive')} left={() => <List.Icon icon="attach-money" />} />
    )
  }

  componentWillMount = () => {
    this.mounted = true
  }

  componentWillUnmount = () => {
    this.mounted = false
  }

  estimateGas = async (account) => {
    if (web3utils.isAddress(account) && this.state.amount > 0) {
      const _gas = await this.props.web3.web3.eth.estimateGas({
        from: account,
        to: account,
        value: this.props.web3.web3.toWei(this.state.amount, 'ether')
      }, (err, _) => {
        if (err) {
          console.log(err)
        }
      })
      return _gas
    }
  }

  _genCode = async (e) => {
    this.setState({ amount: e })
    const value = parseFloat(e)
    if (value > 0) {
      const to = await get('account')
      if (to) {
        const gas = await this.estimateGas() || 27000
        const data = JSON.stringify({
          to,
          gas,
          value
        })
        this.setState({ data })
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Bar title={APP_TITLE} subtitle={I18n.t('receive')} />
        <TextInput
          label={I18n.t('receive_amount')}
          mode='flat'
          placeholder='9.99'
          disabled={this.state.disabled}
          onChangeText={this._genCode} />
        { this.state.data ? <QR data={this.state.data} /> : null }
        <HelperText
          type="error"
          visible={!isNumber(this.state.amount)}>
          {I18n.t('receive_errors_number')}
        </HelperText>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    //gasPrice: state.gasPrice
  }
}

export default connect(mapStateToProps)(Receive)
