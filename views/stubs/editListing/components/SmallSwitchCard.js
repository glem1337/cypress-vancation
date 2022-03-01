import { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Switch } from 'antd';

const SmallSwitchCard = ({ icon, txt, addTxt }) => {
  const [select, setSelect] = useState(false);

  return (
    <Col lg={16}>
      <div
        className="edit-list-switch-card"
        onClick={() => setSelect(!select)}
        role="button"
      >
        <div className="d-flex align-items-center flex-grow-1">
          <img src={`/images/${icon}.svg`} alt="" />
          <p className="edit-list-switch-card__title">
            {txt}
          </p>
          <div className="d-inline-flex align-items-center ml-auto">
            <Switch checked={select} />
          </div>
        </div>
        {addTxt && (
          <div className="edit-list-switch-card__inner w-100 pt-0">
            <p className="edit-list-switch-card__inner-txt">
              { addTxt }
            </p>
          </div>
        )}
      </div>
    </Col>
  );
};

SmallSwitchCard.defaultProps = {
  addTxt: '',
};

SmallSwitchCard.propTypes = {
  icon: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  addTxt: PropTypes.string,
};

export default SmallSwitchCard;
