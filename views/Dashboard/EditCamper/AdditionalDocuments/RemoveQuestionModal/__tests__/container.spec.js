import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { deleteCamperQuestion } from 'state/concepts/camper/actions';

import RemoveQuestionModal, {
  RemoveQuestionModalContainer,
} from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<RemoveQuestionModal {...props} />, {
    disableLifecycleMethods: true,
  });
  const container = diveTo(wrapper, RemoveQuestionModalContainer);
  const instance = container.instance();

  return {
    wrapper,
    instance,
  };
};

describe('RemoveQuestionModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    index: 0,
    camperId: '1',
    questionId: '2',
    onRemove: jest.fn(),
    onClose: jest.fn(),
  };

  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    ({ wrapper, instance } = layoutContainer(props));
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('checks `handleRemove` instance method', () => {
    it('when question id is present', () => {
      instance.handleRemove();

      expect(store.dispatch).toHaveBeenCalledWith(
        deleteCamperQuestion({
          questionId: props.questionId,
          camperId: props.camperId,
        }),
      );
    });

    it('when question id isn`t present', () => {
      const newProps = { ...props, questionId: null };
      const { instance: newInstance } = layoutContainer(newProps);

      newInstance.handleRemove();

      expect(props.onRemove).toHaveBeenCalledWith(props.index);
    });
  });
});
