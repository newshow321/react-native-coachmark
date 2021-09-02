import React, { Component } from 'react';
import { View, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import CoachmarkView from './CoachmarkView';
import { CoachmarkPosition } from '../types';
export default class Coachmark extends Component {
    constructor(props) {
        super(props);
        this.view = React.createRef();
        this.show = () => {
            return new Promise((resolve) => {
                this.interval = setInterval(() => {
                    this._isInViewPort().then((isInViewPort) => {
                        if (isInViewPort) {
                            this._stopWatching();
                            resolve(this._handleShow());
                        }
                    });
                }, 100);
            });
        };
        this.hide = () => {
            return this._handleHide();
        };
        this._isInViewPort = () => {
            return new Promise((resolve) => {
                if (!this.props.isAnchorReady || !this.view || !this.view.current) {
                    return resolve(false);
                }
                this.view.current.measure((x, y, width, height, pageX, pageY) => {
                    const windowHeight = Dimensions.get('window').height;
                    const windowWidth = Dimensions.get('window').width;
                    const rectBottom = pageY + height;
                    const rectTop = pageY;
                    const rectLeft = x;
                    const rectRight = x + width;
                    const isInViewPort = rectBottom <= windowHeight && rectTop >= 0 && rectLeft >= 0 && rectRight <= windowWidth;
                    if (isInViewPort) {
                        this.setState({
                            childStyle: {
                                top: pageY,
                                left: pageX,
                                width,
                                height,
                            },
                            position: pageY > Dimensions.get('window').height - (pageY + height)
                                ? CoachmarkPosition.BOTTOM
                                : CoachmarkPosition.TOP,
                        });
                    }
                    resolve(isInViewPort);
                });
            });
        };
        this._handleShow = () => {
            this.props.onShow();
            this.setState({
                visible: true,
            });
            return new Promise((resolve) => {
                this.interval = setInterval(() => {
                    if (!this.state.visible) {
                        this._stopWatching();
                        resolve();
                    }
                }, 16);
            });
        };
        this._handleHide = () => {
            this.setState({
                visible: false,
            }, () => {
                this.props.onHide();
            });
        };
        this._stopWatching = () => {
            clearInterval(this.interval);
            this.interval = undefined;
        };
        this._measureLayout = () => {
            if (this.props.autoShow) {
                this.show();
            }
        };
        this._renderChildren = () => {
            return React.createElement(View, { style: [styles.child, this.state.childStyle] }, this.props.children);
        };
        this._renderCoachmark = () => {
            return (React.createElement(View, { style: Object.assign({ position: 'absolute', left: 0, right: 0 }, (this.state.position === CoachmarkPosition.TOP
                    ? { top: this.state.childStyle.top + this.state.childStyle.height }
                    : {
                        bottom: Dimensions.get('window').height - this.state.childStyle.top,
                    })) },
                React.createElement(CoachmarkView, { x: this.state.childStyle.left + this.state.childStyle.width / 2, position: this.state.position, message: this.props.message, renderArrow: this.props.renderArrow })));
        };
        this.state = {
            visible: false,
            childStyle: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
            },
        };
    }
    render() {
        const { contentContainerStyle, accessibilityLabel, testID } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement(View, { ref: this.view, style: contentContainerStyle, onLayout: this._measureLayout }, React.Children.only(this.props.children)),
            React.createElement(Modal, { animationType: 'fade', transparent: true, visible: this.state.visible },
                React.createElement(View, { style: styles.backdrop }),
                this.state.position === 'bottom' ? (React.createElement(React.Fragment, null,
                    this._renderCoachmark(),
                    this._renderChildren())) : (React.createElement(React.Fragment, null,
                    this._renderChildren(),
                    this._renderCoachmark())),
                React.createElement(TouchableWithoutFeedback, { accessibilityLabel: accessibilityLabel, testID: testID, onPress: this.hide },
                    React.createElement(View, { style: StyleSheet.absoluteFill })))));
    }
}
Coachmark.defaultProps = {
    autoShow: false,
    onHide: () => { },
    onShow: () => { },
    isAnchorReady: true,
    message: '',
};
const styles = StyleSheet.create({
    backdrop: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { backgroundColor: 'rgba(0,0,0,0.74)' }),
    child: {
        position: 'absolute',
    },
});
