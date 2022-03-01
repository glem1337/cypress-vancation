import getStateShortCodeFromMapboxResult from '../getStateShortCodeFromMapboxResult';

describe('getStateShortCodeFromMapboxResult helpers', () => {
  it('should return `US`', () => {
    const item = {
      id: 'place.2618194975964500',
      type: 'Feature',
      place_type: [
        'place',
      ],
      relevance: 1,
      properties: {
        wikidata: 'Q60',
      },
      text: 'New York',
      place_name: 'New York, New York, United States',
      matching_text: 'Ню Йорк',
      matching_place_name: 'Ню Йорк, New York, United States',
      bbox: [
        -74.25909,
        40.477399,
        -73.700272,
        40.917577,
      ],
      center: [
        -73.9866,
        40.7306,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          -73.9866,
          40.7306,
        ],
      },
      context: [
        {
          id: 'district.12113562209855570',
          wikidata: 'Q500416',
          text: 'New York County',
        },
        {
          id: 'region.17349986251855570',
          wikidata: 'Q1384',
          short_code: 'US-NY',
          text: 'New York',
        },
        {
          id: 'country.19678805456372290',
          wikidata: 'Q30',
          short_code: 'us',
          text: 'United States',
        },
      ],
    };

   const shortCode = getStateShortCodeFromMapboxResult(item);

    expect(shortCode).toBe('US');
  });

  it('should return `NJ`', () => {
    const item = {
      id: 'region.8524001885700330',
      type: 'Feature',
      place_type: [
        'region',
      ],
      relevance: 1,
      properties: {
        wikidata: 'Q1408',
        short_code: 'US-NJ',
      },
      text: 'New Jersey',
      place_name: 'New Jersey, United States',
      bbox: [
        -75.5741859892775,
        38.8516494003392,
        -73.8722201035284,
        41.3574239900958,
      ],
      center: [
        -74.3893168105238,
        40.1502478924,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          -74.3893168105238,
          40.1502478924,
        ],
      },
      context: [
        {
          id: 'region.19678805456372290',
          wikidata: 'Q30',
          short_code: 'us',
          text: 'United States',
        },
      ],
    };

    const shortCode = getStateShortCodeFromMapboxResult(item);

    expect(shortCode).toBe('NJ');
  });

  it('should return `NJ`', () => {
    const item = {
      id: 'region.8524001885700330',
      type: 'Feature',
      place_type: [
        'region',
      ],
      relevance: 1,
      text: 'New Jersey',
      place_name: 'New Jersey, United States',
      bbox: [
        -75.5741859892775,
        38.8516494003392,
        -73.8722201035284,
        41.3574239900958,
      ],
      center: [
        -74.3893168105238,
        40.1502478924,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          -74.3893168105238,
          40.1502478924,
        ],
      },
      context: [
        {
          id: 'region.19678805456372290',
          wikidata: 'Q30',
          short_code: 'us-NJ',
          text: 'United States',
        },
      ],
    };

    const shortCode = getStateShortCodeFromMapboxResult(item);

    expect(shortCode).toBe('NJ');
  });

  it('should return `UA`', () => {
    const item = {
      id: 'country.11057181120896310',
      type: 'Feature',
      place_type: [
        'place',
      ],
      relevance: 1,
      properties: {
        wikidata: 'Q237206',
      },
      text: 'Павлоград',
      place_name: 'Павлоград',
      bbox: [
        35.794242557,
        48.475229427,
        35.974050664,
        48.585938431,
      ],
      center: [
        35.8704,
        48.5317,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          35.8704,
          48.5317,
        ],
      },
      context: [
        {
          id: 'country.19678805456372290',
          wikidata: 'Q30',
          short_code: 'UA',
          text: 'Ukraine',
        },
      ],
    };

    const shortCode = getStateShortCodeFromMapboxResult(item);

    expect(shortCode).toBe('UA');
  });

  it('should return null', () => {
    const shortCode = getStateShortCodeFromMapboxResult(null);

    expect(shortCode).toBe(null);
  });
});
