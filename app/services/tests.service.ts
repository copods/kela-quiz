import type { Section } from "@prisma/client"
import { json, redirect } from "@remix-run/node"

import { routes } from "~/constants/route.constants"
import type { sectionActionErrorsType } from "~/interface/Interface"
import {
  createSection,
  editSectionById,
  getAllSections,
  deleteSectionById,
  getAllTestsCounts,
  getSectionById,
  getQuestionType,
  deleteQuestionById,
  getFirstSection,
  addQuestion,
} from "~/models/sections.server"
import { getAllUsers } from "~/models/user.server"
import { getUserWorkspaces } from "~/models/workspace.server"

//*
/** Action data types are defined here
 * @returns data type
 */
export type ActionData = {
  errors?: {
    title?: string
    body?: string
    status?: number
    check?: Date
    name?: string
    description?: string
  }
  error?: {
    data?: string
    status?: number
  }
  success?: {
    data?: string
    addMoreQuestion?: boolean
    status?: number
  }
  createSectionFieldError?: sectionActionErrorsType
  resp?: {
    status?: string | number
    check?: Date
    title?: string
    data?: Section
    id?: string
  }
}

/**
 * function will fetching the section data
 * @param sortBy
 * @param sortOrder
 * @param currentWorkspaceId
 * @param testCurrentPage
 * @param testItemsPerPage
 * @param cb
 * @returns array of Tests
 */
export const getAllTestsData = (
  sortBy: string | null,
  sortOrder: string | null,
  currentWorkspaceId: string,
  testCurrentPage: number,
  testItemsPerPage: number,
  cb: any
) => {
  return getAllSections(
    sortBy,
    sortOrder,
    currentWorkspaceId as string,
    testCurrentPage,
    testItemsPerPage
  )
    .then((res) => {
      return cb(res, "statusCheck.success")
    })
    .catch((err) => {
      return cb(err, "")
    })
}

/**
 * Function will the add the new section
 * @param name
 * @param description
 * @param createdById
 * @param workspaceId
 * @returns
 */
export const handleAddTest = async (
  name: string,
  description: string,
  createdById: string,
  workspaceId: string
) => {
  // fetching the data from server function
  const addHandle = createSection({
    name,
    description,
    createdById,
    workspaceId,
  })
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            status: "statusCheck.testAddedSuccess",
            data: res as Section,
            check: new Date(),
          },
        },
        { status: 200 }
      )
    })

    .catch((err) => {
      let title = "statusCheck.commonError"
      if (err.code === "P2002") {
        title = "statusCheck.duplicate"
      }
      return json<ActionData>(
        { errors: { title, status: 400, check: new Date() } },
        { status: 400 }
      )
    })

  return addHandle
}

/**
 * Function will edit the existing section
 * @param name
 * @param description
 * @param id
 * @returns updated section data
 */
export const handleEditTest = async (
  name: string,
  description: string,
  id: string
) => {
  if (typeof name !== "string" || name.length === 0) {
    return json<ActionData>(
      { errors: { title: "statusCheck.nameIsReq", status: 400 } },
      { status: 400 }
    )
  }
  if (typeof description !== "string" || description.length === 0) {
    return json<ActionData>(
      { errors: { title: "statusCheck.descIsReq", status: 400 } },
      { status: 400 }
    )
  }

  const editHandle = editSectionById(id, name, description)
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            status: "statusCheck.testUpdatedSuccess",
            data: res as Section,
          },
        },
        { status: 200 }
      )
    })

    .catch((err) => {
      let title = "statusCheck.commonError"
      if (err.code === "P2002") {
        title = "statusCheck.duplicate"
      }
      return json<ActionData>(
        { errors: { title, status: 400, check: new Date() } },
        { status: 400 }
      )
    })

  return editHandle
}

/**
 * Function will delete the section by id
 * @param deleteSectionId
 * @returns update the section status from deleted false to deleted true
 */
export const handleDeleteTest = async (deleteSectionId: string) => {
  const deleteHandle = await deleteSectionById(deleteSectionId)
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            status: "statusCheck.deletedSuccess",
            id: deleteSectionId,
          },
        },

        { status: 200 }
      )
    })
    .catch((err) => {
      return json<ActionData>(
        {
          errors: {
            title: "statusCheck.commonError",
            status: 400,
            check: new Date(),
          },
        },
        { status: 400 }
      )
    })

  return deleteHandle
}

/**
 * this function will return userWorkspace id
 * @param userId
 * @returns userWorkspaces
 */
