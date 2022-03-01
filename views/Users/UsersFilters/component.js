import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { USERS_ROLES_FILTERS, USERS_STATUSES_FILTERS } from 'constants/users';
import filtersLabelText from 'utils/filtersLabelText';
import Button from 'views/shared/Button';
import CheckboxGroupField from 'views/shared/CheckboxGroupField';
import Dropdown from 'views/shared/Dropdown';

const UsersFiltersComponent = ({
  onSubmit,
  appliedFilters,
  onReset,
  onVisibleChange,
  isOpen,
}) => {
  const hasAppliedFilters = appliedFilters.length > 0;

  return (
    <Dropdown
      className="main-popup"
      visible={isOpen}
      onVisibleChange={onVisibleChange}
      placement="bottomRight"
      icon={(
        <Button
          className="min-w-96 ml-16 main-page__filter-btn"
          type="submit"
          icon="filter"
          text={filtersLabelText({
            filters: appliedFilters,
            options: [...USERS_ROLES_FILTERS, ...USERS_STATUSES_FILTERS],
            namespace: 'users',
          })}
          size="medium"
        />
      )}
    >
      <div className="main-dropdown main-page__filter-dropdown">
        <div className="main-dropdown__body">
          <Field
            name="roles"
            className="main-dropdown__section"
            titleClassName="main-dropdown__title"
            checkboxClassName="main-dropdown__item"
            component={CheckboxGroupField}
            title={{ id: 'shared.filters.statuses.title' }}
            options={USERS_ROLES_FILTERS}
          />
          <div className="main-separator" />

          <Field
            name="statuses"
            className="main-dropdown__section"
            titleClassName="main-dropdown__title"
            checkboxClassName="main-dropdown__item"
            component={CheckboxGroupField}
            title={{ id: 'usersFilters.roles.title' }}
            options={USERS_STATUSES_FILTERS}
          />
        </div>
        <div className="main-dropdown__footer">
          {hasAppliedFilters && (
            <Button
              className="main-dropdown__action min-w-96"
              text={{ id: 'shared.resetAll' }}
              size="small"
              kind="flat"
              onClick={onReset}
            />
          )}
          <Button
            className="main-dropdown__action min-w-96"
            type="submit"
            text={{ id: 'shared.apply' }}
            size="small"
            onClick={onSubmit}
          />
        </div>
      </div>
    </Dropdown>
  );
};

UsersFiltersComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  appliedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onReset: PropTypes.func.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default UsersFiltersComponent;
