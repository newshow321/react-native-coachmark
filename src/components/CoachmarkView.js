import React, { Component } from 'react';
import CoachmarkContent from './CoachmarkContent';
import CoachmarkArrow from './CoachmarkArrow';
import { CoachmarkPosition } from '../types';
export default class CoachmarkView extends Component {
  renderCoachmarkContent() {
    return React.createElement(CoachmarkContent, { message: this.props.message });
  }
  renderCoachmarkArrow() {
    const { renderArrow, x, position } = this.props;
    return renderArrow({ x, position });
  }
  render() {
    return this.props.position === CoachmarkPosition.TOP
      ? React.createElement(React.Fragment, null, this.renderCoachmarkArrow(), this.renderCoachmarkContent())
      : React.createElement(React.Fragment, null, this.renderCoachmarkContent(), this.renderCoachmarkArrow());
  }
}
CoachmarkView.defaultProps = {
  position: CoachmarkPosition.TOP,
  renderArrow: ({ x, position }) => React.createElement(CoachmarkArrow, { x: x, position: position }),
};
