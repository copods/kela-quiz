import { useState, useEffect } from "react"

import { useSubmit, useNavigation } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Button from "../common-components/Button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogWrapper,
} from "../common-components/Dialog"
import DropdownField from "../common-components/Dropdown"

import InputField from "~/components/common-components/InputField"
import type { Role } from "~/interface/Interface"
import { trimValue } from "~/utils"

export default function AddMemberModal({
  roles,
  open,
  setOpen,
  loggedInUser,
}: {
  roles: Role[]
  open: boolean
  setOpen: (e: boolean) => void
  loggedInUser: string
}) {
  const { t } = useTranslation()

  const transition = useNavigation()
  const submit = useSubmit()
  const [email, setEmail] = useState("")
  const [role, setRole] = useState(roles[0].id)

  const submitMemberForm = () => {
    let data = {
      email: email,
      roleId: role,
      action: "invite",
    }
    submit(data, {
      method: "post",
    })
  }

  useEffect(() => {
    setRole(roles[0].id)
    setEmail("")
  }, [open, roles])

  const inputFieldsProps = [
    {
      label: t("commonConstants.email"),
      placeholder: t("commonConstants.email"),
      type: "text",
      name: "email",
      required: true,
      isRequired: true,
      value: email,
      errorId: "email-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(trimValue(event.target.value))
      },
    },
  ]
  return (
    <DialogWrapper open={open} setOpen={setOpen}>
      <>
        <DialogHeader
          heading={t("members.inviteMember")}
          onClose={setOpen}
          role={t("members.inviteMember")}
          ariaLabel={t("members.inviteMember")}
          tabIndex={0}
        />
        <DialogContent>
          <div className="flex flex-col gap-6">
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}

            <div className="flex flex-col gap-1.5" id="add-member-modal">
              <div>
                <label htmlFor="" className="text-gray-800">
                  {t("members.role")}
                  <span className="text-red-600">*</span>
                </label>
              </div>
              <DropdownField
                data={roles}
                name="roleId"
                displayKey={"name"}
                valueKey={"id"}
                value={role}
                setValue={setRole}
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button
              tabIndex={0}
              id="cancel-add-button"
              className="h-9 px-4"
              onClick={() => setOpen(false)}
              variant="primary-outlined"
              title={t("commonConstants.cancel")}
              buttonText={t("commonConstants.cancel")}
            />
            <Button
              tabIndex={0}
              id="invite-button"
              name="inviteMember"
              value={"invite"}
              className="h-9 px-4"
              isDisabled={
                transition.state === "submitting" ||
                email === loggedInUser ||
                !email
              }
              title={
                transition.state === "submitting"
                  ? t("commonConstants.inviting")
                  : t("commonConstants.invite")
              }
              buttonText={
                transition.state === "submitting"
                  ? t("commonConstants.inviting")
                  : t("commonConstants.invite")
              }
              variant="primary-solid"
              onClick={() => submitMemberForm()}
            />
          </div>
        </DialogFooter>
      </>
    </DialogWrapper>
  )
}
