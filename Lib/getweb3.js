import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'

import { generateMnemonic } from './ethereum'
import { INFURA_API_KEY, NETWORK, NETWORK_ID } from '../env'
import { set, get } from './storage'
const RPC_ADDRESS = `https://${NETWORK}.infura.io/${INFURA_API_KEY}`

const getWeb3 = async () => {
  const address_index = 0
  let mnemonic = await get('mnemonic')
  if (!mnemonic) {
    mnemonic = await generateMnemonic()
    await set('mnemonic', mnemonic)
  }
  try {
    const provider = new HDWalletProvider(mnemonic, RPC_ADDRESS, address_index)
    const web3 = new Web3(provider)
    await set('account', Object.keys(provider.wallets)[0])
    await set('pk', provider.wallets[Object.keys(provider.wallets)[0]]._privKey.toString('hex'))

    return web3
  } catch (error) {
    console.log(error)
    return []
  }
}

export default getWeb3
