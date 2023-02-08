import { Icon } from "@iconify/react"
import { Form } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Button from "./common-components/Button"

import { useUser } from "~/utils"

function Footer() {
  const { t } = useTranslation()

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
        <Form action="/logout" method="post">
          <Button
            tabIndex={0}
            type="submit"
            id="logout-button"
            variant="secondary-solid"
            padding="px-2"
            title={t("commonConstants.logout")}
            buttonText={
              <Icon
                icon="mdi:logout-variant"
                className="relative h-5 w-5 text-gray-50"
              />
            }
          />
        </Form>
      </div>
    </div>
  )
}

export default Footer
