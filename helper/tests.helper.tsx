import type { Section } from "@prisma/client"
import { json } from "@remix-run/node"

import type { sectionActionErrorsType } from "~/interface/Interface"
import {
  createSection,
  editSectionById,
  getAllSections,
  deleteSectionById,
} from "~/models/sections.server"

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
  createSectionFieldError?: sectionActionErrorsType
  resp?: {
    status?: string
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
