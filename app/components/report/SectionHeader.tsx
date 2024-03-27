import { Text, View } from "@react-pdf/renderer"
import { useTranslation } from "react-i18next"

import { styles } from "./styles"

export const SectionHeader = ({
  section,
  sections,
  sectionIndex,
}: {
  section: any
  sections: any
  sectionIndex: number
}) => {
  const { t } = useTranslation()
  return (
    <View style={styles.sectionHeader}>
      <Text>{section.section.name}</Text>
      <View style={styles.sectionResult}>
        <Text style={styles.status}>
          {`${t("resultConstants.correct")}: ${
            sections[sectionIndex].SectionWiseResult[0].correctQuestion
          } | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.incorrect")}: ${
            sections[sectionIndex].SectionWiseResult[0].incorrect
          } | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.skipped")}: ${
            sections[sectionIndex].SectionWiseResult[0].skipped
          } | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.unanswered")}: ${
            sections[sectionIndex].SectionWiseResult[0].unanswered
          } | `}
        </Text>
        <Text style={styles.status}>
          {`${t("resultConstants.total")}: ${
            sections[sectionIndex].SectionWiseResult[0].totalQuestion
          }`}
        </Text>
      </View>
    </View>
  )
}
