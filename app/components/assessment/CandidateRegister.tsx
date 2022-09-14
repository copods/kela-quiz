import React, { useState } from 'react'
import { Form } from '@remix-run/react'
import Button from '~/components/form/Button'
import InputField from '~/components/form/InputField'
import { commonConstants } from '~/constants/common.constants'

function CandidateRegister() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const canSubmitBtnBeEnabled = () => {
    return firstName.length > 0 && lastName.length > 0
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
    <div className="z-10 flex	 w-full max-w-454 flex-col  gap-12 rounded-lg bg-white p-12 drop-shadow-xl">
      {/* <div className="z-20 -mt-24 mb-6">
        <Logo height="64" width="64" />
      </div> */}
      <h1 className="text-center text-3xl font-bold text-gray-900">Welcome</h1>
      <div className="flex justify-center">
        {/* <hr className="mt-7 mb-5 h-px w-6/12 border-none bg-gray-500 text-center" /> */}
        <Form method="post" className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-10">
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          {/* <div className="mt-5 flex flex-row">
            <Checkbox {...checkBoxProps} />
            <span className="ml-2 text-xs text-slate-500">
              {candidateExamConstants.candidateAcceptance}
            </span>
          </div> */}
          <Button
            title={commonConstants.proceed}
            buttonText={commonConstants.proceed}
            type="submit"
            className="h-12 w-full text-base"
            isDisabled={!canSubmitBtnBeEnabled()}
            varient="primary-solid"
          />
        </Form>
      </div>
    </div>
  )
}

export default CandidateRegister
