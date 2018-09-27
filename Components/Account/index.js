import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Headline  } from 'react-native-paper'
import { View, Clipboard, Text, ActivityIndicator } from 'react-native';

import { get, truncateAddress } from '../../Lib'
import { I18n } from '../../I18n'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: undefined,
      balance: undefined
    }
    this._account = this._account.bind(this)
    this._getBalance = this._getBalance.bind(this)
  }

  componentDidMount = async () => {
    await this._account()
    await this._getBalance()
  }

  _accountToClipboard = () => {
    if (this.state.account) {
      Clipboard.setString(this.state.account)
    }
  }

  _getBalance = async () => {
    if (this.state.account && this.props.web3.length !== 0) {
      this.props.web3.eth.getBalance(this.state.account, (err, balance) => {
        if (!err) {
          this.setState({
            balance: this.props.web3.fromWei(balance.toNumber())
          })
        } else {
          console.log(err)
        }
      })
    }

    setTimeout(() => {
      this._getBalance()
    }, 2000)
  }

  _account = async () => {
    const account = await get('account')
    this.setState({ account })
  }

  render() {
    return (
      <View>
        <Headline style={{ padding: 8 }}>
          {I18n.t('account')}
        </Headline>
        { this.state.account ?
          <Text
            style={{ padding: 8, marginLeft: 8, marginRight: 8, }}
            onLongPress={() => this._accountToClipboard()}
            accessibilityLabel={I18n.t('account')}>
            { truncateAddress(this.state.account) }
          </Text>
          : <ActivityIndicator size="small" hidesWhenStopped={false} color="#00ff00" />
        }
        { this.state.balance ?
          <Text
            style={{ padding: 8, marginLeft: 8, marginRight: 8, }}
            accessibilityLabel={I18n.t('balance')}>
            Balance: { this.state.balance } Ether
          </Text>
          : <ActivityIndicator hidesWhenStopped={false} size="small" color="#00ff00" />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3
  }
}

export default connect(mapStateToProps)(Account)
