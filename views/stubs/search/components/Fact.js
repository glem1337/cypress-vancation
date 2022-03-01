/* eslint-disable react/prop-types */
import classNames from 'classnames';

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

export default Fact;
