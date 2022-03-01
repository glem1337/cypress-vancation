import PropTypes from 'prop-types';

const CarCard = ({ isFloat }) => (
  <div className={`car-card-wrap ${isFloat && 'car-card-wrap--float'}`}>
    <div className="car-card">
      <img className="car-card__img" src="/images/listing/Modern-Van.svg" alt="" />
      <div>
        <div className="car-card__title">
          Modern Van
        </div>
        <p className="car-card__txt">
          Sprinters, Transits, Promasters & More Fully Built Out Camper Vans.
        </p>
      </div>
      <div className="car-card__total-wrap">
        <p className="car-card__total-title">
          Estimated earnings
        </p>
        <div className="d-flex align-items-center">
          <span className="car-card__total-price">$1,050 - $2,100</span>
          <span className="car-card__total-txt">/ per week</span>
        </div>
      </div>
      <button className="car-card__button" type="button">
        <i className="icon icon-cross" />
      </button>
    </div>
  </div>
);

CarCard.defaultProps = {
  isFloat: false,
};

CarCard.propTypes = {
  isFloat: PropTypes.bool,
};

export default CarCard;
