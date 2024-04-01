import ReactPDF, { Page, Text, View, Document } from "@react-pdf/renderer"

import { QuestionContainer } from "./QuestionContainer"
import { SectionHeader } from "./SectionHeader"
import { styles } from "./styles"

import type {
  SectionDetailsType,
  SectionInCandidateTest,
} from "~/interface/Interface"

export type TemplateDataType = {
  candidateName: string
  sections: SectionInCandidateTest[]
  sectionsDetails: SectionDetailsType[]
}

const PDFDocument = ({ templateData }: { templateData: TemplateDataType }) => {
  const { candidateName, sections, sectionsDetails } = templateData
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

export default async (templateData: TemplateDataType) => {
  return await ReactPDF.renderToStream(
    <PDFDocument templateData={templateData} />
  )
}
