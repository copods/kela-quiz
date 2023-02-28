import { useEffect, useState } from "react"

import { useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Button from "../common-components/Button"

import AddMemberModal from "./AddMemberModal"

export default function MembersHeader({
  actionStatus,
  setActionStatus,
}: {
  actionStatus: boolean
  setActionStatus: (e: boolean) => void
}) {
  const { t } = useTranslation()

  const membersData = useLoaderData()
  const loggedInUser = membersData.getUser.email
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (actionStatus) {
      setOpen(false)
      setActionStatus(false)
    }
  }, [actionStatus, setActionStatus])
  useEffect(() => {
    const heading = document.getElementById("members-heading")
    heading?.focus()
  }, [])
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1
          tabIndex={0}
          id="members-heading"
          role={t("members.members")}
          aria-label={t("members.members")}
          className="membersHeading text-3xl font-bold"
        >
          {t("members.members")}
        </h1>
        <Button
          tabIndex={0}
          id="invite-member"
          className="h-9 px-4"
          onClick={() => setOpen(!open)}
          variant="primary-solid"
          title={t("members.inviteMember")}
          buttonText={t("members.inviteMember")}
        />
      </div>
      <AddMemberModal
        roles={membersData.roles}
        loggedInUser={loggedInUser}
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}
