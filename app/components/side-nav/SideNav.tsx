import MenuItems from './MenuItems'
import Header from '~/components/SideNavHeader'
import Footer from '~/components/SideNavFooter'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import DropdownField from '../form/Dropdown'
import { useFetcher, useLoaderData } from '@remix-run/react'
import type { UserWorkspace } from '~/interface/Interface'
import AddWorkspace from '../workspace/AddWorkspace'
import { useEffect, useState } from 'react'
import { actions } from '~/constants/action.constants'

const SideNav = () => {
  const { t } = useTranslation()
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false)
  const { workspaces = [], currentWorkspaceId, firstSection } = useLoaderData()
  const [workspace, setWorkspace] = useState<string>(currentWorkspaceId)
  const fetcher = useFetcher()
  const tempWorkspaces = workspaces.map((userWorkspace: UserWorkspace) => {
    return { ...userWorkspace, ...userWorkspace.workspace }
  })
  const sideNavGuide = [
    // {
    //   navGuide: 'Main Menu',
    //   subItem: [
    //     {
    //       id: 'Dashboard',
    //       iconClass: 'mdi:view-dashboard',
    //       itemName: 'Dashboard',
    //       itemRoute: routes.dashboard,
    //     },
    //   ],
    // },
    {
      navGuide: 'Results',
      subItem: [
        {
          id: 'group-by-tests',
          iconClass: 'mdi:chart-box-outline',
          itemName: 'commonConstants.results',
          itemRoute: routes.resultGroupTest,
        },
        // {
        //   id: 'Group_By_Candidate',
        //   iconClass: 'mdi:chart-box-outline',
        //   itemName: commonConstants.groupByCandidate,
        //   itemRoute: 'groupByCandidate',
        // },
      ],
    },
    {
      navGuide: 'Assessments',
      subItem: [
        {
          id: 'tests',
          iconClass: 'carbon:result',
          itemName: 'testsConstants.assessments',
          itemRoute: routes.assessments,
        },
        {
          id: 'sections',
          iconClass: 'ci:list-checklist-alt',
          itemName: 'routeFiles.tests',
          itemRoute:
            firstSection !== undefined
              ? `${routes.tests}/${firstSection}?filter=%7B"orderBy"%3A%7B"createdAt"%3A"desc"%7D%7D`
              : `${routes.tests}`,
        },
      ],
    },
    {
      navGuide: 'General',
      subItem: [
        {
          id: 'members',
          iconClass: 'mdi:account-group',
          itemName: 'members.members',
          itemRoute: routes.members,
        },
        {
          id: 'Settings',
          iconClass: 'mdi:cog',
          itemName: 'commonConstants.settings',
          itemRoute: routes.settings,
        },
      ],
    },
  ]

  function switchWorkpace(val: string) {
    if (val !== t('sideNav.addWorkspace') && workspace !== currentWorkspaceId) {
      fetcher.submit(
        {
          workspaceId: val,
          action: actions.switchWorkspace,
        },
        { method: 'post', action: `/${currentWorkspaceId}/settings` }
      )
    }
  }
  useEffect(() => {
    if (workspace) {
      switchWorkpace(workspace)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace])

  return (
    <>
      <div
        className="flex h-full flex-col justify-between overflow-auto p-5"
        id="sideNav"
      >
        <div>
          <div className="mb-9 px-1">
            <Header title={t('sideNav.sideNavHeading')} />
            <div className="mt-5">
              <DropdownField
                data={tempWorkspaces}
                displayKey="name"
                name="workspace"
                valueKey="workspaceId"
                value={workspace}
                setValue={setWorkspace}
                setOpen={setShowAddWorkspaceModal}
                actionName={t('sideNav.addWorkspace')}
                callToAction={true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8" id="sideNavMenu">
            {sideNavGuide.map((guide, index) => {
              return (
                <div className="10px flex flex-col gap-1" key={index}>
                  <p className="non-italic px-2 pb-2 text-left text-xs font-semibold text-gray-400">
                    {guide.navGuide}
                  </p>
                  {guide.subItem.map((item, index) => {
                    return (
                      <MenuItems
                        key={index}
                        id={item.id}
                        iconClass={item.iconClass}
                        itemName={t(item.itemName)}
                        itemRoute={item.itemRoute}
                        currentWorkspaceId={currentWorkspaceId}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="justify-end">
          <Footer />
        </div>
      </div>
      <AddWorkspace
        showAddWorkspaceModal={showAddWorkspaceModal}
        setShowAddWorkspaceModal={setShowAddWorkspaceModal}
        setWorkspaceId={setWorkspace}
        currentWorkspaceId={currentWorkspaceId}
      />
    </>
  )
}

export default SideNav
