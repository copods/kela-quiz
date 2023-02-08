import { useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import logo from "~/../public/assets/logo.svg"
import type { SectionInCandidateTest } from "~/interface/Interface"
import TimerComponent from "./Timer"

const CandidateQuestionHeader = () => {
  const { candidateTests, section } = useLoaderData()
  const { t } = useTranslation()

  let candidateSection: SectionInCandidateTest | null = null
  for (let sec of candidateTests?.sections) {
    if (section?.section?.id === sec?.section?.id) {
      candidateSection = sec
      break
    }
  }

  return (
    <div className="mr-auto flex min-h-16 w-full items-center justify-between border px-5">
      <div className="flex w-64 items-center gap-4">
        <img className="h-8 w-8" src={logo} alt={t("commonConstants.logo")} />
        <span className="text-2xl font-bold">
          {t("sideNav.sideNavHeading")}
        </span>
      </div>
      <div
        className="w-min-64  flex self-center text-center text-xl font-bold"
        data-cy="testSectionHeading"
      >
        Section {section.order} - {candidateTests.sections.length}:{" "}
        {candidateTests.test.name}
      </div>
      <div className="flex w-64 items-center justify-end">
        <TimerComponent
          candidateSection={candidateSection as SectionInCandidateTest}
          section={section}
        />
      </div>
    </div>
  )
}

export default CandidateQuestionHeader
