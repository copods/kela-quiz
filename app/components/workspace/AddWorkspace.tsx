import { Fragment, useState, useEffect } from "react"

import { useFetcher, useTransition } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import Button from "../common-components/Button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogWrapper,
} from "../common-components/Dialog"
import InputField from "../common-components/InputField"

import { actions } from "~/constants/action.constants"
import { routes } from "~/constants/route.constants"
import { trimValue } from "~/utils"

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
  const [workspace, setWorkspace] = useState("")
  const submitWorkspaceForm = () => {
    fetcher.submit(
      {
        workspaceName: workspace,
        action: actions.addWorkspace,
      },
      { method: "post", action: `/${currentWorkspaceId}${routes.settings}` }
    )
  }
  useEffect(() => {
    setWorkspace("")
  }, [showAddWorkspaceModal])

  useEffect(() => {
    let data = fetcher.data
    if (fetcher.state === "loading" && data) {
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
      label: t("sideNav.workspace"),
      placeholder: t("sideNav.enterWorkspace"),
      type: "text",
      name: "addWorkspace",
      required: true,
      isRequired: true,
      value: workspace,
      errorId: "name-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setWorkspace(trimValue(event.target.value))
      },
    },
  ]
  return (
    <DialogWrapper
      open={showAddWorkspaceModal}
      setOpen={setShowAddWorkspaceModal!}
    >
      <>
        <DialogHeader
          heading={t("sideNav.addWorkspace")}
          role={t("sideNav.addWorkspace")}
          aria-label={t("sideNav.addWorkspace")}
          onClose={setShowAddWorkspaceModal!}
          tabIndex={0}
        />
        <DialogContent>
          <>
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </>
        </DialogContent>
        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button
              tabIndex={0}
              id="cancel-add-button"
              className="h-9 px-4"
              onClick={() =>
                setShowAddWorkspaceModal && setShowAddWorkspaceModal(false)
              }
              variant="primary-outlined"
              title={t("commonConstants.cancel")}
              buttonText={t("commonConstants.cancel")}
            />
            <Button
              tabIndex={0}
              id="add-button"
              name="addWorkspace"
              value="add"
              className="h-9 px-4"
              isDisabled={transition.state === "submitting"}
              title={
                transition.state === "submitting"
                  ? t("commonConstants.adding")
                  : t("commonConstants.add")
              }
              buttonText={
                transition.state === "submitting"
                  ? t("commonConstants.adding")
                  : t("commonConstants.add")
              }
              variant="primary-solid"
              onClick={() => submitWorkspaceForm()}
            />
          </div>
        </DialogFooter>
      </>
    </DialogWrapper>
  )
}
