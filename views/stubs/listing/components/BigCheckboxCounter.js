import PropTypes from 'prop-types';
import InputNumeric from '../../shared/inputs/InputNumeric';

const BigCheckboxCounter = ({ icon, text, id }) => (
  <div className="main-checkbox-big-wrap">
    <input type="checkbox" id={id} />
    <div className="main-checkbox-big">
      <img src={`/images/listing/amenities-svg/${icon}.svg`} className="mr-12" alt="" />
      <span className="main-checkbox-big__txt">{text}</span>
      <InputNumeric
        value={1}
      />
    </div>
  </div>
);

BigCheckboxCounter.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default BigCheckboxCounter;
