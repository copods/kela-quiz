import { Icon } from '@iconify/react'
import { Link, useActionData, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import TestPreview from './CreateTestPreview'
const TestDetails = () => {
  const { testPreview, currentWorkspaceId } = useLoaderData()
  const action = useActionData()
  const { t } = useTranslation()

  useEffect(() => {
    if (action) {
      if (action.errors?.statusCode === 400) {
        toast.error(t(action.errors?.message), {
          toastId: action.errors?.message,
        })
      }
    }
  }, [action, t])

  return (
    <div id="test-details" className="h-full">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300">
          <div className="flex gap-2 pb-6">
            <Link
              to={`/${currentWorkspaceId}/assessments`}
              className="testPreviewBackButton flex items-center gap-4 "
              tabIndex={0}
            >
              <Icon
                className="text-3xl font-semibold text-gray-900"
                id="back-button"
                icon="mdi:arrow-left"
              />
            </Link>
            <span className="text-3xl font-semibold text-gray-900" id="title">
              {testPreview.name}
            </span>
          </div>
        </div>
      </header>
      <div className="max-h-83 overflow-scroll rounded-md shadow-base">
        <TestPreview
          testId={testPreview.id}
          name={testPreview.name}
          description={testPreview.description}
          selectedSections={testPreview.sections}
          onSelectedSectionChange={function (e: any): void {
            throw new Error('Function not implemented.')
          }}
          isPreviewEditable={false}
          showInviteAction={true}
        />
      </div>
    </div>
  )
}
export default TestDetails
