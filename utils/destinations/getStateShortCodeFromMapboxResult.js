import * as R from 'ramda';

import isPresent from 'utils/isPresent';

const getStateShortCodeFromMapboxResult = (mapBoxItem) => {
  try {
    if (R.isNil(mapBoxItem)) {
      throw new Error('mapBoxItem is undefined');
    }

    let shortStateCode = null;

    shortStateCode = R.compose(
      R.defaultTo(null),
      R.nth(1),
      R.split('-'),
      R.defaultTo(''),
      R.path(['properties', 'short_code']),
    )(mapBoxItem);

    if (isPresent(shortStateCode)) {
      return shortStateCode;
    }

    shortStateCode = R.compose(
      (value) => {
        if (value) {
          return R.toUpper(value);
        }

        return null;
      },
      R.path(['short_code']),
      R.nth(0),
      R.filter(i => i.id.indexOf('country') >= 0),
      R.defaultTo([]),
      R.path(['context']),
    )(mapBoxItem);

    if (isPresent(shortStateCode)) {
      return shortStateCode;
    }

    shortStateCode = R.compose(
      R.defaultTo(null),
      R.nth(1),
      R.split('-'),
      R.defaultTo(''),
      R.path(['short_code']),
      R.nth(0),
      R.filter(i => i.id.indexOf('region') >= 0),
      R.defaultTo([]),
      R.path(['context']),
    )(mapBoxItem);

    return shortStateCode;
  } catch (err) {
    /* istanbul ignore next */
    console.log(err?.message); // eslint-disable-line no-console
    return null;
  }
};

export default getStateShortCodeFromMapboxResult;
