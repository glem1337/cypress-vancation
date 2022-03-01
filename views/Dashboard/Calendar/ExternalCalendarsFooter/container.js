import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleCalendarFooter as toggleCalendarFooterAction } from 'state/concepts/calendar/actions';

import ExternalCalendarsFooterComponent from './component';

class ExternalCalendarsFooter extends React.Component {
  static propTypes = {
    toggleCalendarFooter: PropTypes.func.isRequired,
  };

  toggleFooter = (event) => {
    const { toggleCalendarFooter } = this.props;

    event.preventDefault();

    toggleCalendarFooter();
  };

  render() {
    return (
      <ExternalCalendarsFooterComponent
        {...this.props}
        toggleFooter={this.toggleFooter}
      />
    );
  }
}

const mapDispatchToProps = {
  toggleCalendarFooter: toggleCalendarFooterAction,
};

export { ExternalCalendarsFooter as ExternalCalendarsFooterContainer };
export default connect(null, mapDispatchToProps)(ExternalCalendarsFooter);
