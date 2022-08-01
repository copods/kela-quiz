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
    <div>
      <header className="mb-8  ">
        <div>
          <BreadCrumb data={breadCrumbArray} />

          <div className="py-5">
            <Link to={'/tests'} className="flex items-center gap-4 ">
              <Icon icon="mdi:arrow-left"></Icon>
              <span id="backButton">Back to Tests</span>
            </Link>
          </div>
        </div>
        <div>
          <h1
            id="title"
            className="border-t-[1px] border-solid border-slate-300 pt-9 pb-3 text-3xl font-bold leading-9 "
          >
            {testPreview.name}
          </h1>
        </div>
      </header>
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
  )
}
export default TestDetails
