/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8NavigationCard
 * @flow
 */
'use strict';

const Animated = require('Animated');
const React = require('React');
const ReactComponentWithPureRenderMixin = require('ReactComponentWithPureRenderMixin');
const StyleSheet = require('StyleSheet');
const F8NavigationCardPanResponder = require('./F8NavigationCardPanResponder');
const F8NavigationCardStyleInterpolator = require('./F8NavigationCardStyleInterpolator');
const View = require('View');

import type  {
  NavigationPanPanHandlers,
  NavigationSceneRenderer,
  NavigationSceneRendererProps,
} from 'NavigationTypeDefinition';

type Props = NavigationSceneRendererProps & {
  style: any,
  panHandlers: ?NavigationPanPanHandlers,
  renderScene: NavigationSceneRenderer,
};

const {PropTypes} = React;

const propTypes = {
  // ...NavigationPropTypes.SceneRenderer,
  style: PropTypes.any,
  // panHandlers: NavigationPropTypes.panHandlers,
  renderScene: PropTypes.func.isRequired,
  isVertical: PropTypes.bool,
};

/**
 * Component that renders the scene as card for the <NavigationCardStack />.
 */
class F8NavigationCard extends React.Component<any, Props, any> {
  props: Props;

  shouldComponentUpdate(nextProps: Props, nextState: any): boolean {
    return ReactComponentWithPureRenderMixin.shouldComponentUpdate.call(
      this,
      nextProps,
      nextState
    );
  }

  render(): ReactElement {
    const {
      panHandlers,
      renderScene,
      style,
      ...props, /* NavigationSceneRendererProps */
    } = this.props;

    let viewStyle = null;
    if (style === undefined) {
      // fall back to default style.
      const interpolator = this.props.isVertical ? F8NavigationCardStyleInterpolator.forVertical : F8NavigationCardStyleInterpolator.forHorizontal;
      viewStyle = interpolator(props);
    } else {
      viewStyle = style;
    }

    const  {
      navigationState,
      scene,
    } = props;

    const interactive = navigationState.index === scene.index && !scene.isStale;
    const pointerEvents = interactive ? 'auto' : 'none';

    let viewPanHandlers = null;
    if (interactive) {
      if (panHandlers === undefined) {
        const responder = this.props.isVertical ? F8NavigationCardPanResponder.forVertical : F8NavigationCardPanResponder.forHorizontal;
        viewPanHandlers = responder(props);
      } else {
        viewPanHandlers = panHandlers;
      }
    }

    return (
      <Animated.View
        {...viewPanHandlers}
        pointerEvents={pointerEvents}
        style={[styles.main, viewStyle]}>
        {renderScene(props)}
      </Animated.View>
    );
  }
}

F8NavigationCard.propTypes = propTypes;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    top: 0,
  },
});

module.exports = F8NavigationCard;
