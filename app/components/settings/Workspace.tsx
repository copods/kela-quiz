import { useEffect, useState } from "react"

import { useLoaderData, useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Button from "../common-components/Button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogWrapper,
} from "../common-components/Dialog"
import { NewDropdownField } from "../common-components/Dropdown"
import ListMenuItem from "../ListActionMenu"

import { WorkspaceDetailsSection } from "./WorkspaceDetailsSection"

import Header from "~/components/header/Header"
import type { SettingWorkspace } from "~/interface/Interface"

const CancelAndSaveButton = ({
  inputValue,
  updateWorkspaceCb,
  cancelEditCb,
}: {
  inputValue: string
  updateWorkspaceCb: () => void
  cancelEditCb: () => void
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex gap-6">
      <Button
        tabIndex={0}
        id="cancel-edit-workspace"
        variant="primary-outlined"
        type="button"
        name="edit"
        title={t("commonConstants.cancel")}
        buttonText={t("commonConstants.cancel")}
        onClick={cancelEditCb}
      />
      <Button
        tabIndex={0}
        id="save-workspace"
        variant="primary-solid"
        type="button"
        name="edit"
        title={t("commonConstants.save")}
        buttonText={t("commonConstants.save")}
        onClick={updateWorkspaceCb}
        isDisabled={!inputValue}
      />
    </div>
  )
}

