import { redirect } from "@remix-run/server-runtime"
import { candidateSectionStart, candidateTestStart, checkIfTestLinkIsValid, endAssessment, endCurrentSection, getCandidate, getCandidateIDFromAssessmentID, getCandidateSectionDetails, getCandidateTest, getOrderedSection, getTestInstructionForCandidate, getTestSectionDetails, skipAnswerAndNextQuestion, startAndGetQuestion, updateCandidateFirstLastName, updateNextCandidateStep } from "~/models/assessment.server"


// Type of candidateStep field in CandidateTest schema
export type CandidateStep = {
  nextRoute: string
  isSection: boolean
  currentSectionId: string | null
}


/**
 * Functions checks if the given assessment link is valid. If true, it will return the url to redirect the user to (only if current route does not match the next route in DB)
 * If false, it will return null and this will result in a 404 Not Found
 * @param assessmentID
 * @param currentRoute
 * @returns nextRoute or null
 */
export async function checkIfTestLinkIsValidAndRedirect(
  assessmentID: string,
  currentRoute: string
) {
  const currentCandidateStep = await checkIfTestLinkIsValid(assessmentID)
  const candidateStepObj = currentCandidateStep?.candidateStep as CandidateStep
  if (candidateStepObj && candidateStepObj.nextRoute && !currentCandidateStep?.endAt) {
    if (currentRoute !== candidateStepObj.nextRoute) {
      switch (candidateStepObj.nextRoute) {
        case 'register':
        case 'instructions':
          return `/assessment/${assessmentID}/${candidateStepObj.nextRoute}`
        case 'section':
          return `/assessment/${assessmentID}/${candidateStepObj.currentSectionId}`
        case 'end':
          return `/assessment/${assessmentID}/end-assessment`
      }
    }
  } else {
    return currentCandidateStep?.endAt ? `/assessment/${assessmentID}/end-assessment` : null
  }
}


/**
 * Functions will return the time left in section from total time after it is started
 * @param totalTimeInSeconds
 * @param startTime
 * @returns leftover seconds
 */
export function getTimeLeftInSeconds({ totalTimeInSeconds, startTime }: { totalTimeInSeconds: number, startTime: any }) {
  const diffrenceInSeconds = Math.abs(new Date().getTime() / 1000) - Math.abs(new Date(startTime).getTime() / 1000)
  return totalTimeInSeconds - Math.floor(diffrenceInSeconds) > -1 ? totalTimeInSeconds - Math.floor(diffrenceInSeconds) : 0
}

/**
 * Functions will return the candidate id using assessmentId
 * @param id
 * @returns candidateId
 */
export async function getCandidateIDFromAssessmentId(id: string) {
  return await getCandidateIDFromAssessmentID(
    id
  )
}


/**
 * Functions will update candidate details and returns the status
 * @param candidateId
 * @param firstName
 * @param lastName
 * @returns success/failure
 */
export async function updateCandidateDetail({ candidateId, firstName, lastName }: { candidateId: string, firstName: string, lastName: string }) {
  return await updateCandidateFirstLastName(
    candidateId,
    firstName,
    lastName
  )
}


/**
 * Functions will update the candidate next step
 * @param assessmentID
 * @param nextRoute
 * @param isSection
 * @param currentSectionId
 * @returns candidateTestId
 */
export async function updateNextStep({ assessmentId, nextRoute, isSection, currentSectionId }: { assessmentId: string, nextRoute: string, isSection: boolean, currentSectionId: string | null }) {
  await updateNextCandidateStep(assessmentId, {
    nextRoute,
    isSection,
    currentSectionId,
  })
}


/**
 * Functions will return test instructions, sections details
 * @param assessmentId
 * @returns test instructions
 */
export async function getTestInstructions(assessmentId: string) {
  return await getTestInstructionForCandidate(assessmentId)
}


/**
 * Functions will return the section of test of given order
 * this will help us to get orders sections
 * @param testId
 * @param order
 * @returns sectionDetails
 */
export async function getSectionByOrder(testId: string, order: number) {
  return await getOrderedSection(
    testId,
    order
  )
}


