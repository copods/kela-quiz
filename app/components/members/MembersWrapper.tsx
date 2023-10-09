import { useEffect, useState } from "react"

import { useLocation } from "react-router-dom"

import { useActionData, useLoaderData, useNavigate } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import Tabs from "../common-components/Tabs"

import EmptyStateComponent from "~/components/common-components/EmptyStateComponent"
import InvitedMembersList from "~/components/members/InvitedMembersList"
import MembersHeader from "~/components/members/MembersHeader"
import MembersList from "~/components/members/MembersList"
import { routes } from "~/constants/route.constants"

type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}
const MembersWrapper = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const membersActionData = useActionData() as ActionData
  const memberLoaderData = useLoaderData()
  const location = useLocation()
  //states
  const [actionStatus, setActionStatus] = useState<boolean>(false)
  const [membersCurrentPage, setMembersCurrentPage] = useState(
    memberLoaderData.membersCurrentPage
  )
  const [membersPageSize, setMembersPageSize] = useState(10)
  const [invitedMemberCurrentPage, setInvitedMemberPage] = useState(
    memberLoaderData.invitedMembersCurrentPage
  )
  const [invitedMemberPageSize, setInvitedMemberPageSize] = useState(10)
  const [activeTab, setActiveTab] = useState("joined_members")

  //useEffects
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
      } else if (membersActionData.errors?.status === 403) {
        navigate(routes.unauthorized)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersActionData, t])
  useEffect(() => {
    if (
      (!location.search && memberLoaderData.invitedMembers.length > 0) ||
      (!location.search && memberLoaderData.users.length > 0)
    ) {
      navigate(
        `?MemberPage=${membersCurrentPage}&MemberItems=${membersPageSize}&InvitedMemberPage=${invitedMemberCurrentPage}&InvitedMemberItems=${invitedMemberPageSize}`,
        { replace: true }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  useEffect(() => {
    navigate(
      `?MemberPage=${membersCurrentPage}&MemberItems=${membersPageSize}&InvitedMemberPage=${invitedMemberCurrentPage}&InvitedMemberItems=${invitedMemberPageSize}`,
      { replace: true }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    membersPageSize,
    membersCurrentPage,
    invitedMemberCurrentPage,
    invitedMemberPageSize,
  ])

  const membersTabs = [
    {
      show: true,
      name: "Joined Members",
      action: () => setActiveTab("joined_members"),
      active: activeTab === "joined_members",
    },
    {
      show: memberLoaderData.permission.member.create,
      name: "Invited Members",
      action: () => setActiveTab("invited_members"),
      active: activeTab === "invited_members",
    },
  ]
  return (
    <div className="flex h-full flex-col gap-6 p-1">
      <MembersHeader
        actionStatus={actionStatus}
        setActionStatus={setActionStatus}
      />
      {membersTabs.filter((tabs) => tabs.show).length >= 2 ? (
        <Tabs tabs={membersTabs.filter((tab) => tab.show)} />
      ) : null}
      <div className="flex h-full flex-col gap-4 text-2xl">
        {activeTab === "joined_members" ? (
          <MembersList
            membersCurrentPage={membersCurrentPage}
            setMembersCurrentPage={setMembersCurrentPage}
            membersPageSize={membersPageSize}
            setMembersPageSize={setMembersPageSize}
            roles={memberLoaderData?.roles}
          />
        ) : activeTab === "invited_members" &&
          !memberLoaderData.invitedMembers.length ? (
          <EmptyStateComponent
            text={t("commonConstants.invitedMemberEmptyState")}
          />
        ) : activeTab === "invited_members" ? (
          <InvitedMembersList
            actionStatus={membersActionData?.resp?.title}
            invitedMemberCurrentPage={invitedMemberCurrentPage}
            setInvitedMemberPage={setInvitedMemberPage}
            invitedMemberPageSize={invitedMemberPageSize}
            setInvitedMemberPageSize={setInvitedMemberPageSize}
          />
        ) : null}
      </div>
    </div>
  )
}

export default MembersWrapper
