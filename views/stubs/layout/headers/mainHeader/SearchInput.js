import { Input } from 'antd';

const SearchInput = () => (
  <div className="main-account-header-search">
    <Input
      className="main-input--left"
      prefix={<i className="icon icon-search" />}
      placeholder="Location"
    />
    <Input className="main-input--right mb-0" placeholder="Dates" />
  </div>
);

export default SearchInput;
