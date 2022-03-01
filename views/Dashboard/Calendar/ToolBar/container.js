import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import { CALENDAR_BOUNDARIES } from 'constants/calendar';
import {
  setCalendarSettingsVisibility as setCalendarSettingsVisibilityAction,
  clearSelectedSlots as clearSelectedSlotsAction,
  toggleCalendarFooter as toggleCalendarFooterAction,
} from 'state/concepts/calendar/actions';

import CustomToolbarComponent from './component';

class CustomToolbar extends React.Component {
  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    setCalendarSettingsVisibility: PropTypes.func.isRequired,
    clearSelectedSlots: PropTypes.func.isRequired,
    toggleCalendarFooter: PropTypes.func.isRequired,
  }

  navigate = action => () => {
    const { onNavigate } = this.props;

    onNavigate(action);
  }

  get toolbarData() {
    const { date } = this.props;

    const momentDate = moment(date);

    const canNext = momentDate.clone().add(1, 'month') < CALENDAR_BOUNDARIES.MAX;
    const canPrev = momentDate.clone().subtract(1, 'month') > CALENDAR_BOUNDARIES.MIN;

    return {
      month: momentDate.format('MMMM'),
      year: momentDate.format('YYYY'),
      canNext,
      canPrev,
    };
  }

  toggleSettings = (event) => {
    const { setCalendarSettingsVisibility, clearSelectedSlots } = this.props;

    event.preventDefault();

    clearSelectedSlots();
    setCalendarSettingsVisibility(true);
  }

  toggleFooter = event => {
    const { toggleCalendarFooter } = this.props;

    event.preventDefault();

    toggleCalendarFooter();
  }

  render() {
    return (
      <CustomToolbarComponent
        {...this.props}
        navigate={this.navigate}
        toolbarData={this.toolbarData}
        toggleSettings={this.toggleSettings}
        toggleFooter={this.toggleFooter}
      />
    );
  }
}

const mapDispatchToProps = {
  setCalendarSettingsVisibility: setCalendarSettingsVisibilityAction,
  clearSelectedSlots: clearSelectedSlotsAction,
  toggleCalendarFooter: toggleCalendarFooterAction,
};

export { CustomToolbar as CustomToolbarContainer };
export default connect(null, mapDispatchToProps)(CustomToolbar);
