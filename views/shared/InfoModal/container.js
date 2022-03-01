import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import { hideModal } from 'state/modal/actions';

import InfoModalComponent from './component';
import { INFO_MODAL_ICON_TYPE } from './types';

class InfoModal extends React.Component {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
  }

  get iconData() {
    const { iconType } = this.props;

    const color = R.cond([
      [
        R.equals(INFO_MODAL_ICON_TYPE.SUCCESS),
        R.always('in-green-1000'),
      ],
      [
        R.equals(INFO_MODAL_ICON_TYPE.ERROR),
        R.always('in-red-1000'),
      ],
      [
        R.equals(INFO_MODAL_ICON_TYPE.WARNING),
        R.always('in-yellow-1000'),
      ],
      [
        R.T,
        R.always('in-gray-500'),
      ],
    ])(iconType);

    const view = iconType === INFO_MODAL_ICON_TYPE.SUCCESS
      ? 'icon-checked'
      : 'icon-alert';

    return {
      color,
      view,
    };
  }

  render() {
    return (
      <InfoModalComponent
        {...this.props}
        iconData={this.iconData}
      />
    );
  }
}

const mapDispatchToProps = {
  hideModal,
};

export { InfoModal as InfoModalContainer };
export default connect(null, mapDispatchToProps)(InfoModal);
