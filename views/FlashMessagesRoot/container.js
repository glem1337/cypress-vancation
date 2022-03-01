import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as R from 'ramda';
import deepEqual from 'fast-deep-equal';

import { hideMessage as hideMessageAction } from 'state/flash-messages/actions';

import FlashMessagesRootComponent from './component';

class FlashMessagesRoot extends React.Component {
  static propTypes = {
    hideMessage: PropTypes.func.isRequired,
    messages: PropTypes.shape().isRequired,
    intl: PropTypes.shape().isRequired,
  }

  shouldComponentUpdate(prevProps) {
    const { messages: prevMessages } = prevProps;
    const { messages: currMessages } = this.props;

    return !deepEqual(prevMessages, currMessages);
  }

  render = () => <FlashMessagesRootComponent {...this.props} />;
}

const mapStateToProps = (state) => ({
  messages: state['flash-messages'],
});

const mapDispatchToProps = {
  hideMessage: hideMessageAction,
};

export { FlashMessagesRoot as FlashMessagesRootContainer };
export default R.compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(FlashMessagesRoot);
