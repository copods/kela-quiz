import { ClientOnly } from 'remix-utils'
import QuillEditor from '../QuillEditor.client'
import { useTranslation } from 'react-i18next'

const TestDetails = ({
  name,
  onNameChange,
  description,
  onDescriptionChange,
}: {
  name: string
  onNameChange: (e: string) => void
  description: string
  onDescriptionChange: (e: string) => void
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-lg bg-white p-6 shadow">
      <div>
        <label htmlFor="name" className="text-base font-medium text-gray-800">
          {t('commonConstants.name')}
        </label>
        <input
          tabIndex={0}
          type="text"
          id="name"
          name="testName"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="test-base mt-1 h-11 w-full rounded-lg border border-gray-200 px-3"
          placeholder={t('commonConstants.enterTestName')}
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="description"
          className="text-base font-medium text-gray-800"
        >
          {t('testsConstants.descriptionText')}
        </label>
        <div className="h-full pt-2 pb-4">
          <ClientOnly fallback={<div></div>}>
            {() => (
              <QuillEditor
                text={description}
                id="testDescription"
                fullAccess={true}
                quillPlaceholder={t('testsConstants.descriptionText')}
                onTextChange={(e) => {
                  if (e === '<p><br></p>') onDescriptionChange('')
                  else onDescriptionChange(e)
                }}
                aria-label={t('testsConstants.writeDescriptionOfTest')}
              />
            )}
          </ClientOnly>
        </div>
      </div>
    </div>
  )
}

export default TestDetails
