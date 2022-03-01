import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { filterUsers } from 'state/concepts/users/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import UsersFiltersWrapped, { UsersFiltersContainer } from '../container';

jest.mock('state/concepts/users/actions', () => ({
  filterUsers: jest.fn(),
}));

jest.mock('state/concepts/users/selectors', () => ({
  appliedFilters: () => ['user', 'active'],
  filtersSelector: () => ({
    roles: ['user'],
    statuses: ['active'],
  }),
}));

describe('UsersFilters container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const wrapper = shallow(
    <UsersFiltersWrapped
      store={store}
    />,
  );
  const container = diveTo(wrapper, UsersFiltersContainer);
  const instance = container.instance();

  it('renders UsersFilters component', () => {
    expect(container).toMatchSnapshot();
  });

  it('handleReset()', () => {
    const handleCloseSpy = jest.spyOn(instance, 'handleClose');
    instance.handleReset();

    expect(filterUsers).toHaveBeenCalledWith({ roles: [], statuses: [] });
    expect(handleCloseSpy).toHaveBeenCalled();
  });

  it('handleSubmit()', () => {
    const handleCloseSpy = jest.spyOn(instance, 'handleClose');
    instance.handleSubmit();

    expect(filterUsers).toHaveBeenCalledWith({
      roles: ['user'],
      statuses: ['active'],
    });
    expect(handleCloseSpy).toHaveBeenCalled();
  });

  it('handleClose()', () => {
    const resetFormSpy = jest.fn();
    container.setProps('resetForm', resetFormSpy);

    instance.handleClose();

    expect(instance.state.isOpen).toEqual(false);
    expect(resetFormSpy).toHaveBeenCalled();
  });

  it('handleOpen()', () => {
    instance.handleOpen();

    expect(instance.state.isOpen).toEqual(true);
  });

  it('handleVisibleChange()', () => {
    const handleCloseSpy = jest.spyOn(instance, 'handleClose');
    const handleOpenSpy = jest.spyOn(instance, 'handleOpen');

    instance.handleVisibleChange(true);
    expect(handleOpenSpy).toHaveBeenCalled();

    instance.handleVisibleChange(false);
    expect(handleCloseSpy).toHaveBeenCalled();
  });
});
