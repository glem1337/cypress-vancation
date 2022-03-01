import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { deleteCamperDocument } from 'state/concepts/camper/actions';

import RemoveDocumentModal, {
  RemoveDocumentModalContainer,
} from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<RemoveDocumentModal {...props} />, {
    disableLifecycleMethods: true,
  });
  const container = diveTo(wrapper, RemoveDocumentModalContainer);
  const instance = container.instance();

  return {
    wrapper,
    instance,
  };
};

describe('RemoveDocumentModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    listId: '1',
    documentId: '2',
    camperId: '3',
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
    it('when document id is present', () => {
      instance.handleRemove();

      expect(store.dispatch).toHaveBeenCalledWith(
        deleteCamperDocument({
          documentId: props.documentId,
          camperId: props.camperId,
        }),
      );
    });

    it('when document id isn`t present', () => {
      const newProps = { ...props, documentId: null };
      const { instance: newInstance } = layoutContainer(newProps);

      newInstance.handleRemove();

      expect(props.onRemove).toHaveBeenCalledWith(props.listId);
    });
  });
});
