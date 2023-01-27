export function areEqualArrays(textAnswer: any, correctAnswersArray: any) {
  let N = textAnswer.length
  let M = correctAnswersArray.length

  // If lengths of array are not equal means
  // array are not equal
  if (N != M) return false

  // Sort both arrays
  textAnswer.sort()
  correctAnswersArray.sort()

  // Linearly compare elements
  for (let i = 0; i < N; i++)
    if (textAnswer[i] != correctAnswersArray[i]) return false

  // If all elements were same.
  return true
}
