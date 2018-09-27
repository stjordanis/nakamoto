import { createDrawerNavigator } from 'react-navigation'
import PropTypes from 'prop-types'

import Home from '../Containers/Home'
import Help from '../Containers/Help'
import Receive from '../Containers/Receive'
import Send from '../Containers/Send'

const AppNavigation = createDrawerNavigator({
  Home: { screen: Home, },
  Send: { screen: Send, },
  Receive: { screen: Receive, },
  Help: { screen: Help, },
})

AppNavigation.propTypes = {
  screenProps: PropTypes.object.isRequired
}

export default AppNavigation
