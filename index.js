import './shim.js'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Require cycle:'])
import { AppRegistry } from 'react-native'
import App from './Containers/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
