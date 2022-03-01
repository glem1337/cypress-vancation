import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import InfoModal, { InfoModalContainer } from '../container';
import { INFO_MODAL_ICON_TYPE } from '../types';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('InfoModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    iconType: INFO_MODAL_ICON_TYPE.INFO,
    title: 'test title',
    subTitle: 'test subTitle',
    hideModal: jest.fn(),
  };

  const wrapper = shallow(<InfoModal {...props} />);
  const container = diveTo(wrapper, InfoModalContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `iconData` instance getter', () => {
    Object
      .values(INFO_MODAL_ICON_TYPE)
      .forEach((iconType) => {
        it(`for '${iconType}' icon type`, () => {
          container.setProps({ iconType });

          const { iconData } = instance;

          expect(iconData).toMatchSnapshot();
        });
      });
  });
});
