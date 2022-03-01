import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { fetchUsers, setSortOrder } from 'state/concepts/users/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import UsersTableCellHeadWrapped, { UsersTableCellHeadContainer } from '../container';

jest.mock('state/concepts/users/actions', () => ({
  fetchUsers: jest.fn(),
  setSortOrder: jest.fn(),
}));

jest.mock('state/concepts/users/selectors', () => ({
  sortSelector: () => ({ sortKey: 'name', direction: 'desc' }),
}));

describe('UsersTableCellHead container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const wrapper = shallow(<UsersTableCellHeadWrapped store={store} text={{ id: 'shared.ok' }} />);
  const container = diveTo(wrapper, UsersTableCellHeadContainer);

  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it('renders UsersTableCellHead component', () => {
    expect(container).toMatchSnapshot();
  });

  describe('handleSort()', () => {
    it('call handleSort with sortKey', () => {
      container.instance().handleSort('name')();

      expect(fetchUsers).toHaveBeenCalled();
      expect(setSortOrder).toHaveBeenCalledWith('name');
    });
  });
});
