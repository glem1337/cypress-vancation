import classNames from 'classnames';
import PropTypes from 'prop-types';

const Fact = ({ className, children }) => (
  <div className={classNames('search-page__results-fact', className)}>
    <img
      className="search-page__results-fact-icon"
      src="/images/Fun Fact.svg"
      alt=""
    />
    {children}
  </div>
);

Fact.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Fact;
