import { useEffect, useState } from "react"

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
import PasswordInputFields from "../common-components/PasswordInputField"

import {
  checkPasswordStrength,
  getPasswordStrengthColor,
  trimValue,
} from "~/utils"

const ResetPassword = ({
  openResetPassModel,
  setOpenResetPassModel,
}: {
  openResetPassModel: boolean
  setOpenResetPassModel: (e: boolean) => void
}) => {
  const { t } = useTranslation()
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.data && fetcher.data === "DONE") {
      setOpenResetPassModel(false) //reset password popUp will be closed automatically if action is success
      toast.success(t("settings.passResetSuccessfully"))
    }
  }, [fetcher.data, setOpenResetPassModel, t])
  const transition = useTransition()

  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState("")
  const [error, setError] = useState({
    passMinLengthError: "",
    passNotMatchError: "",
    passIsInvalid: fetcher.data?.errors?.valid,
    passShouldNotBeSame: fetcher.data?.errors?.passShouldNotBeSame,
  })
  const comparePasswords = (password: string, confirmPassword: string) => {
    if (password.length <= 0 || confirmPassword.length <= 0) {
      if (password.length !== 0 && password.length < 8) {
        setError({
          ...error,
          passMinLengthError: t("settings.minPasswordLimit"),
        })
        return
      } else {
        setError({ ...error, passMinLengthError: "" })
        return
      }
    }
    if (password === confirmPassword) {
      setError({ ...error, passNotMatchError: "" })
    } else if (password !== confirmPassword && password.length >= 8) {
      setError({
        ...error,
        passMinLengthError: "",
        passNotMatchError: t("settings.passNotMatch"),
      })
    } else {
      setError({
        ...error,
        passNotMatchError: t("settings.passNotMatch"),
      })
    }
  }

  const onSubmit = () => {
    fetcher.submit(
      {
        oldPassword: password,
        confirmPassword: confirmPassword,
        newPassword: newPassword,
      },
      {
        method: "post",
      }
    )
  }
  const passwordInputFieldProps = [
    // Input field props
    {
      label: t("settings.enterOldPassword"),
      placeholder: t("settings.enterOldPassword"),
      name: "oldPassword",
      required: true,
      isRequired: true,
      type: "password",
      value: password,
      error: error.passIsInvalid,
      errorId: "password-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(trimValue(event?.target.value))
      },
    },
    {
      label: t("settings.enterNewPass"),
      placeholder: t("settings.enterNewPass"),
      name: "newPassword",
      required: true,
      isRequired: true,
      type: "password",
      value: newPassword,
      error: error?.passMinLengthError || error?.passShouldNotBeSame,
      errorId: "new-password-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setNewPassword(trimValue(event?.target.value))
      },
    },
    {
      label: t("settings.reEnterPass"),
      placeholder: t("settings.reEnterPass"),
      name: "confirmNewPassword",
      required: true,
      isRequired: true,
      type: "password",
      value: confirmPassword,
      error: error?.passNotMatchError,
      errorId: "confirm-password-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(trimValue(event?.target.value))
      },
    },
  ]
  useEffect(() => {
    setPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setError({
      passShouldNotBeSame: "",
      passIsInvalid: "",
      passMinLengthError: "",
      passNotMatchError: "",
    })
  }, [openResetPassModel])

  useEffect(() => {
    if (fetcher?.data && fetcher?.data?.errors) {
      setError({
        ...error,
        passIsInvalid: fetcher?.data?.errors?.valid,
        passShouldNotBeSame: fetcher?.data?.errors?.passShouldNotBeSame,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data])

  useEffect(() => {
    const value = checkPasswordStrength(newPassword)
    setPasswordStrength(value as string)
  }, [newPassword])

  return (
    <DialogWrapper open={openResetPassModel} setOpen={setOpenResetPassModel}>
      <>
        <DialogHeader
          heading={t("settings.resetPas")}
          onClose={setOpenResetPassModel}
          role={t("settings.resetPas")}
          ariaLabel={t("settings.resetPas")}
          tabIndex={0}
        />
        <DialogContent>
          <div className="flex flex-col gap-2">
            <div className="input-container-wrapper flex flex-col gap-6">
              {passwordInputFieldProps.map((props) => {
                return (
                  <PasswordInputFields
                    onBlur={() =>
                      comparePasswords(newPassword, confirmPassword)
                    }
                    {...props}
                    key={props.name}
                  />
                )
              })}
            </div>
            {newPassword && (
              <span className="flex gap-1 text-sm">
                {t("commonConstants.passwordStrength")}:
                <span className={getPasswordStrengthColor(passwordStrength)}>
                  {passwordStrength}
                </span>
              </span>
            )}
          </div>
        </DialogContent>
        <DialogFooter>
          <div className="flex items-center justify-center">
            <Button
              tabIndex={0}
              name="resetPassword"
              value="resetPassword"
              title={
                transition.state === "submitting"
                  ? t("settings.passResetting")
                  : t("settings.resetPas")
              }
              buttonText={
                transition.state === "submitting"
                  ? t("settings.passResetting")
                  : t("settings.resetPas")
              }
              variant="primary-solid"
              className="h-11 w-full text-base"
              isDisabled={
                !(newPassword && confirmPassword && password) ||
                newPassword != confirmPassword ||
                newPassword.length < 8
              }
              onClick={onSubmit}
              datacy="submit"
            />
          </div>
        </DialogFooter>
      </>
    </DialogWrapper>
  )
}
export default ResetPassword
