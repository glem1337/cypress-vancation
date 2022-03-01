import React from 'react';
import PropTypes from 'prop-types';

import isPresent from 'utils/isPresent';

const withIntersectionObserver = (thresholds, options) => (Target) => {
  class WithIntersectionObserver extends React.Component {
    static defaultProps = {
      onRef: undefined,
    };

    static propTypes = {
      onRef: PropTypes.func,
    };

    constructor(props, context) {
      super(props, context);

      this.state = {};
      this.observer = new global.IntersectionObserver(this.onObserve, {
        ...options,
        threshold: Object.keys(thresholds).map((prop) => thresholds[prop]),
      });
    }

    componentDidMount() {
      const { observer, domNode } = this;

      if (isPresent(observer) && isPresent(domNode)) {
        observer.observe(domNode);
      }
    }

    componentWillUnmount() {
      const { observer } = this;

      if (isPresent(observer)) {
        observer.disconnect();
      }
    }

    onRef = (ref) => {
      const { onRef } = this.props;
      this.domNode = ref;

      if (typeof onRef === 'function') {
        onRef(ref);
      }
    };

    onObserve = (entries) => {
      this.setState(
        Object.keys(thresholds).reduce(
          (totalResult, prop) => ({
            ...totalResult,
            ...entries.reduce(
              (entriesResult, entry) => ({
                ...entriesResult,
                [prop]:
                  entry.isIntersecting
                  && entry.intersectionRatio >= thresholds[prop],
              }),
              {},
            ),
          }),
          {},
        ),
      );
    };

    render() {
      return <Target {...this.props} {...this.state} onRef={this.onRef} />;
    }
  }

  return WithIntersectionObserver;
};

export default withIntersectionObserver;
