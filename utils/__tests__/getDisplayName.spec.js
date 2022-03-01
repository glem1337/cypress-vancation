import getDisplayName from '../getDisplayName';

describe('getDisplayName()', () => {
  it('return .displayName if present', () => {
    const TestComponent = () => <p>test</p>;
    TestComponent.displayName = 'DisplayName';

    expect(getDisplayName(TestComponent)).toEqual('DisplayName');
  });

  it('return .name if present', () => {
    const TestComponent = () => <p>test</p>;
    expect(getDisplayName(TestComponent)).toEqual('TestComponent');
  });

  it('return UnknownComponent if no displayName or name present', () => {
    expect(getDisplayName(() => <p>test</p>)).toEqual('UnknownComponent');
  });
});
