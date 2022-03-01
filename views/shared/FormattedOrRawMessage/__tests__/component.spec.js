import React from 'react';
import { shallow } from 'enzyme';
import FormattedOrRawMessage from '../component';

describe('InputField component', () => {
  it('when message is missing', () => {
    expect(shallow(<FormattedOrRawMessage />)).toMatchSnapshot();
  });

  it('when message is string', () => {
    expect(shallow(<FormattedOrRawMessage message="string message" />)).toMatchSnapshot();
  });

  it('when message is intl message description object', () => {
    const message = {
      id: 'message.id',
      values: {
        some: 'value',
      },
    };
    expect(shallow(<FormattedOrRawMessage message={message} />)).toMatchSnapshot();
  });
});
