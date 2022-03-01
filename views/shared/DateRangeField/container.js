import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';

import DateRangeFieldComponent from './component';

const MIN_SELECTABLE_DATE = moment().startOf('day');
const DATE_FORMAT = 'MMM D YYYY';

class DateRangeField extends React.Component {
  static propTypes = {
    blockedPeriods: PropTypes.shape().isRequired,
    field: PropTypes.shape().isRequired,
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
      setFieldTouched: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      calendarVisible: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  calendarOpen = () => {
    const { calendarVisible } = this.state;

    if (!calendarVisible) {
      this.setState({
        calendarVisible: true,
      });
    }
  };

  handleClickOutside = (event) => {
    const { calendarVisible } = this.state;
    const {
      field: { name },
      form: { setFieldTouched },
    } = this.props;

    const calendarWrapper = document.getElementById(
      'main-date-range__calendar',
    );

    if (!calendarWrapper) {
      return false;
    }

    if (event?.target.classList.contains('departure-return__side')) {
      return false;
    }

    if (!calendarWrapper.contains(event?.target) && calendarVisible) {
      setFieldTouched(name);
      this.setState({ calendarVisible: false });
    }

    return true;
  };

  onDateRangeChange = (range) => {
    const {
      field: { name },
      form: { setFieldValue },
      blockedPeriods,
    } = this.props;

    let startDate = moment.utc(range[0]) < MIN_SELECTABLE_DATE
        ? MIN_SELECTABLE_DATE.clone()
        : moment(range[0]);

    let endDate = moment.utc(range[1]) < MIN_SELECTABLE_DATE
        ? MIN_SELECTABLE_DATE.clone()
        : moment(range[1]);

    const keys = Object.keys(blockedPeriods);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      const date = moment(key, 'YYYY-MM-DD');

      // If date is blocked by owner.
      if (date > startDate && date <= endDate) {
        endDate = date.clone().subtract(1, 'day');
      }
    }

    if (endDate < startDate) {
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }

    if (
      startDate.clone().format('YYYY-MM-DD')
      === endDate.clone().format('YYYY-MM-DD')
    ) {
      setFieldValue(name, null);
    } else {
      setFieldValue(name, [startDate.toDate(), endDate.toDate()]);
      this.setState({ calendarVisible: false });
    }
  };

  get dateRange() {
    const {
      field: { value },
    } = this.props;

    return {
      startDate: isPresent(value)
        ? moment(R.head(value)).format(DATE_FORMAT)
        : '',
      endDate: isPresent(value)
        ? moment(R.last(value)).format(DATE_FORMAT)
        : '',
    };
  }

  formatShortWeekday = (_, date) => moment(date).format('dd');

  tileContent = ({ date }) => (
    <div className="react-calendar__cell">
      <div className="react-calendar__inner-cell">
        {moment(date).format('D')}
      </div>
    </div>
  );

  tileDisabled = ({ date }) => {
    const { blockedPeriods } = this.props;

    if (moment(date) < MIN_SELECTABLE_DATE) {
      return true;
    }

    const dateString = moment(date).format('YYYY-MM-DD');

    if (blockedPeriods[dateString]) {
      return true;
    }

    return false;
  };

  clearDateRange = () => {
    const {
      field: { name },
      form: { setFieldValue },
    } = this.props;

    setFieldValue(name, null);
  };

  render() {
    return (
      <DateRangeFieldComponent
        {...this.props}
        {...this.state}
        onDateRangeChange={this.onDateRangeChange}
        dateRange={this.dateRange}
        formatShortWeekday={this.formatShortWeekday}
        tileContent={this.tileContent}
        tileDisabled={this.tileDisabled}
        clearDateRange={this.clearDateRange}
        calendarOpen={this.calendarOpen}
      />
    );
  }
}

export default DateRangeField;
