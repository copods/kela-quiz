// import { t } from 'i18next'
import type { TableType } from '~/interface/Interface'
import Pagination from './Pagination'

const Table = <T extends { id?: string }>({
  columns,
  data,
  paginationEnabled,
  currentPage,
  onPageChange,
  pageSize,
  setPageSize,
}: TableType<T>) => {
  return (
    // <div className="table w-full rounded-2xl bg-white shadow ">
    //   <div id="thead" className="table-header-group">
    //     <div className="x table-row  border-b py-4 px-12">
    //       <div className="table-cell  text-sm font-semibold text-gray-500">
    //         Name
    //       </div>
    //       <div className="table-cell  text-sm font-semibold text-gray-500">
    //         Age
    //       </div>
    //     </div>
    //   </div>
    //   <div id="tbody" className="table-row-group">
    //     <div className="table-row">
    //       <div className="table-cell border">Jacke</div>
    //       <div className="table-cell border">10</div>
    //     </div>
    //   </div>
    // </div>
    // USING FLEX
    <div id="table" className=" rounded-2xl bg-white shadow">
      {/* Table head */}
      <div className="overflow-auto">
        <div id="table-head">
          <div id="table-header-row" className="flex ">
            {columns.map((header, i) => (
              <div
                key={i}
                id="table-th"
                className={` min-w-[${
                  header.width ? header.width : '30%'
                }] flex-1  border-b py-4 text-sm font-semibold text-gray-500 first:pl-12`}
              >
                {header.title}
              </div>
            ))}
          </div>
        </div>
        {/* Table body */}
        <div id="table-body" className="">
          {data.map((rowData: T, i) => (
            <div id="table-row" className="flex" key={i}>
              {columns.map((column, j) => (
                <div
                  key={j}
                  id="table-datacell"
                  className={`min-w-[${
                    column.width ? column.width : '30%'
                  }]   flex-1 border-b border-gray-200 py-7  text-base font-medium text-gray-700 `}
                >
                  {rowData[column.field as keyof typeof rowData]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div id="table-footer" className="px-12 py-5">
        <Pagination
          currentPage={currentPage!}
          onPageChange={(page) => onPageChange?.(page)}
          pageSize={pageSize!}
          setPageSize={setPageSize!}
          totalItems={data.length!}
        />
      </div>
    </div>
    // TABLE TAG
    // <table className="w-full table-auto  rounded-2xl bg-white shadow ">
    //   <thead className="relative">
    //     <tr className="border-b border-solid border-gray-200">
    //       {columns.map((header, i) => (
    //         <th
    //           className={`sticky top-0 bg-white py-4 pl-9 text-left text-sm  font-semibold text-gray-500 `}
    //           key={header.field}
    //         >
    //           {header.title}
    //         </th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody className="h-48 rounded-lg">
    //     {data.length === 0 ? (
    //       <tr>
    //         <td colSpan={4} className="text-center text-sm">
    //           {t('commonConstants.noRowsToShow')}
    //         </td>
    //       </tr>
    //     ) : (
    //       data.map((rowData: T, i) => (
    //         <tr
    //           className={` border-solid border-gray-200 ${
    //             i == 0 && `border-none`
    //           }`}
    //           key={rowData.id}
    //         >
    //           {columns.map((column, i) => (
    //             <>
    //               {column.render ? (
    //                 <td
    //                   width={column.width}
    //                   className={` truncate overflow-ellipsis text-base text-gray-700`}
    //                   key={column.title}
    //                 >
    //                   {column?.render(rowData)}
    //                 </td>
    //               ) : (
    //                 <td
    //                   className={`border-t py-7 pl-9 text-base text-gray-700`}
    //                   width={column.width}
    //                   key={column.title}
    //                   title={String(
    //                     rowData[column.field as keyof typeof rowData]
    //                   )}
    //                 >
    //                   {rowData[column.field as keyof typeof rowData]}
    //                 </td>
    //               )}
    //             </>
    //           ))}
    //         </tr>
    //       ))
    //     )}
    //   </tbody>

    //   {paginationEnabled ? (
    //     <tfoot>
    //       <tr>
    //         <td
    //           colSpan={data.length + 1}
    //           className="border-t-[1px] px-12 py-5 align-middle"
    //         >
    //           <Pagination
    //             currentPage={currentPage!}
    //             onPageChange={(page) => onPageChange?.(page)}
    //             pageSize={pageSize!}
    //             setPageSize={setPageSize!}
    //             totalItems={data.length!}
    //           />
    //         </td>
    //       </tr>
    //     </tfoot>
    //   ) : null}
    // </table>
  )
}

export default Table
