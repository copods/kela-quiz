import { t } from "i18next"

import negativeFeedbackIcon from "../../../public/assets/negativeFeedback.svg"
import neutralFeedbackIcon from "../../../public/assets/neutralFeedback.svg"
import positiveFeedbackIcon from "../../../public/assets/positiveFeedback.svg"
import totalFeedbackIcon from "../../../public/assets/totalFeedback.svg"
import Header from "../header/Header"

import { FeedbackCard } from "./FeedbackCard"
import { FeedbackTableHeader } from "./FeedbackTableHeader"

export const FeedbackContainer = () => {
  const feedBackCardDetails = [
    {
      id: "totalFeedback",
      title: t("feedback.totalFeedback"),
      value: 2109,
      icon: totalFeedbackIcon,
    },
    {
      id: "positiveFeedback",
      title: t("feedback.positiveFeedback"),
      value: 1754,
      icon: positiveFeedbackIcon,
    },
    {
      id: "negativeFeedback",
      title: t("feedback.negativeFeedback"),
      value: 98,
      icon: negativeFeedbackIcon,
    },
    {
      id: "neutralFeedback",
      title: t("feedback.neutralFeedback"),
      value: 256,
      icon: neutralFeedbackIcon,
    },
  ]

  return (
    <div className="flex flex-col gap-10">
      <Header heading={t("commonConstants.feedback")} id="feedback" />
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full gap-5">
          {feedBackCardDetails.map((cardData, index) => (
            <FeedbackCard
              key={index}
              id={cardData.id}
              title={cardData.title}
              value={cardData.value}
              icon={cardData.icon}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <FeedbackTableHeader />
        </div>
      </div>
    </div>
  )
}
