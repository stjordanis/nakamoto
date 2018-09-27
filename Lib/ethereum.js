import bip39 from 'react-native-bip39'
import EthereumTx from 'ethereumjs-tx'
import web3utils from 'web3-utils'

import { NETWORK_ID } from '../env'
import { get, set } from './storage'

const generateMnemonic = async () => {
  try {
    return await bip39.generateMnemonic(256)
  } catch(e) {
    return false
  }
}

const checkFunds = async (tx) => {
  return tx.getUpfrontCost()
}

const getNonce = async (web3) => {
  const account = await get('account')
  web3.eth.getTransactionCount(account).then((err, res) => {
    if (!err) {
      return res
    } else {
      console.log(err)
    }
  })
}

const signTx = async (web3, _to, _gas, _gasPrice, _value) => {
  const pk = await get('pk')
  const pkBuff = Buffer.from(pk, 'hex')
  const account = await get('account')
  _value = _value * 10**18

  web3.eth.getTransactionCount(account, async (err, nonce) => {
    if (!err) {
      const txObject = {
        nonce: web3utils.toHex(nonce),
        gasPrice: web3utils.toHex(_gasPrice.toNumber()),
        gasLimit: web3utils.toHex(_gas),
        to: _to,
        value: web3utils.toHex(_value),
        data: '0x00',
        chainId: NETWORK_ID
      }
      const tx = new EthereumTx(txObject)
      tx.sign(pkBuff)
      const serializedTx = tx.serialize().toString('hex')
      await set('tx', serializedTx)
      return serializedTx
    } else {
      console.log(err)
    }
  })
}

export {
  generateMnemonic,
  signTx,
  getNonce
}
