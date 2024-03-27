import ReactPDF, { Page, Text, View, Document } from "@react-pdf/renderer"

import { QuestionContianer } from "./QuestionContianer"
import { SectionHeader } from "./SectionHeader"
import { styles } from "./styles"

export type TemplateData = {
  candidateName: string
  candidateResult: {
    totalQuestion: number
    correctQuestion: number
    unanswered: number
    incorrect: number
    skipped: number
  }
  sections: any
  sectionsDetails: any[]
}

const PDF = ({ data }: { data: TemplateData }) => {
  const { candidateName, sections, sectionsDetails } = data

  return (
    <Document>
      <Page size="A3" orientation="landscape" style={styles.page} wrap={false}>
        <View style={styles.header}>
          <Text style={styles.candidateName}>{candidateName}</Text>
        </View>
        {sectionsDetails.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <SectionHeader
              section={section}
              sections={sections}
              sectionIndex={sectionIndex}
            />
            <View style={styles.sectionContent}>
              {section.questions.map((q: any, questionIndex: number) => (
                <QuestionContianer
                  q={q}
                  questionIndex={questionIndex}
                  key={questionIndex}
                />
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default async (data: TemplateData) => {
  return await ReactPDF.renderToStream(<PDF {...{ data }} />)
}
