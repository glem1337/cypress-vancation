import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteCamperCustomTravelAccessory } from 'state/concepts/camper/actions';
import { deleteCamperCustomTravelAccessoriesEndpoint } from 'state/concepts/camper/endpoints';
import { loadingSelector } from 'state/data/selectors';

import RemoveCustomAddonModalComponent from './component';

class RemoveCustomAddonModal extends React.Component {
  static defaultProps = {
    addonId: null,
  };

  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    camperId: PropTypes.string.isRequired,
    addonId: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  handleRemove = () => {
    const {
      onRemove,
      index,
      addonId,
      camperId,
      onSubmit,
    } = this.props;

    if (addonId) {
      onSubmit({ addonId, camperId });
    } else {
      onRemove(index);
    }
  };

  render() {
    return (
      <RemoveCustomAddonModalComponent
        {...this.props}
        submitHandler={this.handleRemove}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(
    state,
    deleteCamperCustomTravelAccessoriesEndpoint.endpoint,
  ),
});

const mapDispatchToProps = {
  onSubmit: deleteCamperCustomTravelAccessory,
};

export { RemoveCustomAddonModal as RemoveCustomAddonModalContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemoveCustomAddonModal);
