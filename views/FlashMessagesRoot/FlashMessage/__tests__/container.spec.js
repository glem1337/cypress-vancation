import React from 'react';
import { shallow } from 'enzyme';
import { notification } from 'antd';

import fakeIntl from 'utils/testHelpers/fakeIntl';
import { MESSAGE_ICONS_CLASS, MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';

import Message from '../container';

jest.spyOn(notification, 'success');

describe('Message container tests', () => {
  const props = {
    hideMessage: jest.fn(),
    intl: fakeIntl,
    id: '1',
    duration: 1,
    messageTitle: { id: 'test' },
    messageType: 'success',
    messageSubTitle: { id: 'test' },
  };

  const container = shallow(<Message {...props} />);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    const iconType = props.messageType === MESSAGE_TYPE.SUCCESS ? 'checked' : 'alert';

    expect(notification.success).toHaveBeenCalledWith({
      key: props.id,
      message: instance.messageTitle,
      description: instance.messageDescription,
      duration: props.duration,
      icon: <i className={`icon icon-${iconType} ${MESSAGE_ICONS_CLASS[props.messageType]}`} />,
      onClose: instance.hideMessage,
      className: 'notification-without-btn vancation-notification',
    });
  });

  it('checks `hideMessage` instance method', () => {
    instance.hideMessage();

    expect(props.hideMessage).toHaveBeenCalledWith({ id: props.id });
  });

  describe('checks `messageTitle` instance getter', () => {
    it('should return intl value', () => {
      const { messageTitle } = instance;

      expect(messageTitle).toBe('{Translation id: test}');
    });

    it('should return string value', () => {
      container.setProps({ messageTitle: 'test' });

      const { messageTitle } = instance;

      expect(messageTitle).toBe('test');
    });

    it('should return raw value', () => {
      container.setProps({ messageTitle: 123 });

      const { messageTitle } = instance;

      expect(messageTitle).toBe(123);
    });
  });

  describe('checks `messageDescription` instance getter', () => {
    it('should return intl value', () => {
      const { messageDescription } = instance;

      expect(messageDescription).toBe('{Translation id: test}');
    });

    it('should return string value', () => {
      container.setProps({ messageSubTitle: 'test' });

      const { messageDescription } = instance;

      expect(messageDescription).toBe('test');
    });

    it('should return raw value', () => {
      container.setProps({ messageSubTitle: 123 });

      const { messageDescription } = instance;

      expect(messageDescription).toBe(123);
    });
  });
});
