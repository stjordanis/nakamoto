import React from 'react'
import { Drawer } from 'react-native-paper'
import PropTypes from 'prop-types'

const DrawerItem = (props) => (
  <Drawer.Item label={props.label} onPress={() => props.navigation.navigate(props.route)} icon={props.icon} />
)

DrawerItem.propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.string,
  icon: PropTypes.string
}

export default DrawerItem
