import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as R from 'ramda';

import {
  isAvailabilityVisibleSelector,
  isSettingsVisibleSelector,
  selectedSlotsSelector,
} from 'state/concepts/calendar/selectors';
import {
  closeRightSidebar as closeRightSidebarAction,
} from 'state/concepts/calendar/actions';
import isPresent from 'utils/isPresent';

import RightSidebarComponent from './component';

class RightSidebar extends React.Component {
  static propTypes = {
    selectedSlots: PropTypes.shape(),
    closeRightSidebar: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectedSlots: null,
  }

  get selectedDatesString() {
    const { selectedSlots } = this.props;

    if (!isPresent(selectedSlots)) {
      return '';
    }

    if (selectedSlots.slots?.length === 1) {
      const slot = R.head(selectedSlots.slots);

      return moment(slot).format('MMM D');
    }

    if (selectedSlots.slots?.length > 1) {
      const first = R.head(selectedSlots.slots);
      const last = R.last(selectedSlots.slots);

      return `${moment(first).format('MMM D')} - ${moment(last).format('MMM D')}`;
    }

    return '';
  }

  render() {
    const { closeRightSidebar } = this.props;

    return (
      <RightSidebarComponent
        {...this.props}
        selectedDatesString={this.selectedDatesString}
        closeRightSidebar={closeRightSidebar}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAvailabilityVisible: isAvailabilityVisibleSelector(state),
  isSettingsVisible: isSettingsVisibleSelector(state),
  selectedSlots: selectedSlotsSelector(state),
});

const mapDispatchToProps = {
  closeRightSidebar: closeRightSidebarAction,
};

export { RightSidebar as RightSidebarContainer };
export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
