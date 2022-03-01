import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { CALENDAR_EVENT_TYPE } from 'constants/calendar';

// TODO: will be replaced by real data.
const Event = ({ event: { resource } }) => {
  const className = resource.type === 'available'
    ? 'dashboard-calendar__event--active'
    : 'dashboard-calendar__event--blocked';

  if (resource.type === CALENDAR_EVENT_TYPE.BLOCKED) {
    return (
      <div className={`dashboard-calendar__event ${className}`}>
        <FormattedMessage id="shared.blocked" />
      </div>
    );
  }

  if (resource.type === CALENDAR_EVENT_TYPE.EXTERNAL) {
    return (
      <div className={`dashboard-calendar__event ${className}`}>
        <FormattedMessage id="shared.blockedBy" values={{ name: resource.calendarName }} />
      </div>
    );
  }

  return (
    <div className={`dashboard-calendar__event ${className}`}>
      <span className="calendar__body-cell-booking-info">
        <i className="icon icon-seats font-14" />
        {' '}
        12
        {' '}
        <i className="icon icon-moon font-14" />
        {' '}
        13
        {' '}
        {`$${2334}`}
      </span>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape().isRequired,
};

export default Event;
