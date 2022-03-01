import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { selectedSlotsSelector, camperCustomNightRateSelector } from 'state/concepts/calendar/selectors';

import DateCellWrapperComponent from './component';

class DateCellWrapper extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node.isRequired,
    selectedSlots: PropTypes.shape().isRequired,
    customNightRates: PropTypes.shape().isRequired,
    pricingInfo: PropTypes.shape().isRequired,
  }

  get cellData() {
    const { value } = this.props;

    const now = moment();
    // const prevMonth = moment().subtract(1, 'months').endOf('month');
    const prevDay = moment().subtract(1, 'days').endOf('day');
    const momentValue = moment(value);

    // const isActual = momentValue > prevMonth;
    const isActual = momentValue > prevDay;
    const isSameMonth = now.isSame(value, 'month');
    const weekday = momentValue.format('dddd');

    return {
      isActual,
      isToday: isSameMonth && momentValue.format('D') === now.format('D'),
      isWeekend: isActual && (weekday === 'Sunday' || weekday === 'Saturday'),
      day: momentValue.format('D'),
    };
  }

  get isSelected() {
    const { selectedSlots, value } = this.props;

    if (selectedSlots.slots.length === 1) {
      const slot = R.head(selectedSlots.slots);

      return slot.getTime() === value.getTime();
    }

    if (selectedSlots.slots.length > 1) {
      const first = R.head(selectedSlots.slots);
      const last = R.last(selectedSlots.slots);

      return value.getTime() >= first.getTime() && value.getTime() <= last.getTime();
    }

    return false;
  }

  get dayPrice() {
    const { customNightRates, pricingInfo, value } = this.props;

    // Custom night rate
    const dateString = moment(value).format('YYYY-MM-DD');
    const customNightRate = R.path([dateString], customNightRates);
    if (customNightRate) {
      return `$${customNightRate}`;
    }

    if (pricingInfo?.costomizialeNightCost === false) {
      const price = pricingInfo?.costPerNight || '';

      return `$${price}`;
    }

    // Week date or costPerNight
    const weekDay = moment(value).format('dddd').toLowerCase();
    const weekDateString = `${weekDay}_price`;

    const weekDayPrice = R.path(['weekNightPrice', weekDateString], pricingInfo);
    const price = weekDayPrice || '';

    return `$${price}`;
  }

  render() {
    return (
      <DateCellWrapperComponent
        {...this.props}
        cellData={this.cellData}
        isSelected={this.isSelected}
        dayPrice={this.dayPrice}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  customNightRates: camperCustomNightRateSelector(state, ownProps?.camperId),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
});

export { DateCellWrapper as DateCellWrapperContainer };
export default connect(mapStateToProps)(DateCellWrapper);
