import { Form, useFetcher, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import { useTranslation } from 'react-i18next'
import DialogWrapper from '../Dialog'
export interface editItem {
  id: string
  name: string
  description: string
}
const AddSection = ({
  open,
  setOpen,
  editItem,
  editSection,
  showErrorMessage,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  showErrorMessage: boolean
  editItem?: editItem
  editSection?: (name: string, description: string) => void
}) => {
  const { t } = useTranslation()

  const transition = useTransition()
  const [sectionName, setSectionName] = useState('')
  const [description, setDescription] = useState('')
  const fetcher = useFetcher()
  useEffect(() => {
    if (editItem) {
      setSectionName(editItem.name)
      setDescription(editItem.description)
      return
    }
    setDescription('')
    setSectionName('')
  }, [open, editItem])
  const handleEdit = (name: string, description: string) => {
    editSection?.(name, description)
    // setOpen(false)
  }
  return (
    <DialogWrapper
      open={open}
      heading={
        editItem
          ? t('sectionsConstants.editSection')
          : t('sectionsConstants.addSection')
      }
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
            type="button"
            id="submit-button"
            className="h-9 px-4"
            name="add-section"
            value="add"
            isDisabled={transition.state === 'submitting'}
            varient="primary-solid"
            datacy="submit"
            onClick={() =>
              editItem ? handleEdit(sectionName, description) : ''
            }
            title={
              transition.state === 'submitting'
                ? editItem
                  ? t('commonConstants.updating')
                  : t('commonConstants.adding')
                : editItem
                ? t('commonConstants.edit')
                : t('commonConstants.add')
            }
            buttonText={
              fetcher.submission?.formData.get('id') === editItem?.id
                ? editItem
                  ? t('commonConstants.updating')
                  : t('commonConstants.adding')
                : editItem
                ? t('commonConstants.update')
                : t('commonConstants.add')
            }
          />
        </div>
      </Form>
    </DialogWrapper>
  )
}
export default AddSection
