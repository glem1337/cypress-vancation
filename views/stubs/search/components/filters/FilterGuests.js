import { Button, Popover, Tooltip } from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import InputNumeric from 'views/stubs/shared/inputs/InputNumeric';

const FilterGuests = () => {
  const content = (
    <div className="search-page__filters-popover--guests">
      <div className="search-page__filters-popover__main">
        <div className="d-flex justify-content-space-between mb-24">
          <div className="d-flex align-items-center">
            <i className="icon icon-bed in-gray-500" />
            <span className="font-600 in-black ml-16">Sleeps</span>
            <Tooltip title="Some info">
              <i className="icon icon-info-f main-tooltip-icon font-18" />
            </Tooltip>
          </div>
          <InputNumeric defaultValue="2" />
        </div>
        <div className="d-flex justify-content-space-between">
          <div className="d-flex align-items-center">
            <i className="icon icon-seats in-gray-500" />
            <span className="font-600 in-black ml-16">Seats</span>
            <Tooltip title="Some info">
              <i className="icon icon-info-f main-tooltip-icon font-18 ml-8" />
            </Tooltip>
          </div>
          <InputNumeric />
        </div>
      </div>
      <div className="search-page__filters-popover__footer">
        <Button type="link" size="large">
          Clear
        </Button>
        <MainBtnGradient
          className="min-w-140 ml-16"
          text="Apply"
          size="large"
        />
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomLeft"
      overlayClassName="ant-popover-filters"
      getPopupContainer={() => document.querySelector('.search-page__filters-wrap')
      }
    >
      <Button
        className="ant-btn-outline-gray search-page__filters-btn search-page__filters-btn--active"
        icon={<i className="icon icon-group" />}
      >
        Guests
        <span className="main-account-header__item-counter--blue">2</span>
      </Button>
    </Popover>
  );
};

export default FilterGuests;
