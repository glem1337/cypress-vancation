import { Button, Radio, Popover } from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import RadioCard from 'views/stubs/shared/inputs/RadioCard';

const FilterDelivery = () => {
  const content = (
    <div className="search-page__filters-popover--delivery">
      <div className="search-page__filters-popover__main">
        <Radio.Group defaultValue={1}>
          <div className="search-page__filters-popover__grid">
            <RadioCard value={1}>
              <div className="text-subheader font-400 mb-16">Delivery</div>
              <div className="mr-40">
                Only show campervans and RVs that offer delivery.
              </div>
            </RadioCard>
            <RadioCard value={2}>
              <div className="text-subheader font-400 mb-16">Pickup</div>
              <div className="mr-40">
                You&apos;ll pick up the vehicle at the owner&apos;s location.
              </div>
            </RadioCard>
          </div>
        </Radio.Group>
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
        className="ant-btn-outline-gray search-page__filters-btn"
        icon={<i className="icon icon-delivery" />}
      >
        Delivery
      </Button>
    </Popover>
  );
};

export default FilterDelivery;
