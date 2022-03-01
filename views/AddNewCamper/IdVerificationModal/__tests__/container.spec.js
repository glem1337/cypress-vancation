import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ROUTES from 'constants/routes';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { hideModal } from 'state/modal/actions';

import IdVerificationModal, { IdVerificationModalContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('IdVerificationModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      push: jest.fn(),
    },
  };

  const wrapper = shallow(<IdVerificationModal {...props} />);
  const container = diveTo(wrapper, IdVerificationModalContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `navigateToHomePage` instance method', () => {
    instance.navigateToHomePage();

    expect(props.router.push).toHaveBeenCalledWith(ROUTES.OWNER_DASHBOARD.PATH);
    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
  });
});
