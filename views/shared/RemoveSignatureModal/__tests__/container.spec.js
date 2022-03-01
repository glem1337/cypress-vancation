import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import RemoveSignatureModal, { RemoveSignatureModalContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('RemoveSignatureModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    title: 'Title',
    subTitle: 'Sub Title',
  };

  const wrapper = shallow(<RemoveSignatureModal {...props} />);
  const container = diveTo(wrapper, RemoveSignatureModalContainer);

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
