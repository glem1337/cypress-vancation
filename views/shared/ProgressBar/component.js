import { Progress } from 'antd';
import PropTypes from 'prop-types';

const ProgressBar = ({
  percent,
  content,
}) => (
  <div className="main-progress-wrap">
    <Progress percent={percent} />
    <span className="main-progress-txt">
      {content}
    </span>
  </div>
);

ProgressBar.defaultProps = {
  percent: 0,
  content: '',
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default ProgressBar;
