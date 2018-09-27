import { isNumber, truncateAddress } from './utils'
import getWeb3 from './getweb3'
import { get, set, del } from './storage'
import { generateMnemonic, signTx } from './ethereum'

export {
  isNumber,
  truncateAddress,
  getWeb3,
  get,
  set,
  generateMnemonic,
  signTx, 
  del
}
