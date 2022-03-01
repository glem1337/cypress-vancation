import filtersLabelText from '../filtersLabelText';

describe('filtersLabelText()', () => {
  it('returns filters label when one filter presented', () => {
    const filters = ['active'];
    const options = [{ value: 'active', label: 'test_label' }];

    expect(filtersLabelText({ filters, options })).toEqual('test_label');
  });

  it('returns filters label when presented more than one filter', () => {
    const filters = ['active', '1'];
    const options = [
      { value: 'active', label: 'test_label' },
      { value: '1', label: 'Design' },
    ];

    expect(filtersLabelText({ filters, options })).toEqual({
      id: 'shared.filters.appliedFilters',
      values: { count: filters.length },
    });
  });

  it('returns default label when filters didn\'t apply', () => {
    const filters = [];
    const options = [{ value: 'active', label: 'test_label' }];
    const namespace = 'fake_namespace';

    expect(filtersLabelText({ filters, options, namespace })).toEqual({
      id: 'shared.filters.defaultLabel',
      values: { namespace },
    });
  });
});
