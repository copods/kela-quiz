import { Icon } from '@iconify/react'
import { Link, useLoaderData } from '@remix-run/react'

import TestPreview from './CreateTestPreview'
const TestDetails = () => {
  const { testPreview } = useLoaderData()

  return (
    <div id="test-details" className="h-full">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300">
          <div className="flex gap-2 pb-6">
            <Link
              to={'/tests'}
              className="testPreviewBackButton flex items-center gap-4 "
              tabIndex={0}
            >
              <Icon
                className="text-3xl font-semibold leading-9 text-gray-900"
                id="backButton"
                icon="mdi:arrow-left"
              ></Icon>
            </Link>
            <span
              className="text-3xl font-semibold leading-9 text-gray-900"
              id="title"
            >
              {testPreview.name}
            </span>
          </div>
        </div>
      </header>
      <div className="max-h-83 overflow-scroll rounded-md shadow-table">
        <TestPreview
          name={testPreview.name}
          description={testPreview.description}
          selectedSections={testPreview.sections}
          onSelectedSectionChange={function (e: any): void {
            throw new Error('Function not implemented.')
          }}
          isPreviewEditable={false}
        />
      </div>
    </div>
  )
}
export default TestDetails
