import { Icon } from "@iconify/react"
import { t } from "i18next"

import downloadExcelIcon from "../../../public/assets/downloadExcel.svg"
import { NewDropdownField } from "../common-components/Dropdown"

export const FeedbackTableHeader = ({
  feedbackTypeFilter,
  setFeedbackTypeFilter,
  testFilter,
  setTestFilter,
  totalTests,
  sortFilter,
  setSortFilter,
}: {
  feedbackTypeFilter: string
  setFeedbackTypeFilter: (e: string) => void
  testFilter: string
  setTestFilter: (e: string) => void
  totalTests: Array<{ id: string; name: string }>
  sortFilter: string
  setSortFilter: (e: string) => void
}) => {
  const feedbackTypeOptions = [
    { name: "All Feedbacks", value: "all_feedbacks" },
    { name: "Positive", value: "positive" },
    { name: "Negative", value: "negative" },
    { name: "Neutral", value: "neutral" },
  ]
  return (
    <div className="flex h-9">
      <div className="flex items-center gap-4">
        <span className="text-xl">{t("commonConstants.feedback")}</span>
        <span className="h-4 w-[1px] border-r-[1px] border-gray-300"></span>
        <span className="text-xs text-gray-500">
          {t("commonConstants.filters")}
        </span>
        <div className="w-52">
          <NewDropdownField
            dropdownOptions={totalTests}
            value={testFilter}
            setValue={setTestFilter}
            height="sm"
            labelKey="name"
            valueKey="id"
            isSearchable={true}
          />
        </div>
        <div className="w-52">
          <NewDropdownField
            dropdownOptions={feedbackTypeOptions}
            value={feedbackTypeFilter}
            setValue={setFeedbackTypeFilter}
            height="sm"
            labelKey="name"
            valueKey="value"
            isSearchable={false}
          />
        </div>
        <span className="h-4 w-[1px] border-r-[1px] border-gray-300"></span>
        <span className="text-xs text-gray-500">
          {t("commonConstants.sortBy")}
        </span>
        <div className="w-52">
          <NewDropdownField
            dropdownOptions={["Newer", "Older"]}
            value={sortFilter}
            setValue={setSortFilter}
            height="sm"
            isSearchable={false}
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <img src={downloadExcelIcon} alt="download icon" />
        <Icon icon="ic:round-keyboard-arrow-down" id="icon" />
      </div>
    </div>
  )
}
