import type { User } from "@prisma/client"
import { json } from "@remix-run/node"

import type { Test } from "~/interface/Interface"
import { createCandidate } from "~/models/candidate.server"
import {
  deleteTestById,
  getAllTests,
  getAllTestsCount,
  getTestById,
} from "~/models/tests.server"
import { getUserWorkspaces } from "~/models/workspace.server"

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

/**
 * @param sortBy
 * @param sortOrder
 * @param currentWorkspaceId
 * @param testsItemsPerPage
 * @param testsCurrentPage
 * @param cb
 * @param userId
 * @returns all Assessments data
 */
export const getAllAssessments = async (
  sortBy: string,
  sortOrder: string,
  currentWorkspaceId: string,
  testsItemsPerPage: number,
  testsCurrentPage: number,
  cb: (AssessmentUpdate: Test[], statusUpdate: string) => void,
  userId: string
) => {
  try {
    return await getAllTests(
      sortBy as string,
      sortOrder as string,
      currentWorkspaceId as string,
      testsItemsPerPage,
      testsCurrentPage,
      userId
    )
      .then((res) => {
        return cb(res as Test[], "statusCheck.success")
      })
      .catch((err) => {
        return cb(err, "")
      })
  } catch (error) {
    throw error
  }
}

/** function for deleting the assessment by id
 * @param id
 * @param userId
 * @param workspaceId
 * @returns this function will delete the assessment by id
 */

export const deleteAssessmentById = async (
  id: string,
  userId: string,
  workspaceId: string
) => {
  try {
    const deletedHandle = await deleteTestById(id, userId, workspaceId).then(
      (res) => {
        return json<ActionData>(
          { resp: { statusCode: 200, message: "statusCheck.deletedSuccess" } },
          { status: 200 }
        )
      }
    )
    return deletedHandle
  } catch (error) {
    throw error
  }
}

/**  function for creating the candidate
/* @param emails
 * @param  createdById
 * @param testId
 * @returns create candidate
 */
export const getCandidateByAssessmentId = async ({
  emails,
  createdById,
  testId,
  userId,
  workspaceId,
}: {
  emails: Array<string>
  createdById: User["id"]
  testId: string
  userId: string
  workspaceId: string
}) => {
  try {
    return await createCandidate({
      emails,
      createdById,
      testId,
      userId,
      workspaceId,
    })
  } catch (error) {
    throw error
  }
}

/** 
 *@param currentWorkspaceId
 @returns number of count of total assessments
 */
export const getAllAssessmentsCount = async (
  currentWorkspaceId: string,
  userId: string
) => {
  try {
    return await getAllTestsCount(currentWorkspaceId, userId)
  } catch (error) {
    throw error
  }
}

/**
 * @param userId
 * @returns workspace by userId
 */
export const getWorkspaces = async (userId: string) => {
  return await getUserWorkspaces(userId)
}

export const getAssessmentById = async ({ id }: { id: string }) => {
  return await getTestById({ id })
}
