import React from 'react';
import PropTypes from 'prop-types';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const MonthManager = ({ loadPrevMonth, loadNextMonth }) => (
  <div className="search-destinations__month-manager">
    <div className="search-destinations__month-manager-side">
      <button
        type="button"
        onClick={loadPrevMonth}
      >
        <UpOutlined className="search-destinations__icon" />
      </button>
    </div>
    <div className="search-destinations__month-manager-side">
      <button
        type="button"
        onClick={loadNextMonth}
      >
        <DownOutlined className="search-destinations__icon" />
      </button>
    </div>
  </div>
);

MonthManager.propTypes = {
  loadPrevMonth: PropTypes.func.isRequired,
  loadNextMonth: PropTypes.func.isRequired,
};

export default MonthManager;
