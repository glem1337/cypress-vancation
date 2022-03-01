import constructDatesStringFromSearchParams from '../constructDatesStringFromSearchParams';

describe('constructDatesStringFromSearchParams helper', () => {
  it('without dates and for landing page', () => {
    const params = {
      dateRange: null,
      location: { slug: 'test' },
    };

    const res = constructDatesStringFromSearchParams(params);

    expect(res).toEqual({ id: 'shared.dates' });
  });

  it('without dates and not for landing page', () => {
    const params = {
      dateRange: null,
      location: null,
    };

    const res = constructDatesStringFromSearchParams(params);

    expect(res).toEqual({ id: 'shared.addDates' });
  });

  it('with dates', () => {
    const params = {
      dateRange: [new Date(), new Date()],
      location: null,
    };

    const res = constructDatesStringFromSearchParams(params);

    expect(res).toBe('Feb 20 - Feb 20');
  });
});
