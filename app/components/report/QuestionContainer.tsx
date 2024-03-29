import { Text, View } from "@react-pdf/renderer"
import { useTranslation } from "react-i18next"
import { Html } from "react-pdf-html"

import Divider from "../common-components/divider"

import { styles } from "./styles"

import { QuestionStatus, resultConstants } from "~/constants/common.constants"
import { QuestionTypes } from "~/interface/Interface"
import type { SectionQuestion } from "~/interface/Interface"

export function QuestionContainer({
  question,
  key,
}: {
  question: SectionQuestion
  key: number
}) {
  const { t } = useTranslation()

  type QuestionTypeToTextMap = {
    [key in QuestionTypes]: string
  }

  const questionTypeToText: QuestionTypeToTextMap = {
    [QuestionTypes.text]: t("resultConstants.text"),
    [QuestionTypes.multipleChoice]: t("sectionsConstants.mcq"),
    [QuestionTypes.singleChoice]: t("sectionsConstants.msq"),
  }

  const isAnsweredCorrectly =
    question.status === QuestionStatus.answered &&
    question.selectedOptions.some((option) =>
      question.question.correctOptions.some(
        (correctOption) => correctOption.id === option.id
      )
    )

  const answerFeedbackText = isAnsweredCorrectly
    ? resultConstants.correct
    : resultConstants.incorrect
  const answerFeedbackStyle = isAnsweredCorrectly
    ? styles.correct
    : styles.incorrect

  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionMainContainer}>
        <View style={styles.questionContentContainer}>
          <Text>{`${t("candidateExamConstants.question")} ${key + 1}`}</Text>
          <View style={styles.questionContentTypeContainer}>
            <Text>
              {
                questionTypeToText[
                  question.question.questionType.value as QuestionTypes
                ]
              }
            </Text>
          </View>
        </View>
        <Html style={styles.questionText}>{question.question.question}</Html>
      </View>
      <Divider height="100%"></Divider>
      <View style={styles.questionMainContainer}>
        <View style={styles.answerContentContainer}>
          <Text>{t("resultConstants.givenAnswer")}:</Text>
          <View style={answerFeedbackStyle}>
            <Text>
              {t(`resultConstants.${answerFeedbackText.toLowerCase()}`)}
            </Text>
          </View>
        </View>
        <Html style={styles.answerText}>
          {question.selectedOptions.map((option) => option.option).join(", ")}
        </Html>
        {!isAnsweredCorrectly && (
          <View style={styles.questionMainContainer}>
            <Text style={{ color: styles.correct.color }}>
              {t("resultConstants.correctAnswer")}:
            </Text>
            <Html style={styles.answerText}>
              {question.question.correctOptions
                .map((correctOption) => correctOption.option)
                .join(", ")}
            </Html>
          </View>
        )}
      </View>
    </View>
  )
}
