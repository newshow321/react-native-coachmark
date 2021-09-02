import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default class CoachmarkContent extends Component {
  render() {
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        View,
        { style: styles.message },
        React.createElement(Text, { style: styles.messageTextHead }, this.props.message.split(',')[0]),
        React.createElement(Text, { style: styles.messageText }, this.props.message.split(',')[1])
      )
    );
  }
}
CoachmarkContent.defaultProps = {
  buttonText: 'OK',
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginHorizontal: 30,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  message: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flex: 1,
  },
  messageTextHead: {
    fontSize: 15,
    lineHeight: 26,
    fontFamily: 'CircularStd-Bold',
    color: 'rgba(47, 60, 101, 1)',
  },
  messageText: {
    fontSize: 13,
    lineHeight: 22,
    fontFamily: 'CircularStd-Book',
    color: 'rgba(47, 60, 101, 1)',
  },
  button: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(246,246,246)',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgb(7, 112, 205)',
    fontWeight: 'bold',
  },
});
