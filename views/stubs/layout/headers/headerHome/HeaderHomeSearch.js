import React from 'react';
import { DatePicker, Button } from 'antd';
import ActionBtnGradient from '../../../shared/buttons/ActionBtnGradient';
import HomeSearchGoing from '../../../home/components/HomeSearchGoing';

const { RangePicker } = DatePicker;

const HeaderHomeSearch = () => (
  <div className="main-home__search ">
    <HomeSearchGoing />
    <div className="main-home__search-input main-home__search-input-date">
      <i className="icon icon-calendar in-gray-500" />
      <RangePicker
        placeholder={['When is your trip?', '']}
        suffixIcon={false}
        renderExtraFooter={() => <Button type="link" className="pl-0">Clear</Button>}
        format="MMM D, YYYY"
      />
    </div>
    <ActionBtnGradient
      className="d-none d-md-inline-block"
      size="large"
      shape="circle"
      icon={<i className="icon icon-search" />}
    />
  </div>
);

export default HeaderHomeSearch;
