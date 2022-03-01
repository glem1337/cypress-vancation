import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import * as R from 'ramda';

import {
  campersSelector,
  campersPageSelector,
  campersTotalSelector,
} from 'state/concepts/campervan-rental/selectors';
import { fetchCampers } from 'state/concepts/campervan-rental/actions';
import { setActiveCamperId } from 'state/concepts/search-destinations/actions';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

export const DATA_TYPE = {
  CAMPERS_CHUNK: 'CampersChunk',
  DESCRIPTION: 'Description',
  FAN_FACTS: 'FunFacts',
  SINGLE_FACT: 'SingleFact',
};

function useContainer() {
  const dispatch = useDispatch();

  const campers = useSelector(campersSelector);
  const page = useSelector(campersPageSelector);
  const total = useSelector(campersTotalSelector);
  const searchParams = useSelector(searchDestinationParamsSelector);

  const description = R.path(['location', 'description'], searchParams);
  const factsTitle = R.path(['location', 'funFactsTitle'], searchParams);
  const facts = R.path(['location', 'funFacts'], searchParams);

  /**
   * On pagination change handler
   */
  const onPaginationChange = (newPage) => {
    dispatch(fetchCampers({
      page: newPage,
    }));
  };

  /**
   * On mouse leave.
   */
  const onMouseLeave = () => {
    if (campers.length > 0) {
      dispatch(setActiveCamperId(null));
    }
  };

  /**
   * Attach fun facts and description
   */
  const prepareCampersLayout = () => {
    let campersData = R.compose(
      R.map(item => ({
        id: uuid(),
        campers: item,
        type: DATA_TYPE.CAMPERS_CHUNK,
      })),
      R.splitEvery(2),
    )(campers);

    if (campers.length > 0 && campers.length < 4) {
      campersData = [
        ...campersData,
        {
          id: uuid(),
          description,
          type: DATA_TYPE.DESCRIPTION,
        },
        {
          id: uuid(),
          factsTitle,
          facts: facts || [],
          type: DATA_TYPE.FAN_FACTS,
        },
      ];
    }

    if (campers.length >= 4 && page === 1) {
      const DESCRIPTION_INDEX = 1;

      campersData = R.insert(
        DESCRIPTION_INDEX,
        {
          id: uuid(),
          description,
          type: DATA_TYPE.DESCRIPTION,
        },
        campersData,
      );

      let fanFactsInsertIndex = 1;
      for (let i = 0; i < R.defaultTo([], facts).length; i += 1) {
        fanFactsInsertIndex += 2;
        const fact = facts[i];

        campersData = R.insert(
          fanFactsInsertIndex,
          {
            ...fact,
            type: DATA_TYPE.SINGLE_FACT,
          },
          campersData,
        );
      }
    }

    return campersData;
  };

  return {
    campers,
    campersData: prepareCampersLayout(),
    page,
    perPage: 20,
    total,
    onPaginationChange,
    onMouseLeave,
    prepareCampersLayout,
  };
}

export default useContainer;
