import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { showMessage } from 'state/flash-messages/actions';

import ExportModal, { ExportModalContainer } from '../container';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('ExportModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    url: 'test/url',
    showMessage: jest.fn(),
    onClose: jest.fn(),
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<ExportModal {...props} />, {
      disableLifecycleMethods: false,
    });
    container = diveTo(wrapper, ExportModalContainer);
    instance = container.instance();
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `onCopyHandler` instance method', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    await instance.onCopyHandler();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.url);
    expect(store.dispatch).toHaveBeenCalledWith(
      showMessage({
        messageSubTitle: { id: 'shared.copied' },
      }),
    );
  });
});
