import React from 'react';
import { Pagination, Divider } from 'antd';
import { FormattedMessage } from 'react-intl';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';
import OtherPopularDestinations from 'views/Destinations/OtherPopularDestinations';

import CollapsibleText from '../CollapsibleText';
import CamperCard from '../CamperCard';
import InnerHtmlField from '../InnerHtmlField';

import useContainer, { DATA_TYPE } from './hook';

const Campers = () => {
  const { isSearchResultsPage } = useDestinationPageStats();

  const {
    campers,
    page,
    perPage,
    total,
    onPaginationChange,
    onMouseLeave,
    campersData,
  } = useContainer();

  return (
    <>
      <div
        className="search-page__results-campers"
        onMouseLeave={onMouseLeave}
      >
        {isSearchResultsPage && campers?.length === 0 && (
          <OtherPopularDestinations />
        )}
        {isSearchResultsPage && (
          <div className="search-page__results-campers__grid">
            {campers?.map(camper => (
              <CamperCard
                key={camper.id}
                camper={camper}
              />
            ))}
          </div>
        )}
        {!isSearchResultsPage && campersData.map(item => {
          if (item.type === DATA_TYPE.DESCRIPTION) {
            return (
              <div className="mb-24" key={item.id}>
                <CollapsibleText>
                  <InnerHtmlField html={item.description} />
                </CollapsibleText>
              </div>
            );
          }

          if (item.type === DATA_TYPE.FAN_FACTS) {
            return (
              <div key={item.id}>
                <Divider className="mt-24 mb-24" />
                <h2 className="text-headline mb-24">{item.factsTitle}</h2>
                {item.facts.map(fact => (
                  <div className="search-page__results-fact mb-24" key={fact.id}>
                    <img
                      className="search-page__results-fact-icon"
                      src="/images/Fun Fact.svg"
                      alt=""
                    />
                    <InnerHtmlField html={fact.text} />
                  </div>
                ))}
              </div>
            );
          }

          if (item.type === DATA_TYPE.SINGLE_FACT) {
            return (
              <div className="search-page__results-fact mb-24" key={item.id}>
                <img
                  className="search-page__results-fact-icon"
                  src="/images/Fun Fact.svg"
                  alt=""
                />
                <InnerHtmlField html={item.text} />
              </div>
            );
          }

          return (
            <div className="search-page__results-campers__grid mb-24" key={item.id}>
              {item.campers.map(camper => (
                <CamperCard
                  key={camper.id}
                  camper={camper}
                />
              ))}
            </div>
          );
        })}
      </div>
      {total > perPage && (
        <div className="d-flex flex-column align-items-center mt-24 mt-md-40">
          <Pagination
            current={page}
            total={total}
            pageSize={perPage}
            showSizeChanger={false}
            onChange={onPaginationChange}
          />
          <div className="mt-24">
            <FormattedMessage
              id="search-destination.paginationPhrase"
              values={{
                page,
                perPage: Math.min(perPage, total),
                total,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Campers;
