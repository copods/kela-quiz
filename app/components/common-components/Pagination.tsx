import { Icon } from '@iconify/react'
import { Fragment, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { usePagination } from '~/utils'

const PaginationButtons = ({
  paginationRange,
  currentPage,
  onPageChange,
}: {
  paginationRange?: number[]
  currentPage: number
  onPageChange: (e: number) => void
}) => {
  return paginationRange?.map((paginationRangeItems: number, index) => {
    if (paginationRangeItems === -1) {
      return (
        <Icon
          className="w-8 text-gray-500 "
          icon="bx:dots-horizontal-rounded"
        />
      )
    } else {
      return (
        <span
          key={index}
          className={`flex w-8 cursor-pointer justify-center py-1 text-sm ${
            currentPage === paginationRangeItems
              ? ' rounded-md bg-gray-200'
              : ''
          }`}
          onClick={() => onPageChange(paginationRangeItems)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onPageChange(paginationRangeItems)
          }}
        >
          {paginationRangeItems}
        </span>
      )
    }
  })
}

const PaginationDropDown = ({
  selected,
  pageSizeOptions,
  setSelected,
  setPageSize,
  onPageChange,
}: {
  selected: number
  pageSizeOptions?: Array<number>
  setSelected: (e: number) => void
  setPageSize: (e: number) => void
  onPageChange: (e: number) => void
}) => {
  const { t } = useTranslation()
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="flex cursor-pointer items-center text-xs text-gray-600">
          <span className="block truncate">
            {selected} {t('commonConstants.items')}
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
            {pageSizeOptions?.map((item: number, index: number) => (
              <Listbox.Option
                key={index}
                onClick={() => {
                  setPageSize(item)
                  onPageChange(1)
                }}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-8 text-xs text-gray-600 ${
                    selected === item
                      ? ' bg-gray-100'
                      : active
                      ? 'bg-gray-100'
                      : ''
                  }`
                }
                value={item}
              >
                <span className="block truncate">
                  {item} {t('commonConstants.items')}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

const Pagination = ({
  onPageChange,
  currentPage,
  totalItems,
  pageSizeOptions = [5, 10, 15, 20],
  pageSize,
  setPageSize,
  isSmallWidth
}: {
  onPageChange: (e: number) => void
  totalItems: number
  currentPage: number
  pageSizeOptions?: Array<number>
  pageSize: number
  setPageSize: (e: number) => void
  isSmallWidth?:boolean
}) => {
  const firstPageIndex = (currentPage - 1) * pageSize
  const siblingCount =isSmallWidth?0: 1
  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
    pageSize,
    isSmallWidth
  })
  const [selected, setSelected] = useState(pageSize)

  return (
    <div className="test-table-list b flex items-center justify-between gap-3">
      <div className="paginationInfo flex items-center gap-6">
        {PaginationDropDown({
          selected,
          pageSizeOptions,
          setSelected,
          setPageSize,
          onPageChange,
        })}
        {!isSmallWidth&&(
 <span className="flex text-xs text-gray-600">
 Showing {firstPageIndex + 1} to{' '}
 {pageSize * currentPage > totalItems
   ? totalItems
   : pageSize * currentPage}{' '}
 of {totalItems}
</span>
        )}
       
      </div>
      <div className="pagination flex items-center gap-2">
        <Icon
          className={`cursor-pointer w-3 text-sm ${
            currentPage === 1 ? 'pointer-events-none text-slate-300' : ''
          }`}
          icon="ooui:previous-ltr"
          onClick={() => onPageChange(currentPage - 1)}
        />
        {PaginationButtons({ paginationRange, currentPage, onPageChange })}

        <Icon
          className={`cursor-pointer w-3 text-sm ${
            pageSize * currentPage >= totalItems
              ? 'pointer-events-none text-slate-300'
              : ''
          }`}
          icon="ooui:previous-rtl"
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  )
}

export default Pagination
