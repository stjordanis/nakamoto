import { combineReducers } from 'redux'

const web3 = (state = [], action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return action.payload
    default:
      return state
  }
}

const gasPrice = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_GAS':
      return action.payload
    default:
      return state
  }
}


const root = combineReducers({
  web3: web3,
  gasPrice: gasPrice
})

export default root
