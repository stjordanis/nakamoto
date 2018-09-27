const setWeb3 = (web3) => {
  return {
    type: 'SET_WEB3',
    payload: web3
  }
}

const fetchGasPrice = (web3) => {
  return (dispatch) => {
    if (web3) {
      web3.eth.getGasPrice((err, gasPrice) => {
        if (err === null) {
          dispatch({
            type: 'FETCH_GAS',
            payload: (gasPrice !== null && web3.fromWei(gasPrice, 'gwei') > 0.1 ? gasPrice : web3.toWei(2, 'gwei'))
          })
        } else {
          dispatch({
            type: 'FETCH_GAS',
            payload: null
          })
        }
      })
    } else {
      dispatch({
        type: 'FETCH_GAS',
        payload: null
      })
    }
  }
}

export {
  setWeb3,
  fetchGasPrice
}
