import React from 'react';
import PropTypes from 'prop-types';

import isAdmin from 'utils/userPermissions/isAdmin';

import DropdownItem from 'views/shared/DropdownItem';
import DropdownMenu from 'views/shared/DropdownMenu';

const UsersTableActionsComponent = ({
  showModal,
  user: { active },
  currentUser,
  onEdit,
}) => (
  <td className="main-table__action">
    <div className="relative">
      <DropdownMenu
        className="main-dropdown-btn"
        disabled={!isAdmin(currentUser)}
        menuClassName="main-table-menu main-dropdown"
        icon={(
          <button type="button">
            <i className="main-dropdown-btn__icon icon icon-options" />
          </button>
        )}
      >
        <DropdownItem
          text={{ id: 'shared.edit' }}
          onClick={onEdit}
        />
        <DropdownItem
          text={{ id: 'shared.activate' }}
          onClick={showModal('USERS_ACTIVATE_MODAL')}
          isHidden={active}
        />
        <DropdownItem
          text={{ id: 'shared.deactivate' }}
          onClick={showModal('USERS_DEACTIVATE_MODAL')}
          isHidden={!active}
        />
        <DropdownItem
          text={{ id: 'shared.remove' }}
          onClick={showModal('USERS_REMOVE_MODAL')}
        />
      </DropdownMenu>
    </div>
  </td>
);

UsersTableActionsComponent.propTypes = {
  showModal: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  currentUser: PropTypes.shape().isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UsersTableActionsComponent;
