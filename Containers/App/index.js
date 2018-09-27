import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider as PaperProvider } from 'react-native-paper'
// import logger from 'redux-logger'

import { getWeb3 } from '../../Lib'
import Root from '../Root'
import reducers from '../../Redux/Reducers'
import { setWeb3, fetchGasPrice } from '../../Redux/Actions'
const middleware = [thunk] // logger
const store = createStore(reducers, applyMiddleware(...middleware))
getWeb3().then((web3) => {
  store.dispatch(setWeb3(web3))
  store.dispatch(fetchGasPrice(web3))
})

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PaperProvider>
          <Root />
        </PaperProvider>
      </Provider>
    )
  }
}

export default App
