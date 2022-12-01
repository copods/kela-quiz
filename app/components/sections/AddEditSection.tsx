import { Form, useActionData, useSubmit, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '../common-components/Button'
import { trimValue } from '~/utils'
import { useTranslation } from 'react-i18next'
import DialogWrapper from '../common-components/Dialog'
import type { sectionActionErrorsType } from '~/interface/Interface'

export interface editItem {
  name: string
  description: string
}
const AddEditSection = ({
  open,
  setOpen,
  editItem,
  editId,
  setSectionActionErrors,
  sectionActionErrors,
}: {
  open: boolean
  sectionActionErrors?: sectionActionErrorsType
  setSectionActionErrors?: ({
    title,
    description,
  }: sectionActionErrorsType) => void

  setOpen: (e: boolean) => void
  showErrorMessage?: boolean
  editItem?: editItem
  editId?: string
  addSection?: (name: string, description: string) => void
}) => {
  const { t } = useTranslation()
  const transition = useTransition()
  const [sectionName, setSectionName] = useState('')
  const [description, setDescription] = useState('')
  const submit = useSubmit()
  const sectionActionData = useActionData()
  const editSection = (name: string, description: string) => {
    submit(
      {
        editSection: 'sectionEdit',
        id: editId!,
        name: name,
        description: description,
      },
      {
        method: 'post',
      }
    )
  }
  const addSection = (name: string, description: string) => {
    submit({ addSection: 'sectionAdd', name, description }, { method: 'post' })
  }
  useEffect(() => {
    if (editItem) {
      setSectionActionErrors?.({ title: '', description: '' })
      setSectionName(editItem.name)
      setDescription(editItem.description)
      return
    }
    setDescription('')
    setSectionName('')
    setSectionActionErrors?.({ title: '', description: '' })
  }, [open, editItem, setSectionActionErrors])

  useEffect(() => {
    if (
      t(sectionActionData?.resp?.status as string) ===
      t('statusCheck.testUpdatedSuccess')
    ) {
      setOpen(false)
    }
  }, [sectionActionData?.resp, setOpen, t])
  const handleEdit = (name: string, description: string) => {
    editSection(name, description)
  }
  const handleAdd = (name: string, description: string) => {
    addSection?.(name, description)
  }

  return (
    <DialogWrapper
      open={open}
      heading={
        editItem
          ? t('sectionsConstants.editTest')
          : t('sectionsConstants.addTests')
      }
      setOpen={setOpen}
      header={true}
      role={t('sectionsConstants.addTests')}
      aria-label={t('sectionsConstants.addTests')}
      tabIndex={0}
    >
      <Form method="post">
        <div className="pb-6">
          <input
            tabIndex={0}
            type="text"
            name="name"
            id="addEditSection-name"
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
            placeholder={t('commonConstants.enterTestsName')}
            onChange={(e) => setSectionName(trimValue(e.target.value))}
            value={sectionName}
            maxLength={52}
          />
          {sectionActionErrors?.title ? (
            <p id="addEditSection-title-error" className="px-3 text-red-500">
              {t(sectionActionErrors.title)}
            </p>
          ) : null}
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
            placeholder={t('commonConstants.enterTestsDesc')}
          />
          {sectionActionErrors?.description ? (
            <p
              id="addEditSection-description-error"
              className="px-3 text-red-500"
            >
              {t(sectionActionErrors.description)}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            tabIndex={0}
            type="button"
            id="cancel-button"
            className="h-9 px-4"
            onClick={() => {
              setOpen(false)
              setSectionActionErrors?.({ title: '', description: '' })
            }}
            varient="primary-outlined"
            title={t('commonConstants.cancel')}
            buttonText={t('commonConstants.cancel')}
          />
          <Button
            tabIndex={0}
            type="button"
            id="submit-button"
            className="h-9 px-4"
            name={editItem ? 'edit-section' : 'add-section'}
            value="add"
            isDisabled={transition.state === 'submitting'}
            varient="primary-solid"
            datacy="submit"
            onClick={() =>
              editItem
                ? handleEdit(sectionName, description)
                : handleAdd(sectionName, description)
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
              transition.state === 'submitting'
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
export default AddEditSection
