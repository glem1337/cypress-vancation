import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import ROUTES from 'constants/routes';
import {
  MAX_DESCRIPTION_VISIBLE_SYMBOLS,
  RATING_BOUNDARIES,
} from 'constants/camperDetails/owner';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import redirect from 'utils/redirect';

import { showModal } from 'state/modal/actions';
import { fetchCamperOwner } from 'state/concepts/camper/actions';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';

import mockedCamper from 'views/__mocks__/camper';
import OwnerProfile, { OwnerProfileContainer } from '../container';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock(
  'utils/hocs/withIntersectionObserver',
  () => () => (Component) => (props) => <Component onRef={jest.fn()} isVisible {...props} />,
);

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/session/selectors', () => ({
  isUserLoggedInSelector: jest.fn(() => true),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<OwnerProfile {...props} />);
  const container = diveTo(wrapper, OwnerProfileContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  return {
    container,
    instance,
    setStateSpy,
  };
};

describe('OwnerProfile container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    ({ container, instance, setStateSpy } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('default', () => {
      instance.componentDidUpdate();

      expect(store.dispatch).toHaveBeenCalledWith(
        fetchCamperOwner(props.camperId),
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

  it('checks `toggleDescription` instance method', () => {
    instance.toggleDescription();

    expect(container.state().allDescriptionVisible).toBe(true);

    instance.toggleDescription();

    expect(container.state().allDescriptionVisible).toBe(false);
  });

  describe('checks `description` instance getter', () => {
    it('should return not truncated description', () => {
      const expected = R.pathOr('', ['owner', 'description'], mockedCamper);

      expect(instance.description).toEqual(expected);
    });

    it('should return truncated description', () => {
      container.setProps({
        ...props,
        camper: {
          ...mockedCamper,
          owner: {
            ...mockedCamper.owner,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essenti",
          },
        },
      });

      const { camper } = container.props();

      const description = R.pathOr('', ['owner', 'description'], camper);

      const expected = `${description.substring(
        0,
        MAX_DESCRIPTION_VISIBLE_SYMBOLS,
      )}...`;

      expect(instance.description).toBe(expected);
    });
  });

  describe('checks `onAskQuestionClickHandler` instance method', () => {
    it('should show modal', () => {
      instance.onAskQuestionClickHandler();

      const { businessTitle } = instance.owner;

      const placeholder = businessTitle || instance.fullName.join(' ');

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'ASK_QUESTION_MODAL',
          modalProps: {
            camperId: props.camperId,
            placeholder,
          },
        }),
      );
    });

    it('should redirect', () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      const { instance: newInstance } = layoutContainer(props);

      newInstance.onAskQuestionClickHandler();

      expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN.PATH);
    });
  });

  it('checks `owner` instance getter', () => {
    const expected = R.pathOr({}, ['owner'], mockedCamper);

    expect(instance.owner).toEqual(expected);
  });

  it('checks `fullName` instance getter', () => {
    const expected = [
      R.pathOr('', ['account', 'user', 'firstName'], instance.owner),
      R.pathOr('', ['account', 'user', 'lastName'], instance.owner),
    ];

    expect(instance.fullName).toEqual(expected);
  });

  it('checks `ratingProps` instance getter', () => {
    const { averageRating } = instance.owner;

    const expected = {
      isHigh: averageRating >= RATING_BOUNDARIES.HIGH,
      isNormal:
        averageRating >= RATING_BOUNDARIES.NORMAL.START
        && averageRating <= RATING_BOUNDARIES.NORMAL.END,
      isMiddle:
        averageRating >= RATING_BOUNDARIES.MIDDLE.START
        && averageRating <= RATING_BOUNDARIES.MIDDLE.END,
      isLow: averageRating <= RATING_BOUNDARIES.LOW,
    };

    expect(instance.ratingProps).toEqual(expected);
  });
});
