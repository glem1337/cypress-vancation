import PropTypes from 'prop-types';
import TooltipIcon from 'views/shared/TooltipIcon';

const BigCheckbox = ({
 icon, title, tooltip, children, ...props
}) => (
  <div className="main-checkbox-big-wrap">
    <input type="checkbox" {...props} />
    <div className="main-checkbox-big">
      {icon && <img src={icon} className="mr-12" alt="" />}
      <span className="main-checkbox-big__txt">{title}</span>
      {tooltip && <TooltipIcon phrase={tooltip} />}
      {children}
    </div>
  </div>
);

BigCheckbox.defaultProps = {
  children: null,
  tooltip: null,
  icon: null,
};

BigCheckbox.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  children: PropTypes.node,
};

export default BigCheckbox;
