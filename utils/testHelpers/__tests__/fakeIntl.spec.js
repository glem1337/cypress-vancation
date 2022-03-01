import fakeIntl from '../fakeIntl';

describe('formatMessage()', () => {
  it('without values', () => {
    const messageObject = {
      id: 'message.id',
    };

    expect(fakeIntl.formatMessage(messageObject)).toBe('{Translation id: message.id}');
  });

  it('with values', () => {
    const messageObject = {
      id: 'message.id',
      values: {
        some: 'value',
        test: 'value2',
      },
    };

    expect(fakeIntl.formatMessage(messageObject)).toBe('{Translation id: message.id, values: { some: \'value\', test: \'value2\' }}');
  });
});
