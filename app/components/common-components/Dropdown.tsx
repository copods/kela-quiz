import { Fragment } from "react"

import { Listbox, Transition } from "@headlessui/react"
import { Icon } from "@iconify/react"
import { useTranslation } from "react-i18next"

import { QuestionTypes } from "../../interface/Interface"

import { useElementPositionHandler } from "~/hooks/useElementPositionHandler"

type Action = {
  actionCb: (e: boolean | string) => void
  actionName: string | number
  actionIcon?: JSX.Element
}

function DropdownField({
  data,
  displayKey,
  name,
  valueKey,
  value,
  setValue,
  callToAction,
  actionName,
  setOpen,
}: {
  data: Array<any>
  displayKey: string
  valueKey: string
  name?: string
  value: string
  setValue: (e: string) => void
  setOpen?: (e: boolean) => void
  callToAction?: boolean
  actionName?: string
}) {
  const { t } = useTranslation()
  const createQuestionDropdownOptions = data.filter(
    (item) => item.value !== QuestionTypes.singleChoice
  )

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ")
  }
  const getName = (val: string) => {
    for (let d of data) {
      if (d[valueKey] === val) {
        return d[displayKey]
      }
    }
  }

  return (
    <Listbox
      value={value}
      onChange={(val: string) => {
        val !== actionName ? setValue(val) : setValue(value)
      }}
    >
      {({ open }) => (
        <>
          <div
            className="dropdown relative w-full"
            id="dropdown"
            title={t("sectionsConstants.dropdown")}
            aria-label={t("sectionsConstants.dropdown")}
          >
            <Listbox.Button
              id="dropdownButton"
              className="dropdownButton relative h-11 w-full cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-3 text-left shadow-sm sm:text-sm"
            >
              <span className="flex items-center">
                <span className="block truncate">{getName(value)}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <Icon icon="ic:round-keyboard-arrow-down" id="icon" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="dropDownSelect absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {callToAction && (
                  <Listbox.Option
                    key={actionName}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-primary text-white" : "text-gray-900",
                        "relative z-20 cursor-pointer select-none py-2 px-3"
                      )
                    }
                    value={actionName}
                    onClick={() => {
                      setOpen && setOpen(true)
                    }}
                  >
                    <div className="flex items-center">
                      <Icon icon="akar-icons:circle-plus" />
                      <span
                        className="dropdown-option ml-2 block truncate font-normal"
                        id="option"
                      >
                        {actionName}
                      </span>
                    </div>
                  </Listbox.Option>
                )}
                {createQuestionDropdownOptions.map((option) => (
                  <Listbox.Option
                    key={option[valueKey]}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-primary text-white" : "text-gray-900",
                        "relative z-20 cursor-pointer select-none py-2 px-3"
                      )
                    }
                    value={option[valueKey]}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected
                                ? "font-semibold"
                                : "not-selected font-normal",
                              "dropdown-option block truncate"
                            )}
                            id="option"
                          >
                            {option[displayKey]}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-primary",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
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

type DropdownOptions<T> = Array<
  T extends object
    ? T
    : T extends string
    ? string
    : T extends number
    ? number
    : T extends boolean
    ? boolean
    : never
>

export const NewDropdownField = <
  T extends object | string | number | boolean,
  U extends keyof T
