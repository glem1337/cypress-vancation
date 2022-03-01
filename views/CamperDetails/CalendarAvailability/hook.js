import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

function useContainer() {
  const dispatch = useDispatch();

  const containerRef = useRef();

  const observer = useRef();

  const isDataRequested = useRef(false);

  const router = useRouter();

  const searchParams = useSelector(searchDestinationParamsSelector);

  const camperId = R.path(['query', 'camper_id'], router);

  /**
   * Handle intersect
   */
  const handleIntersect = (entries) => {
    const isIntersecting = R.path(['0', 'isIntersecting'], entries);

    if (!isIntersecting || isDataRequested.current) {
      return false;
    }

    dispatch(fetchCamperCalendar({ camperId }));

    return true;
  };

  /**
   * Unmount
   */
  const unmount = () => {
    if (!observer?.current?.unobserve || !containerRef?.current) {
      return false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    observer.current.unobserve(containerRef.current);

    return true;
  };

  /**
   * Mounting.
   */
  useEffect(() => {
    if (!containerRef?.current) {
      return null;
    }

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '700px',
    });
    observer.current.observe(containerRef.current);

    return unmount;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    containerRef,
    searchParams,
    handleIntersect,
    unmount,
  };
}

export default useContainer;
