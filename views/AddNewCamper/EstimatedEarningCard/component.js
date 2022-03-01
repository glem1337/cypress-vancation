import PropTypes from 'prop-types';
import Classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

const EstimatedEarningCard = ({
  isVisible,
  handlerClose,
  content,
  isSlim,
}) => (
  <div
    className={Classnames('car-card-wrap', {
      'd-none': !isVisible || !content,
      'd-none d-md-block': isVisible && content,
      'car-card-wrap--float': isSlim,
    })}
  >
    <div className="car-card">
      {content && content.iconUrl && (
        <img className="car-card__img" src={content.iconUrl} alt={content.name} />
      )}
      <div>
        {content && content.name && (
          <div className="car-card__title">
            {content.name}
          </div>
        )}
        <p className="car-card__txt">
          <FormattedMessage id="addNewCamper.sprintersTransitsPromasters" />
        </p>
      </div>
      <div className="car-card__total-wrap">
        <p className="car-card__total-title">
          <FormattedMessage id="addNewCamper.estimatedEarnings" />
        </p>
        <div className="d-flex align-items-center">
          {content && content.estimatedEarning && (
            <span className="car-card__total-price">
              {`$${content.estimatedEarning}`}
            </span>
          )}
          <span className="car-card__total-txt">
            {' / '}
            <FormattedMessage id="shared.perWeek" />
          </span>
        </div>
      </div>
      <button onClick={handlerClose} className="car-card__button" type="button">
        <i className="icon icon-cross" />
      </button>
    </div>
  </div>
);

EstimatedEarningCard.defaultProps = {
  content: null,
};

EstimatedEarningCard.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handlerClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    name: PropTypes.string.isRequired,
    estimatedEarning: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    iconUrl: PropTypes.string,
  }),
  isSlim: PropTypes.bool.isRequired,
};

export default EstimatedEarningCard;
