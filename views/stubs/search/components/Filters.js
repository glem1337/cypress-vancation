/* eslint-disable react/prop-types */
import { Button, Switch, Divider } from 'antd';

import FilterGuests from './filters/FilterGuests';
import FilterPrice from './filters/FilterPrice';
import FilterVehicle from './filters/FilterVehicle';
import FilterDelivery from './filters/FilterDelivery';
import FilterMore from './filters/FilterMore';

const Filters = ({ filtersMobToggle, mapToggle, isEmpty }) => (
  <div className="search-page__filters-wrap">
    <div className="container-fluid">
      <div className="search-page__filters">
        <div className="d-flex d-lg-none align-items-center h-100 flex-1">
          <div className="d-flex align-items-center flex-1">
            <div>
              <span className="font-600 in-black">California</span>
              {' '}
              - Lake Tahoe
            </div>
            <div className="ml-auto">
              {isEmpty ? 0 : 41}
              {' '}
              campers found
            </div>
          </div>
          <Divider className="d-lg-none" type="vertical" />
          <Button
            type="link"
            size="large"
            icon={<i className="icon icon-filter in-gray-500" />}
            onClick={filtersMobToggle}
          />
        </div>
        <div className="d-none d-lg-flex h-100 flex-1">
          <div className="d-flex align-items-center flex-1">
            <FilterGuests />
            <FilterPrice />
            <FilterVehicle />
            <FilterDelivery />
            <FilterMore />
            <div className="search-page__filters-toggle">
              <div className="search-page__filters-toggle-inner">
                <span className="font-600 mr-12">Glampers only</span>
                <Switch size="small" />
              </div>
            </div>
            {/* Remove two following elements if no filters selected */}
            <Divider type="vertical" />
            <Button type="simple-text" size="large">
              Clear filters
            </Button>
            {!!mapToggle && (
              <div className="d-flex align-items-center ml-auto">
                <span className="mr-8">Map view</span>
                <Switch defaultChecked={!!mapToggle} onChange={mapToggle} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Filters;
