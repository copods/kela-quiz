import { useState } from "react"

import moment from "moment"

import { Icon } from "@iconify/react"
import { useLoaderData, useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Badge from "../common-components/Badge"
import DeletePopUp from "../common-components/DeletePopUp"
import Table from "../common-components/TableComponent"

import type { User, Invites, UserWorkspace, Role } from "~/interface/Interface"

export default function MembersList({
  membersCurrentPage,
  setMembersCurrentPage,
  membersPageSize,
  setMembersPageSize,
  roles,
}: {
  membersCurrentPage: number
  setMembersCurrentPage: (e: number) => void
  membersPageSize: number
  setMembersPageSize: (e: number) => void
  roles: Role[]
}) {
  const { t } = useTranslation()
  const submit = useSubmit()
  const memberLoaderData = useLoaderData()
  const loggedInUser = memberLoaderData.userId
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [memberId, setMemberId] = useState("")
  const workspaceOwner = memberLoaderData.currentWorkspaceOwner.createdById
  const adminRoleId = roles.find((role) => role.name === "Admin")?.id

  const currentLoggedInUserData = memberLoaderData.users.filter(
    (data: { id: string }) => {
      return data.id === loggedInUser
    }
  )

  const NameDataCell = (data: User) => {
    return (
      <div className="flex gap-2">
        <span>
          {data.firstName} {data.lastName}
        </span>
        {workspaceOwner === data.id ? (
          <Badge>{t("members.owner")}</Badge>
        ) : null}
      </div>
    )
  }
  const RoleDataCell = (data: { userWorkspace: UserWorkspace[] }) => {
    return <span>{data?.userWorkspace[0]?.role?.name}</span>
  }
  const JoinedOnCell = (data: Invites) => {
    return <span>{moment(data?.createdAt).format("DD MMMM YY")}</span>
  }
  const deleteUser = (id: string) => {
    submit({ action: "delete", id: id }, { method: "post" })
  }
  const MemberDelete = (data: User & { userWorkspace: UserWorkspace[] }) => {
    const openPopUp = () => {
      if (
        loggedInUser !== data.id &&
        workspaceOwner !== data.id &&
        currentLoggedInUserData[0]?.userWorkspace[0]?.role.id === adminRoleId
      ) {
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
            if (e.key === "Enter") openPopUp()
          }}
          icon="ic:outline-delete-outline"
          className={`h-6 w-6 ${
            currentLoggedInUserData[0]?.userWorkspace[0]?.role.id !==
              adminRoleId ||
            loggedInUser === data.id ||
            workspaceOwner === data.id
              ? "cursor-not-allowed text-red-200"
              : "cursor-pointer text-red-500"
          }`}
        />
        {memberId === data.id &&
          currentLoggedInUserData[0]?.userWorkspace[0]?.role.id ===
            adminRoleId && (
            <DeletePopUp
              setOpen={setOpenDeleteModal}
              open={openDeleteModal}
              onDelete={() => deleteUser(data.id)}
              deleteItem={`${data.firstName} ${data.lastName}`}
              deleteItemType={t("members.member")}
            />
          )}
      </>
    )
  }

  const membersColumn = [
    { title: "Name", field: "name", render: NameDataCell, width: "25%" },
    { title: "Email", field: "email", width: "30%" },
    { title: "Role", field: "role", render: RoleDataCell },
    {
      title: "Joined On",
      field: "createdAt",
      width: "20%",
      render: JoinedOnCell,
    },
    { title: "Action", field: "action", render: MemberDelete },
  ]

  return (
    <div className="z-10 text-base">
      <Table
        columns={
          memberLoaderData.permission.member.delete
            ? membersColumn
            : membersColumn.filter((column) => column.title !== "Action")
        }
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
