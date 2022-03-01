import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Router from 'next/router';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { showModal } from 'state/modal/actions';
import UsersTableActionsWrapped, { UsersTableActionsContainer } from '../container';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  showModal: jest.fn(),
}));

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: () => ({ roleName: 'user' }),
}));

describe('UsersTableActions container', () => {
  const store = configureStore()({});
  const user = { id: 'id' };
  store.dispatch = jest.fn();

  const wrapper = shallow(<UsersTableActionsWrapped store={store} user={user} />);
  const container = diveTo(wrapper, UsersTableActionsContainer);

  it('renders UsersTableActions component', () => {
    expect(container).toMatchSnapshot();
  });

  it('showActionModal()', () => {
    const event = { preventDefault: jest.fn() };

    container.instance().showActionModal('DELETE_MODAL')(event);
    expect(showModal).toHaveBeenCalledWith({
      modalProps: { user: { id: 'id' } },
      modalType: 'DELETE_MODAL',
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handleEdit()', () => {
    const event = { preventDefault: jest.fn() };
    container.instance().handleEdit(event);

    expect(Router.push).toHaveBeenCalledWith('/users/[userId]', '/users/id');
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
