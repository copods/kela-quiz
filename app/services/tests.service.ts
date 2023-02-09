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

//*Action data types are defined here
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

// * fetching sections data
export const getAllSectionsData = (
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

//* functions checking name and description error
const validateTitle = (title: string) => {
  if (typeof title !== "string" || title.length <= 0) {
    return "statusCheck.nameIsReq"
  }
}

const validateDescription = (description: string) => {
  if (typeof description !== "string" || description.length <= 0) {
    return "statusCheck.descIsReq"
  }
}

//* functions related add, delete and update/edit the section
export const handleAddSection = async (
  name: string,
  description: string,
  createdById: string,
  workspaceId: string
) => {
  // passing the props to above functions(*validateTitle,*validateDescription) for error checking
  const createSectionFieldError = {
    title: validateTitle(name),
    description: validateDescription(description),
  }

  if (Object.values(createSectionFieldError).some(Boolean)) {
    return json({ createSectionFieldError }, { status: 400 })
  }

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

export const handleEditSection = async (
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
  const createSectionFieldError = {
    title: validateTitle(name),
    description: validateDescription(description),
  }
  if (Object.values(createSectionFieldError).some(Boolean)) {
    return json({ createSectionFieldError }, { status: 400 })
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
export const handleDeleteSection = async (deleteSectionId: string) => {
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
 * this function will return workspace
 * @param userId
 * @returns userWorkspaces
 */
export const getWorkspaces = async (userId: string) => {
  return await getUserWorkspaces(userId)
}

export const getALLtestsCount = async (userId: string) => {
  return await getAllTestsCounts(userId)
}

export const getTestById = async (id: string) => {
  return await getSectionById(id)
}

export const getQuestionTypeFromTests = async () => {
  return await getQuestionType()
}

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

export const getALLUsers = async (currentWorkspaceId: string) => {
  return await getAllUsers({ currentWorkspaceId })
}

export const getALLSections = async (currentWorkspaceId: string) => {
  return await getAllSections("", "", currentWorkspaceId)
}

export const getFirstTest = async (
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