const EditButton = ({ setIsEdit }: { setIsEdit: (val: boolean) => void }) => {
  const { t } = useTranslation()
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
  const [showChangeOwnershipPopup, setShowChangeOwnershipPopup] =
    useState(false)
  const [newOwner, setNewOwner] = useState("")
  const [actionDropdown, setActionDropdown] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const workspaceLoaderData = useLoaderData()
  const [inputValue, setInputValue] = useState(
    workspaceLoaderData?.userWorkspaces?.find(
      (workspaces: SettingWorkspace) =>
        workspaces?.workspaceId === workspaceLoaderData?.currentWorkspaceId
    )?.workspace?.name
  )
  const [isError, setIsError] = useState(false)
  const { t } = useTranslation()
  const submit = useSubmit()
  const leaveWorkspace = () => {
    submit({ leaveWorkspace: "leaveWorkspace" }, { method: "post" })
  }

  const cancelEdit = () => {
    setIsEdit(false)
    setInputValue(
      workspaceLoaderData?.userWorkspaces?.find(
        (workspaces: SettingWorkspace) =>
          workspaces?.workspaceId === workspaceLoaderData?.currentWorkspaceId
      )?.workspace?.name
    )
  }

  const updateWorkspace = () => {
    if (inputValue) {
      submit(
        {
          updateWorkspace: "updateUserWorkspace",
          workspaceId: workspaceLoaderData.currentWorkspaceId,
          name: inputValue,
        },
        { method: "post" }
      )
      setIsEdit(false)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  const updateWorkspaceOwner = () => {
    if (newOwner) {
      submit(
        {
          updateOwner: "updateOwner",
          newOwner,
        },
        { method: "post" }
      )
      setShowChangeOwnershipPopup(false)
    }
  }

  useEffect(() => {
    setIsError(false)
  }, [inputValue])

  useEffect(() => {
    setNewOwner("")
  }, [showChangeOwnershipPopup])

  return (
    <div className="flex flex-col justify-start gap-6">
      <div className="flex h-10 items-center justify-between">
        <Header id="workspace-header" heading="Details" size="text-2xl" />
        <div className="flex items-center gap-4">
          {isEdit ? (
            <CancelAndSaveButton
              updateWorkspaceCb={updateWorkspace}
              cancelEditCb={cancelEdit}
              inputValue={inputValue}
            />
          ) : (
            workspaceLoaderData.permission.workspace.update && (
              <EditButton setIsEdit={setIsEdit} />
            )
          )}
          <ListMenuItem
            id={"workspace-action"}
            menuIcon={"mdi:dots-vertical"}
            open={actionDropdown}
            onItemClick={setActionDropdown}
            dataCyID={"workspace-list-menu"}
            menuDetails={[
              {
                id: t("settings.leaveWorkspace"),
                menuListText: t("settings.leaveWorkspace"),
                menuListHelperText: workspaceLoaderData?.ownersWorkspaces
                  ?.map((workspace: { id: string }) => workspace.id)
                  .includes(workspaceLoaderData?.currentWorkspaceId)
                  ? t("settings.ownerLeaveWorkspace")
                  : "",
                handleItemAction: () =>
                  setShowLeaveWorkspacePopup(!showLeaveWorkspacePopup),
                disabled: workspaceLoaderData?.ownersWorkspaces
                  ?.map((workspace: { id: string }) => workspace.id)
                  .includes(workspaceLoaderData?.currentWorkspaceId),
              },
              {
                id: "transfer-ownership",
                menuListText: t("settings.transferOwnership"),
                handleItemAction: () =>
                  setShowChangeOwnershipPopup(!showChangeOwnershipPopup),
              },
            ].filter((menu) =>
              workspaceLoaderData?.ownersWorkspaces
                ?.map((workspace: { id: string }) => workspace.id)
                .includes(workspaceLoaderData?.currentWorkspaceId) &&
              workspaceLoaderData.allAdmins.length
                ? menu
                : menu.id !== "transfer-ownership"
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <WorkspaceDetailsSection
          isEdit={isEdit}
          isError={isError}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <DialogWrapper
          open={showLeaveWorkspacePopup}
          setOpen={setShowLeaveWorkspacePopup}
        >
          <>
            <DialogHeader
              heading={t("settings.leaveWorkspace")}
              onClose={setShowLeaveWorkspacePopup}
            />
            <DialogContent>
              <p>{t("settings.leaveWorkspaceConfirmation")}</p>
            </DialogContent>
            <DialogFooter>
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
            </DialogFooter>
          </>
        </DialogWrapper>
        <DialogWrapper
          open={showChangeOwnershipPopup}
          setOpen={setShowChangeOwnershipPopup}
        >
          <>
            <DialogHeader
              heading={t("settings.transferOwnership")}
              onClose={setShowChangeOwnershipPopup}
            />
            <DialogContent>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <span className="text-left text-sm leading-5 text-gray-800">
                    Title here
                  </span>
                  <ul className="ml-4 list-disc text-sm text-gray-600">
                    <li>
                      It is a long established fact that a reader will be
                      distracted.
                    </li>
                    <li>
                      The point of using Lorem Ipsum is that it has a
                      more-or-less.
                    </li>
                    <li>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random.
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-left leading-6 text-gray-800">
                    Select a user to assign as Owner
                  </span>
                  <NewDropdownField
                    id={"admin-dropdown"}
                    dropdownOptions={workspaceLoaderData.allAdmins}
                    labelKey={"fullName"}
                    valueKey={"id"}
                    helperText={"email"}
                    value={newOwner}
                    setValue={setNewOwner}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogFooter>
              <div className="flex justify-end gap-4">
                <Button
                  tabIndex={0}
                  id="cancel-transfer-ownership"
                  variant="primary-outlined"
                  type="button"
                  name="cancel"
                  className="px-5"
                  title={t("commonConstants.cancel")}
                  buttonText={t("commonConstants.cancel")}
                  onClick={() =>
                    setShowChangeOwnershipPopup(!showChangeOwnershipPopup)
                  }
                />
                <Button
                  tabIndex={0}
                  id="confirm-transfer-ownership"
                  variant="primary-solid"
                  type="button"
                  name="confirm"
                  className="px-5"
                  title={t("commonConstants.proceed")}
                  buttonText={t("commonConstants.proceed")}
                  isDisabled={newOwner?.length ? false : true}
                  onClick={updateWorkspaceOwner}
                />
              </div>
            </DialogFooter>
          </>
        </DialogWrapper>
      </div>
    </div>
  )
}
export default Workspace
