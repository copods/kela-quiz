import { Outlet } from '@remix-run/react'

export default function SectionQuestionPage({ section }: { section: any }) {
  return (
    <div className="flex h-full flex-col gap-9">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          {section.section.name}
        </h1>
        <div className="text-lg font-medium text-gray-800">Time: 04:32</div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
