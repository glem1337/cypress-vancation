import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { showModal } from 'state/modal/actions';

import ImportCalendarSectionWrapper, {
  ImportCalendarSectionContainer,
} from '../container';

jest.mock('state/concepts/calendar/selectors', () => ({
  externalCalendarIdsSelector: jest.fn(() => (['id'])),
}));

describe('ImportCalendarSection container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    showModal: jest.fn(),
    camperId: 'camperId',
  };

  const wrapper = shallow(<ImportCalendarSectionWrapper {...props} />);
  const container = diveTo(wrapper, ImportCalendarSectionContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('test `showImportModal` instance method', () => {
    instance.showImportModal();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CALENDAR_IMPORT_MODAL',
        modalProps: {
          camperId: 'camperId',
        },
      }),
    );
  });
});
