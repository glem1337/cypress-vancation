import { POLICIES_FORM_VALUES } from 'constants/camper';

const isInstantBook = (camper) => camper?.camperRule?.bookingApprovalPolicy
=== POLICIES_FORM_VALUES.INSTANT_BOOK;

export default isInstantBook;
