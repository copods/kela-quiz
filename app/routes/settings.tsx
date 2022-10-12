import AdminLayout from '~/components/layouts/AdminLayout'
import { Outlet } from '@remix-run/react'
import SettingsTabs from '~/components/settings/SettingTab'

export default function Settings() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <SettingsTabs />
        <Outlet />
      </div>
    </AdminLayout>
  )
}
