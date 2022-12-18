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
import InvitedMembersList from '~/components/members/InvitedMembersList'
import {
  getAllInvitedMember,
  inviteNewUser,
  reinviteMemberForWorkspace,
} from '~/models/invites.server'
import Table from '~/components/common-components/TableComponent'
import { Icon } from '@iconify/react'
import DeletePopUp from '~/components/common-components/DeletePopUp'

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
  allUsersCount: number
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const query = url.searchParams
  const MembersItemsPerPage = Math.max(Number(query.get('MemberItems') || 5), 5)
  const MembersCurrentPage = Math.max(Number(query.get('MemberPage') || 1), 1)
  const userId = await getUserId(request)
  const getUser = await getUserById(userId as string)
  const currentWorkspaceId = params.workspaceId as string
  const invitedMembers = await getAllInvitedMember(currentWorkspaceId as string)
  const workspaces = await getUserWorkspaces(userId as string)
  const roles = await getAllRoles()
  if (!userId) return redirect(routes.signIn)
  const users = await getAllUsers({
    currentWorkspaceId,
    MembersCurrentPage,
    MembersItemsPerPage,
  })

  const allUsersCount = await getAllUsersCount(currentWorkspaceId)

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
    allUsersCount,
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
  const submit = useSubmit()
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
  const loader = useLoaderData()
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
  const loggedInUser = loader.userId
  const [open, setOpen] = useState(false)
  const deleteUser = (id: string) => {
    submit({ action: 'delete', id: id }, { method: 'post' })
  }
  const DeleteIcon = (data: { [key: string]: any }) => {
    const openPopUp = () => {
      if (loggedInUser !== data.id) {
        setOpen(!open)
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
          setOpen={setOpen}
          open={open}
          onDelete={() => deleteUser(data.id)}
          deleteItem={`${data.firstName} ${data.lastName}`}
          deleteItemType={t('members.member')}
        />
      </>
    )
  }

  const membersColumn = [
    { title: 'Name', field: 'name', render: NameDataCell, width: '25%' },
    { title: 'Email', field: 'email', width: '30%' },
    { title: 'Role', field: 'role', render: RoleDataCell },
    { title: 'Joined On', field: 'createdAt', width: '20%' },
    { title: 'Action', field: 'action', render: DeleteIcon },
  ]
  console.log(loader)
  const [currentPage, setCurrentPage] = useState(loader.MembersCurrentPage)
  const [pageSize, setPageSize] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    navigate(`?MemberPage=${currentPage}&MemberItems=${pageSize}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage])
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
      <div className="">
        <div>
          <h1
            tabIndex={0}
            role={t('members.invitedMember')}
            aria-label={t('members.invitedMember')}
            id="invited-member-heading"
          >
            {t('members.invitedMember')}
          </h1>
          <InvitedMembersList actionStatus={membersActionData?.resp?.title} />
        </div>
      </div>
    </div>
  )
}

export default Members
