import { useLoaderData, useSubmit } from '@remix-run/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../common-components/Button'
import DialogWrapper from '../common-components/Dialog'

const Workspace = () => {
  const [openLeavePopup, setOpenLeavePopup] = useState(false)
  const { t } = useTranslation()
  const submit = useSubmit()
  const workspaceLoaderData = useLoaderData()
  const leaveWorkspace = () => {
    submit({ leaveWorkspace: 'leaveWorkspace' }, { method: 'post' })
  }
  return (
    <div className="flex justify-start ">
      {workspaceLoaderData?.ownersWorkspace?.id !==
      workspaceLoaderData?.currentWorkspaceId ? (
        <div>
          <Button
            tabIndex={0}
            id="leave-workspace"
            variant="secondary-solid"
            type="button"
            name="leave"
            className="px-5"
            title={t('settings.leaveWorkspace')}
            buttonText={t('settings.leaveWorkspace')}
            onClick={() => setOpenLeavePopup(!openLeavePopup)}
          />
        </div>
      ) : null}
      <DialogWrapper
        open={openLeavePopup}
        setOpen={setOpenLeavePopup}
        header={false}
      >
        <div className="flex flex-col gap-4">
          <div>
            <p>{t('settings.leaveWorkspaceConfirmation')}</p>
          </div>
          <div className="mr-5 flex justify-end gap-4">
            <Button
              tabIndex={0}
              id="cancel-leave-workspace"
              variant="primary-outlined"
              type="button"
              name="cancel"
              className="px-5"
              title={t('commonConstants.cancel')}
              buttonText={t('commonConstants.cancel')}
              onClick={() => setOpenLeavePopup(!openLeavePopup)}
            />
            <Button
              tabIndex={0}
              id="confirm-leave-workspace"
              variant="secondary-solid"
              type="button"
              name="leave"
              className="px-5"
              title={t('settings.leaveWorkspace')}
              buttonText={t('settings.leave')}
              onClick={() => leaveWorkspace()}
            />
          </div>
        </div>
      </DialogWrapper>
    </div>
  )
}
export default Workspace
