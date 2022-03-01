import { CAMPER_STATUS } from './camper';

export const FILTER_TITLE_BY_STATUS = {
  [CAMPER_STATUS.ALL]: { id: 'dashboard.allCampers.filterByStatus.all' },
  [CAMPER_STATUS.PUBLISHED]: { id: 'shared.published' },
  [CAMPER_STATUS.UNPUBLISHED]: { id: 'shared.unpublished' },
  [CAMPER_STATUS.ON_MODERATION]: { id: 'shared.onModeration' },
  [CAMPER_STATUS.DRAFT]: { id: 'shared.draft' },
  [CAMPER_STATUS.DEACTIVATED]: { id: 'shared.deactivated' },
};

export const TAG_BY_STATUS = {
  [CAMPER_STATUS.PUBLISHED]: {
    TITLE: { id: 'shared.published' },
    COLOR: 'success',
  },
  [CAMPER_STATUS.UNPUBLISHED]: {
    TITLE: { id: 'shared.unpublished' },
    COLOR: 'processing',
  },
  [CAMPER_STATUS.ON_MODERATION]: {
    TITLE: { id: 'shared.onModeration' },
    COLOR: 'warning',
  },
  [CAMPER_STATUS.DRAFT]: {
    TITLE: { id: 'shared.draft' },
    COLOR: 'default',
  },
  [CAMPER_STATUS.DEACTIVATED]: {
    TITLE: { id: 'shared.deactivated' },
    COLOR: 'error',
  },
};

export const MODAL_CONFIG_BY_STATUS = {
  [CAMPER_STATUS.PUBLISHED]: {
    TITLE: { id: 'dashboard.allCampers.camperStatusModal.published.title' },
    DESCRIPTION: {
      id: 'dashboard.allCampers.camperStatusModal.published.description',
    },
    BUTTON: { id: 'shared.publish' },
  },
  [CAMPER_STATUS.UNPUBLISHED]: {
    TITLE: { id: 'dashboard.allCampers.camperStatusModal.unpublished.title' },
    DESCRIPTION: {
      id: 'dashboard.allCampers.camperStatusModal.unpublished.description',
    },
    BUTTON: { id: 'shared.unpublish' },
  },
  [CAMPER_STATUS.REMOVED]: {
    TITLE: { id: 'dashboard.allCampers.camperStatusModal.removed.title' },
    DESCRIPTION: {
      id: 'dashboard.allCampers.camperStatusModal.removed.description',
    },
    BUTTON: { id: 'shared.remove' },
  },
};

export const SUCCESS_MESSAGE_BY_STATUS = {
  [CAMPER_STATUS.PUBLISHED]: {
    id: 'dashboard.allCampers.camperStatusModal.published.successMsg',
  },
  [CAMPER_STATUS.UNPUBLISHED]: {
    id: 'dashboard.allCampers.camperStatusModal.unpublished.successMsg',
  },
  [CAMPER_STATUS.REMOVED]: {
    id: 'dashboard.allCampers.camperStatusModal.removed.successMsg',
  },
};
