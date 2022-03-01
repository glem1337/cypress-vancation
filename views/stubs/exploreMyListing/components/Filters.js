import { useState } from 'react';
import classNames from 'classnames';
import { Input, Button, Select, Radio } from 'antd';
import Dropdown from '../../shared/dropdowns/Dropdown';

const { Option } = Select;

const Filters = () => {
  const [openBtn, setOpenBtn] = useState(false);
  return (
    <div className="d-flex align-items-center relative mb-16">
      <div
        role="button"
        className={classNames('master-view-search-btn', { 'master-view-search-btn--open': openBtn })}
        onClick={() => setOpenBtn(!openBtn)}
      >
        <i className="icon icon-search" />
        <div className="master-view-search-btn__inner">
          <Input
            className="mr-16"
            prefix={<i className="icon icon-search" />}
            allowClear
          />
          <Button
            onClick={() => setOpenBtn(!openBtn)}
            size="large"
            type="text"
            icon={<i className="icon icon-cross" />}
          />
        </div>
      </div>
      <Input
        className="d-none d-md-inline-flex"
        prefix={<i className="icon icon-search" />}
        placeholder="Search"
      />
      <Select
        id="filter-city"
        name="fieldName"
        className="main-input__field master-view-city-filter"
        optionLabelProp="label"
        placeholder="Filter by City"
      >
        <Option className="p-0" value=" Los Angeles" label=" Los Angeles">
          <li className="main-dropdown__item">
            Los Angeles
          </li>
        </Option>
        <Option className="p-o" value="Chicago" label="Chicago">
          <li className="main-dropdown__item">
            Chicago
          </li>
        </Option>
        <Option className="p-0" value="Philadelphia" label="Philadelphia">
          <li className="main-dropdown__item">
            Philadelphia
          </li>
        </Option>
      </Select>
      <Dropdown
        overlayClassName="min-w-180"
        icon={(
          <div>
            {/* Change type to "secondary" when filter is picked */}
            <Button
              className="d-none d-md-block"
              icon={<i className="icon icon-filter mr-8 in-gray-500" />}
              size="large"
              type="text"
            >
              <span className="in-gray-700">
                All campers
              </span>
            </Button>
            {/* Change type to "secondary" when filter is picked */}
            <Button
              className="d-md-none"
              size="large"
              type="text"
              icon={<i className="icon icon-filter in-gray-500" />}
            />
          </div>
        )}
        placement="bottomRight"
      >
        <div className="main-dropdown-wrap">
          <div className="main-dropdown__body">
            <div className="main-dropdown__item-title">
              Camper status
            </div>
            <Radio.Group
              className="w-100"
              defaultValue="all"
              size="large"
            >
              <div className="main-dropdown__item">
                <Radio value="all">
                  <span className="ml-12">
                    All
                  </span>
                </Radio>
              </div>
              <div className="main-dropdown__item">
                <Radio value="Published">
                  <span className="ml-12">
                    Published
                  </span>
                </Radio>
              </div>
              <div className="main-dropdown__item">
                <Radio value="Unpublished">
                  <span className="ml-12">
                    Unpublished
                  </span>
                </Radio>
              </div>
              <div className="main-dropdown__item">
                <Radio value="moderation">
                  <span className="ml-12">
                    On moderation
                  </span>
                </Radio>
              </div>
              <div className="main-dropdown__item">
                <Radio value="draft">
                  <span className="ml-12">
                    Draft
                  </span>
                </Radio>
              </div>
              <div className="main-dropdown__item">
                <Radio value="Deactivated">
                  <span className="ml-12">
                    Deactivated
                  </span>
                </Radio>
              </div>
            </Radio.Group>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filters;
