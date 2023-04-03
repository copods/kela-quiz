import { Fragment, useEffect } from "react"

import { Menu, Transition } from "@headlessui/react"
import { Icon } from "@iconify/react"

import { useElementPositionHandler } from "~/hooks/useElementPositionHandler"

const ListMenuItem = ({
  menuIcon,
  menuOpeningClosing,
  setMenuOpeningClosing,
  onItemClick,
  open,
  menuDetails,
  id,
  setId,
  dataCyID,
  customClasses,
}: {
  menuIcon: string
  menuOpeningClosing?: boolean
  setMenuOpeningClosing?: (e: boolean) => void
  onItemClick: (e: boolean) => void
  open: boolean
  menuDetails: Array<{
    id: string
    menuListText: string
    menuListHelperText?: string
    menuListIcon?: string
    menuListLink?: string
    menuLinkAltTagLine?: string
    handleItemAction?: () => void
    disabled?: boolean
  }>
  id: string
  setId?: (e: string) => void
  dataCyID?: string
  customClasses?: { item: string; itemsContainer?: string }
}) => {
  const {
    elementRef,
    componentRef,
    elementViewPortVisiblility,
    setIsElementOpen,
  } = useElementPositionHandler()

  useEffect(() => {
    if (open === false) {
      setTimeout(() => {
        // const menuButton = document.querySelector(`.${id}`) as HTMLElement
        // menuButton?.focus()
      }, 50)
    }
  }, [open, id])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setMenuOpeningClosing && setMenuOpeningClosing(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [elementRef])

  return (
    <>
      <Menu as="div" className="relative flex">
        <div className="flex" ref={elementRef}>
          <Menu.Button
            className={`${id} self-center`}
            onClick={() => {
              setIsElementOpen((prev) => !prev)
              setMenuOpeningClosing &&
                setMenuOpeningClosing(!menuOpeningClosing)
            }}
          >
            <Icon
              onClick={() => setId && setId(id)}
              className="text-2xl text-gray-600"
              icon={menuIcon}
              id={`${dataCyID ? dataCyID : "vertical-icon"}`}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute right-0 top-8 z-40 min-w-max origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
              elementViewPortVisiblility
                ? ""
                : "-top-2 -translate-y-full transform"
            } ${customClasses ? customClasses?.itemsContainer : ""}`}
          >
            <div className="dropdown flex flex-col py-2" ref={componentRef}>
              {menuDetails?.map((menuItem) => {
                return (
                  <Menu.Item key={menuItem.id}>
                    {({ active }) => (
                      <button
                        tabIndex={0}
                        name="deleteTest"
                        className={`deleteTest max-w-75 items-start border border-none px-5 py-3 font-medium transition delay-75 ease-in-out hover:bg-blue-50 ${
                          customClasses ? customClasses?.item : ""
                        } ${menuItem?.disabled ? "cursor-not-allowed" : ""}`}
                        onClick={() => {
                          if (!menuItem?.disabled) {
                            onItemClick(true)
                            setMenuOpeningClosing &&
                              setMenuOpeningClosing(false)
                            menuItem.handleItemAction &&
                              menuItem.handleItemAction()
                          }
                        }}
                        data-cy={menuItem.id}
                      >
                        <>
                          {menuItem?.menuListIcon && (
                            <Icon
                              icon={menuItem?.menuListIcon as string}
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                          {menuItem?.menuListLink && (
                            <img
                              src={menuItem?.menuListLink}
                              alt={menuItem?.menuLinkAltTagLine}
                              className="mr-1"
                            />
                          )}
                          <div className="flex flex-col items-start gap-1">
                            <span className="text-left text-sm">
                              {menuItem?.menuListText}
                            </span>
                            <div className="text-left text-xs text-gray-500">
                              {menuItem?.menuListHelperText}
                            </div>
                          </div>
                        </>
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default ListMenuItem
