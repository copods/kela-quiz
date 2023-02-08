import { User } from "@prisma/client"
import { json } from "@remix-run/node"
import { createCandidate } from "~/models/candidate.server"
import {
  deleteTestById,
  getAllTests,
  getAllTestsCount,
} from "~/models/tests.server"
import { getUserWorkspaces } from "~/models/workspace.server"
import { getUserId, requireUserId } from "~/session.server"

//* types for ActionData
export type ActionData = {
  errors?: {
    statusCode: number
    message: string
  }
  resp?: {
    statusCode: number
    message: string
  }
}

//* fetching all Assessments
export const getAllAssessments = (
  sortBy: string,
  sortOrder: string,
  currentWorkspaceId: string,
  testsItemsPerPage: number,
  testsCurrentPage: number,
  cb: any
) => {
  return getAllTests(
    sortBy as string,
    sortOrder as string,
    currentWorkspaceId as string,
    testsItemsPerPage,
    testsCurrentPage
  )
    .then((res) => {
      return cb(res, "statusCheck.success")
    })
    .catch((err) => {
      return cb(err, "")
    })
}

//* function for deleting the assessment by id
export const deleteAssessmentById = async (id: string) => {
  const deletedHandle = deleteTestById(id)
    .then((res) => {
      return json<ActionData>(
        { resp: { statusCode: 200, message: "statusCheck.deletedSuccess" } },
        { status: 200 }
      )
    })
    .catch((err) => {
      return json<ActionData>(
        { errors: { statusCode: 400, message: "statusCheck.commonError" } },
        { status: 400 }
      )
    })
  return deletedHandle
}

//* function for creating the candidate
export const createCandidateByAssessId = async (
  emails: Array<string>,
  createdById: User["id"],
  testId: string
) => {
  return await createCandidate({
    emails,
    createdById,
    testId,
  })
}

//* function for fetching number of count of total assessments
export const getAllAssessmentsCount = async (currentWorkspaceId: string) => {
  return await getAllTestsCount(currentWorkspaceId)
}

//* fetching workspace by userId
export const getWorkspaces = async (userId: string) => {
  return await getUserWorkspaces(userId)
}

export const getRequiredUserId = async (request: Request) => {
  return await requireUserId(request)
}
export const getUsersId = async (request: Request) => {
  return await getUserId(request)
}
