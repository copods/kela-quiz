import { Icon } from '@iconify/react'
import { Link, useLoaderData } from '@remix-run/react'
import BreadCrumb from '../BreadCrumb'
import TestPreview from './CreateTestPreview'
const TestDetails = () => {
  const { testPreview } = useLoaderData()
  const breadCrumbArray = [
    {
      tabName: 'Tests',
      route: '/tests',
    },
    {
      tabName: testPreview.name,
      route: '',
    },
  ]
  return (
    <div id="test-details" className="h-full">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300">
          <BreadCrumb data={breadCrumbArray} />

          <div className="flex gap-2 py-5">
            <Link to={'/tests'} className="flex items-center gap-4 ">
              <Icon id="backButton" icon="mdi:arrow-left"></Icon>
            </Link>
            <span id="title">{testPreview.name}</span>
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
