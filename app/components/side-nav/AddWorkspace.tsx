import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { useFetcher, useTransition } from '@remix-run/react'
import { Fragment, useState, useEffect } from 'react'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function AddWorkspace({
  open,
  setOpen,
  setWorkspaceId,
}: {
  open: boolean
  setOpen?: (e: boolean) => void
  setWorkspaceId?: (e: string) => void
}) {
  const { t } = useTranslation()
  const fetcher = useFetcher()
  const transition = useTransition()
  const [workspace, setWorkspace] = useState('')
  const submitWorkspaceForm = () => {
    fetcher.submit(
      {
        workspaceName: workspace,
        action: 'Add Workspace',
      },
      { method: 'post', action: '/settings' }
    )
  }
  useEffect(() => {
    setWorkspace('')
  }, [open])

  useEffect(() => {
    let data = fetcher.data
    if (fetcher.state === 'loading') {
      if (data) {
        if (data.resp?.status === 200 && setOpen && setWorkspaceId) {
          setWorkspaceId(data.resp?.workspaceId)
          toast.success(t(data.resp?.title))
          setOpen(false)
        } else if (data.errors?.status === 400 && setOpen) {
          toast.error(t(data.errors?.title), {
            toastId: data.errors?.title,
          })
          setOpen(false)
        }
      }
    }
  }, [fetcher, t, setOpen])
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen && setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div
            className="fixed inset-0 z-10 flex min-h-full items-end justify-center overflow-y-auto p-4 text-center sm:items-center sm:p-0"
            id="add-pop-up-model"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex items-center justify-between pt-1">
                  <h2
                    className="text-2xl font-bold text-gray-700"
                    tabIndex={0}
                    title={t('sideNav.addWorkspace')}
                    role={t('sideNav.addWorkspace')}
                    aria-label={t('sideNav.addWorkspace')}
                  >
                    {t('sideNav.addWorkspace')}
                  </h2>
                  <Icon
                    tabIndex={0}
                    className="cursor-pointer text-2xl text-gray-600"
                    icon={'carbon:close'}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter' && setOpen) setOpen(false)
                    }}
                    onClick={() => setOpen && setOpen(false)}
                  />
                </div>
                <hr className="mt-4 h-px w-full border-0 bg-gray-300" />
                <div className="py-6">
                  <label htmlFor="addWorkspace" className="text-gray-800">
                    {t('sideNav.workspace')}
                  </label>
                  <input
                    tabIndex={0}
                    id="addWorkspace"
                    type="text"
                    name="addWorkspace"
                    className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder={t('sideNav.enterWorkspace')}
                    onChange={(e) => setWorkspace(trimValue(e.target.value))}
                    value={workspace}
                    maxLength={40}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    tabIndex={0}
                    id="cancel-add-button"
                    className="h-9 px-4"
                    onClick={() => setOpen && setOpen(false)}
                    varient="primary-outlined"
                    title={t('commonConstants.cancel')}
                    buttonText={t('commonConstants.cancel')}
                  />
                  <Button
                    tabIndex={0}
                    id="add-button"
                    name="addMember"
                    value="add"
                    className="h-9 px-4"
                    isDisabled={transition.state === 'submitting'}
                    title={
                      transition.state === 'submitting'
                        ? t('commonConstants.adding')
                        : t('commonConstants.add')
                    }
                    buttonText={
                      transition.state === 'submitting'
                        ? t('commonConstants.adding')
                        : t('commonConstants.add')
                    }
                    varient="primary-solid"
                    onClick={() => submitWorkspaceForm()}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
