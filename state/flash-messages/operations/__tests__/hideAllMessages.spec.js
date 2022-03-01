import { notification } from 'antd';

import hideAllMessages from '../hideAllMessages';

jest.spyOn(notification, 'destroy');

describe('hideAllMessages', () => {
  it('has valid attributes', () => {
    expect(hideAllMessages).toMatchSnapshot();
  });

  it('should destroy notification', async () => {
    await hideAllMessages.process(null, null, jest.fn());

    expect(notification.destroy).toHaveBeenCalled();
  });
});
