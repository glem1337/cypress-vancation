import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import classNames from 'classnames';
import { Divider, Skeleton } from 'antd';

import ROUTES from 'constants/routes';
import { CALENDAR_BOUNDARIES } from 'constants/calendar';
import defineCustomComponent from 'utils/calendar/defineCustomComponent';
import usePricingAndAvailability, { getInitialProps } from 'utils/hooks/usePricingAndAvailability';
import isPresent from 'utils/isPresent';

import Header from '../Header';
import ToolBar from './ToolBar';
import DateCellWrapper from './DateCellWrapper';
import EventWrapper from './EventWrapper';
import Event from './Event';
import RightSidebar from './RightSidebar';
import ExternalCalendarsFooter from './ExternalCalendarsFooter';

const localizer = momentLocalizer(moment);

const DashboardCalendarComponent = ({ camperId }) => {
  const {
    events,
    formats,
    calendarMeasures,
    currentDate,
    onNavigate,
    onSelectSlot,
    isAvailabilityVisible,
    isSettingsVisible,
    camper,
    footerVisible,
  } = usePricingAndAvailability();

  if (!camperId || !isPresent(camper)) {
    return (
      <>
        <Header activeTabKey={ROUTES.OWNER_DASHBOARD.CALENDAR.KEY} />
        <div className="dashboard-calendar__skeleton-wrapper">
          <Skeleton active />
        </div>
      </>
    );
  }

  return (
    <>
      <Header activeTabKey={ROUTES.OWNER_DASHBOARD.CALENDAR.KEY} />
      <div
        className={classNames(
          'calendar-listing__wrap',
          footerVisible && 'calendar-listing__wrap--footer-open',
          (isAvailabilityVisible || isSettingsVisible) && 'calendar-listing__wrap--side-open',
        )}
      >
        <div className="calendar-listing__inner">
          <div className="container">
            <div className="calendar-listing">
              <div className="calendar-listing__main">
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
                    dateCellWrapper: defineCustomComponent(DateCellWrapper, { camperId }),
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
            </div>
            <Divider className="d-none d-lg-block mt-24" />
            <ExternalCalendarsFooter camperId={camperId} />
          </div>
          <RightSidebar camperId={camperId} />
        </div>
      </div>
    </>
  );
};

DashboardCalendarComponent.propTypes = {
  camperId: PropTypes.string,
};

DashboardCalendarComponent.defaultProps = {
  camperId: null,
};

DashboardCalendarComponent.getInitialProps = getInitialProps;

export default DashboardCalendarComponent;
