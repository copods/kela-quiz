import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"

import InputField from "../common-components/InputField"

const MaxLength = ({
  inputValue,
  t,
}: {
  inputValue: string
  t: TFunction<"translation", undefined>
}) => {
  return (
    <span
      className={`ml-auto text-xs font-normal leading-4 ${
        inputValue.length === 32 ? "text-red-500" : "text-gray-600"
      }`}
    >{`${32 - inputValue.length} character`}</span>
  )
}

export const WorkspaceDetailsSection = ({
  isEdit,
  isError,
  inputValue,
  setInputValue,
}: {
  isEdit: boolean
  isError: boolean
  inputValue: string
  setInputValue: (val: string) => void
}) => {
  const { t } = useTranslation()
  const workspaceNameRegex = /^[a-zA-Z0-9\s]+$/ // Checks that there are no special characters

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-gray-300 bg-white p-6">
      <span className="text-sm font-normal leading-6 text-gray-800">
        {t("sideNav.workspace")}
      </span>
      {isEdit ? (
        <div className="w-[498px]">
          <InputField
            name={"workspace-name-input"}
            value={inputValue}
            onChange={(e) =>
              (workspaceNameRegex.test(e.target.value) ||
                e.target.value === "") &&
              setInputValue(e.target.value)
            }
            required={false}
            errorId={"workspace-input-error"}
            error={isError ? "commonConstants.workspaceNameIsRequired" : ""}
            helperText={<MaxLength t={t} inputValue={inputValue} />}
            maxLength={32}
          />
        </div>
      ) : (
        <span
          id="current-workspace"
          className="text-base font-medium leading-6 text-gray-900"
        >
          {inputValue}
        </span>
      )}
    </div>
  )
}
