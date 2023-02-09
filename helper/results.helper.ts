import type { CorrectAnswer } from "~/interface/Interface"

export function areEqualArrays(
  textAnswer: CorrectAnswer[],
  correctAnswersArray: string[]
) {
  let textAnswerArrayLength = textAnswer.length
  let correctAnswersArrayLength = correctAnswersArray.length

  // If lengths of array are not equal means
  // Answers are not equal
  if (textAnswerArrayLength != correctAnswersArrayLength) return false

  // Sort both arrays
  textAnswer.sort()
  correctAnswersArray.sort()

  // Linearly compare elements
  for (let i = 0; i < textAnswerArrayLength; i++)
    if (textAnswer[i] != (correctAnswersArray[i] as unknown as CorrectAnswer))
      return false

  // If all elements were same.
  return true
}
