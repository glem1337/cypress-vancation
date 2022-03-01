import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { createCamperCalendarExportLink } from 'state/concepts/camper/actions';

import ExportCalendarSection, {
  ExportCalendarSectionContainer,
} from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('ExportCalendarSection container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  const wrapper = shallow(<ExportCalendarSection {...props} />);
  const container = diveTo(wrapper, ExportCalendarSectionContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('checks `onExport` instance method', () => {
    instance.onExport();

    expect(store.dispatch).toHaveBeenCalledWith(
      createCamperCalendarExportLink('camperId'),
    );
  });
});
