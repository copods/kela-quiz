import { useNavigate } from '@remix-run/react'
import { Icon } from '@iconify/react'
import { useLoaderData } from '@remix-run/react'
import CandidatesList from './CandidatesList'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CandidateListOfTest = () => {
  const { candidatesOfTest, currentWorkspaceId } = useLoaderData()
  const [searchText, setSearchText] = useState('')
  console.log(currentWorkspaceId, 'currentWorkspaceId')
  let navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <div id="test-details" className="flex h-full flex-col gap-4 ">
      <header className="border-b border-solid border-slate-300">
        <div className="flex gap-2 pb-6">
          <div
            onClick={() =>
              navigate(`/${currentWorkspaceId}/results/groupByTests`)
            }
            role={'button'}
            tabIndex={0}
            className="flex items-center gap-4 "
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                navigate(`/${currentWorkspaceId}/results/groupByTests`)
            }}
          >
            <Icon
              className="text-3xl font-semibold text-gray-900"
              id="back-button"
              icon="mdi:arrow-left"
            />
          </div>
          <span className="text-3xl font-semibold text-gray-900" id="title">
            {candidatesOfTest?.name} dd
          </span>
        </div>
      </header>
      <div className="relative flex items-center">
        <Icon
          id="ascend"
          icon="charm:search"
          className="bg-light-200 absolute left-3 text-base text-gray-400"
        />
        <input
          tabIndex={0}
          id="section-search"
          type="text"
          name="search"
          placeholder={t('testsConstants.searchCandidate')}
          title={t('testsConstants.searchCandidate')}
          className="h-9 w-48 rounded-lg border px-5 pl-8 text-sm focus:outline-dotted"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <CandidatesList searchText={searchText} />
    </div>
  )
}

export default CandidateListOfTest
