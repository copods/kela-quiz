import { Switch } from '@headlessui/react'

export default function Toggle({
  toggle,
  onToggleChange,
}: {
  toggle: boolean
  onToggleChange: (e: boolean) => void
}) {
  return (
    <div className='flex' >
      <Switch
        checked={toggle}
        tabIndex={0}
        role='Check Order'
        onChange={onToggleChange}
        className={`${
          toggle
            ? 'border-blue-900 bg-blue-900'
            : 'border-slate-300 bg-slate-300'
        }
          relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}

      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${toggle ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
