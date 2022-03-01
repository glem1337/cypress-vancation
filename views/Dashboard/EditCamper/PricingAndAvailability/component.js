import classnames from 'classnames';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Divider, Skeleton, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import EditCamperLayout from 'views/layouts/EditCamper';
import { CALENDAR_BOUNDARIES } from 'constants/calendar';
import defineCustomComponent from 'utils/calendar/defineCustomComponent';
import isPresent from 'utils/isPresent';
import ToolBar from 'views/Dashboard/Calendar/ToolBar';
import DateCellWrapper from 'views/Dashboard/Calendar/DateCellWrapper';
import EventWrapper from 'views/Dashboard/Calendar/EventWrapper';
import Event from 'views/Dashboard/Calendar/Event';
import RightSidebar from 'views/Dashboard/Calendar/RightSidebar';
import ExternalCalendarsFooter from 'views/Dashboard/Calendar/ExternalCalendarsFooter';
import usePricingAndAvailability, {
  getInitialProps,
} from 'utils/hooks/usePricingAndAvailability';

const localizer = momentLocalizer(moment);

const PricingAndAvailability = ({ camperId }) => {
  const {
    events,
    formats,
    calendarMeasures,
    currentDate,
    onNavigate,
    onSelectSlot,
    isAvailabilityVisible,
    isSettingsVisible,
    footerVisible,
    camper,
  } = usePricingAndAvailability();

  if (!isPresent(camper)) {
    return (
      <EditCamperLayout hasFooter={false}>
        <div className="container">
          <Row gutter={24}>
            <Col span={24}>
              <h1 className="text-headline mb-8">
                <FormattedMessage id="shared.pricingAndAvailability" />
              </h1>
              <p className="mb-16">
                <FormattedMessage id="dashboard.editCamper.managePricing" />
              </p>
            </Col>
            <Col span={24}>
              <Skeleton active />
            </Col>
          </Row>
        </div>
      </EditCamperLayout>
    );
  }

  return (
    <EditCamperLayout hasFooter={false}>
      <div
        className={classnames(
          'calendar-listing__wrap',
          footerVisible && 'calendar-listing__wrap--footer-open',
          (isAvailabilityVisible || isSettingsVisible)
            && 'calendar-listing__wrap--side-open',
        )}
      >
        <div className="calendar-listing__inner">
          <div className="container">
            <div className="calendar-listing calendar-listing--narrow">
              <h1 className="text-headline mb-8">
                <FormattedMessage id="shared.pricingAndAvailability" />
              </h1>
              <p className="mb-24">
                <FormattedMessage id="dashboard.editCamper.managePricing" />
              </p>
              <Calendar
                date={currentDate.toDate()}
                min={CALENDAR_BOUNDARIES.MIN.toDate()}
                max={CALENDAR_BOUNDARIES.MAX.toDate()}
                events={events}
                localizer={localizer}
                className="dashboard-calendar"
                style={calendarMeasures}
                formats={formats()}
                components={{
                  dateCellWrapper: defineCustomComponent(DateCellWrapper, {
                    camperId,
                  }),
                  toolbar: ToolBar,
                  eventWrapper: EventWrapper,
                  event: Event,
                }}
                onNavigate={onNavigate}
                selectable
                onSelectSlot={onSelectSlot}
                showAllEvents
              />
            </div>
            <Divider className="d-none d-lg-block mt-24" />
            <ExternalCalendarsFooter camperId={camperId} />
          </div>
        </div>
        <RightSidebar camperId={camperId} />
      </div>
    </EditCamperLayout>
  );
};

PricingAndAvailability.getInitialProps = getInitialProps;

PricingAndAvailability.propTypes = {
  camperId: PropTypes.string,
};

PricingAndAvailability.defaultProps = {
  camperId: null,
};

export default PricingAndAvailability;
