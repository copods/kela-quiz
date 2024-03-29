import ReactPDF, { Page, Text, View, Document } from "@react-pdf/renderer"

import { QuestionContainer } from "./QuestionContainer"
import { SectionHeader } from "./SectionHeader"
import { styles } from "./styles"

import type {
  CandidateResult,
  SectionDetailsType,
  SectionInCandidateTest,
} from "~/interface/Interface"

export type TemplateData = {
  candidateName: string
  candidateResult: CandidateResult
  sections: SectionInCandidateTest[]
  sectionsDetails: SectionDetailsType[]
}

const PDFDocument = ({
  candidateName,
  sections,
  sectionsDetails,
}: TemplateData) => {
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
              {section.questions.map((question, questionIndex) => (
                <QuestionContainer
                  question={question}
                  index={questionIndex}
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

export default async (templateData: TemplateData) => {
  return await ReactPDF.renderToStream(<PDFDocument {...templateData} />)
}
