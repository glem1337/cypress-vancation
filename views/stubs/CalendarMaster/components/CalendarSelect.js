import React from 'react';
import { Select } from 'antd';

 const CalendarSelect = () => {
  const { Option } = Select;

  return (
    <>
      <Select className="ant-select-calendar" defaultValue="2weeks">
        <Option value="2weeks">
          2 Weeks
        </Option>
        <Option value="3months">
          3 Months
        </Option>
        <Option value="6months">
          6 Months
        </Option>
      </Select>
    </>
  );
};

export default CalendarSelect;
