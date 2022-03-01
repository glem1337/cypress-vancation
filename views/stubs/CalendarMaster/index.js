import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Tag } from 'antd';

import {
  currentDateRange,
  currentDate,
  vansMock,
  VANS_STATUSES,
} from './constants';
import { getHeaderDates, getDaysCount, getVanCellsData } from './utils';
import useWindowSize from './useWindowSize';

import CalendarSelect from './components/CalendarSelect';
import CalendarBtnsGroup from './components/CalendarBtnsGroup';
import CalendarBookingLine from './components/CalendarBookingLine';

const CalendarMaster = () => {
  const rangeDaysCount = getDaysCount(
    currentDateRange.from,
    currentDateRange.to,
  );
  const headerDates = getHeaderDates(
    rangeDaysCount,
    currentDateRange.from,
    currentDate,
  );
  const size = useWindowSize();
  const [sideHidden, setSideHidden] = useState(false);

  return (
    <div className="calendar">
      <div className="calendar__head">
        <div className="calendar__head-today-btn">
          <Button className="ant-btn-outline-gray" size="small">
            Today
          </Button>
        </div>
        <div className="d-flex align-items-center">
          <Button type="secondary" shape="circle" size="small">
            <i className="icon icon-left font-14" />
          </Button>
          <div className="text-subheader font-700 ml-16 mr-16">
            <span>{currentDateRange.from.format('MMM DD')}</span>
            {' - '}
            <span>{currentDateRange.to.format('MMM DD')}</span>
            {' '}
            <span className="text-color-gray font-400">
              {currentDateRange.from.format('YYYY')}
            </span>
          </div>
          <Button type="secondary" shape="circle" size="small">
            <i className="icon icon-right font-14" />
          </Button>
        </div>
        <div className="calendar__head-switch">
          <div className="d-xl-none">
            <CalendarSelect />
          </div>
          <div className="d-none d-xl-block">
            <CalendarBtnsGroup />
          </div>
        </div>
      </div>

      <div className="calendar__wrap">
        <div
          className={classNames(
            'calendar__side',
            sideHidden && 'calendar__side--hidden',
          )}
        >
          <div className="calendar__side-control">
            <Button
              className="ant-btn-control"
              shape="circle"
              size="small"
              onClick={() => setSideHidden(!sideHidden)}
            >
              <i className="icon icon-drag font-16" />
            </Button>
          </div>
          <div className="calendar__side-head">Campers</div>
          <ul className="calendar__side-list">
            {vansMock.map(({ info: { title, slug, status, image } }) => (
              <li className="calendar__side-item" key={slug}>
                <a href="#" className="calendar__side-item-img">
                  <img
                    src={image.imgUrl}
                    srcSet={`${image.imgUrl} 1x, ${image.imgUrlRetina} 2x`}
                    alt={title}
                  />
                </a>
                <div className="calendar__side-item-descr">
                  <a href="#" className="calendar__side-item-link main-link">
                    {title}
                  </a>
                  {status === VANS_STATUSES.published ? (
                    <Tag className="ml-0 mr-0" color="success">
                      {status}
                    </Tag>
                  ) : (
                    <Tag className="ml-0 mr-0" color="processing">
                      {status}
                    </Tag>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="calendar__body">
          <div className="calendar__body-head">
            {/* Add in-blue-1000 class to the item with current date */}
            {headerDates.map(({ formattedNextDay, isToday }) => (
              <div
                className={classNames(
                  'calendar__body-head-item',
                  isToday && 'in-blue-1000',
                )}
              >
                {formattedNextDay}
              </div>
            ))}
          </div>
          <div className="calendar__body-grid">
            {vansMock.map(({ dates, bookings }) => {
              const vanCellsData = getVanCellsData(
                currentDateRange.from,
                currentDateRange.to,
                rangeDaysCount,
                currentDate,
                dates,
                bookings,
                size.width,
              );
              return (
                <div className="calendar__body-row">
                  {vanCellsData.map(({ day, booking, passed, price }, idx) => (
                    <div
                      className={classNames('calendar__body-cell', {
                        'calendar__body-cell--active': price,
                        'calendar__body-cell--passed': passed,
                        'calendar__body-cell--last-passed':
                          passed
                          && vanCellsData[idx + 1]
                          && !vanCellsData[idx + 1].passed,
                      })}
                      key={day}
                    >
                      {booking && (
                        <CalendarBookingLine booking={booking} />
                      )}
                      {price && (
                        <span className="calendar__body-cell-price">
                          {`$${price}`}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarMaster;
