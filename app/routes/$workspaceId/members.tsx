import { getUserId, requireWorkspaceId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from '@remix-run/react'
import {
  deleteUserById,
  getAllRoles,
  getAllUsers,
  getAllUsersCount,
  getUserById,
} from '~/models/user.server'
import MembersHeader from '~/components/members/MembersHeader'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import { getUserWorkspaces } from '~/models/workspace.server'
import { actions } from '~/constants/action.constants'
import memberResendIcon from '~/../public/assets/resend-member-invitation.svg'
import {
  getAllInvitedMember,
  getAllInvitedMemberCount,
  inviteNewUser,
  reinviteMemberForWorkspace,
} from '~/models/invites.server'
import Table from '~/components/common-components/TableComponent'
import { Icon } from '@iconify/react'
import DeletePopUp from '~/components/common-components/DeletePopUp'
import moment from 'moment'

export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}
type LoaderData = {
  users: Awaited<ReturnType<typeof getAllUsers>>
  userId: Awaited<ReturnType<typeof getUserId>>
  roles: Awaited<ReturnType<typeof getAllRoles>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
  invitedMembers: Awaited<ReturnType<typeof getAllInvitedMember>>
  getUser: Awaited<ReturnType<typeof getUserById>>
  MembersCurrentPage: number
  MembersItemsPerPage: number
  invitedMembersItemsPerPage: number
  invitedMembersCurrentPage: number
  allUsersCount: number
  invitedUsersCount: number
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const query = url.searchParams
  const MembersItemsPerPage = Math.max(Number(query.get('MemberItems') || 5), 5)
  const MembersCurrentPage = Math.max(Number(query.get('MemberPage') || 1), 1)
  const invitedMembersCurrentPage = Math.max(
    Number(query.get('InvitedMemberPage') || 1),
    1
  )
  const invitedMembersItemsPerPage = Math.max(
    Number(query.get('InvitedMemberItems') || 5),
    5
  )
  const userId = await getUserId(request)
  const getUser = await getUserById(userId as string)
  const currentWorkspaceId = params.workspaceId as string
  const invitedMembers = await getAllInvitedMember(
    currentWorkspaceId as string,
    invitedMembersCurrentPage,
    invitedMembersItemsPerPage
  )
  const workspaces = await getUserWorkspaces(userId as string)
  const roles = await getAllRoles()
  if (!userId) return redirect(routes.signIn)
  const users = await getAllUsers({
    currentWorkspaceId,
    MembersCurrentPage,
    MembersItemsPerPage,
  })

  const allUsersCount = await getAllUsersCount(currentWorkspaceId)
  const invitedUsersCount = await getAllInvitedMemberCount(currentWorkspaceId)
  return json<LoaderData>({
    users,
    roles,
    userId,
    workspaces,
    currentWorkspaceId,
    invitedMembers,
    getUser,
    MembersCurrentPage,
    MembersItemsPerPage,
    invitedMembersCurrentPage,
    invitedMembersItemsPerPage,
    allUsersCount,
    invitedUsersCount,
  })
}

