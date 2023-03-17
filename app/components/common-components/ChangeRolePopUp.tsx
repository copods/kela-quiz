import { useState } from "react"

import { Form, useSubmit } from "@remix-run/react"
import { t } from "i18next"

import DropdownField from "../common-components/Dropdown"

import Button from "./Button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogWrapperNew,
} from "./Dialog"

import type { Role } from "~/interface/Interface"

export default function ChangeRolePopUp({
  open,
  setOpen,
  roles,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  roles: Role[]
}) {
  const [userRole, setUserRole] = useState(roles[0].name)

  const submit = useSubmit()

  const onSubmit = () => {
    const userRoleId = roles.filter((item) => item.name === userRole)
    submit(
      {
        roleId: userRoleId[0].id,
        roleName: userRole,
        action: "updateRole",
      },
      {
        method: "post",
      }
    )
  }
  return (
    <DialogWrapperNew open={open} setOpen={setOpen}>
      <>
        <DialogHeader heading="Change Role" />
        <DialogContent>
          <div id="change-role-dialog" className="bg-white">
            <div className="flex-col gap-5 sm:flex sm:items-start">
              <div className="text-sm font-normal text-gray-600">
                Select a role that you want to assign.
              </div>
              <div className="w-full">
                <DropdownField
                  data={roles}
                  displayKey="name"
                  valueKey="name"
                  value={userRole}
                  setValue={setUserRole}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <>
            <div className="gap-2 sm:flex sm:flex-row-reverse">
              <Form method="post">
                <Button
                  tabIndex={0}
                  id="confirm-delete"
                  variant="primary-solid"
                  type="button"
                  name="delete"
                  className="px-5"
                  title={t("commonConstants.proceed")}
                  buttonText={t("commonConstants.proceed")}
                  onClick={() => {
                    onSubmit()
                  }}
                />
              </Form>
              <Button
                tabIndex={0}
                type="button"
                id="cancel-change-role-pop-up"
                variant="primary-outlined"
                className="px-5"
                title={t("commonConstants.cancel")}
                buttonText={t("commonConstants.cancel")}
                onClick={() => {
                  if (setOpen !== undefined) setOpen(false)
                }}
              />
            </div>
          </>
        </DialogFooter>
      </>
    </DialogWrapperNew>
  )
}
