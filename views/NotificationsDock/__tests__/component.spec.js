import React from 'react';
import { shallow } from 'enzyme';
import NOTIFICATIONS_COMPONENTS from '../notificationComponents';
import NotificationsDock from '../component';

describe('NotificationsDock component', () => {
  // eslint-disable-next-line array-callback-return
  Object.keys(NOTIFICATIONS_COMPONENTS).map((notificationType) => {
    const props = {
      notifications: {
        general_123: {
          id: 'general_123',
          notificationType,
          messageObject: { id: 'some.value' },
          kind: 'success',
          context: 'general',
          isCloseable: true,
        },
      },
      hideNotification: jest.fn(),
    };

    it(`renders with ${notificationType}`, () => {
      const component = shallow(<NotificationsDock {...props} />);

      expect(component).toMatchSnapshot();
    });
  });
});
