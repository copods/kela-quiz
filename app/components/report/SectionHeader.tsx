import { Text, View } from "@react-pdf/renderer"

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
  return (
    <View style={styles.sectionHeader}>
      <Text>{section.section.name}</Text>
      <View style={styles.sectionResult}>
        <Text style={styles.status}>
          {`Correct: ${sections[sectionIndex].SectionWiseResult[0].correctQuestion} | `}
        </Text>
        <Text style={styles.status}>
          {`Incorrect: ${sections[sectionIndex].SectionWiseResult[0].incorrect} | `}
        </Text>
        <Text style={styles.status}>
          {`Skipped: ${sections[sectionIndex].SectionWiseResult[0].skipped} | `}
        </Text>
        <Text style={styles.status}>
          {`Unanswered: ${sections[sectionIndex].SectionWiseResult[0].unanswered} | `}
        </Text>
        <Text style={styles.status}>
          {`Total: ${sections[sectionIndex].SectionWiseResult[0].totalQuestion}`}
        </Text>
      </View>
    </View>
  )
}
