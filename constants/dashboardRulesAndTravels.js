export const CUSTOM_RULE_MAX_NAME_LENGTH = 70;

export const RULES_CONFIG = [
  {
    name: 'restrictionRule.allowPets',
    icon: '/images/edit_listing/rules/Pets-Allowed.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.rules.allowPets.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.rules.allowPets.description',
    },
    disabled: false,
  },
  {
    name: 'restrictionRule.smoking',
    icon: '/images/edit_listing/rules/Smoking-Allowed.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.rules.smoking.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.rules.smoking.description',
    },
    disabled: false,
  },
  {
    name: 'restrictionRule.festivalApproved',
    icon: '/images/edit_listing/rules/Festival-Approved.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.rules.festivalApproved.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.rules.festivalApproved.description',
    },
    disabled: false,
  },
];

export const TRAVELS_CONFIG = [
  {
    name: 'travelRestriction.mexico',
    icon: '/images/edit_listing/rules/Mexico.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.travels.mexico.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.travels.mexico.description',
    },
    disabled: true,
  },
  {
    name: 'travelRestriction.canada',
    icon: '/images/edit_listing/rules/Canada.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.travels.canada.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.travels.canada.description',
    },
    disabled: false,
  },
  {
    name: 'travelRestriction.burningMan',
    icon: '/images/edit_listing/rules/Burning-Man.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.travels.burningMan.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.travels.burningMan.description',
    },
    disabled: false,
  },
];

export const ROADS_CONFIG = [
  {
    name: 'restrictionRoad.fourWheelRoad',
    icon: '/images/edit_listing/rules/4x4-Only-Roads.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.fourWheel.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.fourWheel.description',
    },
    disabled: false,
  },
  {
    name: 'restrictionRoad.offRoad',
    icon: '/images/edit_listing/rules/Off-Road.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.offRoad.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.offRoad.description',
    },
    disabled: false,
  },
  {
    name: 'restrictionRoad.snowAndIceRoad',
    icon: '/images/edit_listing/rules/Snow-Icy-Road-Conditions.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.icyRoad.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.icyRoad.description',
    },
    disabled: false,
  },
  {
    name: 'restrictionRoad.dirtyRoad',
    icon: '/images/edit_listing/rules/Dirt-Gravel-Roads.svg',
    title: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.dirtyRoad.title',
    },
    description: {
      id: 'dashboard.editCamper.rulesAndTravels.roads.dirtyRoad.description',
    },
    disabled: false,
  },
];

export const CUSTOM_RESTRICTION_KEYS = {
  RULES: 'customRestrictionRules',
  TRAVELS: 'customTravelRestrictions',
  ROADS: 'customRestrictionRoads',
};

export const CUSTOM_RESTRICTION_TYPES = {
  [CUSTOM_RESTRICTION_KEYS.RULES]: 'CustomRestrictionRule',
  [CUSTOM_RESTRICTION_KEYS.TRAVELS]: 'CustomTravelRestriction',
  [CUSTOM_RESTRICTION_KEYS.ROADS]: 'CustomRestrictionRoad',
};

export const CUSTOM_RESTRICTION_KINDS = {
  [CUSTOM_RESTRICTION_KEYS.RULES]: 'customRestrictionRule',
  [CUSTOM_RESTRICTION_KEYS.TRAVELS]: 'customTravelRestriction',
  [CUSTOM_RESTRICTION_KEYS.ROADS]: 'customTravelRestriction',
};
