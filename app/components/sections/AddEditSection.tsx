import { useEffect, useState } from "react"

import { Form, useFetcher, useNavigate, useTransition } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import Button from "../common-components/Button"
import DialogWrapper from "../common-components/Dialog"

import { useCommonContext } from "~/context/Common.context"
import type { LoaderData } from "~/routes/$workspaceId/tests"
import { trimValue } from "~/utils"

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
  data,
}: {
  open: boolean
  sectionActionErrors?: {
    title?: string
    description?: string
    duplicateTitle?: string
  }
  setSectionActionErrors: ({
    title,
    description,
    duplicateTitle,
  }: {
    title?: string
    description?: string
    duplicateTitle?: string
  }) => void

  setOpen: (e: boolean) => void
  showErrorMessage?: boolean
  editItem?: editItem
  editId?: string
  addSection?: (name: string, description: string) => void
  data?: LoaderData
}) => {
  const { t } = useTranslation()
  const { clearStoredValue } = useCommonContext()
  const transition = useTransition()
  const [sectionName, setSectionName] = useState("")
  const [description, setDescription] = useState("")
  const fetcher = useFetcher()
  const editSection = (name: string, description: string) => {
    fetcher.submit(
      {
        editSection: "sectionEdit",
        id: editId!,
        name: name,
        description: description,
      },
      {
        method: "post",
      }
    )
  }
  const addSection = (name: string, description: string) => {
    clearStoredValue("testActivePage")
    clearStoredValue("activeTest")
    fetcher.submit(
      { addSection: "sectionAdd", name, description },
      { method: "post" }
    )
  }
  const fetcherData = fetcher.data
  useEffect(() => {
    if (fetcherData?.createSectionFieldError || fetcherData?.errors?.title) {
      setSectionActionErrors({
        title: fetcherData?.createSectionFieldError?.title,
        description: fetcherData?.createSectionFieldError?.description,
        duplicateTitle: fetcherData?.errors?.title,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherData?.createSectionFieldError, fetcherData?.errors?.check])

  const navigate = useNavigate()
  useEffect(() => {
    if (fetcherData?.resp?.status === "statusCheck.testAddedSuccess") {
      toast.success(t(fetcherData?.resp?.status as string), {
        toastId: "test-added-sucessfully",
      })
      setOpen(false)
    } else if (fetcherData?.resp?.status === "statusCheck.testUpdatedSuccess") {
      toast.success(t(fetcherData?.resp?.status as string), {
        toastId: t(fetcherData?.resp?.status as string),
      })
      navigate(`${location.pathname}${location.search}`)
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherData?.resp?.data?.id, fetcherData?.resp?.status, setOpen, t])
  useEffect(() => {
    if (sectionName.length! > 1)
      setSectionActionErrors({
        title: "",
        duplicateTitle: "",
      })
    else if (description.length! > 1) {
      setSectionActionErrors({
        description: "",
      })
    }
  }, [sectionName, description, setSectionActionErrors, setOpen])
  useEffect(() => {
    if (editItem) {
      setSectionActionErrors?.({ title: "", description: "" })
      setSectionName(editItem.name)
      setDescription(editItem.description)
      return
    }
    setDescription("")
    setSectionName("")
    setSectionActionErrors?.({ title: "", description: "" })
  }, [open, editItem, setSectionActionErrors])

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
          ? t("sectionsConstants.editTest")
          : t("sectionsConstants.addTests")
      }
      setOpen={setOpen}
      header={true}
      role={t("sectionsConstants.addTests")}
      aria-label={t("sectionsConstants.addTests")}
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
            placeholder={`${t("commonConstants.enterTestsName")}*`}
            onChange={(e) => setSectionName(trimValue(e.target.value))}
            value={sectionName}
            maxLength={52}
          />
          {sectionActionErrors?.title ? (
            <p id="addEditSection-title-error" className="px-3 text-red-500">
              {t(sectionActionErrors?.title)}
            </p>
          ) : sectionActionErrors?.duplicateTitle ? (
            <p id="duplicete-title-error" className="px-3 text-red-500">
              {t(sectionActionErrors?.duplicateTitle)}
            </p>
          ) : null}
        </div>
        <div className="pb-6">
          <textarea
            tabIndex={0}
            name="description"
            id="section-description"
            rows={4}
            className="max-h-280 w-full overflow-auto rounded-lg border border-gray-200 px-3 py-4 text-base"
            onChange={(e) => setDescription(trimValue(e.target.value))}
            value={description}
            placeholder={`${t("commonConstants.enterTestsDesc")}*`}
          />
          {sectionActionErrors?.description ? (
            <p
              id="addEditSection-description-error"
              className="px-3 text-red-500"
            >
              {t(sectionActionErrors?.description)}
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
              setSectionActionErrors?.({ title: "", description: "" })
            }}
            variant="primary-outlined"
            title={t("commonConstants.cancel")}
            buttonText={t("commonConstants.cancel")}
          />
          <Button
            tabIndex={0}
            type="button"
            id="submit-button"
            className="h-9 px-4"
            name={editItem ? "edit-section" : "add-section"}
            value="add"
            isDisabled={transition.state === "submitting"}
            variant="primary-solid"
            datacy="submit"
            onClick={() =>
              editItem
                ? handleEdit(sectionName, description)
                : handleAdd(sectionName, description)
            }
            title={
              transition.state === "submitting"
                ? editItem
                  ? t("commonConstants.updating")
                  : t("commonConstants.adding")
                : editItem
                ? t("commonConstants.edit")
                : t("commonConstants.add")
            }
            buttonText={
              transition.state === "submitting"
                ? editItem
                  ? t("commonConstants.updating")
                  : t("commonConstants.adding")
                : editItem
                ? t("commonConstants.update")
                : t("commonConstants.add")
            }
          />
        </div>
      </Form>
    </DialogWrapper>
  )
}
export default AddEditSection
