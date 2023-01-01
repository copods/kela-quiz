import { useLoaderData, useSubmit } from '@remix-run/react'
import { useState } from 'react'
import DialogWrapper from '../common-components/Dialog'

const Workspace = () => {
  const [open, setOpen] = useState(false)
  const submit = useSubmit()
  const loaderData = useLoaderData()
  const leaveWorkspace = () => {
    submit({ addSection: 'sectionAdd' }, { method: 'post' })
  }
  return (
    <div className="flex justify-center p-18">
      {loaderData?.ownersWorkspace?.id !== loaderData?.currentWorkspaceId ? (
        <div>
          <button onClick={() => setOpen(!open)} className="text-red-500">
            Leave Workspace
          </button>
        </div>
      ) : null}
      <DialogWrapper open={open} setOpen={setOpen} header={true}>
        <div className="flex flex-col">
          <div>
            <p>Are you sure you want to leave workspace?</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setOpen(!open)}>Cancel</button>
            <button onClick={() => leaveWorkspace()} className="text-red-500">
              Leave
            </button>
          </div>
        </div>
      </DialogWrapper>
    </div>
  )
}
export default Workspace
