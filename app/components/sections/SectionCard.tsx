import { useEffect, useState } from "react"

import moment from "moment"

import { Menu } from "@headlessui/react"
import { Icon } from "@iconify/react"
import { useSubmit, useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import DeletePopUp from "../common-components/DeletePopUp"

import AddEditSection from "./AddEditSection"

const SectionCard = ({
  name,
  description,
  isActive,
  questionsCount,
  createdBy,
  createdAt,
  id,
  setDeleted,
  setIsDelete,
  isDelete,
  setSectionActionErrors,
  sectionActionErrors,
  currentPageCount,
  filter,
}: {
  name: string
  description: string
  isActive: boolean
  questionsCount?: number
  createdBy: string
  createdAt: Date
  id: string
  setDeleted?: (e: boolean) => void
  setIsDelete: (e: boolean) => void
  isDelete: boolean
  sectionActionErrors?: {
    title?: string
    description?: string
    duplicateTitle?: string
  }
  setSectionActionErrors: ({
    title,
    description,
  }: {
    title?: string
    description?: string
  }) => void
  currentPageCount: number
  filter: string
}) => {
  const { t } = useTranslation()
  const submit = useSubmit()
  const data = useLoaderData()
  const [editMode, setEditMode] = useState(false)
  const [editItem, setEditItem] = useState({
    name: "",
    description: "",
  })
  const deleteSection = () => {
    submit(
      {
        deleteSection: "sectionDelete",
        id: id,
        currentPage: data.testCurrentPage,
        pageSize: data.testItemsPerPage,
        totalSectionsOnCurrentPage: String(currentPageCount),
        filter: filter
          .split("?")[1]
          .split("&")
          .filter((res) => res.includes("sortBy") || res.includes("sort"))
          .join("&"),
      },
      { method: "post" }
    )
  }
  // shift + alt + Tab combination key for get back focus to selected section card
  useEffect(() => {
    window.addEventListener("keydown", function (event) {
      if (event.shiftKey && event.altKey && event.key === "Tab") {
        window.location.href = "#section-card"
      }
    })
  }, [])
  return (
    <div
      className={`sectionCard section-card flex flex-col gap-2 rounded-lg p-5 pt-4 ${
        isActive
          ? "border-l-primary pl-13 border border-l-8 border-transparent bg-white shadow-md"
          : "border border-gray-300 bg-gray-100"
      }`}
      id="section-card"
    >
      <div className="flex items-center justify-between">
        <h2 className="sectionName break-all text-xl font-semibold text-gray-700">
          {name}
        </h2>
        {(data.permission.tests.delete || data.permission.tests.update) && (
          <div className="flex">
            <Menu
              as="div"
              className="verticalDots relative inline-block text-left"
            >
              <Menu.Button id="menu-button" className={id}>
                <Icon
                  className="text-2xl text-gray-600"
                  icon={"mdi:dots-vertical"}
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div className="flex flex-col gap-1">
                        {data.permission.tests.update && (
                          <button
                            tabIndex={0}
                            id="edit-test-button"
                            data-cy="edit-section"
                            className="text-gray-primary undefined text-primary inline-flex w-36 items-center justify-start bg-white px-2 py-2 text-xs font-medium transition delay-75 ease-in-out hover:bg-gray-100"
                            onClick={() => {
                              setEditMode(true)
                              setEditItem({
                                name: name,
                                description: description,
                              })
                            }}
                            name="editSection"
                            title={t("commonConstants.edit")}
                          >
                            <>
                              <Icon
                                icon={"material-symbols:edit-outline-sharp"}
                                className="mr-2 h-5 w-5
                        text-black"
                                aria-hidden="true"
                              />
                              {t("commonConstants.edit")}
                            </>
                          </button>
                        )}
                        {data.permission.tests.delete && (
                          <button
                            tabIndex={0}
                            id="delete-test-button"
                            data-cy="delete-section"
                            className="text-gray-primary undefined text-primary inline-flex w-36 items-center justify-start bg-white px-2 py-2 text-xs font-medium transition delay-75 ease-in-out hover:bg-gray-100"
                            onClick={() => {
                              setIsDelete(true)
                            }}
                            name="deleteSection"
                            title={t("commonConstants.delete")}
                          >
                            <>
                              <Icon
                                icon={"ic:outline-delete-outline"}
                                className="mr-2 h-5 w-5
                        text-red-500"
                                aria-hidden="true"
                              />
                              {t("commonConstants.delete")}
                            </>
                          </button>
                        )}
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        )}
      </div>
      <div className="flex text-xs text-gray-400">
        <span>By {createdBy}</span>
        <span id="sectionDate" className="created-by-date flex">
          <Icon className="text-base" icon={"mdi:circle-small"} />
          {moment(createdAt).format("DD MMM YY")}
        </span>
      </div>
      <div className="flex text-xs text-gray-400">
        {t("sectionsConstants.totalQuestions")} {questionsCount}
      </div>
      <DeletePopUp
        setOpen={setIsDelete}
        open={isDelete}
        onDelete={deleteSection}
        subAlert={t("deletePopUp.subAlert")}
        deleteItem={name}
        deleteItemType={t("testsConstants.testText")}
        setDeleted={setDeleted}
        header={t("commonConstants.deleteTest")}
      />
      <AddEditSection
        open={editMode}
        setOpen={setEditMode}
        sectionActionErrors={sectionActionErrors}
        setSectionActionErrors={setSectionActionErrors}
        showErrorMessage={false}
        editItem={editItem}
        editId={id}
      />
    </div>
  )
}

export default SectionCard
