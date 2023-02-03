import type { User, Role, Invites } from '~/interface/Interface'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import Table from '../common-components/TableComponent'
import DeletePopUp from '../common-components/DeletePopUp'
import { Icon } from '@iconify/react'
import moment from 'moment'
import { useState } from 'react'
import Badge from '../common-components/Badge'

export default function MembersList({
  membersCurrentPage,
  setMembersCurrentPage,
  membersPageSize,
  setMembersPageSize,
}: {
  membersCurrentPage: number
  setMembersCurrentPage: (e: number) => void
  membersPageSize: number
  setMembersPageSize: (e: number) => void
}) {
  const { t } = useTranslation()
  const submit = useSubmit()
  const memberLoaderData = useLoaderData()
  const loggedInUser = memberLoaderData.userId
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [memberId, setMemberId] = useState('')
  const workspaceOwner = memberLoaderData.currentWorkspaceOwner.createdById
  const NameDataCell = (data: User) => {
    return (
      <div className="flex gap-2">
        <span>
          {data.firstName} {data.lastName}
        </span>
        {workspaceOwner === data.id ? (
          <Badge>{t('members.owner')}</Badge>
        ) : null}
      </div>
    )
  }
  const RoleDataCell = (data: { role: Role }) => {
    return <span>{data.role.name}</span>
  }
  const JoinedOnCell = (data: Invites) => {
    return <span>{moment(data?.createdAt).format('DD MMMM YY')}</span>
  }
  const deleteUser = (id: string) => {
    submit({ action: 'delete', id: id }, { method: 'post' })
  }
  const MemberDelete = (data: User) => {
    const openPopUp = () => {
      if (loggedInUser !== data.id) {
        setMemberId(data.id)
        setOpenDeleteModal(!openDeleteModal)
      }
    }
    return (
      <>
        <Icon
          id="delete-button"
          aria-label="delete member"
          tabIndex={0}
          onClick={openPopUp}
          onKeyUp={(e) => {
            if (e.key === 'Enter') openPopUp()
          }}
          icon="ic:outline-delete-outline"
          className={`h-6 w-6 cursor-pointer text-red-500  ${
            loggedInUser === data.id && 'cursor-not-allowed text-red-200'
          }`}
        />
        {memberId === data.id && (
          <DeletePopUp
            setOpen={setOpenDeleteModal}
            open={openDeleteModal}
            onDelete={() => deleteUser(data.id)}
            deleteItem={`${data.firstName} ${data.lastName}`}
            deleteItemType={t('members.member')}
          />
        )}
      </>
    )
  }

  const membersColumn = [
    { title: 'Name', field: 'name', render: NameDataCell, width: '25%' },
    { title: 'Email', field: 'email', width: '30%' },
    { title: 'Role', field: 'role', render: RoleDataCell },
    {
      title: 'Joined On',
      field: 'createdAt',
      width: '20%',
      render: JoinedOnCell,
    },
    { title: 'Action', field: 'action', render: MemberDelete },
  ]

  return (
    <div className="z-10 text-base">
      <Table
        columns={membersColumn}
        data={memberLoaderData.users}
        paginationEnabled={true}
        pageSize={membersPageSize}
        setPageSize={setMembersPageSize}
        currentPage={membersCurrentPage}
        onPageChange={setMembersCurrentPage}
        totalItems={memberLoaderData.allUsersCount}
      />
    </div>
  )
}
