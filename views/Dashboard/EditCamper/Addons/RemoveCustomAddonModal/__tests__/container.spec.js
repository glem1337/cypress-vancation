import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { deleteCamperCustomTravelAccessory } from 'state/concepts/camper/actions';

import RemoveCustomAddonModal, {
  RemoveCustomAddonModalContainer,
} from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('RemoveCustomAddonModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    addonId: '1',
    camperId: '2',
    index: 0,
    onRemove: jest.fn(),
    onClose: jest.fn(),
  };

  const wrapper = shallow(<RemoveCustomAddonModal {...props} />);
  const container = diveTo(wrapper, RemoveCustomAddonModalContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('checks `handleRemove` instance method', () => {
    it('when addon id is present', () => {
      instance.handleRemove();

      expect(store.dispatch).toHaveBeenCalledWith(
        deleteCamperCustomTravelAccessory({
          addonId: props.addonId,
          camperId: props.camperId,
        }),
      );
    });

    it('when addon id isn`t present', () => {
      container.setProps({ ...props, addonId: null });

      instance.handleRemove();

      expect(props.onRemove).toHaveBeenCalledWith(props.index);
    });
  });
});
