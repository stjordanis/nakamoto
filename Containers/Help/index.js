import React, { Component } from 'react'
import { List } from 'react-native-paper'
import { ScrollView, Text } from 'react-native'

import { APP_TITLE } from '../../env'
import Bar from '../../Components/Bar'
import styles from './styles'
import { I18n } from '../../I18n'

export default class Help extends Component {
  static navigationOptions = {
    drawerIcon: () => (
      <List.Item title={I18n.t('help')} left={() => <List.Icon icon="info" />} />
    )
  }

  componentWillMount = () => {
    this.mounted = true
  }

  componentWillUnmount = () => {
    this.mounted = false
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Bar title={APP_TITLE} subtitle={I18n.t('help')} />
        <List.Section title={I18n.t('help_1')}>
          <List.Item title={I18n.t('help_q1')} left={() => <List.Icon icon="question-answer" />} />
          <Text style={styles.item}>{I18n.t('help_a1')}</Text>
        </List.Section>

        <List.Section title={I18n.t('help_2')}>
          <List.Item title={I18n.t('help_q2')} left={() => <List.Icon icon="question-answer" />} />
          <Text style={styles.item}>{I18n.t('help_a2')}</Text>
          <List.Item title={I18n.t('help_q3')} left={() => <List.Icon icon="question-answer" />} />
          <Text style={styles.item}>{I18n.t('help_a3')}</Text>
        </List.Section>

        <List.Section title={I18n.t('help_3')}>
          <List.Item title={I18n.t('help_q4')} left={() => <List.Icon icon="question-answer" />} />
          <Text style={styles.item}>{I18n.t('help_a4')}</Text>
          <List.Item title={I18n.t('help_q5')} left={() => <List.Icon icon="question-answer" />} />
          <Text style={styles.item}>{I18n.t('help_a5')}</Text>
          <List.Item title={I18n.t('help_q5')} left={() => <List.Icon icon="question-answer" />} />
          <Text style={styles.item}>{I18n.t('help_a6')}</Text>
        </List.Section>
      </ScrollView>
    )
  }
}
