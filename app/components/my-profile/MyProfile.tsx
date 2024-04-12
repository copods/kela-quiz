import { useEffect, useState } from "react"

import {
  useActionData,
  useLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react"
import i18next from "i18next"
import { toast } from "react-toastify"

import Button from "../common-components/Button"
import InputField from "../common-components/InputField"
import Header from "../header/Header"

import { trimValue } from "~/utils"

const MyProfileComponent = () => {
  const userData = useLoaderData()
  const userActionData = useActionData()
  const transition = useTransition()
  const submit = useSubmit()
  const t = i18next.t.bind(i18next)

  const [viewMode, setViewMode] = useState(true)
  const [firstName, setFirstName] = useState(userData.firstName)
  const [lastName, setLastName] = useState(userData.lastName)

  const submitUserDetails = () => {
    submit(
      {
        id: userData.id,
        firstName: firstName,
        lastName: lastName,
      },
      { method: "post" }
    )
  }

  const inputFieldsProps = [
    {
      label: "First Name",
      placeholder: "Enter First Name",
      type: "text",
      name: "first-name",
      required: true,
      value: firstName,
      errorId: "first-name-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(trimValue(event.target.value))
      },
    },
    {
      label: "Last Name",
      placeholder: "Enter Last Name",
      type: "text",
      name: "last-name",
      required: true,
      value: lastName,
      errorId: "last-name-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(trimValue(event.target.value))
      },
    },
  ]

  const onCancel = () => {
    setViewMode(true)
    setFirstName(userData.firstName)
    setLastName(userData.lastName)
  }

  const SaveAndCancelButton = () => {
    return (
      <div className="flex gap-5">
        <Button
          className="px-5"
          onClick={() => onCancel()}
          id="cancel-button"
          tabIndex={0}
          variant="primary-outlined"
          title={t("commonConstants.cancel")}
          aria-label={t("commonConstants.cancel")}
          buttonText={t("commonConstants.cancel")}
        />
        <Button
          className="px-5"
          onClick={() => submitUserDetails()}
          id="save"
          tabIndex={0}
          variant="primary-solid"
          title={t("commonConstants.save")}
          aria-label={t("commonConstants.save")}
          buttonText={
            transition.state === "submitting"
              ? t("commonConstants.saving")
              : t("commonConstants.save")
          }
          isDisabled={firstName === "" || lastName === ""}
        />
      </div>
    )
  }
  const EditButton = () => {
    return (
      <Button
        className="px-5"
        onClick={() => setViewMode(false)}
        id="edit-user"
        tabIndex={0}
        variant="primary-solid"
        title={t("commonConstants.edit")}
        aria-label={t("commonConstants.edit")}
        buttonText={t("commonConstants.edit")}
      />
    )
  }

  useEffect(() => {
    if (userActionData?.resp?.status === 200) {
      setViewMode(true)
      toast.success(t(userActionData?.resp?.title) as string)
    } else if (userActionData?.errors?.status === 400) {
      setViewMode(false)
      toast.error(t(userActionData?.errors?.title) as string, {
        toastId: userActionData?.errors?.title,
      })
    }
  }, [userActionData])

  return (
    <div className="flex flex-col gap-7">
      <Header
        id="my-profile-page-title"
        heading={t("commonConstants.myProfile")}
        rightChildren={viewMode ? <EditButton /> : <SaveAndCancelButton />}
      />
      <div className="flex gap-6 rounded-lg border border-solid border-gray-300 bg-white p-5">
        {inputFieldsProps.map((props) => {
          return (
            <div
              className="flex w-6/12 flex-col gap-1.5"
              data-cy="userProfileDetails"
              key={props.name}
            >
              <span className="text-sm text-gray-800">
                {props.label}
                {!viewMode && <span className="text-red-600">*</span>}
              </span>
              {viewMode ? (
                <>
                  <p className="text-base-500 font-medium text-gray-900">
                    {props.value}
                  </p>
                </>
              ) : (
                <InputField {...props} label={""} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyProfileComponent
