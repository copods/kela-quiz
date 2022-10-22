import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, getWorkspaceId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { routes } from '~/constants/route.constants'
import { getUserWorkspaces } from '~/models/workspace.server'
import { json } from '@remix-run/node'
import { Outlet, useLocation, useNavigate } from '@remix-run/react'
import SettingsTabs from '~/components/settings/SettingTab'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export type LoaderData = {
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: Awaited<ReturnType<typeof getWorkspaceId>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  return json<LoaderData>({
    workspaces,
    currentWorkspaceId,
  })
}

export default function Settings() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/settings') return navigate('/settings/general')
  }, [navigate, location.pathname])
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {t('commonConstants.settings')}
          </h1>
        </div>
        <SettingsTabs />
        <Outlet />
      </div>
    </AdminLayout>
  )
}
