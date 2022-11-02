import { Form, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import Button from '../form/Button'
import { useTranslation } from 'react-i18next'
import DialogWrapper from '../Dialog'

const InviteCandidatePopup = ({
  openInvitePopup,
  setOpenInvitePopup,
  testName,
  testId,
}: {
  openInvitePopup: boolean
  setOpenInvitePopup: (e: boolean) => void
  testName: string
  testId: string
}) => {
  const { t } = useTranslation()
  const [emails, setEmails] = useState<Array<string>>([''])
  const actionData = useActionData()
  useEffect(() => {
    if (actionData?.status == 401 && testId === actionData?.testId) {
      toast.warn(t(actionData.message))
    }
    if (
      actionData?.candidateInviteStatus ===
      t('candidateExamConstants.candidateTestCreated')
    ) {
      if (actionData?.testId === testId)
        toast.success(t('testsConstants.candidateInvited'))
      setOpenInvitePopup(false)
      setEmails([''])
    } else {
      if (
        actionData?.candidateInviteStatus === t('candidateExamConstants.error')
      ) {
        if (actionData?.testId === testId) {
          toast.error(t('testsConstants.candidateAlreadyInvited'))
        }
        setOpenInvitePopup(false)
        setEmails([''])
      }
    }
  }, [actionData, testId, setOpenInvitePopup, t])
  const updatePopupAndEmailState = () => {
    setOpenInvitePopup(false)
    setEmails([''])
  }

  const dialogWrapperProps = [
    // dialog wrapper props
    {
      role: t('inviteMemeberPopUpConstants.inviteCandidate'),
      ariaLabel: t('inviteMemeberPopUpConstants.inviteCandidate'),
      tabIndex: 0,
    },
  ]
  return (
    <div>
      {dialogWrapperProps.map((props) => {
        return (
          <DialogWrapper
            open={openInvitePopup}
            heading={t('inviteMemeberPopUpConstants.inviteCandidate')}
            setOpen={setOpenInvitePopup}
            addDialog={true}
            {...props}
            key={props.role}
          >
            <Form
              method="post"
              className=" items-end justify-center p-4 sm:items-center sm:p-0"
            >
              <p className="pb-4 text-base font-normal text-gray-700">
                {t('inviteMemeberPopUpConstants.enterCandidatesEmail')}{' '}
                <span className="font-semibold">`{testName}`</span> Test.
              </p>
              <div className="flex flex-row justify-between pb-2">
                <span className="text-sm font-medium text-gray-500">
                  {t('inviteMemeberPopUpConstants.candidateEmail')}
                </span>
                <span
                  role={'button'}
                  tabIndex={0}
                  className="cursor-pointer px-0.5 text-sm font-normal text-primary"
                  onClick={() => setEmails([...emails, ''])}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') setEmails([...emails, ''])
                  }}
                  title={t('inviteMemeberPopUpConstants.inviteMore')}
                  aria-label={t('inviteMemeberPopUpConstants.inviteMore')}
                >
                  {t('inviteMemeberPopUpConstants.inviteMore')} +
                </span>
              </div>
              {emails.map((email, i) => {
                return (
                  <div className="pb-2" key={i}>
                    <input
                      tabIndex={0}
                      type="email"
                      name={`email`}
                      className="inviteInput h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                      placeholder="johndoe@example.com"
                      title={t('commonConstants.email')}
                      aria-label={t('commonConstants.email')}
                    />
                  </div>
                )
              })}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  className="h-9 px-4"
                  varient="primary-outlined"
                  title={t('commonConstants.cancel')}
                  buttonText={t('commonConstants.cancel')}
                  onClick={updatePopupAndEmailState}
                />
                <Button
                  type="submit"
                  name="inviteCandidates"
                  value={testId}
                  id="submit-button"
                  className="h-9 px-4"
                  varient="primary-solid"
                  title={t('inviteMemeberPopUpConstants.invite')}
                  buttonText={t('inviteMemeberPopUpConstants.invite')}
                  datacy="submit"
                />
              </div>
            </Form>
          </DialogWrapper>
        )
      })}
    </div>
  )
}

export default InviteCandidatePopup
