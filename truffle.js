const { INFURA_API_KEY } = require('./env')

module.exports = {
  networks: {
    rinkeby: {
      protocol: 'https',
      host: `https://rinkeby.infura.io/${INFURA_API_KEY}`,
      port: 8545,
      network_id: 4
    }
  }
}
