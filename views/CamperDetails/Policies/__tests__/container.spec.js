import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { CANCELLATION_POLICY_DESCRIPTION_BY_VALUE } from 'constants/camper';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { fetchCamperPolicies } from 'state/concepts/camper/actions';

import mockedCamper from 'views/__mocks__/camper';
import Policies, { PoliciesContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

jest.mock(
  'utils/hocs/withIntersectionObserver',
  () => () => (Component) => (props) => <Component onRef={jest.fn()} isVisible {...props} />,
);

describe('Policies container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let wrapper = null;
  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    wrapper = shallow(<Policies {...props} />);
    container = diveTo(wrapper, PoliciesContainer);
    instance = container.instance();

    setStateSpy = jest.spyOn(instance, 'setState');

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('default', () => {
      instance.componentDidUpdate();

      expect(store.dispatch).toHaveBeenCalledWith(
        fetchCamperPolicies(props.camperId),
      );
      expect(setStateSpy).toHaveBeenCalledWith({
        initialized: true,
      });
    });

    it('when no possibility to fetch data', () => {
      container.setProps({
        isVisible: false,
        isCamperExist: false,
      });

      instance.componentDidUpdate();

      expect(store.dispatch).not.toHaveBeenCalled();
      expect(setStateSpy).not.toHaveBeenCalled();
    });
  });

  it('checks `cancellationPolicy` instance getter', () => {
    const key = mockedCamper.camperRule.cancellationPolicy;

    const expected = CANCELLATION_POLICY_DESCRIPTION_BY_VALUE[key];

    expect(instance.cancellationPolicy).toEqual(expected);
  });
});
