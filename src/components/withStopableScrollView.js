import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
export default function (WrappedComponent) {
  var _a;
  const StopableScroll =
    ((_a = class extends React.Component {
      constructor() {
        super(...arguments);
        this.yOffset = 0;
        this.scrollView = React.createRef();
        this.stop = () => {
          (this.props.scrollViewRef || this.scrollView).current.scrollTo({ x: 0, y: this.yOffset, animated: false });
        };
        this._handleOnScroll = (e) => {
          this.yOffset = e.nativeEvent.contentOffset.y;
          this.props.onScroll(e);
        };
      }
      render() {
        return React.createElement(
          WrappedComponent,
          Object.assign({}, this.props, {
            ref: this.props.scrollViewRef || this.scrollView,
            onScroll: this._handleOnScroll,
            scrollEventThrottle: 16,
          })
        );
      }
    }),
    (_a.defaultProps = {
      onScroll: () => {}, // eslint-disable-line no-empty-function
    }),
    _a);
  return hoistNonReactStatics(StopableScroll, WrappedComponent);
}
