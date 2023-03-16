import moment from "moment"

import { useLoaderData, useSubmit } from "@remix-run/react"

import Table from "../common-components/TableComponent"

import memberResendIcon from "~/../public/assets/resend-member-invitation.svg"
import type { User, Role, Invites } from "~/interface/Interface"

const InvitedMembersList = ({
  actionStatus,
  invitedMemberCurrentPage,
  setInvitedMemberPage,
  invitedMemberPageSize,
  setInvitedMemberPageSize,
}: {
  actionStatus: string | undefined
  invitedMemberCurrentPage: number
  setInvitedMemberPage: (e: number) => void
  invitedMemberPageSize: number
  setInvitedMemberPageSize: (e: number) => void
}) => {
  const membersData = useLoaderData()
  const invitedMember = membersData.invitedMembers
  const submit = useSubmit()
  const memberLoaderData = useLoaderData()

  const InvitedByCell = (data: Invites) => {
    return (
      <span>
        {data.invitedById.firstName} {data.invitedById.lastName}
      </span>
    )
  }
  const InvitedOnCell = (data: Invites) => {
    return <span>{moment(data?.invitedOn).format("DD MMMM YY")}</span>
  }
  const RoleDataCell = (data: { role: Role }) => {
    return <span>{data.role.name}</span>
  }
  const resendMail = (id: string) => {
    let data = {
      id: id,
      action: "resendMember",
    }
    submit(data, {
      method: "post",
    })
  }
  const MemberReinvite = (data: User) => {
    return (
      <span
        tabIndex={0}
        role="button"
        onKeyUp={(e) => {
          if (e.key === "Enter") resendMail(data.id)
        }}
        onClick={() => resendMail(data.id)}
        className="cursor-pointer opacity-100"
      >
        <img
          aria-label="resend invite"
          src={memberResendIcon}
          alt="reinvite"
          id="resend-member-invite"
        />
      </span>
    )
  }
  const invitedMembersColumn = [
    { title: "Email", field: "email", width: "30%" },
    { title: "Role", field: "role", render: RoleDataCell },
    {
      title: "Invited By",
      field: "invitedById",
      render: InvitedByCell,
      width: "25%",
    },
    {
      title: "Invited On",
      field: "invitedOn",
      width: "20%",
      render: InvitedOnCell,
    },
    { title: "Action", field: "action", render: MemberReinvite },
  ]
  return (
    <>
      {invitedMember?.length !== 0 && (
        <div className="flex flex-col gap-4 text-base">
          <Table
            columns={invitedMembersColumn}
            data={memberLoaderData.invitedMembers}
            paginationEnabled={true}
            pageSize={invitedMemberPageSize}
            setPageSize={setInvitedMemberPageSize}
            currentPage={invitedMemberCurrentPage}
            onPageChange={setInvitedMemberPage}
            totalItems={memberLoaderData.invitedUsersCount}
          />
        </div>
      )}
    </>
  )
}
export default InvitedMembersList
