import React from 'react';
import PropTypes from 'prop-types';

import FlashMessage from './FlashMessage';

const FlashMessageRootComponent = ({
  messages,
  intl,
  hideMessage,
}) => (
  <>
    {Object.keys(messages).map(key => {
      const message = messages[key];

      return (
        <FlashMessage
          {...message}
          key={message.id}
          intl={intl}
          hideMessage={hideMessage}
        />
      );
    })}
  </>
);

FlashMessageRootComponent.propTypes = {
  messages: PropTypes.shape().isRequired,
  intl: PropTypes.shape().isRequired,
  hideMessage: PropTypes.func.isRequired,
};

export default FlashMessageRootComponent;
