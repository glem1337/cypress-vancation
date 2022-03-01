import React from 'react';
import { shallow } from 'enzyme';
import { delay } from 'lodash';

import closeableNotification from '../closeableNotification';

jest.mock('lodash/delay', () => jest.fn());

describe('closeableNotification', () => {
  const MockedNotification = () => <div>Mocked notification</div>;
  const WrappedComponent = closeableNotification(MockedNotification);
  const props = {
    hideNotification: jest.fn(),
    id: 'id',
    context: 'context',
    kind: 'success',
    closeAfterDelay: true,
  };

  const wrapper = shallow(<WrappedComponent {...props} />);
  const instance = wrapper.instance();

  beforeEach(() => {
    delay.mockClear();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handleClose()', () => {
    instance.handleClose();

    expect(props.hideNotification).toHaveBeenCalledWith({ id: props.id, context: props.context });
  });

  describe('componentDidMount()', () => {
    it('when kind === success', () => {
      instance.componentDidMount();

      expect(delay).toHaveBeenCalledWith(instance.handleClose, 3000);
    });

    it('when kind !== success', () => {
      const wrapperErrorKind = shallow(<WrappedComponent {...{ ...props, kind: 'error' }} />);
      wrapperErrorKind.instance().componentDidMount();

      expect(delay).not.toHaveBeenCalledWith(instance.handleClose, 3000);
    });

    it('when closeAfterDelay === false', () => {
      const wrapperSuccess = shallow(
        <WrappedComponent
          {...{
            ...props,
            closeAfterDelay: false,
          }}
        />,
      );
      const wrapperInstance = wrapperSuccess.instance();
      wrapperInstance.componentDidMount();

      expect(delay).not.toHaveBeenCalledWith(wrapperInstance.handleClose, 3000);
    });
  });

  describe('componentWillUnmount()', () => {
    it('when kind === success', () => {
      const wrapperSuccessKind = shallow(<WrappedComponent {...{ ...props, kind: 'success' }} />);
      const wrapperInstance = wrapperSuccessKind.instance();
      const handleCloseSpy = jest.spyOn(wrapperInstance, 'handleClose');
      wrapperInstance.componentWillUnmount();

      expect(handleCloseSpy).not.toHaveBeenCalledTimes(1);
    });

    it('when kind !== success', () => {
      const wrapperErrorKind = shallow(<WrappedComponent {...{ ...props, kind: 'error' }} />);
      const wrapperInstance = wrapperErrorKind.instance();
      const handleCloseSpy = jest.spyOn(wrapperInstance, 'handleClose');
      wrapperInstance.componentWillUnmount();

      expect(handleCloseSpy).toHaveBeenCalledTimes(1);
    });
  });
});
