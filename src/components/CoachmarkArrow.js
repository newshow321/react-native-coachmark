import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CoachmarkPosition } from '../types';
export default class CoachmarkArrow extends Component {
  constructor() {
    super(...arguments);
    this.getStyles = () => {
      if (this.props.position == CoachmarkPosition.TOP) {
        return { borderBottomColor: '#FFF', borderBottomWidth: 10, marginTop: 12 };
      }
      if (this.props.position == CoachmarkPosition.BOTTOM) {
        return { borderTopColor: '#FFF', borderTopWidth: 10, marginBottom: 12 };
      }
      return {};
    };
  }
  render() {
    return React.createElement(View, { style: [styles.arrow, this.getStyles(), { marginLeft: this.props.x - 10 }] });
  }
}
CoachmarkArrow.defaultProps = {
  position: CoachmarkPosition.TOP,
};
const styles = StyleSheet.create({
  arrow: {
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});
