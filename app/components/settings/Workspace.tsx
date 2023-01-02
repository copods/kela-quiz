import { useLoaderData, useSubmit } from '@remix-run/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../common-components/Button'
import DialogWrapper from '../common-components/Dialog'

const Workspace = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const submit = useSubmit()
  const loaderData = useLoaderData()
  const leaveWorkspace = () => {
    submit({ addSection: 'sectionAdd' }, { method: 'post' })
  }
  return (
    <div className="flex justify-start ">
      {loaderData?.ownersWorkspace?.id !== loaderData?.currentWorkspaceId ? (
        <div>
          <Button
            tabIndex={0}
            id="leave-workspace"
            varient="secondary-solid"
            type="button"
            name="leave"
            className="px-5"
            title={t('settings.leaveWorkspace')}
            buttonText={t('settings.leaveWorkspace')}
            onClick={() => setOpen(!open)}
          />
        </div>
      ) : null}
      <DialogWrapper open={open} setOpen={setOpen} header={false}>
        <div className="flex flex-col gap-4">
          <div>
            <p>{t('settings.leaveWorkspaceConfirmation')}</p>
          </div>
          <div className="mr-5 flex justify-end gap-4">
            <Button
              tabIndex={0}
              id="cancel-leave-workspace"
              varient="primary-outlined"
              type="button"
              name="cancel"
              className="px-5"
              title={t('commonConstants.cancel')}
              buttonText={t('commonConstants.cancel')}
              onClick={() => setOpen(!open)}
            />
            <Button
              tabIndex={0}
              id="confirm-leave-workspace"
              varient="secondary-solid"
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
