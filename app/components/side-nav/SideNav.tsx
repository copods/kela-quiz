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

type SideNavGuideItem = {
  navGuide: string
  subItem: {
    show: boolean
    id: string
    iconClass: string
    itemName: string
    itemRoute: string
  }[]
}

const SideNav = () => {
  const { t } = useTranslation()
  const param = useParams()
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false)
  const { workspaces = [], currentWorkspaceId, permission } = useLoaderData()
  const [workspace, setWorkspace] = useState<string>(param.workspaceId!)
  const fetcher = useFetcher()
  const tempWorkspaces = workspaces.map((userWorkspace: UserWorkspace) => {
    return { ...userWorkspace, ...userWorkspace.workspace }
  })

  const sideNavGuide: readonly SideNavGuideItem[] = [
    {
      navGuide: "Results",
      subItem: [
        {
          show: permission.results.read,
          id: "group-by-tests",
          iconClass: "mdi:chart-box-outline",
          itemName: "commonConstants.results",
          itemRoute: `${routes.resultGroupTest}`,
        },
      ],
    },
    {
      navGuide: "Assessments",
      subItem: [
        {
          show: permission.assessments.read,
          id: "tests",
          iconClass: "carbon:result",
          itemName: "testsConstants.assessments",
          itemRoute: `${routes.assessments}`,
        },
        {
          show: permission.tests.read,
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
          show: permission.member.read,
          id: "members",
          iconClass: "mdi:account-group",
          itemName: "members.members",
          itemRoute: routes.members,
        },
        {
          show: true,
          id: "Settings",
          iconClass: "mdi:cog",
          itemName: "commonConstants.settings",
          itemRoute: routes.workspaceSetting,
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
                callToAction={permission.workspace.create ? true : false}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8" id="sideNavMenu">
            {sideNavGuide.map((guide, index) => {
              return (
                guide.subItem.find((sub) => sub.show)?.show && (
                  <div className="10px flex flex-col gap-1" key={index}>
                    <p
                      id={`nav-guide-${guide.navGuide.toLowerCase()}`}
                      className="non-italic px-2 pb-2 text-left text-xs font-semibold text-gray-400"
                    >
                      {guide.navGuide}
                    </p>
                    {guide.subItem.map((item, index) => {
                      return (
                        item.show && (
                          <MenuItems
                            key={index}
                            id={item.id}
                            iconClass={item.iconClass}
                            itemName={t(item.itemName)}
                            itemRoute={item.itemRoute}
                            currentWorkspaceId={currentWorkspaceId}
                          />
                        )
                      )
                    })}
                  </div>
                )
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
