import { Select } from 'antd';
import PropTypes from 'prop-types';
import FormattedOrRawMessage from 'views/shared/FormattedOrRawMessage';

const OptionInsideHeight = ({
  value,
  label,
  img,
  description,
}) => (
  <Select.Option
    value={value}
    label={<FormattedOrRawMessage message={label} />}
    key={value}
  >
    <li className="main-dropdown__item align-items-flex-start">
      <img className="mr-8" src={img} width={32} alt="" />
      <div>
        <div className="mb-4 in-black">
          <FormattedOrRawMessage message={label} />
        </div>
        {description && (
          <p className="text-caption pre-wrap">
            <FormattedOrRawMessage message={description} />
          </p>
        )}
      </div>
    </li>
  </Select.Option>
);

OptionInsideHeight.defaultProps = {
  description: undefined,
};

OptionInsideHeight.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]).isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  img: PropTypes.string.isRequired,
};

export default OptionInsideHeight;
