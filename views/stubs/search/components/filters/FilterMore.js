import {
 Button, Checkbox, Popover, Radio, Tooltip,
} from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import CheckboxCard from 'views/stubs/shared/inputs/CheckboxCard';

const FilterMore = () => {
  const content = (
    <div className="search-page__filters-popover--more">
      <div className="search-page__filters-popover__main">
        <div className="search-page__filters-popover__grid search-page__filters-popover__grid--more">
          <div className="search-page__filters-popover__column">
            <div className="in-black font-600">Standard amenities</div>
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
          <div className="search-page__filters-popover__column">
            <div className="in-black font-600">Luxury amenities</div>
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
          <div>
            <div className="in-black font-600 mb-24">
              Inside height
              <Tooltip title="Some info">
                <i className="icon icon-info-f main-tooltip-icon font-18" />
              </Tooltip>
            </div>
            <div className="d-flex align-items-center mb-20">
              <img
                className="mr-12"
                src="/images/listing/High-Top.svg"
                alt=""
              />
              <Checkbox>High Top</Checkbox>
            </div>
            <div className="d-flex align-items-center mb-20">
              <img className="mr-12" src="/images/listing/Pop-Top.svg" alt="" />
              <Checkbox>Pop-Top</Checkbox>
            </div>
            <div className="d-flex align-items-center mb-20">
              <img className="mr-12" src="/images/listing/Low-Top.svg" alt="" />
              <Checkbox>Low Top</Checkbox>
            </div>
            <div className="d-flex align-items-center">
              <img
                className="mr-12"
                src="/images/listing/Roof-Top-Tent.svg"
                alt=""
              />
              <Checkbox>Roof Top Tent</Checkbox>
            </div>
          </div>
          <div className="search-page__filters-popover__column">
            <div className="in-black font-600">Rules</div>
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
          <div>
            <div className="in-black font-600 mb-24">Minimum rating</div>
            <Radio.Group defaultValue={1}>
              <div className="mb-16">
                <Radio value={1}>
                  <span className="ml-12">All</span>
                </Radio>
              </div>
              <div className="mb-8">
                <Radio value={2} className="ant-radio-centered">
                  <div className="search-page__filters-rating">
                    <div className="search-page__filters-rating-icon-90">
                      <img src="/images/Like - White.svg" alt="" />
                    </div>
                    <span className="font-600 ml-8">90%</span>
                  </div>
                </Radio>
              </div>
              <div className="mb-8">
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
      placement="bottom"
      overlayClassName="ant-popover-filters ant-popover-filters--fluid"
      getPopupContainer={() => document.querySelector('.search-page__filters-wrap')
      }
    >
      <Button
        className="ant-btn-outline-gray search-page__filters-btn"
        icon={<i className="icon icon-filter" />}
      >
        More filters
      </Button>
    </Popover>
  );
};

export default FilterMore;
