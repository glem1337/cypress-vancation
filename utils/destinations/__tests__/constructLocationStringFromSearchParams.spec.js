import constructLocationStringFromSearchParams from '../constructLocationStringFromSearchParams';

describe('constructLocationStringFromSearchParams helper', () => {
  it('when isLandingPage === true and constructLandingName === false', () => {
    const params = {
      dateRange: null,
      location: { slug: 'test' },
    };

    const res = constructLocationStringFromSearchParams(params);

    expect(res).toBe('');
  });

  it('with data', () => {
    const params = {
      dateRange: null,
      location: {
        landingName: 'test landingName',
        placeName: 'test placeName',
      },
    };

    const res = constructLocationStringFromSearchParams(params, true);

    expect(res).toBe('test landingName');
  });
});
