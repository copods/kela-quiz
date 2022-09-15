import React, { useState } from 'react'
import { Form } from '@remix-run/react'
import Button from '~/components/form/Button'
import InputField from '~/components/form/InputField'
import Logo from '~/components/Logo'
import Checkbox from '../form/CheckBox'
import {
  candidateExamConstants,
  commonConstants,
} from '~/constants/common.constants'

function CandidateRegister() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const canSubmitBtnBeEnabled = () => {
    return firstName.length > 0 && lastName.length > 0
  }

  const checkBoxProps = {
    name: 'candidateAgreement',
    handleChange: function (event: any) {
      setIsChecked(!isChecked)
    },
    isChecked: isChecked,
  }
  const inputFieldsProps = [
    {
      label: 'First Name',
      placeholder: 'Enter first name',
      type: 'text',
      name: 'firstName',
      required: true,
      value: firstName,
      errorId: 'name-error',
      onChange: function (event: any) {
        setFirstName(event?.target.value)
      },
    },
    {
      label: 'Last Name',
      placeholder: 'Enter last name',
      type: 'text',
      name: 'lastName',
      required: true,
      value: lastName,
      errorId: 'name-error',
      onChange: function (event: any) {
        setLastName(event?.target.value)
      },
    },
  ]
  return (
    <div className="z-10 flex	min-h-480 w-full max-w-554 flex-col items-center justify-center rounded-2xl bg-white px-24 drop-shadow-xl">
      <div className="z-20 -mt-24 mb-6">
        <Logo height="64" width="64" />
      </div>
      <div className="w-full">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Welcome
        </h1>
        <div className="flex justify-center">
          <hr className="mt-7 mb-5 h-px w-6/12 border-none bg-gray-500 text-center" />
        </div>
        <Form method="post">
          <div className="flex flex-col gap-6">
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          <div className="mt-5 flex flex-row">
            <Checkbox {...checkBoxProps} />
            <span className="ml-2 text-xs text-slate-500">
              {candidateExamConstants.candidateAcceptance}
            </span>
          </div>
          <div className="mt-6">
            <Button
              title={commonConstants.continue}
              buttonText={commonConstants.continue}
              type="submit"
              className="w-full"
              isDisabled={!canSubmitBtnBeEnabled()}
              varient="primary-solid"
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CandidateRegister
