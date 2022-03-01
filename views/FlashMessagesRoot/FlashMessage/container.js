import React from 'react';
import PropTypes from 'prop-types';
import { notification as AntdNotification } from 'antd';

import { MESSAGE_ICONS_CLASS, MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';

class Message extends React.Component {
  static propTypes = {
    hideMessage: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
    id: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    messageTitle: PropTypes.oneOfType(
      [PropTypes.shape(), PropTypes.string, PropTypes.number],
    ),
    messageSubTitle:
      PropTypes.oneOfType(
        [PropTypes.shape(), PropTypes.string, PropTypes.number],
    ),
    messageType: PropTypes.string.isRequired,
  }

  static defaultProps = {
    messageTitle: undefined,
    messageSubTitle: undefined,
  }

  hideMessage = () => {
    const { id, hideMessage } = this.props;

    hideMessage({ id });

    AntdNotification.close(id);
  }

  get messageTitle() {
    const { messageTitle, intl } = this.props;

    if (typeof messageTitle === 'object') {
      return intl.formatMessage(messageTitle);
    }

    if (typeof messageTitle === 'string') {
      return messageTitle;
    }

    return messageTitle;
  }

  get messageDescription() {
    const { messageSubTitle, intl } = this.props;

    if (typeof messageSubTitle === 'object') {
      return intl.formatMessage(messageSubTitle, messageSubTitle?.values);
    }

    if (typeof messageSubTitle === 'string') {
      return messageSubTitle;
    }

    return messageSubTitle;
  }

  componentDidMount() {
    const {
      messageType,
      duration,
      id,
    } = this.props;

    const messageMethod = AntdNotification[messageType];
    const iconType = messageType === MESSAGE_TYPE.SUCCESS ? 'checked' : 'alert';

    const iconClass = `icon icon-${iconType} ${MESSAGE_ICONS_CLASS[messageType]}`;

    messageMethod({
      key: id,
      className: 'notification-without-btn vancation-notification',
      message: this.messageTitle,
      description: this.messageDescription,
      duration,
      icon: <i className={iconClass} />,
      onClose: this.hideMessage,
    });
  }

  render() {
    return null;
  }
}

export default Message;