export const getWorkspaces = async (userId: string) => {
  return await getUserWorkspaces(userId)
}

/**
 * Function will get total count of section
 * @param userId
 * @returns count
 */
export const getAllSectionCount = async (userId: string) => {
  return await getAllTestsCounts(userId)
}

/**
 * Function will get testById
 * @param param0
 * @returns test
 */
export const getSectionDataById = async ({ id }: { id: string }) => {
  return await getSectionById({ id })
}

/**
 * Function will get question types
 * @returns QuestionTypes
 */
export const getQuestionTypeFromTests = async () => {
  return await getQuestionType()
}

/**
 * Function will delete question by id
 * @param id
 * @returns update the deleted field from false to true
 */
export const getDeleteQuestionById = async (id: string) => {
  const deleteQuestion = await deleteQuestionById(id)
    .then(() => {
      return json<ActionData>(
        { resp: { title: "statusCheck.deletedSuccess", status: 200 } },
        { status: 200 }
      )
    })
    .catch(() => {
      return json<ActionData>(
        {
          errors: {
            title: "statusCheck.commonError",
            status: 400,
          },
        },
        { status: 400 }
      )
    })
  return deleteQuestion
}

/**
 * Function will call all the users
 * @param currentWorkspaceId
 * @returns all users data
 */
export const getAllUsersData = async (currentWorkspaceId: string) => {
  return await getAllUsers({ currentWorkspaceId })
}

/**
 * Function will call all section
 * @param currentWorkspaceId
 * @returns test data
 */
export const getALLSectionsData = async (currentWorkspaceId: string) => {
  return await getAllSections("", "", currentWorkspaceId)
}

/**
 * Function will call the first section
 * @param sortBy
 * @param sortOrder
 * @param workspaceId
 * @param testCurrentPage
 * @param testItemsPerPage
 * @param totalItems
 * @param currentPage
 * @param pagePerItems
 * @param sortFilter
 * @param params
 * @returns  testId
 */
export const getFirstSectionData = async (
  sortBy: string | null,
  sortOrder: string | null,
  workspaceId: string,
  testCurrentPage: number,
  testItemsPerPage: number,
  totalItems: string,
  currentPage: string,
  pagePerItems: string,
  sortFilter: string,
  params: any
) => {
  const sectionId = await getFirstSection(
    sortBy,
    sortOrder,
    workspaceId,
    testCurrentPage,
    testItemsPerPage
  )
  if (sectionId && totalItems === "1" && currentPage !== "1") {
    redirect(
      `/${params.workspaceId}${
        routes.tests
      }/${sectionId}?${sortFilter}&testPage=${
        Number(currentPage) - 1
      }&testItems=${pagePerItems}`
    )
    return {
      deleted: "deleteLastTestOnPage",
      path: `/${params.workspaceId}${
        routes.tests
      }/${sectionId}?${sortFilter}&testPage=${
        Number(currentPage) - 1
      }&testItems=${pagePerItems}`,
    }
  } else {
    if (sectionId) {
      redirect(
        `/${params.workspaceId}${routes.tests}/${sectionId}?${sortFilter}&testPage=${currentPage}&testItems=${pagePerItems}`
      )
      return {
        sectionId: sectionId,
        deleted: "deleted",
      }
    } else {
      redirect(`/${params.workspaceId}${routes.tests}`)
      return {
        deleted: "deleted",
      }
    }
  }
}

/**
 * Function will adding a new question
 * @param question
 * @param options
 * @param correctAnswer
 * @param questionTypeId
 * @param sectionId
 * @param createdById
 * @param checkOrder
 * @param addMoreQuestion
 * @returns added question data
 */
export const getAddQuestion = async (
  question: string,
  options: Array<{ id: string; option: string; isCorrect: boolean }>,
  correctAnswer: Array<{ id: string; answer: string; order: number }>,
  questionTypeId: string,
  sectionId: string,
  createdById: string,
  checkOrder: boolean,
  addMoreQuestion: boolean
) => {
  const ques = await addQuestion(
    question,
    options,
    correctAnswer,
    questionTypeId,
    sectionId,
    createdById,
    checkOrder
  )
    .then((res) => {
      return json<ActionData>(
        {
          success: {
            data: "statusCheck.questionAddedSuccess",
            addMoreQuestion: addMoreQuestion,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      return json<ActionData>(
        { error: { data: "statusCheck.questionNotAdded" } },
        { status: 400 }
      )
    })
  return ques
}