import { useEffect, useRef, useState } from "react"

import { useLoaderData, useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Button from "../common-components/Button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogWrapper,
} from "../common-components/Dialog"

import Header from "./Header"
import WebCamGetPicture from "./WebCamGetPicture"

import checkIcon from "~/../public/assets/checkIcon.svg"
import contactSupport from "~/../public/assets/contactSupport.svg"
import type { SectionInTest, TestSection } from "~/interface/Interface"

const CandidateInstruction = () => {
  const { t } = useTranslation()
  const { firstSection, instructions, candidate, webCamEnabled } =
    useLoaderData()

  const webcamRef = useRef(null)
  const [webcamPopup, setOpenWebcamPopup] = useState(false)
  const [img, setImg] = useState("")
  const [faceCount, setFaceCount] = useState(0)
  const [pictureClickState, setPicktreClickState] = useState({
    msg: "",
    state: "",
  })

  const candidateSections = instructions?.test?.sections.sort(
    (a: TestSection & { order: number }, b: TestSection & { order: number }) =>
      a.order > b.order ? 1 : b.order > a.order ? -1 : 0
  )
  const submit = useSubmit()

  useEffect(() => {
    console.log(faceCount, firstSection, submit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const startTestForCandidate = () => {
    console.log(webCamEnabled)
    if (webCamEnabled) {
      setOpenWebcamPopup(true)
      return
    } else {
      submit(
        {
          proceedToTest: "true",
          firstSectionId: firstSection.id,
        },
        { method: "post" }
      )
    }
  }

  const proceedToTestAfterClicking = () => {
    submit(
      {
        savePicture: "true",
        proceedToTest: "true",
        firstSectionId: firstSection.id,
        candidatePicture: img,
      },
      { method: "post" }
    )
  }

  const handleCapture = async () => {
    await (webcamRef.current as any)?.getSnapshot()
    if (faceCount !== 1) {
      console.log("faces are not one")
      setPicktreClickState({
        state: "fail",
        msg: `Getting ${
          faceCount > 1 ? "more" : "less"
        } than one face in frame.`,
      })
    } else {
      setPicktreClickState({
        state: "success",
        msg: `Picture saved successfully`,
      })
    }
  }

  const getTotalTimeInMin = () => {
    let time = 0
    instructions.test.sections.forEach((section: SectionInTest) => {
      time += section.timeInSeconds
    })
    return time / 60
  }

  const setOfInstructions = [
    `The duration of this exam is ${getTotalTimeInMin()} minutes`,
    `Each question is worth the same marks`,
    `After submitting the section, you won't be able to make any changes`,
  ]

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-50">
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center justify-center gap-16 py-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-2xl font-bold text-gray-900" data-cy="heading">
              {t("candidateExamConstants.candidateInsWelcome")}{" "}
              {candidate.firstName}
            </h3>
            {/* <p className="text-base font-medium text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p> */}
          </div>
          <div className="flex gap-12">
            <div className="flex w-438 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 shadow-sm">
              <h3
                className="text-center text-2xl font-bold text-gray-900"
                data-cy="testSectionHeading"
              >
                {t("routeFiles.tests")}
              </h3>
              <div className="flex flex-col gap-6" data-cy="testSectionContent">
                {candidateSections.map(
                  (section: SectionInTest, index: number) => {
                    return (
                      <div
                        key={section?.id}
                        className="flex flex-1 items-center justify-between gap-6 text-gray-700"
                      >
                        <div className="flex items-start gap-4">
                          <img src={contactSupport} alt="" className="h-6" />
                          <span className="text-base font-normal text-gray-900">
                            {t("testsConstants.testText")} {section.order} -
                            {section.section.name}
                          </span>
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
            <div className="flex w-438 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 shadow-sm">
              <h3
                className="text-center text-2xl font-bold text-gray-900"
                data-cy="instructionSectionHeading"
              >
                {t("candidateExamConstants.instructions")}
              </h3>
              <div
                className="flex flex-col gap-6"
                data-cy="instructionSectionContent"
              >
                {setOfInstructions.map((instruction: string, index: number) => {
                  return (
                    <div
                      className="flex items-start gap-4"
                      key={`instruction-${index}`}
                    >
                      <img src={checkIcon} alt="checked icon" className="h-6" />
                      <span className="text-base font-normal text-gray-900">
                        {instruction}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-2">
              <span>🎉 </span>
              <p
                className="text-base font-semibold text-gray-900"
                data-cy="goodLuckMessageText"
              >
                Best of Luck
              </p>
            </div>
            <Button
              tabIndex={0}
              id="start"
              className="w-356 py-3"
              variant="primary-solid"
              title={t("candidateExamConstants.beginAssessment")}
              buttonText={t("candidateExamConstants.beginAssessment")}
              onClick={startTestForCandidate}
              aria-label="start"
            />
          </div>
        </div>
      </div>
      <DialogWrapper open={webcamPopup} setOpen={setOpenWebcamPopup}>
        <>
          <DialogHeader
            heading="Start Exam"
            onClose={() => {
              setOpenWebcamPopup(false)
            }}
          />
          <DialogContent>
            <>
              <p className="mb-1 text-base font-medium text-gray-700">
                To continue with this attempt you must upload your photo using
                webcam
              </p>
              <p className="text-sm text-gray-600">
                This exam requires webcam validation process. You must allow the
                webcam and it will be compared with your picture (Please allow
                your web browser to access your camera.)
              </p>
              <WebCamGetPicture
                img={img}
                setImg={setImg}
                getFaceCount={setFaceCount}
                ref={webcamRef}
              />
              <div>
                <Button
                  variant="secondary-solid"
                  buttonText="Capture"
                  onClick={() => handleCapture()}
                />
                <span
                  className={`${
                    pictureClickState.state == "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {pictureClickState.msg}
                </span>
              </div>
            </>
          </DialogContent>
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button variant="primary-outlined" buttonText="Cancel" />
              <Button
                variant="primary-solid"
                buttonText="Proceed"
                isDisabled={pictureClickState.state != "success"}
                onClick={() => proceedToTestAfterClicking()}
              />
            </div>
          </DialogFooter>
        </>
      </DialogWrapper>
    </div>
  )
}

export default CandidateInstruction
