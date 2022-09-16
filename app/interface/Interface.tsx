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
  name?: string
  id?: string
  className?: string
  title?: string
  value?: string | number
  tabIndex?: number
  datacy?: string
  alignment?: string
  type?: 'button' | 'submit' | 'reset'
  varient: 'primary-solid' | 'primary-outlined' | 'secondary-solid'
  buttonText: string | JSX.Element
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isDisabled?: boolean
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
  [x: string]: any
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  name?: string
  isChecked?: boolean
  value?: string
  className?: string
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
  deleted: boolean
  deletedAt: string
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
  correctAnswer?: Array<CorrectAnswer>
  marks?: number
  questionTypeId?: string
  sectionId?: string
  createdById?: string
  createdAt?: Date
  updatedAt?: Date
  options?: Array<Option>
  correctOptions?: Array<Option>
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
  deleted: boolean
  deletedAt: string
  candidateTest?: Array<CandidateTest>
}

export interface SectionInTest {
  id?: string
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
  option: string
  coInQuestionId?: string
  createdById?: string
  questionId?: string
  order: number
  updatedAt?: Date
  createdAt?: Date
  candidateQuestionId?: string
}
export interface CorrectAnswer {
  id: string
  answer: string
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
  id: string
  testId: string
  link: string | null
  sections: Array<SectionInCandidateTest>
  test: Test
  candidateId: string
  candidateStep: JSON
  startedAt: Date | null
  endAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface SectionInCandidateTest {
  id: string
  sectionId: string
  section: Section
  candidateTestId: string
  order: number
  questions: Array<CandidateQuestion>
  startedAt: Date | null
  endAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Candidate {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  isQualified: boolean | null
  createdById: string
  createdAt: Date
  updatedAt: Date
}

export interface CandidateQuestion {
  id: string
  questionId: string
  status: string
  answers: string[]
  order: number
  sectionInCandidateTestId: string
  answeredAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface CandidateResult {
  id: string
  candidateId: string
  candidateTestId: string
  totalQuestion: number
  endAt: Date
  correctQuestion: number
  unanswered: number
  testId: string
  isQualified: boolean
  createdAt: Date
  updatedAt: Date
}

export enum sortByOrder {
  ascending = 'asc',
  name = 'name',
  desc = 'desc',
  saveAndExit = 'Save & Exit',
  saveAndAddMore = 'Save & Add More',
  saving = 'Saving...',
  cancelling = 'Cancelling...',
  cancel = 'Cancel',
  createdAt = 'createdAt',
  creatingTest = 'Creating Test',
  submit = 'Submit',
}

export enum QuestionTypes {
  multipleChoice = 'MULTIPLE_CHOICE',
  singleChoice = 'SINGLE_CHOICE',
  text = 'TEXT',
}

export interface SectionWiseResults {
  id: string
  sectionInCandidateTestId: string
  totalQuestion: number
  correctQuestion: number
  unanswered: number
  testId: string
  candidateTestId: string
  createdAt: Date
  updatedAt: Date
  section: SectionInCandidateTest
  test: Test
}
