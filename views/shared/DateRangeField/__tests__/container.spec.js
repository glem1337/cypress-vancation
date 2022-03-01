import { shallow } from 'enzyme';
import moment from 'moment';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';

import DateRangeField from '../container';

const MIN_SELECTABLE_DATE = moment().startOf('day');
const DATE_FORMAT = 'MMM D YYYY';

describe('DateRangeField container tests', () => {
  Object.defineProperty(document, 'addEventListener', { value: jest.fn() });

  Object.defineProperty(document, 'removeEventListener', { value: jest.fn() });

  const fieldName = 'fieldName';
  const fieldValue = [new Date(), new Date()];

  const props = {
    field: {
      value: fieldValue,
      name: fieldName,
      onBlur: jest.fn(),
    },
    form: {
      touched: {},
      errors: {},
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
    blockedPeriods: {
      '2021-01-29': true,
    },
    onActiveStartDateChange: jest.fn(),
  };

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    container = shallow(<DateRangeField {...props} />);
    instance = container.instance();
    setStateSpy = jest.spyOn(instance, 'setState');

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    expect(document.addEventListener).toHaveBeenCalledWith(
      'mousedown',
      instance.handleClickOutside,
    );
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(document.removeEventListener).toHaveBeenCalledWith(
      'mousedown',
      instance.handleClickOutside,
    );
  });

  it('checks `calendarOpen` instance method', () => {
    instance.calendarOpen();

    expect(setStateSpy).toHaveBeenCalledWith({
      calendarVisible: true,
    });
  });

  describe('checks `handleClickOutside` instance method', () => {
    it('when wrapper does not exist', () => {
      const res = instance.handleClickOutside();

      expect(res).toBe(false);
    });

    it('with wrong event target', () => {
      const div = document.createElement('div');
      div.id = 'main-date-range__calendar';
      document.body.appendChild(div);

      const target = document.createElement('div');
      target.classList = 'departure-return__side';
      document.body.appendChild(target);

      const res = instance.handleClickOutside({
        target,
      });

      expect(res).toBe(false);
    });

    it('when range picker visibility equals false', () => {
      container.setState({ calendarVisible: true });

      const div = document.createElement('div');
      div.id = 'target';
      document.body.appendChild(div);

      const target = document.getElementById('target');
      const res = instance.handleClickOutside({ target });

      expect(res).toBe(true);
    });
  });

  describe('checks `onDateRangeChange` instance method', () => {
    it('when date is blocked by owner', () => {
      const range = [new Date(), new Date('2021/01/29')];
      instance.onDateRangeChange(range);

      const startDate = moment.utc(range[0]) < MIN_SELECTABLE_DATE
          ? MIN_SELECTABLE_DATE.clone()
          : moment(range[0]);

      let endDate = moment.utc(range[1]) < MIN_SELECTABLE_DATE
          ? MIN_SELECTABLE_DATE.clone()
          : moment(range[1]);

      const keys = Object.keys(props.blockedPeriods);

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];

        const date = moment(key, 'YYYY-MM-DD');

        if (date > startDate && date <= endDate) {
          endDate = date.clone().subtract(1, 'day');
        }
      }

      if (endDate <= startDate) {
        endDate = startDate;
      }

      expect(props.form.setFieldValue).toHaveBeenCalledWith(fieldName, [
        startDate.toDate(),
        endDate.toDate(),
      ]);

      expect(setStateSpy).toHaveBeenCalledWith({ calendarVisible: false });
    });

    describe('when date isn`t blocked by owner', () => {
      it('when not the same days', () => {
        const range = [moment().add(1, 'days'), moment().add(2, 'days')];
        instance.onDateRangeChange(range);

        const startDate = range[0];

        const endDate = range[1];

        expect(props.form.setFieldValue).toHaveBeenCalledWith(fieldName, [
          startDate.toDate(),
          endDate.toDate(),
        ]);

        expect(setStateSpy).toHaveBeenCalledWith({ calendarVisible: false });
      });

      it('when the same days', () => {
        const range = [moment().add(1, 'days'), moment().add(1, 'days')];
        instance.onDateRangeChange(range);

        expect(props.form.setFieldValue).toHaveBeenCalledWith(fieldName, null);

        expect(setStateSpy).not.toHaveBeenCalled();
      });

      it('when end date less then start date', () => {
        const range = [moment().add(2, 'days'), moment().add(1, 'days')];
        instance.onDateRangeChange(range);

        const startDate = range[1];

        const endDate = range[0];

        expect(props.form.setFieldValue).toHaveBeenCalledWith(fieldName, [
          startDate.toDate(),
          endDate.toDate(),
        ]);

        expect(setStateSpy).toHaveBeenCalledWith({ calendarVisible: false });
      });
    });
  });

  it('checks `dateRange` instance getter', () => {
    const expected = {
      startDate: isPresent(fieldValue)
        ? moment(R.head(fieldValue)).format(DATE_FORMAT)
        : '',
      endDate: isPresent(fieldValue)
        ? moment(R.last(fieldValue)).format(DATE_FORMAT)
        : '',
    };

    expect(instance.dateRange).toEqual(expected);
  });

  it('checks `formatShortWeekday` instance method', () => {
    const value = instance.formatShortWeekday(null, new Date());

    expect(value).toMatchSnapshot();
  });

  it('checks `tileContent` instance method', () => {
    const value = instance.tileContent(new Date());

    expect(value).toMatchSnapshot();
  });

  describe('checks `tileDisabled` instance method', () => {
    it('should return false', () => {
      const retVal = instance.tileDisabled({ date: new Date() });

      expect(retVal).toBe(false);
    });

    it('should return true', () => {
      const date = moment(new Date('2/20/2000')).subtract(20, 'month');

      const retVal = instance.tileDisabled({ date });

      expect(retVal).toBe(true);
    });

    it('should return true when blocked period matched', () => {
      const date = moment(new Date('2021-01-29'));

      const retVal = instance.tileDisabled({ date });

      expect(retVal).toBe(true);
    });
  });

  it('checks `clearDateRange` instance method', () => {
    instance.clearDateRange();

    expect(props.form.setFieldValue).toHaveBeenCalledWith(fieldName, null);
  });
});
