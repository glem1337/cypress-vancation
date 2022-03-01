import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { AVAILABILITY_MODE } from 'constants/calendar';
import { setAvailabilityMode as setAvailabilityModeAction } from 'state/concepts/calendar/actions';
import { availabilityModeSelector, selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import { createCalendarBlockedPeriodsEndpoint, deleteCalendarBlockedPeriodsEndpoint } from 'state/concepts/camper/endpoints';
import {
  createBlockedPeriods as createBlockedPeriodsAction,
  deleteBlockedPeriods as deleteBlockedPeriodsAction,
} from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';

import CalendarAvailabilityComponent from './component';

class CalendarAvailability extends React.Component {
  static propTypes = {
    setAvailabilityMode: PropTypes.func.isRequired,
    availabilityMode: PropTypes.string.isRequired,
    createBlockedPeriods: PropTypes.func.isRequired,
    deleteBlockedPeriods: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    selectedSlots: PropTypes.shape().isRequired,
    isBlockedLoading: PropTypes.bool,
    isUnBlockedLoading: PropTypes.bool,
  }

  static defaultProps = {
    isBlockedLoading: false,
    isUnBlockedLoading: false,
  }

  state = {
    isBlockedPopoverVisible: false,
    isUnBlockedPopoverVisible: false,
  }

  changeAvailabilityMode = (mode) => () => {
    const { setAvailabilityMode } = this.props;

    setAvailabilityMode(mode);
  }

  blockReject = () => {
    this.setState({ isBlockedPopoverVisible: false });
  }

  blockConfirm = () => {
    const { setAvailabilityMode, createBlockedPeriods, camperId, selectedSlots } = this.props;

    this.setState({ isBlockedPopoverVisible: false });
    setAvailabilityMode(AVAILABILITY_MODE.BLOCKED);

    createBlockedPeriods({
      camperId,
      startDate: R.head(selectedSlots.slots),
      endDate: R.last(selectedSlots.slots),
    });
  }

  blockPrepare = () => {
    const { isUnBlockedPopoverVisible, isBlockedPopoverVisible } = this.state;
    const { isBlockedLoading, isUnBlockedLoading } = this.props;

    if (
      isUnBlockedPopoverVisible
      || isBlockedPopoverVisible
      || isBlockedLoading
      || isUnBlockedLoading
    ) {
      return;
    }

    this.setState({ isBlockedPopoverVisible: true });
  }

  unBlockReject = () => {
    this.setState({ isUnBlockedPopoverVisible: false });
  }

  unBlockConfirm = () => {
    const { setAvailabilityMode, deleteBlockedPeriods, camperId, selectedSlots } = this.props;

    this.setState({ isUnBlockedPopoverVisible: false });
    setAvailabilityMode(AVAILABILITY_MODE.AVAILABLE);

    deleteBlockedPeriods({
      camperId,
      startDate: R.head(selectedSlots.slots),
      endDate: R.last(selectedSlots.slots),
    });
  }

  unBlockPrepare = () => {
    const { isUnBlockedPopoverVisible, isBlockedPopoverVisible } = this.state;
    const { isBlockedLoading, isUnBlockedLoading } = this.props;

    if (
      isUnBlockedPopoverVisible
      || isBlockedPopoverVisible
      || isBlockedLoading
      || isUnBlockedLoading
    ) {
      return;
    }

    this.setState({ isUnBlockedPopoverVisible: true });
  }

  render() {
    return (
      <CalendarAvailabilityComponent
        {...this.props}
        {...this.state}
        changeAvailabilityMode={this.changeAvailabilityMode}
        blockReject={this.blockReject}
        blockConfirm={this.blockConfirm}
        blockPrepare={this.blockPrepare}
        unBlockReject={this.unBlockReject}
        unBlockConfirm={this.unBlockConfirm}
        unBlockPrepare={this.unBlockPrepare}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  availabilityMode: availabilityModeSelector(state),
  selectedSlots: selectedSlotsSelector(state),
  isBlockedLoading: loadingSelector(state, createCalendarBlockedPeriodsEndpoint.endpoint),
  isUnBlockedLoading: loadingSelector(state, deleteCalendarBlockedPeriodsEndpoint.endpoint),
});

const mapDispatchToProps = {
  setAvailabilityMode: setAvailabilityModeAction,
  createBlockedPeriods: createBlockedPeriodsAction,
  deleteBlockedPeriods: deleteBlockedPeriodsAction,
};

export { CalendarAvailability as CalendarAvailabilityContainer };
export default connect(mapStateToProps, mapDispatchToProps)(CalendarAvailability);
