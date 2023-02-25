import { useState } from "react"

import { useLoaderData, useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import type { TFunction } from "react-i18next"

import Button from "../common-components/Button"
import DialogWrapper from "../common-components/Dialog"

import { WorkspaceDetailsSection } from "./WorkspaceDetailsSection"

import Header from "~/components/header/Header"
import type { SettingWorkspace } from "~/interface/Interface"

const CancelAndSaveButton = ({
  setIsEdit,
  t,
  currentWorkspaceId,
  workspaceName,
}: {
  setIsEdit: (val: boolean) => void
  t: TFunction<"translation", undefined>
  currentWorkspaceId: string
  workspaceName: string
}) => {
  const submit = useSubmit()
  const updateWorkspace = () => {
    submit(
      {
        updateWorkspace: "updateUserWorkspace",
        workspaceId: currentWorkspaceId,
        name: workspaceName,
      },
      { method: "post" }
    )
  }

  return (
    <div className="flex gap-6">
      <Button
        tabIndex={0}
        id="edit-workspace"
        variant="primary-outlined"
        type="button"
        name="edit"
        title={t("commonConstants.cancel")}
        buttonText={t("commonConstants.cancel")}
        onClick={() => setIsEdit(false)}
      />
      <Button
        tabIndex={0}
        id="edit-workspace"
        variant="primary-solid"
        type="button"
        name="edit"
        title={t("commonConstants.save")}
        buttonText={t("commonConstants.save")}
        onClick={() => {
          updateWorkspace()
          setIsEdit(false)
        }}
      />
    </div>
  )
}

const EditButton = ({
  setIsEdit,
  t,
}: {
  setIsEdit: (val: boolean) => void
  t: TFunction<"translation", undefined>
}) => {
  return (
    <Button
      tabIndex={0}
      id="edit-workspace"
      variant="primary-solid"
      type="button"
      name="edit"
      title={t("commonConstants.edit")}
      buttonText={t("commonConstants.edit")}
      onClick={() => setIsEdit(true)}
    />
  )
}

const Workspace = () => {
  const [showLeaveWorkspacePopup, setShowLeaveWorkspacePopup] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const workspaceLoaderData = useLoaderData()
  const [inputValue, setInputValue] = useState(
    workspaceLoaderData?.ownersWorkspaces?.find(
      (workspaces: SettingWorkspace) =>
        workspaces?.id === workspaceLoaderData?.currentWorkspaceId
    )?.name
  )
  const { t } = useTranslation()
  const submit = useSubmit()
  const leaveWorkspace = () => {
    submit({ leaveWorkspace: "leaveWorkspace" }, { method: "post" })
  }

  return (
    <div className="flex flex-col justify-start gap-8">
      <div className="flex h-10 items-center justify-between">
        <Header id="workspace-header" heading="Details" size="text-2xl" />
        {isEdit ? (
          <CancelAndSaveButton
            setIsEdit={setIsEdit}
            t={t}
            currentWorkspaceId={workspaceLoaderData.currentWorkspaceId}
            workspaceName={inputValue}
          />
        ) : (
          <EditButton setIsEdit={setIsEdit} t={t} />
        )}
      </div>
      <WorkspaceDetailsSection
        isEdit={isEdit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {!isEdit && (
        <>
          <Button
            tabIndex={0}
            id="leave-workspace"
            variant="secondary-solid"
            type="button"
            name="leave"
            className="w-max px-5"
            title={t("settings.leaveWorkspace")}
            buttonText={t("settings.leaveWorkspace")}
            onClick={() => setShowLeaveWorkspacePopup(!showLeaveWorkspacePopup)}
            isDisabled={workspaceLoaderData?.ownersWorkspaces
              ?.map((workspace: { id: string }) => workspace.id)
              .includes(workspaceLoaderData?.currentWorkspaceId)}
          />
          <DialogWrapper
            open={showLeaveWorkspacePopup}
            setOpen={setShowLeaveWorkspacePopup}
            header={false}
          >
            <div className="flex flex-col gap-4">
              <div>
                <p>{t("settings.leaveWorkspaceConfirmation")}</p>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  tabIndex={0}
                  id="cancel-leave-workspace"
                  variant="primary-outlined"
                  type="button"
                  name="cancel"
                  className="px-5"
                  title={t("commonConstants.cancel")}
                  buttonText={t("commonConstants.cancel")}
                  onClick={() =>
                    setShowLeaveWorkspacePopup(!showLeaveWorkspacePopup)
                  }
                />
                <Button
                  tabIndex={0}
                  id="confirm-leave-workspace"
                  variant="secondary-solid"
                  type="button"
                  name="leave"
                  className="px-5"
                  title={t("settings.leaveWorkspace")}
                  buttonText={t("settings.leave")}
                  onClick={() => leaveWorkspace()}
                />
              </div>
            </div>
          </DialogWrapper>
        </>
      )}
    </div>
  )
}
export default Workspace
