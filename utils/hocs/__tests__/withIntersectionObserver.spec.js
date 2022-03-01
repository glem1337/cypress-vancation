import { shallow } from 'enzyme';
import withIntersectionObserver from '../withIntersectionObserver';

const Target = () => null;

describe('withIntersectionObserver HOC tests', () => {
  let observerCallback = null;
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();

  global.IntersectionObserver = jest.fn((callback = jest.fn()) => {
    observerCallback = callback;

    return {
      observe: mockObserve,
      disconnect: mockUnobserve,
    };
  });

  let container = null;
  let instance = null;
  let setStateSpy = null;

  const thresholds = {
    foo: 0.5,
    bar: 1,
  };
  const options = {
    rootMargin: '20% 0px',
  };

  beforeEach(() => {
    const EnhancedTarget = withIntersectionObserver(
      thresholds,
      options,
    )(Target);

    container = shallow(<EnhancedTarget />, {
      disableLifecycleMethods: true,
    });
    instance = container.instance();
    instance.onRef('ref');
    setStateSpy = jest.spyOn(instance, 'setState');
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks register observer', () => {
    const observerOptions = {
      ...options,
      threshold: Object.keys(thresholds).map((prop) => thresholds[prop]),
    };

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      observerCallback,
      observerOptions,
    );
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    expect(mockObserve).toHaveBeenCalledWith('ref');
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(mockUnobserve).toHaveBeenCalled();
  });

  it('checks `onObserve` instance method', () => {
    const entries = [
      {
        isIntersecting: true,
        intersectionRatio: 0.5,
      },
    ];

    instance.onObserve(entries);

    const expected = Object.keys(thresholds).reduce(
      (totalResult, prop) => ({
        ...totalResult,
        ...entries.reduce(
          (entriesResult, entry) => ({
            ...entriesResult,
            [prop]:
              entry.isIntersecting
              && entry.intersectionRatio >= thresholds[prop],
          }),
          {},
        ),
      }),
      {},
    );

    expect(setStateSpy).toHaveBeenCalledWith(expected);
  });

  it('checks `onRef` instance method', () => {
    const mockOnRef = jest.fn();

    container.setProps({
      onRef: mockOnRef,
    });

    instance.onRef('ref');

    expect(mockOnRef).toHaveBeenCalledWith('ref');
  });

  it('should map observer state to boolean props', () => {
    observerCallback([
      { isIntersecting: true, intersectionRatio: thresholds.foo },
    ]);

    container.update();

    const target = container.find(Target);

    expect(target).toMatchSnapshot();

    const { foo, bar } = target.props();

    expect(foo).toBe(true);
    expect(bar).toBe(false);
  });
});
