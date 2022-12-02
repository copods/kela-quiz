import { Icon } from '@iconify/react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { DOTS, usePagination } from './usePagination'
import { useTranslation } from 'react-i18next'

const Pagination = ({
  onPageChange,
  totalLength,
  currentPage,
  pageSize,
  setPageSize,
  firstPageIndex,
  testDataLength,
  itemsList,
}: {
  onPageChange: (e: number) => void
  totalLength: number
  currentPage: number
  pageSize: number
  setPageSize: (e: number) => void
  firstPageIndex: number
  testDataLength: number
  itemsList?: Array<{ pageSize: number }>
}) => {
  const defaultPaginationItems = [
    { pageSize: 5 },
    { pageSize: 10 },
    { pageSize: 15 },
    { pageSize: 20 },
  ]
  const { t } = useTranslation()
  const totalCount = Math.ceil(totalLength / pageSize)
  const siblingCount = 1
  const paginationRange: Array<any> | undefined = usePagination({
    currentPage,
    totalLength,
    siblingCount,
    pageSize,
  })
  let lastPage =
    paginationRange === undefined
      ? 0
      : paginationRange[paginationRange?.length - 1]
  const buttons = () => {
    return paginationRange?.map((pageNumber, index) => {
      if (pageNumber === DOTS) {
        return (
          <Icon className="text-gray-500" icon="bx:dots-horizontal-rounded" />
        )
      } else {
        return (
          <span
            key={index}
            className={`cursor-pointer py-1 px-3 text-sm ${
              currentPage === pageNumber ? ' rounded-md bg-gray-200' : ''
            }`}
            onClick={() => onPageChange(pageNumber)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onPageChange(pageNumber)
            }}
          >
            {pageNumber}
          </span>
        )
      }
    })
  }
  const paginationList =
    itemsList === undefined ? defaultPaginationItems : itemsList
  const [selected, setSelected] = useState(paginationList[0])

  const dropDown = () => {
    return (
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="flex cursor-pointer items-center text-xs text-gray-600">
            <span className="block truncate">
              {selected.pageSize} {t('commonConstants.items')}
            </span>
            <Icon className="text-2xl" icon="gridicons:dropdown" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {paginationList?.map(
                (item: { pageSize: number }, index: number) => (
                  <Listbox.Option
                    key={index}
                    onClick={() => {
                      setPageSize(item.pageSize)
                      onPageChange(1)
                    }}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-8 text-xs text-gray-600 ${
                        selected.pageSize === item.pageSize
                          ? ' bg-gray-100'
                          : active
                          ? 'bg-gray-100'
                          : ''
                      }`
                    }
                    value={item}
                  >
                    <span className="block truncate">
                      {item.pageSize} {t('commonConstants.items')}
                    </span>
                  </Listbox.Option>
                )
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    )
  }
  return (
    <div className="test-table-list flex items-center justify-between gap-3 rounded-b-md border-b border-gray-200 bg-white py-6 px-9">
      <div className="paginationInfo flex items-center gap-6">
        {dropDown()}
        <span className="flex text-xs text-gray-600">
          Showing {firstPageIndex} to {totalCount}
        </span>
      </div>
      <div className="pagination flex items-center gap-2">
        <Icon
          className={`cursor-pointer text-sm ${
            currentPage === 1 ? 'pointer-events-none text-slate-300' : ''
          }`}
          icon="ooui:previous-ltr"
          onClick={() => onPageChange(currentPage - 1)}
        />
        {buttons()}
        <Icon
          className={`cursor-pointer text-sm ${
            currentPage === lastPage ? 'pointer-events-none text-slate-300' : ''
          }`}
          icon="ooui:previous-rtl"
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  )
}

export default Pagination
