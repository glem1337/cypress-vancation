import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import ExportCalendarSection from './ExportCalendarSection';
import ImportCalendarSection from './ImportCalendarSection';

const ExternalCalendarsFooter = ({ toggleFooter, camperId }) => (
  <div className="calenadr-listing__footer">
    <div className="calendar-listing__footer-head">
      <FormattedMessage id="calendar.footer.title" />
      <Button
        className="d-lg-none align-self-start ml-16"
        type="secondary"
        icon={<i className="icon icon-cross" />}
        shape="circle"
        size="large"
        onClick={toggleFooter}
      />
    </div>
    <div className="calendar-listing__footer-main">
      <ExportCalendarSection camperId={camperId} />
      <ImportCalendarSection camperId={camperId} />
    </div>
  </div>
);

ExternalCalendarsFooter.propTypes = {
  toggleFooter: PropTypes.func.isRequired,
  camperId: PropTypes.string.isRequired,
};

export default ExternalCalendarsFooter;
