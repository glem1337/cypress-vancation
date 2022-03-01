import React from 'react';
import { shallow } from 'enzyme';

import FooterComponent from '../component';

describe('FooterComponent component tests', () => {
  const props = {
    discardPrepare: jest.fn(),
    discardConfirm: jest.fn(),
    discardReject: jest.fn(),
    savePrepare: jest.fn(),
    saveReject: jest.fn(),
    submit: jest.fn(),
    submitBtnText: { id: 'shared.ok' },
    isLoading: true,
    canSubmit: true,
    isDiscardPopoverVisible: true,
    isSavePopoverVisible: true,
    setPopoverVisibility: jest.fn(),
    withSavePopoverWarning: true,
  };

  const component = shallow(<FooterComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot with save popover', () => {
    component.setProps({ withSavePopover: true });

    expect(component).toMatchSnapshot();
  });

  it('checks popup container', () => {
    component.find('Popover').forEach((node) => {
      const popupContainer = node.renderProp('getPopupContainer')();

      expect(popupContainer).toMatchSnapshot();
    });
  });
});
