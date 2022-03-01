import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { estimateEarningDataSelector, camperSelector } from 'state/concepts/camper/selectors';
import { clearEstimateEarningData, setEstimateEarningState } from 'state/concepts/camper/actions';
import mockedCamper from 'views/__mocks__/camper';
import EstimatedEarningCard, { EstimatedEarningCardContainer } from '../container';
import mockedEstimateEarning from '../__mocks__/estimateEarning';

jest.mock('state/concepts/camper/selectors', () => ({
  estimateEarningDataSelector: jest.fn(() => null),
  camperSelector: jest.fn(() => null),
  estimateEarningStateSelector: jest.fn(() => false),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<EstimatedEarningCard {...props} />);
  const container = diveTo(wrapper, EstimatedEarningCardContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('EstimatedEarningCard Container', () => {
  let container = null;
  let instance = null;
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      push: jest.fn(),
      query: {
        camper_id: 'test',
      },
    },
  };

  beforeEach(() => {
    ({
      container,
      instance,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('container snapshot', () => {
    camperSelector.mockReturnValueOnce(mockedCamper);
    estimateEarningDataSelector.mockReturnValueOnce(mockedEstimateEarning);

    ({ container } = layoutContainer(props));

    expect(container).toMatchSnapshot();
  });

  it('tests "handlerClose" instance method', () => {
    instance.handlerClose();

    expect(store.dispatch).toHaveBeenCalledWith(setEstimateEarningState(false));
  });

  describe('tests "componentDidMount" instance method', () => {
    it('estimateEarningData is empty', () => {
      instance.componentDidMount();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('estimateEarningData is not empty', () => {
      estimateEarningDataSelector.mockReturnValueOnce(mockedEstimateEarning);

      ({ instance } = layoutContainer(props));

      instance.componentDidMount();

      expect(store.dispatch).toHaveBeenCalledWith(clearEstimateEarningData());
    });
  });

  describe('test "content" instance getter', () => {
    it('estimateEarningSelector is not empty ', () => {
      estimateEarningDataSelector.mockReturnValueOnce(mockedEstimateEarning);

      ({ instance } = layoutContainer(props));

      expect(instance.content).toEqual(mockedEstimateEarning);
    });

    it('estimateEarningSelector is empty', () => {
      camperSelector.mockReturnValueOnce(mockedCamper);

      ({ instance } = layoutContainer(props));

      expect(instance.content).toEqual({
        estimatedEarning: mockedCamper.estimatedEarning,
        iconUrl: mockedCamper.vehicleTypeIconUrl,
        name: mockedCamper.vehicleTypeName,
      });
    });

    it('estimateEarningSelector, camperSelector are empty ', () => {
      expect(instance.content).toEqual(null);
    });
  });
});
