import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import SearchList from '../container';

jest.mock('lodash/debounce', () => fn => fn);

describe('SearchList container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  const defaultProps = {
    defaultValue: '',
    filterEntities: jest.fn(),
  };

  const wrapper = shallow(<SearchList {...defaultProps} store={store} />);
  const instance = wrapper.instance();

  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it('renders SearchList component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handleSearch()', () => {
    instance.handleSearch('name');
    expect(instance.props.filterEntities).toHaveBeenCalledWith({ name: 'name' });
  });

  it('handleChange()', () => {
    const handleSearchSpy = jest.spyOn(instance, 'handleSearch');
    instance.handleChange({ target: { value: ' name ' } });

    expect(handleSearchSpy).toHaveBeenCalledWith('name');
    expect(instance.state.searchQuery).toEqual(' name ');
  });

  it('handleClear()', () => {
    const handleSearchSpy = jest.spyOn(instance, 'handleSearch');
    instance.handleClear();

    expect(handleSearchSpy).toHaveBeenCalledWith('');
    expect(instance.state.searchQuery).toEqual('');
  });

  describe('componentDidUpdate()', () => {
    it('updates search value if defaultValue is changed', () => {
      const setStateSpy = jest.spyOn(instance, 'setState');
      setStateSpy.mockClear();
      instance.componentDidUpdate({ defaultValue: 'value' });

      expect(setStateSpy).toHaveBeenCalledWith({ searchQuery: '' });
    });

    it('do nothing if defaultValue is not changed', () => {
      const setStateSpy = jest.spyOn(instance, 'setState');
      setStateSpy.mockClear();
      instance.componentDidUpdate({ defaultValue: '' });

      expect(setStateSpy).not.toHaveBeenCalled();
    });
  });
});
