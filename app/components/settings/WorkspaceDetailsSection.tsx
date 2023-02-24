import { useTranslation } from "react-i18next"

export const WorkspaceDetailsSection = ({
  isEdit,
  inputValue,
  setInputValue,
}: {
  isEdit: boolean
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
        <input
          value={inputValue}
          className="w-[498px] rounded-lg border border-gray-300 py-3.5 px-2.5 text-base font-normal leading-6"
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span className="text-base font-medium leading-6 text-gray-900 ">
          {inputValue}
        </span>
      )}
    </div>
  )
}
