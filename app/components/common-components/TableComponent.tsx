// import { t } from 'i18next'
import type { TableType } from '~/interface/Interface'
// import Pagination from './Pagination'
/**
* Table parameters : 
* columns-
    type:array
    description: Column definitions  
    Example: [{ title: 'Name', field: 'name', width: '20%' }] Note: width should be in percentage.
  
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
  paginationEnabled,
  currentPage,
  onPageChange,
  pageSize,
  setPageSize,
}: TableType<T>) => {
  // function getHeaderClasses(width: string) {
  //   console.log(width)
  //   return `min-w-[${width ? width : ''}] max-w-[${
  //     width ? width : ''
  //   }] flex-1 py-4 text-sm font-semibold text-gray-500 pr-3`
  // }
  // function getDataCellClasses(width: string) {
  //   console.log(width)

  //   return `min-w-[${width ? width : ''}] max-w-[${
  //     width ? width : ''
  //   }] flex-1 truncate border-b border-gray-200 py-7 text-base font-medium text-gray-700 first:pl-3 pr-3`
  // }
  if (!columns.length) {
    return null
  }
  return (
    <div id="table" className="w-full  rounded-2xl bg-white shadow">
      <div className=" overflow-x-auto">
        <div id="table-header-row" className="flex">
          {columns.map((header, i) => (
            <div
              key={header.field}
              style={{
                minWidth: `${header.width}`,
                maxWidth: `${header.width}`,
              }}
              id="table-th"
              className={
                'flex-1 border-b py-4 text-sm font-semibold text-gray-500 first:pl-12 '
              }
            >
              {header.title}
            </div>
          ))}
        </div>

        {data.map((rowData: T, j) => (
          <div id="table-row" key={j} className="flex ">
            {columns.map((column, i) => (
              <div
                id="table-data-cell"
                style={{
                  minWidth: `${column.width}`,
                  maxWidth: `${column.width}`,
                }}
                className="relative flex-1 overflow-auto truncate first:pl-12 "
                key={i}
              >
                {rowData[column.field as keyof typeof rowData]}
                {j !== data.length - 1 && (
                  <div
                    className={`absolute  border-b   ${
                      i === 0
                        ? 'bottom-0 right-0 w-[calc(100%-36px)]'
                        : i === columns.length - 1
                        ? 'bottom-0 left-0 w-[calc(100%-36px)]'
                        : 'bottom-0 right-0 left-0 w-full'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    // <div id="table" className="w-full rounded-2xl bg-white shadow">
    //   {/* Table head */}

    //   <div id="table-head"></div>
    //   {/* Table body */}
    //   <div id="table-body" className="w-full overflow-auto px-9">
    //     <div id="table-header-row" className="flex border-b px-12">
    //       {columns.map((header, i) => (
    //         <div
    //           key={header.field}
    //           style={{
    //             minWidth: `${header.width}`,
    //             maxWidth: `${header.width}`,
    //           }}
    //           id="table-th"
    //           className={getHeaderClasses(header.width)}
    //         >
    //           {header.title}
    //         </div>
    //       ))}
    //     </div>
    //     {data.length === 0 ? (
    //       <div id="table-row" className="flex justify-center">
    //         <div
    //           id="table-datacell"
    //           className={`truncate py-7 text-base font-medium text-gray-700 first:pl-3`}
    //         >
    //           {t('commonConstants.noRowsToShow')}
    //         </div>
    //       </div>
    //     ) : (
    //       data.map((rowData: T, i) => (
    //         <div id="table-row" className="flex" key={i}>
    //           {columns.map((column, j) =>
    //             column.render ? (
    //               <div
    //                 key={rowData.id}
    //                 style={{
    //                   minWidth: `${column.width}`,
    //                   maxWidth: `${column.width}`,
    //                 }}
    //                 id="table-datacell"
    //                 className={getDataCellClasses(column.width)}
    //               >
    //                 {column?.render(rowData)}
    //               </div>
    //             ) : (
    //               <div
    //                 key={rowData.id}
    //                 id="table-datacell"
    //                 style={{
    //                   minWidth: `${column.width}`,
    //                   maxWidth: `${column.width}`,
    //                 }}
    //                 className={getDataCellClasses(column.width)}
    //               >
    //                 {rowData[column.field as keyof typeof rowData]}
    //               </div>
    //             )
    //           )}
    //         </div>
    //       ))
    //     )}
    //   </div>
    //   {paginationEnabled ? (
    //     <div id="table-footer" className="px-12 py-5">
    //       <Pagination
    //         currentPage={currentPage!}
    //         onPageChange={(page) => onPageChange?.(page)}
    //         pageSize={pageSize!}
    //         setPageSize={setPageSize!}
    //         totalItems={data.length!}
    //       />
    //     </div>
    //   ) : null}
    // </div>
  )
}

export default Table
