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
const Table = <T extends { id?: string }>({
  columns,
  data,
  paginationEnabled = false,
  currentPage,
  onPageChange,
  pageSize,
  setPageSize,
}: TableType<T>) => {
  if (!columns.length) {
    return null
  }
  return (
    <div style={{ maxHeight: 'inherit' }}>
      <div
        id="table"
        style={{ maxHeight: 'inherit' }}
        className=" overflow-x-auto rounded-t-2xl border-t border-r border-l shadow"
      >
        <div id="table-head-row" className="sticky top-0 flex bg-gray-100">
          {columns.map((header, i) => (
            <div
              key={header.field}
              style={{
                minWidth: `${header.width}`,
                maxWidth: `${header.width}`,
              }}
              id="table-th"
              className="flex-1 border-b bg-gray-100 py-4 px-9 text-sm font-semibold text-gray-500"
            >
              {header.title}
            </div>
          ))}
        </div>
        {data.length === 0 ? (
          <div className="flex justify-center py-7 text-gray-700">
            <span>{t('commonConstants.noRowsToShow')}</span>
          </div>
        ) : (
          data.map((rowData: T, i) => (
            <div key={rowData.id} className="flex ">
              {columns.map((column, j) =>
                column.render ? (
                  <div
                    id="table-td"
                    style={{
                      minWidth: `${column.width}`,
                      maxWidth: `${column.width}`,
                    }}
                    key={column.field}
                    className="flex-1 truncate border-b bg-white px-8 py-7 text-gray-700"
                  >
                    {column.render(rowData)}
                  </div>
                ) : (
                  <div
                    id="table-td"
                    style={{
                      minWidth: `${column.width}`,
                      maxWidth: `${column.width}`,
                    }}
                    key={column.field}
                    className="flex-1 truncate border-b bg-white px-8 py-7 text-gray-700"
                  >
                    {rowData[column.field as keyof typeof rowData]}
                  </div>
                )
              )}
            </div>
          ))
        )}
      </div>
      {paginationEnabled ? (
        <div className="rounded-b-2xl border bg-white px-9 py-5 shadow">
          <Pagination
            currentPage={currentPage!}
            onPageChange={(page) => onPageChange?.(page)}
            pageSize={pageSize!}
            setPageSize={setPageSize!}
            totalItems={data.length!}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Table