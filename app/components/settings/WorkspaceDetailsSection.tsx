import { useTranslation } from "react-i18next"

import InputField from "../common-components/InputField"

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
            onChange={(e) => setInputValue(e.target.value)}
            required={false}
            errorId={"workspace-input-error"}
            error={isError ? "statusCheck.workspaceNameIsReq" : ""}
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
