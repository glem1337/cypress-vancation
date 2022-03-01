import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as R from 'ramda';

const DateCellWrapperComponent = ({
  children,
  cellData,
  isSelected,
  dayPrice,
}) => {
  const isAnotherMonth = R.compose(
    R.includes('rbc-off-range-bg'),
    R.pathOr('', ['props', 'className']),
  )(children);

  return (
    <div
      className={
        classnames('dashboard-calendar__cell-wrapper', {
          'dashboard-calendar__cell-wrapper--weekend': cellData.isWeekend && !isAnotherMonth,
          'dashboard-calendar__cell-wrapper--disabled': !cellData.isActual || isAnotherMonth,
          'dashboard-calendar__cell-wrapper--selected': isSelected,
        })
      }
    >
      {children}
      <p className={
        classnames('dashboard-calendar__cell-day', {
          'dashboard-calendar__cell-day--disabled': !cellData.isActual,
          'd-none': cellData.isToday,
        })
      }
      >
        {cellData.day}
      </p>
      <div className={
        classnames('dashboard-calendar__cell-this-day-wrapper ', {
          'd-none': !cellData.isToday,
        })
      }
      >
        <p className="dashboard-calendar__cell-this-day">
          {cellData.day}
        </p>
      </div>
      <p className="dashboard-calendar__cell-price">
        {dayPrice}
      </p>
    </div>
  );
};

DateCellWrapperComponent.propTypes = {
  children: PropTypes.node.isRequired,
  cellData: PropTypes.shape().isRequired,
  isSelected: PropTypes.bool.isRequired,
  dayPrice: PropTypes.string.isRequired,
};

export default DateCellWrapperComponent;
