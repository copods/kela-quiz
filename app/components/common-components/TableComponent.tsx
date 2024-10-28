import { t } from "i18next"

import Pagination from "./Pagination"

import type { TableType } from "~/interface/Interface"
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
  index,
  totalHeader,
}: {
  width?: string
  title: string
  index: number
  totalHeader: number
}) => {
  return (
    <div
      style={{
        minWidth: `${width}`,
        maxWidth: `${width}`,
      }}
      data-cy={title}
      id="table-th"
      className={`bg-tableBg flex flex-1 items-center border-b px-4 text-sm text-gray-500 ${
        index === 0
          ? "rounded-tl-md"
          : index === totalHeader
          ? "rounded-tr-md"
          : ""
      }`}
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
      className="flex h-16 max-h-20 flex-1 items-center truncate border-b px-4 text-gray-700"
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
      className="flex h-16 max-h-20 flex-1 items-center truncate border-b px-4 text-gray-700"
    >
      {rowData[field as keyof typeof rowData]}
    </div>
  )
}

const TableEmptyState = () => {
  return (
    <div className="flex justify-center bg-white py-7 text-gray-700">
      <span>{t("commonConstants.noRowsToShow")}</span>
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
    <div className="border-tableBorder flex h-full flex-1 flex-col overflow-auto rounded-md border-t">
      <div
        className={`border-tableBorder shadow-tableShadow border-l border-r ${
          paginationEnabled ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <div
          id="table-head-row"
          className="h-3.25 sticky top-0 z-10 flex rounded-t-md bg-gray-100"
        >
          {columns.map((header, index) => (
            <HeaderDataCell
              key={header.field + index}
              width={header.width}
              title={header.title}
              index={index}
              totalHeader={columns.length - 1}
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
              className="tableRow hover:bg-hover flex bg-white"
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
        <div className="min-h-2.875 border-tableBorder bg-tableBg sticky bottom-0 z-0 flex items-center rounded-b-md border px-4">
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
