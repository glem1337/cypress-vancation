import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { DEFAULT_VALUES } from 'constants/camperTripFees';

import isPresent from 'utils/isPresent';

import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import TripFeesComponent from './component';

class TripFees extends React.Component {
  static defaultProps = {
    camper: null,
  };

  static propTypes = {
    camper: PropTypes.shape(),
  };

  get isMileageLimited() {
    const { camper } = this.props;

    return R.pathOr(false, ['tripFee', 'tripFeeMileage', 'limit'], camper);
  }

  get availableMiles() {
    const { camper } = this.props;

    return R.pathOr(
      DEFAULT_VALUES.MILEAGE.INCLUDED,
      ['tripFee', 'tripFeeMileage', 'available'],
      camper,
    );
  }

  get overageMiles() {
    const { camper } = this.props;

    return R.pathOr(
      DEFAULT_VALUES.MILEAGE.OVERAGE,
      ['tripFee', 'tripFeeMileage', 'overage'],
      camper,
    );
  }

  get hasGenerator() {
    const { camper } = this.props;

    return isPresent(camper?.tripFee?.tripFeeGenerator);
  }

  get isGeneratorLimited() {
    const { camper } = this.props;

    return R.pathOr(false, ['tripFee', 'tripFeeGenerator', 'limit'], camper);
  }

  get availableGeneratorHours() {
    const { camper } = this.props;

    return R.pathOr(
      DEFAULT_VALUES.GENERATOR.INCLUDED,
      ['tripFee', 'tripFeeGenerator', 'available'],
      camper,
    );
  }

  get overageGenerator() {
    const { camper } = this.props;

    return R.pathOr(
      DEFAULT_VALUES.GENERATOR.OVERAGE,
      ['tripFee', 'tripFeeGenerator', 'overage'],
      camper,
    );
  }

  get cleaningFee() {
    const { camper } = this.props;

    return R.pathOr(0, ['tripFee', 'cleaning'], camper);
  }

  get dumpingFee() {
    const { camper } = this.props;

    return R.pathOr(0, ['tripFee', 'dumpingFee'], camper);
  }

  get fuelFee() {
    const { camper } = this.props;

    return R.pathOr(0, ['tripFee', 'flue'], camper);
  }

  get lateDropOff() {
    const { camper } = this.props;

    return R.pathOr(0, ['tripFee', 'lateDropOff'], camper);
  }

  get customFees() {
    const { camper } = this.props;

    return R.pathOr([], ['tripFee', 'customFees'], camper);
  }

  get ownerFeesIsPresent() {
    const {
      cleaningFee,
      dumpingFee,
      fuelFee,
      lateDropOff,
      customFees,
    } = this;

    return Boolean(
      cleaningFee
        || dumpingFee
        || fuelFee
        || lateDropOff
        || isPresent(customFees),
    );
  }

  render() {
    return (
      <TripFeesComponent
        {...this.props}
        isMileageLimited={this.isMileageLimited}
        availableMiles={this.availableMiles}
        overageMiles={this.overageMiles}
        hasGenerator={this.hasGenerator}
        isGeneratorLimited={this.isGeneratorLimited}
        availableGeneratorHours={this.availableGeneratorHours}
        overageGenerator={this.overageGenerator}
        cleaningFee={this.cleaningFee}
        dumpingFee={this.dumpingFee}
        fuelFee={this.fuelFee}
        lateDropOff={this.lateDropOff}
        customFees={this.customFees}
        ownerFeesIsPresent={this.ownerFeesIsPresent}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

export { TripFees as TripFeesContainer };
export default connect(mapStateToProps)(TripFees);
