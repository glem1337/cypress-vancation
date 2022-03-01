export const MESSAGE_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARN: 'warning',
};

export const MESSAGE_DURATION = 7;

export const MESSAGE_ICONS_CLASS = {
  [MESSAGE_TYPE.SUCCESS]: 'in-green-300',
  [MESSAGE_TYPE.ERROR]: 'in-red-1000',
  [MESSAGE_TYPE.INFO]: 'in-blue-1000',
  [MESSAGE_TYPE.WARN]: 'in-yellow-1000',
};
