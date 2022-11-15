import { Form, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import { useTranslation } from 'react-i18next'
import DialogWrapper from '../Dialog'

const AddSection = ({
  open,
  setOpen,
  errorMessage,
  setErrorMessage,
  showErrorMessage,
}: {
  open: boolean
  errorMessage: { title: string; description: string }
  setErrorMessage: ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => void

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
    setErrorMessage({ title: '', description: '' })
  }, [open, setErrorMessage])
  return (
    <DialogWrapper
      open={open}
      heading={t('sectionsConstants.addSection')}
      setOpen={setOpen}
      header={true}
      role={t('sectionsConstants.addSection')}
      ariaLabel={t('sectionsConstants.addSection')}
      tabIndex={0}
    >
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
          <p className="px-3 text-red-500">{errorMessage.title}</p>
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
          <p className="px-3 text-red-500">{errorMessage.description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            tabIndex={0}
            type="button"
            className="h-9 px-4"
            onClick={() => {
              setOpen(false)
              setErrorMessage({ title: '', description: '' })
            }}
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
            isDisabled={transition.state === 'submitting'}
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
    </DialogWrapper>
  )
}
export default AddSection
