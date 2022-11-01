import { Form, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import { useTranslation } from 'react-i18next'
import DialogWrapperComponent from '../Dialog'
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
const AddSection = ({
  open,
  setOpen,
  showErrorMessage,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  showErrorMessage: boolean
}) => {
  const { t } = useTranslation()

  const transition = useTransition()
  const [sectionName, setSectionName] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    setDescription('')
    setSectionName('')
  }, [open])
  const dialogWrapperProps = [
    // dialog wrapper props
    {
      id: 'add-section',
    },
  ]
  return (
    <div>
      {dialogWrapperProps.map((props) => {
        return (
          <DialogWrapperComponent
            open={open}
            setOpen={setOpen}
            {...props}
            key={props.id}
          >
            <Dialog.Panel className="relative transform rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="flex items-center justify-between pt-1">
                {/* dialog wrapper heading */}
                <h2
                  className="text-2xl font-bold text-gray-700"
                  title={t('sectionsConstants.addSection')}
                  role={t('sectionsConstants.addSection')}
                  aria-label={t('sectionsConstants.addSection')}
                  tabIndex={0}
                >
                  {t('members.addMember')}
                </h2>
                {/* dialog wrapper close icon for close the dialog */}
                <Icon
                  tabIndex={0}
                  className="cursor-pointer text-2xl text-gray-600"
                  icon={'carbon:close'}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') setOpen(false)
                  }}
                  onClick={() => setOpen(false)}
                />
              </div>
              <hr className="mt-4 mb-6 h-px w-full border-0 bg-gray-300" />

              <Form method="post">
                <div className="pb-6">
                  <input
                    tabIndex={0}
                    type="text"
                    name="name"
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder={t('commonConstants.enterSectionName')}
                    onChange={(e) => setSectionName(trimValue(e.target.value))}
                    value={sectionName}
                    maxLength={52}
                  />
                </div>
                <div className="pb-6">
                  <textarea
                    tabIndex={0}
                    name="description"
                    id="section-description"
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 px-3 py-4 text-base"
                    onChange={(e) => setDescription(trimValue(e.target.value))}
                    value={description}
                    placeholder={t('commonConstants.enterSectionDesc')}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    tabIndex={0}
                    type="button"
                    className="h-9 px-4"
                    onClick={() => setOpen(false)}
                    varient="primary-outlined"
                    title={t('commonConstants.cancel')}
                    buttonText={t('commonConstants.cancel')}
                  />
                  <Button
                    tabIndex={0}
                    type="submit"
                    id="submit-button"
                    className="h-9 px-4"
                    name="add-section"
                    value="add"
                    isDisabled={
                      transition.state === 'submitting' || showErrorMessage
                    }
                    varient="primary-solid"
                    datacy="submit"
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
                  />
                </div>
              </Form>
            </Dialog.Panel>
          </DialogWrapperComponent>
        )
      })}
    </div>
  )
}
export default AddSection
