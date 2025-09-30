/**
 * Member View Router Component
 * Handles different view modes for member management
 */

import React from 'react';
import MemberList from './MemberList';
import MemberProfile from './MemberProfile';
import MemberForm from './MemberForm';

const MemberViewRouter = ({
  viewMode,
  selectedMember,
  filteredMembers,
  user,
  permissions,
  onViewMember,
  onEditMember,
  onDeleteMember,
  onAddMember,
  onBackToList,
  onSaveMember,
}) => {
  switch (viewMode) {
    case 'profile':
      return selectedMember ? (
        <MemberProfile
          member={selectedMember}
          onEdit={(member) =>
            onEditMember(member, permissions.canManageMembers)
          }
          onClose={onBackToList}
        />
      ) : null;

    case 'edit':
    case 'add':
      return (
        <MemberForm
          open={true}
          onClose={onBackToList}
          member={viewMode === 'edit' ? selectedMember : null}
          onSave={onSaveMember}
        />
      );

    case 'list':
    default:
      return (
        <MemberList
          members={filteredMembers}
          onViewMember={onViewMember}
          onEditMember={(member) =>
            onEditMember(member, permissions.canManageMembers)
          }
          onDeleteMember={(memberId) =>
            onDeleteMember(memberId, user.role === 'admin')
          }
          onAddMember={() => onAddMember(permissions.canManageMembers)}
        />
      );
  }
};

export default React.memo(MemberViewRouter);
