import formatJsonApiErrors from '../formatJsonApiErrors';

describe('formatJsonApiErrors', () => {
  it('base', () => {
    const errors = [
      {
        source: {
          pointer: '/data/attributes/base',
        },
        detail: 'This is base error',
      },
    ];
    expect(formatJsonApiErrors(errors)).toEqual({ base: 'This is base error' });
  });

  // POSSIBLY_NEEDED
  // it('empty pointer', () => {
  //   const errors = [
  //     {
  //       source: {
  //         pointer: '',
  //       },
  //       detail: 'This is base error',
  //     },
  //   ];
  //   expect(formatJsonApiErrors(errors)).toEqual({ base: 'This is base error' });
  // });

  it('multilpe errors', () => {
    const errors = [
      {
        source: {
          pointer: '/data/attributes/base',
        },
        detail: 'This is base error',
      },
      {
        source: {
          pointer: '/data/attributes/customAttribute',
        },
        detail: 'This is custom error',
      },
    ];

    expect(formatJsonApiErrors(errors)).toEqual({
      base: 'This is base error',
      customAttribute: 'This is custom error',
    });
  });

  it('nested attributes', () => {
    const errors = [
      {
        source: {
          pointer: '/data/attributes/some_attribute/nested_attribute/even_deeper/so_deep',
        },
        detail: 'This is a very deep nested attribute error',
      },
      {
        source: {
          pointer: '/data/attributes/some_attribute/nested_attribute/even_deeper/much_deep_too',
        },
        detail: 'This is very deep nested attribute error too',
      },
      {
        source: {
          pointer: '/data/attributes/some_attribute/nested_attribute/another_deep_attribute',
        },
        detail: 'This is a another nested attribute error',
      },
    ];

    expect(formatJsonApiErrors(errors)).toEqual({
      someAttribute: {
        nestedAttribute: {
          evenDeeper: {
            soDeep: 'This is a very deep nested attribute error',
            muchDeepToo: 'This is very deep nested attribute error too',
          },
          anotherDeepAttribute: 'This is a another nested attribute error',
        },
      },
    });
  });

  it('multiple errors for one attribute', () => {
    const errors = [
      {
        source: {
          pointer: '/data/attributes/some_attribute/has_two_errors',
        },
        detail: 'First error',
      },
      {
        source: {
          pointer: '/data/attributes/some_attribute/has_two_errors',
        },
        detail: 'Second error',
      },
      {
        source: {
          pointer: '/data/attributes/some_attribute/one_error',
        },
        detail: 'only error',
      },
      {
        source: {
          pointer: '/data/attributes/other_attribute',
        },
        detail: 'Other attribute error',
      },
    ];

    expect(formatJsonApiErrors(errors)).toEqual({
      someAttribute: {
        hasTwoErrors: 'First error. Second error',
        oneError: 'Only error',
      },
      otherAttribute: 'Other attribute error',
    });
  });

  it('capitalizes errors', () => {
    const errors = [
      {
        source: {
          pointer: '/data/attributes/base',
        },
        detail: 'error',
      },
    ];
    expect(formatJsonApiErrors(errors)).toEqual({ base: 'Error' });
  });

  it('should return `Unknown error` when there is no errors data', () => {
    expect(formatJsonApiErrors(null)).toEqual({ base: 'Unknown error' });
  });
});
