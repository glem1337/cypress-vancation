import {
  leavePage as leavePageMethod,
  leavePagePrepare as leavePagePrepareMethod,
  leavePageCondition as leavePageConditionMethod,
} from '../leavePageHelper';

describe('leavePageHelper helper', () => {
  const thisContext = {
    props: {
      hideModal: jest.fn(),
      handleSubmit: jest.fn(),
      setFieldValue: jest.fn(),
      router: {
        push: jest.fn(),
      },
    },
  };

  const leavePage = leavePageMethod.bind(thisContext);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('checks `leavePage` method when isSaving === true', async () => {
    await leavePage(true, 'home')();

    expect(thisContext.props.setFieldValue).toHaveBeenCalledWith('redirectRoute', 'home');
    expect(thisContext.props.handleSubmit).toHaveBeenCalled();
    expect(thisContext.props.router.push).not.toHaveBeenCalled();
  });

  it('checks `leavePage` method when isSaving === false', async () => {
    await leavePage(false, 'home')();

    expect(thisContext.props.setFieldValue).not.toHaveBeenCalled();
    expect(thisContext.props.handleSubmit).not.toHaveBeenCalled();
    expect(thisContext.props.router.push).toHaveBeenCalledWith('home');
  });
});

describe('leavePagePrepare helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('checks `leavePage` method when is valid', async () => {
    const thisContext = {
      props: {
        dirty: true,
        showModal: jest.fn(),
        isValid: true,
        router: {
          push: jest.fn(),
        },
        validateForm: jest.fn(),
      },
      leavePage: jest.fn(() => true),
    };

    const leavePagePrepare = leavePagePrepareMethod.bind(thisContext);
    await leavePagePrepare('test');

    expect(thisContext.props.validateForm).toHaveBeenCalled();
    expect(thisContext.props.showModal).toHaveBeenCalledWith({
      modalType: 'LEAVE_PAGE_MODAL',
      modalProps: {
        discard: true,
        save: true,
      },
    });
    expect(thisContext.props.router.push).not.toHaveBeenCalledWith();
  });

  it('checks `leavePage` method when is valid', async () => {
    const thisContext = {
      props: {
        dirty: false,
        showModal: jest.fn(),
        isValid: false,
        router: {
          push: jest.fn(),
        },
        validateForm: jest.fn(),
      },
      leavePage: jest.fn(() => true),
    };

    const leavePagePrepare = leavePagePrepareMethod.bind(thisContext);
    await leavePagePrepare('test');

    expect(thisContext.props.validateForm).toHaveBeenCalled();
    expect(thisContext.props.showModal).not.toHaveBeenCalled();
    expect(thisContext.props.router.push).toHaveBeenCalledWith('test');
  });
});

describe('checks `leavePageCondition` method', () => {
  it('when isSidebarVisible === true', () => {
    const thisContext = {
      props: {
        isSidebarVisible: true,
      },
      leavePagePrepare: jest.fn(),
    };

    const leavePageCondition = leavePageConditionMethod.bind(thisContext);
    leavePageCondition({ isSidebarVisible: true });

    expect(thisContext.leavePagePrepare).not.toHaveBeenCalled();
  });

  it('when isSidebarVisible === false', () => {
    const thisContext = {
      props: {
        isSidebarVisible: false,
      },
      leavePagePrepare: jest.fn(),
    };

    const leavePageCondition = leavePageConditionMethod.bind(thisContext);
    leavePageCondition({ isSidebarVisible: true });

    expect(thisContext.leavePagePrepare).toHaveBeenCalled();
  });
});
