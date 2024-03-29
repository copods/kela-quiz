import { Text, View } from "@react-pdf/renderer"
import { useTranslation } from "react-i18next"

import { styles } from "./styles"

import type {
  SectionDetailsType,
  SectionInCandidateTest,
} from "~/interface/Interface"

export const SectionHeader = ({
  section,
  sections,
  sectionIndex,
}: {
  section: SectionDetailsType
  sections: SectionInCandidateTest[]
  sectionIndex: number
}) => {
  const { t } = useTranslation()

  const sectionWiseResult = sections[sectionIndex].SectionWiseResult[0]

  return (
    <View style={styles.sectionHeader}>
      <Text>{section.section.name}</Text>
      <View style={styles.sectionResult}>
        <Text style={styles.status}>
          {`${t("resultConstants.correct")}: ${
            sectionWiseResult.correctQuestion
          } | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.incorrect")}: ${
            sectionWiseResult.incorrect
          } | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.skipped")}: ${sectionWiseResult.skipped} | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.unanswered")}: ${
            sectionWiseResult.unanswered
          } | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.total")}: ${sectionWiseResult.totalQuestion}`}
        </Text>
      </View>
    </View>
  )
}
