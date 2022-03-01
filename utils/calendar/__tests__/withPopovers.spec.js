import { shallow } from 'enzyme';

import withPopovers from '../withPopovers';

describe('withPopovers HOC tests', () => {
  const MockComponent = () => (
    <p>
      Test
    </p>
  );

  const ComponentWithPopovers = withPopovers(MockComponent);

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    container = shallow(<ComponentWithPopovers />);
    instance = container.instance();
    setStateSpy = jest.spyOn(instance, 'setState');

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `checkOpenedState` instance method', () => {
    it('when selected slots were changed', () => {
      const prevProps = {
        selectedSlots: {
          uuid: '1',
        },
      };

      const props = {
        selectedSlots: {
          uuid: '2',
        },
      };

      instance.checkOpenedState(prevProps, props);

      expect(setStateSpy).toHaveBeenCalledWith({
        isOpened: false,
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: false,
      });
    });

    it('when data was updated', () => {
      const prevProps = {
        isSubmitting: true,
      };

      const props = {
        isSubmitting: false,
        isValid: true,
      };

      instance.checkOpenedState(prevProps, props);

      expect(setStateSpy).toHaveBeenCalledWith({
        isOpened: false,
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: false,
      });
    });
  });

  it('checks `showPopover` instance method', () => {
    instance.showPopover({ popoverName: 'isBackPopoverVisible' })();

    expect(setStateSpy).toHaveBeenCalledWith({
      isBackPopoverVisible: true,
      isDiscardPopoverVisible: false,
      isSavePopoverVisible: false,
    });
  });

  describe('checks `showPopoverOrBack` instance method', () => {
    it('should show popover', () => {
      instance.showPopoverOrBack({
        popoverName: 'isSavePopoverVisible',
        props: {
          dirty: true,
          isValid: true,
        },
      })();

      expect(setStateSpy).toHaveBeenCalledWith({
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: true,
      });
    });

    it('should go back', () => {
      const resetForm = jest.fn();

      instance.showPopoverOrBack({
        popoverName: 'isSavePopoverVisible',
        props: {
          dirty: true,
          isValid: false,
          resetForm,
        },
      })();

      expect(setStateSpy).toHaveBeenCalledWith({
        isOpened: false,
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: false,
      });

      expect(resetForm).toHaveBeenCalled();
    });
  });

  it('checks `closePopover` instance method', () => {
    instance.closePopover({ popoverName: 'isBackPopoverVisible' })();

    expect(setStateSpy).toHaveBeenCalledWith({
      isBackPopoverVisible: false,
    });
  });

  it('checks `closeAllPopovers` instance method', () => {
    instance.closeAllPopovers();

    expect(setStateSpy).toHaveBeenCalledWith({
      isBackPopoverVisible: false,
      isDiscardPopoverVisible: false,
      isSavePopoverVisible: false,
    });
  });

  it('checks `closePopoversAndBack` instance method', () => {
    const resetForm = jest.fn();

    instance.closePopoversAndBack({ props: { resetForm } })();

    expect(setStateSpy).toHaveBeenCalledWith({
      isOpened: false,
      isBackPopoverVisible: false,
      isDiscardPopoverVisible: false,
      isSavePopoverVisible: false,
    });

    expect(resetForm).toHaveBeenCalled();
  });

  it('checks `closePopoversAndSave` instance method', () => {
    const submitForm = jest.fn();

    instance.closePopoversAndSave({ props: { submitForm } })();

    expect(setStateSpy).toHaveBeenCalledWith({
      isBackPopoverVisible: false,
      isDiscardPopoverVisible: false,
      isSavePopoverVisible: false,
    });

    expect(submitForm).toHaveBeenCalled();
  });

  it('checks `toggleOpenedState` instance method', () => {
    instance.toggleOpenedState();

    expect(setStateSpy).toHaveBeenCalledWith({
      isOpened: true,
    });
  });
});
