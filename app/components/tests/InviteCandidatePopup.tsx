import { Form, useActionData, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import Button from '../common_components/Button'
import { useTranslation } from 'react-i18next'
import DialogWrapper from '../common_components/Dialog'
interface error {
  [key: number]: string
}
const InviteCandidatePopup = ({
  openInvitePopup,
  setOpenInvitePopup,
  testName,
  testId,
}: {
  openInvitePopup: boolean
  setOpenInvitePopup: (e: boolean) => void
  testName: string
  testId?: string
}) => {
  const { t } = useTranslation()
  const [emails, setEmails] = useState<Array<string>>([''])
  const [errors, setError] = useState({})

  const actionData = useActionData()

  useEffect(() => {
    if (actionData?.status == 401 && testId === actionData?.testId) {
      toast.warn(t(actionData.message))
    }
    if (
      actionData?.candidateInviteStatus?.created ===
      t('candidateExamConstants.candidateTestCreated')
    ) {
      if (actionData?.testId === testId)
        if (actionData?.candidateInviteStatus.emailCount > 1) {
          if (
            actionData?.candidateInviteStatus.emailCount ===
            actionData?.candidateInviteStatus.neverInvitedCount
          ) {
            toast.success(`${t('testsConstants.allCandidatesInvited')}`)
          } else {
            toast.success(
              `${actionData?.candidateInviteStatus.neverInvitedCount} out of ${
                actionData?.candidateInviteStatus.emailCount
              } ${t('testsConstants.candidatesInvited')}. ${t(
                'testsConstants.othersWereAlreadyInvited'
              )}`
            )
          }
        } else {
          toast.success(t('testsConstants.candidateInvited'))
        }
      setOpenInvitePopup(false)
      setEmails([''])
    } else {
      if (
        actionData?.candidateInviteStatus === t('candidateExamConstants.error')
      ) {
        if (actionData?.testId === testId) {
          toast.error(t('testsConstants.candidateAlreadyInvited'))
        }
      }
    }
  }, [actionData, testId, setOpenInvitePopup, t])
  const updatePopupAndEmailState = () => {
    setOpenInvitePopup(false)
    setEmails([''])
  }
  const transition = useTransition()
  useEffect(() => {
    setEmails([''])
    setError({})
  }, [openInvitePopup])

  // regex funtion to check email
  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  const updateEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEmails = emails.map((email, i) => {
      if (i === index) {
        return event.target.value
      }
      return email
    })
    setEmails(newEmails)
  }
  const validateEmails = (emails: string[], index: number) => {
    const emailError: error = {}
    emails
      .map((email, i) => (i === index ? '' : email))
      .forEach((email, i: number) => {
        if (email && !isEmail(email)) {
          emailError[i] = t('statusCheck.emailIsInvalid')
        }
        setError(emailError)
      })
  }
  return (
    <DialogWrapper
      open={openInvitePopup}
      heading={t('inviteMemeberPopUpConstants.inviteCandidate')}
      setOpen={setOpenInvitePopup}
      header={true}
      role={t('inviteMemeberPopUpConstants.inviteCandidate')}
      ariaLabel={t('inviteMemeberPopUpConstants.inviteCandidate')}
      tabIndex={0}
    >
      <Form
        method="post"
        className=" items-end justify-center p-4 sm:items-center sm:p-0"
      >
        <p className="pb-4 text-base font-normal text-gray-700">
          {t('inviteMemeberPopUpConstants.enterCandidatesEmail')}{' '}
          <span className="font-semibold">`{testName}`</span>{' '}
          {t('testsConstants.assessment')}.
        </p>
        <div className="flex flex-row justify-between pb-2">
          <span className="text-sm font-medium text-gray-500">
            {t('inviteMemeberPopUpConstants.candidateEmail')}
          </span>
          <span
            role={'button'}
            id="invite-more"
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
        <div className="max-h-280 overflow-auto">
          {emails.map((email, i) => {
            return (
              <div className="pb-2" key={i}>
                <input
                  tabIndex={0}
                  type="email"
                  name={`email`}
                  onFocus={() => {
                    validateEmails(emails, i)
                  }}
                  onChange={(e) => updateEmail(e, i)}
                  className="inviteInput h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                  placeholder="johndoe@example.com"
                  title={t('commonConstants.email')}
                  aria-label={t('commonConstants.email')}
                />
                {Object.entries(errors).map(([key]) =>
                  Number(key) === i ? (
                    <p key={key} className="text-red-700">
                      {t('statusCheck.emailIsInvalid')}
                    </p>
                  ) : (
                    ''
                  )
                )}
              </div>
            )
          })}
        </div>
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
            title={
              transition.state === 'submitting'
                ? t('inviteMemeberPopUpConstants.inviting')
                : t('inviteMemeberPopUpConstants.invite')
            }
            buttonText={
              transition.state === 'submitting'
                ? t('inviteMemeberPopUpConstants.inviting')
                : t('inviteMemeberPopUpConstants.invite')
            }
            datacy="submit"
          />
        </div>
      </Form>
    </DialogWrapper>
  )
}

export default InviteCandidatePopup
