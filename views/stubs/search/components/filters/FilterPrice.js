import { Button, Popover } from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import FilterPriceInner from './FilterPriceInner';

const FilterPrice = () => {
  const content = (
    <div className="search-page__filters-popover--price">
      <div className="search-page__filters-popover__main">
        <FilterPriceInner />
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
        icon={<i className="icon icon-price" />}
      >
        Price
      </Button>
    </Popover>
  );
};

export default FilterPrice;
