import {
  cond, always, T, head, find, propEq, prop,
} from 'ramda';

const filtersLabelText = ({ filters, options, namespace }) => cond([
  [
    () => filters.length === 1,
    always(prop('label', find(propEq('value', head(filters)), options))),
  ],
  [
    () => filters.length > 1,
    always({ id: 'shared.filters.appliedFilters', values: { count: filters.length } }),
  ],
  [T, always({ id: 'shared.filters.defaultLabel', values: { namespace } })],
])();

export default filtersLabelText;