>({
  dropdownOptions,
  labelKey,
  valueKey,
  value,
  setValue,
  helperText,
  action,
  height = "lg",
  id,
}: {
  dropdownOptions: DropdownOptions<T>
  labelKey?: U | string
  valueKey?: U | string
  value: string
  setValue: (e: string) => void
  id?: string
  helperText?: string
  action?: Action[]
  height?: "sm" | "lg"
}) => {
  const { t } = useTranslation()

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ")
  }

  const getLabelFromValue = (val: string) => {
    if (valueKey && labelKey) {
      for (let option of dropdownOptions as DropdownOptions<T>) {
        if ((option as Record<typeof valueKey, string>)[valueKey] === val) {
          return (option as Record<typeof labelKey, string>)[labelKey]
        }
      }
    }
  }

  const {
    elementRef,
    componentRef,
    elementViewPortVisiblility,
    setIsElementOpen,
  } = useElementPositionHandler()

  return (
    <Listbox value={value} onChange={(val: string) => setValue(val)}>
      {({ open }) => (
        <>
          <div
            className="dropdown relative w-full"
            id={id ?? "dropdown"}
            title={t("sectionsConstants.dropdown")}
            aria-label={t("sectionsConstants.dropdown")}
            ref={elementRef}
          >
            <Listbox.Button
              id="dropdownButton"
              className={`dropdownButton relative ${
                height === "lg"
                  ? "h-12 p-3"
                  : height === "sm"
                  ? "h-9 px-2 py-2.5"
                  : "h-12 p-3"
              } w-full cursor-pointer rounded-md border border-gray-200 bg-white text-left shadow-sm sm:text-sm`}
              onClick={() => setIsElementOpen((prev) => !prev)}
            >
              <span className="flex items-center">
                {value ? (
                  <span
                    className={`block truncate ${
                      height === "lg"
                        ? "text-base"
                        : height === "sm"
                        ? "text-xs"
                        : "text-base"
                    }`}
                  >
                    {labelKey ? getLabelFromValue(value) : value}
                  </span>
                ) : (
                  <span className="text-base text-gray-400">Select</span>
                )}
              </span>
              <span
                className={`pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2 ${
                  !value && "text-gray-400"
                }`}
              >
                <Icon icon="ic:round-keyboard-arrow-down" id="icon" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`dropDownSelect absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${
                  elementViewPortVisiblility
                    ? ""
                    : "-top-2 -translate-y-full transform"
                }`}
              >
                <div ref={componentRef}>
                  {action &&
                    action.map((action) => (
                      <Listbox.Option
                        key={action.actionName}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-primary text-white" : "text-gray-900",
                            "relative z-20 cursor-pointer select-none py-2 px-3"
                          )
                        }
                        value={action.actionName}
                        onClick={() => {
                          action.actionCb(true)
                        }}
                      >
                        <div className="flex items-center">
                          {action.actionIcon && action.actionIcon}
                          <span
                            className="dropdown-option ml-2 block truncate font-normal"
                            id="option"
                          >
                            {action.actionName}
                          </span>
                        </div>
                      </Listbox.Option>
                    ))}
                  {(dropdownOptions as DropdownOptions<T>).map(
                    (
                      option: T extends object
                        ? T
                        : T extends string
                        ? string
                        : T extends number
                        ? number
                        : T extends boolean
                        ? boolean
                        : never,
                      i: number
                    ) => (
                      <Listbox.Option
                        className={({ selected, active }) =>
                          classNames(
                            selected
                              ? "bg-blue-50"
                              : active
                              ? "bg-hover"
                              : "text-gray-900",
                            "relative z-20 cursor-pointer select-none ",
                            height === "lg"
                              ? "py-3 px-4"
                              : height === "sm"
                              ? "py-2.5 px-2"
                              : "py-3 px-4"
                          )
                        }
                        key={i}
                        value={
                          valueKey
                            ? (option as Record<typeof valueKey, string>)[
                                valueKey
                              ]
                            : option
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex flex-col gap-0.5">
                              <span
                                className={classNames(
                                  selected
                                    ? "font-semibold text-primary"
                                    : "not-selected font-normal",
                                  "dropdown-option block truncate",
                                  height === "sm" ? "text-xs" : ""
                                )}
                                id="option"
                              >
                                {labelKey
                                  ? (option as Record<typeof labelKey, string>)[
                                      labelKey
                                    ]
                                  : option}
                              </span>
                              {helperText && (
                                <span className="text-xs leading-4 text-gray-500">
                                  {
                                    (
                                      option as Record<
                                        typeof helperText,
                                        string
                                      >
                                    )[helperText]
                                  }
                                </span>
                              )}
                            </div>
                            {selected ? (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4 text-primary"
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
                    )
                  )}
                  {dropdownOptions.length === 0 && (
                    <Listbox.Option
                      className={`relative z-20 cursor-not-allowed select-none py-3 px-4`}
                      value={null}
                    >
                      <div className="flex items-center">
                        <span
                          className="dropdown-option ml-2 block truncate font-normal"
                          id="option"
                        >
                          {t("commonConstants.noRecords")}
                        </span>
                      </div>
                    </Listbox.Option>
                  )}
                </div>
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
