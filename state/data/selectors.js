import { createSelector } from 'reselect';
import { path, split, last, prop } from 'ramda';

export const metaSelector = state => state.data.meta;

export const loadingSelector = createSelector(
  metaSelector,
  (_, endpoint) => endpoint,
  (meta, endpoint) => (meta[endpoint] && meta[endpoint].loading),
);

export const linksSelector = createSelector(
  metaSelector,
  (_, endpoint) => endpoint,
  (meta, endpoint) => path([endpoint, 'links'], meta),
);

export const endpointMetaSelector = createSelector(
  metaSelector,
  (_, endpoint) => endpoint,
  (meta, endpoint) => path([endpoint, 'meta'], meta),
);

export const totalCountSelector = createSelector(
  endpointMetaSelector,
  prop('total'),
);

export const pageCountSelector = createSelector(
  linksSelector,
  links => (
    links && Number(
      last(
        split('?page=', prop('last', links)),
      ),
    )
  ),
);
