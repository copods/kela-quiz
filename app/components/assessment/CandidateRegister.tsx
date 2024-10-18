import React, { useState } from "react"

import { Form, useLoaderData, useNavigation } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Button from "~/components/common-components/Button"
import InputField from "~/components/common-components/InputField"

function CandidateRegister() {
  const { t } = useTranslation()
  const loaderData = useLoaderData()

  const [firstName, setFirstName] = useState(
    loaderData.candidateDetails.firstName
      ? loaderData.candidateDetails.firstName
      : ""
  )
  const [lastName, setLastName] = useState(
    loaderData.candidateDetails.lastName
      ? loaderData.candidateDetails.lastName
      : ""
  )

  const navigation = useNavigation()
  const busy = navigation.state === "submitting"

  const canSubmitBtnBeEnabled = () => {
    return firstName.length > 0 && lastName.length > 0
  }

  const inputFieldsProps = [
    {
      label: "First Name",
      placeholder: "Enter first name",
      type: "text",
      name: "firstName",
      required: true,
      value: firstName,
      errorId: "name-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event?.target.value)
      },
    },
    {
      label: "Last Name",
      placeholder: "Enter last name",
      type: "text",
      name: "lastName",
      required: true,
      value: lastName,
      errorId: "name-error",
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event?.target.value)
      },
    },
  ]
  return (
    <div className="z-10 flex	w-full max-w-454 flex-col gap-12 rounded-lg bg-white p-12 drop-shadow-xl">
      <h1 className="text-center text-3xl font-bold text-gray-900">Welcome</h1>
      <div className="flex justify-center">
        <Form method="post" className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-10">
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          <Button
            title={t("commonConstants.submit")}
            buttonText={busy ? "Processing..." : t("commonConstants.submit")}
            type="submit"
            className="h-12 w-full text-base"
            isDisabled={!canSubmitBtnBeEnabled() || busy}
            variant="primary-solid"
            data-cy="submitButton"
          />
        </Form>
      </div>
    </div>
  )
}

export default CandidateRegister
