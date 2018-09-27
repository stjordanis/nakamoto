import Config from 'react-native-config'
const assert = require('assert')

const NETWORK = 'rinkeby'
const NETWORK_ID = 4
const INFURA_API_KEY = Config.INFURA_API_KEY // 'pEGmOKZDuVpcX9N1MR2N'
assert.equal(typeof INFURA_API_KEY, 'string', 'We need Infura API key')
const APP_TITLE = 'Nakamoto'

module.exports = {
  INFURA_API_KEY,
  NETWORK,
  NETWORK_ID,
  APP_TITLE
}
