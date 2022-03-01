import PropTypes from 'prop-types';
import TooltipIcon from 'views/stubs/shared/TooltipIcon';

const BigCheckbox = ({ icon, text, id, tooltipPhrase }) => (
  <div className="main-checkbox-big-wrap">
    <input type="checkbox" id={id} />
    <div className="main-checkbox-big">
      <img src={`/images/listing/amenities-svg/${icon}.svg`} className="mr-12" alt="" />
      <span className="main-checkbox-big__txt">{text}</span>
      {tooltipPhrase && (
        <TooltipIcon phrase={tooltipPhrase} />
      )}
    </div>
  </div>
);

BigCheckbox.defaultProps = {
  tooltipPhrase: '',
};

BigCheckbox.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tooltipPhrase: PropTypes.string,
};

export default BigCheckbox;
