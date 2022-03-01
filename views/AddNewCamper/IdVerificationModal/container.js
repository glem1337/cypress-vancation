import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import ROUTES from 'constants/routes';
import { hideModal as hideModalAction } from 'state/modal/actions';

import IdVerificationModalComponent from './component';

class IdVerificationModal extends React.Component {
  static propTypes = {
    router: PropTypes.shape().isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  navigateToHomePage = () => {
    const {
      router,
      hideModal,
    } = this.props;

    router.push(ROUTES.OWNER_DASHBOARD.PATH);

    hideModal();
  }

  render() {
    return (
      <IdVerificationModalComponent
        {...this.props}
        navigateToHomePage={this.navigateToHomePage}
      />
    );
  }
}

const mapDispatchToProps = {
  hideModal: hideModalAction,
};

export { IdVerificationModal as IdVerificationModalContainer };
export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(IdVerificationModal);
