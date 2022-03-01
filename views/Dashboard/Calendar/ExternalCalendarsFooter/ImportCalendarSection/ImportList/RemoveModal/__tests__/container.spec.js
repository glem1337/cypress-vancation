import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { deleteCamperExternalCalendar } from 'state/concepts/camper/actions';

import RemoveModal, { RemoveModalContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('RemoveModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
    calendarId: 'calendarId',
    onDelete: jest.fn(),
    onClose: jest.fn(),
  };

  const wrapper = shallow(<RemoveModal {...props} />);
  const container = diveTo(wrapper, RemoveModalContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `handleRemove` instance method', () => {
    instance.handleRemove();

    expect(store.dispatch).toHaveBeenCalledWith(
      deleteCamperExternalCalendar({
        calendarId: props.calendarId,
        camperId: props.camperId,
      }),
    );
  });
});
