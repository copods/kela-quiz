// import type { Section } from "@prisma/client"
import { json } from "@remix-run/node"

import { getUserWorkspaceService } from "./workspace.service"

import type { Section } from "~/interface/Interface"
import {
  createSection,
  editSectionById,
  getAllSections,
  deleteSectionById,
  getAllTestsCounts,
  getSectionById,
  getQuestionType,
  deleteQuestionById,
  addQuestion,
  getFirstSection,
} from "~/models/sections.server"
import { createTest } from "~/models/tests.server"
import { getAllUsers } from "~/models/user.server"

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
  createSectionFieldError?: {
    title?: string
    description?: string
    duplicateTitle?: string
  }
  resp?: {
    status?: string | number
    check?: Date
    title?: string
    data?: Section
    id?: string
  }
}

export type createTestData = {
  name: string
  description: string
  sections: Array<{
    sectionId: string
    totalQuestions: number
    timeInSeconds: number
    order: number
  }>
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
  cb: (sectionUpdate: Section[], statusUpdate: string) => void,
  userId: string,
  workspaceId: string
) => {
  try {
    return getAllSections(
      sortBy,
      sortOrder,
      currentWorkspaceId as string,
      testCurrentPage,
      testItemsPerPage,
      userId,
      workspaceId
    ).then((res) => {
      return cb(res as unknown as Section[], "statusCheck.success")
    })
  } catch (error) {
    throw error
  }
}

/**
 * Function will the add the new section
 * @param name
 * @param description
 * @param createdById
 * @param workspaceId
 * @param userId
 * @returns
 */
export const handleAddTest = async (
  name: string,
  description: string,
  createdById: string,
  workspaceId: string,
  userId: string
) => {
  try {
    // fetching the data from server function
    const addHandle = createSection({
      name,
      description,
      createdById,
      workspaceId,
      userId,
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
          { errors: { title, status: err.status ?? 400, check: new Date() } },
          { status: 400 }
        )
      })

    return addHandle
  } catch (error) {
    throw error
  }
}

/**
 * Function will edit the existing section
 * @param name
 * @param description
 * @param id
 * @param userId
 * @param workspaceId
 * @returns updated section data
 */
export const handleEditTest = async (
  name: string,
  description: string,
  id: string,
  userId: string,
  workspaceId: string
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

  try {
    const editHandle = editSectionById(
      id,
      name,
      description,
      userId,
      workspaceId
    )
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
          { errors: { title, status: err.status ?? 400, check: new Date() } },
          { status: 400 }
        )
      })

    return editHandle
  } catch (error) {
    throw error
  }
}

/**
 * Function will delete the section by id
 * @param deleteSectionId
 * @returns update the section status from deleted false to deleted true
 */
export const handleDeleteTest = async (
  deleteSectionId: string,
  userId: string,
  workspaceId: string
) => {
  try {
    const deleteHandle = await deleteSectionById(
      deleteSectionId,
      userId,
      workspaceId
    ).then((res) => {
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
    return deleteHandle
  } catch (error) {
    throw error
  }
}

/**
 * this function will return userWorkspace id
 * @param userId
 * @returns userWorkspaces
 */
export const getWorkspaces = async (userId: string) => {
  return await getUserWorkspaceService(userId)
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
 * @param params.sectionId
 * @param userId
 * @param workspaceId
 * @returns test
 */
export const getSectionDataById = async ({
  id,
  userId,
  workspaceId,
}: {
  id: string
  userId: string | undefined
  workspaceId: string
}) => {
  try {
    return await getSectionById({ id, userId, workspaceId })
  } catch (error) {
    throw error
  }
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
 * @param userId
 * @param workspaceId
 * @returns update the deleted field from false to true
 */
export const deleteTestQuestionById = async (
  id: string,
  userId: string,
  workspaceId: string
) => {
  try {
    return await deleteQuestionById(id, userId, workspaceId)
      .then((res) => {
        return json<ActionData>(
          { resp: { title: res, status: 200 } },
          { status: 200 }
        )
      })
      .catch((err) => {
        return json<ActionData>(
          {
            errors: {
              title: "statusCheck.commonError",
              status: err.status ?? 400,
            },
          },
          { status: 400 }
        )
      })
  } catch (error) {
    throw error
  }
}

/**
 * Function will call all the users
 * @param currentWorkspaceId
 * @returns all users data
 */
export const getAllUsersData = async ({
  currentWorkspaceId,
}: {
  currentWorkspaceId: string
}) => {
  return await getAllUsers({ currentWorkspaceId })
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
 * @param userId
 * @param workspaceId
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
  addMoreQuestion: boolean,
  userId: string,
  workspaceId: string
) => {
  try {
    const ques = await addQuestion(
      question,
      options,
      correctAnswer,
      questionTypeId,
      sectionId,
      createdById,
      checkOrder,
      userId,
      workspaceId
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
          {
            error: {
              data: "statusCheck.questionNotAdded",
              status: err.status ?? 400,
            },
          },
          { status: 400 }
        )
      })
    return ques
  } catch (error) {
    throw error
  }
}

/**
 * Function will adding a new question
 * @param sortBy
 * @param sortOrder
 * @param workspaceId
 * @param testCurrentPage
 * @param testItemsPerPage
 * @param number
 * @returns first seciton id
 */
export const getFIRSTSection = async (
  sortBy: string,
  sortOrder: string,
  workspaceId: string,
  testCurrentPage: number,
  testItemsPerPage: number
) => {
  return await getFirstSection(
    sortBy,
    sortOrder,
    workspaceId,
    testCurrentPage,
    testItemsPerPage
  )
}

/**
 * Function will be creating new Assessment/test
 * @param createdById
 * @param workspaceId
 * @param data
 * @param userId
 * @returns
 */

export const createTestHandler = async (
  createdById: string,
  workspaceId: string,
  data: createTestData,
  userId: string
) => {
  try {
    return await createTest(createdById, workspaceId as string, data, userId)
      .then((res) => {
        return json<ActionData>(
          {
            resp: {
              title: "statusCheck.assessmentAddedSuccessFully",
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = "statusCheck.commonError"
        if (err.code === "P2002") {
          title = "statusCheck.assessmentAlreadyExist"
        }
        return json<ActionData>(
          {
            errors: {
              title,
              status: err.status ?? 400,
            },
          },
          { status: 400 }
        )
      })
  } catch (error) {
    throw error
  }
}
