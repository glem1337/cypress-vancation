import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import DiscountCodes, { DiscountCodesContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('Map Container', () => {
  let container;
  let wrapper;

  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
  };

  beforeEach(() => {
    wrapper = shallow(<DiscountCodes {...props} />);
    container = diveTo(wrapper, DiscountCodesContainer);

    jest.clearAllMocks();
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });
});
