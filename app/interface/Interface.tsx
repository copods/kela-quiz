import type React from "react"

export interface InputFieldProps {
  name: string
  label?: string
  placeholder?: string
  type?: string
  isRequired?: boolean
  required: boolean
  value: string
  error?: string
  errorId: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  helperText?: React.ReactNode
  maxLength?: number
}

export interface PasswordFieldProps {
  name: string
  label: string
  placeholder: string
  required: boolean
  isRequired: boolean
  value: string
  type: string
  error?: string
  errorId: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export interface DialogWrapperProps {
  heading?: string
  role?: string
  ariaLabel?: string
  children: JSX.Element
  open: boolean
  setOpen: (e: boolean) => void
  header: boolean
  tabIndex?: number
}

export interface DialogNewWrapperProps {
  open: boolean
  setOpen: (e: boolean) => void
  children: JSX.Element
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
  type?: "button" | "submit" | "reset"
  variant: "primary-solid" | "primary-outlined" | "secondary-solid"
  buttonText: string | JSX.Element
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isDisabled?: boolean
  btnRef?: React.RefObject<HTMLButtonElement> | null
  padding?: string
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
  target?: string
}
export interface Section {
  id: string
  name: string
  questions: Array<Question>
  description: string
  createdBy: User
  createdById: string
  createdAt: Date
  sectionInTest: SectionInTest[]
  updatedAt: Date
  deleted: boolean
  deletedAt: string
  workspaceId: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  roleId: string
  createdAt: Date
  updatedAt: Date
  workspace?: Array<Workspace>
}
export interface Invites {
  id: string
  email: string
  invitedById: User
  userId: string
  invitedForWorkspace: Workspace
  workspaceId: string
  role: Role
  roleId: String
  invitedOn: Date
  joined: Boolean
  joinedAt: string
  deleted: boolean
  deletedAt: string
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
  checkOrder: boolean
  id: string
  question: string
  correctAnswer: Array<CorrectAnswer>
  marks?: number
  questionTypeId: string
  questionType: QuestionType
  sectionId?: string
  createdById?: string
  createdBy: User
  createdAt?: Date
  updatedAt?: Date
  deleted: boolean
  deletedAt: string
  options?: Array<Option>
  correctOptions: Array<Option>
  candidateQuestion: CandidateQuestion[]
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
  workspaceId: string
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
  selectedOptions: Option[]
  answers: CorrectAnswer[]
  status: string
  SectionWiseResult: SectionWiseResults[]
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
  question: Question
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
  startedAt: Date
  updatedAt: Date
  workspaceId?: string
  link?: string
}

export enum sortByOrder {
  ascending = "asc",
  name = "name",
  desc = "desc",
  saveAndExit = "Save & Exit",
  saveAndAddMore = "Save & Add More",
  saving = "Saving...",
  cancelling = "Cancelling...",
  cancel = "Cancel",
  createdAt = "createdAt",
  creatingAssessment = "Creating Assessment",
  submit = "Submit",
}

export enum QuestionTypes {
  multipleChoice = "MULTIPLE_CHOICE",
  singleChoice = "SINGLE_CHOICE",
  text = "TEXT",
}
export enum QuestionStatus {
  answered = "ANSWERED",
  skipped = "SKIPPED",
}
export enum deleteQuestionStatus {
  notDeleted = "NOT_DELETED",
  deleted = "DELETED",
}
export enum keyboardKeys {
  backspace = "Backspace",
  arrowLeft = "ArrowLeft",
  arrowRight = "ArrowRight",
}
export enum checks {
  success = "success",
  commonError = "commonError",
}
export interface SectionWiseResults {
  id: string
  sectionInCandidateTestId: string
  totalQuestion: number
  correctQuestion: number
  unanswered: number
  skipped: number
  incorrect: number
  testId: string
  candidateTestId: string
  createdAt: Date
  updatedAt: Date
  section: SectionInCandidateTest
  test: Test
}
export interface tableColumnType {
  title: string
  field: string
  render?: (data: any, index: number) => JSX.Element
  width?: string
}
export interface TableType<T extends object> {
  columns: tableColumnType[]
  data: T[]
  title?: string
  paginationEnabled?: boolean
  onPageChange?: (e: number) => void
  totalItems?: number
  currentPage?: number
  pageSizeOptions?: Array<number>
  pageSize?: number
  setPageSize?: (e: number) => void
}
export interface Workspace {
  id: string
  name: string
  createdBy: User
  createdById: string
  createdAt: Date
  updatedAt: Date
}
export interface UserWorkspace {
  id: String
  workspace: Array<Workspace>
  workspaceId: string
  userId: string
  role: Role
  roleId: string
  isDefault: Boolean
  createdAt: Date
  updatedAt: Date
}
export interface TabsComponent {
  name: string
  route: string
}

export interface OtherFilters {
  id: string
  data: Array<{ name: string; value: string }>
  displayKey: string
  valueKey: string
  value: string
  setValue: (e: string) => void
}

export interface BadgeComponent {
  children: React.ReactNode
  bgColor?: string
  textColor?: string
}

export interface AddedSectionDetails {
  isSelected: boolean | undefined
  totalQuestions: number
  time: number
  target: string
}
export interface ChipComponent {
  success: string
  error: string
  warning: string
}

export interface HeaderProps {
  id: string
  heading: string
  size?: string
  rightChildren?: React.ReactNode
}

export interface SettingWorkspace {
  id: string
  workspace: { name: string }
  workspaceId: string
}
