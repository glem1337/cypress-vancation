import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ROUTES from 'constants/routes';
import mockedFetchOwnerCampers from 'state/concepts/camper/__mocks__/fetchOwnerCampers';
import diveTo from 'utils/testHelpers/diveToEnzyme';

import Tabs, { TabsContainer } from '../container';

const layoutContainer = (props) => {
  const wrapper = shallow(<Tabs {...props} />);
  const container = diveTo(wrapper, TabsContainer);
  const instance = container.instance();

  return {
    container,
    instance,
  };
};

describe('Tabs component', () => {
  let container = null;
  let instance = null;
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    activeKey: ROUTES.OWNER_DASHBOARD.REPORTING.KEY,
    router: {
      query: {
        camper: mockedFetchOwnerCampers.data.data[0].id,
      },
    },
  };

  beforeEach(() => {
    ({ container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('test "hideItem" instance getter', () => {
    it('currentCamperId is not equal master view', () => {
      expect(instance.hideItem)
        .toEqual(ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.KEY);
    });

    it('currentCamperId is equal master view', () => {
      ({ container, instance } = layoutContainer({
        ...props,
        router: {},
      }));

      expect(instance.hideItem)
        .toEqual(ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.KEY);
    });
  });

  it('test "camperId" instance getter', () => {
    expect(instance.camperId).toEqual(mockedFetchOwnerCampers.data.data[0].id);
  });
});
