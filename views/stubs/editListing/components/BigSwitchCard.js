import PropTypes from 'prop-types';
import { Col, Switch } from 'antd';

const BigSwitchCard = ({ icon, txt, children }) => (
  <Col lg={16}>
    <div className="edit-list-switch-card">
      <div className="d-flex align-items-center w-100">
        <img src={`/images/${icon}.svg`} alt="" />
        <p className="edit-list-switch-card__title">
          {txt}
        </p>
        <Switch className="ml-auto" />
      </div>
      <div className="edit-list-switch-card__inner">
        { children }
      </div>
    </div>
  </Col>
);

BigSwitchCard.propTypes = {
  icon: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  children: PropTypes.shape().isRequired,
};

export default BigSwitchCard;
