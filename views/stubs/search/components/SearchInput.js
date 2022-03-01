/* eslint-disable react/prop-types */
import { AutoComplete, Input } from 'antd';

const SearchInput = ({ filtersMobToggle, modalToggle }) => {
  const renderItemNoValue = (title) => ({
    value: title,
    label: (
      <div className="d-flex align-items-center">
        <div className="main-dropdown__item-home-search">
          <img src="/images/home/LocationBack.svg" alt="" />
          <div className="main-dropdown__item-home-search-icon">
            <i className="icon icon-location-f in-black font-16" />
          </div>
        </div>
        <span>{title}</span>
      </div>
    ),
  });
  const renderItemImage = (title) => ({
    value: title,
    label: (
      <div className="d-flex align-items-center">
        <div className="main-dropdown__item-home-search">
          <img src="http://placeimg.com/48/48/nature" alt="" />
        </div>
        <span>{title}</span>
      </div>
    ),
  });
  const renderItem = (title) => ({
    value: title,
    label: (
      <div className="d-flex align-items-center">
        <div className="main-dropdown__item-home-search">
          <i className="icon icon-city in-black" />
        </div>
        <span>{title}</span>
      </div>
    ),
  });
  const options = [
    renderItemNoValue('Explore popular destinations'),
    renderItemImage('Ely, Nevada'),
    renderItem('Pueblo, Colorado'),
    renderItem('Phoenix, Arizona'),
  ];

  return (
    <div className="main-account-header-search">
      <div className="d-none d-md-flex flex-1">
        <AutoComplete
          className="w-100"
          allowClear
          filterOption
          options={options}
        >
          <Input
            className="main-input--left"
            prefix={<i className="icon icon-search" />}
            placeholder="Location"
          />
        </AutoComplete>
      </div>
      <div className="d-flex d-md-none flex-1">
        <Input
          className="main-input--left"
          prefix={<i className="icon icon-search" />}
          placeholder="Location"
          onClick={(e) => {
            e.target.blur();
            modalToggle();
          }}
        />
      </div>
      <Input className="main-input--middle mb-0" placeholder="Dates" />
      <button
        className="main-input--right"
        type="button"
        onClick={filtersMobToggle}
      >
        <i className="icon icon-filter in-gray-500" />
      </button>
    </div>
  );
};

export default SearchInput;
