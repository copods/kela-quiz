import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { useFetcher, useTransition } from '@remix-run/react'
import { Fragment, useState, useEffect } from 'react'
import Button from '../common-components/Button'
import { trimValue } from '~/utils'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import InputField from '../common-components/InputField'
import { actions } from '~/constants/action.constants'
import { routes } from '~/constants/route.constants'

export default function AddWorkspace({
  showAddWorkspaceModal,
  setShowAddWorkspaceModal,
  setWorkspaceId,
  currentWorkspaceId,
}: {
  showAddWorkspaceModal: boolean
  setShowAddWorkspaceModal?: (e: boolean) => void
  setWorkspaceId?: (e: string) => void
  currentWorkspaceId: string
}) {
  const { t } = useTranslation()
  const fetcher = useFetcher()
  const transition = useTransition()
  const [workspace, setWorkspace] = useState('')
  const submitWorkspaceForm = () => {
    fetcher.submit(
      {
        workspaceName: workspace,
        action: actions.addWorkspace,
      },
      { method: 'post', action: `/${currentWorkspaceId}${routes.settings}` }
    )
  }
  useEffect(() => {
    setWorkspace('')
  }, [showAddWorkspaceModal])

  useEffect(() => {
    let data = fetcher.data
    if (fetcher.state === 'loading' && data) {
      if (
        data.resp?.status === 200 &&
        setShowAddWorkspaceModal &&
        setWorkspaceId
      ) {
        setWorkspaceId(data.resp?.workspaceId)
        toast.success(t(data.resp?.title))
        setShowAddWorkspaceModal(false)
      } else if (data.errors?.status === 400 && setShowAddWorkspaceModal) {
        toast.error(t(data.errors?.title), {
          toastId: data.errors?.title,
        })
        setShowAddWorkspaceModal(true)
      }
    }
  }, [fetcher, t, setShowAddWorkspaceModal, setWorkspaceId])

  const inputFieldsProps = [
    {
      label: t('sideNav.workspace'),
      placeholder: t('sideNav.enterWorkspace'),
      type: 'text',
      name: 'addWorkspace',
      required: true,
      isRequired: true,
      value: workspace,
      errorId: 'name-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setWorkspace(trimValue(event.target.value))
      },
    },
  ]
  return (
    <div>
      <Transition.Root show={showAddWorkspaceModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() =>
            setShowAddWorkspaceModal && setShowAddWorkspaceModal(false)
          }
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
                    icon="carbon:close"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter' && setShowAddWorkspaceModal)
                        setShowAddWorkspaceModal(false)
                    }}
                    onClick={() =>
                      setShowAddWorkspaceModal &&
                      setShowAddWorkspaceModal(false)
                    }
                  />
                </div>
                <hr className="mt-4 h-px w-full border-0 bg-gray-300" />
                <div className="py-6">
                  {inputFieldsProps.map((props) => {
                    return <InputField {...props} key={props.name} />
                  })}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    tabIndex={0}
                    id="cancel-add-button"
                    className="h-9 px-4"
                    onClick={() =>
                      setShowAddWorkspaceModal &&
                      setShowAddWorkspaceModal(false)
                    }
                    variant="primary-outlined"
                    title={t('commonConstants.cancel')}
                    buttonText={t('commonConstants.cancel')}
                  />
                  <Button
                    tabIndex={0}
                    id="add-button"
                    name="addWorkspace"
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
                    variant="primary-solid"
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
