import React from 'react';
import PropTypes from 'prop-types';
import { delay } from 'lodash';

import { ALERT_KINDS } from 'constants';
import getDisplayName from 'utils/getDisplayName';

const NOTIFICATION_LIFETIME = 3000;

const closeableNotification = (WrappedComponent) => {
  class CloseableNotification extends React.Component {
    static propTypes = {
      hideNotification: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      context: PropTypes.string.isRequired,
      kind: PropTypes.string.isRequired,
      closeAfterDelay: PropTypes.bool,
    }

    static defaultProps = {
      closeAfterDelay: true,
    }

    static displayName = `closeableNotification(${getDisplayName(WrappedComponent)})`;

    componentDidMount = () => {
      if (this.props.kind === ALERT_KINDS.success && this.props.closeAfterDelay) {
        delay(this.handleClose, NOTIFICATION_LIFETIME);
      }
    }

    componentWillUnmount = () => {
      if (this.props.kind !== ALERT_KINDS.success) {
        this.handleClose();
      }
    }

    handleClose = () => {
      const { id, context } = this.props;
      this.props.hideNotification({ id, context });
    }

    render = () => (
      <WrappedComponent
        {...this.props}
        onClose={this.handleClose}
      />
    );
  }

  return CloseableNotification;
};

export default closeableNotification;
