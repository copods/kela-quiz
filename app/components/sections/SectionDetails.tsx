import { useEffect, useState } from "react"

import { Icon } from "@iconify/react"
import { useLoaderData, useNavigate } from "@remix-run/react"
import Papa from "papaparse"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import Button from "../common-components/Button"
import EmptyStateComponent from "../common-components/EmptyStateComponent"

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogWrapper,
} from "./../common-components/Dialog"
import CSVQuestionUploadDrawer from "./CSVQuestionUploadDrawer"
import QuestionCard from "./QuestionCard"

import { routes } from "~/constants/route.constants"
import { useCommonContext } from "~/context/Common.context"
import type { Question } from "~/interface/Interface"

const SectionDetails = () => {
  const { t } = useTranslation()
  const { setCustomStorage } = useCommonContext()
  const sectionDetails = useLoaderData()
  const [currentAccordian, setCurrentAccordian] = useState(-1)
  const [searchText, setSearchText] = useState("")

  const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false)
  const [openAddCsvQuestionDrawer, setOpenAddCsvQuestionDrawer] =
    useState(false)

  const [csvData, setCsvData] = useState({
    fileName: "",
    questions: [],
  })

  const navigate = useNavigate()
  useEffect(() => {
    setSearchText("")
    setCurrentAccordian(-1)
  }, [navigate])
  const searchedQuestion = sectionDetails.sectionDetails?.questions.filter(
    (question: Question) => {
      return question.question.toLowerCase().includes(searchText.toLowerCase())
    }
  )

  // ****************************************************************************************************
  // ****************************************************************************************************
  // *******************************************UPLOAD CSV***********************************************
  // ****************************************************************************************************
  // ****************************************************************************************************
  const uploadFileOpen = (e: any) => {
    document.getElementById("file")?.click()
  }

  const DownloadSample = () => {
    // Function to handle the file download
    console.log("ok")
    const link = document.createElement("a")
    link.href = `/Smaple_Sheet.csv` // Update the path as needed
    link.download = "Smaple_Sheet.csv" // Update the filename as needed
    link.click()
  }

  const containsAll = (array: Array<string>, elements: Array<string>) => {
    return elements.every((element: string) => array.includes(element)) // Check if each element is in the array
  }
  const requiredElements = ["Question", "A", "B", "C", "D", "Answer"]

  const uploadFile = (e: any) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const csvContent = event.target?.result
        const parsedData = Papa.parse(csvContent as any, {
          header: true, // Treat the first row as the header
          skipEmptyLines: true, // Skip empty lines
        })

        const headers = Object.keys(parsedData.data[0] as any)
        const hasAllElements = containsAll(headers, requiredElements)
        if (!hasAllElements) {
          toast.error(
            `CSV format is inorrect, required columns: ["Question", "A", "B", "C", "D", "Answer"]`
          )
          return
        }

        parsedData.data = parsedData.data.map((_: any) => {
          return {
            ..._,
            selected: true,
          }
        })

        setCsvData({ fileName: file.name, questions: parsedData.data as any })
      }

      reader.readAsText(file) // Start reading the file as text
    }
  }

  useEffect(() => {
    if (csvData.questions.length) {
      setOpenAddCsvQuestionDrawer(true)
    }
  }, [csvData])
  // ****************************************************************************************************
  // ****************************************************************************************************
  // ****************************************************************************************************
  // ****************************************************************************************************

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto break-all rounded-lg border border-gray-200 bg-white px-9 py-6">
      <div className="flex">
        <h2
          className="inline-block text-2xl font-semibold text-gray-700"
          tabIndex={0}
          role={sectionDetails.sectionDetails?.name}
          title={sectionDetails.sectionDetails?.name}
          aria-label={sectionDetails.sectionDetails?.name}
          id="section-details-heading"
        >
          {sectionDetails.sectionDetails?.name}
        </h2>
      </div>
      <hr className="-mt-2 h-px w-full bg-gray-300" />
      <div
        className={`flex items-start gap-2 ${
          sectionDetails?.sectionDetails?.questions.length === 0
            ? "justify-end"
            : "justify-between"
        }`}
      >
        {sectionDetails?.sectionDetails?.questions.length === 0 ? null : (
          <div className="relative flex items-center">
            <Icon
              id="ascend"
              icon="charm:search"
              className="bg-light-200 absolute left-3 text-base text-gray-400"
            />
            <input
              tabIndex={0}
              id="section-search"
              type="text"
              value={searchText}
              name="search"
              placeholder={t("sectionsConstants.search")}
              title={t("sectionsConstants.search")}
              className="h-9 w-48 rounded-lg border px-5 pl-8 text-sm focus:outline-dotted"
              onChange={(e) => {
                setSearchText(e.target.value)
                setCurrentAccordian(-1)
              }}
            />
          </div>
        )}
        {sectionDetails.permission.questions.create && (
          <div className="flex gap-2">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={uploadFile}
            />
            <Button
              tabIndex={0}
              onClick={() => {
                setOpenUploadFileDialog(true)
              }}
              id="add-question"
              className="h-9 w-36 px-5"
              buttonText={`${t("addQuestion.uploadCsv")}`}
              variant="primary-solid"
              title={t("addQuestion.uploadCsv")}
              aria-label={t("addQuestion.uploadCsv")}
            />
            <Button
              tabIndex={0}
              onClick={() => {
                navigate(
                  `/${sectionDetails.currentWorkspaceId}${routes.tests}/${sectionDetails.sectionDetails?.id}${routes.addQuestion}`
                )
                setCustomStorage(
                  "activeTest",
                  sectionDetails.sectionDetails?.id
                )
              }}
              id="add-question"
              className="h-9 w-36 px-5"
              buttonText={`+ ${t("addQuestion.addQuestion")}`}
              variant="primary-solid"
              title={t("addQuestion.addQuestion")}
              aria-label={t("addQuestion.addQuestion")}
            />
          </div>
        )}
      </div>
      {/* QUESTION LIST  */}
      {searchedQuestion.length === 0 ? (
        <EmptyStateComponent text={t("emptyStateConstants.noQuestionsState")} />
      ) : (
        searchedQuestion.map((question: Question, i: number) => {
          return (
            <QuestionCard
              key={question.id}
              question={question}
              expandedIndex={currentAccordian}
              onAccordianToggle={setCurrentAccordian}
              index={i}
              deletePermission={sectionDetails.permission.questions.delete}
            />
          )
        })
      )}

      <CSVQuestionUploadDrawer
        open={openAddCsvQuestionDrawer}
        setOpen={setOpenAddCsvQuestionDrawer}
        data={csvData}
        setData={setCsvData}
      />
      <DialogWrapper
        open={openUploadFileDialog}
        setOpen={setOpenUploadFileDialog}
      >
        <>
          <DialogHeader heading="Upload CSV" />
          <DialogContent>
            <>
              <div className="mb-2 flex flex-col justify-between text-sm font-normal text-gray-600">
                <span>
                  File format: <b>CSV</b>
                </span>
                <span>
                  Recommended Question limit: <b>50</b>
                </span>
                <span className="mb-4">
                  we recommend you to use our template for bulk upload
                </span>
                <span
                  onClick={DownloadSample}
                  onKeyUp={DownloadSample}
                  role="button"
                  tabIndex={0}
                  className="font-indigo-700 mb-4 underline underline-offset-1"
                  style={{ color: "rgb(53 57 136)" }}
                >
                  Download Sample File
                </span>
              </div>

              <Button
                tabIndex={0}
                id="proceed"
                variant="primary-solid"
                type="button"
                name="delete"
                className="w-full px-5"
                title={t("commonConstants.proceed")}
                buttonText="Upload CSV"
                onClick={uploadFileOpen}
              />
            </>
          </DialogContent>
          <DialogFooter>
            <div
              className="gap-2 sm:flex sm:flex-row-reverse"
              data-cy="dialog-footer"
            >
              <Button
                tabIndex={0}
                type="button"
                id="cancel-change-role-pop-up"
                variant="primary-outlined"
                className="w-full px-5"
                title={t("commonConstants.cancel")}
                buttonText={t("commonConstants.cancel")}
                onClick={() => {
                  if (setOpenUploadFileDialog !== undefined)
                    setOpenUploadFileDialog(false)
                }}
              />
            </div>
          </DialogFooter>
        </>
      </DialogWrapper>
    </div>
  )
}

export default SectionDetails
