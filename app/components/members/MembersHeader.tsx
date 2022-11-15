import { useEffect, useState } from 'react'
import AddMemberModal from './AddMemberModal'
import { useLoaderData } from '@remix-run/react'
import Button from '../form/Button'
import { useTranslation } from 'react-i18next'

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
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="membersHeading text-3xl font-bold">
          {t('members.members')}
        </h1>
        <Button
          tabIndex={0}
          id="add-member"
          className="h-9 px-4"
          onClick={() => setOpen(!open)}
          varient="primary-solid"
          title={t('members.inviteMember')}
          buttonText={t('members.inviteMember')}
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
