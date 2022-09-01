import { Switch } from '@headlessui/react'
import { commonConstants } from '~/constants/common.constants'

export default function Toggle({
  toggle,
  onToggleChange,
}: {
  toggle: boolean
  onToggleChange: (e: boolean) => void
}) {
  return (
      <Switch
        checked={toggle}
        tabIndex={0}
        role={commonConstants.checkOrder}
        onChange={onToggleChange}
        className={`${
          toggle
            ? 'border-blue-900 bg-blue-900'
            : 'border-slate-300 bg-slate-300'
        }
          relative inline-flex h-7 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}

      >
        <span className="sr-only">{commonConstants.useSetting}</span>
        <span
          aria-hidden="true"
          className={`${toggle ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
  )
}
