import { useEffect } from "react"

import { Icon } from "@iconify/react"
import { Form } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogWrapper,
} from "../common-components/Dialog"

import Button from "./Button"
export default function DeletePopUp({
  setOpen,
  open,
  onDelete,
  subAlert,
  setDeleted,
  status,
  deleteItemType,
  deleteItem,
  header,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  onDelete: () => void
  subAlert?: string
  setDeleted?: (e: boolean) => void
  status?: string | undefined
  deleteItemType: string
  deleteItem?: string
  header: string
}) {
  const { t } = useTranslation()

  const handleDelete = () => {
    onDelete()
    setOpen(false)
  }
  useEffect(() => {
    if (open === true) {
      setTimeout(() => {
        document.getElementById("confirm-delete")?.focus()
      }, 100)
    }
  }, [open])

  return (
    <DialogWrapper open={open} setOpen={setOpen}>
      <>
        <DialogHeader heading={header} onClose={setOpen} />
        <DialogContent>
          <div id="delete-dialog" className="bg-white">
            <div className="sm:flex sm:items-start ">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <Icon
                  icon="ic:outline-delete-outline"
                  className="h-6 w-6 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <span className="text-sm text-gray-500">
                  {t("deletePopUp.alert")} {deleteItemType}
                </span>
                <p className="bold text-sm font-medium ">
                  {deleteItem} {subAlert}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <div className="gap-2 sm:flex sm:flex-row-reverse">
            <Form method="post">
              <Button
                tabIndex={0}
                id="confirm-delete"
                variant="secondary-solid"
                type="button"
                name="delete"
                className="px-5"
                title={t("commonConstants.delete")}
                buttonText={t("commonConstants.delete")}
                onClick={() => {
                  handleDelete()
                  if (setDeleted !== undefined) {
                    setDeleted(true)
                  }
                }}
              />
            </Form>
            <Button
              tabIndex={0}
              type="button"
              id="cancel-delete-pop-up"
              variant="primary-outlined"
              className="px-5"
              title={t("commonConstants.cancel")}
              buttonText={t("commonConstants.cancel")}
              onClick={() => {
                if (setOpen !== undefined) setOpen(false)
              }}
            />
          </div>
        </DialogFooter>
      </>
    </DialogWrapper>
  )
}
