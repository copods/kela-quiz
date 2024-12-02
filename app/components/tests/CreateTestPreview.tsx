import { useState } from "react"

import { Icon } from "@iconify/react"
import { useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import InviteCandidatePopup from "./InviteCandidatePopup"

import type { TestSection } from "~/interface/Interface"

const TestPreview = ({
  name,
  testId,
  description,
  onChangeSelectedSectionsOrder,
  selectedSections,
  isPreviewEditable = true,
  showInviteAction,
}: {
  name: string
  testId?: string
  description: string
  selectedSections: Array<TestSection>
  onChangeSelectedSectionsOrder?: (e: TestSection[]) => void
  isPreviewEditable: boolean
  showInviteAction?: boolean
}) => {
  const { t } = useTranslation()
  const loaderData = useLoaderData()
  const changeSelectedSectionsOrder = (index: number, action: string) => {
    if (
      (index === 0 && action === "up") ||
      (index === selectedSections.length - 1 && action === "down")
    )
      return
    else {
      let temp = selectedSections[index]
      selectedSections[index] =
        selectedSections[action === "up" ? index - 1 : index + 1]
      selectedSections[action === "up" ? index - 1 : index + 1] = temp
      onChangeSelectedSectionsOrder &&
        onChangeSelectedSectionsOrder([...selectedSections])
    }
  }

  const getTotalTime = () => {
    let time = 0

    selectedSections.forEach(
      (section) =>
        (time += (section?.time ? section.time : section.timeInSeconds) || 0)
    )
    return isPreviewEditable ? time : time / 60
  }
  const [candidatePopupOpen, setCandidatePopupOpen] = useState<boolean>(false)
  return (
    <div className="flex flex-1 flex-col gap-9 overflow-scroll rounded-lg bg-white p-6 shadow-base">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1
            id="test-preview-assessment-details"
            className="text-xl font-semibold"
          >
            {t("testsConstants.testDetailsText")}
          </h1>
          {showInviteAction && loaderData.permission.invite_candidate.create && (
            <div>
              <div
                role={"button"}
                tabIndex={0}
                onClick={() => {
                  setCandidatePopupOpen(true)
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") setCandidatePopupOpen(true)
                }}
                className="flex gap-2"
              >
                <Icon
                  id="invite-popup-open"
                  className="h-6 w-6 cursor-pointer text-primary "
                  icon={"ant-design:user-add-outlined"}
                  aria-label={t("members.inviteMember")}
                />
                <span id="invite-popup-open-text" className="text-primary">
                  {t("inviteMemeberPopUpConstants.inviteCandidate")}
                </span>
              </div>
              <InviteCandidatePopup
                openInvitePopup={candidatePopupOpen}
                setOpenInvitePopup={setCandidatePopupOpen}
                testName={name}
                testId={testId}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 text-base">
          <div className="flex">
            <div
              id="name"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t("commonConstants.name")}
            </div>
            <div className="flex-1 text-base text-gray-700">{name}</div>
          </div>
          <div className="flex">
            <div
              id="description"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t("testsConstants.descriptionText")}
            </div>
            <div
              className="ql-editor flex-1 p-0 text-base text-gray-700"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>{" "}
          </div>
          <div className="flex">
            <div
              id="totalTime"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t("testsConstants.totalTimeText")}
            </div>
            <div className="flex-1 text-base text-gray-700">
              {getTotalTime()} {t("testsConstants.min")}
            </div>
          </div>
          <div className="flex">
            <div
              id="totalSection"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t("testsConstants.totalTests")}
            </div>
            <div className="flex-1 text-base text-gray-700">
              {selectedSections.length}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 id="test-preview-selected-tests" className="text-xl font-semibold">
          {t("testsConstants.selectedTests")}
        </h1>
        <div className="flex flex-col gap-4 text-base">
          {selectedSections.map((section, index) => {
            return (
              <div className="flex items-center gap-4" key={section.id}>
                <div className="min-w-184 text-base text-gray-500">
                  {t("testsConstants.testText")} {index + 1}
                </div>
                <div className="flex max-w-2xl flex-1 items-center justify-between gap-6 rounded-lg border border-gray-300 py-3 px-4 text-gray-700">
                  <div className="text-base font-semibold text-gray-700">
                    {section.name ? section.name : section.section?.name}
                  </div>
                  <div className="flex gap-5 text-sm text-gray-700">
                    <span>
                      {section.totalQuestions ? section.totalQuestions : 0}{" "}
                      {t("testsConstants.questions")}
                    </span>
                    <span>
                      {section.time
                        ? section.time
                        : section.timeInSeconds &&
                          section.timeInSeconds / 60}{" "}
                      {t("testsConstants.min")}
                    </span>
                  </div>
                </div>
                {selectedSections.length > 1
                  ? isPreviewEditable && (
                      <div className="flex gap-2">
                        <Icon
                          icon="fa:long-arrow-up"
                          className={`${
                            index === 0
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={() =>
                            changeSelectedSectionsOrder(index, "up")
                          }
                          tabIndex={0}
                          onKeyUp={(e) => {
                            if (e.key === "Enter")
                              changeSelectedSectionsOrder(index, "up")
                          }}
                        />
                        <Icon
                          icon="fa:long-arrow-down"
                          className={`${
                            index === selectedSections.length - 1
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={() =>
                            changeSelectedSectionsOrder(index, "down")
                          }
                          tabIndex={0}
                          onKeyUp={(e) => {
                            if (e.key === "Enter")
                              changeSelectedSectionsOrder(index, "down")
                          }}
                        />
                      </div>
                    )
                  : ""}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TestPreview
