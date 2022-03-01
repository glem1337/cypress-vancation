import React from 'react';
import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import LeavePageModal from '../component';

describe('LeavePageModal component tests', () => {
  const props = {
    discard: jest.fn(),
    save: jest.fn(),
    intl,
  };

  const component = shallow(<LeavePageModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
