import React from 'react';
import { shallow } from 'enzyme';

import BackButton from '../component';

describe('BackButton component tests', () => {
  const props = {
    isPopoverVisible: true,
    discardReject: jest.fn(),
    discardConfirm: jest.fn(),
    discardPrepare: jest.fn(),
  };

  const component = shallow(<BackButton {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('checks popup container', () => {
    const popupContainer = component.find('Popover').renderProp('getPopupContainer')();

    expect(popupContainer).toMatchSnapshot();
  });
});
