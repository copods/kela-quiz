import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { t } from 'i18next'
import { Fragment, useEffect } from 'react'
import resendTestLink from '~/../public/assets/resend-test-invitation.svg'

const TestListMenuItem = ({
  menuIcon,
  onItemClick,
  open,
  menuListIcon,
  menuListText,
  id,
  resendInvite,
}: {
  menuIcon: string
  onItemClick: (e: boolean) => void
  open: boolean
  menuListIcon?: string
  menuListText: string
  id: string
  resendInvite?: () => void
}) => {
  useEffect(() => {
    if (open === false) {
      setTimeout(() => {
        // const menuButton = document.querySelector(`.${id}`) as HTMLElement
        // menuButton?.focus()
      }, 50)
    }
  }, [open, id])
  return (
    <>
      <Menu as="div" className="flex">
        <Menu.Button className={`${id} self-center`}>
          <Icon
            className="text-2xl text-gray-600"
            icon={menuIcon}
            id="vertical-icon"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute mr-20 mt-8 right-0 z-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    tabIndex={0}
                    name="deleteTest"
                    className="deleteTest text-gray-primary inline-flex w-36 items-center justify-start rounded-md border border-none bg-white px-2 py-2 text-xs font-medium text-primary shadow-sm transition delay-75 ease-in-out hover:bg-gray-100"
                    onClick={() => {
                      onItemClick(true)
                      resendInvite && resendInvite()
                    }}
                  >
                    <>
                      {menuListIcon && (
                        <Icon
                          icon={menuListIcon}
                          className="mr-2 h-5 w-5
                        text-red-500"
                          aria-hidden="true"
                        />
                      )}
                      {!menuListIcon && resendTestLink ? (
                        <img
                          src={resendTestLink}
                          alt={t('resultConstants.resendAssessmentInvite')}
                          className="mr-1"
                        />
                      ) : (
                        ''
                      )}
                      {menuListText}
                    </>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default TestListMenuItem
