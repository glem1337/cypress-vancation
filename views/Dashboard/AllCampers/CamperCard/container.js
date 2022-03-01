import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import redirect from 'utils/redirect';
import {
  createCamperDetailsRoute,
  createRouteFromPathname,
} from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';
import { CAMPER_STATUS } from 'constants/camper';

import { showModal as showModalAction } from 'state/modal/actions';

import CamperCardComponent from './component';

class CamperCard extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    modelNaming: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
  };

  onEditClickHandler = () => {
    const { id } = this.props;

    redirect(
      createRouteFromPathname(
        ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.PATH,
        null,
        {
          camper: id,
        },
      ),
    );
  };

  onPublishClickHandler = () => {
    const { showModal, id } = this.props;

    showModal({
      modalType: 'CAMPER_STATUS_MODAL',
      modalProps: {
        camperId: id,
        status: CAMPER_STATUS.PUBLISHED,
      },
    });
  };

  onUnpublishClickHandler = () => {
    const { showModal, id } = this.props;

    showModal({
      modalType: 'CAMPER_STATUS_MODAL',
      modalProps: {
        camperId: id,
        status: CAMPER_STATUS.UNPUBLISHED,
      },
    });
  };

  onRemoveClickHandler = () => {
    const { showModal, id } = this.props;

    showModal({
      modalType: 'CAMPER_STATUS_MODAL',
      modalProps: {
        camperId: id,
        status: CAMPER_STATUS.REMOVED,
      },
    });
  };

  onPreviewClickHandler = () => {
    const { id, modelNaming } = this.props;

    const model = modelNaming.toLowerCase().split(' ').join('-');

    redirect(createCamperDetailsRoute({ model, id }));
  };

  render() {
    return (
      <CamperCardComponent
        onPublish={this.onPublishClickHandler}
        onUnpublish={this.onUnpublishClickHandler}
        onPreview={this.onPreviewClickHandler}
        onRemove={this.onRemoveClickHandler}
        onEdit={this.onEditClickHandler}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = {
  showModal: showModalAction,
};

export { CamperCard as CamperCardContainer };
export default connect(null, mapDispatchToProps)(CamperCard);
