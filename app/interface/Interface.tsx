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

export interface TestSection {
  id: string
  name: string
  description: string
  createdById: string
  createdAt: Date
  updatedAt: Date
  _count?: { questions: number }
  createdBy?: User
  isSelected?: boolean
  totalQuestions?: number
  time?: number
  order?: number
  timeInSeconds?: number
  section?: Section
}

export interface Section {
  id: string
  name: string
  description: string
  createdById: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  roleId: string
  createdAt: Date
  updatedAt: Date
}

export interface Role {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  question: string
  correctAnswer?: string[]
  marks?: number
  questionTypeId?: string
  sectionId?: string
  createdById?: string
  createdAt?: Date
  updatedAt?: Date
  options?: Array<Option>
  correctOptions?: Array<CorrectOptions>
}

export interface Test {
  id: string
  name: string
  description: string
  createdBy?: User
  createdById: string
  createdAt: Date
  updatedAt: Date
  sections: Array<SectionInTest>
  candidateTest?: Array<Option>
}

export interface SectionInTest {
  section: Section
  order: number
  timeInSeconds: number
  totalQuestions: number
  createdAt: Date
  updatedAt: Date
  test: Test
}

export interface Option {
  id: string
  option: String
  coInQuestionId?: string
  createdById?: string
  questionId?: string
  order: number
  updatedAt?: Date
  createdAt?: Date
  candidateQuestionId?: string
}
export interface CorrectOptions {
  id: string
  option: String
  coInQuestionId?: string
  createdById?: string
  questionId?: string
  order: number
  updatedAt?: Date
  createdAt?: Date
  candidateQuestionId?: string
}
export interface CorrectAnswer {
  id: String
  answer: String
  order: number
  question?: string
  questionId?: string
  createdAt: Date
  updatedAt: Date
}
export interface QuestionType {
  id: string
  value: string
  displayName: string
  questions?: Question[]
  createdAt?: Date
  updatedAt?: Date
}
export interface CandidateTest {
  id?: string
  sections: Array<SectionInTest>
  test: Test
  testId?: String
  link: String
  candidateId?: String
  startedAt?: Date
  endAt?: Date
  createdAt?: Date
  updatedAt?: Date
}
