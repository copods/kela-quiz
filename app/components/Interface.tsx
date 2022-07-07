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
export interface QuestionType {
  id: string
  value?: string
  displayName: string
  createdAt?: Date
}

export interface Section {
  id: string
  name: string
  description?: string
  createdById?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Question {
  id: string
  question: string
  marks?: number
  questionTypeId: string
  sectionId: string
  createdById?: string
  createdAt?: Date
  updatedAt?: Date
}