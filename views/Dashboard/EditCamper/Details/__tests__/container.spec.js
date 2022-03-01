import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import { fetchCamper } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';

import mockedCamper from 'views/__mocks__/camper';

import Details, { DetailsContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  isCamperExistSelector: jest.fn(() => true),
  camperSelector: jest.fn(() => mockedCamper),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<Details {...props} />, {
    disableLifecycleMethods: true,
  });
  const container = diveTo(wrapper, DetailsContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('Details container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    isValid: true,
    values: {
      listingName: '',
      listingDescription: '',
    },
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    ({ wrapper, container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      store,
      query: {
        camper: 'camperId',
      },
    };

    await DetailsContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenCalledWith(
      fetchCamper(ctx.query.camper, 'delivery_information'),
    );
  });

  describe('tests `canSaveAndContinue` instance getter', () => {
    it('when form is not valid', () => {
      const { canSaveAndContinue } = instance;

      expect(canSaveAndContinue).toBe(false);
    });

    it('when form is valid', () => {
      loadingSelector.mockReturnValueOnce(false);

      ({ instance } = layoutContainer({
        ...props,
        values: {
          listingName: 'test',
          listingDescription: '',
        },
      }));

      const { canSaveAndContinue } = instance;

      expect(canSaveAndContinue).toBe(true);
    });
  });
});
