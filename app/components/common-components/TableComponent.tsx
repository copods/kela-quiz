import { t } from 'i18next'
import type { TableType } from '~/interface/Interface'
import Pagination from './Pagination'
/**
* Table parameters : 
* columns-
    type:array
    description: Column definitions   
    Example: [{ title: 'Name', field: 'name', width: '20%',render:yourComponent }]  Note: width should be in percentage. width and render are optional .
  
* data -
    type: array
    description: Data to be rendered
    Example: [
    {
      id: '1',
      name: 'Akshay',
      email: 'akshay@copods.co',
      role: 'Admin',
      joined_on: '22',
    }]

* PagenationEnabled (Optional)-
    type: boolean
    description: Enables pagination based boolean value
    
NOTE: if you enable pagination, then pass all props related to pagination.

 PAGINATION PROPS:

* currentPage (Optional)- 
    type: Number
    description: Takes current page number
* onPageChange (Optional) -
    type:(e: number) => void
    description: Takes function to change page number
* totalItems(Optional) - 
    type: number
    description: Takes data length
* pageSizeOptions (Optional): 
    type: Array<number>
    description: Takes array of numbers to for dropdown menu
* pageSize (Optional):
    type: number
    description: Takes a number, determines how many items will shown on page
* setPageSize (Optional): 
    type: (e: number) => void
    description: Takes function to set page size.    
 */

const HeaderDataCell = ({
  width,
  title,
}: {
  width?: string
  title: string
}) => {
  return (
    <div
      style={{
        minWidth: `${width}`,
        maxWidth: `${width}`,
      }}
      data-cy={title}
      id="table-th"
      className="flex-1 border-b bg-gray-100 py-4 px-3 text-sm font-semibold text-gray-500 first:pl-9 last:pr-9"
    >
      {title}
    </div>
  )
}

const RenderDataCell = <T,>({
  width,
  rowData,
  render,
  index,
}: {
  width?: string
  rowData: T
  render?: (data: T, index: number) => JSX.Element
  index: number
}) => {
  return (
    <div
      id="table-td"
      style={{
        minWidth: `${width}`,
        maxWidth: `${width}`,
      }}
      className="max-h-20 flex-1 truncate border-b bg-white py-7 px-3  text-gray-700 first:pl-9 last:pr-9"
    >
      {render?.(rowData, index)}
    </div>
  )
}

const TableDataCell = <T,>({
  width,
  rowData,
  field,
}: {
  width?: string
  rowData: T
  field: string
}) => {
  return (
    <div
      id="table-td"
      style={{
        minWidth: `${width}`,
        maxWidth: `${width}`,
      }}
      className="max-h-20 flex-1 truncate border-b bg-white py-7 px-3 text-gray-700  first:pl-9 last:pr-9"
    >
      {rowData[field as keyof typeof rowData]}
    </div>
  )
}

const TableEmptyState = () => {
  return (
    <div className="flex justify-center bg-white py-7 text-gray-700">
      <span>{t('commonConstants.noRowsToShow')}</span>
    </div>
  )
}
const Table = <T extends object>({
  columns,
  data,
  paginationEnabled = false,
  currentPage,
  onPageChange,
  pageSize,
  setPageSize,
  totalItems,
}: TableType<T>) => {
  if (!columns.length) {
    return null
  }
  return (
    <div style={{ maxHeight: 'inherit' }}>
      <div
        id="table"
        style={{ maxHeight: 'inherit' }}
        className={`overflow-x-auto border-t border-r border-l shadow ${
          paginationEnabled ? 'rounded-t-2xl' : 'rounded-2xl'
        }`}
      >
        <div id="table-head-row" className="sticky top-0 flex bg-gray-100">
          {columns.map((header, index) => (
            <HeaderDataCell
              key={header.field + index}
              width={header.width}
              title={header.title}
            />
          ))}
        </div>
        {data.length === 0 ? (
          <TableEmptyState />
        ) : (
          data.map((rowData: T & { id?: number }, i) => (
            <div
              id="table-row"
              key={String(rowData.id) + i}
              className="tableRow flex"
            >
              {columns.map((column, j) =>
                column.render ? (
                  <RenderDataCell
                    key={column.field + j}
                    width={column.width}
                    rowData={rowData}
                    index={i}
                    render={column.render}
                  />
                ) : (
                  <TableDataCell
                    key={column.field + i}
                    field={column.field}
                    width={column.width}
                    rowData={rowData}
                  />
                )
              )}
            </div>
          ))
        )}
      </div>
      {paginationEnabled ? (
        <div className="z-0 rounded-b-2xl border bg-white px-9 py-5 shadow">
          <Pagination
            currentPage={currentPage!}
            onPageChange={(page) => onPageChange?.(page)}
            pageSize={pageSize!}
            setPageSize={setPageSize!}
            totalItems={totalItems!}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Table
