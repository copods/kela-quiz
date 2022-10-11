// import { useNavigate } from '@remix-run/react'
import { useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import TabComponent from '../TabsComponent'
import General from './GeneralSettings'
import Workspace from './Workspace'

const SettingsTabs = ({
  actionStatus,
  setActionStatus,
  validationError,
  passNotMatched,
}: {
  actionStatus: boolean
  setActionStatus: (e: boolean) => void
  validationError?: string
  passNotMatched?: string
}) => {
  const tabs = [
    {
      id: 0,
      name: 'General',
      route: 'general',
    },
    {
      id: 1,
      name: 'Workspace',
      route: 'workspace',
    },
  ]
  const [currentTab, setCurrentTab] = useState(0)
  let navigate = useNavigate()
  useEffect(() => {
    navigate(tabs[0].route)
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-5">
        <TabComponent
          tabs={tabs}
          isDisabled={false}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        {currentTab === tabs[0].id ? (
          <General
            validationError={validationError}
            passNotMatched={passNotMatched}
            actionStatus={actionStatus}
            setActionStatus={setActionStatus}
          />
        ) : (
          currentTab === tabs[1].id && <Workspace />
        )}
      </div>
    </div>
  )
}
export default SettingsTabs
