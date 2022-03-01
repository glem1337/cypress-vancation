import React from 'react';
import { Select } from 'antd';

const HomeSearchGoing = () => (
  <div className="main-home__search-input flex-grow-1">
    <i className="icon icon-search in-gray-500" />
    <Select
      className="main-input__field"
      showSearch
      placeholder="Where are you going?"
    >
      <Select.Option value="1">
        <div className="d-flex align-items-center">
          <div className="main-dropdown__item-home-search">
            <img src="/images/home/LocationBack.svg" alt="" />
            <div className="main-dropdown__item-home-search-icon">
              <i className="icon icon-location-f in-black font-16" />
            </div>
          </div>
          <span>Explore popular destinations</span>
        </div>
      </Select.Option>
      <Select.Option value="Ely, Nevada">
        <div className="d-flex align-items-center">
          <div className="main-dropdown__item-home-search">
            <img src="https://bit.ly/3xkPLKU" alt="" />
          </div>
          <span>Ely, Nevada</span>
        </div>
      </Select.Option>
      <Select.Option value="Pueblo, Colorado">
        <div className="d-flex align-items-center">
          <div className="main-dropdown__item-home-search">
            <i className="icon icon-city in-black" />
          </div>
          <span>Pueblo, Colorado</span>
        </div>
      </Select.Option>
      <Select.Option value="Phoenix, Arizona">
        <div className="d-flex align-items-center">
          <div className="main-dropdown__item-home-search">
            <i className="icon icon-city in-black" />
          </div>
          <span>Phoenix, Arizona</span>
        </div>
      </Select.Option>
    </Select>
  </div>
);

export default HomeSearchGoing;
