import type React from 'react'

export interface InputFieldProps {
  name: string
  label: string
  placeholder: string
  type: string
  required: boolean
  value: string
  error?: string
  errorId: string
  onChange: (e: React.ChangeEvent) => void
}

export interface ButtonProps {
  type: 'submit' | 'reset' | 'button'
  buttonText: string
  handleClick?: React.MouseEventHandler<HTMLButtonElement>
}

export interface LoginProps {
  actionData: ActionData
  redirectTo: string
}

export interface ActionData {
  errors?: {
    email?: string
    password?: string
  }
}

export interface CheckboxProps {
  handleChange: React.Dispatch<React.SetStateAction<boolean>>
  name?: string
  isChecked?: boolean
}
