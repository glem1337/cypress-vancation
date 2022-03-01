import PropTypes from 'prop-types';

const EventWrapper = ({ children }) => (
  <div className="dashboard-calendar__event-wrapper">
    {children}
  </div>
);

EventWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EventWrapper;
