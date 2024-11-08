import { Icon } from "@iconify/react"
import { Link, useLoaderData } from "@remix-run/react"

import TestPreview from "./CreateTestPreview"

import type { loader } from "~/routes/$workspaceId.assessments.$testId"
const TestDetails = () => {
  const { testPreview, currentWorkspaceId } = useLoaderData<typeof loader>()
  const loaderData = useLoaderData<typeof loader>()
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
      <div className="max-h-83 shadow-base overflow-scroll rounded-md">
        <TestPreview
          testId={testPreview.id}
          name={testPreview.name}
          description={testPreview.description}
          selectedSections={testPreview.sections}
          isPreviewEditable={false}
          showInviteAction={true}
          loaderDataPermissionInviteCandidateCreate={
            loaderData.permission.invite_candidate.create
          }
        />
      </div>
    </div>
  )
}
export default TestDetails
