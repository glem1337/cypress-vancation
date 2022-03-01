import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

const LocationInput = ({ classNames }) => {
  const classname = `main-input-location main-input__field ${classNames}`;
  return (
    <div className="mb-16">
      <Form.Item label={<span className="main-input__label">Camper location</span>}>
        <div className="relative">
          <Select
            showSearch
            className={classname}
            allowClear
            placeholder="Add camper location"
            prefix={
              <i className="icon icon-location" />
            }
            suffix={
              <i className="icon icon-checked in-green-1000 font-24" />
            }
          >
            <Select.Option value="1">
              asd
            </Select.Option>
            <Select.Option value="2">
              asd1
            </Select.Option>
          </Select>
        </div>
      </Form.Item>
    </div>
  );
};

LocationInput.defaultProps = {
  classNames: '',
};

LocationInput.propTypes = {
  classNames: PropTypes.string,
};

export default LocationInput;
