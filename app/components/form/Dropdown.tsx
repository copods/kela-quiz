import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'


function DropdownField({ data, displayKey, valueKey, value, setValue }: { data: Array<any>, displayKey: string, valueKey: string, value: any, setValue: (e: any) => void }) {
  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
  }
  console.log(data)
  const getName = (val: string) => {
    for (let d of data) {
      if (d[valueKey] === val) {
        return d[displayKey]
      }
    }
  }
  console.log(data[0][valueKey])
  return (

    <Listbox value={value} onChange={setValue}>
      {({ open }) => (
        <>
          <div className="relative w-44">
            <Listbox.Button className="h-11 relative w-full bg-white border border-gray-200 rounded-md shadow-sm px-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="block truncate">{getName(value)}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data.map((el) => (
                  <Listbox.Option
                    key={el[valueKey]}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-primary' : 'text-gray-900',
                        'cursor-default select-none relative py-2 px-3'
                      )
                    }
                    value={el[valueKey]}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
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
                            <Icon icon="ic:round-check" className="h-5 w-5" aria-hidden="true" />
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