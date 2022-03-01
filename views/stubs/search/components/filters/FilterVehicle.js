import { Button, Popover } from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import CheckboxCard from 'views/stubs/shared/inputs/CheckboxCard';

const FilterVehicle = () => {
  const content = (
    <div className="search-page__filters-popover--vehicle">
      <div className="search-page__filters-popover__main">
        <div className="search-page__filters-popover__grid search-page__filters-popover__grid--vehicle">
          <CheckboxCard defaultChecked>
            <div className="d-flex align-items-center mb-16">
              <img src="/images/listing/Modern-Van.svg" alt="" />
              <span className="text-subheader font-400 ml-8">Modern Van</span>
            </div>
            <div className="mr-40">
              Sprinters, Transits, Promasters &#38; More Fully Built Out Camper
              Vans.
            </div>
          </CheckboxCard>
          <CheckboxCard>
            <div className="d-flex align-items-center mb-16">
              <img src="/images/listing/VW-Bus.svg" alt="" />
              <span className="text-subheader font-400 ml-8">VW Bus</span>
            </div>
            <div className="mr-40">
              Iconic and Classic. Westfalias, Vanagons, Eurovans &#38; More
              Volkswagen Vans.
            </div>
          </CheckboxCard>
          <CheckboxCard>
            <div className="d-flex align-items-center mb-16">
              <img src="/images/listing/Unique-Camper.svg" alt="" />
              <span className="text-subheader font-400 ml-8">
                Unique Camper
              </span>
            </div>
            <div className="mr-40">
              Skoolies, Ambulances and Other Unique Camper Conversions.
            </div>
          </CheckboxCard>
          <CheckboxCard>
            <div className="d-flex align-items-center mb-16">
              <img src="/images/listing/Vehicle-Camper.svg" alt="" />
              <span className="text-subheader font-400 ml-8">
                Vehicle Camper
              </span>
            </div>
            <div className="mr-40">
              Truck Camper Rigs. Car, Minivan, Jeep and SUV conversions,
              typically with roof top tents.
            </div>
          </CheckboxCard>
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
        icon={<i className="icon icon-camper" />}
      >
        Vehicle type
      </Button>
    </Popover>
  );
};

export default FilterVehicle;
