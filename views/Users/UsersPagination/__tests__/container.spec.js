import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { setCurrentPage, fetchUsers } from 'state/concepts/users/actions';

import UsersPaginationWrapped, { UsersPaginationContainer } from '../container';

jest.mock('state/concepts/users/actions', () => ({
  fetchUsers: jest.fn(),
  setCurrentPage: jest.fn(),
}));

jest.mock('state/concepts/users/selectors', () => ({
  currentPageSelector: () => 1,
}));

jest.mock('state/data/selectors', () => ({
  pageCountSelector: () => 10,
}));

describe('UsersPagination container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const wrapper = shallow(<UsersPaginationWrapped store={store} />);
  const container = diveTo(wrapper, UsersPaginationContainer);

  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('onChange()', () => {
    container.find('Pagination').props().onChange({ selected: 1 });
    expect(setCurrentPage).toHaveBeenCalledWith(2);
    expect(fetchUsers).toHaveBeenCalledWith();
  });
});
