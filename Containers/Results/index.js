import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import Bar from '../../Components/Bar'
import { I18n } from '../../I18n'
import { APP_TITLE } from '../../env'

class Results extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Bar title={APP_TITLE} subtitle={I18n.t('results')} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ padding: 8, marginLeft: 8, marginRight: 8, }}>Transaction Results</Text>
          <Text style={{ padding: 8, marginLeft: 8, marginRight: 8, }}>
            { this.props.hash ?
              `${I18n.t('results_success')} ${this.props.hash}`
              : `${I18n.t('results_error')} ${this.props.error}` }
          </Text>
        </View>
      </View>
    )
  }
}

Results.propTypes = {
  hash: PropTypes.string,
  error: PropTypes.string
}

export default Results
