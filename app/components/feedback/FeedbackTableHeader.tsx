import { useState } from "react"

import { Icon } from "@iconify/react"
import { t } from "i18next"

import downloadExcelIcon from "../../../public/assets/downloadExcel.svg"
import { NewDropdownField } from "../common-components/Dropdown"

export const FeedbackTableHeader = () => {
  const [testFilter, setTestFilter] = useState("All Tests")
  const [feedbackFilter, setFeedbackFilter] = useState("All Feedbacks")
  return (
    <div className="flex h-9">
      <div className="flex items-center gap-4">
        <span className="text-xl">{t("feedback.allFeedbacks")}</span>
        <span className="h-4 w-[1px] border-r-[1px] border-gray-300"></span>
        <span className="text-xs text-gray-500">
          {t("commonConstants.filters")}
        </span>
        <div className="w-52">
          <NewDropdownField
            dropdownOptions={["All Tests", 2, 3, 4]}
            value={testFilter}
            setValue={setTestFilter}
            height="sm"
          />
        </div>
        <div className="w-52">
          <NewDropdownField
            dropdownOptions={[
              "All Feedbacks",
              "Positive",
              "Negative",
              "Neutral",
            ]}
            value={feedbackFilter}
            setValue={setFeedbackFilter}
            height="sm"
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
