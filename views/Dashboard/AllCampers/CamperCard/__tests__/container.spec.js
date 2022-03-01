import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import redirect from 'utils/redirect';
import {
  createCamperDetailsRoute,
  createRouteFromPathname,
} from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';
import { CAMPER_STATUS } from 'constants/camper';

import { showModal } from 'state/modal/actions';

import CamperCard, { CamperCardContainer } from '../container';

jest.mock('utils/redirect', () => jest.fn());

describe('CamperCard container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    id: 'camperId',
    publicId: 'publicId',
    status: 'status',
    title: 'title',
    place: 'place',
    description: 'description',
    modelNaming: 'modelNaming',
    rating: 100,
    showModal: jest.fn(),
  };

  const wrapper = shallow(<CamperCard {...props} />);
  const container = diveTo(wrapper, CamperCardContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('test onEditClickHandler', () => {
    instance.onEditClickHandler();

    expect(redirect).toHaveBeenCalledWith(
      createRouteFromPathname(
        ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.PATH,
        null,
        {
          camper: props.id,
        },
      ),
    );
  });

  it('test onPublishClickHandler', () => {
    instance.onPublishClickHandler();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CAMPER_STATUS_MODAL',
        modalProps: {
          camperId: props.id,
          status: CAMPER_STATUS.PUBLISHED,
        },
      }),
    );
  });

  it('test onUnpublishClickHandler', () => {
    instance.onUnpublishClickHandler();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CAMPER_STATUS_MODAL',
        modalProps: {
          camperId: props.id,
          status: CAMPER_STATUS.UNPUBLISHED,
        },
      }),
    );
  });

  it('test onRemoveClickHandler', () => {
    instance.onRemoveClickHandler();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CAMPER_STATUS_MODAL',
        modalProps: {
          camperId: props.id,
          status: CAMPER_STATUS.REMOVED,
        },
      }),
    );
  });

  it('test onPreviewClickHandler', () => {
    instance.onPreviewClickHandler();

    const model = props.modelNaming.toLowerCase().split(' ').join('-');

    expect(redirect).toHaveBeenCalledWith(
      createCamperDetailsRoute({ model, id: props.id }),
    );
  });
});
