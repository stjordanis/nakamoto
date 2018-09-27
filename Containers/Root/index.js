import { connect } from 'react-redux'

import AppNavigation from '../../Navigation/AppNavigation'

const mapDispatchToProps = (dispatch) => {
  return {    
    setAccount: (account) => { 
        dispatch({ type: 'GET_ACCOUNT', account: account })    
    }
  }
}

const mapStateToProps = state => {
  return {
    screenProps: {
        account: state.account,
        web3: state.web3
    }
  }
}

const Root = connect(mapStateToProps, mapDispatchToProps)(AppNavigation)

export default Root