export const action: ActionFunction = async ({ request, params }) => {
  const invitedByWorkspaceId = await requireWorkspaceId(request)
  const userId = await getUserId(request)
  const getUser = await getUserById(userId as string)
  const formData = await request.formData()
  const action = await formData.get('action')
  if (action === actions.inviteMember) {
    const email = formData.get('email')
    const roleId = formData.get('roleId')
    // eslint-disable-next-line no-useless-escape
    const emailFilter = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (typeof email !== 'string' || email.length === 0) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.emailRequired', status: 400 } },
        { status: 400 }
      )
    }
    if (!emailFilter.test(email)) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.correctEmail', status: 400 } },
        { status: 400 }
      )
    }
    if (typeof roleId !== 'string' || roleId.length === 0) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.roleRequired', status: 400 } },
        { status: 400 }
      )
    }
    if (email === getUser?.email) {
      return json<ActionData>(
        { errors: { title: 'statusCheck.notInviteYourself', status: 400 } },
        { status: 400 }
      )
    }

    let addHandle = null

    await inviteNewUser({
      email,
      roleId,
      invitedByWorkspaceId,
      userId,
    })
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              title: 'toastConstants.invitationSent',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = 'statusCheck.commonError'
        if (err.code === 'P2002') {
          title = 'toastConstants.memberAlreadyInvited'
        }
        addHandle = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })
    return addHandle
  }

  if (action === actions.resendMember) {
    const id = formData.get('id')
    let resendMember = null
    await reinviteMemberForWorkspace({
      id: id as string,
    })
      .then(() => {
        resendMember = json<ActionData>(
          {
            resp: {
              title: 'toastConstants.invitationSent',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = 'statusCheck.commonError'
        resendMember = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })
    return resendMember
  }
  if (action === actions.deleteMember) {
    if (typeof formData.get('id') !== 'string') {
      return json<ActionData>(
        { errors: { title: 'statusCheck.descIsReq', status: 400 } },
        { status: 400 }
      )
    }
    let deleteHandle = null
    await deleteUserById(
      formData.get('id') as string,
      params.workspaceId as string
    )
      .then((res) => {
        deleteHandle = json<ActionData>(
          { resp: { title: 'statusCheck.deletedSuccess', status: 200 } },
          { status: 200 }
        )
      })
      .catch((err) => {
        deleteHandle = json<ActionData>(
          {
            errors: {
              title: 'statusCheck.commonError',
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return deleteHandle
  }

  return null
}
const Members = () => {
  const { t } = useTranslation()
  const membersActionData = useActionData() as ActionData
  const [actionStatus, setActionStatus] = useState<boolean>(false)
  const loader = useLoaderData()
  const submit = useSubmit()
  const loggedInUser = loader.userId
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  useEffect(() => {
    if (membersActionData) {
      if (membersActionData.resp?.status === 200) {
        setActionStatus(true)
        toast.success(t(membersActionData.resp?.title))
      } else if (membersActionData.errors?.status === 400) {
        setActionStatus(false)
        toast.error(t(membersActionData.errors?.title), {
          toastId: membersActionData.errors?.title,
        })
      }
    }
  }, [membersActionData, t])
  const NameDataCell = (data: { [key: string]: any }) => {
    return (
      <span>
        {data.firstName} {data.lastName}
      </span>
    )
  }
  const RoleDataCell = (data: { [key: string]: any }) => {
    return <span>{data.role.name}</span>
  }
  const InvitedByCell = (data: { [key: string]: any }) => {
    return (
      <span>
        {data.invitedById.firstName} {data.invitedById.lastName}
      </span>
    )
  }
  const InvitedOnCell = (data: { [key: string]: any }) => {
    return <span>{moment(data?.invitedOn).format('DD MMMM YY')}</span>
  }
  const deleteUser = (id: string) => {
    submit({ action: 'delete', id: id }, { method: 'post' })
  }
  const resendMail = (id: string) => {
    let data = {
      id: id,
      action: 'resendMember',
    }
    submit(data, {
      method: 'post',
    })
  }
  const DeleteIcon = (data: { [key: string]: any }) => {
    const openPopUp = () => {
      if (loggedInUser !== data.id) {
        setOpenDeleteModal(!openDeleteModal)
      }
    }
    return (
      <>
        <Icon
          id="delete-button"
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
        <DeletePopUp
          setOpen={setOpenDeleteModal}
          open={openDeleteModal}
          onDelete={() => deleteUser(data.id)}
          deleteItem={`${data.firstName} ${data.lastName}`}
          deleteItemType={t('members.member')}
        />
      </>
    )
  }
  const InviteIcon = (data: { [key: string]: any }) => {
    return (
      <span
        tabIndex={0}
        role="button"
        onKeyUp={(e) => {
          if (e.key === 'Enter') resendMail(data.id)
        }}
        onClick={() => resendMail(data.id)}
        className="cursor-pointer opacity-100"
      >
        <img src={memberResendIcon} alt="reinvite" id="resend-member-invite" />
      </span>
    )
  }
  const membersColumn = [
    { title: 'Name', field: 'name', render: NameDataCell, width: '25%' },
    { title: 'Email', field: 'email', width: '30%' },
    { title: 'Role', field: 'role', render: RoleDataCell },
    { title: 'Joined On', field: 'createdAt', width: '20%' },
    { title: 'Action', field: 'action', render: DeleteIcon },
  ]
  const invitedMembersColumn = [
    { title: 'Email', field: 'email', width: '30%' },
    { title: 'Role', field: 'role', render: RoleDataCell },
    {
      title: 'Invited By',
      field: 'invitedById',
      render: InvitedByCell,
      width: '25%',
    },
    {
      title: 'Invited On',
      field: 'invitedOn',
      width: '20%',
      render: InvitedOnCell,
    },
    { title: 'Action', field: 'action', render: InviteIcon },
  ]
  const [currentPage, setCurrentPage] = useState(loader.MembersCurrentPage)
  const [pageSize, setPageSize] = useState(5)
  const [invitedMemberCurrentPage, setInvitedMemberPage] = useState(
    loader.invitedMembersCurrentPage
  )
  const [invitedMemberPageSize, setInvitedMemberPageSize] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    navigate(
      `?MemberPage=${currentPage}&MemberItems=${pageSize}&InvitedMemberPage=${invitedMemberCurrentPage}&InvitedMemberItems=${invitedMemberPageSize}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, invitedMemberCurrentPage, invitedMemberPageSize])
  console.log(loader)
  return (
    <div className="flex flex-col gap-6 p-1">
      <MembersHeader
        actionStatus={actionStatus}
        setActionStatus={setActionStatus}
      />
      <div className="flex flex-col gap-4 text-2xl">
        <h1
          tabIndex={0}
          role={t('members.joinedMembers')}
          aria-label={t('members.joinedMembers')}
          id="joined-member-heading"
        >
          {t('members.joinedMembers')}
        </h1>
        <div className="text-base">
          <Table
            columns={membersColumn}
            data={loader.users}
            paginationEnabled={true}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalItems={loader.allUsersCount}
          />
        </div>
      </div>
      {loader.invitedUsersCount > 0 ? (
        <div className="flex flex-col gap-4">
          <h2
            className=" text-2xl"
            tabIndex={0}
            role={t('members.invitedMember')}
            aria-label={t('members.invitedMember')}
            id="invited-member-heading"
          >
            {t('members.invitedMember')}
          </h2>
          <div className="pb-4">
            <Table
              columns={invitedMembersColumn}
              data={loader.invitedMembers}
              paginationEnabled={true}
              pageSize={invitedMemberPageSize}
              setPageSize={setInvitedMemberPageSize}
              currentPage={invitedMemberCurrentPage}
              onPageChange={setInvitedMemberPage}
              totalItems={loader.invitedUsersCount}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Members
