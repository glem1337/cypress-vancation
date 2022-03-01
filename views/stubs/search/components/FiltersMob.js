/* eslint-disable react/prop-types */
import classNames from 'classnames';
import {
 Button, Checkbox, Divider, Radio, Switch, Tooltip,
} from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import InputNumeric from 'views/stubs/shared/inputs/InputNumeric';
import CheckboxCard from 'views/stubs/shared/inputs/CheckboxCard';
import RadioCard from 'views/stubs/shared/inputs/RadioCard';
import FilterPriceInner from './filters/FilterPriceInner';

const FiltersMob = ({ visible, filtersMobToggle }) => (
  <aside
    className={classNames(
      'search-page__filters-mob',
      visible && 'search-page__filters-mob--open',
    )}
  >
    <div className="search-page__filters-mob__header">
      <div>
        <span className="text-title">Filter</span>
        <Button className="ml-16" type="simple-text" size="large">
          Clear filters
        </Button>
      </div>
      <Button
        icon={<i className="icon icon-cross" />}
        type="secondary"
        shape="circle"
        size="large"
        onClick={filtersMobToggle}
      />
    </div>
    <div className="search-page__filters-mob__main">
      <div className="search-page__filters-mob__item">
        <h3 className="text-headline mb-24">Guests</h3>
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
              <i className="icon icon-info-f main-tooltip-icon font-18" />
            </Tooltip>
          </div>
          <InputNumeric />
        </div>
      </div>
      <Divider className="mt-24 mb-24" />
      <div className="search-page__filters-mob__item">
        <h3 className="text-headline mb-24">Price</h3>
        <FilterPriceInner />
      </div>
      <Divider className="mt-24 mb-24" />
      <div className="search-page__filters-mob__item">
        <h3 className="text-headline mb-24">Vehicle type</h3>
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
      <div className="search-page__filters-mob__item mt-24 mb-24">
        <div className="search-page__filters-toggle">
          <div className="search-page__filters-toggle-inner">
            <span className="font-600 mr-12">Glampers only</span>
            <Switch size="small" />
          </div>
        </div>
      </div>
      <Divider className="mt-24 mb-24" />
      <div className="search-page__filters-mob__item">
        <h3 className="text-headline mb-24">Delivery</h3>
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
      <Divider className="mt-24 mb-24" />
      <div className="search-page__filters-mob__item">
        <h3 className="text-headline mb-24">More filters</h3>
        <div className="mb-24">
          <div className="in-black font-600 mb-24">Standard amenities</div>
          <div className="search-page__filters-popover__column">
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/kitchen/stovetop.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Stovetop</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/kitchen/fridge.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Fridge</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/climate_control/heating.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Heating</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/bathroom/outdoor_shower.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Outdoor Shower</span>
              </div>
            </CheckboxCard>
          </div>
        </div>
        <div className="mb-24">
          <div className="in-black font-600 mb-24">Luxury amenities</div>
          <div className="search-page__filters-popover__column">
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/bathroom/outdoor_shower.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Outdoor Shower</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/bathroom/toilet_full_use.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Toilet (Full Use)</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/power_system/shore-power-hookups.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Shore Power Hookups</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/listing/amenities-svg/power_system/solar-panels.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Off Grid Capable System</span>
              </div>
            </CheckboxCard>
          </div>
        </div>
        <div className="mb-24">
          <div className="in-black font-600 mb-24">
            Inside height
            <Tooltip title="Some info">
              <i className="icon icon-info-f main-tooltip-icon font-18" />
            </Tooltip>
          </div>
          <div className="search-page__filters-mob__input-row">
            <div className="search-page__filters-mob__input-row__item">
              <img
                className="mr-12"
                src="/images/listing/High-Top.svg"
                alt=""
              />
              <Checkbox>High Top</Checkbox>
            </div>
            <div className="search-page__filters-mob__input-row__item">
              <img className="mr-12" src="/images/listing/Pop-Top.svg" alt="" />
              <Checkbox>Pop-Top</Checkbox>
            </div>
            <div className="search-page__filters-mob__input-row__item">
              <img className="mr-12" src="/images/listing/Low-Top.svg" alt="" />
              <Checkbox>Low Top</Checkbox>
            </div>
            <div className="search-page__filters-mob__input-row__item">
              <img
                className="mr-12"
                src="/images/listing/Roof-Top-Tent.svg"
                alt=""
              />
              <Checkbox>Roof Top Tent</Checkbox>
            </div>
          </div>
        </div>
        <div className="mb-24">
          <div className="in-black font-600 mb-24">Rules</div>
          <div className="search-page__filters-popover__column">
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/edit_listing/rules/Pets-Allowed.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Pets Allowed</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/edit_listing/rules/Smoking-Allowed.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Smoking Allowed</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/edit_listing/rules/Festival-Approved.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Festival Approved</span>
              </div>
            </CheckboxCard>
            <CheckboxCard hasIcon={false}>
              <div className="d-flex align-items-center">
                <img
                  src="/images/edit_listing/rules/Allow-Unlimited-Miles.svg"
                  className="mr-12"
                  alt=""
                />
                <span className="in-black">Allow Unlimited Miles</span>
              </div>
            </CheckboxCard>
          </div>
        </div>
        <div>
          <div className="in-black font-600 mb-24">Minimum rating</div>
          <Radio.Group defaultValue={1} className="search-page__filters-mob__input-row">
            <div className="search-page__filters-mob__input-row__item">
              <Radio value={1}>
                <span className="ml-12">All</span>
              </Radio>
            </div>
            <div className="search-page__filters-mob__input-row__item">
              <Radio value={2} className="ant-radio-centered">
                <div className="search-page__filters-rating">
                  <div className="search-page__filters-rating-icon-90">
                    <img src="/images/Like - White.svg" alt="" />
                  </div>
                  <span className="font-600 ml-8">90%</span>
                </div>
              </Radio>
            </div>
            <div className="search-page__filters-mob__input-row__item">
              <Radio value={3} className="ant-radio-centered">
                <div className="search-page__filters-rating">
                  <div className="search-page__filters-rating-icon-80">
                    <img src="/images/Like - White.svg" alt="" />
                  </div>
                  <span className="font-600 ml-8">80%</span>
                </div>
              </Radio>
            </div>
          </Radio.Group>
        </div>
      </div>
    </div>
    <div className="search-page__filters-mob__footer">
      <MainBtnGradient text="Show 41 vehicles" size="large" />
    </div>
  </aside>
);

export default FiltersMob;