/**
 * Functions will return candidate details using assessment Id
 * @param assessmentID
 * @returns candidateDetails
 */
export async function getCandidateByAssessmentId(assessmentId: string) {
  return await getCandidate(assessmentId)
}


/**
 * Functions will return candidate Test details using id
 * @param assessmentID
 * @returns candidateTest
 */
export async function candidateTest(assessmentId: string) {
  return await getCandidateTest(
    assessmentId
  )
}


/**
 * Functions will update candidate test with current date time and retruns section details
 * @param assessmentID
 * @returns section details
 */
export async function startTest(assessmentId: string) {
  return await candidateTestStart(assessmentId)
}


/**
 * Functions will return sectionInTest using ID
 * @param testSectionId
 * @returns sectionInTest
 */
export async function getSectionInTest(testSectionId: string) {
  return await getTestSectionDetails(testSectionId)
}


/**
 * Functions will return section in candidate test using assessmentId and sectionId
 * @param assessmentID
 * @param sectionId
 * @returns sectionInCandidateTest
 */
export async function getSectionInCandidateTest(sectionId: string, assessmentId: string) {
  return await getCandidateSectionDetails(
    sectionId,
    assessmentId
  )
}


/**
 * Functions will update candidate section with current date and time and returns section details 
 * @param candidateSectionId
 * @returns sectionDetails
 */
export async function startCandidateSection(candidateSectionId: string) {
  return await candidateSectionStart(candidateSectionId as string)
}


/**
 * Functions will update candidate section with current date in endTime and time and success
 * @param assessmentId
 * @param sectionId
 * @returns success
 */
export async function endSection(assessmentId: string, sectionId: string) {
  return await endCurrentSection(
    assessmentId as string,
    sectionId as string
  )
}


/**
 * Functions will end the current section, get the next section object using order of section
 * it will also update the next section object in candidate test
 * then it will redirect to respective route 
 * @param assessmentID
 * @param order
 * @param sectionId
 * @returns redirect to next route
 */
export async function moveToNextSection({ assessmentId, order, sectionId }: { assessmentId: string, order: number, sectionId: string }) {
  const candidateTest = await getTestInstructions(
    assessmentId
  )

  if (sectionId) {
    await endSection(
      assessmentId as string,
      sectionId as string
    )
  }

  const nextSectionObject = await getSectionByOrder(
    candidateTest?.test.id as string,
    order + 1
  )
  console.log("heeiosfjk", nextSectionObject)


  await updateNextStep({
    assessmentId: assessmentId as string,
    nextRoute: 'section',
    isSection: true,
    currentSectionId: nextSectionObject?.id || null,
  })

  if (nextSectionObject) {
    console.log("asda", `/assessment/${assessmentId}/${nextSectionObject?.id}`)
    return redirect(
      `/assessment/${assessmentId}/${nextSectionObject?.id}`
    )
  } else {
    return redirect(`/assessment/${assessmentId}/end-assessment`)
  }
}


/**
 * Functions will ureturn the question details to display to candidate
 * @param questionId
 * @returns question details
 */
export async function getQuestion(questionId: string) {
  return await startAndGetQuestion(questionId as string)
}


/**
 * Functions will update the answer of current quetsion in db and also update the state of question 
 * also it will return the id of next question that will help in redirectiona
 * @param options
 * @param answers
 * @param sectionId
 * @param questionId
 * @param action
 * @returns nextQuestionId
 */
export async function saveAnswerSkipAndNext(options: Array<string>, answers: Array<string>, sectionId: string, questionId: string, action: string) {
  return await skipAnswerAndNextQuestion({
    selectedOptions:
      options,
    answers: answers,
    sectionId: sectionId,
    currentQuestionId: questionId,
    nextOrPrev: action,
  })
}


/**
 * Functions will end the assessment and redirectbto respective route
 * @param assessmentId
 * @param sectionId
 * @returns redirect to end assessment page
 */
export async function endCandidateAssessment(assessmentId: string, sectionId: string) {
  await endSection(
    assessmentId as string,
    sectionId as string
  )
  await endAssessment(assessmentId as string)
  return redirect(`/assessment/${assessmentId}/end-assessment`)
}