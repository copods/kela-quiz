import { useEffect, useState } from "react"

import { useFetcher, useLoaderData, useParams } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import DropdownField from "../common-components/Dropdown"
import AddWorkspace from "../workspace/AddWorkspace"

import MenuItems from "./MenuItems"

import ResetPassword from "~/components/settings/ResetPassword"
import Footer from "~/components/SideNavFooter"
import Header from "~/components/SideNavHeader"
import { actions } from "~/constants/action.constants"
import { routes } from "~/constants/route.constants"
import type { UserWorkspace } from "~/interface/Interface"

const SideNav = () => {
  const { t } = useTranslation()
  const param = useParams()
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false)
  const { workspaces = [], currentWorkspaceId } = useLoaderData()
  const [workspace, setWorkspace] = useState<string>(param.workspaceId!)
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
      navGuide: "Results",
      subItem: [
        {
          id: "group-by-tests",
          iconClass: "mdi:chart-box-outline",
          itemName: "commonConstants.results",
          itemRoute: `${routes.resultGroupTest}`,
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
      navGuide: "Assessments",
      subItem: [
        {
          id: "tests",
          iconClass: "carbon:result",
          itemName: "testsConstants.assessments",
          itemRoute: `${routes.assessments}`,
        },
        {
          id: "sections",
          iconClass: "ci:list-checklist-alt",
          itemName: "routeFiles.tests",
          itemRoute: `${routes.tests}`,
        },
      ],
    },
    {
      navGuide: "General",
      subItem: [
        {
          id: "members",
          iconClass: "mdi:account-group",
          itemName: "members.members",
          itemRoute: routes.members,
        },
        {
          id: "Settings",
          iconClass: "mdi:cog",
          itemName: "commonConstants.settings",
          itemRoute: routes.generalSettings,
        },
      ],
    },
  ]
  function switchWorkpace(val: string) {
    if (val !== t("sideNav.addWorkspace") && workspace !== currentWorkspaceId) {
      fetcher.submit(
        {
          workspaceId: val,
          action: actions.switchWorkspace,
        },
        { method: "post", action: `/${currentWorkspaceId}/settings` }
      )
    }
  }
  useEffect(() => {
    if (workspace) {
      switchWorkpace(workspace)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace])

  useEffect(() => {
    if (workspace) {
      setWorkspace(param.workspaceId!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.workspaceId])

  const [openResetPassModel, setOpenResetPassModel] = useState<boolean>(false)

  return (
    <>
      <div
        className="flex h-full flex-col justify-between overflow-auto p-5"
        id="sideNav"
      >
        <div>
          <div className="mb-9 px-1">
            <Header title={t("sideNav.sideNavHeading")} />
            <div className="mt-5">
              <DropdownField
                data={tempWorkspaces}
                displayKey="name"
                name="workspace"
                valueKey="workspaceId"
                value={workspace}
                setValue={setWorkspace}
                setOpen={setShowAddWorkspaceModal}
                actionName={t("sideNav.addWorkspace")}
                callToAction={true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8" id="sideNavMenu">
            {sideNavGuide.map((guide, index) => {
              return (
                <div className="10px flex flex-col gap-1" key={index}>
                  <p
                    id={`nav-guide-${guide.navGuide.toLowerCase()}`}
                    className="non-italic px-2 pb-2 text-left text-xs font-semibold text-gray-400"
                  >
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
          <Footer
            currentWorkspaceId={currentWorkspaceId}
            openResetPassModel={openResetPassModel}
            setOpenResetPassModel={setOpenResetPassModel}
          />
        </div>
      </div>
      <AddWorkspace
        showAddWorkspaceModal={showAddWorkspaceModal}
        setShowAddWorkspaceModal={setShowAddWorkspaceModal}
        setWorkspaceId={setWorkspace}
        currentWorkspaceId={currentWorkspaceId}
      />
      <ResetPassword
        openResetPassModel={openResetPassModel}
        setOpenResetPassModel={setOpenResetPassModel}
      />
    </>
  )
}

export default SideNav
