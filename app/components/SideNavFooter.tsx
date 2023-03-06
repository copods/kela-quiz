import { useState } from "react"

import { useFetcher, useNavigate } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import ListActionMenu from "../components/ListActionMenu"

import { routes } from "~/constants/route.constants"
import { useUser } from "~/utils"

function Footer({
  currentWorkspaceId,
  openResetPassModel,
  setOpenResetPassModel,
}: {
  currentWorkspaceId: string
  openResetPassModel: boolean
  setOpenResetPassModel: (e: boolean) => void
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const fetcher = useFetcher()

  const [menuListOpen, setmenuListOpen] = useState<boolean>(false)
  const [menuOpeningClosing, setMenuOpeningClosing] = useState<boolean>(false)

  const menuItemsDetailsList = [
    {
      id: "my-profile",
      menuListText: t("commonConstants.myProfile"),
      handleItemAction: () =>
        navigate(`/${currentWorkspaceId}${routes.myProfile}`),
    },
    {
      id: "change-password",
      menuListText: t("commonConstants.changePassword"),
      handleItemAction: () => {
        setOpenResetPassModel(!openResetPassModel)
      },
    },
    {
      id: "logout",
      menuListText: t("commonConstants.logout"),
      handleItemAction: () =>
        fetcher.submit({}, { method: "post", action: "/logout" }),
    },
  ]

  const user = useUser()
  return (
    <div>
      <hr className="mb-3 mt-3 border border-solid border-gray-300"></hr>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span
              id="sidenav-user-avatar"
              className="text-lg font-medium text-white"
            >
              {user.firstName.slice(0, 1)}
              {user.lastName.slice(0, 1)}
            </span>
          </div>
          <div className="flex-col gap-2">
            <p
              id="sidenav-username"
              className="w-32 truncate text-xs font-semibold text-gray-900"
            >
              {user.firstName} {user.lastName}
            </p>
            <p
              id="sidenav-user-email"
              className="w-32 truncate text-xs text-gray-500"
            >
              {user.email}
            </p>
          </div>
        </div>
        <ListActionMenu
          menuIcon={
            menuOpeningClosing
              ? "ic:baseline-arrow-drop-up"
              : "gridicons:dropdown"
          }
          menuOpeningClosing={menuOpeningClosing}
          setMenuOpeningClosing={setMenuOpeningClosing}
          onItemClick={setmenuListOpen}
          open={menuListOpen}
          aria-label={t("testTableItem.menu")}
          id={"sidenav-footer-menu"}
          menuDetails={menuItemsDetailsList}
          customClasses={{
            item: "text-gray-primary text-sm w-40",
            itemsContainer: "border border-gray-300 shadow-md p-1",
          }}
        />
      </div>
    </div>
  )
}

export default Footer
