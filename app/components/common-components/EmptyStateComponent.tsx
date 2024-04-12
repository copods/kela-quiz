import i18next from "i18next"

import noData from "../../../public/assets/noData.svg"

const EmptyStateComponent = ({ text }: { text?: string }) => {
  const t = i18next.t.bind(i18next)
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <img src={noData} alt={t("candidateExamConstants.alreadySubmitted")} />
      <span className="text-2xl font-bold">
        {text ?? (t("sectionsConstants.noDataToShow") as string)}
      </span>
    </div>
  )
}

export default EmptyStateComponent
