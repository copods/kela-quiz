import { useNavigate, Form, useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import logo from "../../../public/assets/member-invitation.svg"
import Button from "../common-components/Button"

import { routes } from "~/constants/route.constants"

const JoinWorkspace = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  const workspcaceInvitationData = useLoaderData()
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 rounded-lg">
      <div className="rounded-lg border-solid border-gray-50 bg-white px-14 py-10 shadow-sm">
        <div className="flex max-w-554 flex-col items-center gap-10">
          <img className="h-24 w-32" src={logo} alt="" />
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center justify-center gap-4 text-2xl">
              <span
                tabIndex={0}
                role={"rowheader"}
                aria-label="join workspace heading"
                className="break-word text-2xl font-bold"
              >
                {t("members.workspaceInvitation")}
              </span>
              {workspcaceInvitationData === "joined" ? (
                <span className="text-center text-primary">
                  {t("members.alreadyJoinedWorkspace")}
                </span>
              ) : workspcaceInvitationData?.loginWithWrongId ? (
                <span className="text-center text-base text-gray-500">
                  {t("members.loggedinFromAnotherAccount")}
                </span>
              ) : null}
            </div>
            <div className="flex justify-center gap-8">
              {workspcaceInvitationData === "joined" ? (
                <Button
                  tabIndex={0}
                  title={t("commonConstants.gotoDashboard")}
                  id="go-to-dashboard"
                  buttonText={t("commonConstants.gotoDashboard")}
                  name="go-to-workspace"
                  variant="primary-outlined"
                  value={"reject"}
                  className="h-9 px-24"
                  onClick={() =>
                    navigate(
                      `/sign-in??cameFrom=join&id=${workspcaceInvitationData.inviteId}`
                    )
                  }
                />
              ) : workspcaceInvitationData?.loginWithWrongId ? (
                <div className="flex gap-8">
                  <Button
                    tabIndex={0}
                    title={t("commonConstants.gotoDashboard")}
                    id="go-to-dashboard"
                    buttonText={t("commonConstants.gotoDashboard")}
                    name="go-to-workspace"
                    variant="primary-outlined"
                    value={"reject"}
                    className="px-9 py-3"
                    onClick={() => navigate(`${routes.signIn}`)}
                  />
                  <Form
                    action={`/logout??cameFrom=join&id=${workspcaceInvitationData.invitedMember.id}`}
                    method="post"
                  >
                    <Button
                      tabIndex={0}
                      title={t("commonConstants.switchAccount")}
                      id={t("commonConstants.switchAccount")}
                      buttonText={t("commonConstants.switchAccount")}
                      name="logout"
                      variant="primary-solid"
                      value={t("commonConstants.switchAccount")}
                      className="px-9 py-3"
                    />
                  </Form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default JoinWorkspace
