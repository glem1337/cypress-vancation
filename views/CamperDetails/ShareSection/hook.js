import { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import * as R from 'ramda';

import { CAMPER_PHOTO_DEFAULT } from 'constants/camper';
import { camperSelector } from 'state/concepts/camper/selectors';

function useContainer() {
  const intl = useIntl();

  const router = useRouter();

  const [isDropDownVisible, setDropDownVisibility] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [, setCopyUUID] = useState(null);

  const camper = useSelector(state => camperSelector(state, router.query.camper_id));

  // Shared email data
  const sharedEmailData = {
    url: `${camper?.name} ${window.location.href}`,
    subject: intl.formatMessage({ id: 'camperDetails.share.email.subject' }),
  };

  const mainPhoto = R.compose(
    R.defaultTo(CAMPER_PHOTO_DEFAULT),
    R.prop('photoUrl1100'),
    R.defaultTo({}),
    R.head,
    R.sort((a, b) => a.position - b.position),
    R.defaultTo([]),
    R.path(['camperPhotos']),
  )(camper);

  // Shared social data
  const sharedSocialData = {
    url: window.location.href,
    mainPhoto,
  };

  const handlers = useRef({
    /**
     * Handle click outside
     */
    handleClickOutside: (event) => {
      const dropDownWrapper = document.querySelector('.share-section__dropdown');

      if (!dropDownWrapper) {
        return false;
      }

      if (!dropDownWrapper.contains(event?.target)) {
        setDropDownVisibility(false);
        return false;
      }

      return true;
    },
  });

  /**
   * Toggle drop down visibility
   */
  const toggleDropdownVisibility = () => {
    setDropDownVisibility(prev => !prev);
  };

  /**
   * Copy URL to clipboard
   */
  const copyUrlToClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);

    setIsUrlCopied(true);
    setCopyUUID(uuid());

    setTimeout(() => {
      setIsUrlCopied(false);
    }, 3000);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handlers?.current?.handleClickOutside);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.removeEventListener('mousedown', handlers?.current?.handleClickOutside);
    };
  }, []);

  return {
    isDropDownVisible,
    toggleDropdownVisibility,
    sharedEmailData,
    handlers,
    copyUrlToClipBoard,
    isUrlCopied,
    sharedSocialData,
  };
}

export default useContainer;
