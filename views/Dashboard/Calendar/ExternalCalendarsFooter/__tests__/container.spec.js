import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { toggleCalendarFooter } from 'state/concepts/calendar/actions';

import ExternalCalendarsFooter, {
  ExternalCalendarsFooterContainer,
} from '../container';

describe('ExternalCalendarsFooter container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    toggleCalendarFooter: jest.fn(),
    camperId: 'camperId',
  };

  const wrapper = shallow(<ExternalCalendarsFooter {...props} />);
  const container = diveTo(wrapper, ExternalCalendarsFooterContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `toggleFooter` instance method', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    instance.toggleFooter(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(toggleCalendarFooter());
  });
});
