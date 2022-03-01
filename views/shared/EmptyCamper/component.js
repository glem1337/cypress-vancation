import BtnGradient from 'views/shared/BtnGradient';
import { FormattedMessage } from 'react-intl';

import ROUTES from 'constants/routes';

import { createRouteFromPathname } from 'utils/createRouteHelper';

const EmptyCamper = () => (
  <div className="master-view__empty">
    <img className="mb-24" src="/images/Empty.svg" alt="" />
    <p className="mb-24">
      <FormattedMessage id="shared.youDoNotHaveAnyCampersYet" />
    </p>
    <a
      href={createRouteFromPathname(
        ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
        'id',
      )}
      target="_blank"
      rel="noreferrer"
    >
      <BtnGradient
        className="min-w-160"
        size="large"
        text={{ id: 'shared.listYourCamper' }}
      />
    </a>
  </div>
);

export default EmptyCamper;
