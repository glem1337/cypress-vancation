import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';
import {
  setOwnerCampersPage,
  fetchOwnerCampers,
  setOwnerCampersStatusFilter,
  setOwnerCampersSearch,
} from 'state/concepts/camper/actions';

import { OWNER_CAMPER_PAGINATION_DEFAULT as mockedPagination } from 'constants/dashboard';

import mockedCamper from 'views/__mocks__/camper';
import mockedOwnerCamperCard from '../../__mocks__/ownerCamperCard';
import DashboardAllCampers, {
  DashboardAllCampersContainer,
} from '../container';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    session: {
      currentUser: {
        email: 'test@gmail.com',
        user: {
          lastName: 'lastName_test',
          firstName: 'firstName_test',
          avatarUrl: 'test_url',
        },
      },
    },
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  ownerCampersPaginationSelector: jest.fn(() => ({
    number: mockedPagination.NUMBER,
    size: mockedPagination.SIZE,
    total: mockedPagination.TOTAL,
  })),
  ownerCampersCardSelector: jest.fn(() => mockedOwnerCamperCard),
  camperSelector: jest.fn(() => mockedCamper),
  ownerCampersFilterSelector: jest.fn(() => ({
    status: 'all',
    search: '',
  })),
}));

jest.useFakeTimers();

const layoutContainer = (props) => {
  const wrapper = shallow(<DashboardAllCampers {...props} />);
  const container = diveTo(wrapper, DashboardAllCampersContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('DashboardAllCampers container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      query: {
        camper: 'camperId',
      },
    },
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({ container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('tests "getInitialProps" static method', () => {
    const ctx = {
      store,
    };

    it('should fetch specifications', async () => {
      await DashboardAllCampersContainer.getInitialProps(ctx);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, fetchSelf());
    });

    it('should not fetch specifications', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      await DashboardAllCampersContainer.getInitialProps(ctx);

      expect(store.dispatch).not.toHaveBeenCalledWith(fetchSelf());
    });
  });

  describe('tests "handlerPagination" instance method', () => {
    it('page is equal current page', () => {
      instance.handlerPagination(1);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('page is not equal current page', () => {
      instance.handlerPagination(2);

      expect(store.dispatch).toHaveBeenCalledTimes(2);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, setOwnerCampersPage(2));

      expect(store.dispatch).toHaveBeenNthCalledWith(2, fetchOwnerCampers());
    });
  });

  it('tests "onStatusChangeHandler" instance method', () => {
    instance.onStatusChangeHandler({ target: { value: 'published' } });

    expect(store.dispatch).toHaveBeenCalledTimes(3);

    expect(store.dispatch).toHaveBeenNthCalledWith(1, setOwnerCampersStatusFilter('published'));

    expect(store.dispatch).toHaveBeenNthCalledWith(2, setOwnerCampersPage(1));

    expect(store.dispatch).toHaveBeenNthCalledWith(3, fetchOwnerCampers());
  });

  it('tests "onSearchChangeHandler" instance method', () => {
    instance.onSearchChangeHandler({ target: { value: 'search' } });

    jest.runAllTimers();

    expect(store.dispatch).toHaveBeenCalledTimes(3);

    expect(store.dispatch).toHaveBeenNthCalledWith(1, setOwnerCampersSearch('search'));

    expect(store.dispatch).toHaveBeenNthCalledWith(2, setOwnerCampersPage(1));

    expect(store.dispatch).toHaveBeenNthCalledWith(3, fetchOwnerCampers());
  });

  describe('test campers instance getter', () => {
    it('when specific camper selected', () => {
      expect(instance.campers.length).toBe(1);
    });

    it('when specific camper isn`t selected', () => {
      const newProps = {
        ...props,
        router: {
          query: {},
        },
      };
      const { instance: newInstance } = layoutContainer(newProps);
      expect(newInstance.campers.length).toBeGreaterThanOrEqual(1);
    });
  });
});
