import React from 'react';
import { Button } from 'antd';

const CalendarBtnsGroup = () => (
  <div className="btns-group">
    {/* Add btns-group-active class to the active button */}
    <Button className="btns-group-active" size="small">
      2 Weeks
    </Button>
    <Button size="small">
      3 Months
    </Button>
    <Button size="small">
      6 Months
    </Button>
  </div>
);

export default CalendarBtnsGroup;
