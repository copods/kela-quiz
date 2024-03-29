import { Text, View } from "@react-pdf/renderer"
import { useTranslation } from "react-i18next"
import { Html } from "react-pdf-html"

import Divider from "../common-components/divider"

import { styles } from "./styles"

import type { SectionQuestion } from "~/interface/Interface"
import { QuestionTypes } from "~/interface/Interface"

export const QuestionContianer = ({
  q,
  questionIndex,
}: {
  q: SectionQuestion
  questionIndex: number
}) => {
  const { t } = useTranslation()
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionMainContainer}>
        <View style={styles.questionContentContainer}>
          <Text>{`${t("candidateExamConstants.question")} ${
            questionIndex + 1
          }`}</Text>
          {q.question.questionType.value === QuestionTypes.text ? (
            <View style={styles.questionContentTypeContainer}>
              <Text>{t("resultConstants.text")}</Text>
            </View>
          ) : q.question.questionType.value === QuestionTypes.multipleChoice ? (
            <View style={styles.questionContentTypeContainer}>
              <Text>{t("sectionsConstants.mcq")}</Text>
            </View>
          ) : (
            q.question.questionType.value === QuestionTypes.singleChoice && (
              <View style={styles.questionContentTypeContainer}>
                <Text>{t("sectionsConstants.msq")}</Text>
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
            <Text> {t("resultConstants.givenAnswer")}: </Text>
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
                  {t("resultConstants.correctAnswer")}:
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
