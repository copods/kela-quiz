import { json } from "@remix-run/node"
import { Test } from "~/interface/Interface"
import { createCandidate, getTestById } from "~/models/candidate.server"
import {
  deleteTestById,
  getAllTests,
  getAllTestsCount,
} from "~/models/tests.server"
import { getUserWorkspaces } from "~/models/workspace.server"

//* types for loaderData
export type LoaderData = {
  tests: Awaited<Array<Test>>
  status?: string | undefined
  workspaces: any
  currentWorkspaceId: string
  allTestsCount: any
  testsCurrentPage: number
  testsItemsPerPage: number
}
export type TestIdLoaderData = {
  testPreview: Awaited<ReturnType<typeof getTestById>>
  workspaces: any
  currentWorkspaceId: string
}
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
  testId: string,
  createdById: string,
  formData: any
) => {
  if (testId !== null) {
    let emails: Array<string> = []
    await formData.forEach((fd: string) => {
      if (fd != "") {
        emails.push(fd as string)
      }
    })
    if (emails.length === 0) {
      return json({
        status: 401,
        message: "statusCheck.noEmailsInvite",
        testId,
      })
    }
    const candidateInviteStatus = await createCandidate({
      emails,
      createdById,
      testId,
    })

    return json({ candidateInviteStatus, testId })
  }
}

//* function for fetching number of count of total assessments
export const getAllAssessmentsCount = async (currentWorkspaceId: string) => {
  await getAllTestsCount(currentWorkspaceId)
}

//* fetching workspace by userId
export const getWorkspaces = async (userId: string) => {
  await getUserWorkspaces(userId)
}
