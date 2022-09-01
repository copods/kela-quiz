import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { sectionsConstants } from '~/constants/common.constants'

function DropdownField({
  data,
  displayKey,
  valueKey,
  value,
  setValue,
}: {
  data: Array<any>
  displayKey: string
  valueKey: string
  value: any
  setValue: (e: any) => void
}) {
  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
  }
  const getName = (val: string) => {
    for (let d of data) {
      if (d[valueKey] === val) {
        return d[displayKey]
      }
    }
  }

  return (
    <Listbox value={value} onChange={setValue}>
      {({ open }) => (
        <>
          <div className="dropdown relative w-48" id="dropdown" title={sectionsConstants.dropdown} aria-label={sectionsConstants.dropdown}>
            <Listbox.Button
              id="dropdownButton"
              className="dropdownButton relative h-11 w-full cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-3 text-left shadow-sm sm:text-sm"
            >
              <span className="flex items-center">
                <span className="block truncate">{getName(value)}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <Icon icon="ic:round-keyboard-arrow-down" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((el) => (
                  <Listbox.Option
                    key={el[valueKey]}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-primary text-white' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 px-3'
                      )
                    }
                    value={el[valueKey]}
                  >
                    {({ selected, active }) => (
                      <>
                        <div
                          title={el[displayKey]}
                          className="flex items-center"
                        >
                          <span
                            className={classNames(
                              selected
                                ? 'font-semibold'
                                : 'not-selected font-normal',
                              'dropdown-option block truncate'
                            )}
                            id="option"
                          >
                            {el[displayKey]}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <Icon
                              icon="ic:round-check"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default DropdownField
