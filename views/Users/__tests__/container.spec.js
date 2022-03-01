import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { fetchUsers } from 'state/concepts/users/actions';
import { showModal } from 'state/modal/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import UsersWrapped, { UsersContainer } from '../container';

jest.mock('state/concepts/users/actions', () => ({
  fetchUsers: jest.fn(() => 'Test Action'),
  filterUsers: jest.fn(),
}));

jest.mock('state/concepts/users/selectors', () => ({
  usersSelector: () => [],
  searchQuerySelector: () => '',
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: () => false,
  totalCountSelector: () => 10,
}));

jest.mock('state/modal/actions', () => ({
  showModal: jest.fn(),
}));

describe('Users container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const wrapper = shallow(<UsersWrapped store={store} />);
  const container = diveTo(wrapper, UsersContainer);

  beforeEach(() => {
    fetchUsers.mockClear();
    store.dispatch.mockClear();
  });

  it('renders Users component', () => {
    expect(container).toMatchSnapshot();
  });

  describe('getInitialProps()', () => {
    it('it fetches users', () => {
      UsersContainer.getInitialProps({ store });
      expect(fetchUsers).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(fetchUsers());
    });
  });

  describe('handleInvitationModalOpen()', () => {
    it('call showModal with modalType', () => {
      container.instance().handleInvitationModalOpen();

      expect(showModal).toHaveBeenCalledWith({ modalType: 'INVITATION_MODAL' });
    });
  });
});
