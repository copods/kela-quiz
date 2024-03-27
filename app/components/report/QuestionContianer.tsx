import { Text, View } from "@react-pdf/renderer"
import { Html } from "react-pdf-html"

import Divider from "../common-components/divider"

import { styles } from "./styles"

import { QuestionTypes } from "~/interface/Interface"

export const QuestionContianer = ({
  q,
  questionIndex,
}: {
  q: any
  questionIndex: number
}) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionMainContainer}>
        <View style={styles.questionContentContainer}>
          <Text>Question {questionIndex + 1} </Text>
          {q.question.questionType.value === QuestionTypes.text ? (
            <View style={styles.questionContentTypeContainer}>
              <Text>TEXT</Text>
            </View>
          ) : q.question.questionType.value === QuestionTypes.multipleChoice ? (
            <View style={styles.questionContentTypeContainer}>
              <Text>MCQ</Text>
            </View>
          ) : (
            q.question.questionType.value === QuestionTypes.singleChoice && (
              <View style={styles.questionContentTypeContainer}>
                <Text>MSQ</Text>
              </View>
            )
          )}
        </View>
        <Html style={styles.questionText}>{q.question.question}</Html>
      </View>
      <Divider height="100%"></Divider>
      <View style={styles.questionMainContainer}>
        <View style={styles.questionMainContainer}>
          <View style={styles.answerContentContainer}>
            <Text> Given Answer: </Text>
            <View
              style={
                q.status === "ANSWERED" &&
                q.selectedOptions.some((o: any) =>
                  q.question.correctOptions.some((co: any) => co.id === o.id)
                )
                  ? styles.correct
                  : styles.incorrect
              }
            >
              <Text>
                {q.status === "ANSWERED" &&
                q.selectedOptions.some((o: any) =>
                  q.question.correctOptions.some((co: any) => co.id === o.id)
                )
                  ? "Correct"
                  : "Incorrect"}
              </Text>
            </View>
          </View>
          <Html style={styles.answerText}>
            {q.selectedOptions.map((o: any) => o.option).join(", ")}
          </Html>
          {q.status === "ANSWERED" &&
            !q.selectedOptions.some((o: any) =>
              q.question.correctOptions.some((co: any) => co.id === o.id)
            ) && (
              <View style={styles.questionMainContainer}>
                <Text
                  style={{
                    color: styles.correct.color,
                  }}
                >
                  Correct Answer:
                </Text>
                <Html style={styles.answerText}>
                  {q.question.correctOptions
                    .map((co: any) => co.option)
                    .join(", ")}
                </Html>
              </View>
            )}
        </View>
      </View>
    </View>
  )
}
