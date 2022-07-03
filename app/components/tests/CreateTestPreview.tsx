import type { TestSections } from "../Interface";

const TestPreview = ({ sections, name, description }: { sections: Array<TestSections>, name: string, description: string }) => {

  return (
    <div>
      <h1>{name}</h1>
      <h3>{description}</h3>
      {sections
        .filter(section => {
          return section.isSelected
        })
        .map(section => {
          return (
            <div key={section.id}>
              <h1>{section.name}</h1>
              <p>{section.totalQuestions}</p>
              <p>{section.time}</p>
            </div>
          )
        })}
    </div>
  )
}

export default TestPreview