import type { Role } from '~/interface/Interface'
import { useSubmit, useTransition } from '@remix-run/react'
import { useState, useEffect } from 'react'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import DropdownField from '../form/Dropdown'
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

  const submitMemberForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      roleId: role,
      addMember: JSON.stringify({
        action: 'add',
      }),
    }
    submit(data, {
      method: 'post',
    })
  }

  useEffect(() => {
    setFirstName('')
    setLastName('')
    setRole(roles[0].id)
  }, [open, roles])

  const dialogWrapperProps = [
    // dialog wrapper props
    {
      id: 'add-pop-up-model',
      role: t('members.addMember'),
      ariaLabel: t('members.addMember'),
      tabIndex: 0,
    },
  ]
  return (
    <div>
      {dialogWrapperProps.map((props) => {
        return (
          <DialogWrapper
            open={open}
            heading={t('members.addMember')}
            setOpen={setOpen}
            addDialog={true}
            {...props}
            key={props.id}
          >
            <div>
              <div className="flex justify-between gap-4 pb-6">
                <div>
                  <label htmlFor="" className="text-gray-800">
                    {t('members.firstName')}
                  </label>
                  <input
                    tabIndex={0}
                    id="firstName"
                    type="text"
                    name="firstName"
                    className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder={t('members.firstName')}
                    onChange={(e) => setFirstName(trimValue(e.target.value))}
                    value={firstName}
                    maxLength={40}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-gray-800">
                    {t('members.lastName')}
                  </label>
                  <input
                    tabIndex={0}
                    id="lastName"
                    type="text"
                    name="lastName"
                    className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder={t('members.lastName')}
                    onChange={(e) => setLastName(trimValue(e.target.value))}
                    value={lastName}
                    maxLength={40}
                  />
                </div>
              </div>
              <div className="pb-6 ">
                <label htmlFor="" className="text-gray-800">
                  {t('commonConstants.email')}
                </label>
                <input
                  tabIndex={0}
                  id="email"
                  type="text"
                  name="email"
                  className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                  placeholder={t('commonConstants.email')}
                  onChange={(e) => setEmail(trimValue(e.target.value))}
                />
              </div>
              <div className="pb-6">
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
          </DialogWrapper>
        )
      })}
    </div>
  )
}
