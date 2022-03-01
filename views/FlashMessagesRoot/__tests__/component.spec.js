import React from 'react';
import { shallow } from 'enzyme';

import fakeIntl from 'utils/testHelpers/fakeIntl';

import MessagesRootComponent from '../component';

describe('MessagesRootComponent component tests', () => {
  const props = {
    messages: {
      1: { id: '1', duration: 3, messageTitle: {}, messageType: 'success' },
    },
    intl: fakeIntl,
    hideMessage: jest.fn(),
  };

  const component = shallow(<MessagesRootComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
