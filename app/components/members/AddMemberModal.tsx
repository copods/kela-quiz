import type { Role } from '~/interface/Interface'
import { useSubmit, useTransition } from '@remix-run/react'
import { useState, useEffect } from 'react'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import DropdownField from '../form/Dropdown'
import InputField from '~/components/form/InputField'
import { useTranslation } from 'react-i18next'
import DialogWrapper from '../Dialog'

export default function AddMemberModal({
  roles,
  open,
  setOpen,
}: {
  roles: Role[]
  open: boolean
  setOpen: (e: boolean) => void
}) {
  const { t } = useTranslation()

  const transition = useTransition()
  const submit = useSubmit()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(roles[0].id)
  const [workspace, setWorkspace] = useState('')

  const submitMemberForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      roleId: role,
      workspace: workspace,
      action: 'add',
    }
    submit(data, {
      method: 'post',
    })
  }

  useEffect(() => {
    setFirstName('')
    setLastName('')
  }, [open])

  const inputFieldsProps = [
    {
      label: t('members.firstName'),
      placeholder: t('members.firstName'),
      type: 'text',
      name: 'firstName',
      required: true,
      value: firstName,
      errorId: 'firstName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(trimValue(event.target.value))
      },
    },
    {
      label: t('members.lastName'),
      placeholder: t('members.lastName'),
      type: 'text',
      name: 'lastName',
      required: true,
      value: lastName,
      errorId: 'lastName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(trimValue(event.target.value))
      },
    },
    {
      label: t('commonConstants.email'),
      placeholder: t('commonConstants.email'),
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(trimValue(event.target.value))
      },
    },
    {
      label: t('commonConstants.defaultWorkspaceName'),
      placeholder: t('commonConstants.defaultWorkspaceName'),
      type: 'text',
      name: 'workspace',
      required: true,
      value: workspace,
      errorId: 'workspace-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setWorkspace(trimValue(event.target.value))
      },
    },
  ]
  return (
    <DialogWrapper
      open={open}
      heading={t('members.inviteMember')}
      setOpen={setOpen}
      header={true}
      role={t('members.inviteMember')}
      ariaLabel={t('members.inviteMember')}
      tabIndex={0}
    >
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            {inputFieldsProps.slice(0, 2).map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          <div className="flex flex-col gap-6">
            {inputFieldsProps.slice(2).map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          <div className="flex flex-col gap-1.5" id="add-member-modal">
            <div>
              <label htmlFor="" className="text-gray-800">
                {t('members.role')}
              </label>
            </div>
            <DropdownField
              data={roles}
              name="roleId"
              displayKey={'name'}
              valueKey={'id'}
              value={role}
              setValue={setRole}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              tabIndex={0}
              id="cancel-add-button"
              className="h-9 px-4"
              onClick={() => setOpen(false)}
              varient="primary-outlined"
              title={t('commonConstants.cancel')}
              buttonText={t('commonConstants.cancel')}
            />
            <Button
              tabIndex={0}
              id="add-button"
              name="addMember"
              value={'add'}
              className="h-9 px-4"
              isDisabled={transition.state === 'submitting'}
              title={
                transition.state === 'submitting'
                  ? t('commonConstants.adding')
                  : t('commonConstants.add')
              }
              buttonText={
                transition.state === 'submitting'
                  ? t('commonConstants.adding')
                  : t('commonConstants.add')
              }
              varient="primary-solid"
              onClick={() => submitMemberForm()}
            />
          </div>
        </div>
      </div>
    </DialogWrapper>
  )
}
