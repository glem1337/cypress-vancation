import { useState } from 'react';
import { Input, Slider } from 'antd';

const FilterPriceInner = () => {
  const [rangeValue, setRangeValue] = useState([125, 300]);
  const regExp = /\D/g;

  return (
    <>
      <div className="d-flex align-items-center justify-content-space-between mb-24 w-280">
        <div className="w-120">
          <div className="font-12 mb-4">From</div>
          <Input
            className="mb-0"
            value={`$${rangeValue[0]}`}
            onChange={({ target: { value } }) => {
              setRangeValue((prev) => [value.replace(regExp, ''), prev[1]]);
            }}
          />
        </div>
        <div className="search-page__filters-popover__line" />
        <div className="w-120">
          <div className="font-12 mb-4">To</div>
          <Input
            className="mb-0"
            value={`$${rangeValue[1]}`}
            onChange={({ target: { value } }) => {
              setRangeValue((prev) => [prev[0], value.replace(regExp, '')]);
            }}
          />
        </div>
      </div>
      <Slider
        value={rangeValue}
        max={600}
        range
        tipFormatter={(v) => `$${v}`}
        onChange={setRangeValue}
      />
    </>
  );
};

export default FilterPriceInner;
